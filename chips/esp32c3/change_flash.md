# 更换flash教程

CORE ESP32核心板上的flash大小是4MB，虽然已经足够大了，但还是有爱折腾的小伙伴想换更大的flash。

本文将教你如何为8MB(64Mb)与16MB(128Mb)大小的flash编译出合适的LuatOS固件。

## **且慢！！**

在进行flash更换之前，请先按[ESP32C3固件编译指南](https://wiki.luatos.com/develop/compile/ESP32C3.html)，确保能成功编译出默认固件，并确保模块烧录后可以正常使用，再尝试更换flash。

## 更换硬件

这里使用`W25Q128`(16MB)举例，仅需拆掉原有flash，再焊接上新的flash即可

## 更新分区表文件

删除ESP32项目源码目录中默认的`partitions.csv`文件

然后根据实际情况，将`partitions_16m.csv`或`partitions_8m.csv`重命名为`partitions.csv`

## 配置项目里的flash大小

在`IDF`命令行执行`idf.py menuconfig`命令

进入`Serial flasher config` -> `Flash size`，按实际更换后的flash大小更改，空格或回车确定

按S保存，回车，再按Q退出

## 更新SOC文件描述信息

打开之前更改后的`partitions.csv`文件

打开ESP32项目源码目录下的`soc_tools`目录，根据实际情况打开`info_c3.json`或`info_c3_usb.json`

- 将json文件最下面的`script_addr`，改为`partitions.csv`中`script`的`Offset`值
- 将json文件最下面的`fs_addr`，改为`partitions.csv`中`spiffs`的`Offset`值

注意：json文件中的地址，均不带`0x`前缀，且需要在开头补`00`

如16M flash的情况下：

partitions.csv

```csv
# Name,     Type,   SubType, Offset,  Size, Flags
nvs,        data,   nvs,     0x9000,  0x5000,
otadata,    data,   ota,     0xe000,  0x2000,
app0,       app,    ota_0,   0x10000, 0x630000,
app1,       app,    ota_1,   0x640000,0x630000,
fdb,        0x5A,   0x5B,    0xC70000,0x20000,
script,     0x5A,   0x5A,    0xC90000,0x100000,
script_ota, 0x5A,   0x5A,    0xD90000,0x100000,
spiffs,     data,   spiffs,  0xE90000,0x170000,
```

更改后的`info_c3.json`部分数据

```json
...
"script_addr" : "00C90000",
"nvm_addr" : "00000000",
"fs_addr" : "00E90000",
...
```

## 收尾

上面该改的都改完了，正常编译烧录即可
