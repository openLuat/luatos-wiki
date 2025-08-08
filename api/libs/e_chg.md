# e_chg - e_chg扩展库

**示例**

```lua
-- 应用场景
本扩展库适用于Air8000/Air7000/Air6000等集成了内置电池充电方案的模组型号；
Air8000/Air7000/Air6000内置的充电IC为YHM2712，e_chg扩展库基于本充电IC进行设计；

-- 用法实例
本扩展库对外提供了以下5个接口：
1）开启充电 e_chg.start()
2）关闭充电 e_chg.stop()
3）设置电池的充电截止电压,电池容量,充电电流 e_chg.setup(v_battery, cap_battery, i_charge)
4）获取充电系统状态信息 e_chg.status()
5）注册事件回调函数 e_chg.on(func)

其中，开启充电 e_chg.start() 和 关闭充电 e_chg.stop() 默认自动执行，用户可以不用操作；
当碰到某些需要手动关闭或开启充电功能的场景时，大家可以自行控制，当前仅为预留；

以下为e_chg扩展库四个函数的详细说明及代码实现：

1、开启充电
必须在task中运行，最大阻塞时间大概为700ms, 阻塞主要由sys.waitUntil("YHM27XX_REG", 500)和sys.wait(200)产生。
@api e_chg.start()
@return boolean: true=成功, false=失败

2、关闭充电
必须在task中运行，最大阻塞时间大概为700ms, 阻塞主要由sys.waitUntil("YHM27XX_REG", 500)和sys.wait(200)产生。
@api e_chg.stop()
@return boolean: true=成功, false=失败

3、设置电池的充电截止电压,电池容量,充电电流
必须在task中运行，最大阻塞时间大概为700ms, 阻塞主要由sys.waitUntil("YHM27XX_REG", 500)和sys.wait(200)产生。
@api e_chg.setup(v_battery, cap_battery, i_charge)
@param number v_battery: 电池充电截止电压(单位：mV), 取值范围：4200或4350可选, 必须传入。
@param number cap_battery: 电池容量(单位：mAh), 取值范围：>= 100，必须传入。
@param string i_charge: 充电电流, 取值范围：e_chg.CCMIN(最小电流) 或 e_chg.CCDEFAULT(默认电流) 或 e_chg.CCMAX()，三个可选参数，不传入时默认值为e_chg.CCDEFAULT。
@return boolean: true=成功, false=失败
@usage
    e_chg.setup(4200, 400, e_chg.CCMIN) -- 设置电池充电截止电压为4.2V, 电池容量为400mAh, 充电电流为最小电流

4、获取充电系统状态信息
必须在task中运行，最大阻塞时间(包括超时重试时间)大概为20s。
该函数用于获取当前充电系统的完整状态，包括电池电压、充电阶段、充电状态、电池在位状态、充电器在位状态以及IC过热状态等信息。
其中充电器是否在位，中断触发，触发回调事件为CHARGER_STATE_EVENT，附带的参数 true表示充电器在位，false表示充电器不在位。
@api e_chg.status()
@return table 状态信息表
{
    result = boolean,       -- true: 成功, false: 失败
    vbat_voltage = number,  -- 电池电压值（单位：mV），特殊值含义：
                            -- -1: 当前阶段不需要测量
                            -- -2: 电压测量失败
                            -- -3: 仅充电器就绪（无电池）
    charge_stage = number,  -- 当前充电阶段描述，可能值：
                            -- 0 : 放电模式
                            -- 1 : 预充电模式    
                            -- 2 : 涓流充电     
                            -- 3 : 恒流快速充电
                            -- 4 : 预留状态     
                            -- 5 : 恒压快速充电 
                            -- 6 : 预留状态    
                            -- 7 : 充电完成  
                            -- 8 : 未知状态
    charge_complete = boolean, -- true: 充电完成, false: 充电未完成
    battery_present = boolean, -- true: 电池在位, false: 电池不在位
    charger_present = boolean, -- true: 充电器在位, false: 充电器不在位
    ic_overheat = boolean     -- true: 充电IC过热, false: 充电IC未过热
}

5、注册事件回调函数
@api e_chg.on(func)
@function: 回调方法，回调时传入参数有e_chg.OVERHEAT, e_chg.CHARGER_IN, e_chg.CHARGER_OUT
@return nil 无返回值
@usage
    local function e_chg_callback(event)
        if event == e_chg.OVERHEAT then
            log.info("警告：设备温度过高！")
        elseif event == e_chg.CHARGER_IN then
            log.info("充电器已插入")
        elseif event == e_chg.CHARGER_OUT then
            log.info("充电器已拔出")
        end
    end
    -- 注册回调
    e_chg.on(e_chg_callback)
    
示例：
local function e_chg_task_func()
    e_chg.setup(4200, 400)
    while true do
        local status = e_chg.status()
        if status.result then
            log.info("电池电压:", status.voltage, 
                    "充电阶段:", status.charge_stage, 
                    "充电是否完成:", status.charge_complete, 
                    "电池在位:", status.battery_present, 
                    "充电器在位:", status.charger_present, 
                    "IC过热:", status.ic_overheat)
        end
        sys.wait(20000)
    end
end

-- 事件回调函数
local function e_chg_callback(event)
    if event == e_chg.OVERHEAT then
        log.info("警告：设备温度过高！")
    elseif event == e_chg.CHARGER_IN then
        log.info("充电器已插入")
    elseif event == e_chg.CHARGER_OUT then
        log.info("充电器已拔出")
    end
end
-- 注册回调
e_chg.on(e_chg_callback)

sys.taskInit(e_chg_task_func)

```

