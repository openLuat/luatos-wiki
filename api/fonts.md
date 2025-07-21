# fonts - 字体库

## fonts.list(tp)

返回固件支持的字体列表

**参数**

|传入值类型|解释|
|-|-|
|string|类型, 默认 u8g2, 还可以是lvgl|

**返回值**

|返回值类型|解释|
|-|-|
|table|字体列表|

**例子**

```lua
-- API新增于2022-07-12
if fonts.list then
    log.info("fonts", "u8g2", json.encode(fonts.list("u8g2")))
end

```

---

## fonts.u8g2_get(name, tp)

获取字体

**参数**

|传入值类型|解释|
|-|-|
|string|字体名称, 例如opposansm8_chinese unifont_t_symbols|
|string|类型, 默认 u8g2, 还可以是lvgl|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|若字体存放,返回字体指针, 否则返回nil|

**例子**

```lua
oppo_8 = fonts.get("opposansm8_chinese", "u8g2")
if oppo_8 then
    u8g2.SetFont(oppo_8)
else
    log.warn("fonts", "no such font opposansm8_chinese")
end
-- 若使用云编译的自定义字库, 使用方式如下
oppo_8 = fonts.get("oppo_bold_8", "u8g2") -- oppo_bold_8 是云编译界面的字库命名
if oppo_8 then
    u8g2.SetFont(oppo_8)
else
    log.warn("fonts", "no such font opposansm8_chinese")
end

```

---

## fonts.u8g2_load(path, path)

从文件加载字体

**参数**

|传入值类型|解释|
|-|-|
|string|字体路径, 例如 /luadb/abc.bin|
|string|类型, 默认 u8g2. 也支持lvgl|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|若字体存放,返回字体指针, 否则返回nil|

**例子**

```lua
-- API新增于2022-07-11
-- 提醒: 若文件位于/luadb下, 不需要占用内存
-- 若文件处于其他路径, 例如tf/sd卡, spi flash, 会自动加载到内存, 消耗lua vm的内存空间
-- 加载后请适当引用, 不必反复加载同一个字体文件
oppo12 = fonts.load("/luadb/oppo12.bin")
if oppo12 then
    u8g2.SetFont(oppo12)
else
    log.warn("fonts", "no such font file oppo12.bin")
end

```

---

