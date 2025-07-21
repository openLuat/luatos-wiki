# rsa - RSA加密解密

**示例**

```lua
-- 请在电脑上生成私钥和公钥, 当前最高支持4096bit, 一般来说2048bit就够用了
-- openssl genrsa -out privkey.pem 2048
-- openssl rsa -in privkey.pem -pubout -out public.pem
-- privkey.pem 是私钥, public.pem 是公钥
-- 私钥用于 加密 和 签名, 通常保密, 放在服务器端
-- 公钥用于 解密 和 验签, 一般可公开,放在设备端

-- 为了演示API使用, 这里把私钥也放在设备上

local res = rsa.encrypt((io.readFile("/luadb/public.pem")), "abc")
-- 打印结果
log.info("rsa", "encrypt", res and #res or 0, res and res:toHex() or "")

-- 下面是解密, 通常不会在设备端进行, 这里主要是演示用法, 会很慢
if res then
    -- 读取私钥, 然后解码数据
    local dst = rsa.decrypt((io.readFile("/luadb/privkey.pem")), res, "")
    log.info("rsa", "decrypt", dst and #dst or 0, dst and dst:toHex() or "")
end

-- 演示签名和验签
local hash = crypto.sha1("1234567890"):fromHex()
-- 签名通常很慢, 通常是服务器做
local sig = rsa.sign((io.readFile("/luadb/privkey.pem")), rsa.MD_SHA1, hash, "")
log.info("rsa", "sign", sig and #sig or 0, sig and sig:toHex() or "")
if sig then
    -- 验签是很快的
    local ret = rsa.verify((io.readFile("/luadb/public.pem")), rsa.MD_SHA1, hash, sig)
    log.info("rsa", "verify", ret)
end

```

## rsa.encrypt(key, data)

RSA加密

**参数**

|传入值类型|解释|
|-|-|
|string|公钥数据,仅支持PEM格式|
|string|待加密数据, 不能超过公钥位数的一半, 例如 2048bit的公钥, 只能加密128字节的数据|

**返回值**

|返回值类型|解释|
|-|-|
|string|加密成功后的数据,若失败会返回nil|

**例子**

```lua
-- 下面代码中的 "abc" 是待加密数据
local res = rsa.encrypt((io.readFile("/luadb/public.pem")), "abc")
-- 打印结果
log.info("rsa", "encrypt", res and #res or 0, res and res:toHex() or "")

```

---

## rsa.decrypt(key, data, pwd)

RSA解密

**参数**

|传入值类型|解释|
|-|-|
|string|私钥数据,仅支持PEM格式|
|string|待解密数据|
|string|私钥的密码,可选|

**返回值**

|返回值类型|解释|
|-|-|
|string|解密成功后的数据,若失败会返回nil|

**例子**

```lua
-- 注意, 解密通常很慢, 建议在服务器端进行
-- res 是待解密的数据
local dst = rsa.decrypt((io.readFile("/luadb/privkey.pem")), res, "")
log.info("rsa", "decrypt", dst and #dst or 0, dst and dst:toHex() or "")

```

---

## rsa.verify(key, md, hash, sig)

RSA验签

**参数**

|传入值类型|解释|
|-|-|
|string|公钥数据,仅支持PEM格式|
|int|签名模式, 例如 rsa.MD_SHA1 , rsa.MD_SHA256|
|string|hash数据, 如果是HEX字符串,记得fromHex转二进制数据|
|string|sig数据, 如果是HEX字符串,记得fromHex转二进制数据|

**返回值**

|返回值类型|解释|
|-|-|
|bool|有效返回true,否则为false,出错返回nil|

**例子**

```lua
local ret = rsa.verify((io.readFile("/luadb/public.pem")), rsa.MD_SHA1, hash, sig)
log.info("rsa", "verify", ret)

```

---

## rsa.sign(key, md, hash, pwd)

RSA签名

**参数**

|传入值类型|解释|
|-|-|
|string|私钥数据,仅支持PEM格式|
|int|签名模式, 例如 rsa.MD_SHA1 , rsa.MD_SHA256|
|string|hash数据, 如果是HEX字符串,记得fromHex转二进制数据|
|string|私钥密码, 可选|

**返回值**

|返回值类型|解释|
|-|-|
|string|成功返回sig数据, 否则返回nil|

**例子**

```lua
local sig = rsa.sign((io.readFile("/luadb/privkey.pem")), rsa.MD_SHA1, hash, "")
log.info("rsa", "sign", sig and #sig or 0, sig and sig:toHex() or "")

```

---

