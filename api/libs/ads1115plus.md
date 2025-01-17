# ads1115plus - ADS1115驱动

**示例**

```lua
require 'ads1115plus'
sys.taskInit(function ()
    i2c.setup(i2cid, i2c_speed)
    ads1115plus.Setup(i2cid) -- 一次初始化
    
    while true do
        log.info("ads1115:",ads1115plus.task_read(5))
        sys.wait(1000)
    end

end)

```

## ads1115plus.Setup(i2c_id)



ADS1115初始化

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
i2c.setup(0, i2c_speed)
ads1115plus.Setup(0)

```

---

## ads1115plus.task_recv(MU1,FSR)



获取ADS1115原始数据

**参数**

|传入值类型|解释|
|-|-|
|number|MUX：通道选择 0-7  MUX=0 AIN0 AIN1   MUX=7 AIN3 GND|

**返回值**

无

**例子**

无

---

## ads1115plus.task_read(MU1)



ADS1115读取mv值

**参数**

|传入值类型|解释|
|-|-|
|number|所在的i2c总线id|

**返回值**

|返回值类型|解释|
|-|-|
|number|ADC的mv数据,若读取失败会返回nil|

**例子**

```lua
log.info("ads1115plus:",ads1115plus.task_read(5))

```

---

