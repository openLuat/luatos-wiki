# camera - 摄像头

## 常量

|常量|类型|解释|
|-|-|-|
|camera.AUTO|number|摄像头工作在自动模式|
|camera.SCAN|number|摄像头工作在扫码模式，只输出Y分量|
|camera.USB|number|摄像头类型，USB|
|camera.DVP|number|摄像头类型，DVP|
|camera.ROTATE_0|number|摄像头预览，画面不旋转|
|camera.ROTATE_90|number|摄像头预览，画面旋转90度|
|camera.ROTATE_180|number|摄像头预览，画面旋转180度|
|camera.ROTATE_270|number|摄像头预览，画面旋转270度|
|camera.CONF_H264_QP_INIT|number|H264编码器初始化QP值|
|camera.CONF_H264_QP_I_MAX|number|H264编码器I的最大QP值|
|camera.CONF_H264_QP_P_MAX|number|H264编码器P的最大QP值|
|camera.CONF_H264_IMB_BITS|number|H264编码器IMB_BITS值|
|camera.CONF_H264_PMB_BITS|number|H264编码器PMB_BITS值|
|camera.CONF_H264_PFRAME_NUMS|number|H264编码器P帧数量|
|camera.CONF_H264_APPLY|number|立即应用H264编码器设置|
|camera.CONF_PREVIEW_ENABLE|number|是否启动摄像头预览功能，默认开启|
|camera.CONF_PREVIEW_ROTATE|number|摄像头预览画面的旋转角度|
|camera.CONF_UVC_FPS|number|设置USB摄像头的帧率|
|camera.CONF_LOG_LEVEL|number|设置摄像头日志级别|
|camera.CONF_UVC_FORMAT|number|USB摄像头数据流类型|
|camera.CONF_UVC_RESOLUTION|number|USB摄像头的数据流中具体数据信息，包括图像大小和帧率|
|camera.FORMAT_RAW|number|USB摄像头数据流类型无压缩原始图像|
|camera.FORMAT_MJPG|number|USB摄像头的数据流类型mjpg|
|camera.FORMAT_H264|number|USB摄像头的数据流类型H264|


## camera.init(InitReg_or_cspi_id, cspi_speed, mode, is_msb, rx_bit, seq_type, is_ddr, only_y, scan_mode, w, h)

初始化摄像头

**参数**

|传入值类型|解释|
|-|-|
|table/integer|如果是table,则是DVP摄像头的配置见demo/camera/dvp_camera,同时忽略后续参数;如果是数字,则是camera spi总线序号|
|int|camera spi总线速度|
|int|camera spi模式,0~3|
|int|字节的bit顺序是否是msb,0否1是|
|int|同时接收bit数,1,2,4|
|int|byte序列,0~1|
|int|双边沿采样配置,0不启用,其他值根据实际SOC决定|
|int|只接收Y分量，0不启用，1启用，扫码必须启用，否则会失败|
|int|工作模式，camera.AUTO自动,camera.SCAN扫码|
|int|摄像头宽度|
|int|摄像头高度|

**返回值**

|返回值类型|解释|
|-|-|
|int/false|成功返回camera_id，失败返回false|

**例子**

```lua
camera_id = camera.init(GC032A_InitReg)--屏幕输出rgb图像
--初始化后需要start才开始输出/扫码
camera.start(camera_id)--开始指定的camera

```

---

## camera.on(id, event, func)

注册摄像头事件回调

**参数**

|传入值类型|解释|
|-|-|
|int|camera id, camera 0写0, camera 1写1|
|string|事件名称|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
camera.on(0, "scanned", function(id, event)
--id int camera id
--event 多种类型，详见下表
    print(id, event)
end)
camera.on(0, "usb_raw", function(app_id, event, param) -- 2026/4/6新增
--app_id int usb应用id
--event 多种类型，详见下表
--param 返回参数
    print(app_id, event)
end)
--[[

事件名称填 "scanned" 情况下, event可能出现的值有
  boolean型 false   摄像头没有正常工作，检查硬件和软件配置
  boolean型 true    拍照模式下拍照成功并保存完成，可以读取照片文件数据进一步处理，比如读出数据上传
  int型 原始图像大小 RAW模式下，采集完一帧图像后回调，回调值为图像数据大小，可以对传入的zbuff做进一步处理，比如读出数据上传
  string型  扫码结果 扫码模式下扫码成功一次，并且回调解码值，可以对回调值做进一步处理，比如打印到LCD上
事件名称填 "usb_raw" 情况下, event和param可能出现的值
  usb.EV_NEW_RX     接收到新的一帧数据，param为zbuff序号，0~2，如果只设置了2个，就是0~1
  usb.EV_RX_ERR     接收数据发生错误
  usb.EV_CONNECT    摄像头接入完成，param为hub port序号，1~15
  usb.EV_DISCONNECT 摄像头拔出，param为hub port序号，1~15
]]

