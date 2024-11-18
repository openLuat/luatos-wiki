# airlbs - airlbs 定位服务(收费服务，需自行联系销售申请)

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/airlbs.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
--注意:因使用了sys.wait()所有api需要在协程中使用
--注意:使用前需同步时间
-- 用法实例
local airlbs = require "airlbs"

sys.taskInit(function()
    sys.waitUntil("IP_READY")

    -- 如需wifi定位,需要硬件以及固件支持wifi扫描功能
    local wifi_info = nil
    if wlan then
        sys.wait(3000) -- 网络可用后等待一段时间才再调用wifi扫描功能,否则可能无法获取wifi信息
        wlan.init()
        wlan.scan()
        sys.waitUntil("WLAN_SCAN_DONE", 15000)
        wifi_info = wlan.scanResult()
        log.info("scan", "wifi_info", #wifi_info)
    end

    socket.sntp()
    sys.waitUntil("NTP_UPDATE", 1000)

    while 1 do
        local result , data = airlbs.request({project_id = "xxx",project_key = 'xxx',wifi_info = wifi_info,timeout = 1000})
        if result then
            print("airlbs", json.encode(data))
        end
        sys.wait(20000)
    end

end)

```

## airlbs.request(param)



获取定位数据

**参数**

|传入值类型|解释|
|-|-|
|param|table 参数(联系销售获取id与key) project_id:项目ID project_key:项目密钥 wifi_info:wifi扫描结果(wlan.scanResult()的返回值,wifi定位使用)timeout:超时时间,单位毫秒 默认15000|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,失败会返回false|
|table|定位成功生效，成功返回定位数据|

**例子**

```lua
local result , data = airlbs.request({project_id = airlbs_project_id,project_key = airlbs_project_key})
if result then
    print("airlbs", json.encode(data))
end

```

---

