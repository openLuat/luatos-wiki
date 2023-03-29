# 🖥️ Win32

## 说明

1. 底层win32 api适配
2. UI基于SDL2
3. 编译环境windows sdk，构建: xmake，编译工具链: LLVM
4. 文件系统，win32原生文件系统，以工作目录为基点
5. 默认luavm和rtos内存分配均为 1MByte

## 编译环境

安装[Visual Studio](https://visualstudio.microsoft.com/zh-hans/vs/)勾选windows sdk并安装

## 编译说明

- 安装 [xmake](https://github.com/xmake-io/xmake/releases)
- 在Luatos/bsp/win32下直接执行 `xmake`编译即可
- luatos.exe会在build文件夹里生成

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

执行`.\luatos.exe .\main.lua` 或者直接将脚本拖拽到luatos.exe上即可
