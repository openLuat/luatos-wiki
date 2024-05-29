# LuaTools版本历史

已发布的历史版本可以在 [合宙云盘](https://pan.air32.cn/s/DJTr) 找到

## 2.2.26

待发布

* fix: 在win10/win11的 **工作站专业版** 下无法查看日志的问题
* fix: 无法抓取ec716s系列模块的底层日志

## 2.2.25

* fix: 防御用户脚本里的PROJECT带空格字符
* fix: 如果客户加入到脚本列表的资源文件带只读属性,第二次下载就直接报错, 因为文件无法删除
* fix: 下载ec7xx的csdk的soc文件时,错误判定为luatos固件
* add: 支持EC618/EC716S/EC718P/EC718PV的uart刷机
* update: 更新英文翻译
* update: 识别固件信息是增加Air795UG
* update: 优化combine_ec7xx的日志打印
