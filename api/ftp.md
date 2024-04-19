# ftp - ftp 客户端

{bdg-success}`已适配` {bdg-primary}`Air780E/Air700E` {bdg-primary}`Air780EP` {bdg-primary}`Air601` {bdg-primary}`Air101/Air103` {bdg-primary}`Air105` {bdg-primary}`ESP32C3` {bdg-primary}`ESP32S3`

```{note}
本页文档由[这个文件](https://gitee.com/openLuat/LuatOS/tree/master/luat/../components/network/libftp/luat_lib_ftp.c)自动生成。如有错误，请提交issue或帮忙修改后pr，谢谢！
```

```{tip}
本库有专属demo，[点此链接查看ftp的demo例子](https://gitee.com/openLuat/LuatOS/tree/master/demo/ftp)
```

## ftp.login(adapter,ip_addr,port,username,password)



FTP客户端

**参数**

|传入值类型|解释|
|-|-|
|int|适配器序号, 只能是socket.ETH0, socket.STA, socket.AP,如果不填,会选择平台自带的方式,然后是最后一个注册的适配器|
|string|ip_addr 地址|
|string|port 端口,默认21|
|string|username 用户名|
|string|password 密码|
|bool/table|是否为ssl加密连接,默认不加密,true为无证书最简单的加密，table为有证书的加密 <br>server_cert 服务器ca证书数据 <br>client_cert 客户端ca证书数据 <br>client_key 客户端私钥加密数据 <br>client_password 客户端私钥口令数据|

**返回值**

|返回值类型|解释|
|-|-|
|bool/string|成功返回true 失败返回string|

**例子**

```lua
ftp_login = ftp.login(nil,"xxx")

```

---

## ftp.command(cmd)



FTP命令

**参数**

|传入值类型|解释|
|-|-|
|string|cmd 命令 目前支持:NOOP SYST TYPE PWD MKD CWD CDUP RMD DELE LIST|

**返回值**

|返回值类型|解释|
|-|-|
|string|成功返回true 失败返回string|

**例子**

```lua
    print(ftp.command("NOOP").wait())
    print(ftp.command("SYST").wait())
    print(ftp.command("TYPE I").wait())
    print(ftp.command("PWD").wait())
    print(ftp.command("MKD QWER").wait())
    print(ftp.command("CWD /QWER").wait())
    print(ftp.command("CDUP").wait())
    print(ftp.command("RMD QWER").wait())
    print(ftp.command("DELE /1/12222.txt").wait())

```

---

## ftp.pull(local_name,remote_name)



FTP文件下载

**参数**

|传入值类型|解释|
|-|-|
|string|local_name 本地文件|
|string|remote_name 服务器文件|

**返回值**

|返回值类型|解释|
|-|-|
|bool/string|成功返回true 失败返回string|

**例子**

```lua
ftp.pull("/1222.txt","/1222.txt").wait()

```

---

## ftp.push(local_name,remote_name)



FTP文件上传

**参数**

|传入值类型|解释|
|-|-|
|string|local_name 本地文件|
|string|remote_name 服务器文件|

**返回值**

|返回值类型|解释|
|-|-|
|bool/string|成功返回true 失败返回string|

**例子**

```lua
ftp.push("/1222.txt","/1222.txt").wait()

```

---

## ftp.close()



FTP客户端关闭

**参数**

无

**返回值**

|返回值类型|解释|
|-|-|
|bool/string|成功返回true 失败返回string|

**例子**

```lua
ftp.close().wait()

```

---

