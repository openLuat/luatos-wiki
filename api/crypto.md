# crypto - 加解密和hash函数

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_crypto.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

> 本库有专属demo，[点此链接查看crypto的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/crypto)

## crypto.md5(str)

计算md5值

**参数**

|传入值类型|解释|
|-|-|
|string|需要计算的字符串|

**返回值**

|返回值类型|解释|
|-|-|
|string|计算得出的md5值的hex字符串|

**例子**

```lua
-- 计算字符串"abc"的md5
log.info("md5", crypto.md5("abc"))

```

---

## crypto.hmac_md5(str, key)

计算hmac_md5值

**参数**

|传入值类型|解释|
|-|-|
|string|需要计算的字符串|
|string|密钥|

**返回值**

|返回值类型|解释|
|-|-|
|string|计算得出的hmac_md5值的hex字符串|

**例子**

```lua
-- 计算字符串"abc"的hmac_md5
log.info("hmac_md5", crypto.hmac_md5("abc", "1234567890"))

```

---

## crypto.sha1(str)

计算sha1值

**参数**

|传入值类型|解释|
|-|-|
|string|需要计算的字符串|

**返回值**

|返回值类型|解释|
|-|-|
|string|计算得出的sha1值的hex字符串|

**例子**

```lua
-- 计算字符串"abc"的sha1
log.info("sha1", crypto.sha1("abc"))

```

---

## crypto.hmac_sha1(str, key)

计算hmac_sha1值

**参数**

|传入值类型|解释|
|-|-|
|string|需要计算的字符串|
|string|密钥|

**返回值**

|返回值类型|解释|
|-|-|
|string|计算得出的hmac_sha1值的hex字符串|

**例子**

```lua
-- 计算字符串"abc"的hmac_sha1
log.info("hmac_sha1", crypto.hmac_sha1("abc", "1234567890"))

```

---

## crypto.sha256(str)

计算sha256值

**参数**

|传入值类型|解释|
|-|-|
|string|需要计算的字符串|

**返回值**

|返回值类型|解释|
|-|-|
|string|计算得出的sha256值的hex字符串|

**例子**

```lua
-- 计算字符串"abc"的sha256
log.info("sha256", crypto.sha256("abc"))

```

---

## crypto.hmac_sha256(str, key)

计算hmac_sha256值

**参数**

|传入值类型|解释|
|-|-|
|string|需要计算的字符串|
|string|密钥|

**返回值**

|返回值类型|解释|
|-|-|
|string|计算得出的hmac_sha256值的hex字符串|

**例子**

```lua
-- 计算字符串"abc"的hmac_sha256
log.info("hmac_sha256", crypto.hmac_sha256("abc", "1234567890"))

```

---

## crypto.sha512(str)

计算sha512值

**参数**

|传入值类型|解释|
|-|-|
|string|需要计算的字符串|

**返回值**

|返回值类型|解释|
|-|-|
|string|计算得出的sha512值的hex字符串|

**例子**

```lua
-- 计算字符串"abc"的sha512
log.info("sha512", crypto.sha512("abc"))

```

---

## crypto.hmac_sha512(str, key)

计算hmac_sha512值

**参数**

|传入值类型|解释|
|-|-|
|string|需要计算的字符串|
|string|密钥|

**返回值**

|返回值类型|解释|
|-|-|
|string|计算得出的hmac_sha512值的hex字符串|

**例子**

```lua
-- 计算字符串"abc"的hmac_sha512
log.info("hmac_sha512", crypto.hmac_sha512("abc", "1234567890"))

```

---

## crypto.cipher_encrypt(type, padding, str, key, iv)

对称加密

**参数**

|传入值类型|解释|
|-|-|
|string|算法名称, 例如 AES-128-ECB/AES-128-CBC, 可查阅mbedtls的cipher_wrap.c|
|string|对齐方式, 当前仅支持PKCS7|
|string|需要加密的数据|
|string|密钥,需要对应算法的密钥长度|
|string|IV值, 非ECB算法需要|

