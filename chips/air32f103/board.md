# 开发板

芯片数据手册[AIR32F103芯片数据手册1.0.0.pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/20220605164850945_AIR32F103芯片数据手册1.0.0.pdf)

开发板原理图[AIR32CBT6.pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/20220605164915340_AIR32CBT6.pdf)

开发板工程[传送门](https://gitee.com/openLuat/luatos-broads/tree/master/broads/Air32F103-Board)

## 开发板PinOut

![image-20220618160609551](img/image-20220618160609551.png)

## 使用说明

开发板出厂默认为daplink固件，固件支持调试下载功能，并且支持U盘模式烧录和虚拟串口，其中PB14为SWDIO，PB13为SWCLK，PB0为复位控制，PA2为虚拟串口的TX，PA3为RX。中间绿色的灯指示与被连接设备的通信情况。插入电脑后会显示一个名为daplink的U盘，一个COM口，以及一个便携设备daplink。在keil或其他开发软件中选择调试器为CMSIS DAP即可。目前支持的开发环境如下：

- KEIL MDK
- IAR
- PyOCD
- 其他支持CMSIS-DAP协议的软件
