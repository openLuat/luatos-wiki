# fskv - kv数据库,掉电不丢数据

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`Air780`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/fskv/luat_lib_fskv.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看fskv的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/fskv)
```

**示例**

```lua
-- 本库的目标是替代fdb库
-- 1. 兼容fdb的函数
-- 2. 使用fdb的flash空间,启用时也会替代fdb库
fskv.init()
fskv.set("wendal", 1234)
log.info("fskv", "wendal", fskv.get("wendal"))

--[[ 
fskv与fdb的实现机制导致的差异

                    fskv          fdb
1. value长度        4096           255
2. key长度          63             64
3. 空间利用率(对比)  较低            较高
4. 读取速度         恒定           脏数据影响速度,非恒定
5. 写入数据         恒定           脏数据影响速度,非恒定
]]

```

## fskv.init()



初始化kv数据库

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
if fskv.init() then
    log.info("fdb", "kv数据库初始化成功")
end

-- 关于清空fdb库
-- 下载工具是没有提供直接清除fdb数据的途径的, 但有有办法解决
-- 写一个main.lua, 执行 fskv.kvdb_init 后 执行 fskv.clear() 即可全清fdb数据.

```

---

## fskv.set(key, value)



设置一对kv数据

**参数**

|传入值类型|解释|
|-|-|
|string|key的名称,必填,不能空字符串|
|string|用户数据,必填,不能nil, 支持字符串/数值/table/布尔值, 数据长度最大4095字节|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
-- 设置数据, 字符串,数值,table,布尔值,均可
-- 但不可以是nil, function, userdata, task
log.info("fdb", fskv.set("wendal", "goodgoodstudy"))
log.info("fdb", fskv.set("upgrade", true))
log.info("fdb", fskv.set("timer", 1))
log.info("fdb", fskv.set("bigd", {name="wendal",age=123}))

```

---

## fskv.get(key, skey)



根据key获取对应的数据

**参数**

|传入值类型|解释|
|-|-|
|string|key的名称,必填,不能空字符串|
|string|可选的次级key,仅当原始值为table时有效,相当于 fskv.get(key)[skey]|

**返回值**

|返回值类型|解释|
|-|-|
|any|存在则返回数据,否则返回nil|

**例子**

```lua
if fskv.init() then
    log.info("fdb", fskv.get("wendal"))
end

```

---

## fskv.del(key)



根据key删除数据

**参数**

|传入值类型|解释|
|-|-|
|string|key的名称,必填,不能空字符串|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
log.info("fdb", fskv.del("wendal"))

```

---

## fskv.clear()



清空整个kv数据库

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
-- 清空
fskv.clear()

```

---

## fskv.iter()



kv数据库迭代器

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|userdata|成功返回迭代器指针,否则返回nil|

**例子**

```lua
-- 清空
local iter = fskv.iter()
if iter then
    while 1 do
        local k = fskv.next(iter)
        if not k then
            break
        end
        log.info("fdb", k, "value", fskv.kv_get(k))
    end
end

```

---

## fskv.iter(iter)



kv迭代器获取下一个key

**参数**

|传入值类型|解释|
|-|-|
|userdata|fskv.iter()返回的指针|

**返回值**

|返回值类型|解释|
|-|-|
|string|成功返回字符串key值, 否则返回nil|

**例子**

```lua
-- 清空
local iter = fskv.iter()
if iter then
    while 1 do
        local k = fskv.next(iter)
        if not k then
            break
        end
        log.info("fskv", k, "value", fskv.get(k))
    end
end

```

---

## fskv.status()



获取kv数据库状态

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|已使用的空间,单位字节|
|int|总可用空间, 单位字节|
|int|总kv键值对数量, 单位个|

**例子**

```lua
local used, total,kv_count = fskv.status()
log.info("fdb", "kv", used,total,kv_count)

```

---

