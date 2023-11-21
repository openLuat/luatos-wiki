# 🔋 IoT Power Pro

> ~~[前往淘宝购买](https://luat.taobao.com/)~~ 还未发售

```{warning}
本产品还未发售，部分描述可能会有变动，以实际到手设备为准
```

IOT Power是一款功能齐全，稳定可靠的小型手持式功率计。它可以：

- 通过USB C供电，测量低功耗设备的电压与电流
- 作为电源使用，支持输出指定电压
- 支持限流输出，可设置任意限流值
- 电压最大5V，电流最大2A（需要供电满足要求）
- 短路保护，短路自动限制电流至1.5A以下
- 电流**多通道同步采样**，无换挡延迟，最高分辨率0.05μA
- 精度高，误差小，详情可查阅[技术指标](https://wiki.luatos.com/iotpower/pro/tech.html)，欢迎验证
- 高达**10KHz采样速率**，满足蜂窝模组、蓝牙、WIFI等的功耗测试需求
- 可**连接PC客户端**查看与分析电流波形，也可使用命令行版本在任意设备(win/linux/mac)上抓取串口数据（如树莓派），使用pc客户端导入查看

IOT Power Pro是广大用户随身携带的理想测试工具。

::::{grid} 1 2 2 3
:gutter: 1 1 1 2

:::{grid-item-card} {octicon}`repo-forked;1.5em;sd-mr-1` 连接与外观
:link: connect
:link-type: doc
:img-top: img/font-cn.jpg

展示Pro与被测试设备的连接方式，各个部分的用处

+++
[了解更多 »](connect)
:::

:::{grid-item-card} {octicon}`stopwatch;1.5em;sd-mr-1` 操作说明
:link: usage
:link-type: doc
:img-top: img/wave.jpg

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

## 相较于 IoT Power V1 的升级

|      IoT Power V1       |     IoT Power Pro      |
| :---------------------: | :--------------------: |
| 软件换挡，换挡时间≥40us |  硬件换挡，无换挡延迟  |
|    输出端短路会烧毁     |   输出端短路自动保护   |
|       单STM8主控        |     Air32+STM8双核     |
|   关闭输出后没有泄放    | 关闭输出后自动泄放能量 |
|      USB转串口通信      |   纯USB通信，占用低    |
|       滚轮不灵敏        |   滚轮跟手，十分舒适   |
|      176*128 TFT屏      |     280*240 IPS屏      |
|         UI朴素          |       UI花里胡哨       |
|      屏幕亮度固定       |       可以调亮度       |
|     要用电脑看波形      |     设备也能看波形     |
|    要连电脑模拟电池     |  设备自带模拟电池曲线  |

---

```{toctree}
tech
connect
usage
question
```
