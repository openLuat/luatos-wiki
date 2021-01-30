local misc = {}

function misc.setClock()
    print("[提示]本环境不允许设置时间操作")
end

function misc.getClock()
    return os.date("*t")
end

function misc.getWeek()
    local clk = os.date("*t")
    return ((clk.wday == 1) and 7 or (clk.wday - 1))
end

function misc.getCalib()
    return true
end

local sn = "defaultSN"
function misc.setSn(s)
    sn = s
end

function misc.getSn()
    return sn
end

local imei = "861234567890123"
function misc.setImei(i,c)
    imei = i
    if c and type(c) == "function" then c(true) end
end

function misc.getImei()
    return imei
end

function misc.getVbatt()
    return 4100
end

function misc.getMuid()
    return "default_muid_string"
end

function misc.openPwm()  end
function misc.closePwm() end

return misc
