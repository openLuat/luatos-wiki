# softkb - 软件键盘矩阵

## softkb.init(port, key_in, key_out)

初始化软件键盘矩阵

**参数**

|传入值类型|解释|
|-|-|
|int|预留, 当前填0|
|table|矩阵输入按键表|
|table|矩阵输出按键表|

**返回值**

无

**例子**

```lua
    key_in = {pin.PD10,pin.PE00,pin.PE01,pin.PE02}
    key_out = {pin.PD12,pin.PD13,pin.PD14,pin.PD15}
    softkb.init(0,key_in,key_out)

sys.subscribe("SOFT_KB_INC", function(port, data, state)
    -- port 当前固定为0, 可以无视
    -- data, 需要配合init的map进行解析
    -- state, 1 为按下, 0 为 释放
    -- TODO 详细介绍
end)

```

---

## softkb.deinit(port)

删除软件键盘矩阵

**参数**

|传入值类型|解释|
|-|-|
|int|预留, 当前填0|

**返回值**

无

**例子**

```lua
    softkb.deinit(0)

```

---

