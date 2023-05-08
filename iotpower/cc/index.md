# ⚡ IoT Power - CC

IOT Power CC是一款功能齐全，稳定可靠的小型手持式功率计，它可以：

- 通过USB C供电，测量低功耗设备的电压与电流
- 与其他USB表不同，测量输出端电压电流，更反映设备实际功耗
- 连接**PD快充**充电器（支持PPS），诱骗指定的电压与电流输出
- 电压最大25V，电流最大5A
- 电流**多通道同步采样**，无换挡延迟，最高分辨率0.15μA
- **10KHz采样速率**，满足蜂窝模组、蓝牙、WIFI等的功耗测试需求
- 可**连接PC客户端**查看与分析电流波形，也可使用命令行版本在任意设备(win/linux/mac)上抓取串口数据（如树莓派），使用pc客户端导入查看

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

## 精度对比

![vtest](img/vtest.png)

![ctest](img/ctest.png)

```{rubric} 更多资料
```

请选择左侧的具体页面查看各项资料。

```{toctree}
tech
parts
usage
question
```
