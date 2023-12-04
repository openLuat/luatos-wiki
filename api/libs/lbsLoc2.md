# lbsLoc2 - 基站定位v2

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/lbsLoc2.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看lbsLoc2的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/lbsLoc2)
```

**示例**

```lua
-- 注意:
-- 1. 因使用了sys.wait()所有api需要在协程中使用
-- 2. 仅支持单基站定位, 即当前联网的基站
-- 3. 本服务当前处于测试状态
sys.taskInit(function()
    sys.waitUntil("IP_READY", 30000)
    -- mobile.reqCellInfo(60)
    -- sys.wait(1000)
    while mobile do -- 没有mobile库就没有基站定位
        mobile.reqCellInfo(15)
        sys.waitUntil("CELL_INFO_UPDATE", 3000)
        local lat, lng, t = lbsLoc2.request(5000)
        -- local lat, lng, t = lbsLoc2.request(5000, "bs.openluat.com")
        log.info("lbsLoc2", lat, lng, (json.encode(t or {})))
        sys.wait(60000)
    end
end)

```

## lbsLoc2.request(timeout, host, port, reqTime)



执行定位请求

**参数**

|传入值类型|解释|
|-|-|
|number|请求超时时间,单位毫秒,默认15000|
|number|服务器地址,有默认值,可以是域名,一般不需要填|
|number|服务器端口,默认12411,一般不需要填|
|bool|是否要求返回服务器时间|

**返回值**

|返回值类型|解释|
|-|-|
|string|若成功,返回定位坐标的纬度,否则会返还nil|
|string|若成功,返回定位坐标的精度,否则会返还nil|
|table|服务器时间,东八区时间. 当reqTime为true且定位成功才会返回|

**例子**

```lua
-- 关于坐标系
-- 部分情况下会返回GCJ02坐标系, 部分情况返回的是WGS84坐标
-- 历史数据已经无法分辨具体坐标系
-- 鉴于两种坐标系之间的误差并不大,小于基站定位本身的误差, 纠偏的意义不大
sys.taskInit(function()
    sys.waitUntil("IP_READY", 30000)
    -- mobile.reqCellInfo(60)
    -- sys.wait(1000)
    while mobile do -- 没有mobile库就没有基站定位
        mobile.reqCellInfo(15)
        sys.waitUntil("CELL_INFO_UPDATE", 3000)
        local lat, lng, t = lbsLoc2.request(5000)
        -- local lat, lng, t = lbsLoc2.request(5000, "bs.openluat.com")
        log.info("lbsLoc2", lat, lng, (json.encode(t or {})))
        sys.wait(60000)
    end
end)

```

---

