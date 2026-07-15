# audio - 多媒体-音频

## 常量

|常量|类型|解释|
|-|-|-|
|audio.RESUME|number|PM模式 工作模式|
|audio.STANDBY|number|PM模式 待机模式，PA断电，codec待机状态，系统不能进低功耗状态，如果PA不可控，codec进入静音模式|
|audio.SHUTDOWN|number|PM模式 关机模式，PA断电，可配置的codec关机状态，不可配置的codec断电，系统能进低功耗状态|
|audio.POWEROFF|number|PM模式 断电模式，PA断电，codec断电，系统能进低功耗状态|
|audio.PCM|number|PCM格式，即原始ADC数据|
|audio.MP3|number|MP3格式|
|audio.WAV|number|WAV格式|
|audio.AMR|number|AMR_NB格式|
|audio.AMR_NB|number|AMR_NB格式|
|audio.AMR_WB|number|AMR_WB格式|
|audio.ULAW|number|G711 ulaw格式|
|audio.ALAW|number|G711 alaw格式|
|audio.MORE_DATA|number|audio.on回调函数传入参数的值，表示底层播放完一段数据，可以传入更多数据|
|audio.DONE|number|audio.on回调函数传入参数的值，表示底层播放完全部数据了|
|audio.RECORD_DATA|number|audio.on回调函数传入参数的值，表示录音数据|
|audio.RECORD_DONE|number|audio.on回调函数传入参数的值，表示录音完成|
|audio.BUS_DAC|number|硬件输出总线，DAC类型|
|audio.BUS_I2S|number|硬件输出总线，I2S类型|
|audio.BUS_SOFT_DAC|number|硬件输出总线，软件模式DAC类型|
|audio.BUS_ADC|number|硬件输入总线，ADC类型|
|audio.VOLTAGE_1800|number|可配置的codec工作电压，1.8V|
|audio.VOLTAGE_3300|number|可配置的codec工作电压，3.3V|
|audio.RECORD_MONO|number|录音使用单声道|
|audio.RECORD_STEREO|number|录音使用立体声|
|audio.REQUEST_START|number|audio_v2.on回调函数传入消息值，表示开始处理请求块，可以传入更多数据|
|audio.REQUEST_DRIVER_START|number|audio_v2.on回调函数传入消息值，表示请求块驱动开始|
|audio.REQUEST_TTS_START|number|audio_v2.on回调函数传入消息值，表示请求块TTS开始|
|audio.REQUEST_NEED_NEW_DATA|number|audio_v2.on回调函数传入消息值，表示请求块需要新的数据，需要传入新的数据|
|audio.REQUEST_GET_NEW_DATA|number|audio_v2.on回调函数传入消息值，表示请求块获取新的数据|
|audio.REQUEST_DECODE_DONE|number|audio_v2.on回调函数传入消息值，表示请求块解码完成|
|audio.REQUEST_END|number|audio_v2.on回调函数传入消息值，表示请求块处理完成|
|audio.EXT_SRC_DONE|number|audio_v2.on回调函数传入消息值，表示外部音频源处理完成|
|audio.DRIVER_TYPE_NONE|number|驱动类型无|
|audio.DRIVER_TYPE_I2S|number|驱动类型I2S|
|audio.DRIVER_TYPE_DAC|number|驱动类型DAC|
|audio.DRIVER_TYPE_ADC|number|驱动类型ADC|
|audio.DRIVER_TYPE_USB|number|驱动类型USB声卡|
|audio.DATA_CODEC_TYPE_RAW|number|编解码器类型RAW, 用于直接播放PCM数据流|
|audio.DATA_CODEC_TYPE_WAV|number|编解码器类型WAV|
|audio.DATA_CODEC_TYPE_AMR_NB|number|编解码器类型AMR_NB|
|audio.DATA_CODEC_TYPE_AMR_WB|number|编解码器类型AMR_WB       |
|audio.DATA_CODEC_TYPE_TTS|number|编解码器类型TTS|
|audio.DATA_CODEC_TYPE_MP3|number|编解码器类型MP3|
|audio.DATA_CODEC_TYPE_OPUS|number|编解码器类型OPUS|
|audio.DATA_CODEC_TYPE_G711_ULAW|number|编解码器类型G711_ULAW|
|audio.DATA_CODEC_TYPE_G711_ALAW|number|编解码器类型G711_ALAW|
|audio.DATA_CODEC_TYPE_HW|number|编解码器类型-硬件编解码器优先模式|
|audio.DSP_TYPE_SPEEXDSP|number|dsp类型speexdsp|
|audio.CONFIG_PARAM_I2S_MODE|number|驱动私有参数的I2S模式|
|audio.CONFIG_PARAM_I2S_FRAME_BITS|number|驱动私有参数的I2S帧位宽，需要和外部codec匹配|
|audio.CONFIG_PARAM_I2S_CHANNEL_TYPE|number|驱动私有参数的I2S通道类型，需要和外部codec匹配|
|audio.CONFIG_PARAM_DAC_BIT_WIDTH|number|驱动私有参数的DAC位宽|
|audio.CONFIG_VALUE_I2S_MODE_I2S|number|驱动私有参数的I2S模式可选值，I2S标准模式|
|audio.CONFIG_VALUE_I2S_MODE_LSB|number|驱动私有参数的I2S模式可选值，LSB|
|audio.CONFIG_VALUE_I2S_MODE_MSB|number|驱动私有参数的I2S模式可选值，MSB|
|audio.CONFIG_VALUE_I2S_MODE_PCMS|number|驱动私有参数的I2S模式可选值，PCMS|
|audio.CONFIG_VALUE_I2S_MODE_PCML|number|驱动私有参数的I2S模式可选值，PCML|
|audio.CONFIG_VALUE_I2S_CHANNEL_TYPE_LEFT|number|驱动私有参数的I2S通道类型可选值，左声道|
|audio.CONFIG_VALUE_I2S_CHANNEL_TYPE_RIGHT|number|驱动私有参数的I2S通道类型可选值，右声道|
|audio.CONFIG_VALUE_I2S_CHANNEL_TYPE_STEREO|number|驱动私有参数的I2S通道类型可选值，立体声|
|audio.DRIVER_PARAM_TX_MAX_LEN|number|驱动放音单个buffer最大长度|
|audio.DRIVER_PARAM_RX_MAX_LEN|number|驱动录音单个buffer最大长度|
|audio.DATA_CODEC_PARAM_ENCODE_INPUT_LEN|number|编码1帧需要的输入数据长度|


