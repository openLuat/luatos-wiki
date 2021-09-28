# Luat框架

-------

## LuaTask

### 函数运行

由于没有main函数，一些习惯常规单片机开发者一时不知怎么运行程序。程序运行有多种方法

#### 直接调用

项目中处理lib文件夹还有main.lua，test.lua。

`main.lua`

```lua
--重要提醒：必须在这个位置定义MODULE_TYPE、PROJECT和VERSION变量
--MODULE_TYPE：模块型号，目前仅支持Air201、Air202、Air800
--PROJECT：ascii string类型，可以随便定义，只要不使用,就行
--VERSION：ascii string类型，如果使用Luat物联云平台固件升级的功能，必须按照"X.X.X"定义，X表示1位数字；否则可随便定义
MODULE_TYPE = "Air800"
PROJECT = "WRITE_SN"
VERSION = "1.0.0"
require"sys"
--[[
如果使用UART输出trace，打开这行注释的代码"--sys.opntrace(true,1)"即可，第2个参数1表示UART1输出trace，根据自己的需要修改这个参数
这里是最早可以设置trace口的地方，代码写在这里可以保证UART口尽可能的输出“开机就出现的错误信息”
如果写在后面的其他位置，很有可能无法输出错误信息，从而增加调试难度
]]
--sys.opntrace(true,1)
require"test"
if MODULE_TYPE=="Air201" then
require"wdt"
end
sys.init(0,0)
sys.run()

```

main.lua需要使用`require`引用编写的脚本，这儿为test.lua。

`test.lua`

```lua
module(...,package.seeall)

local function ss(  )
	print("ss function test")
end
ss()		--直接调用，在main.lua文件中require"test"的时候则会调用该函数
```

#### 协程

main.lua同上

`test.lua`

```lua
module(..., package.seeall)

sys.taskInit(function()
    cnt = 0
    while true do
	 	print("ss function test")
        sys.wait(1000)			-- 挂起1000ms，同理为每隔1000ms运行一次
    end
end)
```

#### 定时器

main.lua同上

`test.lua`

```lua
module(...,package.seeall)

local function ss(  )
	print("ss function test")
end
--sys.timerStart(ss,3000)	--3秒运行一次
sys.timerLoopStart (ss,5000)  --循环定时器，每隔5秒运行一次
```


#### 程序注册

LuaTask通过订阅发布来实现消息机制。

当函数完成一个操作后，可以发布一个消息，其他函数可以订阅该消息并做对应的操作。举个例子，当socket发送完数据后发布“SEND_FINISH”。这时开发者想socket发布完成后通过串口发送数据或者改变某个IO口的状态。就可以订阅该消息subscribe("SEND_FINISH",callback)。callback为接收到SEND_FINISH消息后需要做的事。

先来看一个程序

`testMsgPub.lua`

```lua
--testMsgPub.lua
module(...,package.seeall)

require"sys"
local  a = 2
local function pub()
	print("pub")
	sys.publish("TEST",a)		--可以发布多个变量sys.publish("TEST",1,2,3)
end
pub()
```

`testMsgSub.lua`

```lua
--testMsgSub.lua
module(...,package.seeall)

require"sys"

local function subCallBack(...)
	print("rev",arg[1])
end

sys.subscribe("TEST",subCallBack)
```

如果要在任务函数中订阅消息并做相应的处理，怎么办?

```lua
odule(...,package.seeall)

require"sys"
local  a = 2
local function pub()
	print("pub")
	sys.publish("TEST",a)
end
pub()
sys.taskInit(function()
	while true do
		result, data = sys.waitUntil("TEST", 10000)
		if result == true then
			print("rev")
			print(data)
		end
		sys.wait(2000)
	end
end)
```

调用sys.waitUntil()函数即可。

接下来分析实现的源码

为了更好的理解源码，需要以下的预备知识：

1、回调函数的实现

```lua
local function callBackTest(...)
	print("callBack",arg[1])
end

local function test( a,callBackTest )
	if a > 1 then
		callBackTest(1)
	end
end
test(2,callBackTest)
--输出
--callBack	1
```

2、不定参数

