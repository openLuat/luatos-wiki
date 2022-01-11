# camera - 摄像头

> 本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/camera/luat_lib_camera.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！

## camera.on(id, event, func)

注册摄像头事件回调

**参数**

|传入值类型|解释|
|-|-|
|int|camera id, camera 0写0, camera 1写1|
|string|事件名称|
|function|回调方法|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
camera.on(0, "scanned", function(id, str)
    print(id, str)
end)

```

---

