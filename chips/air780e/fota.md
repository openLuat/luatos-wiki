# FOTA升级及升级包的生成

## FOTA升级

1. EC618系列(典型为Air780E/Air780EG/Air700E)等模块, 支持FOTA升级, 连同底层和脚本一起升级
2. 升级时, 底层差分包不能超过480k, 且脚本区大小一致
3. 脚本区大小在编译固件时决定, 与实际脚本大小无关. 脚本区大小不一致的固件,无法差分升级底层
4. 差分升级需要新老固件的soc/binpkg文件, 请妥善保留老版本的soc文件以便将来使用
5. 具体升级流程请查阅 demo/fota

## 升级包生成

1. LuaTools生成量产文件时, 会生成用于脚本生成的.bin文件, 及用于量产的.soc
2. 若需要生成包含底层差分的升级包, 则需要使用LuaTools菜单中的"SoC差分升级包"生成工具
3. 另提供命令行下生成升级包工具, 位于[luatos-soc-2022](https://gitee.com/openLuat/luatos-soc-2022/tree/master/tools/dtools)

## 未尽事宜请联系技术支持

https://doc.openluat.com/wiki/37?wiki_page_id=4578

或联系销售
