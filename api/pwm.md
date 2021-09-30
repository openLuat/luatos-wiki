# pwm - PWM模块

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_pwm.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## pwm.open(channel, period, pulse)

开启指定的PWM通道

**参数**

|传入值类型|解释|
|-|-|
|int|PWM通道|
|int|频率, 1-1000000hz|
|int|占空比 0-100|
|int|输出周期 0为持续输出|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果,成功返回true,失败返回false|

**例子**

```lua
-- 打开PWM5, 频率1kHz, 占空比50%
pwm.open(5, 1000, 50)

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
log.info("pwm.get(0)",pwm.capture(0,1000))
log.info("PWM_CAPTURE",sys.waitUntil("PWM_CAPTURE", 2000))

```

---

