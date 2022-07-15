# 🖥️ Win32

## 说明

1. 底层rtos FreeRTOSv202012.00
2. 编译环境msys，工具cmake/make/gcc
3. 文件系统，win32原生文件系统，以工作目录为基点
4. 默认luavm和rtos内存分配均为 1MByte

## 编译环境

MSYS2

## 编译说明

- 前往 `MSYS2官网 <https://www.msys2.org/>`_ 安装新版MSYS2
- 可选： `配置国内镜像源 <https://mirrors.ustc.edu.cn/help/msys2.html>`_
- 打开安装目标文件夹里的 **mingw64.exe**
- 刷新软件包 `pacman -Sy`
- 安装编译时需要用到的软件包 `pacman -S mingw-w64-x86_64-gcc mingw-w64-x86_64-gdb mingw-w64-x86_64-cmake mingw-w64-x86_64-make mingw-w64-x86_64-toolchain`
- 切到win32项目目录： `cd /盘符/路径/LuatOS/bsp/win32`
- 运行编译脚本 `sh build_cmake.sh`
- luatos.exe会在build文件夹里生成

<div id="xmake-record"></div>
<link rel="stylesheet" type="text/css" href="../../_static/css/asciinema-player.css"/>
<script src="../../_static/js/asciinema-player.min.js"></script>
<script>AsciinemaPlayer.create('../../_static/terminal/build-win32.cast', document.getElementById('xmake-record'),{autoPlay:true,speed:2});</script>

## 简单用法

- 新建一个目录，将 `luatos.exe` 拷贝进去(可选，执行时使用全路径也可以)
- 拷贝sys.lua到目录内
- 在目录内新建main.lua，写入以下内容

```lua
local sys = require "sys"

log.info("sys","from win32")

sys.taskInit(function ()
    while true do
        log.info("hi",os.date())
        log.info("sys",rtos.meminfo("sys"))
        log.info("lua",rtos.meminfo("lua"))
        sys.wait(1000)
    end
end)

sys.run()
```
