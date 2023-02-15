# LuatOS固件下的IO复用配置

由于固件特性的存在, LuatOS的io复用是固定的

不同模块的布局不一样, 但`PAD(paddr)`值是一致的, 要对应 "PIN/GPIO对应表格" 文档, 该文档可以在 https://air780e.cn 找到

## PWM说明

实际可用通道就4个(0/1/2/4), 但每个都有2种配置, PWM3/PWM5已经被底层使用.

例如 PWM1和PWM11都使用硬件通道1, **只能选其中一个使用**.

启用PWM1就不能启用PWM11, 调用pwm库的API时,填 `软件通道id`

|软件通道id|实际硬件通道|对应的GPIO|对应的PAD|备注|
|----------|-----------|---------|---------|----|
|0        |    0       | GPIO23  |    43   | |
|1        |    1       | GPIO24  |    44   | MAIN_RI |
|2        |    2       | GPIO25  |    45   | |
|4        |    4       | GPIO27  |    47   | NetLed |
|10        |    0       | GPIO1  |    16   | LCD_RST|
|11        |    1       | GPIO2  |    17   | MAIN_DCD |
|12        |    2       | GPIO16 |    31   |MAIN_CTS |
|14        |    4       | GPIO19 |    34   |UART1_TXD/MAIN_TXD |

PS: 软件通道10/11/12/14需要V1002以上的固件, 20221219之后编译的版本

## UART说明

物理uart有3个(0/1/2)
1. uart0是日志口(DBG_TX/DBG_RX),不推荐使用,启动时也有输出,LuatOS固件默认禁用uart0
2. uart1是主串口(MAIN_TX/MAIN_RX), 推荐使用
3. uart2是次串口(AUX_TX/AUX_RX), **带GNSS功能的模块会接GNSS芯片**,而且PAD不同,不可用作其他功能
4. 注意, UART2在Air780E与Air780EG用的PAD是不一样的,但软件会自动适配,不需要关注.

|功能    |软件含义  |对应的GPIO|对应的PAD|备注|
|--------|----------|---------|---------|----|
|DBG_RX  | UART0_RX | -       |    29   ||
|DBG_TX  | UART0_TX | -       |    30   ||
|MAIN_RX | UART1_RX | GPIO18  |    33   ||
|MAIN_TX | UART1_TX | GPIO19  |    34   ||
|AUX_RX  | UART2_RX | GPIO10  |    25   |Air780EG在PAD 27|
|AUX_TX  | UART2_TX | GPIO11  |    26   |Air780EG在PAD 28|

## I2C说明

物理i2c有2个(0/1)

|功能     |软件含义  |对应的GPIO|对应的PAD|备注|
|---------|---------|---------|---------|----|
|I2C0_SCL | I2C0时钟 | GPIO14  |    13   |GPIO功能看后面的说明|
|I2C0_SDA | I2C0数据 | GPIO15  |    14   |GPIO功能看后面的说明|
|I2C1_SCL | I2C1时钟 | GPIO9   |    24   |与SPI0冲突|
|I2C1_SDA | I2C1数据 | GPIO8   |    23   |与SPI0冲突|

## SPI说明

物理SPI有2个(0/1)

|功能     |软件含义     |对应的GPIO|对应的PAD|备注|
|---------|------------|---------|---------|----|
|SPI0_CS  | SPI0片选    | GPIO8   |    23   ||
|SPI0_MOSI| SPI0主机输出| GPIO9   |    24   ||
|SPI0_MISO| SPI0从机输出| GPIO10  |    25   ||
|SPI0_SCL | SPI0时钟    | GPIO11  |    26   ||
|SPI1_CS  | SPI1片选    | -       |    27   ||
|SPI1_MOSI| SPI1主机输出| -       |    28   ||
|SPI1_MISO| SPI1从机输出| -       |    29   ||
|SPI1_SCL | SPI1时钟    | -       |    30   ||

注意:
1. SPI0与UART2/I2C1是冲突的, 事实如此
2. SPI1所在管脚虽然对应可复用为GPIO12/13/14/15,但这些GPIO实际映射到其他脚的

## GPIO额外说明

1. GPIO12/13/14/15在V1103/V1104有变动, 正确映射是 `PAD 11/12/13/14`, 软件上有修正
2. 普通GPIO在深睡眠/SLEEP2, 会有周期性高电平脉冲, 务必注意
3. AONGPIO是休眠时仍可维持高电平的GPIO,但驱动能力很弱
