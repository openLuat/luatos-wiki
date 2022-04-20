# LuatOS CLI 基本命令

本文档描述一些简单且基础的命令

* help      帮助信息
* version   版本信息
* upgrade   更新版本

## help 帮助信息

无命令时也打印help内容

```bash
$> luatos help
> LuatOS-CLI v2.1.0 build 20220419_220202
> usage:
>   help        帮助信息
>   version     版本信息
>   upgrade     更新自身
>   prj         项目管理
>   pkg         包管理
```

## version 显示版本号

```bash
$> luatos version
> LuatOS-CLI v2.1.0 build 20220419_220202
```

## upgrade 更新程序

```bash
$> luatos upgrade -y
> checking ...
> found xxx
> download ...
> finish
```


