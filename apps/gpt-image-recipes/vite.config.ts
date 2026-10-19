import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 本地代理：浏览器 -> /openai/* -> https://api.openai.com/*，避开 CORS。
// API key 由浏览器在请求头里带上（存在 localStorage），代理本身不保存任何密钥。
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/openai": {
        target: "https://api.openai.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/openai/, ""),
      },
    },
  },
});
