# spislave - SPI从机(开发中)

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/device/spi_slave/binding/luat_lib_spislave.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看spislave的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/spislave)
```

**示例**

```lua
-- 请查阅demo

```

## spislave.setup(id, opts)



初始化SPI从机

**参数**

|传入值类型|解释|
|-|-|
|int|从机SPI的编号,注意与SPI主机的编号的差异,这个与具体设备相关|
|table|opts 扩展配置参数,当前无参数|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true表示成功,其他失败|

**例子**

```lua
-- 当前仅XT804系列支持, 例如 Air101/Air103/Air601/Air690
-- Air101为例, 初始化SPI从机, 编号为2, SPI模式
spislave.setup(2)
-- Air101为例, 初始化SPI从机, 编号为3, SDIO模式
spislavve.setup(3)

```

---

## spislave.ready()



是否可写

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true表示可写,其他不可写|

**例子**

无

---

