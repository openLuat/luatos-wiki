# libgnss - NMEA数据处理

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`Air780`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/minmea/luat_lib_libgnss.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看libgnss的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/libgnss)
```

**示例**

```lua
-- 方案1, 经lua层进行数据中转
uart.setup(2, 115200)
uart.on(2, "recv", function(id, len)
    while 1 do
        local data = uart.read(id, 1024)
        if data and #data > 1 then
            libgnss.parse(data)
        else
            break
        end
    end
end)
-- 方案2, 适合2022.12.26之后编译固件,效率更高一些
uart.setup(2, 115200)
libgnss.bind(2)

-- 可选调试模式
-- libgnss.debug(true)

sys.subscribe("GNSS_STATE", function(event, ticks)
    -- event取值有 
    -- FIXED 定位成功
    -- LOSE  定位丢失
    -- ticks是事件发生的时间,一般可以忽略
    log.info("gnss", "state", event, ticks)
end)

```

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
-- 解析nmea数据
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
|int|lat数据, 格式为 ddddddddd|
|int|lng数据, 格式为 ddddddddd|
|int|speed数据|

**例子**

```lua
-- 解析nmea
libgnss.parse(indata)
log.info("nmea", "loc", libgnss.getIntLocation())

```

---

## libgnss.getRmc(data_mode)



获取原始RMC位置信息

**参数**

|传入值类型|解释|
|-|-|
|int|坐标类数据的格式, 0-DDMM.MMM格式, 1-DDDDDDD格式, 2-DD.DDDDD格式|

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

## libgnss.getGsa(data_mode)



获取原始GSA信息

**参数**

|传入值类型|解释|
|-|-|
|int|坐标类数据的格式, 0-DDMM.MMM格式, 1-DDDDDDD格式, 2-DD.DDDDD格式|

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

## libgnss.getVtg(data_mode)



获取原始VTA位置信息

**参数**

|传入值类型|解释|
|-|-|
|int|坐标类数据的格式, 0-DDMM.MMM格式, 1-DDDDDDD格式, 2-DD.DDDDD格式|

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

## libgnss.getZda()



获取原始ZDA时间和日期信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|原始zda数据|

**例子**

```lua
-- 解析nmea
libgnss.parse(indata)
log.info("nmea", "zda", json.encode(libgnss.getZda()))

```

---

## libgnss.debug(mode)



设置调试模式

**参数**

|传入值类型|解释|
|-|-|
|bool|true开启调试,false关闭调试,默认为false|

**返回值**

无

**例子**

```lua
-- 开启调试
libgnss.debug(true)
-- 关闭调试
libgnss.debug(false)

```

---

## libgnss.getGga(data_mode)



获取GGA数据

**参数**

|传入值类型|解释|
|-|-|
|int|坐标类数据的格式, 0-DDMM.MMM格式, 1-DDDDDDD格式, 2-DD.DDDDD格式|

**返回值**

|返回值类型|解释|
|-|-|
|table|GGA数据, 若如不存在会返回nil|

**例子**

无

---

## libgnss.getGll(data_mode)



获取GLL数据

**参数**

|传入值类型|解释|
|-|-|
|int|坐标类数据的格式, 0-DDMM.MMM格式, 1-DDDDDDD格式, 2-DD.DDDDD格式|

**返回值**

|返回值类型|解释|
|-|-|
|table|GLL数据, 若如不存在会返回nil|

**例子**

无

---

## libgnss.clear()



清除历史定位数据

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## libgnss.bind(id)



绑定uart端口进行GNSS数据读取

**参数**

|传入值类型|解释|
|-|-|
|int|uart端口号|

**返回值**

无

**例子**

```lua
-- 配置串口信息, 通常为 115200 8N1
uart.setup(2, 115200)
-- 绑定uart, 马上开始解析GNSS数据
libgnss.bind(2)
-- 无需再调用uart.on然后调用libgnss.parse
-- 开发期可打开调试日志
libgnss.debug(true)

```

---

