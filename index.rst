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

**目前已经适配的模组和芯片：**

- Air101（MCU）尺寸小
- Air103（MCU）io多
- Air105（MCU）内存大
- Air302（EC616/nbiot模组）
- Air640w（W600/wifi模组）
- ESP32系列 (wifi/bt芯片）`C3和S3 <https://gitee.com/dreamcmi/LuatOS-ESP32>`_
- RT-Thread 全部bsp(内存需满足最低要求) `软件包 <https://gitee.com/openLuat/luatos-soc-rtt>`_

`选型表 <chips/chips.html>`_

我们正适配更多的单片机和无线芯片模组, 欢迎您的加入^_^

.. toctree::
   :hidden:
   :caption: LuatOS 介绍

   首页 <https://wiki.luatos.com>
   pages/emulator
   pages/tools

.. toctree::
   :hidden:
   :caption: 快速上手

   luaGuide/index
   boardGuide/index
   chips/index

.. toctree::
   :hidden:
   :caption: 参考手册

   api/index

.. toctree::
   :hidden:
   :caption: 内核开发

   develop/compile
   develop/add_myapi_5min
   develop/contribute/index

.. toctree::
   :hidden:
   :caption: 其他资料

   archives
