# C接口实现Task等待功能

## 基本信息

- 起草日期: 2022-02-18
- 设计人员: [chenxuuu](https://github.com/chenxuuu)

## 目前的问题

以esphttp为例子：

- ESPHTTP_EVT这个topic要手写，不好记
- 不同的请求回调都是ESPHTTP_EVT，不太合理
- 需要手写发起请求和sys.waitUntil，很麻烦

如下面这样的代码，全部需要用户手动处理

```lua
local httpc = esphttp.init(esphttp.GET, "http://xxxxxxxxx")
if httpc then
    local ok, err = esphttp.perform(httpc, true)
    if ok then
        while 1 do
            local result, c, ret, data = sys.waitUntil("ESPHTTP_EVT", 20000)
            log.info("httpc", result, c, ret)
            if c == httpc then
                if esphttp.is_done(httpc, ret) then
                    break
                end
                if ret == esphttp.EVENT_ON_DATA and esphttp.status_code(httpc) == 200 then
                    table.insert(rd,data)
                    --log.info("data", "resp", data)
                end
            end
        end
    else
        log.warn("esphttp", "bad perform", err)
    end
    esphttp.cleanup(httpc)
end
```

## 需要实现的目标

- 一行代码直接调用
- 内部自带sys.waitUntil，实现多任务等待功能
- 用户不用管流程，也不用管内部的topic是什么，直接调用并等待结果即可
- 使用c接口可以方便地进行对接

## 解决方案

### sys.lua中需要添加的功能

添加以下功能的函数（构想）

```lua
sys.cwait_mt = {}
sys.cwait_mt.__index = function(t,i)
    if i == "await" then
        local r = {sys.waitUntil(rawget(t,"w"))}
        table.remove(r,1)
        return table.unpack(r)
    else
        rawget(t,i)
    end
end
function sys.cwaitCreate(w)
    local t = {w=w}
    setmetatable(t,sys.cwait_mt)
    return t
end

--调用方式
sys.taskInit(function()
    local data,result,header = http.asyncGet("http://xxxxxxxxx").await
    log.info("http get",data,result,header)
end)
sys.taskInit(function()
    local data,result,header = http.asyncGet("http://zzzzzzzzz").await
    log.info("http get",data,result,header)
end)
```

### 对应的c函数需要实现的功能

一个例子，没有实际功能

```c
static int l_xxxx_block(lua_State *L) {
    lua_getglobal(L, "sys");
    lua_pushstring(L,"cwaitCreate");
    lua_gettable(L, -2);
    lua_pushstring(L, "test_123123");--一会儿需要回调的topic
    lua_call(L,1,1);

    //什么回调函数配置的巴拉巴拉
    //.....
    //.....

    return 1;--把生成的元表返回出去以供lua调用
}

void cb(char* topic,int data) {
    lua_getglobal(L, "sys_pub");
    lua_pushstring(L, topic);
    lua_pushinteger(L,data);
    lua_call(L, 2, 0);
}
```

- 调用后应尽快返回结果，不能阻塞
- topic不能重复，每次调用都要生成新的topic
- 回调需要对对应的topic进行publish操作，并附带结果
- publish的topic前缀尽量统一，具体待讨论
- 需要对此类接口的命名进行规范，如以`async`开头

## 相关知识点

- 消息总线
