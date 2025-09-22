# eink - 墨水屏操作库

## 常量

|常量|类型|解释|
|-|-|-|
|eink.MODEL_1in02d|number|1.02寸d|
|eink.MODEL_1in54|number|1.54寸|
|eink.MODEL_1in54_V2|number|1.54寸_V2|
|eink.MODEL_1in54b|number|1.54寸b|
|eink.MODEL_1in54b_V2|number|1.54寸b_V2|
|eink.MODEL_1in54_V3|number|1.54寸_V3|
|eink.MODEL_1in54c|number|1.54寸c|
|eink.MODEL_1in54r|number|1.54寸三色屏152*152|
|eink.MODEL_2in13|number|2.13寸|
|eink.MODEL_2in13bc|number|2.13寸bc|
|eink.MODEL_2in13d|number|2.13寸d|
|eink.MODEL_2in13_V2|number|2.13寸V2|
|eink.MODEL_2in54b_V3|number|2.13寸b_V3|
|eink.MODEL_2in66|number|2.66寸|
|eink.MODEL_2in66b|number|2.66寸b|
|eink.MODEL_2in7|number|2.7寸|
|eink.MODEL_2in7b|number|2.7寸b|
|eink.MODEL_2in9|number|2.9寸|
|eink.MODEL_2in9_V2|number|2.9寸_V2|
|eink.MODEL_2in9bc|number|2.9寸bc|
|eink.MODEL_2in9b_V3|number|2.9寸b_V3|
|eink.MODEL_2in9d|number|2.9寸d|
|eink.MODEL_3in52|number|3.52寸|
|eink.MODEL_3in7|number|3.7寸|
|eink.MODEL_3in7_U|number|3.7寸|
|eink.MODEL_4in2|number|4.2寸|
|eink.MODEL_4in2V2|number|4.2寸V2(ssd1683)|
|eink.MODEL_4in2bc|number|4.2寸b|
|eink.MODEL_4in2b_V2|number|4.2寸V2|
|eink.MODEL_5in65f|number|5.65寸f|
|eink.MODEL_5in83|number|5.83寸|
|eink.MODEL_5in83bc|number|5.83寸bc|
|eink.MODEL_5in83_V2|number|5.83寸V2|
|eink.MODEL_5in83b_V2|number|5.83寸bV2|
|eink.MODEL_7in5|number|7.5寸|
|eink.MODEL_7in5_HD|number|7.5寸HD|
|eink.MODEL_7in5_V2|number|7.5寸V2|
|eink.MODEL_7in5bc|number|7.5寸bc|
|eink.MODEL_7in5b_HD|number|7.5寸b_HD|
|eink.MODEL_7in5b_V2|number|7.5寸b_V2|
|eink.font_opposansm12|font|12号字体|
|eink.font_unifont_t_symbols|font|符号字体|
|eink.font_open_iconic_weather_6x_t|font|天气字体|
|eink.font_opposansm16|font|16号字体|
|eink.font_opposansm18|font|18号字体|
|eink.font_opposansm20|font|20号字体|
|eink.font_opposansm22|font|22号字体|
|eink.font_opposansm24|font|24号字体|
|eink.font_opposansm32|font|32号字体|
|eink.font_opposansm12_chinese|font|12号中文字体|
|eink.font_opposansm14_chinese|font|14号中文字体|
|eink.font_opposansm16_chinese|font|16号中文字体|
|eink.font_opposansm18_chinese|font|18号中文字体|
|eink.font_opposansm20_chinese|font|20号中文字体|
|eink.font_opposansm22_chinese|font|22号中文字体|
|eink.font_opposansm24_chinese|font|24号中文字体|
|eink.font_opposansm32_chinese|font|32号中文字体|


## eink.init(tp, args,spi_device)

eink显示屏初始化

**参数**

