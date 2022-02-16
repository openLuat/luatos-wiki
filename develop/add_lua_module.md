# Lua库文件编写指南

在实际业务中, 通常不会把所有逻辑写到`main.lua`, 而是按功能切分成多个lua文件.

## LuatOS-SoC固件的lua库文件的基本格式

假设我们要编写的库叫 `myflib`

### 最简形式

```lua
local myflib = {}
return myflib
```

### 完整形式

```lua
-- [可选]导入必要的其他的库, 同理,导入本库的写法是 reqiure("myflib")
local sys = reqiure("sys")

-- [必须]定义成一个table,会在函数末尾作为返回值
local myflib = {} 

-- [可选]定义一个局部变量, 仅本文件内的函数可见
local myid = "23456"

-- [可选]定义一个库变量, 其他lua文件可以通过myflib.mykey 直接访问, 也可以修改
myflib.mykey = "abcdefg"

-- [可选]定义一个局部函数, 仅本文件内的函数可见
local function myabc()

end

-- [可选]定义一个库函数, 其他lua文件可以通过 myflib.myfunc 访问
function myflib.myfunc(key, value)
    return key and "1" or "2"
end

-- [必选]把库返回
return myflib
```

## 请注意可见性

1. 标注为local的变量或函数, 只能在本lua文件内访问/调用
2. 对外应尽量少暴露变量, 多使用库函数, 把它封装为黑盒
3. 这是lua, 以上均为建议, 大可自行发挥

## 一点扩展知识

1. 库其实就是个table, lua里的table集合了map和list两种数据结构
2. 如果返回任何值, require 会返回 `true`
3. `require` 也是个函数, 并非关键字
4. `dofile` 与 `require` 不同, 后者多一个内部map记录加载过的库
