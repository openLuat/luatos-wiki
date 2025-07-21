# libcoap - coap数据处理

## libcoap.new(code, uri, headers, payload)

创建一个coap数据包

**参数**

|传入值类型|解释|
|-|-|
|int|coap的code, 例如libcoap.GET/libcoap.POST/libcoap.PUT/libcoap.DELETE|
|string|目标URI,必须填写, 不需要加上/开头|
|table|请求头,类似于http的headers,可选|
|string|请求体,类似于http的body,可选|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|coap数据包|

**例子**

```lua
-- 创建一个请求服务器time的数据包
local coapdata = libcoap.new(libcoap.GET, "time")
local data = coapdata:rawdata()

```

---

## libcoap.parse(str)

解析coap数据包

**参数**

|传入值类型|解释|
|-|-|
|string|coap数据包|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|coap数据包,如果解析失败会返回nil|

**例子**

```lua
-- 解析服务器传入的数据包
local coapdata = libcoap.parse(indata)
log.info("coapdata", coapdata:hcode(), coapdata:data())

```

---

## coapdata:msgid()

获取coap数据包的msgid

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|coap数据包的msgid|

**例子**

```lua
-- 解析服务器传入的数据包
local coapdata = libcoap.parse(indata)
log.info("coapdata", coapdata:msgid())

```

---

## coapdata:token()

获取coap数据包的token

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|coap数据包的token|

**例子**

```lua
-- 解析服务器传入的数据包
local coapdata = libcoap.parse(indata)
log.info("coapdata", coapdata:token())

```

---

## coapdata:rawdata()

获取coap数据包的二进制数据,用于发送到服务器

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|coap数据包的二进制数据|

**例子**

```lua
-- 解析服务器传入的数据包
local coapdata = libcoap.new(libcoap.GET, "time")
netc:send(coapdata:rawdata())

```

---

## coapdata:code()

获取coap数据包的code

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|coap数据包的code|

**例子**

```lua
-- 解析服务器传入的数据包
local coapdata = libcoap.parse(indata)
log.info("coapdata", coapdata:code())

```

---

## coapdata:hcode()

获取coap数据包的http code, 比coap原始的code要友好

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|coap数据包的http code,例如200,205,404|

**例子**

```lua
-- 解析服务器传入的数据包
local coapdata = libcoap.parse(indata)
log.info("coapdata", coapdata:hcode())

```

---

## coapdata:type(t)

获取coap数据包的type, 例如libcoap.CON/NON/ACK/RST

**参数**

|传入值类型|解释|
|-|-|
|int|新的type值,可选|

**返回值**

|返回值类型|解释|
|-|-|
|int|coap数据包的type|

**例子**

```lua
-- 解析服务器传入的数据包
local coapdata = libcoap.parse(indata)
log.info("coapdata", coapdata:type())

```

---

## coapdata:data()

获取coap数据包的data

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|coap数据包的data|

**例子**

```lua
-- 解析服务器传入的数据包
local coapdata = libcoap.parse(indata)
log.info("coapdata", coapdata:data())

```

---

