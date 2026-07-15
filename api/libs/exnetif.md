# exnetif - exnetif 控制网络优先级（以太网->WIFI->4G）根据优先级选择上网的网卡。简化开启多网融合的操作，4G作为数据出口给WIFI,以太网设备上网，以太网作为数据出口给WIFI,Air8000上网，WIFI作为数据出口给Air8000,以太网上网。

**示例**

```lua
本文件的对外接口有9个：
1、exnetif.set_priority_order(networkConfigs)：设置网络优先级顺序并初始化对应网络(需要在task中调用)
2、exnetif.notify_status(cb_fnc)：设置网络状态变化回调函数
3、exnetif.setproxy(adapter, main_adapter,other_configs)：配置网络代理实现多网融合(需要在task中调用)
4、exnetif.check_network_status(interval),检测间隔时间ms(选填)，不填时只检测一次，填写后将根据间隔时间循环检测，会提高模块功耗
5、exnetif.close(type, adapter)：关闭网卡功能或多网融合,内核固件版本需为2026年1月后的固件
6、exnetif.update_wifi(config)：运行时更新WiFi账号密码,用于引擎主机等需要动态获取WiFi凭证的场景
7、exnetif.switch_upstream_wifi(config)：多网融合代理模式下切换上游WiFi，自动处理NAPT关闭/重开(需要在task中调用)
8、exnetif.disable_upstream_autoreconnect()：禁用上游WiFi自动重连功能
9、exnetif.version()：获取库文件版本信息

-- 版本更新说明
-- 版本号：202607141200
-- 1、更新时间：2026-07-14 12:00
-- 2、更新内容
--    新增exnetif.switch_upstream_wifi(config)接口：多网融合代理模式下切换上游WiFi，封装NAPT关闭→断连→重连→NAPT恢复全流程
--    新增exnetif.disable_upstream_autoreconnect()接口：禁用上游WiFi自动重连
--    setproxy 增加 auto_reconnect 参数：建立代理时可选择启用上游WiFi异常掉线自动重连
--    exnetif.close(true) 同步清理 wifi_config 字段

-- 版本号：202607100900
-- 1、更新时间：2026-07-10 09:00
-- 2、更新内容
--    exnetif.close(true)：完整实现关闭多网融合功能（停止 DHCP 服务器→关闭 DNS 代理→禁用 NAPT→停止代理网卡服务）
--    exnetif.close(false, socket.LWIP_GP_GW)：支持关闭 airlink 4G 网卡（仅设置 DISCONNECTED 状态+apply_priority，无硬件操作）
--    setproxy：保存 DHCP 服务器引用和代理网卡列表，支持多次 setproxy 后的全部清理
--    修复 proxy_state 单值覆盖问题：多次 setproxy 的代理网卡改为数组累积，close(true) 遍历全部关闭

-- 版本号：202607022100
-- 1、更新时间：2026-07-02 21:00
-- 2、更新内容
--    新增exnetif.update_wifi(config)接口
--    修复： 1601 多网融合设置以太网 airlink over uart 4g顺序后，以太网断开后 4g网络连不上问题，ip_lose_handle 网卡掉线时遗漏恢复 OPENED 网卡
--    修复： 1601引擎主机的gpio设置与开发板不同，原airlink_wifi_hardware_init函数会导致引擎主机按键中断失效，airlink_wifi_hardware_init 支持 UART/SPI 双模式，目前改为了手动配置

-- 版本号：202607021200
-- 1、更新时间：2026-07-02 12:00
-- 2、更新内容
--    新增exnetif.version()接口
--    支持exnetif库文件版本号管理功能，版本号的格式为：yyyymmddhhmm，表示yyyy年mm月dd日hh时mm分发布的版本

```

## exnetif.check_network_status(interval),

对正常状态的网卡进行ping测试

**参数**

|传入值类型|解释|
|-|-|
|int|检测间隔时间ms(选填)，不填时只检测一次，填写后将根据间隔时间循环检测，会提高模块功耗|

**返回值**

无

**例子**

无

---

## exnetif.set_priority_order(new_priority)

设置网络优先级，相应网卡获取到ip且网络正常视为网卡可用，丢失ip视为网卡不可用.(需要在task中调用)

**参数**

