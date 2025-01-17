# necir - necir NEC协议红外接收

**示例**

```lua
--注意:
--1、本库在Air101和Air103测试通过，Air105由于SPI传输帧与帧之间存在间隔因此暂不支持。
--2、本库实现了NEC红外数据接收，发送请使用LuatOS底层固件自带的ir.sendNEC()函数。
--3、由于本库基于标准四线SPI接口实现，所以虽然只用到了MISO引脚，但是其他3个SPI相关引脚在使用期间
--  无法作为其他用途，除非执行necir.close()并等待necir.isClosed()为true后，SPI将完全释放，才可以用于其他用途。
--硬件模块：VS1838及其兼容的一体化接收头
--接线示意图：
--1、支持单IO模式，即仅使用一个SPI_MISO引脚，此时necir.init的irq_pin参数必须是SPI_MISO所在引脚。
--2、支持多从机，如果SPI总线上需要挂接其他从设备，为了在不使用红外通信期间，避免VS1838干扰总线的MISO，则可以用
--  一个NMOS（例如AO3400）控制VS1838的电源地，如下所示，GPIO充当VS1838的片选信号，当GPIO输出低
--  则禁用VS1838，此时VS1838不工作，其OUT引脚为高阻，不会干扰MISO；当GPIO输出高，则启用VS1838，
--  此时其OUT引脚会输出红外通信信号到单片机。由于一般的SPI从机片选逻辑为低使能，因此这样可以用
--  同一个片选GPIO来控制VS1838以及另一个SPI从机，因为片选逻辑是相反的。配合necir库的necir.close()
--  和necir.isClosed()可以最大化的复用SPI接口，避免SPI的独占而浪费。
--  ____________________                ____________________
-- |                    |    单IO      |                    |
-- |           SPI_MISO |--------------| OUT                |
-- | Air10x             |              |       VS1838       |
-- |                    |              |     一体化接收头    |
-- |               GPIO |----      ----| GND                |
-- |____________________|   |      |   |____________________| 
--                          |      |
--                          |  ____|________ 
--                          | |    D        |
--                          --| G      NMOS | 
--                            |____S________|
--                                 |
--                                GND
--用法实例：演示用同一个SPI接口驱动VS1838和W25QXX
--用法实例：
local necir = require("necir")

--定义用户回调函数
local function my_ir_cb(frameTab)
    log.info('get ir msg','addr=',frameTab[1],frameTab[2],'data=',frameTab[3])
end

sys.taskInit(function()
    local CS = gpio.setup(pin.PA07,0)  --VS1838(NMOS控制其GND)与W25QXX共用的片选引脚
    necir.init(spi.SPI_0,pin.PB03,my_ir_cb)

    while 1 do
        --===============================
        log.info('------necir start------')
        CS(1)     --使能VS1838
        necir.start()  --开启necir数据接收过程
        sys.wait(10000)
        log.info('necir request to close')
        necir.close()   --请求关闭necir
        while not (necir.isClosed()) do
            sys.wait(200)
        end
        CS(0)    --除能VS1838
        log.info('necir closed')
        sys.wait(1000)

        --===============================
        log.info('------setup to read w25qxx chip id------')
        spi.setup(spi.SPI_0,nil,
            0,--CPHA
            0,--CPOL
            8,--数据宽度
            100000,--频率
            spi.MSB,--高低位顺序  
            spi.master,--主模式
            spi.full--全双工
        )
        --读取W25QXX chi id，0XEF15,表示芯片型号为W25Q32，0XEF16,表示芯片型号为W25Q64
        CS(0)   --片选W25QXX
        spi.send(spi.SPI_0,string.char(0x90)..string.char(0x00)..string.char(0x00)..string.char(0x00))
        local chip_id = spi.recv(spi.SPI_0,2)
        log.info('w25qxx id=',chip_id:toHex())
        CS(1)   --取消片选W25QXX
        sys.wait(1000)
    end
end)

```

## necir.init(spi_id,irq_pin,recv_cb)



necir初始化

**参数**

|传入值类型|解释|
|-|-|
|number|spi_id,使用的SPI接口的ID|
|number|irq_pin,使用的中断引脚，在单IO模式下这个引脚必须是SPI的MISO引脚|
|function|recv_cb,红外数据接收完成后的回调函数，回调函数有1个table类型参数，分别存储了地址码，地址码取反，数据码，数据码取反|

**返回值**

无

**例子**

```lua
local function my_ir_cb(frameTab)
    log.info('get ir msg','addr=',frameTab[1],frameTab[2],'data=',frameTab[3])
end

necir.init(spi.SPI_0,pin.PB03,my_ir_cb)

```

---

## necir.start()



开启necir数据接收过程

**参数**

无

**返回值**

无

**例子**

```lua
necir.start()

```

---

## necir.close()



请求关闭necir数据接收过程。此函数执行后并不能保证立刻关闭，具体是否已经关闭需要使用necir.isClosed()来查询。

**参数**

无

**返回值**

无

**例子**

```lua
necir.close()

```

---

## necir.isClosed()



判断necir是否已经完全关闭，关闭后所使用的SPI接口将释放，可以复用为其他功能。如需再次开启，则需要再次调用necir.start()

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|关闭成功返回true|

**例子**

```lua
necir.isClosed()

```

---