|传入值类型|解释|
|-|-|
|number|eink类型，当前支持：https://wiki.luatos.com/api/eink.html#id1|
|table|附加参数,与具体设备有关：<br>pin_busy（busy）<br>port：spi端口,例如0,1,2...如果为device方式则为"device"<br>pin_dc：eink数据/命令选择引脚<br>pin_rst：eink复位引脚|
|userdata|spi设备,当port = "device"时有效|

**返回值**

无

**例子**

```lua
-- 初始化spi0的eink.MODEL_4in2bc) 注意:eink初始化之前需要先初始化spi
spi_eink = spi.deviceSetup(0,20,0,0,8,20000000,spi.MSB,1,1)
log.info("eink.init",
eink.init(eink.MODEL_4in2bc,{port = "device",pin_dc = 17, pin_pwr = 7,pin_rst = 19,direction = 2,w = 160,h = 80,xoffset = 1,yoffset = 26},spi_eink))

```

---

## eink.setup(full, spiid, pin_busy, pin_reset, pin_dc, pin_cs)

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
|userdata|字体|

**返回值**

无

**例子**

```lua
-- 设置为字体,对之后的print有效
eink.setFont(eink.font_opposansm12_chinese)

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
|int|颜色, 可以是0或者1, 默认是0|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 先设置字体, 然后写字
-- 可用字体取决于具体的固件, 如果没有你想要的大小, 请联系销售人员定制
-- font_opposansm8_chinese
-- font_opposansm10_chinese
-- font_opposansm12_chinese
-- font_opposansm14_chinese
-- font_opposansm16_chinese
eink.setFont(eink.font_opposansm12_chinese)
eink.print(10, 20, "LuatOS")

```

---

## eink.show(x, y, noClear)

将缓冲区图像输出到屏幕

**参数**

|传入值类型|解释|
|-|-|
|int|x 输出的x坐标,默认0|
|int|y 输出的y坐标,默认0|
|bool|可选，默认false。如果为true则不进行清屏，直接刷上新内容|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## eink.draw(buff, buff2, noclear)

直接输出数据到屏幕,支持双色数据

**参数**

|传入值类型|解释|
|-|-|
|userdata|zbuff指针|
|userdata|zbuff指针|
|bool|可选，默认false。如果为true则不进行清屏，直接刷上新内容|

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
eink.rect(0, 0, 10, 20,0, 1) -- Filled

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
|int|显示大小 (注意:二维码生成大小与要显示内容和纠错等级有关,生成版本为1-40(对应 21x21 - 177x177)的不定大小,如果和设置大小不同会自动在指定的区域中间显示二维码,如二维码未显示请查看日志提示)|

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

## eink.setCtx(index)

切换颜色画板, 适合多色墨水屏

**参数**

|传入值类型|解释|
|-|-|
|int|颜色索引, 黑色为0, 红色为1|

**返回值**

无

**例子**

```lua
-- 仅适合多色墨水屏, 对单色墨水屏(只有黑白)的无效
eink.setCtx(1)
-- 切换后, 所有drawXXX都会操作在指定颜色的画板

```

---

## eink.async(index)

异步方式，使用此方式需要先 require("sysplus") 之后 eink.clear().wait() eink.show().wait()进行刷屏

**参数**

|传入值类型|解释|
|-|-|
|int|1 使用异步|

**返回值**

无

**例子**

```lua
    eink.async(1)
    spi_eink = spi.deviceSetup(spi_id,pin_cs,0,0,8,20*1000*1000,spi.MSB,1,1)
    eink.init(eink.MODEL_1in54,
            {port = "device",pin_dc = pin_dc, pin_busy = pin_busy,pin_rst = pin_reset},
            spi_eink)
    eink.setWin(200, 200, 0)
    sys.wait(100)
    log.info("e-paper 1.54", "Testing Go")
    eink.print(30, 20, "LuatOS-AIR780E",0x00)
    eink.show().wait()
    log.info("e-paper 1.54", "Testing End")

```

---

