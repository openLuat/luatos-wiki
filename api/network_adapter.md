# network_adapter - 网络接口适配

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/network/adapter/luat_lib_network_adapter.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## network.attach(network.xxx)

将某个通道的通用网络接口的回调调整给lua api

**参数**

|传入值类型|解释|
|-|-|
|int|通用网络通道号|
|function|lua回调函数|

**返回值**

无

**例子**

```lua
network.attach(network.ETH0)

```

---

