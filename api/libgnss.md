# libgnss - NMEA数据处理

**示例**

```lua
-- 提醒: 本库输出的坐标,均为 WGS84 坐标系
-- 如需要在国内地图使用, 要转换成对应地图的坐标系, 例如 GCJ02 BD09
-- 相关链接: https://lbsyun.baidu.com/index.php?title=coordinate
-- 相关链接: https://www.openluat.com/GPS-Offset.html

-- 提醒: GPS功能, GNSS功能, NMEA解析功能,均为当前库的子功能
-- 本库的主要功能就是解析NMEA协议, 支持内置GNSS也支持外置GNSS

-- 以下是使用本libgnss的示例代码
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
log.info("nmea", json.encode(libgnss.getRmc(), "11g"))

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
log.info("nmea", "isFix", libgnss.isFix())

```

---

## libgnss.getIntLocation(speed_type)

获取位置信息

**参数**

|传入值类型|解释|
|-|-|
|int|速度单位,默认是m/h|

**返回值**

|返回值类型|解释|
|-|-|
|int|lat数据, 格式为 ddddddddd|
|int|lng数据, 格式为 ddddddddd|
|int|speed数据, 单位米. 于2023.9.26修正|

**例子**

```lua
-- 建议用libgnss.getRmc(1)
log.info("nmea", "loc", libgnss.getIntLocation())

-- 2023.12.11 新增speed_type参数
--[[
速度单位可选值
0 - m/h 米/小时, 默认值, 整型
1 - m/s 米/秒, 浮点数
2 - km/h 千米/小时, 浮点数
3 - kn/h 英里/小时, 浮点数
]]
-- 默认 米/小时
log.info("nmea", "loc", libgnss.getIntLocation())
-- 米/秒
log.info("nmea", "loc", libgnss.getIntLocation(1))
-- 千米/小时
log.info("nmea", "loc", libgnss.getIntLocation(2))
-- 英里/小时
log.info("nmea", "loc", libgnss.getIntLocation(3))

```

---

## libgnss.getRmc(data_mode)

获取原始RMC位置信息

**参数**

|传入值类型|解释|
|-|-|
|int|坐标类数据的格式, 0-DDMM.MMM格式, 1-DDDDDDD格式, 2-DD.DDDDD格式, 3-原始RMC字符串|

**返回值**

|返回值类型|解释|
|-|-|
|table|原始rmc数据|

**例子**

```lua
-- 解析nmea
log.info("nmea", "rmc", json.encode(libgnss.getRmc(2)))
-- 实例输出
--[[
{
    "course":0,
    "valid":true,   // true定位成功,false定位丢失
    "lat":23.4067,  // 纬度, 正数为北纬, 负数为南纬
    "lng":113.231,  // 经度, 正数为东经, 负数为西经
    "variation":0,  // 地面航向，单位为度，从北向起顺时针计算
    "speed":0       // 地面速度, 单位为"节"
    "year":2023,    // 年份
    "month":1,      // 月份, 1-12
    "day":5,        // 月份天, 1-31
    "hour":7,       // 小时,0-23
    "min":23,       // 分钟,0-59
    "sec":20,       // 秒,0-59
}
]]

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
log.info("nmea", "gsv", json.encode(libgnss.getGsv()))
--[[实例输出
{
    "total_sats":24,      // 总可见卫星数量
    "sats":[
        {
            "snr":27,     // 信噪比
            "azimuth":278, // 方向角
            "elevation":59, // 仰角
            "tp":0,        // 0 - GPS, 1 - BD
            "nr":4         // 卫星编号
        },
        // 这里忽略了22个卫星的信息
        {
            "snr":0,
            "azimuth":107,
            "elevation":19,
            "tp":1,
            "nr":31
        }
    ]
}
]]

```

---

## libgnss.getGsa(data_mode)

获取原始GSA信息

**参数**

|传入值类型|解释|
|-|-|
|int|模式|

