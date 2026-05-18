# voip - voip语音通话

**示例**

```lua
--[[
]]


```

## voip.start(opts)

启动voip语音通话

**参数**

|传入值类型|解释|
|-|-|
|table|opts 配置表|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回 true, 失败返回 false|

**例子**

```lua
voip.start({
    remote_ip   = "192.168.1.100",
    remote_port = 10000,
    local_port  = 10000,
    codec       = 0,            -- 0:PCMU  1:PCMA
    ptime       = 20,           -- 打包时长 ms
    sample_rate = 8000,
    jitter_depth= 3,
    multimedia_id = 0,
    stats_interval = 5000,      -- 统计回调间隔 ms, 0=不回调
    aec = true,
    aec_denoise = true,
    aec_tail = 120,
})

```

---

## voip.stop()

停止voip语音通话

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回 true|

**例子**

```lua
voip.stop()

```

---

## voip.on(event, callback)

注册voip回调函数

**参数**

|传入值类型|解释|
|-|-|
|string|event 事件名: "state", "stats", "error"|
|function|callback 回调函数|
|return|nil|

**返回值**

无

**例子**

```lua
voip.on("state", function(state)
    log.info("voip", "state changed:", state)  -- "started"/"stopped"/"error"
end)

voip.on("stats", function(stats)
    log.info("voip", "tx_packets:", stats.tx_packets, "rx_packets:", stats.rx_packets)
end)

voip.on("error", function(err)
    log.error("voip", "error:", err)
end)

```

---

## voip.stats()

获取voip统计信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|统计信息|

**例子**

```lua
local s = voip.stats()
log.info("voip", "tx_packets:", s.tx_packets)

```

---

## voip.isRunning()

获取voip是否正在运行

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否正在运行|

**例子**

```lua
if voip.isRunning() then
    log.info("voip", "audio active")
end

```

---

## voip.getState()

获取voip当前状态

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|状态字符串: "idle"/"starting"/"running"/"stopping"/"error"|

**例子**

```lua
log.info("voip", "state:", voip.getState())

```

---

