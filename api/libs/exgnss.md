# exgnss - exgnss扩展库

**示例**

```lua
-- 用法实例
-- 注意：exgnss.lua适用的产品范围，只能用于合宙内部集成GNSS功能的产品，目前有Air780EGH，Air8000系列
-- 提醒: 本库输出的坐标,均为 WGS84 坐标系
-- 如需要在国内地图使用, 要转换成对应地图的坐标系, 例如 GCJ02 BD09
-- 相关链接: https://lbsyun.baidu.com/index.php?title=coordinate
-- 相关链接: https://www.openluat.com/GPS-Offset.html

--关于exgnss的三种应用场景：
exgnss.DEFAULT:
--- exgnss应用模式1.
-- 打开gnss后，gnss定位成功时，如果有回调函数，会调用回调函数
-- 使用此应用模式调用exgnss.open打开的“gnss应用”，必须主动调用exgnss.close
-- 或者exgnss.close_all才能关闭此“gnss应用”,主动关闭时，即使有回调函数，也不会调用回调函数
-- 通俗点说就是一直打开，除非自己手动关闭掉

exgnss.TIMERORSUC:
--- exgnss应用模式2.
-- 打开gnss后，如果在gnss开启最大时长到达时，没有定位成功，如果有回调函数，
-- 会调用回调函数，然后自动关闭此“gnss应用”
-- 打开gnss后，如果在gnss开启最大时长内，定位成功，如果有回调函数，
-- 会调用回调函数，然后自动关闭此“gnss应用”
-- 打开gnss后，在自动关闭此“gnss应用”前，可以调用exgnss.close或者
-- exgnss.close_all主动关闭此“gnss应用”，主动关闭时，即使有回调函数，也不会调用回调函数
-- 通俗点说就是设置规定时间打开，如果规定时间内定位成功就会自动关闭此应用，
-- 如果没有定位成功，时间到了也会自动关闭此应用

exgnss.TIMER:
--- exgnss应用模式3.
-- 打开gnss后，在gnss开启最大时长时间到达时，无论是否定位成功，如果有回调函数，
-- 会调用回调函数，然后自动关闭此“gnss应用”
-- 打开gnss后，在自动关闭此“gnss应用”前，可以调用exgnss.close或者exgnss.close_all
-- 主动关闭此“gnss应用”，主动关闭时，即使有回调函数，也不会调用回调函数
-- 通俗点说就是设置规定时间打开，无论是否定位成功，到了时间都会自动关闭此应用，
-- 和第二种的区别在于定位成功之后不会自动关闭，到时间之后才会自动关闭

exgnss=require("exgnss")    

local function mode1_cb(tag)
    log.info("TAGmode1_cb+++++++++",tag)
    log.info("nmea", "rmc", json.encode(exgnss.rmc(2)))
end

local function mode2_cb(tag)
    log.info("TAGmode2_cb+++++++++",tag)
    log.info("nmea", "rmc", json.encode(exgnss.rmc(2)))
end

local function mode3_cb(tag)
    log.info("TAGmode3_cb+++++++++",tag)
    log.info("nmea", "rmc", json.encode(exgnss.rmc(2)))
end

local function gnss_fnc()
    local gnssotps={
        gnssmode=1, --1为卫星全定位，2为单北斗
        agps_enable=true,    --是否使用AGPS，开启AGPS后定位速度更快，会访问服务器下载星历，星历时效性为北斗1小时，GPS4小时，默认下载星历的时间为1小时，即一小时内只会下载一次
        debug=true,    --是否输出调试信息
        -- uart=2,    --使用的串口,780EGH和8000默认串口2
        -- uartbaud=115200,    --串口波特率，780EGH和8000默认115200
        -- bind=1, --绑定uart端口进行GNSS数据读取，是否设置串口转发，指定串口号
        -- rtc=false    --定位成功后自动设置RTC true开启，flase关闭
         ----因为GNSS使用辅助定位的逻辑，是模块下载星历文件，然后把数据发送给GNSS芯片，
        ----芯片解析星历文件需要10-30s，默认GNSS会开启20s，该逻辑如果不执行，会导致下一次GNSS开启定位是冷启动，
        ----定位速度慢，大概35S左右，所以默认开启，如果可以接受下一次定位是冷启动，可以把auto_open设置成false
        ----需要注意的是热启动在定位成功之后，需要再开启3s左右才能保证本次的星历获取完成，如果对定位速度有要求，建议这么处理
        -- auto_open=false 
    }
    --设置gnss参数
    exgnss.setup(gnssotps)
    --开启gnss应用
    exgnss.open(exgnss.TIMER,{tag="MODE1",val=60,cb=mode1_cb})
    exgnss.open(exgnss.DEFAULT,{tag="MODE2",cb=mode2_cb})
    exgnss.open(exgnss.TIMERORSUC,{tag="MODE3",val=60,cb=mode3_cb})
    sys.wait(40000)
    log.info("关闭一个gnss应用，然后查看下所有应用的状态")
    --关闭一个gnss应用
    exgnss.close(exgnss.TIMER,{tag="MODE1"})
    --查询3个gnss应用状态
    log.info("gnss应用状态1",exgnss.is_active(exgnss.TIMER,{tag="MODE1"}))
    log.info("gnss应用状态2",exgnss.is_active(exgnss.DEFAULT,{tag="MODE2"}))
    log.info("gnss应用状态3",exgnss.is_active(exgnss.TIMERORSUC,{tag="MODE3"}))
    sys.wait(10000)
    --关闭所有gnss应用
    exgnss.close_all()
    --查询3个gnss应用状态
    log.info("gnss应用状态1",exgnss.is_active(exgnss.TIMER,{tag="MODE1"}))
    log.info("gnss应用状态2",exgnss.is_active(exgnss.DEFAULT,{tag="MODE2"}))
    log.info("gnss应用状态3",exgnss.is_active(exgnss.TIMERORSUC,{tag="MODE3"}))
    --查询最后一次定位结果
    local loc= exgnss.last_loc()
    if loc then
        log.info("lastloc", loc.lat,loc.lng)
    end
end

sys.taskInit(gnss_fnc)


--GNSS定位状态的消息处理函数：
local function gnss_state(event, ticks)
    -- event取值有
    -- "FIXED"：string类型 定位成功
    -- "LOSE"： string类型 定位丢失
    -- "CLOSE": string类型 GNSS关闭，仅配合使用gnss.lua有效

    -- ticks number类型 是事件发生的时间,一般可以忽略
    log.info("exgnss", "state", event)
end
sys.subscribe("GNSS_STATE",gnss_state)


```

