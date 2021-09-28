# sfd

本章将会向大家介绍LuatOS的sfd功能。将会实现使用Air101开发板连接外置spi flash并通过sfd挂载直接读写。

## 简介

通常外挂的spi flash的读写指令都是兼容的，我们在日常使用的过程中如果直接使用spi通过指令对flash进行读写会很麻烦，于是乎LuatOS就设计了一套接口，将外置的spi flash通过这套接口实现抽象读写，并对接Lua的io实现简单读写。

## 硬件准备

Air101开发板一块，一个外挂的spi flash

## 软件使用

接口文档可参考：[sfd库](https://wiki.luatos.com/api/sfd.html)

代码展示

```lua
sys.taskInit(
    function()
        local drv = sfd.init("spi", 0, 20)
        if drv then
            log.info("sfd", "chip id", sfd.id(drv):toHex())
        end
        while 1 do
            if sfd.status(drv) == 1 then
                log.info("sfd", "write", sfd.write(drv, 0x100, "hi,luatos"))
                log.info("sfd", "read", sfd.read(drv, 0x100, 32))
            end
            sys.wait(1000)
        end
    end
)
```
