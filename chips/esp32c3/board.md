# ESP32C3-CORE开发板

## 一、产品描述

CORE ESP32核心板是基于乐鑫ESP32-C3进行设计的一款核心板，尺寸仅有21mm*51mm，板边采用邮票孔设计，方便开发者在不同场景下的使用。核心板支持UART、GPIO、SPI、I2C、ADC、PWM等接口，可根据实际需要选择。

## 二、硬件资源

- 尺寸长宽 21mm*51mm
- 1路SPI FLASH，板载4MB，支持最高 16MB 
- 2路UART接口，UART0~UART1
- 2 路 12 比特 ADC，最高采样率 100KSPS
- 1路低速SPI接口，支持主模式
- 1路IIC控制器
- 4路PWM接口
- GPIO外部管脚15路，可复用
- 2路贴片LED指示灯
- 1路复位按键+1路BOOT按键
- 1路USB转TTL下载调试口
- 2.4G PCB板载天线 

## 三、管脚定义

①：图3-1为功能说明;

②：图3-2位左侧16Pin管脚定义;

③：图3-3位右侧16 Pin管脚定义;

图3-1

![image-20220121123041403](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/image-20220121123041403.png)

图3-2

![image-20220121122912818](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/image-20220121122912818.png)

图3-3

![image-20220121122942948](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/image-20220121122942948.png)

 

**详细管脚描述**

| **管脚编号** | **名称** | **复用后管脚功能**                      | **复用功能**    | **电源域** | **上下拉能力** |
| ------------ | -------- | --------------------------------------- | --------------- | ---------- | -------------- |
| 1            | GND      | 接地                                    |                 |            |                |
| 2            | 5V       | 5V电源接口，与USB的VBUS相连             |                 |            |                |
| 3            | BOOT     | GPIO09,输入                             | BOOTMODE        | VDD3P3_CPU | UP/DOWN        |
| 4            | IO08     | GPIO08,输入，输出，高阻                 | PWM04           | VDD3P3_CPU | UP/DOWN        |
| 5            | IO04     | GPIO04,输入，输出，高阻                 | I2C_SDA/ADC_1   | VDD3P3_RTC | UP/DOWN        |
| 6            | IO05     | GPIO05,输入，输出，高阻                 | I2C_SCL/ADC_0   | VDD3P3_RTC | UP/DOWN        |
| 7            | 3.3V     | 芯片电源，3.3V                          |                 |            |                |
| 8            | GND      | 接地                                    |                 |            |                |
| 9            | PB_11    | GPIO11,输入，输出，高阻                 | VDD_SPI         | VDD3P3_CPU | UP/DOWN        |
| 10           | IO07     | GPIO07,输入，输出，高阻                 | SPI0_CS         | VDD3P3_CPU | UP/DOWN        |
| 11           | IO06     | GPIO06,输入，输出，高阻                 | PWM01           | VDD3P3_CPU | UP/DOWN        |
| 12           | IO10     | GPIO10,输入，输出，高阻                 | PWM03/SPI0_MISO | VDD3P3_CPU | UP/DOWN        |
| 13           | IO03     | GPIO03,输入，输出，高阻                 | SPI0_MOSI       | VDD3P3_RTC | UP/DOWN        |
| 14           | IO02     | GPIO02,输入，输出，高阻                 | PWM02/SPI0_CK   | VDD3P3_CPU | UP/DOWN        |
| 15           | 3.3V     | 芯片电源，3.3V                          |                 |            |                |
| 16           | GND      | 接地                                    |                 |            |                |
| 17           | 5V       | 5V电源接口，与USB的VBUS相连             |                 |            |                |
| 18           | PWB      | 芯片3.3V供电控制,高电平有效，不用可悬空 |                 |            |                |
| 19           | GND      | 接地                                    |                 |            |                |
| 20           | 3.3V     | 芯片电源，3.3V                          |                 |            |                |
| 21           | RESET    | 芯片复位                                |                 | VDD3P3_RTC |                |
| 22           | NC       |                                         |                 |            |                |
| 23           | IO13     | GPIO13,输入，输出，高阻                 |                 | VDD3P3_CPU | UP/DOWN        |
| 24           | U0_RX    | GPIO20,输入，输出，高阻                 | UART0_RX        | VDD3P3_CPU | UP/DOWN        |
| 25           | U0_TX    | GPIO21,输入，输出，高阻                 | UART0_TX        | VDD3P3_CPU | UP/DOWN        |
| 26           | GND      | 接地                                    |                 |            |                |
| 27           | IO19     | GPIO19,输入，输出，高阻                 | USB_D+          | VDD3P3_CPU | UP/DOWN        |
| 28           | IO18     | GPIO18,输入，输出，高阻                 | USB_D-          | VDD3P3_CPU | UP/DOWN        |
| 29           | IO12     | GPIO12,输入，输出，高阻                 | SPIHD           | VDD3P3_CPU | UP/DOWN        |
| 30           | IO01     | GPIO1,输入，输出，高阻                  | UART1_RX        | VDD3P3_CPU | UP/DOWN        |
| 31           | IO0      | GPIO0,输入，输出，高阻                  | UART1_TX        | VDD3P3_CPU | UP/DOWN        |
| 32           | GND      | 接地                                    |                 |            |                |



