# ble - 低功耗蓝牙

**示例**

```lua
-- 本库用于操作BLE对象, 需要搭配bluetooth.init()使用
-- 详细用法请查阅demo

-- 模式解释
-- 从机模式(peripheral), 设备会被扫描到, 并且可以被连接
-- 主机模式(central), 设备会扫描其他设备, 并且可以连接其他设备
-- 广播者模式(ibeacon), 设备会周期性的广播beacon信息, 但不会被扫描到, 也不会连接其他设备
-- 观察者模式(scan), 设备会扫描其他设备, 但不会连接其他设备

-- 从机模式(peripheral)的基本流程(概要描述)
-- 1. 初始化蓝牙框架
-- 2. 创建BLE对象
-- local ble_device = bluetooth_device:ble(ble_event_cb)
-- 3. 创建GATT描述
-- local att_db = {xxx}
-- 4. 创建广播信息
-- ble_device:adv_create(adv_data)
-- 5. 开始广播
-- ble_device:adv_start()
-- 6. 等待连接
-- 7. 在回调函数中处理连接事件, 如接收数据, 发送数据等

-- 主机模式(central)的基本流程(概要描述)
-- TODO

-- 广播者模式(ibeacon)的基本流程(概要描述)
-- TODO

-- 观察者模式(scan)的基本流程(概要描述)
-- 1. 初始化蓝牙框架
-- 2. 创建BLE对象
-- local ble_device = bluetooth_device:ble(ble_event_cb)
-- 3. 开始扫描
-- ble_device:scan_start()
-- 4. 在回调函数中处理扫描事件, 如接收设备信息等
-- 5. 按需停止扫描
-- ble_device:scan_stop()

```

## 常量

|常量|类型|解释|
|-|-|-|
|ble.CHNLS_ALL|所有通道(37|38 39)|


## ble.gatt_create(opts)

创建一个BLE GATT服务

**参数**

|传入值类型|解释|
|-|-|
|table|GATT服务的描述信息|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否创建成功|

**例子**

```lua
local att_db = { -- Service
    string.fromHex("FA00"), -- Service UUID, 服务的UUID, 可以是16位、32位或128位
    -- Characteristic
    { -- Characteristic 1
        string.fromHex("EA01"), -- Characteristic UUID Value, 特征的UUID值, 可以是16位、32位或128位
        ble.NOTIFY | ble.READ | ble.WRITE -- Properties, 对应蓝牙特征的属性, 参考权限常量
        string.fromHex("1234"), -- 默认value
    }
}
ble_device:gatt_create(att_db)

```

---

## ble.adv_create(opts)

创建一个BLE广播

**参数**

|传入值类型|解释|
|-|-|
|table|广播的描述信息|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否创建成功|

**例子**

```lua
-- 创建广播信息
ble_device:adv_create({
    addr_mode = ble.PUBLIC, -- 广播地址模式, 可选值: ble.PUBLIC, ble.RANDOM, ble.RPA, ble.NRPA
    channel_map = ble.CHNLS_ALL, -- 广播的通道, 可选值: ble.CHNLS_37, ble.CHNLS_38, ble.CHNLS_39, ble.CHNLS_ALL
    intv_min = 120, -- 广播间隔最小值, 单位为0.625ms, 最小值为20, 最大值为10240
    intv_max = 120, -- 广播间隔最大值, 单位为0.625ms, 最小值为20, 最大值为10240
    adv_data = { -- 支持表格形式, 也支持字符串形式(255字节以内)
        {ble.FLAGS, string.char(0x06)},
        {ble.COMPLETE_LOCAL_NAME, "LuatOS123"}, -- 广播的设备名
        {ble.SERVICE_DATA, string.fromHex("FE01")}, -- 广播的服务数据
        {ble.MANUFACTURER_SPECIFIC_DATA, string.fromHex("05F0")}
    }
})

```

---

## ble.adv_start()

开始广播

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功|

**例子**

```lua
-- 开始广播
ble_device:adv_start()

-- 提醒, 对于从机模式, 如果被断开了连接, 则需要重新开始广播, 才能被重新搜索到

```

---

## ble.adv_stop()

主动停止广播

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功|

**例子**

```lua
-- 停止广播
ble_device:adv_stop()

```

---

## ble.write_notify(opts, value)

写入带通知的特征值

**参数**

|传入值类型|解释|
|-|-|
|table|特征值的描述信息|
|string|value 要写入的值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功|

**例子**

```lua
-- 写入带通知的特征值
ble_device:write_notify({
    uuid_service = "FA00", -- 服务的UUID, 可以是16位、32位或128位
    uuid_characteristic = "EA01", -- 特征的UUID值, 可以是16位、32位或128位
}, "Hello BLE") -- 要写入的值

```

---

## ble.write_indicate(opts, value)

写入带指示的特征值

**参数**

|传入值类型|解释|
|-|-|
|table|特征值的描述信息|
|string|value 要写入的值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功|

**例子**

