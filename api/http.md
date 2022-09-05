# http - http客户端

> 本库有专属demo，[点此链接查看http的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/http)

## http.req(url, params, cb)

发起一个http get请求（推荐用http.get/post/put/delete方法）

**参数**

|传入值类型|解释|
|-|-|
|string|目标URL,需要是https://或者http://开头,否则将当成http://开头|
|table|可选参数. method方法,headers请求头,body数据,ca证书路径,timeout超时时长,|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功启动返回true,否则返回false.启动成功后,cb回调必然会调用一次|

**例子**

```lua
-- GET请求
http.req("http://www.baidu.com/", nil, function(ret, code, headers, body)
    log.info("http", ret, code, header, body)
end)

```

---

## http.get(url, params, cb)

发起一个http get请求

**参数**

|传入值类型|解释|
|-|-|
|string|目标URL,需要是https://或者http://开头,否则将当成http://开头|
|table|可选参数. headers请求头,body数据,ca证书路径,timeout超时时长,|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功启动返回true,否则返回false.启动成功后,cb回调必然会调用一次|

**例子**

```lua
-- GET请求
http.get("http://www.baidu.com/", nil, function(ret, code, headers, body)
    log.info("http", ret, code, header, body)
end)

```

---

## http.post(url, params, cb)

发起一个http post请求

**参数**

|传入值类型|解释|
|-|-|
|string|目标URL,需要是https://或者http://开头,否则将当成http://开头|
|table|可选参数. headers请求头,body数据,ca证书路径,timeout超时时长,|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功启动返回true,否则返回false.启动成功后,cb回调必然会调用一次|

**例子**

```lua
-- POST请求
http.post("http://www.baidu.com/", {body=json.encode(data)}, function(ret, code, headers, body)
    log.info("http", ret, code, header, body)
end)

```

---

## http.put(url, params, cb)

发起一个http put请求

**参数**

|传入值类型|解释|
|-|-|
|string|目标URL,需要是https://或者http://开头,否则将当成http://开头|
|table|可选参数. headers请求头,body数据,ca证书路径,timeout超时时长,|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功启动返回true,否则返回false.启动成功后,cb回调必然会调用一次|

**例子**

```lua
-- PUT请求
http.put("http://www.baidu.com/", {body=json.encode(data)}, function(ret, code, headers, body)
    log.info("http", ret, code, header, body)
end)

```

---

## http.delete(url, params, cb)

发起一个http delete请求

**参数**

|传入值类型|解释|
|-|-|
|string|目标URL,需要是https://或者http://开头,否则将当成http://开头|
|table|可选参数. headers请求头,body数据,ca证书路径,timeout超时时长,|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功启动返回true,否则返回false.启动成功后,cb回调必然会调用一次|

**例子**

```lua
-- DELETE请求
http.delete("http://www.baidu.com/", nil, function(ret, code, headers, body)
    log.info("http", ret, code, header, body)
end)

```

---

## http2.request(method,url,headers,body,opts,ca_file)

http客户端

**参数**

|传入值类型|解释|
|-|-|
|string|请求方法, 支持 GET/POST|
|string|url地址|
|tabal|请求头 可选 例如{["Content-Type"] = "application/x-www-form-urlencoded"}|
|string|body 可选|
|tabal|额外配置 可选 包含dst:下载路径,可选 adapter:选择使用网卡,可选|
|string|证书 可选|

**返回值**

无

**例子**

```lua
local code, headers, body = http2.request("GET","http://site0.cn/api/httptest/simple/time").wait()
log.info("http2.get", code, headers, body)

```

---

