# air153C_wtd - 添加软件看门狗功能，防止死机

**示例**

```lua
--local air153C_wtd = require ("air153C_wtd")
-- 用法实例
-- sys.taskInit(function ()
--     air153C_wtd.init(28)
--     air153C_wtd.feed_dog(28,10)--28为看门狗引脚，10为设置喂狗时间
--     --air153C_wtd.set_time(1)--开启定时模式再打开此代码，否则无效
-- end)

```

## air153C_wtd.init(watchdogPin)

初始化引脚

**参数**

|传入值类型|解释|
|-|-|
|int|看门狗控制引脚|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
air153C_wtd.init(28)

```

---

## air153C_wtd.feed_dog(watchdogPin)

调用此函数进行喂狗

**参数**

|传入值类型|解释|
|-|-|
|int|watchdogPin设置看门狗控制引脚|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
air153C_wtd.feed_dog(28)

```

---

## air153C_wtd.close_watch_dog(watchdogPin)

调用此函数关闭喂狗，谨慎使用!

**参数**

|传入值类型|解释|
|-|-|
|int|watchdogPin设置看门狗控制引脚|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
air153C_wtd.close_watch_dog(28)

```

---