## audio.start(id, audio_format, num_channels, sample_rate, bits_per_sample, is_signed)

启动一个多媒体通道准备播放音频

**参数**

|传入值类型|解释|
|-|-|
|int|多媒体播放通道号|
|int|音频格式|
|int|声音通道数|
|int|采样频率|
|int|采样位数|
|boolean|是否有符号，默认true|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功true, 失败false|

**例子**

```lua
audio.start(0, audio.PCM, 1, 16000, 16)

```

---

## audio.record(id, record_type, record_time, amr_quailty, path, record_callback_time, buff0, buff1,channelCount)

录音

**参数**

|传入值类型|解释|
|-|-|
|int|id             多媒体播放通道号|
|int|record_type    录音音频格式,支持 audio.AMR audio.PCM (部分平台支持audio.AMR_WB),或者直接输入采样率|
|int|record_time    录制时长 单位秒,可选，默认0即表示一直录制|
|int|amr_quailty    质量,audio.AMR下有效|
|string|path        录音文件路径,可选,不指定则不保存,可在audio.on回调函数中处理原始PCM数据|
|int|record_callback_time    不指定录音文件路径时，单次录音回调时长，单位是100ms。默认1，既100ms|
|zbuff|录音原始PCM数据缓存0,不填写录音文件路径才会用到|
|zbuff|录音原始PCM数据缓存1,不填写录音文件路径才会用到|
|channelCount|声道数量,只针对非I2S设备有效,1单声道录音 2立体声录音 默认单声道.I2S设备在I2S相关API里配置|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
err,info = audio.record(id, type, record_time, quailty, path)

```

---

## audio.recordStop(id)

录音停止

**参数**

|传入值类型|解释|
|-|-|
|int|id         多媒体播放通道号|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
audio.recordStop(0)

```

---

## audio.write(id, data)

往一个多媒体通道写入音频数据

**参数**

|传入值类型|解释|
|-|-|
|string/zbuff|音频数据|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
audio.write(0, "xxxxxx")

```

---

## audio.stop(id)

停止指定的多媒体通道

**参数**

|传入值类型|解释|
|-|-|
|int|audio id,例如0|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
audio.stop(0)

```

---

## audio.finish(id)

写入最后一块数据后，通知多媒体通道已经没有更多数据需要播放了

**参数**

|传入值类型|解释|
|-|-|
|int|audio id,例如0|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
audio.finish(0)

```

---

## audio.pause(id, pause)

暂停/恢复指定的多媒体通道

**参数**

|传入值类型|解释|
|-|-|
|int|audio id,例如0|
|boolean|onoff true 暂停，false 恢复|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
audio.pause(0, true) --暂停通道0
audio.pause(0, false) --恢复通道0

```

---

## audio.on(audio_id, func)

注册audio播放事件回调

**参数**

