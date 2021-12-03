# i2c - I2C操作

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_i2c.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## i2c.exist(id)

i2c编号是否存在

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|

**返回值**

|返回值类型|解释|
|-|-|
|int|存在就返回1,否则返回0|

**例子**

```lua
-- 检查i2c1是否存在
if i2c.exist(1) then
    log.info("存在 i2c1")
end

```

---

## i2c.setup(id, speed, slaveAddr)

i2c初始化

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|
|int|I2C速度, 例如i2c.FAST|
|int|从设备地址（7位）, 例如0x38|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功就返回1,否则返回0|

**例子**

```lua
-- 初始化i2c1
if i2c.setup(1, i2c.FAST, 0x38) == 1 then
    log.info("存在 i2c1")
else
    i2c.close(1) -- 关掉
end

```

---

## i2c.createSoft(scl,sda,slaveAddr)

新建一个软件i2c对象

**参数**

|传入值类型|解释|
|-|-|
|int|i2c SCL引脚编号|
|int|i2c SDA引脚编号|
|int|从设备地址（7位）, 例如0x38|

**返回值**

|返回值类型|解释|
|-|-|
|软件I2C对象|可当作i2c的id使用|

**例子**

```lua
-- 注意！这个接口是软件模拟i2c，速度可能会比硬件的慢
-- 不需要调用i2c.close接口
-- 初始化软件i2c
local softI2C = i2c.createSoft(1,2,0x38)
i2c.send(softI2C, 0x5C, string.char(0x0F, 0x2F))

```

---

## i2c.send(id, addr, data)

i2c发送数据

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|
|int|I2C子设备的地址, 7位地址|
|integer/string/table|待发送的数据,自适应参数类型|

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

## i2c.writeReg(id, addr, reg, data)

i2c写寄存器数据

**参数**

|传入值类型|解释|
|-|-|
|int|设备id, 例如i2c1的id为1, i2c2的id为2|
|int|I2C子设备的地址, 7位地址|
|int|寄存器地址|
|string|待发送的数据|

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

