# exremotefile - exremotefile 远程文件管理系统扩展库，提供AP热点创建、SD卡挂载、SERVER文件管理服务器等功能，支持文件浏览、上传、下载和删除操作。

**示例**

```lua
注：在使用exremotefile 扩展库时，需要将同一目录下的explorer.html文件烧录进模组中，否则无法启动server服务器来创建文件管理系统!!!

注：如果使用Air8000开发板测试，必须自定义配置is_8000_development_board = true
因为Air8000开发板上TF和以太网是同一个SPI，使用开发板时必须要将以太网拉高
如果使用其他硬件，需要根据硬件原理图来决定是否需要此操作

本文件的对外接口有2个：
1、exremotefile.open(ap_opts, sdcard_opts, server_opts)：启动远程文件管理系统，可配置AP参数、SD卡参数和服务器参数
-- 启动后连接AP热点，直接使用luatools日志中默认的地址"http://192.168.4.1:80/explorer.html"来访问文件管理服务器。
-- 如果使用自定义配置，则需要根据配置中的server_addr和server_port参数来访问文件管理服务器。

2、exremotefile.close()：关闭远程文件管理系统，停止AP热点、卸载SD卡和关闭HTTP服务器

```

## exremotefile.open(ap_opts, sdcard_opts, server_opts)

启动文件管理系统，包括创建AP热点、挂载TF/SD卡和启动SERVER文件管理服务器功能

**参数**

|传入值类型|解释|
|-|-|
|table|ap_opts 可选，AP配置选项表|
|table|sdcard_opts 可选，TF/SD卡挂载配置选项表|
|table|server_opts 可选，服务器配置选项表|

**返回值**

|返回值类型|解释|
|-|-|
|无|无返回值|

**例子**

```lua
-- 一、使用默认参数创建server服务器
-- 启动后连接默认AP热点，直接访问日志中默认的地址"http://192.168.4.1:80/explorer.html"来访问文件管理服务器。
exremotefile.open()


-- 二、自定义参数启动
-- 启动后连接自定义AP热点，访问日志中自定义的地址"http://"server_addr":"server_port"/explorer.html"来访问文件管理服务器。
exremotefile.open({
    ap_ssid = "LuatOS_FileHub", -- WiFi名称
    ap_pwd = "12345678"         -- WiFi密码
}, 
{
    spi_id = 1,                 -- SPI编号
    spi_cs = 12，               -- CS片选引脚
    is_8000_development_board = false, -- 是否使用8000开发板
    is_sdio = false             -- 是否使用sdio挂载
}, 
{
    server_addr = "192.168.4.1",    -- 服务器地址
    server_port = 80,           -- 服务器端口
    user_name = "admin",        -- 用户名
    user_pwd = "123456"          -- 密码
})

```

---

## exremotefile.close()

关闭文件管理系统，包括停止HTTP文件服务器、取消TF/SD卡挂载和停止AP热点

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|无|无返回值|

**例子**

```lua
-- 关闭文件管理系统
-- exremotefile.close()

```

---

