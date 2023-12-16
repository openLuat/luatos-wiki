# 🖥 PC客户端

## 下载

- 微软商店下载：[微软商店页面](https://www.microsoft.com/store/apps/9N8S8M8226SH)
- 独立版exe版本：[IoT Power.exe](https://arduino.luatos.com/iotpower/latest.html)（注意微软/360杀软误报，火绒无问题）
- **全平台**命令行数据记录器，带UI：[IoTPower CLI Tool](https://gitee.com/openLuat/iot-power/releases/tag/1.0.0)
- dll/so动态运行库：[Gitee iot-power dll/so](https://gitee.com/openLuat/iot-power/releases/tag/0.1.0)

<h1 id="win7-notice" style="display: none;">Win7 用户看下面这行！展开！！</h1>

:::{dropdown} win7用户可能需要
（win10以上免驱，无需手动安装驱动）

IoT Power V1 CP2102驱动：[CP210x_Windows_Drivers](https://www.silabs.com/documents/public/software/CP210x_Windows_Drivers.zip)

IoT Power Pro 驱动：[IoTPowerPro-Driver.7z](https://arduino.luatos.com/iotpower/IoTPowerPro-Driver.7z)

IoT Power CC 驱动：[IoTPower_CC_usb_driver.7z](https://arduino.luatos.com/iotpower/IoTPower_CC_usb_driver.7z)

.net framework 4.6.2：[安装包](https://dotnet.microsoft.com/zh-cn/download/dotnet-framework/thank-you/net462-offline-installer)
:::

:::{dropdown} 命令行数据记录器

![IoTPower CLI Tool](img/cli_tool.png)

下载：[IoTPower CLI Tool](https://gitee.com/openLuat/iot-power/releases/tag/1.0.0)
:::

## 客户端简介

客户端可提供以下功能，可能会继续增加：

- 查看电流波形
- 记录历史数据
- 分析指定时间段的数据
  - 平均电流
  - 平均电压
  - 平均功率
  - 峰值、最小电流
  - 峰值、最小电压
- 导入与导出抓取的数据，支持导出为独立exe
- 为设备升级固件
- 运行lua脚本控制输出，模拟电池等设备放电曲线

```{image} img/pc_client.gif
:alt: pc_client
:width: 1782px
:align: center
```

```{note}
该教程于`2.0.7.11`版本时编写，若有新增或变更的功能没有提到，请在页面最下方留言提醒更新，谢谢
```

## 软件界面

软件首页布局如下图所示

```{image} img/pc_overview.png
:alt: pc_overview
:width: 1782px
:align: center
```

### 当前显示

```{image} img/pc_now.gif
:alt: pc_now
:width: 386px
:align: center
```

该区域数值为设备连接后，当前的数据，可以切换为滑动平均值或瞬时值

```{image} img/pc_float.gif
:alt: pc_float
:width: 412px
:align: center
```

软件上方的**数据浮窗**开关可以打开浮窗，显示的数据与此处数据完全相同，始终置顶显示，方便最小化软件后查看实时数据

> 若在瞬时值档位，可能会与设备端显示不一致，此为正常现象，因为刷新时间点不可能完全一致

### 平均数据

```{image} img/pc_avg.png
:alt: pc_avg
:width: 365px
:align: center
```

此处数据为，**自本次设备连接后的所有数据**的平均值，清空后清零

### 其他数据

```{image} img/pc_info.gif
:alt: pc_info
:width: 372px
:align: center
```

此处数据为，**自本次设备连接后的所有数据**的相关累计数据，清空后清零  
单击**耗电数据**的数值区域，可以切换`Wh`与`Ah`数值

## 图表区域

```{image} img/pc_wave.png
:alt: pc_wave
:width: 1401px
:align: center
```

此区域为图表显示区域，可以预览波形图

### 调整显示方式

- 自适应坐标：按当前显示区域的最大值，动态地决定纵坐标范围
- 按最大值设置纵坐标：按此次抓取数据的最大值，固定纵坐标范围
- 对数坐标：当电流数据绝对值相差极大时，可启用该功能，将以10的倍数来显示纵坐标的值

### 切换数据显示方式

```{image} img/pc_wave_mode.gif
:alt: pc_wave_mode
:width: 1392px
:align: center
```

按下该按钮，可在**实时数据/历史数据**与**选取某个区域**两种显示模式中切换，下方将介绍两种模式

### 实时数据/历史数据（不缩放）

```{image} img/pc_wave_ctrl.gif
:alt: pc_wave_ctrl
:width: 1394px
:align: center
```

当鼠标在图表中或在拖动轴上时，可以使用**鼠标滚轮**，调整波形的时间位置  
也可以拖动下方的操纵杆，控制当前显示波形的时间位置

```{notice}
在查看历史数据时，为了不会被新数据推挤变化，将会暂停波形图的刷新。
所以当处于该模式下，并且`显示波形时间位置在最右侧`（最新时间）时，才会`实时刷新当前抓取到的数据`。  
```

### 选取某个区域（启用缩放）

使用**鼠标左键拖动**，可以选取查看一个区域的数据，并进入`选取区域数据`模式

当处于`选取区域数据`模式时，可以使用**鼠标滚轮**调整波形的时间位置

也可以**按住CTRL键并滚动鼠标滚轮**，放大或缩小当前显示的区域

```{image} img/pc_wave_select.gif
:alt: pc_wave_select
:width: 1396px
:align: center
```

下方的拉杆同样可以用于控制选择显示的范围

- 鼠标拖动中间：可以调整波形的时间位置
- 鼠标拖动左边或右边的竖线：可以调整波形显示的开始或结束时间点
- 鼠标双击中间：可以直接切换为查看全局数据

### 分析数据

当处在任意模式下时，都可以**右击鼠标拖动**，选择一个时间段来分析其中的数据

```{image} img/pc_wave_data.gif
:alt: pc_wave_data
:width: 1427px
:align: center
```

当选取一段区域后，`分析窗`将弹出显示分析的结果

## 控制设备输出

```{image} img/client2.png
:alt: client2
:width: 1780px
:align: center
```

- 通过`电源符号`按钮，控制设备的输出、关闭状态
- 通过`设备输出`按钮，设置设备的输出电压与电流

```{note}
该功能仅适用于`电源产品`与带`PPS诱骗`功能的产品
```

## 导入与导出数据

```{image} img/pc_import.png
:alt: pc_import
:width: 470px
:align: center
```

```{image} img/pc_export.png
:alt: pc_export
:width: 539px
:align: center
```

### 导入数据

- 手动选择文件，可导入IoT Power专用的`.iotpl`文件
- 导入自动保存的文件，表示从自动保存的文件中进行导入。自动保存功能通常出现在关闭与重新抓取时

### 导出数据

数据可自由地导出为`.iotpl`文件、`.csv`表格文件、`.exe`自执行文件  
区别在于，`.csv`表格文件用于用户自行分析原始数据，无法再重新导入  
而`.iotpl`文件可以再次导入软件，`.exe`自执行文件也可以再导出为`.iotpl`文件用于导入

## 脚本功能

```{image} img/client3.png
:alt: client3
:width: 1780px
:align: center
```

该功能可实现输出电压与电流的自动控制  
脚本使用`Lua语言`，适配了`LuaTask`框架（[教程](https://wiki.luatos.com/luaGuide/luatask.html)）  
具体的接口文档，可以参考[此仓库的资料](https://gitee.com/openLuat/iot-power)

## 强制升级固件

```{image} img/pc_upgrade.png
:alt: pc_upgrade
:width: 1198px
:align: center
```

通常来说，设备固件会自动提示升级。但是有时当设备升级途中中断或因其他原因导致固件损坏时，可手动刷入固件

- 单击`强制升级固件`按钮，可强制刷入客户端自带的固件。注意：若设备有升级模式，请先进入升级模式后再刷
- 右击`强制升级固件`按钮，可强制刷入用户手动选择的固件文件，用于测试功能、验证BUG修复

## 数据缓存方式

```{image} img/pc_cache.png
:alt: pc_cache
:width: 1058px
:align: center
```

因为设备采样率很高，所以数据量十分庞大，存储在内存中可能导致电脑内存不足  
所以软件提供了自动保存功能，当达到时间后，将数据自动保存至文件中，防止占用过多内存

当然，为了存储某些用户变态级地海量数据（比如连续抓取十几个小时），软件也提供了使用硬盘缓存数据的功能  
在该模式下，牺牲部分的流畅性，以换来大大降低的内存占用，并且不会触发自动保存，保证数据的连续性  

<script>
if(navigator.userAgent.indexOf("Windows NT 6") >= 0) {
  alert("Win7用户须知，请阅读完再关！\nWin7必须手动安装驱动才能运行！\n要装两个驱动！运行和升级模式分别装。\n需要.net framework 4.6.2才能运行客户端！\n不支持x86架构32位的电脑！");
  document.getElementById('win7-notice').style.cssText = "font-weight: bold;color: red;";
}
</script>
