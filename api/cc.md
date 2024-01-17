# cc - 通话功能

{bdg-success}`已适配` {bdg-primary}`Air780E/Air700E` {bdg-primary}`Air780EP`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/cc/luat_lib_cc.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看cc的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/mobile)
```

**示例**

```lua


```

## cc.lastNum()



获取最后一次通话的号码

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|获取最后一次通话的号码|

**例子**

无

---

## cc.dial(sim_id,number)



拨打电话

**参数**

|传入值类型|解释|
|-|-|
|number|sim_id|
|number|电话号码|

**返回值**

|返回值类型|解释|
|-|-|
|bool|拨打电话成功与否|

**例子**

无

---

## cc.hangUp(sim_id)



挂断电话

**参数**

|传入值类型|解释|
|-|-|
|number|sim_id|

**返回值**

无

**例子**

无

---

## cc.accept(sim_id)



接听电话

**参数**

|传入值类型|解释|
|-|-|
|number|sim_id|

**返回值**

|返回值类型|解释|
|-|-|
|bool|接听电话成功与否|

**例子**

无

---

## cc.init(multimedia_id)



初始化电话功能

**参数**

|传入值类型|解释|
|-|-|
|number|multimedia_id 多媒体id|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|

**例子**

无

---

