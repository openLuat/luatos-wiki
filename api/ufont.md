# ufont - 统一字体库(开发中)

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/ufont/luat_lib_ufont.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
-- 尚处于开发阶段,暂不可用

```

## ufont.get(name)

获取字体

**参数**

|传入值类型|解释|
|-|-|
|string|字体名称, 例如|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|若字体存在,返回字体指针, 否则返回nil|

**例子**

```lua
-- TODO

```

---

## ufont.list()

返回固件支持的字体列表

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|字体列表|

**例子**

```lua
-- API新增于2022-08-05
log.info("fonts", "u8g2", json.encode(ufont.list()))

```

---

