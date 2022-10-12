# LuatOS 点阵字库格式

为了适应U8G2/EINK/LCD/LVGL的字符显示需求, 解决多种字体格式浪费的问题

## 约束条件

* 在内存中尽量为常数,可存放于ROM
* 映射表与点阵数据分开存放, 支持多份点阵数据使用同一份映射表

仅定义2种相对宽度的点阵数据, 分别对应 `半角` 和 `全角`

设 `行高` 为 `X`, 且`X`总是偶数, `半角`字符的宽度为 `X/2`, `半角`字符的宽度为 `X`

而寻址总是按 `unicode` 进行查找

## 数据结构

数据表, 数据排列总是按对应的font_map顺序

```c
typedef struct luat_font_data {
    uint8_t map_type;  // 类型数据, 后面有详细说明
    uint8_t unicode_w; // map表单个字符的字节大小, 可以是2,4
    uint16_t count;    // 字符数量
    uint32_t unicode_min;
    uint32_t unicode_max;
    // uint32_t reserved; // 保留区域, 扩展用, 默认0x0000
}luat_font_data_t;
```

文件结构


```c
    uint8_t magic;                 // 总是 0xC5
    uint8_t version;               // 当前为0x0001
    uint8_t font_w;                // 字号
    uint8_t access_mode         : 4;   // 访问模式
    uint8_t font_data_count     : 4;   // 数据总数, 通常就1或2个,不会很多.

    // uint32_t reserved; // 保留区域, 扩展用, 默认0x0000
    luat_font_data_t datas[font_data_count];

    // 后面就是文件与ROM的差异了
    // 文件存储时, 数据依次排序
    // 编译进ROM时, 下面4个均为指针
    uint8_t font_map[font_data_count]; // 例如, font_data_count 为2 时
                                       // rom模式下, 为 uint8_t* font_map[2]
                                       // file模式下, 为 uint8_t font_map[map0对应的map长度], uint8_t font_map[map1对应的map长度]

    uint8_t font_data[font_data_count]; // 与map同理
```

约定:

map_type 代表映射表的类型

* 0x0001 自定义map数据
* 0x0002 ASCII基础映射表 0x20 ~ 0xFE, 因为是连续的, 无需内置
* 0x0003 GB2312全表, 内置在源码里, 作用是生成字体文件时可省略
* 0x0004 表情包, 3字节unicode, 映射到4字节(待定)