```

---

## camera.start(id)

开始指定的camera

**参数**

|传入值类型|解释|
|-|-|
|int|camera id,例如0|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
camera.start(0)

```

---

## camera.stop(id)

停止指定的camera

**参数**

|传入值类型|解释|
|-|-|
|int|camera id,例如0|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
camera.stop(0)

```

---

## camera.close(id)

关闭指定的camera，释放相应的IO资源

**参数**

|传入值类型|解释|
|-|-|
|int|camera id,例如0|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
camera.close(0)

```

---

## camera.capture(id, save_path, quality, x, y, w, h)

camera拍照

**参数**

|传入值类型|解释|
|-|-|
|int|camera id,例如0|
|string/zbuff/nil|save_path,文件保存路径，空则写在上次路径里，默认是/capture.jpg，如果是zbuff，则将图片保存在buff内不写入文件系统|
|int|quality, jpeg压缩质量, 见下面的使用说明|
|int|x, 裁剪起始横坐标，从x列开始|
|int|y, 裁剪起始纵坐标，从y行开始|
|int|w, 裁剪后的宽度|
|int|h, 裁剪后的高度|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false,真正完成后通过camera.on设置的回调函数回调接收到的长度|

**例子**

```lua
-- 保存到文件,质量为80
camera.capture(0, "/capture.jpg", 80)
-- 保存到内存文件系统
camera.capture(0, "/ram/123.jpg", 80)

-- 保存到zbuff,质量为80
camera.capture(0, buff, 80)

-- jpeg压缩质量,请使用 50 - 95 之间的数值
-- 为保持兼容性, 质量值1/2/3, 分别对应 90/95/99

```

---

## camera.video(id, w, h, out_path)

camera输出视频流到USB，即将废弃，不要使用

**参数**

|传入值类型|解释|
|-|-|
|int|camera id,例如0|
|int|宽度|
|int|高度|
|int|输出路径，目前只能用虚拟串口0|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
camera.video(0, 320, 240, uart.VUART_0)

```

---

## camera.startRaw(id, w, h, buff)

启动camera输出原始数据到用户的zbuff缓存区，输出1fps后会停止，并通过camera.on设置的回调函数回调接收到的长度，如果需要再次输出，请调用camera.getRaw

**参数**

|传入值类型|解释|
|-|-|
|int|camera id,例如0|
|int|宽度|
|int|高度|
|zbuff|用于存放数据的缓存区，大小必须不小于w X h X 2 byte|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
camera.startRaw(0, 320, 240, buff)

```

---

## camera.getRaw(id)

再次启动camera输出原始数据到用户的zbuff缓存区，输出1fps后会停止，并通过camera.on设置的回调函数回调接收到的长度，如果需要再次输出，请继续调用本API

**参数**

|传入值类型|解释|
|-|-|
|int|camera id,例如0|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
camera.getRaw(0)

```

---

## camera.preview(id, onoff)

启停camera预览功能，直接输出到LCD上，只有硬件支持的SOC可以运行，启动预览前必须调用lcd.int等api初始化LCD，预览时自动选择已经初始化过的lcd。

**参数**

|传入值类型|解释|
|-|-|
|int|camera id,例如0|
|boolean|true开启，false停止|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
camera.preview(1, true)

```

---

## camera.config(id, key, value)

配置摄像头参数

**参数**

|传入值类型|解释|
|-|-|
|int|camera id,例如0|
|int|配置项的id|
|int|配置项的值|

**返回值**

|返回值类型|解释|
|-|-|
|nil|当前无返回值|

**例子**

```lua
-- 本函数于 2025.3.17 新增, 当前仅Air8101可用
camera.config(0, camera.CONF_H264_QP_INIT, 16)
camera.config(0, camera.CONF_H264_QP_I_MAX, 16)
camera.config(0, camera.CONF_H264_QP_P_MAX, 8)
camera.config(0, camera.CONF_H264_IMB_BITS, 3)
camera.config(0, camera.CONF_H264_PMB_BITS, 1)

```

---

## camera.pwdn_pin(id, level)

对于无法用GPIO控制camera pwdn脚的平台，手动控制camera pwdn脚拉高或者拉低,2025/9/6启用

**参数**

|传入值类型|解释|
|-|-|
|int|camera id,例如0|
|int|pwdn脚电平，1高电平，0低电平|
|return|nil|

**返回值**

无

**例子**

```lua
-- camera pwdn脚低电平
camera.pwdn_pin(camera_id, 0)

```

---

## camera.reset_pin(level)

对于无法用GPIO控制camera reset脚的平台，手动控制camera reset脚拉高或者拉低,2025/9/6启用

**参数**

|传入值类型|解释|
|-|-|
|int|camera id,例如0|
|int|reset脚电平，1高电平，0低电平|
|return|nil|

**返回值**

无

**例子**

```lua
-- camera reset脚高电平
camera.reset_pin(camera_id, 1)

```

---

## camera.stream(id, app_id)

camera输出/停止数据流

