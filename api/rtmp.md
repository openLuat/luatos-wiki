# rtmp - RTMP 直播推流

**示例**

```lua
-- RTMP推流示例
local rtmp = rtmp.create("rtmp://example.com:1935/live/stream")
rtmp:setCallback(function(state, ...)
    if state == rtmp.STATE_CONNECTED then
        print("已连接到推流服务器")
    elseif state == rtmp.STATE_PUBLISHING then
        print("已开始推流")
    elseif state == rtmp.STATE_ERROR then
        print("出错:", ...)
    end
end)
rtmp:connect()

-- 开始处理
rtmp:start()

-- 30秒后停止
sys.wait(30000)
rtmp:stop()

-- 断开连接
rtmp:disconnect()
rtmp:destroy()

```

## rtmp.create(url)

创建RTMP推流上下文

**参数**

|传入值类型|解释|
|-|-|
|string|url RTMP服务器地址, 格式: rtmp://host:port/app/stream|

**返回值**

|返回值类型|解释|
|-|-|
|userdata|RTMP上下文对象|

**例子**

```lua
local rtmp = rtmp.create("rtmp://example.com:1935/live/stream")

```

---

## rtmp:setCallback(func)

设置RTMP状态回调函数

**参数**

|传入值类型|解释|
|-|-|
|function|func 回调函数, 参数为 (state, ...) |

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
rtmp:setCallback(function(state, ...)
    if state == rtmp.STATE_IDLE then
        print("空闲状态")
    elseif state == rtmp.STATE_CONNECTING then
        print("正在连接")
    elseif state == rtmp.STATE_HANDSHAKING then
        print("握手中")
    elseif state == rtmp.STATE_CONNECTED then
        print("已连接")
    elseif state == rtmp.STATE_PUBLISHING then
        print("推流中")
    elseif state == rtmp.STATE_DISCONNECTING then
        print("正在断开")
    elseif state == rtmp.STATE_ERROR then
        print("错误:", ...)
    end
end)

```

---

## rtmp:connect()

连接到RTMP服务器

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true, 失败返回false|

**例子**

```lua
local ok = rtmp:connect()
if ok then
    print("连接请求已发送")
else
    print("连接失败")
end

```

---

## rtmp:disconnect()

断开RTMP连接

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true, 失败返回false|

**例子**

```lua
rtmp:disconnect()

```

---

## rtmp:start()

处理RTMP事件

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
rtmp:start()

```

---

## rtmp:getState()

获取RTMP连接状态

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|当前状态值|

**例子**

```lua
local state = rtmp:getState()
if state == rtmp.STATE_CONNECTED then
    print("已连接")
elseif state == rtmp.STATE_PUBLISHING then
    print("正在推流")
end

```

---

## rtmp:getStats()

获取RTMP统计信息

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|统计信息表|

**例子**

```lua
local stats = rtmp:getStats()
print("已发送字节数:", stats.bytes_sent)
print("已发送视频帧数:", stats.video_frames_sent)
print("已发送音频帧数:", stats.audio_frames_sent)

```

---

## rtmp:destroy()

销毁RTMP上下文，释放所有资源

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
rtmp:destroy()

```

---

