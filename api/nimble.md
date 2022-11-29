# nimble - 蓝牙BLE库(nimble版)

{bdg-success}`已适配` {bdg-primary}`Air101/Air103` {bdg-primary}`ESP32C3`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/nimble/src/luat_lib_nimble.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看nimble的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/nimble)
```

**示例**

```lua
-- 本库当前支持Air101/Air103/ESP32/ESP32C3
-- 理论上支持ESP32C2/ESP32S2/ESP32S3,但尚未测试

-- 本库当前仅支持BLE Peripheral, 其他模式待添加
sys.taskInit(function()
    -- 初始化nimble, 因为当仅支持作为主机,也没有其他配置项
    nimble.init("LuatOS-Wendal") -- 选取一个蓝牙设备名称
    sys.wait(1000)

    --local data = string.char(0x5A, 0xA5, 0x12, 0x34, 0x56)
    local data = "1234567890"
    while 1 do
        sys.wait(5000)
        -- Central端建立连接并订阅后, 可上报数据
        nimble.send_msg(1, 0, data)
    end
end
sys.subscribe("BLE_GATT_WRITE_CHR", function(info, data)
    -- Central端建立连接后, 可往设备写入数据
    log.info("ble", "Data Got", data:toHex())
end)

-- 配合微信小程序 "LuatOS蓝牙调试"
-- 1. 若开发板无天线, 将手机尽量靠近芯片也能搜到
-- 2. 该小程序是开源的, 每次write会自动分包
-- https://gitee.com/openLuat/luatos-miniapps

```

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

```

---

