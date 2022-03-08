# soc_download使用指南



## 1、命令行模式，注意大小写



### Air105需要目前一共需要输入14个参数：

1、类型，字符串，目前支持air105_download

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

 

### ESP32C3需要目前一共需要输入16个参数：

1、类型，字符串，目前支持air105_download

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

`soc_download.exe esp32_download 66 1152000 "_temp\soc\download\esp32" "bootloader.bin" 00000000 "luatos_esp32.bin" 00010000 "script.bin" 01300000 "partition-table.bin" 00008000 00ff0200 0 00380000 0000`

如果3个bin合并成1个bin，可以如下

`soc_download.exe esp32_download 66 1152000 "_temp\soc\download\esp32" "bootloader.bin" ffffffff "luatos_esp32.bin" 00000000 "script.bin" 01300000 "partition-table.bin" ffffffff 00ff0200 0 00380000 0000`



## 2、printf出来的信息中，需要关注以下字段

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

