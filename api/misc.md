# misc - 杂项驱动，各种非常规驱动，芯片独有驱动都放在这里

## misc.gpo_setup(id)

某个引脚的GPO功能使能

**参数**

|传入值类型|解释|
|-|-|
|int|id, GPO编号|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
misc.gpo_setup(0)

```

---

## misc.gpo_output(id,level)

GPO输出高低电平

**参数**

|传入值类型|解释|
|-|-|
|int|id, GPO编号|
|int|level, 1高电平，0低电平|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
misc.gpo_output(0,1)

```

---

## misc.gpo_level(id)

获取GPO输出的电平

**参数**

|传入值类型|解释|
|-|-|
|int|id, GPO编号|

**返回值**

|返回值类型|解释|
|-|-|
|int|level, 1高电平，0低电平|

**例子**

```lua
misc.gpo_level(0)

```

---

