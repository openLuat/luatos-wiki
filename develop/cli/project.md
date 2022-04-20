# LuatOS 用户项目

## 项目结构概述

项目所需要的内容, 按要求存放

```bash
$ROOT                       # [必]项目跟目录

                            #>>>>> 用户自己的文件
    - src                   # [必]用户目录
        - script            # [必]脚本文件
            - main.lua      # [必]主lua入口文件
            - myfunc.lua    # [可]用户自定义函数
        - resource          # [可]非脚本的资源文件
            - logo.bin      # [可]图片示例
            - myfont.bin    # [可]字体示例
        - pkgs              # [可]库函数,这部分有cli与用户共同管理
            - aht10.lua     # [可]库文件示例

    - lod                   # [可]固件目录
        - air101            # [可]设备类型
            - LuatOS-SoC_Air101_V0008.soc   # 具体的固件文件

    - test                  # [可]测试目录
        - test_json.lua     # [可]单元测试脚本

                            #>>>>> git相关的文件
    - .git                  # [可]git目录, 主动引导用户使用git管理代码
    - .gitignore            # [可]提供默认的git忽略文件, 忽略临时文件

                            #>>>>> luatos cli所关联的文件
    - .luatos               # [必]LuatOS项目配置目录
        - conf.json         # [必]主配置文件
        - tmp               # [可]临时目录
        - pkgs
            - metas.json    # [可]库函数列表,避免每次都扫描
            - gitee         # [可]存放规则 命名空间/包名
                - openLuat
                    - LuatOS
                        - aht10 # 
                            - REAMDE.md
                            - src
                                aht10.lua
                        - tm1638
                            - REAMDE.md
                            - src
                                aht10.lua
        - demos             # [可] 为支持快速演示demo的实例
            - gpio          # [可] 点灯的demo
                - README.md
                - src
                    - main.lua 
```

## 
