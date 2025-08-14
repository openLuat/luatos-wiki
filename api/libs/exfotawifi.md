# exfotawifi - 用于Air8000/8000A/8000W型号模组自动升级WIFI

**示例**

```lua
注：使用时在创建的一个task处理函数中直接调用exfotawifi.request()即可开始执行WiFi升级任务
-- 用法实例
local exfotawifi = require("exfotawifi")

local function wifi_fota_task_func()
    -- ...此处省略很多代码

    local result = exfotawifi.request()
    if result then
        log.info("exfotawifi", "升级任务执行成功")
    else
        log.info("exfotawifi", "升级任务执行失败")
    end

    -- ...此处省略很多代码
end

-- 判断网络是否正常
local function wait_ip_ready()
    local result, ip, adapter = sys.waitUntil("IP_READY", 30000)
    if result then
        log.info("exfotawifi", "开始执行升级任务")
        sys.taskInit(wifi_fota_task_func)
    else
        log.error("当前正在升级WIFI&蓝牙固件，请插入可以上网的SIM卡")
    end
end

-- 在设备启动时检查SIM卡状态
sys.taskInit(wait_ip_ready)

```

## exfotawifi.request()

Air8000系列模组自动升级wifi

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true|

**例子**

```lua
local result = exfotawifi.request()
if result then
    log.info("exfotawifi", "升级任务执行成功")
else
    log.info("exfotawifi", "升级任务执行失败")
end

```

---

