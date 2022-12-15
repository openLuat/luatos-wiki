# 命令行刷机指南

## 一、刷机介绍:

luatos可使用命令行进行刷机，如不使用luatools刷机也可自己使用命令行或单独封装刷机软件。air101/air103使用air101_flash.exe，air105/esp32-c3使用soc_download.exe来进行刷机。

介绍之前我们先来了解一下soc文件构成：

.soc文件为合宙luatos-soc系统使用的固件格式，我们可以用7z等解压缩软件对其进行解压，可发现固件构成如下：

.bin文件(固件二进制文件)

.exe文件(刷机程序,air101/air103为air101_flash.exe,air105/esp32-c3为soc_download.exe)

info.json(刷机参数信息)

## 二、命令行刷机参数介绍：

### 1、air101/103命令行刷机：

Air101/Air103需要目前一共需要输入14个参数：

1、-ds 下载时设置串口速度，默认值为115200  可使用15200 | 460800 | 921600 | 1000000 | 2000000|1M | 2M

2、-c 串口号 例如：COM0

3、-ws 工作串口速度，默认值为115200  可使用1200 - 2000000|1M | 2M

4、-rs 复位动作，设置设备复位方法，默认为手动控制 可选none | at | rts

5、-dl 下载固件文件，默认下载压缩映像

**更多参数使用运行 `air101_flash.exe -h` 查看**

举个例子

`air101_flash.exe -ds 2M -c COM0 -ws 115200 -rs rts -dl air10x.fls    `  

**各参数可在info.json中查看**

### 2、air105命令行刷机：

Air105需要目前一共需要输入14个参数：

1、类型，字符串，air105须填写`air105_download` 

2、串口号，10进制，1~255

3、通用bl下载时的波特率，10进制

4、下载bin文件路径，带引号的字符串

5、下载bootloader的文件名称，带引号的字符串

6、bootloader写入地址，16进制，不带0x

7、下载APP的文件名称，带引号的字符串

8、APP写入地址，16进制，不带0x

9、下载脚本的文件名称，带引号的字符串

10、脚本写入地址，16进制，不带0x

11、RTS复位的电平，10进制，0或者1

12、只下载脚本的标志，10进制，0或者1，1表示只下载脚本

13、文件系统地址

14、文件系统需要擦除的长度，如果不擦，写0

举个例子

`soc_download.exe air105_download 83 3000000 "E:\air105\core\hex\air105\debug" bootloader.bin 01001000 app.bin 01010000 script.bin 01300000 0 0 01380000 0`

**各参数可在info.json中查看**

### 3、esp32-c3命令行刷机：

1、类型，字符串，esp32-c3须填写`esp32_download`

2、串口号，10进制，1~255

3、通用bl下载时的波特率，10进制

4、下载bin文件路径，带引号的字符串

5、下载bootloader的文件名称，带引号的字符串

6、bootloader写入地址，16进制，不带0x

7、下载APP的文件名称，带引号的字符串

8、APP写入地址，16进制，不带0x

9、下载脚本的文件名称，带引号的字符串

10、脚本写入地址，16进制，不带0x

11、分区表的文件名称，带引号的字符串

12、分区表写入地址，16进制，不带0x

13、芯片下载参数，目前是0x00ff0200，byte3是芯片类型，目前只有0，byte2是spi flash info（写0xff就是大小从ID中获取），byte1 是spi mode（写0xff就是不修改固件，目前是0x02），byte0没用是0

14、只下载脚本的标志，10进制，0或者1，1表示只下载脚本

15、文件系统地址

16、文件系统需要擦除的长度，如果不擦，写0

举个例子

`soc_download.exe esp32_download 66 1152000 "_temp\soc\download\esp32" "bootloader.bin" 00000000 "luatos.bin" 00010000 "script.bin" 01300000 "partition-table.bin" 00008000 00ff0200 0 00380000 0000`

如果3个bin合并成1个bin，可以如下

`soc_download.exe esp32_download 66 1152000 "_temp\soc\download\esp32" "bootloader.bin" ffffffff "luatos_esp32.bin" 00000000 "script.bin" 01300000 "partition-table.bin" ffffffff 00ff0200 0 00380000 0000`

**各参数可在info.json中查看**

## 三、控制台中打印的信息需要关注以下字段

**download error:xxx 下载出错及原因**

download stage xxx:yyy 下载XXX（bl，app.bin, script.bin）的 yyy阶段，注意yyy是数字，bl阶段根据不同芯片有不同的解释，app.bin和script.bin有通用的解释，如下

**air105的bl**

0：尝试通过RTS复位芯片，及同步芯片串口

1：同步串口成功，开始连接串口

2：连接串口成功，发送bootloader信息

3：开始擦除相关flash

4：开始写入bl数据

5：完成

**通用bl下载协议:**

0：开始同步

1：发送bin信息

2：发送bin数据

3：等待验证固件信息

**esp32的ramrun：**

0：尝试通过RTS复位芯片，及同步芯片串口

1：同步串口成功，开始连接串口

2：连接串口成功，发送bootloader信息

3：开始擦除相关flash

**download percent:xxx 当前下载的进度**

全部下载完成后提示download OK

