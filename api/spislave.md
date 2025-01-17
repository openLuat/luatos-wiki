# spislave - SPI从机

**示例**

```lua
-- 请查阅demo
-- 当前仅XT804系列支持, 例如 Air101/Air103/Air601

```

## spislave.setup(id, opts)



初始化SPI从机

**参数**

|传入值类型|解释|
|-|-|
|int|从机SPI的编号,注意与SPI主机的编号的差异,这个与具体设备相关|
|table|opts 扩展配置参数,当前无参数|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true表示成功,其他失败|

**例子**

```lua
-- 当前仅XT804系列支持, 例如 Air101/Air103/Air601/Air690
-- Air101为例, 初始化SPI从机, 编号为2, SPI模式
spislave.setup(2)
-- Air101为例, 初始化SPI从机, 编号为3, SDIO模式
spislavve.setup(3)

```

---

## spislave.ready(id)



是否可写

**参数**

|传入值类型|解释|
|-|-|
|int|从机SPI的编号|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true表示可写,其他不可写|

**例子**

无

---

## spislave.on(id, cb)



注册事件回调函数

**参数**

|传入值类型|解释|
|-|-|
|int|从机SPI的编号|
|function|回调函数|

**返回值**

无

**例子**

无

---

## spislave.read(id, ptr, buff, len)



读取数据

**参数**

|传入值类型|解释|
|-|-|
|int|从机SPI的编号|
|userdata|用户数据指针, 从回调函数得到|
|int|zbuff缓冲对象|
|int|读取长度,从回调函数得到|

**返回值**

|返回值类型|解释|
|-|-|
|int|读取到字节数,通常与期望读取的长度相同|
|int|错误码, 仅当出错时返回|

**例子**

无

---

## spislave.write(id, ptr, buff, len)



写入数据

**参数**

|传入值类型|解释|
|-|-|
|int|从机SPI的编号|
|userdata|用户数据指针, 当前传nil|
|int|zbuff缓冲对象|
|int|写入长度,注意不能超过硬件限制,通常是1500字节|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true表示成功,其他失败|
|int|错误码, 仅当出错时返回|

**例子**

无

---

