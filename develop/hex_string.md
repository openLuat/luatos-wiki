# 详解lua的string与hex数据(十六进制)

在lua中处理 string 与 hex(十六进制数) 的思维转换

## 背景

LuatOS在处理通信的时候,总会涉及到数据处理,例如:

```lua
socket:send(data)
socket:recv(1024)
spi.send(data)
spi.recv(16)
uart.write(1, data)
```

这些方法要么发送的string,要么返回string, 而不是使用其他编程语言的byte[]/char[], 因为lua没有byte和char

## 什么是hex

先看hex的表现形式

```
字符串"1" 的 ASCII码是 0x31
字符串"2" 的 ASCII码是 0x32

0x3132         -- 数值标识
"3132"         -- hex字符串,这个给人看的HEX字符串
"12"           -- 与0x3132等价一个lua string
{0x31, 0x32}   -- lua数组(table)
[0x31, 0x32]   -- java/c/c++的byte[]/char[]
```

## 数据转换

把0x3132写入uart, socket/spi都是同理
```lua
// 方法1, 使用string.char, 逐个字节描述
local data = string.char(0x31, 0x32)
uart.write(id, data)

// 方法2, 使用 string.fromHex, 传入2的倍数长度的hex字符串
local data = string.fromHex("3132")
uart.write(id, data)

// 方法3, 使用pack库, H代表2字节符号数, I代表4字节无符号数, wiki可查
local data = pack.pack("H", 0x3132)
uart.write(id, data)
```

将socket读取的数据转换为数值, uart/spi均同理
```lua
local re, data = socket:recv(1000) -- 等待1秒
-- 注意, data是lua string, 内容是 "12", 对应hex值 [0x31,0x32]
-- lua string不是数组不是table,不能直接下标读取
打印其hex字符串形式
local hexStr, len = string.toHex(data) -- 返回值"3132",2,后面的2是长度
print(hexStr) -- 将输出 3132

--- 方式1,使用pack.unpack
-- 分解为2个数, b是无符号单字节数,2代表数量
local nexti, numa, numb = pack.unpack(data, "b2")
print(numa) -- 数字 31
print(numb) -- 数字 32
直接取第二个数, 位置写2
local nexti, numb = pack.unpack(data,"b",2)
print(numb) -- 数字 32

-- 方式2,使用string.byte
local numa = string.byte(data, 1)
local numb = string.byte(data, 2)
print(numa) -- 数字 31
print(numb) -- 数字 32
```

## 方法汇总

* string.byte 相当于 data[i-1]
* string.char 相当于 data = {a, b, c, d}
* pack.pack 数据打包
* pack.unpack 数据解包
* zbuff库, 类C数组操作
