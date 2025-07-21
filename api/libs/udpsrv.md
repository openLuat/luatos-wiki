# udpsrv - UDP服务器

**示例**

```lua
-- 具体用法请查
阅demo

```

## udpsrv.create(port, topic, adapter)

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

