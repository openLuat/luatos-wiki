# usb - usb操作库

**示例**

```lua
--[[
--简单举例
--从机功能
pm.power(pm.USB, false)        --确保USB外设是掉电状态
--usb.vid(0, 0x1234)        --配置VID,不是必须的
--usb.pid(0, 0x5678)        --配置PID,不是必须的
usb.clear_all_class(0)                --清除掉之前配置的设备类
usb.mode(0, usb.DEVICE)        --usb设置成从机模式
usb.add_class(0, usb.CDC_ACM, 1)    --使用1个CDC-ACM虚拟串口功能
pm.power(pm.USB, true)        --USB上电初始化开始工作

--主机功能
pm.power(pm.USB, false)        --确保USB外设是掉电状态
usb.mode(0, usb.HOST)        --usb设置成主机模式
pm.power(pm.USB, true)        --USB上电初始化开始工作
--说明
目前设备类只有usb.HID可以通过usb操作库api和对端通讯,usb.CDC-ACM虚拟串口直接使用uart api
]]

```

## 常量

|常量|类型|解释|
|-|-|-|
|usb.HOST|number|USB主机模式|
|usb.DEVICE|number|USB从机模式|
|usb.OTG|number|USB otg模式|
|usb.CDC_ACM|number|cdc_acm 虚拟串口类|
|usb.AUDIO|number|audio音频类|
|usb.CAMERA|number|摄像头类|
|usb.HID_CM|number|HID设备类，自定义类型，用于透传数据，不能和标准键盘同时使用|
|usb.HID_KB|number|HID设备类，标准键盘，常见扫码枪，不能和自定义类型同时使用|
|usb.MSC|number|大容量存储类，也就是U盘，TF卡|
|usb.EV_NEW_RX|number|有新的数据到来|
|usb.EV_TX_DONE|number|所有数据都已发送|
|usb.EV_CONNECT|number|usb从机已经连接上并且枚举成功|
|usb.EV_DISCONNECT|number|usb从机断开|
|usb.EV_RX_ERROR|number|有新的数据到来|
|usb.EV_TX_ERROR|number|所有数据都已发送|
|usb.EV_SUSPEND|number|usb从机挂起|
|usb.EV_RESUME|number|usb从机恢复|
|usb.EV_ERR_STOP|number|usb从机遇到故障停止工作了，可以调用usb.reset_device来尝试恢复|


## usb.tx(id, data, app_id)

USB发送数据,目前仅限于HID设备,CDC-ACM虚拟串口直接使用串口API操作,暂时无法使用

**参数**

|传入值类型|解释|
|-|-|
|int|usb总线id,默认0,如果芯片只有1条USB线,填0|
|zbuff|or string 需要发送的数据|
|int|设备应用id|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false,总线id填错,所填设备类不支持直接发送数据等情况下返回错误|

**例子**

```lua
-- HID上传数据
usb.tx(0, "1234", 1) -- usb hid上传0x31 0x32 0x33 0x34  + N个0

```

---

## usb.rx(id, buff, app_id)

buff形式读接收到的数据，一次读出全部数据存入buff中，如果buff空间不够会自动扩展,暂时无法使用

**参数**

|传入值类型|解释|
|-|-|
|int|usb总线id,默认0,如果芯片只有1条USB线,填0|
|zbuff|zbuff对象|
|int|设备应用id|

**返回值**

|返回值类型|解释|
|-|-|
|int|返回读到的长度，并把zbuff指针后移|

**例子**

```lua
usb.rx(0, buff, 1)

```

---

## usb.mode(id, mode)

设置USB工作模式，必须在USB外设掉电不工作时进行设置

**参数**

|传入值类型|解释|
|-|-|
|int|usb总线id,默认0,如果芯片只有1条USB线,填0|
|int|工作模式,只有3种,usb.HOST主机模式,usb.DEVICE从机模式,usb.OTG协商模式,默认是从机模式|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false,总线id填错,所选模式不支持时,USB外设正在工作等情况下返回失败|

**例子**

```lua
pm.power(pm.USB, false)
usb.mode(0, usb.DEVICE)
pm.power(pm.USB, true)

```

---

## usb.on(id, func)

注册USB事件回调

**参数**

