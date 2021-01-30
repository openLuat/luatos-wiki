local LEVEL_TAG = {'T', 'D', 'I', 'W', 'E', 'F'}
local function _log(level, tag, ...)
    local OPEN_LEVEL = LOG_LEVEL or 3
    -- 如果日志级别为静默，或设定级别更高，则不输出日志
    if OPEN_LEVEL == 0 or OPEN_LEVEL > level then return end
    local prefix = string.format("[%s]-[%s]", LEVEL_TAG[level], type(tag)=="string" and tag or "")
    print(prefix,...)
end

return {
    trace = function(tag, ...) _log(1, tag, ...) end,
    debug = function(tag, ...) _log(2, tag, ...) end,
    info = function(tag, ...) _log(3, tag, ...) end,
    warn = function(tag, ...) _log(4, tag, ...) end,
    error = function(tag, ...) _log(5, tag, ...) end,
    fatal = function(tag, ...) _log(6, tag, ...) end,
}
