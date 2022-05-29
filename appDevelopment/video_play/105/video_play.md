# **Air105视频播放**

## 前言

之前在Air101上我们进行过[视频播放](https://doc.openluat.com/article/3535)并制作了demo：[video_play](https://gitee.com/openLuat/LuatOS/tree/master/demo/video_play)，今天我们使用Air105在进行一遍视频播放

## 准备工作

在进行之前先说一下原理，原理很简单，就是将TF卡中的视频字节流数据读出来在LCD上绘制

那么开始准备视频字节流数据吧，我们需要用到[ffmpeg](https://www.ffmpeg.org/)

### linux平台

直接终端输入 `sudo apt install ffmpeg` 即可

### windows平台

我们在[这里](https://www.gyan.dev/ffmpeg/builds/)进行下载可以得到win版本的压缩包，解压即可获得其中的ffmpeg.exe

下面以windows平台为例

首先我们了解一下基础的ffmpeg参数

## **ffmpeg参数**

**通用选项**

-L license
-h 帮助
-fromats 显示可用的格式，编解码的，协议的...
-f fmt 强迫采用格式fmt
-I filename 输入文件
-y 覆盖输出文件
-t duration 设置纪录时间 hh:mm:ss[.xxx]格式的记录时间也支持
-ss position 搜索到指定的时间 [-]hh:mm:ss[.xxx]的格式也支持
-title string 设置标题
-author string 设置作者
-copyright string 设置版权
-comment string 设置评论
-target type 设置目标文件类型(vcd,svcd,dvd) 所有的格式选项（比特率，编解码以及缓冲区大小）自动设置，只需要输入如下的就可以了：ffmpeg -i myfile.avi -target vcd /tmp/vcd.mpg
-hq 激活高质量设置
-itsoffset offset 设置以秒为基准的时间偏移，该选项影响所有后面的输入文件。该偏移被加到输入文件的时戳，定义一个正偏移意味着相应的流被延迟了 offset秒。 [-]hh:mm:ss[.xxx]的格式也支持

**视频选项**

-b bitrate 设置比特率，缺省200kb/s
-r fps 设置帧频 缺省25
-s size 设置帧大小 格式为WXH 缺省160X128.下面的简写也可以直接使用：
Sqcif 128X96 qcif 176X144 cif 252X288 4cif 704X576
-aspect aspect 设置横纵比 4:3 16:9 或 1.3333 1.7777
-croptop size 设置顶部切除带大小 像素单位
-cropbottom size –cropleft size –cropright size
-padtop size 设置顶部补齐的大小 像素单位
-padbottom size –padleft size –padright size –padcolor color 设置补齐条颜色(hex,6个16进制的数，红:绿:兰排列，比如 000000代表黑色)
-vn 不做视频记录
-bt tolerance 设置视频码率容忍度kbit/s
-maxrate bitrate设置最大视频码率容忍度
-minrate bitreate 设置最小视频码率容忍度
-bufsize size 设置码率控制缓冲区大小
-vcodec codec 强制使用codec编解码方式。如果用copy表示原始编解码数据必须被拷贝。
-sameq 使用同样视频质量作为源（VBR）
-pass n 选择处理遍数（1或者2）。两遍编码非常有用。第一遍生成统计信息，第二遍生成精确的请求的码率
-passlogfile file 选择两遍的纪录文件名为file



了解完ffmpeg参数我们可以开始制作了

首先准备好一段要播放的视频，由于避免版权原因这里不放视频地址了，将之前的ffmpeg.exe也准备好

![1](1.png)

powershell命令输入 `.\ffmpeg -i mwsy.mp4 -r 20 -vf scale=160:128 -pix_fmt rgb565be -vcodec rawvideo mwsy.rgb` 即可将视频转为160x128分辨率的字节流文件

![2](2.png)

将生成的mwsy.rgb放在sd卡中

## 播放视频

之后将我们开始编写代码

```lua
sys.taskInit(function()
    --初始化lcd
    spi_lcd = spi.deviceSetup(5,pin.PC14,0,0,8,48*1000*1000,spi.MSB,1,1)
    log.info("lcd.init",
    lcd.init("st7735",{port = "device",pin_dc = pin.PE08 ,pin_rst = pin.PC12,pin_pwr = pin.PE09,direction = 3,w = 160,h = 128,xoffset = 1,yoffset = 2},spi_lcd))
    --初始化sd
    local spiId = 2
    local result = spi.setup(
        spiId,--串口id
        255, -- 不使用默认CS脚
        0,--CPHA
        0,--CPOL
        8,--数据宽度
        400*1000  -- 初始化时使用较低的频率
    )
    local TF_CS = pin.PB3
    gpio.setup(TF_CS, 1)
    --fatfs.debug(1) -- 若挂载失败,可以尝试打开调试信息,查找原因
    fatfs.mount("SD", spiId, TF_CS, 24000000)
    local data, err = fatfs.getfree("SD")
    if data then
        log.info("fatfs", "getfree", json.encode(data))
    else
        log.info("fatfs", "err", err)
    end
    
    local video_w = 160
    local video_h = 128
    local rgb_file = "mwsy.rgb"

    local buff_size = video_w*video_h*2
    local file_size = fs.fsize("/sd/"..rgb_file)
    print("/sd/"..rgb_file.." file_size",file_size)
    
    local file = io.open("/sd/"..rgb_file, "rb")
    if file then
        local file_cnt = 0
        local buff = zbuff.create(buff_size)
        repeat
            if file:fill(buff) then
                file_cnt = file_cnt + buff_size
                lcd.draw(0, 0, video_w-1, video_h-1, buff)
                sys.wait(20)
            end
        until( file_size - file_cnt < buff_size )
        local temp_data = file:fill(buff,0,file_size - file_cnt)
        lcd.draw(0, 0, video_w-1, video_h-1, buff)
        sys.wait(30)
        file:close()
    end

    while 1 do
        sys.wait(1000)
    end
end)
```

可以看到代码很简单，首先初始化lcd 之后初始化并挂载sd，然后就是读视频向lcd进行draw

## 效果展示

[视频效果展示](https://www.bilibili.com/video/BV1Yg411R7Tc/)

## 相关连接

[LuatOS-SoC仓库](https://gitee.com/openLuat/LuatOS)

[LuatOS-SoC WIKI](https://wiki.luatos.com/index.html)

[bsp-Air101](https://gitee.com/openLuat/LuatOS/tree/master/bsp/air101)