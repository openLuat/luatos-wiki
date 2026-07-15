# httpdns - 使用Http进行域名解析

**示例**

```lua
-- 通过阿里DNS获取结果
local ip = httpdns.ali("air32.cn")
log.info("httpdns", "air32.cn", ip)

-- 通过腾讯DNS获取结果
local ip = httpdns.tx("air32.cn")
log.info("httpdns", "air32.cn", ip)

-- 版本更新说明
-- 版本号：202607021200
-- 1、更新时间：2026-07-02 12:00
-- 2、更新内容
--    新增httpdns.version()接口
--    支持httpdns库文件版本号管理功能，版本号的格式为：yyyymmddhhmm，表示yyyy年mm月dd日hh时mm分发布的版本

```

## httpdns.ali(domain_name, opts)

通过阿里DNS获取结果

**参数**

|传入值类型|解释|
|-|-|
|string|域名|
|table|opts 可选参数, 与http.request的opts参数一致|

**返回值**

|返回值类型|解释|
|-|-|
|string|ip地址|

**例子**

```lua
local ip = httpdns.ali("air32.cn")
log.info("httpdns", "air32.cn", ip)
-- 指定网络适配器
local ip = httpdns.ali("air32.cn", {adapter=socket.LWIP_STA, timeout=3000})
log.info("httpdns", "air32.cn", ip)

```

---

## httpdns.tx(domain_name, opts)

通过腾讯DNS获取结果

**参数**

|传入值类型|解释|
|-|-|
|string|域名|
|table|opts 可选参数, 与http.request的opts参数一致|

**返回值**

|返回值类型|解释|
|-|-|
|string|ip地址|

**例子**

```lua
local ip = httpdns.tx("air32.cn")
log.info("httpdns", "air32.cn", ip)

-- 指定网络适配器
local ip = httpdns.tx("air32.cn", {adapter=socket.LWIP_STA, timeout=3000})
log.info("httpdns", "air32.cn", ip)

```

---

