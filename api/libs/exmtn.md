# exmtn - 运维日志扩展库，负责日志的持久化存储

**示例**

```lua
exmtn.init(1, 0)  -- 初始化，1个块，缓存写入
exmtn.log("info", "tag", "message", 123)  -- 输出运维日志

```

## exmtn.init(blocks, write_way)

初始化运维日志

**参数**

|传入值类型|解释|
|-|-|
|int|blocks 每个文件的块数，0表示禁用，正整数表示块数量|
|int|write_way 写入方式，可选参数。exmtn.CACHE_WRITE(0)表示缓存写入，exmtn.ADD_WRITE(1)表示直接追加写入，默认为exmtn.CACHE_WRITE|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true，失败返回false|

**例子**

```lua
exmtn.init(1, exmtn.CACHE_WRITE)  -- 初始化，1个块，缓存写入

```

---

## exmtn.log(level, tag, ...)

输出运维日志并写入文件

**参数**

|传入值类型|解释|
|-|-|
|string|level 日志级别，必须是 "info", "warn", 或 "error"|
|string|tag 日志标识，必须是字符串|
|...|需打印的参数|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true，失败返回false|

**例子**

```lua
exmtn.log("info", "message", 123)
exmtn.log("warn", "message", 456)
exmtn.log("error", "message", 789)

```

---

## exmtn.get_config()

获取当前配置

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table\|nil|配置信息，失败返回nil|

**例子**

```lua
local config = exmtn.get_config()
if config then
    log.info("exmtn", "blocks:", config.blocks, "write_way:", config.write_way)
end

```

---

## exmtn.clear()

清除所有运维日志文件

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true，失败返回false|

**例子**

```lua
local ok = exmtn.clear()
if ok then
    log.info("exmtn", "日志文件已清除")
end

```

---

