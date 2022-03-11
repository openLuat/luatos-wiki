# zbuff - c内存数据操作库

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/modules/luat_lib_zbuff.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## zbuff.create(length,data)

创建zbuff

**参数**

|传入值类型|解释|
|-|-|
|int|字节数|
|any|可选参数，number时为填充数据，string时为填充字符串|

**返回值**

|返回值类型|解释|
|-|-|
|object|zbuff对象，如果创建失败会返回nil|

**例子**

```lua
-- 创建zbuff
local buff = zbuff.create(1024) -- 空白的
local buff = zbuff.create(1024, 0x33) --创建一个初值全为0x33的内存区域
local buff = zbuff.create(1024, "123321456654") -- 创建，并填充一个已有字符串的内容

```

---

## zbuff.create({width,height,bit},data)

创建framebuff用的zbuff

**参数**

|传入值类型|解释|
|-|-|
|table|宽度、高度、色位深度|
|int|可选参数，填充数据|

**返回值**

|返回值类型|解释|
|-|-|
|object|zbuff对象，如果创建失败会返回nil|

**例子**

```lua
-- 创建zbuff
local buff = zbuff.create({128,160,16})--创建一个128*160的framebuff
local buff = zbuff.create({128,160,16},0xf800)--创建一个128*160的framebuff，初始状态红色

```

---

## buff:write(para,...)

zbuff写数据

**参数**

|传入值类型|解释|
|-|-|
|any|写入buff的数据，string时为一个参数，number时可为多个参数|

**返回值**

|返回值类型|解释|
|-|-|
|number|数据成功写入的长度|

**例子**

```lua
-- 类file的读写操作
local len = buff:write("123") -- 写入数据, 指针相应地往后移动，返回写入的数据长度
local len = buff:write(0x1a,0x30,0x31,0x32,0x00,0x01)  -- 按数值写入多个字节数据

```

---

## buff:read(length)

zbuff读数据

**参数**

|传入值类型|解释|
|-|-|
|int|读取buff中的字节数|

**返回值**

|返回值类型|解释|
|-|-|
|string|读取结果|

**例子**

```lua
-- 类file的读写操作
local str = buff:read(3)

```

---

## buff:clear(num)

zbuff清空数据，类似于memset

**参数**

|传入值类型|解释|
|-|-|
|int|可选，默认为0。要设置为的值，不会改变buff指针位置|

**返回值**

无

**例子**

```lua
-- 全部初始化为0
buff:clear(0)

```

---

## buff:seek(base,offset)

zbuff设置光标位置

**参数**

|传入值类型|解释|
|-|-|
|int|偏移长度|
|int|where, 基点，默认zbuff.SEEK_SET。zbuff.SEEK_SET: 基点为 0 （文件开头），zbuff.SEEK_CUR: 基点为当前位置，zbuff.SEEK_END: 基点为文件尾|

**返回值**

|返回值类型|解释|
|-|-|
|int|设置光标后从buff开头计算起的光标的位置|

**例子**

```lua
buff:seek(0) -- 把光标设置到指定位置
buff:seek(5,zbuff.SEEK_CUR)
buff:seek(-3,zbuff.SEEK_END)

```

---

## buff:pack(format,val1, val2,...)

将一系列数据按照格式字符转化，并写入

**参数**

|传入值类型|解释|
|-|-|
|string|后面数据的格式（符号含义见下面的例子）|
|val|传入的数据，可以为多个数据|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功写入的数据长度|

**例子**

```lua
buff:pack(">IIHA", 0x1234, 0x4567, 0x12,"abcdefg") -- 按格式写入几个数据
-- A string
-- f float
-- d double
-- n Lua number
-- c char
-- b byte / unsignen char
-- h short
-- H unsigned short
-- i int
-- I unsigned int
-- l long
-- L unsigned long
-- < 小端
-- > 大端
-- = 默认大小端

```

---

## buff:unpack(format)

将一系列数据按照格式字符读取出来

