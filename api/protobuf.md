# protobuf - ProtoBuffs编解码

**示例**

```lua

-- 加载 pb 文件, 这个是从pbtxt 转换得到的
-- 转换命令: protoc.exe -operson.pb --cpp_out=cpp person.pbtxt
-- protoc.exe 下载地址: https://github.com/protocolbuffers/protobuf/releases
protobuf.load(io.readFile("/luadb/person.pb"))
local tb = {
    name = "wendal",
    id = 123,
    email = "abc@qq.com"
}
-- 用 protobuf 编码数据
local data = protobuf.encode("Person", tb)
if data then
    -- 打印数据长度. 编码后的数据含不可见字符, toHex是方便显示
    log.info("protobuf", #data, (data:toHex()))
end

```

## protobuf.load(pbdata)

加载pb二进制定义数据

**参数**

|传入值类型|解释|
|-|-|
|string|通过protoc.exe程序转换得到的数据,通常从文件读取得到|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|
|int|读取了多长, 调试用|

**例子**

```lua
-- 注意, 同一个文件只需要加载一次, 除非调用过protobuf.clear()
protobuf.load(io.readFile("/luadb/person.pb"))

```

---

## protobuf.clear()

清除已加载的二进制定义数据

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值, 总是成功|

**例子**

```lua
-- 清除所有已加载的定义数据
protobuf.clear()

```

---

## protobuf.encode(tpname, data)

编码protobuffs数据包

**参数**

|传入值类型|解释|
|-|-|
|string|数据类型名称, 定义在pb文件中, 由protobuf.load加载|
|table|待编码数据, 必须是table, 内容符合pb文件里的定义|

**返回值**

|返回值类型|解释|
|-|-|
|string|编码后的数据,若失败会返回nil|

**例子**

```lua
-- 数据编码
local tb = {
    name = "wendal"
}
local pbdata = protobuf.encode("Person", tb)
if pbdata then
    -- 注意, 编码后的数据通常带不可见字符
    log.info("protobuf", #pbdata, pbdata:toHex())
end

```

---

## protobuf.decode(tpname, data)

解码protobuffs数据包

**参数**

|传入值类型|解释|
|-|-|
|string|数据类型名称, 定义在pb文件中, 由protobuf.load加载|
|string|待编码数据|

**返回值**

|返回值类型|解释|
|-|-|
|table|解码后的数据|

**例子**

```lua
-- 数据编码
local tb = {
    name = "wendal"
}
local pbdata = protobuf.encode("Person", tb)
if pbdata then
    -- 注意, 编码后的数据通常带不可见字符
    log.info("protobuf", #pbdata, pbdata:toHex())
end

```

---

