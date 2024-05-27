# iconv - iconv操作

{bdg-success}`已适配` {bdg-primary}`Air780E/Air700E` {bdg-primary}`Air780EP/Air780EPV` {bdg-primary}`Air601` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3`

```{tip}
本库有专属demo，[点此链接查看iconv的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/iconv)
```

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
local iconv = iconv.open("utf8", "ucs2be")

```

---

## iconv:iconv(inbuf)



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
    local iconv = iconv.open("utf8", "ucs2be")
    return iconv:iconv(ucs2s)
end

```

---

## iconv.open(tocode, fromcode) 



打开相应字符编码转换函数

**参数**

|传入值类型|解释|
|-|-|
|string|tocode$目标编码格式$gb2312/ucs2/ucs2be/utf8|
|string|fromcode$源编码格式$gb2312/ucs2/ucs2be/utf8|
|return|table$cd$编码转换函数的转换句柄$ |

**返回值**

无

**例子**

```lua
--unicode大端编码 转化为 utf8编码
local cd = iconv.open("utf8", "ucs2be")

```

---

## cd:iconv(inbuf) 



字符编码转换

**参数**

|传入值类型|解释|
|-|-|
|string|inbuf$输入字符串$例如:ucs2s |
|return|number$result$返回编码转换后的结果$0成功,-1失败|

**返回值**

无

**例子**

```lua
--unicode大端编码 转化为 utf8编码
function ucs2beToUtf8(ucs2s)
    local cd = iconv.open("utf8", "ucs2be")
    return cd:iconv(ucs2s)
end

```

---

## iconv.close(cd) 



关闭字符编码转换

**参数**

|传入值类型|解释|
|-|-|
|string|cd$iconv.open返回的句柄$ |
|return| |

**返回值**

无

**例子**

```lua
--关闭字符编码转换
local cd = iconv.open("utf8", "ucs2be")
iconv.close(cd)

```

---

