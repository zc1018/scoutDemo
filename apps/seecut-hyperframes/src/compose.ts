export type Cue = { start: number; end: number; text: string };
export type Options = { title: string; keywords: string[]; products: string[]; accent: string; secondsPerLine: number };

const ts = (s: string) => { const m = s.trim().replace(",", ".").split(":").map(Number); return m.length === 3 ? m[0] * 3600 + m[1] * 60 + m[2] : m.length === 2 ? m[0] * 60 + m[1] : m[0]; };

/** 解析 SRT 风格时间轴；没有时间轴时按每行固定秒数切分 */
export function parseScript(raw: string, secondsPerLine = 2.6): Cue[] {
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !/^\d+$/.test(l));
  const cues: Cue[] = []; let pending: { start: number; end: number } | null = null;
  const re = /^(\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d+)?)\s*-->\s*(\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d+)?)/;
  let t = 0;
  for (const l of lines) {
    const m = l.match(re);
    if (m) { pending = { start: ts(m[1]), end: ts(m[2]) }; continue; }
    if (pending) { cues.push({ ...pending, text: l }); t = pending.end; pending = null; }
    else { for (const s of l.split(/(?<=[。！？!?])/).map((x) => x.trim()).filter(Boolean)) { cues.push({ start: t, end: t + secondsPerLine, text: s }); t += secondsPerLine; } }
  }
  return cues;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
const r = (n: number) => Math.round(n * 100) / 100;

function highlight(text: string, kws: string[], prods: string[]) {
  const all = [...prods, ...kws].filter(Boolean).sort((a, b) => b.length - a.length);
  if (!all.length) return esc(text);
  const re = new RegExp(`(${all.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return text.split(re).map((p, i) => (i % 2 ? `<span class="hl">${esc(p)}</span>` : esc(p))).join("");
}

/** 生成符合 HyperFrames 合约的 HTML 合成（1080x1920 竖版，GSAP 可 seek 时间线） */
export function buildComposition(cues: Cue[], o: Options): string {
  const dur = r(Math.max(1, ...cues.map((c) => c.end)) + 0.6);
  const clips: string[] = []; const anims: string[] = [];
  cues.forEach((c, i) => {
    const d = r(c.end - c.start);
    clips.push(`  <div id="cap${i}" class="clip cap" data-start="${r(c.start)}" data-duration="${d}" data-track-index="2">${highlight(c.text, o.keywords, o.products)}</div>`);
    anims.push(`tl.from("#cap${i}", { y: 60, opacity: 0, scale: 0.9, duration: 0.35, ease: "back.out(2)" }, ${r(c.start)});`);
    anims.push(`tl.from("#cap${i} .hl", { scale: 1.6, color: "#fff", duration: 0.3, stagger: 0.08 }, ${r(c.start + 0.2)});`);
    let k = 0;
    for (const kw of o.keywords) if (kw && c.text.toLowerCase().includes(kw.toLowerCase())) {
      const id = `kw${i}_${k}`; const top = 520 + (k % 3) * 170; const left = k % 2 ? 560 : 120;
      clips.push(`  <div id="${id}" class="clip kw" style="top:${top}px;left:${left}px" data-start="${r(c.start + 0.15 + k * 0.2)}" data-duration="${r(Math.max(0.6, d - 0.3 - k * 0.2))}" data-track-index="3">${esc(kw)}</div>`);
      anims.push(`tl.from("#${id}", { scale: 0, rotation: ${k % 2 ? 12 : -12}, opacity: 0, duration: 0.4, ease: "back.out(3)" }, ${r(c.start + 0.15 + k * 0.2)});`);
      k++;
    }
    let p = 0;
    for (const prod of o.products) if (prod && c.text.toLowerCase().includes(prod.toLowerCase())) {
      const id = `pc${i}_${p++}`;
      clips.push(`  <div id="${id}" class="clip card" data-start="${r(c.start + 0.1)}" data-duration="${r(Math.max(0.8, d - 0.2))}" data-track-index="4"><div class="card-tag">产品</div><div class="card-name">${esc(prod)}</div></div>`);
      anims.push(`tl.from("#${id}", { x: -700, opacity: 0, duration: 0.5, ease: "power3.out" }, ${r(c.start + 0.1)});`);
    }
  });
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="UTF-8"/>
<style>
  html,body{margin:0;background:#000;width:1080px;height:1920px;overflow:hidden}
  #stage{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:"PingFang SC","Noto Sans CJK SC","Microsoft YaHei",sans-serif;
    background:radial-gradient(circle at 30% 20%,#2b2f6b,#0b0c1d 60%),#0b0c1d}
  .bg{position:absolute;inset:0}
  .title{position:absolute;top:140px;left:0;right:0;text-align:center;color:#fff;font-size:72px;font-weight:900;letter-spacing:4px}
  .title small{display:block;font-size:34px;color:${o.accent};letter-spacing:8px;margin-top:16px}
  .cap{position:absolute;left:70px;right:70px;bottom:300px;text-align:center;color:#fff;font-size:68px;font-weight:800;line-height:1.35;
    text-shadow:0 6px 0 #000,0 0 30px rgba(0,0,0,.6)}
  .hl{color:${o.accent};display:inline-block}
  .kw{position:absolute;padding:18px 34px;border-radius:999px;background:${o.accent};color:#111;font-size:56px;font-weight:900;box-shadow:0 12px 40px rgba(0,0,0,.4)}
  .card{position:absolute;top:1080px;left:70px;padding:28px 44px;border-radius:28px;background:rgba(255,255,255,.95);border-left:16px solid ${o.accent}}
  .card-tag{font-size:30px;color:#666;font-weight:700}
  .card-name{font-size:76px;font-weight:900;color:#111}
  .bar{position:absolute;left:0;bottom:0;height:14px;width:1080px;background:${o.accent};transform-origin:left}
</style></head><body>
<div id="stage" data-composition-id="seecut" data-start="0" data-duration="${dur}" data-width="1080" data-height="1920">
  <div id="title" class="clip title" data-start="0" data-duration="${dur}" data-track-index="1">${esc(o.title)}<small>SEECUT × HYPERFRAMES</small></div>
${clips.join("\n")}
  <div id="bar" class="clip bar" data-start="0" data-duration="${dur}" data-track-index="5"></div>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script>
    const tl = gsap.timeline({ paused: true });
    tl.from("#title", { y: -80, opacity: 0, duration: 0.6, ease: "power3.out" }, 0);
    tl.fromTo("#bar", { scaleX: 0 }, { scaleX: 1, duration: ${dur}, ease: "none" }, 0);
    ${anims.join("\n    ")}
    window.__timelines = window.__timelines || {};
    window.__timelines.seecut = tl;
  </script>
</div>
</body></html>
`;
}
