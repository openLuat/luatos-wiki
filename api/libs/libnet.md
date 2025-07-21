# libnet - libnet 在socket库基础上的同步阻塞api，socket库本身是异步非阻塞api

## libnet.waitLink(taskName,timeout,...)

阻塞等待网卡的网络连接上，只能用于sysplus.taskInitEx创建的任务函数中

**参数**

|传入值类型|解释|
|-|-|
|string|任务标志|
|int|超时时间，如果==0或者空，则没有超时一致等待|
|...|其他参数和socket.linkup一致|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|失败或者超时返回false 成功返回true|

**例子**

无

---

## libnet.connect(taskName,timeout,...)

阻塞等待IP或者域名连接上，如果加密连接还要等握手完成，只能用于sysplus.taskInitEx创建的任务函数中

**参数**

|传入值类型|解释|
|-|-|
|string|任务标志|
|int|超时时间，如果==0或者空，则没有超时一致等待|
|...|其他参数和socket.connect一致|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|失败或者超时返回false 成功返回true|

**例子**

无

---

## libnet.listen(taskName,timeout,...)

阻塞等待客户端连接上，只能用于sysplus.taskInitEx创建的任务函数中

**参数**

|传入值类型|解释|
|-|-|
|string|任务标志|
|int|超时时间，如果==0或者空，则没有超时一致等待|
|...|其他参数和socket.listen一致|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|失败或者超时返回false 成功返回true|

**例子**

无

---

## libnet.tx(taskName,timeout,...)

阻塞等待数据发送完成，只能用于sysplus.taskInitEx创建的任务函数中

**参数**

|传入值类型|解释|
|-|-|
|string|任务标志|
|int|超时时间，如果==0或者空，则没有超时一直等待|
|...|其他参数和socket.tx一致|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|失败或者超时返回false，缓冲区满了或者成功返回true|
|boolean|缓存区是否满了|

**例子**

无

---

## libnet.wait(taskName,timeout, netc)

阻塞等待新的网络事件，只能用于sysplus.taskInitEx创建的任务函数中，可以通过sysplus.sendMsg(taskName,socket.EVENT,0)或者sys_send(taskName,socket.EVENT,0)强制退出

**参数**

|传入值类型|解释|
|-|-|
|string|任务标志|
|int|超时时间，如果==0或者空，则没有超时一致等待|
|userdata|socket.create返回的netc|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|网络异常返回false，其他返回true|
|boolean|超时返回false，有新的网络事件到返回true|

**例子**

无

---

## libnet.close(taskName,timeout, netc)

阻塞等待网络断开连接，只能用于sysplus.taskInitEx创建的任务函数中

**参数**

|传入值类型|解释|
|-|-|
|string|任务标志|
|int|超时时间，如果==0或者空，则没有超时一致等待|
|userdata|socket.create返回的netc|

**返回值**

无

**例子**

无

---

