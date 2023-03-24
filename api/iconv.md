# iconv - iconv操作

{bdg-success}`已适配` {bdg-primary}`Air105` {bdg-primary}`Air780E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/iconv/luat_lib_iconv.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

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
|table|编码转换函数的转换句柄|

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

## iconv.close(cd)



关闭字符编码转换

**参数**

|传入值类型|解释|
|-|-|
|string|iconv.open返回的句柄|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
--关闭字符编码转换
local iconv = iconv.open("utf8", "ucs2be")
iconv.close(iconv)

```

---

