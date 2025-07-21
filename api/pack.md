# pack - 打包和解包格式串

**示例**

```lua
--[[
 '<' 设为小端编码 
 '>' 设为大端编码 
 '=' 大小端遵循本地设置 
 'z' 空字符串,0字节
 'a' size_t字符串,前4字节表达长度,然后接着是N字节的数据
 'A' 指定长度字符串, 例如A8, 代表8字节的数据
 'f' float, 4字节
 'd' double , 8字节
 'n' Lua number , 32bit固件4字节, 64bit固件8字节
 'c' char , 1字节
 'b' byte = unsigned char  , 1字节
 'h' short  , 2字节
 'H' unsigned short  , 2字节
 'i' int  , 4字节
 'I' unsigned int , 4字节
 'l' long , 8字节, 仅64bit固件能正确获取
 'L' unsigned long , 8字节, 仅64bit固件能正确获取
]]

-- 详细用法请查看demo

```

## pack.unpack( string, format, init)

解包字符串

**参数**

|传入值类型|解释|
|-|-|
|string|需解包的字符串|
|string|格式化符号|
|int|默认值为1，标记解包开始的位置|

**返回值**

|返回值类型|解释|
|-|-|
|int|字符串标记的位置|
|any|第一个解包的值, 根据format值,可能有N个返回值|

**例子**

```lua
local _,a = pack.unpack(x,">h") --解包成short (2字节)

```

---

## pack.pack( format, val1, val2, val3, valn )

打包字符串的值

**参数**

|传入值类型|解释|
|-|-|
|string|format 格式化符号|
|any|第一个需打包的值|
|any|第二个需打包的值|
|any|第二个需打包的值|
|any|第n个需打包的值|

**返回值**

|返回值类型|解释|
|-|-|
|string|一个包含所有格式化变量的字符串|

**例子**

```lua
local data = pack.pack('<h', crypto.crc16("MODBUS", val))
log.info("data", data, data:toHex())

```

---

