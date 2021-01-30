local gpio = {}

local function setGpio(io,state)
    if set_gpio_state then
        set_gpio_state(io,state)
    end
end

function gpio.setup(io, initial, mode)
    setGpio(io,initial)
    return function (state)
        setGpio(io,state)
    end
end


return gpio
