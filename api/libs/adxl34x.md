# adxl34x - adxl34x 驱动 目前支持 adxl345 adxl346

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/adxl34x/adxl34x.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

**示例**

```lua
--注意:因使用了sys.wait()所有api需要在协程中使用
-- 用法实例
local adxl34x = require "adxl34x"
i2cid = 0
i2c_speed = i2c.FAST
sys.taskInit(function()
    i2c.setup(i2cid,i2c_speed)
    adxl34x.init(i2cid)--初始化,传入i2c_id
    while 1 do
        local adxl34x_data = adxl34x.get_data()
        log.info("adxl34x_data", "adxl34x_data.x"..(adxl34x_data.x),"adxl34x_data.y"..(adxl34x_data.y),"adxl34x_data.z"..(adxl34x_data.z))
        sys.wait(1000)
    end
end)

```

## adxl34x.init(i2c_id)

adxl34x 初始化

**参数**

|传入值类型|解释|
|-|-|
|number|i2c_id i2c_id|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true|

**例子**

```lua
adxl34x.init(0)

```

---

## adxl34x.get_data()

获取 adxl34x 数据

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|adxl34x 数据|

**例子**

```lua
local adxl34x_data = adxl34x.get_data()
log.info("adxl34x_data", "adxl34x_data.x"..(adxl34x_data.x),"adxl34x_data.y"..(adxl34x_data.y),"adxl34x_data.z"..(adxl34x_data.z))

```

---