|传入值类型|解释|
|-|-|
|int|audio id, audio 0写0, audio 1写1|
|function|回调方法，回调时传入参数为1、int 通道ID 2、int 消息值，有audio.MORE_DATA,audio.DONE,audio.RECORD_DATA,audio.RECORD_DONE,3、RECORD_DATA后面跟数据存在哪个zbuff内，0或者1|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
audio.on(0, function(audio_id, msg)
    log.info("msg", audio_id, msg)
end)

```

---

## audio.play(id, path, errStop)

播放或者停止播放一个文件，播放完成后，会回调一个audio.DONE消息，可以用pause来暂停或者恢复，其他API不可用。考虑到读SD卡速度比较慢而拖累luavm进程的速度，所以尽量使用本API

**参数**

|传入值类型|解释|
|-|-|
|int|音频通道|
|string/table|文件名，如果为空，则表示停止播放，如果是table，则表示连续播放多个文件，主要应用于云喇叭，目前只有Air780EXXX支持，并且会用到errStop参数|
|boolean|是否在文件解码失败后停止解码，只有在连续播放多个文件时才有用，默认true，遇到解码错误自动停止|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
audio.play(0, "xxxxxx")        --开始播放某个文件
audio.play(0)                --停止播放某个文件

```

---

## audio.tts(id, data)

TTS播放或者停止

**参数**

|传入值类型|解释|
|-|-|
|int|音频通道|
|string/zbuff|需要播放的内容|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

无

---

## audio.playStop(id)

停止播放文件，和audio.play(id)是一样的作用

**参数**

|传入值类型|解释|
|-|-|
|int|audio id,例如0|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
audio.playStop(0)

```

---

## audio.isEnd(id)

检查当前文件是否已经播放结束

**参数**

|传入值类型|解释|
|-|-|
|int|音频通道|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
audio.isEnd(0)


```

---

## audio.getError(id)

获取最近一次播放结果，不是所有平台都支持的，目前只有Air780EXXX支持

**参数**

|传入值类型|解释|
|-|-|
|int|音频通道|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否全部播放成功，true成功，false有文件播放失败|
|boolean|如果播放失败，是否是用户停止，true是，false不是|
|int|第几个文件失败了，从1开始|

**例子**

```lua
local result, user_stop, file_no = audio.getError(0)

```

---

## audio.config(id, paPin, onLevel, dacDelay, paDelay, dacPin, dacLevel, dacTimeDelay)

配置一个音频通道的特性，比如实现自动控制PA开关。注意这个不是必须的，一般在调用play的时候才需要自动控制，其他情况比如你手动控制播放时，就可以自己控制PA开关

**参数**

|传入值类型|解释|
|-|-|
|int|音频通道|
|int|PA控制IO|
|int|PA打开时的电平|
|int|在DAC启动前插入的冗余时间，单位100ms，一般用于外部DAC|
|int|在DAC启动后，延迟多长时间打开PA，单位1ms|
|int|外部dac电源控制IO，如果不填，则表示使用平台默认IO，比如Air780E使用DACEN脚，air105则不启用|
|int|外部dac打开时，电源控制IO的电平，默认拉高|
|int|音频播放完毕时，PA与DAC关闭的时间间隔，单位1ms，默认0ms|

**返回值**

无

**例子**

```lua
--下面的配置是Air780E云喇叭板的配置
audio.config(0, 25, 1, 6, 200)    --PA控制脚是GPIO25，高电平打开

```

---

## audio.vol(id, value)

配置一个音频通道的音量调节，直接将原始数据放大或者缩小，不是所有平台都支持，建议尽量用硬件方法去缩放

**参数**

|传入值类型|解释|
|-|-|
|int|音频通道|
|int|音量，百分比，1%~1000%，默认100%，就是不调节|

**返回值**

|返回值类型|解释|
|-|-|
|int|当前音量|

**例子**

```lua
local result = audio.vol(0, 90)    --通道0的音量调节到90%，result存放了调节后的音量水平，有可能仍然是100

```

---

## audio.micVol(id, value)

配置一个音频通道的mic音量调节

**参数**

|传入值类型|解释|
|-|-|
|int|音频通道|
|int|mic音量，百分比，1%~100%，默认100%，就是不调节|

**返回值**

|返回值类型|解释|
|-|-|
|int|当前mic音量|

**例子**

```lua
local result = audio.vol(0, 90)    --通道0的音量调节到90%，result存放了调节后的音量水平，有可能仍然是100

```

---

## audio.setBus(id, bus_type)

配置一个音频通道的硬件输出总线，只有对应soc软硬件平台支持才设置对应类型

**参数**

