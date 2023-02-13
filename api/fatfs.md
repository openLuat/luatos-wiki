# fatfs - 读写fatfs格式

{bdg-success}`已适配` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`Air780`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/fatfs/luat_lib_fatfs.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看fatfs的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/fatfs)
```

**示例**

```lua
-- 通常只使用fatfs.mount挂载tf/sd卡,其他操作走io库就可以了

```

## fatfs.mount(mode,mount_point, spiid_or_spidevice, spi_cs, spi_speed)



挂载fatfs

**参数**

|传入值类型|解释|
|-|-|
|int|fatfs模式,可选fatfs.SPI,fatfs.SDIO,fatfs.RAM,fatfs.USB|
|string|fatfs挂载点, 通常填""或者"SD", 底层会映射到vfs的 /sd 路径|
|int|传入spi device指针,或者spi的id,或者sdio的id|
|int|片选脚的GPIO 号, spi模式有效,若前一个参数传的是spi device,这个参数就不需要传|
|int|SPI最高速度,默认10M, 若前2个参数传的是spi device,这个参数就不需要传|

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
        spiId,--串口id
        255, -- 不使用默认CS脚
        0,--CPHA
        0,--CPOL
        8,--数据宽度
        400*1000  -- 初始化时使用较低的频率
    )
    local TF_CS = pin.PB3
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

