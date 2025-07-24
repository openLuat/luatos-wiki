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
|airtalk.PROTOCOL_DEMO_MQTT_8K|number|演示用MQTT协议，音频采样率8K|
|airtalk.PROTOCOL_DEMO_MQTT_16K|number|演示用MQTT协议，音频采样率16K|
|airtalk.EVENT_OFF_LINE|number|airtalk离线|
|airtalk.EVENT_ON_LINE_IDLE|number|airtalk在线处于空闲状态|
|airtalk.EVENT_PLAY_START|number|airtalk下行播放开始|
|airtalk.EVENT_PLAY_END|number|airtalk下行播放结束|
|airtalk.EVENT_RECORD_START|number|airtalk录音上行开始|
|airtalk.EVENT_RECORD_END|number|airtalk录音上行结束|
|airtalk.EVENT_AUDIO_START|number|airtalk audio启动，只要上行和下行有一个开始就启动|
|airtalk.EVENT_AUDIO_END|number|airtalk audio停止，上行和下行都结束才停止|
|airtalk.EVENT_ERROR|number|airtalk发生异常，后续param为异常值|


## airtalk.config(protocol,netc,cache_time,encode_cnt,decode_cnt,audio_pm_mode_when_stop)

配置airtalk参数

**参数**

|传入值类型|解释|
|-|-|
|int|协议类型，见airtalk.PROTOCOL_XXX|
|userdata|network_ctrl或者mqtt客户端，如果协议是mqtt类型，传入mqtt.create返回值，如果是其他类型，传入socket.create的返回值|
|int|缓冲时间，单位ms，默认500ms，值越小，delay越小，抗网络波动能力越差|
|int|单次编码帧数，默认值5，不能低于2，不能高于5|
|int|单次解码帧数，如果缓冲没有足够的帧数，自动补0，默认值5，不能低于2，不能高于10，不能低于encode_cnt, decode_cnt * 4 必须是 encode_cnt的整数倍|
|int|对讲停止后，audio的pm状态，默认是audio.SHUTDOWN|
|return|nil|

**返回值**

无

**例子**

```lua
mqttc = mqtt.create(nil,"120.55.137.106", 1884)
airtalk.config(airtalk.PROTOCOL_DEMO_MQTT_8K, mqttc)

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

```

---

## airtalk.start(uid,ctrl_url,ctrl_port)

airtalk启动

**参数**

|传入值类型|解释|
|-|-|
|string|用于确认身份的唯一id，不超过15字节，如果是演示协议，随意填写一个不重复的即可|
|string|如果协议是非MQTT类型是服务器url，如果是mqtt演示协议，则是通话topic，不填则使用默认topic|
|int|服务器端口，如果是mqtt协议，不需要填写，mqtt.create已经传入|
|return|nil|

**返回值**

无

**例子**

```lua
mqttc = mqtt.create(nil,"120.55.137.106", 1884)
airtalk.config(airtalk.PROTOCOL_DEMO_MQTT_8K, mqttc)
airtalk.on(function(event, param)
    log.info("airtalk event", event, param)
end)
--airtalk.start("123456789012345", "xxxxxx")    --用户用mqtt测试协议时，应该自己定义topic，防止被别人听
airtalk.start("123456789012345")

```

---

## airtalk.uplink(on_off)

airtalk上行控制

**参数**

|传入值类型|解释|
|-|-|
|boolean|录音上行控制，true开始，false停止|
|return|nil|

**返回值**

无

**例子**

```lua
--开始录音
airtalk.uplink(true)
--停止录音
airtalk.uplink(false)

```

---

## airtalk.debug(on_off)

airtalk的详细调试信息开关

**参数**

|传入值类型|解释|
|-|-|
|boolean|调试信息开关，true打开，false关闭|
|return|nil|

**返回值**

无

**例子**

无

---

