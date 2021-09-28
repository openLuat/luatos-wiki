# LuaTask框架

## 框架简述

LuaTask框架，利用协程，在Lua中实现了多任务功能。开发者可以用最简单的方式，新建多个任务，而不是像传统的开发方式一样，只能用定时器进行延时。

当使用LuaTask框架时，需要在代码中引用`sys`库（`_G.sys=require("sys")`），并且在代码的最后一行，调用`sys.run()`以启动LuaTask框架，框架内的任务代码会在`sys.run()`中运行。

## 上手使用

### 多任务

```lua
sys = require("sys")
--第一个任务
sys.taskInit(function()
    while true do
        log.info("task1","wow")
        sys.wait(1000) --延时1秒，这段时间里可以运行其他代码
    end
end)

--第二个任务
sys.taskInit(function()
    while true do
        log.info("task2","wow")
        sys.wait(500) --延时0.5秒，这段时间里可以运行其他代码
    end
end)

sys.run()
```

### 多任务之间互相等待

```lua
sys = require("sys")
--第一个任务
sys.taskInit(function()
    while true do
        log.info("task1","wow")
        sys.wait(1000) --延时1秒，这段时间里可以运行其他代码
        sys.publish("TASK1_DONE")--发布这个消息，此时所有在等的都会收到这条消息
    end
end)

--第二个任务
sys.taskInit(function()
    while true do
        sys.waitUntil("TASK1_DONE")--等待这个消息，这个任务阻塞在这里了
        log.info("task2","wow")
    end
end)

--第三个任务
sys.taskInit(function()
    while true do
        local result = sys.waitUntil("TASK1_DONE",500)--等待超时时间500ms，超过就返回false而且不等了
        log.info("task3","wait result",result)
    end
end)

--单独订阅，可以当回调来用
sys.subscribe("TASK1_DONE",function()
    log.info("subscribe","wow")
end)

sys.run()
```

### 多任务之间互相等待并传递数据

```lua
sys = require("sys")
--第一个任务
sys.taskInit(function()
    while true do
        log.info("task1","wow")
        sys.wait(1000) --延时1秒，这段时间里可以运行其他代码
        sys.publish("TASK1_DONE","balabala")--发布这个消息，并且带上一个数据
    end
end)

--第二个任务
sys.taskInit(function()
    while true do
        local _,data sys.waitUntil("TASK1_DONE")--等待这个消息，这个任务阻塞在这里了
        log.info("task2","wow receive",data)
    end
end)

--第三个任务
sys.taskInit(function()
    while true do
        local result,data = sys.waitUntil("TASK1_DONE",500)--等待超时时间500ms，超过就返回false而且不等了
        log.info("task3","wait result",result,data)
    end
end)

--单独订阅，可以当回调来用
sys.subscribe("TASK1_DONE",function(data)
    log.info("subscribe","wow receive",data)
end)

sys.run()
```

### 传统定时器

```lua
sys = require("sys")

--一秒后执行某函数，可以在后面传递参数
sys.timerStart(log.info,1000,"1s timer")
--之间写个function也行
sys.timerStart(function()
    log.info("1s timer function")
end,1000)

--每秒执行，永久循环，返回定时器编号
local loopId = sys.timerLoopStart(log.info,1000,"1s loop timer")
--10秒后手动停止上面的无限循环定时器
sys.timerStart(function()
    sys.timerStop(loopId)
    log.info("stop 1s loop timer")
end,10000)

sys.run()
```

<script>
window.onload = function(){
    //在代码块附近加上快速测试代码链接
    $("pre").each(function () {
        if($(this).text().indexOf("log.info") >= 0)
            $(this).before('<a href="https://wiki.luatos.com/_static/luatos-emulator/lua.html?'+escape($(this).text())+'" target="_blank">点我快速测试下面的代码</a>');
    });
}
</script>

## sys库接口文档

### sys.wait(ms)

Task任务延时函数，只能用于任务函数中

* 参数

|传入值类型|释义|
|-|-|
|number|ms  整数，最大等待126322567毫秒|

* 返回值

定时结束返回nil,被其他线程唤起返回调用线程传入的参数

* 例子

```lua
sys.wait(30)
```

---

### sys.waitUntil(id, ms)

