# mpu6xxx - mpu6xxx icm20xx驱动

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/mpu6xxx/mpu6xxx.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

**示例**

```lua
--支持mpu6500，mpu6050，mpu9250，icm2068g，icm20608d，自动判断器件id，只需要配置i2c id就可以
--注意:因使用了sys.wait()所有api需要在协程中使用
-- 用法实例
local mpu6xxx = require "mpu6xxx"
i2cid = 0
i2c_speed = i2c.FAST
sys.taskInit(function()
    i2c.setup(i2cid,i2c_speed)
    mpu6xxx.init(i2cid)--初始化,传入i2c_id
    while 1 do
        sys.wait(100)
        local temp = mpu6xxx.get_temp()--获取温度
        log.info("6050temp", temp)
        local accel = mpu6xxx.get_accel()--获取加速度
        log.info("6050accel", "accel.x",accel.x,"accel.y",accel.y,"accel.z",accel.z)
        local gyro = mpu6xxx.get_gyro()--获取陀螺仪
        log.info("6050gyro", "gyro.x",gyro.x,"gyro.y",gyro.y,"gyro.z",gyro.z)
    end
end)

```

## mpu6xxx.init(i2c_id)

mpu6xxx初始化

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
mpu6xxx.init(0)

```

---

## mpu6xxx.get_temp()

获取温度数据

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|number|温度数据|

**例子**

```lua
local temp = mpu6xxx.get_temp()--获取温度
log.info("6050temp", temp)

```

---

## mpu6xxx.get_accel()

获取加速度计的数据,单位: mg

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|加速度数据|

**例子**

```lua
local accel = mpu6xxx.get_accel()--获取加速度
log.info("6050accel", "accel.x",accel.x,"accel.y",accel.y,"accel.z",accel.z)

```

---

## mpu6xxx.get_gyro()

获取陀螺仪的数据，单位: deg / 10s

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|陀螺仪数据|

**例子**

```lua
local gyro = mpu6xxx.get_gyro()--获取陀螺仪
log.info("6050gyro", "gyro.x",gyro.x,"gyro.y",gyro.y,"gyro.z",gyro.z)

```

---

