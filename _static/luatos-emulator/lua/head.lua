local JSONLIB = require("JSON")

--加强随机数随机性
math.randomseed(tostring(os.time()):reverse():sub(1, 6))

json = {
    null = "\0",
    decode = function (s)--安全的，带解析结果返回的json解析函数
        local result, info = pcall(function(t) return JSONLIB:decode(t) end, s)
        if result then
            return info, true
        else
            return {}, false, info
        end
    end,
    encode = function (t)
        return JSONLIB:encode(t,nil,{null=json.null})
    end
}

--触发请求的回调
_G["@jsTriggerList"] = {}
--注册回调触发函数
function jsTriggerRegister(t,f)
    _G["@jsTriggerList"][t] = f
end

log = require("log")
gpio = require("gpio")
adc = require("adc")
