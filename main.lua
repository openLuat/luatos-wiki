
-- LuaTools需要PROJECT和VERSION这两个信息
PROJECT = "fatfs"
VERSION = "1.0.0"

-- sys库是标配
_G.sys = require("sys")
require "sysplus"
httpplus = require("httpplus")

local camera_id = camera.USB

local usb_camera_table = {
    id = camera_id,
    sensor_width = 640,
    sensor_height = 480,
    usb_port = 1
}

camera.on(camera_id, "scanned", function(id, str)
    log.info("拍照事件", id, str)
    if type(str) == 'string' then
        log.info("扫码结果", str)
    elseif str == false then
        log.error("摄像头没有数据")
    else
        log.info("摄像头数据", str)
        sys.publish("capture_done", true)
    end
end)


-- sys.taskInit(function()
--     sys.wait(1000)
--     local path = "/ram/abc.jpg"
--     log.info("摄像头初始化!", camera.init(usb_camera_table))
--     sys.wait(100)
--     while 1 do
--         sys.wait(2000)
--         camera.start(camera_id)
--         os.remove(path)
--         camera.capture(camera_id, path, 1)
--         result, data = sys.waitUntil("capture_done", 3000)
--         log.info("文件大小", result, data, io.fileSize(path))
--         camera.stop(camera_id)
--     end
--     -- sys.wait(3000)
--     -- log.info(rawbuff:used())
--     camera.close(camera_id)
-- end)

sys.taskInit(function()
    sys.wait(1000)
    local path = "/sd/abc.h264"
    log.info("摄像头初始化!", camera.init(usb_camera_table))
    sys.wait(100)
    camera.start(camera_id)
    camera.config(0, camera.CONF_H264_QP_INIT, 40)
    camera.config(0, camera.CONF_H264_QP_I_MAX, 40)
    camera.config(0, camera.CONF_H264_QP_P_MAX, 24)
    camera.config(0, camera.CONF_H264_IMB_BITS, 64)
    camera.config(0, camera.CONF_H264_PMB_BITS, 24)
    os.remove(path)
    camera.capture(camera_id, path, 1)
    sys.wait(5000)
    camera.stop(camera_id)
    log.info("文件大小", io.fileSize(path))
    camera.stop(camera_id)
    camera.close(camera_id)
end)

-- 用户代码已结束---------------------------------------------
-- 结尾总是这一句
sys.run()
-- sys.run()之后后面不要加任何语句!!!!!
