# nimble - 蓝牙BLE库(nimble版)

**示例**

```lua
-- 本库当前支持Air101/Air103/ESP32/ESP32C3/ESP32S3
-- 用法请查阅demo, API函数会归于指定的模式

-- 名称解释:
-- peripheral 外设模式, 或者成为从机模式, 是被连接的设备
-- central    中心模式, 或者成为主机模式, 是扫描并连接其他设备
-- ibeacon    周期性的beacon广播

-- UUID       设备的服务(service)和特征(characteristic)会以UUID作为标识,支持 2字节/4字节/16字节,通常用2字节的缩短版本
-- chr        设备的服务(service)由多个特征(characteristic)组成, 简称chr
-- characteristic 特征由UUID和flags组成, 其中UUID做标识, flags代表该特征可以支持的功能

```

## 常量

|常量|类型|解释|
|-|-|-|
|nimble.CHR_F_WRITE|number|chr的FLAGS值, 可写, 且需要响应|
|nimble.CHR_F_READ|number|chr的FLAGS值, 可读|
|nimble.CHR_F_WRITE_NO_RSP|number|chr的FLAGS值, 可写, 不需要响应|
|nimble.CHR_F_NOTIFY|number|chr的FLAGS值, 可订阅, 不需要回复|
|nimble.CHR_F_INDICATE|number|chr的FLAGS值, 可订阅, 需要回复|
|nimble.CFG_ADDR_ORDER|number|UUID的转换的大小端, 结合config函数使用, 默认0, 可选0/1|


## nimble.init(name)

初始化BLE上下文,开始对外广播/扫描

**参数**

|传入值类型|解释|
|-|-|
|string|蓝牙设备名称,可选,建议填写|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|

**例子**

```lua
-- 参考 demo/nimble
-- 本函数对所有模式都适用

```

---

## nimble.deinit()

关闭BLE上下文

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|

**例子**

```lua
-- 仅部分设备支持,当前可能都不支持
-- 本函数对所有模式都适用

```

---

## nimble.mode(tp)

设置模式

**参数**

|传入值类型|解释|
|-|-|
|int|模式, 默认server/peripheral, 可选 client/central模式 nimble.MODE_BLE_CLIENT|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|

**例子**

```lua
-- 参考 demo/nimble
-- 必须在nimble.init()之前调用
-- nimble.mode(nimble.MODE_BLE_CLIENT) -- 简称从机模式,未完善

```

---

## nimble.connok()

是否已经建立连接

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|已连接返回true,否则返回false|

**例子**

```lua
log.info("ble", "connected?", nimble.connok())
-- 从机peripheral模式, 设备是否已经被连接
-- 主机central模式, 是否已经连接到设备
-- ibeacon模式, 无意义

```

---

## nimble.send_msg(conn, handle, data)

发送信息

**参数**

|传入值类型|解释|
|-|-|
|int|连接id, 当前固定填1|
|int|处理id, 当前固定填0|
|string|数据字符串,可包含不可见字符|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|

**例子**

```lua
-- 参考 demo/nimble
-- 本函数对peripheral/从机模式适用

```

---

## nimble.setUUID(tp, addr)

设置server/peripheral的UUID

**参数**

|传入值类型|解释|
|-|-|
|string|配置字符串,后面的示例有说明|
|string|地址字符串|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功与否|

**例子**

```lua
-- 参考 demo/nimble, 2023-02-25之后编译的固件支持本API
-- 必须在nimble.init()之前调用
-- 本函数对peripheral/从机模式适用

-- 设置SERVER/Peripheral模式下的UUID, 支持设置3个
-- 地址支持 2/4/16字节, 需要二进制数据
-- 2字节地址示例: AABB, 写 string.fromHex("AABB") ,或者 string.char(0xAA, 0xBB)
-- 4字节地址示例: AABBCCDD , 写 string.fromHex("AABBCCDD") ,或者 string.char(0xAA, 0xBB, 0xCC, 0xDD)
nimble.setUUID("srv", string.fromHex("380D"))      -- 服务主UUID         ,  默认值 180D
nimble.setUUID("write", string.fromHex("FF31"))    -- 往本设备写数据的UUID,  默认值 FFF1
nimble.setUUID("indicate", string.fromHex("FF32")) -- 订阅本设备的数据的UUID,默认值 FFF2

```

---

## nimble.mac(mac)

获取蓝牙MAC

**参数**

|传入值类型|解释|
|-|-|
|string|待设置的MAC地址, 6字节, 不传就是单获取|

**返回值**

|返回值类型|解释|
|-|-|
|string|蓝牙MAC地址,6字节|

**例子**

