# spi - spi操作库

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_spi.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

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

## spi.transfer(id, send_data[, len])

传输SPI数据

**参数**

|传入值类型|解释|
|-|-|
|int|SPI号,例如0|
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
|int|可选。待发送数据的长度，默认为data长度|

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