|传入值类型|解释|
|-|-|
|int|usb总线id,默认0,如果芯片只有1条USB线,填0|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
usb.on(0, function(id, class, app_id, event, param1, param2, param3)
    log.info("usb", id, class, event)
end)
--回调参数有7个
1、usb总线id
2、class,设备类
3、app_id
4、event,见usb.EV_XXX
5、param1,
6、param2,
7、param3,
event类型含义及后续param含义
1、usb.EV_CONNECT,设备枚举完成,param1为hub地址,param2为设备所在的hub port序号,param3是设备自身地址
2、usb.EV_DISCONNECT,设备断开,后续参数同usb.EV_CONNECT


```

---

## usb.vid(id, vid)

设置/获取USB的VID,必须在USB外设掉电不工作时进行设置,获取没有限制

**参数**

|传入值类型|解释|
|-|-|
|int|usb总线id,默认0,如果芯片只有1条USB线,填0|
|int|想要设置的VID值,留空则不做设置|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功或者获取VID时返回true,否则返回false,总线id填错,芯片不支持设置,USB外设正在工作等情况下返回失败|
|int|当前VID值|

**例子**

```lua
pm.power(pm.USB, false)
usb.vid(0, 0x1234)
pm.power(pm.USB, true)

```

---

## usb.pid(id, pid)

设置/获取USB的PID,必须在USB外设掉电不工作时进行设置,获取没有限制

**参数**

|传入值类型|解释|
|-|-|
|int|usb总线id,默认0,如果芯片只有1条USB线,填0|
|int|想要设置的PID值,留空则不做设置|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功或者获取VID时返回true,否则返回false,总线id填错,芯片不支持设置,USB外设正在工作等情况下返回失败|
|int|当前PID值|

**例子**

```lua
pm.power(pm.USB, false)
usb.pid(0, 0x1234)
pm.power(pm.USB, true)

```

---

## usb.add_class(id, class, num)

设置USB支持的设备类和数量，必须在USB外设掉电不工作时进行设置

**参数**

|传入值类型|解释|
|-|-|
|int|usb总线id,默认0,如果芯片只有1条USB线,填0|
|int|设备类,从机模式支持usb.CDC_ACM,usb.HID_CM,usb.HID_KB,usb.MSC,主机模式不需要配置|
|int|数量,目前只有从机的usb.CDC_ACM允许至多3个,其他只允许1个,超过时会强制改成所允许的最大值|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false,总线id填错,所选设备类不支持时,端点数量超过芯片允许的最大值,USB外设正在工作等情况下返回失败|

**例子**

```lua
pm.power(pm.USB, false)
usb.add_class(0, usb.CDC_ACM, 3)    --使用3个CDC-ACM虚拟串口功能
usb.add_class(0, usb.HID_CM, 1)        --使用1个自定义HID功能
pm.power(pm.USB, true)

```

---

## usb.clear_all_class(id)

清除掉当前配置的设备类,必须在USB外设掉电不工作时进行设置

**参数**

|传入值类型|解释|
|-|-|
|int|usb总线id,默认0,如果芯片只有1条USB线,填0|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false,总线id填错,USB外设正在工作等情况下返回失败|

**例子**

```lua
pm.power(pm.USB, false)
usb.clear_all_class(0)                --清除掉之前配置的设备类
usb.add_class(0, usb.CDC_ACM, 3)    --使用3个CDC-ACM虚拟串口功能
usb.add_class(0, usb.HID_KB, 1)        --使用1个标准键盘功能
pm.power(pm.USB, true)

```

---

## usb.get_free_ep_num(id)

返回当前剩余的端点数

**参数**

|传入值类型|解释|
|-|-|
|int|usb总线id,默认0,如果芯片只有1条USB线,填0|

**返回值**

|返回值类型|解释|
|-|-|
|int|剩余的端点数,总线id填错时直接返回0|

**例子**

```lua
log.info(usb.get_free_ep_num(0))

```

---

## usb.debug(id, on_off)

配置调试信息输出开关

**参数**

|传入值类型|解释|
|-|-|
|int|usb总线id,默认0,如果芯片只有1条USB线,填0|
|boolean|true开 false关|

**返回值**

无

**例子**

无

---

## usb.reset_device(id, app_id)

USB主机重新枚举从机

**参数**

|传入值类型|解释|
|-|-|
|int|usb总线id,默认0,如果芯片只有1条USB线,填0|
|int|app id|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true开始重新枚举，false无法枚举|

**例子**

```lua
usb.reset_device(0, 2)

```

---

