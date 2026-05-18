# nes - nes模拟器

## nes.init(file_path, opts)

nes模拟器初始化

**参数**

|传入值类型|解释|
|-|-|
|string|file_path 文件路径|
|table|opts      可选配置表（仅 AirUI 模式有效）|

**返回值**

无

**例子**

无

---

## nes.deinit()

nes模拟器反初始化，释放资源

**参数**

无

**返回值**

无

**例子**

```lua
nes.deinit()

```

---

## nes.key(key,val)

nes模拟器初始化

**参数**

|传入值类型|解释|
|-|-|
|number|key 按键|
|number|val 状态 1按下 0抬起|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
nes.init("/luadb/super_mario.nes")

```

---

## nes.quit_requested()

查询 AirUI 模式下用户是否点击了退出按钮

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|已点击退出则返回true|

**例子**

```lua
if nes.quit_requested() then
    nes.deinit()
end

```

---

