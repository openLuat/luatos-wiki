# lora - lora驱动模块

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/lora/luat_lib_lora.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

> 本库有专属demo，[点此链接查看lora的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/lora)

## lora.init(ic, loraconfig,spiconfig)

lora初始化

**参数**

|传入值类型|解释|
|-|-|
|string|lora 型号，当前支持：<br>llcc68<br>sx1268|
|table|lora配置参数,与具体设备有关|
|table|硬件配置参数,与具体设备有关|

**返回值**

无

**例子**

```lua
lora.init("llcc68",
{mode=1,bandwidth=0,datarate=9,coderate=4,preambleLen=8,fixLen=false,crcOn=true,freqHopOn=0,hopPeriod=0,iqInverted=false,
    frequency = 433000000, power=22,fdev=0,timeout=3000,  bandwidthAfc=0,symbTimeout=0,payloadLen=0,rxContinuous=false},
{id = 0,cs = pin.PB04,res = pin.PB00,busy = pin.PB01,dio1 = pin.PB06}
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

## lora.recive(timeout)

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
lora.recive(1000)

```

---

