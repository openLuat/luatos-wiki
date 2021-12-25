# 硬件资料


## 管脚映射表

| 管脚编号 | 命名   | 默认功能          |
| -------- | ------ | ----------------- |
| 1        | GPIO1  | BOOT              |
| 2        | GPIO16 | SPI_CS            |
| 3        | GPIO15 | SPI_CLK           |
| 4        | GPIO11 | SPI_MOSI          |
| 5        | GPIO14 | SPI_MISO          |
| 6        | GPIO9  | GPIO              |
| 7        | GPIO7  | GPIO              |
| 8        | GPIO12 | UART1_TX(打印Log) |
| 9        | GPIO13 | UART1_RX(打印Log) |
| 12       | -      | WAKEUP_IN         |
| 13       | GPIO19 | NET_LED           |
| 14       | ADC0   | ADC               |
| 16       | GPIO23 | AON_GPIO_4        |
| 17       | GPIO21 | AON_GPIO_2        |
| 18       | GPIO18 | GPIO              |
| 19       | GPIO17 | GPIO              |
| 25       | GPIO4  | UART0_TX          |
| 26       | GPIO5  | UART0_RX          |
| 27       | GPIO2  | UART2_RX          |
| 28       | GPIO3  | UART2_TX          |
| 29       | GPIO8  | I2C0_SDA          |
| 30       | GPIO10 | I2C0_SCL          |

## ADC

| ADC编号（LuatOS） | 功能     |
| ----------------- | -------- |
| 0                 | CPU温度  |
| 1                 | VBAT电压 |
| 2                 | 模块ADC0 |
