# 硬件资料

模块硬件资料请前往：[air780e.cn](http://air780e.cn)

## 开发板pinout

该图是LuatOS的视角, csdk是支持调整管脚复用关系的

![pinout2air780e](pinout.png)

提醒:
1. 标红色的是AON_GPIO, 在休眠模式下也可以使用. 非休眠模式下就是普通GPIO
2. UART2与SPI0复用 GPIO9/GPIO10,没有标错
3. DBG即UART0, 是底层日志输出口, 强烈建议不要尝试复用它
4. UART1是主串口, 也支持下载串口, 强烈建议不要复用成GPIO
5. AON_GPIO的驱动能力均很弱!!
6. GPIO均不支持"双向触发",只支持单向触发
7. PWM的最高频率是13M
8. 图中的LCD SPI只是约定排序, 其实就是普通SPI,非"专用"SPI
9. 开发板的IO电平为3.3v, 模块本身可配置1.8v/3.3v
10. SPK是扬声器输出, 需要外接功放, 否则声音很小
