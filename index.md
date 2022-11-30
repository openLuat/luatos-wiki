
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

::::{grid} 1 2 2 3
:gutter: 1 1 1 2

:::{grid-item-card} {octicon}`rocket;1.5em;sd-mr-1` 快速入门
:link: boardGuide/roadmap
:link-type: doc

新手友好的入门教程，同时兼顾老手，文字与视频教程均可让您快速上手。

+++
[了解更多 »](boardGuide/roadmap)
:::

:::{grid-item-card} {octicon}`tools;1.5em;sd-mr-1` API手册
:link: api/index
:link-type: doc

LuatOS提供了丰富的外设接口库，可以更便捷地实现创意，无需关心底层实现。

+++
[了解更多 »](api/index)
:::

:::{grid-item-card} {octicon}`stack;1.5em;sd-mr-1` 芯片选型
:link: chips/chips
:link-type: doc

查看LuatOS现阶段所支持的芯片有哪些功能，选择适合自己的芯片。

+++
[了解更多 »](chips/chips)
:::

::::

---

```{rubric} 更多资料
```

- [芯片资料](chips/index)
- [Lua原生API手册](https://wiki.luatos.com/_static/lua53doc/index.html)
- [模拟器](pages/emulator)
- [开发板购买](https://luat.taobao.com)
- [B站视频教程](https://space.bilibili.com/532832)

---

```{rubric} 目前已经适配的模组和芯片
```

- [Air101](chips/air101/index) （MCU）尺寸小,仅4*4mm
- [Air103](chips/air103/index) （MCU）io多,支持psram
- [Air105](chips/air105/index) （MCU）内存大,有摄像头,有USB
- [ESP32](chips/esp32c3/index) 系列 (wifi/bt芯片）
- [RT-Thread](https://github.com/openLuat/luatos-soc-rtt) 全部bsp(内存需满足最低要求) 已并入rtt主线
- [Air302](chips/air302/index) （EC616/nbiot模组） EOL
- [Air640w](chips/air640w/index) （W600/wifi模组）  EOL
- [win32](chips/win32) win32版LuatOS

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
