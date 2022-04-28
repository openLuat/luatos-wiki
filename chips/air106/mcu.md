# Air106芯片

Air106内嵌 ARM CortexTM-M33 控制器，片上包含精度为 1%以内的 20MHz/40MHz 时钟， 可通过 PLL 倍频到 160MHz 时钟，提供多种内置 FLASH/SRAM 大小可供选择，支持 ISP（在系 统编程）操作及 IAP（在应用编程）。 外设串行总线包括 CAN 接口，4个 UART 接口、SPI 通信接口（支持主/从/I2S 模式选择）及 I2C 接口（支持主/从选择）。此外还包括 1 个 32 位看门狗定时器，5 组 32 位加强型定时器，12 组 24 位基础型定时器，10 路独立通道 16 位的 PWM 发生器，2 个共计 16 通道 12 位、2.5MSPS 的逐次逼近型 ADC 模块，1 个 TFT-LCD 液晶驱动模块、1 个 SDIO 接口、一个图像硬解码器 JPEG、 一个数模转换 DAC 模块、1 个 RTC 实时时钟以及 1 个外接 SDRAM 接口控制模块，同时提供欠 压检测及低电压复位功能.

内置64KB SRAM+8MB psram，片上flash 512KB 自带 CACHE

独立 10 通道 16 位 PWM 产生器，每个通道均可配置为具备死区的互补模式

支持 SYNC 接口和 MPU 接口的外部 LCD 扩展，支持最高分辨率 1024*1024，支持 RGB888 格式，向下兼容 RGB565 格式，支持双图层混合以及背景混合显示，总线时钟最高支持到 200MHz，

2 个独立 12 位高精度 SAR ADC，共计 16 路，采样率高达 2.5M SPS

USB支持2.0全速，OTG 子系统完全符 合 On-The-Go Supplement to the USB 2.0 Specification, Revision 1.0，支持全速（12 Mbps）和低 速（1.5 Mbps）传输。

工作温度：-40℃～105℃
