# 常见问题列表

### 1. Air101有几路串口

共5路串口，其中串口0被用于下载和调试，可用4路。

### 2. Air101开发板的I2C的ID是几
看demo用的是0 

### 3. Air101支持单总线吗？
支持 [sensor - 传感器操作库](https://wiki.luatos.com/api/sensor.html#sensor "sensor - 传感器操作库")

### 4. Air101可以模拟鼠标和键盘的吗？
不可以

### 5. Air101设备要安装驱动吗？
ch340

### 6. Air101下载不成功？
勾选串口打印，选择对应串口，波特率设置位：921600
[烧录教程](https://wiki.luatos.com/boardGuide/flash.html "烧录教程")

### 7. Air101为什么我修改了gpio的例程，烧录进去后，指示灯也是和原来的一样，没有变化，单独下载脚本不行？
下载要确保luatools安装路径、项目路径、固件路径不要出现中文\空格\特殊符号

### 8. Air101大佬们有air101的资料吗，我看社区好像还没有
[Air101 资料汇总(软硬件资料,固件下载,技术支持)](https://doc.openluat.com/article/3508 "Air101 资料汇总(软硬件资料,固件下载,技术支持)")

### 9. Air101可以实现us的延时吗？
可以，[statem - SM状态机](https://wiki.luatos.com/api/statem.html "statem - SM状态机")

### 10. Air101支持nvm功能吗？
有替代库 fdb [fdb - kv数据库(基于FlashDB)](https://wiki.luatos.com/api/fdb.html "fdb - kv数据库(基于FlashDB)")

### 11. Air101支持墨水瓶？
支持，[eink - 墨水屏操作库](https://wiki.luatos.com/api/eink.html "eink - 墨水屏操作库")

### 12. 请问Air101支不支持debug的?
ide暂时不支持101的单步调试

### 13. bit在Air101里怎么使用
101是5.3语法的，直接用就行

### 13. Air101好像lpmem这个库用不了呀
lpmem库目前只有302有

### 15. Air101能使用带触摸的ILI9341屏幕吗？ 
能，参考DEMO修改初始化参数 [lcd](https://wiki.luatos.com/chips/air101/Air101.html#lcd "LCD")

### 16. Air101可以外挂spi接口的无线设备吗？
可以，[SPI](https://wiki.luatos.com/chips/air101/Air101.html#spi "SPI")

### 17. Air101上面SPI屏有没有跑通过
有参考LCD DEMO [DEMO/LCD](https://gitee.com/openLuat/LuatOS/tree/master/demo/lcd "LCD")

### 18. Air103有蓝牙+大屏(4.3和7寸)的接线方式吗?  
103支持不了这么大屏幕 

### 19. Air103外部实时时钟晶振(RTC)的引脚有吗？ 
内部做进去了，有这个功能，没有外部管脚 

### 20. Air103刷101点灯代码 , 没效果，灯不亮
因为103开发板那三个灯的GPIO和101开发板的三个灯的GPIO不一样,103是 40，41，42 三个GPIO

[Air103 资料汇总(软硬件资料,固件下载,技术支持)](https://doc.openluat.com/article/3674 "Air103 资料汇总(软硬件资料,固件下载,技术支持)")

### 21. Air105的寄存器手册和W800寄存器一样吗？
不一样

### 22. Air105开发板能接最大多少兆网口
接10Mbps、100Mbps都可以，看外挂的spi以太网转换芯片的能力，支持以太网的固件还在开发，最大速率还没法给出答复，不过跑到几Mbps没问题，满足一般的以太网iot应用够了

### 23. soc开发版的蓝牙天线可以引出来吗?
能，101的8脚，103的nc脚，自行飞线

### 24. Air105最高支持多少像素的摄像头，摄像头接口是什么类型的？支持usb的摄像头吗？
还不能，当前是640x480，DCIM接口

### 25. Air105可以用在工业场合不，能驱动步进电机吗，带can口和多定期器？
没有电机，没有can，有多个定时器

### 26. Air105开发板内部12M的晶振误差是多少，如果用UART或者USB是不是必须接外部晶振
高低温下偏差比较大，不建议省，12M的晶振误差是2%

### 27. Air101做fft之类的算法 效率会不会很低
101有dsp，有硬件fft加速

### 28. 单片机模块，有支持TTS语音的吗？
不带  

### 29. Air105开发板送的摄像头是什么型号，多少像素的？
gc032a，30w像素

### 30. Air105刷了刚刚发的固件 ,打印乱码
波特率需设置为1500000 

### 31. Air105或者10x系列会开放寄存器手册吗？
会


