# lora - lora驱动模块

## 常量

|常量|类型|解释|
|-|-|-|
|lora.SLEEP|number|SLEEP模式|
|lora.STANDBY|number|STANDBY模式|


## lora.init(ic, loraconfig,spiconfig)

lora初始化

**参数**

|传入值类型|解释|
|-|-|
|string|lora 型号，当前支持：<br>llcc68<br>sx1268|
|table|lora配置参数,与具体设备有关|

**返回值**

无

**例子**

```lua
lora.init("llcc68",
    {
        id = 0,           -- SPI id
        cs = 8,    -- SPI 片选的GPIO号,如果没有pin库,填GPIO数字编号就行
        res = 20,   -- 复位脚连接的GPIO号,如果没有pin库,填GPIO数字编号就行
        busy = 21,  -- 忙检测脚的GPIO号
        dio1 = 25,  -- 数据输入中断脚
        lora_init = true  -- 是否发送初始化命令. 如果是唤醒后直接读取, 就传false
    }
)

```

---

## lora.set_channel(freq)

设置频道频率

**参数**

|传入值类型|解释|
|-|-|
|number|频率|

**返回值**

无

**例子**

```lua
lora.set_channel(433000000)

```

---

## lora.set_txconfig(ic, txconfig)

lora配置发送参数

**参数**

|传入值类型|解释|
|-|-|
|string|lora 型号，当前支持：<br>llcc68<br>sx1268|
|table|lora发送配置参数,与具体设备有关|

**返回值**

无

**例子**

```lua
lora.set_txconfig("llcc68",
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

## lora.set_rxconfig(ic, set_rxconfig)

lora配置接收参数

**参数**

|传入值类型|解释|
|-|-|
|string|lora 型号，当前支持：<br>llcc68<br>sx1268|
|table|lora接收配置参数,与具体设备有关|

**返回值**

无

**例子**

```lua
lora.set_rxconfig("llcc68",
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

## lora.send(data)

发数据

**参数**

|传入值类型|解释|
|-|-|
|string|写入的数据|

**返回值**

无

**例子**

```lua
lora.send("PING")

```

---

## lora.recv(timeout)

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
    lora.send("PING")
end)
-- 老版本没有recv, 可以改成 lora.recive
lora.recv(1000)

```

---

## lora.mode(mode)

设置进入模式(休眠，正常等)

**参数**

|传入值类型|解释|
|-|-|
|number|模式 正常模式:lora.STANDBY 休眠模式:lora.SLEEP 默认为正常模式|

**返回值**

无

**例子**

```lua
lora.mode(lora.STANDBY)

```

---

