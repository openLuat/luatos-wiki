# 硬件资料

请注意, 这是**Air103**的资料页, 不是**Air32F103**, 这是两款完全不同的芯片.

如需查找**Air32F103**系列芯片的资料, 请在左侧菜单栏选择**air32f103**


## 芯片和管脚定义

### 管脚映射表

| GPIO编号 | 命名 | 默认功能及扩展功能     |
| -------- | ---- | ---------------------- |
| 0| PA_00  | BOOT |
| 1|PA_01|GPIO_01 / ADC_1 / I2C_SCL|
| 2|PA_02|GPIO_02 / ADC_3/ PWM_30|
| 3|PA_03|GPIO_03 / ADC_2/ PWM_31|
| 4|PA_04|GPIO_04 / ADC_0 / I2C_SDA|
| 5|PA_05|GPIO_05|
| 6|PA_06|GPIO_06|
| 7|PA_07|GPIO_07/ PWM_04|
| 8|PA_08|GPIO_08 / UART4_TX|
| 9|PA_09|GPIO_09 / UART4_RX|
|10|PA_10|GPIO_10/ PWM_10|
|11|PA_11|GPIO_11 / PWM_11|
|12|PA_12|GPIO_12/ UART5_TX/ PWM_12|
|13|PA_13|GPIO_13/ UART5_RX/ PWM_13|
|14|PA_14|GPIO_14/ PWM_14|
|15|PA_15|GPIO_15 / PSRAM_CLK|
|16|PB_00|GPIO_16 / PWM_00 / UART3_TX|
|17|PB_01|GPIO_17 / PWM_01 / UART3_RX|
|18|PB_02|GPIO_18  / UART2_TX / PSRAM_D0 / SPI0_CLK / PWM_02|
|19|PB_03|GPIO_19 / UART2_RX / PSRAM_D1 / SPI0_MISO / PWM_03|
|20|PB_04|GPIO_20 / PSRAM_D2 / SPI0_CS|
|21|PB_05|GPIO_21 / PSRAM_D3 / SPI0_MOSI|
|22|PB_06|GPIO_22 / UART1_TX / SDIO_CLK|
|23|PB_07|GPIO_23 / UART1_RX / SDIO_CMD|
|24|PB_08|GPIO_24 / SDIO_D0|
|25|PB_09|GPIO_25 / SDIO_D1|
|26|PB_10|GPIO_26 / SDIO_D2|
|27|PB_11|GPIO_27 / SDIO_D3|
|28|PB_12|GPIO_28 / PWM_20|
|29|PB_13|GPIO_29 / PWM_21|
|30|PB_14|GPIO_30  / SPI1_CS/ PWM_22|
|31|PB_15|GPIO_31 / SPI1_CLK/ PWM_23|
|32|PB_16|GPIO_32  / SPI1_MISO / PWM_24|
|33|PB_17|GPIO_33 / SPI1_MOSI|
|34|PB_18|GPIO_34|
|35|PB_19|UART0_TX|
|36|PB_20|UART0_RX|
|37|PB_21|GPIO_37|
|38|PB_22|GPIO_38|
|40|PB_24|GPIO_40/ PWM_32|
|41|PB_25|GPIO_41/ PWM_33|
|42|PB_26|GPIO_42 / PWM_34|
|43|PB_27|GPIO_43 / PSRAM_CS|

开机时仅配置了`BOOT`和`UART0_TX/RX`，其他数字脚均为GPIO脚，状态为输入高阻.

| ADC编号（LuatOS） | 功能         |
| ----------------- | ------------ |
| 0                 | 模块ADC0-PA1 |
| 1                 | 模块ADC1-PA4 |
| 2                 | 模块ADC2-PA3 |
| 3                 | 模块ADC3-PA2 |
| adc.CH_CPU                | CPU温度      |
| adc.CH_VBAT                | 内部电压     |

## 资料链接

* 硬件设计手册: [Air103_MCU设计手册V1.2.pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/20211202193606476_Air103_MCU设计手册V1.2.pdf)
* 开发板BOM: [EVB-Air103_BOM_B_Air103_A10_V1.1_20211022.xlsx](https://cdn.openluat-luatcommunity.openluat.com/attachment/20211231152759844_EVB-Air103_BOM_B_Air103_A10_V1.1_20211022.xlsx)
* 开发板晶振datasheet: [2.3.3.400001004-MDH201808109-D3102512A40000A(1)(1).pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/20211013165122024_2.3.3.400001004-MDH201808109-D3102512A40000A(1)(1).pdf)
* LDO手册: [SGM2019-3.3YN5G_TR.PDF](https://cdn.openluat-luatcommunity.openluat.com/attachment/20211202193445472_SGM2019-3.3YN5G_TR.PDF)
* Air103_核心板设计手册: [Air103_核心板设计手册V1.2.pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/20211202193519160_Air103_核心板设计手册V1.2.pdf)
* 寄存器手册(不推荐): [寄存器手册与W800通用](https://www.winnermicro.com/upload/1/editor/1607327764402.pdf)

## 射频管脚

作为隐藏功能, Air103的RF管脚为: 14

设计PCB时, 该管脚必须加ESD保护!!!

功能上支持 BLE 4.2 和 wifi 2.4G通信, 不支持wifi 5G
