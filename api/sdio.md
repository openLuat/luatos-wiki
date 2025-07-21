# sdio - sdio

**示例**

```lua
-- 本sdio库挂载tf卡到文件系统功能已经被fatfs的sdio模式取代
-- 本sdio库仅保留直接读写TF卡的函数
-- 例如 使用 sdio 0 挂载TF卡
fatfs.mount(fatfs.SDIO, "/sd", 0)

-- 挂载完成后, 使用 io 库的相关函数来操作就行
local f = io.open("/sd/abc.txt")

```

## sdio.init(id)

初始化sdio

**参数**

|传入值类型|解释|
|-|-|
|int|通道id,与具体设备有关,通常从0开始,默认0|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|打开结果|

**例子**

无

---

## sdio.sd_read(id, offset, len)

直接读写sd卡上的数据

**参数**

|传入值类型|解释|
|-|-|
|int|sdio总线id|
|int|偏移量,必须是512的倍数|
|int|长度,必须是512的倍数|

**返回值**

|返回值类型|解释|
|-|-|
|string|若读取成功,返回字符串,否则返回nil|

**例子**

```lua
-- 初始化sdio并直接读取sd卡数据
sdio.init(0)
local t = sdio.sd_read(0, 0, 1024)
if t then
    --- xxx
end

```

---

## sdio.sd_write(id, data, offset)

直接写sd卡

**参数**

|传入值类型|解释|
|-|-|
|int|sdio总线id|
|string|待写入的数据,长度必须是512的倍数|
|int|偏移量,必须是512的倍数|

**返回值**

|返回值类型|解释|
|-|-|
|bool|若读取成功,返回true,否则返回false|

**例子**

```lua
-- 初始化sdio并直接读取sd卡数据
sdio.init(0)
local t = sdio.sd_write(0, data, 0)
if t then
    --- xxx
end

```

---

