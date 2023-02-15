# wlan - wifi操作

{bdg-success}`已适配` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3` {bdg-primary}`Air780E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/wlan/luat_lib_wlan.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看wlan的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/wlan)
```

## 常量

|常量|类型|解释|
|-|-|-|
|wlan.ESPTOUCH|esptouch配网,|V1|
|wlan.AIRKISS|Airkiss配网,|微信常用|
|wlan.ESPTOUCH_V2|esptouch配网,|V2, 未测试|


## wlan.init()



初始化

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

无

---

## wlan.setMode(mode)



设置wifi模式

**参数**

|传入值类型|解释|
|-|-|
|int|wifi模式|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
-- 设置为AP模式, 广播ssid, 接收wifi客户端的链接
wlan.setMode(wlan.AP)

-- 设置为STATION模式, 也是初始化后的默认模式
wlan.setMode(wlan.STATION)

-- 混合模式, 做AP又做STATION
wlan.setMode(wlan.APSTA)

```

---

## wlan.ready()



作为STATION时,是否已经连接上AP,且获取IP成功

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|已经连接成功返回true,否则返回false|

**例子**

无

---

## wlan.connect(ssid, password)



作为STATION时,连接到指定AP

**参数**

|传入值类型|解释|
|-|-|
|string|AP的ssid|
|string|AP的password,可选|

**返回值**

|返回值类型|解释|
|-|-|
|bool|发起连接成功返回true,否则返回false.注意,不代表连接AP成功!!|

**例子**

```lua

-- 普通模式,带密码
wlan.connect("myap", "12345678")
-- 普通模式,不带密码
wlan.connect("myap")
-- 特殊模式, 重用之前的ssid和密码,本次直接连接
-- 注意, 前提是本次上电后已经传过ssid和或password,否则必失败
wlan.connect()

```

---

## wlan.disconnect()



作为STATION时,断开AP

**参数**

无

**返回值**

无

**例子**

无

---

## wlan.scan()



扫描wifi频段

**参数**

无

**返回值**

无

**例子**

```lua
-- 注意, wlan.scan()是异步API,启动扫描后会马上返回

-- wifi扫描成功后, 会有WLAN_SCAN_DONE消息, 读取即可
sys.subscribe("WLAN_SCAN_DONE", function ()
    local results = wlan.scanResult()
    log.info("scan", "results", #results)
    for k,v in pairs(results) do
        log.info("scan", v["ssid"], v["rssi"], (v["bssid"]:toHex()))
    end
end)

-- 下面演示的是初始化wifi后定时扫描,请按实际业务需求修改
sys.taskInit(function()
    sys.wait(1000)
    wlan.init()
    while 1 do
        wlan.scan()
        sys.wait(15000)
    end
end)

```

---

## wlan.scanResult()



获取wifi扫描结果

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|扫描结果|

**例子**

```lua
-- 用法请查阅 wlan.scan() 函数

```

---

## wlan.smartconfig(mode)



配网

**参数**

|传入值类型|解释|
|-|-|
|int|配网模式, 默认为esptouch, 若传0则主动停止配网|

**返回值**

|返回值类型|解释|
|-|-|
|bool|启动成功或停止成功, 返回true, 否则返回false|

**例子**

```lua
wlan.smartconfig()
local ret, ssid, passwd = sys.waitUntil("SC_RESULT", 180*1000) -- 最多等3分钟
log.info("sc", ret, ssid, passwd)
-- 详细用法请查看demo

```

---

## wlan.getMac()



获取mac

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|MAC地址,十六进制字符串形式 "AABBCCDDEEFF"|

**例子**

无

---

## wlan.getIP()



获取ip,仅STATION或APSTA模式下有意义

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|ip地址,当前仅返回ipv4地址,例如 "192.168.1.25"|

**例子**

无

---

## wlan.createAP(ssid, passwd)



启动AP

**参数**

|传入值类型|解释|
|-|-|
|string|AP的SSID,必填|
|string|AP的密码,可选|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功创建返回true,否则返回false|

**例子**

```lua
-- 注意, 调用本AP时,若wifi模式为STATION,会自动切换成 APSTA
wlan.createAP("uiot", "12345678")

```

---

## wlan.getInfo()



获取信息,如AP的bssid,信号强度

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|详情,键值对形式|

**例子**

```lua

log.info("wlan", "info", json.encode(wlan.getInfo()))
--[[
典型输出
{
    "bssid" : "xxxxxx",
    "rssi"  : -89,
    "gw" : "192.168.1.1"
}
]]

```

---

