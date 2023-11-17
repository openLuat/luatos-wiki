# onewire - 单总线协议驱动

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/onewire/binding/luat_lib_onewire.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看onewire的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/onewire)
```

**示例**

```lua
-- 本代码库尚处于开发阶段

```

## onewire.ds18b20(mode, pin, check)



读取DS18B20

**参数**

|传入值类型|解释|
|-|-|
|int|模式, 只能是 onewire.GPIO 或者 onewire.HW|
|int|GPIO模式对应GPIO编号, HW模式根据实际硬件来确定|
|boolean|是否检查数据的CRC值|

**返回值**

|返回值类型|解释|
|-|-|
|number|成功返回温度值,否则返回nil.单位 0.1摄氏度|

**例子**

```lua

-- GPIO模式,接 GPIO 9
local temp = onewire.ds18b20(onewire.GPIO, 9, true)
if temp then
    log.info("读取到的温度值", temp)
else
    log.info("读取失败")
end


```

---

