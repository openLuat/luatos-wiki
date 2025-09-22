# dhcpsrv - DHCP服务器端

**示例**

```lua
-- 参考dhcpsrv.create函数

```

## dhcpsrv.create(opts)

创建一个dhcp服务器

**参数**

|传入值类型|解释|
|-|-|
|table|选项,参考库的说明, 及demo的用法|

**返回值**

|返回值类型|解释|
|-|-|
|table|服务器对象|

**例子**

```lua
-- 创建一个dhcp服务器, 最简介的版本
dhcpsrv.create({adapter=socket.LWIP_AP})
-- 详细的版本
-- 创建一个dhcp服务器
local dhcpsrv_opts = {
    adapter=socket.LWIP_AP, -- 监听哪个网卡, 必须填写
    mark = {255, 255, 255, 0}, -- 网络掩码, 默认 255.255.255.0
    gw = {192, 168, 4, 1}, -- 网关, 默认自动获取网卡IP，如果获取失败则使用 192.168.4.1
    ip_start = 100, -- ip起始地址, 默认100
    ip_end = 200, -- ip结束地址, 默认200
    ack_cb = function(ip, mac) end, -- ack回调, 有客户端连接上来时触发, ip和mac地址会传进来
}
local mydhcpsrv = dhcpsrv.create(dhcpsrv_opts)

-- 以下是一个打印客户端列表的例子, 非必选, 仅供参考
-- clients是一个table, 包含MAC和IP的对应关系, 注意, IP只记录了最后一段数字, 非完整IP
-- 注意, clients是动态变化的过程, mydhcpsrv对象的其他属性切勿修改, 仅提供clients的只读功能
sys.taskInit(function()
    while true do
        sys.wait(10000)
        -- 这里可以打印一下当前的客户端列表
        for ip, client in pairs(mydhcpsrv.clients) do
            log.info(TAG, "client", ip, client.mac:toHex(), client.tm, client.stat)
        end
    end
end)

-- 自动分配网段功能说明：
-- 如果不指定gw参数，系统会自动获取网卡IP作为网关地址
-- 这样可以确保DHCP分配的IP与网卡IP在同一网段

```

---

