# LuatOS固件下的IO复用配置

**本文档描述的是LuatOS和CSDK视角**

1. 通过[mcu.iomux函数](https://wiki.luatos.com/api/mcu.html)可以修改部分映射.
2. 不同模块的外部管脚布局不一样, 但`PAD(paddr)`值是一致的, 要对应 "PIN/GPIO对应表格" 文档, 该文档可以在 [air780ep.cn](https://air780ep.cn) 找到
3. 对于AT固件来说,本文档没有意义, 请无视
4. 云编译和mcu.iomux函数可以调整部分复用关系, 请查阅链接 [mcu库的文档](https://wiki.luatos.com/api/mcu.html)
5. 若使用SIM2, 会占用 4个IO(gpio4/5/6/23)

## PWM说明

|软件通道id|实际硬件通道|对应的GPIO|对应的PAD|备注|
|----------|------------|---------|---------|----|
|0         |    0       | GPIO1   |    16   | AU_OUT,建议避免使用|
|1         |    1       | GPIO24  |    49   | MAIN_RI,驱动能力弱 |
|2         |    2       | GPIO25  |    50   | AGPIO5,驱动能力弱|
|4         |    4       | GPIO27  |    52   | NetLed,网络状态灯 |

说明:

1. 实际可用通道就4个(0/1/2/4), 4个通道可单独使用,互不影响. **PWM3/PWM5已经被底层使用**.
2. 但相同的硬件通道, 例如 PWM1和PWM11都使用硬件通道1, 同一时间**只能选其中一个使用**.
3. 启用PWM1就不能启用PWM11, 启用PWM1和启用PWM22就不受限制.
4. 调用pwm库的API时,填 `软件通道id`, 不是填GPIO号,不是填硬件通道号
5. 当前固件版本V1001还不支持其他PWM复用通道的使用, 后续版本会支持

## UART说明

物理uart有3个(0/1/2/3)

1. uart0是日志口(DBG_TX/DBG_RX),不推荐使用,启动时也有输出,LuatOS固件默认不允许用户使用uart0
2. uart1是主串口(MAIN_TX/MAIN_RX), 推荐使用
3. uart2是次串口(AUX_TX/AUX_RX)
4. uart3是备用串口,没有默认功能
5. 下列映射是默认值, 当前不支持通过 mcu.iomux 可配置
6. 当前不支持释放uart0

|功能    |软件含义  |对应的GPIO|对应的PAD|备注|
|--------|----------|---------|---------|----|
|DBG_RX  | UART0_RX | -       |    31   ||
|DBG_TX  | UART0_TX | -       |    32   ||
|MAIN_RX | UART1_RX | GPIO18  |    33   ||
|MAIN_TX | UART1_TX | GPIO19  |    34   ||
|AUX_RX  | UART2_RX | GPIO12  |    27   ||
|AUX_TX  | UART2_TX | GPIO13  |    28   ||
|UART3_RX| UART3_RX | GPIO34  |    40   ||
|UART3_TX| UART3_TX | GPIO35  |    41   ||

## I2C说明

1. 物理i2c有2个(0/1)
2. 下列映射是默认值, 通过 mcu.iomux 可配置

|功能     |软件含义  |对应的GPIO|对应的PAD|备注|
|---------|---------|---------|---------|----|
|I2C0_SCL | I2C0时钟 | GPIO18  |    13   |看后面描述|
|I2C0_SDA | I2C0数据 | GPIO19  |    14   |看后面描述|
|I2C1_SCL | I2C1时钟 | GPIO29  |    29   ||
|I2C1_SDA | I2C1数据 | GPIO30  |    30   ||

注意:

1. 虽然I2C0的GPIO号与UART1/MAIN_UART的GPIO号相同,但实际GPIO18/19复用在UART1/MAIN_UART管脚,与I2C0不冲突
2. I2C是总线结构, 可以接多个不同i2c地址的器件

## SPI说明

1. 物理SPI有3个, 其中`0/1`是通用型SPI, `5`是专用型SPI,供LCD刷屏用
2. 下列映射是默认值, 通过 mcu.iomux 可配置

|功能     |软件含义     |对应的GPIO|对应的PAD|备注|
|---------|------------|---------|---------|----|
|SPI0_CS  | SPI0片选    | GPIO8   |    23   |与I2C1冲突|
|SPI0_MOSI| SPI0主机输出| GPIO9   |    24   |与I2C1冲突|
|SPI0_MISO| SPI0从机输出| GPIO10  |    25   ||
|SPI0_SCL | SPI0时钟    | GPIO11  |    26   ||
|SPI1_CS  | SPI1片选    | GPIO12  |    27   |注意与UART2冲突|
|SPI1_MOSI| SPI1主机输出| GPIO13  |    28   |注意与UART2冲突|
|SPI1_MISO| SPI1从机输出| GPIO14  |    29   ||
|SPI1_SCL | SPI1时钟    | GPIO15  |    30   ||
|SPI5_CLK | LCD时钟     | GPIO34  |    40   |LCD_CLK,注意与UART3冲突|
|SPI5_CS  | LCD片选     | GPIO35  |    41   |LCD_CS,注意与UART3冲突|
|SPI5_RST | LCD复位     | GPIO36  |    42   | LCD_RST|
|SPI5_SCL | 数据输出    | GPIO37  |    43   | LCD_DOUT |
|SPI5_RS  | LCD_RS     | GPIO38  |    44   | LCD_RS|

注意:

1. SPI0与UART2是冲突的, 事实如此
2. SPI5是LCD刷屏专用SPI, 不支持通用SPI功能

## GPIO额外说明

1. AONGPIO是休眠时仍可维持高电平的GPIO,但驱动能力很弱
2. 普通GPIO在配置成输入/中断模式时，上下拉无法设置，如果默认上下拉不能满足要求，可以设置成`0`来取消默认上下拉，然后外部加上下拉

## 虚拟GPIO

Air780EP(EC718P/EC718PV全系)支持多个虚拟的GPIO, 将非GPIO管脚通过软件模拟成GPIO来使用

|编号|名称|功能|备注|
|----|----|----|---|
|39| wakeup0|仅支持输入和中断| wakeup0休眠唤醒脚|
|40| wakeup1/vbus|仅支持输入和中断| USB的VBUS, 检测USB是否是插入状态|
|41| wakeup2|仅支持输入和中断| wakeup2休眠唤醒脚, USIM_DET|
|46| pwrkey |仅支持输入和中断| 即开机键, 开机之后当普通GPIO使用|

说明:

1. vbus与USB功能是解耦的
2. 与常规认识不同, 在不接vbus的情况下, USB功能依然可用
3. 在进入休眠前, 将上述`wakeup0/wakeup1/wakeup2`设置成中断状态, 即可实现管脚唤醒功能
4. 非wakeup的普通GPIO, 是不支持休眠唤醒的
5. wakeup3/wakeup4/wakeup5在模块未引出

例如将`wakup0`设置为唤醒脚, 中断回调可以是空函数

```lua
gpio.setup(32, function() end, gpio.PULLUP)
```

## 关于USB的额外说明

1. **BOOT模式对USB布线要求高**,一定要做差分线和阻抗匹配!!!
2. 有USB通信的情况下, 是无法休眠的, 可以通过`pm.power(pm.USB, false)`关闭USB通信
3. UART1也能刷机,但需要用量产工具刷, LuaTools暂不支持通过UART给Air780EP/Air780EPV刷机!!!
