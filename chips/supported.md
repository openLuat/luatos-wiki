
# 设备支持情况/Supported Devices

## 基础外设支持

| Libs                                                  | Air101 | Air103 | Air105 | Air780E | ESP32C2 | ESP32C3 |
|------------------------------------------------------ |--------|--------|--------|--------|---------|--------|
| [gpio](https://wiki.luatos.com/api/gpio.html)         | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [i2c](https://wiki.luatos.com/api/i2c.html)           | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [spi](https://wiki.luatos.com/api/spi.html)           | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [adc](https://wiki.luatos.com/api/adc.html)           | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [dac](https://wiki.luatos.com/api/dac.html)           | ✖      | ✖     | ✔      | ✖     | ✖      | ✖      |
| [usb](https://wiki.luatos.com/api/usb.html)           | ✖      | ✖     | ✔      | ✔     | ✖      | ✖      |
| [otp](https://wiki.luatos.com/api/otp.html)           | ✔      | ✔     | ✔      | ✔     | ✖      | ✖      |
| [pin](https://wiki.luatos.com/api/pin.html)           | ✔      | ✔     | ✔      | ✖     | ✖      | ✖      |
| [rtc](https://wiki.luatos.com/api/rtc.html)           | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [pwm](https://wiki.luatos.com/api/pwm.html)           | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [sdio](https://wiki.luatos.com/api/sdio.html)         | ✔      | ✔     | ✖      | ✖     | ✖      | ✖      |
| [wdt](https://wiki.luatos.com/api/wdt.html)           | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [crypto](https://wiki.luatos.com/api/crypto.html)     | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [keyboard](https://wiki.luatos.com/api/keyboard.html) | ✖      | ✖     | ✔      | ✖     | ✖      | ✖      |
| [lcdseg](https://wiki.luatos.com/api/lcdseg.html)     | ✖      | ✔     | ✖      | ✖     | ✖      | ✖      |

补充说明:
* air101与air103固件的区别在于flash大小, 兼容xt804内核的芯片, 例如联盛德的W800/W801/W805/W806
* lcdseg支持与否,与封装有关, qfn56封装的xt804支持, qfn32的不支持

## 功能库支持

| Libs                                                  | Air101 | Air103 | Air105 | Air780E | ESP32C2 | ESP32C3 |
|-------------------------------------------------------|--------|--------|--------|--------|---------|--------|
| [json](https://wiki.luatos.com/api/json.html)         | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [zbuff](https://wiki.luatos.com/api/zbuff.html)       | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [pack](https://wiki.luatos.com/api/pack.html)         | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [libgnss](https://wiki.luatos.com/api/libgnss.html)   | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [libcoap](https://wiki.luatos.com/api/libcoap.html)   | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [lcd](https://wiki.luatos.com/api/lcd.html)           | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [eink](https://wiki.luatos.com/api/eink.html)         | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [u8g2](https://wiki.luatos.com/api/u8g2.html)         | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [gtfont](https://wiki.luatos.com/api/gtfont.html)     | ✔      | ✔     | ✔      | ✖     | ✖      | ✖      |
| [coremark](https://wiki.luatos.com/api/coremark.html) | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [fdb](https://wiki.luatos.com/api/fdb.html)           | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [lvgl](https://wiki.luatos.com/api/lvgl.html)         | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [sfud](https://wiki.luatos.com/api/sfud.html)         | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |
| [statem](https://wiki.luatos.com/api/statem.html)     | ✔      | ✔     | ✔      | ✔     | ✔      | ✔      |

## 联网/射频支持

| Libs                                                  | Air101 | Air103 | Air105 | Air780E | ESP32C2 | ESP32C3 |
|-------------------------------------------------------|--------|--------|--------|--------|---------|--------|
| [socket](https://wiki.luatos.com/api/socket.html)     | ✖      | ✖     | ✔      | ✔     | ⚠      | ⚠      |
| [wlan](https://wiki.luatos.com/api/wlan.html)         | ✖      | ✖     | ✔      | ✔     | ✔      | ✔      |
| [nimble](https://wiki.luatos.com/api/nimble.html)     | ✔      | ✔     | ✖      | ✖     | ✖      | ✔      |
| [http](https://wiki.luatos.com/api/http.html)         | ✖      | ✖     | ✔      | ✔     | ✔      | ✔      |
| [mqtt](https://wiki.luatos.com/api/mqtt.html)         | ✖      | ✖     | ✔      | ✔     | ✔      | ✔      |
| [websocket](https://wiki.luatos.com/api/websocket.html) | ✖    | ✔     | ✔      | ✔     | ⚠      | ⚠      |

* Air105搭配W5500才有联网功能
* Air780E仅支持wifi scan ,无 wifi 联网功能

## 图示含义 Table Legend

|  图示 | 含义  |
|-------|-------|
|✔ |已支持 Supported|
|⚠ |进行中/部分支持 WIP/partial support|
|✖ |不支持 Not supported|
