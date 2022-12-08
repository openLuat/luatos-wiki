# sms - 短信

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/sms/luat_lib_sms.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看sms的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/sms)
```

**示例**

```lua
-- 注意, Air780E/Air600E/Air780EG/Air780EG均不支持电信卡的短信!!
-- 本库尚在开发中, 暂不可用

```

## sms.send(phone, msg)

发送短信

**参数**

|传入值类型|解释|
|-|-|
|string|电话号码,必填|
|string|短信内容,必填|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false|

**例子**

无

---

