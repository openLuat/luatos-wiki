# pin - 管脚命名映射

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_pin.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！


## pin.get(name)

获取管脚对应的GPIO号, 可简写为  pin.PA01 , 推荐使用简写

**参数**

|传入值类型|解释|
|-|-|
|name|管脚的名称, 例如PA01, PB12|

**返回值**

|返回值类型|解释|
|-|-|
|int|对应的GPIO号,如果不存在则返回-1,并打印警告信息|

**例子**

```lua
-- 以下三个语句等价, 若提示pin这个库不存在,则代表固件版本低,请升级底层固件.
-- PA12, GPIO12, 设置为输出, 而且低电平.
gpio.setup(12, 0)
gpio.setup(pin.PA12, 0) -- 推荐使用
gpio.setup(pin.get("PA12"), 0) -- 不推荐, 太长^_^

```

---

