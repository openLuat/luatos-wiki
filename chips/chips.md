# 芯片对照选型表

## 芯片对比

| 外设                                                  | Air101 | Air103 | Air105 | Air302 | Air640W | Air106 |
|------------------------------------------------------ |--------|--------|--------|--------|---------|--------|
| 封装                                                  | qfn32   | qfn48  | qfn88 | LCC    | qfn32   | LQFP64 |
| 总Flash                                               | 2M      | 1M     | 4M    | 4M     | 1M/2M   | 256k+外接Flash|
| 总Ram                                                 | 288k    | 288k   | 640k  | 256k   | 288k    | 64k+8M  |
| 内核                                                  | xt804   | xt804  | m4f   | m3     | m3      | m4f    |
| [gpio](https://wiki.luatos.com/api/gpio.html)         | 16      | 41     | 55    | 20     | 16      | ?      |
| [i2c](https://wiki.luatos.com/api/i2c.html)           | 1       | 1      | 1     | 1      | 1       | ?      |
| [spi](https://wiki.luatos.com/api/spi.html)           | 1       | 1      | 4     | 1   | 1       | ?      |
| [adc](https://wiki.luatos.com/api/adc.html)           | 2       | 4      | 5     | 2      | 2       | ?      |
| [dac](https://wiki.luatos.com/api/dac.html)           | ✖      | ✖      | 1     | ✖      | ✖      | 1      |
| [usb](https://wiki.luatos.com/api/usb.html)           | ✖      | ✖      | 1     | ✖      | ✖      | 1      |
| [keyboard](https://wiki.luatos.com/api/keyboard.html) | ✖      | ✖      | 1     | ✖      | ✖      | ✖      |
| [lcdseg](https://wiki.luatos.com/api/lcdseg.html)     | ✖      | 4*31    | ✖     | ✖     | ✖      | ✖      |
| [otp](https://wiki.luatos.com/api/otp.html)           | 1       | 1      | 1      | ✖     | ✖       | ✖      |
| [rtc](https://wiki.luatos.com/api/rtc.html)           | 1       | 1      | 1      | 1     | 1        | 1      |
| [pwm](https://wiki.luatos.com/api/pwm.html)           | 5       | 5      | 5      | 4      | 5       | ?      |
| [sdio](https://wiki.luatos.com/api/sdio.html)         | 1       | 1      | ✖      | ✖     | ✖      | ✖      |
| [硬狗](https://wiki.luatos.com/api/wdt.html)           | 1       | 1     | 1      | ✖     | 1      | 1      |
| [硬件加速算法](https://wiki.luatos.com/api/crypto.html)|md5/sha1 |md5/sha1| ?      | ?     |md5/sha1| jpeg   |
| [hwtimer](https://wiki.luatos.com/api/hwtimer.html)   | 5       | 5      | 5      | 2      | 5      | 5      |
| 2d加速                                                | ✖      | ✖      | ✖     |  ✖     | ✖      | 1      |
| 摄像头                                                | ✖      | ✖      | 1      |  ✖     | ✖      | ✖      |
| psram                                                 | ✖       | 支持外挂 | ✖     |  ✖     | ✖      | 内嵌    |
| wifi                                                  | ✖       | ✖       | ✖     |  ✖     | 1       | ✖      |
| ble                                                   | 1       | 1        | ✖     |  ✖     | ✖       | ✖      |
| nbiot                                                 | ✖       | ✖        | ✖     |  1     | ✖       | ✖      |

* gpio数量 包含bootmode之类的启动后可用的gpio
* 如有出入, 以硬件设计手册为准
* 联盛德w800/w801/w805/806与air101/air103类似,属于封装与flash大小的排列组合
* air105有1个高速SPI,最高96M, 3个低速SPI, 最高20M

## 图示含义 Table Legend

|  图示 | 含义  |
|-------|-------|
|✔ |已支持 Supported|
|⚠ |进行中/部分支持 WIP/partial support|
|✖ |不支持 Not supported|
|? |尚不明确/保密状态 |
