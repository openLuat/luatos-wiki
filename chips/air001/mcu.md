# Air001芯片

## Air001是什么?

合宙Air001是一款TSSOP20封装的MCU，采用高性能的32位ARM®Cortex®-M0+内核，内置32Kbytes的Flash和4Kbytes的RAM。芯片集
成多路USART、IIC、SPI等通讯外设，5个16bit定时器以及1路12bit ADC和2路比较器。详细信息见数据手册，[AIR001芯片数据手册.pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/20230713110837272_AIR001芯片数据手册1.0.2.pdf)和寄存器手册[Air001寄存器手册](https://cdn.openluat-luatcommunity.openluat.com/attachment/20230710144801147_AIR001%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C.pdf)。

LuatOS大QQ群: 1061642968

## 环境搭建教程

[Air001基于Keil MDK的用户手册](https://wiki.luatos.com/chips/air001/Air001-MDK.html)

[Air001基于Arduino的用户手册](https://wiki.luatos.com/chips/air001/Air001-Arduino.html)

## 刷机烧录教程

### 使用串口下载

```{note}
在Arduino中，我们推荐采用串口进行下载
```

串口下载的接线为串口模块的`RX`接Air001的`TXD`（`PA2`），串口模块的`TX`接Air001的`RXD`（`PA3`），如果您希望能够自动下载的话，应当把`DTR`和`RTS`连接到串口模块上的对应引脚，芯片或者开发板的`GND`与串口模块的`GND`相连。

如果您没有自动下载，那么在每次下载前需要手动进入 bootloader：

- 先按下 BOOT 按键不放（即拉高 `BOOT0` 引脚）
- 按一下RST按键
- 松开 BOOT 按键
- 下载完成后，可能需要手动按一下 RST 按键以复位正常运行

```{note}
如果您使用Arduino出现无法自动下载的情况（目前多见于AMD处理器的电脑）。您可以手动进入bootloader以进行下载。
```

### 使用 SWD 调试/下载

使用 SWD 调试/下载的接线为调试器的`SWDIO`接Air001的`SWDIO`（`PA13`），调试器的`SWCLK`接Air001的`SWCLK`（`PA14`），芯片或者开发板的`GND`与调试器的`GND`相连。

## 芯片购买

* [合宙商城](https://appc6kjfor22343.h5.xiaoeknow.com)

* [淘宝店](https://luat.taobao.com)

  ![图片](img/640.png)

## 芯片PinOut

![](img/2023-05-08-21-40-54.png)
