# sys - sys库

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_sys_doc.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## sys.wait(timeout)

Task协程等待指定时长

**参数**

|传入值类型|解释|
|-|-|
|int|等待时长,单位毫秒,必须大于0,否则无效|

**返回值**

|返回值类型|解释|
|-|-|
|any|通常为nil,除非主动被唤醒(通常不会)|

**例子**

```lua
sys.taskInit(function()
    while 1 do
        sys.wait(500)
    end
end)

```

---

## sys.waitUntil(topic, timeout)

Task协程等待指定时长或者特定的topic

**参数**

|传入值类型|解释|
|-|-|
|string|事件topic|
|int|等待时长,单位毫秒,必须大于0,否则无效|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|如果是超时,返回true,否则返回false|
|any|对应topic的内容|

**例子**

```lua
sys.taskInit(function()
    // do something
    local result, data = sys.waitUntil("NET_READY", 30000)
    // do something else
end)

```

---

## sys.taskInit(func, arg1, arg2, argN)

创建一个Task协程

**参数**

|传入值类型|解释|
|-|-|
|function|待执行的函数,可以是匿名函数, 也可以是local或全局函数|
|any|需要传递的参数1,可选 |
|any|需要传递的参数2,可选 |
|any|需要传递的参数N,可选 |

**返回值**

|返回值类型|解释|
|-|-|
|task|协程对象|

**例子**

```lua
sys.taskInit(function(a, b, c)
    log.info("task", a, b, c) -- 打印 task A B C
end, "A", "B", "N")

```

---

## sys.timerStart(func, timeout, arg1, arg2, argN)

创建一个定时器.非Task,函数里不能直接sys.waitXXX

**参数**

|传入值类型|解释|
|-|-|
|function|待执行的函数,可以是匿名函数, 也可以是local或全局函数|
|int|延时时长,单位毫秒|
|any|需要传递的参数1,可选 |
|any|需要传递的参数2,可选 |
|any|需要传递的参数N,可选 |

**返回值**

|返回值类型|解释|
|-|-|
|int|定时器id|

**例子**

```lua
sys.timerStart(function(a, b, c)
    log.info("task", a, b, c) -- 1000毫秒后才会执行, 打印 task A B C
end, 1000, "A", "B", "N")

```

---

## sys.timerLoopStart(func, timeout, arg1, arg2, argN)

创建一个循环定时器.非Task,函数里不能直接sys.waitXXX

**参数**

|传入值类型|解释|
|-|-|
|function|待执行的函数,可以是匿名函数, 也可以是local或全局函数|
|int|延时时长,单位毫秒|
|any|需要传递的参数1,可选 |
|any|需要传递的参数2,可选 |
|any|需要传递的参数N,可选 |

**返回值**

|返回值类型|解释|
|-|-|
|int|定时器id|

**例子**

```lua
sys.timerLoopStart(function(a, b, c)
    log.info("task", a, b, c) -- 1000毫秒后才会执行, 打印 task A B C
end, 1000, "A", "B", "N")

```

---

## sys.timerStop(id)

关闭一个定时器.

**参数**

|传入值类型|解释|
|-|-|
|int|定时器id|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
local tcount = 0
local tid = sys.timerLoopStart(function(a, b, c)
    log.info("task", a, b, c) -- 1000毫秒后才会执行, 打印 task A B C
    if tcount > 10 then
        sys.timerStop(tid)
    end
    tcount = tcount + 1
end, 1000, "A", "B", "N")

```

---

## sys.publish(topic, arg1, agr2, argN)

往特定topic通道发布一个消息

**参数**

|传入值类型|解释|
|-|-|
|string|topic的值|
|any|附带的参数1|
|any|附带的参数2|
|any|附带的参数N|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
sys.publish("BT_READY", false)

```

---

## sys.subscribe(topic, func)

订阅一个topic通道

**参数**

|传入值类型|解释|
|-|-|
|string|topic的值|
|function|回调函数, 注意, 不能直接使用sys.waitXXX|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
local function bt_cb(state)
    log.info("bt", state)
end
sys.subscribe("BT_READY", bt_cb)
sys.subscribe("BT_READY", function(state)
    log.info("sys", "Got BT_READY", state)
end)

```

---

## sys.unsubscribe(topic, func)

取消订阅topic通道

**参数**

|传入值类型|解释|
|-|-|
|string|topic的值|
|function|回调函数, 注意, 不能直接使用sys.waitXXX|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
local function bt_cb(state)
    log.info("bt", state)
end
sys.unsubscribe("BT_READY", bt_cb)

```

---

## sys.run()

sys库主循环方法,仅允许在main.lua的末尾调用

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值. 这个方法几乎不可能返回.|

**例子**

```lua
-- 总是main.lua的结尾一句,将来也许会简化掉
sys.run()
-- 之后的代码不会被执行

```

---

