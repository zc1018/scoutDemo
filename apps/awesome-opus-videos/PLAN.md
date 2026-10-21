# awesome-opus-videos — PLAN

来源书签：[麦当mdldm 四仓合集](https://x.com/czzzzzzJ_/status/2112085934267346976) · 上游 [yihui-dev/awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos)

**定位**：轻量提示词浏览台，不是 lemo-opuscar 那种片场工作室。

## 1. Goal
把 Opus 5.5「用代码拍电影」合集做成可按分类浏览、一键复制 Prompt、并能内嵌预览样片的中文卡片台。

## 2. Single-user MVP
**In**
- 从上游 `data/videos.json` 精选 24 条（动态图形 / 解说动画 / 三维场景 / 游戏互动 各 6），卡片中文 UI
- 一键复制完整 Prompt；外链原帖与 Skillry remake
- 内嵌预览：4 个本地 HTML/Canvas 样片（iframe sandbox）；有 Skillry remake 的可在面板里安全尝试 iframe，失败则显示海报 + 外链
- 自包含：`bun install && bun run dev`（端口 5176）

**Out**：不全量 ingest 703 条、不接 Claude API 真生成、不做导演工作流、不重建 lemo-opuscar 片场。

## 3. Outcome tasks
1. 能按分类浏览 → `catalog.ts` + 分类 Tab + 搜索
2. 能复制 Prompt → 详情面板 + clipboard
3. 能看样片 → `public/samples/*.html` iframe + Skillry/海报回退
4. 验证 → Playwright 截图 + 录屏

## 4. Stack
- Bun：仓库默认
- Vite + React + TS：单页浏览台，最少样板
- 纯 CSS（无 shadcn）：一屏工具，引入组件库不划算
- 本地样片用原生 Canvas/HTML：离线可玩、无 CDN

## 5. Deferred
- 全量 703 条同步 / Skillry 批量代理
- 真用 Opus 生成并渲染 HTML
- 用户自定义收藏夹
