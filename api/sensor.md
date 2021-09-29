# sensor - 传感器操作库

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_sensor.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## sensor.ds18b20(pin)

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

## sensor.w1_reset(pin)

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

获取Hx711的温度数据

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

## sensor.ws2812b(pin,data,T0H,T0L,T1H,T1L)

设置ws2812b输出

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

