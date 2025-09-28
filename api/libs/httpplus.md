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
-- 支持 GET/POST/PUT/DELETE/HEAD 等常用方法,也支持自定义method
-- 支持 HTTP 和 HTTPS 协议
-- 支持 IPv4 和 IPv6
-- 支持 HTTP 鉴权
-- 支持 multipart/form-data 上传文件和表单
-- 支持 application/x-www-form-urlencoded 上传表单
-- 支持 application/json 上传json数据
-- 支持 自定义 body 上传任意数据
-- 支持 自定义 headers
-- 支持 大文件上传,不限大小
-- 支持 zbuff 作为 body 上传和响应返回
-- 支持 bodyfile 直接把文件内容作为body上传
-- 支持 上传时使用自定义缓冲区, 2025.9.25 新增

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
    bodyfile = "xxx", -- 可选,直接把文件内容作为body上传, 优先级高于body参数
    upload_file_buff = zbuff.create(1024*64) -- 可选,上传时使用的缓冲区,默认会根据型号创建一个buff
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
-- 情况2, code < 0 时, resp会是个错误信息字符串

-- 对upload_file_buff参数的说明
--   1. 如果上传的文件比较大,建议传入这个参数,避免每次都创建和销毁缓冲区
--   2. 如果不传入这个参数,本库会根据不同的模组型号创建一个合适的缓冲区
--   3. 多个同时执行的httpplus请求,不可以共用同一个缓冲区

```

---

