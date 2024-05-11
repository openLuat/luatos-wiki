# little_flash - LITTLE FLASH 软件包

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/little_flash/luat_lib_little_flash.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看little_flash的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/little_flash)
```

## lf.init(spi_device)



初始化 little_flash

**参数**

|传入值类型|解释|
|-|-|
|int|userdata spi_device|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|成功返回一个数据结构,否则返回nil|

**例子**

```lua
--spi_device
local spi_device = spi.deviceSetup(0,17,0,0,8,2000000,spi.MSB,1,0)
log.info("lf.init",lf.init(spi_device))

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

