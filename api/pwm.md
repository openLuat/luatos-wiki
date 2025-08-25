# pwm - PWM模块

**示例**

```lua
-- 本库支持2套API风格
-- 1. 传统API, open和close
-- 2. 新的API(推荐使用), setup,start,stop,setDuty,setFreq

-- 传统API
pwm.open(1, 1000, 50) -- 打开PWM1, 频率1kHz, 占空比50%
sys.wait(5000) -- 等待5秒
pwm.close(1) -- 关闭PWM1

-- 新API
pwm.setup(1, 1000, 50) -- 设置PWM1, 频率1kHz, 占空比50%
pwm.start(1) -- 启动PWM1
sys.wait(5000) -- 等待5秒
pwm.setFreq(1, 2000) -- 设置PWM1频率2kHz
sys.wait(5000) -- 等待5秒
pwm.setDuty(1, 25) -- 设置PWM1占空比25%
sys.wait(5000) -- 等待5秒
pwm.stop(1) -- 关闭PWM1

```

## pwm.open(channel, period, pulse, pnum, precision)

开启指定的PWM通道

**参数**

|传入值类型|解释|
|-|-|
|int|PWM通道|
|int|频率, 1-N,单位Hz. N受限于具体硬件能力|
|int|占空比 0-分频精度|
|int|输出周期 0为持续输出, 1为单次输出, 其他为指定脉冲数输出|
|int|分频精度, 100/256/1000, 默认为100, 若设备不支持会有日志提示|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果,成功返回true,失败返回false|

**例子**

```lua
-- 打开PWM5, 频率1kHz, 占空比50%
pwm.open(5, 1000, 50)
-- 打开PWM5, 频率10kHz, 分频为 31/256
pwm.open(5, 10000, 31, 0, 256)

```

---

## pwm.close(channel)

关闭指定的PWM通道

**参数**

|传入值类型|解释|
|-|-|
|int|PWM通道|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无处理结果|

**例子**

```lua
-- 关闭PWM5
pwm.close(5)

```

---

## pwm.capture(channel)

PWM捕获

**参数**

|传入值类型|解释|
|-|-|
|int|PWM通道|
|int|捕获频率|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果,成功返回true,失败返回false|

**例子**

```lua
-- PWM0捕获
while 1 do
    pwm.capture(0,1000)
    local ret,channel,pulse,pwmH,pwmL  = sys.waitUntil("PWM_CAPTURE", 2000)
    if ret then
        log.info("PWM_CAPTURE","channel"..channel,"pulse"..pulse,"pwmH"..pwmH,"pwmL"..pwmL)
    end
end

```

---

## pwm.setup(channel, period, pulse, pnum, precision)

初始化指定的PWM通道

**参数**

|传入值类型|解释|
|-|-|
|int|PWM通道|
|int|频率, 1-N,单位Hz. N受限于具体硬件能力|
|int|占空比 0-分频精度|
|int|输出周期 0为持续输出, 1为单次输出, 其他为指定脉冲数输出|
|int|分频精度, 100/256/1000, 默认为100, 若设备不支持会有日志提示|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果,成功返回true,失败返回false|

**例子**

```lua
-- 设置PWM5, 频率1kHz, 占空比50%
pwm.setup(5, 1000, 50)

```

---

## pwm.start(channel)

启动指定的PWM通道

**参数**

|传入值类型|解释|
|-|-|
|int|PWM通道|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果,成功返回true,失败返回false|

**例子**

```lua
-- 启动PWM1
pwm.start(1)

```

---

## pwm.stop(channel)

停止指定的PWM通道

**参数**

|传入值类型|解释|
|-|-|
|int|PWM通道|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果,成功返回true,失败返回false|

**例子**

```lua
-- 停止PWM1
pwm.stop(1)

```

---

## pwm.setDuty(channel, duty)

设置指定PWM通道的占空比

**参数**

|传入值类型|解释|
|-|-|
|int|PWM通道|
|int|占空比|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果,成功返回true,失败返回false|

**例子**

```lua
-- 设置PWM1占空比25%
pwm.setDuty(1, 25)

```

---

## pwm.setFreq(channel, freq)

设置指定PWM通道的频率

**参数**

|传入值类型|解释|
|-|-|
|int|PWM通道|
|int|频率, 1-N,单位Hz. N受限于具体硬件能力|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果,成功返回true,失败返回false|

**例子**

```lua
-- 设置PWM5频率2kHz
pwm.setFreq(5, 2000)

```

---

