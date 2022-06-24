# C风格的结构体

## 基本信息

* 起草日期: 2022-06-24
* 设计人员: [wendal](https://github.com/wendal)

## 动机

* 处理结构化数据, 使用pack库不够直观, zbuff适合逐字节出来
* c层处理table数据相当麻烦, 很多配置信息又需要table来传

## 设计思路和边界

* 支持基础类型, 不支持嵌套类型, 不支持uion
* 支持定长数据, 仅支持一级指针

## 使用场景

### modbus 合成与解析

主机发送: `01 06 01 05 01 90 99 CB`
从机回复: `01 06 01 05 01 90 99 CB`

C结构体声明如下
```c
typedef struct modbus {
    uint8_t addr;
    uint8_t func;
    uint16_t regaddr;
    uint16_t data;
    uint16_t crc;
} modbus_t;
```

设想的lua代码, 用法A

```lua
modbus_t = zstruct.define([[
typedef struct modbus {
    uint8_t addr;
    uint8_t func;
    uint16_t regaddr;
    uint16_t data;
    uint16_t crc;
} modbus_t;
]])
local modbus = modbus_t:new()
modbus:addr = 0x01
modbus:func = 0x06
modbus:regaddr = 0x0105
modbus:data = 0x0190
modbus:crc = crypto.crc_modbus(modbus)

uart.write(1, zstruct.data(modbus))

local data = uart.read(1, zstruct.sizeof(modbus_t))
modbus_slave = modbus_t:wrap(data)
log.info("modbus", "addr", modbus_slave:addr)
log.info("modbus", "func", modbus_slave:func)
log.info("modbus", "regaddr", modbus_slave:regaddr)
log.info("modbus", "data", modbus_slave:data)
```

设想的lua代码, 用法B

```lua
-- define只需要{ } 之间的数据, 其他部分可以省略
modbus_t = zstruct.define([[
    uint8_t addr;
    uint8_t func;
    uint16_t regaddr;
    uint16_t data;
    uint16_t crc;
]])
local modbus = modbus_t:new({
    addr = 0x01,
    func = 0x06,
    regaddr = 0x0105,
    data = 0x0190
})
modbus:crc = crypto.crc_modbus(modbus)

uart.write(1, zstruct.data(modbus))

local data = uart.read(1, zstruct.sizeof(modbus_t))
modbus_slave = modbus_t:wrap(data)
log.info("modbus", modbus_slave:JSON()) -- 输出JSON格式,方便查看
```

设想代码C, 这个是方便C层的实现, 用户层依然为table

```c
int luat_struct_map(lua_State *L, int index, char* buff, const char* Define);

modbus_t modbus = {0};
// table是第一个参数, 然后所传Define为modbus_t的文本形式.
int ret = luat_struct_map(L, 1, &modbus, Define);
```

## 拟支持的数据类型

注: `_t` 后缀可选.

```c
// 有符号类
char
int8_t
int16_t
int32_t
int // 等价于int32
float

// 无符号类
uint8_t
uint16_t
uint32_t

// 指针类
char* 

// 数组, 固定长度, 可以是非指针类的基础类型
char[8]
```

## 扩展支持

* 支持默认值 `uint8 addr = 0;`
* 支持位域   `uint8 addr : 4;`
