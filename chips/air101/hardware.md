# 硬件资料

## 资料文件

* 硬件设计手册: [Air101_MCU设计手册V1.0.pdf](http://cdndownload.openluat.com/wiki/chips/air101/Air101_MCU设计手册V1.0.pdf)
* 开发板BOM: [Air101_CORE_BOM_B_Air101_CORE_A10_V1.4_20210909().xlsx](http://cdndownload.openluat.com/wiki/chips/air101/20211013165102234_Air101_CORE_BOM_B_Air101_CORE_A10_V1.4_20210909.xlsx)
* 开发板晶振datasheet: [2.3.3.400001004-MDH201808109-D3102512A40000A.pdf](http://cdndownload.openluat.com/wiki/chips/air101/2.3.3.400001004-MDH201808109-D3102512A40000A.pdf)
* 寄存器手册(不推荐): [寄存器手册与W800通用](https://www.winnermicro.com/upload/1/editor/1607327764402.pdf)

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
| 10                | CPU温度      |
| 11                | 内部电压     |

