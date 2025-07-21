# uart - 串口操作库

## 常量

|常量|类型|解释|
|-|-|-|
|uart.Odd|number|奇校验,大小写兼容性|
|uart.Even|number|偶校验,大小写兼容性|
|uart.None|number|无校验,大小写兼容性|
|uart.ODD|number|奇校验|
|uart.EVEN|number|偶校验|
|uart.NONE|number|无校验|
|uart.LSB|number|小端模式|
|uart.MSB|number|大端模式|
|uart.VUART_0|number|虚拟串口0|
|uart.ERROR_DROP|number|遇到错误时抛弃缓存的数据|
|uart.DEBUG|number|开启调试功能|


## uart.setup(id, baud_rate, data_bits, stop_bits, partiy, bit_order, buff_size, rs485_gpio, rs485_level, rs485_delay, debug_enable, error_drop)

配置串口参数

**参数**

|传入值类型|解释|
|-|-|
|int|串口id, uart0写0, uart1写1, 如此类推, 最大值取决于设备|
|int|波特率, 默认115200，可选择波特率表:{2000000,921600,460800,230400,115200,57600,38400,19200,9600,4800,2400}|
|int|数据位，默认为8, 可选 7/8|
|int|停止位，默认为1, 根据实际情况，可以有0.5/1/1.5/2等|
|int|校验位，可选 uart.None/uart.Even/uart.Odd|
|int|大小端，默认小端 uart.LSB, 可选 uart.MSB|
|int|缓冲区大小，默认值1024|
|int|485模式下的转换GPIO, 默认值0xffffffff|
|int|485模式下的rx方向GPIO的电平, 默认值0|
|int|485模式下tx向rx转换的延迟时间，默认值12bit的时间，单位us, 9600波特率填20000|
|int|开启调试功能，默认使能，填写uart.DEBUG或者非数字使能，其他值都是关闭，目前只有移芯平台支持|
|int|遇到接收错误是否放弃缓存数据，默认使能，填写uart.ERROR_DROP或者非数字使能，其他值都是关闭，目前只有移芯平台支持|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功返回0,失败返回其他值|

**例子**

```lua
-- 最常用115200 8N1
uart.setup(1, 115200, 8, 1, uart.NONE)
-- 可以简写为 uart.setup(1)

-- 485自动切换, 选取GPIO10作为收发转换脚
uart.setup(1, 115200, 8, 1, uart.NONE, uart.LSB, 1024, 10, 0, 2000)
-- 遇到接收错误不抛弃缓存数据
uart.setup(1, 115200, 8, 1, uart.NONE, nil, 1024, nil, nil, nil, nil, 0)

```

---

## uart.write(id, data)

写串口

**参数**

|传入值类型|解释|
|-|-|
|int|串口id, uart0写0, uart1写1|
|string/zbuff|待写入的数据，如果是zbuff会从指针起始位置开始读|
|int|可选，要发送的数据长度，默认全发|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功的数据长度|

**例子**

```lua
-- 写入可见字符串
uart.write(1, "rdy\r\n")
-- 写入十六进制的数据串
uart.write(1, string.char(0x55,0xAA,0x4B,0x03,0x86))

```

---

## uart.read(id, len)

FIFO方式取出串口缓存的数据

**参数**

|传入值类型|解释|
|-|-|
|int|串口id, uart0写0, uart1写1|
|int|期望读取长度，可选，不填时读取全部，无论写多少，最多读取当前缓存区所有数据|
|file/zbuff|可选：文件句柄或zbuff对象|

**返回值**

|返回值类型|解释|
|-|-|
|string|读取到的数据 / 传入zbuff时，返回读到的长度，并把zbuff指针后移|

**例子**

```lua
uart.read(1, 16)

```

---

## uart.close(id)

关闭串口

**参数**

|传入值类型|解释|
|-|-|
|int|串口id, uart0写0, uart1写1|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
uart.close(1)

```

---

## uart.on(id, event, func)

注册串口事件回调

**参数**

|传入值类型|解释|
|-|-|
|int|串口id, uart0写0, uart1写1|
|string|事件名称，目前只有"receive"/"recv":新数据接收完成或者接收缓存满了,"sent":发送结束|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
uart.on(1, "receive", function(id, len)
    local data = uart.read(id, len)
    log.info("uart", id, len, data)
end)

```

