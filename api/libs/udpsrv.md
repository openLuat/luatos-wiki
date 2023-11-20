# udpsrv - UDP服务器

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`Air601` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3` {bdg-primary}`Air780E/Air700E` {bdg-primary}`Air780EP`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/udpsrv.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看udpsrv的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/socket)
```

**示例**

```lua
-- 具体用法请查阅demo

```

## udpsrv.create(port, topic)



创建UDP服务器

**参数**

|传入值类型|解释|
|-|-|
|int|端口号, 必填, 必须大于0小于65525|
|string|收取UDP数据的topic,必填|
|int|网络适配编号, 默认为nil,可选|

**返回值**

|返回值类型|解释|
|-|-|
|table|UDP服务的实体, 若创建失败会返回nil|

**例子**

无

---

