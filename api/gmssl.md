# gmssl - 国密算法

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air601` {bdg-primary}`Air105` {bdg-primary}`Air780E/Air700E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/gmssl/bind/luat_lib_gmssl.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看gmssl的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/gmssl)
```

## sm.sm2encrypt(pkx,pky,data, mode, mode2)



sm2算法加密

**参数**

|传入值类型|解释|
|-|-|
|string|公钥x,必选. HEX字符串|
|string|公钥y,必选. HEX字符串|
|string|待计算的数据,必选,最长32字节, 非HEX字符串|
|boolean|输出模式,默认false. false-GMSSL默认格式DER, true-网站兼容模式|
|boolean|标准版本,默认false. false-C1C3C2新国际, true-C1C2C3老国际|

**返回值**

|返回值类型|解释|
|-|-|
|string|加密后的字符串, 原样输出,未经HEX转换. 若加密失败会返回nil或空字符串|

**例子**

```lua
-- 提示 mode/mode2 参数是 2023.10.17 新增
-- 由于SM2在各平台的实现都有差异,用法务必参考demo

```

---

## sm.sm2decrypt(private,data,mode,mode2)



sm2算法解密

**参数**

|传入值类型|解释|
|-|-|
|string|私钥,必选,HEX字符串|
|string|待计算的数据,必选,原始数据,非HEX字符串|
|boolean|输出模式,默认false. false-GMSSL默认格式DER, true-网站兼容模式|
|boolean|标准版本,默认false. false-C1C3C2新国际, true-C1C2C3老国际|

**返回值**

|返回值类型|解释|
|-|-|
|string|解密后的字符串,未经HEX转换.若解密失败会返回nil或空字符串|

**例子**

```lua
-- 提示 mode/mode2 参数是 2023.10.17 新增
-- 由于SM2在各平台的实现都有差异,用法务必参考demo

```

---

## sm.sm3(data)



sm3算法,算HASH值

**参数**

|传入值类型|解释|
|-|-|
|string|待计算的数据,必选|

**返回值**

|返回值类型|解释|
|-|-|
|string|对应的hash值|

**例子**

```lua
local encodeStr = gmssl.sm3("lqlq666lqlq946")
log.info("testsm.sm3update",string.toHex(encodeStr))

```

---

## sm.sm3hmac(data, key)



sm3算法,算HASH值,但带HMAC

**参数**

|传入值类型|解释|
|-|-|
|string|待计算的数据,必选|
|string|密钥|

**返回值**

|返回值类型|解释|
|-|-|
|string|对应的hash值|

**例子**

```lua
local encodeStr = gmssl.sm3hmac("lqlq666lqlq946", "123")
log.info("testsm.sm3update",string.toHex(encodeStr))

```

---

## gmssl.sm4encrypt(mode,padding,originStr,password)



SM4加密算法

**参数**

|传入值类型|解释|
|-|-|
|string|加密模式, CBC或ECB   |
|string|填充方式, NONE/ZERO/PKCS5/PKCS7|
|string|加密的字符串|
|string|密钥|

**返回值**

|返回值类型|解释|
|-|-|
|string|加密后的数据|

**例子**

```lua
local originStr = "SM4 ECB ZeroPadding test"
--加密模式：ECB；填充方式：ZeroPadding；密钥：1234567890123456；密钥长度：128 bit
local encodeStr = gmssl.sm4encrypt("ECB","ZERO",originStr,"1234567890123456")
print(originStr,"encrypt",string.toHex(encodeStr))
log.info("testsm.decrypt",gmssl.sm4decrypt("ECB","ZERO",encodeStr,"1234567890123456"))

originStr = "SM4 ECB Pkcs5Padding test"
--加密模式：ECB；填充方式：Pkcs5Padding；密钥：1234567890123456；密钥长度：128 bit
encodeStr = gmssl.sm4encrypt("ECB","PKCS5",originStr,"1234567890123456")
print(originStr,"encrypt",string.toHex(encodeStr))
log.info("testsm.decrypt",gmssl.sm4decrypt("ECB","PKCS5",encodeStr,"1234567890123456"))

originStr = "SM4 CBC Pkcs5Padding test"
--加密模式：CBC；填充方式：Pkcs5Padding；密钥：1234567890123456；密钥长度：256 bit；偏移量：1234567890666666
encodeStr = gmssl.sm4encrypt("CBC","PKCS5",originStr,"1234567890123456","1234567890666666")
print(originStr,"encrypt",string.toHex(encodeStr))
log.info("testsm.decrypt",gmssl.sm4decrypt("CBC","PKCS5",encodeStr,"1234567890123456","1234567890666666"))

```

---

## gmssl.sm4decrypt(mode,padding,encodeStr,password)



SM4解密算法

**参数**

|传入值类型|解释|
|-|-|
|string|加密模式, CBC或ECB   |
|string|填充方式, NONE/ZERO/PKCS5/PKCS7|
|string|已加密的字符串|
|string|密钥|

**返回值**

|返回值类型|解释|
|-|-|
|string|解密的字符串|

**例子**

```lua
-- 参考gmssl.sm4encrypt

```

---

## sm.sm2sign(private,data,id)



sm2算法签名

**参数**

|传入值类型|解释|
|-|-|
|string|私钥,必选,HEX字符串|
|string|待计算的数据,必选,原始数据,非HEX字符串|
|string|id值,非HEX字符串,可选,默认值"1234567812345678"|

**返回值**

|返回值类型|解释|
|-|-|
|string|前面字符串,未经HEX转换.若签名失败会返回nil|

**例子**

```lua
-- 本API于 2023.10.19 新增
-- 具体用法请查阅demo

```

---

## sm.sm2verify(pkx, pky, data, id, sig)



sm2算法验签

**参数**

|传入值类型|解释|
|-|-|
|string|公钥X,必选,HEX字符串|
|string|公钥Y,必选,HEX字符串|
|string|待计算的数据,必选,原始数据,非HEX字符串|
|string|id值,非HEX字符串,可选,默认值"1234567812345678"|
|string|签名数据,必须64字节,非HEX字符串|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|验证成功返回true,否则返回nil|

**例子**

```lua
-- 本API于 2023.10.19 新增
-- 具体用法请查阅demo

```

---

