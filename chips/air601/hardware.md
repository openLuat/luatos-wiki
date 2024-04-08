# Air601硬件资料

## 模块硬件资料

|    资料简介     |                           相关链接                           |
| :-------------: | :----------------------------------------------------------: |
|     规格书      | [Air601-12F_模块产品规格书_V1.2.pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/20230726105503590_Air601-12F_模块产品规格书_V1.2.pdf) |
|  硬件设计手册   | [Air601-12F_WIFI模块硬件设计手册_V1.0.1.pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/20230619165631229_Air601-12F_WIFI模块硬件设计手册_V1.0.1.pdf) |
| 原理图及PCB封装 | [Air601-12F-PADS.7z](https://cdn.openluat-luatcommunity.openluat.com/attachment/20230519111345019_Air601-12F-PADS.7z) |
| 开发板相关资料  | [开发板EVB_Air601-12F使用说明V1.0.0.pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/20230626161923628_开发板EVB_Air601-12F使用说明V1.0.0.pdf) [EVB-Air601-12F.zip](https://cdn.openluat-luatcommunity.openluat.com/attachment/20230524173150039_EVB-Air601-12F.zip) |

## 模块外形

|                 正面                  |                  反面                  |
| :-----------------------------------: | :------------------------------------: |
| ![1](img/20230522113542643.png) | ![2](img/20230522122452266.png) |


## 管脚映射表

| GPIO编号 | 命名 | 默认功能及扩展功能     |
| -------- | ---- | ---------------------- |
| 0        | PA0  | BOOT                   |
| 1        | PA1  | I2C_SCL/ADC0           |
| 4        | PA4  | I2C_SDA/ADC1           |
| 7        | PA7  | GPIO/PWM4              |
| 16       | PB0  | GPIO/PWM0/UART3_TX     |
| 17       | PB1  | GPIO/PWM1/UART3_RX     |
| 18       | PB2  | SPI_SCK/PWM2/UART2_TX  |
| 19       | PB3  | SPI_MISO/PWM3/UART2_RX |
| 20       | PB4  | SPI_CS/UART4_TX        |
| 21       | PB5  | SPI_MOSI/UART4_RX      |
| 22       | PB6  | UART1_TX               |
| 23       | PB7  | UART1_RX               |
| 24       | PB8  | GPIO                   |
| 25       | PB9  | GPIO                   |
| 26       | PB10 | GPIO                   |
| 27       | PB11 | GPIO                   |
| 35       | PB19 | UART0_TX               |
| 36       | PB20 | UART0_RX               |

开机时仅配置了`BOOT`和`UART0_TX/RX`，其他数字脚均为GPIO脚，状态为输入高阻.

| ADC编号（LuatOS） | 功能         |
| ----------------- | ------------ |
| 0                 | 模块ADC0-PA1 |
| 1                 | 模块ADC1-PA4 |
| adc.CH_CPU        | CPU温度      |
| adc.CH_VBAT       | 内部电压     |

## 射频管脚

作为隐藏功能, Air601的RF管脚为: 8

设计PCB时, 该管脚必须加ESD保护!!!

功能上支持 BLE 4.2 和 wifi 2.4G通信, 不支持wifi 5G
