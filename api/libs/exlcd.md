# exlcd - LCD显示拓展库

**示例**

```lua
本文件为LCD显示拓展库，核心业务逻辑为：
1、初始化LCD显示屏，支持多种显示芯片
2、管理屏幕背光亮度及开关状态
3、提供屏幕状态管理功能
4、支持根据lcd_model自动配置参数

本文件的对外接口有6个：
1、exlcd.init(param)：LCD初始化函数
2、exlcd.set_bl(level)：设置背光亮度接口，level为亮度级别(0-100)
3、exlcd.get_bl()：当前设置背光亮度级别查询
4、exlcd.sleep()：屏幕休眠
5、exlcd.wakeup()：屏幕唤醒
6、exlcd.get_sleep()：休眠状态查询

```

## exlcd.init(param)

初始化LCD显示屏

**参数**

|传入值类型|解释|
|-|-|
|table|param LCD配置参数，参考库的说明及demo用法|

**返回值**

|返回值类型|解释|
|-|-|
|bool|初始化成功返回true，失败返回false|

**例子**

```lua
-- 使用预定义配置初始化
exlcd.init({lcd_model = "Air780EHM_LCD_4"})

-- 自定义参数初始化
exlcd.init({
    lcd_model = "st7796",
    port = lcd.HWID_0,
    pin_rst = 36,
    pin_pwr = 25,
    pin_pwm = 2,
    w = 480,
    h = 320,
    direction = 0
})

```

---

## exlcd.set_bl(level)

设置背光亮度

**参数**

|传入值类型|解释|
|-|-|
|number|level 亮度级别，0-100，0表示关闭背光|

**返回值**

|返回值类型|解释|
|-|-|
|bool|设置成功返回true，失败返回false|

**例子**

```lua
-- 设置50%亮度
exlcd.set_bl(50)

-- 关闭背光
exlcd.set_bl(0)

```

---

## exlcd.get_bl()

获取当前背光亮度

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|number|当前背光亮度级别(0-100)|

**例子**

```lua
local brightness = exlcd.get_bl()
log.info("当前背光亮度", brightness)

```

---

## exlcd.sleep()

屏幕进入休眠状态

**参数**

无

**返回值**

无

**例子**

```lua
exlcd.sleep()

```

---

## exlcd.wakeup()

屏幕从休眠状态唤醒

**参数**

无

**返回值**

无

**例子**

```lua
exlcd.wakeup()

```

---

## exlcd.get_sleep()

获取屏幕休眠状态

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|true表示屏幕处于休眠状态，false表示屏幕处于工作状态|

**例子**

```lua
if exlcd.get_sleep() then
    log.info("屏幕处于休眠状态")
end

```

---

