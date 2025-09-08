# httpsrv - http服务端

## httpsrv.start(port, func, adapter)

启动并监听一个http端口

**参数**

|传入值类型|解释|
|-|-|
|int|端口号|
|function|回调函数|
|int|网络适配器编号, 默认是平台自带的网络协议栈|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true, 否则返回false|

**例子**

```lua

-- 监听80端口
httpsrv.start(80, function(client, method, uri, headers, body)
    -- method 是字符串, 例如 GET POST PUT DELETE
    -- uri 也是字符串 例如 / /api/abc
    -- headers table类型
    -- body 字符串
    log.info("httpsrv", method, uri, json.encode(headers), body)
    if uri == "/led/1" then
        LEDA(1)
        return 200, {}, "ok"
    elseif uri == "/led/0" then
        LEDA(0)
        return 200, {}, "ok"
    end
    -- 返回值的约定 code, headers, body
    -- 若没有返回值, 则默认 404, {} ,""
    return 404, {}, "Not Found" .. uri
end)
-- 关于静态文件
-- 情况1: / , 映射为 /index.html
-- 情况2: /abc.html , 先查找 /abc.html, 不存在的话查找 /abc.html.gz
-- 若gz存在, 会自动以压缩文件进行响应, 绝大部分浏览器支持.
-- 当前默认查找 /luadb/xxx 下的文件,暂不可配置

```

---

## httpsrv.stop(port，no_used, adapter)

停止http服务

**参数**

|传入值类型|解释|
|-|-|
|int|端口号|
|nil|固定写nil|
|int|网络适配器编号, 默认是平台自带的网络协议栈|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true, 否则返回false|

**例子**

```lua
httpsrv.stop(SERVER_PORT,nil,socket.LWIP_AP)

```

---

