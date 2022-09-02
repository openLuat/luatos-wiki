# adc - 数模转换

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_adc.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

> 本库有专属demo，[点此链接查看adc的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/adc)

## 常量

|常量|类型|解释|
|-|-|-|
|adc.ADC_RANGE_3_6|number|air105的ADC分压电阻开启，范围0~3.76V|
|adc.ADC_RANGE_1_8|number|air105的ADC分压电阻关闭，范围0~1.88V|


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
-- 打开adc通道2,并读取
if adc.open(2) then
    log.info("adc", adc.read(2))
end
adc.close(2)

```

---

## adc.setRange(range)

设置ADC的测量范围，注意这个和具体芯片有关，目前只支持air105

**参数**

|传入值类型|解释|
|-|-|
|int|range参数,与具体设备有关,比如air105填adc.ADC_RANGE_1_8和adc.ADC_RANGE_3_6|
|return|nil|

**返回值**

无

**例子**

```lua
-- 关闭air105内部分压
adc.setRange(adc.ADC_RANGE_1_8)
-- 打开air105内部分压
adc.setRange(adc.ADC_RANGE_3_6)

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
|int|原始值|
|int|从原始值换算得出的电压值，通常单位是mV|

**例子**

```lua
-- 打开adc通道2,并读取
if adc.open(2) then
    log.info("adc", adc.read(2))
end
adc.close(2)

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

