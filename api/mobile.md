# mobile - 蜂窝网络

{bdg-success}`已适配` {bdg-primary}`Air780E/Air700E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/mobile/luat_lib_mobile.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看mobile的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/mobile)
```

**示例**

```lua
-- 简单演示

log.info("imei", mobile.imei())
log.info("imsi", mobile.imsi())
local sn = mobile.sn()
if sn then
    log.info("sn",   sn:toHex())
end
log.info("muid", mobile.muid())
log.info("iccid", mobile.iccid())
log.info("csq", mobile.csq())
log.info("rssi", mobile.rssi())
log.info("rsrq", mobile.rsrq())
log.info("rsrp", mobile.rsrp())
log.info("snr", mobile.snr())
log.info("simid", mobile.simid())

```

## 常量

|常量|类型|解释|
|-|-|-|
|mobile.UNREGISTER|number|未注册|
|mobile.REGISTERED|number|已注册|
|mobile.SEARCH|number|正在搜索中|
|mobile.DENIED|number|注册被拒绝|
|mobile.UNKNOW|number|未知|
|mobile.REGISTERED_ROAMING|number|已注册,漫游|
|mobile.SMS_ONLY_REGISTERED|number|已注册,仅SMS|
|mobile.SMS_ONLY_REGISTERED_ROAMING|number|已注册,漫游,仅SMS|
|mobile.EMERGENCY_REGISTERED|number|已注册,紧急服务|
|mobile.CSFB_NOT_PREFERRED_REGISTERED|number|已注册,非主要服务|
|mobile.CSFB_NOT_PREFERRED_REGISTERED_ROAMING|number|已注册,非主要服务,漫游|
|mobile.CONF_RESELTOWEAKNCELL|number|小区重选信号差值门限,需要飞行模式设置|
|mobile.CONF_STATICCONFIG|number|网络静态模式优化,需要飞行模式设置|
|mobile.CONF_QUALITYFIRST|number|网络切换以信号质量优先,需要飞行模式设置|
|mobile.CONF_USERDRXCYCLE|number|LTE跳paging,需要飞行模式设置,谨慎使用,0是不设置,1~7增大或减小DrxCycle周期倍数,1:1/8倍 2:1/4倍 3:1/2倍 4:2倍 5:4倍 6:8倍 7:16倍,8~12配置固定的DrxCycle周期,仅当该周期大于网络分配的DrxCycle周期时该配置才会生效,8:320ms 9:640ms 10:1280ms 11:2560ms 12:5120ms|
|mobile.CONF_T3324MAXVALUE|number|PSM模式中的T3324时间,单位S|
|mobile.CONF_PSM_MODE|number|PSM模式开关,0关,1开|
|mobile.CONF_CE_MODE|number|attach模式，0为EPS ONLY 2为混合，遇到IMSI detach脱网问题，设置为0，注意设置为EPS ONLY时会取消短信功能|
|mobile.PIN_VERIFY|number|验证PIN码操作|
|mobile.PIN_CHANGE|number|更换PIN码操作|
|mobile.PIN_ENABLE|number|使能PIN码验证|
|mobile.PIN_DISABLE|number|关闭PIN码验证|
|mobile.PIN_UNBLOCK|number|解锁PIN码|


## mobile.imei(index)



获取IMEI

**参数**

|传入值类型|解释|
|-|-|
|int|编号,默认0. 在支持双卡的模块上才会出现0或1的情况|

**返回值**

|返回值类型|解释|
|-|-|
|string|当前的IMEI值,若失败返回nil|

**例子**

无

---

## mobile.imsi(index)



获取IMSI

**参数**

|传入值类型|解释|
|-|-|
|int|编号,默认0. 在支持双卡的模块上才会出现0或1的情况|

**返回值**

|返回值类型|解释|
|-|-|
|string|当前的IMSI值,若失败返回nil|

**例子**

无

---

## mobile.sn()



获取SN

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|当前的SN值,若失败返回nil. 注意, SN可能包含不可见字符|

**例子**

```lua
-- 注意, 出厂未必有写SN
-- 一般用途的唯一id, 可以用mobile.imei()代替
-- 如需要真正的唯一ID, 使用 mcu.unique_id()

```

---

## mobile.muid()



获取MUID

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|当前的MUID值,若失败返回nil|

**例子**

无

---

## mobile.iccid(id)



获取或设置ICCID

**参数**

