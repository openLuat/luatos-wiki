# 硬件资料

## 管脚映射表

管脚编号对应w600芯片的管脚编号，也对应`gpio`库所使用的pin值

管脚编号|命名|默认功能|
-------|----|-------|
13     |PA_00| BOOT |
14     |PA_01| GPIO |
15     |PA_04| UART0_TX |
17     |PA_05| UATT0_RX |
18     |PB_13| I2C_SCL |
19     |PB_14| I2C_SDA |
20     |PB_15| GPIO |
21     |PB_16| GPIO |
22     |PB_17| GPIO |
23     |PB_18| GPIO |
26     |PB_06| GPIO |
27     |PB_07| GPIO |
28     |PB_08| GPIO |
29     |PB_09| GPIO |
30     |PB_10| GPIO |
31     |PB_11| UART1_RX |
32     |PB_12| UART1_TX |

除`BOOT`和`UART0_TX/RX`外，其他脚均可作为IO脚使用.
