# 字库模块

## 基本信息

- 起草日期: 2022-03-15
- 设计人员: [chenxuuu](https://github.com/chenxuuu)

## 已知问题

目前已有的字库字体大小不统一、刷新较慢，且自定义字体困难。需要一个通用的点阵字体库

## 需要实现的目标

- 可通过c接口获取指定字体的某个字的点阵信息
- 使用UTF16编码（定长）
- 配套上位机，可方便地生成字体代码进行添加。尽量做成网页版
- 提供Lua接口，可从Lua层获取某个字体的点阵信息
- 支持从文件系统加载字体的方式，上位机也要支持生成此类在字体文件
- 支持灰度，待定，没想到实现方法
- 矢量字体，待定，没想到实现方法

## 解决方案

### lua的接口

```lua
--思源黑体16px
local data,width,height = font.get(font.SOURCE_SANS_16,"测")
local data,width,height = font.get(font.SOURCE_SANS_16,"测试")
```

### c接口

```c
typedef struct luat_font {
    uint8_t* addr; //数据存储的地址
    size_t start;  //编码开始的位置
    size_t len;    //一共多少个字
    uint16_t width; //字体宽度
    uint16_t height;//字体高度
} luat_font_t;

//返回的指针直接指向rom区域，不用free
uint8_t* luat_font_get(L_Font* font, uint16_t c, uint16_t* width, uint16_t* height, uint32_t* size);
```

## 相关知识点

无
