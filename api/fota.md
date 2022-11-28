# fota - 底层固件升级

{bdg-primary}`Air105`

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
|成功返回true,|失败返回false|

**例子**

```lua
-- 初始化fota流程
local result = mcu.fotaInit(0, 0x00300000, spi_device)	--由于105的flash从0x01000000开始，所以0就是外部spiflash
local result = mcu.fotaInit()	--ec618使用固定内部地址，所以不需要参数了

```

---

## fota.fotaWait()

等待底层fota流程准备好，目前只有105能使用

**参数**

|传入值类型|解释|
|-|-|
|boolean|是否完整走完流程，true 表示正确走完流程了|

**返回值**

无

**例子**

无

---

## fota.fotaRun(buff)

写入fota数据，目前只有105能使用

**参数**

|传入值类型|解释|
|-|-|
|zbuff/string|fota数据，尽量用zbuff，如果传入的是zbuff，写入成功后，自动清空zbuff内的数据|

**返回值**

无

**例子**

无

---

## fota.fotaDone()

等待底层fota流程完成，目前只有105能使用

**参数**

|传入值类型|解释|
|-|-|
|boolean|是否完整走完流程，true 表示正确走完流程了|

**返回值**

无

**例子**

无

---

## fota.fotaEnd(is_ok)

结束fota流程，目前只有105能使用

**参数**

|传入值类型|解释|
|-|-|
|boolean|是否完整走完流程，true 表示正确走完流程了|

**返回值**

|返回值类型|解释|
|-|-|
|成功返回true,|失败返回false|

**例子**

```lua
-- 结束fota流程
local result = mcu.fotaEnd(true)

```

---

