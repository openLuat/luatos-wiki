# multimedia - 多媒体

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/multimedia/luat_lib_multimedia.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## audio.start(id, AudioFormat, NumChannels, SampleRate, BitsPerSample)

启动一个多媒体通道准备播放音频

**参数**

|传入值类型|解释|
|-|-|
|int|多媒体播放通道号，0或者1|
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

## audio.write(id, data)

往一个多媒体通道写入音频数据

**参数**

|传入值类型|解释|
|-|-|
|string|音频数据|

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

**返回值**

无

**例子**

无

---

## audio.on(id, event, func)

注册audio播放事件回调

**参数**

|传入值类型|解释|
|-|-|
|int|audio id, audio 0写0, audio 1写1|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
camera.on(0, function(id, str)
    print(id, str)
end)

```

---

