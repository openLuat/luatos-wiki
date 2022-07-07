# sys

本章介绍LuatOS的sys系统调度

## 简介

sys库是LuatOS进行系统调度的内置库，通过sys库可以创建LuatOS任务，新建定时器，在系统内发送和订阅消息

## 硬件准备

任意LuatOS-SOC开发板一块

## 软件部分

接口文档可参考：[SYS库](https://wiki.luatos.com/api/sys.html)

### 初始化一个LuatOS任务并启动

代码如下

```lua
PROJECT = "SYS"
VERSION = "1.0.0"

-- 引入sys库
sys = require("sys")

function test()
    log.info(PROJECT, "test running...")
end

-- 创建任务test并执行
sys.taskInit(test)

-- 启动系统调度
sys.run()

```

日志如下

```log
I/user.SYS test running...
```

### 在任务中创建循环并使用延时函数

代码如下

```lua
PROJECT = "SYS"
VERSION = "1.0.0"

-- 引入sys库
sys = require("sys")

function test()
    while true do
        log.info(PROJECT, "test running...")
        -- 在任务函数中使用wait进行1S延时
        sys.wait(1000)
    end
end

-- 创建任务test并执行
sys.taskInit(test)

-- 启动系统调度
sys.run()
```

日志如下

```log
I/user.SYS test running...
I/user.SYS test running...
I/user.SYS test running...
I/user.SYS test running...
I/user.SYS test running...
...
...
```

### 启动一个单次定时器或循环定时器

代码如下

```lua
PROJECT = "SYS"
VERSION = "1.0.0"

-- 引入sys库
sys = require("sys")

function test1(arg)
    log.info(PROJECT, "test1 running...")
    log.info("TEST1-ARG", arg)

end

function test2(arg)
    log.info(PROJECT, "test2 running...")
    log.info("TEST2-ARG", arg)
end

-- 创建一个单次定时器
sys.timerStart(test1, 2000, "TEST1")

-- 创建一个循环定时器
sys.timerLoopStart(test2, 2000, "TEST2")

sys.run()
```

日志如下

```log
I/user.SYS test1 running...
I/user.TEST1-ARG TEST1
I/user.SYS test2 running...
I/user.TEST2-ARG TEST2
I/user.SYS test2 running...
I/user.TEST2-ARG TEST2
I/user.SYS test2 running...
I/user.TEST2-ARG TEST2
...
...
```

### 停止一个定时器

代码如下

```lua
PROJECT = "SYS"
VERSION = "1.0.0"

-- 引入sys库
sys = require("sys")

function test(arg)
    log.info(PROJECT, "test running...")
    log.info("TEST-ARG", arg)
end

sys.taskInit(function()
    -- 创建一个循环定时器
    local tid = sys.timerLoopStart(test, 1000, "TEST_DATA")
    log.info(PROJECT, "5S后循环定时器将停止运行")
    sys.wait(5000)
    -- 停止循环定时器
    log.info(PROJECT, "停止循环定时器")
    sys.timerStop(tid)
end)

sys.run()
```

日志如下

```log
I/user.SYS 5S后循环定时器将停止运行
I/user.SYS test running...
I/user.TEST-ARG TEST_DATA
I/user.SYS test running...
I/user.TEST-ARG TEST_DATA
I/user.SYS test running...
I/user.TEST-ARG TEST_DATA
I/user.SYS test running...
I/user.TEST-ARG TEST_DATA
I/user.SYS test running...
I/user.TEST-ARG TEST_DATA
I/user.SYS 停止循环定时器

```

### 发送和订阅用户消息

代码如下

```lua
PROJECT = "SYS"
VERSION = "1.0.0"

-- 引入sys库
sys = require("sys")

local count = 1

sys.subscribe("USER_MSG", function(arg)
    log.info(PROJECT, "receive data : " .. arg)
end)

sys.timerLoopStart(function()
    sys.publish("USER_MSG", "DATA" .. count)
    count = count + 1
end, 3000)

sys.run()
```

日志如下

```log
I/user.SYS receive data : DATA1
I/user.SYS receive data : DATA2
I/user.SYS receive data : DATA3
I/user.SYS receive data : DATA4
I/user.SYS receive data : DATA5
...
...
```

### 在任务中等待一个消息

```lua
PROJECT = "SYS"
VERSION = "1.0.0"

-- 引入sys库
sys = require("sys")

local count = 1

sys.taskInit(function()
    local res, data
    while true do
        res, data = sys.waitUntil("USER_MSG")
        log.info(PROJECT, res, data)
    end
end)

sys.timerLoopStart(function()
    sys.publish("USER_MSG", "DATA" .. count)
    count = count + 1
end, 3000)

sys.run()
```

日志如下

```log
I/user.SYS true DATA1
I/user.SYS true DATA2
I/user.SYS true DATA3
I/user.SYS true DATA4
I/user.SYS true DATA5
...
...
```


<script>
window.onload = function(){
    //在代码块附近加上快速测试代码链接
    $("pre").each(function () {
        if($(this).text().indexOf("log.info") >= 0)
            $(this).before('<a class="run-code-btn" href="https://wiki.luatos.com/_static/luatos-emulator/lua.html?'+escape($(this).text())+'" target="_blank">点我快速测试下面的代码</a>');
    });
}
</script>
