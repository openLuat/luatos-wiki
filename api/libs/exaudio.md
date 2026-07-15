# exaudio - exaudio扩展库

**示例**

```lua

-- 版本更新说明
-- 版本号：202607141800
-- 1、更新时间：2026-07-14 18:00
--    新增codec_voltage参数控制ES8311电平
--    codec_voltage=1(默认3.3V)，codec_voltage=0(1.8V，适配Air8201等特殊板型)
-- 版本号：202607081647
-- 1、更新时间：2026-07-08 16:47
--    移除exaudio.shutdown()，统一合并到exaudio.pm()中
--    exaudio.pm()新增新音频框架支持
--    新增exaudio.make_probe_id()函数，用于合成音频驱动ID
--    新增Air700/Air1780系列模组检测
-- 版本号：202607021200
-- 1、更新时间：2026-07-02 12:00
-- 2、更新内容
--    新增exaudio.version()接口
--    支持exaudio库文件版本号管理功能，版本号的格式为：yyyymmddhhmm，表示yyyy年mm月dd日hh时mm分发布的版本

```

## exaudio.parse_audio_info(file_path, codec_id)

@description 从音频文件解析播放信息（采样率、位宽、声道数等）

**参数**

|传入值类型|解释|
|-|-|
|string|file_path 音频文件路径|
|number|codec_id 编解码器ID (0=PCM, 1=WAV, 2=AMR_NB, 3=AMR_WB, 5=MP3)|

**返回值**

|返回值类型|解释|
|-|-|
|table|成功返回包含音频信息的table，失败返回nil|

**例子**

```lua
local info = exaudio.parse_audio_info("/luadb/test.mp3", 5)
if info then
    log.info("采样率:", info.sample_rate)
    log.info("位宽:", info.data_bits)
    log.info("声道数:", info.channel_nums)
end
注意：此函数仅在audio_v2模式下可用

```

---

