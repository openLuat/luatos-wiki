# io - io操作(扩展)

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../lua/src/liolib.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！


## io.exists(path)

判断文件是否存在

**参数**

|传入值类型|解释|
|-|-|
|string|文件路径|

**返回值**

|返回值类型|解释|
|-|-|
|bool|存在返回true,否则返回false|

**例子**

```lua
log.info("io", "file exists", io.exists("/boottime")) 

```

---

## io.fileSize(path)

获取文件大小

**参数**

|传入值类型|解释|
|-|-|
|string|文件路径|

**返回值**

|返回值类型|解释|
|-|-|
|int|文件数据,若文件不存在会返回nil|

**例子**

```lua
local fsize = io.fileSize("/bootime")
if fsize and fsize > 1024 then
  log.info("io", "file size", fsize)
end

```

---

## io.readFile(path)

读取整个文件,请注意内存消耗

**参数**

|传入值类型|解释|
|-|-|
|string|文件路径|

**返回值**

|返回值类型|解释|
|-|-|
|string|文件数据,若文件不存在会返回nil|

**例子**

```lua
local data = io.readFile("/bootime")

```

---

## io.writeFile(path, data)

将数据写入文件

**参数**

|传入值类型|解释|
|-|-|
|string|文件路径|
|string|数据|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true, 否则返回false|

**例子**

```lua
io.writeFile("/bootime", "1")

```

---

## io.fill(buff, offset, len)

读取文件并填充到zbuff内

**参数**

|传入值类型|解释|
|-|-|
|userdata|zbuff实体|
|int|写入的位置,默认是0|
|int|写入的长度,默认是zbuff的len减去offset|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|int|返回实际读取到的长度，如果小于0也说明是读取失败了|

**例子**

```lua
local buff = zbuff.create(1024)
local f = io.open("/sd/test.txt")
if f then
  f:fill(buff)
end

```

---

## io.mkdir(path)

创建文件夹

**参数**

|传入值类型|解释|
|-|-|
|string|需要建立的目录路径|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|
|int|底层返回值|

**例子**

```lua
local ret, errio = io.mkdir("/data/")
log.info("fs", "mkdir", ret, errio)

```

---

## io.rmdir(path)

删除文件夹

**参数**

|传入值类型|解释|
|-|-|
|string|需要移除的目录路径|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|
|int|底层返回值|

**例子**

```lua
local ret, errio = io.rmdir("/data/")
log.info("fs", "rmdir", ret, errio)

```

---

## io.lsdir(path, len, offset)

列出目录下的文件

**参数**

|传入值类型|解释|
|-|-|
|string|需要枚举的目录路径|
|int|最大长度, 默认10, 最高50|
|int|偏移量, 默认0, 当目录文件很多时分页查询用|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|
|int|底层返回值|

**例子**

```lua
local ret, data = io.lsdir("/data/", 10, 0)
if ret then
  log.info("fs", "lsdir", json.encode(data))
else
  log.info("fs", "lsdir", "fail", ret, data)
end

```

---

## io.lsmount()

列出所有挂载点

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|挂载点列表|

**例子**

```lua
local data = io.lsmount()
log.info("fs", "lsmount", json.encode(data))

```

---