**参数**

|传入值类型|解释|
|-|-|
|id|camera id|
|app_id|如果是usb摄像头，则输入usb应用id，其他留空|
|int|跳帧，针对USB摄像头，跳过N帧后上报，一般情况正常传输是30fps，如果脚本处理不过来，可以跳过N帧上报，默认是0，即不跳|
|int|图像数据最小长度，针对USB摄像头ISO传输可能漏数据的情况，只有大于最小长度的图像帧会上报，默认是10KB|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
=
camera.stream(camera.USB, app_id)

```

---

## camera.cache(id, app_id, buff0, buff1, buff2)

配置camera输出数据流到用户指定的zbuff缓存区，需要输入2~3个zbuff，并通过camera.on设置的回调函数返回具体哪一个zbuff有数据 2026/4/5启用

**参数**

|传入值类型|解释|
|-|-|
|id|camera id|
|app_id|如果是usb摄像头，则输入usb应用id，其他留空|
|userdata|zbuff0|
|userdata|zbuff1|
|userdata|zbuff2|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
buff0 = zbuff.create(1024*768*2)
buff1 = zbuff.create(1024*768*2)
buff2 = zbuff.create(1024*768*2)    --可以去掉，最少需要2个缓存
camera.cache(camera.USB, app_id, buff0, buff1, buff2)

```

---

## camera.get_usb_config(app_id, key, param1, param2)

获取USB摄像头图像参数，根据不同的配置项的id和参数值组合，有不同的返回值组合

**参数**

|传入值类型|解释|
|-|-|
|int|app_id usb应用id|
|int|配置项的id，目前只有camera.CONF_UVC_FORMAT,camera.CONF_UVC_RESOLUTION|
|int|参数1|
|int|参数2|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|int|value1|
|int|value2|
|int|value3|

**例子**

```lua
-- 本函数于 2026.4.5 新增, 当前仅Air1601可用
--配置项的id和参数值组合，及返回如下，第一个返回值固定是成功、失败，不再表述，从第二个返回值开始描述
--1、查询USB摄像头数据流有多少种类型
--通常返回1~3, value2和value3是nil
result,value1 = camera.get_usb_config(id, camera.CONF_UVC_FORMAT)
--2、查询USB摄像头某种数据流有多少种图像类型，param1在1~组合1的返回值里选
--通常返回数据流类型(0 原始图像，1 mjpg，2 h264), 图像类型数量1~12, value3是nil
result,value1,value2 = camera.get_usb_config(id, camera.CONF_UVC_FORMAT, 1)    --数据流1的数据流类型，及包含的图像类型数量
--3、查询USB摄像头某种数据流下某种图像类型的具体参数，param1选0~2(0 原始图像，1 mjpg，2 h264), param2在1~组合2的返回值图像类型数量里选
--返回值分别为帧率，图像宽，图像高
result,fps,w,h = camera.get_usb_config(id, camera.CONF_UVC_RESOLUTION, 1, 3)    --数据流1第4种图像类型的具体值
-- 打印所有支持的数据类型
local res, format_num, format_index, frame_num, frame_index, type, fps, w, h
res, format_num= camera.get_usb_config(camera_id, camera.CONF_UVC_FORMAT)
log.info("总共有", format_num, "种数据流格式")
for format_index = 1, format_num, 1 do
    res, type, frame_num = camera.get_usb_config(camera_id, camera.CONF_UVC_FORMAT, format_index)
    log.info("数据流序号", format_index, "数据流格式", type, "总共有", frame_num, "图像格式")
    for frame_index = 1, frame_num, 1 do
        res, fps, w, h = camera.get_usb_config(camera_id, camera.CONF_UVC_RESOLUTION, format_index, frame_index)
        log.info("图像格式序号", frame_index, "图像格式", type, "帧率", fps, "图像宽度", w, "图像高度", h)
    end
end

```

---

## camera.set_usb_config(app_id, key, param1, param2)

配置USB摄像头图像参数，根据不同的配置项的id和参数值组合，有不同的设置效果

**参数**

|传入值类型|解释|
|-|-|
|int|app_id usb应用id|
|int|配置项的id，目前只有camera.CONF_UVC_RESOLUTION|
|int|参数1|
|int|参数2|
|int|参数3|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
-- 本函数于 2026.4.5 新增, 当前仅Air1601可用
--配置项的id和参数值组合如下
--1、设置USB摄像头使用的数据流和图像类型序号
result = camera.set_usb_config(id, camera.CONF_UVC_RESOLUTION, 1, 5)--配置USB摄像头使用数据流1下第6种图像类型
--2、设置USB摄像头使用的数据流类型，宽度，高度。注意，如果摄像头不支持，则启动会失败，建议先用get_usb_config查询一下
result = camera.set_usb_config(id, camera.CONF_UVC_RESOLUTION, camera.FORMAT_MJPG, 1024, 768)--配置USB摄像头使用mjpg方式，宽度1024，高度768

```

---

