# lpmem - 操作低功耗不掉电内存块

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_lpmem.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## lpmem.read(offset, size)

读取内存块

**参数**

|传入值类型|解释|
|-|-|
|int|内存偏移量|
|int|读取大小,单位字节|

**返回值**

|返回值类型|解释|
|-|-|
|string|读取成功返回字符串,否则返回nil|

**例子**

```lua
-- 读取1kb的内存
local data = lpmem.read(0, 1024)

```

---

## lpmem.write(offset, str)

写入内存块

**参数**

|传入值类型|解释|
|-|-|
|int|内存偏移量|
|string|待写入的数据|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
-- 往偏移量为512字节的位置, 写入数据
lpmem.write(512, data)

```

---

## lpmem.size()

获取内存块的总大小

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|内存块的大小|

**例子**

```lua
lpmem.size()

```

---

