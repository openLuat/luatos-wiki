# 📮 sys系统消息


此处列举了LuatOS框架中自带的系统消息列表



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

## pm



[pm接口文档页](https://wiki.luatos.com/api/pm.html)



### DTIMER_WAKEUP

deep sleep timer定时时间到回调

**额外返回参数**

无

**例子**

```lua
sys.subscribe("DTIMER_WAKEUP", function(timer_id)
    log.info("deep sleep timer", timer_id)
end)

```

---

## pm 



[pm 接口文档页](https://wiki.luatos.com/api/pm .html)



### YHM27XX_REG

YHM27XX芯片寄存器信息更新回调

**额外返回参数**

无

**例子**

```lua
sys.subscribe("YHM27XX_REG", function(data)
    -- 注意, 会一次性读出0-9,总共8个寄存器值
    log.info("yhm27xx", data and data:toHex())
end)

```

---

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

## w5500



[w5500接口文档页](https://wiki.luatos.com/api/w5500.html)



### IP_READY

已联网

**额外返回参数**

无

**例子**

```lua
-- 联网后会发一次这个消息
sys.subscribe("IP_READY", function(ip, adapter)
    log.info("w5500", "IP_READY", ip, (adapter or -1) == socket.LWIP_GP)
end)

```

---

### IP_LOSE

已断网

**额外返回参数**

无

**例子**

```lua
-- 断网后会发一次这个消息
sys.subscribe("IP_LOSE", function(adapter)
    log.info("w5500", "IP_LOSE", (adapter or -1) == socket.ETH0)
end)

```

---

### W5500_IND

w5500状态变化

**额外返回参数**

无

**例子**

```lua
sys.subscribe("W5500_IND", function(status)
    -- status的取值有:
    -- CABLE_INSERT 网线插入
    -- CABLE_REMOVE 网线拔出
	-- DHCP_TIMEOUT 获取IP超时
    log.info("w5500 status", status)
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
sys.subscribe("LORA_RX_DONE", function(data, size, rssi, snr)
    -- rssi 和  snr 于 2023-09-06 新增
    log.info("LORA_RX_DONE: ", data, size, rssi, snr)
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
sys.subscribe("SIM_IND", function(status, value)
    -- status的取值有:
    -- RDY SIM卡就绪, value为nil
    -- NORDY 无SIM卡, value为nil
    -- SIM_PIN 需要输入PIN, value为nil
    -- GET_NUMBER 获取到电话号码(不一定有值), value为nil
    -- SIM_WC SIM卡的写入次数统计,掉电归0, value为统计值
    log.info("sim status", status, value)
end)

```

---

### CELL_INFO_UPDATE

基站数据已更新

**额外返回参数**

无

**例子**

```lua
-- 订阅式
sys.subscribe("CELL_INFO_UPDATE", function()
    log.info("cell", json.encode(mobile.getCellInfo()))
end)

```

---

### SCELL_INFO

服务小区额外信息更新

**额外返回参数**

无

**例子**

```lua
-- 订阅式
sys.subscribe("SCELL_INFO", function()
    log.info("service cell", mobile.scell()))
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
sys.subscribe("IP_READY", function(ip, adapter)
    log.info("mobile", "IP_READY", ip, (adapter or -1) == socket.LWIP_GP)
end)

```

---

### IP_LOSE

已断网

**额外返回参数**

无

**例子**

```lua
-- 断网后会发一次这个消息
sys.subscribe("IP_LOSE", function(adapter)
    log.info("mobile", "IP_LOSE", (adapter or -1) == socket.LWIP_GP)
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

### CSCON

RRC状态

**额外返回参数**

无

**例子**

```lua
-- state 1 CONNECT 0 IDLE
sys.subscribe("CSCON", function(state)
	log.info("mobile", "CSCON", state)
end)

```

---

### CC_IND

通话状态变化

**额外返回参数**

无

**例子**

```lua
sys.subscribe("CC_IND", function(status, value)
    log.info("cc status", status, value)
end)

```

---

### RRC_IND

RRC部分信息上报,2025/9/15启用

**额外返回参数**

无

**例子**

```lua
sys.subscribe("RRC_IND", function(event, value, ...)
	log.info("rrc status", event, value, ...)
end)
event目前有
1、"DRX",DRX周期值,后续跟1个参数为具体的DRX周期值,单位ms,目前只有320,640,1280,2560
2、"IDLE_MEAS_THRESHOLD",RRC IDLE下邻区测量阈值,后续跟4个参数为具体的测量阈值,单位dbm
4个参数分别为sIntraSearchP, sNonIntraSearchP, sIntraSearchQ, sNonIntraSearchQ
当rsrp <= sIntraSearchP,启动同频邻区测量,低功耗下功耗有所升高
当rsrp <= sNonIntraSearchP,启动异频邻区测量,低功耗下功耗显著升高
如果sIntraSearchQ不为0,当rsrq <= sIntraSearchQ,启动同频邻区测量,低功耗下功耗有所升高
如果sNonIntraSearchQ不为0,当rsrq <= sNonIntraSearchQ,启动异频邻区测量,低功耗下功耗显著升高

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

## sms



[sms接口文档页](https://wiki.luatos.com/api/sms.html)



### SMS_INC

收到短信

**额外返回参数**

|返回参数类型|解释|
|-|-|
|string|手机号|
|string|短信内容，UTF8编码|

**例子**

```lua
--使用的例子，可多行
-- 接收短信, 支持多种方式, 选一种就可以了
-- 1. 设置回调函数
--sms.setNewSmsCb( function(phone,sms)
    log.info("sms",phone,sms)
end)
-- 2. 订阅系统消息
--sys.subscribe("SMS_INC", function(phone,sms)
    log.info("sms",phone,sms)
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

