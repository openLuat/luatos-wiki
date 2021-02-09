local adc = {}

local opendList = {}

function adc.open(n)
    if not get_adc_num then return end
    opendList[n] = true
    return n == 0 or n == 1
end

function adc.read(n)
    if opendList[n] then
        return get_adc_num(n)
    end
end

function adc.close(n)
    opendList[n] = nil
end

return adc
