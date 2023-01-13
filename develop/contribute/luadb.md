# LuaDB 文件格式

LuaDB 并非数据库, 而是一种广泛用于LuatOS固件的文件打包格式.

其作用相当于一个只读文件系统.

## 文件格式定义

```c
typedef struct header_tld {
    uint8_t type;
    uint8_t len;
    uint8_t data[len]; // 长度取决于前一个len值
}header_tld_t;

typedef struct file_tld {
    uint8_t type;
    uint32_t len;
    uint8_t data[len];
}file_tld_t;

typedef struct luadb {
    header_tld_t[] headers;
    file_tld_t[] files;
}luadb_t;
```

### header_tld.type的取值及含义

* 0x01 文件头   len固定为4, 值为 0xA5 0x5A 0xA5 0x5A, 固定为头部区的第一个TLD
* 0x02 版本号   len固定为2, 值为 0x00 0x02
* 0x03 头部长度 len固定为4, headers的总长, uint32_t
* 0x04 文件数量 len固定为2, 文件区的数据数量, uint16_t
* 0xFE 校验值   len固定为2, CRC16. 这是头部区的最后一个TLD

虽然从定义上非0x01/0xFE的位置可以随意, 但实际实现通常都是按以上列出的顺序给出.

### file_tld.type的取值及含义

* 0x01 魔数,        len 固定为4, 值为 0xA5 0x5A 0xA5 0x5A
* 0x02 文件名       len不固定, 值为文件名数据
* 0x03 文件数据长度 len的数据长度为4, 这点与其他不同. 内容是文件数据的长度, uint32_t, 然后是文件数据
* 0xFE 校验值       len固定为2, CRC16

### 特殊约定

* 文件区的末尾, 会是一个名为 ".airm2m_all_crc#.bin", 内容是当前文件数据之前的所有数据的md5的hex值.


## 格式的固定限制

* 文件数量限制在1024个文件