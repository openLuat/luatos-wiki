# Luat框架

-------

## LuaTask

### 函数运行

由于没有main函数，一些习惯常规单片机开发者一时不知怎么运行程序。程序运行有多种方法

#### 直接调用

项目中处理lib文件夹还有main.lua，test.lua。

`main.lua`

```lua
--重要提醒：必须在这个位置定义PROJECT和VERSION变量
--PROJECT：string类型，可以随便定义，只要不使用,就行
--VERSION：string类型，如果使用Luat物联云平台固件升级的功能，必须按照"X.X.X"定义，X表示1位数字；否则可随便定义
PROJECT = "testdemo"
VERSION = "1.0.0"
-- sys库是Luat的核心支撑库, 基本上是必备的
local sys = require"sys"

-- ----------------------------
-- 引入test.lua
local test = require "test"
test.hi()
---------------------------

sys.run() -- 启动内部event loop, 仅允许在main.lua的末尾使用
```

main.lua需要使用`require`引用编写的脚本，这儿为test.lua。

`test.lua`

```lua
local test = {}

local function ss() -- 内部方法, 外部无法调用
	print("ss function test")
end
ss()		--直接调用，在main.lua文件中require"test"的时候则会调用该函数

function test.hi() -- 暴露到外部的方法
    log.info("test", "say hi from test")
end

return test
```

#### 协程

main.lua同上

`test.lua`

```lua
local test = {}

sys.taskInit(function()
    cnt = 0
    while true do
	 	print("ss function test")
        sys.wait(1000)			-- 挂起1000ms，同理为每隔1000ms运行一次
    end
end)

return test
```

#### 定时器

main.lua同上

`test.lua`

```lua
local test = {}

local function ss(  )
	print("ss function test")
end
--sys.timerStart(ss,3000)	--3秒运行一次
sys.timerLoopStart (ss,5000)  --循环定时器，每隔5秒运行一次

return test
```


#### 程序注册

LuaTask通过订阅发布来实现消息机制。

当函数完成一个操作后，可以发布一个消息，其他函数可以订阅该消息并做对应的操作。举个例子，当socket发送完数据后发布“SEND_FINISH”。这时开发者想socket发布完成后通过串口发送数据或者改变某个IO口的状态。就可以订阅该消息subscribe("SEND_FINISH",callback)。callback为接收到SEND_FINISH消息后需要做的事。

先来看一个程序

`testMsgPub.lua`

```lua
--testMsgPub.lua
local testMsgPub = {}

local sys = require"sys"
local  a = 2
local function pub()
	print("pub")
	sys.publish("TEST",a)		--可以发布多个变量sys.publish("TEST",1,2,3)
end
pub()

return testMsgPub
```

`testMsgSub.lua`

```lua
--testMsgSub.lua
local testMsgSub = {}

local sys = require"sys"

local function subCallBack(...)
	print("rev",arg[1])
end

sys.subscribe("TEST",subCallBack)
return testMsgSub
```

如果要在任务函数中订阅消息并做相应的处理，怎么办?

```lua
local testMsgSub = {}

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

return testMsgSub
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

