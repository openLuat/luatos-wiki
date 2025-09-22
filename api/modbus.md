# modbus - modbus主从协议栈协议

**示例**

```lua
-- 本库用于方便的管理和处理Modbus的主从消息

```

## 常量

|常量|类型|解释|
|-|-|-|
|modbus.MODBUS_RTU|number|ModbusRTU模式|
|modbus.MODBUS_ASCII|number|ModbusASCII模式|
|modbus.MODBUS_TCP|number|ModbusTCP模式|
|modbus.CIOLS|number|线圈寄存器|
|modbus.INPUTS|number|触点寄存器|
|modbus.INPUT_REGISTERS|number|输入寄存器|
|modbus.REGISTERS|number|保持寄存器|
|modbus.READ|number|操作类型，读操作|
|modbus.WRITE|number|操作类型，写多个寄存器|
|modbus.WRITE_SINGLE|number|操作类型，写单个寄存器|
|modbus.LOOP|number|通讯模式，自动通讯|
|modbus.EXEC|number|通讯模式，手动通讯|
|modbus.SINGLE|number|通讯模式，单次通讯，通讯成功即删除|
|modbus.SLAVE_NORMAL|number|从站状态正常|
|modbus.SLAVE_OFFLINE|number|从站通讯离线|
|modbus.SLAVE_UNKNOWN|number|从站状态未知|
|modbus.SLAVE_COMM_TIMEOUT|number|从站通讯超时|
|modbus.SLAVE_ERROR|number|从站错误|


## modbus.create_master(type, drive_id, baud_rate, comm_interval_time, comm_timeout, comm_resend_count, comm_reconnection_time)

创建一个 Modbus Master 句柄

**参数**

|传入值类型|解释|
|-|-|
|int|通讯类型, 例如 modbus.MODBUS_RTU, modbus.MODBUS_ASCII, modbus.MODBUS_TCP|
|int|通讯驱动id，如果为COM类型，则为uartid，如果为以太网类型，则为adapter_index|
|int|若协议类型为modbus.MODBUS_TCP，则跳过该参数。若协议类型为modbus.MODBUS_RTU、modbus.MODBUS_ASCII模式，则该参数为串口的波特率|
|int|通讯间隔时间,单位ms。默认为100ms|
|int|通讯超时时间,单位ms。默认为1000ms|
|int|消息发送失败、超时重发次数。默认为1次|
|int|断线重连时间间隔，单位ms。默认为5000ms（该参数仅对TCP类型的主站生效）|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|创建成功返回上下文,否则返回nil|

**例子**

```lua
-- 使用缺省模式创建，modbus模式为RTU，串口ID为1，波特率为9600
mb_rtu = modbus.create_master(modbus.MODBUS_RTU, uartid, 9600)
-- 创建Modbus Master 句柄，modbus模式为TCP；设备类型为有线以太网；通讯间隔时间为100ms；通讯超时时间为1000ms；消息发送失败、超时重发次数为1；断线重连时间间隔为5000ms
mb_tcp = modbus.create_master(modbus.MODBUS_TCP, socket.LWIP_ETH, 100, 1000, 1, 5000)

-- 注意: 用户在调用该接口之前，需要自行初始化对应的硬件端口。RTU、ASCII模式需初始化uart，TCP模式需初始化网络

```

---

## modbus.set_comm_interval_time(master_handler, time_ms)

设置通讯间隔时间

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_master获取到的上下文|
|int|通讯间隔时间,单位ms。|
|return|无|

**返回值**

无

**例子**

```lua
-- 设置通讯间隔时间为100ms
modbus.set_comm_interval_time(mb_rtu, 100)

```

---

## modbus.set_comm_timeout(master_handler, time_ms)

设置通讯超时时间

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_master获取到的上下文|
|int|通讯超时时间,单位ms。|
|return|无|

**返回值**

无

**例子**

```lua
-- 设置通讯超时时间为1000ms
modbus.set_comm_timeout(mb_rtu, 1000)

```

---

## modbus.set_comm_resend_count(master_handler, resend_count)

设置消息发送失败、超时重发次数

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_master获取到的上下文|
|int|消息发送失败、超时重发次数|
|return|无|

**返回值**

无

**例子**

```lua
-- 设置消息发送失败、超时重发次数为1
modbus.set_comm_resend_count(mb_rtu, 1)

```

---

## modbus.set_comm_reconnection_time(master_handler, reconnection_time)

设置断线重连时间间隔（该函数仅对TCP类型的主站生效）

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_master获取到的上下文|
|int|断线重连时间间隔，单位ms|
|return|无|

**返回值**

无

**例子**

```lua
-- 设置断线重连时间间隔为5000ms
modbus.set_comm_reconnection_time(mb_rtu, 5000ms)

```

