# SeeCut × HyperFrames — PLAN

来源书签：https://x.com/leaf_sanren/status/2103835904670658995 · SeeCut：https://github.com/YeJe-cpu/SeeCut · HyperFrames：https://github.com/heygen-com/hyperframes

## 1. Goal
粘贴一段口播文案 / 带时间轴的字幕，一键生成符合 HyperFrames 合约的竖版（1080×1920）HTML 合成，浏览器实时预览，并可用 HyperFrames CLI 渲染成 MP4。

## 2. Single-user MVP
**In**
- 文本框输入：SRT 风格时间轴，或纯文本（按句/行以固定秒数切分）
- 生成 HyperFrames 合成：`data-composition-id` 根节点 + `class="clip"` 的 `data-start/data-duration/data-track-index` 片段 + `window.__timelines` 注册的 GSAP 暂停时间线
- 效果：逐句动效字幕（关键词高亮）、关键词胶囊弹出、产品名出现时的产品卡、进度条
- 浏览器内实时预览（iframe + 预览驱动按时间显隐 clip、seek 时间线）
- 导出 `index.html`；`bun run render` 用示例文案调用 `hyperframes render` 出 MP4
- 内置示例文案，开箱即用；界面中文

**Out**
- 语音识别 / 自动转写（SeeCut 的 Whisper 环节）、上传口播视频叠加字幕、TTS、BGM
- 账户、云端渲染、多项目管理

## 3. Outcome tasks
1. **能看到成片效果**：解析器（SRT/纯文本 → cues）→ 合成生成器 → iframe 实时预览
2. **能调风格**：标题、关键词、产品名、主题色即时生效；时间轴列表随播放高亮
3. **能拿到视频**：导出 HyperFrames HTML；CLI 渲染脚本 + 文档
4. **能验证**：截图 + 渲染/录屏视频提交到 `validation/`

## 4. Stack
- **Bun**：仓库默认运行时与包管理；`bunfig.toml` 设置 `minimumReleaseAge = 259200`
- **Vite + React + TS**：单页工具最轻的官方组合
- **`hyperframes` CLI（官方包，devDependency）**：HTML → 确定性 MP4（headless Chrome + FFmpeg），无需自己写渲染
- **GSAP（CDN，合成内）**：HyperFrames 官方示例使用的可 seek 动画运行时
- **纯 CSS（未上 shadcn/Tailwind）**：单屏工具，三栏布局几十行 CSS 足够，按 "cut features before clarity" 省掉

## 5. Deferred
- Whisper 自动转写 + 真实口播视频底轨（需要 `/embedded-captions` 流程与媒体资产）
- 官方 `@hyperframes/player` 嵌入替代自制预览驱动（先验证合成本身）
- HyperFrames catalog 组件（字幕/转场 block）、多模板风格
- 浏览器内一键渲染（需本地服务调用 CLI）
