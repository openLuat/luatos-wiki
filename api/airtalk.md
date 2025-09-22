# airtalk - 设备之间，设备与PC、手机，对讲处理

**示例**

```lua
-- 本库仅部分BSP支持
-- 主要是 Air8000 和 Air780EXX 系列
-- 详细用法请参考demo

```

## 常量

|常量|类型|解释|
|-|-|-|
|airtalk.PROTOCOL_MQTT|number|语音数据用MQTT传输|
|airtalk.MODE_PERSON|number|对讲工作模式1对1|
|airtalk.MODE_GROUP_SPEAKER|number|对讲工作模式1对多的发起者，录音上行，不播放|
|airtalk.MODE_GROUP_LISTENER|number|对讲工作模式1对多的接收者，下行播放，不录音|
|airtalk.EVENT_OFF_LINE|number|airtalk离线|
|airtalk.EVENT_ON_LINE_IDLE|number|airtalk在线处于空闲状态|
|airtalk.EVENT_PLAY_START|number|airtalk下行播放开始|
|airtalk.EVENT_PLAY_END|number|airtalk下行播放结束|
|airtalk.EVENT_RECORD_START|number|airtalk录音上行开始|
|airtalk.EVENT_RECORD_END|number|airtalk录音上行结束|
|airtalk.EVENT_AUDIO_START|number|airtalk audio启动，只要上行和下行有一个开始就启动|
|airtalk.EVENT_AUDIO_END|number|airtalk audio停止，上行和下行都结束才停止|
|airtalk.EVENT_ERROR|number|airtalk发生异常，后续param为异常值|
|airtalk.EVENT_ERROR|number|airtalk发生异常，长时间没有收到音频数据|


## airtalk.config(protocol,netc,cache_time,encode_cnt,decode_cnt,audio_pm_mode_when_stop,no_data_to)

配置airtalk参数

**参数**

|传入值类型|解释|
|-|-|
|int|语音数据传输协议类型，见airtalk.PROTOCOL_XXX|
|userdata|network_ctrl或者mqtt客户端，如果协议是mqtt类型，传入mqtt.create返回值，如果是其他类型，传入socket.create的返回值|
|int|缓冲时间，单位ms，默认500ms，值越小，delay越小，抗网络波动能力越差|
|int|单次编码帧数，默认值5，不能低于2，不能高于5|
|int|单次解码帧数，如果缓冲没有足够的帧数，自动补0，默认值5，不能低于2，不能高于10，不能低于encode_cnt, decode_cnt * 4 必须是 encode_cnt的整数倍|
|int|对讲停止后，audio的pm状态，默认是audio.SHUTDOWN|
|int|多长时间判定对端长时间无数据发送，超过这个时间会上报event_error，用户决定接下来的操作。默认5000ms，单位ms|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
mqttc = mqtt.create(nil,"120.55.137.106", 1884)
airtalk.config(airtalk.PROTOCOL_MQTT, mqttc)

```

---

## airtalk.on(func)

注册airtalk事件回调

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
airtalk.on(function(event, param)
    log.info("airtalk event", event, param)
end)
--[[
event具体见EVENT_XXX
param说明:
目前只有EVENT_ERROR会有param值，为ERROR_XXX
]]

```

---

## airtalk.start()

airtalk启动

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
mqttc = mqtt.create(nil,"120.55.137.106", 1884)
airtalk.config(airtalk.PROTOCOL_MQTT, mqttc)
airtalk.on(function(event, param)
    log.info("airtalk event", event, param)
end)
airtalk.start()

```

---

## airtalk.set_ssrc(ssrc)

配置airtalk RTP协议中的SSRC

**参数**

|传入值类型|解释|
|-|-|
|int/string|ssrc，可以是int也是可以8字节string|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua


```

---

## airtalk.set_topic(topic)

配置airtalk mqtt类型语音数据的专用topic

**参数**

|传入值类型|解释|
|-|-|
|string|topic|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
airtalk.set_topic("xxxxxxxxxx")

```

---

## airtalk.speech(on_off, mode, sample)

airtalk对讲工作启动/停止

**参数**

|传入值类型|解释|
|-|-|
|boolean|启停控制，true开始，false停止|
|int|工作模式，见airtalk.MODE_XXX|
|int|音频采样率，目前只有8000和16000，默认16000|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
--1对1对讲开始
airtalk.speech(true,airtalk.MODE_PERSON,16000)
--作为发起方，进行1对多对讲
airtalk.speech(true,airtalk.MODE_GROUP_SPEAKER,16000)
--作为接收方，进行1对多对讲
airtalk.speech(true,airtalk.MODE_GROUP_LISTENER,16000)
--对讲停止
airtalk.speech(false)

```

---

## airtalk.debug(on_off)

airtalk的详细调试信息开关

**参数**

|传入值类型|解释|
|-|-|
|boolean|调试信息开关，true打开，false关闭|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

