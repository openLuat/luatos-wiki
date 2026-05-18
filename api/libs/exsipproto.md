# exsipproto - SIP 协议辅助库，提供报文解析、Digest 鉴权、SIP 请求/响应构造、SDP 与媒体协商工具。

**示例**

```lua
本库主要给 exsipclient 等 SIP 信令模块复用，负责处理协议层字符串拼装与解析。
使用前需要确保固件启用了 crypto 库中的 MD5 能力。

基本用法：
local proto = require "exsipproto"

local headers = proto.parse_headers(packet_head)
local auth = proto.digest_auth({
    username = "1001",
    password = "123456",
    realm = "example.com",
    nonce = "abcdef",
    method = "REGISTER",
    uri = "sip:example.com"
})

```

## exsipproto.parse_headers(resp)

解析 SIP 头部字段。

**参数**

|传入值类型|解释|
|-|-|
|string|resp SIP 报文头部字符串|

**返回值**

|返回值类型|解释|
|-|-|
|table|解析后的头字段表，键名统一转为小写|

**例子**

无

---

## exsipproto.sip_find_header_end(s)

查找 SIP 头部结束位置。

**参数**

|传入值类型|解释|
|-|-|
|string|s 待解析的 SIP 字符串|

**返回值**

|返回值类型|解释|
|-|-|
|number|头部结束后的起始位置，未找到时返回 nil|

**例子**

无

---

## exsipproto.pop_stream_message(stream)

从 TCP 流缓冲区中弹出一条完整的 SIP 报文。

**参数**

|传入值类型|解释|
|-|-|
|string|stream TCP 流式接收缓冲区|

**返回值**

|返回值类型|解释|
|-|-|
|string|完整的 SIP 头部，数据不足时返回 nil|
|string|SIP 消息体，未携带消息体时返回空字符串|
|string|剩余未消费的流数据|

**例子**

无

---

## exsipproto.split_message(msg)

拆分单条 SIP 报文为头部和消息体。

**参数**

|传入值类型|解释|
|-|-|
|string|msg 一条完整的 SIP 报文|

**返回值**

|返回值类型|解释|
|-|-|
|string|SIP 头部|
|string|SIP 消息体，不存在时返回空字符串|

**例子**

无

---

## exsipproto.parse_request_line(msg)

解析 SIP 请求行。

**参数**

|传入值类型|解释|
|-|-|
|string|msg SIP 报文头部或整包字符串|

**返回值**

|返回值类型|解释|
|-|-|
|string|请求方法，例如 INVITE、REGISTER|
|string|请求 URI，解析失败时返回 nil|

**例子**

无

---

## exsipproto.parse_status(resp)

解析 SIP 状态行。

**参数**

|传入值类型|解释|
|-|-|
|string|resp SIP 响应报文头部或整包字符串|

**返回值**

|返回值类型|解释|
|-|-|
|number|状态码，解析失败时返回 nil|
|string|原因短语，解析失败时返回 nil|

**例子**

无

---

## exsipproto.parse_www_authenticate(www)

解析 WWW-Authenticate 或 Proxy-Authenticate 头中的 Digest 参数。

**参数**

|传入值类型|解释|
|-|-|
|string|www Authenticate 头内容|

**返回值**

|返回值类型|解释|
|-|-|
|table|解析后的参数表，常见字段包括 realm、nonce、opaque、algorithm、qop|

**例子**

无

---

## exsipproto.pick_qop(qop)

从 qop 字段中选择当前支持的认证模式。

**参数**

|传入值类型|解释|
|-|-|
|string|qop 服务端返回的 qop 字段|

**返回值**

|返回值类型|解释|
|-|-|
|string|当前支持的 qop 值，目前仅返回 auth，未命中时返回 nil|

**例子**

无

---

## exsipproto.digest_auth(params)

计算 Digest 鉴权参数。

**参数**

|传入值类型|解释|
|-|-|
|table|params Digest 参数表，至少需要 username、password、realm、nonce、method、uri|

**返回值**

|返回值类型|解释|
|-|-|
|table|计算后的 Digest 参数表，可直接交给 build_auth_header 使用|
|string|失败原因，仅在不支持的算法等异常情况下返回|

**例子**

无

---

## exsipproto.build_auth_header(auth)

构造 Authorization 或 Proxy-Authorization 头。

**参数**

