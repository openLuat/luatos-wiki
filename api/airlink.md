# airlink - AirLink(设备间通讯协议)

**示例**

```lua
-- 本库仅部分BSP支持, 通信形式以设备内SPI/设备间UART/设备间UART通信为主要载体
-- 主要是 Air8000 和 Air780E 系列
-- 详细用法请参考demo

```

## 常量

|常量|类型|解释|
|-|-|-|
|airlink.MODE_SPI_SLAVE|number|airlink.start参数, SPI从机模式|
|airlink.MODE_SPI_MASTER|number|airlink.start参数, SPI主机模式|
|airlink.MODE_UART|number|airlink.start参数, UART模式|
|airlink.CONF_SPI_ID|number|SPI配置参数, 设置SPI的ID|
|airlink.CONF_SPI_CS|number|SPI配置参数, 设置SPI的CS脚的GPIO|
|airlink.CONF_SPI_RDY|number|SPI/UART配置参数, 设置RDY脚的GPIO|
|airlink.CONF_SPI_IRQ|number|SPI/UART配置参数, 设置IRQ脚的GPIO|
|airlink.CONF_SPI_SPEED|number|SPI配置参数, 设置SPI的波特率|
|airlink.CONF_IRQ_TIMEOUT|number|SPIUART配置参数, 设置IRQ模式的等待超时时间|
|airlink.CONF_UART_ID|number|UART配置参数, 设置UART的ID|


## airlink.init()

初始化AirLink

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 对于Air8000, 本函数已自动执行, 无需手动调用
-- 对于Air780EPM+Air8101的组合, 需要执行一次
airlink.init()

```

---

## airlink.start(mode)

启动AirLink

**参数**

|传入值类型|解释|
|-|-|
|int|mode 0: SPI从机模式 1: SPI主机模式 2: UART模式|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 对于Air8000, 本函数已自动执行, 无需手动调用
-- 对于Air780EPM+Air8101的组合, 需要执行一次
-- Air780EPM作为SPI主机
airlink.start(airlink.MODE_SPI_MASTER)
-- Air8101作为SPI从机
airlink.start(airlink.MODE_SPI_SLAVE)

```

---

## airlink.stop(mode)

关闭AirLink

**参数**

|传入值类型|解释|
|-|-|
|int|mode 0: SPI从机模式 1: SPI主机模式 2: UART模式|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 本函数当前无任何功能, 只做预留

```

---

## airlink.test(count)

发送测试指令(nop空指令)

**参数**

|传入值类型|解释|
|-|-|
|int|count 发送次数|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 本函数仅供内部测试使用
airlink.test(10)

```

---

## airlink.statistics()

打印统计信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 调试用途, 可周期性调用
airlink.statistics()

```

---

## airlink.slave_reboot()

重启从机

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 调试用途, 可重启从机
airlink.slave_reboot()

```

---

## airlink.sdata(data)

发送自定义数据

**参数**

|传入值类型|解释|
|-|-|
|string/zbuff|待传输的自定义数据,可以是字符串, 可以是zbuff|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 本函数用于传递自定义数据到对端设备, 通常用于Air8101+Air780EPM的场景
airlink.sdata("hello world")

```

---

## airlink.ready()

判断是否就绪

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|是否就绪|

**例子**

```lua
-- 判断AirLink是否就绪, 指底层通信是否通畅, 最近一次通信是否超时(默认2s)
-- 本函数仅用于判断AirLink是否就绪, 不能用于判断是否收到数据
if airlink.ready() then
    log.info("airlink", "已经就绪")
else
    log.info("airlink", "尚未就绪")
end

```

---

## airlink.config(key, value)

配置AirLink的参数

**参数**

|传入值类型|解释|
|-|-|
|int|key 配置项, 参考airlink的常数项|
|int|value 配置值|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true, 失败返回nil|

**例子**

```lua
--配置AirLink的SPI ID为1, CS引脚为10, RDY引脚为11, IRQ引脚为12
airlink.config(airlink.CONF_SPI_ID, 1)
airlink.config(airlink.CONF_SPI_CS, 10)
airlink.config(airlink.CONF_SPI_RDY, 11)
airlink.config(airlink.CONF_SPI_IRQ, 12)

```

---

## airlink.sfota(path)

升级从机固件

**参数**

|传入值类型|解释|
|-|-|
|string|升级文件的路径|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true, 失败返回nil|

**例子**

```lua
-- 注意, 升级过程是异步的, 耗时1~2分钟, 注意观察日志
airlink.sfota("/luadb/air8000s_v5.bin")
-- 注意, 升级过程中, 其他任何指令和数据都不再传输和执行!!!

```

---

## airlink.debug(mode)

调试开关

**参数**

|传入值类型|解释|
|-|-|
|int|mode 0: 关闭调试 1: 打开调试|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 打开调试(默认是关闭状态)
airlink.debug(1)

```

---

## airlink.pause(mode)

暂停或回复airlink通信

**参数**

|传入值类型|解释|
|-|-|
|int|mode 0: 恢复 1: 暂停|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 仅当airlink运行在轮询模式, 需要暂停时使用, 通常是为了休眠
airlink.pause(1)

```

---

## airlink.irqmode(mode, master_gpio, slave_gpio)

开启中断模式

**参数**

|传入值类型|解释|
|-|-|
|int|mode false: 禁用 true: 启用|
|int|master_gpio 主机引脚, 建议使用GPIO20|
|int|slave_gpio 从机引脚, Air8000使用GPIO140, Air8101使用GPIO28|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 默认情况下, airlink工作在轮询模式, 周期性查询数据
-- 开启中断模式后, 从机有新数据时, 会在slave_gpio上产生一个下升沿+上升沿中断
airlink.irqmode(true, 20, 140)
-- 注意, 开启本模式, 外部接线必须稳固, 否则各种airlink相关操作都会异常

```

---

## airlink.wakeupIrqmode(mode, master_gpio, slave_gpio, irq_mode)

开启wakeup唤醒中断模式

**参数**

|传入值类型|解释|
|-|-|
|int|mode false: 禁用 true: 启用|
|int|master_gpio 主机引脚, 建议使用GPIO20|
|int|slave_gpio 从机引脚, Air8000使用GPIO140, Air8101使用GPIO28|
|int|irq_mode 中断模式, 例如gpio.RISING (上升沿), gpio.FALLING (下降沿)|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 用于设置唤醒wifi 开启此功能后, 会在Air8000主机休眠唤醒时，允许在master_gpio上产生一个脉冲，从而通过绑定的slave_gpio触发中断唤醒wifi
airlink.wakeupIrqmode(true, 20, 140, gpio.RISING)
-- 注意, 开启本模式, 外部接线必须稳固, 否则可能会导致触发的中断脉冲不完整或接收不到，从而无法唤醒wifi

```

---

## airlink.power(enable)

关闭airlink相关供电

**参数**

|传入值类型|解释|
|-|-|
|boolean|enable true: 使能 false: 禁用|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 关闭airlink相关供电, 通常用于省电
-- 当前仅对Air8000带wifi功能的模组有效
-- 关闭之后, 如需使用wifi功能, 需要重新执行wifi.init等操作
-- 注意, wifi供电关掉后, >=128的GPIO也会变成输入高阻态
airlink.power(false)
-- 开启wifi芯片,恢复airlink通信
airlink.power(true)

```

---

## airlink.sver()

获取从机版本号

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|从机固件版本号|

**例子**

```lua
-- 注意, 获取之前, 需要确定airlink.ready()已经返回true
log.info("airlink", "从机固件版本号", airlink.sver())


```

---

