# adc - 模数转换

**示例**

```lua

-- 本库可读取硬件adc通道, 也支持读取CPU温度和VBAT供电电源(若模块支持的话)

-- 读取CPU温度, 单位为0.001摄氏度, 是内部温度, 非环境温度
adc.open(adc.CH_CPU)
local temp = adc.get(adc.CH_CPU)
adc.close(adc.CH_CPU)

-- 读取VBAT供电电压, 单位为mV
adc.open(adc.CH_VBAT)
local vbat = adc.get(adc.CH_VBAT)
adc.close(adc.CH_VBAT)

-- 物理ADC通道请查阅adc.get或者adc.read的注释

```

## 常量

|常量|类型|解释|
|-|-|-|
|adc.ADC_RANGE_3_6|number|air105的ADC分压电阻开启，范围0~3.76V|
|adc.ADC_RANGE_1_8|number|air105的ADC分压电阻关闭，范围0~1.88V|
|adc.ADC_RANGE_3_8|number|air780E开启ADC0,1分压电阻，范围0~3.8V，将要废弃，不建议使用|
|adc.ADC_RANGE_1_2|number|air780E关闭ADC0,1分压电阻，范围0~1.2V，将要废弃，不建议使用|
|adc.ADC_RANGE_MAX|number|ADC开启内部分压后所能到达最大量程，由具体芯片决定|
|adc.ADC_RANGE_MIN|number|ADC关闭内部分压后所能到达最大量程，由具体芯片决定|
|adc.CH_CPU|number|CPU内部温度的通道id|
|adc.CH_VBAT|number|VBAT供电电压的通道id|
|adc.T1|number|ADC1 (如存在多个adc可利用此常量使用多ADC 例如 adc.open(ADC1+2) 打开ADC1 channel 2)|
|adc.T2|number|ADC2 (如存在多个adc可利用此常量使用多ADC 例如 adc.open(ADC2+3) 打开ADC2 channel 3)|


## adc.open(id)

打开adc通道

**参数**

|传入值类型|解释|
|-|-|
|int|通道id,与具体设备有关,通常从0开始|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|打开结果|

**例子**

```lua
-- 打开adc通道4,并读取
if adc.open(4) then
    log.info("adc", adc.read(4)) -- 返回值有2个, 原始值和计算值,通常只需要后者
    log.info("adc", adc.get(4))  -- 返回值有1个, 仅计算值
end
adc.close(4) -- 若需要持续读取, 则不需要close, 功耗会高一点.

```

---

## adc.setRange(range)

设置ADC的测量范围，注意这个和具体芯片有关，目前只支持air105/Air780EXXX系列

**参数**

|传入值类型|解释|
|-|-|
|int|range参数,与具体设备有关,比如air105填adc.ADC_RANGE_1_8和adc.ADC_RANGE_3_6|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 本函数要在调用adc.open之前就调用, 之后调用无效!!!

-- 关闭air105内部分压
adc.setRange(adc.ADC_RANGE_1_8)
-- 打开air105内部分压
adc.setRange(adc.ADC_RANGE_3_6)


-- Air780EXXX支持多种，但是建议用以下2种
adc.setRange(adc.ADC_RANGE_MIN) -- 关闭分压
adc.setRange(adc.ADC_RANGE_MAX) -- 启用分压

```

---

## adc.read(id)

读取adc通道

**参数**

|传入值类型|解释|
|-|-|
|int|通道id,与具体设备有关,通常从0开始|

**返回值**

|返回值类型|解释|
|-|-|
|int|原始值,一般没用,可以直接抛弃|
|int|从原始值换算得出的实际值，通常单位是mV|

**例子**

```lua
-- 打开adc通道2,并读取
if adc.open(2) then
    -- 这里使用的是adc.read会返回2个值, 推荐走adc.get函数,直接取实际值
    log.info("adc", adc.read(2))
end
adc.close(2)

```

---

## adc.get(id)

获取adc计算值

**参数**

|传入值类型|解释|
|-|-|
|int|通道id,与具体设备有关,通常从0开始|

**返回值**

|返回值类型|解释|
|-|-|
|int|单位通常是mV, 部分通道会返回温度值,单位千分之一摄氏度. 若读取失败,会返回-1|

**例子**

```lua
-- 本API 在 2022.10.01后编译的固件可用
-- 打开adc通道2,并读取
if adc.open(2) then
    log.info("adc", adc.get(2))
end
adc.close(2) -- 按需关闭

```

---

## adc.close(id)

关闭adc通道

**参数**

|传入值类型|解释|
|-|-|
|int|通道id,与具体设备有关,通常从0开始|

**返回值**

无

**例子**

```lua
-- 打开adc通道2,并读取
if adc.open(2) then
    log.info("adc", adc.read(2))
end
adc.close(2)

```

---

