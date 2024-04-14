# LuatOS固件下的IO复用配置

**本文档描述的是LuatOS视角**

1. 由于固件特性的存在, LuatOS的io复用默认是固定的, 从V1107开始, 通过mcu.iomux函数可以部分修改映射.
2. 不同模块的外部管脚布局不一样, 但`PAD(paddr)`值是一致的, 要对应 "PIN/GPIO对应表格" 文档, 该文档可以在 [air780e.cn](https://air780e.cn) 找到
3. 由于芯片的引脚少,存在大量复用的场景,有很多功能是会冲突的
4. 对于AT固件来说,本文档没有意义, 请无视
5. 对于CSDK来说, 相关复用都是可以修改的, 所以也请无视本文档
6. Air600E注定不适合二次开发,有些管脚在硬件设计手册里的描述会有差异,注意区分
7. 云编译和mcu.iomux函数可以调整部分复用关系, 请查阅链接 [mcu库的文档](https://wiki.luatos.com/api/mcu.html)
8. 若使用SIM2, 会占用 4个IO(gpio4/5/6/23)

## PWM说明

实际可用通道就4个(0/1/2/4), 但每个都有3种配置, PWM3/PWM5已经被底层使用.

例如 PWM1和PWM11都使用硬件通道1, **只能选其中一个使用**.

启用PWM1就不能启用PWM11, 调用pwm库的API时,填 `软件通道id`

|软件通道id|实际硬件通道|对应的GPIO|对应的PAD|备注|
|----------|------------|---------|---------|----|
|0         |    0       | GPIO23  |    43   | AGPIO3,驱动能力弱. **应避免使用本管脚**|
|1         |    1       | GPIO24  |    44   | MAIN_RI,实际为AGPIO4,驱动能力弱 |
|2         |    2       | GPIO25  |    45   | AGPIO5,驱动能力弱|
|4         |    4       | GPIO27  |    47   | NetLed,网络状态灯 |
|10        |    0       | GPIO1   |    16   | LCD_RST,实际为普通GPIO|
|11        |    1       | GPIO2   |    17   | MAIN_DCD,实际为普通GPIO |
|12        |    2       | GPIO16  |    31   | MAIN_CTS,实际为普通GPIO |
|14        |    4       | GPIO18  |    33   | UART1_RXD/MAIN_RXD |
|20        |    0       | 无      |    39   | I2S_MCLK|
|21        |    1       | GPIO29  |    35   | I2S_BCLK |
|22        |    2       | GPIO30  |    36   | I2S_LRCK |

PS:

1. 软件通道10/11/12/14需要V1002以上的固件, 20221219之后编译的版本
2. 软件通道20/21/22需要V1016以上的固件, 20230330之后编译的版本
3. 上述映射是固定的, mcu.iomux 也没有配置项, 而且已经枚举了全部可用PWM通道.

## UART说明

物理uart有3个(0/1/2)

1. uart0是日志口(DBG_TX/DBG_RX),不推荐使用,启动时也有输出,LuatOS固件默认不允许用户使用uart0
2. uart1是主串口(MAIN_TX/MAIN_RX), 推荐使用
3. uart2是次串口(AUX_TX/AUX_RX), **带GNSS功能的模块会接GNSS芯片**,而且PAD不同,不可用作其他功能
4. 注意, UART2在Air780E与Air780EG用的PAD是不一样的,但软件会自动适配,不需要关注
5. 下列映射是默认值, 通过 mcu.iomux 可配置
6. [云编译](https://wiki.luatos.com/develop/compile/Cloud_compilation.html)支持释放uart0, 虽然不推荐这样做.

|功能    |软件含义  |对应的GPIO|对应的PAD|备注|
|--------|----------|---------|---------|----|
|DBG_RX  | UART0_RX | -       |    29   ||
|DBG_TX  | UART0_TX | -       |    30   ||
|MAIN_RX | UART1_RX | GPIO18  |    33   ||
|MAIN_TX | UART1_TX | GPIO19  |    34   ||
|AUX_RX  | UART2_RX | GPIO10  |    25   |Air780EG在PAD 27|
|AUX_TX  | UART2_TX | GPIO11  |    26   |Air780EG在PAD 28|

## I2C说明

1. 物理i2c有2个(0/1)
2. 下列映射是默认值, 通过 mcu.iomux 可配置
3. Air780EX 只有 I2C0, 而且需要调用 `mcu.iomux(mcu.I2C, 0, 2)` 切换到PAD 31/32 即 GPIO 16/17

|功能     |软件含义  |对应的GPIO|对应的PAD|备注|
|---------|---------|---------|---------|----|
|I2C0_SCL | I2C0时钟 | GPIO14  |    13   |GPIO功能看后面的说明|
|I2C0_SDA | I2C0数据 | GPIO15  |    14   |GPIO功能看后面的说明|
|I2C1_SCL | I2C1时钟 | GPIO9   |    24   |与SPI0冲突|
|I2C1_SDA | I2C1数据 | GPIO8   |    23   |与SPI0冲突|

## SPI说明

1. 物理SPI有2个(0/1)
2. 下列映射是默认值, 通过 mcu.iomux 可配置

|功能     |软件含义     |对应的GPIO|对应的PAD|备注|
|---------|------------|---------|---------|----|
|SPI0_CS  | SPI0片选    | GPIO8   |    23   |与I2C1冲突|
|SPI0_MOSI| SPI0主机输出| GPIO9   |    24   |与I2C1冲突|
|SPI0_MISO| SPI0从机输出| GPIO10  |    25   ||
|SPI0_SCL | SPI0时钟    | GPIO11  |    26   ||
|SPI1_CS  | SPI1片选    | GPIO12  |    27   ||
|SPI1_MOSI| SPI1主机输出| GPIO13  |    28   ||
|SPI1_MISO| SPI1从机输出| -       |    29   |注意无GPIO功能|
|SPI1_SCL | SPI1时钟    | -       |    30   |注意无GPIO功能|

注意:

1. SPI0与UART2/I2C1是冲突的, 事实如此
2. SPI1的MISO和SCL虽然可复用为GPIO14/15,但这些GPIO实际映射到其他脚的,看`GPIO额外说明`

## GPIO额外说明

1. GPIO14/15在V1103有变动, 已正确映射到 `PAD 13/14`
2. 普通GPIO在深睡眠/SLEEP2, 会有周期性高电平脉冲, 务必注意
3. AONGPIO是休眠时仍可维持高电平的GPIO,但驱动能力很弱
4. GPIO12/GPIO13 有两种映射, 通过不同的API使用
5. 普通GPIO在配置成输入/中断模式时，上下拉无法设置，如果默认上下拉不能满足要求，可以设置成`0`来取消默认上下拉，然后外部加上下拉
6. GPIO20,21,22配置成中断模式时，是wakeup功能，可以配置上下拉，也可以取消使用外部上下拉
7. **GPIO23** 上电后首先是输入+下拉,然后会设置成 **输出+上拉+高电平**, 建议避免使用该GPIO
8. **注意**,仅 GPIO 20-22 支持`双向触发(上升+下降)`, 其他GPIO仅支持 `上升沿` 或 `下降沿` 的单向触发
9. GPIO 20-25 的电平翻转速度要比其他GPIO要慢

10. 使用复用功能的GPIO时，需要先将默认GPIO引脚的复用为其他功能，才能正常使用复用的GPIO

    ```lua
    -- 使用97引脚的GPIO12，需要先将58引脚的GPIO12复用为I2C或者UART功能
    -- 将57、58引脚复用为I2C0
    mcu.iomux(mcu.I2C, 0, 1)
    -- 启用I2C
    i2c.setup(0, i2c.SLOW)
    
    local function gpio12CbFnc()
    	log.info("gpio", "12")    
    end
    
    -- 启用复用为ALT4，97引脚的GPIO12
    gpio.setup(12, gpio12CbFnc, gpio.PULLUP, gpio.FALLING, 4)
    ```

|对应的GPIO|对应的PAD|使用的API示例|备注|
|---------|---------|---------|----|
| GPIO12   |    11   |pm.power(pm.DAC_EN, true 或者 false)|LDO_CTL,在Air600E标的是GPIO12|
| GPIO13   |    12   |pm.power(pm.GPS, true 或者 false)|没有引出,在Air780EG控制GPS的电源|
| GPIO12   |    27   |gpio.setup(12, 0)|I2C0_SDA,也是复用的|
| GPIO13   |    28   |gpio.setup(13, 0)|I2C0_SCL,也是复用的|

## 虚拟GPIO

Air780E(EC618全系)支持多个虚拟的GPIO, 将非GPIO管脚通过软件模拟成GPIO来使用

|编号|名称|功能|备注|
|----|----|----|---|
|32| wakeup0|仅支持输入和中断| wakeup0休眠唤醒脚|
|33| vbus/wakeup1|仅支持输入和中断| USB的VBUS, 检测USB是否是插入状态|
|34| wakeup2|仅支持输入和中断| wakeup2休眠唤醒脚, USIM_DET|
|35| pwrkey |仅支持输入和中断| 即开机键, 开机之后当普通GPIO使用|

vbus的说明:

1. 在CSDK/LuatOS固件中, vbus与USB功能是解耦的
2. 与常规认识不同, 在不接vbus的情况下, USB功能依然可用
3. 在进入休眠前, 将上述`wakeup0/wakeup1/wakeup2`设置成中断状态, 即可实现管脚唤醒功能
4. 非wakeup的普通GPIO, 是不支持休眠唤醒的

例如将`wakup0`设置为唤醒脚, 中断回调可以是空函数

```lua
gpio.setup(32, function() end, gpio.PULLUP)
```

pwrkey的说明:

1. pwrkey是上拉输入, 下拉立即开机或1.5秒开机, 取决于启用了开机防抖(`pm.power(pm.PWK_MODE, true)`)
2. AT固件是默认开机防抖的, 所以对应的是下拉1.5秒开机
3. 对应LuatOS/CSDK固件, 开机后该管脚的功能是自定义的, 再次下拉并不会关机, 可以通过如下代码实现关机

```lua
-- 长按2秒后关机
gpio.debounce(35, 2000, 1)
gpio.setup(35, function()
    log.info("执行关机")
    pm.shutdown()
end, gpio.PULLUP)
```

## 关于USB的额外说明

1. **BOOT模式对USB布线要求高**,一定要做差分线和阻抗匹配!!!
2. 有USB通信的情况下, 是无法休眠的, 可以通过`pm.power(pm.USB, false)`关闭USB通信
3. UART1也能刷机,但需要用量产工具刷, LuaTools暂不支持通过UART给Air780EP/Air780EPV刷机!!!
