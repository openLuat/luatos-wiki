# libgnss - NMEA数据处理

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/packages/minmea/luat_lib_libgnss.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## libgnss.parse(str)

处理nmea数据

**参数**

|传入值类型|解释|
|-|-|
|string|原始nmea数据|

**返回值**

无

**例子**

```lua
-- 解析nmea
libgnss.parse(indata)
log.info("nmea", json.encode(libgnss.getRmc()))

```

---

## libgnss.isFix()

当前是否已经定位成功

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|定位成功与否|

**例子**

```lua
-- 解析nmea
libgnss.parse(indata)
log.info("nmea", "isFix", libgnss.isFix())

```

---

## libgnss.getIntLocation()

获取位置信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|lat数据, 格式为 ddmmmmmmm|
|int|lng数据, 格式为 ddmmmmmmm|
|int|speed数据|

**例子**

```lua
-- 解析nmea
libgnss.parse(indata)
log.info("nmea", "loc", libgnss.getIntLocation())

```

---

## libgnss.getRmc()

获取原始RMC位置信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|原始rmc数据|

**例子**

```lua
-- 解析nmea
libgnss.parse(indata)
log.info("nmea", "rmc", json.encode(libgnss.getRmc()))

```

---

## libgnss.getGsv()

获取原始GSV信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|原始GSV数据|

**例子**

```lua
-- 解析nmea
libgnss.parse(indata)
log.info("nmea", "gsv", json.encode(libgnss.getGsv()))

```

---

## libgnss.getGsa()

获取原始GSA信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|原始GSA数据|

**例子**

```lua
-- 解析nmea
libgnss.parse(indata)
log.info("nmea", "gsa", json.encode(libgnss.getGsa()))

```

---

## libgnss.getVtg()

获取原始VTA位置信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|原始VTA数据|

**例子**

```lua
-- 解析nmea
libgnss.parse(indata)
log.info("nmea", "vtg", json.encode(libgnss.getVtg()))

```

---