```lua
-- 写入带指示的特征值
ble_device:write_indicate({
    uuid_service = "FA00", -- 服务的UUID, 可以是16位、32位或128位
    uuid_characteristic = "EA01", -- 特征的UUID值, 可以是16位、32位或128位
}, "Hello BLE") -- 要写入的值

```

---

## ble.write_value(opts, value)

写入特征值

**参数**

|传入值类型|解释|
|-|-|
|table|特征值的描述信息|
|string|value 要写入的值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功|

**例子**

```lua
-- 写入特征值,填充预设值,被动读取
ble_device:write_value({
    uuid_service = "FA00", -- 服务的UUID, 可以是16位、32位或128位
    uuid_characteristic = "EA01", -- 特征的UUID值, 可以是16位、32位或128位
}, "Hello BLE") -- 要写入的值

```

---

## ble.read_value(opts)

读取特征值

**参数**

|传入值类型|解释|
|-|-|
|table|特征值的描述信息|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功|

**例子**

```lua
-- 读取特征值,通过回调中的 EVENT_READ_VALUE 事件返回读取的value值
ble_device:read_value({
    uuid_service = "FA00", -- 服务的UUID, 可以是16位、32位或128位
    uuid_characteristic = "EA01", -- 特征的UUID值, 可以是16位、32位或128位
})

```

---

## ble.notify_enable(opts, enable)

开关通知监听

**参数**

|传入值类型|解释|
|-|-|
|table|特征值的描述信息|
|boolean|enable 开/关 可选,默认开|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功|

**例子**

```lua
-- 写入特征值,填充预设值,被动读取
ble_device:notify_enable({
    uuid_service = "FA00", -- 服务的UUID, 可以是16位、32位或128位
    uuid_characteristic = "EA01", -- 特征的UUID值, 可以是16位、32位或128位
}, true) -- 开/关

```

---

## ble.indicate_enable(opts, enable)

开关指示监听

**参数**

|传入值类型|解释|
|-|-|
|table|特征值的描述信息|
|boolean|enable 开/关 可选,默认开|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功|

**例子**

```lua
-- 写入特征值,填充预设值,被动读取
ble_device:indicate_enable({
    uuid_service = "FA00", -- 服务的UUID, 可以是16位、32位或128位
    uuid_characteristic = "EA01", -- 特征的UUID值, 可以是16位、32位或128位
}, true) -- 开/关

```

---

## ble.scan_create(addr_mode, scan_interval, scan_window)

创建一个BLE扫描

**参数**

|传入值类型|解释|
|-|-|
|number|addr_mode 广播地址模式, 可选值: ble.PUBLIC, ble.RANDOM, ble.RPA, ble.NRPA|
|number|scan_interval 扫描间隔, 单位为0.625ms, 最小值为20, 最大值为10240|
|number|scan_window 扫描窗口, 单位为0.625ms, 最小值为20, 最大值为10240|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否创建成功|

**例子**

```lua
-- 创建BLE扫描
ble_device:scan_create(ble.PUBLIC, 100, 100)

```

---

## ble.scan_start()

开始BLE扫描

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功|

**例子**

```lua
-- 开始BLE扫描
ble_device:scan_start()
-- 提醒, 扫描会一直进行, 直到调用ble.scan_stop()停止扫描
-- 扫描结果会立即执行回调, 同一个设备不会去重, 扫描到数据就会执行回调

```

---

## ble.scan_stop()

停止BLE扫描

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功|

**例子**

```lua
-- 停止BLE扫描
ble_device:scan_stop()
-- 提醒, 扫描会一直进行, 直到调用ble.scan_stop()停止扫描

```

---

## ble.connect(mac, addr_type)

BLE连接

**参数**

|传入值类型|解释|
|-|-|
|string|mac 地址|
|int|地址类型 ble.PUBLIC ble.RANDOM|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功|

**例子**

```lua
-- BLE连接
ble_device:connect(string.fromHex("C8478C4E027D"),0)

```

---

## ble.disconnect()

BLE断开连接

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|是否成功|

**例子**

```lua
-- BLE断开连接
ble_device:disconnect()

```

---

## ble.adv_decode(data)

解码广播数据

**参数**

|传入值类型|解释|
|-|-|
|string|data 广播数据|

**返回值**

|返回值类型|解释|
|-|-|
|table|广播数据的解码结果|

**例子**

```lua
-- 解码广播数据
local data = string.fromHex("1EFF060001092002BE0F0AAD8A6D2E251ED6DFBB3D15249929E10BE138DF7B")
-- 解析广播数据
local adv_data = ble_device:adv_decode(data)
if adv_data then
    for k, v in pairs(adv_data) do
        log.info("ble", "adv data", v.len, v.tp, v.data:toHex())
    end
end

```

---

## ble.mac()

获取蓝牙MAC

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|当前的MAC|

**例子**

```lua
-- 本函数于2025.8.29新增
local mac = ble.mac()
log.info("ble mac", mac and mac:toHex())

```

---

