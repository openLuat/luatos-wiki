# gpio - GPIO操作

## 常量

|常量|类型|解释|
|-|-|-|
|gpio.NONE|number|无效引脚,一般用于告诉底层某功能引脚不指定|
|gpio.LOW|number|低电平|
|gpio.HIGH|number|高电平|
|gpio.PULLUP|number|上拉|
|gpio.PULLDOWN|number|下拉|
|gpio.RISING|number|上升沿触发|
|gpio.FALLING|number|下降沿触发|
|gpio.BOTH|number|双向触发,部分设备支持|
|gpio.HIGH_IRQ|number|高电平触发,部分设备支持|
|gpio.LOW_IRQ|number|低电平触发,部分设备支持|
|gpio.WAKEUP0|number|休眠唤醒脚0,不支持输出|
|gpio.WAKEUP1|number|VBUS,USB唤醒脚,不支持输出|
|gpio.WAKEUP2|number|USIM热插拔脚,不支持输出|
|gpio.WAKEUP3|number|休眠唤醒脚3,与GPIO20是同一个引脚|
|gpio.WAKEUP4|number|休眠唤醒脚4,与GPIO21是同一个引脚|
|gpio.WAKEUP5|number|休眠唤醒脚5,与GPIO22是同一个引脚|
|gpio.WAKEUP6|number|休眠唤醒脚6,,不支持输出|
|gpio.AUDIOPA_EN|number|音频PA使能脚, 仅Air780EHV特有的引脚|
|gpio.PWR_KEY|number|开机键,支持双向触发中断,不支持输出|


## gpio.setup(pin, mode, pull, irq, alt)

设置管脚功能

**参数**

|传入值类型|解释|
|-|-|
|int|pin gpio编号,必须是数值|
|any|mode 输入输出模式：<br>数字0/1代表输出模式<br>nil代表输入模式<br>function代表中断模式，如果填gpio.count，则为中断计数功能，中断时不回调|
|int|pull 上拉下拉模式, 可以是上拉模式 gpio.PULLUP 或下拉模式 gpio.PULLDOWN, 或者开漏模式 0. 需要根据实际硬件选用|
|int|irq 中断触发模式,默认gpio.BOTH。中断触发模式<br>上升沿gpio.RISING<br>下降沿gpio.FALLING<br>上升和下降都触发gpio.BOTH |
|int|alt 复用选项，目前只有Air780EXXX平台需要这个参数，有些GPIO可以复用到不同引脚上，可以选择复用选项（0或者4）从而复用到对应的引脚上|

**返回值**

|返回值类型|解释|
|-|-|
|any|输出模式返回设置电平的闭包, 输入模式和中断模式返回获取电平的闭包|

**例子**

```lua

-- 设置gpio17为输入
gpio.setup(17, nil)

-- 设置gpio17为输出,且初始化电平为低,使用硬件默认上下拉配置
gpio.setup(17, 0)

-- 设置gpio17为输出,且初始化电平为高,且启用内部上拉
gpio.setup(17, 1, gpio.PULLUP)

-- 设置gpio27为中断, 默认双向触发
gpio.setup(27, function(val,io_num)
    print("io",io_num,val) -- 提醒, val并不代表触发方向, 仅代表中断后某个时间点的电平, io_num是IO序号
end, gpio.PULLUP)

-- 设置gpio27为中断, 仅上升沿触发
gpio.setup(27, function(val)
    print("IRQ_27",val) -- 提醒, val并不代表触发方向, 仅代表中断后某个时间点的电平
end, gpio.PULLUP, gpio.RISING)

-- 中断计数 于2024.5.8新增
-- 设置gpio7为中断计数，详细demo见gpio/gpio_irq_count
gpio.setup(7, gpio.count)

-- alt_func 于2023.7.2新增
-- 本功能仅对AIR780EXXX有效,仅用于调整GPIO复用,不能用于外设复用调整
-- 以下示例代码, 将I2S_DOUT复用成gpio18
-- AIR780E的PIN33(模块管脚序号), 对应paddr 38, 默认功能是I2S_DOUT, 复用成gpio18
-- 方向输出,且初始化电平为低,使用硬件默认上下拉配置
-- Air780E(GPIO复用请查阅 https://air780e.cn 首页硬件资料表格中的Air780E&Air780EG&Air780EX&Air700E_GPIO_table_20231227.pdf)
-- Air780EP(GPIO复用请查阅 https://air780ep.cn 首页硬件资料表格中的Air780E&Air780EG&Air780EX&Air700E_GPIO_table_20231227.pdf)
gpio.setup(18, 0, nil, nil, 4)

-- 提醒: 
-- 当管脚为输入模式或中断,才能通过gpio.get()获取到电平
-- 当管脚为输出模式,才能通过gpio.set()设置电平
-- 当管脚为输出模式,通过gpio.get()总会得到0
-- 中断回调的val参数不代表触发方向, 仅代表中断后某个时间点的电平
-- 对Cat.1模块,Air780E只有GPIO20~22才能双向触发，其他系列所有GPIO都能双向触发，具体看硬件手册
-- 默认设置下,中断是没有防抖时间的,可以通过gpio.set_debounce(pin, 50)来设置防抖时间

-- pull参数的额外说明, 上拉/下拉配置
-- 对于部分的BSP来说, 只支持 gpio.PULLUP 或 gpio.PULLDOWN, 但有部分BSP支持开漏模式
-- 对于支持开漏的bsp, pull参数要传 0 才能开启开漏模式, 不是传nil
-- 例如:
-- EC618系列(Air780E/Air780EG/Air780EX/Air700E等)
-- EC718系列(Air780EP/Air780EPV等)
-- XT804系列(Air101/Air103/Air601)

```

