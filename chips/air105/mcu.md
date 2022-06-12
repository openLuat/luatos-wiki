# Air105芯片

## 一、概述

### 1.1产品概述

合宙Air105是一款QFN88 封装，10mm x 10mm 大小的MCU, 不仅提供UART/GPIO/I2C/ADC/SPI等基础外设，更提供DAC/USB/DCMI/HSPI/LCDI/KCU等高级外设接口，内置充电功能，支持5V/3.3V供电，同时自带5v转3.3V的LDO，4M字节Flash，640K字节RAM。内部flash起始地址0x01001000

### 1.2 电气性能

 **极限参数**

| **参数**        | **说明**                     | **范围**           | **单位** |
| --------------- | ---------------------------- | ------------------ | -------- |
| Iddpd           | 关机电流                     | -                  | nA       |
| Tamb            | 工作温度                     | -40~+85            | ℃        |
| Tstg            | 储藏温度                     | -40~+125           | ℃        |
| Ground          | 地                           | -0.3~0.3           | V        |
| Voh             | 数字输出高电平               | VDD -0.3 ~ VDD+0.3 | V        |
| Vol             | 数字输出低电平               | <0.4               | V        |
| Ioh             | 拉电流(PA2/3/4/5, PC6/7/8/9) | 27（@3V）          | mA       |
| 拉电流(其他 IO) | 16（@3V）                    | mA                 |          |
| Iol             | 灌电流(PA2/3/4/5, PC6/7/8/9) | 27（@0.5V）        | mA       |
| 灌电流(其他 IO) | 16（@0.5V）                  | mA                 |          |
| Vih             | 数字输入高电平               | ≥0.7×VDD           | V        |
| ViL             | 数字输入低电平               | ≤0.3×VDD           | V        |

 **电气特性**

| **参数**   | **条件（-40°C to+85°C）** | **值**   |          | **单位** |
| ---------- | ------------------------- | -------- | -------- | -------- |
|            |                           | **最小** | **最大** |          |
| VCC        |                           | 3.6      | 5.5      | V        |
| CHARGE_VCC |                           | 4.7      | 5.5      | V        |
| AVD33      |                           | 2.7      | 3.6      | V        |
| VDD33      |                           | 2.7      | 3.6      | V        |
| VBAT33     |                           | 2        | 3.6      | V        |
| Vol        | VDD=3.3V                  | -        | 0.4      | V        |
| Voh        | VDD=3.3V                  |          |          | V        |
| VIH        | VDD=3.3V                  | 0.7×VDD  |          | V        |
| VIL        | VDD=3.3V                  |          | 0.3×VDD  | V        |

**安全相关特性**

| **传感器**     | **说明**               | **范围** | **单位** |
| -------------- | ---------------------- | -------- | -------- |
| 电压传感器     | 主电源电压高压检测范围 | 4.0±0.1  | V        |
|                | 主电源电压低压检测范围 | 2.8±0.1  | V        |
|                | 电池电压高压检测范围   | 4.0±0.1  | V        |
|                | 电池电压低压检测范围   | 1.9±0.1  | V        |
| 时钟频率传感器 | 12M 时钟频率检测范围   | 12±50%   | MHz      |
|                | 32K 时钟频率检测范围   | 32±50%   | KHz      |

### 1.3管脚定义

