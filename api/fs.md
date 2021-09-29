# fs - 文件系统额外操作

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_fs.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## fs.fsstat(path)

获取文件系统信息

**参数**

|传入值类型|解释|
|-|-|
|string|路径,默认"/",可选|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|获取成功返回true,否则返回false|
|int|总的block数量|
|int|已使用的block数量|
|int|block的大小,单位字节|
|string|文件系统类型,例如lfs代表littlefs|

**例子**

```lua
-- 打印根分区的信息
log.info("fsstat", fs.fsstat("/"))

```

---

## fs.fsize(path)

获取文件大小

**参数**

|传入值类型|解释|
|-|-|
|string|文件路径|

**返回值**

|返回值类型|解释|
|-|-|
|int|文件大小,若获取失败会返回0|

**例子**

```lua
-- 打印main.luac的大小
log.info("fsize", fs.fsize("/main.luac"))

```

---

