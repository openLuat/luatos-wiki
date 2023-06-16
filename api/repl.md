# repl - "读取-求值-输出" 循环

{bdg-secondary}`适配状态未知`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/repl/luat_lib_repl.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```


## repl.enable(re)



启用或禁用REPL功能

**参数**

|传入值类型|解释|
|-|-|
|bool|启用与否,默认是启用|
|return|之前的设置状态|

**返回值**

无

**例子**

```lua
-- 若固件支持REPL,即编译时启用了REPL,是默认启用REPL功能的
-- 本函数是提供关闭REPL的途径
repl.enable(false)

```

---