---

## uart.wait485(id)

等待485模式下TX完成，mcu不支持串口发送移位寄存器空或者类似中断时才需要，在sent事件回调后使用

**参数**

|传入值类型|解释|
|-|-|
|int|串口id, uart0写0, uart1写1|

**返回值**

|返回值类型|解释|
|-|-|
|int|等待了多少次循环才等到tx完成，用于粗劣的观察delay时间是否足够，返回不为0说明还需要放大delay|

**例子**

无

---

## uart.exist(id)

检查串口号是否存在

**参数**

|传入值类型|解释|
|-|-|
|int|串口id, uart0写0, uart1写1, 如此类推|

**返回值**

|返回值类型|解释|
|-|-|
|bool|存在返回true|

**例子**

无

---

## uart.rx(id, buff)

buff形式读串口，一次读出全部数据存入buff中，如果buff空间不够会自动扩展，目前air105,Air780EXXX支持这个操作

**参数**

|传入值类型|解释|
|-|-|
|int|串口id, uart0写0, uart1写1|
|zbuff|zbuff对象|

**返回值**

|返回值类型|解释|
|-|-|
|int|返回读到的长度，并把zbuff指针后移|

**例子**

```lua
uart.rx(1, buff)

```

---

## uart.rxSize(id)

读串口Rx缓存中剩余数据量，目前air105,Air780EXXX支持这个操作

**参数**

|传入值类型|解释|
|-|-|
|int|串口id, uart0写0, uart1写1|

**返回值**

|返回值类型|解释|
|-|-|
|int|返回读到的长度|

**例子**

```lua
local size = uart.rxSize(1)

```

---

## uart.rxClear(id)

清除串口Rx缓存中剩余数据量，目前air105,Air780EXXX支持这个操作

**参数**

|传入值类型|解释|
|-|-|
|int|串口id, uart0写0, uart1写1|

**返回值**

无

**例子**

```lua
uart.rxClear(1)

```

---

## uart.tx(id, buff, start, len)

buff形式写串口,等同于c语言uart_tx(uart_id, &buff[start], len);

**参数**

|传入值类型|解释|
|-|-|
|int|串口id, uart0写0, uart1写1|
|zbuff|待写入的数据，如果是zbuff会从指针起始位置开始读|
|int|可选，要发送的数据起始位置，默认为0|
|int|可选，要发送的数据长度，默认为zbuff内有效数据，最大值不超过zbuff的最大空间|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功的数据长度|

**例子**

```lua
uart.tx(1, buf)

```

---

## uart.createSoft(tx_pin, tx_hwtimer_id, rx_pin, rx_hwtimer_id, adjust_period)

设置软件uart的硬件配置，只有支持硬件定时器的SOC才能使用，目前只能设置一个，波特率根据平台的软硬件配置有不同的极限，建议9600，接收缓存不超过65535，不支持MSB，支持485自动控制。后续仍要setup操作

**参数**

|传入值类型|解释|
|-|-|
|int|发送引脚编号|
|int|发送用的硬件定时器ID|
|int|接收引脚编号|
|int|接收用的硬件定时器ID|
|int|发送时序调整，单位是定时器时钟周期，默认是0，需要根据示波器或者逻辑分析仪进行微调|
|int|接收时序调整，单位是定时器时钟周期，默认是0，需要根据示波器或者逻辑分析仪进行微调|

**返回值**

|返回值类型|解释|
|-|-|
|int|软件uart的id，如果失败则返回nil|

**例子**

```lua
-- 初始化软件uart
local uart_id = uart.createSoft(21, 0, 1, 2) --air780e建议用定时器0和2，tx_pin最好用AGPIO，防止休眠时误触发对端RX

```

---

## uart.list(max)

获取可用串口号列表，当前仅限win32

**参数**

|传入值类型|解释|
|-|-|
|int|可选，默认256，最多获取多少个串口|

**返回值**

|返回值类型|解释|
|-|-|
|table|获取到的可用串口号列表|

**例子**

无

---

