# hzfont - HzFont字体库

**示例**

```lua
-- 使用HzFont渲染TTF字体
-- 需要准备TTF字体文件

-- 初始化字体
hzfont.init("/sd/font.ttf")

```

## hzfont.init([ttf_path])

初始化HzFont字体库

**参数**

|传入值类型|解释|
|-|-|
|string|ttf_path TTF字体文件路径，可选；留空则回退到内置字库（若启用）|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true，失败返回false|

**例子**

```lua
-- 从文件加载
hzfont.init("/sd/font.ttf")
-- 从luadb文件系统加载
hzfont.init("/luadb/font.ttf")
-- 回退内置字库（启用 固件配置项 LUAT_CONF_USE_HZFONT_BUILTIN_TTF 时生效）
hzfont.init()

```

---

## hzfont.debug(enable)

调试开关

**参数**

|传入值类型|解释|
|-|-|
|boolean|enable true 开启，false 关闭|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|总是返回true|

**例子**

无

---

