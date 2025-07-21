# dac - 数模转换

## dac.open(ch, freq, mode)

打开DAC通道,并配置参数

**参数**

|传入值类型|解释|
|-|-|
|int|通道编号,例如0|
|int|输出频率,单位hz|
|int|模式,默认为0,预留|

**返回值**

|返回值类型|解释|
|-|-|
|true|成功返回true,否则返回false|
|int|底层返回值,调试用|

**例子**

```lua
if dac.open(0, 44000) then
    log.info("dac", "dac ch0 is opened")
end


```

---

## dac.write(ch, data)

从指定DAC通道输出一段波形,或者单个值

**参数**

|传入值类型|解释|
|-|-|
|int|通道编号,例如0|
|string|若输出固定值,可以填数值, 若输出波形,填string|

**返回值**

|返回值类型|解释|
|-|-|
|true|成功返回true,否则返回false|
|int|底层返回值,调试用|

**例子**

```lua
if dac.open(0, 44000) then
    log.info("dac", "dac ch0 is opened")
    dac.write(0, string.fromHex("ABCDABCD"))
end
dac.close(0)

```

---

## dac.close(ch)

关闭DAC通道

**参数**

|传入值类型|解释|
|-|-|
|int|通道编号,例如0|

**返回值**

|返回值类型|解释|
|-|-|
|true|成功返回true,否则返回false|
|int|底层返回值,调试用|

**例子**

```lua
if dac.open(0, 44000) then
    log.info("dac", "dac ch0 is opened")
    dac.write(0, string.fromHex("ABCDABCD"))
end
dac.close(0)

```

---

