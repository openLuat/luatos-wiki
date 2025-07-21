# rtos - RTOS底层操作库

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
|string|固件版本号,例如"V0001"|

**例子**

```lua
-- 读取版本号
local luatos_version = rtos.version()

```

---

## rtos.standy(timeout)

进入待机模式, 仅部分设备可用, 本API已废弃, 推荐使用pm库

**参数**

|传入值类型|解释|
|-|-|
|int|休眠时长,单位毫秒|

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
|type|"sys"系统内存, "lua"虚拟机内存,"psram"psram内存, 默认为lua虚拟机内存|

**返回值**

|返回值类型|解释|
|-|-|
|int|总内存大小,单位字节|
|int|当前已使用的内存大小,单位字节|
|int|历史最高已使用的内存大小,单位字节|

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

## rtos.nop()

空函数,什么都不做

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 这个函数单纯就是 lua -> c -> lua 走一遍
-- 没有参数,没有返回值,没有逻辑处理
-- 在绝大多数情况下,不会遇到这个函数的调用
-- 它通常只会出现在性能测试的代码里, 因为它什么都不干.
rtos.nop()

```

---

## rtos.autoCollectMem(period, warning_level, force_level)

内存自动收集配置，是lua本身收集机制的一种补充，不是必要的，而且只在luavm空闲时触发

**参数**

|传入值类型|解释|
|-|-|
|int|自动收集的周期，等同于receive调用次数，0~60000。如果是0，则关闭自动收集功能，默认是100|
|int|内存使用警戒水位线，是总luavm内存量的百分比，50~95，内存达到(>=)警戒线时才会开始判断是否要收集。默认是80|
|int|内存使用强制收集水位线，是总luavm内存量的百分比，50~95，内存达到(>=)强制收集线时会强制收集。默认是90，必须比警戒水位线大|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
rtos.autoCollectMem(100, 80, 90)

```

---

