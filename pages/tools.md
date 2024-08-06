# 🛠 LuatOS工具大全

## 历史固件,常用工具及其历史版本下载

点击访问 [合宙云盘](https://pan.air32.cn/s/DJTr)

* 最新及历史固件,包括2G/4G/wifi等模组
* LuaTools历史版本的下载
* 常用工具和驱动的下载

## 工具类

* [LuaTools下载(右键另存为)](https://luatos.com/luatools/download/last)
* [CH340驱动下载](https://www.wch.cn/products/ch340.html) 适合Air101/Air103/Air105开发板
* [CH343驱动下载](https://www.wch.cn/products/ch343.html) 适合ESP32C3经典款开发板,带串口芯片
* [ESP32C3 USB直驱](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32c3/api-guides/jtag-debugging/configure-builtin-jtag.html) 适合不带串口芯片的简洁版ESP32C3开发板
* [Air724/Air722/Air820调试驱动](https://doc.openluat.com/wiki/21?wiki_page_id=2070) 适合合宙 4G Cat.1 U系列, 即Air72xUx系列
* [ectool2py](https://gitee.com/openLuat/ectool2py) 移芯系列模组的跨平台刷机工具

## 网络服务

### 通用的

* [看看电池能用多久](https://wiki.luatos.com/_static/tools/psmplus/index.html) 合宙PSM+超低功耗
* [基站查询网页工具](http://bs.openluat.com)
* [坐标系转换工具](http://old.openluat.com/GPS-Offset.html) GNSS模块输出的坐标是WGS84,需要转国内的坐标系
* [网络测试工具](https://netlab.luatos.com) 支持TCP/UDP/TCP-TLS等外网端口的获取
* [网络测试工具国外版支持IPV6](https://netlab.luatos.org)
* [LuatOS-iRTU管理系统](http://dtu.openluat.com) 透传固件的管理界面
* [合宙服务监控](http://police.openluat.com/)
* [基站/Wi-Fi定位](https://doc.openluat.com/wiki/21?wiki_page_id=1957) 说明文档
* [AirTun内网穿透协议](https://gitee.com/openLuat/luatos-airtun)

### LuatOS-SoC系列固件的网络服务,例如Air780E系列

* [SoC云编译](https://wiki.luatos.com/develop/compile/Cloud_compilation.html) 全系LuatOS-SoC固件的云编译服务
* [RTKV](https://wiki.luatos.com/api/libs/rtkv.html) 远程Key-Value服务
* [EC618系列模组的差分工具及镜像](https://gitee.com/openLuat/luatos-soc-2022/tree/master/tools/dtools)
* [EC7xx系列模组的差分工具及镜像](https://gitee.com/openLuat/luatos-soc-2023/tree/master/tools/dtools)

### LuatOS-Air系列的网络服务, 例如Air724UG

* [Air724UG系列FOTA远程升级工具](https://doc.openluat.com/wiki/21?wiki_page_id=2314)
* [Air724UG系列差分包生成工具](https://doc.openluat.com/wiki/21?wiki_page_id=2314)
* [Air724UG系列差分包生成API](https://doc.openluat.com/wiki/21?wiki_page_id=2314)
* [远程trace记录工具](https://doc.openluat.com/wiki/21?wiki_page_id=1978)
* [Air底层固件功能可选编译系统](https://doc.openluat.com/article/2728)
* [Air固件差分工具开源版本](https://gitee.com/openLuat/web-dtool-service) 用于固件升级包的生成
