# 强化功能使用说明

这篇迁移指南旨在帮助您使用AIR32F103器件所支持的增强型功能

## PLL高频配置

描述：AIR32F103 内置的 PLL 可输出 216MHz 时钟

使用范例：参考[\ModuleDemo\RCC\RCC_ClockConfig工程](https://gitee.com/openLuat/luatos-soc-air32f103/tree/master/ModuleDemo/RCC)

```c
......
RCC_PLLCmd(DISABLE);                                        //关闭PLL
AIR_RCC_PLLConfig(RCC_PLLSource_HSE_Div1, RCC_PLLMul_27, 1);//配置PLL,8*27=216MHz

RCC_PLLCmd(ENABLE); //使能PLL
......
```

## GPIO支持独立上下拉控制

描述：AIR32F103 支持独立上下拉控制(40K)，当 IO为复用功能时，可代替外部电路电阻。例如：

- 使用 SDIO 模块时，D0-D3 和 CMD 可用内部上拉电阻
- 使用IIC是，当IIC 速率小于等于100K，可用内部上拉电阻

使用范例：参考[\ModuleDemo\IIC\IIC_IntTransmit工程](https://gitee.com/openLuat/luatos-soc-air32f103/tree/master/ModuleDemo/IIC)

```c
//开启内部上拉
GPIO_ForcePuPdCmd(GPIOB, ENABLE);
GPIO_ForcePullUpConfig(GPIOB, GPIO_Pin_8);  // PB8上拉
GPIO_ForcePullUpConfig(GPIOB, GPIO_Pin_9);  // PB9上拉
```

## USB内部可选1.5K上拉电阻

描述：USB 内部 DP可选1.5K上拉电阻，可替代外部电路上拉电阻;并且可以实现软件重枚举(不需要PCB外部加三极管控制)

使用范例：参考[\ModuleDemo\USB\Virtual_COM_Port工程](https://gitee.com/openLuat/luatos-soc-air32f103/tree/master/ModuleDemo/USB/Virtual_COM_Port)

```c
DP_PUUP = 1;
```

## USB支持PLL时钟的 1/1.5/2/2.5/3/3.5/4/4.5 倍分频作为 USB 时钟

描述：支持 PLL 时钟的 1/1.5/2/2.5/3/3.5/4/4.5 倍分频作为 USB 时钟

使用范例：参考[\ModuleDemo\USB\Virtual_COM_Port工程](https://gitee.com/openLuat/luatos-soc-air32f103/tree/master/ModuleDemo/USB/Virtual_COM_Port)

```c
//USB时钟配置函数,USBclk=48Mhz@HCLK=72Mhz
void Set_USBClock(void)
{
    RCC_USBCLKConfig(RCC_USBCLKSource_PLLCLK_4Div5);    //USBclk=PLLclk/1.5=48Mhz
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_USB, ENABLE); //USB时钟使能
}
```

## MCO支持输出PLL 2-16分频输出

描述：MCO支持输出 PLL 2-16 分频输出

使用范例：参考[\ModuleDemo\MCO\MCO_PllDiv工程](https://gitee.com/openLuat/luatos-soc-air32f103/tree/master/ModuleDemo/MCO)

```c
/** @defgroup Clock_source_to_output_on_MCO_pin
  * @{
  */
enum
{
    RCC_MCO_NoClock = 0x00,
    RCC_MCO_SYSCLK = 0x04,
    RCC_MCO_HSI,
    RCC_MCO_HSE,
    RCC_MCO_PLLCLK_Div2,
    RCC_MCO_PLLCLK_Div3,
    RCC_MCO_PLLCLK_Div4,
    RCC_MCO_PLLCLK_Div5,
    RCC_MCO_PLLCLK_Div6,
    RCC_MCO_PLLCLK_Div7,
    RCC_MCO_PLLCLK_Div8,
    RCC_MCO_PLLCLK_Div9,
    RCC_MCO_PLLCLK_Div10,
    RCC_MCO_PLLCLK_Div11,
    RCC_MCO_PLLCLK_Div12,
    RCC_MCO_PLLCLK_Div13,
    RCC_MCO_PLLCLK_Div14,
    RCC_MCO_PLLCLK_Div15,
    RCC_MCO_PLLCLK_Div16,
};
```
