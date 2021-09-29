# adc - 数模转换

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_adc.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

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
|int|计算后的值|

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