|传入值类型|解释|
|-|-|
|table|网络优先级列表,优先级从高到低对应table中的第一个参数到最后一个参数|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true，失败返回false|

**例子**

```lua
多网优先级模式：
exnetif.set_priority_order({
    { -- 最高优先级网络
        WIFI = { -- WiFi配置
            ssid = "your_ssid",       -- WiFi名称(string)
            password = "your_pwd",    -- WiFi密码(string)
            need_ping = true,         -- 是否需要通过ping来测试网络的连通性
                                      -- 在没有ping测试环境的项目中，需要将这个参数设置为false，表示不需要ping测试网络连通，
                                      -- 仅根据IP READY消息（即获取到了ip地址）来判断网络环境准备就绪，是否网络连通性则无法保证
                                      -- 如果没有设置此参数，默认为true
                                      -- 在有ping测试环境的项目中，建议不要将这个参数设置为true
            local_network_mode = true,-- 局域网模式(选填参数)，设置为true时，exnetif会自动将ping_ip设置为网卡的网关ip。
                                      -- 用户不需要传入ping_ip参数，即使传入了，也无效。
                                      -- 这个模式的使用场景，仅适用于局域网环境；可以访问外网时，不要使用
            ping_ip = "112.125.89.8", -- 连通性检测IP(选填参数),默认使用httpdns获取baidu.com的ip作为判断条件，
                                      -- 注：如果填写ip，则ping通作为判断网络是否可用的条件，
                                      -- 所以需要根据网络环境填写内网或者外网ip,
                                      -- 填写外网ip的话要保证外网ip始终可用，
                                      -- 填写局域网ip的话要确保相应ip固定且能够被ping通
            ping_time = 10000         -- 填写ping_ip且未ping通时的检测间隔(ms, 可选，默认为10秒)
                                      -- 定时ping将会影响模块功耗，使用低功耗模式的话可以适当延迟间隔时间
        }
    },
    { -- 次优先级网络
        ETHERNET = { -- 以太网配置
            pwrpin = 140,                   -- 供电使能引脚(number)
            need_ping = true,               -- 是否需要通过ping来测试网络的连通性
                                            -- 在没有ping测试环境的项目中，需要将这个参数设置为false，表示不需要ping测试网络连通，
                                            -- 仅根据IP READY消息（即获取到了ip地址）来判断网络环境准备就绪，是否网络连通性则无法保证
                                            -- 如果没有设置此参数，默认为true
                                            -- 在有ping测试环境的项目中，建议不要将这个参数设置为true
            local_network_mode = true,      -- 局域网模式(选填参数)，设置为true时，exnetif会自动将ping_ip设置为网卡的网关ip。
                                            -- 用户不需要传入ping_ip参数，即使传入了，也无效。
                                            -- 这个模式的使用场景，仅适用于局域网环境；可以访问外网时，不要使用
            ping_ip = "112.125.89.8",       -- 连通性检测IP(选填参数),默认使用httpdns获取baidu.com的ip作为判断条件，
                                            -- 注：如果填写ip，则ping通作为判断网络是否可用的条件，
                                            -- 所以需要根据网络环境填写内网或者外网ip,
                                            -- 填写外网ip的话要保证外网ip始终可用，
                                            -- 填写局域网ip的话要确保相应ip固定且能够被ping通
            ping_time = 10000,              -- 填写ping_ip且未ping通时的检测间隔(ms, 可选,默认为10秒)
                                            -- 定时ping将会影响模块功耗，使用低功耗模式的话可以适当延迟间隔时间
            tp = netdrv.CH390,              -- 网卡芯片型号(选填参数)，仅spi方式外挂以太网时需要填写。
            opts = { spi = 1, cs = 12, irq = 19 }, -- 外挂方式,需要额外的参数(选填参数)，仅spi方式外挂以太网时需要填写。irq为中断引脚(选填参数)，配置后可使用中断模式提高响应速度
                                            -- 使用CH390H时，推荐将IRQ引脚连接到模组的GPIO，启用中断模式
            static_ip = {                   -- 静态ip配置(选填参数)，不填写则使用dhcp获取ip
                ipv4 = "192.168.5.100",     -- ip地址(string)
                mark = "255.255.255.0",     -- 子网掩码(string)
                gw = "192.168.5.1"          -- 网关地址(string)
            }
        }
    },
    { -- 最低优先级网络
        LWIP_GP = true  -- 启用4G网络
    }
})
单网络模式：
-- 单网络模式下只使用WIFI网络
    exnetif.set_priority_order({
        { -- 单网络，打开wifi
            WIFI = { -- WiFi配置
                ssid = "test",       -- WiFi名称(string)
                password = "HZ88888888",    -- WiFi密码(string)
            }
        }
    })
-- Air8000系列和780EXX系列单网络模式下只使用SPI以太网网络
    exnetif.set_priority_order({
        {
            ETHERNET = { -- 以太网配置
                pwrpin = 140, -- 供电使能引脚(number)
                tp = netdrv.CH390, -- 网卡芯片型号(选填参数)，仅spi方式外挂以太网时需要填写。
                opts = {spi = 1, cs = 12}, -- 外挂方式,需要额外的参数(选填参数)，仅spi方式外挂以太网时需要填写。
            }
        }
    })
-- Air8101单网络模式下只使用SPI以太网网络
    exnetif.set_priority_order({
        {
            ETHUSER1 = { -- 以太网配置
                pwrpin = 13, -- 供电使能引脚(number)
                tp = netdrv.CH390, -- 网卡芯片型号(选填参数)，仅spi方式外挂以太网时需要填写。
                opts = {spi = 0, cs = 15, irq = 18}, -- 外挂方式,需要额外的参数(选填参数)，仅spi方式外挂以太网时需要填写。irq为中断引脚(选填参数)，配置后可使用中断模式提高响应速度
                static_ip = {                   -- 静态ip配置(选填参数)，不填写则使用dhcp获取ip
                    ipv4 = "192.168.5.100",     -- ip地址(string)
                    mark = "255.255.255.0",     -- 子网掩码(string)
                    gw = "192.168.5.1"          -- 网关地址(string)
                }
            }
        }
    })
-- 单网络模式下只使用RMII以太网网络
    exnetif.set_priority_order({
        {
            ETHERNET = { -- 以太网配置
                pwrpin = 13, -- 供电使能引脚(number)
            }
        }
    })
-- Air1601单网络模式下使用UART接口外挂4G模组(Air780EPM)
    exnetif.set_priority_order({
        {
            airlink_4G = { -- AirLink 4G配置
                auto_socket_switch = false,     -- 切换网卡时是否断开之前网卡的所有socket连接并用新的网卡重新建立连接
                airlink_type = airlink.MODE_UART, -- airlink工作模式：UART模式
                airlink_uart_id = 3,            -- airlink使用的UART接口ID(选填参数)，UART模式时填写
                airlink_uart_baud = 2000000,    -- airlink使用的UART波特率(选填参数)，默认2000000
                airlink_adapter = socket.LWIP_USER0 -- 网卡标识(选填参数)，Air1601使用socket.LWIP_USER0
            }
        }
    })
-- Air8101单网络模式下使用SPI接口外挂4G模组(Air780EPM)
    exnetif.set_priority_order({
        {
            airlink_4G = { -- AirLink 4G配置
                auto_socket_switch = false,     -- 切换网卡时是否断开之前网卡的所有socket连接并用新的网卡重新建立连接
                airlink_type = airlink.MODE_SPI_MASTER, -- airlink工作模式：SPI主模式
                airlink_spi_id = 0,             -- airlink使用的SPI接口ID(选填参数)，SPI模式时填写
                airlink_cs_pin = 15,            -- airlink使用的片选引脚gpio号(选填参数)，SPI模式时填写
                airlink_rdy_pin = 48            -- airlink使用的rdy引脚gpio号(选填参数)，SPI模式时填写
            }
        }
    })
-- Air1601单网络模式下使用airlink WiFi（WHALE方案）
    exnetif.set_priority_order({
        {
            airlink_wifi = { -- AirLink WiFi配置（Air1601 WHALE方案）
                auto_socket_switch = false,     -- 切换网卡时是否断开之前网卡的所有socket连接并用新的网卡重新建立连接
                airlink_type = airlink.MODE_UART, -- airlink工作模式：UART模式
                airlink_uart_id = 3,            -- airlink使用的UART接口ID(选填参数)，UART模式时填写
                airlink_uart_baud = 2000000,    -- airlink使用的UART波特率(选填参数)，默认2000000
                ssid = "your_ssid",             -- WiFi名称(string)
                password = "your_pwd",           -- WiFi密码(string)
            }
        }
    })
-- 4G单网模式下，不需要require "exnetif"，减少不必要的功能模块加载

```

