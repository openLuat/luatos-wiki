# netLed - netLed 网络状态指示灯

**示例**

```lua
--注意:因使用了sys.wait()所有api需要在协程中使用
-- 用法实例
local netLed = require ("netLed")

local LEDA = gpio.setup(27,1,gpio.PULLUP) --LED引脚判断赋值结束
sys.taskInit(function()
--呼吸灯
sys.wait(5080)--延时5秒等待网络注册
log.info("mobile.status()", mobile.status())
  while true do
        if mobile.status() == 1 then--已注册
            sys.wait(688)
            netLed.setupBreateLed(LEDA)
        end
   end
end)

```

## netLed.setState

更新网络指示灯表示的工作状态

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
netLed.setState()

```

---

## netLed.taskLed(ledPinSetFunc)

网络指示灯模块的运行任务

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
local LEDA = gpio.setup(27,1,gpio.PULLUP) --LED引脚判断赋值结束
netLed.taskLed(LEDA)

```

---

## netLed.taskLte(ledPinSetFunc)

LTE指示灯模块的运行任务

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
local LEDA = gpio.setup(27,1,gpio.PULLUP) --LED引脚判断赋值结束
netLed.taskLte(LEDA)

```

---

## netLed.setup(flag,ledpin,ltepin)

配置网络指示灯和LTE指示灯并且立即执行配置后的动作

**参数**

|传入值类型|解释|
|-|-|
|bool|flag 是否打开网络指示灯和LTE指示灯功能,true为打开,false为关闭|
|number|ledPin 控制网络指示灯闪烁的GPIO引脚,例如pio.P0_1表示GPIO1|
|number|ltePin 控制LTE指示灯闪烁的GPIO引脚,例如pio.P0_4表示GPIO4|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
netLed.setup(true,27,0)

```

---

## netLed.setBlinkTime(state,on,off)

配置某种工作状态下指示灯点亮和熄灭的时长（如果用户不配置,使用netLed.lua中ledBlinkTime配置的默认值）

**参数**

|传入值类型|解释|
|-|-|
|string|state 某种工作状态,仅支持"FLYMODE"、"SIMERR"、"IDLE"、"GSM"、"GPRS"、"SCK"|
|number|on 指示灯点亮时长,单位毫秒,0xFFFF表示常亮,0表示常灭|
|number|off 指示灯熄灭时长,单位毫秒,0xFFFF表示常灭,0表示常亮|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值 |

**例子**

```lua
netLed.setBlinkTime(("FLYMODE",1000,500) --表示飞行模式工作状态下,指示灯闪烁规律为: 亮1秒,灭8.5秒

```

---

## netLed.setupBreateLed(ledPin)

呼吸灯

**参数**

|传入值类型|解释|
|-|-|
|function|ledPin 呼吸灯的ledPin(1)用pins.setup注册返回的方法|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
local netLed = require ("netLed")
local LEDA = gpio.setup(27,1,gpio.PULLUP) --LED引脚判断赋值结束
sys.taskInit(function()
--呼吸灯
sys.wait(5080)--延时5秒等待网络注册
log.info("mobile.status()", mobile.status())
  while true do
        if mobile.status() == 1 then--已注册
            sys.wait(688)
            netLed.setupBreateLed(LEDA)
        end
   end
end)

```

---

