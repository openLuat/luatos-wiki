# Air101功耗曲线

## 测试版本

LuatOS-SoC_V0007_AIR101.soc

| 测试场景\主频 | 2M | 80M |
| --- | --- | --- |
| 空载 | 13.6406mA | 22.4846mA |
| timer | 13.6728mA | 22.5383mA |
| 循环加法 | 14.2334mA | 29.7260mA |
| LIGHT | 2.0060mA | 2.0107mA |
| DEEP | 11.5576uA | 11.6721uA |

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

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302185225870_image.png)

### timer

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302185229105_image.png)

### 循环加法

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302185236439_image.png)

### LIGHT

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302185244151_image.png)

### DEEP

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302185240480_image.png)

## 80M主频

### 空载

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302185255491_image.png)

### timer

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302185258589_image.png)

### 循环加法

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302185306204_image.png)

### LIGHT

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302185318021_image.png)

### DEEP

![image.png](https://cdn.openluat-luatcommunity.openluat.com/images/20220302185312575_image.png)

## 测试脚本及测试数据文件

[Air101功耗测试脚本及测试数据文件.7z](https://cdn.openluat-luatcommunity.openluat.com/attachment/20220302193239733_Air101功耗测试脚本及测试数据文件.7z)
