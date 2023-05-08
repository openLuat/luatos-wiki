# ⚡ IoT Power - CC

IOT Power CC是一款功能齐全，稳定可靠的小型手持式功率计，它可以：

- 通过USB C供电，测量低功耗设备的电压与电流（与其他USB表不同，测量输出端电压电流，更反映设备实际功耗）
- 连接PD快充充电器（支持PPS），诱骗指定的电压与电流输出
- 自带屏幕，可显示数据与波形信息
- 最大测量范围：电压最大25V，电流最大5A
- 使用0.4% ±20ppm 精度基准芯片，预留0.1% 基准位置，0.1%精度精密电阻，12位ADC设计。标称精度1%（典型值0.5%），用户进一步校准精度可以达到0.1%
- 自动测量范围：电流回显档位分别为500μA、50mA、5A三个档位，根据当前输出电流自动切换
- 档位切换速度：CC表采用多通道同步采样，无换挡延迟
- 压降切换速度：CC表采用2/3通道采样电阻，采样电阻被短路的最大延时是100uS
- 电流测量精度：500μA档位时分辨率0.1μA，50mA档位时分辨率100μA（见左侧技术指标）
- 固定多通道 10KHz采样速率，USB高速数据传输，满足蜂窝模组、蓝牙、WIFI等的功耗测试需求
- 可配合PC客户端查看与分析电流波形，也可使用命令行版本在任意设备(win/linux/mac)上抓取串口数据（如树莓派），使用pc客户端导入查看

IOT Power CC是广大用户随身携带的理想测试工具。

::::{grid} 1 2 2 3
:gutter: 1 1 1 2

:::{grid-item-card} {octicon}`repo-forked;1.5em;sd-mr-1` 连接与组装
:link: parts
:link-type: doc
:img-top: img/font_small.jpg

展示CC与被测试设备的连接方式、外壳拼装说明

+++
[了解更多 »](parts)
:::

:::{grid-item-card} {octicon}`stopwatch;1.5em;sd-mr-1` 操作说明
:link: usage
:link-type: doc
:img-top: img/usage_small.png

详细描述设备各个功能的用法

+++
[了解更多 »](usage)
:::

:::{grid-item-card} {octicon}`law;1.5em;sd-mr-1` 技术指标
:link: tech
:link-type: doc
:img-top: img/comp.png

列举设备的各项参数与性能指标

+++
[了解更多 »](tech)
:::

::::

---

```{rubric} 更多资料
```

请选择左侧的具体页面查看各项资料。

```{toctree}
tech
parts
usage
question
```
