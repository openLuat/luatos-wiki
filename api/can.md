# can - can操作库

**示例**

```lua
--[[
错误码介绍
错误码由4byte组成小端格式的uint32
byte3预留无意义
byte2方向，0TX 1RX
byte1类型，0bit 1form 2stuff
byte0位置：
0x03 start of frame
0x02 extended: ID bits 28 - 21, standard:  10 - 3
0x06 extended: ID bits 20 - 18, standard:  2 - 0
0x04 extended: substitute RTR, standard: RTR
0x05 identifier extension
0x07 extended: ID bits 17 - 13
0x0f extended: ID bits 12 - 5
0x0e extended: ID bits 4 - 0
0x0C RTR
0x0D reserved bit 1
0x09 reserved bit 0
0x0b data length code
0x0a data section
0x08 CRC sequence
0x18 CRC delimiter
0x19 ACK slot
0x1b ACK delimiter
0x1a end of frame
0x12 intermission
0x00 unspecified
]]

```

## 常量

|常量|类型|解释|
|-|-|-|
|can.MODE_NORMAL|number|正常工作模式|
|can.MODE_LISTEN|number|监听模式|
|can.MODE_TEST|number|自测模式|
|can.MODE_SLEEP|number|休眠模式|
|can.STATE_STOP|number|停止工作状态|
|can.STATE_ACTIVE|number|主动错误状态，一般都是这个状态|
|can.STATE_PASSIVE|number|被动错误状态，总线上错误多会进入这个状态，但是还能正常收发|
|can.STATE_BUSOFF|number|离线状态，总线上错误非常多会进入这个状态，不能收发，需要手动退出|
|can.STATE_LISTEN|number|监听状态，选择监听模式时进入这个状态|
|can.STATE_TEST|number|自收自发状态，选择自测模式时进入这个状态|
|can.STATE_SLEEP|number|休眠状态，选择休眠模式时进入这个状态|
|can.CB_MSG|number|回调消息类型，有新数据写入缓存|
|can.CB_TX|number|回调消息类型，数据发送结束，需要根据后续param确定发送成功还是失败|
|can.CB_ERR|number|回调消息类型，有错误报告，后续param是错误码，具体见错误码介绍|
|can.CB_STATE|number|回调消息类型，总线状态变更，后续param是新的状态，也可以用can.state读出|
|can.EXT|number|扩展帧|
|can.STD|number|标准帧|


## can.init(id, rx_message_cache_max)

CAN总线初始化

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|
|int|rx_message_cache_max，接收缓存消息数的最大值，写0或者留空则使用平台默认值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|

**例子**

```lua
can.init()

```

---

## can.on(id, func)

注册CAN事件回调

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
can.on(1, function(id, type, param)
    log.info("can", id, type, param)
end)

```

---

## can.timing(id, br, PTS, PBS1, PBS2, SJW)

CAN总线配置时序

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|
|int|br, 波特率, 默认1Mbps|
|int|PTS, 传播时间段, 范围1~8|
|int|PBS1, 相位缓冲段1，范围1~8|
|int|PBS2, 相位缓冲段2，范围2~8|
|int|SJW, 同步补偿宽度值，范围1~4，默认2|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|

**例子**

```lua
-- air780EPM参考，不一定适合其他平台，CAN的实际波特率=基础时钟/分频系数/(1+PTS+PBS1+PBS2)，详见can.capacity
-- 快速参考，50K及x2,x4,x8,x16都可以用同一个PTS+PBS1+PBS2
-- 快速参考，125K及x2,x4,x8都可以用同一个PTS+PBS1+PBS2
can.timing(0, 50000, 6, 6, 3, 2)
can.timing(0, 100000, 6, 6, 3, 2)
can.timing(0, 400000, 6, 6, 3, 2)
can.timing(0, 125000, 6, 6, 4, 2)
can.timing(0, 250000, 6, 6, 4, 2)
can.timing(0, 1000000, 6, 6, 4, 2)

```

---

## can.mode(id, mode)

CAN总线设置工作模式

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|
|int|mode, 见MODE_XXX，默认是MODE_NORMAL|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|

**例子**

```lua
can.mode(0, CAN.MODE_NORMAL)

