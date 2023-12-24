# xxtea - xxtea加密解密 

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air601` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3` {bdg-primary}`Air780E/Air700E` {bdg-primary}`Air780EP`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/xxtea/binding/luat_lib_xxtea.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


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

