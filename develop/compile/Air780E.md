# Air780E编译指南

本文档适合基于同一芯片方案的合宙模块

* Air780E
* Air600E
* Air780EG

## 准备工作

1. win10, 理论上win7也可以. linux编译暂不完善,后续会有.
2. 起码1G以上的剩余空间, 会有大量的临时文件
3. 若能联网最好, 不能也有解决方法,会补充说明

## 下载源码

注意, 需要两个库

* 主库 `https://gitee.com/openLuat/LuatOS`
* bsp库 `https://gitee.com/openLuat/luatos-soc-2022`

代码更新频繁, 推荐使用`git`进行clone下载, 不建议zip下载.

下载的目录**必须**符合下列的结构, 目录名称必须是`LuatOS`和`luatos-soc-2022`.

假设在 `D:\gitee`

```
D:\gitee\
    - LuatOS
        - lua
        - luat
        - components
    - luatos-soc-2022
        - xmake.lua
        - project
        - interface
```

若使用zip下载, **务必修正目录名称,以符合上述结构!!**

## 准备工具

安装 xmake , 可从xmake官网下载, 可以从[本链接直接下载](https://cdn.openluat-luatcommunity.openluat.com/attachment/20221113234354456_xmake-v2.7.3.win64.exe)

安装时默认会**选上PATH**, 如果没有就勾上

**注意：环境变量需重启电脑生效**

## 工具链下载(离线环境)

在有网的环境下, xmake会自行下载gcc工具链. 但如果无法联网, 或者网络受限的情况, 通常会有这种提示:

```
error: fatal: not a git repository
```

或者git/http连接失败的提示. 故这里提供离线gcc工具链下载和编译的方法

1. 下载[gcc for arm工具链](http://cdndownload.openluat.com/xmake/toolchains/gcc-arm/gcc-arm-none-eabi-10.3-2021.10-win32.zip)
2. 解压, 不要选太深的目录, 不要包含中文字符和特殊符号, 建议解压到`D盘根目录`, 压缩包内自带一层目录`gcc-arm-none-eabi-10.3-2021.10`
3. 假设解压后的路径是 `D:\gcc-arm-none-eabi-10.3-2021.10`, 检查 `D:\gcc-arm-none-eabi-10.3-2021.10\bin\arm-none-eabi-g++.exe` 是否存在, 如果不存在, 那肯定是多一层目录.
4. 用文本编辑器(例如vscode)打开 `luatos-soc-2022` 的 `build.bat`, 修改内容如下

```
原本的内容:
rem set GCC_PATH=E:\gcc_mcu
修改成set开头的语句,注意是去掉rem并修改值.
set GCC_PATH=D:\gcc-arm-none-eabi-10.3-2021.10
```

## 开始编译

1. 双击`luatos-soc-2022` 下的 `cmd.lnk` . **不要使用PowerShell!!**
2. 在弹出的cmd命令行下, 输入指令

```
build luatos
```

最后会输出如下内容(大概):

```
D:\github\luatos-soc-2022\PLAT\driver\chip\ec618\ap\inc_cmsis/Driver_USART.h:345:3: warning: type qualifiers ignored on function return type [-Wignored-qualifiers]
[ 99%]: archiving.debug libluatos.a
[ 99%]: linking.debug luatos.elf

7-Zip 19.00 (x64) : Copyright (c) 1999-2018 Igor Pavlov : 2019-02-21

Scanning the drive:
9 files, 2549515 bytes (2490 KiB)

Creating archive: LuatOS-SoC_V1001_EC618.7z

Add new data to archive: 9 files, 2549515 bytes (2490 KiB)


Files read from disk: 8
Archive size: 1328565 bytes (1298 KiB)
Everything is Ok
[100%]: build ok!
end
```

即代表编译成功, 输出的`soc` 文件可在 `out\luatos` 目录下找到, 使用LuaTools刷机即可

额外提示, soc文件是压缩包,不代表固件的实际大小!!

## 常见编译问题

* 提示网络失败, git错误, 请查阅`工具链下载(离线环境)`小节
* 提示缺`luat_msgbus.h`之类的文件, 请查阅`下载源码`,检查目录结构, 并确保没有路径中不含特殊字符
* 提示`refer to xxx` 等ld链接错误, 请更新代码, 两个代码库都需要更新. 若依然报错,请报issue

