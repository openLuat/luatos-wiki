# pm - 电源管理

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3` {bdg-primary}`Air780E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_pm.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看pm的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/pm)
```

**示例**

```lua
--[[
休眠模式简介

-- IDLE 正常运行模式
-- LIGHT 轻睡眠模式:
        CPU暂停
        RAM保持供电
        定时器/网络事件/IO中断均可自动唤醒
        唤醒后程序继续运行
        GPIO保持电平
-- DEEP 深睡眠模式
        CPU暂停
        核心RAM掉电, 保留RAM维持供电
        普通GPIO掉电,外设驱动掉电
        AON_GPIO保持休眠前的电平
        dtimer定时器可唤醒
        wakeup脚可唤醒
        唤醒后程序从头运行,休眠前的运行时数据全丢
-- HIB 休眠模式
        CPU暂停
        RAM掉电, 保留RAM也掉电
        普通GPIO掉电,外设驱动掉电
        AON_GPIO保持休眠前的电平
        dtimer定时器可唤醒
        wakeup脚可唤醒
        唤醒后程序从头运行,休眠前的运行时数据全丢

对部分模块,例如Air780E, DEEP/HIB对用户代码没有区别

除pm.shutdown()外, RTC总是运行的, 除非掉电
]]

-- 定时器唤醒, 请使用 pm.dtimerStart()
-- wakeup唤醒
    -- 如Air101/Air103, 有独立的wakeup脚, 不需要配置,可直接控制唤醒
    -- 如Air780E系列, 有多个wakeup可用, 通过gpio.setup(32)配置虚拟GPIO进行唤醒配置

pm.request(pm.IDLE) -- 通过切换不同的值请求进入不同的休眠模式
-- 对应Air780E系列, 执行后并不一定马上进入休眠模式, 如无后续数据传输需求,可先进入飞行模式,然后快速休眠

```

## 常量

|常量|类型|解释|
|-|-|-|
|pm.NONE|number|不休眠模式|
|pm.IDLE|number|IDLE模式|
|pm.LIGHT|number|LIGHT模式|
|pm.DEEP|number|DEEP模式|
|pm.HIB|number|HIB模式|
|pm.USB|number|USB电源|
|pm.GPS|number|GPS电源|
|pm.GPS_ANT|number|GPS的天线电源，有源天线才需要|
|pm.CAMERA|number|camera电源，CAM_VCC输出|
|pm.DAC_EN|number|Air780E和Air600E的DAC_EN，注意audio的默认配置会自动使用这个脚来控制CODEC的使能|
|pm.PWK_MODE|number|是否开启ec618的powerkey滤波模式，true开，注意滤波模式下reset变成直接关机|
|pm.WORK_MODE|number|ec618的节能模式，0~3，0完全关闭，1性能优先，2平衡，3极致功耗|
|pm.IOVL|number|所有GPIO高电平电压控制,当前仅ec618系列可用|


## pm.request(mode)



请求进入指定的休眠模式

**参数**

|传入值类型|解释|
|-|-|
|int|休眠模式,例如pm.IDLE/LIGHT/DEEP/HIB.|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果,即使返回成功,也不一定会进入, 也不会马上进入|

**例子**

```lua
-- 请求进入休眠模式
--[[
IDLE   正常运行,就是无休眠
LIGHT  轻休眠, CPU停止, RAM保持, 外设保持, 可中断唤醒. 部分型号支持从休眠处继续运行
DEEP   深休眠, CPU停止, RAM掉电, 仅特殊引脚保持的休眠前的电平, 大部分管脚不能唤醒设备.
HIB    彻底休眠, CPU停止, RAM掉电, 仅复位/特殊唤醒管脚可唤醒设备.
]]

pm.request(pm.HIB)

```

---

## pm.dtimerStart(id, timeout)



启动底层定时器,在休眠模式下依然生效. 只触发一次

**参数**

|传入值类型|解释|
|-|-|
|int|定时器id,通常是0-3|
|int|定时时长,单位毫秒|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果|

**例子**

```lua
-- 添加底层定时器
pm.dtimerStart(0, 300 * 1000) -- 5分钟后唤醒

```

---

## pm.dtimerStop(id)



关闭底层定时器

**参数**

|传入值类型|解释|
|-|-|
|int|定时器id|

**返回值**

无

**例子**

```lua
-- 关闭底层定时器
pm.dtimerStop(0) -- 关闭id=0的底层定时器

```

---

## pm.dtimerCheck(id)



检查底层定时器是不是在运行

**参数**

|传入值类型|解释|
|-|-|
|int|定时器id|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果,true还在运行，false不在运行|

**例子**

```lua
-- 检查底层定时器是不是在运行
pm.dtimerCheck(0) -- 检查id=0的底层定时器

