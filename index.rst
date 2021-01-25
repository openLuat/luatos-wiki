.. luatos_wiki documentation master file, created by
   sphinx-quickstart on Mon Jan 25 20:53:38 2021.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

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
