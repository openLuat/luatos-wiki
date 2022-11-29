# mqtt - mqtt客户端

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/network/libemqtt/luat_lib_mqtt.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看mqtt的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/socket)
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
|int|适配器序号, 只能是network.ETH0,network.STA,network.AP,如果不填,会选择最后一个注册的适配器|
|string|服务器地址,可以是域名, 也可以是ip|
|int|	端口号|
|bool|	是否为ssl加密连接,默认不加密|
|string|证书数据,可选|
|string|证书密钥,可选|
|string|证书密码,可选|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|若成功会返回mqtt客户端实例,否则返回nil|

**例子**

```lua
-- 普通TCP链接
mqttc = mqtt.create(nil,"120.55.137.106", 1884)
-- 加密TCP链接
mqttc = mqtt.create(nil,"120.55.137.106", 8883, true)
-- 带证书的TCP链接
mqttc = mqtt.create(nil,"120.55.137.106", 8883, true, io.readFile("/luadb/ca.crt"), "123", "456")

```

---

## mqttc:auth(client_id,username,password)

mqtt三元组配置

**参数**

|传入值类型|解释|
|-|-|
|string|设备识别id,对于同一个mqtt服务器来说, 通常要求唯一,相同client_id会互相踢下线|
|string|账号 可选|
|string|密码 可选|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

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