|传入值类型|解释|
|-|-|
|int|SIM卡的编号, 例如0, 1, 默认0|

**返回值**

|返回值类型|解释|
|-|-|
|string|ICCID值,若失败返回nil|

**例子**

无

---

## mobile.number(id)



获取手机卡号，注意，只有写入了手机号才能读出，因此有可能读出来是空的

**参数**

|传入值类型|解释|
|-|-|
|int|SIM卡的编号, 例如0, 1, 默认0|

**返回值**

|返回值类型|解释|
|-|-|
|string|number值,若失败返回nil|

**例子**

无

---

## mobile.simid(id)



获取当前SIM卡槽,或者切换卡槽

**参数**

|传入值类型|解释|
|-|-|
|int|SIM卡的编号, 例如0, 1, 如果支持双卡，比如EC618，可以填2来自适应，但是会占用掉4个IO(gpio4/5/6/23)。如果不填就直接读取当前卡槽|
|boolean|是否优先用SIM0，只有SIM卡编号写2自适应才有用！！！。true优先用SIM0，false则优先用上一次探测到的，默认是false，必须在开机就配置，否则就无效了|

**返回值**

|返回值类型|解释|
|-|-|
|int|当前sim卡槽编号,若失败返回-1|

**例子**

```lua
-- 注意, SIM1会占用GPIO4/5/6/23
mobile.simid(0) -- 固定使用SIM0
mobile.simid(1) -- 固件使用SIM1
mobile.simid(2) -- 自动识别SIM0, SIM1, 且SIM0优先
mobile.simid(2, true) -- -- 自动识别SIM0, SIM1, 且SIM1优先
-- 提醒, 自动识别是会增加时间的

```

---

## mobile.simPin(id,operation,pin1,pin2)



检测当前SIM卡是否准备好，对SIM卡的PIN码做相关操作

**参数**

|传入值类型|解释|
|-|-|
|int|SIM卡的编号, 例如0, 1, 支持双卡双待的才需要选择|
|int|PIN码操作类型，只能是mobile.PIN_XXXX，不操作就留空|
|string|更换pin时操作的pin码，或者验证操作的pin码，或者解锁pin码时的PUK，4~8字节|
|string|更换pin码操作时的新的pin码，解锁pin码时的新PIN，4~8字节|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|当无PIN操作时，返回SIM卡是否准备好，有PIN操作时，返回是否成功|

**例子**

```lua
local cpin_is_ready = mobile.simPin() -- 当前sim卡是否准备好，一般返回false就是没卡
local succ = mobile.simPin(0, mobile.PIN_VERIFY, "1234")	-- 输入pin码验证

```

---

## mobile.rtime(time, auto_reset_stack)



设置RRC自动释放时间间隔，当开启时后，遇到极弱信号+频繁数据操作可能会引起网络严重故障，因此需要额外设置自动重启协议栈

**参数**

|传入值类型|解释|
|-|-|
|int|RRC自动释放时间，等同于Air724的AT+RTIME，单位秒，写0或者不写则是停用，不要超过20秒，没有意义|
|boolean|网络遇到严重故障时尝试自动恢复，和飞行模式/SIM卡切换冲突，true开启，false关闭，留空时，如果设置了时间则自动开启|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## mobile.setAuto(check_sim_period, get_cell_period, search_cell_time, auto_reset_stack)



设置一些辅助周期性或者自动功能，目前支持SIM卡暂时脱离后恢复，周期性获取小区信息，网络遇到严重故障时尝试自动恢复

**参数**

|传入值类型|解释|
|-|-|
|int|SIM卡自动恢复时间，单位毫秒，建议5000~10000，和飞行模式/SIM卡切换冲突，不能再同一时间使用，必须错开执行。写0或者不写则是关闭功能|
|int|周期性获取小区信息的时间间隔，单位毫秒。获取小区信息会增加部分功耗。写0或者不写则是关闭功能|
|int|每次搜索小区时最大搜索时间，单位秒。不要超过8秒|
|boolean|网络遇到严重故障时尝试自动恢复，和飞行模式/SIM卡切换冲突，true开启，false关闭，开始状态是false，留空则不做改变|
|int|设置定时检测网络是否正常并且在检测到长时间无网时通过重启协议栈来恢复，无网恢复时长，单位ms，建议60000以上，为网络搜索网络保留足够的时间，留空则不做更改|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## mobile.apn(index, cid, new_apn_name, user_name, password, ip_type, protocol)