Task任务的条件等待函数（包括事件消息和定时器消息等条件），只能用于任务函数中。

* 参数

|传入值类型|释义|
|-|-|
|param|id 消息ID|
|number|ms 等待超时时间，单位ms，最大等待126322567毫秒|

* 返回值

result 接收到消息返回true，超时返回false
data 接收到消息返回消息参数

* 例子

```lua
result, data = sys.waitUntil("SIM_IND", 120000)
```

---

### sys.waitUntilExt(id, ms)

Task任务的条件等待函数扩展（包括事件消息和定时器消息等条件），只能用于任务函数中。

* 参数

|传入值类型|释义|
|-|-|
|param|id 消息ID|
|number|ms 等待超时时间，单位ms，最大等待126322567毫秒|

* 返回值

message 接收到消息返回message，超时返回false
data 接收到消息返回消息参数

* 例子

```lua
result, data = sys.waitUntilExt("SIM_IND", 120000)
```

---

### sys.taskInit(fun, ...)

创建一个任务线程,在模块最末行调用该函数并注册模块中的任务函数，main.lua导入该模块即可

* 参数

|传入值类型|释义|
|-|-|
|param|fun 任务函数名，用于resume唤醒时调用|
|param|... 任务函数fun的可变参数|

* 返回值

co  返回该任务的线程号

* 例子

```lua
sys.taskInit(task1,'a','b')
```

---

### sys.timerStop(val, ...)

关闭定时器

* 参数

|传入值类型|释义|
|-|-|
|param|val 值为number时，识别为定时器ID，值为回调函数时，需要传参数|
|param|... val值为函数时，函数的可变参数|

* 返回值

无

* 例子

```lua
timerStop(1)
```

---

### sys.timerStopAll(fnc)

关闭同一回调函数的所有定时器

* 参数

|传入值类型|释义|
|-|-|
|param|fnc 定时器回调函数|

* 返回值

无

* 例子

```lua
timerStopAll(cbFnc)
```

---

### sys.timerStart(fnc, ms, ...)

开启一个定时器

* 参数

|传入值类型|释义|
|-|-|
|param|fnc 定时器回调函数|
|number|ms 整数，最大定时126322567毫秒|
|param|... 可变参数 fnc的参数|

* 返回值

number 定时器ID，如果失败，返回nil

* 例子

无

---

### sys.timerLoopStart(fnc, ms, ...)

开启一个循环定时器

* 参数

|传入值类型|释义|
|-|-|
|param|fnc 定时器回调函数|
|number|ms 整数，最大定时126322567毫秒|
|param|... 可变参数 fnc的参数|

* 返回值

number 定时器ID，如果失败，返回nil

* 例子

无

---

### sys.timerIsActive(val, ...)

判断某个定时器是否处于开启状态

* 参数

|传入值类型|释义|
|-|-|
|param|val 有两种形式<br>一种是开启定时器时返回的定时器id，此形式时不需要再传入可变参数...就能唯一标记一个定时器<br>另一种是开启定时器时的回调函数，此形式时必须再传入可变参数...才能唯一标记一个定时器|
|param|... 可变参数|

* 返回值

number 开启状态返回true，否则nil

* 例子

无

---

### sys.subscribe(id, callback)

订阅消息

* 参数

|传入值类型|释义|
|-|-|
|param|id 消息id|
|param|callback 消息回调处理|

* 返回值

无

* 例子

```lua
subscribe("NET_STATUS_IND", callback)
```

---

### sys.unsubscribe(id, callback)

取消订阅消息

* 参数

|传入值类型|释义|
|-|-|
|param|id 消息id|
|param|callback 消息回调处理|

* 返回值

无

* 例子

```lua
unsubscribe("NET_STATUS_IND", callback)
```

---

### sys.publish(...)

发布内部消息，存储在内部消息队列中

* 参数

|传入值类型|释义|
|-|-|
|param|... 可变参数，用户自定义|

* 返回值

无

* 例子

```lua
publish("NET_STATUS_IND")
```

---

### sys.run()

run()从底层获取core消息并及时处理相关消息，查询定时器并调度各注册成功的任务线程运行和挂起

* 参数

无

* 返回值

无

* 例子

```lua
sys.run()
```

