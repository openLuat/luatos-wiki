# mobile - 蜂窝网络

{bdg-success}`已适配` {bdg-primary}`Air780`

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

无

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

## mobile.simid(id)

获取当前SIM卡槽,或者切换卡槽

**参数**

|传入值类型|解释|
|-|-|
|int|SIM卡的编号, 例如0, 1. 可选|

**返回值**

|返回值类型|解释|
|-|-|
|int|当前sim卡槽编号,若失败返回-1|

**例子**

无

---

## mobile.apn(index, newvalue)

获取或设置APN

**参数**

|传入值类型|解释|
|-|-|
|int|编号,默认0. 在支持双卡的模块上才会出现0或1的情况|
|int|cid, 默认0|
|string|新的APN. 不填就是获取APN, 填了就是设置APN, 是否支持设置取决于底层实现.|

**返回值**

|返回值类型|解释|
|-|-|
|string|当前的APN值,若失败返回nil|

**例子**

无

---

## mobile.rssi()

获取rssi

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前rssi值,若失败返回0|

**例子**

无

---

## mobile.rsrp()

获取rsrp

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前rsrp值,若失败返回0|

**例子**

无

---

## mobile.rsrq()

获取rsrq

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前rsrq值,若失败返回0|

**例子**

无

---

## mobile.snr()

获取snr

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前snq值,若失败返回0|

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
|int|当前网络状态|

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
--示例输出
--[[
[
    {"rsrq":-10,"rssi":-55,"cid":124045360,"mnc":17,"pci":115,"earfcn":1850,"snr":15,"rsrp":-85,"mcc":1120,"tdd":0},
    {"pci":388,"rsrq":-11,"mnc":17,"earfcn":2452,"snr":5,"rsrp":-67,"mcc":1120,"cid":124045331},
    {"pci":100,"rsrq":-9,"mnc":17,"earfcn":75,"snr":17,"rsrp":-109,"mcc":1120,"cid":227096712}
]
]]

-- 订阅式
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

