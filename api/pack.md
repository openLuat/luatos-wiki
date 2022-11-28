# pack - 打包和解包格式串

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_pack.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库还有视频教程，[点此链接查看](https://www.bilibili.com/video/BV1Sr4y1n7bP)
```

## pack.unpack( string, format, init)

解包字符串

**参数**

|传入值类型|解释|
|-|-|
|string|需解包的字符串|
|string|格式化符号 '<':设为小端编码 '>':设为大端编码 '=':大小端遵循本地设置 'z':空字符串 'p':byte字符串 'P':word字符串 'a':size_t字符串 'A':指定长度字符串 'f':float 'd':double 'n':Lua number 'c':char 'b':byte = unsigned char 'h':short 'H':unsigned short 'i':int 'I':unsigned int 'l':long 'L':unsigned long|
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
|string|format 格式化符号 '<':设为小端编码 '>':设为大端编码 '=':大小端遵循本地设置 'z':空字符串 'p':byte字符串 'P':word字符串 'a':size_t字符串 'A':指定长度字符串 'f':float 'd':double 'n':Lua number 'c':char 'b':byte = unsigned char 'h':short 'H':unsigned short 'i':int 'I':unsigned int 'l':long 'L':unsigned long|
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

