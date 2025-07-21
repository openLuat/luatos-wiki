# ymodem - ymodem协议

**示例**

```lua
-- 本库的用途是接收数据, 若需要发送文件, 建议用xmodem库
local handler = ymodem.create("/")
uart.setup(1, 115200)
uart.on(1, "receive", function(id, len)
    while 1 do
        local data = uart.read(id, 512)
        if not data or #data == 0 then
            break
        end
        ymodem.receive(handler, data)
    end
end)

```

## ymodem.create(dir_path,file_path)

创建一个ymodem处理句柄

**参数**

|传入值类型|解释|
|-|-|
|string|保存的文件夹路径，默认是"/"|
|string|强制保存的绝对文件路径，默认是空，如果设置了，就会直接保存在该文件中|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功true, 失败false|

**例子**

```lua
local handler = ymodem.create("/")

```

---

## ymodem.receive(handler, data)

ymodem接收文件数据并保存

**参数**

|传入值类型|解释|
|-|-|
|userdata|ymodem处理句柄|
|zbuff/string|输入的数据|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功true，失败false|
|int|ack值，需要通过串口/网络等途径返回发送方|
|int|flag值，需要通过串口/网络等途径返回发送方，如果有ack值则不发送flag|
|boolean,|一个文件接收完成true，传输中false|
|boolean,|整个传输完成true 否则false|

**例子**

```lua
-- 注意, 数据来源不限, 通常是uart.read得到data
no_error,ack,flag,file_done,all_done = ymodem.receive(handler, data)

```

---

## ymodem.reset(handler)

重置ymodem处理过程

**参数**

|传入值类型|解释|
|-|-|
|userdata|ymodem处理句柄|

**返回值**

无

**例子**

```lua
-- 恢复到初始状态，一般用于接收出错后重置，从而进行下一次接收
ymodem.reset(handler)

```

---

## ymodem.release(handler)

释放ymodem处理句柄

**参数**

|传入值类型|解释|
|-|-|
|userdata|handler|

**返回值**

无

**例子**

```lua
ymodem.release(handler)

```

---

