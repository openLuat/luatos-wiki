# ESP32S3-CORE开发板

## 特别注意

通过USB转串口烧录一定要安装CH343的驱动才能正常下载固件，默认的CDC驱动只能打印日志，但是速率太慢会导致下载失败。[驱动传送门](http://www.wch.cn/downloads/CH343SER_EXE.html)

通过USB下载（USB直连）可以直接烧录，Win8及以上系统无需安装驱动。可以正常使用Luatools烧录，但是无法使用LuatIDE。除烧录时需要选择带`USB`字样的固件，*GPIO19/20会被占用为USB脚*, 应避免使用, 其他功能没有任何区别。

```{note}
注意，由于**win7**系统不自带`winusb`驱动，且该系统早在2020年微软就已停止支持，所以如需使用`USB下载`，请升级至**win8以上系统**，或前往[乐鑫原厂手册](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-guides/jtag-debugging/configure-builtin-jtag.html)安装驱动
```

```{warning}
第一批ESP32S3核心板，由于FLASH热胀冷缩，会有小概率导致到手后虚焊。如若到手后无法烧录固件（卡在FLASH下载那一步），并且板子默认的闪灯程序也无法运行，可尝试补焊FLASH处的焊盘。~~或者可以七天无理由~~
```

[串口烧录教程](https://wiki.luatos.com/boardGuide/flash.html)，**日志波特率为921600**

## 一、产品描述

CORE ESP32S3核心板是基于乐鑫ESP32-S3进行设计的一款核心板，尺寸仅有21mm*51mm，板边采用邮票孔设计，方便开发者在不同场景下的使用。核心板板载2.4G天线，支持wifi和蓝牙。核心板内置8MB psram，16MB flash豪华配置。板载ch343p USB转串口芯片，方便下载烧录；同时还设计了模拟开关电路，可一键切换到S3内置的USB，进行USB功能的开发调试。核心板支持UART、GPIO、SPI、I2C、ADC、PWM，SDIO，Camera等接口，可根据实际需要连接外设进行调试。

## 二、硬件资源

- ESP32S3采用Xtensa® 32 位 LX7 双核处理器，五级流水线架构，主频高达240M。内置512K SRAM，本次发布型号和封8MB psram。
- 4 × SPI
- 1 × LCD 接口（8 位 ~16 位并行 RGB, I8080, MOTO6800）, 支持 RGB565, YUV422, YUV420, YUV411 之间互相转换
- 1 × DVP 8 位 ~16 位摄像头接口
- 3 × UART
- 2 × I2C
- 2 × I2S
- 1 × RMT (TX/RX)
- 1 × 脉冲计数器 – LED PWM 控制器，多达 8 个通道
- 1 × 全速 USB OTG
- 1 × USB Serial/JTAG 控制器
- 2 × MCPWM
- 1 × SDIO 主机接口，具有 2 个卡槽
- 通用 DMA 控制器 (简称 GDMA)，5 个接收通 道和 5 个发送通道
- 1 × TWAI® 控制器，兼容 ISO 11898-1（CAN 规范 2.0）
- 2 × 12 位 SAR ADC，多达 20 个通道

## 三、管脚定义

![footprint](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/PinOut_esp32s3.png)

- 任意GPIO均可作为PWM脚, 编号与GPIO一致, 但`同时只能开启8路PWM`,务必注意

## 四、功能介绍

### **1.** **供电电源**

CORE-ESP32-S3核心板支持以下3种方式供电：

- Type-C 接口供电（默认）
- 5V和GND排针供电
- 3V3 和 GND 排针供电

![img](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/clip_image002.jpg)

 调试过程中优先推荐的供电方式：TYPE-C USB接口供电。

### **2.** **LED控制**

合宙CORE ESP32S3核心板板载2颗LED，开发者可参考表4-1进行对应管脚的控制。

![image-20230109141355277](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/image-20230109141355277.png)

表4-1

| **LED**编号 | **对应GPIO** | **管脚功能** | **描述**   |
| ----------- | ------------ | ------------ | ---------- |
| LEDA        | IO10         | GPIO10配置   | 高电平有效 |
| LEDB        | IO11         | GPIO11配置   | 高电平有效 |

### **3.** **按键介绍**

合宙CORE ESP32S3核心板板载两颗按键，其中BOOT键可实现BOOT下载功能，RST键可实现复位功能，管脚控制参考表4-2。

  ![image-20230109141521515](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/image-20230109141521515.png)

表4-2

| **按键编号** | **管脚功能**                 | **描述**   |
| ------------ | ---------------------------- | ---------- |
| BOOT/GPIO0   | 按键按下时，芯片进入下载模式 | 低电平有效 |
| RST          | 按键按下时，芯片复位         | 低电平有效 |

## **相关资料链接**

[开源仓库链接](https://gitee.com/openLuat/luatos-soc-idf5)

[demo链接](https://gitee.com/openLuat/LuatOS/tree/master/demo)
