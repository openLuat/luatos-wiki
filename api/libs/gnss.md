# gnss - gnss拓展库

**示例**

```lua
-- 用法实例
-- 提醒: 本库输出的坐标,均为 WGS84 坐标系
-- 如需要在国内地图使用, 要转换成对应地图的坐标系, 例如 GCJ02 BD09
-- 相关链接: https://lbsyun.baidu.com/index.php?title=coordinate
-- 相关链接: https://www.openluat.com/GPS-Offset.html

--关于GPS的三种应用场景：
gnss.DEFAULT:
--- GPS应用模式1.
--
-- 打开GPS后，GPS定位成功时，如果有回调函数，会调用回调函数
--
-- 使用此应用模式调用gnss.open打开的“GPS应用”，必须主动调用gnss.close或者gnss.closeAll才能关闭此“GPS应用”,主动关闭时，即使有回调函数，也不会调用回调函数
-- 通俗点说就是一直打开，除非自己手动关闭掉

gnss.TIMERORSUC:
--- GPS应用模式2.
--
-- 打开GPS后，如果在GPS开启最大时长到达时，没有定位成功，如果有回调函数，会调用回调函数，然后自动关闭此“GPS应用”
--
-- 打开GPS后，如果在GPS开启最大时长内，定位成功，如果有回调函数，会调用回调函数，然后自动关闭此“GPS应用”
--
-- 打开GPS后，在自动关闭此“GPS应用”前，可以调用gnss.close或者gnss.closeAll主动关闭此“GPS应用”，主动关闭时，即使有回调函数，也不会调用回调函数
-- 通俗点说就是设置规定时间打开，如果规定时间内定位成功就会关闭此应用，如果没有定位成功，时间到了也会关闭此应用

gnss.TIMER:
--- GPS应用模式3.
--
-- 打开GPS后，在GPS开启最大时长时间到达时，无论是否定位成功，如果有回调函数，会调用回调函数，然后自动关闭此“GPS应用”
--
-- 打开GPS后，在自动关闭此“GPS应用”前，可以调用gnss.close或者gnss.closeAll主动关闭此“GPS应用”，主动关闭时，即使有回调函数，也不会调用回调函数
-- 通俗点说就是设置规定时间打开，无论是否定位成功，到了时间都会关闭此应用，和第二种的区别在于定位成功之后不会关闭，到时间之后才会关闭

gnss=require("gnss")    

function test1Cb(val)
    log.info("TAG+++++++++",val)
    log.info("nmea", "rmc", json.encode(gnss.getRmc(2)))
end

function test2Cb(val)
    log.info("TAG+++++++++",val)
    log.info("nmea", "rmc", json.encode(gnss.getRmc(2)))
end

sys.taskInit(function()
    local gnssotps={
        gnssmode=1, --1为卫星全定位，2为单北斗
        agps_enable=true,    --是否使用AGPS，开启AGPS后定位速度更快，会访问服务器下载星历，星历时效性为北斗1小时，GPS4小时，默认下载星历的时间为1小时，即一小时内只会下载一次
        debug=true,    --是否输出调试信息
        -- uart=2,    --使用的串口,780EGH和8000默认串口2
        -- uartbaud=115200,    --串口波特率，780EGH和8000默认115200
        -- bind=1, --绑定uart端口进行GNSS数据读取，是否设置串口转发，指定串口号
        -- rtc=false    --定位成功后自动设置RTC true开启，flase关闭
    }
    gnss.setup(gnssotps)
    gnss.open(gnss.TIMER,{tag="TEST1",val=60,cb=test1Cb})
    gnss.open(gnss.TIMERORSUC,{tag="TEST3",val=60,cb=test2Cb})
    gnss.open(gnss.DEFAULT,{tag="TEST2",cb=test2Cb})
    sys.wait(40000)
    log.info("关闭定时器的")
    gnss.close(gnss.TIMER,{tag="TEST1"})
    log.info("定时器状态1",gnss.isActive(gnss.TIMER,{tag="TEST1"}))
    log.info("定时器状态2",gnss.isActive(gnss.DEFAULT,{tag="TEST2"}))
    log.info("定时器状态3",gnss.isActive(gnss.TIMERORSUC,{tag="TEST3"}))
    sys.wait(10000)
    gnss.closeAll()
    log.info("定时器状态1",gnss.isActive(gnss.TIMER,{tag="TEST1"}))
    log.info("定时器状态2",gnss.isActive(gnss.DEFAULT,{tag="TEST2"}))
    log.info("定时器状态3",gnss.isActive(gnss.TIMERORSUC,{tag="TEST3"}))
end)

sys.subscribe("GNSS_STATE", function(event, ticks)
    -- event取值有
    -- FIXED 定位成功
    -- LOSE  定位丢失
    -- ticks是事件发生的时间,一般可以忽略
    log.info("gnss", "state", event, ticks)
end)


```