```lua
function g (a, b, ...) end
g(3)              -- a=3, b=nil, arg={n=0}   -- n为不定参数的个数
g(3, 4)           -- a=3, b=4, arg={n=0}
g(3, 4, 5, 8)     -- a=3, b=4, arg={5, 8; n=2}
```

进入正题

```lua
------------------------------------------ LUA应用消息订阅/发布接口 ------------------------------------------
-- 订阅者列表
local subscribers = {}
--内部消息队列
local messageQueue = {}

--- 订阅消息
-- @param id 消息id
-- @param callback 消息回调处理
-- @usage subscribe("NET_STATUS_IND", callback)
function subscribe(id, callback)
    if type(id) ~= "string" or (type(callback) ~= "function" and type(callback) ~= "thread") then
        log.warn("warning: sys.subscribe invalid parameter", id, callback)
        return
    end
    if not subscribers[id] then subscribers[id] = {} end    -- 如果没有重复消息
    subscribers[id][callback] = true        --标记id和callback关系
end

--- 取消订阅消息
-- @param id 消息id
-- @param callback 消息回调处理
-- @usage unsubscribe("NET_STATUS_IND", callback)
function unsubscribe(id, callback)
    if type(id) ~= "string" or (type(callback) ~= "function" and type(callback) ~= "thread") then
        log.warn("warning: sys.unsubscribe invalid parameter", id, callback)
        return
    end
    if subscribers[id] then subscribers[id][callback] = nil end  --删除id和callback关系
end

--- 发布内部消息，存储在内部消息队列中
-- @param ... 可变参数，用户自定义
-- @return 无
-- @usage publish("NET_STATUS_IND")
function publish(...)
    table.insert(messageQueue, arg)     -- 将不定参数插入队列中
end

-- 分发消息
local function dispatch()
    while true do
        if #messageQueue == 0 then      --如果队列长度为  跳出循环
            break
        end
        local message = table.remove(messageQueue, 1)   --获取队列的第一个
        if subscribers[message[1]] then                     --如果订消息存在
            for callback, _ in pairs(subscribers[message[1]]) do
                if type(callback) == "function" then
                    print("unpack",unpack(message, 2, #message))
                    callback(unpack(message, 2, #message))   -- 返回第二个到最后一个
                elseif type(callback) == "thread" then
                    coroutine.resume(callback, unpack(message))
                end
            end
        end
    end
end
```

以sys.publish("TEST",a)和sys.subscribe("TEST",subCallBack)，订阅者列表为local subscribers = {}。内部消息队列为local messageQueue = {}为例：

1、在publish函数中，将"TEST"消息和参数插入messageQueue列表中

此时messageQueue中为{{"TEST",2;n=1}}

2、在subscribe函数中判断消息和callback类型是否正确，如果正确则在subscribers中建立消息与回调函数之间的关系。

此时subscribers\["TEST"][subCallBack] = true。表明TEST消息对应的回掉函数为subCallBack

3、在dispatch()函数中，获得表头列表。

local message = table.remove(messageQueue, 1)

此时message为{"TEST",2;n=1}

找到该消息对应的回调函数或消息。将message中的参数传给回调函数。

通过pairs遍历得到消息对应的回调函数或者任务。

如果callback是函数，那么将publish时候的参数传给回调函数。

如果callback是线程，那么唤醒该线程。

以上只是单个消息举例，多个消息同理，因为每次循环都会将messageQueue的头部出队列，满足FIFO原则。

在有上基础下容易的理解waitUntil()的实现

```lua
--- Task任务的条件等待函数（包括事件消息和定时器消息等条件），只能用于任务函数中。
-- @param id 消息ID
-- @number ms 等待超时时间，单位ms，最大等待126322567毫秒
-- @return result 接收到消息返回true，超时返回false
-- @return data 接收到消息返回消息参数
-- @usage result, data = sys.waitUntil("SIM_IND", 120000)
function waitUntil(id, ms)
    subscribe(id, coroutine.running())
    local message = ms and {wait(ms)} or {coroutine.yield()}
    unsubscribe(id, coroutine.running())
    return message[1] ~= nil, unpack(message, 2, #message)
end
```

