# netdrv - 网络设备管理

## 常量

|常量|类型|解释|
|-|-|-|
|netdrv.CH390|number|南京沁恒CH390系列,支持CH390D/CH390H, SPI通信|
|netdrv.WHALE|number|虚拟网卡|
|netdrv.CTRL_RESET|number|控制类型-复位,当前仅支持CH390H|
|netdrv.RESET_HARD|number|请求对网卡硬复位,当前仅支持CH390H|
|netdrv.RESET_SOFT|number|请求对网卡软复位,当前仅支持CH390H|
|netdrv.EVT_SOCKET|number|事件类型-socket事件|


## netdrv.setup(id, tp, opts)

初始化指定netdrv设备

**参数**

|传入值类型|解释|
|-|-|
|int|网络适配器编号, 例如 socket.LWIP_ETH|
|int|实现方式,如果是设备自带的硬件,那就不需要传, 外挂设备需要传,当前支持CH390H/D|
|int|外挂方式,需要额外的参数,参考示例|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|初始化成功与否|

**例子**

```lua
-- Air8101初始化内部以太网控制器
netdrv.setup(socket.LWIP_ETH)

-- Air8000/Air780EPM初始化CH390H/D作为LAN/WAN
-- 支持多个CH390H, 使用不同的CS脚区分不同网口
netdrv.setup(socket.LWIP_ETH, netdrv.CH390, {spi=0,cs=8})
netdrv.dhcp(socket.LWIP_ETH, true)
-- 支持CH390H的中断模式, 能提供响应速度, 但是需要外接中断引脚
-- 实测对总网速没有帮助, 轻负载时能降低功耗, 让模组能进入低功耗模式
netdrv.setup(socket.LWIP_ETH, netdrv.CH390, {spi=0,cs=8,irq=20})

```

---

## netdrv.dhcp(id, enable)

开启或关闭DHCP

**参数**

|传入值类型|解释|
|-|-|
|int|网络适配器编号, 例如 socket.LWIP_ETH|
|boolean|开启或者关闭|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功与否|

**例子**

无

---

## netdrv.mac(id, new_mac, raw_string)

设置或获取设备MAC

**参数**

|传入值类型|解释|
|-|-|
|int|网络适配器编号, 例如 socket.LWIP_ETH|
|string|新的MAC地址,可选, 必须是6个字节|
|boolean|是否返回6字节原始数据, 默认是否, 返回HEX字符串|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功与否|

**例子**

```lua
-- 获取MAC地址
log.info("netdrv", "mac addr", netdrv.mac(socket.LWIP_ETH))
-- 暂不支持设置

```

---

## netdrv.ipv4(id, addr, mark, gw)

设置或读取ipv4地址

**参数**

|传入值类型|解释|
|-|-|
|int|网络适配器编号, 例如 socket.LWIP_ETH|
|string|ipv4地址,如果是读取就不需要传|
|string|掩码|
|string|网关|

**返回值**

|返回值类型|解释|
|-|-|
|string|ipv4地址|
|string|掩码|
|string|网关|

**例子**

```lua
-- 注意, 不是所有netdrv都支持设置的, 尤其4G Cat.1自带的netdrv就不能设置ipv4
-- 注意, 设置ipv4时, DHCP要处于关闭状态!!
-- 当前设置ip但ip值非法, 不返回任何东西
-- 如果设置ip且ip值合法, 会返回ip, mask, gw

```

---

## netdrv.napt(id)

开启或关闭NAPT

**参数**

|传入值类型|解释|
|-|-|
|int|网关适配器的id|

**返回值**

|返回值类型|解释|
|-|-|
|bool|合法值就返回true, 否则返回nil|

**例子**

```lua

-- 使用4G网络作为主网关出口
netdrv.napt(socket.LWIP_GP)

-- 关闭napt功能
netdrv.napt(-1)

```

---

## netdrv.link(id)

获取netdrv的物理连接状态

**参数**

|传入值类型|解释|
|-|-|
|int|netdrv的id, 例如 socket.LWIP_ETH|

**返回值**

|返回值类型|解释|
|-|-|
|bool|已连接返回true, 否则返回false. 如果id对应的netdrv不存在,返回nil|

**例子**

```lua
-- 注意, 本函数仅支持读取, 而且不能ip状态, 即是否能联网

```

