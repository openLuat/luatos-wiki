# lcd - lcd驱动模块

## 常量

|常量|类型|解释|
|-|-|-|
|lcd.font_opposansm12|font|12号字体|
|lcd.font_unifont_t_symbols|font|符号字体|
|lcd.font_open_iconic_weather_6x_t|font|天气字体|
|lcd.font_opposansm16|font|16号字体|
|lcd.font_opposansm18|font|18号字体|
|lcd.font_opposansm20|font|20号字体|
|lcd.font_opposansm22|font|22号字体|
|lcd.font_opposansm24|font|24号字体|
|lcd.font_opposansm32|font|32号字体|
|lcd.font_opposansm12_chinese|font|12号中文字体|
|lcd.font_opposansm14_chinese|font|14号中文字体|
|lcd.font_opposansm16_chinese|font|16号中文字体|
|lcd.font_opposansm18_chinese|font|18号中文字体|
|lcd.font_opposansm20_chinese|font|20号中文字体|
|lcd.font_opposansm22_chinese|font|22号中文字体|
|lcd.font_opposansm24_chinese|font|24号中文字体|
|lcd.font_opposansm32_chinese|font|32号中文字体|
|lcd.direction_0|int|0°方向命令|
|lcd.direction_90|int|90°方向命令|
|lcd.direction_180|int|180°方向命令|
|lcd.direction_270|int|270°方向命令|
|lcd.SPI|硬件spi|device lcd驱动|
|lcd.HWID_0|硬件lcd驱动id0|(根据芯片支持选择)|
|lcd.RGB|硬件RGB|lcd驱动 (根据芯片支持选择)|
|lcd.ARM2D|硬件ARM2D|lcd驱动 (根据芯片支持选择)|
|lcd.DMA2D|硬件DMA2D|lcd驱动 (根据芯片支持选择)|
|lcd.WIRE_3_BIT_9_INTERFACE_I|三线spi|9bit 模式I|
|lcd.WIRE_4_BIT_8_INTERFACE_I|四线spi|8bit 模式I|
|lcd.WIRE_3_BIT_9_INTERFACE_II|三线spi|9bit 模式II|
|lcd.WIRE_4_BIT_8_INTERFACE_II|四线spi|8bit 模式II|
|lcd.DATA_2_LANE|int|双通道模式|


## lcd.init(tp, args, spi_dev, init_in_service)



lcd显示屏初始化

**参数**

|传入值类型|解释|
|-|-|
|string|lcd类型，当前支持：<br>st7796<br>st7789<br>st7735<br>st7735v<br>st7735s<br>gc9a01<br>gc9106l<br>gc9306x<br>ili9486<br>custom|
|table|附加参数,与具体设备有关：<br>pin_pwr（背光）为可选项,可不设置<br>port：驱动端口,rgb:lcd.RGB spi:例如0,1,2...如果为device方式则为"device"<br>pin_dc：lcd数据/命令选择引脚<br>pin_rst：lcd复位引脚<br>pin_pwr：lcd背光引脚 可选项,可不设置<br>direction：lcd屏幕方向 0:0° 1:180° 2:270° 3:90°<br>w：lcd 水平分辨率<br>h：lcd 竖直分辨率<br>xoffset：x偏移(不同屏幕ic 不同屏幕方向会有差异)<br>yoffset：y偏移(不同屏幕ic 不同屏幕方向会有差异)<br>direction0：0°方向命令，(不同屏幕ic会有差异)<br>direction90：90°方向命令，(不同屏幕ic会有差异)<br>direction180：180°方向命令，(不同屏幕ic会有差异)<br>direction270：270°方向命令，(不同屏幕ic会有差异) <br>sleepcmd：睡眠命令，默认0X10<br>wakecmd：唤醒命令，默认0X11 <br>interface_mode lcd模式，默认lcd.WIRE_4_BIT_8_INTERFACE_I <br>bus_speed:qspi/rgb总线速率 <br>hbp:水平后廊 <br>hspw:水平同步脉冲宽度 <br>hfp:水平前廊,<br>vbp:垂直后廊 <br>vspw:垂直同步脉冲宽度 <br>vfp:垂直前廊|

**返回值**

无

**例子**

无

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

## lcd.invon()



lcd反显

**参数**

无

**返回值**

无

**例子**

```lua
-- lcd反显
lcd.invon()

```

---

## lcd.invoff()



lcd反显关闭

**参数**

无

**返回值**

无

**例子**

```lua
-- lcd反显关闭
lcd.invoff()

```

---

## lcd.cmd(cmd)



lcd命令

**参数**

|传入值类型|解释|
|-|-|
|int|cmd|

**返回值**

无

**例子**

```lua
-- lcd命令
lcd.cmd(0x21)

```

---

## lcd.data(data)



lcd数据

**参数**

|传入值类型|解释|
|-|-|
|int|data|

**返回值**

无

**例子**

```lua
-- lcd数据
lcd.data(0x21)

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
|int|右下边缘的X位置.|
|int|右下边缘的Y位置.|
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
|int|右下边缘的X位置,不含|
|int|右下边缘的Y位置,不含|
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

## lcd.drawQrcode(x, y, str, size)



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

## lcd.setFont(font, indentation)



设置字体

**参数**

|传入值类型|解释|
|-|-|
|int|font lcd.font_XXX 请查阅常量表|
|int|indentation, 等宽字体ascii右侧缩进0~127个pixel，等宽字体的ascii字符可能在右侧有大片空白，用户可以选择删除部分。留空或者超过127则直接删除右半边, 非等宽字体无效|

**返回值**

无

**例子**

```lua
-- 设置为字体,对之后的drawStr有效,调用lcd.drawStr前一定要先设置

