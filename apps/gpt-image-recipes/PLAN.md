# GPT-Image 2.5 配方台 — PLAN

来源书签：[卡兹克《我整理了GPT-Image 2.5的12种玩法，希望能承包你的整个假期朋友圈。》](https://x.com/Khazix0918/status/2104401048324743646)

**配方来源说明**：X 长文接口读不到正文，改用公开转载（好文集 haowenji.com/articles/x-2104399548479369216、腾讯新闻转载）读到了全文。12 张配方卡的提示词**逐字取自原文**，只把具体名词（城市、物体、单词、头身比等）换成可改参数，默认值即原文用词。#11 原文同时改两个物体，这里简化为一个；#2 原文提到的 ChatGPT「添加评论」功能、#8 原文附带的《绿皮书》换脸变体没有做成卡片。

## 1. Goal
把文章里 12 个 GPT-Image 2.5 修图/出片提示词做成可复用的配方卡：填参数、传参考图、一键调用 OpenAI 图像 API，左右对比，复制/导出提示词。

## 2. Single-user MVP
**In**
- 12 张配方卡（分「拯救废片 / 创意出片 / 网感大片」三组），每张有参数和参考图说明
- 生成：有参考图走 `POST /v1/images/edits`（multipart，`image[]`），无参考图走 `POST /v1/images/generations`（JSON），读 `data[0].b64_json`
- 模型可选 `gpt-image-2.5-flare` / `gpt-image-2.5-sunburst`（已按 OpenAI 官方文档核对），quality / size 可选
- 参考图 vs 结果左右对比
- 复制提示词、导出 `.md`
- 无 key 时离线示例模式：程序生成的 SVG 示例图，图上标注「示例 · 非真实输出」
- API key 只存浏览器 localStorage；Vite dev 代理 `/openai` → `api.openai.com` 避开 CORS
- 中文 UI

**Out**：遮罩/局部涂抹、多轮编辑（Responses API）、历史记录、批量生成、部署上线。

## 3. Outcome tasks
1. 能浏览挑选配方 → `recipes.ts` 数据 + 左侧卡片列表
2. 能填参数并拿到完整提示词 → 模板填充、复制、导出
3. 能出图 → 生成/编辑两条 API 路径 + 本地代理 + key 输入
4. 能对比 → 参考图 / 结果双栏
5. 无 key 也能演示 → SVG 示例图 + 明显标注
6. 验证 → Playwright 截图 + 录屏（离线模式）

## 4. Stack
- Bun：仓库默认包管理器
- Vite + React + TS：单页工具，最少样板
- Vite `server.proxy`：一行配置解决浏览器直连 OpenAI 的 CORS，不用另写服务端
- 纯 CSS，没用 shadcn：只有一个页面、十来个控件，引入组件库不划算

## 5. Deferred
- 遮罩编辑、Responses API 多轮修图：MVP 先验证单次配方
- 配方自定义/保存：先用文章里的 12 个
- 真实 API 生成验证：目前没有可用 key，未实测
