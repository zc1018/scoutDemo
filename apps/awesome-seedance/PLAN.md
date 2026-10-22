# awesome-seedance — PLAN

来源书签：[aiwarts 开源长文](https://x.com/aiwarts/status/2102240456092626951) · 上游 [LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)

**定位**：Seedance 视频侧的中文策展浏览台（模板 / Skills / 热门案例），不是 awesome-opus-videos 的换皮，也不接即梦 API。

## 1. Goal
把 awesome-seedance 的 27 个分类模板、精选 Skills 与热门案例做成可筛选、一键复制提示词/安装命令的中文浏览台。

## 2. Single-user MVP
**In**
- 三个分区：模板（27 条全量，按 6 大类筛选）、Skills（精选 ~16 条带 `npx` 安装行）、热门案例（Top ~12，带来源与可复制 prompt 摘要）
- 搜索 + 分类芯片；详情面板一键复制「直接复制」引导语 / Skill 安装命令 / 案例 prompt
- 案例海报用 goodcase CDN 外链（失败则色块占位）；可选安全样例：公开复测 MP4 可在详情里播放
- 自包含：`bun install && bun run dev`（端口 5177）；简体中文 UI

**Out**：不全量 ingest 894 条 cases.json、不接 Seedance/即梦生成、不装 Agent Skill 到本机、不做账号登录。

## 3. Outcome tasks
1. 能按分区/分类浏览 → `catalog.ts` + Tab + 芯片 + 搜索
2. 能复制 → 详情面板 clipboard（模板引导语、Skill 安装行、案例 prompt）
3. 能扫一眼成片气质 → 案例海报 + 可选复测视频
4. 验证 → 截图 + 录屏进 `validation/`，PR 引用

## 4. Stack
- Bun：仓库默认；`bunfig.toml` `minimumReleaseAge = 259200`
- Vite + React + TS：单页浏览台
- 纯 CSS（无 shadcn）：一屏工具，组件库过重；视觉走 Seedance 橙 `#e8541e`，刻意区别于 opus-videos 的冷色卡片墙
- 策展数据内嵌 `catalog.ts`：避免把 4MB+ `cases.json` 打进前端

## 5. Deferred
- 全量案例同步 / goodcase 实时搜索
- 真调 Seedance 生成
- 用户收藏夹与本地模板编辑
