# rtkv - 远程KV数据库

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3` {bdg-primary}`Air780E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/rtkv.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
-- 本API正在开发测试中

-- 是否还在为上报几个数据值而烦恼?
-- 是否还在为数据存入数据库而头痛不已?
-- 没有外网服务器, 内网穿透又很麻烦?
-- 不懂mqtt, 也没有下发需求, 只是想上报一些值?

-- 那本API就很适合您
-- 它可以:
--   将数据存到服务器,例如温湿度,GPS坐标,GPIO状态
--   读取服务器的数据,例如OTA信息
--   服务器会保存历史记录,也支持绘制成图表
-- 它不可以:
--   实时下发数据给设备
--   上传巨量数据

-- 网站首页, 输入设备识别号就能看数据 https://rtkv.air32.cn
-- 示例设备 http://rtkv.air32.cn/d/6055F9779010

-- 场景举例1, 上报温湿度数据到服务器, 然后网站查看地址是 XXX
rtkv.setup()
sys.taskInit(function()
    sys.waitUntil("IP_READY")
    while 1 do
        local val,result = sensor.ds18b20(17, true) 
        if result then
            rtkv.set("ds18b20_temp", val)
        end
        sys.wait(60*1000) -- 一分钟上报一次
    end
end)

-- 场景举例2, 简易版OTA
rtkv.setup()
sys.taskInit(function()
    sys.waitUntil("IP_READY")
    sys.wait(1000)
    while 1 do
        local ota_version = rtkv.get("ota_version")
        if ota_version and ota_version ~= _G.VERSION then
            local ota_url = rtkv.get("ota_url")
            if ota_url then
                -- 执行OTA, 以esp32c3为例
                local code = http.request("GET", ota_url, nil, nil, {dst="/update"}).wait()
                if code and code == 200 then
                    log.info("ota", "ota包下载完成, 5秒后重启")
                    sys.wait(5000)
                    rtos.reboot()
                end
            end
        end
        sys.wait(4*3600*1000) -- 4小时检查一次
    end
end)

-- 场景举例3, 非实时下发控制
rtkv.setup()
sys.taskInit(function()
    local LED = gpio.setup(27, 0, nil, gpio.PULLUP)
    local INPUT = gpio.setup(22, nil)
    sys.waitUntil("IP_READY")
    sys.wait(1000)
    while 1 do
        local gpio27 = rtkv.get("gpio27")
        if gpio27 then
            LED(gpio27 == "1" and 1 or 0)
        end
        rtkv.set("gpio22", INPUT()) -- 上报GPIO22的状态
        sys.wait(15*1000) -- 15秒查询一次
    end
end)

```

## rtkv.setup(conf)



rtkv初始化

**参数**

|传入值类型|解释|
|-|-|
|table|配置信息,详细说明看下面的示例|

**返回值**

|返回值类型|解释|
|-|-|
|nil|没有返回值|

**例子**

```lua
-- 本函数只需要调用一次, 通常在main.lua里

-- 默认初始化, 开启了调试日志
rtkv.setup()
-- 初始化,并关闭调试日志
rtkv.setup({nodebug=true})
-- 详细初始化, 可以只填需要配置的项
rtkv.setup({
    apiurl = "http://rtkv.air32.cn", -- 服务器地址,可以自行部署
    device = "abc", -- 设备识别号,只能是英文字符+数值,区别大小写
    token = "123456", -- 设备密钥, 默认是设备的唯一id, 即mcu.unique_id()
    nodebug = false,  -- 关闭调试日志,默认false
    timeout = 3000, -- 请求超时, 单位毫秒, 默认3000毫秒
})

-- 关于device值的默认值
-- 若支持4G, 会取IMEI
-- 若支持wifi, 会取MAC
-- 其余情况取 mcu.unique_id() 即设备的唯一id

```

---

## rtkv.set(key, value)



设置指定键对应的值

**参数**

|传入值类型|解释|
|-|-|
|string|键, 不能为nil,建议只使用英文字母/数字|
|string|值, 不能为nil,一般建议不超过512字节|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true, 否则返回nil|

**例子**

```lua

-- 如果关心执行结果, 则需要在task里执行
-- 非task上下文, 会返回nil, 然后后台执行
rtkv.set("age", "18")
rtkv.set("version", _G.VERSION)
rtkv.set("project", _G.PROJECT)

-- 关于值的类型的说明
-- 支持传入字符串,布尔值,整数,浮点数, 最终还是会转为字符串上传
-- 通过 rtkv.get 获取值的时候, 返回的值的类型也会是字符串

```

---

## rtkv.sets(datas)



批量设置键值

**参数**

|传入值类型|解释|
|-|-|
|table|需要设置的键值对|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true, 否则返回nil|

**例子**

```lua
-- 如果关心执行结果, 则需要在task里执行
-- 非task上下文, 会返回nil, 然后后台执行
rtkv.sets({
    age = "18",
    vbat = 4193,
    temp = 23423
})

```

---

## rtkv.get(key)



获取指定键对应的值

**参数**

|传入值类型|解释|
|-|-|
|string|键, 不能为nil,长度需要2字节以上|

**返回值**

|返回值类型|解释|
|-|-|
|string|成功返回字符,其他情况返回nil|

**例子**

```lua
-- 注意, 必须在task里执行,否则必返回nil
local age = rtkv.get("age")

```

---

