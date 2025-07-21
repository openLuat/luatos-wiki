# xmodem - xmodem 驱动

**示例**

```lua
--注意:因使用了sys.wait()所有api需要在协程中使用
-- 用法实例
local xmodem = require "xmodem"
sys.taskInit(function()
    xmodem.send(2,115200,"/luadb/test.bin")
    while 1 do
        sys.wait(1000)
    end
end)

```

## xmodem.send(uart_id, uart_br, file_path,type)

xmodem 发送文件

**参数**

|传入值类型|解释|
|-|-|
|number|uart_id uart端口号|
|number|uart_br uart波特率|
|string|file_path 文件路径|
|bool|type 1k/128 默认1k|

**返回值**

|返回值类型|解释|
|-|-|
|bool|发送结果|

**例子**

```lua
xmodem.send(2,115200,"/luadb/test.bin")

```

---

## xmodem.close(uart_id)

关闭xmodem

**参数**

|传入值类型|解释|
|-|-|
|number|uart_id uart端口号|

**返回值**

无

**例子**

```lua
-- 执行xmodem传输后, 无论是否传输成功, 都建议关闭xmodem上下文, 也会关闭uart
xmodem.close(2)

```

---