1、订阅id，并传入线程号

2、阻塞线程，如果接收到了消息，那么返回message

3、取消订阅该id

4、返回结果

## 运行原理

Lua 支持 coroutine ，这个东西也被称为协同式多线程 (collaborative multithreading)。 Lua 为每个 coroutine 提供一个独立的运行线路。举个通俗易懂的例子：去饭店吃饭，假设饭店只有一个厨师，这时候来了三个客人，分别点了一号菜，二号菜，三号菜。如果按照一二三这样的顺序做菜的话，效率很低。现在引入一种新模式，每个菜花2分钟时间去做。这样的顺序就变为了花两分钟做第一道菜，两分钟到了，做第二道菜，二分钟到了，然后第三道菜。这样的好处是每个客人的菜都有一段时间正在制作过程中，不会出现其他菜必须等到一道菜结束后才可以去做。客人就是上帝，二号客人比较饿，所以可以要求厨师花5分钟制作二号菜。这样的好处之一是可以对每道菜灵活分配时间。不太恰当的比喻，厨师就是CPU，客人就是任务。

先看一个简单的程序：

```lua
co = coroutine.create(										--1
    function(i)
        print(coroutine.status(co))
        print(i);
    end
)

print(coroutine.status(co)) 								--2
coroutine.resume(co, 1)   									--3
print(coroutine.status(co))  								--4

--输出结果
--suspended
--running
--1
--dead
```

-   创建一个 coroutine 需要调用一次`coroutine.create`。它只接收单个参数，这个参数是 coroutine 的主函数。 `create` 函数仅仅创建一个新的 coroutine 然后返回它的控制器（一个类型为 thread 的对象）；它并不会启动 coroutine 的运行。
-   输出当前线程状态，为suspend（挂起，并未执行）
-   唤醒线程，传入参数，此时执行线程，线程状态为running，输出1
-   线程结束，正常退出，`coroutine.resume(co, 1)`返回true。输出线程状态，为dead。注意：dead之后不能再resume（死了的人怎么能唤醒呢？/滑稽）

这儿提到了三种状态，画了一个图来描述它们之间的关系

![flow](../img/flow.jpg)

| 方法                | 释义                                                         |
| ------------------- | ------------------------------------------------------------ |
| coroutine.create()  | 创建coroutine，返回thread， 参数是一个函数建之后线程属于挂起状态，并没有执行！ |
| coroutine.resume()  | 执行线程，和create配合使用，此时线程为running状态。          |
| coroutine.yield()   | 挂起coroutine，将coroutine设置为挂起状态。下次执行resume，程序将回到挂起的位置继续执行而不是从头再执行。挂起成功返回true |
| coroutine.status()  | 查看coroutine的状态注：coroutine的状态有三种：dead，suspend，running。 |
| coroutine.running() | 返回正在跑的coroutine，一个coroutine就是一个线程，当使用running的时候，就是返回一个corouting的线程号 |

coroutine 可以通过两种方式来终止运行：一种是正常退出，指它的主函数返回（最后一条指令被运行后，无论有没有显式的返回指令）; 另一种是非正常退出，它发生在未保护的错误发生的时候。第一种情况中， `coroutine.resume`返回 true，接下来会跟着 coroutine 主函数的一系列返回值。第二种发生错误的情况下， `coroutine.resume`返回 false ，紧接着是一条错误信息。

接下来我们分析一个更详细的实例(引用于Lua手册)：

```lua
function foo (a)										--1
    print("foo 函数输出", a)
    return coroutine.yield(2 * a) -- 返回  2*a 的值
end

co = coroutine.create(function (a , b)					--2
    print("第一次协同程序执行输出", a, b) -- co-body 1 10
    local r = foo(a + 1)

    print("第二次协同程序执行输出", r)
    local r, s = coroutine.yield(a + b, a - b)  -- a，b的值为第一次调用协同程序时传入

    print("第三次协同程序执行输出", r, s)
    return b, "结束协同程序"                   -- b的值为第二次调用协同程序时传入
end)

print("main", coroutine.resume(co, 1, 10)) -- true, 4		--3
print("--分割线----")
print("main", coroutine.resume(co, "r")) -- true 11 -9		--4
print("---分割线---")
print("main", coroutine.resume(co, "x", "y")) -- true 10 end	--5
print("---分割线---")
print("main", coroutine.resume(co, "x", "y")) -- cannot resume dead coroutine	--5
print("---分割线---")

--输出结果
--[[
第一次协同程序执行输出	1	10
foo 函数输出	2
main	true	4
--分割线----
第二次协同程序执行输出	r
main	true	11	-9
---分割线---
第三次协同程序执行输出	x	y
main	true	10	结束协同程序
---分割线---
main	false	cannot resume dead coroutine
---分割线---

]]
```

