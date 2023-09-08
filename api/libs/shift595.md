# shift595 - shift595 74HC595芯片

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/shift595.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
--注意:
--1、初始化时必须提供sclk移位时钟引脚和dat数据引脚，rclk根据应用需求可选
--2、AIR101官方核心板，底层为LuatOS-SoC_V0017_AIR101.soc，经测试此脚本库的串行时钟频率为18KHz
--用法实例：
--硬件模块：双595驱动的共阳极4位数码管
local shift595 = require("shift595")
sys.taskInit(function() 

    shift595.init(pin.PB08,pin.PB09,pin.PB10)  -- sclk,dat,rclk
    
    while 1 do
        local wei = 1
        for i = 0, 3, 1 do
            shift595.out(0x82,shift595.MSB)--发送段数据 ，然后是位选数据
            shift595.out(wei,shift595.MSB)--发送段数据 ，然后是位选数据
            shift595.latch() --锁存
            wei = wei<<1
            sys.wait(500)
        end
        sys.wait(1000)
    end
end
)

```

## shift595.init(sclk,dat,rclk)



75hc595芯片初始化

**参数**

|传入值类型|解释|
|-|-|
|number|sclk,定义驱动595串行时钟信号的引脚|
|number|dat,定义驱动595串行数据的引脚|
|number|rclk,定义驱动595锁存信号的引脚，可选|

**返回值**

无

**例子**

```lua
shift595.init(pin.PB08,pin.PB09,pin.PB10)  -- sclk,dat,rclk

```

---

## shift595.out(dat,endian)



串行输出一个字节到74hc595芯片的移位寄存器中

**参数**

|传入值类型|解释|
|-|-|
|number|dat,发送的字节数据|
|number|endian,指定发送字节数据时的大小端模式，有shift595.MSB和shift595.LSB两种参数可选。默认shift595.MSB|

**返回值**

无

**例子**

```lua
shift595.out(0x82,shift595.MSB)
shift595.out(0x82)  --默认shift595.MSB，与上面等价

```

---

## shift595.latch()



给74hc595芯片的RCLK线一个高脉冲，使得移位寄存器中的数据转移到锁存器中，当OE使能时，数据就输出到QA~QH引脚上。如果初始化时没用到rclk引脚则此函数调用无效。

**参数**

无

**返回值**

无

**例子**

```lua
shift595.latch()

```

---

