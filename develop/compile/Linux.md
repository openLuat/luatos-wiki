#  Linux

## 说明

1. 基于posix
2. UI基于SDL2
3. 构建: xmake，编译工具链: LLVM
4. 默认luavm内存分配为 1MByte

## 编译说明

- 安装xmake： `wget https://xmake.io/shget.text -O - | bash`

- 安装依赖：`sudo apt-get install git make gcc p7zip-full llvm-dev libsdl2-dev -y` （llvm sdl 可选，不安装xmake会自动下载源码编译安装，极其耗费时间，推荐在此直接安装）

- 在Luatos/bsp/linux下直接执行 `xmake`编译即可

- luatos会在build文件夹里相对应的分类生成

## 简单用法

- 新建一个目录，将 `luatos 拷贝进去(可选，执行时使用全路径也可以)
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

执行`./luatos ./main.lua` 即可
