# fskv - kv数据库,掉电不丢数据

**示例**

```lua
fskv.init()
fskv.set("wendal", 1234)
log.info("fskv", "wendal", fskv.get("wendal"))

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
    log.info("fskv", "kv数据库初始化成功")
end

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
log.info("fskv", fskv.set("wendal", "goodgoodstudy"))
log.info("fskv", fskv.set("upgrade", true))
log.info("fskv", fskv.set("timer", 1))
log.info("fskv", fskv.set("bigd", {name="wendal",age=123}))

```

---

## fskv.sett(key, skey, value)

设置table内的键值对数据

**参数**

|传入值类型|解释|
|-|-|
|string|key的名称,必填,不能空字符串|
|string|table的key名称, 必填, 不能是空字符串|
|string|用户数据,必填,支持字符串/数值/table/布尔值, 数据长度最大4095字节|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false/nil|

**例子**

```lua
-- 本API在2023.7.26新增,注意与set函数区别
-- 设置数据, 字符串,数值,table,布尔值,均可
-- 但不可以是function, userdata, task
log.info("fskv", fskv.sett("mytable", "wendal", "goodgoodstudy"))
log.info("fskv", fskv.sett("mytable", "upgrade", true))
log.info("fskv", fskv.sett("mytable", "timer", 1))
log.info("fskv", fskv.sett("mytable", "bigd", {name="wendal",age=123}))

-- 下列语句将打印出4个元素的table
log.info("fskv", fskv.get("mytable"), json.encode(fskv.get("mytable")))
-- 注意: 如果key不存在, 或者原本的值不是table类型,将会完全覆盖
-- 例如下列写法,最终获取到的是table,而非第一行的字符串
log.info("fskv", fskv.set("mykv", "123"))
log.info("fskv", fskv.sett("mykv", "age", "123")) -- 保存的将是 {age:"123"}


-- 如果设置的数据填nil, 代表删除对应的key
log.info("fskv", fskv.sett("mykv", "name", "wendal"))
log.info("fskv", fskv.sett("mykv", "name")) -- 相当于删除
-- 

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
    log.info("fskv", fskv.get("wendal"))
end

-- 若需要"默认值", 对应非bool布尔值, 可以这样写
local v = fskv.get("wendal") or "123"

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
log.info("fskv", fskv.del("wendal"))

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
        log.info("fskv", k, "value", fskv.kv_get(k))
    end
end

```

---

## fskv.next(iter)

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
log.info("fskv", "kv", used,total,kv_count)

```

---