---

## exnetif.notify_status(cb_fnc)

设置网络状态变化回调函数。触发条件：网卡切换或者所有网卡都断网。回调函数的输入参数: 1. 当有可用网络的时候，返回当前使用网卡、网卡id；2. 当没有可用网络的时候，返回 nil、-1 。

**参数**

|传入值类型|解释|
|-|-|
|function|回调函数|

**返回值**

无

**例子**

```lua
    exnetif.notify_status(function(net_type,adapter)
    log.info("可以使用优先级更高的网络:", net_type,adapter)
    end)

```

---

## exnetif.setproxy(adapter, main_adapter,other_configs)

设置多网融合模式，例如4G作为数据出口给WIFI或以太网设备上网(需要在task中调用)

**参数**

|传入值类型|解释|
|-|-|
|adapter|需要使用网络的网卡，例如socket.LWIP_ETH|
|adapter|提供网络的网卡，例如socket.LWIP_GP|
|table|其他设置参数(选填参数)，|

**返回值**

无

**例子**

```lua
    典型应用：
    -- 以太网WAN提供网络其他设备连接以太网LAN口上网
    exnetif.setproxy(socket.LWIP_ETH, socket.LWIP_USER1, {
            ethpower_en = 20,-- 以太网模块的pwrpin引脚(gpio编号)
            tp = netdrv.CH390, -- 网卡芯片型号(选填参数)，仅spi方式外挂以太网时需要填写。
            opts = {spi = 0, cs = 8, irq = 19}, -- 外挂方式,需要额外的参数(选填参数)，仅spi方式外挂以太网时需要填写。irq为中断引脚(选填参数)，配置后可使用中断模式提高响应速度
            main_adapter = {
                ethpower_en = 21,-- 以太网模块的pwrpin引脚(gpio编号)
                tp = netdrv.CH390, -- 网卡芯片型号(选填参数)，仅spi方式外挂以太网时需要填写。
                opts = {spi = 1, cs = 12, irq = 20} -- irq为中断引脚(选填参数)，配置后可使用中断模式提高响应速度
            }
        }) then
    -- wifi_sta提供网络开启wifi_ap热点供设备上网
    exnetif.setproxy(socket.LWIP_AP, socket.LWIP_STA, {
            ssid = "test2",                  -- AP热点名称(string)，网卡包含wifi时填写
            password = "HZ88888888",         -- AP热点密码(string)，网卡包含wifi时填写
            ap_opts = {                      -- AP模式下配置项(选填参数)
                hidden = false,              -- 是否隐藏SSID, 默认false,不隐藏
                max_conn = 4 },              -- 最大客户端数量, 默认4
            channel = 6,                     -- AP建立的通道, 默认6
            main_adapter = {
                ssid = "test",                -- 提供网络的网卡开启参数
                password = "HZ88888888"
            }
        })
    -- 4G提供网络开启wifi_ap热点供设备上网,其他设备连接以太网LAN口上网
    exnetif.setproxy(socket.LWIP_AP, socket.LWIP_GP, {
        ssid = "Hotspot",                -- WiFi名称(string)，网卡包含wifi时填写
        password = "password123",        -- WiFi密码(string)，网卡包含wifi时填写
        adapter_addr = "192.168.5.1",    -- adapter网卡的ip地址(选填),需要自定义ip和网关ip时填写
        adapter_gw= { 192, 168, 5, 1 },   -- adapter网卡的网关地址(选填),需要自定义ip和网关ip时填写
        ap_opts={                        -- AP模式下配置项(选填参数)
        hidden = false,                  -- 是否隐藏SSID, 默认false,不隐藏
        max_conn = 4 },                  -- 最大客户端数量, 默认4
        channel=6                        -- AP建立的通道, 默认6
    })
    exnetif.setproxy(socket.LWIP_ETH, socket.LWIP_GP, {
        tp = netdrv.CH390,               -- 网卡芯片型号(选填参数)，仅spi方式外挂以太网时需要填写。
        opts = { spi = 1, cs = 12, irq = 19}, -- 外挂方式,需要额外的参数(选填参数)，仅spi方式外挂以太网时需要填写。irq为中断引脚(选填参数)，配置后可使用中断模式提高响应速度
        ethpower_en = 140,               -- 以太网模块的pwrpin引脚(gpio编号)
        adapter_addr = "192.168.5.1",    -- adapter网卡的ip地址(选填),需要自定义ip和网关ip时填写
        adapter_gw= { 192, 168, 5, 1 },   -- adapter网卡的网关地址(选填),需要自定义ip和网关ip时填写
    })
    -- 以太网提供网络供WiFi设备上网
    exnetif.setproxy(socket.LWIP_AP, socket.LWIP_ETH, {
        ssid = "Hotspot",                -- WiFi名称(string)，网卡包含wifi时填写
        password = "password123",        -- WiFi密码(string)，网卡包含wifi时填写
        main_adapter={
            tp = netdrv.CH390,               -- 网卡芯片型号(选填参数)，仅spi方式外挂以太网时需要填写。
            opts = { spi = 1, cs = 12, irq = 20}, -- 外挂方式,需要额外的参数(选填参数)，仅spi方式外挂以太网时需要填写。irq为中断引脚(选填参数)，配置后可使用中断模式提高响应速度
            ethpower_en = 140,               -- 以太网模块的pwrpin引脚(gpio编号)
        }
    })
    -- WIFI提供网络供以太网设备上网
    exnetif.setproxy(socket.LWIP_ETH, socket.LWIP_STA, {
        tp = netdrv.CH390,               -- 网卡芯片型号(选填参数)，仅spi方式外挂以太网时需要填写。
        opts = { spi = 1, cs = 12, irq = 19}, -- 外挂方式,需要额外的参数(选填参数)，仅spi方式外挂以太网时需要填写。irq为中断引脚(选填参数)，配置后可使用中断模式提高响应速度
        ethpower_en = 140,               -- 以太网模块的pwrpin引脚(gpio编号)
        main_adapter = {
            ssid = "test",                -- 提供网络的网卡开启参数
            password = "HZ88888888"
        }
    })

```

