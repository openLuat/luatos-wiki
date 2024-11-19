# Ec718p系列固件发行注记

* [固件下载地址](https://gitee.com/openLuat/LuatOS/releases)
* [固件下载备用地址](https://pan.air32.cn/s/DJTr?path=%2F)
* 通过[云编译](https://wiki.luatos.com/develop/compile/Cloud_compilation.html),全自动编译最新固件

## V2002

请搭配 Luatools 3.0.11 以上版本!!!

* change: rtos.bsp() 在Air780EP/Air780EPS/Air201/Air780EQ/Air700EMQ/EAQ/ECQ的型号固件, 会返回具体模组的型号
* add: 支持设置最大发送功率,仅特殊客户使用
* add: 支持关闭邻区测量用于功耗测试，非功耗测试情况下不要使用
* add: 获取更详细的服务小区信息,支持mobile.scell()函数
* add: 添加锁小区函数 mobile.lockCell()
* add: mqtt加pong消息上报
* add: 自定义apn列表，用于多个已知海外卡切换，需要用户提供相关APN信息
* add: 打印一条自定义APN列表里的信息
* update: 更新蚂蚁链底层库
* update: 更新高通字库静态库
* update: 优化full ota的下载速度控制，并且对https下载优化
* update: 优化低功耗模式
* update: luatos socket的端口号分布的更加均匀
* update: tonumber可以输出到0xffffffff
* change: pb编码应该使用固定顺序
* change: http的部分错误状态强制打印出来
* fix: i2c在poll模式下，特殊硬件条件下遇到一直BUSY情况没有超时退出
* fix: eink异步方式通信失败时，死机
* fix: iotcloud库,onenet自动注册三元组生成异常
* fix: UTF8编码输入的短信发不到70汉字
* fix: libgnss.debug在gnss报文过长时，无法打印出来

## V1003

缺陷修复

* 1：spi table方式发送异常
* 2：libgnss.clear没有清理干净残留数据
* 3：gnss定位成功后，执行libgnss.clear，关闭再打开gnss芯片，如果一上电就定位成功，无GNSS_STATE消息
* 4：mqtt启用后，内存占用过大，导致其他业务逻辑申请不到可用内存
* 5：http 响应头分包，导致解析失败
* 6：修复FTP在PASV模式下接受少量数据可能会提示失败


新增功能

* add：mqtt添加设置接收缓冲区大小的功能
* add：fatfs卸载功能
* add：mcu.hardfault新增死机处理模式参数

更新功能

* update：限制uart.read单次最大读取量，一次性读取太多数据，容易死机
* update：已经释放过的socket ctrl，不再允许其他操作，防止异常死机
* update：兼容部分FTP服务器
* update：RRC快速释放的优化选项

## V1002
兼容性变化
* 1：因功能变化较多，FLASH空间不足
    * (1)LuatOS-SoC_V1001_EC718PV无法远程升级到LuatOS-SoC_V1002_EC718PV
    * (2)LuatOS-SoC_V1002_EC718PV为正式发行的最后一版EPV固件，后续需要EPV固件请使用云编译或本地自行编译


缺陷修复
* fix: 拍照的时候无法选择jpeg编码质量
* fix：pwm在没有先close的情况下，既改周期，又改占空比，有可能死机的问题
* fix：在使用uart485时，无法设置转向pin为GPIO16和GPIO17的问题
* fix：otp功能异常
* fix：ota时，在ota完成的最后一刻死机，会导致底层OTA成功，而脚本ota失败
* fix：EPV固件，无法进入休眠
* fix：socket主动关闭时，回调消息错误
* fix：mqtt发送时，一次性将数据发出去，避免被打断
* fix：mqttconnect报文长度超过256时，无法连接服务器
* fix：ftp异常死机
* fix：socket添加防护，防止已释放的资源再次使用
* fix：防止可能的时间设置错误
* fix：spi table方式发送异常


新增功能
* add：audio库添加录音功能
* add：agpio在深度休眠唤醒后，依然可以保持休眠前电平的能力
* add：重置协议栈参数到默认
* add：基站同步时间开关
* add：深度休眠定时器回调消息
* add：w5500添加DHCP超时消息
* add：DHCP重试次数增加，应对运行速度慢的路由器
* add：socket查询当前连接状态
* add：http自定义header支持自定义大小
* add：sfud互斥锁保护
* add: 支持外部flash全量升级
* add：支持配置codec的工作电压
* add：mqtt添加设置缓冲区大小的功能

更新功能
* update：当遇到无法解析的NMEA语句时，屏蔽打印



## V1001

注意事项:
使用时需要进行充分的测试


缺陷修复:
* 修复V1000版本发现的BUG

新增功能:
* add: ioqueue操作
* add: camera功能
* add: 支持休眠功能


## V0001

EC718P系列固件第一版

支持的功能如下

基础外设:

1. gpio
2. uart
3. iic
4. spi
5. adc
6. pwm
7. wdt
8. pm（深度休眠暂时无法使用）
9. fota
10. rtc时钟
11. media（tts/amr/mp3/wav）
12. wlanscan

工具库:

1. json
2. iotauth
3. fs
4. pack
5. zbuff
7. fskv
8. miniz
9. sfud（spi flash）
10. fatfs（tf卡）
11. w5500
12. protobuf
13. iconv
14. u8g2
15. lcd
16. lvgl

网络功能:

1. socket(tcp/udp/tcp_ssl)
2. http/https
3. mqtt/mqtts
4. ftp/ftps
5. ntp
6. sms
7. errDump
8. websocket
