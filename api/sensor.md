# sensor - 传感器操作库

**示例**

```lua
-- 请查阅demo/dht11 demo/ds18b20

```

## sensor.ds18b20(pin, check_crc)

获取DS18B20的温度数据

**参数**

|传入值类型|解释|
|-|-|
|int|gpio端口号|
|boolean|是否校验crc值,默认为true. 不校验crc值能提高读取成功的概率,但可能会读取到错误的值|

**返回值**

|返回值类型|解释|
|-|-|
|int|温度数据,单位0.1摄氏度，读取失败时返回错误码|
|boolean|成功返回true,否则返回false|

**例子**

```lua
while 1 do
    sys.wait(5000)
    local val,result = sensor.ds18b20(17, true) -- GPIO17且校验CRC值
    -- val 301 == 30.1摄氏度
    -- result true 读取成功
    log.info("ds18b20", val, result)
end

```

---

## sensor.w1_reset(pin)

单总线协议,复位设备

**参数**

|传入值类型|解释|
|-|-|
|int|gpio端口号|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回|

**例子**

无

---

## sensor.w1_connect(pin)

单总线协议,连接设备

**参数**

|传入值类型|解释|
|-|-|
|int|gpio端口号|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|

**例子**

无

---

## sensor.w1_write(pin, data1,data2)

单总线协议,往总线写入数据

**参数**

|传入值类型|解释|
|-|-|
|int|gpio端口号|
|int|第一个数据|
|int|第二个数据, 可以写N个数据|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## sensor.w1_read(pin, len)

单总线协议,从总线读取数据

**参数**

|传入值类型|解释|
|-|-|
|int|gpio端口号|
|int|读取的长度|

**返回值**

|返回值类型|解释|
|-|-|
|int|按读取的长度返回N个整数|

**例子**

无

---

## sensor.hx711(pin_date,pin_clk)

获取Hx711的压力传感数据

**参数**

|传入值类型|解释|
|-|-|
|int|数据的gpio端口号|
|int|时钟的gpio端口号|

**返回值**

|返回值类型|解释|
|-|-|
|int|hx711读到的数据|

**例子**

```lua
--  如果设备不存在会卡在读取接口
sys.taskInit(
    function()
        sys.wait(1000)
        local maopi = sensor.hx711(0,7)
        while true do
            sys.wait(2000)
            a = sensor.hx711(0,7) - maopi
            if a > 0 then
                log.info("tag", a / 4.6)
            end
        end
    end
)

```

---

## sensor.cs1237(pin_date,pin_clk)

获取cs1237传感数据

**参数**

|传入值类型|解释|
|-|-|
|int|数据的gpio端口号|
|int|时钟的gpio端口号|

**返回值**

|返回值类型|解释|
|-|-|
|int|cs1237读到的数据|

**例子**

```lua
--  如果设备不存在会卡在读取接口
sys.taskInit(
    function()
        sys.wait(1000)
        local cs1237_data = sensor.cs1237(0,7)
        while true do
            sys.wait(2000)
            cs1237_data = sensor.cs1237(0,7) - maopi
            log.info("cs1237_data:", cs1237_data)--得到原始数据
        end
    end
)

```

---

## sensor.ws2812b(pin,data,T0H,T0L,T1H,T1L)

设置ws2812b输出(gpio驱动方式)

**参数**

|传入值类型|解释|
|-|-|
|int|ws2812b的gpio端口号|
|string/zbuff|待发送的数据（如果为zbuff数据，则会无视指针位置始终从0偏移开始）|
|int|T0H时间，表示延时多少个nop，每个型号不一样，自己调|
|int|T0L时间，表示延时多少个nop|
|int|T1H时间，表示延时多少个nop|
|int|T1L时间，表示延时多少个nop|

**返回值**

无

**例子**

```lua
local buff = zbuff.create({8,8,24})
buff:drawLine(1,2,5,6,0x00ffff)
sensor.ws2812b(7,buff,300,700,700,700)

```

---

## sensor.ws2812b_pwm(pin,data)

设置ws2812b输出(pwm驱动方式,需要pwm能输出800k频率，否则无法使用此方法)

**参数**

|传入值类型|解释|
|-|-|
|int|pwm端口号|
|string/zbuff|待发送的数据（如果为zbuff数据，则会无视指针位置始终从0偏移开始）|

