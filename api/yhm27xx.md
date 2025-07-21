# yhm27xx - yhm27xx充电芯片

**示例**

```lua
-- 请查阅demo/yhm27xx

```

## yhm27xx.cmd(pin, chip_id, reg, data)

单总线命令读写YHM27XX

**参数**

|传入值类型|解释|
|-|-|
|int|gpio端口号|
|int|芯片ID|
|int|寄存器地址|
|int|要写入的数据，如果没填，则表示从寄存器读取数据|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|
|int|读取成功返回寄存器值，写入成功无返回|

**例子**

```lua
while 1 do
    sys.wait(1000)
    local result, data = yhm27xx.cmd(15, 0x04, 0x05)
    log.info("yhm27xx", result, data)
end

```

---

## yhm27xx.reqinfo(pin, chip_id)

获取最新的寄存器信息(异步)

**参数**

|传入值类型|解释|
|-|-|
|int|gpio端口号|
|int|芯片ID|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua

sys.subscribe("YHM27XX_REG", function(data)
  -- 注意, 会一次性读出0-9,总共8个寄存器值
  log.info("yhm27xx", data and data:toHex())
end)
yhm27xx.reqinfo(24, 0x04)

```

---

