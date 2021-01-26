.. toctree::
   :hidden:

   首页 <https://luatos.wiki>

.. toctree::
   :maxdepth: 2
   :hidden:
   :caption: Lua教程

   luaGuide/luaStart

欢迎来到LuatOS！
================

概述
----

.. note::
   如果您需要查看入门教程，请点击左侧的`开发指南`，查看模块入门开发步骤。

Luat = Lua + AT,  Luat推出的物联网开源架构，依托于通信模块做简易快捷的开发，将传统的AT命令用Lua语言封装成API，并提供各种功能应用的demo，大大减少用户的开发成本。

开发者可以通过调用API轻松，便捷的实现TTS、GPS、SOCKET、MQTT、OTA等功能。例如下面通过几行代码既可以实现GPS，MQTT功能。

**GPS**

.. code-block:: lua

   --引用gpsv2.lua
   require "gpsv2"
   module(..., package.seeall)

   sys.taskInit(function(...)
      gpsv2.open(2, 115200, 2, 5)
      while true do
         log.info("testGps isFix:", gpsv2.isFix())
         log.info("testGps lng,lat:", gpsv2.getIntLocation())
         log.info("testGps message:", gpsv2.getAltitude(), gpsv2.getSpeed(),
               gpsv2.getAzimuth(), gpsv2.getUsedSateCnt(), gpsv2.getViewedSateCnt())
         sys.wait(1000)
      end
   end)


**MQTT**

.. code-block:: lua

   --引用mqtt.lua
   require "mqtt"
   module(..., package.seeall)

   -- 这里请填写修改为自己的IP和端口
   local host, port = "lbsmqtt.airm2m.com", 1884

   socket.setSendMode(1)

   -- 测试MQTT的任务代码
   sys.taskInit(function()
      while true do
         while not socket.isReady() do sys.wait(1000) end
         local mqttc = mqtt.client(misc.getImei(), 300, "user", "password")
         while not mqttc:connect(host, port) do sys.wait(2000) end
         if mqttc:subscribe(string.format("/device/%s/req", misc.getImei())) then
               if mqttc:publish(string.format("/device/%s/report", misc.getImei()), "test publish " .. os.time()) then
                  while true do
                     local r, data, param = mqttc:receive(120000, "pub_msg")
                     if r then
                           log.info("这是收到了服务器下发的消息:", data.payload or "nil")
                     elseif data == "pub_msg" then
                           log.info("这是收到了订阅的消息和参数显示:", data, param)
                           mqttc:publish(string.format("/device/%s/resp", misc.getImei()), "response " .. param)
                     elseif data == "timeout" then
                           log.info("这是等待超时主动上报数据的显示!")
                           mqttc:publish(string.format("/device/%s/report", misc.getImei()), "test publish " .. os.time())
                     else
                           break
                     end
                  end
               end
         end
         mqttc:disconnect()
      end
   end)

   -- 测试代码,用于发送消息给socket
   sys.taskInit(function()
      while true do
         sys.publish("pub_msg", "11223344556677889900AABBCCDDEEFF" .. os.time())
         sys.wait(180000)
      end
   end)


Luat介绍
--------

Lua脚本是内嵌在模块基础软件core中运行的（core编译生成的文件是.lod文件），Lod中有支持Lua运行的环境，Lua脚本就在这个环境中运行。脚本实现功能是通过API（对AT命令进行了封装）实现的。

在模块内部，Lua发出AT命令，并通过虚拟的uart.ATC 口和Lod之间进行AT命令的交互。即Lua发出AT命令，Lod接收后进行解析并返回AT命令运行结果，不需要上位机（一般是单片机）通过物理串口给模块发AT命令，这样就节省了单片机的花费。

.. image:: https://wiki.openluat.com/img/coreLua.jpg
   :alt: coreLua


名称解释
--------

======== ===========================================================
名称      含义
======== ===========================================================
底层软件   也叫基础软件，位于/core，用C语言开发完成，支撑Lua的运行。
库脚本     lib目录中的“库脚本”（所有项目都应该使用）
应用脚本   用户自己编写的“应用脚本”（例如demo目录下的脚本）
======== ===========================================================

