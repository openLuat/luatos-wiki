# fft - 快速傅里叶变换（FFT/IFFT），支持 float32 与 q15 定点内核

**示例**

```lua
-- 模块通常作为内置库，无需 require，直接调用
-- 示例见各 API 注释以及仓库 demo/test 脚本

-- 支持的点数范围：
-- 输入点数N，要求为2的幂次方，且N < 65536
-- 格式支持：Lua数组 或 zbuff输入
-- 推荐范围：N ≤ 16384（已验证稳定运行）

-- 性能测试结果（实测数据）：
-- Air780EHV平台：
--   2048点：F32=23ms, Q15=10ms（Q15快2.3倍）
--   16384点：F32=240ms, Q15=110ms（Q15快2.2倍）
-- Air8101平台(有硬件浮点加速)：
--   2048点：F32=6ms, Q15=5ms（性能相近）
--   16384点：F32=78ms, Q15=86ms（F32略快）

-- 平台建议：
-- Air780EHV/Air780EPM：推荐使用Q15路径，性能提升显著
-- Air8101：小规模FFT两种都可，大规模FFT建议F32路径
-- 内存受限场景：优先选择Q15路径（内存需求减半）
-- 高精度场景：优先选择F32路径

```

## fft.generate_twiddles(N)

生成 float32 旋转因子

**参数**

|传入值类型|解释|
|-|-|
|int|N 点数，必须为 2 的幂|

**返回值**

|返回值类型|解释|
|-|-|
|table|Wc, table Ws 两个 Lua 数组（长度 N/2），分别为 cos 与 -sin|

**例子**

```lua
local N = 2048
local Wc, Ws = fft.generate_twiddles(N)

```

---

## fft.generate_twiddles_q15_to_zbuff(N, Wc_zb, Ws_zb)

生成 q15 旋转因子到 zbuff（零浮点）

**参数**

|传入值类型|解释|
|-|-|
|int|N 点数，必须为 2 的幂|
|zbuff|Wc_zb 输出缓冲，长度至少为 (N/2)*2 字节，存放 int16 Q15 的 cos|
|zbuff|Ws_zb 输出缓冲，长度至少为 (N/2)*2 字节，存放 int16 Q15 的 -sin（前向）|

**返回值**

|返回值类型|解释|
|-|-|
|nil|无返回值，结果写入传入的 zbuff|

**例子**

```lua
local N = 2048
local Wc_q15 = zbuff.create((N//2)*2)
local Ws_q15 = zbuff.create((N//2)*2)
fft.generate_twiddles_q15_to_zbuff(N, Wc_q15, Ws_q15)

```

---

## fft.run(real, imag, N, Wc, Ws[, opts])

原地 FFT 计算

**参数**

|传入值类型|解释|
|-|-|
|param|real 实部容器：|

**返回值**

无

**例子**

无

---

## fft.ifft(real, imag, N, Wc, Ws[, opts])

原地 IFFT 计算

**参数**

|传入值类型|解释|
|-|-|
|param|real 实部容器，类型与 fft.run 一致|
|param|imag 虚部容器，类型与 fft.run 一致|
|int|N 点数，2 的幂|
|param|Wc 旋转因子 cos：类型同 fft.run|
|param|Ws 旋转因子 -sin：类型同 fft.run。建议为 IFFT 预共轭传入 +sin 表|
|table|[opts]|

**返回值**

无

**例子**

无

---

## fft.fft_integral(real, imag, n, df)

频域积分（1/(jω)）

**参数**

|传入值类型|解释|
|-|-|
|param|real 实部（float32，Lua 数组或 zbuff）|
|param|imag 虚部（float32，Lua 数组或 zbuff）|
|int|n 点数，2 的幂|
|number|df 频率分辨率（fs/n）|

**返回值**

|返回值类型|解释|
|-|-|
|nil|原地修改 real/imag（DC 置 0）|

**例子**

```lua
-- 先完成 FFT 得到谱 (real, imag)，再调用积分：
fft.fft_integral(real, imag, N, fs/N)

```

---

