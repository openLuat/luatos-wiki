# icmp - ICMP协议(PING)

**示例**

```lua
-- 等网络就绪后, 初始化icmp库
icmp.setup(socket.LWIP_GP)
-- 执行ping,等待回应
icmp.ping(socket.LWIP_GP, "183.2.172.177")
-- 等待结果
sys.waitUnitl("PING_RESULT", 3000)
-- 详细用法请看demo

```

## icmp.setup(id)

初始化指定网络设备的icmp

**参数**

|传入值类型|解释|
|-|-|
|int|网络适配器的id|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|

**例子**

```lua
-- 初始化4G网络的icmp, 要等4G联网后才能调用
icmp.setup(socket.LWIP_GP)

```

---

## icmp.ping(id, ip, len)

发起ping(异步的)

**参数**

|传入值类型|解释|
|-|-|
|int|网络适配器的id|
|string|目标ip地址,不支持域名!!|
|int|ping包大小,默认128字节,可以不传|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否, 仅代表发送与否,不代表服务器已经响应|

**例子**

```lua
sys.taskInit(function()
    sys.waitUntil("IP_READY")
    sys.wait(1000)
    icmp.setup(socket.LWIP_GP)
    while 1 do
        icmp.ping(socket.LWIP_GP, "121.14.77.221")
        sys.waitUntil("PING_RESULT", 3000)
        sys.wait(3000)
    end
end)

sys.subscribe("PING_RESULT", function(id, time, dst)
    log.info("ping", id, time, dst);
end)

```

---

