# ctiot - 中国电信CTIOT集成

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_ctiot.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看ctiot的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/ctiot)
```

## 常量

|常量|类型|解释|
|-|-|-|
|ctiot.CON|number|CON|
|ctiot.NON|number|NON|
|ctiot.NON_REL|number|NON_REL|
|ctiot.CON_REL|number|CON_REL|


## ctiot.init()

初始化ctiot，在复位开机后使用一次

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## ctiot.param(ip, port, lifetime)

设置和读取ctiot相关参数，有参数输入则设置，无论是否有参数输入，均输出当前参数

**参数**

|传入值类型|解释|
|-|-|
|string|服务器ip|
|int|服务器端口|
|int|生命周期,单位秒|

**返回值**

|返回值类型|解释|
|-|-|
|string|服务器ip|
|int|服务器端口|
|int|生命周期,单位秒|

**例子**

无

---

## ctiot.ep(val)

设置和读取自定义EP

**参数**

|传入值类型|解释|
|-|-|
|string|自定义EP的值,默认是imei,读取的话不要填这个参数|

**返回值**

|返回值类型|解释|
|-|-|
|string|当前EP值|

**例子**

无

---

## ctiot.connect()

连接CTIOT，必须在设置完参数和模式后再使用

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|

**例子**

无

---

## ctiot.disconnect()

断开ctiot

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

## ctiot.write(data, mode, seq)

发送数据给ctiot

**参数**

|传入值类型|解释|
|-|-|
|string|需要发送的数据|
|int|模式, ctiot.CON/NON/NON_REL/CON_REL|
|int|序号|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,否则返回false|
|string|成功为nil,失败返回错误描述|

**例子**

无

---

## ctiot.ready()

是否已经就绪

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|已经就绪返回0,否则返回错误代码|

**例子**

无

---

