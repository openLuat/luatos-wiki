# 编码规范

## C API规范

- C API均以 `luat_` 开头, 后接模块名, 然后是方法名
- 使用抽象的类型定义, 例如不使用`int`, 使用`uint32_t`
- 使用下划线命名方式

举例

```c
LUA_API void* luat_heap_alloc(void *ud, void *ptr, size_t osize, size_t nsize);
```

## Lua API 规范

### 命名规范

- 库名称，全部使用小写字母
- 库内的常量，全部使用大写字母命名，以下划线分割
- 库内的接口，使用驼峰命名，首字母小写，**禁止使用下划线分隔的写法**
  - 判断是否符号要求的接口，使用`is`开头
  - 打开操作使用`open`开头
  - 关闭操作使用`close`开头
  - 初始化操作使用`setup`开头
  - 更改状态操作使用`set`开头
  - 获取状态操作使用`get`开头
  - 发送与接收接口
    - 同时存在`send`/`recv`与`read`/`write`时
      - 发送**原始数据**操作使用`send`开头
      - 接收**原始数据**操作使用`recv`开头
      - 发送**c代码处理过的信息**操作使用`write`开头（如按寄存器地址写i2c）
      - 接收**c代码处理过的信息**操作使用`read`开头
    - 只存在`send`/`recv`与`read`/`write`的其中一种时
      - 按习惯进行编写（如串口使用的是`read`/`write`，而socket使用的是`send`/`recv`）
  - 异步接口（使用`C接口实现Task等待功能`适配的接口）使用`task`开头

举例

```c
local spiDevice = spi.setupDevice(0,17,0,0,8,2000000,spi.MSB,1,1)
i2c.isExist(id)
adc.open(id)
camera.setup(...)
```

### 交互规范

#### 返回结果的接口

- 只可能返回成功或失败的接口
  - 使用`true`返回，代表**成功**
  - 使用`nil,"reason"`返回，代表**失败**
  - **避免**使用纯数字作为成功与否的结果返回
- 会返回进度的接口
  - 返回成功执行进度的数字（如串口、spi发送成功的数据长度）
- 会返回具体数据的接口
  - 如果返回的是长度，没数据就使用`0`
  - 如果返回的是`string`，没数据就使用`长度为0的字符串`
  - 如果使用`nil`代表接收失败，需要在接口文档里的返回值部分**加粗提醒**
- 需要等一段时间才能获取结果的接口
  - 如果可以实现非阻塞
    - 可以使用回调方式给用户上报事件
    - 可以适配`C接口实现Task等待功能`方式提供可在任务中运行的异步接口（[实现方式参考此页](https://wiki.luatos.com/develop/c_wait.html)）
    - **尽量避免**使用特定的`topic`让用户手动调用`sys.waitUntil`的方式进行适配
  - **尽量避免**添加阻塞时间较长的接口

#### 需要传入GPIO的接口

- 端口号**不存在**时，使用`负数`来代表，尽量避免使用特定的正数或0（有些MCU存在GPIO_0）
- 其他待定

## Git 提交规范

1. 主分支 master
2. 开发分支, 由开发者自行开立, 命名遵循: issue_xxx, feature_xxx 前缀
3. 提交时的commit
4. 严禁使用 `git push -f` 执行 强制推送

```
add:  xxxx   添加功能,特性
update: xxx  修改功能,特性, 改变行为
remove: xxxx 删除功能,特性
fix:  xxxx   明确修复指定的issue, 贴上#issue完整编号
revert: xxx  回滚某个操作
```

> 特殊技巧：GitHub与Gitee均会自动识别`#`号开头，后面附带issue编号的语法（前后需空格），会自动与指定issue关联。并且如果commit内容中有`close`和`fix`等字样，会自动关闭该issue。如： close #12345

## Lua接口注释规范

为了能自动生成接口文档，需要严格按照下面的格式对接口进行注释

### 在C文件内的接口

在文件的最上方，格式如下（如果无此开头，文件不会被扫描）：

```c
/*
@module  模块的名称，如：adc
@summary 模块的简短描述信息，如：数模转换
@version 版本号，可选
@data    日期，可选
@demo    可选，指LuatOS/demo中的文件夹名称
@video   可选，该库的视频教程网址
@usage
--这个库的简易使用例子，可选
--可以写多行
*/
```

在Lua内可调用的函数，格式如下：

```c
/*
第一行写明函数的用途，如：打开adc通道
@api module.function(调用时用到的完整函数名)
@string 第一个参数，@后跟参数类型，空格后跟参数解释。如有默认值，需要全部写明
@number 第二个参数
@table 第三个参数
...根据实际，列出所有参数
@return 类型 返回的第一个值，必须按格式填写，如有默认值，需要全部写明
@return string 返回的第二个值，类型为string
...根据实际，列处所有返回值
@usage
--使用的例子，可多行
lcoal a,b,c = module.function("test",nil,{1,2,3})
lcoal d,e,f = module.function("abc",nil,{1,2,3})
*/
static int l_module_function(lua_State *L) {
    //一堆代码
}
```

静态变量，可在变量附近添加以下格式的注释：

```c
//@const 变量名 类型 解释
/*比如*/
//@const NONE number 无校验

/*只需写变量名
  会自动在文档中生成 库名.变量名 的结果 */
```

### 在Lua文件内的接口

在文件的最上方，与c接口格式的基本相同，只是多了库例子，格式如下：

```lua
--[[
@module  模块的调用名
@summary 模块的简短描述信息
@version 版本号，可选
@data    日期，可选
@author  作者名，可选
@demo    可选，指LuatOS/demo文件夹中的demo名称
@video   可选，该库的视频教程网址
@usage
--这个库的使用例子
--可以写多行
]]
```

可调用的函数，与c接口格式的基本相同，如下：

```lua
--[[
第一行写明函数的用途，如：打开adc通道
@api module.function(调用时用到的完整函数名)
@string 第一个参数，@后跟参数类型，空格后跟参数解释。如有默认值，需要全部写明
@number 第二个参数
@table 第三个参数
...根据实际，列出所有参数
@return 类型 返回的第一个值，必须按格式填写，如有默认值，需要全部写明
@return string 返回的第二个值，类型为string
...根据实际，列处所有返回值
@usage
--使用的例子，可多行
--巴拉巴拉
]]
```

静态变量，可在变量附近添加以下格式的注释：

```lua
--//@const 变量名 类型 解释
--比如
--//@const NONE number 无校验

--只需写变量名
--会自动在文档中生成 库名.变量名 的结果
```

## sys_pub发布的topic描述规范

在`lua_call`或`lua_pushstring`附近，加上对此消息的相关解释

注意，第一行的`/*`前面不能有任何缩进

```c
        lua_getglobal(L, "sys_pub");
/*
@sys_pub wlan（该topic所属的模块）
第一行写明消息的用途，如：WIFI扫描结束
WLAN_SCAN_DONE  （该topic的完整名称）
@string 第一个传递的数据，@后跟数据类型，空格后跟数据解释，如果没有就别写这几行
@number 第二个数据
...根据实际，列出所有传递的数据
@usage
--使用的例子，可多行
sys.taskInit(function()
    xxxxxxxxxx
    xxxxxxx
    sys.waitUntil("WLAN_SCAN_DONE")
    xxxxxxxxxx
end)
*/
        lua_pushstring(L, "WLAN_SCAN_DONE");
        lua_call(L, 1, 0);
```
