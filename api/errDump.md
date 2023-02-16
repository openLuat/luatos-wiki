# errDump - 错误上报

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/network/errdump/luat_lib_errdump.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看errDump的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/errDump)
```

**示例**

```lua
-- 基本用法, 10分钟上报一次,如果有的话
if errDump then
    errDump.config(true, 600)
end

-- 附开源服务器端: https://gitee.com/openLuat/luatos-devlog

```

## errDump.dump(zbuff, type, isDelete)



手动读取异常日志，主要用于用户将日志发送给自己的服务器而不是IOT平台，如果在errDump.config配置了周期上传，则不能使用本函数

**参数**

|传入值类型|解释|
|-|-|
|zbuff|日志信息缓存，如果为nil就不会读出，一般当|
|int|日志类型，目前只有errDump.TYPE_SYS和errDump.TYPE_USR|
|boolean|是否删除日志|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true表示本次读取前并没有写入数据，false反之，在删除日志前，最好再读一下确保没有新的数据写入了|

**例子**

```lua
local result = errDump.dump(buff, errDump.TYPE_SYS, false) --读出系统记录的异常日志
local result = errDump.dump(nil, errDump.TYPE_SYS, true) --清除系统记录的异常日志

```

---

## errDump.record(string)



写入用户的异常日志，注意最大只有4KB，超过部分新的覆盖旧的，开启自动上传后会上传到合宙IOT平台

**参数**

|传入值类型|解释|
|-|-|
|string|日志|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
errDump.record("socket long time no connect") --记录下"socket long time no connect"

```

---

## errDump.config(enable, period, user_flag)



配置关键日志上传IOT平台，这里的日志包括引起luavm异常退出的日志和用户通过record写入的日志，类似于air的errDump

**参数**

|传入值类型|解释|
|-|-|
|boolean|是否启用记录功能，false的话将不会记录任何日志|
|int|定时上传周期，单位秒，默认600秒，这个是自动上传时候后的重试时间时间，在开机后或者有record操作后会很快尝试上传到合宙IOT平台一次，如果为0，则不会上传，由用户dump后自己上传自己的平台|
|string|用户的特殊标识，可以为空|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
errDump.config(true, 3600, "12345678")	--一个小时尝试上次一次，上传时会在imei后附加上12345678
errDump.config(false)	--关闭记录功能，不再上传
errDump.config(true, 0)	--记录，但是不会主动上传，由用户实现上传功能

```

---

