# ioqueue - io序列操作

## ioqueue.init(hwtimer_id,cmd_cnt,repeat_cnt)

初始化一个io操作队列

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id，默认用0，根据实际MCU确定，air105为0~5，与pwm共用，同一个通道号不能同时为pwm和ioqueue|
|int|一个完整周期需要的命令，可以比实际的多|
|int|重复次数,默认是1，如果写0则表示无限次数循环|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
ioqueue.init(0,10,5) --以timer0为时钟源初始化一个io操作队列，有10个有效命令，循环5次

```

---

## ioqueue.setdelay(hwtimer_id,time_us,time_tick,continue)

对io操作队列增加延时命令

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|
|int|延时时间,0~65535us|
|int|延时微调时间,0~255tick,总的延时时间是time_us * 1us_tick + time_tick|
|boolean|是否连续是连续延时，默认否，如果是，定时器在时间到后不会停止而是重新计时，|

**返回值**

无

**例子**

无

---

## ioqueue.delay(hwtimer_id)

对io操作队列增加一次重复延时，在前面必须有setdelay且是连续延时

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
ioqueue.setdelay(0,9,15,true) --延时9us+15个tick,在之后遇到delay命令时，会延时9us+15个tick
ioqueue.delay(0)

```

---

## ioqueue.setgpio(hwtimer_id,pin,is_input,pull_mode,init_level)

对io操作队列增加设置gpio命令

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|
|int|pin|
|boolean|是否是输入|
|int|上下拉模式,只能是0,gpio.PULLUP,gpio.PULLDOWN|
|int|初始输出电平|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
ioqueue.setgpio(0,17,true,gpio.PULLUP,0) --GPIO17设置成上拉输入
ioqueue.setgpio(0,17,false,0,1)--GPIO17设置成默认上下拉输出高电平

```

---

## ioqueue.input(hwtimer_id,pin)

对io操作队列增加读取gpio命令

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|
|int|pin|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
--- 对GPIO17进行输入读取
ioqueue.input(0, 17)


```

---

## ioqueue.output(hwtimer_id,pin,level)

对io操作队列增加输出GPIO命令

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|
|int|pin|
|int|输出电平|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 对GPIO17输出低电平
ioqueue.output(0, 17, 0)

```

---

## ioqueue.set_cap(hwtimer_id,pin,pull_mode,irq_mode,max_tick)

对io操作队列增加设置捕获某个IO命令

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|
|int|pin|
|int|上下拉模式,只能是0,gpio.PULLUP,gpio.PULLDOWN|
|int|中断模式,只能是gpio.BOTH,gpio.RISING,gpio.FALLING|
|int|定时器最大计时时间 考虑到lua是int类型，最小0x10000, 最大值为0x7fffffff，默认为最大值|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 捕获指令
ioqueue.setcap(0, 17, gpio.PULLUP, gpio.FALLING, 48000000)

```

---

## ioqueue.capture(hwtimer_id)

对io操作队列增加捕获一次IO状态命令

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
ioqueue.capture(0)

```

---

## ioqueue.capend(hwtimer_id,pin)

对io操作队列增加结束捕获某个IO命令

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|
|int|pin|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 结束捕获
ioqueue.capend(0, 17)

```

---

## ioqueue.get(hwtimer_id, input_buff, capture_buff)

* 获取io操作队列中输入和捕获的数据

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|
|zbuff|存放IO输入数据的buff，按照1byte pin + 1byte level 形式存放数据|
|zbuff|存放IO捕获数据的buff，按照1byte pin + 1byte level + 4byte tick形式存放数据|

**返回值**

|返回值类型|解释|
|-|-|
|int|返回多少组IO输入数据|
|int|返回多少组IO捕获数据|

**例子**

```lua
local input_cnt, capture_cnt = ioqueue.get(0, input_buff, capture_buff)

```

---

## ioqueue.start(hwtimer_id)

启动io操作队列

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
ioqueue.start(0)

```

---

## ioqueue.stop(hwtimer_id)

停止io操作队列，可以通过start从头开始

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|

**返回值**

|返回值类型|解释|
|-|-|
|int|返回已经循环的次数，如果是0，表示一次循环都没有完成|
|int|返回单次循环中已经执行的cmd次数，如果是0，可能是一次循环刚刚结束|

**例子**

```lua
ioqueue.stop(0)

```

---

## ioqueue.release(hwtimer_id)

释放io操作队列的资源，下次使用必须重新init

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
ioqueue.clear(0)

```

---

## ioqueue.clear(hwtimer_id)

清空io操作队列

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
ioqueue.clear(0)

```

---

## ioqueue.done(hwtimer_id)

检测io操作队列是否已经执行完成

**参数**

|传入值类型|解释|
|-|-|
|int|硬件定时器id|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|队列是否执行完成，|

**例子**

```lua
local result = ioqueue.done(0)

```

---

## ioqueue.exti(pin,pull_mode,irq_mode,onoff)

启动/停止一个带系统tick返回的外部中断

**参数**

|传入值类型|解释|
|-|-|
|int|pin|
|int|上下拉模式,只能是0,gpio.PULLUP,gpio.PULLDOWN|
|int|中断模式,只能是gpio.BOTH,gpio.RISING,gpio.FALLING|
|boolean|开关，默认是false关|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 对GPIO17进行外部中断捕获
ioqueue.exti(17, gpio.PULLUP, gpio.BOTH, true)
ioqueue.exti(17)

```

---

