# i2s - 数字音频

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_i2s.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## i2s.setup(id, mode, sample, bitw, channel, format, mclk)

初始化i2s

**参数**

|传入值类型|解释|
|-|-|
|int|i2s通道号,与具体设备有关|
|int|模式, 当前仅支持0, MASTER\|TX\|RX 模式, 暂不支持slave. 可选|
|int|采样率,默认44100. 可选|
|int|声道, 0 左声道, 1 右声道, 2 双声道. 可选|
|int|格式, 当前仅支持i2s标准格式. 可选|
|int|mclk频率, 默认 8M. 可选|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功与否|

**例子**

无

---

## i2s.send(id, data, len)

发送i2s数据

**参数**

|传入值类型|解释|
|-|-|
|int|通道id|
|string|数据, 可以是字符串或zbuff|
|int|数据长度,单位字节, 字符串默认为字符串全长, zbuff默认为指针位置|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功与否|
|int|底层返回值,供调试用|

**例子**

```lua
local f = io.open("/luadb/abc.wav")
while 1 do
    local data = f:read(4096)
    if not data or #data == 0 then
        break
    end
    i2s.send(0, data)
    sys.wait(100)
end

```

---

## i2s.close(id, data, len)

关闭i2s功能

**参数**

|传入值类型|解释|
|-|-|
|int|通道id|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

