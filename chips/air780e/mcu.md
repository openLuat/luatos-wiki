# AirAir780E模组

## Air780E是什么?

Air780E 是合宙通信推出的 LTE Cat.1 bis通信模块，采用移芯EC618平台，支持4G全网通

- 支持双卡单待
- 支持SPI LCD
- 支持SPI Camera
- 支持USB 2.0
- 支持PSM数字语音接口

## LuatOS为它提供哪些功能

- 可用Lua内存: 200k
- 脚本空间: 448k
- 基础外设: GPIO/SPI/I2C/PWM/ADC
- 网络功能: Mobile/Socket/Http/Mqtt/WebSocket/FTP`*`/NTP/SMS`*`
- UI显示: LCD/Eink/U8G2/LVGL
- 语音输出: MP3/ARM`*`
- 扫码: Scan`*`

带`*`的功能尚待开发

注意, 鉴于芯片平台的限制,以下功能无法实现或具有局限性:
1. 不支持2G/3G/5G通信
2. 不支持 `电信`网络 的短信收发
3. 不支持 `wifi`通信, 仅支持特定场景下的wifi scan
4. 不支持VoLTE, 不支持2G/3G的语音


## 固件下载

正式版可以在发行版页面下载：

[https://gitee.com/openLuat/LuatOS/releases](https://gitee.com/openLuat/LuatOS/releases)

## 刷机烧录教程

[https://wiki.luatos.com/boardGuide/flash.html](https://wiki.luatos.com/boardGuide/flash.html)

## 相关资料链接

[开源仓库链接](https://gitee.com/openLuat/)