---

## modbus.get_all_slave_state(master_handler)

获取所有从站状态

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_master获取到的上下文|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|如果所有从站状态为正常，返回true，其他情况返回false|

**例子**

```lua
-- 获取所有从站状态
modbus.get_all_slave_state(mb_rtu)

```

---

## modbus.exec(master_handler, msg_handler)

执行一条modbus指令。该指令仅执行一次，优先级为最高，执行完成自动结束。

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_master获取到的上下文|
|userdata|通过modbus.create_msg获取到的上下文|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true，其他情况返回false|

**例子**

```lua
-- 执行一条modbus指令
modbus.exec(mb_rtu, msg)

-- 注意: 使用的 msg_handler 句柄，在创建时，必须具有modbus.EXEC属性，否则该指令无效

```

---

## modbus.master_start(master_handler)

启动modbus主协议栈

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_master获取到的上下文|
|return|无|

**返回值**

无

**例子**

```lua
-- 启动modbus主协议栈
modbus.master_start(mb_rtu)

```

---

## modbus.master_stop(master_handler)

停止Modbus主协议栈

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_master获取到的上下文|
|return|无|

**返回值**

无

**例子**

```lua
-- 停止modbus主协议栈
modbus.master_stop(mb_rtu)

```

---

## modbus.add_slave(master_handler, slave_id, ip, port)

创建并向主站添加一个modbus从站

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_master获取到的上下文|
|int|从站地址（范围1-247）|
|string|从站设备的ip地址（当主站为RTU、ASCII模式时，该参数无效）|
|int|从站设备的端口号（当主站为RTU、ASCII模式时，该参数无效）|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|创建成功返回上下文,否则返回nil|

**例子**

```lua
-- modbus主站为RTU、ASCII模式，忽略ip和port参数
-- 向主站创建并添加一个从站，从站站号为1
slave = modbus.add_slave(mb_rtu, 1)

-- TCP模式，向主站创建并添加一个从站，从站站号为1，ip为"192.168.10.133"，port为502
slave = modbus.add_slave(mb_tcp, 1, "192.168.10.133", 502)

```

---

## modbus.remove_slave(master_handler, slave_handler)

删除一个从站对象，并删除与之相关的通讯消息句柄。（需在主站停止(modbus.master_stop)时执行该操作，否则无效）

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_master获取到的上下文|
|userdata|通过modbus.add_slave获取到的上下文|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true，失败返回false|

**例子**

```lua
-- 删除一个从站
modbus.remove_slave(mb_rtu, slave)

```

---

## modbus.get_slave_state(slave_handler)

获取一个从站的状态

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.add_slave获取到的上下文|

**返回值**

|返回值类型|解释|
|-|-|
|int|modbus.SLAVE_NORMAL（状态正常），modbus.SLAVE_OFFLINE（设备离线），modbus.SLAVE_UNKNOWN（状态未知），modbus.SLAVE_COMM_TIMEOUT（通讯超时，超时N次转化为离线），modbus.SLAVE_ERROR（错误）|

**例子**

```lua
-- 获取一个从站的状态
modbus.get_slave_state(slave)

```

---

## modbus.create_msg(master_handler, slave_handler, reg_type, opt_type, reg_addr, reg_len, data_addr, comm_period,comm_mode)

向指定从站，创建并添加一条通讯消息

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_master获取到的上下文|
|userdata|通过modbus.add_slave获取到的上下文|
|int|寄存器类型，modbus.CIOLS（线圈）、modbus.INPUTS（触点）、modbus.INPUT_REGISTERS（输入寄存器）、modbus.REGISTERS（保持寄存器）|
|int|操作类型，modbus.READ（读寄存器）、modbus.WRITE（写多个寄存器）、modbus.WRITE_SINGLE（写单个寄存器），若此参数为modbus.WRITE_SINGLE类型，则reg_len参数总为1|
|int|寄存器地址，0-65535|
|int|寄存器数量，最大120|
|userdata|用户数据缓冲区，通过zbuff.create获取到的上下文|
|int|通讯周期，默认值1|
|int|通讯模式，取 modbus.LOOP（自动执行模式）、modbus.EXEC（手动执行模式）、modbus.SINGLE（单次模式，通讯成功即释放句柄），默认值为modbus.LOOP|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|创建成功返回上下文,否则返回nil|

**例子**

```lua
-- 向指定从站，创建并添加一条通讯消息
-- 从 slave 从站中读取消息，寄存器类型为modbus.REGISTERS，操作类型为modbus.READ，寄存器地址为0，寄存器数量为10，数据缓存地址为zbuf，通讯周期为1，通讯模式为modbus.LOOP
msg = modbus.create_msg(mb_rtu, slave, modbus.REGISTERS, modbus.READ, 0, 10, zbuf, 1, modbus.LOOP)

--缺省的写法
msg = modbus.create_msg(mb_rtu, slave, modbus.REGISTERS, modbus.READ, 0, 10, zbuf)

```

