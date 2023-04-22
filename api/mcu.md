# mcu - 封装mcu一些特殊操作

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3` {bdg-primary}`Air780E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_mcu.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


## mcu.setClk(mhz)



设置主频,单位MHZ

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
--  请注意,主频与外设主频有关联性, 例如主频2M时SPI的最高只能1M
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



获取主频,单位MHZ

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

## mcu.reg32(address, value, mask)



读写mcu的32bit寄存器或者ram,谨慎使用写功能,请熟悉mcu的寄存器使用方法后再使用

**参数**

|传入值类型|解释|
|-|-|
|int|寄存器或者ram地址|
|int|写入的值,如果没有,则直接返回当前值|
|int|位掩码,可以对特定几个位置的bit做修改, 默认0xffffffff,修改全部32bit|

**返回值**

|返回值类型|解释|
|-|-|
|int|返回当前寄存的值|

**例子**

```lua
local value = mcu.reg32(0x2009FFFC, 0x01, 0x01) --对0x2009FFFC地址上的值,修改bit0为1

```

---

## mcu.x32(value)



转换10进制数为16进制字符串输出

**参数**

|传入值类型|解释|
|-|-|
|int|需要转换的值|

**返回值**

|返回值类型|解释|
|-|-|
|string|16进制字符串|

**例子**

```lua
local value = mcu.x32(0x2009FFFC) --输出"0x2009fffc"

```

---

## mcu.tick64()



获取启动后的高精度tick，如果支持bit64库，可以直接输出转换好的bit64结构

**参数**

|传入值类型|解释|
|-|-|
|boolean|是否输出bit64结构,true是,其他都是false,留空也是false,用于兼容旧的demo|

**返回值**

|返回值类型|解释|
|-|-|
|string|当前tick值,8个字节的uint64,如果支持64bit库,同时要求输出64bit结构的话,会输出9字节的string|
|int|1us有几个tick,0表示未知|

**例子**

```lua
local tick_str, tick_per = mcu.tick64()
print("ticks", tick_str, tick_per)

```

---

## mcu.dtick64(tick1, tick2, check_value)



计算2个64bit tick的差值

**参数**

|传入值类型|解释|
|-|-|
|string|64bit的string|
|string|64bit的string|
|int|参考值,可选项,如果为0,则返回结果中第一个项目为true|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|与参考值比较,如果大于等于为true,反之为false|
|int|差值tick1 - tick2,如果超过了0x7fffffff,结果可能是错的|

**例子**

```lua
local result, diff_tick = mcu.dtick64(tick1, tick2)
print("ticks", result, diff_tick)

```

---

## mcu.setXTAL(source_main, source_32k, delay)



选择时钟源,当前仅air105支持

**参数**

|传入值类型|解释|
|-|-|
|boolean|高速时钟是否使用外部时钟源,如果为空则不改变|
|boolean|低速32K是否使用外部时钟源,如果为空则不改变|
|int|PLL稳定时间,在切换高速时钟的时候,根据硬件环境,需要delay一段时间等待PLL稳定,默认是1200,建议不小于1024|

**返回值**

无

**例子**

```lua
mcu.setXTAL(true, true, 1248)	--高速时钟使用外部时钟,低速32K使用外部晶振, delay1248

```

---

## mcu.hardfault(mode)



mcu死机时处理模式，目前只有EC618平台适用

**参数**

|传入值类型|解释|
|-|-|
|int|处理模式，0死机停机，1死机后重启，2死机后尽量将错误信息提交给外部工具后重启|

**返回值**

无

**例子**

```lua
mcu.hardfault(0)	--死机后停机，一般用于调试状态
mcu.hardfault(1)	--死机后重启，一般用于正式产品
mcu.hardfault(2)	--死机后尽量将错误信息提交给外部工具后重启，一般用于压力测试或者正式产品

```

---

