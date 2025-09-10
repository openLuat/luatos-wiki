# mqtt - mqtt客户端

**示例**

```lua
-- 具体用法请查看demo
-- 本库只支持 mqtt 3.1.1, 其他版本例如3.1 或 5 均不支持!!!
-- 只支持纯MQTT/MQTTS通信, 不支持 mqtt over websocket

-- 几个大前提:
-- 本库是基于TCP链接的, 支持加密TCP和非加密TCP
-- 任何通信失败都将断开连接, 如果开启了自动重连, 那么间隔N秒后开始自动重连
-- 上行数据均为一次性的, 没有缓存机制, 更没有上行的重试/重发机制
-- 如何获知发送成功: 触发 mqttc:on 中 event == "sent" 的事件

-- 关于publish时QOS值的说明, 特制模块上行到云端/服务器端的行为:
-- QOS0, 压入底层TCP发送堆栈,视为成功
-- QOS1, 收到服务器回应PUBACK,视为成功
-- QOS2, 收到服务器响应PUBREC,立即上行PUBCOMP压入TCP发送队列,视为成功

-- 重要的事情说3次: 没有重发机制, 没有重发机制, 没有重发机制
-- 1. MQTT协议中规定了重发机制, 但那是云端/服务器端才会实现的机制, 模块端是没有的
-- 2. 上行失败, 唯一的可能性就是TCP链接出问题了, 而TCP链接出问题的解决办法就是重连
-- 3. 模块端不会保存任何上行数据, 重连后也无法实现重发

-- 那业务需要确定上行是否成功, 如何解决:
-- 首先推荐使用 QOS1, 然后监听/判断sent事件,并选取一个超时时间, 就能满足99.9%的需求
-- 使用QOS2,反而存在PUBCOMP上行失败导致服务器端不广播数据的理论可能
-- demo里有演示等待sent事件的代码, 类似于 sys.waitUntil("mqtt_sent", 3000) 搜mqtt_sent关键字

```

## 常量

|常量|类型|解释|
|-|-|-|
|mqtt.STATE_DISCONNECT|number|mqtt 断开|
|mqtt.STATE_SCONNECT|number|mqtt socket连接中|
|mqtt.STATE_MQTT|number|mqtt socket已连接 mqtt连接中|
|mqtt.STATE_READY|number|mqtt mqtt已连接|


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
|int|消息id,当qos为1/2时有效, 若底层返回失败,会返回nil|

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

## mqtt.create(adapter,host,port,ssl,opts)

mqtt客户端创建

**参数**

|传入值类型|解释|
|-|-|
|int|适配器序号, 如果不填,会选择平台自带的方式,然后是最后一个注册的适配器,可选值请查阅socket库的常量表|
|string|服务器地址,可以是域名, 也可以是ip|
|int|端口号|
|bool/table|是否为ssl加密连接,默认不加密,true为无证书最简单的加密，table为有证书的加密 <br>server_cert 服务器ca证书数据 <br>client_cert 客户端证书数据 <br>client_key 客户端私钥加密数据 <br>client_password 客户端私钥口令数据 <br>verify 是否强制校验 0不校验/1可选校验/2强制校验 默认2|
|table|mqtt扩展参数|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|若成功会返回mqtt客户端实例,否则返回nil|

**例子**

```lua
-- 普通TCP链接
mqttc = mqtt.create(nil,"120.55.137.106", 1884)
-- 普通TCP链接,mqtt接收缓冲区4096
mqttc = mqtt.create(nil,"120.55.137.106", 1884, nil, {rxSize = 4096})
-- 加密TCP链接,不验证服务器证书
mqttc = mqtt.create(nil,"120.55.137.106", 8883, true)
-- 加密TCPTCP链接,单服务器证书验证
mqttc = mqtt.create(nil,"120.55.137.106", 8883, {server_cert=io.readFile("/luadb/ca.crt")})
-- 加密TCPTCP链接,单服务器证书验证, 但可选认证
mqttc = mqtt.create(nil,"120.55.137.106", 8883, {server_cert=io.readFile("/luadb/ca.crt"), verify=1})
-- 加密TCPTCP链接,双向证书验证
mqttc = mqtt.create(nil,"120.55.137.106", 8883, {
                    server_cert=io.readFile("/luadb/ca.crt"),
                    client_cert=io.readFile("/luadb/client.pem"),
                    client_key=io.readFile("/luadb/client.key"),
                    client_password="123456",
                    })
-- opts参数说明
-- ipv6 = true, -- 是否为ipv6连接,默认false
-- rxSize = 4096, -- mqtt接收缓冲区大小,单位字节,默认32k
-- conn_timeout = 15, -- 连接超时时间,按收到conack为止,单位秒, 默认30秒

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
|bool|成功返回true,否则返回nil. 注意, 返回值是2025.3.19新增的|

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
  conack    -- 服务器鉴权完成, 表示mqtt连接已经建立, 可以订阅和发布数据了
  suback     -- 订阅完成，data为应答结果, true成功，payload为0~2数字表示qos，data为false则失败，payload为失败码，一般是0x80
  unsuback    -- 取消订阅完成
  recv       -- 接收到数据,由服务器下发, data为topic值(string), payload为业务数据(string), metas是元数据(table), 一般不处理.
             -- metas包含以下内容
             -- message_id
             -- qos 取值范围0,1,2
             -- retain 取值范围 0,1
             -- dup 取值范围 0,1
  sent       -- 发送完成, qos0会马上通知, qos1/qos2会在服务器应答会回调, data为消息id
  disconnect -- 服务器断开连接,网络问题或服务器踢了客户端,例如clientId重复,超时未上报业务数据
  pong       -- 收到服务器心跳应答,没有附加数据
  error        -- 严重的异常，会导致断开连接, data(string)为具体异常，有以下几种
                    -- connect 服务器连接不上
                    -- tx 发送数据失败
                    -- conack 服务器鉴权失败，失败码在payload(int)
                    -- other 其他异常
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
|int|消息id, 当qos为1或2时会有效值. 若底层返回有错误发生, 则会返回nil|

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

## mqttc:state()

mqtt客户端状态

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|number|客户端状态|

**例子**

```lua
local state = mqttc:state()
-- 已知状态:
-- 0: MQTT_STATE_DISCONNECT
-- 1: MQTT_STATE_CONNECTING
-- 2: MQTT_STATE_CONNECTED
-- 3: MQTT_STATE_READY
-- 4: MQTT_STATE_ERROR

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

