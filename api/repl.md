# repl - "读取-求值-输出" 循环

**示例**

```lua
--[[
本功能支持的模块及对应的端口
模块/芯片        端口     波特率及其他参数
Air101/Air103    UART0   921600  8 None 1
Air105           UART0   1500000 8 None 1
ESP32C3          UART0   921600  8 None 1 -- 注意, 简约版(无CH343)不支持
ESP32C2          UART0   921600  8 None 1
ESP32S2          UART0   921600  8 None 1
Air780EXXX       虚拟串口 任意             -- 暂不支持从物理UART调用

使用方法:
1. 非Air780EXXX系列可以使用任意串口工具, 打开对应的串口, 记得勾选"回车换行"
2. Air780EXXX请配合LuaTools使用, 菜单里有 "简易串口工具" 可发送, 记得勾选"回车换行"
2. 发送lua语句, 并以回车换行结束

语句支持情况:
1. 单行lua语句, 以回车换行结束即可
2. 多行语句, 用以下格式包裹起来发送, 例如

<<EOF
for k,v in pairs(_G) do
  print(k, v)
end
EOF

注意事项:
1. 可通过repl.enable(false)语句禁用REPL
2. 使用uart.setup/uart.close指定UART端口后, REPL自动失效
3. 单行语句一般支持到510字节,更长的语句请使用"多行语句"的方式使用
4. 若需要定义全局变量, 请使用 _G.xxx = yyy 形式

若有任何疑问, 请到 chat.openluat.com 发帖反馈
]]

```

## repl.enable(re)

启用或禁用REPL功能

**参数**

|传入值类型|解释|
|-|-|
|bool|启用与否,默认是启用|
|return|之前的设置状态|

**返回值**

无

**例子**

```lua
-- 若固件支持REPL,即编译时启用了REPL,是默认启用REPL功能的
-- 本函数是提供关闭REPL的途径
repl.enable(false)

```

---

## repl.push(data)

主动推送待处理的数据到底层

**参数**

|传入值类型|解释|
|-|-|
|string|待处理的数据,通常从串口来|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值|

**例子**

```lua
-- 虚拟串口的设备才需要这个函数

```

---

