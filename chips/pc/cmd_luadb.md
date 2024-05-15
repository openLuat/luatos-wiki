# 生成和管理luadb文件

luadb是LuatOS使用的核心文件系统之一, 用于存放线刷的脚本和资源文件

详细的文件系统描述, 请查阅 [LuaDB文件系统](../../develop/contribute/luadb.md)

## 从文件夹加载脚本并生成luadb文件

```
luatos-pc.exe F:\user_script\ --dump_luadb=disk.fs --norun=1 --luac_strip=0
```

参数解释:

- `F:\user_script\` : 指定脚本所在文件夹, 所有的lua文件都会被加载, 注意需要`\`结尾
- `--dump_luadb=disk.fs` : 指定生成的文件名
- `--norun=1` : 不执行脚本,导出后就退出
- `--luac_strip=0` : 是否去除调试信息, 0不去掉注释, 1去除注释,但保留main.lua的调试信息,2去除所有调试信息
