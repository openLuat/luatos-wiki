# Air510U

## 硬件资料

* 资料网站: [air510u.cn](https://air510u.cn)

内置的GNSS芯片是 芯与物 UC6228CI

## 软件信息

资料链接: [UC6228CI](https://www.unicorecomm.com/products/detail/41)

### UART参数

* 默认波特率是115200
* 数据位8, 停止位1, 无校验
* UART电平是3.3V的
* 支持的最高波特率是115200, 最低9600

### 支持的导航星座

* 默认固件: GPS, 北斗二号, QZSS
* 加载固件: GPS, 北斗二号, 北斗三号, QZSS, GLONASS, GALILEO

切换导航星座:

1. 星座编号: GPS=1, 北斗=10
2. 星座之间可以组合, 如GPS+北斗=11, 单北斗是10

例子:

```txt
// 切换到GPS+北斗
$CFGSYS,H11\r\n
// 切换到单GPS
$CFGSYS,H01\r\n
// 切换到单北斗
$CFGSYS,H10\r\n
```

提醒:

* 切换导航星座会软重启模块, NMEA配置会恢复默认值, 非模式NMEA语句需要再次开启

### 星历信息

地址:

* [GPS+北斗星历 http://download.openluat.com/9501-xingli/HXXT_GPS_BDS_AGNSS_DATA.dat](http://download.openluat.com/9501-xingli/HXXT_GPS_BDS_AGNSS_DATA.dat)
* [单北斗星历 http://download.openluat.com/9501-xingli/HXXT_BDS_AGNSS_DATA.dat](http://download.openluat.com/9501-xingli/HXXT_BDS_AGNSS_DATA.dat)

更新周期均为10分钟一次, 星历有效期: GPS为4小时, 北斗为1小时

单北斗星历会比GPS+北斗星历小, 这是正常的, 北斗星历是GPS+北斗的子集

写入方式:

1. 星历本身是二进制文件(RTCM格式), 直接往模块的UART RXD口写入即可, 可分段(不小于256字节)写入, 也可一次性写入
2. 星历本身自带校验, 但写入无返回值

提醒:

1. 在设备运行中, 也会持续从卫星接收星历, 从而自动延长星历有效期
2. 保持备电不掉可保持星历, 备电也掉电后, 星历是会丢失的, 需要重新注入

## 适配情况

1. lua库: [uc6228 for LuatOS](https://github.com/wendal/luatos-lib-uc6228)
2. AT固件自带驱动
3. CSDK请参考 example_gnss

## 已知问题

1. 初版Air510U开发板, PPS电阻过大, 导致定位成功后PPS灯依然不亮
2. 内置固件是ROM版, 配置信息无法存盘
3. 内置固件仅支持GPS+北斗+QZSS, 不支持其他导航星座
4. 内置固件仅支持北斗编号37及以下的卫星
5. Air510U开发板的天线引脚不带馈电, 如需使用有源天线, 需要从VDD_REF引脚接电容引到天线脚

## 固件加载(高级话题)

Air510U内置的固件是ROM版, 无法存盘配置信息, 也无法更新固件, 但支持"加载固件"功能

下列操作所需要的文件, 请到 [uc6228 for LuatOS](https://github.com/wendal/luatos-lib-uc6228) 的pkg目录下载

### 固件加载操作流程

1. 以10ms的频率, 连续往模块的RX脚发送 `M!T` 指令, 3个字节, 持续发送
2. 将模块彻底断电后重新上电, 模块回复 `YC`, 然后每2秒输出一次 `C`, 代表进入加载模式成功, 否则请断电再上电
3. 停止发送 `M!T`, 使用 `xmodem` 协议, 发送 bootloader文件
4. 根据选取的bootloader文件, 例如 bl921600 代表波特率 921600, 切换串口波特率
5. 这时候应该能连续收到 `C` 字符, 代表bootloader启动完成, 准备接收固件
6. 使用 `xmodem` 协议, 发送 固件文件
7. 待发送完成后, 模块会重启, 进入固件运行模式, 根据固件文件的不同, 切换到正确的波特率, 通常是 115200
8. 此时, 模块应该会输出NMEA语句, 代表模块正确运行了
