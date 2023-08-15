# iotauth - IoT鉴权库, 用于生成各种云平台的参数

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air601` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3` {bdg-primary}`Air780E/Air700E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/iotauth/luat_lib_iotauth.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看iotauth的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/iotauth)
```

## iotauth.aliyun(product_key, device_name,device_secret,method,cur_timestamp)



阿里云物联网平台三元组生成

**参数**

|传入值类型|解释|
|-|-|
|string|product_key|
|string|device_name|
|string|device_secret|
|string|method 加密方式,"hmacmd5" "hmacsha1" "hmacsha256" 可选,默认"hmacmd5"|
|number|cur_timestamp 可选 默认为 32472115200(2999-01-01 0:0:0)|
|bool|istls 是否TLS直连 true:TLS直连  false:TCP直连模式 默认TCP直连模式|

**返回值**

|返回值类型|解释|
|-|-|
|string|mqtt三元组 client_id|
|string|mqtt三元组 user_name|
|string|mqtt三元组 password|

**例子**

```lua
local client_id,user_name,password = iotauth.aliyun("123456789","abcdefg","Y877Bgo8X5owd3lcB5wWDjryNPoB")
print(client_id,user_name,password)

```

---

## iotauth.onenet(produt_id, device_name,key,method,cur_timestamp,version)



中国移动物联网平台三元组生成

**参数**

|传入值类型|解释|
|-|-|
|string|produt_id|
|string|device_name|
|string|key|
|string|method 加密方式,"md5" "sha1" "sha256" 可选,默认"md5"|
|number|cur_timestamp 可选 默认为 32472115200(2999-01-01 0:0:0)|
|string|version 可选 默认"2018-10-31"|

**返回值**

|返回值类型|解释|
|-|-|
|string|mqtt三元组 client_id|
|string|mqtt三元组 user_name|
|string|mqtt三元组 password|

**例子**

```lua
local client_id,user_name,password = iotauth.onenet("123456789","test","KuF3NT/jUBJ62LNBB/A8XZA9CqS3Cu79B/ABmfA1UCw=")
print(client_id,user_name,password)

```

---

## iotauth.iotda(device_id,device_secret,cur_timestamp)



华为物联网平台三元组生成

**参数**

|传入值类型|解释|
|-|-|
|string|device_id|
|string|device_secret|
|number|cur_timestamp 可选 如不填则不校验时间戳|

**返回值**

|返回值类型|解释|
|-|-|
|string|mqtt三元组 client_id|
|string|mqtt三元组 user_name|
|string|mqtt三元组 password|

**例子**

```lua
local client_id,user_name,password = iotauth.iotda("6203cc94c7fb24029b110408_88888888","123456789")
print(client_id,user_name,password)

```

---

## iotauth.qcloud(product_id, device_name,device_secret,method,cur_timestamp,sdk_appid)



腾讯联网平台三元组生成

**参数**

|传入值类型|解释|
|-|-|
|string|产品id,创建项目后可以查看到,类似于LD8S5J1L07|
|string|设备名称,例如设备的imei号|
|string|设备密钥,创建设备后,查看设备详情可得到|
|string|method 加密方式,"sha1" "sha256" 可选,默认"sha256"|
|number|cur_timestamp 可选 默认为 32472115200(2999-01-01 0:0:0)|
|string|sdk_appid 可选 默认为"12010126"|

**返回值**

|返回值类型|解释|
|-|-|
|string|mqtt三元组 client_id|
|string|mqtt三元组 user_name|
|string|mqtt三元组 password|

**例子**

```lua
local client_id,user_name,password = iotauth.qcloud("LD8S5J1L07","test","acyv3QDJrRa0fW5UE58KnQ==")
print(client_id,user_name,password)

```

---

## iotauth.tuya(device_id,device_secret,cur_timestamp)



涂鸦联网平台三元组生成

**参数**

|传入值类型|解释|
|-|-|
|string|device_id|
|string|device_secret|
|number|cur_timestamp 可选 默认7258089600(2200-01-01 0:0:0)|

**返回值**

|返回值类型|解释|
|-|-|
|string|mqtt三元组 client_id|
|string|mqtt三元组 user_name|
|string|mqtt三元组 password|

**例子**

```lua
local client_id,user_name,password = iotauth.tuya("6c95875d0f5ba69607nzfl","fb803786602df760")
print(client_id,user_name,password)

```

---

## iotauth.baidu(iot_core_id, device_key,device_secret,method,cur_timestamp)



百度物联网平台三元组生成

**参数**

|传入值类型|解释|
|-|-|
|string|iot_core_id|
|string|device_key|
|string|device_secret|
|string|method 加密方式,"MD5" "SHA256" 可选,默认"MD5"|
|number|cur_timestamp 可选 如不填则不校验时间戳|

**返回值**

|返回值类型|解释|
|-|-|
|string|mqtt三元组 client_id|
|string|mqtt三元组 user_name|
|string|mqtt三元组 password|

**例子**

```lua
local client_id,user_name,password = iotauth.baidu("abcd123","mydevice","ImSeCrEt0I1M2jkl")
print(client_id,user_name,password)

```

---

