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
