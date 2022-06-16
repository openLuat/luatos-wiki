# fdb - kv数据库(基于FlashDB)

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/flashdb/src/luat_lib_fdb.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

> 本库有专属demo，[点此链接查看fdb的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/fdb)

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
if fdb.kvdb_init("env", "onchip_fdb") then
    log.info("fdb", "kv数据库初始化成功")
end

```

---

## fdb.kv_set(key, value)

设置一对kv数据

**参数**

|传入值类型|解释|
|-|-|
|string|key的名称,必填,不能空字符串|
|string|用户数据,必填,不能nil, 支持字符串/数值/table/布尔值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|number|第二个为返回为flashdb的fdb_kv_set_blob返回详细状态,0：无错误 1:擦除错误 2:读错误 3:些错误 4:未找到 5:kv名字错误 6:kv名字存在 7:已保存 8:初始化错误|

**例子**

```lua
if fdb.kvdb_init("env", "onchip_fdb") then
    log.info("fdb", fdb.kv_set("wendal", "goodgoodstudy"))
end

```

---

## fdb.kv_get(key)

根据key获取对应的数据

**参数**

|传入值类型|解释|
|-|-|
|string|key的名称,必填,不能空字符串|

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