获取或设置APN，设置APN必须在入网前就设置好，比如在SIM卡识别完成前就设置好

**参数**

|传入值类型|解释|
|-|-|
|int|编号,默认0. 在支持双卡的模块上才会出现0或1的情况|
|int|cid, 默认0，如果要用非默认APN来激活，必须>0|
|string|新的APN,不填就是获取APN, 填了就是设置APN, 是否支持设置取决于底层实现|
|string|新的APN的username,如果APN不是空,那必须填写,如果没有留个空字符串""。如果APN是空的，那可以nil|
|string|新的APN的password,如果APN不是空,那必须填写,如果没有留个空字符串""。如果APN是空的，那可以nil|
|int|激活APN时的IP TYPE,1=IPV4 2=IPV6 3=IPV4V6,默认是1|
|int|激活APN时,如果需要username和password,就要写鉴权协议类型,1~3,默认3,代表1和2都尝试一下。不需要鉴权的写0|
|boolean|是否删除APN,true是,其他都否,只有参数3新的APN不是string的时候才有效果|

**返回值**

|返回值类型|解释|
|-|-|
|string|获取到的默认APN值,失败返回nil|

**例子**

```lua
local mobile.apn(0,1,"cmiot","","",nil,0) -- 移动公网卡设置APN为cmiot,一般不用设置
local mobile.apn(0,1,"name","user","password",nil,3) -- 专网卡设置的demo，name，user，password联系卡商获取

```

---

## mobile.ipv6(onff)



是否默认开启IPV6功能，必须在LTE网络连接前就设置好

**参数**

|传入值类型|解释|
|-|-|
|boolean|开关 true开启 false 关闭|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true 当前是开启的，false 当前是关闭的|

**例子**

```lua
-- 注意, 开启ipv6后, 开机联网会慢2~3秒

```

---

## mobile.csq()



获取csq

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前CSQ值, 若失败返回0. 范围 0 - 31, 越大越好|

**例子**

```lua
-- 注意, 4G模块的CSQ值仅供参考, rsrp/rsrq才是真正的信号强度指标

```

---

## mobile.rssi()



获取rssi

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前rssi值,若失败返回0. 范围 0 到 -114, 越小越好|

**例子**

无

---

## mobile.rsrp()



获取rsrp,参考信号接收功率

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前rsrp值,若失败返回0. 取值范围: -44 ~ -140 ，值越大越好|

**例子**

无

---

## mobile.rsrq()



获取rsrq,参考信号发送功率

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前rsrq值,若失败返回0.  取值范围: -3 ~ -19.5 ，值越大越好|

**例子**

无

---

## mobile.snr()



获取snr,信噪比

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前snq值,若失败返回0.范围 0 - 30, 越大越好|

**例子**

无

---

## mobile.eci()



获取当前服务小区的ECI(E-UTRAN Cell Identifier)

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前eci值,若失败返回-1|

**例子**

无

---

## mobile.tac()



获取当前服务小区的TAC或者LAC

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前eci值,若失败返回-1. 如果尚未注册到网络,会返回0|

**例子**

```lua
-- 本API于 2023.7.9 新增

```

---

## mobile.enbid()



获取当前服务小区的eNBID(eNodeB Identifier)

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前enbid值,若失败返回-1|

**例子**

无

---

## mobile.flymode(index, enable)



进出飞行模式

**参数**

|传入值类型|解释|
|-|-|
|int|编号,默认0. 在支持双卡的模块上才会出现0或1的情况|
|bool|是否设置为飞行模式,true为设置, false为退出,可选|

**返回值**

|返回值类型|解释|
|-|-|
|bool|原飞行模式的状态|

**例子**

无

---

## mobile.status()



获取网络状态

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前网络状态,0:网络未注册;1:网络已注册;2:正在搜网中;3:网络注册被拒绝|

**例子**

无

---

## mobile.getCellInfo()



获取机制信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|包含基站数据的数组|

**例子**

