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
--函数的样子
sys.waitApi(c接口,c接口需要传的参数)

--内部实现
local waitApiId = 0--等待用的编号
function sys.waitApi(f,...)
    waitApiId = waitApiId + 1
    if waitApiId > 0x7ffffffe then waitApiId = 0 end
    f(waitApiId,...)--调用c函数，并传入等待的编号和其他参数
    --等待回调并返回给用户
    local r = {sys.waitUntil("SYS_WAIT_"..string.pack("I",waitApiId))}
    table.remove(r,1)
    return table.unpack(r)
end

--调用方式
sys.taskInit(function()
    local data,result,header = sys.waitApi(http.taskGet,"http://xxxxxxxxx")
    log.info("http get",data,result,header)
end)
sys.taskInit(function()
    local data,result,header = sys.waitApi(http.taskGet,"http://yyyyyyyyy")
    log.info("http get",data,result,header)
end)
```

### 对应的c函数需要实现的功能

- 调用后应尽快返回结果，不能阻塞
- 第一个传入值是publish的id
- 回调需要对传入的id进行publish操作，并附带结果
- publish的topic前缀统一为`SYS_WAIT_`，后直接接u32的4字节
- 需要对此类接口的命名进行规范

## 相关知识点

- [消息总线](/markdown/core/luat_msgbus)