**返回值**

|返回值类型|解释|
|-|-|
|string|加密后的字符串|

**例子**

```lua
-- 计算AES
local data = crypto.cipher_encrypt("AES-128-ECB", "PKCS7", "1234567890123456", "1234567890123456")
local data2 = crypto.cipher_encrypt("AES-128-CBC", "PKCS7", "1234567890123456", "1234567890123456", "1234567890666666")

```

---

## crypto.cipher_decrypt(type, padding, str, key, iv)

对称解密

**参数**

|传入值类型|解释|
|-|-|
|string|算法名称, 例如 AES-128-ECB/AES-128-CBC, 可查阅mbedtls的cipher_wrap.c|
|string|对齐方式, 当前仅支持PKCS7|
|string|需要解密的数据|
|string|密钥,需要对应算法的密钥长度|
|string|IV值, 非ECB算法需要|

**返回值**

|返回值类型|解释|
|-|-|
|string|解密后的字符串|

**例子**

```lua
-- 用AES加密,然后用AES解密
local data = crypto.cipher_encrypt("AES-128-ECB", "PKCS7", "1234567890123456", "1234567890123456")
local data2 = crypto.cipher_decrypt("AES-128-ECB", "PKCS7", data, "1234567890123456")
-- data的hex为 757CCD0CDC5C90EADBEEECF638DD0000
-- data2的值为 1234567890123456

```

---

## crypto.crc16(method, data, poly, initial, finally, inReversem outReverse)

计算CRC16

**参数**

|传入值类型|解释|
|-|-|
|string|CRC16模式（"IBM","MAXIM","USB","MODBUS","CCITT","CCITT-FALSE","X25","XMODEM","DNP","USER-DEFINED"）|
|string|字符串|
|int|poly值|
|int|initial值|
|int|finally值|
|int|输入反转,1反转,默认0不反转|
|int|输入反转,1反转,默认0不反转|

**返回值**

|返回值类型|解释|
|-|-|
|int|对应的CRC16值|

**例子**

```lua
-- 计算CRC16
local crc = crypto.crc16("")

```

---

## crypto.crc16_modbus(data)

直接计算modbus的crc16值

**参数**

|传入值类型|解释|
|-|-|
|string|数据|

**返回值**

|返回值类型|解释|
|-|-|
|int|对应的CRC16值|

**例子**

```lua
-- 计算CRC16 modbus
local crc = crypto.crc16_modbus(data)

```

---

## crypto.crc32(data)

计算crc32值

**参数**

|传入值类型|解释|
|-|-|
|string|数据|

**返回值**

|返回值类型|解释|
|-|-|
|int|对应的CRC32值|

**例子**

```lua
-- 计算CRC32
local crc = crypto.crc32(data)

```

---

## crypto.crc8(data)

计算crc8值

**参数**

|传入值类型|解释|
|-|-|
|string|数据|
|int|crc多项式，可选，如果不写，将忽略除了数据外所有参数|
|int|crc初始值，可选，默认0|
|boolean|是否需要逆序处理，默认否|

**返回值**

|返回值类型|解释|
|-|-|
|int|对应的CRC8值|

**例子**

```lua
-- 计算CRC8
local crc = crypto.crc8(data)
local crc = crypto.crc8(data, 0x31, 0xff, false)

```

---

## crypto.trng(len)

生成真随机数

**参数**

|传入值类型|解释|
|-|-|
|int|数据长度|

**返回值**

|返回值类型|解释|
|-|-|
|string|指定随机数字符串|

**例子**

```lua
-- 生成32位随机数ir
local r = crypto.trng(4)
local _, ir = pack.unpack(r, "I")

```

---

## crypto.totp(secret,time)

计算TOTP动态密码的结果

**参数**

|传入值类型|解释|
|-|-|
|string|网站提供的密钥（就是BASE32编码后的结果）|
|int|可选，时间戳，默认当前时间|

**返回值**

|返回值类型|解释|
|-|-|
|int|计算得出的六位数结果 计算失败返回nil|

