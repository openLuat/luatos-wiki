# i2c - I2C操作

## 常量

|常量|类型|解释|
|-|-|-|
|i2c.FAST|number|高速|
|i2c.SLOW|number|低速|


## i2c.exist(id)

i2c编号是否存在

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|

**返回值**

|返回值类型|解释|
|-|-|
|bool|存在就返回true,否则返回false|

**例子**

```lua
-- 检查i2c1是否存在
if i2c.exist(1) then
    log.info("存在 i2c1")
end

```

---

## i2c.setup(id, speed, pullup)

i2c初始化

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|
|int|I2C速度, 例如i2c.FAST|
|bool|是否使用轮询模式，true是，false不是。默认状态具体平台决定，除非使用中有问题，否则留空！！！|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功就返回1,否则返回0|

**例子**

```lua
-- 初始化i2c1
i2c.setup(1, i2c.FAST) -- id正确就一定成功
-- 如需判断i2c id是否合法, 请使用 i2c.exist 函数

```

---

## i2c.createSoft(scl,sda,delay)

新建一个软件i2c对象

**参数**

|传入值类型|解释|
|-|-|
|int|i2c SCL引脚编号(GPIO编号)|
|int|i2c SDA引脚编号(GPIO编号)|
|int|每个操作的延时, 单位us, 默认5|

**返回值**

|返回值类型|解释|
|-|-|
|软件I2C对象|可当作i2c的id使用|

**例子**

```lua
-- 注意！这个接口是软件模拟i2c，速度可能会比硬件的慢
-- 不需要调用i2c.close接口
-- 初始化软件i2c
local softI2C = i2c.createSoft(1, 2, 5)
i2c.send(softI2C, 0x5C, string.char(0x0F, 0x2F))
-- 注意, 第3个参数是 2023.06.19 添加的delay
-- 通过调整delay参数的值, 可增加或降低I2C的速度

```

---

## i2c.send(id, addr, data,stop)

i2c发送数据

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|
|int|I2C子设备的地址, 7位地址|
|integer/string/table|待发送的数据,自适应参数类型|
|integer|可选参数 是否发送停止位 1发送 0不发送 默认发送(105不支持)|

**返回值**

|返回值类型|解释|
|-|-|
|true/false|发送是否成功|

**例子**

```lua
-- 往i2c0发送1个字节的数据
i2c.send(0, 0x68, 0x75)
-- 往i2c1发送2个字节的数据
i2c.send(1, 0x5C, string.char(0x0F, 0x2F))
i2c.send(1, 0x5C, {0x0F, 0x2F})

```

---

## i2c.recv(id, addr, len)

i2c接收数据

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|
|int|I2C子设备的地址, 7位地址|
|int|接收数据的长度|

**返回值**

|返回值类型|解释|
|-|-|
|string|收到的数据|

**例子**

```lua
-- 从i2c1读取2个字节的数据
local data = i2c.recv(1, 0x5C, 2)

```

---

## i2c.writeReg(id, addr, reg, data,stop)

i2c写寄存器数据

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|
|int|I2C子设备的地址, 7位地址|
|int|寄存器地址|
|string|待发送的数据|
|integer|可选参数 是否发送停止位 1发送 0不发送 默认发送(105不支持)|

**返回值**

|返回值类型|解释|
|-|-|
|true/false|发送是否成功|

**例子**

```lua
-- 从i2c1的地址为0x5C的设备的寄存器0x01写入2个字节的数据
i2c.writeReg(1, 0x5C, 0x01, string.char(0x00, 0xF2))

```

---

## i2c.readReg(id, addr, reg, len)

i2c读寄存器数据

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|
|int|I2C子设备的地址, 7位地址|
|int|寄存器地址|
|int|待接收的数据长度|
|integer|可选参数 是否发送停止位 1发送 0不发送 默认发送(105不支持)|

**返回值**

|返回值类型|解释|
|-|-|
|string|收到的数据|

**例子**

```lua
-- 从i2c1的地址为0x5C的设备的寄存器0x01读出2个字节的数据
i2c.readReg(1, 0x5C, 0x01, 2)

```

---

## i2c.close(id)

关闭i2c设备

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 关闭i2c1
i2c.close(1)

```

---

## i2c.readDHT12(id)

从i2c总线读取DHT12的温湿度数据

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|
|int|DHT12的设备地址,默认0x5C|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|读取成功返回true,否则返回false|
|int|湿度值,单位0.1%, 例如 591 代表 59.1%|
|int|温度值,单位0.1摄氏度, 例如 292 代表 29.2摄氏度|

**例子**

```lua
-- 从i2c0读取DHT12
i2c.setup(0)
local re, H, T = i2c.readDHT12(0)
if re then
    log.info("dht12", H, T)