---

## exnetif.update_wifi(config)

运行时更新WiFi账号密码。用于如下场景：设备先通过4G/以太网上线获取WiFi凭证，再动态更新WiFi连接信息。

**参数**

|传入值类型|解释|
|-|-|
|table|config WiFi配置表|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true，失败返回false|

**例子**

```lua
    -- 场景：设备通过4G上线后，从服务端获取WiFi账号密码，动态更新
    exnetif.update_wifi({
        ssid = "new_wifi_ssid",
        password = "new_wifi_password",
        bssid = "AABBCCDDEEFF"  -- 可选，指定BSSID
    })
    -- 如果WiFi之前未初始化（未在set_priority_order中配置），会自动初始化并加入优先级列表

```

---

## exnetif.close(type,adapter)

关闭网卡功能。(内核固件版本支持情况：Air8000模组对应V2022版本及以后版本，Air780EPM/EHM/EHV/EGH 模组对应V2024及以后版本，Air1601模组对应V1008版本固件)

**参数**

|传入值类型|解释|
|-|-|
|param|type boolean 是否为多网融合(true=关闭多网融合, false=关闭单个网卡)|
|param|adapter number 需要关闭的网卡，可选值: socket.LWIP_ETH/LWIP_USER1/LWIP_STA/LWIP_AP/LWIP_GP/LWIP_GP_GW|

**返回值**

无

**例子**

无

---

## exnetif.switch_upstream_wifi(config)

切换代理模式下的上游WiFi网络。用于场景：多网融合（如ETH -> STA）运行时切换上游WiFi凭证。

**参数**

|传入值类型|解释|
|-|-|
|table|config WiFi配置表|

**返回值**

无

**例子**

无

---

## exnetif.disable_upstream_autoreconnect()

禁用上游WiFi自动重连功能

**参数**

无

**返回值**

无

**例子**

```lua
    exnetif.disable_upstream_autoreconnect()

```

---