---

## netdrv.ready(id)

获取netdrv的网络状态

**参数**

|传入值类型|解释|
|-|-|
|int|netdrv的id, 例如 socket.LWIP_ETH|

**返回值**

|返回值类型|解释|
|-|-|
|bool|已连接返回true, 否则返回false. 如果id对应的netdrv不存在,返回nil|

**例子**

```lua
-- 注意, 本函数仅支持读取, 即判断是否能通信, 不代表IP状态

```

---

## netdrv.ctrl(id, cmd, arg)

给具体的驱动发送控制指令

**参数**

|传入值类型|解释|
|-|-|
|int|网络适配器编号, 例如 socket.LWIP_ETH|
|int|指令, 例如 netdrv.CTRL_RESET|
|int|参数, 例如 netdrv.RESET_HARD|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功与否|

**例子**

```lua
-- 重启网卡, 仅CH390H支持, 其他网络设备暂不支持
-- 本函数于 2025.4.14 新增
netdrv.ctrl(socket.LWIP_ETH, netdrv.CTRL_RESET, netdrv.RESET_HARD)

```

---

## netdrv.debug(id, enable)

设置调试信息输出

**参数**

|传入值类型|解释|
|-|-|
|int|网络适配器编号, 例如 socket.LWIP_ETH, 如果传0就是全局调试开关|
|boolean|是否开启调试信息输出|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功与否|

**例子**

```lua
-- 打开netdrv全局调试开关
netdrv.debug(0, true)

```

---

## netdrv.mreport(config, value)

设置遥测功能（还未实现全部功能）

**参数**

|传入值类型|解释|
|-|-|
|string|配置项|
|boolean|设置功能开关|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功与否|

**例子**

```lua
-- 设置开启与关闭
netdrv.mreport("enable", true)
netdrv.mreport("enable", false)

-- 立即上报一次, 无参数的方式调用
netdrv.mreport()

-- 设置自定义数据
netdrv.mreport("custom", {abc=1234})
-- 清除自定义数据
netdrv.mreport("custom")

```

---

## netdrv.ping(id, ip, len)

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
-- 本功能在2025.9.3新增
sys.taskInit(function()
    -- 要等联网了才能ping
    sys.waitUntil("IP_READY")
    sys.wait(1000)
    while 1 do
        -- 必须指定使用哪个网卡
        netdrv.ping(socket.LWIP_GP, "121.14.77.221")
        sys.waitUntil("PING_RESULT", 3000)
        sys.wait(3000)
    end
end)

sys.subscribe("PING_RESULT", function(id, time, dst)
    log.info("ping", id, time, dst);
end)

```

---

## netdrv.on(adapter_id, event_type, callback)

订阅网络事件

**参数**

|传入值类型|解释|
|-|-|
|int|网络适配器的id|
|int|事件总类型, 当前支持 netdrv.EVT_SOCKET|
|function|回调函数 function(id, event, params)|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否,成功返回true,否则返回nil|

**例子**

```lua
-- 订阅socket连接状态变化事件
netdrv.on(socket.LWIP_ETH, netdrv.EVT_SOCKET, function(id, event, params)
    -- id 是网络适配器id
    -- event是事件id, 字符串类型, 
        - create 创建socket对象
        - release 释放socket对象
        - connecting 正在连接, 域名解析成功后出现
        - connected 连接成功, TCP三次握手成功后出现
        - closed 连接关闭
        - remote_close 远程关闭, 网络中断,或者服务器主动断开
        - timeout dns解析超时,或者tcp连接超时
        - error 错误,包括一切异常错误
    -- params是参数表
        - remote_ip 远端ip地址,未必存在
        - remote_port 远端端口,未必存在
        - online_ip 实际连接的ip地址,未必存在
        - domain_name 远端域名,如果是通过域名连接的话, release时没有这个值, create时也没有
    log.info("netdrv", "socket event", id, event, json.encode(params or {}))
    if params then
        -- params里会有remote_ip, remote_port等信息, 可按需获取
        local remote_ip = params.remote_ip
        local remote_port = params.remote_port
        local domain_name = params.domain_name
        log.info("netdrv", "socket event", "remote_ip", remote_ip, "remote_port", remote_port, "domain_name", domain_name)
    end
end)

```

---

