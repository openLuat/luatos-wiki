# lcdseg - 段式lcd

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_lcdseg.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

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
|int|seg启用与否的掩码, 默认为0xFFFF,即全部启用. 若只启用前16个, 0xFF|

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
|int|seg号|
|int|1启用,0禁用|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|

**例子**

无

---

