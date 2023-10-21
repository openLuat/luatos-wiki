# 随身wifi的资料合集

本文档是 `Air780E` + `ESP32S3` 做随身wifi的相关信息

1. 主要是搭配Air780E,实际可以使用EC618系列的其他模块, 例如Air700E,Air780EG等等
2. 速度并不快, 可以说还比较慢, 作为wifi转4G平台有一定加载, 但单纯做手机热点就别考虑了.
3. wifi及管理界面的账户密码是 `LuatOS`  `12345678`
4. ESP32S3刷的是ESP-Iot项目的固件, 非LuatOS固件, 如需二开开发, 是使用esp-idf使用C语言编程的.

## 固件及刷机步骤

固件下载: https://pan.air32.cn/s/DJTr?path=%2F%E5%90%84%E7%A7%8D%E6%B5%8B%E8%AF%95%E5%9B%BA%E4%BB%B6%2F%E9%9A%8F%E8%BA%ABwifi%E7%9A%84%E5%9B%BA%E4%BB%B6_ESP32S3

刷机说明:
1. Air780E只需要AT固件, 出厂默认就是AT固件, 所以一般情况下不需要刷机
2. ESP32S3刷上述链接中的固件
3. 待刷机完成后, ESP32S3开发板上有一个黄色的拨动开关, 撕掉保护膜, 拨动到USB一侧
4. 用Type-C对Type-C线, 将两块开发板连接起来
5. 使用额外的杜邦线, 给Air780E或者ESP32S3的5V/GND进行供电
6. Air780E记得插卡, Air780E联网后对应的wifi网络才会激活,才能被搜到
7. Air780E需要按pwrkey键2秒, 才会开机. 可短接pwrkey按钮旁边的焊盘,实现上电开机.

## 常见问题:

1. ESP32S3固件的源码哪里找:

https://github.com/yangzichen123/ESP32S3-AIR780E_CdcPPPDemo

https://github.com/espressif/esp-iot-bridge/blob/master/components/iot_bridge/User_Guide_CN.md

2. wifi搜不到,怎么办

大概率是Air780E未联网或未插卡. 将Air780E开发板直插电脑, 看是否出现RNDIS网卡, 如果没有出现, 需要刷一下AT固件
