# 固件发行注记

本文件描述Air601的LuatOS固件的变更情况

固件下载地址:

1. [合宙云盘](https://pan.air32.cn/s/DJTr?path=%2F)
2. LuaTools也会自动下载
3. [Gitee库发布路径](https://gitee.com/openLuat/LuatOS/releases)

## V1023

1. 适配fota功能,支持底层+脚本的全量升级
2. 支持动态开关ble,以实现ble和wifi共存
3. 支持spi从机功能,最高速率50M, 对应demo/spi_slave
4. 支持ulwip库,可集成w5100s, 对应demo/ulwip
5. 支持AP隐藏ssid
6. http库支持任意header
7. 优化ble内存使用, 减少约10k
8. 优化ble功耗, 固件不含wifi功能时,省电50%以上
9. 字体优化, 解决中文显示的对齐问题

## V1022

1. 修复与AT固件的兼容性问题, 正确读写AP和STA的MAC地址
2. 修复nimble库无法断开蓝牙连接
3. socket库支持获取毫秒级时间戳

搭配的soc_script版本为: v2023.12.11.10

## V1021

1. 支持esptouch和airkiss配网,兼容腾讯连连
2. 修正wifi mac地址导致连接手机/电脑热点失败的问题
3. 支持TLS等加密链接, 默认固件未启用,可自行云编译
4. 支持更大Lua内存, 默认92k
5. 支持蓝牙功能,但需要与wifi分开使用, 不能同时启用

## V1020

初始版本
