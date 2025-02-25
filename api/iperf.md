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