## e_chg.on(func)

注册e_chg事件回调

**参数**

|传入值类型|解释|
|-|-|
|function:|回调方法，回调时传入参数有e_chg.OVERHEAT, e_chg.CHARGER_IN, e_chg.CHARGER_OUT|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
    local function e_chg_callback(event)
        if event == e_chg.OVERHEAT then
            log.info("警告：设备温度过高！")
        elseif event == e_chg.CHARGER_IN then
            log.info("充电器已插入")
        elseif event == e_chg.CHARGER_OUT then
            log.info("充电器已拔出")
        end
    end
    -- 注册回调
    e_chg.on(e_chg_callback)

```

---

## check_battery_exists()

检测电池是否在位

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean:|true=电池在位, false=电池不在位|

**例子**

```lua
    check_battery_exists() -- 检测电池是否在位

```

---

## get_charge_status()

获取当前的充电阶段状态

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|number|\| nil - 成功返回充电状态，失败返回nil|

**例子**

```lua
    -- 充电状态说明:
    --     0 (000): 放电模式
    --     1 (001): 预充电模式     
    --     2 (010): 涓流充电      
    --     3 (011): 恒流快速充电 
    --     4 (100): 预留状态      
    --     5 (101): 恒压快速充电  
    --     6 (110): 预留状态    
    --     7 (111): 充电完成       
    local status = get_charge_status()
    if status then
        log.info("当前充电状态: " .. status)
    else
        log.info("获取充电状态失败")
    end

```

---

## check_over_heat()

查询充电ic是否过热

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean,|boolean \| boolean - 成功返回true和充电ic温度状态，失败返回false|

**例子**

```lua
    local success, is_overheated = check_over_heat()
    if success then
        if is_overheated then
            log.info("充电IC过热, 大于120℃, 停止充电！")
        else
            log.info("充电IC温度正常")
        end
    else
        log.info("获取充电IC温度信息失败")
    end

```

---

## set_sys_track(enable)

启用或禁用SYS_TRACK电压跟随功能 0x01寄存器

**参数**

|传入值类型|解释|
|-|-|
|param|boolean enable: true=启用, false=禁用|

**返回值**

|返回值类型|解释|
|-|-|
|boolean:|true=成功, false=失败|

**例子**

```lua
    set_sys_track(true) -- 启用SYS_TRACK电压跟随功能

```

---

## : check_charger()

中断检测充电器是否在位（通过检测VBUS引脚的电平来判断充电器是否在位），并对外发布CHARGER_STATE_EVENT事件

**参数**

|传入值类型|解释|
|-|-|
|param:|无|

**返回值**

|返回值类型|解释|
|-|-|
|:|无|

**例子**

无

---

## : append_vadc(v)

向滑动窗口数组添加新的电压采样值，并计算窗口内的平均值, 用于平滑电压采样数据

**参数**

|传入值类型|解释|
|-|-|
|param:|number v : 新的电压采样值|

**返回值**

|返回值类型|解释|
|-|-|
|:|number : 窗口内所有采样值的整数平均值|

**例子**

无

---

## : check_battery()

获取电池电压

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|:|number : 电池电压值（单位：mV）|

**例子**

无

---

