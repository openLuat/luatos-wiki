# iotcloud - iotcloud 云平台库 (已支持: 腾讯云 阿里云 其他也会支持,有用到的提issue会加速支持)  

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/iotcloud.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
--注意:因使用了sys.wait()所有api需要在协程中使用

```

## iotcloud.new(cloud,iot_config,connect_config)



创建云平台对象

**参数**

|传入值类型|解释|
|-|-|
|string|云平台 iotcloud.TENCENT:腾讯云 iotcloud.ALIYUN:阿里云|
|table|iot云平台配置, device_name:可选，默认为imei否则为unique_id iot_config.produt_id:产品id(阿里云则为产品key) iot_config.product_secret:产品密钥,有此项则为动态注册 iot_config.key:设备秘钥,有此项则为秘钥连接 |
|table|mqtt配置, host:可选,默认为平台默认host ip:可选,默认为平台默认ip tls:加密,若有此项一般为产品认证 |

**返回值**

|返回值类型|解释|
|-|-|
|table|云平台对象|

**例子**

```lua
-- 阿里云动态注册
iotcloudc = iotcloud.new(iotcloud.ALIYUN,{produt_id = "xxx",product_secret = "xxx"})

```

---

## cloudc:connect()



云平台连接

**参数**

无

**返回值**

无

**例子**

```lua
iotcloudc:connect()

```

---

## cloudc:disconnect()



云平台断开

**参数**

无

**返回值**

无

**例子**

```lua
iotcloudc:disconnect()

```

---

## cloudc:subscribe(topic, qos)



云平台订阅

**参数**

|传入值类型|解释|
|-|-|
|string/table|主题|
|number|topic为string时生效 0/1/2 默认0|

**返回值**

无

**例子**

无

---

## cloudc:unsubscribe(topic)



云平台取消订阅

**参数**

|传入值类型|解释|
|-|-|
|string/table|主题|

**返回值**

无

**例子**

无

---

## cloudc:publish(topic,data,qos,retain)



云平台发布

**参数**

|传入值类型|解释|
|-|-|
|string/table|主题|
|string|消息,必填,但长度可以是0|
|number|消息级别 0/1 默认0|
|number|是否存档, 0/1,默认0|

**返回值**

无

**例子**

无

---

## cloudc:close()



云平台关闭

**参数**

无

**返回值**

无

**例子**

```lua
iotcloudc:close()

```

---

