.. figure:: _static/logo-big.svg
   :alt: LuatOS logo
   :align: center

   欢迎来到LuatOS

   .. image:: https://gitee.com/openLuat/LuatOS/badge/star.svg?theme=gvp
      :target: https://gitee.com/openLuat/LuatOS

   .. image:: https://img.shields.io/badge/Lua-5.3-blue
      :target: https://gitee.com/openLuat/LuatOS

   .. image:: https://img.shields.io/badge/license-MIT-green
      :target: https://gitee.com/openLuat/LuatOS/blob/master/LICENSE


| LuatOS是一款针对嵌入式的脚本运行框架，可以极大提升开发效率。
| 使用Lua 5.3作为主要语言，针对资源较少的嵌入式环境进行了优化，极大提升了运行效率。
| Powerful embedded Lua Engine for IoT devices, with many components and low memory requirements (16K RAM, 128K Flash)

**本站汇聚LuatOS-SoC的所有资料**

- `快速入门 <boardGuide/index.html>`_
- `芯片资料 <chips/index.html>`_
- `选型表   <chips/chips.html>`_
- `LuatOS特有库的API手册  <api/index.html>`_
- `Lua原生API手册  <_static/lua53doc/index.html>`_
- `模拟器   <pages/emulator.html>`_
- `开发板购买 <https://openluat.taobao.com>`_
- `B站视频教程 <https://space.bilibili.com/532832>`_

**目前已经适配的模组和芯片：**

- `Air101 <chips/air101/index.html>`_ （MCU）尺寸小,仅4*4mm
- `Air103 <chips/air103/index.html>`_ （MCU）io多,支持psram
- `Air105 <chips/air105/index.html>`_ （MCU）内存大,有摄像头,有USB
- `ESP32 <chips/esp32c3/index.html>`_ 系列 (wifi/bt芯片） https://gitee.com/dreamcmi/LuatOS-ESP32
- `RT-Thread <https://github.com/openLuat/luatos-soc-rtt>`_ 全部bsp(内存需满足最低要求) 已并入rtt主线
- `Air302 <chips/air302/index.html>`_ （EC616/nbiot模组） 仅支持老客户,敬请谅解
- `Air640w <chips/air640w/index.html>`_ （W600/wifi模组）  仅支持老客户,敬请谅解
- `win32 <chips/win32.html>`_ win32版LuatOS

我们正适配更多的单片机和无线芯片模组, 欢迎您的加入^_^

.. toctree::
   :hidden:
   :caption: LuatOS 介绍

   首页 <https://wiki.luatos.com>
   pages/emulator
   pages/tools
   pages/supports

.. toctree::
   :hidden:
   :caption: 快速上手

   luaGuide/index
   chips/index
   peripherals/index
   boardGuide/index

.. toctree::
   :hidden:
   :caption: 参考手册

   api/index
   api/sys_pub
   原生API手册 <https://wiki.luatos.com/_static/lua53doc/index.html>
   api/libs/index

.. toctree::
   :hidden:
   :caption: 内核开发

   develop/compile
   develop/docs
   develop/contribute/index

.. toctree::
   :hidden:
   :caption: 其他资料

   archives
