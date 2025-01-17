# onewire - 单总线协议驱动

**示例**

```lua
-- 本代码库尚处于开发阶段

```

## onewire.ds18b20(mode, pin, check)



读取DS18B20

**参数**

|传入值类型|解释|
|-|-|
|int|GPIO模式对应GPIO编号, HW模式根据实际硬件来确定|
|boolean|是否检查数据的CRC值,可选|
|int|模式, 只能是 onewire.GPIO 或者 onewire.HW,可选|

**返回值**

|返回值类型|解释|
|-|-|
|number|成功返回温度值,否则返回nil.单位 0.1摄氏度|

**例子**

```lua

-- GPIO模式,接 GPIO 9
local temp = onewire.ds18b20(9, true, onewire.GPIO)
if temp then
    log.info("读取到的温度值", temp)
else
    log.info("读取失败")
end


```

---

## onewire.dht1x(mode, pin, check)



读取DHT11

**参数**

|传入值类型|解释|
|-|-|
|int|GPIO模式对应GPIO编号, HW模式根据实际硬件来确定|
|boolean|是否检查数据的CRC值,可选|
|int|模式, 只能是 onewire.GPIO 或者 onewire.HW,可选|

**返回值**

|返回值类型|解释|
|-|-|
|number|成功返回温度值,否则返回nil.单位 0.01摄氏度|
|number|成功返回相对湿度,否则返回nil.单位 0.01%|

**例子**

```lua

-- GPIO模式,接 GPIO 9
local temp = onewire.dht1x(onewire.GPIO, 9, true)
if temp then
    log.info("读取到的温度值", temp)
else
    log.info("读取失败")
end


```

---