```lua
-- 注意: 从2023.06.20开始, 需要主动请求一次reqCellInfo才会有基站数据.

--示例输出
--[[
[
    {"rsrq":-10,"rssi":-55,"cid":124045360,"mnc":17,"pci":115,"earfcn":1850,"snr":15,"rsrp":-85,"mcc":1120,"tdd":0},
    {"pci":388,"rsrq":-11,"mnc":17,"earfcn":2452,"snr":5,"rsrp":-67,"mcc":1120,"cid":124045331},
    {"pci":100,"rsrq":-9,"mnc":17,"earfcn":75,"snr":17,"rsrp":-109,"mcc":1120,"cid":227096712}
]
]]

mobile.reqCellInfo(60)
-- 订阅
sys.subscribe("CELL_INFO_UPDATE", function()
    log.info("cell", json.encode(mobile.getCellInfo()))
end)

-- 定期轮训式
sys.taskInit(function()
    sys.wait(3000)
    while 1 do
        mobile.reqCellInfo(15)
        sys.waitUntil("CELL_INFO_UPDATE", 15000)
        log.info("cell", json.encode(mobile.getCellInfo()))
    end
end)

```

---

## mobile.reqCellInfo(timeout)



发起基站信息查询,含临近小区

**参数**

|传入值类型|解释|
|-|-|
|int|超时时长,单位秒,默认15. 最少5, 最高60|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 参考 mobile.getCellInfo 函数

```

---

## mobile.reset()



重启协议栈

**参数**

无

**返回值**

无

**例子**

```lua
-- 重启LTE协议栈
mobile.reset()

```

---

## mobile.dataTraffic(clearUplink, clearDownlink)



数据量流量处理

**参数**

|传入值类型|解释|
|-|-|
|boolean|清空上行流量累计值，true清空，其他忽略|
|boolean|清空下行流量累计值，true清空，其他忽略|

**返回值**

|返回值类型|解释|
|-|-|
|int|上行流量GB|
|int|上行流量B|
|int|下行流量GB|
|int|下行流量B|

**例子**

```lua
-- 获取上下行流量累计值
-- 上行流量值Byte = uplinkGB * 1024 * 1024 * 1024 + uplinkB
-- 下行流量值Byte = downlinkGB * 1024 * 1024 * 1024 + downlinkB
local uplinkGB, uplinkB, downlinkGB, downlinkB = mobile.dataTraffic()

-- 清空上下行流量累计值
mobile.dataTraffic(true, true)

```

---

## mobile.config(item, value)



网络特殊配置，针对不同平台有不同的配置，谨慎使用，目前只有EC618

**参数**

|传入值类型|解释|
|-|-|
|int|配置项目，看mobile.CONF_XXX|
|int|配置值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功|

**例子**

```lua
-- EC618配置小区重选信号差值门限，不能大于15dbm，必须在飞行模式下才能用
mobile.flymode(0,true)
mobile.config(mobile.CONF_RESELTOWEAKNCELL, 15)
mobile.config(mobile.CONF_STATICCONFIG, 1) --开启网络静态优化
mobile.flymode(0,false)

```

---

## mobile.getBand(band, is_default)



获取当前使用/支持的band

**参数**

|传入值类型|解释|
|-|-|
|zbuff|输出band|
|boolean|true默认支持，false当前支持的，默认是false，当前是预留功能，不要写true|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true，失败放回false|

**例子**

```lua
local buff = zbuff.create(40)
mobile.getBand(buff) --输出当前使用的band，band号放在buff内，buff[0]，buff[1]，buff[2] .. buff[buff:used() - 1]

```

---

## mobile.setBand(band, num)



设置使用的band

**参数**

|传入值类型|解释|
|-|-|
|zbuff|输入使用的band|
|int|band数量|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true，失败放回false|

**例子**

```lua
local buff = zbuff.create(40)
buff[0] = 3
buff[1] = 5
buff[2] = 8
buff[3] = 40
mobile.setBand(buff, 4) --设置使用的band一共4个，为3,5,8,40

```

---

## mobile.nstOnOff(onoff, uart_id)



RF测试开关和配置

**参数**

|传入值类型|解释|
|-|-|
|boolean|true开启测试模式，false关闭|
|int|串口号|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
mobile.nstOnOff(true, uart.VUART_0)	--打开测试模式，并且用虚拟串口发送结果
mobile.nstOnOff(false) --关闭测试模式

```

---

## mobile.nstInput(data)



RF测试数据输入

**参数**

|传入值类型|解释|
|-|-|
|string|or zbuff 用户从串口获取的数据，注意，当获取完所有数据后，需要再传一个nil来作为传输结束|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
mobile.nstInput(uart_data)
mobile.nstInput(nil)

```

---

