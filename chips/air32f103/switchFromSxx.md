# 从SXX32F103移植

## 前言

这篇迁移指南旨在帮助您分析从现有的SXX32F103器件移植到AIR32F103器件所需的步骤。本文档收集了最重要的信息，并列出了需要注意的重要事项。

要将应用程序从SXX32F103系列移植到AIR32F103系列，用户需要分析硬件移植、外设移植和固件移植。

> AIR32F103系列微控制器基本兼容SXX32F103系列，同时强化许多功能，有些许地方与SXX32F103不同，详述于本文档。

## 快速替换 SXX32F103 芯片

1. 比对外设规格、Flash容量、SRAM容量等，解焊SXX32F103，换成AIR32F103对应型号
2. 使用ISP或KEIL,下载SXX32F103 HEX文件或BIN文件。
3. 如果有需要, 下载SXX32F103 HEX文件或BIN文件以外的资料或进行系统校正。
4. 查看程序能否正常运行。
5. 其他问题快速排查请参考外设使用差别章节。
6. 如果经过上述步骤后程序仍无法正常运行, 请参考本文件其他章节, 或联系支持人员协助解决。

## AIR32F103外设使用差别

## 系统功能

### BOOT1管脚使用差异

当BOOT1悬空时

SXX32F103：识别为高，但是抗干扰能力较弱，容易被外界环境干扰

AIR32F103：为浮空状态，建议外部固定为高/低

### DEBUG状态下，使能SW，关断JTAG差异

DEBUG状态下，将SW使能，JTAG关断，如下图使用

```c
GPIO_PinRemapConfig(GPIO_Remap_SWJJTAGDISABLE, ENABLE);
```

SXX32F103：JTAG关断，正常使用SW 进行DEBUG

AIR32F103：程序复位

会导致的一些问题，例如在cubemx配置为SW调试，下载一次固件以后就连接不上设备了，解决方法是在`sxx32f1xx_hal_msp.c`文件的`HAL_MspInit`函数加入`__HAL_AFIO_REMAP_SWJ_ENABLE();`

```c
/* USER CODE END 0 */
/**
  * Initializes the Global MSP.
  */
void HAL_MspInit (void)
{
    /* USER CODE BEGIN MspInit 0 */

    /* USER CODE END MspInit 0 */

    __HAL_RCC_AFIO_CLK_ENABLE();
    __HAL_RCC_PWR_CLK_ENABLE();

    /* System interrupt init */

    /** NOJTAG:. JTAG-DP Disabled and SW-DP Enabled
    */
    __HAL_AFIO_REMAP_SWJ_NOJTAG();

    /* USER CODE BEGIN MspInit 1 */
    __HAL_AFIO_REMAP_SWJ_ENABLE();
    /* USER CODE END MspInit 0 */
}
/* USER CODE BEGIN 1 */
```

### 不支持某些SXX32F103专用烧录器下载

AIR32F103和SXX32F103 ARM M3 Core版本、SW、JTAG IDCODE不同

|芯片|SXX32F103|AIR32F103|
|:-:|:-:|:-:|
|Core ID|0x411FC231|0x412FC230|
|SW IDCODE|0x1BA01477|0x2BA01477|
|JTAG IDCODE|0x3BA00477|0x4BA00477|

当使用某些SXX32F103专用烧录器时，会判断Core ID和SW IDCODE、JTAG IDCODE等信息，故不支持某些SXX32F103专用烧录器

解决方法：

使用不判断Core ID和SW IDCODE、JTAG IDCODE的烧录器

### 第三方某些烧录器下载失败问题

对于某些烧录器在RESET拉低的情况下进行SW/JTAG交互，是不支持的。因为AIR32F103当RESET拉低时，SW和JTAG是无法使用的（如：WizPro200ST8编程器）

解决方法：

1. 配置烧录器，在烧录时将RESET拉高
2. 悬空芯片NRST管脚，不和烧录器相连

### 非32bit对齐访问APB总线时，现象差异

访问APB总线时，必须32bit对齐，否则无法访问，如：

当ADC转换完成后，若按照非32bit对齐访问ADC DR寄存器

SXX32F103：可获取正确值

AIR32F103：无法获取正确值，获取的值均为0

解决方法：

访问APB总线的寄存器时，按照32bit对齐，均可正常访问

### 中断控制器差异

SXX32F103：

1. 最多支持60个可屏蔽中断通道
2. 16个可编程的优先等级(使用了4位中断优先级)

