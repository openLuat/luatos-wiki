# airlbs - airlbs 定位服务(收费服务，需自行联系销售申请)

**示例**

```lua
-- lbsloc 是异步回调接口，
-- lbsloc2 是是同步接口。
-- lbsloc比lbsloc2多了一个请求地址文本的功能。
-- lbsloc 和 lbsloc2 都是免费LBS定位的实现方式；
-- airlbs 扩展库是收费 LBS 的实现方式。

```

## airlbs.request(param)

获取定位数据

**参数**

|传入值类型|解释|
|-|-|
|param|table 参数(联系销售获取id与key) project_id:项目ID project_key:项目密钥 timeout:超时时间,单位毫秒 默认15000 adapter: 网络适配器id,可选,默认是平台自带的网络协议栈|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,失败会返回false|
|table|定位成功生效，成功返回定位数据|

**例子**

```lua
--注意:函数内因使用了sys.waitUntil阻塞接口，所以api需要在协程中使用
--注意:使用前需同步时间

local airlbs = require "airlbs"

sys.taskInit(function()
    -- 等待网络就绪
    sys.waitUntil("IP_READY")
    -- 执行时间同步
    socket.sntp()
    sys.waitUntil("NTP_UPDATE", 10000)
    while 1 do
        -- airlbs请求定位
        local result ,data = airlbs.request({
            project_id = airlbs_project_id,
            project_key = airlbs_project_key,
            timeout = 10000, 
            adapter = socket.LWIP_STA
            })
        if result then
            log.info("airlbs", json.encode(data))
        end
        sys.wait(20000)
    end
end)

```

---

