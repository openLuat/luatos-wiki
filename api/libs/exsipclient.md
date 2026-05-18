# exsipclient - SIP 信令客户端，支持 REGISTER、呼叫信令、MESSAGE、UDP/TCP 以及 401/407 Digest 认证。

**示例**

```lua
本库实现的是“信令侧”的最小 SIP UA，只处理 REGISTER、INVITE、ACK、CANCEL、BYE、MESSAGE，
不包含 RTP 或音频媒体收发。媒体协商完成后会通过 event_callback 抛出结果，供外部媒体模块继续处理。

支持特性：
1、支持 UDP 和 TCP 传输
2、支持 401/407 Digest 鉴权，适用于常见 qop=auth 场景
3、基于 socket 异步回调和 sys.task 后台循环，适合常驻运行
4、通过统一事件回调向外抛出注册、通话、媒体、消息、错误等状态

基本用法：
local sip = require "exsipclient"

sip.start({
    server = "192.168.1.10",
    port = 5060,
    domain = "example.com",
    user = "1001",
    password = "123456",
    transport = "tcp",
    event_callback = function(event, action, payload)
        if event == "register" and action == "ok" then
            log.info("sip", "register ok", payload.expires)
        elseif event == "call" and action == "incoming" then
            log.info("sip", "incoming call", payload.from)
        elseif event == "message" and action == "rx" then
            log.info("sip", "message rx", payload.text)
        elseif event == "error" and action == "net" then
            log.warn("sip", "network error", payload.event, payload.param)
        end
    end
})

注意事项：
1、回调运行在 socket 回调或 SIP 任务中，应保持短小，避免长时间阻塞
2、如果服务器要求 TCP 或 TLS，请同步匹配 transport 和底层 socket 配置
3、Contact 使用本地 IP 和端口，若设备位于 NAT 后，需要服务端支持 rport 或 received 等机制

```

## exsipclient.start(opts)

启动 SIP 客户端。

**参数**

|传入值类型|解释|
|-|-|
|table|opts SIP 启动参数表，至少需要 server、port、domain、user、transport|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|参数合法并成功启动后台任务返回 true，否则返回 false|

**例子**

```lua
exsipclient.start({
    server = "192.168.1.10",
    port = 5060,
    domain = "example.com",
    user = "1001",
    password = "123456",
    transport = "tcp",
    local_port = 5062,
    expires = 600,
    rtp_port = 40000,
    codecs = {"PCMU", "PCMA"},
    ptime = 20,
    call_timeout = 30,
    event_callback = function(event, action, payload)
        -- event 可取 lifecycle、register、call、media、message、error
        -- lifecycle: online、offline、stopped
        -- register: ok、challenge
        -- call: incoming、established、ended、failed、auth_retry
        -- media: offer、ready、stop
        -- message: rx、sent、auth_retry、failed
        -- error: net、rx_failed
    end
})

```

---

## exsipclient.stop()

停止 SIP 客户端。

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
exsipclient.stop()

```

---

## exsipclient.on(fn)

注册统一事件回调。

**参数**

|传入值类型|解释|
|-|-|
|function|fn 事件回调函数，参数格式为 function(event, action, payload)|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|设置成功返回 true，参数不是函数时返回 false|

**例子**

```lua
exsipclient.on(function(event, action, payload)
    log.info("sip", event, action)
end)

```

---

## exsipclient.call(target)

发起外呼。

**参数**

|传入值类型|解释|
|-|-|
|string|target 目标号码或 sip URI，例如 "1002" 或 "sip:1002@example.com"|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
exsipclient.call("1002")

```

---

## exsipclient.answer()

接听当前缓存的来电。

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
exsipclient.answer()

```

---

## exsipclient.hangup()

挂断当前通话，或拒绝当前未接来电。

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
exsipclient.hangup()

```

---

## exsipclient.message(target, text)

发送一条 SIP MESSAGE。

**参数**

|传入值类型|解释|
|-|-|
|string|target 目标号码或 sip URI，例如 "1002" 或 "sip:1002@example.com"|
|string|text 要发送的消息文本|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
exsipclient.message("1002", "hello")

```

---

