# onewire - 单总线协议驱动

**示例**

```lua
-- 本代码库尚处于开发阶段

```

## onewire.init(id)

初始化单总线

**参数**

|传入值类型|解释|
|-|-|
|int|id, 硬件单总线编号,如果只有一条则随意填写|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
onewire.init(0) --初始化硬件单总线

```

---

## onewire.timing(id, is_tick, clk_div, tRSTL, tRSTH, tPDHIGH, tPDLOW, tSLOT, tStart, tLOW1, tRDV, tREC)

配置硬件单总线时序，如果不配置，默认情况下是直接匹配DS18B20

**参数**

|传入值类型|解释|
|-|-|
|int|id, 硬件单总线编号,如果只有一条则随意填写|
|boolean|is_tick, 后续时序参数是否是tick,true是,false不是,如果不是tick,单位就是us,默认是false.除非具体平台有特殊要求,一般是us|
|int|clk_div, tick参数下的分频系数,建议分频到1个tick=1个us,如果us参数,本参数忽略|
|int|tRSTL, reset拉低总时间|
|int|tRSTH, reset释放总时间|
|int|tPDHIGH, reset释放到开始探测时间|
|int|tPDLOW, reset探测时间|
|int|tSLOT, 通信总有效时间|
|int|tStart, 通信start信号时间，一般就是开头拉低|
|int|tLOW1, start信号到允许写的时间|
|int|tRDV, start信号到允许读的时间|
|int|tREC, 通信结束前恢复时间|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
onewire.timing(0, false, 0, 500, 500, 15, 240, 65, 1, 15, 15, 2) --配置单总线时序匹配DS18B20，保留了点余量

```

---

## onewire.reset(id, need_ack)

硬件单总线复位

**参数**

|传入值类型|解释|
|-|-|
|int|id, 硬件单总线编号,如果只有一条则随意填写|
|boolean|need_ack, 是否需要检测应答信号,true需要检测,false不需要|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|检测到应答,或者无需检测返回true,失败返回false|

**例子**

```lua
onewire.reset(0, true)

```

---

## onewire.bit(id, send1bit)

硬件单总线发送或1bit者接收1bit

**参数**

|传入值类型|解释|
|-|-|
|int|id, 硬件单总线编号,如果只有一条则随意填写|
|int/nil|send1bit, 发送bit的电平,1高电平,0低电平,留空或者其他值,则是读1bit|

**返回值**

|返回值类型|解释|
|-|-|
|int|如果是发送,则忽略结果,如果是接收,则是接收到的电平|

**例子**

```lua
onewire.bit(0, 1) --发送1bit高电平
onewire.bit(0) --读取1bit数据

```

---

## onewire.tx(id, data, is_msb, need_reset, need_ack)

硬件单总线发送N字节数据

**参数**

|传入值类型|解释|
|-|-|
|int|id, 硬件单总线编号,如果只有一条则随意填写|
|int/string/zbuff|data, 需要发送的数据,如果是int则是1个字节数据,如果是zbuff,则是从开头到指针前的数据,如果指针是0则发送全部数据|
|boolean|is_msb, 是否需要先发送MSB,true是,false不是,默认情况下都是false|
|boolean|need_reset, 是否需要先发送reset,true需要检测,false不需要|
|boolean|need_ack, 是否需要检测应答信号,true需要检测,false不需要|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|检测到应答,或者无需检测返回true,失败或者参数错误返回false|

**例子**

```lua
local succ = onewire.tx(0, 0x33, false, true, true) --复位并检测ACK，接收到ACK后发送0x33
local succ = onewire.tx(0, 0x33, false, true, false) --复位后发送0x33，无视从机是否ACK
local succ = onewire.tx(0, 0x33) --直接发送0x33

```

---

## onewire.rx(id, len, cmd, buff, is_msb, need_reset, need_ack)

硬件单总线读取N字节数据

**参数**

|传入值类型|解释|
|-|-|
|int|id, 硬件单总线编号,如果只有一条则随意填写|
|int|len, 需要读取的字节数量|
|int|cmd, 在读取前发送命令,可以填nil不发送任何命令|
|zbuff|data, 接收数据缓存,接收前会清空整个缓存.如果填nil则输出字符串|
|boolean|is_msb, 是否需要先发送MSB,true是,false不是,默认情况下都是false|
|boolean|need_reset, 是否需要先发送reset,true需要检测,false不需要|
|boolean|need_ack, 是否需要检测应答信号,true需要检测,false不需要|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|检测到应答,或者无需检测返回true,失败或者参数错误返回false|
|string|如果data填nil,则接收数据从这里输出|

**例子**

```lua
local succ, rx_data = onewire.rx(0, 8) --直接接收8个字节
local succ, rx_data = onewire.rx(0, 8, 0x33, buf, nil, true, true) --先发送reset,检查ack信号,发送0x33,接收8个字节,这是DS18B20读ROM ID标准流程

```

---

## onewire.debug(id, onoff)

单总线调试开关

**参数**

|传入值类型|解释|
|-|-|
|int|id, GPIO模式对应GPIO编号,HW模式是硬件单总线编号,如果只有一条则随意填写|
|boolean|onoff, true打开,false关闭|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
onewire.debug(0, true)

```

---

## onewire.deinit(id)

关闭单总线

**参数**

|传入值类型|解释|
|-|-|
|int|id, 硬件单总线编号,如果只有一条则随意填写|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
onewire.deinit(0) --初始化硬件单总线

```

---

