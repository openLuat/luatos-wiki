.. figure:: _static/logo-big.svg
   :alt: LuatOS logo
   :align: center

   欢迎来到LuatOS

   .. image:: https://gitee.com/openLuat/LuatOS/badge/star.svg?theme=gvp
      :target: https://gitee.com/openLuat/LuatOS

   .. image:: https://img.shields.io/badge/Lua-5.3-blue

   .. image:: https://img.shields.io/badge/license-MIT-green
      :target: https://gitee.com/openLuat/LuatOS/blob/master/LICENSE


| LuatOS是一款针对嵌入式的脚本运行框架，可以极大提升开发效率。
| 使用Lua作为主要语言，针对资源较少的嵌入式环境进行了优化，极大提升了运行效率，并且可适配更多的单片机和无线芯片模组。

#. 基于Lua 5.3
#. 低内存需求，最低32kb、96kb flash空间
#. 硬件抽象层兼容M3/arm/risc-v等
#. 可测试、可模拟（qemu）
#. 在线升级
#. 可裁剪、可扩展

**目前已经适配的模组和芯片：**

- Air724（4G Cat.1 模组）*
- Air820（4G Cat.1 + GPS/北斗 模组）*
- Air302（nbiot模组）
- Air640w（wifi模组）
- STM32F103RE

（带*号的表示开发中）

.. toctree::
   :hidden:
   :caption: LuatOS 介绍

   首页 <https://luatos.wiki>
   pages/emulator

.. toctree::
   :hidden:
   :caption: 快速上手

   boardGuide/index
   luaGuide/index

.. toctree::
   :hidden:
   :caption: API参考手册

   api/index

.. toctree::
   :hidden:
   :caption: 内核开发

   develop/compile
   develop/clib