|传入值类型|解释|
|-|-|
|table|auth Digest 参数表，通常由 digest_auth 返回|

**返回值**

|返回值类型|解释|
|-|-|
|string|拼装好的认证头字符串，auth 为空时返回 nil|

**例子**

无

---

## exsipproto.build_via(params)

构造 Via 头字段值。

**参数**

|传入值类型|解释|
|-|-|
|table|params Via 参数表，常见字段包括 transport、local_ip、local_port、branch|

**返回值**

|返回值类型|解释|
|-|-|
|string|Via 头字段值|

**例子**

无

---

## exsipproto.build_contact(params)

构造 Contact 头字段值。

**参数**

|传入值类型|解释|
|-|-|
|table|params Contact 参数表，常见字段包括 user、local_ip、local_port、transport、uri_params、header_params|

**返回值**

|返回值类型|解释|
|-|-|
|string|Contact 头字段值|

**例子**

无

---

## exsipproto.build_request(ctx)

构造 SIP 请求报文。

**参数**

|传入值类型|解释|
|-|-|
|table|ctx 请求上下文，至少需要 method 和 uri，其余字段按需传入|

**返回值**

|返回值类型|解释|
|-|-|
|string|完整的 SIP 请求字符串|

**例子**

无

---

## exsipproto.build_response(ctx)

构造 SIP 响应报文。

**参数**

|传入值类型|解释|
|-|-|
|table|ctx 响应上下文，至少需要 code 和 headers，其余字段按需传入|

**返回值**

|返回值类型|解释|
|-|-|
|string|完整的 SIP 响应字符串|

**例子**

无

---

## exsipproto.normalize_codec_name(name)

规范化单个编解码器名称。

**参数**

|传入值类型|解释|
|-|-|
|string|name 编解码器名称|

**返回值**

|返回值类型|解释|
|-|-|
|string|规范化后的名称，例如 PCMU、PCMA；不支持时返回 nil|

**例子**

无

---

## exsipproto.normalize_codec_list(codecs)

规范化编解码器列表并去重。

**参数**

|传入值类型|解释|
|-|-|
|table|codecs 编解码器名称列表|

**返回值**

|返回值类型|解释|
|-|-|
|table|规范化后的编解码器列表，输入为空或无有效值时返回默认值|

**例子**

无

---

## exsipproto.pick_common_codec(local_codecs, remote_codecs)

在本地和远端编解码器列表中选择一个共同支持的编码。

**参数**

|传入值类型|解释|
|-|-|
|table|local_codecs 本地支持的编解码器列表|
|table|remote_codecs 远端支持的编解码器列表|

**返回值**

|返回值类型|解释|
|-|-|
|string|匹配到的编解码器名称，未命中时返回 nil|

**例子**

无

---

## exsipproto.codec_payload_type(codec)

获取编解码器对应的静态 payload type。

**参数**

|传入值类型|解释|
|-|-|
|string|codec 编解码器名称|

**返回值**

|返回值类型|解释|
|-|-|
|number|对应的 payload type，不支持时返回 nil|

**例子**

无

---

## exsipproto.build_media_session(params)

根据本地和远端 SDP 信息整理媒体会话参数。

**参数**

|传入值类型|解释|
|-|-|
|table|params 媒体参数表，常见字段包括 call_id、remote_ip、remote_sdp、local_rtp_port、local_codecs、ptime、source|

**返回值**

|返回值类型|解释|
|-|-|
|table|媒体会话参数表|
|string|失败原因，例如 no_common_codec 或 invalid_remote_port|

**例子**

无

---

## exsipproto.build_sdp(state, direction)

构造本地 SDP 描述。

**参数**

|传入值类型|解释|
|-|-|
|table|state SIP 状态表，需要包含 local_ip 以及 media 相关配置|
|string|direction 媒体方向，例如 sendrecv、sendonly、recvonly|

**返回值**

|返回值类型|解释|
|-|-|
|string|SDP 字符串|

**例子**

无

---

## exsipproto.parse_sdp(sdp)

解析远端 SDP 描述。

**参数**

|传入值类型|解释|
|-|-|
|string|sdp SDP 字符串|

**返回值**

|返回值类型|解释|
|-|-|
|table|解析结果，常见字段包括 conn_ip、audio_port、payloads、codecs、direction、ptime|

**例子**

无

---

