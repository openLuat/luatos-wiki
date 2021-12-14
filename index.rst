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
| 使用Lua作为主要语言，针对资源较少的嵌入式环境进行了优化，极大提升了运行效率，并且可适配更多的单片机和无线芯片模组。

#. 基于Lua 5.3
#. 低内存需求，最低32KB RAM，96KB flash
#. 硬件抽象层兼容cm3/cm4/xt/risc-v等
#. 可测试、可模拟（qemu）
#. 在线升级
#. 可裁剪、可扩展

**目前已经适配的模组和芯片：**

- Air101（MCU）
- Air103（MCU）
- Air105（MCU）
- Air302（EC6161/nbiot模组）
- Air640w（W600/wifi模组）
- ESP32系列 (wifi芯片）*
- XY1100 (nbiot模组）*
- W800(wifi模组）*
- STM32F103RE

（带*号的表示开发中）

.. toctree::
   :hidden:
   :caption: LuatOS 介绍

   首页 <https://wiki.luatos.com>
   pages/emulator
   pages/tools
   pages/luadb

.. toctree::
   :hidden:
   :caption: 快速上手

   luaGuide/index
   boardGuide/index
   chips/index

.. toctree::
   :hidden:
   :caption: API参考手册

   api/index

.. toctree::
   :hidden:
   :caption: 内核开发

   develop/compile
   develop/contribute/index

.. toctree::
   :hidden:
   :caption: 其他资料

   archives
