# string - 字符串操作函数

## string.toHex(str, separator)

将字符串转成HEX

**参数**

|传入值类型|解释|
|-|-|
|string|需要转换的字符串|
|string|分隔符, 默认为""|

**返回值**

|返回值类型|解释|
|-|-|
|string|HEX字符串|
|number|HEX字符串的长度|

**例子**

```lua
string.toHex("\1\2\3") --> "010203" 6
string.toHex("123abc") --> "313233616263" 12
string.toHex("123abc", " ") --> "31 32 33 61 62 63 " 12

```

---

## string.fromHex(hex)

将HEX转成字符串

**参数**

|传入值类型|解释|
|-|-|
|string|hex,16进制组成的串|

**返回值**

|返回值类型|解释|
|-|-|
|string|字符串|

**例子**

```lua
string.fromHex("010203")       -->  "\1\2\3"
string.fromHex("313233616263") -->  "123abc"

```

---

## string.split(str, delimiter, keepEmtry)

按照指定分隔符分割字符串

**参数**

|传入值类型|解释|
|-|-|
|string|输入字符串|
|string|分隔符,可选,默认 ","|
|bool|是否保留空白片段,默认为false,不保留. 2023.4.11之后的固件可用|

**返回值**

|返回值类型|解释|
|-|-|
|table|分割后的字符串表|

**例子**

```lua
local tmp = string.split("123,233333,122")
log.info("tmp", json.encode(tmp))
local tmp = ("123,456,789"):split(',') --> {'123','456','789'}
log.info("tmp", json.encode(tmp))

-- 保留空片段, 2023.4.11之后的固件可用
local str = "/tmp//def/1234/"
local tmp = str:split("/", true) 
log.info("str.split", #tmp, json.encode(tmp))

```

---

## string.toValue(str)

返回字符串tonumber的转义字符串(用来支持超过31位整数的转换)

**参数**

|传入值类型|解释|
|-|-|
|string|输入字符串|

**返回值**

|返回值类型|解释|
|-|-|
|string|转换后的二进制字符串|
|number|转换了多少个字符|

**例子**

```lua
string.toValue("123456") --> "\1\2\3\4\5\6"  6
string.toValue("123abc") --> "\1\2\3\a\b\c"  6

```

---

## string.urlEncode("123 abc")

将字符串进行url编码转换

**参数**

|传入值类型|解释|
|-|-|
|string|需要转换的字符串|
|int|mode:url编码的转换标准,|

**返回值**

无

**例子**

无

---

## string.toBase64(str)

将字符串进行base64编码

**参数**

|传入值类型|解释|
|-|-|
|string|需要转换的字符串|

**返回值**

|返回值类型|解释|
|-|-|
|string|解码后的字符串,如果解码失败会返回空字符串|

**例子**

无

---

## string.fromBase64(str)

将字符串进行base64解码

**参数**

|传入值类型|解释|
|-|-|
|string|需要转换的字符串|

**返回值**

|返回值类型|解释|
|-|-|
|string|解码后的字符串,如果解码失败会返回空字符串|

**例子**

无

---

## string.toBase32(str)

将字符串进行base32编码

**参数**

|传入值类型|解释|
|-|-|
|string|需要转换的字符串|

**返回值**

|返回值类型|解释|
|-|-|
|string|解码后的字符串,如果解码失败会返回0长度字符串|

**例子**

无

---

## string.fromBase32(str)

将字符串进行base32解码

**参数**

|传入值类型|解释|
|-|-|
|string|需要转换的字符串|

**返回值**

|返回值类型|解释|
|-|-|
|string|解码后的字符串,如果解码失败会返回0长度字符串|

**例子**

无

---

## string.startsWith(str, prefix)

判断字符串前缀

**参数**

|传入值类型|解释|
|-|-|
|string|需要检查的字符串|
|string|前缀字符串|

**返回值**

|返回值类型|解释|
|-|-|
|bool|真为true, 假为false|

**例子**

```lua
local str = "abc"
log.info("str", str:startsWith("a"))
log.info("str", str:startsWith("b"))

```

---

## string.endsWith(str, suffix)

判断字符串后缀

**参数**

|传入值类型|解释|
|-|-|
|string|需要检查的字符串|
|string|后缀字符串|

**返回值**

|返回值类型|解释|
|-|-|
|bool|真为true, 假为false|

**例子**

```lua
local str = "abc"
log.info("str", str:endsWith("c"))
log.info("str", str:endsWith("b"))

```

---

## string.trim(str, ltrim, rtrim)

裁剪字符串,去除头尾的空格

**参数**

|传入值类型|解释|
|-|-|
|string|需要处理的字符串|
|bool|清理前缀,默认为true|
|bool|清理后缀,默认为true|

**返回值**

|返回值类型|解释|
|-|-|
|string|清理后的字符串|

**例子**

```lua
local str = "\r\nabc\r\n"
log.info("str", string.trim(str)) -- 打印 "abc"
log.info("str", str:trim())       -- 打印 "abc"
log.info("str", #string.trim(str, false, true)) -- 仅裁剪后缀,所以长度是5

```

---

