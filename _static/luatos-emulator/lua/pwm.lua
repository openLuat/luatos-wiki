local pwm = {}

function pwm.open(id,hz,speed)
    if not set_pwm_speed then return end
    if id == 0 and hz > 0 then
        set_pwm_speed(speed)
    end
end


function pwm.close(n)

end

return pwm
