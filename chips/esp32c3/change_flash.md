# 更换flash教程

CORE ESP32核心板上的flash大小是4MB，虽然已经足够大了，但还是有爱折腾的小伙伴想换更大的flash。

本文将教你如何为8MB(64Mb)与16MB(128Mb)大小的flash编译出合适的LuatOS固件。

## **且慢！！**

```{warning}
在进行flash更换之前，请先按[ESP32C3固件编译指南](https://wiki.luatos.com/develop/compile/ESP32C3.html)，确保能成功编译出默认固件，并确保模块烧录后可以正常使用，再尝试更换flash。
```

## 更换硬件

这里使用`W25Q128`(16MB)举例，仅需拆掉原有flash，再焊接上新的flash即可

## 配置项目里的flash大小

切换到你的`luatos-soc-idf5/luatos`文件夹，在`IDF`命令行执行`idf.py menuconfig`命令

进入`Partition Table`，选择`(partitions.8m.csv) Custom partition CSV file`按下回车，将该文件名改为你需要的flash大小代表的文件名（这里使用16MB举例，所以将该项改为`partitions.16m.csv`），更改后按下回车

按下`ESC`退回第一页，进入`Serial flasher config` -> `Flash size`，按实际更换后的flash大小更改，空格或回车确定

按S保存，回车，再按Q退出

## 更新SOC文件描述信息

打开`luatos-soc-idf5/luatos`文件夹中，你选择的`partitions.xxm.csv`文件

打开`luatos-soc-idf5/luatos/pack`目录，打开`info.json`

- 将json文件最下面的`script_addr`，改为`partitions.xxm.csv`中`script`的`Offset`值
- 将json文件最下面的`fs_addr`，改为`partitions.xxm.csv`中`spiffs`的`Offset`值

注意：json文件中的地址，均不带`0x`前缀，且需要在开头补`00`

如16M flash的情况下：

partitions.csv

```csv
# Name,   Type, SubType, Offset,  Size, Flags
nvs,      data, nvs,     0x9000,    0x6000,
phy_init, data, phy,     0xf000,    0x1000,
app0,     app,  ota_0,  0x10000,  0xF80000,
script,   0x5A, 0x5A,  0xF90000,   0x20000,
spiffs,   data, spiffs,0xFB0000,   0x40000,
fdb,      0x5A, 0x5B,  0xFF0000,   0x10000,
```

更改后的`info_c3.json`部分数据

```json
...
"script_addr" : "00F90000",
"nvm_addr" : "00000000",
"fs_addr" : "00FB0000",
...
```

## 收尾

上面该改的都改完了，正常编译烧录即可