|传入值类型|解释|
|-|-|
|int|音频通道,例如0|
|int|总线类型, 例如 audio.BUS_SOFT_DAC, audio.BUS_I2S|
|table|codec配置参数, 当总线类型为audio.BUS_I2S时生效,table中包括以下字段: <br>chip codec型号,当前支持"es8311"<br>i2cid codec的硬件i2c id<br>i2sid codec的硬件i2s id<br>voltage i2cid codec的电压,可选 codec.VDDA_3V3 codec.VDDA_1V8|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
audio.setBus(0, audio.BUS_SOFT_DAC)    --通道0的硬件输出通道设置为软件DAC
audio.setBus(0, audio.BUS_I2S,{chip="es8311",i2cid=0,i2sid=0,voltage=codec.VDDA_3V3})    --通道0的硬件输出通道设置为I2S
audio.setBus(0, audio.BUS_DAC,{dacid=0})    --通道0的硬件输出通道设置为DAC
audio.setBus(0, audio.BUS_ADC,{adcid=0, adc_chl=audio.CHL_L, sample_rate=audio.SAMP_16000, bits=audio.BITS_16}) --通道0的输入为板载ADC

```

---

## audio.debug(on_off)

配置调试信息输出

**参数**

|传入值类型|解释|
|-|-|
|boolean|true开 false关|

**返回值**

无

**例子**

无

---

## audio.pm(id,pm_mode)

audio 休眠控制(一般会自动调用不需要手动执行)

**参数**

|传入值类型|解释|
|-|-|
|int|音频通道|
|int|休眠模式 |

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true成功|

**例子**

```lua
audio.pm(multimedia_id,audio.RESUME)

```

---

## audio_v2.play(path, err_stop, priority, driver_probe_id, codec_id)

播放N个文件。考虑到读SD卡速度比较慢而拖累luavm进程的速度，所以尽量使用本API

**参数**

|传入值类型|解释|
|-|-|
|string/table/zbuff|如果是string，则表示文件名，如果是table，则表示连续播放多个文件，如果是zbuff，则表示播放zbuff中的数据|
|boolean|是否在文件解码失败后停止解码，只有在连续播放多个文件时才有用，默认true，遇到解码错误自动停止|
|int|优先级，0~255，值越大，优先级越高，默认0|
|int|驱动id，在不使用默认驱动时填写，绝大部分情况下都不需要填写。驱动id需要通过audio.make_probe_id合成|
|int|解码器id，在需要指定解码器时填写，绝大部分情况下都不需要填写，见audio_v2.DATA_CODEC_TYPE_XXX|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|int|request_index 请求索引，用于后续操作，如暂停、恢复，回调信息判断等|

**例子**

```lua
audio_v2.play("xxxxxx")        --开始播放某个文件

```

---

## audio_v2.tts(text, priority, driver_probe_id)

播放tts语音

**参数**

|传入值类型|解释|
|-|-|
|string/zbuff|需要播放的内容|
|int|优先级，0~255，值越大，优先级越高，默认0|
|int|驱动id，在不使用默认驱动时填写，绝大部分情况下都不需要填写。驱动id需要通过audio.make_probe_id合成|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|int|request_index 请求索引，用于后续操作，如暂停、恢复，回调信息判断等|

**例子**

```lua
audio_v2.tts("xxxxxx")        --开始播放某个文本

```

---

## audio_v2.stream(codec_id, sample_rate, data_bits, channel_nums, is_signed, priority, driver_probe_id)

流模式播放，需要提前指定解码器和音频参数

**参数**

|传入值类型|解释|
|-|-|
|int|解码器id，见audio_v2.DATA_CODEC_TYPE_XXX，不能留空|
|int|采样率，不能留空|
|int|数据位数，8,16,24,32，不能留空|
|int|通道数，1,2，不能留空|
|boolean|是否有符号数据，默认true|
|int|优先级，0~255，值越大，优先级越高，默认0|
|int|驱动id，在不使用默认驱动时填写，绝大部分情况下都不需要填写。驱动id需要通过audio.make_probe_id合成|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|int|request_index 请求索引，用于后续操作，如暂停、恢复，回调信息判断等|

**例子**

```lua
audio_v2.stream(audio_v2.DATA_CODEC_TYPE_RAW, 16000, 16, 2, true, 0, nil) --播放16000Hz, 16bit, 2ch, 有符号的PCM数据流

