# lora2 - lora2驱动模块(支持多挂)

## 常量

|常量|类型|解释|
|-|-|-|
|lora2.SLEEP|number|SLEEP模式|
|lora2.STANDBY|number|STANDBY模式|


## lora2.init(ic, loraconfig,spiconfig)

lora初始化

**参数**

|传入值类型|解释|
|-|-|
|string|lora 型号，当前支持：<br>llcc68<br>sx1268|
|table|lora配置参数,与具体设备有关|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|若成功会返回lora对象,否则返回nil|

**例子**

```lua
spi_lora = spi.deviceSetup(spi_id,pin_cs,0,0,8,10*1000*1000,spi.MSB,1,0)
lora_device = lora2.init("llcc68",{res = pin_reset,busy = pin_busy,dio1 = pin_dio1},spi_lora)

```

---

## lora_device:set_channel(freq)

设置频道频率

**参数**

|传入值类型|解释|
|-|-|
|number|频率|

**返回值**

无

**例子**

```lua
lora_device:set_channel(433000000)

```

---

## lora_device:set_txconfig(txconfig)

lora配置发送参数

**参数**

|传入值类型|解释|
|-|-|
|table|lora发送配置参数,与具体设备有关|

**返回值**

无

**例子**

```lua
lora_device:set_txconfig(
    {
        mode=1,
        power=22,
        fdev=0,
        bandwidth=0,
        datarate=9,
        coderate=4,
        preambleLen=8,
        fixLen=false,
        crcOn=true,
        freqHopOn=0,
        hopPeriod=0,
        iqInverted=false,
        timeout=3000
    }
)

```

---

## lora_device:set_rxconfig(set_rxconfig)

lora配置接收参数

**参数**

|传入值类型|解释|
|-|-|
|table|lora接收配置参数,与具体设备有关|

**返回值**

无

**例子**

```lua
lora_device:set_rxconfig(
    {
        mode=1,
        bandwidth=0,
        datarate=9,
        coderate=4,
        bandwidthAfc=0,
        preambleLen=8,
        symbTimeout=0,
        fixLen=false,
        payloadLen=0,
        crcOn=true,
        freqHopOn=0,
        hopPeriod=0,
        iqInverted=false,
        rxContinuous=false
    }
)

```

---

## lora_device:send(data)

发数据

**参数**

|传入值类型|解释|
|-|-|
|string|写入的数据|

**返回值**

无

**例子**

```lua
lora_device:send("PING")

```

---

## lora_device:recv(timeout)

开启收数据

**参数**

|传入值类型|解释|
|-|-|
|number|超时时间，默认1000 单位ms|

**返回值**

无

**例子**

```lua
sys.subscribe("LORA_RX_DONE", function(data, size)
    log.info("LORA_RX_DONE: ", data, size)
    lora_device:send("PING")
end)
lora_device:recv(1000)

```

---

## lora_device:mode(mode)

设置进入模式(休眠，正常等)

**参数**

|传入值类型|解释|
|-|-|
|number|模式 正常模式:lora.STANDBY 休眠模式:lora.SLEEP 默认为正常模式|

**返回值**

无

**例子**

```lua
lora_device:mode(lora.STANDBY)

```

---

## lora_device:on(cb)

注册lora回调

**参数**

|传入值类型|解释|
|-|-|
|function|cb lora回调,参数包括lora_device, event, data, size|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
lora_device:on(function(lora_device, event, data, size)
    log.info("lora", "event", event, lora_device, data, size)
    if event == "tx_done" then
        lora_device:recv(1000)
    elseif event == "rx_done" then
        lora_device:send("PING")
    elseif event == "tx_timeout" then

    elseif event == "rx_timeout" then
        lora_device:recv(1000)
    elseif event == "rx_error" then

    end
end)
--[[
event可能出现的值有
    tx_done         -- 发送完成
    rx_done         -- 接收完成
    tx_timeout      -- 发送超时
    rx_timeout      -- 接收超时
    rx_error        -- 接收错误
]]

```

---