**例子**

```lua
--使用当前系统时间计算
local otp = crypto.totp("asdfassdfasdfass")

```

---

## crypto.base64_encode(data)

将数据进行base64编码

**参数**

|传入值类型|解释|
|-|-|
|string|待编码的数据|

**返回值**

|返回值类型|解释|
|-|-|
|string|编码后的数据|

**例子**

```lua
-- 本函数与 string.toBase64 是同一个
local data = "123"
local bdata = crypto.base64_encode(data)
log.info("base64", "encode", data, bdata)
data = crypto.base64_decode(data)
log.info("base64", "decode", data, bdata)

```

---

## crypto.base64_decode(data)

将数据进行base64解码

**参数**

|传入值类型|解释|
|-|-|
|string|待解码的数据|

**返回值**

|返回值类型|解释|
|-|-|
|string|解码后的数据|

**例子**

```lua
-- 本函数与 string.fromBase64 是同一个
local data = "123"
local bdata = crypto.base64_encode(data)
log.info("base64", "encode", data, bdata)
data = crypto.base64_decode(data)
log.info("base64", "decode", data, bdata)

```

---

## crypto.cipher_list()

获取当前固件支持的cipher列表

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|本固件支持的cipher列表,字符串数组|

**例子**

```lua
-- 本API于2022.07.27添加
local ciphers = crypto.cipher_list()
if ciphers then
    log.info("crypto", "ciphers list", json.encode(ciphers))
end

```

---

## crypto.cipher_suites()

获取当前固件支持的cipher suites列表

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|本固件支持的cipher suites列表,字符串数组|

**例子**

```lua
-- 本API于2022.11.16添加
local suites = crypto.cipher_suites()
if suites then
    log.info("crypto", "ciphers suites", json.encode(suites))
end

```

---

## crypto.md_file(tp, path, hmac)

计算文件的hash值(md5/sha1/sha256及hmac形式)

**参数**

|传入值类型|解释|
|-|-|
|string|hash类型, 大小字母, 例如 "MD5" "SHA1" "SHA256"|
|string|文件路径, 例如 /luadb/logo.jpg|
|string|hmac值,可选|

**返回值**

|返回值类型|解释|
|-|-|
|string|HEX过的hash值,若失败会无返回值|

**例子**

```lua

-- 无hmac的hash值
log.info("md5", crypto.md_file("MD5", "/luadb/logo.jpg"))
log.info("sha1", crypto.md_file("SHA1", "/luadb/logo.jpg"))
log.info("sha256", crypto.md_file("SHA256", "/luadb/logo.jpg"))

-- 带hmac的hash值
log.info("hmac_md5", crypto.md_file("MD5", "/luadb/logo.jpg", "123456"))
log.info("hmac_sha1", crypto.md_file("SHA1", "/luadb/logo.jpg", "123456"))
log.info("hmac_sha256", crypto.md_file("SHA256", "/luadb/logo.jpg", "123456"))

```

---

## crypto.md_file(tp, data, hmac)

计算数据的hash值(md5/sha1/sha256及hmac形式)

**参数**

|传入值类型|解释|
|-|-|
|string|hash类型, 大小字母, 例如 "MD5" "SHA1" "SHA256"|
|string|待处理的数据|
|string|hmac值,可选|

**返回值**

|返回值类型|解释|
|-|-|
|string|HEX过的hash值,若失败会无返回值|

**例子**

```lua

-- 无hmac的hash值
log.info("md5", crypto.md("MD5", "1234567890"))
log.info("sha1", crypto.md("SHA1", "1234567890"))
log.info("sha256", crypto.md("SHA256", "1234567890"))

-- 带hmac的hash值
log.info("hmac_md5", crypto.md("MD5", "1234567890", "123456"))
log.info("hmac_sha1", crypto.md("SHA1", "1234567890", "123456"))
log.info("hmac_sha256", crypto.md("SHA256", "1234567890", "123456"))

```

---

