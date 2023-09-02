# necir - necir NEC协议红外接收

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/necir.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
--注意:
--由于本库基于标准四线SPI接口实现，所以虽然只用到了MISO引脚，但是其他3个SPI相关引脚无法作为其他用途
--除非执行necir.close()后，中断引脚和SPI都将完全释放，可以用于其他用途
--实现了NEC红外数据接收，发送请使用LuatOS底层固件自带的ir.sendNEC()函数
--硬件模块：VS1838及其兼容的一体化接收头
--接线示意图：
--
--支持单IO模式，即仅使用一个SPI_MISO引脚，此时necir.init的irq_pin参数必须是SPI_MISO所在引脚
--  ____________________              ____________________
-- |                    |    单IO    |                    |
-- |           SPI_MISO |------------| OUT                |
-- | Air10x             |            |       VS1838       |
-- |                    |            |     一体化接收头    |
-- |                    |            |                    |
-- |____________________|            |____________________| 
--
--双IO模式，即单独用另一个IO做中断检测。单IO和双IO没有功能差异，具体如何选择取决于实际情况
-- ***一般情况下没必要用双IO模式***
--  ____________________              ____________________
-- |                    |    双IO    |                    |
-- |           SPI_MISO |------------| OUT                |
-- | Air10x             |   |        |       VS1838       |
-- |           IRQ_GPIO |---         |     一体化接收头    |
-- |                    |            |                    |
-- |____________________|            |____________________| 

--用法实例：
local necir = require("necir")

local function my_ir_cb(frameTab)
    log.info('get ir msg','addr=',frameTab[1],'data=',frameTab[3])
end

sys.taskInit(function()
    necir.init(spi.SPI_0,pin.PB03,my_ir_cb)

    while 1 do
        sys.wait(1000)
    end
end)


```

## necir.init(spi_id,irq_pin,recv_cb)



necir初始化，开启数据接收任务

**参数**

|传入值类型|解释|
|-|-|
|number|spi_id,使用的SPI接口的ID|
|number|irq_pin,使用的中断引脚，这个引脚可以是SPI的MISO引脚（单IO模式）|
|function|recv_cb,红外数据接收完成后的回调函数，回调函数有1个table类型参数，分别存储了地址码，地址码取反，数据码，数据码取反|

**返回值**

无

**例子**

```lua
local function my_ir_cb(frameTab)
    log.info('get ir msg','addr=',frameTab[1],'data=',frameTab[3])
end

necir.init(spi.SPI_0,pin.PB03,my_ir_cb)

```

---

## necir.close()



关闭necir数据接收过程。如需再次开启，则需要再次调用necir.init(spi_id,irq_pin,recv_cb)

**参数**

无

**返回值**

无

**例子**

```lua
necir.close()

```

---

