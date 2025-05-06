# netdrv - 网络设备管理

## 常量

|常量|类型|解释|
|-|-|-|
|netdrv.CH390|number|南京沁恒CH390系列,支持CH390D/CH390H, SPI通信|
|netdrv.WHALE|number|虚拟网卡|
|netdrv.CTRL_RESET|number|控制类型-复位,当前仅支持CH390H|
|netdrv.CTRL_RESET|number|请求对网卡硬复位,当前仅支持CH390H|
|netdrv.CTRL_RESET|number|请求对网卡硬复位,当前仅支持CH390H|


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

