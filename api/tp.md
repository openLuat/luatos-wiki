# tp - 触摸库

## 常量

|常量|类型|解释|
|-|-|-|
|tp.EVENT_NONE|number|空事件,不应出现|
|tp.EVENT_DOWN|number|按下|
|tp.EVENT_UP|number|抬起|
|tp.EVENT_MOVE|number|移动|


## tp.init(tp, args)

触摸初始化

**参数**

|传入值类型|解释|
|-|-|
|string|触摸芯片型号，当前支持：<br>gt911 <br>gt9157 <br>jd9261t|
|table|附加参数,与具体设备有关：<br>port 驱动方式<br>port：硬件i2c端口,例如0,1,2...如果为软件i2c对象<br>pin_rst：复位引脚<br>pin_int：中断引脚<br>w:宽度(可选,默认会寻找已初始化的lcd的数据)<br>h:高度(可选,默认会寻找已初始化的lcd的数据)|
|function|回调函数(可选,使用lvgl时可不传入,lvgl会自动处理), 回调参数: <br>tp_device: userdata tp.init返回的触摸设备对象 <br>tp_data: table 触摸数据,内部为多个触摸点数据的表,每个表中包括参数有: event: number 触摸事件,见文档上方的触摸事件常量 x: number 触摸位置x坐标 y: number 触摸位置y坐标 timestamp: number 时间戳|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|tp_device:触摸设备对象|

**例子**

```lua
    local function tp_callBack(tp_device, tp_data)
        log.info("TP", tp_data[1].x, tp_data[1].y, tp_data[1].event)
        sys.publish("TP", tp_device, tp_data)
    end

    -- 硬件i2c驱动
    --tp.init("gt911",{port=0,pin_rst = 22,pin_int = 23},tp_callBack)

    -- 软件i2c驱动
    --local softI2C = i2c.createSoft(20, 21)
    --tp.init("gt911",{port=softI2C,pin_rst = 22,pin_int = 23},tp_callBack)

```

---

