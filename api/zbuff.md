# zbuff - c内存数据操作库

## 常量

|常量|类型|解释|
|-|-|-|
|zbuff.SEEK_SET|number|以头为基点|
|zbuff.SEEK_CUR|number|以当前位置为基点|
|zbuff.SEEK_END|number|以末尾为基点|
|zbuff.HEAP_AUTO|number|自动申请(如存在psram则在psram进行申请,如不存在或失败则在sram进行申请)|
|zbuff.HEAP_SRAM|number|在sram申请|
|zbuff.HEAP_PSRAM|number|在psram申请|


## zbuff.create(length,data,type)

创建zbuff

**参数**

|传入值类型|解释|
|-|-|
|int|字节数|
|any|可选参数，number时为填充数据，string时为填充字符串|
|number|可选参数，内存类型默认自动选择|

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

-- 创建framebuff用的zbuff
-- zbuff.create({width,height,bit},data,type)
-- table 宽度、高度、色位深度
@int 可选参数，填充数据
@number 可选参数，内存类型
@return object zbuff对象，如果创建失败会返回nil
@usage
-- 创建zbuff
local buff = zbuff.create({128,160,16})--创建一个128*160的framebuff
local buff = zbuff.create({128,160,16},0xf800)--创建一个128*160的framebuff，初始状态红色

```

---

## buff:write(para,...)

zbuff写数据（从当前指针位置开始；执行后指针会向后移动）

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

zbuff读数据（从当前指针位置开始；执行后指针会向后移动）

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

zbuff清空数据（与当前指针位置无关；执行后指针位置不变）

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

## buff:seek(offset, base)

zbuff设置光标位置（可能与当前指针位置有关；执行后指针会被设置到指定位置）

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

将一系列数据按照格式字符转化，并写入（从当前指针位置开始；执行后指针会向后移动）

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

-- 例子
buff:pack(
">IIHA", -- 格式字符串：大端序，依次为[4字节无符号整型, 4字节无符号整型, 2字节无符号短整型, 字符串]
0x1234, -- 参数1：整数值，写入为4字节（大端：00 00 12 34）
0x4567, -- 参数2：整数值，写入为4字节（大端：00 00 45 67）
0x12, -- 参数3：整数值，写入为2字节（大端：00 12）
"abcdefg" -- 参数4：字符串，写入7字节ASCII码（61 62 63 64 65 66 67）
)

```

---

## buff:unpack(format)

将一系列数据按照格式字符读取出来（从当前指针位置开始；执行后指针会向后移动）

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

读取一个指定类型的数据（从当前指针位置开始；执行后指针会向后移动）

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

写入一个指定类型的数据（从当前指针位置开始；执行后指针会向后移动）

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

按起始位置和长度取出数据（与当前指针位置无关；执行后指针位置不变）

**参数**

|传入值类型|解释|
|-|-|
|int|数据的起始位置（起始位置为0）,默认值也是0|
|int|数据的长度,默认是全部数据|

**返回值**

|返回值类型|解释|
|-|-|
|string|读出来的数据|

**例子**

```lua
local s = buff:toStr(0,5)--读取开头的五个字节数据
local s = buff:toStr() -- 取出整个zbuff的数据
local s = buff:toStr(0, buff:used()) -- 取出已使用的部分, 与buff:query()一样

```

---

## buff:len()

获取zbuff对象的长度（与当前指针位置无关；执行后指针位置不变）

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

设置buff对象的FrameBuffer属性（与当前指针位置无关；执行后指针位置不变）

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

设置或获取FrameBuffer某个像素点的颜色（与当前指针位置无关；执行后指针位置不变）

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

画一条线（与当前指针位置无关；执行后指针位置不变）

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

画一个矩形（与当前指针位置无关；执行后指针位置不变）

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

画一个圆形（与当前指针位置无关；执行后指针位置不变）

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

以下标形式进行数据读写（与当前指针位置无关；执行后指针位置不变）

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

## buff:free()

释放zbuff所申请内存 注意：gc时会自动释放zbuff以及zbuff所申请内存，所以通常无需调用此函数，调用前请确认您已清楚此函数用处！调用此函数并不会释放掉zbuff，仅会释放掉zbuff所申请的内存，zbuff需等gc时自动释放！！！

**参数**

无

**返回值**

无

**例子**

```lua
buff:free()

```

---

## buff:resize(n)

调整zbuff实际分配空间的大小，类似于realloc的效果，new = realloc(old, n)，可以扩大或者缩小（如果缩小后len小于了used，那么used=新len）

**参数**

|传入值类型|解释|
|-|-|
|int|新空间大小|

**返回值**

无

**例子**

```lua
buff:resize(20)

```

---

## buff:copy(start, para,...)

zbuff动态写数据，类似于memcpy效果，当原有空间不足时动态扩大空间

**参数**

|传入值类型|解释|
|-|-|
|int|写入buff的起始位置，如果不为数字，则为buff的used，如果小于0，则从used往前数，-1 = used - 1|
|any|写入buff的数据，string或zbuff者时为一个参数，number时可为多个参数|

**返回值**

|返回值类型|解释|
|-|-|
|number|数据成功写入的长度|

**例子**

