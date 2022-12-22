# sdio - sdio

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_sdio.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
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

## sdio.sd_mount(id, path, auto_format)

挂载SD卡, 使用FATFS文件系统

**参数**

|传入值类型|解释|
|-|-|
|int|sdio总线id|
|string|挂载路径, 默认"/sd", 不允许以"/"结尾|
|bool|是否自动格式化,默认是true|

**返回值**

|返回值类型|解释|
|-|-|
|bool|挂载成功返回true,否则返回false|
|int|底层返回的具体结果码,用于调试|

**例子**

无

---

## sdio.sd_umount(id, path)

卸载SD卡(视硬件情况, 不一定支持)

**参数**

|传入值类型|解释|
|-|-|
|int|sdio总线id|
|string|挂载路径, 默认"/sd", 不允许以"/"结尾|

**返回值**

|返回值类型|解释|
|-|-|
|bool|挂载成功返回true,否则返回false|

**例子**

无

---

## sdio.sd_format(id)

格式化SD卡

**参数**

|传入值类型|解释|
|-|-|
|int|sdio总线id|

**返回值**

|返回值类型|解释|
|-|-|
|bool|挂载成功返回true,否则返回false|

**例子**

无

---

