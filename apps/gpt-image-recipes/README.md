# GPT-Image 2.5 配方台

```bash
cd apps/gpt-image-recipes && bun install && bun run dev   # http://127.0.0.1:5175/
```

- 不填 key：离线示例模式，示例图为程序生成并标注「非真实输出」。
- 填 key：在页面右上角输入 OpenAI API Key（只存在本浏览器 localStorage），请求经 Vite 本地代理转发到 `api.openai.com`。
- 模型：`gpt-image-2.5-flare`（快）/ `gpt-image-2.5-sunburst`（精准编辑）。官方提示：可能需要先完成 OpenAI 组织验证。
- 提示词来自 [卡兹克的文章](https://x.com/Khazix0918/status/2104401048324743646)，详见 PLAN.md。