## 四、功能介绍

### **1.** **供电电源**

CORE-ESP32-C3核心板支持以下3种方式供电：

- Type-C 接口供电（默认）
- 5V和GND排针供电
- 3V3 和 GND 排针供电 

![img](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/clip_image002.jpg)

 调试过程中优先推荐的供电方式：TYPE-C USB接口供电。 

### **2.** **LED控制**

合宙CORE ESP32核心板板载2颗LED，开发者可参考表4-1进行对应管脚的控制。

​         ![img](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/clip_image010.jpg)

表4-1

| **LED**编号 | **对应GPIO** | **管脚功能** | **描述**   |
| ----------- | ------------ | ------------ | ---------- |
| D4          | I012         | GPIO12配置   | 高电平有效 |
| D5          | IO13         | GPIO13配置   | 高电平有效 |

### **3.** **按键介绍**

合宙CORE ESP32核心板板载两颗按键，其中BOOT键可实现BOOT下载功能，RST键可实现复位功能，管脚控制参考表4-2。

​           ![img](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/clip_image012.jpg)

 

表4-2 

| **按键编号** | **管脚功能**                 | **描述**   |
| ------------ | ---------------------------- | ---------- |
| BOOT/GPIO9   | 按键按下时，芯片进入下载模式 | 低电平有效 |
| RST          | 按键按下时，芯片复位         | 低电平有效 |

### **4.** **外置SPI FLASH控制**

管脚控制参考表4-3。

 

![img](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/clip_image014.jpg)

 

表4-3

| **flash管脚标号** | **对应GPIO** | **管脚功能**                  | **上下拉能力** |
| ----------------- | ------------ | ----------------------------- | -------------- |
| SPICS0            | -            | GPIO14配置，FLASH_CS，片选    | UP/DOWN        |
| SPIQ              | -            | GPIO17配置，FLASH_D1，数据脚1 | UP/DOWN        |
| SPID              | -            | GPIO16配置，FLASH_D0，数据脚0 | UP/DOWN        |
| SPICLK            | -            | GPIO15配置，FLASH_CK，时钟    | UP/DOWN        |

 注：CORE ESP32核心板搭载ESP32-C3不带内置FLASH版本，默认贴装外置SPI FLASH，如遇到不贴装外置SPI FLASH的核心，需要注意主芯片的具体型号。 

附表4-4

 

![img](https://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/clip_image016.jpg)

 

## **使用注意事项** 

1. **BOOT（IO09）管脚上电前不能下拉，ESP32会进入下载模式。**
2. **使用到IO08管脚进行设计，不建议外部直接下拉，因为在下载烧录时，IO08管脚为低电平，不能使用串口进行下载。**
3. **IO12（GPIO12）、IO13（GPIO13）在QIO模式下为SPI信号SPIHD和SPIWP复用，为了增加可用GPIO数量，开发板选择采用2线SPI的DIO模式，IO12、IO13并未连接flash，使用自己编译的软件时需要注意配置flash为DIO模式。**
4.  **外置SPI flash的VDD已链接至3.3V电源系统，使用时不需再配置其他电源，采用普通2线SPI通信方式，对应管脚如表4-3。**
5. **GPIO11默认为SPI flash的VDD引脚，需要配置后才能作为GPIO使用。**



## **相关资料链接**

[开源仓库链接](https://gitee.com/dreamcmi/LuatOS-ESP32)

[demo链接](https://gitee.com/dreamcmi/LuatOS-ESP32/tree/master/demo)

https://luatos.com/t/esp32c3
