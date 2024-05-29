# 辅助定位AGPS

AGPS(Assisted GPS)辅助定位 是指 通过向GPS/GNSS模组注入三要素数据，加速定位, 减少首次定位成功的耗时

三要素指的是:

* 卫星星历
* 精确UTC时间
* 粗略当前位置

正如其名称"辅助定位", 这些数据都是**辅助**的, 并不是必须的, 也可以不使用, 只是为了加速定位.

若所在环境信号不佳,或者天线性能太差,辅助定位也救不了.

辅助定位后, 位置依旧会静态漂移的, 这是GNSS的特性, 无法完全避免, 需要更高精度可以买RTK定位设备, 贵10倍以上.

## 卫星星历

包含的内容有:

1. 卫星轨道参数, 可推算出卫星位置
2. 电离层修正参数
3. 定点UTC修正信息

星历下载地址:

* Air510U和Air780EG [GPS+北斗](http://download.openluat.com/9501-xingli/HXXT_GPS_BDS_AGNSS_DATA.dat)
* Air530Z系列 [GPS+北斗](http://download.openluat.com/9501-xingli/CASIC_data.dat)
* Air530Z系列 [单北斗](http://download.openluat.com/9501-xingli/CASIC_data_bds.dat)
* Air780EPVH [GPS+北斗](http://download.openluat.com/9501-xingli/HXXT_GPS_BDS_AGNSS_DATA.dat)

更新周期均为10分钟一次, 星历有效期: GPS一般为4小时, 北斗为1小时

## 精确UTC时间

这个一般从NTP获取, 建议更新周期为4小时

## 粗略当前位置

位置的精度不需要很高, 但应尽量在15km范围内

1. 基站定位/wifi定位
2. 旧的已知位置

### 基站定位

基站定位, AT/CSDK/LuatOS开发均有对应的命令和函数, 具体参考对应的开发文档

### 旧的已知位置

* 建议在首次定位成功后, 立即保存当前位置
* 按时间周期, 每隔10分钟保存一次当前位置
* 若能持续联网或保证基站定位成功, 不本地保存位置也是可以的

## 关于室内定位

* 窗边是有GNSS信号的, 但不强, 也不保证能定位到, "窗"有很多种, 看不到天空的也很多, 定位不成功是很正常的.
* 所有**标称**的XXX秒定位成功,都是按室外,空旷,晴朗环境测试的, 都是理论最佳值
* 手机能在室内定位是因为有基站/wifi/蓝牙等额外手段, 而且天线调试好,GNSS芯片也贵(通常集成在SoC里)!!!

## 星历分析(非必须, 研究用途)

学习研究用 [https://gitee.com/openLuat/luatos-ext-gnss](https://gitee.com/openLuat/luatos-ext-gnss)
