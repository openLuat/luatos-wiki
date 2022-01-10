# lcd - lcd驱动模块

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/lcd/luat_lib_lcd.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## lcd.init(tp, args)

lcd显示屏初始化

**参数**

|传入值类型|解释|
|-|-|
|string|lcd类型, 当前支持st7789/st7735/st7735v/st7735s/gc9a01/gc9106l/gc9306/ili9341/custom|
|table|附加参数,与具体设备有关,pin_pwr为可选项,可不设置port:spi端口,例如0,1,2...如果为device方式则为"device";pin_dc:lcd数据/命令选择引脚;pin_rst:lcd复位引脚;pin_pwr:lcd背光引脚 可选项,可不设置;direction:lcd屏幕方向 0:0° 1:180° 2:270° 3:90°;w:lcd 水平分辨率;h:lcd 竖直分辨率;xoffset:x偏移(不同屏幕ic 不同屏幕方向会有差异);yoffset:y偏移(不同屏幕ic 不同屏幕方向会有差异)|
|userdata|spi设备,当port = "device"时有效|

**返回值**

无

**例子**

```lua
-- 初始化spi0的st7789 注意:lcd初始化之前需要先初始化spi
spi_lcd = spi.deviceSetup(0,20,0,0,8,2000000,spi.MSB,1,1)
log.info("lcd.init",
lcd.init("st7735s",{port = "device",pin_dc = 17, pin_pwr = 7,pin_rst = 19,direction = 2,w = 160,h = 80,xoffset = 1,yoffset = 26},spi_lcd))

```

---

## lcd.close()

关闭lcd显示屏

**参数**

无

**返回值**

无

**例子**

```lua
-- 关闭lcd
lcd.close()

```

---

## lcd.on()

开启lcd显示屏背光

**参数**

无

**返回值**

无

**例子**

```lua
-- 开启lcd显示屏背光
lcd.on()

```

---

## lcd.off()

关闭lcd显示屏背光

**参数**

无

**返回值**

无

**例子**

```lua
-- 关闭lcd显示屏背光
lcd.off()

```

---

## lcd.sleep()

lcd睡眠

**参数**

无

**返回值**

无

**例子**

```lua
-- lcd睡眠
lcd.sleep()

```

---

## lcd.wakeup()

lcd唤醒

**参数**

无

**返回值**

无

**例子**

```lua
-- lcd唤醒
lcd.wakeup()

```

---

## lcd.setColor(back,fore)

lcd颜色设置

**参数**

|传入值类型|解释|
|-|-|
|int|背景色|
|int|前景色|

**返回值**

无

**例子**

```lua
-- lcd颜色设置
lcd.setColor(0xFFFF,0x0000)

```

---

## lcd.draw(x1, y1, x2, y2,color)

lcd颜色填充

**参数**

|传入值类型|解释|
|-|-|
|int|左上边缘的X位置.|
|int|左上边缘的Y位置.|
|int|右上边缘的X位置.|
|int|右上边缘的Y位置.|
|string|字符串或zbuff对象|

**返回值**

无

**例子**

```lua
-- lcd颜色填充
local buff = zbuff.create({201,1,16},0x001F)
lcd.draw(20,30,220,30,buff)

```

---

## lcd.clear(color)

lcd清屏

**参数**

|传入值类型|解释|
|-|-|
|int|屏幕颜色 可选参数,默认背景色|

**返回值**

无

**例子**

```lua
-- lcd清屏
lcd.clear()

```

---

## lcd.fill(x1, y1, x2, y2,color)

lcd颜色填充

**参数**

|传入值类型|解释|
|-|-|
|int|左上边缘的X位置.|
|int|左上边缘的Y位置.|
|int|右上边缘的X位置.|
|int|右上边缘的Y位置.|
|int|绘画颜色 可选参数,默认背景色|

**返回值**

无

**例子**

```lua
-- lcd颜色填充
lcd.fill(20,30,220,30,0x0000)

```

---

## lcd.drawPoint(x0,y0,color)

画一个点.

**参数**

|传入值类型|解释|
|-|-|
|int|点的X位置.|
|int|点的Y位置.|
|int|绘画颜色 可选参数,默认前景色|

**返回值**

无

**例子**

```lua
lcd.drawPoint(20,30,0x001F)

```

---

## lcd.drawLine(x0,y0,x1,y1,color)

在两点之间画一条线.

**参数**

|传入值类型|解释|
|-|-|
|int|第一个点的X位置.|
|int|第一个点的Y位置.|
|int|第二个点的X位置.|
|int|第二个点的Y位置.|
|int|绘画颜色 可选参数,默认前景色|

**返回值**

无

**例子**

```lua
lcd.drawLine(20,30,220,30,0x001F)

```

---

## lcd.drawRectangle(x0,y0,x1,y1,color)

从x / y位置（左上边缘）开始绘制一个框

**参数**

|传入值类型|解释|
|-|-|
|int|左上边缘的X位置.|
|int|左上边缘的Y位置.|
|int|右下边缘的X位置.|
|int|右下边缘的Y位置.|
|int|绘画颜色 可选参数,默认前景色|

**返回值**

无

**例子**

```lua
lcd.drawRectangle(20,40,220,80,0x001F)

```

