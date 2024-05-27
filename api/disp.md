# disp - disp库(已废弃)

{bdg-success}`已适配` {bdg-primary}`Air780E/Air700E` {bdg-primary}`Air780EP/Air780EPV` {bdg-primary}`Air601` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/u8g2/luat_lib_disp.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看disp的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/u8g2)
```

**示例**

```lua
-- disp库已合并到u8g2库,API等价

```

## disp.init(conf)



显示屏初始化,请使用u8g2库

**参数**

|传入值类型|解释|
|-|-|
|table|conf 配置信息|

**返回值**

|返回值类型|解释|
|-|-|
|int|正常初始化1,已经初始化过2,内存不够3,初始化失败返回4|

**例子**

```lua
-- disp库的所有API均已合并到u8g2库
-- disp库已经映射为u8g2库,所有API均代理到u8g2,请查阅u8g2库的API

```

---

