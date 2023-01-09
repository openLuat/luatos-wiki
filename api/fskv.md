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
if fskv.init() then
    log.info("fdb", "kv数据库初始化成功")
end

-- 关于清空fdb库
-- 下载工具是没有提供直接清除fdb数据的途径的, 但有有办法解决
-- 写一个main.lua, 执行 fskv.kvdb_init 后 执行 fskv.clear() 即可全清fdb数据.

```

---

## fskv.kv_set(key, value)



设置一对kv数据

**参数**

|传入值类型|解释|
|-|-|
|string|key的名称,必填,不能空字符串|
|string|用户数据,必填,不能nil, 支持字符串/数值/table/布尔值, 数据长度最大4096字节|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|number|第二个为返回为flashdb的fdb_kv_set_blob返回详细状态,0：无错误 1:擦除错误 2:读错误 3:些错误 4:未找到 5:kv名字错误 6:kv名字存在 7:已保存 8:初始化错误|

**例子**

```lua
if fskv.kvdb_init("env", "onchip_fdb") then
    log.info("fdb", fskv.kv_set("wendal", "goodgoodstudy"))
end

```

---

## fskv.kv_get(key, skey)



根据key获取对应的数据

**参数**

|传入值类型|解释|
|-|-|
|string|key的名称,必填,不能空字符串|
|string|可选的次级key,仅当原始值为table时有效,相当于 fskv.kv_get(key)[skey]|

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

## fskv.kv_del(key)



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
if fskv.kvdb_init("env", "onchip_fdb") then
    log.info("fdb", fskv.kv_del("wendal"))
end

```

---

## fskv.kv_clr()



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
fskv.kv_clr()

```

---

## fskv.stat()



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
local used, total,kv_count = fskv.stat()
log.info("fdb", "kv", used,total,kv_count)

```

---

