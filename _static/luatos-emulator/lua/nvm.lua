local nvm = {}

local data = {}

function nvm.set(a,b)
    data[a] = b
end

function nvm.get(a)
    return data[a]
end

function nvm.sett(a,b,c)
    if not data[a] then data[a] = {} end
    data[a][b] = c
end

function nvm.gett(a,b,c)
    if not data[a] then data[a] = {} end
    return data[a][b]
end

return nvm
