# http - 执行http请求

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_http.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

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

