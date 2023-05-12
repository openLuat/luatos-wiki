# sysplus - sys库的强力补充

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3` {bdg-primary}`Air780E`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_sysplus_doc.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
-- 本库是sys库的补充, 添加了如下内容:
-- 1. cwait机制
-- 2. 任务消息机制, 即sub/pub的增强版本

-- 在socket,libnet,http库等场景需要用到, 所以也需要require

```

## sysplus.waitMsg(taskName, target, timeout)



等待接收一个目标消息

**参数**

|传入值类型|解释|
|-|-|
|string|任务名称，用于唤醒任务的id|
|string|目标消息，如果为nil，则表示接收到任意消息都会退出|
|int|超时时间，如果为nil，则表示无超时，永远等待|

**返回值**

|返回值类型|解释|
|-|-|
|table|成功返回table型的msg，超时返回false|

**例子**

```lua
-- 等待任务
sysplus.waitMsg('a', 'b', 1000)
-- 注意, 本函数会自动注册成全局函数 sys_wait

```

---

## sysplus.sendMsg(taskName, target, arg2, arg3, arg4)



向目标任务发送一个消息

**参数**

|传入值类型|解释|
|-|-|
|string|任务名称，用于唤醒任务的id|
|any|消息中的参数1，同时也是waitMsg里的target|
|any|消息中的参数2|
|any|消息中的参数3|
|any|消息中的参数4|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true, 否则返回false|

**例子**

```lua
-- 向任务a,目标b发送消息
sysplus.sendMsg('a', 'b')
-- 注意, 本函数会自动注册成全局函数 sys_send

```

---

## sysplus.taskInitEx(fun, taskName, cbFun, ...)



创建一个任务线程,在模块最末行调用该函数并注册模块中的任务函数,main.lua导入该模块即可

**参数**

|传入值类型|解释|
|-|-|
|function|任务函数名,用于resume唤醒时调用|
|string|任务名称,用于唤醒任务的id|
|function|接收到非目标消息时的回调函数|
|any|... 任务函数fun的可变参数|

**返回值**

|返回值类型|解释|
|-|-|
|number|返回该任务的线程号|

**例子**

```lua
sysplus.taskInitEx(task1,'a',callback)

```

---

## sysplus.sendMsg(taskName, param1, param2, param3, param4)



删除由taskInitEx创建的任务线程

**参数**

|传入值类型|解释|
|-|-|
|string|任务名称,用于唤醒任务的id|

**返回值**

无

**例子**

```lua
sysplus.taskDel('a')

```

---

