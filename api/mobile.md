# mobile - 蜂窝网络

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/mobile/luat_lib_mobile.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！


## mobile.imei(index, newvalue)

获取或设置IMEI

**参数**

|传入值类型|解释|
|-|-|
|int|编号,默认0. 在支持双卡的模块上才会出现0或1的情况|
|string|新的IMEI. 不填就是获取IMEI, 填了就是设置IMEI, 是否支持设置取决于底层实现.|

**返回值**

|返回值类型|解释|
|-|-|
|string|当前的IMEI值|

**例子**

无

---

## mobile.imsi(index, newvalue)

获取或设置IMSI

**参数**

|传入值类型|解释|
|-|-|
|int|编号,默认0. 在支持双卡的模块上才会出现0或1的情况|
|string|新的IMSI. 不填就是获取IMSI, 填了就是设置IMSI, 是否支持设置取决于底层实现.|

**返回值**

|返回值类型|解释|
|-|-|
|string|当前的IMSI值|

**例子**

无

---

