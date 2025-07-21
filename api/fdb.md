# fdb - kv数据库,掉电不丢数据

**示例**

```lua
-- 本库已经废弃, 推荐使用 fskv 库

```

## fdb.kvdb_init(name, partition)

初始化kv数据库

**参数**

|传入值类型|解释|
|-|-|
|string|数据库名,当前仅支持env|
|string|FAL分区名,当前仅支持onchip_fdb|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
-- fdb库基于 flashdb , 再次表示感谢.
if fdb.kvdb_init("env", "onchip_fdb") then
    log.info("fdb", "kv数据库初始化成功")
end

-- 关于清空fdb库
-- 下载工具是没有提供直接清除fdb数据的途径的, 但有有办法解决
-- 写一个main.lua, 执行 fdb.kvdb_init 后 执行 fdb.clear() 即可全清fdb数据.

```

---

## fdb.kv_set(key, value)

设置一对kv数据

**参数**

|传入值类型|解释|
|-|-|
|string|key的名称,必填,不能空字符串|
|string|用户数据,必填,不能nil, 支持字符串/数值/table/布尔值, 数据长度最大255字节|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|number|第二个为返回为flashdb的fdb_kv_set_blob返回详细状态,0：无错误 1:擦除错误 2:读错误 3:写错误 4:未找到 5:kv名字错误 6:kv名字存在 7:已保存 8:初始化错误|

**例子**

```lua
if fdb.kvdb_init("env", "onchip_fdb") then
    log.info("fdb", fdb.kv_set("wendal", "goodgoodstudy"))
end

```

---

## fdb.kv_get(key, skey)

根据key获取对应的数据

**参数**

|传入值类型|解释|
|-|-|
|string|key的名称,必填,不能空字符串|
|string|可选的次级key,仅当原始值为table时有效,相当于 fdb.kv_get(key)[skey]|

**返回值**

|返回值类型|解释|
|-|-|
|any|存在则返回数据,否则返回nil|

**例子**

```lua
if fdb.kvdb_init("env", "onchip_fdb") then
    log.info("fdb", fdb.kv_get("wendal"))
end

```

---

## fdb.kv_del(key)

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
if fdb.kvdb_init("env", "onchip_fdb") then
    log.info("fdb", fdb.kv_del("wendal"))
end

```

---

## fdb.kv_clr()

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
fdb.kv_clr()

```

---

## fdb.kv_iter()

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
local iter = fdb.kv_iter()
if iter then
    while 1 do
        local k = fdb.kv_next(iter)
        if not k then
            break
        end
        log.info("fdb", k, "value", fdb.kv_get(k))
    end
end

```

---

## fdb.kv_next(iter)

kv迭代器获取下一个key

**参数**

|传入值类型|解释|
|-|-|
|userdata|fdb.kv_iter()返回的指针|

**返回值**

|返回值类型|解释|
|-|-|
|string|成功返回字符串key值, 否则返回nil|

**例子**

```lua
-- 清空
local iter = fdb.kv_iter()
if iter then
    while 1 do
        local k = fdb.kv_next(iter)
        if not k then
            break
        end
        log.info("fdb", k, "value", fdb.kv_get(k))
    end
end

```

---

## fdb.kv_stat()

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
-- 本API于2022.07.23 添加
local used,maxs,kv_count = fdb.kv_stat()
log.info("fdb", "kv", used,maxs,kv_count)

```

---

