# gbc - GBC模拟器

## 常量

|常量|类型|解释|
|-|-|-|
|gbc.Up|number|按键上|
|gbc.Down|number|按键下|
|gbc.Left|number|按键左|
|gbc.Right|number|按键右|
|gbc.A|number|按键A|
|gbc.B|number|按键B|
|gbc.Start|number|按键开始|
|gbc.Select|number|按键选择|


## gbc.init(file_path[, opts])

gbc模拟器初始化

**参数**

|传入值类型|解释|
|-|-|
|string|file_path ROM文件路径|
|table[opt]|opts 配置项，可选字段：|

**返回值**

无

**例子**

无

---

## gbc.deinit()

gbc模拟器反初始化，释放资源

**参数**

无

**返回值**

无

**例子**

```lua
gbc.deinit()

```

---

## gbc.key(key, val)

GBC按键控制

**参数**

|传入值类型|解释|
|-|-|
|number|key 按键常量|
|number|val 状态 1按下 0抬起|

**返回值**

无

**例子**

```lua
gbc.key(gbc.Up, 1)
gbc.key(gbc.Up, 0)

```

---

## gbc.quit_requested()

查询GBC是否已退出

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|已退出则返回true|

**例子**

```lua
if gbc.quit_requested() then
    gbc.deinit()
end

```

---

