# socket - socket操作库

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_socket.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！


## socket.ntpSync(server)

ntp时间同步

**参数**

|传入值类型|解释|
|-|-|
|string|ntp服务器域名,默认值ntp1.aliyun.com|

**返回值**

|返回值类型|解释|
|-|-|
|int|启动成功返回0, 失败返回1或者2|

**例子**

```lua
socket.ntpSync()
sys.subscribe("NTP_UPDATE", function(re)
    log.info("ntp", "result", re)
end)

```

---

## socket.tsend(host, port, data)

直接向地址发送一段数据

**参数**

|传入值类型|解释|
|-|-|
|string|服务器域名或者ip|
|int|服务器端口号|
|string|待发送的数据|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
socket.tsend("www.baidu.com", 80, "GET / HTTP/1.0\r\n\r\n")

```

---

## socket.isReady()

网络是否就绪

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|已联网返回true,否则返回false|

**例子**

无

---

## socket.ip()

获取自身ip,通常是内网ip

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|已联网返回ip地址,否则返回nil|

**例子**

无

---

## socket.tcp()

新建一个tcp socket

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|object|socket对象,如果创建失败会返回nil|

**例子**

```lua
--  如果读取失败,会返回nil
local so = socket.tcp()
if so then
    so:host("www.baidu.com")
    so:port(80)
    so:on("connect", function(id, re)
        if re == 1 then
            so:send("GET / HTTP/1.0\r\n\r\n")
        end
    end)
    so:on("recv", function(id, data)
        log.info("netc", id, data)
    end)
    if so:start() == 1 then
        sys.waitUntil("NETC_END_" .. so:id())
    end
    so:close()
    so:clean()
end

```

---

## socket.udp()

新建一个udp socket

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|暂不支持|

**例子**

无

---

## so:start(host, port)

启动socket线程

**参数**

|传入值类型|解释|
|-|-|
|string|服务器域名或ip,如果已经使用so:host和so:port配置,就不需要传参数了|
|port|服务器端口,如果已经使用so:host和so:port配置,就不需要传参数了|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功返回0,失败返回1|

**例子**

```lua
-- 参考socket.tcp的说明, 并查阅demo

```

---

## so:close()

关闭socket对象

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|总会成功|

**例子**

```lua
-- 参考socket.tcp的说明, 并查阅demo

```

---

## so:send(data,flags)

通过socket对象发送数据

**参数**

|传入值类型|解释|
|-|-|
|string|待发送数据|
|int|可选的额外参数,底层相关.例如NBIOT下的rai值, 传入2,代表数据已经全部发送完成,可更快进入休眠.|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|发送成功返回true,否则返回false|

**例子**

```lua
-- 参考socket.tcp的说明, 并查阅demo

```

---

## so:id()

获取socket对象的id

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|对象id,全局唯一|

**例子**

无

---

## so:host(host)

设置服务器域名或ip

**参数**

|传入值类型|解释|
|-|-|
|string|服务器域名或ip|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 参考socket.tcp的说明, 并查阅demo

```

---

## so:port(port)

设置服务器端口

**参数**

|传入值类型|解释|
|-|-|
|int|服务器端口|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 参考socket.tcp的说明, 并查阅demo

```

---

## so:clean(0)

清理socket关联的资源,socket对象在废弃前必须调用

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 参考socket.tcp的说明, 并查阅demo

```

---

## so:on(event, func)

设置socket的事件回调

**参数**

|传入值类型|解释|
|-|-|
|string|事件名称|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 参考socket.tcp的说明, 并查阅demo

```

---

## so:closed()

socket是否已经断开?

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|未断开0,已断开1|
|bool|未断开返回false,已断开返回true, V0003新增|

**例子**

```lua
-- 参考socket.tcp的说明, 并查阅demo

```

---

## so:rebind(socket_id)

为netclient绑定socket id, 该操作仅在NBIOT模块下有意义.

**参数**

|传入值类型|解释|
|-|-|
|int|socket的id.|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true, 否则返回false. V0003新增|

**例子**

```lua
-- 参考socket.tcp的说明, 并查阅demo

```

---

## so:sockid()

获取底层socket id

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|底层socket id|

**例子**

```lua
-- 参考socket.tcp的说明, 并查阅demo

```

---

