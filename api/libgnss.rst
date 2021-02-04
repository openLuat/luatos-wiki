libgnss
=======

NMEA数据处理

libgnss.parse(str)
------------------

处理nmea数据

参数
~~~~

========== ============
传入值类型 解释
========== ============
string     原始nmea数据
========== ============

返回值
~~~~~~

无

.. _返回值-1:

返回值
~~~~~~

.. code:: lua

   -- 解析nmea
   libgnss.parse(indata)
   log.info("nmea", json.encode(libgnss.getRmc()))

--------------

libgnss.isFix()
---------------

当前是否已经定位成功

.. _参数-1:

参数
~~~~

无

.. _返回值-2:

返回值
~~~~~~

========== ====
返回值类型 解释
========== ====
========== ====

.. _返回值-3:

返回值
~~~~~~

.. code:: lua

   -- 解析nmea
   libgnss.parse(indata)
   log.info("nmea", "isFix", libgnss.isFix())

--------------

libgnss.getIntLocation()
------------------------

获取位置信息

.. _参数-2:

参数
~~~~

无

.. _返回值-4:

返回值
~~~~~~

========== ====
返回值类型 解释
========== ====
========== ====

.. _返回值-5:

返回值
~~~~~~

.. code:: lua

   -- 解析nmea
   libgnss.parse(indata)
   log.info("nmea", "loc", libgnss.getIntLocation())

--------------

libgnss.getRmc()
----------------

获取原始RMC位置信息

.. _参数-3:

参数
~~~~

无

.. _返回值-6:

返回值
~~~~~~

========== ====
返回值类型 解释
========== ====
========== ====

.. _返回值-7:

返回值
~~~~~~

.. code:: lua

   -- 解析nmea
   libgnss.parse(indata)
   log.info("nmea", "rmc", json.encode(libgnss.getRmc()))

--------------

libgnss.getGsv()
----------------

获取原始GSV信息

.. _参数-4:

参数
~~~~

无

.. _返回值-8:

返回值
~~~~~~

========== ====
返回值类型 解释
========== ====
========== ====

.. _返回值-9:

返回值
~~~~~~

.. code:: lua

   -- 解析nmea
   libgnss.parse(indata)
   log.info("nmea", "gsv", json.encode(libgnss.getGsv()))

--------------

libgnss.getGsa()
----------------

获取原始GSA信息

.. _参数-5:

参数
~~~~

无

.. _返回值-10:

返回值
~~~~~~

========== ====
返回值类型 解释
========== ====
========== ====

.. _返回值-11:

返回值
~~~~~~

.. code:: lua

   -- 解析nmea
   libgnss.parse(indata)
   log.info("nmea", "gsa", json.encode(libgnss.getGsa()))

--------------

libgnss.getVtg()
----------------

获取原始VTA位置信息

.. _参数-6:

参数
~~~~

无

.. _返回值-12:

返回值
~~~~~~

========== ====
返回值类型 解释
========== ====
========== ====

.. _返回值-13:

返回值
~~~~~~

.. code:: lua

   -- 解析nmea
   libgnss.parse(indata)
   log.info("nmea", "vtg", json.encode(libgnss.getVtg()))

--------------
