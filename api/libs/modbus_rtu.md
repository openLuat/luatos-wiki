# modbus_rtu - modbus_rtu MODBUS_RTU协议 

**示例**

```lua
--注意:
--注意:
-- 用法实例
local modbus_rtu = require "modbus_rtu"

-- 初始化modbus_rtu
modbus_rtu.init({
    uartid = 1, -- 接收/发送数据的串口id
    baudrate = 4800, -- 波特率
    gpio_485 = 25, -- 转向GPIO编号
    tx_delay = 50000 -- 转向延迟时间，单位us

-- 定义modbus_rtu数据接收回调
local function on_modbus_rtu_receive(frame)
    log.info("modbus_rtu frame received:", json.encode(frame))
    if frame.fun == 0x03 then -- 功能码0x03表示读取保持寄存器
        local byte = frame.byte
        local payload = frame.payload
        -- log.info("modbus_rtu payload (hex):", payload:toHex())

        -- 解析数据(假设数据为16位寄存器值)
        local values_big = {} -- 大端序解析结果
        for i = 1, #payload, 2 do
            local msb = payload:byte(i)
            local lsb = payload:byte(i + 1)

            -- 大端序解析
            local result_big = (msb * 256) + lsb
            table.insert(values_big, result_big)
        end

        -- 输出大端序的解析结果
        log.info("输出大端序的解析结果:", table.concat(values_big, ", "))

        -- 第一个寄存器是湿度，第二个是温度，除以10以获取实际值
        if #values_big == 2 then
            log.info("测试同款485温湿度计")
            local humidity = values_big[1] / 10
            local temperature = values_big[2] / 10

            -- 打印湿度和温度
            log.info(string.format("湿度: %.1f%%", humidity))
            log.info(string.format("温度: %.1f°C", temperature))

        else
            log.info("用户自己的485下位机，共有" .. #values_big .. "组数据")
            for index, value in ipairs(values_big) do
                log.info(string.format("寄存器 %d: %d (大端序)", index, value))
            end

        end
    else
        log.info("功能码不是03")
    end
end

-- 设置modbus_rtu数据接收回调
modbus_rtu.set_receive_callback(1, on_modbus_rtu_receive)

local function send_modbus_rtu_command()
    local addr = 0x01 -- 设备地址,此处填客户自己的
    local fun = 0x03 -- 功能码（03为读取保持寄存器），此处填客户自己的
    local data = string.char(0x00, 0x00, 0x00, 0x02) -- 起始地址和寄存器数量(此处填客户自己的起始地址进而寄存器数量)

    -- modbus_rtu.send_command(1, addr, fun, data) -- 只发送一次命令并等待响应处理
    modbus_rtu.send_command(1, addr, fun, data, 5000) -- 循环5S发送一次

end

sys.taskInit(function()
    sys.wait(5000)
    send_modbus_rtu_command()

end)


```

## modbus_rtu.init(config)



modbus_rtu初始化

**参数**

无

**返回值**

无

**例子**

无

---

## modbus_rtu.crc16()



对数据进行CRC16_RTU校验

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|原始数据对应的CRC16值|

**例子**

无

---

## modbus_rtu.parse_frame()



对下位机返回过来的数据进行modbus_rtu解析

**参数**

|传入值类型|解释|
|-|-|
|number|下位机返回的数据（一般是hex的）|

**返回值**

|返回值类型|解释|
|-|-|
|成功返回table(地址码,功能码,有效字节数|,真实数据值,crc校验值)失败返回nil和"CRC error"|

**例子**

```lua
 local crc16_data = modbus_rtu.parse_frame("01030401E6FF9F1BA0")
log.info("crc16_data", crc16_data.addr,crc16_data.fun,crc16_data.byte,crc16_data.payload,crc16_data.crc)

```

---

## modbus_rtu.send_command(uartid, addr, fun, data, interval)



对发送给下位机的数据进行校验和发送次数的设置

**参数**

|传入值类型|解释|
|-|-|
|number|uartid 485转串口对应的串口id，main_uart为1，aux_uart为2|
|number|addr 发送给下位机命令里的地址码|
|number|fun 发送给下位机命令里的功能码|
|number|data 发送给下位机命令里的有效字节数和命令码|
|number|interval(可选) 为nil时命令只发一次，为数字时时间隔发送命令的秒数|

**返回值**

|返回值类型|解释|
|-|-|
|成功返回table(地址码,功能码,有效字节数|,真实数据值,crc校验值)失败返回nil和"CRC error"|

**例子**

```lua
 local crc16_data = modbus_rtu.parse_frame("01030401E6FF9F1BA0")
log.info("crc16_data", crc16_data.addr,crc16_data.fun,crc16_data.byte,crc16_data.payload,crc16_data.crc)

```

---