-- 若提示 "only font pointer is allow" , 则代表当前固件不含对应字体, 可使用云编译服务免费定制
-- 云编译文档: https://wiki.luatos.com/develop/compile/Cloud_compilation.html

-- lcd库的默认字体均以 lcd.font_ 开头
lcd.setFont(lcd.font_opposansm12)
lcd.drawStr(40,10,"drawStr")
sys.wait(2000)
lcd.setFont(lcd.font_opposansm12_chinese) -- 具体取值可参考api文档的常量表
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
-- 显示之前先设置为中文字体,对之后的drawStr有效
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
-- 注意, gtfont是额外的字体芯片硬件, 需要外挂在SPI总线才能调用本函数的
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
|int|gray 灰度[1阶/2阶/4阶]|
|int|x 横坐标|
|int|y 竖坐标|

**返回值**

无

**例子**

```lua
-- 注意, gtfont是额外的字体芯片硬件, 需要外挂在SPI总线才能调用本函数的
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
|int|gray 灰度[1阶/2阶/4阶]|
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
-- 取模使用PCtoLCD2002软件即可 阴码 逐行 逆向
-- 在(0,0)为左上角,绘制 16x16 "今" 的位图
lcd.drawXbm(0, 0, 16,16, string.char(
    0x80,0x00,0x80,0x00,0x40,0x01,0x20,0x02,0x10,0x04,0x48,0x08,0x84,0x10,0x83,0x60,
    0x00,0x00,0xF8,0x0F,0x00,0x08,0x00,0x04,0x00,0x04,0x00,0x02,0x00,0x01,0x80,0x00
))

```

---

## lcd.showImage(x, y, file)



显示图片,当前只支持jpg,jpeg

**参数**

|传入值类型|解释|
|-|-|
|int|X坐标|
|int|y坐标|
|string|文件路径|

**返回值**

无

**例子**

```lua
lcd.showImage(0,0,"/luadb/logo.jpg")

```

---

## lcd.flush()



主动刷新数据到界面, 仅设置buff且禁用自动属性后使用

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true, 否则返回nil/false|

**例子**

```lua
-- 本API与 lcd.setupBuff lcd.autoFlush 配合使用
lcd.flush()

```

---

## lcd.setupBuff(conf, onheap)



设置显示缓冲区, 所需内存大小为 2×宽×高 字节. 请衡量内存需求与业务所需的刷新频次.

**参数**

|传入值类型|解释|
|-|-|
|userdata|conf指针, 不需要传|
|bool|true使用heap内存, false使用vm内存, 默认使用vm内存, 不需要主动传|

**返回值**

|返回值类型|解释|
|-|-|
|bool|是否成功|

**例子**

```lua
-- 初始化lcd的buff缓冲区, 可理解为FrameBuffer区域.
lcd.setupBuff()

```

---

## lcd.autoFlush(enable)



设置自动刷新, 需配合lcd.setupBuff使用

**参数**

|传入值类型|解释|
|-|-|
|bool|是否自动刷新,默认为true|

**返回值**

无

**例子**

```lua
-- 设置buff 并禁用自动更新
lcd.setupBuff()
lcd.autoFlush(false)
-- 禁止自动更新后, 需要使用 lcd.flush() 主动刷新数据到屏幕

```

---

## lcd.rgb565(r, g, b, swap)



RGB565颜色生成

**参数**

|传入值类型|解释|
|-|-|
|int|红色, 0x00 ~ 0xFF|
|int|绿色, 0x00 ~ 0xFF|
|int|蓝色, 0x00 ~ 0xFF|
|bool|是否翻转, true 翻转, false 不翻转. 默认翻转|

**返回值**

|返回值类型|解释|
|-|-|
|int|颜色值|

**例子**

```lua
-- 本API支持多种模式, 参数数量分别是 1, 2, 3, 4
-- 1. 单参数形式, 24bit RGB值, swap = true, 推荐
local red =   lcd.rgb565(0xFF0000)
local green = lcd.rgb565(0x00FF00)
local blue =  lcd.rgb565(0x0000FF)

-- 2. 两参数形式, 24bit RGB值, 增加swap的设置
local red =   lcd.rgb565(0xFF0000, true)
local green = lcd.rgb565(0x00FF00, true)
local blue =  lcd.rgb565(0x0000FF, true)

-- 3. 三参数形式, 红/绿/蓝, 各8bit
local red = lcd.rgb565(0xFF, 0x00, 0x00)
local green = lcd.rgb565(0x00, 0xFF, 0x00)
local blue = lcd.rgb565(0x00, 0x00, 0xFF)

-- 4. 四参数形式, 红/绿/蓝, 各8bit, 增加swap的设置
local red = lcd.rgb565(0xFF, 0x00, 0x00, true)
local green = lcd.rgb565(0x00, 0xFF, 0x00, true)
local blue = lcd.rgb565(0x00, 0x00, 0xFF, true)

```

---

## lcd.showImage(x, y, file)



显示图片,当前只支持jpg,jpeg

**参数**

|传入值类型|解释|
|-|-|
|int|X坐标|
|int|y坐标|
|string|文件路径|

**返回值**

无

**例子**

```lua
lcd.showImage(0,0,"/luadb/logo.jpg")

```

---

