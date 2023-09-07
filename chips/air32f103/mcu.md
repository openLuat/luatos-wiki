# AIR32F103芯片

## AIR32F103是什么?

Air32F103为系列芯片，其外设和硬件设计兼容市场上一些主流F103型号，主频最高可达256M，96K RAM+256K Flash，每个IO都可设置独立的内部上下拉电阻。详细信息见数据手册，[Air32F103芯片手册](https://cdn.openluat-luatcommunity.openluat.com/attachment/20230326193134901_AIR32F103xxxx%E8%8A%AF%E7%89%87%E6%95%B0%E6%8D%AE%E6%89%8B%E5%86%8C.pdf)

寄存器手册[Air32F103xx_User_Manual.pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/20230907152950811_Air32F103xx_User_Manual_CN-带目录书签.pdf)

芯片对比

| 区别   | STM32F103C6T6      | STM32F103C8T6 | AIR32F103CBT6 | AIR32F103CCT6 |
| ------ | ------------------ | ------------- | ------------- | ------------- |
| Flash  | 32K                | 64K           | 128K          | 256K          |
| RAM    | 10K                | 20K           | 96K           | 96K           |
| 主频   | 72M                | 72M           | 256M          | 256M          |
| 定时器 | 3个（没有定时器4） | 4个           | 10个          | 10个          |
| ADC    | 2（10通道）        | 2（10通道）   | 3（16通道）   | 3（16通道）   |
| DAC    | 无                 | 无            | 2（2通道）    | 2（2通道）    |

## 环境搭建教程

[Air32F103使用手册](https://wiki.luatos.com/chips/air32f103/Air32f103.html)

[AIR32F103的SDK与demo](https://gitee.com/openLuat/luatos-soc-air32f103)

## 替换其他芯片说明

**遇到替换完不能工作，或者CubeMX HAL库开发有问题的，一定先阅读下面的手册**

使用Air32F103替换其他F103芯片说明[从SXX32F103移植到AIR32F103](https://wiki.luatos.com/chips/air32f103/switchFromSxx.html)

## 增强功能

具体使用方法可以看 [强化功能说明](https://wiki.luatos.com/chips/air32f103/enhancement.html)

**强化GPIO设计：**

支持独立上下拉控制(40K)，当 IO为复用功能时，可代替外部电路电阻。

**例如：**

使用SDIO模块时，D0-D3和CMD可用内部上拉电阻；

使用IIC时，当IIC速率小于等于100K，可用内部上拉电阻。

**USB内部可选1.5K上拉电阻：**

USB内部DP可选1.5K上拉电阻，可替代外部电路上拉电阻；并且可以实现软件重枚举（无需PCB外部加三极管控制）。

**支持多种CRC模式：**

可选择输入Byte大小端是否翻转、计算结果高低位是否翻转、计算结果是0xFFFFFFFF异或、CRC16/32、CRC16 多项式。

**MCO支持输出PLL 2-16分频输出：**

更灵活的时钟输出配置，除原有输出源外，另支持输出PLL 2-16分频输出。

**支持SM1/SM3/SM4/SM7国密算法；**

## 注意事项

```{note}
由于**win7**系统不自带`winusb`驱动，且该系统早在2020年微软就已停止支持，所以如需使用DAPLINK功能，请升级至**win8以上系统**，或自行手动安装驱动：[Zadig驱动安装器](https://zadig.akeo.ie/)
```

## 模块购买

* [合宙商城](https://appc6kjfor22343.h5.xiaoeknow.com)
* [淘宝店](https://luat.taobao.com)

## 芯片PinOut

![image-20220605163450851](img/image-20220605163450851.png)
