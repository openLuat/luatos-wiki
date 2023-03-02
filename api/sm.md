# sm - 国密算法

{bdg-success}`已适配` {bdg-primary}`Air780E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_sm.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看sm的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/sm)
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

无

**例子**

无

---

## sm.sm2decrypt(private,data)



sm2算法解密

**参数**

|传入值类型|解释|
|-|-|
|string|私钥,必选|
|string|待计算的数据,必选|

**返回值**

无

**例子**

无

---

## sm.sm3update(data)



流式sm3算法加密

**参数**

|传入值类型|解释|
|-|-|
|string|待计算的数据,必选|

**返回值**

无

**例子**

无

---

## sm.sm4encrypt(mode,padding,originStr,password)



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
local encodeStr = sm.sm4encrypt("ECB","ZERO",originStr,"1234567890123456")
print(originStr,"encrypt",string.toHex(encodeStr))
log.info("testsm.decrypt",sm.sm4decrypt("ECB","ZERO",encodeStr,"1234567890123456"))

originStr = "AES128 ECB Pkcs5Padding test"
--加密模式：ECB；填充方式：Pkcs5Padding；密钥：1234567890123456；密钥长度：128 bit
encodeStr = sm.sm4encrypt("ECB","PKCS5",originStr,"1234567890123456")
print(originStr,"encrypt",string.toHex(encodeStr))
log.info("testsm.decrypt",sm.sm4decrypt("ECB","PKCS5",encodeStr,"1234567890123456"))

originStr = "AES256 CBC Pkcs5Padding test"
--加密模式：CBC；填充方式：Pkcs5Padding；密钥：1234567890123456；密钥长度：256 bit；偏移量：1234567890666666
encodeStr = sm.sm4encrypt("CBC","PKCS5",originStr,"1234567890123456","1234567890666666")
print(originStr,"encrypt",string.toHex(encodeStr))
log.info("testsm.decrypt",sm.sm4decrypt("CBC","PKCS5",encodeStr,"1234567890123456","1234567890666666"))

```

---

## sm.sm4_decrypt(mode,padding,encodeStr,password)



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

无

---

