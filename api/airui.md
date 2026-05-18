# airui - AIRUI图像库 (LVGL 9.4) - 重构版本

## airui.init(width, height, color_format)

* 初始化 AIRUI

**参数**

|传入值类型|解释|
|-|-|
|int|width 屏幕宽度，默认 480|
|int|height 屏幕高度，默认 320|
|int|color_format 颜色格式，可选，默认 RGB565|

**返回值**

无

**例子**

无

---

## airui.deinit()

* 反初始化 AIRUI

**参数**

|传入值类型|解释|
|-|-|
|return|nil|

**返回值**

无

**例子**

无

---

## airui.refresh()

* 刷新 LVGL 显示（执行定时器处理）

**参数**

|传入值类型|解释|
|-|-|
|return|nil|

**返回值**

无

**例子**

无

---

## airui.full_refresh()

* 强制全屏刷新 AIRUI

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回 true，失败返回 false|

**例子**

无

---

## airui.sleep(opts)

* 休眠 AIRUI

**参数**

|传入值类型|解释|
|-|-|
|table|opts 可选配置|
|bool|opts.power_down_lcd 休眠时是否关闭 LCD 背光，默认 true|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回 true，失败返回 false|

**例子**

无

---

## airui.wakeup(opts)

* 唤醒 AIRUI

**参数**

|传入值类型|解释|
|-|-|
|table|opts 可选配置|
|bool|opts.auto_refresh 唤醒后是否自动刷新，默认 true|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回 true，失败返回 false|

**例子**

无

---

## airui.set_rotation(rotation)

* 设置 AIRUI 显示旋转

**参数**

|传入值类型|解释|
|-|-|
|int|rotation 旋转角度，仅支持 0/90/180/270|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回 true，失败返回 false|

**例子**

无

---

## airui.get_rotation()

* 获取 AIRUI 当前显示旋转

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前旋转角度，0/90/180/270|

**例子**

无

---

## airui.status()

* 获取 AIRUI 当前状态

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|状态表，包含 rotation/w/h|

**例子**

无

---

## airui.device_bind_touch(tp_cfg)

* 绑定触摸输入配置到 LuatOS 平台

**参数**

|传入值类型|解释|
|-|-|
|userdata|tp_cfg luat_tp_config_t*（lightuserdata）|

**返回值**

|返回值类型|解释|
|-|-|
|bool|绑定是否成功|

**例子**

无

---

## airui.device_bind_keypad(cfg)

* 绑定按键输入配置

**参数**

|传入值类型|解释|
|-|-|
|table|cfg 配置表|
|int\|table|cfg.up 或 cfg.pins.up|
|int\|table|cfg.down 或 cfg.pins.down|
|int\|table|cfg.left 或 cfg.pins.left|
|int\|table|cfg.right 或 cfg.pins.right|
|int\|table|cfg.ok 或 cfg.pins.ok|
|int\|table|cfg.back 或 cfg.pins.back|
|bool|cfg.active_low 可选，默认 true|
|string\|int|cfg.pull 可选，默认 "pullup"|

**返回值**

|返回值类型|解释|
|-|-|
|bool|绑定是否成功|

**例子**

无

---

## airui.keypad_subscribe(callback)

* 订阅键盘事件

**参数**

|传入值类型|解释|
|-|-|
|function|callback 回调函数，参数: key(SDL keycode), pressed(bool), timestamp(int)|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回 true，失败返回 false|

**例子**

无

---

## airui.keypad_unsubscribe()

* 取消键盘事件订阅

**参数**

|传入值类型|解释|
|-|-|
|return|nil|

**返回值**

无

**例子**

无

---

## airui.font_load(config)

* 加载字体

**参数**

|传入值类型|解释|
|-|-|
|table|config 配置表|
|string|config.type 字体类型，"hzfont" 或 "bin"|
|string|config.path 字体路径，对于 "hzfont"，传 nil 则使用内置字库|
|int|config.size 可选，TTF 字体大小，默认 16|
|int|config.cache_size 可选，TTF 缓存数量，默认 1024|
|int|config.antialias 可选，TTF 抗锯齿等级，默认 -1（自动）；1=边界2x2，2=边界3x3，3=边界4x4|
|bool|config.load_to_psram 可选，是否将字体及缓存加载到 PSRAM（默认 false）|
|bool|config.global 可选，是否设为全局默认字体（默认 true）|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|字体指针|

**例子**

无

---

## airui.debug(enable)

* 调试开关与状态

**参数**

|传入值类型|解释|
|-|-|
|bool|enable true 开启，false 关闭|
|return|bool\|table|

**返回值**

无

**例子**

无

---

## airui.version()

* 获取 AIRUI 库的版本号

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|当前版本（由 AIRUI_VERSION 提供）|

**例子**

无

---

