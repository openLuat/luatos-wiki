# CLI交互概念设计

## 术语及定义

* 场景 - 用户故事或使用假设
* `$> ` 均为命令,需要用户敲入
* `> `  命令输出或等待用户的额外输入 
* `#`   场景注释

## 刚安装工具包, 直接敲入命令

* 用户通过安装/复制等方式获取LuatOS
* 通常会无脑双击可执行程序, 考虑弹窗或弹出cmd
* 在cmd内无参数执行luatos的话, 输出帮助信息, 并在默认提示用户最可能的场景 - 建项目,刷机闪灯

```bash
$> luatos
> LuatOS CLI 1.0.1 build 2022-04-30
> =================================
> 可用命令:
>     prj       项目管理
>     burn      刷机
>     pkg       包管理
>     check     检测
>     update    程序版本更新
>     wiki      文档查询

例如:
新建一个Air101项目并刷机, 请依次敲入下列命令并按提示操作
luatos prj init
luatos burn
```

## 按提示创建项目,并刷机

```bash
# 前一场景的提示, 用户敲出创建项目的命令, 创建后提示进行刷机或模拟
$> luatos prj init
> 请输入设备类型[air101]:
>> air101
> 项目初始化中
> 项目初始化完成
> 项目已经准备好, 可执行 luatos burn 刷机或 luatos mock 进行模拟运行

# 必然存在未插入设备,未安装驱动的情况, 引导到页面
$> luatos burn
> 未检测到串口, 请检查供电并安装驱动 http://xxx

# 执行全自动的刷机流程, 并逐个过程进行提示
$> luatos burn
> 检测到串口 COM8
> 检查脚本并合成刷机文件
> 开始刷机: xxx
> 刷机成功, 请使用串口助手查看日志
```

## 尝试各种demo

* 在测试闪灯之后, 客户最可能的想法是 换一个demo来测试

```bash
# 更新demo
$> luatos demo update
> led       点灯
> ssd1306   i2c屏幕   
> st7735    spi屏幕
$> luatos burn demo led
> 请接线XX XX XX
> 请确保设备已经供电
> 请回车以确认刷机
> 刷机过程 XXX YYY ZZZ
```

## 尝试库函数

* 尝试demo后, 用户手头也许有一些外设, 有些库的是需要下载的

```bash
# 模糊查询
$> luatos pkg search ath
> ath10 -- version 2.1.0 sha256 XXXX
> ath20 -- version 2.1.0 sha256 XXXX
# 按需安装
$> luatos pkg install ath10
> 本地无ath10, 开始下载
> 下载中
> 下载完成
> 简易用法 XXX XXX
>         YYY YYY
>         ZZZ ZZZ
# 查查当前安装了哪些
$> luatos pkg list
> ath10 -- version 2.1.0 sha256 XXXX
> ds18b20 -- version 2.2.0 sha256 XXXX
```

## 打包与量产

TODO
