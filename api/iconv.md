# iconv - iconv操作

## iconv.open(tocode, fromcode)

打开相应字符编码转换函数

**参数**

|传入值类型|解释|
|-|-|
|string|释义：目标编码格式<br>取值：gb2312/ucs2/ucs2be/utf8|
|string|释义：源编码格式<br>取值：gb2312/ucs2/ucs2be/utf8|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|编码转换函数的转换句柄,若不存在会返回nil|

**例子**

```lua
--unicode大端编码 转化为 utf8编码
local ic = iconv.open("utf8", "ucs2be")

```

---

## ic:iconv(inbuf)

字符编码转换

**参数**

|传入值类型|解释|
|-|-|
|string|释义：待转换字符串|

**返回值**

|返回值类型|解释|
|-|-|
|number|释义：返回编码转换后的结果<br>取值：0成功,-1失败|

**例子**

```lua
--unicode大端编码 转化为 utf8编码
function ucs2beToUtf8(ucs2s)
    local ic = iconv.open("utf8", "ucs2be")
    return ic:iconv(ucs2s)
end

```

---

## iconv.close(cd) 

关闭字符编码转换

**参数**

|传入值类型|解释|
|-|-|
|userdata|iconv.open返回的句柄|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
--关闭字符编码转换
local cd = iconv.open("utf8", "ucs2be")
iconv.close(cd)

```

---

## iconv.gb2utf8(str)

GB2312编码字符串转UTF8编码（快捷函数）

**参数**

|传入值类型|解释|
|-|-|
|string|待转换的GB2312编码字符串|

**返回值**

|返回值类型|解释|
|-|-|
|string|成功返回UTF8编码字符串，失败返回nil|

**例子**

```lua
local utf8str = iconv.gb2utf8("\xC4\xE3\xBA\xC3")  -- 你好
log.info("iconv", "gb2utf8", utf8str)

```

---

## iconv.utf82gb(str)

UTF8编码字符串转GB2312编码（快捷函数）

**参数**

|传入值类型|解释|
|-|-|
|string|待转换的UTF8编码字符串|

**返回值**

|返回值类型|解释|
|-|-|
|string|成功返回GB2312编码字符串，失败返回nil|

**例子**

```lua
local gbstr = iconv.utf82gb("\xE4\xBD\xA0\xE5\xA5\xBD")  -- 你好
log.info("iconv", "utf82gb", gbstr:toHex())

```

---