## exgnss.setup(opts)

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

## exgnss.open(mode,para)

打开一个“gnss应用”

**参数**

|传入值类型|解释|
|-|-|
|number|mode gnss应用模式，支持gnss.DEFAULT，gnss.TIMERORSUC，gnss.TIMER三种|
|param|para table类型，gnss应用参数,para.tag：string类型，gnss应用标记,para.val：number类型，gnss应用开启最大时长，单位：秒，mode参数为gnss.TIMERORSUC或者gnss.TIMER时，此值才有意义；使用close接口时，不需要传入此参数,para.cb：gnss应用结束时的回调函数，回调函数的调用形式为para.cb(para.tag)；使用close接口时，不需要传入此参数|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- “gnss应用”：指的是使用gnss功能的一个应用
-- 例如，假设有如下3种需求，要打开gnss，则一共有3个“gnss应用”：
-- “gnss应用1”：每隔1分钟打开一次gnss
-- “gnss应用2”：设备发生震动时打开gnss
-- “gnss应用3”：收到一条特殊短信时打开gnss
-- 只有所有“gnss应用”都关闭了，才会去真正关闭gnss
-- 每个“gnss应用”打开或者关闭gnss时，最多有4个参数，其中 gnss应用模式和gnss应用标记 共同决定了一个唯一的“gnss应用”：
-- 1、gnss应用模式(必选)
-- 2、gnss应用标记(必选)
-- 3、gnss开启最大时长[可选]
-- 4、回调函数[可选]
-- 例如gnss.open(exgnss.TIMER,{tag="MODE1",val=60,cb=mode1_cb})
-- exgnss.TIMER为gnss应用模式，"MODE1"为gnss应用标记，60秒为gnss开启最大时长，mode1_cb为回调函数
exgnss.open(exgnss.TIMER,{tag="MODE1",val=60,cb=mode1_cb})
exgnss.open(exgnss.DEFAULT,{tag="MODE2",cb=mode2_cb})
exgnss.open(exgnss.TIMERORSUC,{tag="MODE3",val=60,cb=mode3_cb})

