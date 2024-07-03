# 📊 芯片对照选型表

## 芯片对比

| 外设                                                  | Air101 | Air103 | Air105 | Air302 | Air640W | Air106 |ESP32C3|
|------------------------------------------------------ |--------|--------|--------|--------|---------|--------|-------|
| 封装                                                  | qfn32   | qfn56  | qfn88 | LCC    | qfn32   | LQFP100 | qfn32|
| 总Flash                                               | 2M      | 1M     | 4M    | 4M     | 1M/2M   | 512k+外接Flash|外接Flash|
| 总Ram                                                 | 288k    | 288k   | 640k  | 256k   | 288k    | 64k+8M|400k|
| 内核                                                  | xt804   | xt804  | m4f   | m3     | m3      | m33    |risc-v|
| [uart](https://wiki.luatos.com/api/uart.html)         | 5(4)    | 6(5)   | 4(3)  | 3(1)   | 3(2)    | 4(3)      |2|
| [gpio](https://wiki.luatos.com/api/gpio.html)         | 18      | 44     | 56    | 20     | 16      | 74      |15|
| [i2c](https://wiki.luatos.com/api/i2c.html)           | 1       | 1      | 1     | 1      | 1       | 2      |1|
| [spi](https://wiki.luatos.com/api/spi.html)           | 1       | 1      | 4     | 1      | 1       | 2      |1|
| [adc](https://wiki.luatos.com/api/adc.html)           | 2       | 4      | 5     | 2      | 2       | 19      |6|
| [dac](https://wiki.luatos.com/api/dac.html)           | ✖      | ✖      | 1     | ✖      | ✖      | 1      |✖|
| [usb](https://wiki.luatos.com/api/usb.html)           | ✖      | ✖      | 1     | ✖      | ✖      | 1      |1|
| [keyboard](https://wiki.luatos.com/api/keyboard.html) | ✖      | ✖      | 1     | ✖      | ✖      | ✖      |✖|
| [lcdseg](https://wiki.luatos.com/api/lcdseg.html)     | ✖      | 4*31    | ✖     | ✖     | ✖      | ✖      |✖|
| [otp](https://wiki.luatos.com/api/otp.html)           | 1       | 1      | 1      | ✖     | ✖       | ✖      |✖|
| [rtc](https://wiki.luatos.com/api/rtc.html)           | 1       | 1      | 1      | 1     | 1        | 1      |1|
| [pwm](https://wiki.luatos.com/api/pwm.html)           | 5       | 5      | 5      | 4      | 5       | 20(18)      |4|
| [sdio](https://wiki.luatos.com/api/sdio.html)         | 1       | 1      | ✖      | ✖     | ✖      | 1      |✖|
| [硬狗](https://wiki.luatos.com/api/wdt.html)          | 1       | 1     | 1      | ✖     | 1      | 1      |1|
| [硬件加速](https://wiki.luatos.com/api/crypto.html)   |md5/sha1 |md5/sha1| md5/sha| ✖    |md5/sha1| jpeg   |md5/sha1|
| 硬件定时器                                            | 5       | 5      | 8(6)      | 2      | 5      | 15(13)     |4|
| 2d加速                                                | ✖      | ✖      | ✖     |  ✖     | ✖      | 1      |✖|
| 摄像头                                                | ✖      | ✖      | 1      |  ✖     | ✖      | ✖      |✖|
| psram                                                 | ✖      | 可外挂 | ✖     |  ✖     | ✖      | 内嵌    |✖|
| wifi                                                  | ✖       | ✖       | ✖     |  ✖     | 1       | ✖      |1|
| ble                                                   | 1       | 1        | ✖     |  ✖     | ✖       | ✖      |1|
| nbiot                                                 | ✖       | ✖        | ✖     |  1     | ✖       | ✖      |✖|
|推荐分辨率                                             | `128*160` | `128*120`|`320*240`|`128*160`|`128*160`|`1024*768`|`320*240`|

* uart数量 总uart数量, 括号内的是用户通常可用的uart数量. 一般情况下,需要占用一个uart用于日志和刷机.
* gpio数量 全部可复用为GPIO的数量, 其中包含bootmode和uart0等启动后可用的但不推荐复用的GPIO.
* 如有出入, 以硬件设计手册为准
* 联盛德w800/w801/w805/806与air101/air103类似,属于封装与flash大小的排列组合
* air105有1个高速SPI,最高96M, 3个低速SPI, 最高24M
* air101/air103的BLE属于赠送, 功耗高, 不适合低功耗场景

## 图示含义 Table Legend

|  图示 | 含义  |
|-------|-------|
|✔ |已支持 Supported|
|⚠ |进行中/部分支持 WIP/partial support|
|✖ |不支持 Not supported|
|? |尚不明确/保密状态 |
