# 使用方法

## 获取方式

1. 通过[合宙网盘](https://pan.air32.cn/s/DJTr?path=%2FLuatOS%E6%A8%A1%E6%8B%9F%E5%99%A8(win32)), 选取`PC模拟器`下载
2. 自行编译, [源码地址](https://gitee.com/openLuat/luatos-soc-pc) 需搭配LuatOS主库一起编译

## 运行方式

### 交互式

* windows平台, 直接双击 `luatos-pc.exe` 即可运行
* linux平台, 直接运行 `./luatos-pc`

### 脚本运行

这种方式执行 `单个脚本`和`多目录执行` 两种方式, 需要在命令行下操作

以windows平台为例, 先进入控制台,并切换到当前目录

单脚本运行:

```cmd
luatos-pc.exe main.lua
luatos-pc.exe test\001.helloworld\main.lua
```

多目录运行:

```cmd
luatos-pc.exe test\001.helloworld\  ..\LuatOS\scrips\libs\
```
