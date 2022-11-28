# aht10 - aht10 温湿度传感器

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/aht10/aht10.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
--注意:因使用了sys.wait()所有api需要在协程中使用
-- 用法实例
local aht10 = require "aht10"
i2cid = 0
i2c_speed = i2c.FAST
sys.taskInit(function()
    i2c.setup(i2cid,i2c_speed)
    aht10.init(i2cid)--初始化,传入i2c_id
    while 1 do
        local aht10_data = aht10.get_data()
        log.info("aht10_data", "aht10_data.RH:"..(aht10_data.RH*100).."%","aht10_data.T"..(aht10_data.T).."℃")
        sys.wait(1000)
    end
end)

```

## aht10.init(i2c_id)

aht10初始化

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
aht10.init(0)

```

---

## aht10.get_data()

获取aht10数据

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|aht10数据|

**例子**

```lua
local aht10_data = aht10.get_data()
log.info("aht10_data", "aht10_data.RH:"..(aht10_data.RH*100).."%","aht10_data.T"..(aht10_data.T).."℃")

```

---

