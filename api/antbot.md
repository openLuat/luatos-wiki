# antbot - 蚂蚁链

**示例**

```lua
-- Copyright (C) 2015-2023 Ant Group Holding Limited
-- 本模块由蚂蚁链提供实现并开放给用户使用
-- 具体用法请查阅demo,并联系蚂蚁链获取技术支持

```

## antbot.init()

初始化

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|0:成功 其他值为失败|

**例子**

```lua

-- 初始化蚂蚁链的底层适配
antbot.init()

```

---

## antbot.app_sta_get()

获取客户端状态

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|状态码|

**例子**

无

---

## antbot.version_get()

获取SDK版本号

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|版本号,如果获取失败返回nil|

**例子**

无

---

## antbot.asset_register(asset_id, asset_type, asset_dataver)

asset资源注册

**参数**

|传入值类型|解释|
|-|-|
|string|asset_id 资源ID|
|string|asset_type 资源类型|
|string|asset_dataver 资源数据版本|

**返回值**

|返回值类型|解释|
|-|-|
|int|0:成功 其他值为失败|

**例子**

无

---

## antbot.asset_data_publish(data)

asset资源发布

**参数**

|传入值类型|解释|
|-|-|
|string|data 资源数据|

**返回值**

|返回值类型|解释|
|-|-|
|int|0:成功 其他值为失败|

**例子**

无

---

## antbot.device_status_get()

获取设备状态

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|设备状态|

**例子**

无

---

## antbot.asset_status_get(asset_id)

获取assset状态

**参数**

|传入值类型|解释|
|-|-|
|string|asset_id 资源ID|

**返回值**

|返回值类型|解释|
|-|-|
|int|资源状态|

**例子**

无

---

## antbot.channel_switch(cmd)

切换channel

**参数**

|传入值类型|解释|
|-|-|
|int|0 - 关闭, 1 - 开启|

**返回值**

|返回值类型|解释|
|-|-|
|int|0:成功 其他值为失败|

**例子**

无

---

## antbot.config_set(config)

配置设备

**参数**

|传入值类型|解释|
|-|-|
|string|config 配置内容|

**返回值**

|返回值类型|解释|
|-|-|
|int|0:成功 其他值为失败|

**例子**

无

---

## antbot.config_get()

获取设备配置

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|配置内容|

**例子**

无

---

