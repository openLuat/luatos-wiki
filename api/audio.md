# audio - 多媒体-音频

{bdg-success}`已适配` {bdg-primary}`Air780E/Air700E` {bdg-primary}`Air780EP` {bdg-primary}`Air601` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/multimedia/luat_lib_multimedia_audio.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看audio的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/multimedia)
```

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
|audio.MORE_DATA|number|audio.on回调函数传入参数的值，表示底层播放完一段数据，可以传入更多数据|
|audio.DONE|number|audio.on回调函数传入参数的值，表示底层播放完全部数据了|
|audio.RECORD_DATA|number|audio.on回调函数传入参数的值，表示录音数据|
|audio.RECORD_DONE|number|audio.on回调函数传入参数的值，表示录音完成|
|audio.BUS_DAC|number|硬件输出总线，DAC类型|
|audio.BUS_I2S|number|硬件输出总线，I2S类型|
|audio.BUS_SOFT_DAC|number|硬件输出总线，软件模式DAC类型|


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

## audio.record(id, record_type, record_time, amr_quailty, path)



录音

**参数**

|传入值类型|解释|
|-|-|
|int|id             多媒体播放通道号|
|int|record_type    录音音频格式,支持 audio.AMR audio.PCM (部分平台支持audio.AMR_WB)|
|int|record_time    录制时长 单位秒,可选，默认0即表示一直录制|
|int|amr_quailty    质量,audio.AMR下有效|
|string|path        录音文件路径,可选,不指定则不保存,可在audio.on回调函数中处理原始PCM数据|
|int|record_callback_time    不指定录音文件路径时，单次录音回调时长，单位是100ms。默认1，既100ms|

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
|string|or zbuff 音频数据|

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
|function|回调方法，回调时传入参数为1、int 通道ID 2、int 消息值，只有audio.MORE_DATA和audio.DONE|

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
|string/table|文件名，如果为空，则表示停止播放，如果是table，则表示连续播放多个文件，主要应用于云喇叭，目前只有EC618支持，并且会用到errStop参数|
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



获取最近一次播放结果，不是所有平台都支持的，目前只有EC618支持

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
audio.config(0, pin.PC0, 1)    --PA控制脚是PC0，高电平打开，air105用这个配置就可以用了
audio.config(0, 25, 1, 6, 200)    --PA控制脚是GPIO25，高电平打开，Air780E云喇叭板用这个配置就可以用了

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
|int|总线类型, 例如 audio.BUS_SOFT_DAC|
|int|硬件id, 例如 总线类型为audio.BUS_I2S时,硬件id即为i2s codec的i2c id|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
audio.setBus(0, audio.BUS_SOFT_DAC)    --通道0的硬件输出通道设置为软件DAC
audio.setBus(0, audio.BUS_I2S)    --通道0的硬件输出通道设置为I2S

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