**返回值**

无

**例子**

```lua
local buff = zbuff.create({8,8,24})
buff:setFrameBuffer(8,8,24,0x0000ff)
sensor.ws2812b_pwm(7,buff)

```

---

## sensor.ws2812b_spi(pin,data)

设置ws2812b输出(spi驱动方式,需要spi能输出5M频率，否则无法使用此方法)

**参数**

|传入值类型|解释|
|-|-|
|int|spi端口号|
|string/zbuff|待发送的数据（如果为zbuff数据，则会无视指针位置始终从0偏移开始）|

**返回值**

无

**例子**

```lua
local buff = zbuff.create({8,8,24})
buff:setFrameBuffer(8,8,24,0x0000ff)
sensor.ws2812b_spi(2,buff)

```

---

## sensor.dht1x(pin)

获取DHT11/DHT12的温湿度数据

**参数**

|传入值类型|解释|
|-|-|
|int|gpio端口号|
|boolean|是否校验crc值,默认为true. 不校验crc值能提高读取成功的概率,但可能会读取到错误的值|

**返回值**

|返回值类型|解释|
|-|-|
|int|湿度数据,单位0.01%，读取失败时返回错误值|
|int|温度数据,单位0.01摄氏度，读取失败时返回错误值|
|boolean|成功返回true,否则返回false|

**例子**

```lua
while 1 do
    sys.wait(1000)
    local h,t,r = sensor.dht1x(17, true) -- GPIO17且校验CRC值
    log.info("dht11", h/100,t/100,r)--90.1 23.22
end

```

---

## sensor.sc12a(sda,scl)

获取sc12a被触摸的通道数据

**参数**

|传入值类型|解释|
|-|-|
|int|数据的gpio端口号|
|int|时钟的gpio端口号|

**返回值**

|返回值类型|解释|
|-|-|
|int|读取成功返回整形数据，读取失败时返回错误值|

**例子**

```lua
while true do
  local temp1=sensor.sc12a(4,7)
  if bit.rshift(bit.band( temp1, 0x8000), 15 )==0x01 then
    log.info("被按下的有通道0")
  end
  if bit.rshift(bit.band( temp1, 0x4000), 14 )==0x01 then
    log.info("被按下的有通道1")
  end
  if bit.rshift(bit.band( temp1, 0x2000), 13 )==0x01 then
    log.info("被按下的有通道2")
  end
  if bit.rshift(bit.band( temp1, 0x1000), 12 )==0x01 then
    log.info("被按下的有通道3")
  end
  if bit.rshift(bit.band( temp1, 0x800), 11 )==0x01 then
    log.info("被按下的有通道4")
  end
  if bit.rshift(bit.band( temp1, 0x400), 10 )==0x01 then
    log.info("被按下的有通道5")
  end
  if bit.rshift(bit.band( temp1, 0x200), 9 )==0x01 then
    log.info("被按下的有通道6")
  end
  if bit.rshift(bit.band( temp1, 0x100), 8 )==0x01 then
    log.info("被按下的有通道7")
  end
  if bit.rshift(bit.band( temp1, 0x80), 7 )==0x01 then
    log.info("被按下的有通道8")
  end
  if bit.rshift(bit.band( temp1, 0x40), 6 )==0x01 then
    log.info("被按下的有通道9")
  end
  if bit.rshift(bit.band( temp1, 0x20), 5 )==0x01 then
    log.info("被按下的有通道10")
  end
  if bit.rshift(bit.band( temp1, 0x10), 4 )==0x01 then
    log.info("被按下的有通道11")
  end
  sys.wait(200)
end

```

---

## sensor.yhm27xxx(pin, chip_id, reg, data)

单总线命令读写YHM27XX

**参数**

|传入值类型|解释|
|-|-|
|int|gpio端口号|
|int|芯片ID|
|int|寄存器地址|
|int|要写入的数据，如果没填，则表示从寄存器读取数据|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|
|int|读取成功返回寄存器值，写入成功无返回|

**例子**

```lua
while 1 do
    sys.wait(1000)
    local result, data = sensor.yhm27xxx(15, 0x04, 0x05)
    log.info("yhm27xxx", result, data)
end

```

---

