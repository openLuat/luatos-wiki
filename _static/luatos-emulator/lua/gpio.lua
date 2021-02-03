local gpio = {
    PULLUP    = 0x01,
    PULLDOWN  = 0x02,
    RISING    = 0x00,
    FALLING   = 0x01,
    BOTH      = 0x02,
}

--所有注册的配置放这里
local gpioSettings = {}

local function setGpio(io,state)
    if set_gpio_state then
        set_gpio_state(io,state)
    else
        log.warn("GPIO", "GPIO lib not found")
    end
end

function gpio.setup(io, initial, mode, trigger)
    if type(initial) == "number" then
        setGpio(io,initial)
        return function (state)
            setGpio(io,state)
        end
    else
        local now
        if mode == gpio.PULLUP then
            now = 1
        elseif  mode == gpio.PULLDOWN then
            now = 0
        end
        setGpio(io,last)
        gpioSettings[io] = {
            last = now,
            cb = initial,
            mode = mode or 0,
            trigger = trigger,
        }
        return function()
            return gpioSettings[io].last
        end
    end
end

jsTriggerRegister("gpio_trigger_cb",function (data)
    local io = data % 0x100
    local state = data >> 8
    if gpioSettings[io] then
        local last = gpioSettings[io].last
        gpioSettings[io].last = state
        if last == 0 and --如果是上升沿且设置了上升沿触发
            state == 1 and
            gpioSettings[io].trigger ~= gpio.FALLING then
                if gpioSettings[io].cb then gpioSettings[io].cb(state) end
        elseif last == 1 and --如果是下降沿且设置了下降沿触发
            state == 0 and
            gpioSettings[io].trigger ~= gpio.RISING then
                if gpioSettings[io].cb then gpioSettings[io].cb(state) end
        end
    end
end)
return gpio
