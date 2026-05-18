# exmodbus - exmodbus 控制Modbus RTU/ASCII/TCP主站/从站通信

**示例**

```lua
本文件的对外接口有 6 个：
1、exmodbus.create(config)：创建 modbus 主站/从站，支持 RTU、ASCII、TCP 三种通信模式
2、modbus:read(config)：主站向从站发起读取请求（仅适用于 RTU、ASCII、TCP 主站模式）
3、modbus:write(config)：主站向从站发起写入请求（仅适用于 RTU、ASCII、TCP 主站模式）
4、modbus:destroy()：销毁 modbus 主站/从站实例对象
5、modbus:on(callback)：从站注册回调接口，用于处理主站发起的请求（仅适用于 RTU、ASCII、TCP 从站模式）
6、exmodbus.debug(enable)：设置 debug 开关，开启后会打印接收和发送的原始数据

```

## exmodbus.debug(enable)

设置 debug 开关

**参数**

|传入值类型|解释|
|-|-|
|param|enable boolean 是否开启 debug 模式，true 为开启，false 为关闭|
|return|nil|

**返回值**

无

**例子**

```lua
exmodbus.debug(true)  -- 开启 debug 模式
exmodbus.debug(false) -- 关闭 debug 模式

```

---

## exmodbus.create(config)

创建一个新的实例；

**参数**

|传入值类型|解释|
|-|-|
|param|config table 配置参数表，包含以下字段：|

**返回值**

无

**例子**

无

---

## modbus:read(config)

主站向从站发送读取请求（仅适用于 RTU、ASCII、TCP 主站模式）

**参数**

|传入值类型|解释|
|-|-|
|param|config table 配置参数表，包含以下字段：|

**返回值**

无

**例子**

无

---

## modbus:write(config)

主站向从站发送写入请求（仅适用于 RTU、ASCII、TCP 主站模式）

**参数**

|传入值类型|解释|
|-|-|
|param|config table 配置参数表，包含以下字段：|

**返回值**

无

**例子**

无

---

## modbus:destroy()

销毁 modbus 主站/从站实例对象

**参数**

|传入值类型|解释|
|-|-|
|return|nil|

**返回值**

无

**例子**

```lua
modbus:destroy()

```

---

## modbus:on(callback)

从站注册回调接口，用于处理主站发起的请求（仅适用于 RTU、ASCII、TCP 从站模式）

**参数**

|传入值类型|解释|
|-|-|
|param|callback function 回调函数，格式为：|

**返回值**

无

**例子**

无

---