```lua
-- 参考 demo/nimble, 2023-02-25之后编译的固件支持本API
-- 本函数对所有模式都适用
local mac = nimble.mac()
log.info("ble", "mac", mac and mac:toHex() or "Unknwn")

-- 修改MAC地址, 2024.06.05 新增, 当前仅Air601支持, 修改后重启生效
nimble.mac(string.fromHex("1234567890AB"))

```

---

## nimble.sendNotify(srv_uuid, chr_uuid, data)

发送notify

**参数**

|传入值类型|解释|
|-|-|
|string|服务的UUID,预留,当前填nil就行|
|string|特征的UUID,必须填写|
|string|数据, 必填, 跟MTU大小相关, 一般不要超过256字节|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
-- 本API于 2023.07.31 新增
-- 本函数对peripheral模式适用
nimble.sendNotify(nil, string.fromHex("FF01"), string.char(0x31, 0x32, 0x33, 0x34, 0x35))

```

---

## nimble.sendIndicate(srv_uuid, chr_uuid, data)

发送indicate

**参数**

|传入值类型|解释|
|-|-|
|string|服务的UUID,预留,当前填nil就行|
|string|特征的UUID,必须填写|
|string|数据, 必填, 跟MTU大小相关, 一般不要超过256字节|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
-- 本API于 2023.07.31 新增
-- 本函数对peripheral模式适用
nimble.sendIndicate(nil, string.fromHex("FF01"), string.char(0x31, 0x32, 0x33, 0x34, 0x35))

```

---

## nimble.advParams(conn_mode, disc_mode, itvl_min, itvl_max, channel_map, filter_policy, high_duty_cycle)

设置广播参数

**参数**

|传入值类型|解释|
|-|-|
|int|广播模式, 0 - 不可连接, 1 - 定向连接, 2 - 未定向连接, 默认0|
|int|发现模式, 0 - 不可发现, 1 - 限制发现, 3 - 通用发现, 默认0|
|int|最小广播间隔, 0 - 使用默认值, 范围 1 - 65535, 单位0.625ms, 默认0|
|int|最大广播间隔, 0 - 使用默认值, 范围 1 - 65535, 单位0.625ms, 默认0|
|int|广播通道, 默认0, 一般不需要设置|
|int|过滤规则, 默认0, 一般不需要设置|
|int|当广播模式为"定向连接"时,是否使用高占空比模式, 默认0, 可选1|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 当前仅ibeacon模式/peripheral/从机可使用
-- 例如设置 不可连接 + 限制发现
-- 需要在nimble.init之前设置好
nimble.advParams(0, 1)
-- 注意peripheral模式下自动配置 conn_mode 和 disc_mode

```

---

## nimble.setChr(index, uuid, flags)

设置chr的特征

**参数**

|传入值类型|解释|
|-|-|
|int|chr的索引, 默认0-3|
|int|chr的UUID, 可以是2/4/16字节|
|int|chr的FLAGS, 请查阅常量表|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 仅peripheral/从机可使用
nimble.setChr(0, string.fromHex("FF01"), nimble.CHR_F_WRITE_NO_RSP | nimble.CHR_F_NOTIFY)
nimble.setChr(1, string.fromHex("FF02"), nimble.CHR_F_READ | nimble.CHR_F_NOTIFY)
nimble.setChr(2, string.fromHex("FF03"), nimble.CHR_F_WRITE_NO_RSP)
-- 可查阅 demo/nimble/kt6368a

```

---

## nimble.config(id, value)

设置chr的特征

**参数**

|传入值类型|解释|
|-|-|
|int|配置的id,请查阅常量表|
|any|根据配置的不同, 有不同的可选值|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 本函数在任意模式可用
-- 本API于 2023.07.31 新增
-- 例如设置地址转换的大小端, 默认是0, 兼容老的代码
-- 设置成1, 服务UUID和chr的UUID更直观
nimble.config(nimble.CFG_ADDR_ORDER, 1)

```

---

## nimble.ibeacon(data, major, minor, measured_power)

配置iBeacon的参数,仅iBeacon模式可用

**参数**

|传入值类型|解释|
|-|-|
|string|数据, 必须是16字节|
|int|主版本号,默认2, 可选, 范围 0 ~ 65536|
|int|次版本号,默认10,可选, 范围 0 ~ 65536|
|int|名义功率, 默认0, 范围 -126 到 20 |

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
-- 参考 demo/nimble, 2023-02-25之后编译的固件支持本API
-- 本函数对ibeacon模式适用
nimble.ibeacon(data, 2, 10, 0)
nimble.init()

```

---

## nimble.advData(data, flags)

配置广播数据,仅iBeacon模式可用

**参数**

|传入值类型|解释|
|-|-|
|string|广播数据, 当前最高128字节|
|int|广播标识, 可选, 默认值是 0x06,即 不支持传统蓝牙(0x04) + 普通发现模式(0x02)|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

