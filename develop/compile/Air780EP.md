# 📶 Air780EP编译指南

本文档适合基于同一芯片方案的合宙模块

* Air780EP


注意:更详细编译说明可查看 https://gitee.com/openLuat/luatos-soc-2024/blob/master/README.md 


## 准备工作

1. Windows 10(或以上),  linux(仅ubuntu验证过)
2. 起码5G以上的剩余空间, 会有大量的临时文件
3. 若能联网最好, 不能也有解决方法,会补充说明

## 下载源码

注意, 需要两个库

* 主库 `https://gitee.com/openLuat/LuatOS`
* bsp库 `https://gitee.com/openLuat/luatos-soc-2024` linux编译会有更多说明,请查阅README.md

代码更新频繁, 推荐使用`git`进行clone下载, 不建议zip下载.

下载的目录**必须**符合下列的结构, 目录名称必须是`LuatOS`和`luatos-soc-2024`.

假设在 `D:\gitee`

```tree
D:\gitee\
    - LuatOS
        - lua
        - luat
        - components
    - luatos-soc-2024
        - csdk.lua
        - project
        - interface
```

若使用zip下载, **务必修正目录名称,以符合上述结构!!**

## 准备工具

安装 xmake , 可从xmake官网下载, 可以从[本链接直接下载](https://pan.air32.cn/s/DJTr?path=%2F%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7), 建议使用最新版.

安装时默认会**选上PATH**, 如果没有就勾上

**注意：环境变量需重启电脑生效**

## 开始编译

示例环境使用windows，linux/macosx 实际上也是通用的编译方式

在luatos-soc-2024\project\luatos 下打开终端

首先执行配置，执行 `xmake f --menu`

`Basic Configuration` 我们不用去管，里面是编译架构/编译器相关配置，项目中会自动配置好交叉编译器，这里我们忽略，选择 `Project Configuration` 根据自己实际使用配置即可

配置完成选择Exit退出，询问是否保存选择yes

**注意:上述配置操作只需要配置一次，之后会一直生效，只有修改配置才需要重新执行配置操作**

随后执行 `xmake进行编译即可，生成的binpkg/soc/日志数据库(comdb.txt)等文件都位于项目下`out`目录



最后会输出如下内容(大概):

```shell
D:\github\luatos-soc-2023\PLAT\driver\chip\ec718p\ap\inc_cmsis/Driver_USART.h:345:3: warning: type qualifiers ignored on function return type [-Wignored-qualifiers]
[ 99%]: archiving.debug libluatos.a
[ 99%]: linking.debug luatos.elf

7-Zip 19.00 (x64) : Copyright (c) 1999-2018 Igor Pavlov : 2019-02-21

Scanning the drive:
9 files, 2549515 bytes (2490 KiB)

Creating archive: LuatOS-SoC_V1001_EC718P.7z

Add new data to archive: 9 files, 2549515 bytes (2490 KiB)


Files read from disk: 8
Archive size: 1328565 bytes (1298 KiB)
Everything is Ok
[100%]: build ok!
end
```

即代表编译成功, 生成的binpkg/soc/日志数据库(comdb.txt)等文件都位于项目下`out`目录, 使用LuaTools刷机即可

额外提示, soc文件是压缩包,不代表固件的实际大小!!


ps：如果不想使用图形也支持使用命令行配置方式，例如`xmake f --chip_target=ec718p --lspd_mode=y --denoise_force=n` ，具体支持的配置项和参数执行 `xmake f --help` 查看 Command options (Project Configuration)下具体描述


## 常见编译问题

1，xmake包默认安装c盘，我c盘空间不多不想安装在c盘

答: 设置相关目录到其他盘
`xmake g --pkg_installdir="xxx"` 设置包安装目录 
`xmake g --pkg_cachedir="xxx"` 设置包缓存目录

2，我电脑无法联网，如何下载安装包？

答:可以提前准备好包，这里以windows环境安装本仓库gcc交叉编译工具链为例

首先下载好gcc-arm-none-eabi-10-2020-q4-major-win32.zip到D盘根目录，执行 `xmake g --pkg_searchdirs="D:"`xmake会优先搜索设置的目录去搜索安装包，就不必联网了

gcc下载连接参考 csdk.lua中的连接，选择对应平台下载

3，github包是否可以加速？

`xmake g --proxy_pac=github_mirror.lua`可设置内置的github加速镜像

