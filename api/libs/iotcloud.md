# iotcloud - iotcloud 云平台库 (已支持: 腾讯云 阿里云 onenet 华为云 涂鸦云 百度云 Tlink云 其他也会支持,有用到的提issue会加速支持)  

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/iotcloud.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
--注意:因使用了sys.wait()所有api需要在协程中使用

    -- 腾讯云 
    -- 动态注册
    -- iotcloudc = iotcloud.new(iotcloud.TENCENT,{produt_id = "xxx" ,product_secret = "xxx"})

    -- 密钥校验
    -- iotcloudc = iotcloud.new(iotcloud.TENCENT,{produt_id = "xxx",device_name = "123456789",key = "xxx=="})
    -- 证书校验
    -- iotcloudc = iotcloud.new(iotcloud.TENCENT,{produt_id = "xxx",device_name = "123456789"},{tls={client_cert=io.readFile("/luadb/client_cert.crt")}})


    -- 阿里云  
    -- 动态注册(免预注册)(一型一密)
    -- iotcloudc = iotcloud.new(iotcloud.ALIYUN,{produt_id = "xxx",product_secret = "xxx"})

    -- 密钥校验 (预注册)(一机一密)
    -- iotcloudc = iotcloud.new(iotcloud.ALIYUN,{produt_id = "xxx",device_name = "xxx",key = "xxx"})
    -- 证书校验(预注册)
    -- iotcloudc = iotcloud.new(iotcloud.TENCENT,{produt_id = "xxx",device_name = "xxx"},{tls={client_cert=io.readFile("/luadb/client_cert.crt")}})

    -- ONENET云
    -- 动态注册
    -- iotcloudc = iotcloud.new(iotcloud.ONENET,{produt_id = "xxx",userid = "xxx",userkey = "xxx"})
    -- 一型一密
    -- iotcloudc = iotcloud.new(iotcloud.ONENET,{produt_id = "xxx",product_secret = "xxx"})
    -- 一机一密
    -- iotcloudc = iotcloud.new(iotcloud.ONENET,{produt_id = "xxx",device_name = "xxx",device_secret = "xxx"})

    -- 华为云
    -- 动态注册(免预注册)
    -- iotcloudc = iotcloud.new(iotcloud.HUAWEI,{produt_id = "xxx",project_id = "xxx",endpoint = "xxx",
    --                         iam_username="xxx",iam_password="xxx",iam_domain="xxx"})
    -- 密钥校验 (预注册)
    -- iotcloudc = iotcloud.new(iotcloud.HUAWEI,{produt_id = "xxx",endpoint = "xxx",device_name = "xxx",device_secret = "xxx"})

    -- -- 涂鸦云 
    -- iotcloudc = iotcloud.new(iotcloud.TUYA,{device_name = "xxx",device_secret = "xxx"})

    -- 百度云 
    -- iotcloudc = iotcloud.new(iotcloud.BAIDU,{produt_id = "xxx",device_name = "xxx",device_secret = "xxx"})

    -- Tlink云  
    -- iotcloudc = iotcloud.new(iotcloud.TLINK,{produt_id = "xxx",product_secret = "xxx",device_name = "xxx"})
    -- iotcloudc = iotcloud.new(iotcloud.TLINK,{produt_id = "xxx",product_secret = "xxx",device_name = "xxx"},{tls={client_cert=io.readFile("/luadb/client_cert.crt")}})


