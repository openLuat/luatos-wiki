# LuatOS-SoC的文件系统

## 常见的文件系统布局

```bash
/          # 片上可读(也许可写)的一段flash, 也可能是虚拟文件系统
  - luadb  # 通过luatools/luatide刷机时,所有文件都会放到这个目录下, 包括脚本和资源文件
  - sd     # 挂载sd卡后会出现的路径, 某些平台上有固定的sd卡/tf卡路径
  - lfs    # 通常是挂载spi flash的路径, 通常可以自定义
  - ram    # 内存文件系统,可读写. 2023-01-12之后的固件支持
```

在大部分平台上, 刷机进设备的脚本和资源文件, 都在 `/luadb` 目录下, 以单一文件夹存在

## 文件系统类型

LuatOS-SoC本身并不依赖具体的rtos, 所以文件系统也有自己的一套API, 称为VFS

与市面上众多的虚拟文件系统API类似, VFS提供一套读写文件的抽象API, 隔离与实际硬件环境的差异.

LuatOS-SoC内置多种文件系统格式

* luadb - 只读, 基于 TLD(Tag-Len-Data) 格式组织的文件系统,文件名最长21字节.
* lfs   - 可读写, 全称lifftefs, https://github.com/littlefs-project/littlefs
* posix - 可读写, Linux的posix标准接口, LuatOS-SoC对其有封装
* fatfs - 可读写, 读写SD卡/TF卡的开源Fat32文件系统
* ram   - 可读写, 存放于内存中
- romfs - 只读, 标准romfs格式

LuatOS-SoC的VFS支持任何第三方文件系统, 无论是只读还是可读写, 实现相关操作函数即可对接.
