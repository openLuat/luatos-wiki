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
|string|tp类型，当前支持：<br>gt911 <br>gt9157 <br>jd9261t|
|table|附加参数,与具体设备有关：<br>port 驱动方式<br>port：硬件i2c端口,例如0,1,2...如果为软件i2c对象<br>pin_rst：复位引脚<br>pin_int：中断引脚<br>w:宽度<br>h:高度|
|function|回调函数, 回调参数:tp_device,tp_data:触摸数据,内部为多个触摸点数据表,每个表中有参数event:触摸事件 x:x坐标 y:y坐标 |
|return|tp_device|

**返回值**

无

**例子**

无

---

