# http - http 客户端

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/network/libhttp/luat_lib_http.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看http的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/socket)
```

**示例**

```lua
-- 使用http库,需要引入sysplus库, 且需要在task内使用
require "sys"
require "sysplus"

sys.taskInit(function()
	sys.wait(1000)
	local code,headers,body = http.request("GET", "http://www.example.com/abc").wait()
	log.info("http", code, body)
end)


```

## http.request(method,url,headers,body,opts,ca_file)



http客户端

**参数**

|传入值类型|解释|
|-|-|
|string|请求方法, 支持 GET/POST|
|string|url地址|
|tabal|请求头 可选 例如{["Content-Type"] = "application/x-www-form-urlencoded"}|
|string|body 可选|
|table|额外配置 可选 包含 timeout:超时时间单位ms 可选,默认10分钟,写0即永久等待 dst:下载路径,可选 adapter:选择使用网卡,可选 debug:是否打开debug信息,可选,ipv6:是否为ipv6 默认不是,可选|
|string|服务器ca证书数据|
|string|客户端ca证书数据|
|string|客户端私钥加密数据|
|string|客户端私钥口令数据|

**返回值**

|返回值类型|解释|
|-|-|
|int|code|
|tabal|headers|
|string|body|

**例子**

```lua
-- GET请求
local code, headers, body = http.request("GET","http://site0.cn/api/httptest/simple/time").wait()
log.info("http.get", code, headers, body)
-- POST请求
local code, headers, body = http.request("POST","http://httpbin.com/post", {}, "abc=123").wait()
log.info("http.post", code, headers, body)

-- GET请求,但下载到文件
local code, headers, body = http.request("GET","http://httpbin.com/", {}, "", {dst="/data.bin"}).wait()
log.info("http.get", code, headers, body)

```

---

