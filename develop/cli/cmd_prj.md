# LuatOS 项目管理命令

## 项目初始化

```bash
$> luatos prj init air101
> 创建 src  ...
> 创建 test ...
> 创建 .luatos ...
> 创建 .gitXXX
> 完成, 可以刷机了 luatos burn
```

其中 `air101` 是模板`air101-led`的简称

* air101-led        - air101 点灯模板
* air101-ssd1306    - air101 SSD1306模板
* air101-st7735     - air101 ST7735模板

同理, `air101` 可以换成 `air103`/`air105`/`air107`/`esp32c3`

若用户没有输入模板名称,或者模板名称不存在, 提示可选的模板列表.