```lua
-- 参考 demo/nimble/adv_free, 2023-03-18之后编译的固件支持本API
-- 本函数对ibeacon模式适用
-- 数据来源可以多种多样
local data = string.fromHex("123487651234876512348765123487651234876512348765")
-- local data = crypto.trng(25)
-- local data = string.char(0x11, 0x13, 0xA3, 0x5A, 0x11, 0x13, 0xA3, 0x5A, 0x11, 0x13, 0xA3, 0x5A, 0x11, 0x13, 0xA3, 0x5A)
nimble.advData(data)
nimble.init()

-- nimble支持在init之后的任意时刻再次调用, 以实现数据更新
-- 例如 1分钟变一次
while 1 do
    sys.wait(60000)
    local data = crypto.trng(25)
    nimble.advData(data)
end

```

---

## nimble.scan(timeout)

扫描从机

**参数**

|传入值类型|解释|
|-|-|
|int|超时时间,单位秒,默认28秒|

**返回值**

|返回值类型|解释|
|-|-|
|bool|启动扫描成功与否|

**例子**

```lua
-- 参考 demo/nimble/scan
-- 本函数对central/主机模式适用
-- 本函数会直接返回, 然后通过异步回调返回结果

-- 调用本函数前, 需要先确保已经nimble.init()
nimble.scan()
-- timeout参数于 2023.7.11 添加

```

---

## nimble.connect(mac)

连接到从机

**参数**

|传入值类型|解释|
|-|-|
|string|设备的MAC地址|

**返回值**

|返回值类型|解释|
|-|-|
|bool|启动连接成功与否|

**例子**

```lua
-- 本函数对central/主机模式适用
-- 本函数会直接返回, 然后通过异步回调返回结果

```

---

## nimble.disconnect()

断开与从机的连接

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 本函数对central/主机模式适用
-- 本函数会直接返回

```

---

## nimble.discSvr()

扫描从机的服务列表

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 本函数对central/主机模式适用
-- 本函数会直接返回,然后异步返回结果
-- 这个API通常不需要调用, 在连接从机完成后,会主动调用一次

```

---

## nimble.listSvr()

获取从机的服务列表

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|table|服务UUID的数组|

**例子**

```lua
-- 本函数对central/主机模式适用

```

---

## nimble.discChr(svr_uuid)

扫描从机的指定服务的特征值

**参数**

|传入值类型|解释|
|-|-|
|string|指定服务的UUID值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功启动扫描与否|

**例子**

```lua
-- 本函数对central/主机模式适用

```

---

## nimble.listChr(svr_uuid)

获取从机的指定服务的特征值列表

**参数**

|传入值类型|解释|
|-|-|
|string|指定服务的UUID值|

**返回值**

|返回值类型|解释|
|-|-|
|table|特征值列表,包含UUID和flags|

**例子**

```lua
-- 本函数对central/主机模式适用

```

---

## nimble.discDsc(svr_uuid, chr_uuid)

扫描从机的指定服务的特征值的其他属性

**参数**

|传入值类型|解释|
|-|-|
|string|指定服务的UUID值|
|string|特征值的UUID值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功启动扫描与否|

**例子**

```lua
-- 本函数对central/主机模式适用

```

---

## nimble.writeChr(svr_uuid, chr_uuid, data)

往指定的服务的指定特征值写入数据

**参数**

|传入值类型|解释|
|-|-|
|string|指定服务的UUID值|
|string|指定特征值的UUID值|
|string|待写入的数据|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功启动写入与否|

**例子**

```lua
-- 本函数对central/主机模式适用

```

---

## nimble.readChr(svr_uuid, chr_uuid)

从指定的服务的指定特征值读取数据(异步)

**参数**

|传入值类型|解释|
|-|-|
|string|指定服务的UUID值|
|string|指定特征值的UUID值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功启动写入与否|

**例子**

```lua
-- 本函数对central/主机模式适用
-- 详细用法请参数 demo/nimble/central

```

---

## nimble.subChr(svr_uuid, chr_uuid)

订阅指定的服务的指定特征值

**参数**

|传入值类型|解释|
|-|-|
|string|指定服务的UUID值|
|string|指定特征值的UUID值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功启动订阅与否|

**例子**

```lua
-- 本函数对central/主机模式适用
-- 详细用法请参数 demo/nimble/central

```

---

## nimble.unsubChr(svr_uuid, chr_uuid)

取消订阅指定的服务的指定特征值

**参数**

|传入值类型|解释|
|-|-|
|string|指定服务的UUID值|
|string|指定特征值的UUID值|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|成功启动取消订阅与否|

**例子**

```lua
-- 本函数对central/主机模式适用
-- 详细用法请参数 demo/nimble/central

```

---

