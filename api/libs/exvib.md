# exvib - exvib 三轴加速度传感器扩展库

**示例**

```lua
-- 用法实例
注意:

1. exvib.lua可适用于合宙内部集成了G-Sensor加速度传感器DA221的模组型号，
目前仅有Air8000系列模组内置了DA221，Air7000推出时也会内置该型号G-Sensor；

2. DA221在Air8000内部通过I2C1与之通信，并通过WAKEUP2接收运动监测中断，
如您使用合宙其它型号模组外接DA221时，比如Air780EGH，建议与Air8000保持一致也选用I2C1和WAKEUP2
(该管脚即为Air780EGH的PIN79:USIM_DET)，这样便可以无缝使用本扩展库，DA221的供应商为苏州明皜
如需采购DA221或者其他更高端的加速度传感器可以联系他们；

3. DA221作为加速度传感器，LuatOS仅支持运动检测这一功能，主要用于震动检测，运动检测，跌倒检测，
搭配GNSS实现震动然后定位的功能，其余功能请自行研究，合宙提供了三种应用场景，如果需要适配自己的场景需求，
请参考手册参数自行修改代码，调试适合自己场景的传感器值，合宙不提供DA221任何其它功能的任何形式的技术支持；

关于exvib库的三种模式主要用于以下场景：
1，微小震动检测，用于检测轻微震动的场景，例如用手敲击桌面；加速度量程2g；
2，运动检测，用于电动车或汽车行驶时的检测和人行走和跑步时的检测；加速度量程4g；
3，跌倒检测，用于人或物体瞬间跌倒时的检测；加速度量程8g；

exvib=require("exvib")

local intPin=gpio.WAKEUP2   --中断检测脚，内部固定wakeup2
local tid   --获取定时打开的定时器id
local num=0 --计数器 
local ticktable={0,0,0,0,0} --存放5次中断的tick值，用于做有效震动对比
local eff=false --有效震动标志位，用于判断是否触发定位


--有效震动模式
--tick计数器，每秒+1用于存放5次中断的tick值，用于做有效震动对比
-- local function tick()
--     num=num+1
-- end
-- --每秒运行一次计时
-- sys.timerLoopStart(tick,1000)

-- --有效震动判断
-- local function ind()
--     log.info("int", gpio.get(intPin))
--     if gpio.get(intPin) == 1 then
--         --接收数据如果大于5就删掉第一个
--         if #ticktable>=5 then
--             log.info("table.remove",table.remove(ticktable,1))
--         end
--         --存入新的tick值
--         table.insert(ticktable,num)
--         log.info("tick",num,(ticktable[5]-ticktable[1]<10),ticktable[5]>0)
--         log.info("tick2",ticktable[1],ticktable[2],ticktable[3],ticktable[4],ticktable[5])
--         --表长度为5且，第5次中断时间间隔减去第一次间隔小于10s，且第5次值为有效值
--         if #ticktable>=5 and (ticktable[5]-ticktable[1]<10 and ticktable[1]>0) then
--             log.info("vib", "xxx")
--             --是否要去触发有效震动逻辑
--             if eff==false then
--                 sys.publish("EFFECTIVE_VIBRATION")
--             end
--         end
--     end
-- end

-- --设置30s分钟之后再判断是否有效震动函数
-- local function num_cb()
--     eff=false
-- end

-- local function eff_vib()
--     --触发之后eff设置为true，30分钟之后再触发有效震动
--     eff=true
--     --30分钟之后再触发有效震动
--     sys.timerStart(num_cb,180000)
-- end

-- sys.subscribe("EFFECTIVE_VIBRATION",eff_vib)



--持续震动模式

--持续震动模式中断函数
local function ind()
    log.info("int", gpio.get(intPin))
    --上升沿为触发震动中断
    if gpio.get(intPin) == 1 then
        local x,y,z =  exvib.read_xyz()      --读取x，y，z轴的数据
        log.info("x", x..'g', "y", y..'g', "z", z..'g')
    end
end


local function vib_fnc()
    -- 1，微小震动检测，用于检测轻微震动的场景，例如用手敲击桌面；加速度量程2g；
    -- 2，运动检测，用于电动车或汽车行驶时的检测和人行走和跑步时的检测；加速度量程4g；
    -- 3，跌倒检测，用于人或物体瞬间跌倒时的检测；加速度量程8g；
    --打开震动检测功能
    exvib.open(1)
    --设置gpio防抖100ms
    gpio.debounce(intPin, 100)
    --设置gpio中断触发方式wakeup2唤醒脚默认为双边沿触发
    gpio.setup(intPin, ind)

end

sys.taskInit(vib_fnc)


```

## exvib.read_xyz()

获取da221的xyz轴数据

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|number|x轴数据，number y轴数据，number z轴数据|

**例子**

```lua
    local x,y,z =  exvib.read_xyz()      --读取x，y，z轴的数据
        log.info("x", x..'g', "y", y..'g', "z", z..'g')

```

---

## exvib.open(mode)

打开da221

**参数**

|传入值类型|解释|
|-|-|
|number|da221模式设置，1，微小震动检测，用于检测轻微震动的场景，例如用手敲击桌面；加速度量程2g；|

**返回值**

无

**例子**

无

---

## exvib.close()

关闭da221

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
    exvib.close()

```

---