AIR32F103：

1. 最多支持71个可屏蔽中断通道
2. 8个可编程的优先等级(使用了3位中断优先级)

会导致的问题：

cubemx或者其他freertos工程的`configPRIO_BITS`设置是4，需要改成3，不然会导致异常，注意如果是cubemx会导致每次生成代码以后都要重新设置，所以可用直接注释掉`FreeRTOSConfig.h`里的这句话

```c
/* USER CODE BEGIN 1 */
// #define configASSERT( x ) if ((x) == 0) {taskDISABLE_INTERRUPTS(); for( ;; );}
/* USER CODE END 1 */
```

可以查看ARM的手册，3位中断优先级和4位兼容，不会有任何问题，cubemx中的configASSERT配置实际很影响运行效率，freertos的手册中建议关闭。所以按这个方案修改不会有任何bug，无需担心。

![image-20220623095717980](img/image-20220623095717980.png)

## ADC

### ADC配置连续触发后，关闭ADON或者进行ADC软复位，ADC转化差异

SXX32F103：关闭ADON或者进行ADC软复位，ADC转换停止

AIR32F103：

1. 关闭ADON，ADC连续转化未停止
2. 进行ADC软复位， ADC转换停止，再次启动转换，前几个量化值异常

解决方法：

1. 软件关ADON之前，将连续转换配置为单次转换，等待上一次采样周期个ADC_CLK
2. 连续转化过程中，进行ADC软复位后，再次启动需要等待上一次采样周期个ADC_CLK

### ADC连续两次外部事件的软件触发时，现象差异 

情况1：当使能ADC，并且在EOC置位前，进行外部事件的软件触发，如：

```c
ADC_Cmd(ADC1, ENABLE);
ADC_SoftwareStartConvCmd(ADC1, ENABLE);
```

情况2：当有2次连续外部事件的软件触发时

```c
ADC_SoftwareStartConvCmd(ADC1, ENABLE);
ADC_SoftwareStartConvCmd(ADC1, ENABLE);
```

SXX32F103：EOC正常置位，会忽略一次触发

AIR32F103：会导致转化异常，EOC不置位

解决方法：

1. 使能ADC后，等待EOC置位，读取量化值

```c
ADC_Cmd(ADC1, ENABLE);
while(ADC_GETFlagStatus(ADC1, ADC_FLAG_EOC) == RESET);
ADCGetConversionValue(ADC1);
ADC_SoftwareStartConvCmd(ADC1, ENABLE);
```

2．外部事件的软件触发，等待EOC置位，读取量化值

```c
ADC_SoftwareStartConvCmd(ADC1, ENABLE);
while(ADC_GETFlagStatus(ADC1, ADC_FLAG_EOC) == RESET);
ADCGetConversionValue(ADC1);
ADC_SoftwareStartConvCmd(ADC1, ENABLE);
while(ADC_GETFlagStatus(ADC1, ADC_FLAG_EOC) == RESET);
ADCGetConversionValue(ADC1);
```

### ADC使用ADC自动注入转换差异

SXX32F103：ADC自动注入转换直接使用

AIR32F103：ADC自动注入转换获取到值为0

解决方法：AIR32F103使用自动注入转换ADC_ScanConvMode需要配置为开启

## TIM

### 通用定时器TIM2-TIM5的Channel3差异

SXX32F103：通用定时器TIM2-TIM5的Channel3支持输入、输出功能

AIR32F103：通用定时器TIM2-TIM5的Channel3只支持输入功能

解决方法：

选择TIM2-TIM5的其他通道,或者选择其他TIM的通道进行输出使用

### TIM2重映射差异

当TIM2_REMAP[1:0] = 01

SXX32F103: TIM2_CH1_ETH - PA15;TIM2_CH2 – PB3

AIR32F103: TIM2_CH1_ETH – PA0;TIM2_CH2 – PA1

当TIM2_REMAP[1:0] = 10

SXX32F103: TIM2_CH1_ETH – PA0;TIM2_CH2 – PA1

AIR32F103: TIM2_CH1_ETH – PA15;TIM2_CH2 – PB3

解决方法：

使用TIM2重映射，注意IO配置的修改

### TIM 使用外部信号刹车，连续两次刹车的时间间隔小于一个TIM 时钟周期时，现象差异

SXX32F103：刹车标志正常置位，正常清除

AIR32F103：刹车标志正常置位，BIF清除不掉、刹车中断清除不掉