---

## lcd.drawCircle(x0,y0,r,color)

从x / y位置（圆心）开始绘制一个圆

**参数**

|传入值类型|解释|
|-|-|
|int|圆心的X位置.|
|int|圆心的Y位置.|
|int|半径.|
|int|绘画颜色 可选参数,默认前景色|

**返回值**

无

**例子**

```lua
lcd.drawCircle(120,120,20,0x001F)

```

---

## lcd.drawQrcode(x, y, str, version)

缓冲区绘制QRCode

**参数**

|传入值类型|解释|
|-|-|
|int|x坐标|
|int|y坐标|
|string|二维码的内容|
|int|二维码版本号 可选1_40 对应21*21到177*177|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## lcd.setFont(font)

设置字体

**参数**

|传入值类型|解释|
|-|-|
|int|font lcd.font_opposansm8 lcd.font_opposansm10 lcd.font_opposansm16  lcd.font_opposansm18  lcd.font_opposansm20  lcd.font_opposansm22  lcd.font_opposansm24 lcd.font_opposansm32 lcd.font_opposansm12_chinese lcd.font_opposansm16_chinese lcd.font_opposansm24_chinese lcd.font_opposansm32_chinese |

**返回值**

无

**例子**

```lua
-- 设置为字体,对之后的drawStr有效,调用lcd.drawStr前一定要先设置
-- 使用中文字体需在luat_conf_bsp.h中开启相对应的宏
lcd.setFont(lcd.font_opposansm12)
lcd.drawStr(40,10,"drawStr")
sys.wait(2000)
lcd.setFont(lcd.font_opposansm12_chinese)
lcd.drawStr(40,40,"drawStr测试")

```

---

## lcd.drawStr(x,y,str,fg_color)

显示字符串

**参数**

|传入值类型|解释|
|-|-|
|int|x 横坐标|
|int|y 竖坐标  注意:此(x,y)为左下起始坐标|
|string|str 文件内容|
|int|fg_color str颜色 注意:此参数可选，如不填写则使用之前设置的颜色，绘制只会绘制字体部分，背景需要自己清除|

**返回值**

无

**例子**

```lua
-- 显示之前先设置为中文字体,对之后的drawStr有效,使用中文字体需在luat_conf_bsp.h.h开启#define USE_U8G2_OPPOSANSMxx_CHINESE xx代表字号
lcd.setFont(lcd.font_opposansm12)
lcd.drawStr(40,10,"drawStr")
sys.wait(2000)
lcd.setFont(lcd.font_opposansm16_chinese)
lcd.drawStr(40,40,"drawStr测试")

```

---

## lcd.drawGtfontGb2312(str,size,x,y)

使用gtfont显示gb2312字符串

**参数**

|传入值类型|解释|
|-|-|
|string|str 显示字符串|
|int|size 字体大小 (支持16-192号大小字体)|
|int|x 横坐标|
|int|y 竖坐标|

**返回值**

无

**例子**

```lua
lcd.drawGtfontGb2312("啊啊啊",32,0,0)

```

---

## lcd.drawGtfontGb2312Gray(str,size,gray,x,y)

使用gtfont灰度显示gb2312字符串

**参数**

|传入值类型|解释|
|-|-|
|string|str 显示字符串|
|int|size 字体大小 (支持16-192号大小字体)|
|int|gray 灰度[1阶/2阶/3阶/4阶]|
|int|x 横坐标|
|int|y 竖坐标|

**返回值**

无

**例子**

```lua
lcd.drawGtfontGb2312Gray("啊啊啊",32,4,0,40)

```

---

## lcd.drawGtfontUtf8(str,size,x,y)

使用gtfont显示UTF8字符串

**参数**

|传入值类型|解释|
|-|-|
|string|str 显示字符串|
|int|size 字体大小 (支持16-192号大小字体)|
|int|x 横坐标|
|int|y 竖坐标|

**返回值**

无

**例子**

```lua
lcd.drawGtfontUtf8("啊啊啊",32,0,0)

```

---

## lcd.drawGtfontUtf8Gray(str,size,gray,x,y)

使用gtfont灰度显示UTF8字符串

**参数**

|传入值类型|解释|
|-|-|
|string|str 显示字符串|
|int|size 字体大小 (支持16-192号大小字体)|
|int|gray 灰度[1阶/2阶/3阶/4阶]|
|int|x 横坐标|
|int|y 竖坐标|

**返回值**

无

**例子**

```lua
lcd.drawGtfontUtf8Gray("啊啊啊",32,4,0,40)

```

---

## lcd.getSize()

获取屏幕尺寸

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|宽, 如果未初始化会返回0|
|int|高, 如果未初始化会返回0|

**例子**

```lua
log.info("lcd", "size", lcd.getSize())

```

---

## lcd.drawXbm(x, y, w, h, data)

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
lcd.drawXbm(0, 0, 16,16, string.char(
    0x80,0x00,0x80,0x00,0x40,0x01,0x20,0x02,0x10,0x04,0x48,0x08,0x84,0x10,0x83,0x60,
    0x00,0x00,0xF8,0x0F,0x00,0x08,0x00,0x04,0x00,0x04,0x00,0x02,0x00,0x01,0x80,0x00
))

```

---