## gnss.setup(opts)



设置gnss定位参数

**参数**

|传入值类型|解释|
|-|-|
|table|opts gnss定位参数，可选值gnssmode:定位卫星模式，1为卫星全定位，2为单北斗，默认为卫星全定位|

**返回值**

无

**例子**

无

---

## gnss.closeAll()



关闭所有“GPS应用”

**参数**

|传入值类型|解释|
|-|-|
|return|nil|

**返回值**

无

**例子**

```lua
gnss.open(gnss.TIMER,{tag="TEST1",val=60,cb=test1Cb})
gnss.open(gnss.TIMERORSUC,{tag="TEST3",val=60,cb=test2Cb})
gnss.open(gnss.DEFAULT,{tag="TEST2",cb=test2Cb})
gnss.closeAll()

```

---

## gnss.isActive(mode,para)



判断一个“GPS应用”是否处于激活状态

**参数**

|传入值类型|解释|
|-|-|
|number|mode GPS应用模式，支持gnss.DEFAULT，gnss.TIMERORSUC，gnss.TIMER三种|
|param|para table类型，GPS应用参数|

**返回值**

无

**例子**

无

---

## gnss.isFix()



当前是否已经定位成功

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|定位成功与否|

**例子**

```lua
log.info("nmea", "isFix", gnss.isFix())

```

---

## gnss.clear()



清除历史定位数据

**参数**

|传入值类型|解释|
|-|-|
|return|nil|

**返回值**

无

**例子**

```lua
gnss.clear()

```

---

## gnss.getIntLocation(speed_type)



获取位置信息

**参数**

|传入值类型|解释|
|-|-|
|number|速度单位,默认是m/h,|

**返回值**

无

**例子**

无

---

## gnss.getRmc(data_mode)



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
log.info("nmea", "rmc", json.encode(gnss.getRmc(2)))
-- 实例输出
-- {
--     "course":0,
--     "valid":true,   // true定位成功,false定位丢失
--     "lat":23.4067,  // 纬度, 正数为北纬, 负数为南纬
--     "lng":113.231,  // 经度, 正数为东经, 负数为西经
--     "variation":0,  // 地面航向，单位为度，从北向起顺时针计算
--     "speed":0       // 地面速度, 单位为"节"
--     "year":2023,    // 年份
--     "month":1,      // 月份, 1-12
--     "day":5,        // 月份天, 1-31
--     "hour":7,       // 小时,0-23
--     "min":23,       // 分钟,0-59
--     "sec":20,       // 秒,0-59
-- }

```

---

## gnss.getGsv()



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
log.info("nmea", "gsv", json.encode(gnss.getGsv()))
-- 实例输出
-- {
--     "total_sats":24,      // 总可见卫星数量
--     "sats":[
--         {
--             "snr":27,     // 信噪比
--             "azimuth":278, // 方向角
--             "elevation":59, // 仰角
--             "tp":0,        // 0 - GPS, 1 - BD
--             "nr":4         // 卫星编号
--         },
--         // 这里忽略了22个卫星的信息
--         {
--             "snr":0,
--             "azimuth":107,
--             "elevation":19,
--             "tp":1,
--             "nr":31
--         }
--     ]
-- }

```

---

## gnss.getGsa(data_mode)



获取原始GSA信息

**参数**

|传入值类型|解释|
|-|-|
|int|模式，默认为0 -所有卫星系统全部输出在一起，1 - 每个卫星系统单独分开输出|

**返回值**

|返回值类型|解释|
|-|-|
|table|原始GSA数据|

**例子**

