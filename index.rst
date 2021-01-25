欢迎来到xxxxx！
=======================================

.. code:: lua

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
