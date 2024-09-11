# hmeta - 硬件元数据

{bdg-success}`已适配` {bdg-primary}`Air780E` {bdg-primary}`Air780EP` {bdg-primary}`Air780EPS`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/hmeta/luat_lib_hmeta.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看hmeta的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/hmeta)
```

**示例**

```lua
-- 本库开发中
--[[
    这个库的作用是展示当前硬件的能力, 例如:
1. 有多少GPIO, 各GPIO默认模式是什么, 是否支持上拉/下拉
2. 有多少I2C,支持哪些速率
3. 有多少SPI,支持哪些速率和模式
4. 扩展属性, 例如区分Air780E和Air600E

]]

```

## hmeta.model()



获取模组名称

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|若能识别到,返回模组类型, 否则会是nil|

**例子**

```lua
sys.taskInit(function()
    while 1 do
        sys.wait(3000)
        -- hmeta识别底层模组类型的
        -- 不同的模组可以使用相同的bsp,但根据封装的不同,根据内部数据仍可识别出具体模块
        log.info("hmeta", hmeta.model())
        log.info("bsp",   rtos.bsp())
    end
end)

```

---

## hmeta.hwver()



获取模组的硬件版本号

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|string|若能识别到,返回模组类型, 否则会是nil|

**例子**

```lua
sys.taskInit(function()
    while 1 do
        sys.wait(3000)
        -- hmeta识别底层模组类型的
        -- 不同的模组可以使用相同的bsp,但根据封装的不同,根据内部数据仍可识别出具体模块
        log.info("hmeta", hmeta.model(), hmeta.hwver())
        log.info("bsp",   rtos.bsp())
    end
end)

```

---

