# little_flash - flash驱动 软件包(同时支持驱动nor flash和nand flash设备)

## lf.init(spi_device)

初始化 little_flash

**参数**

|传入值类型|解释|
|-|-|
|userdata|spi_device|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|成功返回一个数据结构,否则返回nil|

**例子**

```lua
--spi_device
spi_device = spi.deviceSetup(0,17,0,0,8,2000000,spi.MSB,1,0)
log.info("lf.init",lf.init(spi_device))

```

---

## lf.erase(flash,add,size)

擦除 Flash 指定地址指定大小，按照flash block大小进行擦除

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 lf.init()返回的数据结构|
|number|add 擦除地址|
|number|size 擦除大小|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true|

**例子**

```lua
lf.erase(flash,add,size)

```

---

## lf.chipErase(flash)

擦除 Flash 全部数据

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 lf.init()返回的数据结构|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true|

**例子**

```lua
lf.chipErase(flash)

```

---

## lf.read(flash, addr, size)

读取 Flash 数据

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 lf.init()返回的数据结构|
|int|addr 起始地址|
|int|size 从起始地址开始读取数据的总大小|

**返回值**

|返回值类型|解释|
|-|-|
|string|data 读取到的数据|

**例子**

```lua
log.info("lf.read",lf.read(lf_device,1024,4))

```

---

## lf.write(flash, addr,data)

向 Flash 写数据

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 lf.init()返回的数据结构|
|int|addr 起始地址|
|string|data 待写入的数据|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true|

**例子**

```lua
log.info("lf.write",lf.write(lf_device,1024,"lf"))

```

---

## lf.eraseWrite(flash, addr,data)

先擦除再往 Flash 写数据

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 lf.init()返回的数据结构|
|int|addr 起始地址|
|string|data 待写入的数据|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true|

**例子**

```lua
log.info("lf.eraseWrite",lf.eraseWrite(lf_device,1024,"lf"))

```

---

## lf.getInfo(flash)

获取 Flash 容量和page大小

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 lf.init()返回的数据结构|

**返回值**

|返回值类型|解释|
|-|-|
|int|Flash 容量|
|int|page 页大小|

**例子**

```lua
log.info("lf.getInfo",lf.getInfo(lf_device))

```

---

## lf.mount(flash, mount_point, offset, maxsize)

挂载 little_flash lfs文件系统

**参数**

|传入值类型|解释|
|-|-|
|userdata|flash Flash 设备对象 lf.init()返回的数据结构|
|string|mount_point 挂载目录名|
|int|起始偏移量,默认0|
|int|总大小, 默认是整个flash|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true|

**例子**

```lua
log.info("lf.mount",lf.mount(little_flash_device,"/little_flash"))

```

---

