# eink - 墨水屏操作库

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/eink/luat_lib_eink.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

> 本库有专属demo，[点此链接查看eink的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/eink)

## eink.setup(full, spiid)

初始化eink

**参数**

|传入值类型|解释|
|-|-|
|int|全屏刷新0,局部刷新1,默认是全屏刷新|
|int|所在的spi,默认是0|
|int|Busy 忙信号管脚|
|int|Reset 复位管脚|
|int|DC 数据命令选择管脚|
|int|CS 使能管脚|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

无

---

## eink.sleep()

进入休眠模式，再次使用时需要重新初始化

**参数**

无

**返回值**

无

**例子**

无

---

## eink.clear(color, force)

清除绘图缓冲区，默认不会马上刷新到设备

**参数**

|传入值类型|解释|
|-|-|
|number|color 可选，默认1。刷屏颜色|
|bool|force 可选，默认false。如果为true则马上清屏|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## eink.setWin(width, height, rotate)

设置窗口

**参数**

|传入值类型|解释|
|-|-|
|int|width  宽度|
|int|height 高度|
|int|rotate 显示方向,0/1/2/3, 相当于旋转0度/90度/180度/270度|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## eink.getWin()

获取窗口信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|width  宽|
|int|height 高|
|int|rotate 旋转方向|

**例子**

无

---

## eink.setFont(font) 

设置字体

**参数**

|传入值类型|解释|
|-|-|
|userdata|字体.|

**返回值**

无

**例子**

```lua
-- 设置为中文字体,对之后的drawStr有效
eink.setFont(eink.font_opposansm12)

```

---

## eink.print(x, y, str, colored)

绘制字符串

**参数**

|传入值类型|解释|
|-|-|
|int|x坐标|
|int|y坐标|
|string|字符串|
|int|默认是0|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## eink.show(x, y, noClear)

将缓冲区图像输出到屏幕

**参数**

|传入值类型|解释|
|-|-|
|int|x 输出的x坐标,默认0|
|int|y 输出的y坐标,默认0|
|bool|noClear 可选，默认false。如果为true则不进行清屏，直接刷上新内容|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## eink.line(x, y, x2, y2, colored)

缓冲区绘制线

**参数**

|传入值类型|解释|
|-|-|
|int|起点x坐标|
|int|起点y坐标|
|int|终点x坐标|
|int|终点y坐标|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
eink.line(0, 0, 10, 20, 0)

```

---

## eink.rect(x, y, x2, y2, colored, fill)

缓冲区绘制矩形

**参数**

|传入值类型|解释|
|-|-|
|int|左上顶点x坐标|
|int|左上顶点y坐标|
|int|右下顶点x坐标|
|int|右下顶点y坐标|
|int|默认是0|
|int|是否填充,默认是0,不填充|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
eink.rect(0, 0, 10, 20)
eink.rect(0, 0, 10, 20, 1) -- Filled

```

---

## eink.circle(x, y, radius, colored, fill)

缓冲区绘制圆形

**参数**

|传入值类型|解释|
|-|-|
|int|圆心x坐标|
|int|圆心y坐标|
|int|半径|
|int|默认是0|
|int|是否填充,默认是0,不填充|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
eink.circle(0, 0, 10)
eink.circle(0, 0, 10, 1, 1) -- Filled

```

---

## eink.qrcode(x, y, str, size)

缓冲区绘制QRCode

**参数**

|传入值类型|解释|
|-|-|
|int|x坐标|
|int|y坐标|
|string|二维码的内容|
|int|可选,显示大小,不可小于21,默认21|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## eink.bat(x, y, bat)

缓冲区绘制电池

**参数**

|传入值类型|解释|
|-|-|
|int|x坐标|
|int|y坐标|
|int|电池电压,单位毫伏|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## eink.weather_icon(x, y, code)

缓冲区绘制天气图标

**参数**

|传入值类型|解释|
|-|-|
|int|x坐标|
|int|y坐标|
|int|天气代号|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## eink.model(m)

设置墨水屏驱动型号

**参数**

|传入值类型|解释|
|-|-|
|int|型号名称, 例如 eink.model(eink.MODEL_1in54_V2)|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## eink.drawXbm(x, y, w, h, data)

绘制位图

**参数**

|传入值类型|解释|
|-|-|
|int|X坐标|
|int|y坐标|
|int|位图宽|
|int|位图高|
|int|位图数据,每一位代表一个像素|

**返回值**

无

**例子**

```lua
-- 取模使用PCtoLCD2002软件即可
-- 在(0,0)为左上角,绘制 16x16 "今" 的位图
eink.drawXbm(0, 0, 16,16, string.char(
    0x80,0x00,0x80,0x00,0x40,0x01,0x20,0x02,0x10,0x04,0x48,0x08,0x84,0x10,0x83,0x60,
    0x00,0x00,0xF8,0x0F,0x00,0x08,0x00,0x04,0x00,0x04,0x00,0x02,0x00,0x01,0x80,0x00
))

```

---

