# aliyun2 - 阿里云物联网平台(开发中)

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/aliyun2.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看aliyun2的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/aliyun2)
```

**示例**

```lua
-- 请查阅demo

-- 本库基于阿里云物联网重新设计, 与aliyun.lua库不兼容
-- 本库尚属开发测试阶段, API随时可能变化, 也可能不变^_^

```

## aliyun.create(opts)



初始化一个aliyun示例

**参数**

|传入值类型|解释|
|-|-|
|table|参数表|
|return|aliyun实例|

**返回值**

无

**例子**

```lua
-- 初始化一个aliyun示例
local ali = aliyun.create(opts)
if ali and aliyun2.start(ali) then
    while 1 do
        local result, tip, params = sys.waitUntil(ali.topic, 30000)
        if result then
            log.info("aliyun", "event", tip, params)
        end
    end
else
    log.error("aliyun", "初始化失败")
end

```

---

## aliyun2.start(ali)



启动aliyun实例

**参数**

|传入值类型|解释|
|-|-|
|return|成功返回true,失败返回false|

**返回值**

无

**例子**

无

---

## aliyun2.stop(ali)



关闭aliyun实例

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功返回true,失败返回false|

**例子**

无

---

## aliyun2.ready(ali)



是否已经连接上

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|已经成功返回true,否则一概返回false|

**例子**

无

---

## aliyun2.subscribe(ali, topic)



订阅自定义的topic

**参数**

|传入值类型|解释|
|-|-|
|return|成功返回true,失败返回false或者nil|

**返回值**

无

**例子**

无

---

## aliyun2.publish(ali, topic, payload, qos, retain)



上报消息,上行数据

**参数**

|传入值类型|解释|
|-|-|
|return|成功返回true,失败返回false或者nil|

**返回值**

无

**例子**

无

---

