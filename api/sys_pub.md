# sys系统消息


此处列举了LuatOS框架中自带的系统消息列表



## wlan

### WLAN_SCAN_DONE

WIFI扫描结束

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

连上wifi路由器/热点,但还没拿到ip

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

没有连上wifi路由器/热点,通常是密码错误

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

从wifi路由器/热点断开了

**额外返回参数**

无

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("WLAN_STA_DISCONNECTED")
end)

```

---