---

## gpio.caplevel(pin, level,func)

捕获管脚电平持续时长，单位us

**参数**

|传入值类型|解释|
|-|-|
|int|pin GPIO编号,必须是数值|
|int|level 需要捕获的电平, 可以是 高电平gpio.HIGH, 低电平gpio.LOW, 或者直接写数值1或0，即管脚上正常时间处于level的反，捕获设定的level持续时间|
|function|func 完成捕获后的回调函数，仅一个参数，参数为捕获到的时间长度number型数值，单位us|

**返回值**

|返回值类型|解释|
|-|-|
|any|返回获取电平的闭包|

**例子**

```lua
-- 捕获GPIO7为高电平的持续时间
gpio.caplevel(7,1,function(us_int) print(us_float) end)

```

---

## gpio.set(pin, value)

设置管脚电平

**参数**

|传入值类型|解释|
|-|-|
|int|pin GPIO编号,必须是数值|
|int|value 电平, 可以是 高电平gpio.HIGH, 低电平gpio.LOW, 或者直接写数值1或0|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 注意!!! 仅输出状态下,这个函数才有效
-- 一定要先gpio.setup, 起码执行过一次gpio.setup, 才能使用本函数. 但不需要每次都gpio.setup
-- 设置gpio17为低电平
gpio.set(17, 0)

```

---

## gpio.get(pin)

获取管脚电平

**参数**

|传入值类型|解释|
|-|-|
|int|pin GPIO编号,必须是数值|

**返回值**

|返回值类型|解释|
|-|-|
|value|电平, 高电平gpio.HIGH, 低电平gpio.LOW, 对应数值1和0|

**例子**

```lua
-- 注意!!! 仅输入模式或者中断模式状态下,这个函数才有效
-- 一定要先gpio.setup, 起码执行过一次gpio.setup, 才能使用本函数. 但不需要每次都gpio.setup
-- 获取gpio17的当前电平
local value = gpio.get(17)
log.info("gpio", "GPIO17:", value)

```

---

## gpio.close(pin)

关闭管脚功能(恢复高阻输入态),关掉中断

**参数**

|传入值类型|解释|
|-|-|
|int|pin GPIO编号,必须是数值|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值,总是执行成功|

**例子**

```lua
-- 关闭gpio17
gpio.close(17)

```

---

## gpio.setDefaultPull(val)

设置GPIO脚的默认上拉/下拉设置, 默认是平台自定义(一般为开漏).

**参数**

|传入值类型|解释|
|-|-|
|int|val 0平台自定义,1上拉, 2下拉|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|传值正确返回true,否则返回false|

**例子**

```lua
-- 设置gpio.setup的pull默认值为上拉
gpio.setDefaultPull(1)

```

---

## gpio.toggle(pin)

变换GPIO脚输出电平,仅输出模式可用

**参数**

|传入值类型|解释|
|-|-|
|int|管脚的GPIO号|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 本API于 2022.05.17 添加
-- 假设GPIO16上有LED, 每500ms切换一次开关
-- 注意!!! 仅输出状态下,这个函数才有效
gpio.setup(16, 0)
sys.timerLoopStart(function()
    gpio.toggle(16)
end, 500)

```

---

## gpio.pulse(pin,level,len,delay)

在同一个GPIO输出一组脉冲

**参数**

|传入值类型|解释|
|-|-|
|int|gpio号|
|int/string|数值或者字符串.|
|int|len 长度 单位是bit, 高位在前.|
|int|delay 高低电平延迟时间, 用的软件while来delay, 这里的delay值是while循环次数, 具体delay时间必须实际调试才知道|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 注意, len的单位是bit, 高位在前，高低电平时间均是由delay决定。
-- 本API是阻塞操作，不可以一次性输出太多的脉冲！！！ 否则会死机!!!
-- 通过GPIO1脚输出输出8个电平变化，while循环次数是0
gpio.pulse(1,0xA9, 8, 0)

```

---

## gpio.debounce(pin, ms, mode)

防抖设置, 根据硬件ticks进行防抖

**参数**

|传入值类型|解释|
|-|-|
|int|gpio号, 0~127, 与硬件相关|
|int|防抖时长,单位毫秒, 最大 65555 ms, 设置为0则关闭|
|int|模式, 0冷却模式, 1延时模式. 默认是0|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 消抖模式, 当前支持2种, 2022.12.16开始支持mode=1
-- 0 触发中断后,马上上报一次, 然后冷却N个毫秒后,重新接受中断
-- 1 触发中断后,延迟N个毫秒,期间没有新中断且电平没有变化,上报一次

-- 开启防抖, 模式0-冷却, 中断后马上上报, 但100ms内只上报一次
gpio.debounce(7, 100) -- 对应GPIO7
-- 开启防抖, 模式1-延时, 中断后等待100ms,期间若保持该电平了,时间到之后上报一次
-- 对应的,如果输入的是一个 50hz的方波,那么不会触发任何上报
gpio.debounce(7, 100, 1)

-- 关闭防抖,时间设置为0就关闭
gpio.debounce(7, 0)

```

---

## gpio.count(pin)

获取gpio中断数量，并清空累计值

**参数**

|传入值类型|解释|
|-|-|
|int|gpio号, 0~127, 与硬件相关|

**返回值**

|返回值类型|解释|
|-|-|
|int|返回从上次获取中断数量后到当前的中断计数|

**例子**

```lua
log.info("irq cnt", gpio.count(10))

```

---

