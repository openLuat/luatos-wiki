# SPI

本章将会向大家介绍LuatOS的SPI功能。将会实现使用Air101开发板读取SPI的ID的值并在日志中打印。

## 简介

SPI是串行外设接口（Serial Peripheral Interface）的缩写，是一种高速的，全双工，同步的通信总线，设备分为主机和从机，目前Air101的SPI仅能作为主机使用

## 硬件准备

Air101开发板一块，SPI的flash一个

将flash按照SPI线序连接到开发板

## 软件使用

接口文档可参考：[spi库](https://wiki.luatos.com/api/spi.html)

代码展示

```lua
sys.taskInit(
    function()
        local count = 0
        spi.setup(0,20,0,0,8,2000000,spi.MSB,1,1)
        while 1 do
            spi.send(0,string.char(0x9f))
            r = spi.recv(0,3)
            log.info("spi data",r:toHex())
            sys.wait(1000)
        end
    end
)
```
