# wlan - wifi操作库

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../bsp/rtt/luat_lib_wlan.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！


## wlan.getMode(dev)

获取wifi模式

**参数**

|传入值类型|解释|
|-|-|
|string|设备名称,字符串或数值, 可选值0/1, "wlan0","wlan1". 默认"wlan0"|

**返回值**

|返回值类型|解释|
|-|-|
|int|模式wlan.NONE, wlan.STATION, wlan.AP|

**例子**

```lua
-- 获取wlan0的当前模式
local m = wlan.getMode("wlan0")

```

---

## wlan.setMode(dev, mode)

设置wifi模式,通常不需要设置

**参数**

|传入值类型|解释|
|-|-|
|string|设备名称,字符串或数值, 可选值0/1, "wlan0","wlan1". 默认"wlan0"|
|int|模式wlan.NONE, wlan.STATION, wlan.AP|

**返回值**

|返回值类型|解释|
|-|-|
|int|设置成功与否,通常不检查|

**例子**

```lua
-- 将wlan设置为wifi客户端模式
wlan.setMode("wlan0",wlan.STATION) 

```

---

## wlan.connect(ssid,password)

连接wifi,成功启动联网线程不等于联网成功!!

**参数**

|传入值类型|解释|
|-|-|
|string|ssid  wifi的SSID|
|string|password wifi的密码,可选|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|如果正常启动联网线程,无返回值,否则返回出错信息. |

**例子**

```lua
-- 连接到uiot,密码1234567890
wlan.connect("uiot", "1234567890")

```

---

## wlan.disconnect()

断开wifi

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
-- 断开wifi连接 
wlan.disconnect()

```

---

## wlan.connected()

是否已经连上wifi网络

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|已连接返回true0,未连接返回false|

**例子**

```lua
-- 连上wifi网络,只代表密码正确, 不一定拿到了ip
wlan.connected()

```

---

## wlan.autoreconnect(enable)

设置或查询wifi station是否自动连接

**参数**

|传入值类型|解释|
|-|-|
|int|传入1启用自动连接(自动重连wifi), 传入0关闭. 不传这个参数就是查询|

**返回值**

|返回值类型|解释|
|-|-|
|int|已启用自动连接(自动重连wifi)返回1, 否则返回0|

**例子**

```lua
-- 查询自动连接的设置
wlan.autoreconnect()
-- 设置自动连接
wlan.autoreconnect(1)

```

---

## wlan.scan()

开始扫网,通常配合wlan.scanResult使用

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|启动结果,一般为true|

**例子**

```lua
-- 扫描并查询结果
wlan.scan()
sys.waitUntil("WLAN_SCAN_DONE", 30000)
local re = wlan.scanResult()
for i in ipairs(re) do
    log.info("wlan", "info", re[i].ssid, re[i].rssi)
end

```

---

## wlan.scanResult(num)

获取扫网结果,需要先执行wlan.scan,并等待WLAN_SCAN_DONE事件

**参数**

|传入值类型|解释|
|-|-|
|int|最大结果数量,默认50|

**返回值**

|返回值类型|解释|
|-|-|
|table|扫描结果的数组|

**例子**

```lua
-- 扫描并查询结果
wlan.scan()
sys.waitUntil("WLAN_SCAN_DONE", 30000)
local re = wlan.scanResult()
for i in ipairs(re) do
    log.info("wlan", "info", re[i].ssid, re[i].rssi)
end

```

---

## wlan.get_mac()

获取mac地址

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|长度为12的HEX字符串,如果不存在就返回值nil|

**例子**

```lua
-- 获取MAC地址
log.info("wlan", "mac addr", wlan.get_mac())

```

---

## wlan.get_mac_raw()

获取mac地址,raw格式

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|6字节的mac地址串|

**例子**

```lua
-- 查询mac地址, 二进制模式
local mac_raw  = wlan.get_mac_raw()
if mac_raw then
    log.info("wlan", "mac addr", mac_raw:toHex())
end

```

---

## wlan.ready()

wifi是否已经获取ip

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|已经有ip返回true,否则返回false|

**例子**

```lua
-- 查询是否已经wifi联网
if wlan.ready() then
    log.info("wlan", "wifi ok", "Let's Rock!")
end

```

---

## wlan.oneShotStart(mode,ssid,passwd)

启动配网过程,支持UDP/SOCKET/APWEB配网

**参数**

|传入值类型|解释|
|-|-|
|int|配网模式: 0-UDP配网, 1-SOCKET配网, 2-AP网页配网|
|string|AP网页配网时的SSID,默认值为luatos|
|string|AP网页配网时的密钥,默认值为12345678|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|启动成功返回true,否则返回false|

**例子**

```lua
-- UDP配网,需要下载联德盛测试APP,2.0版本
wlan.oneShotStart(0)
-- SOCKET配网,需要下载联德盛测试APP,2.0版本
wlan.oneShotStart(1)
-- AP网页配网,手机搜索wifi "W600APWEB", 密码12345678. 连上之后,保持wifi连接,浏览器访问 192.168.168.1, 按提示输入.
wlan.oneShotStart(2, "W600APWEB", "12345678")
-- 监听配网信息
sys.subscribe("WLAN_PW_RE", function(ssid, passwd)
    if ssid then
        log.info("wlan", "Got ssid and passwd", ssid, passwd)
    else
        log.info("wlan", "oneshot fail")
    end
end)

```

---

## wlan.oneshotStop()

停止配网, 通常不需要调用

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|总是没有返回值|

**例子**

```lua
-- 停止配网
wlan.oneshotStop()

```

---

## wlan.oneshotState()

查询配网状态

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|配网中返回true,否则返回false|

**例子**

```lua
-- 查询
if wlan.oneshotState() then
    log.info("wlan", "配网中")
end

```

---

## wlan.rssi()

获取wifi信号强度值rssi

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|如果是station模式,返回正的rssi值,否则返回负值|

**例子**

```lua
-- 信号强度
log.info("wlan", wlan.rssi())

```

---

## wlan.airkiss_start()

启动airkiss配网线程

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|re|启动成功返回1,否则返回0|

**例子**

```lua
-- 启动airkiss配网
wlan.airkiss_start()
-- 监听配网信息
sys.subscribe("WLAN_PW_RE", function(ssid, passwd)
    if ssid then
        log.info("wlan", "Got ssid and passwd", ssid, passwd)
    else
        log.info("wlan", "oneshot fail")
    end
end)

```

---

