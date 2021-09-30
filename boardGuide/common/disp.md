# DISP

本章将会向大家介绍LuatOS的DISP功能。将会实现使用Air101开发板驱动oled进行显示。

## 简介

DISP实际上是封装了部分U8G2的API进行显示，使大家能使用lua快速驱动oled

## 硬件准备

Air101开发板一块，0.96寸OLED

硬件连接图

(todo)

## 软件使用

接口文档可参考：[disp库](https://wiki.luatos.com/api/disp.html)

代码介绍

```lua
function display_str(str)
    disp.clear()
    disp.drawStr(str, 1, 18)
    disp.update()
end

local function ui_update()
    disp.clear() -- 清屏
    disp.drawStr(os.date("%Y-%m-%d %H:%M:%S"), 1, 12) -- 写日期
    disp.drawStr("Luat@Air101" .. " " .. _VERSION, 1, 24) -- 写版本号
    disp.update()
end

-- 初始化显示屏
log.info("disp", "init ssd1306") -- log库是内置库,内置库均不需要require
disp.init({
    mode="i2c_sw",
    pin0=xx--[[按你板子改成自己的引脚编号]],
    pin1=xx--[[按你板子改成自己的引脚编号]],
}) -- 模拟i2c,pin0是SCL，pin1是SDA, 也可以用硬件i2c脚
disp.setFont(1) -- 启用中文字体,文泉驿点阵宋体 12x12
display_str("启动中 ...")

sys.taskInit(function()
    while 1 do
        sys.wait(1000)
        log.info("disp", "ui update", rtos.meminfo()) -- rtos是也是内置库
        ui_update()
    end
end)
```
