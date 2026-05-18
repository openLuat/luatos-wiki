# crypto - 加解密和hash函数

## 常量

|常量|类型|解释|
|-|-|-|
|crypto.MD_MD5|int|MD5哈希类型常量,用于pk_sign/pk_verify|
|crypto.MD_SHA1|int|SHA1哈希类型常量,用于pk_sign/pk_verify|
|crypto.MD_SHA224|int|SHA224哈希类型常量,用于pk_sign/pk_verify|
|crypto.MD_SHA256|int|SHA256哈希类型常量,用于pk_sign/pk_verify|
|crypto.MD_SHA384|int|SHA384哈希类型常量,用于pk_sign/pk_verify|
|crypto.MD_SHA512|int|SHA512哈希类型常量,用于pk_sign/pk_verify|


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

## crypto.cipher_encrypt(type, padding, str, key, iv, tag)

对称加密

**参数**

|传入值类型|解释|
|-|-|
|string|算法名称, 例如 AES-128-ECB/AES-128-CBC, 可查阅crypto.cipher_list()|
|string|对齐方式, 支持PKCS7/ZERO/ONE_AND_ZEROS/ZEROS_AND_LEN/NONE|
|string|需要加密的数据|
|string|密钥,需要对应算法的密钥长度|
|string|IV值, 非ECB算法需要|
|string|GCM模式下的tag, 可选参数, 不传则不检查tag|

**返回值**

|返回值类型|解释|
|-|-|
|string|加密后的字符串|
|string|GCM模式下的tag值, 可选返回|

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
|string|算法名称, 例如 AES-128-ECB/AES-128-CBC, 可查阅crypto.cipher_list()|
|string|对齐方式, 支持PKCS7/ZERO/ONE_AND_ZEROS/ZEROS_AND_LEN/NONE|
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

## crypto.crc16(method, data, poly, initial, finally, inReversem, outReverse)

计算CRC16

**参数**

|传入值类型|解释|
|-|-|
|string|CRC16模式（"IBM","MAXIM","USB","MODBUS","CCITT","CCITT-FALSE","X25","XMODEM","DNP","USER-DEFINED"）|
|string|字符串或者zbuff对象|
|int|poly值,默认0x0000,范围0-0xFFFF|
|int|initial值,默认0x0000,范围0-0xFFFF|
|int|finally值,默认0x0000,范围0-0xFFFF|
|int|输入反转,1反转,默认0不反转|
|int|输出反转,1反转,默认0不反转|

**返回值**

|返回值类型|解释|
|-|-|
|int|对应的CRC16值|

**例子**

```lua
-- 计算字符串的CRC16
local crc = crypto.crc16("dfadfasfdsafdasf")
-- 使用zbuff时,会计算used之后的全部数据,建议使用前seek(0)
local zbuff = zbuff.create("dfadfasfdsafdasf")
zbuff:seek(0)
crc = crypto.crc16(zbuff)

```

---

## crypto.crc16_modbus(data, start)

直接计算modbus的crc16值

**参数**

|传入值类型|解释|
|-|-|
|string|数据|
|int|初始化值,默认0xFFFF|

**返回值**

|返回值类型|解释|
|-|-|
|int|对应的CRC16值|

**例子**

```lua
-- 计算CRC16 modbus
local crc = crypto.crc16_modbus(data)
-- 2023.11.06 新增初始值设置
crc = crypto.crc16_modbus(data, 0xFFFF)

```

---

## crypto.crc32(data, start, poly, endv)

计算crc32值

**参数**

|传入值类型|解释|
|-|-|
|string|数据|
|int|初始化值,默认0xFFFFFFFF|
|int|crc多项式，可选，默认0x04C11DB7|
|int|结束值,可选，默认0xFFFFFFFF，计算结果异或结束值才是最终输出值|

**返回值**

|返回值类型|解释|
|-|-|
|int|对应的CRC32值|

**例子**

```lua
-- 计算CRC32
local crc = crypto.crc32(data)
-- start和poly可选, 是 2025.4.14 新增的参数
local crc = crypto.crc32(data, 0xFFFFFFFF, 0x04C11DB7, 0xFFFFFFFF) --等同于crypto.crc32(data)

```

---

## crypto.crc8(data, poly, start, revert)

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

## crypto.crc7(data, poly, start)

计算crc7值

**参数**

|传入值类型|解释|
|-|-|
|string|数据|
|int|crc多项式，可选，默认0xE5|
|int|crc初始值，可选，默认0x00|

**返回值**

|返回值类型|解释|
|-|-|
|int|对应的CRC7值|

**例子**

```lua
-- 计算CRC7, 本API于2023.10.07新增
local crc = crypto.crc7(data)
local crc = crypto.crc7(data, 0x31, 0xff)

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

## crypto.md(tp, data, hmac)

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

## crypto.hash_init(tp, hmac)

创建流式hash用的stream

**参数**

|传入值类型|解释|
|-|-|
|string|hash类型, 大写字母, 例如 "MD5" "SHA1" "SHA256"|
|string|hmac值，可选|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|成功返回一个数据结构,否则返回nil|

**例子**

```lua
-- 无hmac的hash stream
local md5_stream = crypto.hash_init("MD5")
local sha1_stream = crypto.hash_init("SHA1")
local sha256_stream = crypto.hash_init("SHA256")