end

```

---

## i2c.readSHT30(id,addr)

从i2c总线读取DHT30的温湿度数据(由"好奇星"贡献)

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|
|int|设备addr,SHT30的设备地址,默认0x44 bit7|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|读取成功返回true,否则返回false|
|int|湿度值,单位0.1%, 例如 591 代表 59.1%|
|int|温度值,单位0.1摄氏度, 例如 292 代表 29.2摄氏度|

**例子**

```lua
-- 从i2c0读取SHT30
i2c.setup(0)
local re, H, T = i2c.readSHT30(0)
if re then
    log.info("sht30", H, T)
end

```

---

## i2c.transfer(id, addr, txBuff, rxBuff, rxLen)

i2c通用传输，包括发送N字节，发送N字节+接收N字节，接收N字节三种功能，在发送转接收过程中发送reStart信号,解决类似mlx90614必须带restart信号，但是又不能用i2c.send来控制的，比如air105

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|
|int|I2C子设备的地址, 7位地址|
|integer/string/zbuff|待发送的数据,自适应参数类型，如果为nil，则不发送数据|
|zbuff|待接收数据的zbuff 如果不用zbuff，则接收数据将在return返回|
|int|需要接收的数据长度，如果为0或nil，则不接收数据|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true/false 发送是否成功|
|string|or nil 如果参数5是interger，则返回接收到的数据|

**例子**

```lua
local result, _ = i2c.transfer(0, 0x11, txbuff, rxbuff, 1)
local result, _ = i2c.transfer(0, 0x11, txbuff, nil, 0)    --只发送txbuff里的数据，不接收数据，典型应用就是写寄存器了，这里寄存器地址和值都放在了txbuff里
local result, _ = i2c.transfer(0, 0x11, "\x01\x02\x03", nil, 1) --发送0x01， 0x02，0x03，不接收数据，如果是eeprom，就是往0x01的地址写02和03，或者往0x0102的地址写03，看具体芯片了
local result, rxdata = i2c.transfer(0, 0x11, "\x01\x02", nil, 1) --发送0x01， 0x02，然后接收1个字节，典型应用就是eeprom
local result, rxdata = i2c.transfer(0, 0x11, 0x00, nil, 1) --发送0x00，然后接收1个字节，典型应用各种传感器

```

---

## i2c.xfer(id, addr, txBuff, rxBuff, rxLen, transfer_done_topic, timeout)

i2c非阻塞通用传输，类似transfer，但是不会等到I2C传输完成才返回，调用本函数会立刻返回，I2C传输完成后，通过消息回调

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|
|int|I2C子设备的地址, 7位地址|
|zbuff|待发送的数据，由于用的非阻塞模型，为保证动态数据的有效性，只能使用zbuff，发送的数据从zbuff.addr开始，长度为zbuff.used|
|zbuff|待接收数据的zbuff，如果为nil，则忽略后面参数， 不接收数据。接收的数据会放在zbuff.addr开始的位置，会覆盖掉之前的数据，注意zhuff的预留空间要足够|
|int|需要接收的数据长度，如果为0或nil，则不接收数据|
|string|传输完成后回调的消息|
|int|超时时间，如果填nil，则为100ms|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true/false 本次传输是否正确启动，true，启动，false，有错误无法启动。传输完成会发布消息transfer_done_topic和boolean型结果|

**例子**

```lua
local result = i2c.xfer(0, 0x11, txbuff, rxbuff, 1, "I2CDONE") if result then result, i2c_id, succ, error_code = sys.waitUntil("I2CDONE") end if not result or not succ then log.info("i2c fail, error code", error_code) else log.info("i2c ok") end


```

---

## i2c.scan(id,speed)

扫描i2c设备

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|
|int|速度, 可选i2c.SLOW i2c.FAST i2c.PLUS i2c.HSMODE 默认为i2c.SLOW,如探测不到则修改此项|

**返回值**

|返回值类型|解释|
|-|-|
|nil|当前无返回值|

**例子**

```lua
-- 本函数于2023.07.04添加
-- 这个函数的主要目标是为了在开发期扫描i2c设备
-- 有些BSP在指定addr无响应时会输出日志,导致输出会被打乱
i2c.scan()

```

---

