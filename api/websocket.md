# websocket - websocket客户端

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3` {bdg-primary}`Air780E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/network/websocket/luat_lib_websocket.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看websocket的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/websocket)
```

**示例**

```lua
local wsc = nil
if websocket then
	wsc = websocket.create(nil, "ws://echo.airtun.air32.cn/ws/echo")
    wsc:autoreconn(true, 3000) -- 自动重连机制
    wsc:on(function(wsc, event, data)
        log.info("wsc", event, data)
        if event == "conack" then
            wsc:send((json.encode({action="echo", device_id=device_id})))
            sys.publish("wsc_conack")
        end
    end)
    wsc:connect()
    --sys.waitUntil("websocket_conack", 15000)
    while true do
        sys.wait(45000)
        if wsc:ready() then
        	wsc:send((json.encode({action="echo", msg=os.date()})))
		end
    end
    wsc:close()
    wsc = nil
end

```

## wsc:debug(onoff)



配置是否打开debug信息

**参数**

|传入值类型|解释|
|-|-|
|boolean|是否打开debug开关|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## websocket.create(adapter, url)



websocket客户端创建

**参数**

|传入值类型|解释|
|-|-|
|int|适配器序号, 只能是socket.ETH0, socket.STA, socket.AP,如果不填,会选择平台自带的方式,然后是最后一个注册的适配器|
|string|连接字符串,参考usage|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|若成功会返回websocket客户端实例,否则返回nil|

**例子**

```lua
-- 普通TCP链接
wsc = websocket.create(nil,"ws://air32.cn/abc")
-- 加密TCP链接
wsc = websocket.create(nil,"wss://air32.cn/abc")

```

---

## wsc:on(cb)



注册websocket回调

**参数**

|传入值类型|解释|
|-|-|
|function|cb websocket回调,参数包括websocket_client, event, data, payload|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
wsc:on(function(websocket_client, event, data, payload)
	-- 打印各种事件
	log.info("websocket", "event", event, data, payload)
end)
--[[
event的值有:
	conack 连接服务器成功,已经收到websocket协议头部信息,通信已建立
	recv   收到服务器下发的信息, data, payload 不为nil
	sent   send函数发送的消息,服务器在TCP协议层已确认收到
	disconnect 服务器连接已断开

其中 sent/disconnect 事件在 2023.04.01 新增
]]

```

---

## wsc:connect()



连接服务器

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|发起成功返回true, 否则返回false|

**例子**

```lua
-- 开始建立连接
wsc:connect()
-- 本函数仅代表发起成功, 后续仍需根据ready函数判断websocket是否连接正常

```

---

## wsc:autoreconn(reconnect, reconnect_time)



自动重连

**参数**

|传入值类型|解释|
|-|-|
|bool|是否自动重连|
|int|自动重连周期 单位ms 默认3000ms|

**返回值**

无

**例子**

```lua
wsc:autoreconn(true)

```

---

## wsc:send(data, fin, opt)



发布消息

**参数**

|传入值类型|解释|
|-|-|
|string|待发送的数据,必填|
|int|是否为最后一帧,默认1,即马上设置为最后一帧, 也就是单帧发送|
|int|操作码, 默认为字符串帧0, 可选1|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则为false或者nil|

**例子**

```lua
-- 简单发送数据
wsc:send("123")
-- 分段发送数据, 最后要用1(即FIN帧结束)
wsc:send("123", 0)
wsc:send("456", 0)
wsc:send("789", 1)

```

---

## wsc:close()



websocket客户端关闭(关闭后资源释放无法再使用)

**参数**

无

**返回值**

无

**例子**

```lua
wsc:close()

```

---

## wsc:ready()



websocket客户端是否就绪

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|客户端是否就绪|

**例子**

```lua
local stat = wsc:ready()

```

---

## wsc:headers(headers)



设置额外的headers

**参数**

|传入值类型|解释|
|-|-|
|table/string|可以是table,也可以是字符串|

**返回值**

|返回值类型|解释|
|-|-|
|bool|客户端是否就绪|

**例子**

```lua
-- table形式
wsc:headers({
	Auth="Basic ABCDEFGG"
})
-- 字符串形式
wsc:headers("Auth: Basic ABCDERG\r\n")

```

---

