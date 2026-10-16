# SeeCut × HyperFrames 口播字幕短视频

粘贴口播文案或 SRT 字幕 → 生成 HyperFrames HTML 合成（逐句动效字幕、关键词弹出、产品卡）→ 浏览器实时预览 → 用 HyperFrames CLI 渲染竖版 MP4。

```bash
cd apps/seecut-hyperframes
bun install
bun run dev        # http://127.0.0.1:5174/
bun run render     # 用示例文案导出合成并渲染 out/seecut-demo.mp4（需 Node 22+、FFmpeg；首次会下载 Chrome Headless Shell）
```

界面里「导出 HyperFrames 合成」会下载 `index.html`，放进任意目录后运行 `npx hyperframes render --output video.mp4`。

验证产物：`validation/app-preview.png`（应用截图）、`validation/rendered-seecut-demo.mp4`（HyperFrames 实际渲染输出）、`validation/rendered-frame-6.5s.png`。

计划见 [PLAN.md](PLAN.md)。
