# uart - 串口操作库

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_uart.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## uart.setup(id, baud_rate, data_bits, stop_bits, partiy, bit_order, buff_size)

配置串口参数

**参数**

|传入值类型|解释|
|-|-|
|int|串口id, uart0写0, uart1写1, 如此类推, 最大值取决于设备|
|int|波特率, 默认115200|
|int|数据位，默认为8|
|int|停止位，默认为1|
|int|校验位，可选 uart.None/uart.Even/uart.Odd|
|int|大小端，默认小端 uart.LSB, 可选 uart.MSB|
|int|缓冲区大小，默认值1024|
|int|485模式下的转换GPIO, 默认值0xffffffff|
|int|485模式下的rx方向GPIO的电平, 默认值0|
|int|485模式下tx向rx转换的延迟时间，默认值12bit的时间，单位us|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功返回0,失败返回其他值|

**例子**

```lua
-- 最常用115200 8N1
uart.setup(1, 115200, 8, 1, uart.NONE)
-- 可以简写为 uart.setup(1)

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
uart.write(1, "rdy\r\n")

```

---

## uart.read(id, len)

读串口

**参数**

|传入值类型|解释|
|-|-|
|int|串口id, uart0写0, uart1写1|
|int|读取长度|
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
|string|事件名称|
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