```

---

## audio_v2.get_play_info(data, codec_id, pos)

获取播放信息

**参数**

|传入值类型|解释|
|-|-|
|string/zbuff|输入数据|
|int|解码器id，见audio_v2.DATA_CODEC_TYPE_XXX，不能留空|
|int|当前输入数据在整个文件的位置，单位字节|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|无错误返回true,否则返回false, 返回true还需要看后续音频数据中采样率是否为0，不为0则说明获取成功了|
|int|需要跳转到的新位置，单位字节，如果获取成功了，则跳转的位置为音频数据的真正起始位置，需要seek这个位置|
|int|需要获取的数据长度，单位字节，如果本次没有获取到有效信息，但是也没有返回false，说明还需要更多数据才能判断|
|int|采样率，如果为0，则说明没有获取到有效信息|
|int|数据位数，8,16,24,32|
|int|通道数，1,2|
|boolean|是否有符号数据，默认true|

**例子**

```lua
local no_error, next_pos, need_len, sample_rate, data_bits, channel_nums, is_signed = audio_v2.get_play_info(data, codec_id, pos)

```

---

## audio_v2.input(request_or_source_index, data, is_end)

流模式播放输入数据

**参数**

|传入值类型|解释|
|-|-|
|int|request_or_source_index 请求索引或外部源索引，通过audio_v2.stream或者audio_v2.extern_source返回的索引|
|string/zbuff|输入数据，如果为空，则不输入任何数据|
|boolean|是否是最后一帧数据，默认false|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|int|实际写入的长度，如果数据为空或者写入失败，则返回0，单位字节。如果数据是zbuff形式，写入成功后会自动删除zbuff中的数据|
|int|输入缓冲的剩余空间，单位字节|

**例子**

```lua
local result, write_len, free_len = audio_v2.input(request_index, data, is_end)

```

---

## audio_v2.record(codec_id, save_buffer, record_callback_cnt, priority, sample_rate, data_bits, channel_nums, driver_probe_id)

录音请求，包括2种模式，1. 保存到文件，2. 保存到buffer并回调给用户

**参数**

|传入值类型|解释|
|-|-|
|string/zbuff|保存路径，string为保存成文件，zbuff为保存到buffer并回调给用户|
|int|如果是保存文件，则为整体录音时间，单位秒，时间到后自动停止录音。如果是保存到buffer，则为每次回调的帧数，每一帧时间由编码器决定|
|int|编码器id，见audio_v2.DATA_CODEC_TYPE_XXX，如果留空，则直接返回原始PCM数据。如果不留空，会检查sample_rate和data_bits是否符合解码器的要求|
|int|优先级，0~255，值越大，优先级越高，默认0|
|int|希望的采样率，如果指定了codec_id，则可以留空，由编码器自己决定|
|int|希望的数据位数，8,16,24,32，如果指定了codec_id，则可以留空，由编码器自己决定|
|int|希望的通道数，1,2，如果指定了codec_id，则可以留空，由编码器自己决定|
|int|驱动id，在不使用默认驱动时填写，绝大部分情况下都不需要填写。驱动id需要通过audio.make_probe_id合成|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|int|request_index 请求索引，用于后续操作，如暂停、恢复，回调信息判断等|

**例子**

```lua
-- 录音到buffer并回调给用户，编码器为AMR_WB，优先级为0，每10帧回调一次
local result, request_index = audio_v2.record(save_buffer, 10, audio_v2.DATA_CODEC_TYPE_AMR_WB)
-- 录音到文件，编码器为AMR_WB，优先级为0，录音10秒结束
local result, request_index = audio_v2.record("/save.amr", 10, audio_v2.DATA_CODEC_TYPE_AMR_WB)

```

---

## audio_v2.make_head(record_codec_id, total_len, sample_rate, data_bits, channel_nums)

* @brief 生成音频文件的头信息

**参数**

|传入值类型|解释|
|-|-|
|int|record_codec_id 录音编码器id，见audio_v2.DATA_CODEC_TYPE_XXX，绝对不可以留空|
|int|total_len 总数据长度，单位字节|
|int|sample_rate 编码器的采样率，如果是固定采样率的编码器，可以留空，由编码器自己决定|
|int|data_bits 编码器的数据位数，8,16,24,32，如果是固定数据位数的编码器，可以留空，由编码器自己决定|
|int|channel_nums 编码器的通道数，1,2，如果是固定通道数的编码器，可以留空，由编码器自己决定|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|string|头信息,如果失败，返回NIL|

**例子**

无

---

## audio_v2.speech(record_codec_id, save_buffer, record_callback_cnt, play_codec_id,one_play_block_len, sample_rate, data_bits, channel_nums, driver_probe_id, dsp_type)

全双工模式，可用于对讲

**参数**

|传入值类型|解释|
|-|-|
|int|录音编码器id，见audio_v2.DATA_CODEC_TYPE_XXX，如果留空，则直接返回原始PCM数据。如果不留空，会检查sample_rate和data_bits是否符合解码器的要求|
|zbuff|录音数据回调时保存的buffer|
|int|每次录音回调的帧数，每一帧时间由编码器决定|
|int|播放解码器id，见audio_v2.DATA_CODEC_TYPE_XXX，如果留空，则和录音编码器相同|
|int|希望的采样率，如果指定了codec_id，则可以留空，由编码器自己决定|
|int|希望的数据位数，8,16,24,32，如果指定了codec_id，则可以留空，由编码器自己决定|
|int|希望的通道数，1,2，如果指定了codec_id，则可以留空，由编码器自己决定|
|int|驱动id，在不使用默认驱动时填写，绝大部分情况下都不需要填写。驱动id需要通过audio.make_probe_id合成|
|int|dsp类型，见audio_v2.DSP_TYPE_XXX，如果留空，则由BSP决定具体使用哪个dsp类型|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|int|request_index 请求索引，用于后续操作，如暂停、恢复，回调信息判断等|

**例子**

```lua
-- 双工对讲模式，编码器为AMR_WB，每10帧回调一次
local result, request_index = audio_v2.speech(audio_v2.DATA_CODEC_TYPE_AMR_WB, save_buffer, 10)

