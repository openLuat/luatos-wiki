# rsa - RSA加密解密

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/rsa/binding/luat_lib_rsa.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

> 本库有专属demo，[点此链接查看rsa的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/rsa)

**示例**

```lua
-- 在电脑上生成私钥和公钥, 当前最高支持4096bit, 一般来说2048bit就够用了
-- openssl genrsa -out privkey.pem 2048
-- openssl rsa -in privkey.pem -pubout -out public.pem
-- privkey.pem 是解码用的, public.pem 是加密用的
-- public.pem 一般放在设备端,上传时加密用, 服务器端使用privkey.pem解密,当然这取决于你的业务需要.

local res = rsa.encrypt((io.readFile("/luadb/public.pem")), "abc")
-- 打印结果
log.info("rsa", "encrypt", res and #res or 0, res and res:toHex() or "")

-- 下面是解密, 通常不会在设备端进行, 这里主要是演示用法, 会很慢
if res then
    -- 读取私钥, 然后解码数据
    local dst = rsa.decrypt((io.readFile("/luadb/privkey.pem")), res, "")
    log.info("rsa", "decrypt", dst and #dst or 0, dst and dst:toHex() or "")
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

## rsa.encrypt(key, data, pwd)

RSA解密

**参数**

|传入值类型|解释|
|-|-|
|string|私钥数据,仅支持PEM格式|
|string|待解密数据|

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