---

## modbus.remove_msg(master_handler, slave_handler, msg_handler)

删除从站消息

**参数**

|传入值类型|解释|
|-|-|
|userdata|主站句柄，由modbus.create_master创建|
|userdata|从站句柄，由modbus.add_slave创建|
|userdata|消息句柄，由modbus.create_msg创建，默认值为空。若该值为空，则删除指定从站的所有消息；若该值不为空，则删除指定的1条消息|
|return|无|

**返回值**

无

**例子**

```lua
 -- 删除从站的所有消息
 modbus.remove_msg(master_handler, slave_handler)

  -- 删除从站的指定消息
 modbus.remove_msg(master_handler, slave_handler, msg_handler)

```

---

## modbus.create_slave(type, slave_id, uartid_port, adapter_index_baud_rate)

创建一个从站句柄

**参数**

|传入值类型|解释|
|-|-|
|int|modbus协议类型，modbus.MODBUS_RTU、modbus.MODBUS_ASCII、modbus.MODBUS_TCP|
|int|从站地址，范围1-247|
|int|若协议类型为modbus.MODBUS_RTU、modbus.MODBUS_ASCII模式，则该参数为串口ID（uartid）；若协议类型为modbus.MODBUS_TCP则该参数为本地端口号|
|int|若协议类型为modbus.MODBUS_RTU、modbus.MODBUS_ASCII模式，则该参数为串口的波特率；若协议类型为modbus.MODBUS_TCP则该参数为网卡适配器序列号，默认最后一个注册的网卡适配器序号。|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|创建成功返回上下文,否则返回nil|

**例子**

```lua
-- 创建一个从站句柄，协议类型为RTU模式，从站ID为1，usrt设备id为1，波特率为9600
mb_rtu_s = modbus.create_slave(modbus.MODBUS_RTU, 1, 1, 9600)

-- 创建一个从站句柄，协议类型为TCP模式，从站ID为1，本次端口号为502，网络设备为本地有线网络
mb_tcp_s = modbus.create_slave(modbus.MODBUS_TCP, 1, 502, socket.LWIP_ETH)

```

---

## modbus.add_block(slave_handler, reg_type, reg_addr, reg_len, data_addr)

添加一块寄存器内存区

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_slave获取到的上下文|
|int|寄存器类型，modbus.CIOLS（线圈）、modbus.INPUTS（触点）、modbus.INPUT_REGISTERS（输入寄存器）、modbus.REGISTERS（保持寄存器）|
|int|寄存器地址，0-65535|
|int|寄存器数量，最大120|
|userdata|用户数据缓冲区，通过zbuff.create获取到的上下文|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|添加成功返回true，其他情况返回false|

**例子**

```lua
-- 添加一块寄存器内存区，寄存器类型为modbus.REGISTERS，寄存器地址为0，寄存器数量为32，数据缓存地址为registers
modbus.add_block(mb_tcp_s, modbus.REGISTERS, 0, 32, registers)

```

---

## modbus.slave_start(slave_handler)

启动modbus从协议栈

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_slave获取到的上下文|
|return|无|

**返回值**

无

**例子**

```lua
-- 启动modbus从协议栈
modbus.slave_start(mb_tcp_s)

```

---

## modbus.slave_stop(slave_handler)

停止modbus从协议栈

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_slave获取到的上下文|
|return|无|

**返回值**

无

**例子**

```lua
-- 停止modbus从协议栈
modbus.slave_stop(mb_tcp_s)

```

---

## modbus.slave_on(slave_handler, cb)

注册modbus从站串口事件回调

**参数**

|传入值类型|解释|
|-|-|
|userdata|通过modbus.create_slave获取到的上下文|
|function|cb 回调函数，参数包括slave_handler, reg_type, opt_type, reg_addr, reg_len|
|return|无|

**返回值**

无

**例子**

```lua
-- 注册modbus从站串口事件回调
modbus.slave_on(slave_handler, function(slave_handler, reg_type, opt_type, reg_addr, reg_len)
    -- 用户自定义代码
    log.info(reg_type, opt_type, reg_addr, reg_len)
end)

```

---

## modbus.debug(en)

开启或关闭debug模式

**参数**

|传入值类型|解释|
|-|-|
|bool|1表示开启调试模式，0表示关闭调试模式|
|return|无|

**返回值**

无

**例子**

```lua
-- 开启调试模式
modbus.debug(1)
-- 关闭调试模式
modbus.debug(0)

```

---