-- 带hmac的hash stream
local md5_stream = crypto.hash_init("MD5", "123456")
local sha1_stream = crypto.hash_init("SHA1", "123456")
local sha256_stream = crypto.hash_init("SHA256", "123456")

```

---

## crypto.hash_update(stream, data)

流式hash更新数据

**参数**

|传入值类型|解释|
|-|-|
|userdata|crypto.hash_init()创建的stream, 必选|
|string|待计算的数据,必选|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
crypto.hash_update(stream, "OK")

```

---

## crypto.hash_finish(stream)

获取流式hash校验值并释放创建的stream

**参数**

|传入值类型|解释|
|-|-|
|userdata|crypto.hash_init()创建的stream,必选|

**返回值**

|返回值类型|解释|
|-|-|
|string|成功返回计算得出的流式hash值的hex字符串，失败无返回|

**例子**

```lua
local hashResult = crypto.hash_finish(stream)

```

---

## crypto.checksum(data, mode)

计算checksum校验和

**参数**

|传入值类型|解释|
|-|-|
|string|待计算的数据,必选|
|int|模式,累加模式, 0 - 异或, 1 - 累加, 默认为0|

**返回值**

|返回值类型|解释|
|-|-|
|int|checksum值,校验和|

**例子**

```lua
-- 本函数在 2022.12.28 添加
-- 单纯计算checksum值
local ck = crypto.checksum("OK")
log.info("checksum", "ok", string.format("%02X", ck))
-- 第二个参数mode在2023.5.23日添加

```

---

## crypto.crc_file(mode, path, ...)

计算文件的CRC校验值

**参数**

|传入值类型|解释|
|-|-|
|string|CRC模式, "crc32" 计算crc32, "crc8" 计算crc8, "crc16_modbus" 计算modbus crc16, 其他值作为crc16的method参数(IBM/MAXIM/USB/MODBUS/CCITT/CCITT-FALSE/X25/XMODEM/DNP/USER-DEFINED)|
|string|文件路径|

**返回值**

|返回值类型|解释|
|-|-|
|int|CRC值,若文件不存在则无返回值|

**例子**

```lua
-- 计算文件的CRC32
local crc = crypto.crc_file("crc32", "/luadb/test.bin")
-- 计算文件的CRC32,自定义参数
local crc = crypto.crc_file("crc32", "/luadb/test.bin", 0xFFFFFFFF, 0x04C11DB7, 0xFFFFFFFF)
-- 计算文件的CRC16 MODBUS
local crc = crypto.crc_file("crc16_modbus", "/luadb/test.bin")
-- 计算文件的CRC16 IBM
local crc = crypto.crc_file("IBM", "/luadb/test.bin")
-- 计算文件的CRC8
local crc = crypto.crc_file("crc8", "/luadb/test.bin")

```

---

## crypto.pk_sign(md_type, hash, privkey, password)

使用非对称密钥签名 (RSA/EC 等, 自动识别密钥类型)

**参数**

|传入值类型|解释|
|-|-|
|int|hash算法类型常量, 例如 crypto.MD_SHA256|
|string|待签名的hash原始字节(非hex), 长度须与hash算法输出匹配|
|string|私钥数据, 支持PEM格式(-----BEGIN...)和DER二进制两种|
|string|私钥密码, 可选, 默认为空|

**返回值**

|返回值类型|解释|
|-|-|
|string|签名结果(原始字节), 失败返回nil|

**例子**

```lua
-- RSA 签名示例
local hash = crypto.sha256("hello world"):fromHex()
local sig = crypto.pk_sign(crypto.MD_SHA256, hash, privkey_pem)
log.info("pk", "sign len", sig and #sig or 0)

-- EC 签名示例 (公钥为 SPKI 格式 "-----BEGIN PUBLIC KEY-----")
local hash = crypto.sha256("hello world"):fromHex()
local sig = crypto.pk_sign(crypto.MD_SHA256, hash, ec_privkey_pem)
log.info("pk", "ec sign len", sig and #sig or 0)

```

---

## crypto.pk_verify(md_type, hash, pubkey, signature)

使用非对称公钥验签 (RSA/EC 等, 自动识别密钥类型)

**参数**

|传入值类型|解释|
|-|-|
|int|hash算法类型常量, 例如 crypto.MD_SHA256|
|string|待验证的hash原始字节(非hex)|
|string|公钥数据, 支持PEM格式(-----BEGIN...)和DER二进制两种|

**返回值**

无

**例子**

无

---

## crypto.pk_type(key, is_private)

获取密钥类型字符串

**参数**

|传入值类型|解释|
|-|-|
|string|密钥数据, 支持PEM格式和DER二进制格式|
|boolean|是否为私钥, true=私钥, false/nil=公钥|

**返回值**

|返回值类型|解释|
|-|-|
|string|类型字符串("rsa"/"ec"/"ecdsa"/"ec_dh"等), 解析失败返回nil|

**例子**

```lua
local ktype = crypto.pk_type(pubkey_pem)            -- 公钥
local ktype = crypto.pk_type(privkey_pem, true)     -- 私钥
log.info("pk", "key type", ktype)

```

---