```

---

## exgnss.close()

关闭一个“gnss应用”，只是从逻辑上关闭一个gnss应用，并不一定真正关闭gnss，是有所有的gnss应用都处于关闭状态，才会去真正关闭gnss

**参数**

|传入值类型|解释|
|-|-|
|number|mode gnss应用模式，支持gnss.DEFAULT，gnss.TIMERORSUC，gnss.TIMER三种|
|param|para table类型，gnss应用参数,para.tag：string类型，gnss应用标记,para.val：number类型，gnss应用开启最大时长，单位：秒，mode参数为gnss.TIMERORSUC或者gnss.TIMER时，此值才有意义；使用close接口时，不需要传入此参数,para.cb：gnss应用结束时的回调函数，回调函数的调用形式为para.cb(para.tag)；使用close接口时，不需要传入此参数|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
exgnss.open(exgnss.TIMER,{tag="MODE1",val=60,cb=mode1_cb})
exgnss.close(exgnss.TIMER,{tag="MODE1"})

```

---

## exgnss.close_all()

关闭所有“gnss应用”

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
exgnss.open(exgnss.TIMER,{tag="MODE1",val=60,cb=mode1_cb})
exgnss.open(exgnss.DEFAULT,{tag="MODE2",cb=mode2_cb})
exgnss.open(exgnss.TIMERORSUC,{tag="MODE3",val=60,cb=mode3_cb})
exgnss.close_all()

```

---

## exgnss.is_active(mode,para)

判断一个“gnss应用”是否处于激活状态

**参数**

|传入值类型|解释|
|-|-|
|number|mode gnss应用模式，支持gnss.DEFAULT，gnss.TIMERORSUC，gnss.TIMER三种|
|param|para table类型，gnss应用参数,para.tag：string类型，gnss应用标记,para.val：number类型，gnss应用开启最大时长，单位：秒，mode参数为gnss.TIMERORSUC或者gnss.TIMER时，此值才有意义；使用close接口时，不需要传入此参数,para.cb：gnss应用结束时的回调函数，回调函数的调用形式为para.cb(para.tag)；使用close接口时，不需要传入此参数,gnss应用模式和gnss应用标记唯一确定一个“gnss应用”，调用本接口查询状态时，mode和para.tag要和gnss.open打开一个“gnss应用”时传入的mode和para.tag保持一致|

**返回值**

|返回值类型|解释|
|-|-|
|bool|result，处于激活状态返回true，否则返回nil|

**例子**

```lua
exgnss.open(exgnss.TIMER,{tag="MODE1",val=60,cb=mode1_cb})
exgnss.open(exgnss.DEFAULT,{tag="MODE2",cb=mode2_cb})
exgnss.open(exgnss.TIMERORSUC,{tag="MODE3",val=60,cb=mode3_cb})
log.info("gnss应用状态1",exgnss.is_active(exgnss.TIMER,{tag="MODE1"}))
log.info("gnss应用状态2",exgnss.is_active(exgnss.DEFAULT,{tag="MODE2"}))
log.info("gnss应用状态3",exgnss.is_active(exgnss.TIMERORSUC,{tag="MODE3"}))

