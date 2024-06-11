# 其他定位方式简介

常见的定位方式还有:

1. 基站定位
2. wifi定位
3. 蓝牙定位
4. RTK定位
5. UWB定位

## 基站定位

* 原理: 搜索并上报周围的基站信息, 上报到服务器后, 服务器根据三角定位法, 估算出一个大概的坐标,精度在500~5000米不等
* 优点: 只要是4G通信模块就支持, 无额外的硬件成本
* 缺点: 定位精度不高, 误差在500~5000米不等

## wifi定位

* 原理: 搜索并上报附近的wifi信息, 上报到服务器后, 服务器根据三角定位法, 估算出一个大概的坐标,精度在50~500米不等
* 优点: 只要有wifi scan功能就支持
* 缺点: 定位精度不高, 误差在50~500米不等, 但对于没有独立wifi天线的模组, 搜索wifi影响数据通信, 例如Air780E系列

## 蓝牙定位

* 原理: 搜索并上报附近的蓝牙信息, 上报到服务器后, 服务器根据三角定位法, 估算出一个大概的坐标
* 优点: 只要有蓝牙scan功能就支持
* 缺点: 通常与其他定位方式配合使用, 蓝牙本身无联网功能

## RTK定位

* 原理: 高端GNSS模组支持RTK差分定位, 通过持续接收差分数据, 可以实现更高精度的定位, 最高可以做到厘米级
* 优点: 定位精度高, 误差在厘米级以内
* 缺点: 需要硬件支持, 价格昂贵, 差分数据需要持续注入, 通常是通过网络获取, 某些高端型号能支持 星基差分数据

## UWB定位

* 原理: 使用超宽带技术, 实现超低功耗, 低成本, 精度高, 误差在厘米级以内
* 优点: 定位精度高, 误差在厘米级以内
* 缺点: 需要硬件支持, 价格昂贵, 通常只能用于室内定位

## LuatOS对上述定位方式的支持库

大部分是第三方库, 请验证和评估

* 基站定位: [luatos官方库lbsLoc](https://wiki.luatos.com/api/libs/lbsLoc.html)
* 基站定位v2: [luatos官方库lbsLoc2](https://wiki.luatos.com/api/libs/lbsLoc2.html)
* 纯wifi定位: [luatos-lib-wifiloc, 第三方库](https://github.com/wendal/luatos-lib-wifiloc)
* rtk定位,对接ntrip协议: [luatos-lib-ntrip, 第三方库](https://github.com/wendal/luatos-lib-ntrip)
* 融合定位,腾讯LBS,基站+wifi+蓝牙: [luatos-lib-qqlbs, 第三方库](https://github.com/wendal/luatos-lib-qqlbs)
* rtk定位,中移动单频ntrip播发: [luatos-lib-onenetcors , 第三方库](https://github.com/wendal/luatos-lib-onenetcors)
