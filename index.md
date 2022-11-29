
````{figure} _static/logo-big.svg
---
alt: LuatOS logo
align: center
---
**欢迎来到LuatOS**

[![](https://gitee.com/openLuat/LuatOS/badge/star.svg?theme=gvp)](https://gitee.com/openLuat/LuatOS)
[![](https://img.shields.io/badge/Lua-5.3-blue)](https://gitee.com/openLuat/LuatOS)
[![](https://img.shields.io/badge/license-MIT-green)](https://gitee.com/openLuat/LuatOS/blob/master/LICENSE)
````

LuatOS是一款针对嵌入式的脚本运行框架，可以极大提升开发效率。  
使用Lua 5.3作为主要语言，针对资源较少的嵌入式环境进行了优化，极大提升了运行效率。  
Powerful embedded Lua Engine for IoT devices, with many components and low memory requirements (16K RAM, 128K Flash)

**本站汇聚LuatOS-SoC的所有资料**

- [快速入门](https://wiki.luatos.com/boardGuide/roadmap.html)
- [芯片资料](https://wiki.luatos.com/chips/index.html)
- [选型表](https://wiki.luatos.com/chips/chips.html)
- [LuatOS特有库的API手册](https://wiki.luatos.com/api/index.html)
- [Lua原生API手册](https://wiki.luatos.com/_static/lua53doc/index.html)
- [模拟器](https://wiki.luatos.com/pages/emulator.html)
- [开发板购买](https://luat.taobao.com)
- [B站视频教程](https://space.bilibili.com/532832)

**目前已经适配的模组和芯片：**

- [Air101](https://wiki.luatos.com/chips/air101/index.html) （MCU）尺寸小,仅4*4mm
- [Air103](https://wiki.luatos.com/chips/air103/index.html) （MCU）io多,支持psram
- [Air105](https://wiki.luatos.com/chips/air105/index.html) （MCU）内存大,有摄像头,有USB
- [ESP32](https://wiki.luatos.com/chips/esp32c3/index.html) 系列 (wifi/bt芯片）
- [RT-Thread](https://github.com/openLuat/luatos-soc-rtt) 全部bsp(内存需满足最低要求) 已并入rtt主线
- [Air302](https://wiki.luatos.com/chips/air302/index.html) （EC616/nbiot模组） EOL
- [Air640w](https://wiki.luatos.com/chips/air640w/index.html) （W600/wifi模组）  EOL
- [win32](https://wiki.luatos.com/chips/win32.html) win32版LuatOS

```{note}
我们正适配更多的单片机和无线芯片模组, 欢迎您的加入^_^
```

<script type='text/javascript' src='https://ykf-webchat.7moor.com/javascripts/7moorInit.js?accessId=4a733990-aec0-11e9-a1f3-4fbe5cb02a0b&autoShow=true&language=ZHCN' async='async'></script>

```{toctree}
:hidden:
:caption: 💁 LuatOS 介绍
🏠️ 首页 <https://wiki.luatos.com>
pages/emulator
pages/tools
pages/supports
```

```{toctree}
:hidden:
:caption: 🌠 快速上手
luaGuide/index
chips/index
peripherals/index
boardGuide/index
```

```{toctree}
:hidden:
:caption: 📖 参考手册
api/index
api/sys_pub
🌕 原生API手册 <https://wiki.luatos.com/_static/lua53doc/index.html>
api/libs/index
```

```{toctree}
:hidden:
:caption: 🖥️ 内核开发
develop/compile
develop/docs
develop/contribute/index
```

```{toctree}
:hidden:
:caption: 💼 实战参考
appDevelopment/index
```

```{toctree}
:hidden:
:caption: 🗄️ 其他资料
iotpower/index
archives
```
