# videoplayer - 视频播放库

**示例**

```lua
-- 打开MJPG视频文件, 逐帧解码后绘制到LCD
local player = videoplayer.open("/sdcard/video.mjpg")
if not player then
    log.error("videoplayer", "打开视频失败")
    return
end
-- 开启调试信息
videoplayer.debug(true)
-- 获取视频信息
local info = videoplayer.info(player)
log.info("videoplayer", "分辨率", info.width, info.height)
-- 逐帧解码并显示
while true do
    local ok, err = videoplayer.draw_frame(player, 0, 0)
    if err == "eof" then break end
    sys.wait(33)  -- 约30fps
end
videoplayer.close(player)

```

## 常量

|常量|类型|解释|
|-|-|-|
|videoplayer.DECODE_SW|number|软件解码模式|
|videoplayer.DECODE_HW|number|硬件解码模式|
|videoplayer.FMT_MJPG|number|MJPG视频格式|
|videoplayer.FMT_AVI_MJPG|number|AVI+MJPG视频格式(预留)|
|videoplayer.FMT_MP4_H264|number|MP4+H264视频格式(预留)|


## videoplayer.open(path)

打开视频文件, 返回播放器对象

**参数**

|传入值类型|解释|
|-|-|
|string|path 视频文件路径, 当前支持MJPG格式, 例如 "/sdcard/video.mjpg"|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|播放器对象, 失败时返回nil和错误信息|

**例子**

```lua
-- 打开MJPG格式视频文件
local player, err = videoplayer.open("/sdcard/video.mjpg")
if not player then
    log.error("videoplayer", "打开失败", err)
    return
end

```

---

## videoplayer.close(player)

关闭播放器, 释放所有资源

**参数**

|传入值类型|解释|
|-|-|
|userdata|player videoplayer.open()返回的播放器对象|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
videoplayer.close(player)
player = nil

```

---

## videoplayer.read_frame(player)

读取并解码下一帧视频, 返回帧数据表

**参数**

|传入值类型|解释|
|-|-|
|userdata|player videoplayer.open()返回的播放器对象|

**返回值**

|返回值类型|解释|
|-|-|
|table|成功返回帧数据表(含width/height/data字段), 到达文件末尾时返回nil和"eof", 出错返回nil和错误信息|

**例子**

```lua
-- 逐帧读取视频
while true do
    local frame, err = videoplayer.read_frame(player)
    if err == "eof" then
        log.info("videoplayer", "播放完毕")
        break
    end
    if frame then
        log.info("videoplayer", "帧大小", frame.width, frame.height)
        -- frame.data 为RGB565格式的原始像素数据(字符串), 长度 = width * height * 2
    end
end

```

---

## videoplayer.draw_frame(player, x, y)

读取下一帧并绘制到默认LCD屏幕, 需开启LUAT_USE_LCD

**参数**

|传入值类型|解释|
|-|-|
|userdata|player videoplayer.open()返回的播放器对象|
|int|x 显示起始X坐标|
|int|y 显示起始Y坐标|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true, 到达文件末尾返回nil和"eof", 失败返回nil和错误信息|

**例子**

```lua
-- 逐帧解码并显示到LCD左上角
while true do
    local ok, err = videoplayer.draw_frame(player, 0, 0)
    if err == "eof" then break end
    sys.wait(33)  -- 约30fps
end

```

---

## videoplayer.info(player)

获取视频信息

**参数**

|传入值类型|解释|
|-|-|
|userdata|player videoplayer.open()返回的播放器对象|

**返回值**

|返回值类型|解释|
|-|-|
|table|成功返回信息表(含width/height/format/decode_mode字段), 失败返回nil|

**例子**

```lua
local info = videoplayer.info(player)
if info then
    log.info("videoplayer", "分辨率", info.width, info.height)
    log.info("videoplayer", "格式", info.format)
    log.info("videoplayer", "解码模式", info.decode_mode)
end

```

---

## videoplayer.set_decode_mode(player, mode)

设置解码模式, 支持软件解码和硬件解码两种模式, 可在播放过程中随时切换

**参数**

|传入值类型|解释|
|-|-|
|userdata|player videoplayer.open()返回的播放器对象|
|int|mode 解码模式, videoplayer.DECODE_SW为软件解码, videoplayer.DECODE_HW为硬件解码|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true, 失败返回false|

**例子**

```lua
-- 切换到硬件解码
videoplayer.set_decode_mode(player, videoplayer.DECODE_HW)
-- 切换回软件解码
videoplayer.set_decode_mode(player, videoplayer.DECODE_SW)

```

---

## videoplayer.debug(on_off)

设置调试信息输出开关, 开启后将打印解码过程、帧大小等关键信息

**参数**

|传入值类型|解释|
|-|-|
|boolean|on_off true开启调试输出, false关闭(默认)|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 开启调试, 将打印帧信息等
videoplayer.debug(true)
-- 关闭调试
videoplayer.debug(false)

```

---

