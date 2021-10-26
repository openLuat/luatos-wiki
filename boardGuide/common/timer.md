# TIMER

本章将会向大家介绍LuatOS的TIMER功能。将会实现使用Air101开发板展示并在日志中打印效果。

## 简介

TIMER模块使用的是mcu的硬件定时器

## 硬件准备

Air101开发板一块

## 软件使用

接口文档可参考：[timer库](https://wiki.luatos.com/api/timer.html)

代码展示

```lua
log.info("ticks", mcu.ticks())--打印ticks
-- 阻塞延迟5000ms, 绝大部分项目不会也不应该使用该方法
-- 本demo只是为了演示API方法的可用性
-- mdelay会阻塞整个lua vm的运行, 在阻塞的时长内,任何中断都不会响应,包括uart
-- 对应的用法是 sys.waitXXX
-- 如需在中断回调内使用sys.waitXXX, 可以使用sys.taskInit启动新的task
timer.mdelay(5000)
log.info("ticks", mcu.ticks())--打印ticks
```

上述代码打印日志

![TIMER](img/TIMER.png)
