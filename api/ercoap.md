# ercoap - 新的Coap协议解析库

## ercoap.parse(data)

解析coap数据包

**参数**

|传入值类型|解释|
|-|-|
|string|coap数据包|

**返回值**

|返回值类型|解释|
|-|-|
|table|成功返回table,否则返回nil|

**例子**

```lua
-- 本函数是解析coap数据包
local rcoap = ercoap.parse(data)
if rcoap then
    log.info("coap", rcoap.type, rcoap.code, rcoap.payload)
    -- rcoap的属性
    -- type 消息类型, 0 - CON 需要答复, 1 - NON 无需答复, 2 - ACK 已收到, 3 - RST 出错了
    -- msgid 消息id
    -- payload 携带的数据
    -- code 类似于http的statue code, 通过有 2xx 正常, 4xx 出错了
else
    log.info("ercoap", "数据包解析失败")
end

```

---

## ercoap.print(data)

打印coap数据包

**参数**

|传入值类型|解释|
|-|-|
|string|coap数据包|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|解析成功返回true|

**例子**

```lua
-- 本函数单纯就打印一下coap数据包

```

---

## ercoap.onenet(tp, product_id, device_name, token, payload)

快速生成onenet数据包

**参数**

|传入值类型|解释|
|-|-|
|string|请求类型,作为reply时可选,其他情况必选|
|string|项目id,必须填写|
|string|设备名称,必须填写|
|string|token,必须填写|
|string|物模型json字符串,可选|

**返回值**

|返回值类型|解释|
|-|-|
|string|合成好的数据包,可通过UDP上行|

**例子**

```lua
-- 参考文档: coap接入 https://open.iot.10086.cn/doc/v5/fuse/detail/924
-- 参考文档: 物模型 https://open.iot.10086.cn/doc/v5/fuse/detail/902

-- 类型 tp值 token来源 payload
-- 登陆 login iotauth.onenet函数生成 无
-- 心跳 keep_live iotauth.onenet函数生成 无
-- 登出 logout iotauth.onenet函数生成 无
-- 属性上报 thing/property/post login时获取 必须有
-- 属性回复 thing/property/reply login时获取 必须有
-- 事件上报 thing/event/post login时获取 必须有
-- 远程调用答复 无 login时获取 必须有

```

---

