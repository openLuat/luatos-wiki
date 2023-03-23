# mqtt - mqtt客户端

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3` {bdg-primary}`Air780E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/network/libemqtt/luat_lib_mqtt.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看mqtt的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/mqtt)
```

## mqttc:subscribe(topic, qos)



订阅主题

**参数**

|传入值类型|解释|
|-|-|
|string/table|主题|
|int|topic为string时生效 0/1/2 默认0|

**返回值**

|返回值类型|解释|
|-|-|
|int|消息id,当qos为1时有效, 若底层返回失败,会返回nil|

**例子**

```lua
-- 订阅单个topic, 且qos=0
mqttc:subscribe("/luatos/123456", 0)
-- 订阅单个topic, 且qos=1
mqttc:subscribe("/luatos/12345678", 1)
-- 订阅多个topic, 且使用不同的qos
mqttc:subscribe({["/luatos/1234567"]=1,["/luatos/12345678"]=2})

```

---

## mqttc:unsubscribe(topic)



取消订阅主题

**参数**

|传入值类型|解释|
|-|-|
|string/table|主题|

**返回值**

无

**例子**

```lua
mqttc:unsubscribe("/luatos/123456")
mqttc:unsubscribe({"/luatos/1234567","/luatos/12345678"})

```

---

## mqttc:debug(onoff)



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

## mqtt.create(adapter,host,port,isssl,ca_file)



mqtt客户端创建

**参数**

|传入值类型|解释|
|-|-|
|int|适配器序号, 只能是socket.ETH0, socket.STA, socket.AP,如果不填,会选择平台自带的方式,然后是最后一个注册的适配器|
|string|服务器地址,可以是域名, 也可以是ip|
|int|	端口号|
|bool/table|是否为ssl加密连接,默认不加密,true为无证书最简单的加密，table为有证书的加密 <br>server_cert 服务器ca证书数据 <br>client_cert 客户端ca证书数据 <br>client_key 客户端私钥加密数据 <br>client_password 客户端私钥口令数据|
|bool|是否为ipv6 默认不是|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|若成功会返回mqtt客户端实例,否则返回nil|

**例子**

```lua
-- 普通TCP链接
mqttc = mqtt.create(nil,"120.55.137.106", 1884)
-- 加密TCP链接,不验证服务器证书
mqttc = mqtt.create(nil,"120.55.137.106", 8883, true)
-- 加密TCPTCP链接,单服务器证书验证
mqttc = mqtt.create(nil,"120.55.137.106", 8883, {server_cert=io.readFile("/luadb/ca.crt")})
-- 加密TCPTCP链接,双向证书验证
mqttc = mqtt.create(nil,"120.55.137.106", 8883, {
					server_cert=io.readFile("/luadb/ca.crt"),
					client_cert=io.readFile("/luadb/client.pem"),
					client_key="123456",
					client_password="123456",
					})

```

---

## mqttc:auth(client_id,username,password,cleanSession)



mqtt三元组配置及cleanSession

**参数**

|传入值类型|解释|
|-|-|
|string|设备识别id,对于同一个mqtt服务器来说, 通常要求唯一,相同client_id会互相踢下线|
|string|账号 可选|
|string|密码 可选|
|bool|清除session,默认true,可选|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 无账号密码登录,仅clientId
mqttc:auth("123456789")
-- 带账号密码登录
mqttc:auth("123456789","username","password")
-- 额外配置cleanSession,不清除
mqttc:auth("123456789","username","password", false)
-- 无clientId模式, 服务器随机生成id, cleanSession不可配置
mqttc:auth()

```

---

## mqttc:keepalive(time)



mqtt心跳设置

**参数**

|传入值类型|解释|
|-|-|
|int|可选 单位s 默认240s. 最先15,最高600|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
mqttc:keepalive(30)

```

---

## mqttc:on(cb)



注册mqtt回调

**参数**

|传入值类型|解释|
|-|-|
|function|cb mqtt回调,参数包括mqtt_client, event, data, payload|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
mqttc:on(function(mqtt_client, event, data, payload, metas)
	-- 用户自定义代码
	log.info("mqtt", "event", event, mqtt_client, data, payload)
end)
--[[
event可能出现的值有
  conack -- 服务器鉴权完成,mqtt连接已经建立, 可以订阅和发布数据了,没有附加数据
  recv   -- 接收到数据,由服务器下发, data为topic值(string), payload为业务数据(string).metas是元数据(table), 一般不处理. 
             -- metas包含以下内容
			 -- qos 取值范围0,1,2
			 -- retain 取值范围 0,1
			 -- dup 取值范围 0,1
  sent   -- 发送完成, qos0会马上通知, qos1/qos2会在服务器应答会回调, data为消息id
  disconnect -- 服务器断开连接,网络问题或服务器踢了客户端,例如clientId重复,超时未上报业务数据
]]

```

---

## mqttc:connect()



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
mqttc:connect()
-- 本函数仅代表发起成功, 后续仍需根据ready函数判断mqtt是否连接正常

```

---

## mqttc:disconnect()



断开服务器连接(不会释放资源)

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|发起成功返回true, 否则返回false|

**例子**

```lua
-- 断开连接
mqttc:disconnect()

```

---

## mqttc:autoreconn(reconnect, reconnect_time)



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
mqttc:autoreconn(true)

```

---

## mqttc:publish(topic, data, qos, retain)



发布消息

**参数**

|传入值类型|解释|
|-|-|
|string|主题,必填|
|string|消息,必填,但长度可以是0|
|int|消息级别 0/1 默认0|
|int|是否存档, 0/1,默认0|

**返回值**

|返回值类型|解释|
|-|-|
|int|消息id, 当qos为1或2时会有效值. 若底层返回是否, 会返回nil|

**例子**

```lua
mqttc:publish("/luatos/123456", "123")

```

---

## mqttc:close()



mqtt客户端关闭(关闭后资源释放无法再使用)

**参数**

无

**返回值**

无

**例子**

```lua
mqttc:close()

```

---

## mqttc:ready()



mqtt客户端是否就绪

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|客户端是否就绪|

**例子**

```lua
local error = mqttc:ready()

```

---

## mqttc:will(topic, payload, qos, retain)



设置遗嘱消息

**参数**

|传入值类型|解释|
|-|-|
|string|遗嘱消息的topic|
|string|遗嘱消息的payload|
|string|遗嘱消息的qos, 默认0, 可以不填|
|string|遗嘱消息的retain, 默认0, 可以不填|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
-- 要在connect之前调用
mqttc:will("/xxx/xxx", "xxxxxx")

```

---

