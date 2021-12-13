# Air103芯片

合宙Air103是一款QFN56 封装，6mm x 6mm 大小的mcu. 本芯片与联盛德w806可互换.

# 芯片和管脚定义

## 管脚映射表

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
| 10                | CPU温度      |
| 11                | 内部电压     |

## 芯片PinOut

![](https://gitee.com/openLuat/LuatOS/raw/master/bsp/air103/images/air103_chip_pinout.png)

## 刷机烧录教程

[串口烧录教程](../flash.html#id2)

**注意：烧录前请设置波特率为921600**

## 模块购买

* [手机访问mall.m.openluat.com](https://mall.m.openluat.com)
* [淘宝店1](https://luat.taobao.com)
* [淘宝店2](https://openluat.taobao.com)

## 技术支持

LuatOS大QQ群: 1061642968

## bsp源码

与air101使用同一份源码 https://gitee.com/openLuat/luatos-soc-air101
