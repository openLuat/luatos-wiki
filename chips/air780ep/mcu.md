# Air780EP模组(EC718P系列通用)

**本系列文档适用于EC718P系列模组**

## 合宙EC718P系列模组(典型为Air780EP)是什么?

合宙通信推出的 LTE Cat.1 bis通信模块，采用移芯EC718P平台，支持4G全网通, 包括的模组有:

1. Air780EP  -- 4G Cat.1

主要特点:

- 支持双卡单待, 仅支持4G网络, 不支持 2G/3G/5G, 也不支持Wifi通信
- 支持USB 2.0, 仅CDC功能, 不支持HID和主机模式
- 支持I2S数字语音接口, 也支持软DAC音频输出

## LuatOS为它提供哪些功能

- 可用Lua内存: 默认256k,最高300k
- 脚本空间: 默认256k
- 基础外设: GPIO/SPI/I2C/PWM/ADC
- 网络功能: Mobile/TCP/UDP/Http/Mqtt/WebSocket/FTP/NTP/SMS
- UI显示: LCD/Eink/U8G2/LVGL
- 语音播放: MP3/AMR/TTS

注意, 鉴于芯片平台的限制,以下功能无法实现或具有局限性:

1. 不支持2G/3G/5G通信
2. 支持移动和联通的短信收发, 仅Air780EPV支持 `电信`网络 的短信收发
3. 不支持 `wifi`通信, 仅支持特定场景下的wifi scan
4. 仅Air780EPV支持VoLTE
5. 支持使用LVGL

## 固件下载

正式版可以在发行版页面下载, 整个系列的固件都是通用的：

[https://gitee.com/openLuat/LuatOS/releases](https://gitee.com/openLuat/LuatOS/releases)

[固件下载备用地址](https://pan.air32.cn/s/DJTr?path=%2F)

## 刷机烧录教程

[https://wiki.luatos.com/boardGuide/flash.html](https://wiki.luatos.com/boardGuide/flash.html)

## 相关资料链接

[开源仓库链接(BSP)](https://gitee.com/openLuat/luatos-soc-2024)
[开源仓库链接(主库)](https://gitee.com/openLuat/LuatOS)
