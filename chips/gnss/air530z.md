# Air530Z

## 硬件资料

* 资料网站: [air530z.cn](https://air530z.cn)

硬件分两个版本, 普通版`Air530Z`和单北斗版`Air530Z-BD`, 硬件封装完全一致, 区别在于软件支持的星座不同

内置的GNSS芯片是 中科微AT6558R, 单北斗版本有认证证书

## 软件信息

详细通信协议请查阅 [Air530Z协议文档](https://cdn.openluat-luatcommunity.openluat.com/attachment/20210301115201307_CASIC%E5%A4%9A%E6%A8%A1%E5%8D%AB%E6%98%9F%E5%AF%BC%E8%88%AA%E6%8E%A5%E6%94%B6%E6%9C%BA%E5%8D%8F%E8%AE%AE%E8%A7%84%E8%8C%83-20210301.pdf)

资料链接: [AT6558R](https://www.icofchina.com/xiazai/)

### UART参数

* 默认波特率根据批次和封装的不同, 可能是9600 或者 115200
* 数据位8, 停止位1, 无校验
* 切换到115200波特率的命令: `$PCAS01,5*19\r\n` 注意后面的`\r\n`是必须的, 实际发送的是`0x0D 0x0A` 2个字节
* 切换波特率后, 后续数据会立即以新波特率发送
* UART电平是3.3V的
* 支持的最高波特率是115200, 最低9600

### 支持的导航星座

* 普通版: GPS, 北斗二代/三代, GLONASS
* 单北斗版: 北斗二代/三代

切换导航星座:

1. 星座编号: GPS=1, 北斗=2, GLONASS=4
2. 星座之间可以组合, 如GPS+北斗=3, 北斗+GLONASS=6, 全部=7

例子:

```txt
// 切换到GPS+北斗
$PCAS04,3*1A\r\n
// 切换到单GPS
$PCAS04,1*18\r\n
// 切换到单北斗
$PCAS04,2*1B
```

提醒:

* 单北斗的版本(`Air530Z-BD`)不支持切换导航星座, 以上指令会全部忽略
* 注意后面的`\r\n`是必须的, 实际发送的是`0x0D 0x0A` 2个字节

### 星历信息

地址:

* [GPS+北斗星历 http://download.openluat.com/9501-xingli/CASIC_data.dat](http://download.openluat.com/9501-xingli/CASIC_data.dat)
* [单北斗星历 http://download.openluat.com/9501-xingli/CASIC_data_bds.dat](http://download.openluat.com/9501-xingli/CASIC_data_bds.dat)

更新周期均为10分钟一次, 星历有效期: GPS为4小时, 北斗为1小时

单北斗星历会比GPS+北斗星历小, 这是正常的, 北斗星历是GPS+北斗的子集

写入方式:

1. 星历本身是二进制文件, 直接往模块的UART RXD口写入即可, 可分段(不小于256字节)写入, 也可一次性写入
2. 星历本身自带校验, 但写入无返回值

提醒:

1. 在设备运行中, 也会持续从卫星接收星历, 从而自动延长星历有效期
2. 保持备电不掉可保持星历, 备电也掉电后, 星历是会丢失的, 需要重新注入

## 适配情况

1. lua库: [at6558r for LuatOS](https://github.com/wendal/luatos-lib-at6558r)
2. AT固件自带驱动
3. CSDK请参考 example_gnss
