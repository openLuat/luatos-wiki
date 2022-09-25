# Air103功耗曲线

## 测试版本

LuatOS-SoC_V0007_AIR103.soc

| 测试场景\主频 | 2M | 80M |
| --- | --- | --- |
| 空载 | 13.4126mA | 22.2793mA |
| timer |13.4344mA | 22.3149mA |
| 循环加法 |13.6115mA| 27.5370mA |
| LIGHT |2.0921mA | 2.3250mA|
| DEEP | 11.8222uA | 11.7956uA|

* Air101/Air103 有多种运行模式

| 模式 | Lua代码 | RAM保持 | GPIO 保持 | RTC时钟 | 唤醒方式|
|------|--------|---------|-----------|--------|--------|
| Normal| 运行   |  Y      | Y        | 正常跑  | 无休眠  |
| LIGHT | 暂停   |  Y      | Y         | 正常跑  |wakeup/rtc/dtimer|
| DEEP | 丢弃    |  N       | N        |  正常跑  |wakeup/rtc/dtimer|
| 复位 | 丢弃     | N       | N         | 归零    | reset|

* 通过 `pm.request` 可进入 LIGHT 和 DEEP, 进入之前可设置rtc闹钟或dtimer定时器
* 若一直拉低wakeup脚, 芯片将不会进入休眠状态
* LIGHT模式自动唤醒后, Lua代码会继续运行
* DEEP模式自动唤醒后, Lua代码会从头运行,已有变量数据全丢

## 2M主频

### 空载

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302190214383_image.png)

### timer

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302190216878_image.png)

### 循环加法

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302190221908_image.png)

### LIGHT

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302190231182_image.png)

### DEEP

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302190226184_image.png)

## 80M主频

### 空载

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302190252862_image.png)

### timer

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302190247168_image.png)

### 循环加法

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302190244578_image.png)

### LIGHT

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302190236896_image.png)

### DEEP

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302190239449_image.png)

## 测试脚本及测试数据文件

[Air103功耗测试脚本及测试数据文件.7z](https://cdn.openluat-luatcommunity.openluat.com/attachment/20220302193243035_Air103功耗测试脚本及测试数据文件.7z)
