# sys系统消息


此处列举了LuatOS框架中自带的系统消息列表



## wlan

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

