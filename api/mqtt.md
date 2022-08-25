# mqtt - mqtt客户端

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/network/libemqtt/luat_lib_mqtt.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

> 本库有专属demo，[点此链接查看mqtt的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/mqtt)

## mqttc:subscribe(topic, qos)

订阅主题

**参数**

|传入值类型|解释|
|-|-|
|string/table|topic 主题|
|int|qos topic为string时生效 0/1/2 默认0|

**返回值**

无

**例子**

```lua
mqttc:subscribe("/luatos/123456")
mqttc:subscribe({["/luatos/1234567"]=1,["/luatos/12345678"]=2})

```

---

## mqttc:unsubscribe(topic)

取消订阅主题

**参数**

|传入值类型|解释|
|-|-|
|string/table|topic 主题|

**返回值**

无

**例子**

```lua
mqttc:unsubscribe("/luatos/123456")
mqttc:unsubscribe({"/luatos/1234567","/luatos/12345678"})

```

---

## mqttc:create(adapter,host,port,isssl,ca_file)

mqtt客户端创建

**参数**

|传入值类型|解释|
|-|-|
|int|适配器序号， 只能是network.ETH0，network.STA，network.AP，如果不填，会选择最后一个注册的适配器|
|string|host 服务器地址|
|int|	port 端口号|
|bool|	isssl 是否为ssl加密连接,默认不加密|
|string|ca_file 证书|

**返回值**

无

**例子**

```lua
mqttc = mqtt.create(nil,"120.55.137.106", 1884)

```

---

## mqttc:auth(client_id,username,password)

mqtt三元组配置

**参数**

|传入值类型|解释|
|-|-|
|string|client_id|
|string|username 可选|
|string|password 可选|

**返回值**

无

**例子**

```lua
mqttc:auth("123456789","username","password")

```

---

## mqttc:keepalive(time)

mqtt心跳设置

**参数**

|传入值类型|解释|
|-|-|
|int|time 可选 单位s 默认240s|

**返回值**

无

**例子**

```lua
mqttc:keepalive(30)

```

---

## mqttc:on(cb)

mqtt回调注册

**参数**

|传入值类型|解释|
|-|-|
|function|cb mqtt回调,参数包括mqtt_client, event, data, payload|

**返回值**

无

**例子**

```lua
mqttc:on(function(mqtt_client, event, data, payload)
	-- 用户自定义代码
	log.info("mqtt", "event", event, mqtt_client, data, payload)
end)

```

---

## mqttc:connect()

连接服务器

**参数**

无

**返回值**

无

**例子**

```lua
mqttc:connect()

```

---

## mqttc:autoreconn(reconnect, reconnect_time)

自动重连

**参数**

|传入值类型|解释|
|-|-|
|bool|reconnect 是否自动重连|
|int|自动重连周期 单位ms 默认3s|

**返回值**

无

**例子**

```lua
mqttc:autoreconn(true)

```

---

## mqttc:publish(topic, data, qos)

发布消息

**参数**

|传入值类型|解释|
|-|-|
|string|topic 主题|
|string|data  消息|
|int|qos 0/1/2 默认0|

**返回值**

无

**例子**

```lua
mqttc:publish("/luatos/123456", "123")

```

---

## mqttc:close()

mqtt客户端关闭

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

