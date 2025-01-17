# ze08g_ch2o - ZE08G-CH2O 电化学甲醛模组

**示例**

```lua
--注意:因使用了sys.wait()所有api需要在协程中使用
-- 用法实例
sys = require("sys")
local ch2o = require "ze08g_ch2o"
local uartid = 1 -- 根据实际设备选取不同的uartid

sys.taskInit(function ()
    local result = ch2o.init(uartid)
    if not result then return end

    while true do
        sys.wait(1000)
        log.info("气体浓度值 PPB：", ch2o.getPPB())
        log.info("百万分比浓度 PPM：", ch2o.getPPM())
    end
end)

```

## ze08g_ch2o.init(uart_id)



ze08g_ch2o初始化

**参数**

|传入值类型|解释|
|-|-|
|number|uart_id uartid|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true|

**例子**

```lua
ze08g_ch2o.init(1)

```

---

## ze08g_ch2o.getPPB()



获取ze08g_ch2o PPB数据

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|number|气体浓度值|

**例子**

```lua
local ppb = ze08g_ch2o.getPPB()
log.info("气体浓度值 PPB：", ppb))

```

---

## ze08g_ch2o.getPPM()



获取ze08g_ch2o PPM数据

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|number|百万分比浓度|

**例子**

```lua
local ppm = ze08g_ch2o.getPPM()
log.info("百万分比浓度 PPM：", ppm))

```

---