```lua
local len = buff:copy(nil, "123") -- 类似于memcpy(&buff[used], "123", 3) used+= 3 从buff开始写入数据,指针相应地往后移动
local len = buff:copy(0, "123") -- 类似于memcpy(&buff[0], "123", 3) if (used < 3) used = 3 从位置0写入数据,指针有可能会移动
local len = buff:copy(2, 0x1a,0x30,0x31,0x32,0x00,0x01)  -- 类似于memcpy(&buff[2], [0x1a,0x30,0x31,0x32,0x00,0x01], 6) if (used < (2+6)) used = (2+6)从位置2开始，按数值写入多个字节数据
local len = buff:copy(9, buff2)  -- 类似于memcpy(&buff[9], &buff2[0], buff2的used) if (used < (9+buff2的used)) used = (9+buff2的used) 从位置9开始，合并入buff2里0~used的内容
local len = buff:copy(5, buff2, 10, 1024)  -- 类似于memcpy(&buff[5], &buff2[10], 1024) if (used < (5+1024)) used = (5+1024)

```

---

## buff:used()

设置/获取zbuff里最后一个数据位置指针到首地址的偏移量，来表示zbuff内已有有效数据量大小，注意这个不同于分配的空间大小，由于seek()会改变最后一个数据位置指针，因此也会影响到used()返回值。

**参数**

|传入值类型|解释|
|-|-|
|int|最后一个数据位置指针到首地址的偏移量，不能是负数，如果不填则不更改当前值，如果该值超过了buff总量，则自动改为buff总量|

**返回值**

|返回值类型|解释|
|-|-|
|int|有效数据量大小|

**例子**

```lua
buff:used()    --直接返回当前的有效数据量大小
buff:used(123) --设置当前的有效数据量为123字节，如果buff本身不到123字节，比如120字节，则会改成120，返回值是120

```

---

## buff:del(offset,length)

删除zbuff 0~used范围内的一段数据，注意只是改变了used的值，并不是真的在ram里去清除掉数据

**参数**

|传入值类型|解释|
|-|-|
|int|起始位置start, 默认0，如果<0则从used往前数，比如 -1 那么start= used - 1|
|int|长度del_len，默认为used，如果start + del_len数值大于used，会强制调整del_len = used - start|

**返回值**

无

**例子**

```lua
buff:del(1,4)    --从位置1开始删除4个字节数据
buff:del(-1,4)    --从位置used-1开始删除4个字节数据，但是这肯定会超过used，所以del_len会调整为1，实际上就是删掉了最后一个字节

```

---

## buff:query(offset,length,isbigend,issigned,isfloat)

按起始位置和长度0~used范围内取出数据，如果是1,2,4,8字节，且填写了isbigend参数，则根据isbigend,issigned,isfloat转换成浮点或者整形

**参数**

|传入值类型|解释|
|-|-|
|int|数据的起始位置（起始位置为0）|
|int|数据的长度|
|boolean|是否是大端格式，如果为nil，则不会转换，直接字节流输出，false为小端格式，true为大端格式|
|boolean|是否是有符号的，默认为false|
|boolean|是否是浮点型，默认为false|

**返回值**

|返回值类型|解释|
|-|-|
|string|读出来的数据，如果取出数据是1,2,4,8字节，且isbigend填写了true或者false，则输出浮点或者整形|

**例子**

```lua
local s = buff:query(0,5)--读取开头的五个字节数据

```

---

## buff:set(start, num, len)

zbuff的类似于memset操作，类似于memset(&buff[start], num, len)，当然有ram越界保护，会对len有一定的限制

**参数**

|传入值类型|解释|
|-|-|
|int|可选，开始位置，默认为0,|
|int|可选，默认为0。要设置为的值|
|int|可选，长度，默认为全部空间，如果超出范围了，会自动截断|

**返回值**

无

**例子**

```lua
-- 全部初始化为0
buff:set() --等同于 memset(buff, 0, sizeof(buff))
buff:set(8) --等同于 memset(&buff[8], 0, sizeof(buff) - 8)
buff:set(0, 0x55) --等同于 memset(buff, 0x55, sizeof(buff))
buff:set(4, 0xaa, 12) --等用于 memset(&buff[4], 0xaa, 12)

```

---

## buff:isEqual(start, buff2, start2, len)

zbuff的类似于memcmp操作，类似于memcmp(&buff[start], &buff2[start2], len)

**参数**

|传入值类型|解释|
|-|-|
|int|可选，开始位置，默认为0,|
|zbuff|比较的对象|
|int|可选，比较的对象的开始位置，默认为0|
|int|比较长度|

**返回值**

|返回值类型|解释|
|-|-|
|boolean|true相等，false不相等|
|int|相等返回0，不相等返回第一个不相等位置的序号|

**例子**

```lua
local result, offset = buff:isEqual(1, buff2, 2, 10) --等同于memcmp(&buff[1], &buff2[2], 10)

```

---

## buff:toBase64(dst)

将当前zbuff数据转base64,输出到下一个zbuff中

**参数**

|传入值类型|解释|
|-|-|
|userdata|zbuff指针|

**返回值**

|返回值类型|解释|
|-|-|
|int|转换后的实际长度|

**例子**

```lua
-- dst:len必须大于buff:used() * 1.35 + 3, 确保有足够空间存放base64数据
buff:toBase64(dst)

```

---

