# C接口实现Task等待功能

## 需求

很多情况下，我们需要实现这样的功能：

- 调用接口，但是结果需要等一段时间才会返回
- 等待获取结果的途中，我们希望其他任务也能继续运行，不阻塞住整个系统
- 使用订阅topic的方式，不好记，很麻烦且不优雅

为了解决这个问题，可以对你的c接口实现`Task等待功能`，实现之后，即可在等待数据返回的途中，允许其他任务继续运行，不阻塞整个系统。

## 用户使用

提供给用户的调用方法，参考如下的演示代码（只是演示功能，实际目前还没这个接口）

```lua
--任务内等待结果
sys.taskInit(function()
    local data,result,header = http.taskGet("http://xxxxxxxxx").wait()
    log.info("http get",data,result,header)
end)

--等待回调函数
http.taskGet("http://xxxxxxxxx").cb(function(data,result,header)
    log.info("http get",data,result,header)
end)
```

接口按命名规范，以`task`开头。

- 调用后的返回值的`wait`下标为一个闭包，可实现多任务内非阻塞的等待功能。
- 调用后的返回值的`cb`下标为一个回调器，传入`function`可实现异步回调功能。

## C接口适配

### 新建可等待对象

在c接口中，可以使用`luat_pushcwait`函数，获取一个可等待对象，并将其放置在栈顶，最后返回用户即可。

同时该函数会返回一个64位的id，用于之后发布等待结束的消息。

```c
static int l_xxxx_block(lua_State *L) {
    uint64_t id = luat_pushcwait(L);//获取等待对象放到栈顶，并获取其id
    //什么回调函数配置的巴拉巴拉
    //.....
    //.....
    return 1;//把生成的等待对象返回出去以供lua调用
}
```

如果只想返回一个失败结果（如初始化失败的情况），则可以直接返回一个只会返回错误结果的可等待对象

该对象会在等待时即时返回给定的错误返回值，并且不会返回等待id，无需再发布消息

```c
static int l_xxxx_block(lua_State *L) {
    int initial = xxxxx(xxx);
    if(!initial)//如果初始化失败
    {
        lua_pushnil(L);//第一个返回值
        lua_pushstring(L,"失败原因巴拉巴拉");//可以多加几个返回值
        luat_pushcwait_error(L,2);//两个返回值，所以传入2
        return 1;//把生成的等待对象返回出去以供lua调用
    }
    //正常情况的处理巴拉巴拉
    //.....
    //.....
}
```

```lua
print(xxx.xxxxxBlock().wait())
--如果走到上面代码的失败处理部分，就会直接返回：
--nil  失败原因巴拉巴拉
```

### 发布等待结束的消息

只要知道发起等待时，获取的唯一id，即可在后面停止等待。

#### 如果没有返回值

只需调用`luat_cbcwait_noarg`函数，传入id即可

```c
static int l_xxxx_cb(uint64_t id) {
    luat_cbcwait_noarg(id);
}
```

或者调用`luat_cbcwait`函数也可以（在函数内有lua栈时）

```c
static int timer_handler(lua_State *L, void* ptr) {
    luat_timer_t *timer = (luat_timer_t *)ptr;
    uint64_t* idp = (uint64_t*)timer->id;
    luat_cbcwait(L, *idp, 0); //表示这个回调有0个返回值
    return 0;
}
```

#### 如果函数有返回值

先将需要返回的参数推入lua栈，然后调用`luat_cbcwait`函数，传入id即可

```c
static int timer_handler(lua_State *L, void* ptr) {
    luat_timer_t *timer = (luat_timer_t *)ptr;
    uint64_t* idp = (uint64_t*)timer->id;
    lua_pushstring(L,"这是演示的返回值");
    lua_pushstring(L,"这是演示的第二个返回值");
    luat_cbcwait(L, *idp, 2); //表示这个回调有2个返回值
    return 0;
}
```

## 完整示例代码

C代码

```c
// 这里只是演示用的结构体声明,按业务需要自行扩展就可以了
struct struct myctx {
    uint64_t cwait_id; // 用于保存luat_pushcwait的返回值, 就cwait的唯一id
    void* data;
}myctx_t;

// 这里用到3个函数
int l_mylib_abc(lua_State *L); // 注册成给lua调用的API, 例如 mylib.abc(xxx)
int wbc_abc_cb(myctx_t* ctx ); // 用于执行自定义逻辑后,往luatos的msgbus发消息,因为不能直接获取和调用lua_State *L
int wbc_abc_handler(lua_State *L, void* ptr); // 用于处理wbc_abc_cb发送的消息,完成cwait结果传输到lua层

int l_mylib_abc(lua_State *L) {
    uint64_t id = luat_pushcwait(L);//获取等待对象放到栈顶，并获取其id
    // ------------------
    // 首先, 准备好待处理的数据,放入上下文
    myctx_t* ctx = luat_heap_malloc(sizeof(myctx_t));
    ctx->cwait_id = id;
    ctx->data = NULL; // 放自定义的数据
    // 然后,调用自定义函数
    int ret = wba_abc(ctx); // 注意, 这里不要阻塞,不然就体现不出cwait的效果了, 可以用task或queue之类的对外传
    if (ret) { // 要是启动失败, 那就直接返回错误
        lua_pushnil(L);//第一个返回值
        lua_pushstring(L,"初始化调用wba_abc失败了");//可以多加几个返回值
        luat_pushcwait_error(L,2);//两个返回值，所以传入2
        return 1;//把生成的等待对象返回出去以供lua调用
    }
    // ------------------
    return 1;//把生成的等待对象返回出去以供lua调用
}

// 在wba_abc执行后, 需要返回数据的时候
int wbc_abc_cb(myctx_t* ctx) {
    rtos_msg_t msg = {0};
    msg.handler = wbc_abc_handler; // 注意, 这里引用了wbc_abc_handler
    msg.ptr = ctx;                 // 把ctx也传递过去
    luat_msgbus_put(&msg, 0);
}

// 这个函数会在luatos的主线程里执行
int wbc_abc_handler(lua_State *L, void* ptr) {
    myctx_t* ctx = (myctx_t*)ptr;
    uint64_t* idp = (uint64_t*)ctx->cwait_id;
    lua_pushinteger(L, 0);
    lua_pushstring(L,"执行完成");
    luat_cbcwait(L, *idp, 2); //表示这个回调有2个返回值
    // 数据已经使用完成了,释放ctx
    luat_heap_free(ctx);
    // 这里返回0就可以了, 跟cwait没有关系.
    return 0;
}

// l_mylib_abc注册成mylib.abc的过程,普通的非cwait函数是完全一样的, 没有差别
// 这里省略了, 请查阅 add_myap_5min
```

Lua代码

```lua
sys.taskInit(function()
    local ret,msg = myblib.taskExec("abc").wait()
    log.info("abc", ret, msg)
end)
```

数据传递的流程

```
lua代码 --> l_mylib_abc --> 返回cwait对象(table) --> lua代码调用.wait()进行异步等待
l_mylib_abc --> 启动task,配置定时器,配置中断,发消息等等
定时器超时/中断/任务触发 --> 执行wbc_abc_cb --> 往msgbus发送消息
luatos主线程 --> 接收msgbus消息 --> 执行wbc_abc_handler --> lua代码的.wait()返回结果,继续往下执行
```
