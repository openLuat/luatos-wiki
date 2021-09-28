# PM

本章将会向大家介绍LuatOS的PM功能。将会实现使用Air101开发板展示并在日志中打印效果。

## 简介

MCU模块封装mcu一些特殊操作

## 硬件准备

Air101开发板一块

## 软件使用

接口文档可参考：[pm库](https://wiki.luatos.com/api/pm.html)

代码展示

```lua
-- 请求进入休眠模式
pm.request(pm.HIB)
-- 添加底层定时器
pm.dtimerStart(0, 300 * 1000) -- 5分钟后唤醒
-- 关闭底层定时器
pm.dtimerStop(0) -- 关闭id=0的底层定时器
```
