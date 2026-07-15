# gmssl - 国密算法(SM2/SM3/SM4)

**示例**

```lua
-- 本库 支持 SM2 SM3 SM4 三个算法
-- 理论上可以扩展支持 SM9 算法
-- 不支持SM1, 因为那是硬件算法, 没有软件实现的

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
|boolean|标准版本,默认false. false-C1C3C2新国际, true-C1C2C3老国际. 仅"网站兼容模式"时有效|

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
|string|偏移量|

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
|string|偏移量|

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

## sm.sm2keygen()

SM2密钥生成

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|公钥X, HEX字符串|
|string|公钥Y, HEX字符串|
|string|私钥, HEX字符串|

**例子**

```lua
-- 本函数于2025.8.27新增
-- 注意返回值是HEX字符串, 传递给sm2系列函数可以直接使用
-- 如果传递给服务器, 按格式需要, 可能需要 fromHex 操作
local pkx, pky, private = gmssl.sm2keygen()
local originStr = "32wrniosadnfvnadsio;fasiow"
local encodeStr = gmssl.sm2encrypt(pkx,pky,originStr)
log.info("sm2默认模式", "加密后", encodeStr and  string.toHex(encodeStr))
if encodeStr then
    log.info("sm2默认模式", "解密后", gmssl.sm2decrypt(private,encodeStr))
end

-- 提醒, 生成的密钥对请妥善保管
-- 一定要看 gmssl.sm2encrypt 的文档和demo

```

---

## gmssl.sm2pointmul(k, px, py)

SM2标量点乘: R = k * P

**参数**

|传入值类型|解释|
|-|-|
|string|标量k, HEX字符串(64字符)|
|string|点P的x坐标, HEX字符串(64字符)|
|string|点P的y坐标, HEX字符串(64字符)|

**返回值**

|返回值类型|解释|
|-|-|
|string|结果点R的x坐标, HEX字符串(64字符)|
|string|结果点R的y坐标, HEX字符串(64字符)|

**例子**

```lua
-- 计算 R = k * P (核心用于 GBT 32918.3-2016 SM2密钥交换)
local rx, ry = gmssl.sm2pointmul(kHex, pxHex, pyHex)
-- 本函数于2026.02.02新增,用于支持SM2密钥交换协议

```

---

## gmssl.sm2ecdh(private, peerPx, peerPy)

SM2 ECDH密钥协商: S = d * P

**参数**

|传入值类型|解释|
|-|-|
|string|己方私钥, HEX字符串(64字符)|
|string|对方公钥X, HEX字符串(64字符)|
|string|对方公钥Y, HEX字符串(64字符)|

**返回值**

|返回值类型|解释|
|-|-|
|string|协商结果点的x坐标, HEX字符串(64字符)|
|string|协商结果点的y坐标, HEX字符串(64字符)|

**例子**

```lua
-- ECDH协商: 己方私钥 * 对方公钥
local sx, sy = gmssl.sm2ecdh(privateKey, peerPkx, peerPky)
-- 用于 GBT 32918.3-2016 SM2密钥交换协议
-- 本函数于2026.02.02新增

```

---

## gmssl.sm2pointadd(px1, py1, px2, py2)

SM2椭圆曲线点加运算: R = P + Q

**参数**

|传入值类型|解释|
|-|-|
|string|点P的x坐标, HEX字符串(64字符)|
|string|点P的y坐标, HEX字符串(64字符)|
|string|点Q的x坐标, HEX字符串(64字符)|
|string|点Q的y坐标, HEX字符串(64字符)|

**返回值**

|返回值类型|解释|
|-|-|
|string|结果点R的x坐标, HEX字符串(64字符), 失败返回nil|
|string|结果点R的y坐标, HEX字符串(64字符), 失败返回nil|

**例子**

```lua
-- 计算 R = P + Q (用于 GBT 32918.3-2016 SM2密钥交换协议的 [h*t]*(P+Q) 步骤)
local rx, ry = gmssl.sm2pointadd(px1, py1, px2, py2)
-- 本函数用于 SM2 密钥交换协议 GB/T 32918.3-2016

```

---

## gmssl.sm2pointisoncurve(px, py)

SM2判断点是否在椭圆曲线上

**参数**

|传入值类型|解释|
|-|-|
|string|点P的x坐标, HEX字符串(64字符)|
|string|点P的y坐标, HEX字符串(64字符)|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|点在曲线上返回true, 否则返回false|

**例子**

```lua
-- 用于 GBT 32918.3-2016 SM2密钥交换协议的公钥合法性校验
local ok = gmssl.sm2pointisoncurve(px, py)
-- 本函数用于 SM2 密钥交换协议, 协议要求校验对方临时公钥是否在曲线上

```

---

## gmssl.sm2bnadd(a, b)

SM2 GF(n)模加: r = (a + b) mod n

**参数**

|传入值类型|解释|
|-|-|
|string|操作数a, HEX字符串(64字符), 256-bit大整数|
|string|操作数b, HEX字符串(64字符), 256-bit大整数|

**返回值**

|返回值类型|解释|
|-|-|
|string|结果r, HEX字符串(64字符), (a+b) mod SM2曲线阶n|

**例子**

```lua
-- GBT 32918.3-2016 SM2密钥交换协议中的模n大数运算
local r = gmssl.sm2bnadd(aHex, bHex)

```

---

## gmssl.sm2bnmul(a, b)

SM2 GF(n)模乘: r = (a * b) mod n

**参数**

|传入值类型|解释|
|-|-|
|string|操作数a, HEX字符串(64字符), 256-bit大整数|
|string|操作数b, HEX字符串(64字符), 256-bit大整数|

**返回值**

|返回值类型|解释|
|-|-|
|string|结果r, HEX字符串(64字符), (a*b) mod SM2曲线阶n|

**例子**

```lua
-- GBT 32918.3-2016 SM2密钥交换协议中的模n大数运算
local r = gmssl.sm2bnmul(aHex, bHex)

```

---

