# ir - 红外遥控

## ir.sendNEC(pin, addr, cmd, repeat, disablePWM)

发送NEC数据

**参数**

|传入值类型|解释|
|-|-|
|int|使用的GPIO引脚编号|
|int|用户码（大于0xff则采用Extended NEC模式）|
|int|数据码|
|int|可选，引导码发送次数（110ms一次），默认0次|
|bool|可选，是否禁止直接发送pwm波，默认false|

**返回值**

无

**例子**

```lua
--直接发
ir.sendNEC(0, 0x11, 0x22)
--外接了38K的PWM载波，只控制电平
ir.sendNEC(0, 0x11, 0x22,0,true)

```

---