```

---

## pm.lastReson()



开机原因,用于判断是从休眠模块开机,还是电源/复位开机

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|0-上电/复位开机, 1-RTC开机, 2-WakeupIn/Pad/IO开机, 3-Wakeup/RTC开机|
|int|0-普通开机(上电/复位),3-深睡眠开机,4-休眠开机|
|int|复位开机详细原因：0-powerkey或者上电开机 1-充电或者AT指令下载完成后开机 2-闹钟开机 3-软件重启 4-未知原因 5-RESET键 6-异常重启 7-工具控制重启 8-内部看门狗重启 9-外部重启 10-充电开机|

**例子**

```lua
-- 是哪种方式开机呢
log.info("pm", "last power reson", pm.lastReson())

```

---

## pm.force(mode)



强制进入指定的休眠模式，忽略某些外设的影响，比如USB

**参数**

|传入值类型|解释|
|-|-|
|int|休眠模式|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果,若返回成功,大概率会马上进入该休眠模式|

**例子**

```lua
-- 请求进入休眠模式
pm.force(pm.HIB)
-- 对应EC618系列(Air780E/Air700E等), 该操作会关闭USB通信
-- 唤醒后如需开启USB, 请打开USB电压
--pm.power(pm.USB, true)

```

---

## pm.check()



检查休眠状态

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果,如果能顺利进入休眠,返回true,否则返回false|
|int|底层返回值,0代表能进入最底层休眠,其他值代表最低可休眠级别|

**例子**

```lua
-- 请求进入休眠模式,然后检查是否能真的休眠
pm.request(pm.HIB)
if pm.check() then
    log.info("pm", "it is ok to hib")
else
    -- 对应EC618系列(Air780E/Air700E等), 该操作会关闭USB通信
    pm.force(pm.HIB) -- 强制休眠
    -- 唤醒后如需开启USB, 请打开USB电压
    --sys.wait(100)
    --pm.power(pm.USB, true)
end

```

---

## pm.shutdown()



关机

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 当前仅EC618系列(Air780E/Air600E/Air700E/Air780EG支持)
-- 需要2022-12-22之后编译的固件
pm.shutdown()

```

---

## pm.reboot()



重启

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## pm.power(id, onoff)



开启内部的电源控制，注意不是所有的平台都支持，可能部分平台支持部分选项，看硬件

**参数**

|传入值类型|解释|
|-|-|
|int|电源控制id,pm.USB pm.GPS之类|
|boolean|or int 开关true/1开，false/0关，默认关，部分选项支持数值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果true成功，false失败|

**例子**

```lua
-- 关闭USB电源, 反之开启就是传true
pm.power(pm.USB, false) 

-- Air780EG,为内置的GPS芯片上电. 注意, Air780EG的GPS和GPS_ANT是一起控制的,所以合并了.
pm.power(pm.GPS, true)

-- EC618系列开启pwrkey开机防抖
-- 注意: 开启后, 复位键就变成关机了!!! pwrkey要长按2秒才能开机
-- pm.power(pm.PWK_MODE, true)

-- EC618系列PSM+低功耗设置
-- ec618的节能模式，0~3，0完全关闭，1性能优先，2平衡，3极致功耗
-- 详情访问: https://airpsm.cn
-- pm.power(pm.WORK_MODE, 1)

```

---

## pm.ioVol(id, val)



IO高电平电压控制,当前仅EC618系列可用

**参数**

|传入值类型|解释|
|-|-|
|int|电平id,目前只有pm.IOVOL_ALL_GPIO|
|int|电平值,单位毫伏|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果true成功，false失败|

**例子**

```lua
-- EC618系列设置IO电平, 范围 1650 ~ 2000，2650~3400 , 单位毫伏, 步进50mv
-- 例如Air780E/Air600E/Air700E/Air780EG
-- 注意, 这里的设置优先级会高于硬件IOSEL脚的配置
-- 但开机时依然先使用硬件配置,直至调用本API进行配置, 所以io电平会变化
-- pm.ioVol(pm.IOVOL_ALL_GPIO, 3300)    -- 所有GPIO高电平输出3.3V
-- pm.ioVol(pm.IOVOL_ALL_GPIO, 1800)    -- 所有GPIO高电平输出1.8V

```

---

## pm.wakeupPin(pin,level)



配置唤醒引脚 (当前仅仅esp系列可用)

**参数**

|传入值类型|解释|
|-|-|
|int/table|gpio引脚|
|int|唤醒电压 可选,默认低电平唤醒|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|处理结果|

**例子**

```lua
pm.wakeupPin(8,0)

```

---

