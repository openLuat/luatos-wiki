# mcu - 封装mcu一些特殊操作

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_mcu.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## mcu.setClk(mhz)

设置主频,单位MHZ. 请注意,主频与外设主频有关联性, 例如主频2M时SPI的最高只能1M

**参数**

|传入值类型|解释|
|-|-|
|int|主频,根据设备的不同有不同的有效值,请查阅手册|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
-- 设置到80MHZ
mcu.setClk(80)
sys.wait(1000)
-- 设置到240MHZ
mcu.setClk(240)
sys.wait(1000)
-- 设置到2MHZ
mcu.setClk(2)
sys.wait(1000)

```

---

## mcu.getClk()

获取主频,单位MHZ.

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|若失败返回-1,否则返回主频数值,若等于0,可能处于32k晶振的省电模式|

**例子**

```lua
local mhz = mcu.getClk()
print("Boom", mhz)

```

---

## mcu.unique_id()

获取设备唯一id. 注意,可能包含不可见字符,如需查看建议toHex()后打印

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|设备唯一id.若不支持, 会返回空字符串.|

**例子**

```lua
local unique_id = mcu.unique_id()
print("unique_id", unique_id)

```

---

## mcu.ticks()

获取启动后的tick数,注意会出现溢出会出现负数

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前tick值|

**例子**

```lua
local tick = mcu.ticks()
print("ticks", tick)

```

---

## mcu.hz()

获取每秒的tick数量

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|每秒的tick数量|

**例子**

```lua
local tick = mcu.hz()
print("mcu.hz", hz)

```

---