```

---

## exgnss.is_fix()

当前是否已经定位成功

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true/false，定位成功返回true，否则返回false|

**例子**

```lua
log.info("nmea", "is_fix", exgnss.is_fix())

```

---

## exgnss.int_location(speed_type)

获取number类型的位置和速度信息

**参数**

|传入值类型|解释|
|-|-|
|number|速度单位,默认是m/h,|

**返回值**

无

**例子**

无

---

## exgnss.rmc(lnglat_mode)

获取RMC的信息，经纬度，时间，速度，航向，定位是否有效，磁偏角

**参数**

|传入值类型|解释|
|-|-|
|number|经纬度数据的格式, 0-ddmm.mmmmm格式, 1-DDDDDDDDD格式, 2-DD.DDDDDDD格式, 3-原始RMC字符串|

**返回值**

|返回值类型|解释|
|-|-|
|table/string|rmc数据|

**例子**

```lua
-- 解析nmea
log.info("nmea", "rmc", json.encode(exgnss.rmc(2)))
-- 实例输出,获取值的解释
-- {
--     "course":344.9920044,     // 地面航向，单位为度，从北向起顺时针计算
--     "valid":true,   // true定位成功,false定位丢失
--     "lat":34.5804405,  // 纬度, 正数为北纬, 负数为南纬
--     "lng":113.8399506,  // 经度, 正数为东经, 负数为西经
--     "variation":0,  // 磁偏角，固定为0
--     "speed":0.2110000       // 地面速度, 单位为"节"
--     "year":2023,    // 年份
--     "month":1,      // 月份, 1-12
--     "day":5,        // 月份天, 1-31
--     "hour":7,       // 小时,0-23
--     "min":23,       // 分钟,0-59
--     "sec":20,       // 秒,0-59
-- }
--模式0示例：
--json.encode默认输出"7f"格式保留7位小数，可以根据自己需要的格式调整小数位，本示例保留5位小数
log.info("nmea", "rmc0", json.encode(exgnss.rmc(0),"5f"))
{"variation":0,"lat":3434.82666,"min":54,"valid":true,"day":17,"lng":11350.39746,"speed":0.21100,"year":2025,"month":7,"sec":30,"hour":11,"course":344.99200}
--模式1示例：
--DDDDDDDDD格式是由DD.DDDDDDD*10000000转换而来，目的是作为整数，方便某些场景使用
log.info("nmea", "rmc1", json.encode(exgnss.rmc(1)))
{"variation":0,"lat":345804414,"min":54,"valid":true,"day":17,"lng":1138399500,"speed":0.2110000,"year":2025,"month":7,"sec":30,"hour":11,"course":344.9920044}
--模式2示例：
--json.encode默认输出"7f"格式保留7位小数，可以根据自己需要的格式调整小数位
log.info("nmea", "rmc2", json.encode(exgnss.rmc(2)))
{"variation":0,"lat":34.5804405,"min":54,"valid":true,"day":17,"lng":113.8399506,"speed":0.2110000,"year":2025,"month":7,"sec":30,"hour":11,"course":344.9920044}
--模式3示例：
log.info("nmea", "rmc3", exgnss.rmc(3))
$GNRMC,115430.000,A,3434.82649,N,11350.39700,E,0.211,344.992,170725,,,A,S*02\r

