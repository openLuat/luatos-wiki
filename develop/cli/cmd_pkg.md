# LuatOS 包管理命令

本质上就是 增删改查

## pkg install 安装软件包

若文件存在, 提示用户是否覆盖, 使用`-y`就直接覆盖

```bash
$> luatos pkg install aht10
> found version xxx.xx
> download ...
> installed
```

## pkg remove 删除软件包

提示用户是否删除, 使用`-y`就直接删除

```bash
$> luatos pkg remove aht10
> remove script/pkgs/aht10.lua ? [y/N]
y
> removed
```


## pkg update 更新软件包

若文件被修改过, 提示用户是否覆盖, 使用`-y`就直接覆盖

```bash
$> luatos pkg update aht10
> found version xxx.xx
> download ...
> installed
```

## pkg query 查询软件包

```bash
$> luatos pkg query aht
> aht10 - 2.1.0 build 20220420_223344
> aht20 - 2.2.0 build 20220420_223344
```

