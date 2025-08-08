# libfota2 - fota升级v2

**示例**

```lua
--用法实例
local libfota2 = require("libfota2")

-- 功能:获取fota的回调函数
-- 参数:
-- result:number类型
--   0表示成功
--   1表示连接失败
--   2表示url错误
--   3表示服务器断开
--   4表示接收报文错误
--   5表示使用iot平台VERSION需要使用 xxx.yyy.zzz形式
function libfota_cb(result)
    log.info("fota", "result", result)
    -- fota成功
    if result == 0 then
        rtos.reboot()   --如果还有其他事情要做,自行决定reboot的时机
    end
end

--下方示例为合宙iot平台,地址:http://iot.openluat.com
libfota2.request(libfota_cb)

--如使用自建服务器,自行更换url
-- 对自定义服务器的要求是:
-- 若需要升级, 响应http 200, body为升级文件的内容
-- 若不需要升级, 响应300或以上的代码,务必注意
local opts = {url="http://xxxxxx.com/xxx/upgrade"}
-- opts的详细说明, 看后面的函数API文档
libfota2.request(libfota_cb, opts)

-- 若需要定时升级
-- 合宙iot平台
sys.timerLoopStart(libfota2.request, 4*3600*1000, libfota_cb)
-- 自建平台
sys.timerLoopStart(libfota2.request, 4*3600*1000, libfota_cb, opts)

```

## libfota2.request(cbFnc, opts)

fota升级

**参数**

|传入值类型|解释|
|-|-|
|function|cbFnc 用户回调函数，回调函数的调用形式为：cbFnc(result) , 必须传|
|table|fota参数, 后面有详细描述|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

无

---

