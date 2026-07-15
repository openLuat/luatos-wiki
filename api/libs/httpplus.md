# httpplus - http库的补充

**示例**

```lua
-- 本库支持的功能有:
--   1. 大文件上传的问题,不限大小
--   2. 任意长度的header设置
--   3. 任意长度的body设置
--   4. 鉴权URL自动识别
--   5. body使用zbuff返回,可直接传输给uart等库
--   6. 下载回调函数, 可以处理大文件下载,不限大小
--   7. 文件下载和fota升级



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
-- 支持 通过回调函数处理单包/chunk块数据， 2026.1.9 新增
-- 支持 下载大文件,不限大小,需要搭配回调函数， 2026.1.9 新增
-- 支持 文件下载到本地
-- 支持 fota升级

-- 版本更新说明
-- 版本号：202607021200
-- 1、更新时间：2026-07-02 12:00
-- 2、更新内容
--    新增httpplus.version()接口
--    支持httpplus库文件版本号管理功能，版本号的格式为：yyyymmddhhmm，表示yyyy年mm月dd日hh时mm分发布的版本

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
    upload_file_buff = zbuff.create(1024*64), -- 可选,上传时使用的缓冲区,默认会根据型号创建一个buff
    server_cert = nil, -- 可选,HTTPS服务器证书内容,PEM格式字符串
    client_cert = nil, -- 可选,HTTPS客户端证书内容,PEM格式字符串
    client_key  = nil, -- 可选,HTTPS客户端私钥内容,PEM格式字符串
    client_password = nil, -- 可选,HTTPS客户端私钥密码,字符串
    callback = nil, -- 可选,回调函数,用于接收数据,支持Content-Length和chunked两种模式，包含以下参数
                        -- total_len: number类型，Content-Length模式时表示响应体的总长度，chunked模式时表示0
                        -- recv_len: number类型，Content-Length模式时表示当前接收的字节数，chunked模式时表示单个chunk数据块长度
                        -- recv_data: string类型，Content-Length模式时表示当前接收的数据内容，chunked模式时表示单个chunk数据块内容（不包含chunk长度和\r\n）
                        -- userdata: string类型，表示用户传入的自定义回调参数（在请求时指定）
    userdata = nil, -- 可选,用户自定义参数,会原封不动的传入回调函数中
    is_big_file = false, -- 可选,是否为大文件下载模式,默认false，开启后，返回值中的resp.body参数会被设置为nil
                        -- 同时强制要求设置callback参数, 用于接收数据
    dst = nil, -- 可选,文件下载路径，设置后会自动将响应内容写入该文件
    fota = false, -- 可选,是否为fota升级模式，设置为true会使用fota系统功能进行升级
                  -- fota模式下resp会额外返回: fota_success(boolean)是否成功, fota_msg(string)结果描述
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

-- 文件下载示例
local code, resp = httpplus.request({
    url = "http://example.com/file.bin",
    dst = "/sdcard/file.bin",
    callback = function(total, recv, data)
        log.info("下载进度", recv, "/", total)
    end
})

-- fota升级示例
local code, resp = httpplus.request({
    url = "http://example.com/fota.bin",
    fota = true,
    callback = function(total, recv, data)
        log.info("fota进度", recv, "/", total)
    end
})
-- fota升级结果判断
if code == 200 and resp.fota_success then
    log.info("fota升级成功，3秒后重启")
    sys.wait(3000)
    rtos.reboot()
else
    log.error("fota升级失败", resp.fota_msg)
end

```

---

