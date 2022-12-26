# rtc - 实时时钟

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_rtc.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看rtc的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/rtc)
```

## rtc.set(tab)



设置时钟

**参数**

|传入值类型|解释|
|-|-|
|table|or int 时钟参数,见示例|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回nil或false|

**例子**

```lua
rtc.set({year=2021,mon=8,day=31,hour=17,min=8,sec=43})
rtc.set(1652230554)	--目前只有105支持时间戳方式

```

---

## rtc.get()



获取时钟

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|时钟参数,见示例|

**例子**

```lua
local t = rtc.get()
-- {year=2021,mon=8,day=31,hour=17,min=8,sec=43}
log.info("rtc", json.encode(t))

```

---

## rtc.timerStart(id, tab)



设置RTC唤醒时间

**参数**

|传入值类型|解释|
|-|-|
|int|时钟id,通常只支持0|
|table|时钟参数,见示例|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回nil或false|

**例子**

```lua
-- 使用前建议先rtc.set设置为正确的时间
rtc.timerStart(0, {year=2021,mon=9,day=1,hour=17,min=8,sec=43})

```

---

## rtc.timerStop(id)



取消RTC唤醒时间

**参数**

|传入值类型|解释|
|-|-|
|int|时钟id,通常只支持0|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回nil或false|

**例子**

```lua
rtc.timerStop(0)

```

---

## rtc.setBaseYear(Base_year)



设置RTC基准年

**参数**

|传入值类型|解释|
|-|-|
|int|基准年Base_year,通常1900|

**返回值**

无

**例子**

```lua
rtc.setBaseYear(1900)

```

---

