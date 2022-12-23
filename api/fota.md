# fota - 底层固件升级

{bdg-success}`已适配` {bdg-primary}`Air105` {bdg-primary}`Air780`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_fota.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看fota的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/ota)
```

## fota.fotaInit(storge_location, len, param1)



初始化fota流程

**参数**

|传入值类型|解释|
|-|-|
|int/string|fota数据存储的起始位置<br>如果是int，则是由芯片平台具体判断<br>如果是string，则存储在文件系统中<br>如果为nil，则由底层决定存储位置|
|int|数据存储的最大空间|
|userdata|param1，如果数据存储在spiflash时,为spi_device|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true, 失败返回false|

**例子**

```lua
-- 初始化fota流程
local result = mcu.fotaInit(0, 0x00300000, spi_device)	--由于105的flash从0x01000000开始，所以0就是外部spiflash
local result = mcu.fotaInit()	--ec618使用固定内部地址，所以不需要参数了

```

---

## fota.fotaWait()



等待底层fota流程准备好

**参数**

|传入值类型|解释|
|-|-|
|boolean|是否完整走完流程，true 表示正确走完流程了|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|准备好返回true|

**例子**

```lua
local isDone = mcu.fotaWait()

```

---

## fota.fotaRun(buff)



写入fota数据

**参数**

|传入值类型|解释|
|-|-|
|zbuff/string|fota数据，尽量用zbuff，如果传入的是zbuff，写入成功后，自动清空zbuff内的数据|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|有异常返回true|
|boolean|接收到最后一块返回true|
|int|还未写入的数据量，超过64K必须做等待|

**例子**

```lua
local isError, isDone, cache = fota.fotaRun(buf) -- 写入fota流程

```

---

## fota.fotaDone()



等待底层fota流程完成

**参数**

|传入值类型|解释|
|-|-|
|boolean|是否完整走完流程，true 表示正确走完流程了|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|有异常返回true|
|boolean|写入到最后一块返回true|

**例子**

```lua
local isError, isDone = mcu.fotaDone()

```

---

## fota.fotaEnd(is_ok)



结束fota流程

**参数**

|传入值类型|解释|
|-|-|
|boolean|是否完整走完流程，true 表示正确走完流程了|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true, 失败返回false|

**例子**

```lua
-- 结束fota流程
local result = mcu.fotaEnd(true)

```

---

