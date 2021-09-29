# rtos - RTOS底层操作库

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_rtos.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## rtos.receive(timeout)   

接受并处理底层消息队列.

**参数**

|传入值类型|解释|
|-|-|
|int|超时时长,通常是-1,永久等待|

**返回值**

|返回值类型|解释|
|-|-|
|msgid|如果是定时器消息,会返回定时器消息id及附加信息, 其他消息由底层决定,不向lua层进行任何保证.|

**例子**

无

---

## rtos.timer_start(id,timeout,_repeat)   

启动一个定时器

**参数**

|传入值类型|解释|
|-|-|
|int|定时器id|
|int|超时时长,单位毫秒|
|int|重复次数,默认是0|

**返回值**

|返回值类型|解释|
|-|-|
|id|如果是定时器消息,会返回定时器消息id及附加信息, 其他消息由底层决定,不向lua层进行任何保证.|

**例子**

```lua
-- 用户代码请使用 sys.timerStart
-- 启动一个3秒的循环定时器
rtos.timer_start(10000, 3000, -1)

```

---

## rtos.timer_stop(id)   

关闭并释放一个定时器

**参数**

|传入值类型|解释|
|-|-|
|int|定时器id|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 用户代码请使用sys.timerStop
rtos.timer_stop(id)

```

---

## rtos.reboot()   

设备重启

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## rtos.buildDate()

获取固件编译日期

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|固件编译日期|

**例子**

```lua
-- 获取编译日期
local d = rtos.buildDate()

```

---

## rtos.bsp()

获取硬件bsp型号

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|硬件bsp型号|

**例子**

```lua
-- 获取硬件bsp型号
local bsp = rtos.bsp()

```

---

## rtos.version()        

获取固件版本号

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|固件版本号,例如"1.0.2"|

**例子**

```lua
-- 读取版本号
local luatos_version = rtos.version()

```

---

## rtos.standy(timeout)

进入待机模式(部分设备可用,例如w60x)

**参数**

|传入值类型|解释|
|-|-|
|int|休眠时长,单位毫秒     |

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 进入待机模式
rtos.standby(5000)

```

---

## rtos.meminfo(type)

获取内存信息

**参数**

|传入值类型|解释|
|-|-|
|type|"sys"系统内存, "lua"虚拟机内存, 默认为lua虚拟机内存     |

**返回值**

|返回值类型|解释|
|-|-|
|int|总内存大小,单位字节|
|int|当前使用的内存大小,单位字节|
|int|最大使用的内存大小,单位字节|

**例子**

```lua
-- 打印内存占用
log.info("mem.lua", rtos.meminfo())
log.info("mem.sys", rtos.meminfo("sys"))

```

---

## rtos.firmware()

返回底层描述信息,格式为 LuatOS_$VERSION_$BSP,可用于OTA升级判断底层信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|底层描述信息|

**例子**

```lua
-- 打印底层描述信息
log.info("firmware", rtos.firmware())

```

---

## rtos.setPaths(pathA, pathB, pathC, pathD)

设置自定义lua脚本搜索路径,优先级高于内置路径

**参数**

|传入值类型|解释|
|-|-|
|string|路径A, 例如 "/sdcard/%s.luac",若不传值,将默认为"",另外,最大长度不能超过23字节|
|string|路径B, 例如 "/sdcard/%s.lua"|
|string|路径C, 例如 "/lfs2/%s.luac"|
|string|路径D, 例如 "/lfs2/%s.lua"|

**返回值**

无

**例子**

```lua
-- 挂载sd卡或者spiflash后
rtos.setPaths("/sdcard/user/%s.luac", "/sdcard/user/%s.lua")
require("sd_user_main") -- 将搜索并加载 /sdcard/user/sd_user_main.luac 和 /sdcard/user/sd_user_main.lua

```

---

