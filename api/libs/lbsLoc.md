# lbsLoc - lbsLoc 发送基站定位请求

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/lbsLoc.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
--注意:因使用了sys.wait()所有api需要在协程中使用
--用法实例
--注意：此处的PRODUCT_KEY仅供演示使用，不保证一直能用，量产项目中一定要使用自己在iot.openluat.com中创建的项目productKey
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
    -- 获取经纬度成功, 坐标系WSG84
    if result == 0 then
        log.info("服务器返回的时间", time:toHex())
        log.info("定位类型,基站定位成功返回0", locType)
    end
end
lbsLoc.request(getLocCb)

```

## lbsLoc.request(cbFnc,reqAddr,timeout,productKey,host,port,reqTime,reqWifi)



发送基站/WIFI定位请求（仅支持中国区域的位置查询）

**参数**

|传入值类型|解释|
|-|-|
|function|cbFnc 用户回调函数，回调函数的调用形式为：cbFnc(result,lat,lng,addr,time,locType)|
|bool|reqAddr 是否请求服务器返回具体的位置字符串信息，目前此功能不完善，参数可以传nil|
|number|timeout 请求超时时间，单位毫秒，默认20000毫秒|
|string|productKey IOT网站上的产品证书，如果在main.lua中定义了PRODUCT_KEY变量，则此参数可以传nil|
|string|host 服务器域名，此参数可选，目前仅lib中agps.lua使用此参数。应用脚本可以直接传nil|
|string|port 服务器端口，此参数可选，目前仅lib中agps.lua使用此参数。应用脚本可以直接传nil|
|bool|reqTime 是否需要服务器返回时间信息，true返回，false或者nil不返回，此参数可选，目前仅lib中agps.lua使用此参数。应用脚本可以直接传nil|
|table|reqWifi 搜索到的WIFI热点信息(MAC地址和信号强度)，如果传入了此参数，后台会查询WIFI热点对应的经纬度，此参数格式如下：|

**返回值**

无

**例子**

无

---

