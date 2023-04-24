# bit64 - 32位系统上对64位数据的基本算术运算和逻辑运算

{bdg-success}`已适配` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_bit64.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看bit64的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/bit64)
```

## bit64.to32(data64bit)



64bit数据转成32bit输出

**参数**

|传入值类型|解释|
|-|-|
|string|9字节数据|

**返回值**

|返回值类型|解释|
|-|-|
|any|根据64bit数据输出int或者number|

**例子**

无

---

## bit64.to64(data32bit)



32bit数据转成64bit数据

**参数**

|传入值类型|解释|
|-|-|
|int/number|32bit数据|

**返回值**

|返回值类型|解释|
|-|-|
|string|9字节数据|

**例子**

无

---

## bit64.show(a,type,flag)



64bit数据格式化打印成字符串，用于显示值

**参数**

|传入值类型|解释|
|-|-|
|string|需要打印的64bit数据|
|int|进制，10=10进制，16=16进制，默认10，只支持10或者16|
|boolean|整形是否按照无符号方式打印，true是，false不是，默认false，浮点忽略|

**返回值**

|返回值类型|解释|
|-|-|
|string|可以打印的值|

**例子**

无

---

## bit64.plus(a,b,flag1,flag2)



64bit数据加,a+b,a和b中有一个为浮点，则按照浮点运算

**参数**

|传入值类型|解释|
|-|-|
|string|a|
|string/int/number|b|
|boolean|整形运算时是否按照无符号方式，true是，false不是，默认false，浮点运算忽略|
|boolean|浮点运算结果是否要强制转成整数，true是，false不是，默认false，整形运算忽略|

**返回值**

|返回值类型|解释|
|-|-|
|string|9字节数据|

**例子**

无

---

## bit64.minus(a,b,flag1,flag2)



64bit数据减,a-b,a和b中有一个为浮点，则按照浮点运算

**参数**

|传入值类型|解释|
|-|-|
|string|a|
|string/int/number|b|
|boolean|整形运算时是否按照无符号方式，true是，false不是，默认false，浮点运算忽略|
|boolean|浮点运算结果是否要强制转成整数，true是，false不是，默认false，整形运算忽略|

**返回值**

|返回值类型|解释|
|-|-|
|string|9字节数据|

**例子**

无

---

## bit64.mult(a,b,flag1,flag2)



64bit数据乘,a*b,a和b中有一个为浮点，则按照浮点运算

**参数**

|传入值类型|解释|
|-|-|
|string|a|
|string/int/number|b|
|boolean|整形运算时是否按照无符号方式，true是，false不是，默认false，浮点运算忽略|
|boolean|浮点运算结果是否要强制转成整数，true是，false不是，默认false，整形运算忽略|

**返回值**

|返回值类型|解释|
|-|-|
|string|9字节数据|

**例子**

无

---

## bit64.pide(a,b,flag1,flag2)



64bit数据除,a/b,a和b中有一个为浮点，则按照浮点运算

**参数**

|传入值类型|解释|
|-|-|
|string|a|
|string/int/number|b|
|boolean|整形运算时是否按照无符号方式，true是，false不是，默认false，浮点运算忽略|
|boolean|浮点运算结果是否要强制转成整数，true是，false不是，默认false，整形运算忽略|

**返回值**

|返回值类型|解释|
|-|-|
|string|9字节数据|

**例子**

无

---

## bit64.shift(a,b,flag)



64bit数据位移 a>>b 或者 a<<b

**参数**

|传入值类型|解释|
|-|-|
|string|a|
|int|b|
|boolean|位移方向，true左移<<，false右移>>，默认false|

**返回值**

|返回值类型|解释|
|-|-|
|string|9字节数据|

**例子**

无

---

