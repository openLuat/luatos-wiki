# gmssl - 国密算法

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`Air780E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/gmssl/src/luat_lib_gmssl.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看gmssl的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/gmssl)
```

## sm.sm2encrypt(pkx,pky,rand,data)



sm2算法加密

**参数**

|传入值类型|解释|
|-|-|
|string|公钥x,必选|
|string|公钥y,必选|
|string|随机数,必选|
|string|待计算的数据,必选|

**返回值**

|返回值类型|解释|
|-|-|
|string|加密后的字符串, 原样输出,未经HEX转换|

**例子**

```lua
local originStr = "encryption standard"
local pkx = "435B39CCA8F3B508C1488AFC67BE491A0F7BA07E581A0E4849A5CF70628A7E0A"
local pky = "75DDBA78F15FEECB4C7895E2C1CDF5FE01DEBB2CDBADF45399CCF77BBA076A42"
local private = "1649AB77A00637BD5E2EFE283FBF353534AA7F7CB89463F208DDBC2920BB0DA0"
local rand = "4C62EEFD6ECFC2B95B92FD6C3D9575148AFA17425546D49018E5388D49DD7B4F"
local encodeStr = gmssl.sm2encrypt(pkx,pky,rand,originStr)
print(originStr,"encrypt",string.toHex(encodeStr))
log.info("testsm.sm2decrypt",gmssl.sm2decrypt(private,encodeStr))

```

---

## sm.sm2decrypt(private,data)



sm2算法解密

**参数**

|传入值类型|解释|
|-|-|
|string|私钥,必选|
|string|待计算的数据,必选|

**返回值**

|返回值类型|解释|
|-|-|
|string|解密后的字符串,未经HEX转换|

**例子**

```lua
local originStr = "encryption standard"
local pkx = "435B39CCA8F3B508C1488AFC67BE491A0F7BA07E581A0E4849A5CF70628A7E0A"
local pky = "75DDBA78F15FEECB4C7895E2C1CDF5FE01DEBB2CDBADF45399CCF77BBA076A42"
local private = "1649AB77A00637BD5E2EFE283FBF353534AA7F7CB89463F208DDBC2920BB0DA0"
local rand = "4C62EEFD6ECFC2B95B92FD6C3D9575148AFA17425546D49018E5388D49DD7B4F"
local encodeStr = gmssl.sm2encrypt(pkx,pky,rand,originStr)
print(originStr,"encrypt",string.toHex(encodeStr))
log.info("testsm.sm2decrypt",gmssl.sm2decrypt(private,encodeStr))

```

---

## sm.sm3update(data)



流式sm3算法加密

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
local encodeStr = gmssl.sm3update("lqlq666lqlq946")
log.info("testsm.sm3update",string.toHex(encodeStr))

```

---

## gmssl.sm4encrypt(mode,padding,originStr,password)



SM4加密算法

**参数**

|传入值类型|解释|
|-|-|
|number|加密模式   |
|number|填充方式 |
|string|加密的字符串|
|string|密钥|

**返回值**

|返回值类型|解释|
|-|-|
|string|加密后的数据|

**例子**

```lua
local originStr = "AES128 ECB ZeroPadding test"
--加密模式：ECB；填充方式：ZeroPadding；密钥：1234567890123456；密钥长度：128 bit
local encodeStr = gmssl.sm4encrypt("ECB","ZERO",originStr,"1234567890123456")
print(originStr,"encrypt",string.toHex(encodeStr))
log.info("testsm.decrypt",gmssl.sm4decrypt("ECB","ZERO",encodeStr,"1234567890123456"))

originStr = "AES128 ECB Pkcs5Padding test"
--加密模式：ECB；填充方式：Pkcs5Padding；密钥：1234567890123456；密钥长度：128 bit
encodeStr = gmssl.sm4encrypt("ECB","PKCS5",originStr,"1234567890123456")
print(originStr,"encrypt",string.toHex(encodeStr))
log.info("testsm.decrypt",gmssl.sm4decrypt("ECB","PKCS5",encodeStr,"1234567890123456"))

originStr = "AES256 CBC Pkcs5Padding test"
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
|number|加密模式   |
|number|填充方式 |
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

