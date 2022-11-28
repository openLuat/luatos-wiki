# adc

本章介绍LuatOS的adc功能，实现使用开发板读取外部电压并在日志中打印

## 简介

模拟数字转换器即A/D转换器，或简称ADC，通常是指一个将模拟信号转变为数字信号的电子元件。

::::{tab-set}

:::{tab-item} Air101
:sync: air101

Air101共有2路ADC，开发板引出了2路，通道分别为0，1，输入电压范围 0~2.4V（参考[air101_芯片规格书_v1.1.pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/air101_%E8%8A%AF%E7%89%87%E8%A7%84%E6%A0%BC%E4%B9%A6_v1.1.pdf))

没有使用分压电路的情况下，我们直接使用只能采集0~2.4V的电压，`外接输入一定不要超过2.4V，否则会烧毁芯片！！`

![ADC](../img/ADC/air101/ADC1.png)

:::

:::{tab-item} Air103
:sync: air103

Air103共有4路ADC，开发板引出了4路，通道分别为0，1，2，3，输入电压范围 0~2.4V（参考[Air103_MCU设计手册V1.2.pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/20211202193606476_Air103_MCU%E8%AE%BE%E8%AE%A1%E6%89%8B%E5%86%8CV1.2.pdf))

没有使用分压电路的情况下，我们直接使用只能采集0~2.4V的电压，`外接输入一定不要超过2.4V，否则会烧毁芯片！！`

![ADC](../img/ADC/air103/ADC1.png)

:::

:::{tab-item} Air105
:sync: air105

Air105共有7路ADC，开发板引出了4路，通道分别为1，2，5，6（参考[Air105 核心板使用手册V1.1.pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/20220303111656608_Air105%20%E6%A0%B8%E5%BF%83%E6%9D%BF%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8CV1.1.pdf)）

参考[Air105芯片数据手册_1.1.pdf](https://cdn.openluat-luatcommunity.openluat.com/attachment/20220114193313925_Air105%E8%8A%AF%E7%89%87%E6%95%B0%E6%8D%AE%E6%89%8B%E5%86%8C_1.1.pdf)可知，ADC 的参考电压为 1.8V，ADC 通道 1~通道 6 采集电压范围可配，使能内部分压时采集电压范围 0~3.6V，不使能内部分压时采集电压范围 0~1.8V，在LuatOS中未使能内部分压，所以我们直接使用只能采集0~1.8V的电压，`外接输入一定不要超过1.8V，否则会烧毁芯片！！`

![ADC](../img/ADC/air105/ADC1.png)

:::

::::

## 硬件准备

::::{tab-set}
:::{tab-item} Air101
:sync: air101

Air101开发板一块，可调电源一台，接线示意如下

> 注意：先打开可调电源，调到2.4V以下，再连接电源与开发板，防止直接连接开机电压过高烧毁芯片

```example
        PA04/ADC1 ----------- +
Air101                         可调电源
        GND      ----------- -
```

![ADC2](../img/ADC/air101/ADC2.jpg)

:::

:::{tab-item} Air103
:sync: air103

Air103开发板一块，可调电源一台，接线示意如下

> 注意：先打开可调电源，调到2.4V以下，再连接电源与开发板，防止直接连接开机电压过高烧毁芯片

```example
        PA04/ADC1 ----------- +
Air103                         可调电源
        GND      ----------- -
```

![ADC2](../img/ADC/air103/ADC2.jpg)

:::

:::{tab-item} Air105
:sync: air105

Air105开发板一块，可调电源一台，接线示意如下

> 注意：先打开可调电源，调到1.8V以下，再连接电源与开发板，防止直接连接开机电压过高烧毁芯片

```example
        PC0/ADC1 ----------- +
Air105                         可调电源
        GND      ----------- -
```

![ADC2](../img/ADC/air105/ADC2.jpg)

:::
::::

## 软件部分

接口文档可参考：[ADC库](https://wiki.luatos.com/api/adc.html)

代码如下

```lua
PROJECT = "ADC"
VERSION = "1.0.0"

sys = require("sys")

MOD_TYPE = rtos.bsp()
log.info("MOD_TYPE", MOD_TYPE)

function test()
    log.info(PROJECT, "START")
    -- 打开ADC通道1
    assert(adc.open(1) == true, PROJECT .. ".open ERROR")
    -- 读取ADC通道1的值
    log.info(PROJECT .. ".read", adc.read(1))
    -- 关闭ADC通道1
    adc.close(1)
    log.info(PROJECT, "DONE")
end

-- 创建一个携程循环执行test函数
sys.taskInit(function()
    while true do
        test()
        sys.wait(1000)
    end
end)

sys.run()

```

>注意：`adc.read`有两个返回值，第一个值为原始值，第二个值为转换值，单位为mV

::::{tab-set}
:::{tab-item} Air101
:sync: air101

成功下载后，观察日志输出如下，根据`adc.read`返回的第二个值可知测量电压为1712mV左右

```log
I/user.ADC START
I/user.ADC.read 103336 1776
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 103348 1777
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 103372 1777
I/user.ADC DONE
...
...
```

缓慢下调可调电源的电压值，观察日志输出的电压值对应可调电源的电压值

![](../img/ADC/air101/ADC3.jpg)

```log
I/user.ADC START
I/user.ADC.read 86784 1262
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 86844 1264
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 86852 1264
I/user.ADC DONE
...
...
```

![](../img/ADC/air101/ADC4.jpg)

```log
I/user.ADC.read 50736 142
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 50832 145
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 50788 144
I/user.ADC DONE
...
...
```

:::

:::{tab-item} Air103
:sync: air103

成功下载后，观察日志输出如下，根据`adc.read`返回的第二个值可知测量电压为1712mV左右

```log
I/user.ADC.read 97672 1600
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 97700 1601
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 97656 1600
I/user.ADC DONE
...
...
```

缓慢下调可调电源的电压值，观察日志输出的电压值对应可调电源的电压值

![](../img/ADC/air103/ADC3.jpg)

```log
I/user.ADC START
I/user.ADC.read 80300 1061
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 80364 1063
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 80300 1061
I/user.ADC DONE
...
...
```

![](../img/ADC/air103/ADC4.jpg)

```log
I/user.ADC START
I/user.ADC.read 62060 494
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 62052 494
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 61984 492
I/user.ADC DONE
...
...
```

:::

:::{tab-item} Air105
:sync: air105

成功下载后，观察日志输出如下，根据`adc.read`返回的第二个值可知测量电压为1712mV左右

```log
I/user.ADC START
I/user.ADC.read 3882 1712
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 3889 1709
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 3898 1713
I/user.ADC DONE
...
...

```

缓慢下调可调电源的电压值，观察日志输出的电压值对应可调电源的电压值

![](../img/ADC/air105/ADC3.jpg)

```log
I/user.ADC START
I/user.ADC.read 2670 1173
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 2675 1175
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 2673 1174
I/user.ADC DONE
...
...
```

![](../img/ADC/air105/ADC4.jpg)

```log
I/user.ADC START
I/user.ADC.read 1354 595
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 1350 593
I/user.ADC DONE
I/user.ADC START
I/user.ADC.read 1348 592
I/user.ADC DONE
...
...
```

:::
::::
