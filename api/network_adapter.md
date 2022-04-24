# network_adapter - 网络接口适配

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/network/adapter/luat_lib_network.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## network.create(adapter, cb)

在某个适配的网卡上申请一个network_ctrl

**参数**

|传入值类型|解释|
|-|-|
|int|适配器序号， 只能是network.ETH0，network.STA，network.AP，如果不填，会选择最后一个注册的适配器|
|string|or function string为消息通知的taskName，function则为回调函数，如果固件没有内置sys_wait，则必须是function|

**返回值**

无

**例子**

无

---

## network.debug(ctrl, onoff)

作为客户端断开连接

**参数**

|传入值类型|解释|
|-|-|
|user_data|network.create得到的ctrl|
|boolean|true 打开debug开关|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## network.linkup(ctrl)

等待网卡linkup

**参数**

|传入值类型|解释|
|-|-|
|user_data|network.create得到的ctrl|

**返回值**

无

**例子**

无

---

## network.connect(ctrl, ip, remote_port, is_udp, local_port, keep_idle, keep_interval, keep_cnt, server_cert, client_cert, client_key, client_password)

作为客户端连接服务器

**参数**

|传入值类型|解释|
|-|-|
|user_data|network.create得到的ctrl|
|string|or int ip或者域名，如果是IPV4，可以是大端格式的int值|
|int|服务器端口号，小端格式|
|int|本地端口号，小端格式，如果不写，则自动分配一个，如果用户填了端口号则需要小于60000, 默认不写|
|boolean|是否是UDP，默认false|
|int|tcp keep live模式下的idle时间，如果留空则表示不启用，如果是不支持标准posix接口的网卡（比如W5500），则为心跳间隔|
|int|tcp keep live模式下的探测间隔时间|
|int|tcp keep live模式下的探测次数|
|string|TCP模式下的服务器ca证书数据，UDP模式下的PSK，不需要加密传输写nil，后续参数也全部nil|
|string|TCP模式下的客户端ca证书数据，UDP模式下的PSK-ID，TCP模式下如果不需要验证客户端证书时，忽略，一般不需要验证客户端证书|
|string|TCP模式下的客户端私钥加密数据|
|string|TCP模式下的客户端私钥口令数据|

**返回值**

无

**例子**

无

---

## network.close(ctrl)

作为客户端断开连接

**参数**

|传入值类型|解释|
|-|-|
|user_data|network.create得到的ctrl|

**返回值**

无

**例子**

无

---

## network.tx(ctrl, data, ip, port, flag)

发送数据给对端

**参数**

|传入值类型|解释|
|-|-|
|user_data|network.create得到的ctrl|
|string|or user_data zbuff  要发送的数据|
|string|or int 对端IP，如果是TCP应用则忽略，如果是UDP，如果留空则用connect时候的参数，如果是IPV4，可以是大端格式的int值|
|int|对端端口号，小端格式，如果是TCP应用则忽略，如果是UDP，如果留空则用connect时候的参数|
|int|发送参数，目前预留，不起作用|

**返回值**

无

**例子**

无

---

## network.rx(ctrl, buff, start, flag)

接收对端发出的数据，注意数据已经缓存在底层，使用本函数只是提取出来，UDP模式下一次只会取出一个数据包

**参数**

|传入值类型|解释|
|-|-|
|user_data|network.create得到的ctrl|
|user_data|zbuff 存放接收的数据，如果缓冲区不够大会自动扩容|
|int|接收参数，目前预留，不起作用|

**返回值**

无

**例子**

无

---

## network.wait(ctrl)

等待新的socket消息，在连接成功和发送数据成功后，使用一次将network状态转换到接收新数据

**参数**

|传入值类型|解释|
|-|-|
|user_data|network.create得到的ctrl|

**返回值**

无

**例子**

无

---

## network.release(ctrl)

主动释放掉network_ctrl

**参数**

无

**返回值**

无

**例子**

无

---

