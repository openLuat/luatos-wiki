# aliyun - AliYun阿里云物联网平台

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/aliyun.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看aliyun的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/aliyun)
```

**示例**

```lua
-- 请查阅demo

```

## aliyun.subscribe(topic,qos)



订阅主题

**参数**

|传入值类型|解释|
|-|-|
|string|主题内容为UTF8编码|
|number|qos为number类型(0/1，默认1)|
|return|nil|

**返回值**

无

**例子**

```lua
aliyun.subscribe("/b0FMK1Ga5cp/862991234567890/get", 1)

```

---

## aliyun.publish(topic,qos,payload,cbFnc,cbPara)



发布一条消息

**参数**

|传入值类型|解释|
|-|-|
|string|UTF8编码的主题|
|number|qos质量等级，0/1，默认0|
|string|payload 负载内容，UTF8编码|
|function|cbFnc 消息发布结果的回调函数,回调函数的调用形式为：cbFnc(result,cbPara)。result为true表示发布成功，false或者nil表示订阅失败；cbPara为本接口中的第5个参数|
|param|cbPara 消息发布结果回调函数的回调参数|
|return|nil|

**返回值**

无

**例子**

```lua
aliyun.publish("/b0FMK1Ga5cp/862991234567890/update",0,"test")
aliyun.publish("/b0FMK1Ga5cp/862991234567890/update",1,"test",cbFnc,"cbFncPara")

```

---

## aliyun.on(evt,cbFnc)



注册事件的处理函数

**参数**

|传入值类型|解释|
|-|-|
|string|evt事件，|

**返回值**

无

**例子**

无

---

## aliyun.setup(tPara)



配置阿里云物联网套件的产品信息和设备信息

**参数**

|传入值类型|解释|
|-|-|
|table|阿里云物联网套件的产品信息和设备信息|
|return|nil|

**返回值**

无

**例子**

```lua
aliyun.setup(tPara)
-- 参数说明
一机一密认证方案时，ProductSecret参数传入nil
一型一密认证方案时，ProductSecret参数传入真实的产品密钥
Registration 是否是预注册 已预注册为false，未预注册为true
DeviceName 设备名称
ProductKey 产品key
ProductSecret 产品secret，根据此信息判断是一机一密还是一型一密
DeviceSecret 设备secret
InstanceId 如果没有注册需要填写实例id，在实例详情页面
mqtt_port mqtt端口
mqtt_isssl 是否使用ssl加密连接，true为无证书最简单的加密

```

---

## aliyun.ready()



判断阿里云物联网套件是否已经连接

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|阿里云物联网套件是否已经连接|

**例子**

```lua
-- 本函数于2024.6.17新增
if aliyun.ready() then
    log.info("aliyun", "已连接")
end

```

---

## aliyun.store(result)



获取或存储注册信息

**参数**

|传入值类型|解释|
|-|-|
|table|result 注册结果，如果为nil则表示获取注册信息|

**返回值**

|返回值类型|解释|
|-|-|
|table|注册信息，如果为nil则表示获取失败|

**例子**

```lua
-- 获取注册信息
local store = aliyun.store()
-- 存储注册信息
aliyun.store(result)

```

---

