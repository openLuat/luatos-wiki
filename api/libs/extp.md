# extp - 触摸系统拓展库

**示例**

```lua
本文件为触摸系统拓展库，核心业务逻辑为：
1、初始化触摸设备，支持多种触摸芯片
2、处理原始触摸数据并解析为各种手势事件
3、通过统一消息接口发布触摸事件
4、提供消息发布控制功能
5、提供滑动和长按阈值配置功能

支持的触摸事件类型包括：
RAW_DATA、TOUCH_DOWN、MOVE_X、MOVE_Y、SWIPE_LEFT、SWIPE_RIGHT、
SWIPE_UP、SWIPE_DOWN、SINGLE_TAP、LONG_PRESS

本文件的对外接口有5个：
1、extp.init(param)：触摸设备初始化函数
2、extp.set_publish_enabled(msg_type, enabled)：设置消息发布状态
3、extp.get_publish_enable(msg_type)：获取消息发布状态
4、extp.set_swipe_threshold(threshold)：设置滑动判定阈值
5、extp.set_long_press_threshold(threshold)：设置长按判定阈值

所有触摸事件均通过sys.publish("BASE_TOUCH_EVENT", event_type, ...)发布

```

## extp.set_publish_enabled(msg_type, enabled)

设置消息发布状态

**参数**

|传入值类型|解释|
|-|-|
|string|msg_type 消息类型，支持"ALL"或具体事件类型|
|bool|enabled 是否启用发布|

**返回值**

|返回值类型|解释|
|-|-|
|bool|操作成功返回true，失败返回false|

**例子**

```lua
-- 启用单击事件
extp.set_publish_enabled("SINGLE_TAP", true)

-- 禁用所有消息发布
extp.set_publish_enabled("ALL", false)

```

---

## extp.get_publish_enable(msg_type)

获取消息发布状态

**参数**

|传入值类型|解释|
|-|-|
|string|msg_type 消息类型，"ALL"或具体事件类型|

**返回值**

|返回值类型|解释|
|-|-|
|bool\|table|发布状态或所有状态表|

**例子**

```lua
-- 获取单击事件状态
local enabled = extp.get_publish_enable("SINGLE_TAP")

-- 获取所有状态
local all_status = extp.get_publish_enable("ALL")

```

---

## extp.set_swipe_threshold(threshold)

设置滑动判定阈值

**参数**

|传入值类型|解释|
|-|-|
|number|threshold 滑动判定阈值（像素）|

**返回值**

|返回值类型|解释|
|-|-|
|bool|设置成功返回true，失败返回false|

**例子**

```lua
-- 设置滑动阈值为50像素
extp.set_swipe_threshold(50)

```

---

## extp.set_long_press_threshold(threshold)

设置长按判定阈值

**参数**

|传入值类型|解释|
|-|-|
|number|threshold 长按判定阈值（毫秒）|

**返回值**

|返回值类型|解释|
|-|-|
|bool|设置成功返回true，失败返回false|

**例子**

```lua
-- 设置长按阈值为800毫秒
extp.set_long_press_threshold(800)

```

---

## extp.init(param)

初始化触摸设备

**参数**

|传入值类型|解释|
|-|-|
|table|param 触摸芯片配置参数，参考库的说明及demo用法|

**返回值**

|返回值类型|解释|
|-|-|
|bool|初始化成功返回true，失败返回false|

**例子**

```lua
-- 基础触摸初始化
extp.init({
    tp_model = "gt911",
    i2c_id = 0,
    pin_rst = 20,
    pin_int = 21
})

-- 使用预定义配置
extp.init({tp_model = "AirLCD_1010"})

-- 带屏幕尺寸的初始化
extp.init({
    tp_model = "gt911", 
    i2c_id = 0,
    pin_rst = 20,
    pin_int = 21,
    w = 480,
    h = 320
})

```

---

