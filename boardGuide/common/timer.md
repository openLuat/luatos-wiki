# timer

本章介绍LuatOS的timer库使用方式

## 简介

timer库使用的是mcu的硬件定时器，通过timer库可以创建硬件定时器

## 硬件准备

任意LuatOS-SOC开发板一块

## 软件部分

接口文档可参考：[timer库](https://wiki.luatos.com/api/timer.html)

### 硬阻塞

硬阻塞指定时长,阻塞期间没有任何luat代码会执行,包括底层消息处理机制

代码如下

```lua
PROJECT = "TIMER"
VERSION = "1.0.0"

-- 初始化看门狗，超时时长为10S
wdt.init(10000)

-- 打印阻塞开始前的ticks
log.info("ticks", mcu.ticks())
-- 阻塞延迟5000ms, 绝大部分项目不会也不应该使用该方法
-- 本demo只是为了演示API方法的可用性
-- mdelay会阻塞整个lua vm的运行, 在阻塞的时长内,任何中断都不会响应,包括uart
timer.mdelay(5000)
-- 打印阻塞结束后的ticks
log.info("ticks", mcu.ticks())

-- 循环喂狗
while true do
    wdt.feed()
end

```

日志如下

```log
I/user.ticks 22
I/user.ticks 5023
```