显然，这个例子比上面例子复杂许多，不过只要仔细分析，理解起来也不会困难

-   调用resume唤醒线程，并传参1,10。输出“第一次协同程序执行输出	1	10”。接下来执行foo函数，输出“foo 函数输出	2”。在foo函数中遇到了yeild，挂起线程，此时程序停留在这儿，下次唤醒线程时从该处继续执行。返回yeild的参数。输出“main	true	4”。
	   第二次调用resume唤醒线程，传入参数“r”，注意：此时传入的参数“r”，赋值给coroutine.yield，所以相当于local r = "r"，输出“第二次协同程序执行输出r”。再次遇到yeild，挂起线程，此时程序停留在这儿，下次唤醒线程时从该处继续执行。返回yeild的参数。输出“main	true	11	-9”。
	   第三次调用resume唤醒线程，传入参数“x”，“y”，赋值给coroutine.yield，相当于local r,s = "r","s"，输出“第三次协同程序执行输出xy”。到这儿整个线程就结束了，输出“main	true	10	结束协同程序”
-   第四次调用resume唤醒线程，此时线程已经为dead了，无法唤醒。

resume和yield的配合强大之处在于，resume处于主程中，它将外部状态（数据）传入到协同程序内部；而yield则将内部的状态（数据）返回到主程中。

再举个小例子说明resume和yield关系

```lua
co = coroutine.create (function (a,b)
  local a,b = coroutine.yield(a+b)
  print("co", a,b)
end)
print(coroutine.resume(co,4,5))
coroutine.resume(co, 7, 8)
--输出
--[[
true	9
co	7	8
]]
```

-   调用resume唤醒线程，并且传入4,5。遇到yeild，挂起程序，返回a+b。所以输出“true	9”。
-   第二次调用resume唤醒线程，并且传入7,8。此时回到上次挂起的位置，并将赋值给a，b。相当于local a,b = 7,8



为了更好的理解LuaTask，花了大量时间讲解Lua的协同式多线程 ，接下来进入正题

先写一个测试程序

```lua
module(..., package.seeall)


sys.taskInit(function()
    cnt = 0
    while true do
    	cnt = cnt + 1
        print("task_A_cnt: ", cnt)
        sys.wait(1000)
    end
end)

sys.taskInit(function()
    cnt = 0
    while true do
    	cnt = cnt + 1
        print("task_B_cnt: ", cnt)
        sys.wait(2000)
    end
end)
```

输出结果,只摘抄了一小部分

```lua
task_B_cnt: 	132
task_A_cnt: 	133
task_A_cnt: 	134
task_B_cnt: 	135
task_A_cnt: 	136
task_A_cnt: 	137
task_B_cnt: 	138
task_A_cnt: 	139
task_A_cnt: 	140
task_B_cnt: 	141
task_A_cnt: 	142
```

该测试程序总共创建了2个任务，第一个任务每次加1，挂起1000ms，第二个任务每次加1，挂起2000ms，所以最后的输出为：输出两次task_A\_cnt， 输出一次task_B_cnt。如果在单片机上习惯写UCOS或者FreeRTOS的开发者看到这样的结构肯定不会陌生。

首先调用sys.taskInit创建任务，任务体的格式为

```lua
sys.taskInit(function()
    xxxx
    while true do
		xxxxx
        sys.wait(100)
    end
end)
```

还有一种为

```lua
local function xxxx(...)
	xxxx
end
sys.taskInit(xxxx,...)
```



