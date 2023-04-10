# nes - nes模拟器

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/nes/luat_lib_nes.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


## nes.init(file_path)



nes模拟器初始化

**参数**

|传入值类型|解释|
|-|-|
|string|file_path 文件路径|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
nes.init("/luadb/super_mario.nes")

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

