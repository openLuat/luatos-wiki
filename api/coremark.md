# coremark - 跑分

## coremark.run()

开始跑分

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值,结果直接打印在日志中|

**例子**

```lua
-- 大部分情况下, 这个库都不会包含在正式版固件里
-- 若需使用,可以参考wiki文档自行编译或使用云编译
-- https://wiki.luatos.com/develop/compile.html

-- 跑分的main.lua 应移除硬狗代码, 防止重启
-- 若设备支持自动休眠, 应关闭休眠功能
-- 若设备支持更多的频率运行, 建议设置到最高频率
-- 使用 -O3 比 -O2 -Os 的分数更高, 通常情况下

-- 会一直独占线程到执行完毕, 然后在控制台输出结果
coremark.run()

-- 跑分图一乐^_^


```

---

