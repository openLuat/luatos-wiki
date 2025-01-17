# spl06 - spl06_01 气压传感器

**示例**

```lua
--注意:因使用了sys.wait()所有api需要在协程中使用
-- 用法实例
local spl06 = require "spl06"
i2cid = 0
i2c_speed = i2c.FAST
sys.taskInit(function()
    i2c.setup(i2cid,i2c_speed)
    spl06.init(i2cid)--初始化,传入i2cid
    while 1 do
        local spl06_data = spl06.get_data()
        log.info("spl06_data", "spl06_data.P:"..(spl06_data.P*100),"spl06_data.T"..(spl06_data.T))
        sys.wait(1000)
    end
end)

```

## spl06.init(i2cid)



spl06初始化

**参数**

|传入值类型|解释|
|-|-|
|number|所在的i2c总线id|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true|

**例子**

```lua
spl06.init(0)

```

---

## spl06.get_data()



获取spl06数据

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|spl06数据|

**例子**

```lua
local spl06_data = spl06.get_data()
log.info("spl06_data", "spl06_data.P:"..(spl06_data.P*100),"spl06_data.T"..(spl06_data.T))

```

---

