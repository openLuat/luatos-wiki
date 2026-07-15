# dnsproxy - DNS代理转发

**示例**

```lua
-- 具体用法请查阅demo

-- 版本更新说明
-- 版本号：202607100900
-- 1、更新时间：2026-07-10 09:00
-- 2、更新内容
--    新增 dnsproxy.close() 接口，关闭所有 socket 并清空 DNS 请求映射表

-- 版本号：202607021200
-- 1、更新时间：2026-07-02 12:00
-- 2、更新内容
--    新增dnsproxy.version()接口
--    支持dnsproxy库文件版本号管理功能，版本号的格式为：yyyymmddhhmm，表示yyyy年mm月dd日hh时mm分发布的版本

```

## dnsproxy.setup(adapter, main_adapter)

创建UDP服务器

**参数**

|传入值类型|解释|
|-|-|
|int|监听的网络适配器id|
|int|网络适配编号, 默认为nil,可选|

**返回值**

|返回值类型|解释|
|-|-|
|table|UDP服务的实体, 若创建失败会返回nil|

**例子**

无

---

