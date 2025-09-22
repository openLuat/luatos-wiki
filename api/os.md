# os - os操作

**示例**

```lua
-- os模块是lua原生模块, 这份文档是为了方便阐述实际使用中的常见问题

-- 原生文档请查阅 https://wiki.luatos.com/_static/lua53doc/manual.html#6.9

```

## os.remove(path)

移除文件

**参数**

|传入值类型|解释|
|-|-|
|string|待移除的文件完整路径|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,其他情况返回nil|
|string|失败时返回原因字符串|

**例子**

```lua
-- 删除根目录下的某个文件
os.remove("/1.txt")
-- 注意, 线刷时的文件, 一般在 /luadb 目录, 这个目录下的文件是只读的
-- 也就是无法执行 os.remove("/luadb/xxx.bin")

```

---

## os.rename(old_path, new_path)

文件重命名

**参数**

|传入值类型|解释|
|-|-|
|string|源文件完整路径|
|string|目标文件完整路径|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,其他情况返回nil|
|string|失败时返回原因字符串|

**例子**

```lua
-- 注意, 只有在相同文件系统下的文件可以重命名
-- 例如:
os.rename("/1.txt", "/2.txt")
-- 不同文件系统, 或者源文件系统是只读的, 则无法执行
--os.rename("/luadb/1.txt", "/luadb/2.txt")
--os.rename("/luadb/1.txt", "/2.txt")

```

---

## os.clock()

返回程序使用的按秒计 CPU 时间的近似值

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|时间戳|

**例子**

```lua
-- 不推荐使用本API
-- 如需要获取 时间戳, 请使用 os.time()
-- 如需获取系统运行时长, 请使用 mcu.ticks()

```

---

## os.date(fmt, time)

日期函数

**参数**

|传入值类型|解释|
|-|-|
|string|格式化字符串,可以是nil|
|table|日期时间的table|

**返回值**

|返回值类型|解释|
|-|-|
|table/string|根据fmt的不同,返回值不同|

**例子**

```lua

-- 值得注意的几点:
-- 1. 若需要UTC时间, fmt的第一个字符写"!"
-- 2. fmt的格式化遵循 C 函数 strftime, 可以查阅 https://developer.aliyun.com/article/320480

-- 获取本地时间字符串
log.info("本地时间字符串", os.date())
-- 获取UTC时间字符串
log.info("UTC时间字符串", os.date("!%c"))
-- 格式化本地时间字符串
log.info("本地时间字符串", os.date("%Y-%m-%d %H:%M:%S"))
-- 格式化UTC时间字符串
log.info("UTC时间字符串", os.date("!%Y-%m-%d %H:%M:%S"))
-- 格式化时间字符串
log.info("自定义时间的字符串", os.date("!%Y-%m-%d %H:%M:%S", os.time({year=2000, mon=1, day=1, hour=0, min=0, sec=0})))

-- 获取本地时间的table
log.info("本地时间字符串", json.encode(os.date("*t")))
-- 获取UTC时间的table
log.info("UTC时间字符串",  json.encode(os.date("!*t")))

```

---

## os.time(mytime)

时间戳函数

**参数**

|传入值类型|解释|
|-|-|
|table|日期时间的table|

**返回值**

|返回值类型|解释|
|-|-|
|int|时间戳|

**例子**

```lua
-- 注意注意, 这个函数返回的是UTC时间戳
-- 时间戳, 但lua下的精度只能到秒
log.info("UTC时间戳", os.time())
log.info("自定义时间戳", os.time({year=2000, mon=1, day=1, hour=0, min=0, sec=0}))

```

---

## os.difftime(timeA, timeB)

时间差值

**参数**

|传入值类型|解释|
|-|-|
|int|时间A,数值类型|
|int|时间B,数值类型|

**返回值**

|返回值类型|解释|
|-|-|
|int|时间差值|

**例子**

无

---

