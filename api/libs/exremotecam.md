# exremotecam - exremotecam 远程摄像头控制扩展库，提供统一的摄像头OSD文字显示设置和拍照功能API。

**示例**

```lua
   用法实例
   注意：
        1. exremotecam.lua支持控制不同品牌的网络摄像头，提供统一的OSD文字显示设置和拍照功能API
        2. 使用前需要先加载具体品牌的摄像头功能模块，然后再加载exremotecam主模块
        3. 使用前请确保网络连接正常，能够访问到目标摄像头

    使用exremotecam库时，需要按照以下顺序加载模块：
        local dhcam = require "dhcam" -- 首先加载具体型号的摄像头功能模块（如大华dhcam）
        local exremotecam = require "exremotecam" -- 然后加载exremotecam主模块


local dhcam = require "dhcam"
local exremotecam = require "exremotecam"

-- OSD文字显示参数配置表
local osd_param = {
    brand = "dhcam",  -- 摄像头品牌，当前仅支持"dhcam"(大华)
    host = "192.168.1.108",  -- 摄像头/NVR的IP地址
    channel = 0,  -- 摄像头通道号
    text = "行1|行2|行3",  -- OSD文本内容，需用竖线分隔，格式如"1111|2222|3333|4444"
    x = 0,  -- 显示位置的X坐标
    y = 2000,  -- 显示位置的Y坐标
    username = "admin",  -- 摄像头登录用户名
    password = "Air123456"  -- 摄像头登录密码
}

-- 拍照功能参数配置表
local photo_param = {
    brand = "dhcam",  -- 摄像头品牌，当前仅支持"dhcam"(大华)
    host = "192.168.1.108",  -- 摄像头/NVR的IP地址
    channel = 0,  -- 摄像头通道号
    username = "admin",  -- 摄像头登录用户名
    password = "Air123456"  -- 摄像头登录密码
}

function camera_start()
    sys.waitUntil("WIFI_CONNECT_OK") -- 等待网络连接成功
    
    -- 设置摄像头OSD文字显示
    log.info("开始设置OSD显示")
    exremotecam.osd(osd_param)
    
    -- 控制摄像头拍照，若SD卡可用，则图片保存为/sd/1.jpeg
    log.info("开始拍照操作")
    exremotecam.get_photo(photo_param)
    
    log.info("远程摄像头控制操作完成")
end

sys.taskInit(camera_start)

-- 版本更新说明
-- 版本号：202607021200
-- 1、更新时间：2026-07-02 12:00
-- 2、更新内容
--    新增exremotecam.version()接口
--    支持exremotecam库文件版本号管理功能，版本号的格式为：yyyymmddhhmm，表示yyyy年mm月dd日hh时mm分发布的版本

```

## exremotecam.osd(camera_param)

设置摄像头OSD(屏幕显示)文字功能

**参数**

|传入值类型|解释|
|-|-|
|table|camera_param 参数表|
|string|camera_param.brand 摄像头品牌|
|string|camera_param.host 摄像头/NVR的IP地址|
|number|camera_param.channel 摄像头通道号（主要用于NVR）|
|string|camera_param.text OSD文本内容，需用竖线分隔|
|number|camera_param.x 显示位置的X坐标|
|number|camera_param.y 显示位置的Y坐标|
|string|camera_param.username 摄像头登录用户名（可选，默认为"admin"）|
|string|camera_param.password 摄像头登录密码（可选，默认为"Air123456"）|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|返回值|

**例子**

无

---

## exremotecam.get_photo(camera_param)

控制摄像头拍照功能

**参数**

|传入值类型|解释|
|-|-|
|table|camera_param 参数表|
|string|camera_param.brand 摄像头品牌|
|string|camera_param.host 摄像头/NVR的IP地址|
|number|camera_param.channel 摄像头通道号（主要用于NVR）|
|string|camera_param.save_path 照片保存路径（可选，默认为"/sd/1.jpeg"）|
|string|camera_param.username 摄像头登录用户名（可选，默认为"admin"）|
|string|camera_param.password 摄像头登录密码（可选，默认为"Air123456"）|

**返回值**

|返回值类型|解释|
|-|-|
|number|返回值|

**例子**

无

---

