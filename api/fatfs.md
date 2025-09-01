# fatfs - 读写fatfs格式

**示例**

```lua
-- 通常只使用fatfs.mount挂载tf/sd卡,其他操作走io库就可以了

```

## fatfs.mount(mode,mount_point, spiid_or_spidevice, spi_cs, spi_speed, power_pin, power_on_delay, auto_format)

挂载fatfs

**参数**

|传入值类型|解释|
|-|-|
|int|fatfs模式,可选fatfs.SPI,fatfs.SDIO,fatfs.RAM,fatfs.USB|
|string|虚拟文件系统的挂载点, 默认是 /fatfs|
|int|传入spi device指针,或者spi的id,或者sdio的id|
|int|片选脚的GPIO 号, spi模式有效,若前一个参数传的是spi device,这个参数就不需要传|
|int|SPI最高速度,默认10M, 若前2个参数传的是spi device,这个参数就不需要传|
|int|TF卡电源控制脚,TF卡初始前先拉低复位再拉高,如果没有,或者是内置电源控制方式,这个参数就不需要传|
|int|TF卡电源复位过程时间,单位ms,默认值是1|
|bool|挂载失败是否尝试格式化,默认是true,即自动格式化. 本参数在2023.8.16添加|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true, 否则返回nil或者false|
|string|失败的原因|

**例子**

```lua
-- 方法1, 使用SPI模式
    local spiId = 2
    local result = spi.setup(
        spiId,--spi id
        255, -- 不使用默认CS脚
        0,--CPHA
        0,--CPOL
        8,--数据宽度
        400*1000  -- 初始化时使用较低的频率
    )
    local TF_CS = 8
    gpio.setup(TF_CS, 1)
    --fatfs.debug(1) -- 若挂载失败,可以尝试打开调试信息,查找原因
    -- 提醒, 若TF/SD模块带电平转换, 通常不支持10M以上的波特率!!
    fatfs.mount(fatfs.SPI,"SD", spiId, TF_CS, 24000000)
    local data, err = fatfs.getfree("SD")
    if data then
        log.info("fatfs", "getfree", json.encode(data))
    else
        log.info("fatfs", "err", err)
    end
    -- 往下的操作, 使用 io.open("/sd/xxx", "w+") 等io库的API就可以了

```

---

## fatfs.unmount(mount_point)

取消挂载fatfs

**参数**

|传入值类型|解释|
|-|-|
|string|虚拟文件系统的挂载点, 默认是 fatfs,必须与fatfs.mount一致|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功返回0, 否则返回失败码|

**例子**

```lua
fatfs.mount("SD")

```

---

## fatfs.getfree(mount_point)

获取可用空间信息

**参数**

|传入值类型|解释|
|-|-|
|string|挂载点, 需要跟fatfs.mount传入的值一致|

**返回值**

|返回值类型|解释|
|-|-|
|table|若成功会返回table,否则返回nil|
|int|导致失败的底层返回值|

**例子**

```lua
-- table包含的内容有
-- total_sectors 总扇区数量
-- free_sectors 空闲扇区数量
-- total_kb 总字节数,单位kb
-- free_kb 空闲字节数, 单位kb
-- 注意,当前扇区大小固定在512字节

    local data, err = fatfs.getfree("SD")
    if data then
        log.info("fatfs", "getfree", json.encode(data))
    else
        log.info("fatfs", "err", err)
    end

```

---

## fatfs.debug(value)

设置调试模式

**参数**

|传入值类型|解释|
|-|-|
|int|是否进入调试模式,1代表进入调试模式,增加调试日志|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## fatfs.config(crc_check, write_to)

设置fatfs一些特殊参数，大部分卡无需配置，部分不能正常读写的卡，经过配置后可能能读写成功

**参数**

|传入值类型|解释|
|-|-|
|int|读取时是否跳过CRC检查,1跳过不检查CRC,0不跳过检查CRC,默认不跳过,除非TF卡不支持CRC校验,否则不应该跳过!|
|int|单次写入超时时间,单位ms,默认100ms。|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

