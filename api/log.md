# log - 日志库

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

