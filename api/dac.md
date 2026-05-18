# dac - 数模转换

## 常量

|常量|类型|解释|
|-|-|-|
|dac.HOST|number|USB主机模式|


## dac.open(ch, freq, bits, dac_chl)

打开DAC通道,并配置参数

**参数**

|传入值类型|解释|
|-|-|
|int|通道编号,例如0|
|int|输出频率,单位hz|
|int|深度,默认为16|
|int|通道选择,默认为0, 0:左声道, 1:右声道, 2:左右声道|

**返回值**

|返回值类型|解释|
|-|-|
|true|成功返回true,否则返回false|
|int|底层返回值,调试用|

**例子**

```lua
if dac.open(0, 44000, 16, 0) then
    log.info("dac", "dac ch0 is opened")
end


```

---

## dac.prepare(ch, buff)

对波形数据预处理，一般是将音频的有符号数据转成DAC需要的无符号数据

**参数**

|传入值类型|解释|
|-|-|
|int|通道编号,例如0|
|zbuff|输出波形数据，输出长度为zbuff:used()|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true 成功返回true,否则返回false|

**例子**

无

---

## dac.write(ch, data)

从指定DAC通道输出一段波形,或者单个值

**参数**

|传入值类型|解释|
|-|-|
|int|通道编号,例如0|
|int/string/zbuff|若输出固定值,可以填数值, 若输出波形,填string或者zbuff, 如果填zbuff, 输出长度为zbuff:used()|
|boolean|是否循环输出波形，true循环，false单次输出，留空是false，如果输出固定值，本参数无效|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true 成功返回true,否则返回false|
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

## dac.on(func)

注册全局DAC事件回调

**参数**

|传入值类型|解释|
|-|-|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
dac.on(function(ch, event, param)
    log.info("dac", ch, event, param)
end)
--回调参数有3个
1、ch
2、event
3、param,
event类型含义及后续param含义
1、dac.TX_DONE 发送完成，param为总长度


```

---

