# pinyin - 拼音输入法核心库

**示例**

```lua
-- 查询拼音对应的候选字
local pinyin = require "pinyin"
local codes = pinyin.query("zhong")
-- codes = {0x4E2D, 0x949F, ...}  -- Unicode码点数组

```

## pinyin.query(pinyin_string)

查询拼音对应的候选字Unicode码点数组

**参数**

|传入值类型|解释|
|-|-|
|string|pinyin_string 拼音字符串，如 "zhong"|

**返回值**

|返回值类型|解释|
|-|-|
|table|Unicode码点数组，如 {0x4E2D, 0x949F, ...}，如果无匹配返回空表 {}|

**例子**

```lua
local codes = pinyin.query("zhong")
-- codes = {0x4E2D, 0x949F, ...}  -- "中"、"钟"等

```

---

## pinyin.queryUtf8(pinyin_string)

查询拼音对应的候选字UTF-8字符串数组

**参数**

|传入值类型|解释|
|-|-|
|string|pinyin_string 拼音字符串，如 "zhong"|

**返回值**

|返回值类型|解释|
|-|-|
|table|UTF-8字符串数组，如 {"中", "钟", ...}，如果无匹配返回空表 {}|

**例子**

```lua
local chars = pinyin.queryUtf8("zhong")
-- chars = {"中", "钟", ...}  -- 直接返回UTF-8字符串数组

```

---

## pinyin.querySyllables(key_sequence)

查询按键序列对应的音节列表（9键输入法）

**参数**

|传入值类型|解释|
|-|-|
|table|key_sequence 按键序列，每个元素为1-8的数字（对应ABC-WXYZ）|

**返回值**

|返回值类型|解释|
|-|-|
|table|音节字符串数组，按常用度排序，如 {"zhong", "zong", ...}|

**例子**

```lua
local pinyin = require "pinyin"
local syllables = pinyin.querySyllables({8, 3, 5, 5, 3})  -- WXYZ, GHI, MNO, MNO, GHI
-- 返回: {"zhong", "zong", ...}

```

---