```

---

## exgnss.gsv()

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
log.info("nmea", "gsv", json.encode(exgnss.gsv()))
-- 实例输出
-- {
--     "total_sats":24,      // 总可见卫星数量
--     "sats":[
--         {
--             "snr":27,     // 信噪比
--             "azimuth":278, // 方向角
--             "elevation":59, // 仰角
--             "tp":0,        // 0 - GPS, 1 - BD, 2 - GLONASS, 3 - Galileo, 4 - QZSS
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

## exgnss.gsa(data_mode)

获取原始GSA信息

**参数**

|传入值类型|解释|
|-|-|
|number|模式，默认为0 -所有卫星系统全部输出在一起，1 - 每个卫星系统单独分开输出|

**返回值**

|返回值类型|解释|
|-|-|
|table|原始GSA数据|

**例子**

```lua
-- 获取
log.info("nmea", "gsa", json.encode(exgnss.gsa()))
-- 示例数据(模式0, 也就是默认模式)
--sysid:1为GPS，4为北斗，2为GLONASS，3为Galileo
{"pdop":1.1770000,  位置精度因子，0.00 - 99.99，不定位时值为 99.99
"sats":[15,13,5,18,23,20,24,30,24,13,33,38,8,14,28,41,6,39,25,16,32,27],    // 正在使用的卫星编号
"vdop":1.0160000,   垂直精度因子，0.00 - 99.99，不定位时值为 99.99
"hdop":0.5940000,   // 水平精度因子，0.00 - 99.99，不定位时值为 99.99
"sysid":1,         // 卫星系统编号1为GPS，4为北斗，2为GLONASS，3为Galileo
"fix_type":3       // 定位模式, 1-未定位, 2-2D定位, 3-3D定位
}

--模式1
log.info("nmea", "gsa", json.encode(exgnss.gsa()))

[{"pdop":1.1770000,"sats":[15,13,5,18,23,20,24],"vdop":1.0160000,"hdop":0.5940000,"sysid":1,"fix_type":3},
{"pdop":1.1770000,"sats":[30,24,13,33,38,8,14,28,41,6,39,25],"vdop":1.0160000,"hdop":0.5940000,"sysid":4,"fix_type":3},
{"pdop":1.1770000,"sats":[16,32,27],"vdop":1.0160000,"hdop":0.5940000,"sysid":4,"fix_type":3},
{"pdop":1.1770000,"sats":{},"vdop":1.0160000,"hdop":0.5940000,"sysid":2,"fix_type":3},
{"pdop":1.1770000,"sats":{},"vdop":1.0160000,"hdop":0.5940000,"sysid":3,"fix_type":3}]


```

---

## exgnss.vtg(data_mode)

获取VTG速度信息

**参数**

|传入值类型|解释|
|-|-|
|number|可选, 3-原始字符串, 不传或者传其他值, 则返回浮点值|

**返回值**

|返回值类型|解释|
|-|-|
|table/string|原始VTG数据|

**例子**

```lua
-- 解析nmea
log.info("nmea", "vtg", json.encode(exgnss.vtg()))
-- 示例
{
    "speed_knots":0,        // 速度, 英里/小时
    "true_track_degrees":0,  // 真北方向角
    "magnetic_track_degrees":0, // 磁北方向角
    "speed_kph":0           // 速度, 千米/小时
}

--模式3
log.info("nmea", "vtg", exgnss.vtg(3))
-- 返回值：$GNVTG,0.000,T,,M,0.000,N,0.000,K,A*13\r
-- 提醒: 在速度<5km/h时, 不会返回方向角

```

---

## exgnss.zda()

获取原始ZDA时间和日期信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|原始zda数据|

**例子**

```lua
log.info("nmea", "zda", json.encode(exgnss.zda()))
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

## exgnss.gga(lnglat_mode)

获取GGA数据

**参数**

|传入值类型|解释|
|-|-|
|number|经纬度数据的格式, 0-ddmm.mmmmm格式, 1-DDDDDDDDD格式, 2-DD.DDDDDDD格式, 3-原始GGA字符串|

**返回值**

|返回值类型|解释|
|-|-|
|table|GGA数据, 若如不存在会返回nil|

**例子**

