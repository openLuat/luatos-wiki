# lis2dh12 - lis2dh12 三轴传感器

**示例**

```lua
--注意:因使用了sys.wait()所有api需要在协程中使用
-- 用法实例
local lis2dh12 = require "lis2dh12"
i2cid = 0
i2c_speed = i2c.FAST
sys.taskInit(function()
    i2c.setup(i2cid,i2c_speed)
    lis2dh12.init(i2cid)--初始化,传入i2c_id
    while 1 do
        local lis2dh12_data = lis2dh12.get_data()
        log.info("lis2dh12_data", "lis2dh12_data.x"..(lis2dh12_data.x),"lis2dh12_data.y"..(lis2dh12_data.y),"lis2dh12_data.z"..(lis2dh12_data.z),"lis2dh12_data.temp"..(lis2dh12_data.temp))
        sys.wait(1000)
    end
end)

```

## lis2dh12.get_data()



获取lis2dh12数据

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|lis2dh12数据|

**例子**

```lua
local lis2dh12_data = lis2dh12.get_data()
log.info("lis2dh12_data", "lis2dh12_data.x"..(lis2dh12_data.x),"lis2dh12_data.y"..(lis2dh12_data.y),"lis2dh12_data.z"..(lis2dh12_data.z),"lis2dh12_data.temp"..(lis2dh12_data.temp))

```

---