```

## 常量

|常量|类型|解释|
|-|-|-|
|iotcloud.TENCENT|string|腾讯云|
|iotcloud.ALIYUN|string|阿里云|
|iotcloud.ONENET|string|ONENET云|
|iotcloud.HUAWEI|string|华为云|
|iotcloud.TUYA|string|涂鸦云|
|iotcloud.BAIDU|string|百度云|
|iotcloud.TLINK|string|Tlink云|
|iotcloud.CONNECT|string|连接上服务器|
|iotcloud.SEND|string|发送消息|
|iotcloud.RECEIVE|string|接收到消息|
|iotcloud.DISCONNECT|string|服务器连接断开|
|iotcloud.OTA|string|ota消息|


## iotcloud.new(cloud,iot_config,connect_config)



创建云平台对象

**参数**

|传入值类型|解释|
|-|-|
|string|云平台 iotcloud.TENCENT:腾讯云 iotcloud.ALIYUN:阿里云 iotcloud.ONENET:中国移动云 iotcloud.HUAWEI:华为云 iotcloud.TUYA:涂鸦云|
|table|iot云平台配置, device_name:可选，默认为imei否则为unique_id iot_config.product_id:产品id(阿里云则为产品key) iot_config.product_secret:产品密钥,有此项则为动态注册 iot_config.key:设备秘钥,有此项则为秘钥连接  userid:用户ID,onenet专用,动态注册使用  userkey:用户Accesskey,onenet专用,动态注册使用|
|table|mqtt配置, host:可选,默认为平台默认host ip:可选,默认为平台默认ip tls:加密,若有此项一般为产品认证 keepalive:心跳时间,单位s 可选,默认240|

**返回值**

|返回值类型|解释|
|-|-|
|table|云平台对象|

**例子**

```lua

    -- 腾讯云 
    -- 动态注册
    -- iotcloudc = iotcloud.new(iotcloud.TENCENT,{produt_id = "xxx" ,product_secret = "xxx"})

    -- 密钥校验
    -- iotcloudc = iotcloud.new(iotcloud.TENCENT,{produt_id = "xxx",device_name = "123456789",key = "xxx=="})
    -- 证书校验
    -- iotcloudc = iotcloud.new(iotcloud.TENCENT,{produt_id = "xxx",device_name = "123456789"},{tls={client_cert=io.readFile("/luadb/client_cert.crt")}})


    -- 阿里云  
    -- 动态注册(免预注册)(一型一密)
    -- iotcloudc = iotcloud.new(iotcloud.ALIYUN,{produt_id = "xxx",product_secret = "xxx"})

    -- 密钥校验 (预注册)(一机一密)
    -- iotcloudc = iotcloud.new(iotcloud.ALIYUN,{produt_id = "xxx",device_name = "xxx",key = "xxx"})
    -- 证书校验(预注册)
    -- iotcloudc = iotcloud.new(iotcloud.TENCENT,{produt_id = "xxx",device_name = "xxx"},{tls={client_cert=io.readFile("/luadb/client_cert.crt")}})

    -- ONENET云
    -- 动态注册
    -- iotcloudc = iotcloud.new(iotcloud.ONENET,{produt_id = "xxx",userid = "xxx",userkey = "xxx"})
    -- 一型一密
    -- iotcloudc = iotcloud.new(iotcloud.ONENET,{produt_id = "xxx",product_secret = "xxx"})
    -- 一机一密
    -- iotcloudc = iotcloud.new(iotcloud.ONENET,{produt_id = "xxx",device_name = "xxx",device_secret = "xxx"})

    -- 华为云
    -- 动态注册(免预注册)
    -- iotcloudc = iotcloud.new(iotcloud.HUAWEI,{produt_id = "xxx",project_id = "xxx",endpoint = "xxx",
    --                         iam_username="xxx",iam_password="xxx",iam_domain="xxx"})
    -- 密钥校验 (预注册)
    -- iotcloudc = iotcloud.new(iotcloud.HUAWEI,{produt_id = "xxx",endpoint = "xxx",device_name = "xxx",device_secret = "xxx"})

    -- -- 涂鸦云 
    -- iotcloudc = iotcloud.new(iotcloud.TUYA,{device_name = "xxx",device_secret = "xxx"})

    -- 百度云 
    -- iotcloudc = iotcloud.new(iotcloud.BAIDU,{produt_id = "xxx",device_name = "xxx",device_secret = "xxx"})

    -- Tlink云  
    -- iotcloudc = iotcloud.new(iotcloud.TLINK,{produt_id = "xxx",product_secret = "xxx",device_name = "xxx"})
    -- iotcloudc = iotcloud.new(iotcloud.TLINK,{produt_id = "xxx",product_secret = "xxx",device_name = "xxx"},{tls={client_cert=io.readFile("/luadb/client_cert.crt")}})


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

