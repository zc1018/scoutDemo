// 用示例文案导出 HyperFrames 合成到 out/composition/index.html
import { mkdirSync, writeFileSync } from "node:fs";
import { parseScript, buildComposition } from "../src/compose";
import { SAMPLE_SCRIPT, SAMPLE_KEYWORDS, SAMPLE_PRODUCTS } from "../src/sample";
const split = (s: string) => s.split(/[,，\s]+/).filter(Boolean);
const html = buildComposition(parseScript(SAMPLE_SCRIPT), { title: "口播一键成片", keywords: split(SAMPLE_KEYWORDS), products: split(SAMPLE_PRODUCTS), accent: "#ffd23f", secondsPerLine: 2.6 });
mkdirSync("out/composition", { recursive: true });
writeFileSync("out/composition/index.html", html);
console.log("已导出 out/composition/index.html");
