# necir - necir NEC协议红外通信

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/necir.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
--注意:
1、由于本库基于标准四线SPI接口实现，所以虽然只用到了MISO引脚，但是其他3个SPI相关引脚无法作为其他用途
2、TODO：暂未实现红外数据发送功能

--用法实例
--硬件模块：VS1838及其兼容的一体化接收头
--接线示意图
 ____________________              ____________________
|                    |            |                    |
|           SPI_MISO |------------| OUT                |
| Air10x             |   |        |       VS1838       |
|           IRQ_GPIO |---         |     一体化接收头    |
|                    |            |                    |
|____________________|            |____________________| 

local necir = require("necir")

--定义数据处理回调函数
local function my_ir_cb(address,data)
    local led = gpio.setup(pin.PB08,0)
    log.info('get ir msg','addr=',address,'data=',data)
    if data == 70 then led(0) end
    if data == 21 then led(1) end
end

sys.taskInit(function()
    necir.init(0,pin.PA_00,my_ir_cb)
    while 1 do
        sys.wait(200)
        necir.recv()
    end
end)


```

## necir.init(spi_id,irq_pin,recv_cb)



necir初始化

**参数**

|传入值类型|解释|
|-|-|
|number|spi_id,使用的SPI接口的ID|
|number|irq_pin,使用的中断引脚|
|function|recv_cb,红外数据接收完成后的回调函数，回调函数有2个参数，第一个参数是收到的地址码，第二个参数是收到的数据码|

**返回值**

无

**例子**

```lua
local function my_ir_cb(address,data)
    local led = gpio.setup(pin.PB08,0)
    log.info('get ir msg','addr=',address,'data=',data)
    if data == 70 then led(0) end
    if data == 21 then led(1) end
end

necir.init(0,pin.PA_00,my_ir_cb)

```

---

## necir.recv()



开启一次红外数据接收过程

**参数**

无

**返回值**

无

**例子**

```lua
necir.recv()

```

---