**返回值**

|返回值类型|解释|
|-|-|
|table|原始GSA数据|

**例子**

```lua
-- 获取
log.info("nmea", "gsa", json.encode(libgnss.getGsa(), "11g"))
-- 示例数据(模式0, 也就是默认模式)
--[[
{
    "sats":[ // 正在使用的卫星编号
        9,
        6,
        16,
        16,
        26,
        21,
        27,
        27,
        4,
        36,
        3,
        7,
        8,
        194
    ],
    "vdop":0.03083333, // 垂直精度因子，0.00 - 99.99，不定位时值为 99.99
    "pdop":0.0455,     // 水平精度因子，0.00 - 99.99，不定位时值为 99.99
    "fix_type":3,      // 定位模式, 1-未定位, 2-2D定位, 3-3D定位
    "hdop":0.0335      // 位置精度因子，0.00 - 99.99，不定位时值为 99.99
}
]]

-- 示例数据(模式1), 2024.5.26新增
[
    {"pdop":7.8299999,"sats":[13,15,18,23],"vdop":3.2400000,"hdop":7.1300001,"fix_type":3},
    {"pdop":7.8299999,"sats":[20,35,8,13],"vdop":3.2400000,"hdop":7.1300001,"fix_type":3}
]

```

---

## libgnss.getVtg(data_mode)

获取VTA速度信息

**参数**

|传入值类型|解释|
|-|-|
|int|可选, 3-原始字符串, 不传或者传其他值, 则返回浮点值|

**返回值**

|返回值类型|解释|
|-|-|
|table|原始VTA数据|

**例子**

```lua
-- 解析nmea
log.info("nmea", "vtg", json.encode(libgnss.getVtg()))
-- 示例
--[[
{
    "speed_knots":0,        // 速度, 英里/小时
    "true_track_degrees":0,  // 真北方向角
    "magnetic_track_degrees":0, // 磁北方向角
    "speed_kph":0           // 速度, 千米/小时
}
-- 提醒: Air780EG和Air510U,在速度<5km/h时, 不会返回方向角
]]

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
log.info("nmea", "zda", json.encode(libgnss.getZda()))
-- 实例输出
--[[
{
    "minute_offset":0,   // 本地时区的分钟, 一般固定输出0
    "hour_offset":0,     // 本地时区的小时, 一般固定输出0
    "year":2023         // UTC 年，四位数字
    "month":1,          // UTC 月，两位，01 ~ 12
    "day":5,            // UTC 日，两位数字，01 ~ 31
    "hour":7,           // 小时
    "min":50,           // 分
    "sec":14,           // 秒
}
]]

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
-- 开启调试, 会输出GNSS原始数据到日志中
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
|int|坐标类数据的格式, 0-DDMM.MMM格式, 1-DDDDDDD格式, 2-DD.DDDDD格式, 3-原始字符串|

**返回值**

|返回值类型|解释|
|-|-|
|table|GGA数据, 若如不存在会返回nil|

**例子**

```lua
local gga = libgnss.getGga(2)
if gga then
    log.info("GGA", json.encode(gga, "11g"))
end
--实例输出
--[[
{
    "dgps_age":0,             // 差分校正时延，单位为秒
    "fix_quality":1,          // 定位状态标识 0 - 无效,1 - 单点定位,2 - 差分定位
    "satellites_tracked":14,  // 参与定位的卫星数量
    "altitude":0.255,         // 海平面分离度, 或者成为海拔, 单位是米,
    "hdop":0.0335,            // 水平精度因子，0.00 - 99.99，不定位时值为 99.99
    "longitude":113.231,      // 经度, 正数为东经, 负数为西经
    "latitude":23.4067,       // 纬度, 正数为北纬, 负数为南纬
    "height":0                // 椭球高，固定输出 1 位小数
}
]]

```

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

```lua
local gll = libgnss.getGll(2)
if gll then
    log.info("GLL", json.encode(gll, "11g"))
