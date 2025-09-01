# codec - 多媒体-编解码

## 常量

|常量|类型|解释|
|-|-|-|
|codec.MP3|number|MP3格式|
|codec.WAV|number|WAV格式|
|codec.AMR|number|AMR-NB格式，一般意义上的AMR|
|codec.AMR_WB|number|AMR-WB格式|
|codec.VDDA_3V3|number|codec 电压: 3.3V|
|codec.VDDA_1V8|number|codec 电压: 1.8V|
|codec.ULAW|number|G711 μ-law格式|
|codec.ALAW|number|G711 A-law格式|


## codec.create(type, isDecoder, quality)

创建编解码用的codec

**参数**

|传入值类型|解释|
|-|-|
|int|多媒体类型，目前支持codec.MP3 codec.AMR|
|boolean|是否是解码器，true解码器，false编码器，默认true，是解码器|
|int|编码等级，部分bsp有内部编解码器，可能需要提前输入编解码等级，不知道的就填7|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|成功返回一个数据结构,否则返回nil|

**例子**

```lua
-- 创建解码器
local decoder = codec.create(codec.MP3)--创建一个mp3的decoder
-- 创建编码器
local encoder = codec.create(codec.AMR, false)--创建一个amr的encoder
-- 创建编码器
local encoder = codec.create(codec.AMR_WB, false, 8)--创建一个amr-wb的encoder，编码等级默认8

```

---

## codec.info(decoder, file_path)

decoder从文件中解析出音频信息

**参数**

|传入值类型|解释|
|-|-|
|userdata|解码用的decoder|
|string|文件路径|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功解析|
|int|音频格式|
|int|声音通道数|
|int|采样频率|
|int|采样位数|
|boolean|是否有符号|

**例子**

```lua
local result, audio_format, num_channels, sample_rate, bits_per_sample, is_signed= codec.info(coder, "xxx")

```

---

## codec.data(decoder, out_buff)

decoder从文件中解析出原始音频数据，比如从MP3文件里解析出PCM数据，这里的文件路径已经在codec.info传入，不需要再次传入

**参数**

|传入值类型|解释|
|-|-|
|userdata|解码用的decoder|
|zbuff|存放输出数据的zbuff，空间必须不少于16KB|
|int|最少解码出多少字节的音频数据,默认16384|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功解析|

**例子**

```lua
-- 大内存设备
local buff = zbuff.create(16*1024)
local result = codec.data(coder, buff)
-- 小内存设备
local buff = zbuff.create(8*1024)
local result = codec.data(coder, buff, 4096)

```

---

## codec.encode(coder, in_buffer, out_buffer, mode)

编码音频数据，由于flash和ram空间一般比较有限，除了部分bsp有内部amr编码功能，目前只支持amr-nb编码

**参数**

|传入值类型|解释|
|-|-|
|userdata|codec.create创建的编解码用的coder|
|zbuff|输入的数据,zbuff形式,从0到used|
|zbuff|输出的数据,zbuff形式,自动添加到buff的尾部,如果空间大小不足,会自动扩展,但是会额外消耗时间,甚至会失败,所以尽量一开始就给足空间|
|int|amr_nb的编码等级 0~7(即 MR475~MR122)值越大消耗的空间越多,音质越高,默认0 amr_wb的编码等级 0~8,值越大消耗的空间越多,音质越高,默认0|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|

**例子**

```lua
codec.encode(amr_coder, inbuf, outbuf, codec.AMR_)

```

---

## codec.release(coder)

释放编解码用的coder

**参数**

|传入值类型|解释|
|-|-|
|coder|codec.create创建的编解码用的coder|

**返回值**

无

**例子**

```lua
codec.release(coder)

```

---

