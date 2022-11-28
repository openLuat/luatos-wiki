# gtfont - gtfont高通字库模块

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/gtfont/luat_lib_gtfont.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


## gtfont.init(spi_device)

初始化高通字体芯片

**参数**

|传入值类型|解释|
|-|-|
|userdata|仅支持spi device 生成的指针数据|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
-- 特别提醒: 使用本库的任何代码, 都需要 额外 的 高通字体芯片 !!
-- 没有额外芯片是跑不了的!!
gtfont.init(spi_device)

```

---

