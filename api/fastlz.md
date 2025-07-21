# fastlz - FastLZ压缩

**示例**

```lua
-- 与miniz库的差异
-- 内存需求量小很多, miniz库接近200k, fastlz只需要32k+原始数据大小
-- 压缩比, miniz的压缩比要好于fastlz

-- 准备好数据
local bigdata = "123jfoiq4hlkfjbnasdilfhuqwo;hfashfp9qw38hrfaios;hfiuoaghfluaeisw"
-- 压缩之
local cdata = fastlz.compress(bigdata) 
-- lua 的 字符串相当于有长度的char[],可存放包括0x00的一切数据
if cdata then
    -- 检查压缩前后的数据大小
    log.info("fastlz", "before", #bigdata, "after", #cdata)
    log.info("fastlz", "cdata as hex", cdata:toHex())

    -- 解压, 得到原文
    local udata = fastlz.uncompress(cdata)
    log.info("fastlz", "udata", udata)
end

```

## fastlz.compress(data, level)

快速压缩

**参数**

|传入值类型|解释|
|-|-|
|string|待压缩的数据, 少于400字节的数据不建议压缩, 且压缩后的数据不能大于32k|
|int|压缩级别,默认1, 可选1或者2, 2的压缩比更高(有时候)|

**返回值**

|返回值类型|解释|
|-|-|
|string|若压缩成功,返回数据字符串, 否则返回nil|

**例子**

```lua
-- 注意, 压缩过程的内存消耗如下
-- 系统内存, 固定32k
-- lua内存, 原始数据的大小的1.05倍,最小占用1024字节.

```

---

## fastlz.uncompress(data, maxout)

快速解压

**参数**

|传入值类型|解释|
|-|-|
|string|待解压的数据|
|int|解压后的最大大小, 默认是4k, 可按需调整|

**返回值**

|返回值类型|解释|
|-|-|
|string|若解压成功,返回数据字符串, 否则返回nil|

**例子**

无

---

