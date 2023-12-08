# Ec718p系列固件发行注记

* [固件下载地址](https://gitee.com/openLuat/LuatOS/releases)
* [固件下载备用地址](https://pan.air32.cn/s/DJTr?path=%2F)
* 通过[云编译](https://wiki.luatos.com/develop/compile/Cloud_compilation.html),全自动编译最新固件

## V0001

EC718P系列固件第一版

支持的功能如下

基础外设:

1: gpio
2: uart
3: iic
4: spi
5: adc
6: pwm
7: wdt
8: pm（深度休眠暂时无法使用）
9: fota
10: rtc时钟
11: media（tts/amr/mp3/wav）
12: wlanscan

工具库:

1: json
2: iotauth
3: fs
4: pack
5: zbuff
7: fskv
8: miniz
9: sfud（spi flash）
10: fatfs（tf卡）
11: w5500
12: protobuf
13: iconv
14: u8g2
15: lcd
16: lvgl

网络功能:

1: socket(tcp/udp/tcp_ssl)
2: http/https
3: mqtt/mqtts
4: ftp/ftps
5: ntp
6: sms
7: errDump
8: websocket
