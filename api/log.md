# log - 日志库

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_log.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

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

