# iperf - 吞吐量测试

**示例**

```lua
-- 本库仅部分模组固件已添加
-- 当前仅支持server模式, client模式未添加

```

## iperf.server(id)

启动server模式

**参数**

|传入值类型|解释|
|-|-|
|int|网络适配器的id, 必须填, 例如 socket.LWIP_ETH0|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true, 失败返回false|

**例子**

```lua
-- 启动server模式, 监听5001端口
if iperf then
    log.info("启动iperf服务器端")
    iperf.server(socket.LWIP_ETH)
end

```

---

## iperf.client(id)

启动client模式

**参数**

|传入值类型|解释|
|-|-|
|int|网络适配器的id, 必须填, 例如 socket.LWIP_ETH0|
|string|远程服务器的ip, 只能是ipv4地址,不支持域名!!! 必须填值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true, 失败返回false|

**例子**

```lua
-- 启动client模式, 连接服务器的5001端口
if iperf then
    log.info("启动iperf客户端端")
    -- 47.94.236.172 是演示服务器, 不一定有开启
    iperf.client(socket.LWIP_ETH, "47.94.236.172")
    sys.wait(60*1000)
    -- 测试完成停掉
    iperf.abort()
end

-- 测试结果回调
sys.subscribe("IPERF_REPORT", function(bytes, ms_duration, bandwidth)
    log.info("iperf", bytes, ms_duration, bandwidth)
end)

```

---

## iperf.abort()

关闭iperf

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true, 失败返回false|

**例子**

```lua
-- 关闭已经启动的server或者client

```

---

