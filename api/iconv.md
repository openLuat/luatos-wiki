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

