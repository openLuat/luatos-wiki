# 阿里云教程

文章包含AT和luat两种连接方式，每种方式又包含一型一密与一机一密两种认证方式。整体结构如图：

![](http://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/20200602135520551_阿里云.png)

## 阿里云操作

这部分AT和LUAT操作相同。

### 产品操作

打开阿里云找到物联网平台，开通业务后进入控制台。

点开设备管理的产品页面，点击新建产品。根据需求和图示说明创建产品。

[具体详细介绍见阿里云页面](https://help.aliyun.com/document_detail/73728.html?spm=a2c4g.11174283.6.571.3a8b1668Vmv5CZ)

![创建产品](http://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/20200526141441005_aliyun1.gif)

### 设备操作

创建产品完成后就可以进入设备页面添加设备，在对应产品页面进入设备管理，按照提示添加设备

（在做正式产品时建议使用imei为devicename，方便后期维护）

[阿里云设备创建](https://help.aliyun.com/document_detail/73729.html?spm=a2c4g.11186623.6.573.55977b7bAjX04B)

![添加设备](http://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/20200526141825581_aliyun2.gif)

### 其他说明

阿里云文档中有SDK接入云接入等多种方式，合宙的模块接入方式不属于SDK接入也不属于云接入。目前采用文档中说明的开放协议的MQTT协议接入。模块的AT模式只提供设备接入，数据收发，LUAT模式增加了OTA，其他阿里云物联提供的功能暂不支持。开发者可根据文档与API自行开发。

## AT方式连接概述

使用AT方式连接阿里云分为一机一密和一型一密两种方式，其中一机一密又包含HTTP认证二次连接和MQTT直连两种方式。

### 配置网络

训练波特率

**AT**

AT

OK

查询设备版本

**AT+CGMR**

AT+CGMR

+CGMR: "AirM2M_Air724UG_V409_LTE_AT"

OK

查看卡状态

**AT+CPIN?**

AT+CPIN?

+CPIN: READY

OK

查询是否附着基站，必须CGATT为1才可进行下一个指令

**AT+CGATT?**

AT+CGATT?

+CGATT: 1

OK

自动选择APN

**AT+CSTT**

AT+CSTT

OK

激活PDP

**AT+SAPBR=1,1**

AT+SAPBR=1,1

OK

激活移动场景

**AT+CIICR**

AT+CIICR

OK

查询本地 IP 地址

**AT+CIFSR**

AT+CIFSR

100.86.47.178

查询当前连接状态

**AT+CIPSTATUS**

AT+CIPSTATUS

OK

STATE: IP STATUS

### 一机一密AT HTTP鉴权连接

根据[教程](http://doc.openluat.com/article/713/0)装好驱动和luatools，下载AT固件（出厂默认就是AT）

连接设备的串口1。开发板直接接USB转TTL口到电脑即可，其他的自己设计的板子可使用usb转ttl等工具连接（注意电平转换）

MCU 向 Air 模块发送的 AT 命令都要以\r 结尾

下文中的用到的 AT 命令，约定：

加粗为 MCU 发送给 Air 模块 

普通为 Air 模块发送给 MCU



#### HTTP鉴权

前文我们添加了一个设备记录了三元组，这里就需要使用三元组进行连接。

我们的三元组是

```json
{

 "ProductKey": "a1mxL3s6Z7m",

 "DeviceName": "866714043075174",

 "DeviceSecret": "iWACqPLq90zRsiEhMSdPWHV8gaRAJ78O"

}
```

首先计算一个sign

sign 为 HmacMD5 算法计算出来的哈希值，使用网址：http://encode.chahuo.com

明文为：`clientId866714043075174deviceName866714043075174productKeya1mxL3s6Z7m`

密钥为：`iWACqPLq90zRsiEhMSdPWHV8gaRAJ78O`

结果sign：`161d9143f5a4ea3f9ab60614583fd1d7`

拼接**DOWNLOAD**参数

productKey=a1mxL3s6Z7m&sign=161d9143f5a4ea3f9ab60614583fd1d7&clientId=866714043075174&deviceName=866714043075174

***长度是112，这个 112 是 DOWNLOAD 下面的数据长度（以字节为单位），实际使用时，要根据自 己的数据长度进行修改，切记！！***！

小提示：我这里写了一个小工具可以自动计算参数，网址是[http://mqtt.lovemcu.cn](http://mqtt.lovemcu.cn/) 使用方法很简单看页面就知道了。

初始化HTTP

**AT+HTTPINIT** 

AT+HTTPINIT

OK

配置请求地址

**AT+HTTPPARA="URL",https://iot-auth.cn-shanghai.aliyuncs.com/auth/devicename**

AT+HTTPPARA="URL",https://iot-auth.cn-shanghai.aliyuncs.com/auth/devicename

OK

配置请求头，注意，Content-Type:后面有一个空格！！！

**AT+HTTPPARA="USER_DEFINED","Content-Type: application/x-www-form-urlencoded"**

AT+HTTPPARA="USER_DEFINED","Content-Type: application/x-www-form-urlencoded"

OK

配置请求信息，112的意义看前文一定不要错。

**AT+HTTPDATA=112,20000**

AT+HTTPDATA=112,20000

DOWNLOAD

出现DOWNLOAD后发送通过前文计算出来的参数

**productKey=a1mxL3s6Z7m&sign=161d9143f5a4ea3f9ab60614583fd1d7&clientId=866714043075174&deviceName=866714043075174**

OK

请求连接，等待HTTPACTION的信息上报，正常的话会回复状态码200

**AT+HTTPACTION=1**

AT+HTTPACTION=1

OK

+HTTPACTION: 1,200,124

读取请求结果

**AT+HTTPREAD**

AT+HTTPREAD

+HTTPREAD: 124

{"code":200,"data":{"iotId":"GAQYuiW0qid2H5NfMu9l000100","iotToken":"^1^1589511374876^27f6f5a03b709fc"},"message":"success"}

OK

HTTPREAD返回的数据中有iotId和iotToken，其中iotId的值为MQTT client的用户名， iotToken 的值为 MQTT client 的密码

关闭HTTP

**AT+HTTPTERM** 

AT+HTTPTERM

OK

#### 连接阿里云

配置连接，第一个参数是clientId我使用模块的IMEI，第二个参数和第三个参数是通过HTTP请求得到的，见前文说明

**AT+MCONFIG="866714043075174","GAQYuiW0qid2H5NfMu9l000100","^1^1589511374876^27f6f5a03b709fc"**

AT+MCONFIG="866714043075174","GAQYuiW0qid2H5NfMu9l000100","^1^1589511374876^27f6f5a03b709fc"

OK

建立连接，第一个参数需要根据实际项目productKey修改

**AT+SSLMIPSTART="a1mxL3s6Z7m.iot-as-mqtt.cn-shanghai.aliyuncs.com",1883**

AT+SSLMIPSTART="a1mxL3s6Z7m.iot-as-mqtt.cn-shanghai.aliyuncs.com",1883

OK

CONNECT OK

建立会话，收到CONNECT OK后立刻发送指令建立会话，不然会被踢，一定注意！！！

**AT+MCONNECT=1,120**

AT+MCONNECT=1,120

OK

CONNACK OK

到这里连接部分就结束了

### 一机一密AT直连MQTT方式

其他部分与HTTP鉴权方式相同，区别在于不需要HTTP每次请求参数。

#### 计算参数

在HTTP鉴权的部分提到一个sign，可以通过这个sign实现直连。

根据如下规则计算连接参数

```
ClientId: clientId+"|securemode=3,signmethod=hmacsha1,timestamp=132323232|"
Username: deviceName+"&"+productKey
Password：前文计算的sign
```

其中：

signmethod：表示签名算法类型。支持hmacmd5，hmacsha1和hmacsha256，默认为hmacmd5。
securemode：表示目前安全模式，可选值有2 （TLS直连模式）和3（TCP直连模式）。

比如我们建立的这个设备参数就应该是

```
ClientId: 866714043075174|securemode=3,signmethod=hmacsha1|
Username: 866714043075174&a1mxL3s6Z7m
Password：B1107184D60649B62ECF56F0E7E98E7B3772A3E7
```

在下一步的配置MQTT连接的参数时，按照计算的参数进行配置，建立连接即可。也可以使用我提供的在线工具进行生成。

#### 连接阿里云

配置mqtt参数

**AT+MCONFIG="866714043075174|securemode=3,signmethod=hmacsha1|","866714043075174&a1mxL3s6Z7m","B1107184D60649B62ECF56F0E7E98E7B3772A3E7"**

AT+MCONFIG="866714043075174|securemode=3,signmethod=hmacsha1|","866714043075174&a1mxL3s6Z7m","B1107184D60649B62ECF56F0E7E98E7B3772A3E7"

OK

建立连接，第一个参数需要根据实际项目productKey修改

**AT+SSLMIPSTART="a1mxL3s6Z7m.iot-as-mqtt.cn-shanghai.aliyuncs.com",1883**

AT+SSLMIPSTART="a1mxL3s6Z7m.iot-as-mqtt.cn-shanghai.aliyuncs.com",1883

OK

CONNECT OK

建立会话，收到CONNECT OK后立刻发送指令建立会话，不然会被踢，一定注意！！！

**AT+MCONNECT=1,120**

AT+MCONNECT=1,120

OK

CONNACK OK

### 一型一密AT方式连接

一型一密与一机一密的主要区别在于第一次连接的时候需要根据协议请求三元组。

#### 请求注册参数

首先需要在阿里云打开动态注册开关

![动态注册](http://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/20200526164753946_Snipaste_2020-05-26_16-47-36.png)

找到ProductSecret，复制ProductSecret使用

下文用到的例子，三元组的值分别为：  

```
ProductKey = b1KCi45LcCP

ProductSecret = VWll9fiYWKiwraBk

DeviceName = 862991419835241  
```

其中  AT+HTTPDATA=120,20000  注意，这个 120 是 DOWNLOAD 下面的数据长度（以字节为单位），实际使用时，要根 据自己的数据长度进行修改，切记！！！ 

DOWNLOAD   productKey=b1KCi45LcCP&deviceName=862991419835241&random=123456&sign=1770d3 8260cc980dbc4337ed7fe1e8de&signMethod=HmacMD5  

注意，这串数据最好自己复制出来，然后修改具体的值，不要全部手动输入，否则很 容易出问题，切 记！！！ 

 这条 AT 命令会用到三元组的值  sign 为 HmacMD5 算法计算出来的哈希值 

 明文为：deviceName862991419835241productKeyb1KCi45LcCPrandom123456  

密钥为：VWll9fiYWKiwraBk  

计算出来的哈希值为：1770d38260cc980dbc4337ed7fe1e8de 

 random 为随机数，长度不定 

 AT 交互过程如下： 

 **AT+HTTPINIT** 

 **OK  AT+HTTPPARA="URL"," https://iot-auth.cn-shanghai.aliyuncs.com/auth/register/device"** 

 OK 

 **AT+HTTPPARA="USER_DEFINED","Content-Type: application/x-www-form-urlencoded"**

 注意，Content-Type:后面有一个空格！！！  

OK 

 **AT+HTTPDATA=120,20000**  

注意，这个 120 是 DOWNLOAD 下面的数据长度（以字节为单位），实际使用时，要根 据自己的数据长度进行修改，切记！！！  

DOWNLOAD  **productKey=b1KCi45LcCP&deviceName=862991419835241&random=123456&sign=1770d3 8260cc980dbc4337ed7fe1e8de&signMethod=HmacMD5**  

注意，这串数据最好自己复制出来，然后修改具体的值，不要全部手动输入，否则很 容易出问题，切 记！！！  

OK 

 **AT+HTTPACTION=1** 

  OK 

 +HTTPACTION: 1,200,149 

 **AT+HTTPREAD** 

 +HTTPREAD: 149  {"code":200,"data":{"deviceName":"862991419835241","deviceSecret":"mRMyB50qafv74A 5FofvhxZ2h9iTL9wX7","productKey":"b1KCi45LcCP"},"message":"success"}  OK 

HTTPREAD 返回的数据中的 deviceSecret 就是设备密钥，在第四步中会用到 

**AT+HTTPTERM** 

OK 

**剩余部分同一机一密**

### 发布消息

#### 发布 Qos0 消息 

**AT+MPUB="/a1mxL3s6Z7m/866714043075174/user/update",0,0,"HelloWorld"**

AT+MPUB="/a1mxL3s6Z7m/866714043075174/user/update",0,0,"HelloWorld"

OK 

在阿里云找到运维监控，日志服务，找到我们的设备，可以看到消息记录里有一条设备上报的消息。点击那条MessageID可以看详情。

![img](http://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/20200602141708643_111.png)

可以看到我们的数据正常发的阿里云上了。

![img](http://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/20200602141743342_111.png)

#### **发布 Qos1 消息**

**AT+MPUB="/a1mxL3s6Z7m/866714043075174/user/update",1,0,"HelloWorld"**

AT+MPUB="/a1mxL3s6Z7m/866714043075174/user/update",1,0,"HelloWorld"

OK

PUBACK 

Qos1 消息必须等到 PUBACK 返回，才能发下一条消息。

和前文一样可以去阿里云后台查看消息

![img](http://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/20200602141843077_111.png)

### 订阅消息

找到我们设备的详情页可以看到所有主题，根据阿里云文档去选择自己使用的主题我这里使用自定义的主题进行演示。页面有详细权限，我们设备要选择正确的主题。比如发布消息是update结尾的，订阅主题是get结尾的。

![](http://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/20200602141216293_sub.png)

订阅主题 

**AT+MSUB=" /a1mxL3s6Z7m/866714043075174/user/get ",0**  

AT+MSUB="/a1mxL3s6Z7m/866714043075174/user/get",0

OK

SUBACK

设置收到数据时的打印方式 

配置为0时主动上报到串口。有新订阅消息时，上报的 URC 为+MSUB：<topic>,<len>,<message>

配置为1时缓存模式。有新订阅消息时，上报的 URC 为： +MSUB：<store_addr> 然后用 AT+MQTTMSGGET 来读消息

我这里配置为0

**AT+MQTTMSGSET=0**

AT+MQTTMSGSET=0 

OK 

在阿里云点击发布消息按钮向设备发送消息

![img](http://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/20200602141449318_sub.png)

![img](http://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/20200602141520112_sub.png)

模块主动上报消息

+MSUB: "/a1mxL3s6Z7m/866714043075174/user/get",11 byte,Hello World

订阅功能正常。

## LUAT方式连接概述

luat连接相比AT更为简单，只需要简单的配置即可连接，还可以灵活的对数据进行处理。

需要从官网或者github下载luatask的脚本包，或者使用luatoolsv2会自动下载脚本资源，在工具根目录的\resource\8910_script中脚本资源会随官网同步更新，具体版本可能和本文不同，不过功能都是一致的。

文档中用到的API接口见wiki的API章节。

### 一机一密LUAT方式连接



一机一密需要提前按照文档阿里云操作章节先建好产品并添加设备，获取三元组供代码使用。

找到所使用的脚本版本进入demo目录找到aliyun文件夹打开testALiYun.lua

首先修改PRODUCT_KEY为自己项目的PRODUCT_KEY

```lua
local PRODUCT_KEY = "b0FMK1Ga5cp"
```

再找到getDeviceName这个函数，如果是按前文的操作直接使用的imei作为devicename那么就不需要需改，如果是其他devicename就需要注释掉第一个return删除后面的return的注释，填上自己的devicename，类型是字符串。

```lua
函数名：getDeviceName
功能  ：获取设备名称
参数  ：无
返回值：设备名称
local function getDeviceName()
    --默认使用设备的IMEI作为设备名称，用户可以根据项目需求自行修改    
    return misc.getImei()
    
    --用户单体测试时，可以在此处直接返回阿里云的iot控制台上注册的设备名称，例如return "862991419835241"
    --return "862991419835241"
end
```

下一步找到getDeviceSecret注释掉第一个return，去掉第二个return的注释，把阿里云上的DeviceSecret替换上。

```lua
函数名：getDeviceSecret
功能  ：获取设备密钥
参数  ：无
返回值：设备密钥
local function getDeviceSecret()
    --默认使用设备的SN作为设备密钥，用户可以根据项目需求自行修改
    return misc.getSn()    
    --用户单体测试时，可以在此处直接返回阿里云的iot控制台上生成的设备密钥，例如return"y7MTCG6Gk33Ux26bbWSpANl4OaI0bg5Q"
    --return "y7MTCG6Gk33Ux26bbWSpANl4OaI0bg5Q"
end

```

修改以上三个参数后保存代码下载到设备就可以连接阿里云了。下载到设备的方法见wiki相关章节。

### 一型一密LUAT方式连接

除了需要添加产品和设备还需要在阿里云打开动态注册开关

![动态注册](http://openluat-luatcommunity.oss-cn-hangzhou.aliyuncs.com/images/20200526164753946_Snipaste_2020-05-26_16-47-36.png)

找到ProductSecret，复制ProductSecret使用

首先修改PRODUCT_KEY为自己项目的PRODUCT_KEY

```lua
local PRODUCT_KEY = "b0FMK1Ga5cp"
```

找到demo的这个地方，把PRODUCE_SECRET的注释去掉然后替换成自己的

```lua
--采用一型一密认证方案时：
--PRODUCT_KEY和PRODUCE_SECRET为阿里云华东2站点上创建的产品的ProductKey和ProductSecret，用户根据实际值自行修改
--local PRODUCT_KEY = "b1KCi45LcCP"
--local PRODUCE_SECRET = "VWll9fiYWKiwraBk"
--除了上面的PRODUCT_KEY和PRODUCE_SECRET外，还需要提供获取DeviceName的函数、获取DeviceSecret的函数、设置DeviceSecret的函数
--设备第一次在某个product下使用时，会先去云端动态注册，获取到DeviceSecret后，调用设置DeviceSecret的函数保存DeviceSecret
```

getDeviceName()这个地方前面阿里云操作时建议使用imei作为devicename就是为了此处使用方便。直接使用demo的这个写法即可，切记不可使用固定值。如果需要自己定义devicename请通过其他逻辑实现获取。

```lua
local function getDeviceName()
    --默认使用设备的IMEI作为设备名称，用户可以根据项目需求自行修改    
    return misc.getImei()
    
    --用户单体测试时，可以在此处直接返回阿里云的iot控制台上注册的设备名称，例如return "862991419835241"
    --return "862991419835241"
end
```

getDeviceSecret的地方也不需要修改，默认会将参数记录到sn区域。如果程序有其他地方使用到sn可修改为记录到nvm，请根据需要自行实现。

最后找到如下部分，将一机一密的代码注释，将一型一密的代码打开

```lua

--采用一机一密认证方案时：
--配置：ProductKey、获取DeviceName的函数、获取DeviceSecret的函数；其中aLiYun.setup中的第二个参数必须传入nil
aLiYun.setup(PRODUCT_KEY,nil,getDeviceName,getDeviceSecret)

--采用一型一密认证方案时：
--配置：ProductKey、ProductSecret、获取DeviceName的函数、获取DeviceSecret的函数、设置DeviceSecret的函数
--aLiYun.setup(PRODUCT_KEY,PRODUCE_SECRET,getDeviceName,getDeviceSecret,setDeviceSecret)
```

保存代码下载到设备就可以连接阿里云了。下载到设备的方法见wiki相关章节。

### 发布消息

发布消息使用的是**aLiYun.publish(topic, payload, qos, cbFnc, cbPara)**这个API

| 传入值类型 | 释义                                                         |
| ---------- | ------------------------------------------------------------ |
| string     | topic，UTF8编码的主题                                        |
| string     | payload，负载                                                |
| number     | **可选参数，默认为`0`**，qos，质量等级，0/1/2，默认0         |
| function   | **可选参数，默认为`nil`**，cbFnc，消息发布结果的回调函数 回调函数的调用形式为：cbFnc(result,cbPara)。result为true表示发布成功，false或者nil表示订阅失败；cbPara为本接口中的第5个参数 |
| param      | **可选参数，默认为`nil`**，cbPara，消息发布结果回调函数的回调参数 |

在demo里publishTest()这个函数演示了接口的操作。把第一个参数修改成自己项目的topic就可以实现每20s向阿里云推送一条消息。

```lua
--发布一条QOS为1的消息
function publishTest()
    if sConnected then
        --注意：在此处自己去控制payload的内容编码，aLiYun库中不会对payload的内容做任何编码转换        aLiYun.publish("/"..PRODUCT_KEY.."/"..getDeviceName().."/update","qos1data",1,publishTestCb,"publishTest_"..publishCnt)
    end
end

```

### 请阅消息

订阅使用的是**aLiYun.subscribe(topic, qos)**

| 传入值类型 | 释义                                                         |
| ---------- | ------------------------------------------------------------ |
| param      | topic，string或者table类型，一个主题时为string类型，多个主题时为table类型，主题内容为UTF8编码 |
| param      | qos，number或者nil，topic为一个主题时，qos为number类型(0/1/2，默认0)；topic为多个主题时，qos为nil |

demo的一下代码就是订阅的操作

```lua
--- 连接结果的处理函数
-- @bool result，连接结果，true表示连接成功，false或者nil表示连接失败
local function connectCbFnc(result)
    log.info("testALiYun.connectCbFnc",result)
    sConnected = result
    if result then
        --订阅主题，不需要考虑订阅结果，如果订阅失败，aLiYun库中会自动重连
        aLiYun.subscribe({["/"..PRODUCT_KEY.."/"..getDeviceName().."/get"]=0, ["/"..PRODUCT_KEY.."/"..getDeviceName().."/get"]=1})
        --注册数据接收的处理函数
        aLiYun.on("receive",rcvCbFnc)
        --PUBLISH消息测试
        publishTest()
    end
end
```

首先使用aLiYun.subscribe订阅了两个topic，然后 aLiYun.on("receive",rcvCbFnc)注册接收消息处理的回调函数。回调中将消息进行打印。如果需要处理消息就可以在这里操作。

```lua
local function rcvCbFnc(topic,qos,payload)
    log.info("testALiYun.rcvCbFnc",topic,qos,payload)
end
```



### OTA升级



## 常见问题

