# bmx - bmx 气压传感器 目前支持bmp180 bmp280 bme280 bme680 会自动判断器件

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/bmx/bmx.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！


**示例**

```lua
--注意:因使用了sys.wait()所有api需要在协程中使用
-- 用法实例
local bmx = require "bmx"
i2cid = 0
i2c_speed = i2c.SLOW
sys.taskInit(function()
    i2c.setup(i2cid,i2c_speed)
    bmx.init(i2cid)--初始化,传入i2c_id
    while 1 do
        local bmx_data = bmx.get_data()
        if bmx_data.temp then
            log.info("bmx_data_data.temp:"..(bmx_data.temp).."°C")
        end
        if bmx_data.press then
            log.info("bmx_data_data.press:"..(bmx_data.press).."hPa")
        end
        if bmx_data.high then
            log.info("bmx_data_data.high:"..(bmx_data.high).."m")
        end
        if bmx_data.hum then
            log.info("bmx_data_data.hum:"..(bmx_data.hum).."%")
        end
        sys.wait(1000)
    end
end)

```

## bmx.get_data()

获取bmx数据

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|bmx数据|

**例子**

```lua
local bmx_data = bmx.get_data()
if bmx_data.temp then
    log.info("bmx_data_data.temp:"..(bmx_data.temp).."°C")
end
if bmx_data.press then
    log.info("bmx_data_data.press:"..(bmx_data.press).."hPa")
end
if bmx_data.high then
    log.info("bmx_data_data.high:"..(bmx_data.high).."m")
end
if bmx_data.hum then
    log.info("bmx_data_data.hum:"..(bmx_data.hum).."%")
end

```

---

