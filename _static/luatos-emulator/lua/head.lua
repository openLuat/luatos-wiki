local JSONLIB = require("JSON")
utils = require("utils")

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
--兼容部分5.1接口
loadstring = load
pack = {
    pack = function ()
        print("此环境为lua5.3，请使用string.pack代替pack.pack")
    end,
    unpack = function ()
        print("此环境为lua5.3，请使用string.unpack代替pack.unpack")
    end,
}
unpack = table.unpack
BIT = require("bit")
bit = BIT.bit32
bit.bit = function(b) return bit.lshift(1,b) end
bit.isset = function(v,p) return bit.rshift(v,p) % 2 == 1 end
bit.isclear = function(v,p) return not bit.isset(v,p) end

--触发请求的回调
_G["@jsTriggerList"] = {}
--注册回调触发函数
function jsTriggerRegister(t,f)
    _G["@jsTriggerList"][t] = f
end

log = require("log")
gpio = require("gpio")
adc = require("adc")
pwm = require("pwm")
