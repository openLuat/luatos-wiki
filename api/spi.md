# spi - spi操作库

{bdg-success}`已适配` {bdg-primary}`Air780E/Air700E` {bdg-primary}`Air780EP` {bdg-primary}`Air601` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_spi.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看spi的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/spi)
```
```{tip}
本库还有视频教程，[点此链接查看](https://www.bilibili.com/video/BV1VY411M7YH)
```

## 常量

|常量|类型|解释|
|-|-|-|
|spi.MSB|number|大端模式|
|spi.LSB|number|小端模式|
|spi.master|number|主机模式|
|spi.slave|number|从机模式|
|spi.full|number|全双工|
|spi.half|number|半双工|
|spi.SPI_0|number|SPI0|
|spi.SPI_1|number|SPI1|
|spi.SPI_2|number|SPI2|
|spi.SPI_3|number|SPI3|
|spi.SPI_4|number|SPI4|
|spi.HSPI_0|number|高速SPI0，目前105专用|


## spi.setup(id, cs, CPHA, CPOL, dataw, bandrate, bitdict, ms, mode)



设置并启用SPI

**参数**

|传入值类型|解释|
|-|-|
|int|SPI号,例如0|
|int|CS 片选脚,在w600不可用请填nil|
|int|CPHA 默认0,可选0/1|
|int|CPOL 默认0,可选0/1|
|int|数据宽度,默认8bit|
|int|波特率,默认2M=2000000|
|int|大小端, 默认spi.MSB, 可选spi.LSB|
|int|主从设置, 默认主1, 可选从机0. 通常只支持主机模式|
|int|工作模式, 全双工1, 半双工0, 默认全双工|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功返回0,否则返回其他值|

**例子**

```lua
-- 初始化spi
spi.setup(0,20,0,0,8,2000000,spi.MSB,1,1)

```

---

## spi.createSoft(cs, mosi, miso, clk, CPHA, CPOL, dataw, bitdict, ms, mode)



设置并启用软件SPI

**参数**

|传入值类型|解释|
|-|-|
|int|cs引脚编号，传入nil意为Lua控制cs脚|
|int|mosi引脚编号|
|int|miso引脚编号|
|int|clk引脚编号|
|int|默认0，可选0/1|
|int|默认0，可选0/1|
|int|数据宽度，默认8bit|
|int|大小端，默认spi.MSB, 可选spi.LSB|
|int|主从设置，默认主1, 可选从机0. 通常只支持主机模式|
|int|工作模式，全双工1，半双工0，默认半双工|

**返回值**

|返回值类型|解释|
|-|-|
|软件SPI对象|可当作SPI的id使用|

**例子**

```lua
-- 初始化软件spi
local softSpiDevice = spi.createSoft(0, 1, 2, 3, 0, 0, 8, spi.MSB, 1, 1)
local result = spi.send(softSpiDevice, string.char(0x9f))

```

---

## spi.close(id)



关闭指定的SPI

**参数**

|传入值类型|解释|
|-|-|
|int|SPI号,例如0|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功返回0,否则返回其他值|

**例子**

```lua
-- 初始化spi
spi.close(0)

```

---

## spi.transfer(id, send_data, send_len, recv_len)



传输SPI数据

**参数**

|传入值类型|解释|
|-|-|
|int|SPI号(例如0)或软件SPI对象|
|string/zbuff|待发送的数据，如果为zbuff数据，则会从对象所处的指针处开始读|
|int|可选。待发送数据的长度，默认为data长度|
|int|可选。读取数据的长度，默认为1|

**返回值**

|返回值类型|解释|
|-|-|
|string|读取成功返回字符串,否则返回nil|

**例子**

```lua
-- 初始化spi
spi.setup(0,nil,0,0,8,2000000,spi.MSB,1,1)
local recv = spi.transfer(0, "123")--发送123,并读取数据

local buff = zbuff.create(1024, 0x33) --创建一个初值全为0x33的内存区域
local recv = spi.transfer(0, buff)--把zbuff数据从指针开始，全发出去,并读取数据

```

---

## spi.recv(id, size)



接收指定长度的SPI数据

**参数**

|传入值类型|解释|
|-|-|
|int|SPI号,例如0|
|int|数据长度|

**返回值**

|返回值类型|解释|
|-|-|
|string|读取成功返回字符串,否则返回nil|

**例子**

```lua
-- 初始化spi
spi.setup(0,nil,0,0,8,2000000,spi.MSB,1,1)
local recv = spi.recv(0, 4)--接收4字节数据

```

---

## spi.send(id, data[, len])



发送SPI数据

**参数**

|传入值类型|解释|
|-|-|
|int|SPI号,例如0|
|string/zbuff|待发送的数据，如果为zbuff数据，则会从对象所处的指针处开始读|
|int|可选。待发送数据的长度，默认为data长度|

**返回值**

|返回值类型|解释|
|-|-|
|int|发送结果|

**例子**

```lua
-- 初始化spi
spi.setup(0,nil,0,0,8,2000000,spi.MSB,1,1)
local result = spi.send(0, "123")--发送123

local buff = zbuff.create(1024, 0x33) --创建一个初值全为0x33的内存区域
local result = spi.send(0, buff)--把zbuff数据从指针开始，全发出去

```

---

## spi.deviceSetup(id, cs, CPHA, CPOL, dataw, bandrate, bitdict, ms, mode)



设置并启用SPI(对象方式)

**参数**

|传入值类型|解释|
|-|-|
|int|SPI号,例如0|
|int|CS 片选脚,在w600不可用请填nil|
|int|CPHA 默认0,可选0/1|
|int|CPOL 默认0,可选0/1|
|int|数据宽度,默认8bit|
|int|波特率,默认20M=20000000|
|int|大小端, 默认spi.MSB, 可选spi.LSB|
|int|主从设置, 默认主1, 可选从机0. 通常只支持主机模式|
|int|工作模式, 全双工1, 半双工0, 默认全双工|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|spi_device|

**例子**

```lua
-- 初始化spi
local spi_device = spi.deviceSetup(0,17,0,0,8,2000000,spi.MSB,1,1)

```

---

## spi_device:close()



关闭指定的SPI(对象方式)

**参数**

|传入值类型|解释|
|-|-|
|userdata|spi_device|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功返回0,否则返回其他值|

**例子**

```lua
-- 初始化spi
spi_device.close()

```

---

## spi_device:transfer(send_data[, len])



传输SPI数据(对象方式)

**参数**

|传入值类型|解释|
|-|-|
|userdata|spi_device|
|string/zbuff|待发送的数据，如果为zbuff数据，则会从对象所处的指针处开始读|
|int|可选。待发送数据的长度，默认为data长度|
|int|可选。读取数据的长度，默认为1|

**返回值**

|返回值类型|解释|
|-|-|
|string|读取成功返回字符串,否则返回nil|

**例子**

```lua
-- 初始化spi
local spi_device = spi.device_setup(0,17,0,0,8,2000000,spi.MSB,1,1)
local recv = spi_device:transfer("123")--发送123,并读取数据

local buff = zbuff.create(1024, 0x33) --创建一个初值全为0x33的内存区域
local recv = spi_device:transfer(buff)--把zbuff数据从指针开始，全发出去,并读取数据

```

---

## spi_device:send(data[, len])



发送SPI数据(对象方式)

**参数**

|传入值类型|解释|
|-|-|
|userdata|spi_device|
|string/zbuff|待发送的数据，如果为zbuff数据，则会从对象所处的指针处开始读|

**返回值**

|返回值类型|解释|
|-|-|
|int|发送结果|

**例子**

```lua
-- 初始化spi
local spi_device = spi.device_setup(0,17,0,0,8,2000000,spi.MSB,1,1)
local result = spi_device:send("123")--发送123

local buff = zbuff.create(1024, 0x33) --创建一个初值全为0x33的内存区域
local result = spi_device:send(buff)--把zbuff数据从指针开始，全发出去

```

---

## spi_device:recv(size)



接收指定长度的SPI数据(对象方式)

**参数**

|传入值类型|解释|
|-|-|
|userdata|spi_device|
|int|数据长度|

**返回值**

|返回值类型|解释|
|-|-|
|string|读取成功返回字符串,否则返回nil|

**例子**

```lua
-- 初始化spi
local spi_device = spi.device_setup(0,17,0,0,8,2000000,spi.MSB,1,1)
local recv = spi_device:recv(4)--接收4字节数据

```

---

## spi.xfer(id, txbuff, rxbuff, rx_len, transfer_done_topic)



非阻塞方式硬件SPI传输SPI数据，目的为了提高核心利用率。API直接返回是否启动传输，传输完成后通过topic回调，本API适合硬件SPI传输大量数据传输，外设功能（LCD SPI，W5500 SPI之类的）占据的SPI和软件SPI不能用，少量数据传输建议使用传统阻塞型API

**参数**

|传入值类型|解释|
|-|-|
|userdata|or int spi_device或者spi_id，注意，如果是spi_device，需要手动在传输完成后拉高cs!!!!!!|
|zbuff|待发送的数据，如果为nil，则只接收数据，由于用的非阻塞模型，为保证动态数据的有效性，只能使用zbuff，发送的数据从zbuff.addr|
|zbuff|接收数据，如果为nil，则只发送数据，由于用的非阻塞模型，为保证动态数据的有效性，只能使用zbuff，接收的数据从zbuff.addr开始存储|
|int|传输数据长度，特别说明 如果为半双工，先发后收，比如spi flash操作这种，则长度=发送字节+接收字节，注意上面发送和接收buff都要留足够的数据，后续接收数据处理需要跳过发送数据长度字节|
|string|传输完成后回调的topic|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true/false 本次传输是否正确启动，true，启动，false，有错误无法启动。传输完成会发布消息transfer_done_topic和boolean型结果|

**例子**

```lua
local result = spi.xfer(spi.SPI_0, txbuff, rxbuff, 1024, "SPIDONE") if result then result, spi_id, succ, error_code = sys.waitUntil("SPIDONE") end if not result or not succ then log.info("spi fail, error code", error_code) else log.info("spi ok") end


```

---

