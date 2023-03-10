# aliyun - aliyun 阿里云

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/aLiyun.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
-- 用法实例
参考aliyun demo: https://gitee.com/openLuat/LuatOS/tree/master/demo/aliyun

```

## aliyun.operation(Registration,DeviceName,ProductKey,ProductSecret,InstanceId,mqtt_host,mqtt_port,mqtt_isssl)



一型一密连接

**参数**

|传入值类型|解释|
|-|-|
|bool|Registration 是否预注册|
|string|DeviceName 设备id|
|string|ProductKey 产品key|
|string|ProductSecret 产品秘钥|
|string|InstanceId 实例id|
|string|mqtt_host 公共实例的地址|
|string|mqtt_port 端口|
|bool|mqtt_isssl 是否为ssl加密连接,默认不加密,true为无证书最简单的加密，table为有证书的加密|

**返回值**

无

**例子**

```lua
aliyun.operation(Registration,DeviceName,ProductKey,ProductSecret,InstanceId,mqtt_host,mqtt_port,mqtt_isssl)

```

---

## aliyun.confiDentialTask(DeviceName,ProductKey,DeviceSecret,mqtt_host,mqtt_port,mqtt_isssl)



一机一密连接

**参数**

|传入值类型|解释|
|-|-|
|string|DeviceName 设备id|
|string|ProductKey 产品key|
|string|DeviceSecret 设备秘钥|
|string|mqtt_host 公共实例的地址|
|string|mqtt_port 端口|
|bool|mqtt_isssl 是否为ssl加密连接,默认不加密,true为无证书最简单的加密，table为有证书的加密|

**返回值**

无

**例子**

```lua
aliyun.confiDentialTask(DeviceName,ProductKey,DeviceSecret,mqtt_host,mqtt_port,mqtt_isssl)

```

---

## aliyun.subscriber(topic,qos)



订阅主题

**参数**

|传入值类型|解释|
|-|-|
|string/table|topic，string或者table类型，一个主题时为string类型，多个主题时为table类型，主题内容为UTF8编码|
|number|qos，number或者nil，topic为一个主题时，qos为number类型(0/1，默认0)；topic为多个主题时，qos为nil|

**返回值**

无

**例子**

```lua
-- aliyun.subscriber("/b0FMK1Ga5cp/862991234567890/get", 0)
-- aliyun.subscriber({["/b0FMK1Ga5cp/862991234567890/get"] = 0, ["/b0FMK1Ga5cp/862991234567890/get"] = 1})

```

---

## aliyun.publish(topic,qos,payload,retain)



发布一条消息

**参数**

|传入值类型|解释|
|-|-|
|string|topic，UTF8编码的主题|
|number|qos，0/1，默认0|
|numberretain,是否存档,|0/1,默认0|
|number|i2c_id i2c_id|

**返回值**

无

**例子**

```lua
aliyun.publish("/"..ProductKey.."/"..DeviceName.."/user/get",0,"LUATOS_CESHI")

```

---

## aliyun.on(evt,cbFnc)



注册事件的处理函数

**参数**

|传入值类型|解释|
|-|-|
|string|evt 事件 <br>"auth"表示鉴权服务器认证结果事件 <br>"connect"表示接入服务器连接结果事件 <br>"reconnect"表示重连事件 <br>"receive"表示接收到接入服务器的消息事件|
|function|cbFnc 事件的处理函数  <br>当evt为"auth"时，cbFnc的调用形式为：cbFnc(result)，result为true表示认证成功，false或者nil表示认证失败 <br>当evt为"connect"时，cbFnc的调用形式为：cbFnc(result)，result为true表示连接成功，false或者nil表示连接失败 <br>当evt为"receive"时，cbFnc的调用形式为：cbFnc(topic,qos,payload)，topic为UTF8编码的主题(string类型)，qos为质量等级(number类型)，payload为原始编码的负载(string类型) <br>当evt为"reconnect"时，cbFnc的调用形式为：cbFnc()，表示lib中在自动重连阿里云服务器|

**返回值**

无

**例子**

```lua
aliyun.on("connect",cbFnc)

```

---