```lua
-- 获取
log.info("nmea", "gsa", json.encode(gnss.getGsa(), "11g"))
-- 示例数据(模式0, 也就是默认模式)
--sysid:1为GPS，4为北斗，2为GLONASS，3为Galileo
{"pdop":1.5169999600,"sats":[18,12,25,10,24,23,15,6,24,39,43,16,9,21,13,1,14],"vdop":1.2760000230,"hdop":0.81999999300,"sysid":1,"fix_type":3}

--模式1
   [{"pdop":1.5169999600,"sats":[18,12,25,10,24,23,15],"vdop":1.2760000230,"hdop":0.81999999300,"sysid":1,"fix_type":3},
   {"pdop":1.5169999600,"sats":[6,24,39,43,16,9,21,13,1,14],"vdop":1.2760000230,"hdop":0.81999999300,"sysid":4,"fix_type":3},
   {"pdop":1.5169999600,"sats":{},"vdop":1.2760000230,"hdop":0.81999999300,"sysid":2,"fix_type":3},
   {"pdop":1.5169999600,"sats":{},"vdop":1.2760000230,"hdop":0.81999999300,"sysid":3,"fix_type":3}]

```

---

## gnss.getVtg(data_mode)



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
log.info("nmea", "vtg", json.encode(gnss.getVtg()))
-- 示例
--[[
{
    "speed_knots":0,        // 速度, 英里/小时
    "true_track_degrees":0,  // 真北方向角
    "magnetic_track_degrees":0, // 磁北方向角
    "speed_kph":0           // 速度, 千米/小时
}

--模式3
log.info("nmea", "vtg", json.encode(gnss.getVtg(3)))
返回值："$GNVTG,0.000,T,,M,0.000,N,0.000,K,A*13\r"
-- 提醒: 在速度<5km/h时, 不会返回方向角

```

---

## gnss.getZda()



获取原始ZDA时间和日期信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|原始zda数据|

**例子**

```lua
log.info("nmea", "zda", json.encode(gnss.getZda()))
-- 实例输出
-- {
--     "minute_offset":0,   // 本地时区的分钟, 一般固定输出0
--     "hour_offset":0,     // 本地时区的小时, 一般固定输出0
--     "year":2023         // UTC 年，四位数字
--     "month":1,          // UTC 月，两位，01 ~ 12
--     "day":5,            // UTC 日，两位数字，01 ~ 31
--     "hour":7,           // 小时
--     "min":50,           // 分
--     "sec":14,           // 秒
-- }

```

---

## gnss.getGga(data_mode)



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
local gga = gnss.getGga(2)
if gga then
    log.info("GGA", json.encode(gga, "11g"))
end
--实例输出
-- {
--     "dgps_age":0,             // 差分校正时延，单位为秒
--     "fix_quality":1,          // 定位状态标识 0 - 无效,1 - 单点定位,2 - 差分定位
--     "satellites_tracked":14,  // 参与定位的卫星数量
--     "altitude":0.255,         // 海平面分离度, 或者成为海拔, 单位是米,
--     "hdop":0.0335,            // 水平精度因子，0.00 - 99.99，不定位时值为 99.99
--     "longitude":113.231,      // 经度, 正数为东经, 负数为西经
--     "latitude":23.4067,       // 纬度, 正数为北纬, 负数为南纬
--     "height":0                // 椭球高，固定输出 1 位小数
-- }

```

---

## gnss.getGll(data_mode)



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
local gll = gnss.getGll(2)
if gll then
    log.info("GLL", json.encode(gll, "11g"))
end
-- 实例数据
-- {
--     "status":"A",        // 定位状态, A有效, B无效
--     "mode":"A",          // 定位模式, V无效, A单点解, D差分解
--     "sec":20,            // 秒, UTC时间为准
--     "min":23,            // 分钟, UTC时间为准
--     "hour":7,            // 小时, UTC时间为准
--     "longitude":113.231, // 经度, 正数为东经, 负数为西经
--     "latitude":23.4067,  // 纬度, 正数为北纬, 负数为南纬
--     "us":0               // 微妙数, 通常为0
-- }

```

---

## libgnss.locStr(mode)



获取位置字符串

**参数**

|传入值类型|解释|
|-|-|
|int|字符串模式. 0- "DDMM.MMM,N,DDMMM.MM,E,1.0",1 - DDDDDDD格式|
|return|指定模式的字符串|

**返回值**

无

**例子**

```lua
-- 仅推荐在定位成功后调用
log.info("nmea", "locStr0", json.encode(gnss.locStr(0)))
log.info("nmea", "locStr1", json.encode(gnss.locStr(1)))
-- 实例数据
locStr0    "3434.801,N,11350.40,E,1.0"
locStr1    "343480057,1135040025"

```

---