```lua
local gga = exgnss.gga(2)
log.info("GGA", json.encode(gga, "11g"))
--实例输出,获取值的解释:
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
模式0示例：
json.encode默认输出"7f"格式保留7位小数，可以根据自己需要的格式调整小数位，本示例保留5位小数
local gga = exgnss.gga(0)
if gga then
    log.info("GGA0", json.encode(gga, "5f"))
end
{"longitude":11419.19531,"dgps_age":0,"altitude":86.40000,"hdop":0.59400,"height":-13.70000,"fix_quality":1,"satellites_tracked":22,"latitude":3447.86914}
模式1示例：
DDDDDDDDD格式是由DD.DDDDDDD*10000000转换而来，目的是作为整数，方便某些场景使用
local gga1 = exgnss.gga(1)
if gga1 then
    log.info("GGA1", json.encode(gga1))
end
{"longitude":1143199103,"dgps_age":0,"altitude":86.4000015,"hdop":0.5940000,"height":-13.6999998,"fix_quality":1,"satellites_tracked":22,"latitude":347978178}
模式2示例：
json.encode默认输出"7f"格式保留7位小数，可以根据自己需要的格式调整小数位
local gga2 = exgnss.gga(2)
if gga2 then
    log.info("GGA2", json.encode(gga2))
end
{"longitude":114.3199081,"dgps_age":0,"altitude":86.4000015,"hdop":0.5940000,"height":-13.6999998,"fix_quality":1,"satellites_tracked":22,"latitude":34.7978172}
模式3示例：
local gga3 = exgnss.gga(3)
if gga3 then
    log.info("GGA3", gga3)
end
$GNGGA,131241.000,3434.81372,N,11350.39930,E,1,05,4.924,165.5,M,-15.2,M,,*6D\r

```

---

## exgnss.gll(data_mode)

获取GLL数据

**参数**

|传入值类型|解释|
|-|-|
|number|经纬度数据的格式, 0-ddmm.mmmmm格式, 1-DDDDDDDDD格式, 2-DD.DDDDDDD格式|

**返回值**

|返回值类型|解释|
|-|-|
|table|GLL数据, 若如不存在会返回nil|

**例子**

```lua
local gll = exgnss.gll(2)
if gll then
    log.info("GLL", json.encode(gll, "11g"))
end
-- 实例数据,获取值的解释:
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
--模式0示例：
--json.encode默认输出"7f"格式保留7位小数，可以根据自己需要的格式调整小数位，本示例保留5位小数
local gll = exgnss.gll(0)
if gll then
    log.info("GLL0", json.encode(gll, "5f"))
end
{"longitude":11419.19531,"sec":14,"min":32,"mode":"A","hour":6,"us":0,"status":"A","latitude":3447.86914}
--模式1示例：
--DDDDDDDDD格式是由DD.DDDDDDD*10000000转换而来，目的是作为整数，方便某些场景使用
local gll1 = exgnss.gll(1)
if gll1 then
    log.info("GLL1", json.encode(gll1))
end
{"longitude":1143199103,"sec":14,"min":32,"mode":"A","hour":6,"us":0,"status":"A","latitude":347978178}
模式2示例：
--json.encode默认输出"7f"格式保留7位小数，可以根据自己需要的格式调整小数位
local gll2 = exgnss.gll(2)
if gll2 then
    log.info("GLL2", json.encode(gll2))
end
{"longitude":114.3199081,"sec":14,"min":32,"mode":"A","hour":6,"us":0,"status":"A","latitude":34.7978172}

```

---

## exgnss.last_loc()

获取最后的经纬度数据

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|经纬度数据，表里面的内容：{lat=ddmm.mmmmm0000,lng=ddmm.mmmmm0000},返回nil表示没有数据，此数据在定位成功，关闭gps时，会自动保存到文件系统中，定位成功之后每10分钟如果还处于定位成功状态会更新|

**例子**

```lua
local loc= exgnss.last_loc()
if loc then
    log.info("lastloc", loc.lat,loc.lng)
end
日志输出内容示例：
3447.8679200000 11419.196290000

```

---