解决方法：

1. 软件配置刹车信号为普通输入IO中断，不使用 BIF和刹车中断
2. 在BIF置位或者刹车中断中，进行软复位

### CEN 被清除后，再次使能，现象差异

当CEN 被清除(单脉冲模式下，发生更新事件/ 软件写0)，再次使能后

SXX32F103：不会重新加载ARR

AIR32F103：会重新加载ARR

例如：

1．使能单脉冲模式，开启更新中断

```c
TIM_SelectOnePulseMode(TIMx, TIM_OPMode_Single);
TIM_ITConfig(TIMx, TIM_IT_Update, ENABLE);
TIM_Cmd (TIMx, ENABLE);
```

2．在更新中断中配置CNT，使能CEN

```c
if (TIM_GetITStatus(TIMx, TIM_IT_Update) != RESET)
{
    TIM_ClearITPendingBit(TIMx, TIM_IT_Update);
    TIM_SetCounter(TIMx, NewCnt);
    TIM_Cmd(TIMx, ENABLE);
}
```

现象：

SXX32F103：在更新中断重新使能CEN后，计数器会从新配置的NewCnt进行计数

AIR32F103：在更新中断重新使能CEN后，计数器会不从新配置的NewCnt进行计数，会
重新加载ARR的数值进行计数

解决方法：

在配置CNT时，需要确保CEN是处于使能状态，否则配置CNT无效

## CAN

### CAN发送时间戳时，时间戳填充报文的位置差异

CAN配置时间触发通讯模式，在最后2个数据字节发送时间戳时

SXX32F103：时间戳[7:0]在数据包的8Byte，时间戳[15:8]在数据包的7Byte

AIR32F103：时间戳[7:0]在数据包的7Byte，时间戳[15:8]在数据包的8Byte

解决方法：

其他CAN节点使用接受到的时间戳时，软件进行翻转

## FLASH

### FLASH写保护第一块后，第一次擦除其他Page，现象差异

SXX32F103：写保护第一块后，擦除其他Page，可正常擦除

AIR32F103：写保护第一块后，第一次擦除其他Page，擦除失败，并上报WRPRTERR写保护错误

解决方法：

在配置Page擦除之前，先配置一次Strt，如下图所示

![flash代码](img/flash.png)

## USART

### USART 智能卡模式时钟输出差异

SXX32F103：USART 智能卡模式时钟输出，无需配置USART TE(发送使能)/RE(接收使能)

AIR32F103：USART 智能卡模式时钟输出，需要配置USART TE(发送使能)/RE(接收使能)，否则无时钟输出

解决方法：

在初始化USART时，将USART TE(发送使能)/RE(接收使能) 使能

## SPI/IIS

### IIS 在主接收模式、并且处于PCM标准模式下时，关闭I2SE现象差异

SXX32F103：可通过配置I2SE，停止主机输出时钟

AIR32F103：不可通过配置I2SE，停止主机输出时钟

解决方法：

1. 通过配置I2SMOD，停止主机输出时钟
2. 通过软复位模块方式，停止主机输出时钟

### SPI使用DMA传输数据

SPI使用DMA传输数据时建议外设DAM使能和DMA通道使能同时ENABLE/DISABLE

```c
DMA_Cmd(FLASH_SPI_RX_DMA_CHANNEL, ENABLE);
DMA_Cmd(FLASH_SPI_TX_DMA_CHANNEL, ENABLE);
SPI_I2S_DMACmd (FLASH_SPI_MASTER, SPI_I2S_DMAReq_Tx, ENABLE);
SPI_I2S_DMACmd (FLASH_SPI_MASTER, SPI_I25_DMAReq_Rx, ENABLE);
```

```c
SPI_I2S_DMACmd (FLASH_SPI_MASTER, SPI_I2S_DMAReq_Tx, DISABLE);
SPI_I2S_DMACmd (FLASH_SPI_MASTER, SPI_I25_DMAReq_Rx, DISABLE);
DMA_Cmd(FLASH_SPI_TX_DMA_CHANNEL, DISABLE);
DMA_Cmd(FLASH_SPI_RX_DMA_CHANNEL, DISABLE);
```

### SPI RXE置位，读取DR后，DR中的数据保留

SXX32F103：当RXE置位，读操作将返回接收缓冲区里的数据，并且会将DR清0

AIR32F103：当RXE置位，读操作将返回接收缓冲区里的数据，不会将DR清0

解决方法：

不影响正常收发数据
