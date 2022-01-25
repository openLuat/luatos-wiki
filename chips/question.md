# 常见问题列表

## Air101有几路串口

共5路串口，其中串口0被用于下载和调试，可用4路。

## Air101开发板的I2C的ID是几

看demo用的是0

## Air101支持单总线吗

支持 [sensor - 传感器操作库](https://wiki.luatos.com/api/sensor.html#sensor "sensor - 传感器操作库")

## Air101可以模拟鼠标和键盘的吗

不可以

## Air101设备要安装驱动吗

ch340

## Air101下载不成功

勾选串口打印，选择对应串口，波特率设置位：921600
[烧录教程](https://wiki.luatos.com/boardGuide/flash.html "烧录教程")

## Air101为什么我修改了gpio的例程，烧录进去后，指示灯也是和原来的一样，没有变化，单独下载脚本不行

下载要确保luatools安装路径、项目路径、固件路径不要出现中文\空格\特殊符号

## Air101大佬们有air101的资料吗，我看社区好像还没有

[Air101 资料汇总(软硬件资料,固件下载,技术支持)](https://doc.openluat.com/article/3508 "Air101 资料汇总(软硬件资料,固件下载,技术支持)")

## Air101可以实现us的延时吗

可以，[statem - SM状态机](https://wiki.luatos.com/api/statem.html "statem - SM状态机")

## Air101支持nvm功能吗

有替代库 fdb [fdb - kv数据库(基于FlashDB)](https://wiki.luatos.com/api/fdb.html "fdb - kv数据库(基于FlashDB)")

## Air101支持墨水屏

支持，[eink - 墨水屏操作库](https://wiki.luatos.com/api/eink.html "eink - 墨水屏操作库")

## 请问Air101支不支持debug

ide暂时不支持101的单步调试

## bit在Air101里怎么使用

101是5.3语法的，直接用就行

## Air101的lpmem库用不了

lpmem库目前只有302有

## Air101能使用带触摸的ILI9341屏幕吗

能，参考DEMO修改初始化参数 [lcd](https://wiki.luatos.com/chips/air101/Air101.html#lcd "LCD")

## Air101可以外挂spi接口的无线设备吗

可以，[SPI](https://wiki.luatos.com/chips/air101/Air101.html#spi "SPI")

## Air101上面SPI屏有没有跑通过

有参考LCD DEMO [DEMO/LCD](https://gitee.com/openLuat/LuatOS/tree/master/demo/lcd "LCD")

## Air103有蓝牙+大屏(4.3和7寸)的接线方式吗

103支持不了这么大屏幕

## Air103外部实时时钟晶振(RTC)的引脚有吗

内部做进去了，有这个功能，没有外部管脚

## Air103刷101点灯代码 , 没效果，灯不亮

因为103开发板那三个灯的GPIO和101开发板的三个灯的GPIO不一样,103是 40，41，42 三个GPIO

[Air103 资料汇总(软硬件资料,固件下载,技术支持)](https://doc.openluat.com/article/3674 "Air103 资料汇总(软硬件资料,固件下载,技术支持)")

## Air105的寄存器手册和W800寄存器一样吗

不一样

## Air105开发板能接最大多少兆网口

接10Mbps、100Mbps都可以，看外挂的spi以太网转换芯片的能力，支持以太网的固件还在开发，最大速率还没法给出答复，不过跑到几Mbps没问题，满足一般的以太网iot应用够了

## soc开发版的蓝牙天线可以引出来吗

能，101的8脚，103的nc脚，自行飞线

## Air105最高支持多少像素的摄像头，摄像头接口是什么类型的？支持usb的摄像头吗

还不能，当前是640x480，DCIM接口

## Air105可以用在工业场合不，能驱动步进电机吗，带can口和多定期器

没有电机，没有can，有多个定时器

## Air105开发板内部12M的晶振误差是多少，如果用UART或者USB是不是必须接外部晶振

高低温下偏差比较大，不建议省，12M的晶振误差是2%

## Air101做fft之类的算法 效率会不会很低

101有dsp，有硬件fft加速

## 单片机模块，有支持TTS语音的吗

不带  

## Air105开发板送的摄像头是什么型号，多少像素的

gc032a，30w像素

## Air105刷了刚刚发的固件 ,打印乱码

波特率需设置为1500000

## Air105或者10x系列会开放寄存器手册吗

会

## lvgl.img_set_src(img1, "/img/imgbtn_green.png"); 这样是不是也不行
/luadb/xxxx.png

## Air105开发板可以读SD卡吗
能，通过spi，比sdio慢些

## Air105支持can总线吗
不支持，要外挂

## rtos-sdk支持吗，提供相关资料吗
esp32合宙只提供LuatOS支持，其他资料直接看乐鑫原厂

## ESP32可接，LCD扩展板和1.8寸显示屏吗
可以

## Air105最高频率下gpio软件翻转速度多少
3M

## fdb每次初始化会清空之前保存的数据吗
不会

## Air105可以用keil开发吗
无法用keil的debug来调试外设，没有SVD文件

## 默认的固件都支持哪些功能
可以解压soc看看 luat_conf_bsp.h

## Air105是不是能跑Freertos
105现在开放的csdk跑的就是freertos

## Air101可以获取到芯片的uuid吗
mcu.unique_id()

## LCD指定位置清屏怎么操作 
指定位置刷指定颜色

## lcd.drawLine(20,20,150,20,0x001F))这个颜色在哪里查呀，标准的RGB是3字节，这里颜色是2字节
rgb565 

## Air103板子背面预留的u4是干嘛的
psram

## Air105有个示例程序camera配的哪个屏
2.4寸TFT LCD 240X320 GC9306 SPI串口屏

## Air103和105支持多线程的吧
支持RTOS的多任务

## ST7735 V1.1的屏幕显示白边
屏幕驱动偏移设置成0就行（xoffset = 0,yoffset = 0）

## Air105的PWM的最高频率是多少
极限是26M , 最高=主频/8 

## Air105支持双adc模式不
不支持，只有1个ADC控制器
