# disp - 显示屏控制

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/packages/u8g2/luat_lib_disp.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## disp.init(conf)

显示屏初始化

**参数**

|传入值类型|解释|
|-|-|
|table|配置信息|

**返回值**

|返回值类型|解释|
|-|-|
|int|正常初始化1,已经初始化过2,内存不够3,初始化失败返回4|

**例子**

```lua
-- 初始化模拟i2c的ssd1306
if disp.init({mode="i2c_sw", pin0=17, pin1=18}) == 1 then
    log.info("disp", "disp init complete")
end
-- 初始化硬件i2c0的ssd1306
i2c.setup(0, i2c.FAST)
if disp.init({mode="i2c_hw", i2c_id=0}) == 1 then
    log.info("disp", "disp init complete")
end

```

---

## disp.close() 

关闭显示屏

**参数**

无

**返回值**

无

**例子**

```lua
-- 关闭disp,再次使用disp相关API的话,需要重新初始化
disp.close()

```

---

## disp.update()

把显示数据更新到屏幕

**参数**

无

**返回值**

无

**例子**

```lua
-- 把显示数据更新到屏幕
disp.update()

```

---

## disp.drawStr(content, x, y) 

在显示屏上画一段文字,要调用disp.update才会更新到屏幕

**参数**

|传入值类型|解释|
|-|-|
|string|文件内容|
|int|横坐标|
|int|竖坐标|

**返回值**

无

**例子**

```lua
disp.drawStr("wifi is ready", 10, 20)

```

---

## disp.setFont(fontId) 

设置字体

**参数**

|传入值类型|解释|
|-|-|
|int|字体id, 默认0,纯英文8x8字节. 如果支持中文支持, 那么1代表12x12的中文字体.|

**返回值**

无

**例子**

```lua
-- 设置为中文字体,对之后的drawStr有效
disp.setFont(1)

```

---

