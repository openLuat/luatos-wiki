# log

本章介绍LuatOS的log库使用方式

## 简介

log库是LuatOS进行日志输出的内置库，通过log库可以输出不同等级的用户日志

## 硬件准备

任意LuatOS-SOC开发板一块

## 软件部分

接口文档可参考：[log库](https://wiki.luatos.com/api/log.html)

### 日志输出

日志等级排序从低到高为 debug < info < warn < error

LuatOS默认日志等级是debug，可以输出debug及以上等级的日志

代码如下

```lua
PROJECT = "LOG"
VERSION = "1.0.0"

-- 初始化看门狗，超时时长为10S
wdt.init(10000)

log.debug(PROJECT, "debug message")
log.info(PROJECT, "info message")
log.warn(PROJECT, "warn message")
log.error(PROJECT, "error message")

-- 循环喂狗
while true do
    wdt.feed()
end
```

日志如下

```log
D/user.LOG debug message
I/user.LOG info message
W/user.LOG warn message
E/user.LOG error message
```

### 修改日志输出等级

+ SILENT  静默所有日志
+ DEBUG   输出debug级别以上的日志
+ INFO    输出info级别以上的日志
+ WARN    输出warn级别以上的日志
+ ERROR   输出error级别以上的日志

代码如下

```lua
PROJECT = "LOG"
VERSION = "1.0.0"

-- 初始化看门狗，超时时长为10S
wdt.init(10000)

log.setLevel("INFO")
print(log.getLevel())

-- 这条debug级别的日志不会输出
log.debug(PROJECT, "debug message")
log.info(PROJECT, "info message")
log.warn(PROJECT, "warn message")
log.error(PROJECT, "error message")

-- 循环喂狗
while true do
    wdt.feed()
end
```

日志如下

```log
2
I/user.LOG info message
W/user.LOG warn message
E/user.LOG error message
```

### 修改日志风格

+ 0 默认风格，包含日志标志和日志内容
+ 1 调试风格1，包含日志打印处行号
+ 2 调试风格2，包含日志打印处行号，但与调试风格1位置不同

代码如下

```lua
PROJECT = "LOG"
VERSION = "1.0.0"

-- 初始化看门狗，超时时长为10S
wdt.init(10000)

log.style(0)
log.debug(PROJECT, "debug message")
log.info(PROJECT, "info message")
log.warn(PROJECT, "warn message")
log.error(PROJECT, "error message")

log.style(1)
log.debug(PROJECT, "debug message")
log.info(PROJECT, "info message")
log.warn(PROJECT, "warn message")
log.error(PROJECT, "error message")

log.style(2)
log.debug(PROJECT, "debug message")
log.info(PROJECT, "info message")
log.warn(PROJECT, "warn message")
log.error(PROJECT, "error message")

-- 循环喂狗
while true do
    wdt.feed()
end
```

日志如下

```log
D/user.LOG debug message
I/user.LOG info message
W/user.LOG warn message
E/user.LOG error message
D/main.lua:40 LOG debug message
I/main.lua:41 LOG info message
W/main.lua:42 LOG warn message
E/main.lua:43 LOG error message
D/user.LOG main.lua:46 debug message
I/user.LOG main.lua:47 info message
W/user.LOG main.lua:48 warn message
E/user.LOG main.lua:49 error message
```
