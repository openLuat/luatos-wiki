# openai - 对接OpenAI兼容的平台,例如deepseek

**示例**

```lua
-- 对接deepseek演示 请阅demo/openai

-- 本API正在积极设计中

```

## openai.completions(opts, prompt)



创建一个对话

**参数**

|传入值类型|解释|
|-|-|
|table|调用选项,有必填参数,请看实例|
|string|起始提示语,可选|
|return|对话实例|

**返回值**

无

**例子**

```lua
-- 以deepseek为例, 请填充真实的apikey
sys = require "sys"
require "sysplus"
openai = require "openai"

local opts = {
    apikey = "sk-123456",
    apiurl = "https://api.deepseek.com",
    model = "deepseek-chat"
}
local chat = openai.completions(opts)
sys.taskInit(function()
    sys.waitUntil("IP_READY")
    sys.wait(100)
    -- 固定问答演示
    local resp = chat:talk("你好,请问LuatOS是什么软件?应该如何学习呢?")
    if resp then
        log.info("deepseek回复", resp.content)
    else
        log.info("deepseek执行失败")
    end
end)

```

---

