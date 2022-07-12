# fonts - 字体库

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/luatfonts/luat_lib_fonts.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！


## fonts.u8g2_get(name)

获取u8g2字体

**参数**

|传入值类型|解释|
|-|-|
|string|字体名称, 例如opposansm8_chinese unifont_t_symbols|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|若字体存放,返回字体指针, 否则返回nil|

**例子**

```lua
oppo_8 = fonts.u8g2_get("opposansm8_chinese")
if oppo_8 then
    u8g2.SetFont(oppo_8)
else
    log.warn("fonts", "no such font opposansm8_chinese")
end

```

---

## fonts.u8g2_load(path)

从文件加载u8g2字体

**参数**

|传入值类型|解释|
|-|-|
|string|字体路径, 例如 /luadb/abc.bin|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|若字体存放,返回字体指针, 否则返回nil|

**例子**

```lua
-- 提醒: 若文件位于/luadb下, 不需要占用内存
-- 若文件处于其他路径, 例如tf/sd卡, spi flash, 会自动加载到内存, 消耗lua vm的内存空间
-- 加载后请适当引用, 不必反复加载同一个字体文件
oppo12 = fonts.u8g2_load("/luadb/oppo12.bin")
if oppo12 then
    u8g2.SetFont(oppo12)
else
    log.warn("fonts", "no such font file oppo12.bin")
end

```

---

