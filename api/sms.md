# sms - 短信

**示例**

```lua
-- 注意, Air780E/Air600E/Air780EG/Air780EG均不支持电信卡的短信!!
-- 意思是, 当上述模块搭配电信SIM卡, 无法从模块发出短信, 也无法在模块接收短信
-- 如果是联通卡或者移动卡, 均可收取短信, 但实名制的卡才能发送短信

```

## sms.send(phone, msg, auto_phone_fix)

异步发送短信

**参数**

|传入值类型|解释|
|-|-|
|string|电话号码,必填|
|string|短信内容,必填|
|bool|是否自动处理电话号号码的格式,默认是按短信内容和号码格式进行自动判断, 设置为false可禁用|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false或nil|

**例子**

无

---

## sms.sendLong(phone, msg, auto_phone_fix).wait()

同步发送短信

**参数**

|传入值类型|解释|
|-|-|
|string|电话号码,必填|
|string|短信内容,必填|
|bool|是否自动处理电话号号码的格式,默认是按短信内容和号码格式进行自动判断, 设置为false可禁用|

**返回值**

|返回值类型|解释|
|-|-|
|bool|异步等待结果 成功返回true, 否则返回false或nil|

**例子**

无

---

## sms.setNewSmsCb(func)

设置新SMS的回调函数

**参数**

|传入值类型|解释|
|-|-|
|function|回调函数, 3个参数, num, txt, metas|

**返回值**

|返回值类型|解释|
|-|-|
|nil|传入是函数就能成功,无返回值|

**例子**

```lua

sms.setNewSmsCb(function(num, txt, metas)
    -- num 手机号码
    -- txt 文本内容
    -- metas 短信的元数据,例如发送的时间,长短信编号
    -- 注意, 长短信会自动合并成一条txt
    log.info("sms", num, txt, metas and json.encode(metas) or "")
end)

```

---

## sms.autoLong(mode)

设置长短信的自动合并功能

**参数**

|传入值类型|解释|
|-|-|
|bool|是否自动合并,true为自动合并,为默认值|

**返回值**

|返回值类型|解释|
|-|-|
|bool|设置后的值|

**例子**

```lua
-- 禁用长短信的自动合并, 一般不需要禁用
sms.autoLong(false)

```

---

## sms.clearLong()

清除长短信缓存

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|清理掉的片段数量|

**例子**

```lua
sms.clearLong()

```

---

