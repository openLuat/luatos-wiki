# lbsLoc - lbsLoc 发送基站定位请求

**示例**

```lua
-- lbsloc 是异步回调接口，
-- lbsloc2 是是同步接口。
-- lbsloc比lbsloc2多了一个请求地址文本的功能。
-- lbsloc 和 lbsloc2 都是免费LBS定位的实现方式；
-- airlbs 扩展库是收费 LBS 的实现方式。

--注意:因使用了sys.wait()所有api需要在协程中使用
--用法实例
--注意：此处的PRODUCT_KEY仅供演示使用，不能用于生产环境
--量产项目中一定要使用自己在iot.openluat.com中创建的项目productKey,项目详情里可以查看
--基站定位的坐标系是 WSG84
PRODUCT_KEY = "v32xEAKsGTIEQxtqgwCldp5aPlcnPs3K"
local lbsLoc = require("lbsLoc")
-- 功能:获取基站对应的经纬度后的回调函数
-- 参数:-- result：number类型，0表示成功，1表示网络环境尚未就绪，2表示连接服务器失败，3表示发送数据失败，4表示接收服务器应答超时，5表示服务器返回查询失败；为0时，后面的5个参数才有意义
        -- lat：string类型，纬度，整数部分3位，小数部分7位，例如031.2425864
        -- lng：string类型，经度，整数部分3位，小数部分7位，例如121.4736522
        -- addr：目前无意义
        -- time：string类型或者nil，服务器返回的时间，6个字节，年月日时分秒，需要转为十六进制读取
            -- 第一个字节：年减去2000，例如2017年，则为0x11
            -- 第二个字节：月，例如7月则为0x07，12月则为0x0C
            -- 第三个字节：日，例如11日则为0x0B
            -- 第四个字节：时，例如18时则为0x12
            -- 第五个字节：分，例如59分则为0x3B
            -- 第六个字节：秒，例如48秒则为0x30
        -- locType：numble类型或者nil，定位类型，0表示基站定位成功，255表示WIFI定位成功
function getLocCb(result, lat, lng, addr, time, locType)
    log.info("testLbsLoc.getLocCb", result, lat, lng)
    -- 获取经纬度成功, 坐标系WGS84
    if result == 0 then
        log.info("服务器返回的时间", time:toHex())
        log.info("定位类型,基站定位成功返回0", locType)
    end
end

sys.taskInit(function()
    sys.waitUntil("IP_READY", 30000)
    while 1 do
        mobile.reqCellInfo(15)
        sys.waitUntil("CELL_INFO_UPDATE", 3000)
        lbsLoc.request(getLocCb)
        sys.wait(60000)
    end
end)

```

## lbsLoc.request(cbFnc,reqAddr,timeout,productKey,host,port,reqTime,reqWifi)

发送基站定位请求

**参数**

|传入值类型|解释|
|-|-|
|function|cbFnc 用户回调函数，回调函数的调用形式为：cbFnc(result,lat,lng,addr,time,locType)|
|bool|reqAddr 是否请求服务器返回具体的位置字符串信息，已经不支持,填false或者nil|
|number|timeout 请求超时时间，单位毫秒，默认20000毫秒|
|string|productKey IOT网站上的产品KEY，如果在main.lua中定义了PRODUCT_KEY变量，则此参数可以传nil|
|string|host 服务器域名, 默认 "bs.openluat.com" ,可选备用服务器(不保证可用) "bs.air32.cn"|
|string|port 服务器端口，默认"12411",一般不需要设置|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 提醒: 返回的坐标值, 是WGS84坐标系

```

---

