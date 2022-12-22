# socket - 网络接口

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`ESP32C3` {bdg-primary}`Air780`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/network/adapter/luat_lib_socket.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看socket的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/socket)
```

## 常量

|常量|类型|解释|
|-|-|-|
|socket.ETH0|number|带硬件协议栈的ETH0|
|socket.LWIP_ETH|number|使用LWIP协议栈的以太网卡|
|socket.LWIP_STA|number|使用LWIP协议栈的WIFI STA|
|socket.LWIP_AP|number|使用LWIP协议栈的WIFI AP|
|socket.LWIP_GP|number|使用LWIP协议栈的移动蜂窝模块|
|socket.USB|number|使用LWIP协议栈的USB网卡|
|socket.LINK|number|LINK事件|
|socket.ON_LINE|number|ON_LINE事件|
|socket.EVENT|number|EVENT事件|
|socket.TX_OK|number|TX_OK事件|
|socket.CLOSED|number|CLOSED事件|


## socket.localIP(adapter)

获取本地ip,当前仅支持IPV4的地址

**参数**

|传入值类型|解释|
|-|-|
|int|适配器序号， 只能是socket.ETH0（外置以太网），socket.LWIP_ETH（内置以太网），socket.LWIP_STA（内置WIFI的STA），socket.LWIP_AP（内置WIFI的AP），socket.LWIP_GP（内置蜂窝网络的GPRS），socket.USB（外置USB网卡），如果不填，优先选择soc平台自带能上外网的适配器，若仍然没有，选择最后一个注册的适配器|

**返回值**

|返回值类型|解释|
|-|-|
|string|通常是内网ip, 也可能是外网ip, 取决于运营商的分配|
|string|网络掩码|
|string|网关IP|

**例子**

```lua
sys.taskInit(function()
    while 1 do
        sys.wait(3000)
        log.info("socket", "ip", socket.localIP())
		-- 输出示例
		-- 62.39.244.10	255.255.255.255	0.0.0.0
    end
end)

```

---

## socket.create(adapter, cb)

在某个适配的网卡上申请一个socket_ctrl

**参数**

|传入值类型|解释|
|-|-|
|int|适配器序号， 只能是socket.ETH0（外置以太网），socket.LWIP_ETH（内置以太网），socket.LWIP_STA（内置WIFI的STA），socket.LWIP_AP（内置WIFI的AP），socket.LWIP_GP（内置蜂窝网络的GPRS），socket.USB（外置USB网卡），如果不填，优先选择soc平台自带能上外网的适配器，若仍然没有，选择最后一个注册的适配器|
|string|or function string为消息通知的taskName，function则为回调函数，如果固件没有内置sys_wait，则必须是function|

**返回值**

无

**例子**

无

---

## socket.debug(ctrl, onoff)

配置是否打开debug信息

**参数**

|传入值类型|解释|
|-|-|
|user_data|socket.create得到的ctrl|
|boolean|true 打开debug开关|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## socket.config(ctrl, local_port, is_udp, is_tls, keep_idle, keep_interval, keep_cnt, server_cert, client_cert, client_key, client_password)

配置network一些信息，

**参数**

|传入值类型|解释|
|-|-|
|user_data|socket.create得到的ctrl|
|int|本地端口号，小端格式，如果不写，则自动分配一个，如果用户填了端口号则需要小于60000, 默认不写|
|boolean|是否是UDP，默认false|
|boolean|是否是加密传输，默认false|
|int|tcp keep live模式下的idle时间（秒），如果留空则表示不启用，如果是不支持标准posix接口的网卡（比如W5500），则为心跳间隔|
|int|tcp keep live模式下的探测间隔时间（秒）|
|int|tcp keep live模式下的探测次数|
|string|TCP模式下的服务器ca证书数据，UDP模式下的PSK，不需要加密传输写nil，后续参数也全部nil|
|string|TCP模式下的客户端ca证书数据，UDP模式下的PSK-ID，TCP模式下如果不需要验证客户端证书时，忽略，一般不需要验证客户端证书|
|string|TCP模式下的客户端私钥加密数据|
|string|TCP模式下的客户端私钥口令数据|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
socket.config(ctrl, nil, nil ,true)	--最普通的加密TCP传输，证书都不用验证的那种

```

---

## socket.linkup(ctrl)

等待网卡linkup

**参数**

|传入值类型|解释|
|-|-|
|user_data|socket.create得到的ctrl|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true有异常发生，false没有异常，如果有error则不需要看下一个返回值了|
|boolean|true已经linkup，false没有linkup，之后需要接收socket.LINK消息|

**例子**

无

---

## socket.connect(ctrl, ip, remote_port)

作为客户端连接服务器

**参数**