```

---

## audio_v2.extern_source(request_index, source, is_add_record,codec_id, sample_rate, data_bits, channel_nums, is_signed)

对讲中附加额外的音频数据，额外音频的参数必须和对讲的参数一致，否则会失败而没有任何作用

**参数**

|传入值类型|解释|
|-|-|
|int|request_index 请求索引，通过audio_v2.speech返回的|
|table/string/zbuff|输入数据，table表示播放文件，string表示播放tts，zbuff表示播放音频数据，如果只播放一个文件也要用table|
|boolean|是否添加到录音通道，false添加到播放通道，true添加到录音通道，默认false|
|boolean|是否在文件解码失败后停止解码，只有在连续播放多个文件时才有用，默认true，遇到解码错误自动停止|
|int|解码器id，见audio_v2.DATA_CODEC_TYPE_XXX，如果留空则通过输入数据自行判断|
|int|采样率，如果指定解码器是RAW，不能留空|
|int|数据位数，8,16,24,32，如果指定解码器是RAW，不能留空|
|int|通道数，1,2，如果指定解码器是RAW，不能留空|
|boolean|是否有符号数据，默认true|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|int|外部音频源索引，用于后续操作，如停止播放|

**例子**

```lua
local result, request_index = audio_v2.speech(audio_v2.DATA_CODEC_TYPE_AMR_WB, save_buffer, 10)
audio_v2.extern_source(request_index, {"/test_16k.mp3"})

```

---

## audio_v2.stop(request_index)

停止指定的音频请求

**参数**

|传入值类型|解释|
|-|-|
|int|request_index 请求索引，通过audio_v2.play_files，audio_v2.stream，audio_v2.speech，audio_v2.record, audio_v2.tts或者audio_v2.extern_source返回|
|return|nil|

**返回值**

无

**例子**

```lua
local result, index = audio_v2.play("xxxxxx")
audio_v2.stop(index)

```

---

## audio_v2.shutdown(driver_power_off, codec_power_off, pa_power_off, driver_probe_id)

关闭音频驱动

**参数**

|传入值类型|解释|
|-|-|
|boolean|driver_power_off 是否关闭驱动，true关闭驱动，false不关闭驱动|
|boolean|codec_power_off 是否关闭外部codec，true关闭外部codec，false不关闭外部codec|
|boolean|pa_power_off 是否关闭pa，true关闭pa，false不关闭pa|
|int|驱动id，在不使用默认驱动时填写，绝大部分情况下都不需要填写。驱动id需要通过audio.make_probe_id合成|
|return|nil|

**返回值**

无

**例子**

```lua
audio_v2.shutdown(true, true, true)
@usage

```

---

## audio_v2.pause(request_index, pause)

暂停播放文件或者tts对应的音频通道

**参数**

|传入值类型|解释|
|-|-|
|int|request_index 请求索引，通过audio.play_files或audio.tts返回|
|boolean|pause 是否暂停，默认false|
|return|nil|

**返回值**

无

**例子**

```lua
audio_v2.pause(request_index, true)

```

---

## audio_v2.is_all_done()

判断所有请求是否完成

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|所有请求是否完成|

**例子**

```lua
is_all_done = audio_v2.is_all_done()

```

---

## audio_v2.soft_volume(volume, driver_probe_id)

设置软件音量增益，0~1000，值越大，音量越高，默认100，1000就是10倍音量

**参数**

|传入值类型|解释|
|-|-|
|int|volume 软件音量增益，0~1000，值越大，音量越高，默认100|
|int|driver_probe_id 驱动id，在不使用默认驱动时填写，绝大部分情况下都不需要填写。驱动id需要通过audio.make_probe_id合成|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
audio_v2.soft_volume(75)

```