![](https://cdn.openluat-luatcommunity.openluat.com/attachment/20220612160407604_QQ截图20220612160340.png)

下图为Air105管脚定义，支持最多54个GPIO，每个IO都与外设复用管脚。每个GPIO均可配置为输入、输出、 中断模式，当作为输出时，每个IO输出值都可单独配置。IO支持强推挽输出/开漏输出模式。

**管脚详细信息**（**所有通用I/O复位后默认状态为上拉，电阻值51KΩ**）

 

| **编号** | **名称**    | **类型** | **复用功能**                 | **上下拉能力**                                               | **备注**                                                     |
| -------- | ----------- | -------- | ---------------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| 1        | CVCC        | P        |                              |                                                              | NC                                                           |
| 2        | VDD33       | P        |                              |                                                              | 最小电压2.7V，最大电压3.6V                                   |
| 3        | VCC         | P        |                              |                                                              | 可输入最小电压为3.6V，最大电压为5.5V                         |
| 4        | VDD33_OUT   | P        |                              | 芯片 3.3V 输出                                               | 芯片的输出能力约为400mA，外围负载使用芯片的3.3V时，要注意最大电流情况 |
| 5        | NC          |          |                              | NC                                                           |                                                              |
| 6        | PA7         | I/O      | GPIO7/SPI1_CSN               | UP/DOWN                                                      |                                                              |
| 7        | PA6         | I/O      | GPIO6/SPI1_SCK               | UP/DOWN                                                      |                                                              |
| 8        | PB2         | I/O      | GPIO18/SPI2_SCK              | UP/DOWN                                                      |                                                              |
| 9        | PB3         | I/O      | GPIO19/SPI2_CSN              | UP/DOWN                                                      |                                                              |
| 10       | PB4         | I/O      | GPIO20/SPI2_MOSI/UART2_CTS   | UP/DOWN                                                      |                                                              |
| 11       | PB5         | I/O      | GPIO21/SPI2_MISO/UART2_RTS   | UP/DOWN                                                      |                                                              |
| 12       | PE6         | I/O      | GPIO70//UART3_CTS/I2C0_SCL   | UP/DOWN                                                      |                                                              |
| 13       | PE7         | I/O      | GPIO71/UART3_RTS/I2C0_SDA    | UP/DOWN                                                      |                                                              |
| 14       | PE8         | I/O      | GPIO72/UART3_RX              | UP/DOWN                                                      |                                                              |
| 15       | PE9         | I/O      | GPIO73/UART3_TX              | UP/DOWN                                                      |                                                              |
| 16       | PE10        | I/O      | GPIO74/UART3_CTS             | UP/DOWN                                                      |                                                              |
| 17       | PE11        | I/O      | GPIO75/UART3_RTS             | UP/DOWN                                                      |                                                              |
| 18       | PA0         | I/O      | UART0_RX                     | 串口下载                                                     | 固定                                                         |
| 19       | PA1         | I/O      | UART0_TX                     | 固定                                                         |                                                              |
| 20       | PA2         | I/O      | GPIO2/UART0_CTS/PWM2         | UP/DOWN                                                      |                                                              |
| 21       | PA3         | I/O      | GPIO3UART0_RTS/PWM3          | UP/DOWN                                                      |                                                              |
| 22       | PB0         | I/O      | GPIO16/PWM0/XTAL32K          | UP/DOWN                                                      |                                                              |
| 23       | PB1         | I/O      | GPIO17/PWM1/CLK_24M          | UP/DOWN/可配置输出24M                                        |                                                              |
| 24       | CHARGE_VBAT | P        |                              | CHARGE电源输出，接电池                                       | 可以给3.7V锂电池充电，最大充电电流200mA                      |
| 25       | CHARGE_VCC  | P        |                              | CHARGE电源输入                                               | 可输入最小电压为4.7V，最大电压为5.4V                         |
| 26       | PD1         | I/O      | GPIO49/DCMIS_DATA0           | UP/DOWN                                                      |                                                              |
| 27       | PD2         | I/O      | GPIO50/DCMIS_DATA1           | UP/DOWN                                                      |                                                              |
| 28       | PD3         | I/O      | GPIO51/DCMIS_DATA2           | UP/DOWN                                                      |                                                              |
| 29       | PD8         | I/O      | GPIO56/DCMIS_DATA3           | UP/DOWN                                                      |                                                              |
| 30       | PD9         | I/O      | GPIO57/DCMIS_DATA4           | UP/DOWN                                                      |                                                              |
| 31       | PD10        | I/O      | GPIO58/KeyBoard7/DCMIS_DATA5 | UP/DOWN                                                      |                                                              |
| 32       | PD11        | I/O      | GPIO59/KeyBoard8/DCMIS_DATA6 | UP/DOWN                                                      |                                                              |
| 33       | PE0         | I/O      | GPIO64/KeyBoard4/DCMIS_DATA7 | UP/DOWN                                                      |                                                              |
| 34       | PD6         | I/O      | GPIO54/UART1_CTS/DCMIS_DATA8 | UP/DOWN                                                      |                                                              |
| 35       | PD7         | I/O      | GPIO55/UART1_RTS/DCMIS_DATA9 | UP/DOWN                                                      |                                                              |
| 36       | PC6         | I/O      | GPIO38/PWM4/DCMIS_DATA10     | UP/DOWN                                                      |                                                              |
| 37       | PC7         | I/O      | GPIO39/PWM5/DCMIS_DATA11     | UP/DOWN                                                      |                                                              |
| 38       | PC8         | I/O      | GPIO40/PWM6/DCMIS_DATA12     | UP/DOWN                                                      |                                                              |
| 39       | PC9         | I/O      | GPIO41/PWM7/DCMIS_DATA13     | UP/DOWN                                                      |                                                              |
| 40       | PE1         | I/O      | GPIO65/KeyBoard5/DCMIS_VSYNC | UP/DOWN                                                      |                                                              |
| 41       | PE2         | I/O      | GPIO66/KeyBoard6/DCMIS_HSYNC | UP/DOWN                                                      |                                                              |
| 42       | PE3         | I/O      | GPIO67/DCMIS_PIX_CLK         | UP/DOWN                                                      |                                                              |
| 43       | PB12        | I/O      | GPIO28/SPI0_CLK              | UP/DOWN                                                      |                                                              |
| 44       | VSS         | GND      |                              | 芯片地                                                       |                                                              |
| 45       | PB13        | I/O      | GPIO29/SPI0_CSN              | UP/DOWN                                                      |                                                              |
| 46       | PB14        | I/O      | GPIO30/SPI0_MOSI/UART1_CTS   | UP/DOWN                                                      |                                                              |
| 47       | PB15        | I/O      | GPIO31/SPI0_MISO/UART1_RTS   | UP/DOWN                                                      |                                                              |
| 48       | PC12        | I/O      | GPIO44/SPI5_MISO             | UP/DOWN                                                      |                                                              |
| 49       | PC13        | I/O      | GPIO45/SPI5_MOSI             | UP/DOWN                                                      |                                                              |
| 50       | PC14        | I/O      | GPIO36/SPI5_CSN              | UP/DOWN                                                      |                                                              |
| 51       | PC15        | I/O      | GPIO37/SPI5_CLK              | UP/DOWN                                                      |                                                              |
| 52       | VDD33       | P        |                              |                                                              |                                                              |
| 53       | PD13        | I/O      | GPIO61/UART2_TX/KeyBoard1    | UP/DOWN                                                      |                                                              |
| 54       | PD12        | I/O      | GPIO60/UART2_RX/KeyBoard0    | UP/DOWN                                                      |                                                              |
| 55       | PD15        | I/O      | GPIO63/UART2_RTS/KeyBoard3   | UP/DOWN                                                      |                                                              |
| 56       | PD14        | I/O      | GPIO62/UART2_CTS/KeyBoard2   | UP/DOWN                                                      |                                                              |
| 57       | NC          |          |                              | NC                                                           |                                                              |
| 58       | NC          |          |                              | NC                                                           |                                                              |
| 59       | NC          |          |                              | NC                                                           |                                                              |
| 60       | NC          |          |                              | NC                                                           |                                                              |
| 61       | REFP        | O        |                              | 接1uF电容到地                                                |                                                              |
| 62       | PC5         | I/O      | GPIO37/ADC_IN6/CLK_27P12     | 可配置输出27.12M                                             |                                                              |
| 63       | PC4         | I/O      | GPIO36/ADC_IN5/XTAL32K       | UP/DOWN                                                      |                                                              |
| 64       | PC3         | I/O      | GPIO35/ADC_IN4/UART1_RTS     | UP/DOWN                                                      |                                                              |
| 65       | PC1         | I/O      | GPIO33/ADC_IN2/DAC/UART1_TX  | 数字音频转换为模拟音频接口                                   |                                                              |
| 66       | PC0         | I/O      | GPIO32/ADC_IN1/UART1_RX      | UP/DOWN                                                      |                                                              |
| 67       | VDD25       | O        |                              | 接1uF对地电容                                                |                                                              |
| 68       | DN          | I        |                              | 注意保持差分走线，阻抗做好90 Ohm控制                         |                                                              |
| 69       | DP          | O        |                              |                                                              |                                                              |
| 70       | VBUS        | I        |                              | 串接100Ω电阻抗浪涌                                           |                                                              |
| 71       | VDD33       | P        |                              |                                                              | 最小电压2.7V，最大电压3.6V                                   |
| 72       | XO12M       | 0        |                              | XTAL 12MHz Output                                            | 芯片支持内部12MHz振荡器和外置12MHz晶体，使用外置12MHz晶体时的芯片对接口，可以参考下文中的时钟电路 |
| 73       | XI12M       | 1        |                              | XTAL 12MHz Input                                             | 同上                                                         |
| 74       | VDD12       | O        |                              | 接1uF对地电容                                                |                                                              |
| 75       | AVD33       | P        |                              |                                                              | 最小电压2.7V，最大电压3.6V                                   |
| 76       | XI32        | I        |                              | XTAL 32KHz Input                                             | 芯片支持内部或外部的32KHz输出，使用外部32KHz电路可以参考下文中的时钟电路 |
| 77       | XO32        | O        |                              | XTAL 32KHz Output                                            | 同上                                                         |
| 78       | NC          |          |                              | NC                                                           |                                                              |
| 79       | NC          |          |                              | NC                                                           |                                                              |
| 80       | NC          |          |                              | NC                                                           |                                                              |
| 81       | NC          |          |                              | NC                                                           |                                                              |
| 82       | NC          |          |                              | NC                                                           |                                                              |
| 83       | NC          |          |                              | NC                                                           |                                                              |
| 84       | VBAT33      | P        |                              | 纽扣电池                                                     |                                                              |
| 85       | PA5         | I/O      | GPIO5/CLK_24M                | 可配置输出 24M                                               |                                                              |
| 86       | PA8         | I/O      | GPIO8/SPI1_MOSI              | 复用为 IO 时必须先 打开IC 卡电源，且输 出信号的高电平为IC 卡输出电平 |                                                              |
| 87       | PA9         | I/O      | GPIO9/SPI1_MISO              | 同上                                                         |                                                              |
| 88       | PA10        | I/O      | GPIO10                       | 同上                                                         |                                                              |

**注意：I、代表输入；O、代表输出；P、代表电源**

## 二、外围电路设计

### 2.1 供电电路

芯片有2种供电模式:

内部LDO, 通过VCC脚输入电源, 内部转换输出3.3V, 供电来源为3.6~5.5V的USB或锂电池的. 内部LDO输出能力有限,如需驱动大功率外设,请添加额外的LDO或DC2DC.

3.3V直供, 供电范围为3.2V~3.4V，直接供电到芯片的VCC33管脚。 

### 2.2开关机电路

开关机电路通过控制内部5V转3.3V LDO使能/关闭，实现芯片的开关机的功能。使用 CHARGE_VBAT 供电，并使用开关机功能时，要注意VBAT33管脚在位，芯片未上电时 POWER_KEY 拉高 150ms 内部 LDO 使能，通过POWER_KEY开机电路，注意：POWER_KEY键平时为低电平，按下拉高；CHARGE_VCC 有电时（电压范围4.7V~5.4V）内部 LDO 直接使能输出 3.3V 且无法关闭。可以参考下图中的两种开机供电方式。

![](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/105powerkey.png)

关机功能可以通过POWER_KEY 拉高7S关闭内部LDO输出，以达到关机目的。

### 2.3 充电模块电路

Air105芯片支持电池充电功能，可以给3.7V锂电池充电，支持最大200mA的充电电流，电池充满电压为4.15±0.05V，电池充满后电压降到4.05V之后将重新给电池充电。电池这块给模块供电的时候，建议外加二极管切换电路

![](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/105charge.png)

### 2.4 LDO

Air105芯片的VCC输入电压为4-5.5V时，内部的LD0最大的驱动能力在400mA，所以当外围负载比较多的时候，要考虑增加一些外置LDO电路。 

### 2.5 时钟电路

芯片支持内部12MHz振荡器和外置12MHz晶体，内部集成的12MHz晶体的精度为±2%，经过PLL 倍频后为系统提供输入，倍频后的PLL时钟频率可通过软件进行配置，其频率可配为：108MHz、 120MHz、132MHz、144MHz、156MHz、168MHz、180MHz、192MHz、204MHz。

选择外部的12MHz晶振时，根据实际产品需求选用不同温度等级、稳定度、负载电容值的晶体。晶体两端所接负载电容根据不同厂家晶体及频偏情况需要调整。

晶体摆放尽量靠近芯片，走线尽量短，并且远离干扰源，时钟周围多地孔隔离。时钟下面各层禁止其它走线穿过，防止干扰时钟源。

芯片的整个安全区基于内部32KHz工作，RTC默认基于内部OSC 32K工作，可软件切换使用外 部XTAL 32K工作，支持内部或外部32KHz输出。

### 2.6 I2C电路

I2C(芯片间)总线接口连接微控制器和串行I2C总线。它提供多主机功能，控制所有I2C总线特定 的时序、协议、仲裁和定时。支持标准和快速两种模式。根据特定设备的需要，可以使用DMA以减 轻CPU的负担。

在电路方面要在I2C接口处要加4.7K的上拉到3.3V。

### 2.7 USB电路

Air105连接USB时，要注意DN、DP保证90 Ohm的阻抗控制，差分走线；在VBUS管脚到芯片要串接100Ω的电阻用于抗浪涌，信号线上要串接22欧姆电阻（也可以是其他如33欧姆），防止信号反射，可以参考如下原理图。

<img src="https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/image-20211214105553826.png" alt="image-20211214105553826" style="zoom: 50%;" />

## 三、参考电路设计

Air105芯片供电电压为5V，正常工作供电范围：4.0V~5.5V，内部LDO最大驱动能力在400mA，注意外围负载避免超出最大驱动能力。芯片每个电源输入脚应放置相应的滤波电容，在61、67、74这3个管脚处要加对地1uF的电容。



## 四、封装尺寸

![](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/1052021%E5%B9%B412%E6%9C%8814%E6%97%A5.png)

**参数对照表**

![](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/105%E5%8F%82%E6%95%B0%E5%AF%B9%E7%85%A7.png)

 