和UCOS，FreeRTOS的任务体大致相同，一个while死循环，然后通过延时切换任务。

接下来分析一下sys.taskInit和sys.wait两个重要的函数

先看sys.taskInit的源码

```lua
function taskInit(fun, ...)
    local co = coroutine.create(fun)
    coroutine.resume(co, unpack(arg))
    return co
end
```

sys.taskInit实际是封装了`coroutine.create`和`coroutine.resume`。创建一个任务线程,并执行该线程，返回线程号。

再看sys.wait

```lua
function wait(ms)
    -- 参数检测，参数不能为负值
    assert(ms > 0, "The wait time cannot be negative!")
    -- 选一个未使用的定时器ID给该任务线程
    if taskTimerId >= TASK_TIMER_ID_MAX then taskTimerId = 0 end
    taskTimerId = taskTimerId + 1
    local timerid = taskTimerId
    taskTimerPool[coroutine.running()] = timerid
    timerPool[timerid] = coroutine.running()
    -- 调用core的rtos定时器
    if 1 ~= rtos.timer_start(timerid, ms) then log.debug("rtos.timer_start error") return end
    -- 挂起调用的任务线程
    local message, data = coroutine.yield()
    if message ~= nil then
        rtos.timer_stop(timerid)
        taskTimerPool[coroutine.running()] = nil
        timerPool[timerid] = nil
        return message, data
    end
end
```

如何将定时器和任务组织起来的呢？其中最重要的就是taskTimerPool，timerPool这两个表。在此之前我们得每个线程的线程号都是唯一不变的。

程序流程：

-   检测定时时间是否正确
-   判断定时器是否用完，如果没有，则分配一个未使用的定时器ID给该任务线程
-   定时器ID加1
-   以线程号为下标存储定时器ID号到taskTimerPool表中
-   以定时器ID号为下标存储线程号ID到timerPool表中
-   开启定时器

这样描述比较抽象，举个例子会更好理解一点

```lua
sys.taskInit(function()
    cnt = 0
    while true do
        print("task: ", 1)
        sys.wait(100)
    end
end)
```

以这个简单的例子来解释

sys.taskInit创建并运行该线程，进入sys.wait函数，taskTimerId的初始值为0，所以+1，taskTimerId=1，coroutine.running()会返回正在运行的任务的线程号，也就是当前任务的线程号，比如该例中为0x8218dbc0。注意：线程号是唯一不会改变的。所以taskTimerPool[0x8218dbc0] = 1，timerPool[1] = 0x8218dbc0。这样就将定时器ID和线程号联系起来了。然后开启定时器，挂起该任务，执行下一任务。

问题来了，定时器达到定时时间的时候怎么处理呢？

看下面的代码

```lua
function run()
    while true do
        -- 分发内部消息
        dispatch()
        -- 阻塞读取外部消息
        local msg, param = rtos.receive(rtos.INF_TIMEOUT)
        -- 判断是否为定时器消息，并且消息是否注册
        if msg == rtos.MSG_TIMER and timerPool[param] then
            if param < TASK_TIMER_ID_MAX then
                local taskId = timerPool[param]
                timerPool[param] = nil
                if taskTimerPool[taskId] == param then
                    taskTimerPool[taskId] = nil
                    coroutine.resume(taskId)
                end
            else
                local cb = timerPool[param]
                timerPool[param] = nil
                if para[param] ~= nil then
                    cb(unpack(para[param]))
                else
                    cb()
                end
            end
        --其他消息（音频消息、充电管理消息、按键消息等）
        elseif type(msg) == "number" then
            handlers[msg](param)
        else
            handlers[msg.id](msg)
        end
    end
end
```

读取外部消息，当定时器达到定时时间后，会发生一个消息。

![rtos](../img/rtos.jpg)

所以，msg为rtos.MSG_TIMER，param为定时器ID号。

-   判断是否为任务开启的定时器，若是，判断定时器ID是否超过最大值
-   根据timerPool获取线程号并清除
-   如果能在taskTimerPool中找到定时器ID和任务号对应，则唤醒该线程

这样，就能实现任务与任务之间的调度了。

-----


