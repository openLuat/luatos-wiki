# Air780EPS模组固件发行注记

## 固件分区说明
|分区       |大小      |
|----------|----------|
|脚本区     | 512K    |
|脚本OTA区  | 360K    |
|文件系统区  | 512K   |
|底层FOTA区 |  1024K |
|KV 区      | 64K    |


## V1004

Air780EPS模组 第一版固件

支持的功能如下

基础外设:

1. uart
2. gpio
3. iic
4. spi
5. adc
6. pwm
7. wdt
8. wlan
9. rtc时钟
10. media（amr/mp3/wav/tts（固件内置TTS资源库））
11. wlanscan

工具库:

1. iotauth
2. crypto
3. json
4. zbuff
5. pack
6. libgnss
7. fs
8. sensor
9. fskv
10. i2ctools
11. miniz
12. iconv

网络功能:

1. socket(tcp/udp/tcp_ssl)
2. http/https
3. mqtt/mqtts
4. ftp/ftps
5. ntp
6. errDump
7. websocket