|传入值类型|解释|
|-|-|
|user_data|socket.create得到的ctrl|
|string|or int ip或者域名，如果是IPV4，可以是大端格式的int值|
|int|服务器端口号，小端格式|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true有异常发生，false没有异常，如果有error则不需要看下一个返回值了，如果有异常，后续要close|
|boolean|true已经connect，false没有connect，之后需要接收socket.ON_LINE消息|

**例子**

无

---

## socket.discon(ctrl)

作为客户端断开连接

**参数**

|传入值类型|解释|
|-|-|
|user_data|socket.create得到的ctrl|

**返回值**

无

**例子**

无

---

## socket.close(ctrl)

强制关闭socket

**参数**

|传入值类型|解释|
|-|-|
|user_data|socket.create得到的ctrl|

**返回值**

无

**例子**

无

---

## socket.tx(ctrl, data, ip, port, flag)

发送数据给对端，UDP单次发送不要超过1460字节，否则很容易失败

**参数**

|传入值类型|解释|
|-|-|
|user_data|socket.create得到的ctrl|
|string|or user_data zbuff  要发送的数据|
|string|or int 对端IP，如果是TCP应用则忽略，如果是UDP，如果留空则用connect时候的参数，如果是IPV4，可以是大端格式的int值|
|int|对端端口号，小端格式，如果是TCP应用则忽略，如果是UDP，如果留空则用connect时候的参数|
|int|发送参数，目前预留，不起作用|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true有异常发生，false没有异常，如果有error则不需要看下一个返回值了，如果有异常，后续要close|
|boolean|true缓冲区满了，false没有异常，如果true，则需要等待一段时间或者等到socket.TX_OK消息后再尝试发送，同时忽略下一个返回值|
|boolean|true已经收到应答，false没有收到应答，之后需要接收socket.TX_OK消息， 也可以忽略继续发送，直到full==true|

**例子**

无

---

## socket.rx(ctrl, buff, flag)

接收对端发出的数据，注意数据已经缓存在底层，使用本函数只是提取出来，UDP模式下一次只会取出一个数据包

**参数**

|传入值类型|解释|
|-|-|
|user_data|socket.create得到的ctrl|
|user_data|zbuff 存放接收的数据，如果缓冲区不够大会自动扩容|
|int|接收参数，目前预留，不起作用|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true有异常发生，false没有异常，如果有异常，后续要close|
|int|本次接收到数据长度|
|string|对端IP，只有UDP模式下才有意义，TCP模式返回nil，注意返回的格式，如果是IPV4，1byte 0x00 + 4byte地址 如果是IPV6，1byte 0x01 + 16byte地址|
|int|对端port，只有UDP模式下才有意义，TCP模式返回0|

**例子**

无

---

## socket.wait(ctrl)

等待新的socket消息，在连接成功和发送数据成功后，使用一次将network状态转换到接收新数据

**参数**

|传入值类型|解释|
|-|-|
|user_data|socket.create得到的ctrl|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true有异常发生，false没有异常，如果有异常，后续要close|
|boolean|true有新的数据需要接收，false没有数据，之后需要接收socket.EVENT消息|

**例子**

无

---

## socket.listen(ctrl)

作为服务端开始监听

**参数**

|传入值类型|解释|
|-|-|
|user_data|socket.create得到的ctrl|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true有异常发生，false没有异常，如果有error则不需要看下一个返回值了，如果有异常，后续要close|
|boolean|true已经connect，false没有connect，之后需要接收socket.ON_LINE消息|

**例子**

无

---

## socket.accept(ctrl)

作为服务端接收到一个新的客户端，注意，如果是类似W5500的硬件协议栈不支持1对多，则不需要第二个参数

**参数**

|传入值类型|解释|
|-|-|
|user_data|socket.create得到的ctrl，这里是服务器端|
|string|or function or nil string为消息通知的taskName，function则为回调函数，和socket.create参数一致|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true有异常发生，false没有异常，如果有error则不需要看下一个返回值了，如果有异常，后续要close|
|user_data|or nil 如果支持1对多，则会返回新的ctrl，自动create，如果不支持则返回nil|

**例子**

无

---

## socket.release(ctrl)

主动释放掉network_ctrl

**参数**

无

**返回值**

无

**例子**

无

---

## socket.setDNS(adapter_index, dns_index, ip)

设置DNS服务器

**参数**

|传入值类型|解释|
|-|-|
|int|适配器序号， 只能是socket.ETH0，socket.STA，socket.AP，如果不填，会选择最后一个注册的适配器|
|int|dns服务器序号，从1开始|
|string|or int dns，如果是IPV4，可以是大端格式的int值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true，失败返回false|

**例子**

无

---

## socket.sslLog(log_level)

设置SSL的log

**参数**

|传入值类型|解释|
|-|-|
|int	mbedtls|log等级，<=2基本不打印，不要超过9|
|usage|socket.sslLog(3)|

**返回值**

无

**例子**

无

---

