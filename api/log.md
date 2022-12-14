# log - 日志库

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`Air780`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_log.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


## 常量

|常量|类型|解释|
|-|-|-|
|log.LOG_SILENT|number|无日志模式|
|log.LOG_DEBUG|number|debug日志模式|
|log.LOG_INFO|number|info日志模式|
|log.LOG_WARN|number|warning日志模式|
|log.LOG_ERROR|number|error日志模式|


## log.setLevel(level)

设置日志级别

**参数**

|传入值类型|解释|
|-|-|
|string|level 日志级别,可用字符串或数值, 字符串为(SILENT,DEBUG,INFO,WARN,ERROR,FATAL), 数值为(0,1,2,3,4,5)|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 设置日志级别为INFO
log.setLevel("INFO")

```

---

## log.style(val)

设置日志风格

**参数**

|传入值类型|解释|
|-|-|
|int|日志风格,默认为0, 不传就是获取当前值|

**返回值**

|返回值类型|解释|
|-|-|
|int|当前的日志风格|

**例子**

```lua
-- 以 log.info("ABC", "DEF", 123) 为例, 假设该代码位于main.lua的12行
-- 默认日志0
-- I/user.ABC DEF 123
-- 调试风格1, 添加额外的调试信息
-- I/main.lua:12 ABC DEF 123
-- 调试风格2, 添加额外的调试信息, 位置有所区别
-- I/user.ABC main.lua:12 DEF 123

log.style(0) -- 默认风格0
log.style(1) -- 调试风格1
log.style(2) -- 调试风格2

```

---

## log.getLevel()

获取日志级别

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|日志级别对应0,1,2,3,4,5|

**例子**

```lua
-- 得到日志级别
log.getLevel()

```

---

## log.debug(tag, val, val2, val3, ...)

输出日志,级别debug

**参数**

|传入值类型|解释|
|-|-|
|string|tag         日志标识,必须是字符串|
|...|需打印的参数|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 日志输出 D/onenet connect ok
log.debug("onenet", "connect ok")

```

---

## log.info(tag, val, val2, val3, ...)

输出日志,级别info

**参数**

|传入值类型|解释|
|-|-|
|string|tag         日志标识,必须是字符串|
|...|需打印的参数|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 日志输出 I/onenet connect ok
log.info("onenet", "connect ok")

```

---

## log.warn(tag, val, val2, val3, ...)

输出日志,级别warn

**参数**

|传入值类型|解释|
|-|-|
|string|tag         日志标识,必须是字符串|
|...|需打印的参数|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 日志输出 W/onenet connect ok
log.warn("onenet", "connect ok")

```

---

## log.error(tag, val, val2, val3, ...)

输出日志,级别error

**参数**

|传入值类型|解释|
|-|-|
|string|tag         日志标识,必须是字符串|
|...|需打印的参数|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 日志输出 E/onenet connect ok
log.error("onenet", "connect ok")

```

---

## log.dump(zbuff, type, isDelete)

读取异常日志，这里可以读取系统和用户的，主要用于用户发送给自己的服务器，如果配置了周期上传，请不要使用！！！

**参数**

|传入值类型|解释|
|-|-|
|zbuff|日志信息缓存，如果为nil就不会读出，一般当|
|int|日志类型，目前只有log.TYPE_SYS和log.TYPE_USR|
|boolean|是否删除日志|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true表示本次读取前并没有写入数据，false反之，在删除日志前，最好再读一下确保没有新的数据写入了|

**例子**

```lua
local result = log.dump(buff, log.TYPE_SYS, false) --读出系统记录的异常日志
local result = log.dump(nil, log.TYPE_SYS, true) --清除系统记录的异常日志

```

---

## log.record(string)

写入用户的异常日志，注意最大只有4KB，超过部分新的覆盖旧的，开启自动上传后会上传到合宙IOT平台

**参数**

|传入值类型|解释|
|-|-|
|string|日志|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
log.record("socket long time no connect") --记录下"socket long time no connect"

```

---

## log.uploadConfig(enable, period, user_flag)

配置关键日志上传IOT平台，这里的日志包括引起luavm异常退出的日志和用户通过record写入的日志，类似于air的errDump

**参数**

|传入值类型|解释|
|-|-|
|boolean|是否启用记录功能，false的话将不会记录任何日志|
|int|定时上传周期，单位秒，默认600秒，这个是自动上传时候后的重试时间时间，在开机后或者有record操作后会很快尝试上传到合宙IOT平台一次，如果为0，则不会上传，由用户dump后自己上传自己的平台|
|string|用户的特殊标识，可以为空|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
log.uploadConfig(true, 3600, "12345678")	--一个小时尝试上次一次，上传时会在imei后附加上12345678
log.uploadConfig(false)	--关闭记录功能，不再上传
log.uploadConfig(true, 0)	--记录，但是不会主动上传，由用户实现上传功能

```

---