---

## audio_v2.make_probe_id(tx_bus_type, tx_bus_id, rx_bus_type, rx_bus_id)

合成音频驱动id

**参数**

|传入值类型|解释|
|-|-|
|int|tx_bus_type 发送总线类型，见DRIVER_TYPE_xxx常量|
|int|tx_bus_id 发送总线id，见DRIVER_TYPE_xxx常量|
|int|rx_bus_type 接收总线类型，见DRIVER_TYPE_xxx常量|
|int|rx_bus_id 接收总线id，见DRIVER_TYPE_xxx常量|

**返回值**

|返回值类型|解释|
|-|-|
|int|驱动id|

**例子**

```lua
probe_id = audio_v2.make_probe_id(audio_v2.DRIVER_TYPE_I2S, 0, audio_v2.DRIVER_TYPE_I2S, 0) --i2s0双工
probe_id = audio_v2.make_probe_id(audio_v2.DRIVER_TYPE_DAC, 0, audio_v2.DRIVER_TYPE_NONE, 0) --dac0单工

```

---

## audio_v2.set_default_driver(driver_probe_id)

设置默认音频驱动

**参数**

|传入值类型|解释|
|-|-|
|int|driver_probe_id 驱动id，驱动id需要通过audio.make_probe_id合成|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
local driver_probe_id = audio_v2.make_probe_id(LUAT_AUDIO_DRIVER_TYPE_I2S, 0, LUAT_AUDIO_DRIVER_TYPE_I2S, 0) 
audio_v2.set_default_driver(driver_probe_id)
driver_probe_id = audio_v2.make_probe_id(LUAT_AUDIO_DRIVER_TYPE_DAC, 0, LUAT_AUDIO_DRIVER_TYPE_NONE, 0) --dac0单工
audio_v2.set_default_driver(driver_probe_id)

```

---

## audio_v2.get_driver_info()

获取音频驱动数量和默认音频驱动索引

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|all_nums 所有音频驱动数量|
|int|default_driver_index 默认音频驱动索引，从0开始|

**例子**

```lua
local all_nums, default_driver_index = audio_v2.get_driver_info()
log.info(all_nums, default_driver_index)

```

---

## audio_v2.get_driver_id(index)

获取音频驱动id

**参数**

|传入值类型|解释|
|-|-|
|int|index 驱动索引，从0开始|

**返回值**

|返回值类型|解释|
|-|-|
|int|驱动id|

**例子**

```lua
-- 打印出默认音频驱动信息
local all_nums, default_driver_index = audio_v2.get_driver_info()
local driver_probe_id = audio_v2.get_driver_id(default_driver_index)
log.info(audio_v2.print_probe_id(driver_probe_id, true))

```

---

## audio_v2.get_driver_param(driver_probe_id, param)

获取音频驱动参数

**参数**

|传入值类型|解释|
|-|-|
|int|driver_probe_id 驱动id，驱动id需要通过audio.make_probe_id合成，留空就获取默认音频驱动参数|
|int|param 驱动参数，见DRIVER_PARAM_xxx常量|

**返回值**

|返回值类型|解释|
|-|-|
|int|驱动参数值|

**例子**

```lua
local result = audio_v2.get_driver_param(driver_probe_id, audio_v2.DRIVER_PARAM_RX_MAX_LEN)
log.info(result)

```

---

## audio_v2.print_probe_id(driver_probe_id, is_string)

分解音频驱动id，并返回详细信息

**参数**

|传入值类型|解释|
|-|-|
|int|driver_probe_id 驱动id，驱动id需要通过audio.make_probe_id合成|
|boolean|is_string 是否返回字符串，true返回字符串，false返回常量|

**返回值**

|返回值类型|解释|
|-|-|
|any|tx_bus_type 发送总线类型，见DRIVER_TYPE_xxx常量。is_string为true时，返回字符串，否则返回常量类型名称|
|any|tx_bus_id 发送总线id|
|any|rx_bus_type 接收总线类型，见DRIVER_TYPE_xxx常量。is_string为true时，返回字符串，否则返回常量类型名称|
|any|rx_bus_id 接收总线id|

**例子**

```lua
local tx_bus_type, tx_bus_id, rx_bus_type, rx_bus_id = audio_v2.print_probe_id(probe_id, true)
log.info(tx_bus_type, tx_bus_id, rx_bus_type, rx_bus_id)

