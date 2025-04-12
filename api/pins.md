# pins - 管脚外设复用

**示例**

```lua
-- 请使用LuaTools的可视化工具进行配置,你通常不需要使用这个demo
-- 请使用LuaTools的可视化工具进行配置,你通常不需要使用这个demo
-- 请使用LuaTools的可视化工具进行配置,你通常不需要使用这个demo
-- 请使用LuaTools的可视化工具进行配置,你通常不需要使用这个demo
-- 请使用LuaTools的可视化工具进行配置,你通常不需要使用这个demo
-- 请使用LuaTools的可视化工具进行配置,你通常不需要使用这个demo
-- 请使用LuaTools的可视化工具进行配置,你通常不需要使用这个demo
-- 请使用LuaTools的可视化工具进行配置,你通常不需要使用这个demo
-- 请使用LuaTools的可视化工具进行配置,你通常不需要使用这个demo
-- 请使用LuaTools的可视化工具进行配置,你通常不需要使用这个demo
-- 请使用LuaTools的可视化工具进行配置,你通常不需要使用这个demo

-- 本库的API属于高级用法, 仅动态配置管脚时使用
-- 本库的API属于高级用法, 仅动态配置管脚时使用
-- 本库的API属于高级用法, 仅动态配置管脚时使用

```

## pins.setup(pin, func)



当某种外设允许复用在不同引脚上时，指定某个管脚允许复用成某种外设功能，需要在外设启用前配置好，外设启用时起作用。

**参数**

|传入值类型|解释|
|-|-|
|int|管脚物理编号, 对应模组俯视图下的顺序编号, 例如 67, 68|
|string|功能说明, 例如 "GPIO18", "UART1_TX", "UART1_RX", "SPI1_CLK", "I2C1_CLK", 目前支持的外设有"UART","I2C","SPI","PWM","CAN","GPIO","ONEWIRE"|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|配置成功,返回true, 其他情况均返回false, 并在日志中提示失败原因|

**例子**

```lua
--把air780epm的PIN67脚,做GPIO 18用
--pins.setup(67, "GPIO18")
--把air780epm的PIN55脚,做uart2 rx用
--pins.setup(55, "UART2_RXD")
--把air780epm的PIN56脚,做uart2 tx用
--pins.setup(56, "UART2_TXD")

```

---

## pins.load(path)



加载硬件配置，如果存在/luadb/pins.json，开机后自动加载/luadb/pins.json，无需调用

**参数**

|传入值类型|解释|
|-|-|
|string|path, 配置文件路径, 可选, 默认值是 /luadb/pins.json|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true, 失败返回nil, 并在日志中提示失败原因|

**例子**

```lua
pins.load("/my.json")

```

---