**参数**

|传入值类型|解释|
|-|-|
|string|数据的格式（符号含义见上面pack接口的例子）|

**返回值**

|返回值类型|解释|
|-|-|
|int|成功读取的数据字节长度|
|any|按格式读出来的数据|

**例子**

```lua
local cnt,a,b,c,s = buff:unpack(">IIHA10") -- 按格式读取几个数据
--如果全部成功读取，cnt就是4+4+2+10=20

```

---

## buff:read类型()

读取一个指定类型的数据

**参数**

|传入值类型|解释|
|-|-|
|注释|读取类型可为：I8、U8、I16、U16、I32、U32、I64、U64、F32、F64|

**返回值**

|返回值类型|解释|
|-|-|
|number|读取的数据，如果越界则为nil|

**例子**

```lua
local data = buff:readI8()
local data = buff:readU32()

```

---

## buff:write类型()

写入一个指定类型的数据

**参数**

|传入值类型|解释|
|-|-|
|number|待写入的数据|
|注释|写入类型可为：I8、U8、I16、U16、I32、U32、I64、U64、F32、F64|

**返回值**

|返回值类型|解释|
|-|-|
|number|成功写入的长度|

**例子**

```lua
local len = buff:writeI8(10)
local len = buff:writeU32(1024)

```

---

## buff:toStr(offset,length)

按起始位置和长度取出数据

**参数**

|传入值类型|解释|
|-|-|
|int|数据的起始位置（起始位置为0）|
|int|数据的长度|

**返回值**

|返回值类型|解释|
|-|-|
|string|读出来的数据|

**例子**

```lua
local s = buff:toStr(0,5)--读取开头的五个字节数据

```

---

## buff:len()

获取zbuff对象的长度

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|int|zbuff对象的长度|

**例子**

```lua
len = buff:len()
len = #buff

```

---

## buff:setFrameBuffer(width,height,bit,color)

设置buff对象的FrameBuffer属性

**参数**

|传入值类型|解释|
|-|-|
|int|FrameBuffer的宽度|
|int|FrameBuffer的高度|
|int|FrameBuffer的色位深度|
|int|FrameBuffer的初始颜色|

**返回值**

|返回值类型|解释|
|-|-|
|bool|设置成功会返回true|

**例子**

```lua
result = buff:setFrameBuffer(320,240,16,0xffff)

```

---

## buff:pixel(x,y,color)

设置或获取FrameBuffer某个像素点的颜色

**参数**

|传入值类型|解释|
|-|-|
|int|与最左边的距离，范围是0~宽度-1|
|int|与最上边的距离，范围是0~高度-1|
|int|颜色，如果留空则表示获取该位置的颜色|

**返回值**

|返回值类型|解释|
|-|-|
|any|设置颜色时，设置成功会返回true；读取颜色时，返回颜色的值，读取失败返回nil|

**例子**

```lua
rerult = buff:pixel(0,3,0)
color = buff:pixel(0,3)

```

---

## buff:drawLine(x1,y1,x2,y2,color)

画一条线

**参数**

|传入值类型|解释|
|-|-|
|int|起始坐标点与最左边的距离，范围是0~宽度-1|
|int|起始坐标点与最上边的距离，范围是0~高度-1|
|int|结束坐标点与最左边的距离，范围是0~宽度-1|
|int|结束坐标点与最上边的距离，范围是0~高度-1|
|int|可选，颜色，默认为0|

**返回值**

|返回值类型|解释|
|-|-|
|bool|画成功会返回true|

**例子**

```lua
rerult = buff:drawLine(0,0,2,3,0xffff)

```

---

## buff:drawRect(x1,y1,x2,y2,color,fill)

画一个矩形

**参数**

