# fdb

本章介绍LuatOS的fdb库使用方式

## 简介

fbd库基于FlashDB，提供在flash上保存数据的能力，数据储存方式类似于redis的k-v

## 硬件准备

任意LuatOS-SOC开发板一块

## 软件部分

接口文档可参考：[fdb库](https://wiki.luatos.com/api/fdb.html)

使用fdb库前先要初始化fdb数据库

```lua
fdb.kvdb_init("env", "onchip_fdb")
```

### 保存数据

数据保存格式为 key-value

+ key是数据的索引
+ value为实际存储的数据，类型可以是string/number/bool/table

例如：
| key| value|
|----|---|
| data1| "stringData"|
| data2| 1|
|data3|true|
|data4|{name="Jeremy",age = 18}|
代码如下

```lua
PROJECT = "fdb"
VERSION = "1.0.0"
sys = require("sys")
function test()
    if fdb.kvdb_init("env", "onchip_fdb") == false then
        log.error(PROJECT .. ".kvdb_init", "error")
        return
    end
    log.info(PROJECT .. ".kv_set", fdb.kv_set("data1", "stringData"))
    log.info(PROJECT .. ".kv_set", fdb.kv_set("data2", 1))
    log.info(PROJECT .. ".kv_set", fdb.kv_set("data3", true))
    log.info(PROJECT .. ".kv_set", fdb.kv_set("data4", {
        name = "Jeremy",
        age = 18
    }))
end
sys.taskInit(test)
sys.run()
```

日志如下

```log
I/fal Flash Abstraction Layer (V0.5.0) initialize success.
D/flashdb KVDB size is 65536 bytes.
D/flashdb FlashDB V1.1.0 is initialize success.
D/flashdb You can get the latest version on https://github.com/armink/FlashDB .
I/user.fdb.kv_set true 0
I/user.fdb.kv_set true 0
I/user.fdb.kv_set true 0
I/user.fdb.kv_set true 0
```

### 查询数据

根据上一步设置的key读取对应的数据

代码如下

```lua
PROJECT = "fdb"
VERSION = "1.0.0"

sys = require("sys")

function test()
    if fdb.kvdb_init("env", "onchip_fdb") == false then
        log.error(PROJECT .. ".kvdb_init", "error")
        return
    end

    log.info(PROJECT .. ".kv_get", fdb.kv_get("data1"))
    log.info(PROJECT .. ".kv_get", fdb.kv_get("data2"))
    log.info(PROJECT .. ".kv_get", fdb.kv_get("data3"))
    -- data4中储存的是一个table
    log.info(PROJECT .. ".kv_get", fdb.kv_get("data4"))
    for k, v in pairs(fdb.kv_get("data4")) do
        print(k, v)
    end
end

sys.taskInit(test)

sys.run()
```

日志如下

```log
I/fal Flash Abstraction Layer (V0.5.0) initialize success.
D/flashdb KVDB size is 65536 bytes.
D/flashdb FlashDB V1.1.0 is initialize success.
D/flashdb You can get the latest version on https://github.com/armink/FlashDB .
I/user.fdb.kv_get stringData
I/user.fdb.kv_get 1
I/user.fdb.kv_get true
I/user.fdb.kv_get table: 200345A8
name Jeremy
age 18
```

### 删除某个key

代码如下

```lua
PROJECT = "fdb"
VERSION = "1.0.0"

sys = require("sys")

function test()
    if fdb.kvdb_init("env", "onchip_fdb") == false then
        log.error(PROJECT .. ".kvdb_init", "error")
        return
    end

    -- 获取之前储存在data1中的数据
    log.info(PROJECT .. ".kv_get", fdb.kv_get("data1"))
    -- 删除data1储存的数据
    log.info(PROJECT .. ".kv_del", fdb.kv_del("data1"))
    -- 再次查询储存在data1中的数据为nil
    log.info(PROJECT .. ".kv_get", fdb.kv_get("data1"))
end

sys.taskInit(test)

sys.run()
```

日志如下

```log
I/fal Flash Abstraction Layer (V0.5.0) initialize success.
D/flashdb KVDB size is 65536 bytes.
D/flashdb FlashDB V1.1.0 is initialize success.
D/flashdb You can get the latest version on https://github.com/armink/FlashDB .
I/user.fdb.kv_get stringData
I/user.fdb.kv_del true
I/user.fdb.kv_get nil
```

### 清空整个fdb数据库

代码如下

```lua
PROJECT = "fdb"
VERSION = "1.0.0"

sys = require("sys")

function test()
    if fdb.kvdb_init("env", "onchip_fdb") == false then
        log.error(PROJECT .. ".kvdb_init", "error")
        return
    end

    -- 查询还存在的数据
    log.info(PROJECT .. ".kv_get", fdb.kv_get("data2"))
    log.info(PROJECT .. ".kv_get", fdb.kv_get("data3"))
    -- data4中储存的是一个table
    log.info(PROJECT .. ".kv_get", fdb.kv_get("data4"))
    for k, v in pairs(fdb.kv_get("data4")) do
        print(k, v)
    end

    -- 清空整个fdb数据库
    fdb.kv_clr()

    -- 再次查询刚才查询的数据
    log.info(PROJECT .. ".kv_get", fdb.kv_get("data2"))
    log.info(PROJECT .. ".kv_get", fdb.kv_get("data3"))
    log.info(PROJECT .. ".kv_get", fdb.kv_get("data4"))
end

sys.taskInit(test)

sys.run()
```

日志如下

```log
I/fal Flash Abstraction Layer (V0.5.0) initialize success.
D/flashdb KVDB size is 65536 bytes.
D/flashdb FlashDB V1.1.0 is initialize success.
D/flashdb You can get the latest version on https://github.com/armink/FlashDB .
I/user.fdb.kv_get 1
I/user.fdb.kv_get true
I/user.fdb.kv_get table: 20034598
name Jeremy
age 18
I/user.fdb.kv_get nil
I/user.fdb.kv_get nil
I/user.fdb.kv_get nil
```
