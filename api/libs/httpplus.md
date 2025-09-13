# httpplus - http库的补充

**示例**

```lua
-- 本库支持的功能有:
--   1. 大文件上传的问题,不限大小
--   2. 任意长度的header设置
--   3. 任意长度的body设置
--   4. 鉴权URL自动识别
--   5. body使用zbuff返回,可直接传输给uart等库

-- 与http库的差异
--   1. 不支持文件下载
--   2. 不支持fota

-- 支持  http 1.0 和 http 1.1, 不支持http2.0
-- 支持 GET/POST/PUT/DELETE/HEAD 等常用方法

```

## httpplus.request(opts)

执行HTTP请求

**参数**

|传入值类型|解释|
|-|-|
|table|请求参数,是一个table,最起码得有url属性|

**返回值**

|返回值类型|解释|
|-|-|
|int|响应码,服务器返回的状态码>=100, 若本地检测到错误,会返回<0的值|
|服务器正常响应时返回结果,|否则是错误信息或者nil|

**例子**

```lua
-- 请求参数介绍
local opts = {
    url    = "https://httpbin.air32.cn/abc", -- 必选, 目标URL
    method = "POST", -- 可选,默认GET, 如果有body,files,forms参数,会设置成POST
    headers = {}, -- 可选,自定义的额外header
    files = {},   -- 可选,键值对的形式,文件上传,若存在本参数,会强制以multipart/form-data形式上传
    forms = {},   -- 可选,键值对的形式,表单参数,若存在本参数,如果不存在files,按application/x-www-form-urlencoded上传
    body  = "abc=123",-- 可选,自定义body参数, 字符串/zbuff/table均可, 但不能与files和forms同时存在
    debug = false,    -- 可选,打开调试日志,默认false
    try_ipv6 = false, -- 可选,是否优先尝试ipv6地址,默认是false
    adapter = nil,    -- 可选,网络适配器编号, 默认是自动选
    timeout = 30,     -- 可选,读取服务器响应的超时时间,单位秒,默认30
    bodyfile = "xxx"  -- 可选,直接把文件内容作为body上传, 优先级高于body参数
}

local code, resp = httpplus.request({url="https://httpbin.air32.cn/get"})
log.info("http", code)
-- 返回值resp的说明
-- 情况1, code >= 100 时, resp会是个table, 包含2个元素
if code >= 100 then
    -- headers, 是个table
    log.info("http", "headers", json.encode(resp.headers))
    -- body, 是个zbuff
    -- 通过query函数可以转为lua的string
    log.info("http", "headers", resp.body:query())
    -- 也可以通过uart.tx等支持zbuff的函数转发出去
    -- uart.tx(1, resp.body)
end

```

---

