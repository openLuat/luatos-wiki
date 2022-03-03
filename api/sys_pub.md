# sys系统消息


此处列举了LuatOS框架中自带的系统消息列表



## touchkey



[touchkey接口文档页](https://wiki.luatos.com/api/touchkey.html)



### TOUCHKEY_INC

触摸按键消息

**额外返回参数**

|返回参数类型|解释|
|-|-|
|number|port, 传感器id|
|number|state, 计数器,触摸次数统计|

**例子**

```lua
sys.subscribe("TOUCHKEY_INC", function(id, count)
    -- 传感器id
    -- 计数器,触摸次数统计
    log.info("touchkey", id, count)
end)

```

---

## keyboard



[keyboard接口文档页](https://wiki.luatos.com/api/keyboard.html)



### KB_INC

键盘矩阵消息

**额外返回参数**

|返回参数类型|解释|
|-|-|
|number|port, keyboard id 当前固定为0, 可以无视|
|number|data, keyboard 按键 需要配合init的map进行解析|
|number|state, 按键状态 1 为按下, 0 为 释放|

**例子**

```lua
sys.subscribe("KB_INC", function(port, data, state)
    -- port 当前固定为0, 可以无视
    -- data, 需要配合init的map进行解析
    -- state, 1 为按下, 0 为 释放
    log.info("keyboard", port, data, state)
end)

```

---

## socket



[socket接口文档页](https://wiki.luatos.com/api/socket.html)



### NETC_END_xx

连接断开

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("NETC_END_".. id, 30000)
    log.info("GET NETC_END or timeout")
end)

```

---

## ctiot



[ctiot接口文档页](https://wiki.luatos.com/api/ctiot.html)



### CTIOT_RX

CTIOT 接收回调消息

**额外返回参数**

|返回参数类型|解释|
|-|-|
|string|data, CTIOT 接收数据|

**例子**

```lua
sys.subscribe("CTIOT_RX", function(data)
    log.info("CTIOT_RX", data:toHex())
end)

```

---

### CTIOT_TX

CTIOT 发送回调消息

**额外返回参数**

|返回参数类型|解释|
|-|-|
|bool|error, 是否成功|
|number|error_code, 错误代码|
|number|param, 数据|

**例子**

```lua
sys.subscribe("CTIOT_TX", function (error, error_code, param)
    log.info("CTIOT_TX", error, error_code, param)
end)

```

---

### CTIOT_REG

CTIOT REG回调消息

**额外返回参数**

|返回参数类型|解释|
|-|-|
|bool|error, 是否成功|
|number|error_code, 错误代码|
|number|param, 数据|

**例子**

```lua
sys.subscribe("CTIOT_REG", function (error, error_code, param)
    log.info("CTIOT_REG", error, error_code, param)
end)

```

---

### CTIOT_DEREG

CTIOT DEREG回调消息

**额外返回参数**

|返回参数类型|解释|
|-|-|
|bool|error, 是否成功|
|number|error_code, 错误代码|
|number|param, 数据|

**例子**

```lua
sys.subscribe("CTIOT_DEREG", function (error, error_code, param)
    log.info("CTIOT_DEREG", error, error_code, param)
end)

```

---

### CTIOT_WAKEUP

CTIOT 唤醒回调消息

**额外返回参数**

|返回参数类型|解释|
|-|-|
|bool|error, 是否成功|
|number|error_code, 错误代码|
|number|param, 数据|

**例子**

```lua
sys.subscribe("CTIOT_WAKEUP", function (error, error_code, param)
    log.info("CTIOT_WAKEUP", error, error_code, param)
end)

```

---

### CTIOT_OTHER

CTIOT 其他回调消息

**额外返回参数**

|返回参数类型|解释|
|-|-|
|bool|error, 是否成功|
|number|error_code, 错误代码|
|number|param, 数据|

**例子**

```lua
sys.subscribe("CTIOT_OTHER", function (error, error_code, param)
    log.info("CTIOT_OTHER", error, error_code, param)
end)

```

---

### CTIOT_FOTA

CTIOT FOTA回调消息

**额外返回参数**

|返回参数类型|解释|
|-|-|
|bool|error, 是否成功|
|number|error_code, 错误代码|
|number|param, 数据|

**例子**

```lua
sys.subscribe("CTIOT_FOTA", function (error, error_code, param)
    log.info("CTIOT_FOTA", error, error_code, param)
end)

```

---

## sys



[sys接口文档页](https://wiki.luatos.com/api/sys.html)



### 以0x01为第一个字节开头

用于luatos内部的系统消息传递

**额外返回参数**

|返回参数类型|解释|
|-|-|
|args|返回的数据|

**例子**

```lua
--此为系统内部使用的消息，请勿在外部使用

```

---

## ntp



[ntp接口文档页](https://wiki.luatos.com/api/ntp.html)



### NTP_UPDATE

NTP更新

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("NTP_UPDATE")
end)

```

---

## wlan



[wlan接口文档页](https://wiki.luatos.com/api/wlan.html)



### WLAN_READY

WIFI就绪

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("WLAN_READY")
end)

```

---

### NET_READY

网络就绪

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("NET_READY")
end)

```

---

### WLAN_SCAN_DONE

扫描完成

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("WLAN_SCAN_DONE")
end)

```

---

### WLAN_STA_CONNECTED

连接成功,但还没拿到ip

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("WLAN_STA_CONNECTED")
end)

```

---

### WLAN_STA_CONNECTED_FAIL

连接失败,通常是密码错误

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("WLAN_STA_CONNECTED_FAIL")
end)

```

---

### WLAN_STA_DISCONNECTED

断开连接

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("WLAN_STA_DISCONNECTED")
end)

```

---

### WLAN_AP_START

热点启动

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("WLAN_AP_START")
end)

```

---

### WLAN_AP_STOP

热点停止

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("WLAN_AP_STOP")
end)

```

---

### WLAN_AP_ASSOCIATED

STA 接入

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("WLAN_AP_ASSOCIATED")
end)

```

---

### WLAN_AP_DISASSOCIATED

STA 断开

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("WLAN_AP_DISASSOCIATED")
end)

```

---

### WLAN_PW_RE

配网结束

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("WLAN_PW_RE")
end)

```

---

