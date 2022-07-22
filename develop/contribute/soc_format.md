# LuatOS-SoC通用固件格式soc

LuatOS-SoC将来会适配非常多的SoC/MCU芯片, 而各种设备的刷机格式各不相同,有必要定义一个统一的对外格式

这里称之为 soc 格式, 后缀选定为 soc, 实际内容为info.json及多个固件文件的zip压缩包

## 关于固件的定义

* 原始固件, 厂商提供的固件格式, 以fls/pac/img等命名, 使用厂商提供的工具进行刷机
* SoC固件, 在原始固件的基础上,添加info.json, script.bin 等LuatOS-SoC特有的文件,并做成压缩包, 使用LuaTools/LuatIDE刷机

## SoC固件的内容

* [必选]包含的文件 info.json
* [可选]脚本数据存储文件 script.bin, 使用LuaDB v2格式存储
* [必选]原始固件,以不同SoC芯片为准

## info.json的内容

```json
{
    "version" : 1, // 固件格式版本号
    "chip" : {     // 芯片本身的特性
        "type" : "air101", // air101
        "ram"  :  {       // 内存信息
            "total" : 288, // 总内存信息
            "sys" : 64,    // 系统内存大小
            "lua" : 176    // Lua虚拟机可用内存
        }
    },
    "bl": {// bl信息
    	"file" : "bootloader.bin"// bl文件
    },
	"partition": {// 分区表信息
    	"file" : "partition-table.bin"// 分区表文件
    },
    "rom": {        // rom信息
        "file" : "AIR101.fls",// 下载固件
        "fs" : {    // 文件系统信息
            "script" : {
                "offset" : "81E0000",// 偏移
                "size" : 112,   // 大小
                "type" : "luadb"// 文件系统格式
            }
        },
        "version-core": "v0007",// 主库代码版本
        "version-bsp" : "v0004",// bsp版本
        "mark" : "default",
        "build" : {
            "build_at" : "",
            "build_by" : "",
            "build_host" : "",
            "build_system" : ""
        }
    },
    "script" : {// 脚本信息
        "file" : "script.bin",// 脚本文件
        "lua" : "5.3",// lua版本
        "bitw" : 32,
        "use-luac" : true,
        "use-debug" : true,
    },
    "fs" : {
		"total_len" : 448,
		"format_len" : "1000"
	},
    "user" : {
        "project" : "",
        "version" : "",
        "log_br" : "921600"// 默认打印波特率
    },
    "download" : {
        "bl_addr" : "ffffffff",// bl地址
		"partition_addr" : "ffffffff",// 分区表地址
		"core_addr" : "0x00000000",// 固件地址
		"app_addr" : "0x00000000",// APP地址
		"script_addr" : "0x81E0000",// 文件系统地址
        "nvm_addr" : "00000000",// nvm地址
		"fs_addr" : "00390000",// fs地址
        "force_br" : "2M",// 默认下载波特率
        "extra_param" : "002f0200"
	}
}
```
