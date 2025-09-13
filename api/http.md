# http - http 客户端

**示例**

```lua
-- 支持  http 1.0 和 http 1.1, 不支持http2.0
-- 支持 GET/POST/PUT/DELETE/HEAD 等常用方法
-- http 客户端示例, 详细示例请参考demo
sys.taskInit(function()
    sys.wait(1000)
    local code,headers,body = http.request("GET", "http://www.example.com/abc").wait()
    log.info("http", code, body)
end)


```

## http.request(method,url,headers,body,opts,ca_file,client_ca, client_key, client_password)

http客户端

**参数**

|传入值类型|解释|
|-|-|
|string|请求方法, 支持 GET/POST 等合法的HTTP方法|
|string|url地址, 支持 http和https, 支持域名, 支持自定义端口|
|tabal|请求头 可选 例如 {["Content-Type"] = "application/x-www-form-urlencoded"}|
|string/zbuff|body 可选|
|table|额外配置 可选 包含 timeout:超时时间单位ms 可选,默认10分钟,写0即永久等待 dst:下载路径,可选 adapter:选择使用网卡,可选 debug:是否打开debug信息,可选,ipv6:是否为ipv6 默认不是,可选 callback:下载回调函数,参数 content_len:总长度 body_len:以下载长度 userdata 用户传参,可选 userdata:回调自定义传参  |
|string|服务器ca证书数据, 可选, 一般不需要|
|string|客户端ca证书数据, 可选, 一般不需要, 双向https认证才需要|
|string|客户端私钥加密数据, 可选, 一般不需要, 双向https认证才需要|
|string|客户端私钥口令数据, 可选, 一般不需要, 双向https认证才需要|

**返回值**

|返回值类型|解释|
|-|-|
|int|code , 服务器反馈的值>=100, 最常见的是200.如果是底层错误,例如连接失败, 返回值小于0|
|tabal|headers 当code>100时, 代表服务器返回的头部数据 |
|string/int|body 服务器响应的内容字符串,如果是下载模式, 则返回文件大小|

**例子**

```lua

--[[
code报错信息列表:
-1 HTTP_ERROR_STATE 错误的状态, 一般是底层异常,请报issue
-2 HTTP_ERROR_HEADER 错误的响应头部, 通常是服务器问题
-3 HTTP_ERROR_BODY 错误的响应体,通常是服务器问题
-4 HTTP_ERROR_CONNECT 连接服务器失败, 未联网,地址错误,域名错误
-5 HTTP_ERROR_CLOSE 提前断开了连接, 网络或服务器问题
-6 HTTP_ERROR_RX 接收数据报错, 网络问题
-7 HTTP_ERROR_DOWNLOAD 下载文件过程报错, 网络问题或下载路径问题
-8 HTTP_ERROR_TIMEOUT 超时, 包括连接超时,读取数据超时
-9 HTTP_ERROR_FOTA fota功能报错,通常是更新包不合法
]]

-- GET请求
local code, headers, body = http.request("GET","http://site0.cn/api/httptest/simple/time").wait()
log.info("http.get", code, headers, body)
-- POST请求
local code, headers, body = http.request("POST","http://httpbin.com/post", {}, "abc=123").wait()
log.info("http.post", code, headers, body)

-- GET请求,但下载到文件
local code, headers, body = http.request("GET","http://httpbin.com/", {}, "", {dst="/data.bin"}).wait()
log.info("http.get", code, headers, body)

-- 自定义超时时间, 5000ms
http.request("GET","http://httpbin.com/", nil, nil, {timeout=5000}).wait()

-- 分段下载
local heads = {["Range"] = "bytes=0-99"} --下载0-99之间的数据
http.request("GET","http://httpbin.air32.cn/get", heads, nil, {timeout=5000}).wait()

```

---