end
-- 实例数据
--[[
{
    "status":"A",        // 定位状态, A有效, B无效
    "mode":"A",          // 定位模式, V无效, A单点解, D差分解
    "sec":20,            // 秒, UTC时间为准
    "min":23,            // 分钟, UTC时间为准
    "hour":7,            // 小时, UTC时间为准
    "longitude":113.231, // 经度, 正数为东经, 负数为西经
    "latitude":23.4067,  // 纬度, 正数为北纬, 负数为南纬
    "us":0               // 微妙数, 通常为0
}
]]

```

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

```lua
-- 该操作会清除所有定位数据

```

---

## libgnss.bind(id, next_id)

绑定uart端口进行GNSS数据读取

**参数**

|传入值类型|解释|
|-|-|
|int|uart端口号|
|int|转发到uart的id, 例如虚拟uart.VUART_0|

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

-- 2023-01-02之后编译的固件有效
-- 从uart2读取并解析, 同时转发到虚拟串口0
libgnss.bind(2, uart.VUART_0)

```

---

## libgnss.locStr(mode)

获取位置字符串

**参数**

|传入值类型|解释|
|-|-|
|int|字符串模式. 0- Air780EG所需的格式|
|return|指定模式的字符串|

**返回值**

无

**例子**

```lua
-- 仅推荐在定位成功后调用

```

---

## libgnss.rtcAuto(enable)

定位成功后自动设置RTC

**参数**

|传入值类型|解释|
|-|-|
|bool|开启与否, 默认是false关闭|

**返回值**

无

**例子**

```lua
-- 开启自动设置RTC
libgnss.rtcAuto(true)

```

---

## libgnss.on(tp, fn)

底层事件回调

**参数**

|传入值类型|解释|
|-|-|
|string|事件类型,当前支持"raw"|

**返回值**

无

**例子**

```lua
-- 本函数一般用于调试, 用于获取底层实际收到的数据
libgnss.on("raw", function(data)
    log.info("GNSS", data)
end)

```

---

## libgnss.getTxt()

获取非标的GPTXT数据

**参数**

|传入值类型|解释|
|-|-|
|return|GPTXT所携带的字符串|

**返回值**

无

**例子**

```lua
-- 本函数于2023.6.6 添加
log.info("gnss", "txt", libgnss.getTxt())

-- 测试语句
libgnss.parse("$GPTXT,01,01,01,ANTENNA SHORT*63\r\n")
log.info("GNSS", libgnss.getTxt())
libgnss.parse("$GPTXT,01,01,01,ANTENNA OPEN*25\r\n")
log.info("GNSS", libgnss.getTxt())
libgnss.parse("$GPTXT,01,01,01,ANTENNA OK*35\r\n")
log.info("GNSS", libgnss.getTxt())

```

---

## libgnss.casic_aid(dt, loc)

合成Air530Z所需要的辅助定位数据

**参数**

|传入值类型|解释|
|-|-|
|table|时间信息|
|table|经纬度及海拔|

**返回值**

|返回值类型|解释|
|-|-|
|string|辅助定位数据|

**例子**

```lua
-- 本函数适合CASIC系列GNSS模块的辅助定位信息的合成
-- 本函数 2023.11.14 新增

-- 首先是时间信息,注意是UTC时间
-- 时间来源很多, 一般建议socket.sntp()时间同步后的系统时间
local dt = os.date("!*t")

-- 然后是辅助定位坐标
-- 来源有很多方式:
-- 1. 从历史定位数据得到, 例如之前定位成功后保存到本地文件系统了
-- 2. 通过基站定位或者wifi定位获取到
-- 3. 通过IP定位获取到大概坐标
-- 坐标系是WGS84, 但鉴于是辅助定位,精度不是关键因素
local lla = {
    lat = 23.12,
    lng = 114.12
}

local aid = libgnss.casic_aid(dt, lla)

```

---

