# xxtea - xxtea加密解密 

**示例**

```lua
-- 本库是对 https://github.com/xxtea/xxtea-c 的封装, 再次感谢xxtea的作者

local text = "Hello World!"
local key = "07946"
local encrypt_data = xxtea.encrypt(text, key)
log.info("testCrypto.xxteaTest","xxtea_encrypt:"..encrypt_data)
local decrypt_data = xxtea.decrypt(encrypt_data, key)
log.info("testCrypto.xxteaTest","decrypt_data:"..decrypt_data)

```

## xxtea.encrypt(data, key)

加密

**参数**

|传入值类型|解释|
|-|-|
|string|data 待加密的数据|
|string|key 加密用的密钥|

**返回值**

|返回值类型|解释|
|-|-|
|string|加密后的数据, 失败返回nil|

**例子**

无

---

## xxtea.decrypt(data, key)

解密

**参数**

|传入值类型|解释|
|-|-|
|string|data 待解密的数据|
|string|key 解密用的密钥|

**返回值**

|返回值类型|解释|
|-|-|
|string|解密后的数据, 失败返回nil|

**例子**

无

---

