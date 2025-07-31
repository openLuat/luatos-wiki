# sfud - flash驱动 软件包(支持驱动nor flash设备)

## sfud.init(spi_id, spi_cs, spi_bandrate)/sfud.init(spi_device)

初始化sfud

**参数**

|传入值类型|解释|
|-|-|
|int|spi_id SPI的ID/userdata spi_device|
|int|spi_cs SPI的片选|
|int|spi_bandrate SPI的频率|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
--spi
log.info("sfud.init",sfud.init(0,20,20 * 1000 * 1000))
--spi_device
local spi_device = spi.deviceSetup(0,17,0,0,8,2000000,spi.MSB,1,0)
log.info("sfud.init",sfud.init(spi_device))

```

---

## sfud.getDeviceNum()

获取flash设备信息表中的设备总数

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|返回设备总数|

**例子**

```lua
log.info("sfud.getDeviceNum",sfud.getDeviceNum())

```

---

## sfud.getDevice(index)

通过flash信息表中的索引获取flash设备

**参数**

|传入值类型|解释|
|-|-|
|int|index flash信息表中的索引|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|成功返回一个数据结构,否则返回nil|

**例子**

```lua
local sfud_device = sfud.getDevice(1)

```

---

## sfud.getDeviceTable()

获取flash设备信息表

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|userdata|成功返回一个数据结构,否则返回nil|

**例子**

```lua
local sfud_device = sfud.getDeviceTable()

```

---

## sfud.chipErase(flash)

擦除 Flash 全部数据

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 sfud.get_device_table()返回的数据结构|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功返回0|

**例子**

```lua
sfud.chipErase(flash)

```

---

## sfud.erase(flash,add,size)

擦除 Flash 指定地址指定大小，按照flash block大小进行擦除

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 sfud.get_device_table()返回的数据结构|
|number|add 擦除地址|
|number|size 擦除大小|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功返回0|

**例子**

```lua
sfud.erase(flash,add,size)

```

---

## sfud.read(flash, addr, size)

读取 Flash 数据

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 sfud.get_device_table()返回的数据结构|
|int|addr 起始地址|
|int|size 从起始地址开始读取数据的总大小|

**返回值**

|返回值类型|解释|
|-|-|
|string|data 读取到的数据|

**例子**

```lua
log.info("sfud.read",sfud.read(sfud_device,1024,4))

```

---

## sfud.write(flash, addr,data)

向 Flash 写数据

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 sfud.get_device_table()返回的数据结构|
|int|addr 起始地址|
|string|data 待写入的数据|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功返回0|

**例子**

```lua
log.info("sfud.write",sfud.write(sfud_device,1024,"sfud"))

```

---

## sfud.eraseWrite(flash, addr,data)

先擦除再往 Flash 写数据

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 sfud.get_device_table()返回的数据结构|
|int|addr 起始地址|
|string|data 待写入的数据|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功返回0|

**例子**

```lua
log.info("sfud.eraseWrite",sfud.eraseWrite(sfud_device,1024,"sfud"))

```

---

## sfud.getInfo(flash)

获取 Flash 容量和page大小

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 sfud.get_device_table()返回的数据结构|

**返回值**

|返回值类型|解释|
|-|-|
|int|Flash 容量|
|int|page 页大小|

**例子**

```lua
log.info("sfud.getInfo",sfud.getInfo(sfud_device))

```

---

## sfud.mount(flash, mount_point, offset, maxsize)

挂载sfud lfs文件系统

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 sfud.get_device_table()返回的数据结构|
|string|mount_point 挂载目录名|
|int|起始偏移量,默认0|
|int|总大小, 默认是整个flash|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true|

**例子**

```lua
log.info("sfud.mount",sfud.mount(sfud_device,"/sfud"))
log.info("fsstat", fs.fsstat("/"))
log.info("fsstat", fs.fsstat("/sfud"))

```

---

