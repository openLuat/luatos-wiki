# exsip - SIP/VoIP 电话扩展库，简化 SIP 客户端使用

**示例**

```lua
本库封装了 exsipclient 和 VoIP 引擎，提供更简洁的 API 接口，
让用户更容易上手 SIP/VoIP 电话功能。

基本用法：
local exsip = require "exsip"

-- 配置 SIP 账号
local config = {
    server = "192.168.1.100",
    port = 5060,
    domain = "192.168.1.100",
    user = "1001",
    password = "123456"
}

-- 设置事件回调
exsip.on("register", function(status)
    log.info("sip", "注册状态:", status)
end)

exsip.on("call", function(event, data)
    if event == "incoming" then
        log.info("sip", "来电:", data.from)
        exsip.accept()
    elseif event == "connected" then
        log.info("sip", "通话已建立")
    elseif event == "ended" then
        log.info("sip", "通话已结束")
    end
end)

-- 启动 SIP 服务
exsip.init(config)
exsip.start()

-- 拨打电话
-- exsip.dial("1002")

-- 发送消息
-- exsip.message("1002", "你好")

-- 挂断通话
-- exsip.hangUp()

```

## exsip.init(config)

配置 SIP 参数。

**参数**

|传入值类型|解释|
|-|-|
|table|config 配置参数表|
|string|config.sip_server_addr SIP 服务器地址|
|number|config.sip_server_port SIP 服务器端口，默认 5060|
|string|config.sip_domain SIP 域|
|string|config.sip_username SIP 用户名|
|string|config.sip_password SIP 密码|
|string|config.sip_transport RTP 传输协议，"UDP" 或 "TCP"，默认 "TCP"|
|number|config.rtp_port 本地 RTP 端口，默认 40000|
|number|config.expires 注册有效期（秒），默认 600|
|table|config.codecs 编解码器列表，默认 {"PCMU", "PCMA"}|
|number|config.ptime 打包时长（毫秒），默认 20|
|boolean|config.auto_answer 是否自动接听，默认 false|
|number|config.delay_auto_answer 自动接听延迟（秒），默认 0|
|number|config.call_timeout 拨号超时时间（秒），默认 30|
|number|config.adapter 网络适配器，nil=使用系统默认，socket.LWIP_GP=4G，socket.LWIP_STA=WiFi，socket.LWIP_ETH=以太网|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回 true，失败返回 false|

**例子**

```lua
exsip.init({
    sip_server_addr = "192.168.1.100",
    sip_server_port = 5060,
    sip_domain = "192.168.1.100",
    sip_username = "1001",
    sip_password = "123456",
    auto_answer = false,
    adapter = nil  -- 使用系统默认网卡
})

```

---

## exsip.start()

启动 SIP 服务。

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回 true，失败返回 false|

**例子**

```lua
exsip.start()

```

---

## exsip.stop()

停止 SIP 服务。

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
exsip.stop()

```

---

## exsip.dial(target)

拨打电话。

**参数**

|传入值类型|解释|
|-|-|
|string|target 目标号码或 SIP URI，例如 "1002" 或 "sip:1002@example.com"|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回 true，失败返回 false|

**例子**

```lua
exsip.dial("1002")

```

---

## exsip.accept()

接听来电。

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回 true，失败返回 false|

**例子**

```lua
exsip.accept()

```

---

## exsip.hangUp()

挂断通话。

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回 true，失败返回 false|

**例子**

```lua
exsip.hangUp()

```

---

## exsip.message(target, text)

发送即时消息。

**参数**

|传入值类型|解释|
|-|-|
|string|target 目标号码或 SIP URI|
|string|text 消息内容|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回 true，失败返回 false|

**例子**

```lua
exsip.message("1002", "你好")

```

---

## exsip.on(callback)

注册事件回调。

**参数**

|传入值类型|解释|
|-|-|
|function|callback 统一回调函数，参数为 (event_type, arg1, arg2, arg3)|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
exsip.on(function(event_type, arg1, arg2, arg3)
    if event_type == "register" then
        local status, data = arg1, arg2
        log.info("sip", "注册状态:", status)
    elseif event_type == "ready" then
        log.info("sip", "服务就绪")
    elseif event_type == "call" then
        local event, data = arg1, arg2
        log.info("sip", "通话事件:", event)
    elseif event_type == "media" then
        local event, session = arg1, arg2
        log.info("sip", "媒体事件:", event)
    elseif event_type == "message" then
        local event, data = arg1, arg2
        log.info("sip", "消息事件:", event)
    elseif event_type == "voip" then
        local event, data = arg1, arg2
        log.info("voip", "VoIP事件:", event)
    elseif event_type == "error" then
        local action, payload = arg1, arg2
        log.error("sip", "错误:", action)
    end
end)

```

---

## exsip.off(event)

取消事件回调。

**参数**

|传入值类型|解释|
|-|-|
|string|event 事件名称|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
exsip.off("call")

```

---

## exsip.get_config()

获取当前配置。

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|当前配置表|

**例子**

```lua
local config = exsip.get_config()
log.info("当前用户:", config.user)

```

---

## exsip.get_current_call()

获取当前通话信息。

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|通话信息表，无通话时返回 nil|

**例子**

```lua
local call = exsip.get_current_call()
if call then
    log.info("来电号码:", call.from)
end

```

---

## exsip.is_started()

检查 SIP 服务是否已启动。

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|已启动返回 true，否则返回 false|

**例子**

```lua
if exsip.is_started() then
    log.info("SIP 服务已启动")
end

```

---

## exsip.isRegistered()

检查 SIP 是否注册成功。

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|已注册返回 true，否则返回 false|

**例子**

```lua
if exsip.isRegistered() then
    log.info("SIP 已注册")
end

```

---

## exsip.is_voip_running()

检查 VoIP 引擎是否正在运行。

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|正在运行返回 true，否则返回 false|

**例子**

```lua
if exsip.is_voip_running() then
    log.info("VoIP 引擎正在运行")
end

```

---