```

---

## audio_v2.config(config_param, config_value1, config_value2, driver_probe_id)

配置音频驱动的私有参数，采样率和数据位宽是通用参数，不能在这里配置

**参数**

|传入值类型|解释|
|-|-|
|int|config_param 驱动私有参数索引，见audio_v2.CFG_PARAM_xxx常量|
|int|config_value1 驱动私有参数值1，见audio_v2.CFG_VALUE_xxx常量或者直接填写数值|
|int|config_value2 驱动私有参数值2，见audio_v2.CFG_VALUE_xxx常量或者直接填写数值，通常情况下只需要1个参数，不需要填写config_value2|
|int|driver_probe_id 驱动id，在不使用默认驱动时填写，绝大部分情况下都不需要填写。驱动id需要通过audio.make_probe_id合成|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
audio_v2.config(audio_v2.CFG_PARAM_I2S_MODE, audio_v2.CFG_VALUE_I2S_MODE_LSB)
audio_v2.config(audio_v2.CFG_PARAM_I2S_FRAME_BITS, 16)
audio_v2.config(audio_v2.CFG_PARAM_I2S_CHANNEL_TYPE, audio_v2.CFG_VALUE_I2S_CHANNEL_TYPE_RIGHT)

```

---

## audio_v2.config_pa_power_ctrl(pa_power_ctrl_enable, pa_power_pin, pa_power_on_level, pa_power_on_delay_time_ms, driver_probe_id)

配置音频驱动的pa电源控制

**参数**

|传入值类型|解释|
|-|-|
|boolean|pa_power_ctrl_enable 是否使能pa电源控制|
|int|pa_power_pin pa电源引脚|
|int|pa_power_on_level pa电源电平，1表示高电平，0表示低电平|
|int|pa_power_on_delay_time_ms pa电源开启延时时间，单位毫秒|
|int|driver_probe_id 驱动id，在不使用默认驱动时填写，绝大部分情况下都不需要填写。驱动id需要通过audio.make_probe_id合成|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
audio_v2.config_pa_power_ctrl(true, 12, 1, 100)

```

---

## audio_v2.config_codec_power_ctrl(codec_power_ctrl_enable, codec_power_pin, codec_power_on_level, codec_ready_after_wakeup_time_ms, codec_power_off_delay_time_ms, driver_probe_id)

配置音频驱动的codec电源控制

**参数**

|传入值类型|解释|
|-|-|
|boolean|codec_power_ctrl_enable 是否使能codec电源控制|
|int|codec_power_pin codec电源引脚|
|int|codec_power_on_level codec电源电平，1表示高电平，0表示低电平|
|int|codec_ready_after_wakeup_time_ms codec电源开启延时时间，单位毫秒|
|int|codec_power_off_delay_time_ms codec电源关闭延时时间，单位毫秒|
|int|driver_probe_id 驱动id，在不使用默认驱动时填写，绝大部分情况下都不需要填写。驱动id需要通过audio.make_probe_id合成|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

```lua
audio_v2.config_codec_power_ctrl(true, 11, 1, 200, 10)

```

---

## audio_v2.get_codec_param(id,param)

获取编解码器的参数

**参数**

|传入值类型|解释|
|-|-|
|int|id 编解码器id|
|int|param 编解码器参数，见audio_v2.DATA_CODEC_PARAM_xxx常量|

**返回值**

|返回值类型|解释|
|-|-|
|int|codec参数值|

**例子**

```lua
local len = audio_v2.get_codec_param(audio_v2.DATA_CODEC_PARAM_ENCODE_INPUT_LEN)    --获取编码1帧需要的输入数据长度

```

---

## audio_v2.on(func)

注册audio事件回调

**参数**

|传入值类型|解释|
|-|-|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
audio_v2.on(function(request_index, event, param)
    log.info(request_index, event, param)
end)
--回调函数参数说明
---@param int 请求索引
---@param int 事件类型, 见audio_v2.REQUEST_xxx常量
---@param int 附加参数, 根据事件类型不同, 有不同的含义, 有如下组合
event和param可能出现的值
  audio_v2.REQUEST_START     开始处理请求, param无意义
  audio_v2.REQUEST_NEED_NEW_DATA     需要新的数据, param无意义
  audio_v2.REQUEST_GET_NEW_DATA     获取到新数据, param为本次回调获取到的驱动数据大小
  audio_v2.REQUEST_DECODE_DONE         请求处理完成, param无意义
  audio_v2.REQUEST_END     请求块处理完成, param无意义

```

---

## audio_v2.is_busy(request_index)

判断请求块是否正在处理

**参数**

|传入值类型|解释|
|-|-|
|int|request_index 请求索引|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否正在处理|

**例子**

```lua
local is_busy = audio_v2.is_busy(1)    --判断请求块1是否正在处理

```

---

## audio_v2.debug(on_off)@boolean true开 false关

配置调试信息输出

**参数**

无

**返回值**

无

**例子**

无

---

