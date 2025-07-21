# lcdseg - 段式lcd

## 常量

|常量|类型|解释|
|-|-|-|
|lcdseg.BIAS_STATIC|number|没偏置电压(bias)|
|lcdseg.BIAS_ONEHALF|number|1/2偏置电压(bias)|
|lcdseg.BIAS_ONETHIRD|number|1/3偏置电压(bias)|
|lcdseg.BIAS_ONEFOURTH|number|1/4偏置电压(bias)|
|lcdseg.DUTY_STATIC|number|100%占空比(duty)|
|lcdseg.DUTY_ONEHALF|number|1/2占空比(duty)|
|lcdseg.DUTY_ONETHIRD|number|1/3占空比(duty)|
|lcdseg.DUTY_ONEFOURTH|number|1/4占空比(duty)|
|lcdseg.DUTY_ONEFIFTH|number|1/5占空比(duty)|
|lcdseg.DUTY_ONESIXTH|number|1/6占空比(duty)|
|lcdseg.DUTY_ONESEVENTH|number|1/7占空比(duty)|
|lcdseg.DUTY_ONEEIGHTH|number|1/8占空比(duty)|


## lcdseg.setup(bias, duty, vlcd, com_number, fresh_rate, com_mark, seg_mark)

初始化lcdseg库

**参数**

|传入值类型|解释|
|-|-|
|int|bias值,通常为 1/3 bias, 对应 lcdseg.BIAS_ONETHIRD|
|int|duty值,通常为 1/4 duty, 对应 lcdseg.DUTY_ONEFOURTH|
|int|电压, 单位100mV, 例如2.7v写27. air103支持的值有 27/29/31/33|
|int|COM脚的数量, 取决于具体模块, air103支持1-4|
|int|刷新率,通常为60, 对应60HZ|
|int|COM启用与否的掩码, 默认为0xFF,全部启用.若只启用COM0/COM1, 则0x03|
|int|seg启用与否的掩码, 默认为0xFFFFFFFF,即全部启用. 若只启用前16个, 0xFFFF|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
-- 初始化lcdseg
if lcdseg.setup(lcdseg.BIAS_ONETHIRD, lcdseg.DUTY_ONEFOURTH, 33, 4, 60) then
    lcdseg.enable(1)

    lcdseg.seg_set(0, 1, 1)
    lcdseg.seg_set(2, 0, 1)
    lcdseg.seg_set(3, 31, 1)
end

```

---

## lcdseg.enable(en)

启用或禁用lcdseg库

**参数**

|传入值类型|解释|
|-|-|
|int|1启用,0禁用|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|

**例子**

无

---

## lcdseg.power(en)

启用或禁用lcdseg的输出

**参数**

|传入值类型|解释|
|-|-|
|int|1启用,0禁用|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|

**例子**

无

---

## lcdseg.seg_set(com, seg, en)

设置具体一个段码的状态

**参数**

|传入值类型|解释|
|-|-|
|int|COM号|
|int|seg号 要更改的字段的位索引|
|int|1启用,0禁用|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|

**例子**

无

---

