# 添加自定义函数(急速版)

你是否有这样的困扰?
* 有个C实现的算法, 怎么搞到LuatOS里
* 我只想添加个函数, LuatOS的代码好多怎么搞?

本文以air101/air103为例, 介绍如何自行添加函数,供lua代码调用

## 预备知识

* 少许vscode经验, 基础的C语言编程能力
* 能编译已有代码, 例如air101/air103, 如果还不能, 先看看[编译教程](compile/Air101.md)
* 最好懂一点git的基本操作

## 预期效果

```lua
local ok, msg = sayhi("wendal", 18)
log.info("custom", ok, msg) -- 打印true/false和一段话
```

## 新建c文件,存放示例代码

1. 使用vscode, 打开air101/air103的源码目录
2. 导航到app/custom目录, 新建一个文件 `myapi.c`
3. 贴入以下内容

```c
//-------------------
//    LuatOS的头文件, 位于LuatOS库的luat/include
#include "luat_base.h"   // 基础函数
#include "luat_malloc.h" // 内存分配函数

#define LUAT_LOG_TAG "custom"

#include "luat_log.h"    // 日志函数,配套LUAT_LOG_TAG

// -------------------
// 需要用的头文件,自行导入
//#include "xxx.h"
// -------------------

// 函数原型 int $name(lua_State *L)
// int 返回值的数量, 指的是从lua的堆栈中弹出多少个值作为返回值
// C函数原型只有一个参数, 对应的lua参数在lua的虚拟栈内
static int luat_custom_sayhi(lua_State *L) { // static不是必须的, 但推荐添加.
    size_t len;
    const char* name = luaL_checklstring(L, 1, &len); // 对应lua调用的第一个参数,  "wendal"
    int age = luaL_checkinteger(L, 2);                // 对应lua调用的第二个参数,数值123

    // age小于19的话, 就是"正确年龄"
    if (age < 19) {
        // 往lua堆栈压入2个返回值
        lua_pushboolean(L, 1); // 压入 true
        lua_pushfstring(L, "%s's age is %d", name, age); // 年龄正确!!!
    }
    // 否则, 当前是"错误年龄了"
    else {
        // 往lua堆栈压入2个返回值
        lua_pushboolean(L, 1); // 压入false
        lua_pushfstring(L, "%s's age is 18, always!!", name); // 不, wendal只有18岁
    }
    return 2; // 这里是返回值的数量, 而非 0/1 等正确/错误返回码.
}

void luat_custom_init(lua_State *L) { // 函数声明在luat_base.h里
    LLOGD("custom init begin ...");

    // 添加全局函数, 函数名就叫sayhi吧
    lua_pushcfunction(L, luat_custom_sayhi); // 先压入堆栈
    lua_setglobal(L, "sayhi");               // 压入_G.sayhi = XXX

    LLOGD("custom init done");
    return; // 暂不需要返回值.
}
```

## 启用自定义函数构造

1. 打开 `app/include/luat_conf_bsp.h`
2. 在中间的位置, 添加以下宏定义

```c
#define LUAT_HAS_CUSTOM_LIB_INIT 1
```

## 愉快地测试

1. 执行xmake, 常规编译一下
2. 刷机,下脚本,看效果

```log
你来填 ^_^
```

* 编译失败? 根据提示修正语法错误
* 刷机后提示找不到`sayhi` -- 确保编译正确, 确保选择了正确的底层固件文件, 确保刷入了新的底层

## 搞不定? 求帮助? 到QQ群求助或者gitee发帖

1. QQ群: 1061642968
2. gitee: https://gitee.com/openLuat/LuatOS 顺便点个star, 谢谢

## 拓展1-- 函数比较多, 我想做成一个库可以吗?

必须可以呀, 直接用现成的lib_xx.c拷贝改一改也是很快的方式

* 先给库起个酷炫的名字
* 仿造已有的`luat_lib_xxx.c` 写一个库
* 最初建议只写1个函数, 声明好`rotable_Reg`和`luaopen_xxx`方法
* 在 `custom_init` 里调用 `luaopen_xxx` 方法即可
* 如果不使用custom_init, luat_base_xxx.c 也声明

## 拓展2 -- 添加静态库进行链接

* 需要一点点xmake知识了, 但搜索字符串添加也可以
* 把a文件放入lib目录, 假设名字叫 `libcool.a`
* 修改`xmake.lua`, 寻找 ` ./lib/libgt.a `
* 在其之前或之后, 添加 ` ./lib/libcool.a ` , 注意前后空格
* 愉快地编译
