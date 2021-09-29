# json - json生成和解析库

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/packages/lua-cjson/lua_cjson.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## json.encode(obj,t)

将对象序列化为json字符串

**参数**

|传入值类型|解释|
|-|-|
|obj|需要序列化的对象|
|string|浮点数精度和模式,这项不存在的时候,为默认值"7g",数字只支持"0~14",模式只支持"f/g"|

**返回值**

|返回值类型|解释|
|-|-|
|string|序列化后的json字符串, 失败的话返回nil|
|string|序列化失败的报错信息|

**例子**

```lua
json.encode(obj)-->浮点数用%.7g的方式转换为字符串
json.encode(obj,"12f")-->浮点数用%.12f的方式转换为字符串

```

---

## json.decode(str)

将字符串反序列化为对象

**参数**

|传入值类型|解释|
|-|-|
|string|需要反序列化的json字符串|

**返回值**

|返回值类型|解释|
|-|-|
|obj|反序列化后的对象(通常是table), 失败的话返回nil|
|result|成功返回1,否则返回0|
|err|反序列化失败的报错信息|

**例子**

```lua
json.decode("[1,2,3,4,5,6]")

```

---

