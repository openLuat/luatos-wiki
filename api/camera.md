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
|camera.ROTATE_270|number|摄像头预览，画面旋转270度|
|camera.CONF_H264_QP_INIT|number|H264编码器初始化QP值|
|camera.CONF_H264_QP_I_MAX|number|H264编码器I的最大QP值|
|camera.CONF_H264_QP_P_MAX|number|H264编码器P的最大QP值|
|camera.CONF_H264_IMB_BITS|number|H264编码器IMB_BITS值|
|camera.CONF_H264_PMB_BITS|number|H264编码器PMB_BITS值|
|camera.CONF_PREVIEW_ENABLE|number|是否启动摄像头预览功能，默认开启|
|camera.CONF_PREVIEW_ROTATE|number|摄像头预览画面的旋转角度|


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
--[[
event可能出现的值有
  boolean型 false   摄像头没有正常工作，检查硬件和软件配置
  boolean型 true    拍照模式下拍照成功并保存完成，可以读取照片文件数据进一步处理，比如读出数据上传
  int型 原始图像大小 RAW模式下，采集完一帧图像后回调，回调值为图像数据大小，可以对传入的zbuff做进一步处理，比如读出数据上传
  string型  扫码结果 扫码模式下扫码成功一次，并且回调解码值，可以对回调值做进一步处理，比如打印到LCD上
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

camera输出视频流到USB

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

## camera.pwdn_pin(level)

对于无法用GPIO控制camera pwdn脚的平台，手动控制camera pwdn脚拉高或者拉低,2025/9/6启用

**参数**

|传入值类型|解释|
|-|-|
|int|camera id,例如0|
|int|pwdn脚电平，1高电平，0低电平|

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

**返回值**

无

**例子**

```lua
-- camera reset脚高电平
camera.reset_pin(camera_id, 1)

```

---

