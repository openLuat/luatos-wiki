# wdt - watchdog操作库

## wdt.init(timeout)

初始化watchdog并马上启用.大部分设备的watchdog一旦启用就无法关闭.

**参数**

|传入值类型|解释|
|-|-|
|int|超时时长,单位为毫秒|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false(例如底层不支持)|

**例子**

```lua
wdt.init(9000)
sys.timerLoopStart(wdt.feed, 3000)

```

---

## wdt.setTimeout(timeout)

部分设备支持重新设置watchdog超时时长

**参数**

|传入值类型|解释|
|-|-|
|int|超时时长,单位为毫秒|

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false(例如底层不支持)|

**例子**

```lua
wdt.init(10000)
sys.timerLoopStart(wdt.feed, 3000)
sys.wait(5000)
sys.setTimeout(5000)

```

---

## wdt.feed()

喂狗,使得超时计时复位,重新计时

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false(例如底层不支持)|

**例子**

```lua
wdt.init(10000)
-- 定时喂狗,或者根据业务按需喂狗
sys.timerLoopStart(wdt.feed, 3000)

```

---

## wdt.close()

关闭watchdog,通常不被支持

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool|成功返回true,否则返回false(例如底层不支持)|

**例子**

```lua
wdt.init(10000)
sys.wait(9000)
wdt.close()

```

---

