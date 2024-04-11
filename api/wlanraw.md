# wlanraw - WLAN数据RAW传输

{bdg-success}`已适配` {bdg-primary}`Air601` {bdg-primary}`Air101/Air103`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/device/wlanraw/binding/luat_lib_wlanraw.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


**示例**

```lua
-- 请查阅 https://github.com/wendal/xt804-spinet

```

## wlanraw.setup(opts, cb)



初始化WLAN的RAW层

**参数**

|传入值类型|解释|
|-|-|
|table|opts 配置参数|
|function|回调函数,形式function(buff, size)|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true表示成功,其他失败|

**例子**

```lua
-- 当前仅XT804系列支持, 例如 Air101/Air103/Air601/Air690
wlanraw.setup({
    buffsize = 1600, -- 缓冲区大小, 默认1600字节
    buffcount = 10, -- 缓冲区数量, 默认8
}, cb)

```

---

