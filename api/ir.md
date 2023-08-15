# ir - 红外遥控

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air601` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3` {bdg-primary}`Air780E/Air700E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_ir.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看ir的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/ir)
```

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

