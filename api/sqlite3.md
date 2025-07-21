# sqlite3 - sqlite3数据库操作

**示例**

```lua
-- 注意, 本库仍处于开发阶段, 大部分BSP尚不支持本库
-- 本移植基于 sqlite3 3.44.0
sys.taskInit(function()
    sys.wait(1000)
    local db = sqlite3.open("/ram/test.db")
    log.info("sqlite3", db)
    if db then
        sqlite3.exec(db, "CREATE TABLE devs(ID INT PRIMARY KEY NOT NULL, name CHAR(50));")
        sqlite3.exec(db, "insert into devs values(1, \"ABC\");")
        sqlite3.exec(db, "insert into devs values(2, \"DEF\");")
        sqlite3.exec(db, "insert into devs values(3, \"HIJ\");")
        local ret, data = sqlite3.exec(db, "select * from devs;")
        log.info("查询结果", ret, data)
        if ret then
            for k, v in pairs(data) do
                log.info("数据", json.encode(v))
            end
        end
        sqlite3.close(db)
    end
end)

```

## sqlite3.open(path)

打开数据库

**参数**

|传入值类型|解释|
|-|-|
|string|数据库文件路径,必须填写,不存在就会自动新建|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|数据库指针,是否就返回nil|

**例子**

```lua
local db = sqlite3.open("/test.db")
if db then
   -- 数据库操作xxxx

    -- 用完必须关掉
    sqlite3.close(db)
end

```

---

## sqlite3.exec(db, sql)

执行SQL语句

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过sqlite3.open获取到的数据库指针|
|string|SQL字符串,必须填写|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回nil|
|table|成功返回查询结果(若有),否则返回报错的字符串|

**例子**

无

---

## sqlite3.close(db)

关闭数据库

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过sqlite3.open获取到的数据库指针|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回nil|

**例子**

无

---

