# dhcam - 大华摄像头功能模块，为exremotecam主模块提供大华摄像头的具体实现

**示例**

```lua
   注意：
        1. dhcam.lua是大华摄像头的功能模块，需配合exremotecam主模块使用
        2. 使用前请确保网络连接正常，能够访问到目标摄像头

    使用时，需要按照以下顺序加载模块：
        require "dhcam" -- 首先加载具体型号的摄像头功能模块（如大华）
        require "exremotecam" -- 然后加载exremotecam主模块

```

## split_string_by_pipe(input_str,return_type)

按竖线(|)分割字符串，支持多种返回格式

**参数**

|传入值类型|解释|
|-|-|
|string|input_str 要分割的字符串，格式如"1111\|2222\|3333"|
|string/number|return_type 返回类型，可选值：|

**返回值**

无

**例子**

无

---

## ElementJudg(Data, number)

解析并验证OSD显示元素，确保不超出最大显示行数

**参数**

|传入值类型|解释|
|-|-|
|string|Data 竖线分隔的OSD文本内容，格式如"1111\|2222\|3333"|
|number|number 最大允许显示的行数|

**返回值**

|返回值类型|解释|
|-|-|
|table|分割后的所有OSD元素数组|

**例子**

无

---

## urlencode(str)

URL编码函数，用于将字符串转换为符合URL标准的编码格式

**参数**

|传入值类型|解释|
|-|-|
|string|str 需要进行URL编码的字符串|

**返回值**

|返回值类型|解释|
|-|-|
|string|编码后的URL安全字符串，如果输入为nil则返回空字符串|

**例子**

无

---

## CameraHA1(username,realm,password)

计算Digest认证中的HA1值，用于网络摄像头的身份验证

**参数**

|传入值类型|解释|
|-|-|
|string|username 用户名|
|string|realm 认证域，由服务器在401响应中提供|
|string|password 用户密码|

**返回值**

|返回值类型|解释|
|-|-|
|string|计算得到的HA1值（小写的MD5哈希值）|

**例子**

无

---

## handle_digest_auth(Host,url,params,headers,HA2)

处理Digest认证，仅在收到401响应时调用

**参数**

|传入值类型|解释|
|-|-|
|string|Host 摄像头的IP地址|
|string|url 请求的URL路径|
|string|params 请求参数|
|table|headers 第一次HTTP请求返回的头部信息|
|string|HA2 预先计算好的HA2值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean,|table 认证是否成功, 更新后的请求头部|

**例子**

无

---

## dhcam.set_osd(dahua_param)

设置大华(Dhua)摄像头的OSD(屏幕显示)模块

**参数**

|传入值类型|解释|
|-|-|
|table|dahua_param 大华摄像头OSD配置参数|
|string|dahua_param.host 摄像头的IP地址|
|string|dahua_param.data 要显示的OSD文本内容|
|number|dahua_param.text_align OSD文本对齐方式，默认为全局的DH_TextAlign|
|number|dahua_param.channel 摄像头通道号，默认为全局的DH_channel|
|number|dahua_param.x OSD显示的X坐标，默认为0|
|number|dahua_param.y OSD显示的Y坐标，默认为0|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|返回值|

**例子**

无

---

## dhcam.take_picture(dahua_param)

大华摄像头拍照功能，获取指定通道的快照图片

**参数**

|传入值类型|解释|
|-|-|
|table|dahua_param 大华摄像头拍照配置参数|
|string|dahua_param.host 摄像头/NVR的IP地址|
|number|dahua_param.channel 摄像头通道号|
|string|dahua_param.save_path 照片保存路径（可选，默认为"/sd/1.jpeg"）|

**返回值**

|返回值类型|解释|
|-|-|
|number|返回值|

**例子**

无

---

