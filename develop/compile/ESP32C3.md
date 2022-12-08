# 📡 ESP32系列编译文档

本文档适合以下芯片:
1. esp32c3
2. esp32c2
3. esp32
4. esp32s3

使用本文档前,请确认以下信息:

1. 你`大概率不需要`这份文档，这是用于自行扩展固件的高级文档。
2. 我们提供的固件包就包含[编译好的固件](https://gitee.com/openLuat/LuatOS/releases)
3. 如果你只是想将已有的库添加到固件中，可以使用我们提供的[在线云编译](https://wiki.luatos.com/develop/compile/Cloud_compilation.html)生成自定义固件。
4. 如果你是在找刷机/编译lua脚本之类的应用型文档，那么这份文档`不是你需要`查看的内容。

视频教程链接: [B站每日喝粥](https://www.bilibili.com/video/BV1D3411p7MK?p=1)

## 准备环境

1. `windows 10 x64`, 其他版本自行解决idf安装问题, 需要idf5, 最新idf5!! 低版本编译不了!!
2. 所有步骤均使用 `CMD`, 非 `PowerShell`, 若不知道这些是什么, 请先百度学习一下
3. 起码2G的磁盘空间, 用于存放代码和中间文件

## 准备项目

### 建一个文件夹,用于存放编译所需要的全部文件

推荐使用  `D:\github` , 最低要求是 不能有空格,中文,特殊字符串, 且尽量短

### 获取源码

源码要2份, [LuatOS主库](https://gitee.com/openLuat/LuatOS)及 [luatos-soc-idf5]((https://gitee.com/openLuat/luatos-soc-idf5) , 这是两个不同的仓库, 两个都需要!!

获取方式: 推荐git, 注册后下载zip也可以

必须按以下目录结构进行摆放, 以 `D:\gitee` 为例

```
D:\
    github\
        LuatOS\
            lua\
            luat\
            components\
            其他目录
        luatos-soc-idf5\
            luatos\
```

检查点, 路径正确的情况下, 以下文件路径必存在, 找不到就肯定是命名问题, 手动添加是徒劳的

* `D:\github\LuatOS\lua\src\lgc.c`
* `D:\github\luatos-soc-idf5\luatos\include\luat_conf_bsp.h`


`LuatOS` `luatos-soc-idf5` 都是固定目录名称, 都不可以改, 例如 `LuatOS-master` 就是错误的命名, 必须要改回 `LuatOS`

如果实在不方便把主库存放在 `D:\github\LuatOS`, 修改`luatos-soc-idf5\luatos\CMakeLists.txt`里面的`LUATOS_ROOT`值. 例如, 存放在 `E:/abc/LuatOS`, 则修改为

```
set(LUATOS_ROOT "E://abc/LuatOS/")
```

## 编译前的最后准备

安装 idf5
1. 访问地址 https://dl.espressif.cn/dl/esp-idf/
2. 下载idf5离线安装包 `ESP-IDF v5.0 - Offline Installer`
3. 下载后双击启动, 按提示安装
4. 安装完成后, 开始菜单会有idf5的快捷方式

## 编译

使用开始菜单或快捷方式, 进入idf5的CMD

```
D:
cd D:\github\luatos-soc-idf5\luatos
idf.py fullclean
idf.py set-target esp32c3
idf.py build
```

当出现`Project build complete.`字样则表示编译成功, 会生成 `.soc` 后的文件, 使用LuaTools刷机即可

## 定制固件里的库

打开`D:\github\luaotos-soc-idf5\luatos\include\luat_conf_bsp.h`，按需注释或取消注释。注意，如果功能太大导致固件放不下，会编译失败。

