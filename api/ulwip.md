# ulwip - 用户空间的lwip集成(开发中)

**示例**

```lua
--[[
注意: 本库处于开发中, 接口随时可能变化
用户空间的LWIP集成, 用于支持lwip的netif的网络集成, 实现在lua代码中直接控制MAC包/IP包的收发

总体数据路径如下

lua代码 -> ulwip.input -> lwip(netif->input) -> lwip处理逻辑 -> luatos socket框架

lua代码 <- ulwip回调函数 <- lwip(netif->low_level_output) <- lwip处理逻辑 <- luatos socket框架

应用示例:
1. Air601的wifi模块作为被控端, 通过UART/SPI收发MAC包, 实现Air780E/Air780EP集成wifi模块的功能
2. 使用W5500/CH395/ENC28J60等以太网模块, 在用户lua代码中控制其mac包收发, 并集成到luatos socket框架中
3. 通过蓝牙模块,集成lowpan6

-- 开发中, 请关注 https://github.com/wendal/xt804-spinet
]]

```

## ulwip.setup(adapter_index, mac, output_lua_ref, opts)

初始化lwip netif

**参数**

|传入值类型|解释|
|-|-|
|int|adapter_index 适配器编号|
|string|mac 网卡mac地址|
|function|output_lua_ref 回调函数, 参数为(adapter_index, data)|
|table|额外参数, 例如 {mtu=1500, flags=(ulwip.FLAG_BROADCAST \| ulwip.FLAG_ETHARP)}|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功与否|

**例子**

```lua
-- 初始化一个适配器, 并设置回调函数
ulwip.setup(socket.LWIP_STA, string.fromHex("18fe34a27b69"), function(adapter_index, data)
    log.info("ulwip", "output_lua_ref", adapter_index, data:toHex())
end)
-- 注意, setup之后, netif的状态是down, 调用ulwip.updown(adapter_index, true)后, 才能正常收发数据

-- 额外参数配置table可选值
-- mtu, 默认1460
-- flags, 默认 ulwip.FLAG_BROADCAST | ulwip.FLAG_ETHARP | ulwip.FLAG_ETHERNET | ulwip.FLAG_IGMP | ulwip.FLAG_MLD6
-- zbuff_out 回调函数接受zbuff作为参数, 默认false
-- reverse 本地lwip设备,翻转调用逻辑, 默认false, 这个参数是为了拦截当前设备的硬件联网数据所设计的

```

---

## ulwip.updown(adapter_index, up)

设置netif的状态

**参数**

|传入值类型|解释|
|-|-|
|int|adapter_index 适配器编号|
|boolean|up true为up, false为down|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功与否|

**例子**

```lua
-- 参考ulwip.setup

```

---

## ulwip.link(adapter_index, up)

设置netif的物理链路状态

**参数**

|传入值类型|解释|
|-|-|
|int|adapter_index 适配器编号|
|boolean|up true为up, false为down|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|当前状态|

**例子**

```lua
-- 参考ulwip.setup

```

---

## ulwip.input(adapter_index, data, len, offset)

往netif输入数据

**参数**

|传入值类型|解释|
|-|-|
|int|adapter_index 适配器编号|
|string/userdata|data 输入的数据|
|int|如果data是zbuff, len默认是zbuff的used, 对string无效|
|int|如果data是zbuff, offset为数据起始位置, 默认是0, 对string无效|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功与否|

**例子**

```lua
-- 参考ulwip.setup

```

---

## ulwip.dhcp(adapter_index, up)

启动或关闭dhcp

**参数**

|传入值类型|解释|
|-|-|
|int|adapter_index 适配器编号|
|boolean|up true为启动, false为关闭|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|当前状态|

**例子**

```lua
-- 参考ulwip.setup

```

---

## ulwip.ip(adapter_index, ip, netmask, gw)

设置或获取ip信息

**参数**

|传入值类型|解释|
|-|-|
|int|adapter_index 适配器编号|
|string|ip IP地址, 仅获取时可以不填|
|string|netmask 子网掩码, 仅获取时可以不填|
|string|gw 网关地址, 仅获取时可以不填|

**返回值**

|返回值类型|解释|
|-|-|
|string|ip地址, 子网掩码, 网关地址|

**例子**

```lua
-- 获取现有值
local ip, netmask, gw = ulwip.ip(socket.LWIP_STA)
-- 设置新值
ulwip.ip(socket.LWIP_STA, "192.168.0.1", "255.255.255.0", "192.168.0.1")

```

---

## ulwip.reg(adapter_index)

将netif注册到luatos socket中

**参数**

|传入值类型|解释|
|-|-|
|int|adapter_index 适配器编号|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功与否|

**例子**

```lua
-- 参考ulwip.setup

```

---

## ulwip.xt804_xfer(spi_id, cs_pin, addr, zbuff, len, offset, auto_seek, auto_len)

操作XT804进行SPI快速收发

**参数**

|传入值类型|解释|
|-|-|
|int|spi_id SPI的ID号|
|int|cs_pin CS脚的GPIO号|
|int|addr 寄存器地址|
|zbuff|zbuff对象|
|int|len 长度|
|int|offset 偏移量, 默认buff:used()|
|boolean|auto_seek 是否自动移动偏移量, 默认false|
|int|auto_len 自动分片长度, 默认按寄存器自动选择|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 本函数属于辅助函数

```

---

