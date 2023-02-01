# libfota - libfota fota升级

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../script/libs/libfota.lua)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
--注意:因使用了sys.wait()所有api需要在协程中使用
--用法实例
local libfota = require("libfota")

-- 功能:获取fota的回调函数
-- 参数:-- result：number类型，0表示成功，1表示连接失败，2表示url错误，3表示服务器断开，4表示接收报文错误
function libfota_cb(result)
    -- fota成功
    if result == 0 then
        rtos.reboot()   --如果还有其他事情要做，就不要立刻reboot
    end
end
libfota.request(libfota_cb,0,0,0,"http://iot.openluat.com/api/site/firmware_upgrade?project_key=" .. _G.PRODUCT_KEY .. "&imei=".. mobile.imei() .. "&device_key=&firmware_name=" .. _G.PROJECT.. "_LuatOS-SoC_" .. rtos.bsp() .. "&version=" .. rtos.version():sub(2) .. "." .. _G.VERSION)


```

## libfota.request(cbFnc,storge_location, len, param1,ota_url,ota_port,timeout)



fota升级

**参数**

|传入值类型|解释|
|-|-|
|function|cbFnc 用户回调函数，回调函数的调用形式为：cbFnc(result)|
|number/string|storge_location fota数据存储的起始位置<br>如果是int，则是由芯片平台具体判断<br>如果是string，则存储在文件系统中<br>如果为nil，则由底层决定存储位置|
|number|len 数据存储的最大空间|
|userdata|param1,如果数据存储在spiflash时,为spi_device|
|string|ota_url url|
|number|ota_port 请求端口,默认80|
|number|timeout 请求超时时间,单位毫秒,默认20000毫秒|
|return|nil|

**返回值**

无

**例子**

无

---

