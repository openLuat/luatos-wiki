# codec - 多媒体-编解码

{bdg-success}`已适配` {bdg-primary}`Air105` {bdg-primary}`Air780`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/multimedia/luat_lib_multimedia_codec.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看codec的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/multimedia)
```

## 常量

|常量|类型|解释|
|-|-|-|
|codec.MP3|number|MP3格式|
|codec.WAV|number|WAV格式|


## codec.create(codec.MP3)



创建编解码用的codec

**参数**

|传入值类型|解释|
|-|-|
|int|多媒体类型，目前支持decode.MP3|
|boolean|是否是编码器，默认true，是解码器|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|成功返回一个数据结构,否则返回nil|

**例子**

```lua
-- 创建decoder
local decoder = codec.create(codec.MP3)--创建一个mp3的decoder

```

---

## codec.info(decoder, file_path)



decoder从文件中解析出音频信息

**参数**

|传入值类型|解释|
|-|-|
|coder|解码用的decoder|
|string|文件路径|

**返回值**

无

**例子**

无

---

## codec.data(decoder, out_buff)



decoder从文件数据中解析出音频数据

**参数**

|传入值类型|解释|
|-|-|
|coder|解码用的decoder|
|zbuff|存放输出数据的zbuff，空间必须不少于16KB|

**返回值**

无

**例子**

无

---

## codec.release(coder)



释放编解码用的coder

**参数**

无

**返回值**

无

**例子**

无

---

