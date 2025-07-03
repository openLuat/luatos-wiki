# espblufi - espblufi esp blufi 蓝牙配网(注意:初版不支持加密功能,需要后续版本支持!!!!!!!!)

**示例**

```lua
-- 此为Blufi 配网库
-- BluFi 配网指南:https://www.espressif.com/sites/default/files/documentation/esp32_bluetooth_networking_user_guide_cn.pdf

-- 安卓测试APP下载地址:https://github.com/EspressifApp/EspBlufiForAndroid/releases
-- 安卓APP源码下载地址:https://github.com/EspressifApp/EspBlufiForAndroid

-- IOS测试APP下载地址:https://apps.apple.com/cn/app/espblufi/id1450614082
-- IOSAPP源码下载地址:https://github.com/EspressifApp/EspBlufiForiOS

-- 小程序测试:微信搜索小程序:ESP Config
-- 小程序源码下载地址:https://github.com/EspressifApps/ESP-Config-WeChat

-- 注意:初版不支持加密功能,需要后续版本支持!!!!!!!!

-- 用法实例
local espblufi = require("espblufi")

local function espblufi_callback(event,data)
    if event == espblufi.EVENT_STA_INFO then
        for i, v in pairs(data) do
            print(i,v)
        end
    elseif event == espblufi.EVENT_SOFTAP_INFO then
        for i, v in pairs(data) do
            print(i,v)
        end
    elseif event == espblufi.EVENT_CUSTOM_DATA then
        espblufi.send_custom_data(data)
    end
end

sys.taskInit(function()
    espblufi.init(espblufi_callback)
    espblufi.start()
    while 1 do
        sys.wait(1000)
    end
end)


```

## espblufi.init(espblufi_callback,local_name)



初始化espblufi

**参数**

|传入值类型|解释|
|-|-|
|function|事件回调函数|
|number|蓝牙名，可选，默认为"BLUFI_xxx",xxx为设备型号(因为esp的配网测试app默认过滤蓝牙名称为BLUFI_开头的设备进行显示,可手动修改)|

**返回值**

无

**例子**

```lua
espblufi.init(espblufi_callback)

```

---

## espblufi.start()



开始配网

**参数**

无

**返回值**

无

**例子**

```lua
espblufi.start()

```

---

## espblufi.stop()



停止配网

**参数**

无

**返回值**

无

**例子**

```lua
espblufi.stop()

```

---

## espblufi.send_custom_data(data)



发送自定义数据，一般用于接收到客户端发送的自定义命令后进行回复

**参数**

|传入值类型|解释|
|-|-|
|string|回复的数据包内容|

**返回值**

无

**例子**

```lua
espblufi.send_custom_data(data)

```

---

