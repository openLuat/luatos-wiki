# cc - VoLTE通话功能

**示例**

```lua
-- 选型手册上支持VoLTE通话功能的模组支持

```

## cc.lastNum()

获取最后一次通话的号码

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|获取最后一次通话的号码|

**例子**

无

---

## cc.dial(sim_id, number)

拨打电话

**参数**

|传入值类型|解释|
|-|-|
|number|sim_id|
|string|电话号码|

**返回值**

|返回值类型|解释|
|-|-|
|bool|拨打电话成功与否|

**例子**

无

---

## cc.hangUp(sim_id)

挂断电话

**参数**

|传入值类型|解释|
|-|-|
|number|sim_id|

**返回值**

无

**例子**

无

---

## cc.accept(sim_id)

接听电话

**参数**

|传入值类型|解释|
|-|-|
|number|sim_id|

**返回值**

|返回值类型|解释|
|-|-|
|bool|接听电话成功与否|

**例子**

无

---

## cc.init(multimedia_id)

初始化电话功能

**参数**

|传入值类型|解释|
|-|-|
|number|multimedia_id 多媒体id|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|

**例子**

无

---

## cc.record(on_off,upload_zbuff1, upload_zbuff2, download_zbuff1, download_zbuff2)

录音通话

**参数**

|传入值类型|解释|
|-|-|
|boolean|开启关闭通话录音功能，false或者nil关闭，其他开启|
|zbuff|上行数据保存区1,zbuff创建时的空间容量必须是640的倍数,下同|
|zbuff|上行数据保存区2,和上行数据保存区1组成双缓冲区|
|zbuff|下行数据保存区1|
|zbuff|下行数据保存区2,和下行数据保存区1组成双缓冲区|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否，如果处于通话状态，会失败|

**例子**

```lua
buff1 = zbuff.create(6400,0,zbuff.HEAP_AUTO)
buff2 = zbuff.create(6400,0,zbuff.HEAP_AUTO)
buff3 = zbuff.create(6400,0,zbuff.HEAP_AUTO)
buff4 = zbuff.create(6400,0,zbuff.HEAP_AUTO)
cc.on("record", function(type, buff_point)
 log.info(type, buff_point) -- type==true是下行数据，false是上行数据 buff_point指示双缓存中返回了哪一个
end)
cc.record(true, buff1, buff2, buff3, buff4)

```

---

## cc.quality()

获取当前通话质量

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|1为低音质(8K)，2为高音质(16k)，0没有在通话|

**例子**

无

---

## cc.on(event, func)

注册通话回调

**参数**

|传入值类型|解释|
|-|-|
|string|事件名称 音频录音数据为"record"|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
cc.on("record", function(type, buff_point)
 log.info(type, buff_point) -- type==true是下行数据，false是上行数据 buff_point指示双缓存中返回了哪一个
end)

```

---

