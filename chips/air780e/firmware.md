# 固件说明

## 固件的版本

以V1105版本为例

|名称                        |分类    |脚本区大小|
|----------------------------|--------|---------|
|LuatOS-SoC_V1105_EC618      |数传版  |448kb    |
|LuatOS-SoC_V1105_EC618_TTS  |TTS版   |448kb    |
|LuatOS-SoC_V1105_EC618_FULL |全功能版|128kb    |
|LuatOS-SoC_V1105_EC618_CLOUD|云构建版|自定义    |

固件文件均以`.soc`为后缀

## 固件分类的解释

1. 数传版, 不含UI类(U8G2/LCD/EINK/DISP/LVGL)/TTS,仅包含少量外设驱动库
2. TTS版, 在数传版上添加TTS支持, 但TTS资源需要外置在额外的SPI Flash
3. 全功能版, 会开启大部分库, 但需要特别指出的是,不包含TTS库的内置TTS资源模式
4. 云构建版, 通过[云编译](../../develop/compile/Cloud_compilation.md)功能定制的固件

若前3款不能满足需求,请使用[云编译](../../develop/compile/Cloud_compilation.md)功能定制你需要的固件

V1105版本开始, EC618系列的云编译支持根据发行版本的源码进行定制,预计2023.03.17上线

## OTA相关的解释

1. 脚本区大小, 含脚本和资源文件的总大小.
2. 所有版本均支持`脚本OTA`, 该功能是默认开启的
3. 临近版本底层差分,指相邻版本之间的FOTA, 例如 V1103底层差分升级到V1105底层
4. 跨版本底层差分,指非相邻版本之间的FOTA, 例如 V1103底层差分升级到V1105底层
5. EC618的底层升级是基于差分算法的,且AP+CP部分的差分包不能超过480kb
6. 在LuaTools主界面的菜单生成的差分升级包,会显示差分包的细节
7. 注意: **脚本区大小不同**的底层, 不能进行底层差分升级
8. 云编译的固件,在配置相同的情况, 临近版本的底层差分通常是可行的

支持级别
1. 支持     - 确保支持, 最坏的情况是多次差分完成升级
2. 尽量支持 - 若不能支持, 会给出过渡版本或相关解决方案
3. 不保证   - 不做保证


## 固件下载及变更历史

固件压缩包下载: https://gitee.com/openLuat/LuatOS/releases , LuaTools也会自动下载最新的版本,可在resource目录找到
变更历史: https://gitee.com/openLuat/luatos-soc-2022/blob/master/changelog_luatos.txt

## 固件压缩包的内容

以V1105版本为例, 整体布局如下

```
- 压缩包根目录
    - LuatOS-SoC_V1105_EC618.soc
    - LuatOS-SoC_V1105_EC618_TTS.soc
    - LuatOS-SoC_V1105_EC618_FULL.soc
    - 功能测试固件
        - Air780EG定位测试固件_LuatOS-SoC_V1105_EC618_FULL.soc
        - 闪灯测试固件_LuatOS-SoC_V1105_EC618_FULL.soc
        - AirTun联网测试固件_LuatOS-SoC_V1105_EC618_FULL.soc
    - demo
        - adc
        - gpio
        - socket
        - http
        - mqtt
    - script
        - libs
            ads1115.lua
            mcp25125.lua
        - turnkey
            - web_audio
                - main.lua
```

目录解释:
1. `功能测试固件` 包含可直接刷机测试的固件, 已带脚本
2. `demo` 包含各种功能的示例
3. `script/libs` 扩展功能,主要是外设驱动库,支持各种各样的传感器和扩展元器件
4. `script/turnkey` 准商用级别的解决方案,包含完整业务逻辑实现作为参考项目代码

固件发行包的是`zip`格式的压缩包, 请解压后使用

## 差分包超过480k的解决办法-多次差分升级

由于差分机制的限制, 差分包的AP+CP差分不能超过480k, 但依然可以通过多次差分的方式进行底层升级

设备上的版本假设为1.0.0, 目标版本是 2.0.0

差分链:
```
1.0.0 --> 一个或多个仅包含FOTA脚本的差分包 --> 2.0.0
```

思路如下:
1. 中间版本只带FOTA升级版本,目的都是为了升级到下一个版本
2. 最后一个差分版本, 加入完整的业务脚本, 最终差分到 2.0.0

中间版本的要求: 
1. 越靠前的中间版本, 先考虑减法, 确保将差分包降到480k内, 脚本只写FOTA代码
2. 越靠后的中间版本, 应逐渐增加库

**技术细节提醒: 一定要跑通整个差分链,才进行批量升级**

附仅fota的差分脚本

```lua
-- 以下参数一定要设置好
PROJECT = "fotademo"
VERSION = "1.0.0"
PRODUCT_KEY = "123"

sys = require "sys"
sysplus = require "sysplus"
libnet = require "libnet"
libfota = require "libfota"

function fota_cb(ret)
    log.info("fota", ret)
    if ret == 0 then
        rtos.reboot() -- FOTA完成, 重启
    end
end

-- 使用合宙iot平台进行升级
libfota.request(fota_cb)
 -- 这里写10分钟是为了更快OTA到下一个版本, 请按实际情况判断
sys.timerLoopStart(libfota.request, 600000, fota_cb)

-- 使用自建服务器进行升级
-- local ota_url = "http://myserv.com/myapi/version=" .. _G.VERSION .. "&imei=" .. mobile.imei()
-- libfota.request(fota_cb, ota_url)
-- sys.timerLoopStart(libfota.request, 3600000, fota_cb, ota_url)

-- 用户代码已结束---------------------------------------------
-- 结尾总是这一句
sys.run()
-- sys.run()之后后面不要加任何语句!!!!!
```
