# natp - 网络地址端口转换(开发中)

**示例**

```lua
-- 开发中, 请关注 https://github.com/wendal/xt804-spinet

```

## napt.init(adapter)

初始化NAPT

**参数**

|传入值类型|解释|
|-|-|
|int|adapter 目标网卡索引, 默认是socket.LWIP_AP, 这里指内网|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## napt.rebuild(buff, is_inet, adapter)

重建MAC包

**参数**

|传入值类型|解释|
|-|-|
|userdata|待处理的MAC包,必须是zbuff对象|
|bool|来源是不是内网|
|int|目标网络适配器的索引, 例如socket.LWIP_GP|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,失败返回false|

**例子**

无

---

## napt.check()

检查和清理NAT表

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 两次check之间没有数据包的映射记录,会被清理

```

---

