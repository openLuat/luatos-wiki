# statme - SM状态机

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/statem/luat_lib_statem.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## statem.create(count, repeat)

创建一个新的状态机.

**参数**

|传入值类型|解释|
|-|-|
|int|指令条数,默认32条|
|int|重复执行的次数, 0 代表不重复, 正整数代表具体重复执行的次数. 暂不支持永续执行|
|return|若成功,返回状态机指针,否则返回nil|

**返回值**

无

**例子**

```lua
gpio.setup(7, 0, gpio.PULLUP) 
gpio.setup(12, 0, gpio.PULLUP) 
gpio.setup(13, 0, gpio.PULLUP) 
gpio.setup(14, 0, gpio.PULLUP) 
local sm = statem.create()
sm:gpio_set(7, 0) -- gpio设置为低电平
sm:usleep(10)     -- 休眠10us
sm:gpio_set(7, 1) -- gpio设置为高电平
sm:usleep(40)     -- 休眠40us
sm:gpio_set(12, 1) -- gpio设置为高电平
sm:gpio_set(13, 1) -- gpio设置为高电平
sm:gpio_set(14, 1) -- gpio设置为高电平
sm:usleep(40)      -- 休眠40us
sm:gpio_set(7, 0) -- gpio设置为低电平
sm:finish()

-- 执行之,后续会支持后台执行
sm:exec()

```

---

