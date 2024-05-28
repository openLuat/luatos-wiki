# 辅助定位AGPS

AGPS(Assisted GPS)辅助定位 是指 通过向GPS/GNSS模组注入三要素数据，加速定位, 减少首次定位成功的耗时

三要素指的是:

* 卫星星历
* 精确UTC时间
* 粗略当前位置

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