```

---

## can.node(id, node_id, id_type)

CAN总线设置节点ID，这是一种简易的过滤规则，只接收和ID完全匹配的消息，和can.filter选择一个使用

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|
|int|node_id, 节点ID, 标准格式11位或者扩展格式29位，根据id_type决定，默认值是0x1fffffff，id值越小，优先级越高|
|int|id_type，ID类型，填1或者CAN.EXT为扩展格式，填0或者CAN.STD为标准格式|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|

**例子**

```lua
can.node(0, 0x12345678, CAN.EXT)
can.node(0, 0x123, CAN.STD)

```

---

## can.filter(id, dual_mode, ACR, AMR)

CAN总线设置接收过滤模式，当can.node不满足需求时才使用这个，和can.node选择一个使用，过滤模式比较复杂，请参考SJA1000的Pelican模式下滤波

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|
|boolean|dual_mode, 是否是双过滤模式，true是，false不是，默认是false|
|int|ACR, 接收代码寄存器值，必须写0xnnnnnnnn这样的格式，大端格式赋值到4个ACR寄存器上，默认值是0|
|int|AMR, 接收屏蔽寄存器值，必须写0xnnnnnnnn这样的格式，大端格式赋值到4个AMR寄存器上，对应bit写0表示需要检测，写1表示不检测，默认是0xffffffff，不过滤全接收|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|

**例子**

```lua
can.filter(0, false, 0x12345678 << 3, 0x07) --效果等同于can.node(0, 0x12345678, CAN.EXT)
can.filter(0, false, 0x123 << 21, 0x0001fffff) --效果等同于can.node(0, 0x123, CAN.STD)

```

---

## can.state(id)

CAN工作状态

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|

**返回值**

|返回值类型|解释|
|-|-|
|int|返回值见STATE_XXX|

**例子**

```lua
can.state(0)

```

---

## can.tx(id, msg_id, id_type, RTR, need_ack, data)

CAN发送一条消息

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|
|int|msg_id, 节点ID, 标准格式11位或者扩展格式29位，根据id_type决定，默认值是0x1fffffff，id值越小，优先级越高|
|int|id_type, ID类型，填1或者CAN.EXT为扩展格式，填0或者CAN.STD为标准格式|
|boolean|RTR, 是否是遥控帧，true是，false不是，默认是false|
|boolean|need_ack，是否需要应答，true是，false不需要，默认是true|
|string/zbuff|data, 需要发送的数据, 如果是zbuff会从指针起始位置开始发送，最多发送8字节|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|

**例子**

```lua
can.tx(id, 0x12345678, CAN.EXT, false, true, "\x00\x01\x02\x03\0x04\x05\0x6\x07")

```

---

## can.rx(id)

从缓存里读出一条消息

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否读出数据，true读出，false没有读出，缓存已经空了，或者id不对|
|int|消息ID|
|int|ID类型，1或者CAN.EXT为扩展格式，0或者CAN.STD为标准格式|
|boolean|是否是遥控帧，true是，false不是|
|string|数据|

**例子**

```lua
local succ, id, type, rtr, data = can.rx(0)

```

---

## can.stop(id)

立刻停止当前的发送

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|

**例子**

```lua
can.stop(0)

```

---

## can.reset(id)

CAN总线复位，一般用于从总线关闭状态恢复成主动错误

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|

**例子**

```lua
can.reset(0)

```

---

## can.busOff(id)

CAN总线关闭，此时可以重新进行timing,filter,node等配置

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|

**例子**

```lua
can.busOff(0)

```

---

## can.deinit(id)

CAN完全关闭

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|

**例子**

```lua
can.deinit(0)

```

---

## can.debug(on_off)

CAN debug开关，打开后有更详细的打印

**参数**

|传入值类型|解释|
|-|-|
|boolean|true打开，false关闭|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
can.debug(true)

```

---

## can.capacity(id)

获取CAN时钟特性，包括基础时钟,分频系数范围,CAN的实际波特率=基础时钟/分频系数/(1+PTS+PBS1+PBS2),从时钟特性里能看出对应平台是否能配置出需要的波特率

**参数**

|传入值类型|解释|
|-|-|
|int|id, 如果只有一条总线写0或者留空, 有多条的，can0写0，can1写1, 如此类推, 一般情况只有1条|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false,如果失败就不用看后面的参数了|
|int|基础时钟|
|int|最小分频系数|
|int|最大分频系数|
|int|分频系数步进，一般为1|

**例子**

```lua
local res, clk, div_min, div_max, div_step = can.capacity(0)

```

---

