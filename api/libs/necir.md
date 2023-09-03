# necir - necir NEC协议红外接收

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/necir.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
--注意:
--1、本库在Air101和Air103测试通过，Air105由于SPI传输帧与帧之间存在间隔因此暂不支持。
--2、本库实现了NEC红外数据接收，发送请使用LuatOS底层固件自带的ir.sendNEC()函数。
--3、由于本库基于标准四线SPI接口实现，所以虽然只用到了MISO引脚，但是其他3个SPI相关引脚在使用期间
--  无法作为其他用途，除非执行necir.close()后，中断引脚和SPI都将完全释放，才可以用于其他用途。
--硬件模块：VS1838及其兼容的一体化接收头
--接线示意图：
--支持单IO模式，即仅使用一个SPI_MISO引脚，此时necir.init的irq_pin参数必须是SPI_MISO所在引脚
--  ____________________              ____________________
-- |                    |    单IO    |                    |
-- |           SPI_MISO |------------| OUT                |
-- | Air10x             |            |       VS1838       |
-- |                    |            |     一体化接收头    |
-- |                    |            |                    |
-- |____________________|            |____________________| 
--
--用法实例：
local necir = require("necir")

--定义用户回调函数
local function my_ir_cb(frameTab)
    log.info('get ir msg','addr=',frameTab[1],frameTab[2],'data=',frameTab[3])
end

--启动红外数据接收任务（单IO模式，PB03为SPI0_MISO）
necir.init(spi.SPI_0,pin.PB03,my_ir_cb)

```

## necir.init(spi_id,irq_pin,recv_cb)



necir初始化，开启数据接收任务

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

