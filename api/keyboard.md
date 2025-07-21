# keyboard - 键盘矩阵

## keyboard.init(port, conf, map, debounce)

初始化键盘矩阵

**参数**

|传入值类型|解释|
|-|-|
|int|预留, 当前填0|
|int|启用的keyboard管脚掩码, 例如使用keyboard0~9, 则掩码为 0x1FF, 若使用 0~3 则 0xF|
|int|keyboard管脚方向映射, 其中输入为0,输出为1, 按位设置.  例如 keyboard0~3作为输入, keyboard4~7为输入, 则 0xF0|
|int|消抖配置,预留,可以不填|

**返回值**

无

**例子**

```lua
-- 做一个 4*4 键盘矩阵, 使用 keyboard0~7, 其中0~3做输入, 4~7做输出
-- 使用 keyboard0~7, 对应conf为 0xFF
-- 其中0~3做输入, 4~7做输出, 对应map 为 0xF0
keyboard.init(0, 0xFF, 0xF0)

-- 做一个 2*3 键盘矩阵, 使用 keyboard0~4, 其中0~1做输入, 2~4做输出
-- 使用 keyboard0~4, 二进制为 11111,  对应conf的十六进制表达为 0x1F
-- 其中0~1做输入, 2~4做输出, 二进制为 11100 对应map 为 0x14
-- keyboard.init(0, 0xFF, 0x14)

sys.subscribe("KB_INC", function(port, data, state)
    -- port 当前固定为0, 可以无视
    -- data, 需要配合init的map进行解析
    -- state, 1 为按下, 0 为 释放
    -- TODO 详细介绍
end)

```

---

