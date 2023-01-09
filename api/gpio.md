# gpio - GPIO操作

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_gpio.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看gpio的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/gpio)
```
```{tip}
本库还有视频教程，[点此链接查看](https://www.bilibili.com/video/BV1hr4y1p7dt)
```

## 常量

|常量|类型|解释|
|-|-|-|
|gpio.LOW|number|低电平|
|gpio.HIGH|number|高电平|
|gpio.OUTPUT|number|输出模式|
|gpio.INPUT|number|输入模式|
|gpio.IRQ|number|中断模式|
|gpio.PULLUP|number|上拉|
|gpio.PULLDOWN|number|下拉|
|gpio.RISING|number|上升沿触发|
|gpio.FALLING|number|下降沿触发|
|gpio.BOTH|number|双向触发,部分设备支持|
|gpio.HIGH_IRQ|number|高电平触发,部分设备支持|
|gpio.LOW_IRQ|number|低电平触发,部分设备支持|


## gpio.setup(pin, mode, pull, irq)



设置管脚功能

**参数**

|传入值类型|解释|
|-|-|
|int|pin 针脚编号,必须是数值|
|any|mode 输入输出模式：<br>数字0/1代表输出模式<br>nil代表输入模式<br>function代表中断模式|
|int|pull 上拉下列模式, 可以是gpio.PULLUP 或 gpio.PULLDOWN, 需要根据实际硬件选用|
|int|irq 默认gpio.BOTH。中断触发模式<br>上升沿gpio.RISING<br>下降沿gpio.FALLING<br>上升和下降都要gpio.BOTH|

**返回值**

|返回值类型|解释|
|-|-|
|any|输出模式返回设置电平的闭包, 输入模式和中断模式返回获取电平的闭包|

**例子**

```lua
-- 设置gpio17为输入
gpio.setup(17, nil)
-- 设置gpio17为输出
gpio.setup(17, 0)
-- 设置gpio27为中断
gpio.setup(27, function(val) print("IRQ_27",val) end, gpio.PULLUP)

```

---

## gpio.set(pin, value)



设置管脚电平

**参数**

|传入值类型|解释|
|-|-|
|int|pin 针脚编号,必须是数值|
|int|value 电平, 可以是 高电平gpio.HIGH, 低电平gpio.LOW, 或者直接写数值1或0|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 设置gpio17为低电平
gpio.set(17, 0)

```

---

## gpio.get(pin)



获取管脚电平

**参数**

|传入值类型|解释|
|-|-|
|int|pin 针脚编号,必须是数值|

**返回值**

|返回值类型|解释|
|-|-|
|value|电平, 高电平gpio.HIGH, 低电平gpio.LOW, 对应数值1和0|

**例子**

```lua
-- 获取gpio17的当前电平
gpio.get(17)

```

---

## gpio.close(pin)



关闭管脚功能(高阻输入态),关掉中断

**参数**

|传入值类型|解释|
|-|-|
|int|pin 针脚编号,必须是数值|

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
gpio.setup(16, 0)
sys.timerLoopStart(function()
    gpio.toggle(16)
end, 500)

```

---

## gpio.pulse(pin,level,len,delay)



在同一个GPIO输出一组脉冲, 注意, len的单位是bit, 高位在前.

**参数**

|传入值类型|解释|
|-|-|
|int|gpio号|
|int/string|数值或者字符串.|
|int|len 长度 单位是bit, 高位在前.|
|int|delay 延迟,当前无固定时间单位|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 通过PB06脚输出输出8个电平变化.
gpio.pulse(pin.PB06,0xA9, 8, 0)

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
gpio.debounce(7, 100) -- 若芯片支持pin库, 可用pin.PA7代替数字7
-- 开启防抖, 模式1-延时, 中断后等待100ms,期间若保持该电平了,时间到之后上报一次
-- 对应的,如果输入的是一个 50hz的方波,那么不会触发任何上报
gpio.debounce(7, 100, 1)

-- 关闭防抖,时间设置为0就关闭
gpio.debounce(7, 0)

```

---