|传入值类型|解释|
|-|-|
|int|起始坐标点与最左边的距离，范围是0~宽度-1|
|int|起始坐标点与最上边的距离，范围是0~高度-1|
|int|结束坐标点与最左边的距离，范围是0~宽度-1|
|int|结束坐标点与最上边的距离，范围是0~高度-1|
|int|可选，颜色，默认为0|
|bool|可选，是否在内部填充，默认nil|

**返回值**

|返回值类型|解释|
|-|-|
|bool|画成功会返回true|

**例子**

```lua
rerult = buff:drawRect(0,0,2,3,0xffff)

```

---

## buff:drawCircle(x,y,r,color,fill)

画一个圆形

**参数**

|传入值类型|解释|
|-|-|
|int|**圆心**与最左边的距离，范围是0~宽度-1|
|int|**圆心**与最上边的距离，范围是0~高度-1|
|int|圆的半径|
|int|可选，圆的颜色，默认为0|
|bool|可选，是否在内部填充，默认nil|

**返回值**

|返回值类型|解释|
|-|-|
|bool|画成功会返回true|

**例子**

```lua
rerult = buff:drawCircle(15,5,3,0xC)
rerult = buff:drawCircle(15,5,3,0xC,true)

```

---

## buff[n]

以下标形式进行数据读写

**参数**

|传入值类型|解释|
|-|-|
|int|第几个数据，以0开始的下标（C标准）|

**返回值**

|返回值类型|解释|
|-|-|
|number|该位置的数据|

**例子**

```lua
buff[0] = 0xc8
local data = buff[0]

```

---

## buff:resize(n)

调整zbuff的大小

**参数**

|传入值类型|解释|
|-|-|
|int|新空间大小|
|return|无|

**返回值**

无

**例子**

```lua
buff:resize(20)

```

---

## buff:copy(cursor, para,...)

zbuff动态写数据，类似于memcpy效果，当原有空间不足时动态扩大空间

**参数**

|传入值类型|解释|
|-|-|
|int|写入buff的起始位置，如果不为数字，则为buff的cursor，如果小于0，则从cursor往前数，-1 = cursor - 1|
|any|写入buff的数据，string或zbuff者时为一个参数，number时可为多个参数|

**返回值**

|返回值类型|解释|
|-|-|
|number|数据成功写入的长度|

**例子**

```lua
local len = buff:copy(nil, "123") -- 从buff当前指针位置开始写入数据, 指针相应地往后移动，返回写入的数据长度
local len = buff:copy(0, "123") -- 从位置0写入数据, 返回写入的数据长度
local len = buff:copy(2, 0x1a,0x30,0x31,0x32,0x00,0x01)  -- 从位置2开始，按数值写入多个字节数据
local len = buff:copy(9, buff2)  -- 从位置9开始，合并入buff2里内容

```

---

## buff:size()

获取zbuff的实际数据量大小

**参数**

|传入值类型|解释|
|-|-|
|return|zbuff的实际数据量大小|

**返回值**

无

**例子**

```lua
buff:size()

```

---

## buff:del(offset,length)

删除zbuff 0~cursor范围内的一段数据，

**参数**

|传入值类型|解释|
|-|-|
|int|起始位置, 默认0，如果<0则从cursor往前数，-1 = cursor - 1|
|int|长度，默认为cursor|
|return|无|

**返回值**

无

**例子**

```lua
buff:del(1,4)	--从位置1开始删除4个字节数据

```

---

## buff:query(offset,length,isbigend,issigned,isfloat)

按起始位置和长度0~cursor范围内取出数据，如果是1,2,4,8字节，根据后续参数转换成浮点或者整形

**参数**

|传入值类型|解释|
|-|-|
|int|数据的起始位置（起始位置为0）|
|int|数据的长度|
|boolean|是否是大端格式，如果为nil，则不会转换，直接字节流输出|
|boolean|是否是有符号的，默认为false|
|boolean|是否是浮点型，默认为false|

**返回值**

|返回值类型|解释|
|-|-|
|string|读出来的数据|

**例子**

```lua
local s = buff:query(0,5)--读取开头的五个字节数据

```

---

