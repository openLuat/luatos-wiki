# 添加自定义库和函数(完整版)

## 前置知识

1. 对应模块的源码编译, 请查阅 [编译说明](compile.md)
2. 对Lua的C API的了解 [C API文档](https://wiki.luatos.com/_static/lua53doc/manual.html#4)
3. 对LuatOS 头文件的了解 [核心头文件目录](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules)

再次提醒, 请确保已经能编译出一个默认配置下的`标准`固件,再进行自定义库的添加

## 涉及的代码库

总会包含2个git库, 而且非常建议大家使用git下载和管理相关代码

* LuatOS主代码的库 `https://gitee.com/openLuat/LuatOS`, 后续称为 `LuatOS`代码库
* 对应模块的库, 例如Air780E对应的 `https://gitee.com/openLuat/luatos-soc-2022`, 后续称为 `bsp`代码库

## 新增的文件放在哪里

初次尝试时, 可以先放到 `LuatOS`代码库的 `lua`目录. `.h`放 `lua/include`, `.c`文件放 `lua/src`
因为:
* 所有BSP都会包含这个头文件路径
* 所有BSP都会包含这个源码路径的.c文件

至于熟悉之后的, 有两个去向:
* `LuatOS`代码库的component目录新增一个目录, 并将库代码分别存放在 `include` `src` 目录里
* 如果是特定BSP的实现,或者没打算兼容其他BSP, 那么放在对应BSP的`port`, `project/luatos` 之类的目录中, 没有统一规定

## 新增一个通用库的实例

这里, 我们新增一个叫  `mymath` 的库, 新增3个文件,分别存放到 `LuatOS`代码库的如下路径

* `lua/src/luat_lib_mymath.c` 与Lua直接交互的代码,必须有
* `lua/src/luat_mymath.c` 具体的实现代码,可选
* `lua/include/luat_mymath.h` 对应代码的头文件,可选

对于`luat_mymath.h`和`luat_mymath.c`的具体代码

* 这里不做展开, 它们与普通C函数没有区别
* 如果你不需要它们, 那就不添加, 对整体逻辑没影响

下面重点介绍`luat_lib_mymath.c`

```c
#include "luat_base.h"  // 必须引入
#include "luat_mymath.h" // 如果有,按需

// 这里是一个标准的Lua C函数声明
static int l_mymath_myplus(lua_State *L) {
    lua_pushstring(L, "myplus"); // 将字符串压入lua的虚拟栈, 栈深度+1
    return 1; // 注意注意,这里是该函数的给 lua 的 返回值 的数量, 不是日常的ERR_OK, ERR_FAIL 等0/1返回值.
}

// 库函数注册表
#include "rotable2.h" // 当前版本是v2, 对应rotable2.h
static const rotable_Reg_t reg_mymath[] =
{
    // 函数名称,给lua调用的.   函数指针指向l_mymath_myplus
    { "myplus" ,          ROREG_FUNC(l_mymath_myplus)},
    { NULL,               ROREG_INT(0)} // 最后必须加这一行
};

// 这里是库的声明, 后面要用到
LUAMOD_API int luaopen_mymath( lua_State *L ) {
    luat_newlib2(L, reg_mymath); // 这是标准写法, 通过rotable2生成不占内存的库指针
    return 1; // luat_newlib2 会压入一个元素到虚拟栈, 所以返回值也是1
}
```

## 注册库函数

注册之前, 请再跑一次编译过程, 应该能看到编译上述新增的文件
* 没有看到新增 -- 如果是ESP32系列的, 请先执行一次`idf.py fullclean`
* 没有看到新增 -- 检查文件名, 尤其是后缀

在编译通过之后, 再进行下一步操作. 当前只是编译, 还没注册到lua虚拟机

修改`LuatOS`代码库的 `luat/include/luat_libs.h`, 新增一行

```c
LUAMOD_API int luaopen_mymath( lua_State *L );
```

新增后, 建议再跑一次编译, 通常是不会有报错的. 除非漏了分号

现在打开`bsp库`的 `luat_base_` 开头的c文件
* 例如 Air780E库里的 `luat_base_ec618.c`
* 例如 Air101库里的 `luat_base_air101.c`

找到如下数组声明
```c
static const luaL_Reg loadedlibs[]
```

会有很多库的声明, 形式如下

```c
#ifdef LUAT_USE_FASTLZ
  {"fastlz",    luaopen_fastlz},
#endif
```

对应正规写法, 会使用宏来控制开启或禁用某个库, 具体的宏定义会在 `bsp`代码库 的 `luat_conf_bsp.h` 文件里.

但我们这里不必这么麻烦, 只需要新增一个元素就行, 不加宏判断也是没任何问题的

```c
{"mymath",    luaopen_mymath},
```

* 注意不要放在 `{NULL, NULL}` 结束元素之后
* `mymath` 是库名称, 会注册成全局变量
* `luaopen_mymath` 就是在 `luat_libs.h` 中新增的名称

至此, 前面步骤的 名称, 函数名, 都会联系起来

* `luat_lib_mymath.c` 编写了具体的lua c函数, 声明的`mymath`库的函数列表和`luaopen_mymath`函数
* `luat_libs.h` 修改新增了 `luaopen_mymath` 的声明
* `luat_base_` 开头的c文件,修改新增了`loadedlibs`的新元素`mymath`

最后, 执行编译, 得到所需要的固件

## 验证库函数

编写`main.lua`, 然后连同`新的底层固件`, 一起下载到设备中

```lua
-- LuaTools需要PROJECT和VERSION这两个信息
PROJECT = "apidemo"
VERSION = "1.0.0"

_G.sys = require("sys")

sys.taskInit(function()
    sys.wait(3000)
    while 1 do
        if mymath then
            log.info("找到mymath库")
            log.info("执行mymath.myplus函数", mymath.myplus())
        else
            log.info("没有找到mymath库")
        end
        sys.wait(1000)
    end
end)

sys.run()
```

如代码里中文函数, 如果有`mymath`库存在于当前固件中, 会打印并执行`mymath.myplus()`

如果提示找不到:
* 检查是不是下载了新的底层, 执行编译清理, 重新编译和下载, 观察启动日志里的编译时间
* 检查函数名,库名称是否拼写错误

## 后续建议

跑通流程后, 如果是比较复杂的库, 建议:
* 到 `LuatOS`代码库 的 `components` 目录新增专用的文件夹
* 修改 `bsp`代码库 的`xmake.lua`(非idf5)或者`CMakefile`(idf5),参考其他库的路径,新增进去

栈大小和内存使用问题
* 大部分bsp的Lua主线程的栈大小在8~12k字节,切勿使用过大的具体变量和可变大小数组
* 较大的内存占用, 必须使用`luat_malloc.h`函数提供的`luat_heap_malloc`和`luat_heap_free`, 不要直接使用`malloc`和`free`
* 函数不应长时间阻塞, 因为lua vm本质上是单线程操作, 如需执行耗时操作,请参考 `luat_rtos.h` 新建底层task 来执行
