# gtfont - 高通字库芯片

**示例**

```lua
-- 已测试字体芯片型号 GT5SLCD1E-1A
-- 如需要支持其他型号,请报issue

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
-- 特别提醒: 使用本库的任何代码,都需要额外的高通字体芯片 !!
-- 没有额外芯片是跑不了的!!
gtfont.init(spi_device)

```

---

