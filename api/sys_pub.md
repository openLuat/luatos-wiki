# 📮 sys系统消息


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

## libgnss



[libgnss接口文档页](https://wiki.luatos.com/api/libgnss.html)



### GNSS_STATE

GNSS状态变化

**额外返回参数**

无

**例子**

```lua
sys.subscribe("GNSS_STATE", function(event, ticks)
    -- event取值有 
    -- FIXED 定位成功
    -- LOSE  定位丢失
    -- ticks是事件发生的时间,一般可以忽略
    log.info("gnss", "state", event, ticks)
end)

```

---

## mobile



[mobile接口文档页](https://wiki.luatos.com/api/mobile.html)



### SIM_IND

sim卡状态变化

**额外返回参数**

无

**例子**

```lua
sys.subscribe("SIM_IND", function(status)
    log.info("sim status", status)
end)

```

---

### CELL_INFO_UPDATE

基站数据已更新

**额外返回参数**

无

**例子**

```lua
-- 订阅式, 模块本身会周期性查询基站信息,但通常不包含临近小区
sys.subscribe("CELL_INFO_UPDATE", function()
    log.info("cell", json.encode(mobile.getCellInfo()))
end)

```

---

### IP_READY

已联网

**额外返回参数**

无

**例子**

```lua
-- 联网后会发一次这个消息
-- 与wlan库不同, 本消息不带ip地址
sys.subscribe("IP_READY", function()
    log.info("mobile", "IP_READY")
end)

```

---

### NTP_UPDATE

时间已经同步

**额外返回参数**

无

**例子**

```lua
-- 对于电信/移动的卡, 联网后,基站会下发时间,但联通卡不会,务必留意
sys.subscribe("NTP_UPDATE", function()
    log.info("mobile", "time", os.date())
end)

```

---

## softkeyboard



[softkeyboard接口文档页](https://wiki.luatos.com/api/softkeyboard.html)



### SOFT_KB_INC

软件键盘矩阵消息

**额外返回参数**

|返回参数类型|解释|
|-|-|
|number|port, keyboard id 当前固定为0, 可以无视|
|number|data, keyboard 按键 需要配合init的map进行解析|
|number|state, 按键状态 1 为按下, 0 为 释放|

**例子**

```lua
sys.subscribe("SOFT_KB_INC", function(port, data, state)
    -- port 当前固定为0, 可以无视
    -- data, 需要配合init的map进行解析
    -- state, 1 为按下, 0 为 释放
    log.info("keyboard", port, data, state)
end)

```

---

## socket



[socket接口文档页](https://wiki.luatos.com/api/socket.html)



### NTP_UPDATE

时间已经同步

**额外返回参数**

无

**例子**

```lua
sys.subscribe("NTP_UPDATE", function()
    log.info("socket", "sntp", os.date())
end)

```

---

### NTP_ERROR

时间同步失败

**额外返回参数**

无

**例子**

```lua
sys.subscribe("NTP_ERROR", function()
    log.info("socket", "sntp error")
end)

```

---

## lora



[lora接口文档页](https://wiki.luatos.com/api/lora.html)



### LORA_TX_DONE

LORA 发送完成

**额外返回参数**

无

**例子**

```lua
sys.subscribe("LORA_TX_DONE", function()
    lora.recive(1000)
end)

```

---

### LORA_RX_DONE

LORA 接收完成

**额外返回参数**

无

**例子**

```lua
sys.subscribe("LORA_RX_DONE", function(data, size)
    log.info("LORA_RX_DONE: ", data, size)
    lora.send("PING")
end)

```

---

### LORA_TX_TIMEOUT

LORA 发送超时

**额外返回参数**

无

**例子**

```lua
sys.subscribe("LORA_TX_TIMEOUT", function()
    lora.recive(1000)
end)

```

---

### LORA_RX_TIMEOUT

LORA 接收超时

**额外返回参数**

无

**例子**

```lua
sys.subscribe("LORA_RX_TIMEOUT", function()
    lora.recive(1000)
end)

```

---

### LORA_RX_ERROR

LORA 接收错误

**额外返回参数**

无

**例子**

```lua
sys.subscribe("LORA_RX_ERROR", function()
    lora.recive(1000)
end)

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

