# libnetif - libnetif 控制网络优先级（以太网->WIFI->4G）根据优先级选择上网的网卡。简化开启多网融合的操作，4G作为数据出口给WIFI,以太网设备上网，以太网作为数据出口给WIFI,Air8000上网，WIFI作为数据出口给Air8000,以太网上网。

**示例**

```lua
本文件的对外接口有4个：
1、libnetif.set_priority_order(networkConfigs)：设置网络优先级顺序并初始化对应网络(需要在task中调用)
2、libnetif.notify_status(cb_fnc)：设置网络状态变化回调函数
3、libnetif.setproxy(adapter, main_adapter,other_configs)：配置网络代理实现多网融合(需要在task中调用)
4、libnetif.check_network_status(interval),检测间隔时间ms(选填)，不填时只检测一次，填写后将根据间隔时间循环检测，会提高模块功耗

```

## libnetif.setproxy(adapter, main_adapter,other_configs)

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

无

---

## libnetif.check_network_status(interval),

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

