import { useMemo, useRef, useState, useEffect } from "react";
import { parseScript, buildComposition } from "./compose";
import { SAMPLE_SCRIPT, SAMPLE_KEYWORDS, SAMPLE_PRODUCTS } from "./sample";

// 预览用驱动：按 data-start/duration 显隐 clip，并 seek GSAP 时间线（HyperFrames 渲染时由其运行时接管）
const PREVIEW_DRIVER = `<script>(function(){
  var stage=document.getElementById('stage');var dur=parseFloat(stage.dataset.duration);
  var clips=[].slice.call(document.querySelectorAll('.clip'));
  var s=Math.min(innerWidth/1080,innerHeight/1920);document.body.style.cssText+='transform:scale('+s+');transform-origin:0 0';
  var t0=performance.now();
  function f(){var t=((performance.now()-t0)/1000)%dur;
    clips.forEach(function(c){var a=parseFloat(c.dataset.start),d=parseFloat(c.dataset.duration);c.style.visibility=(t>=a&&t<a+d)?'visible':'hidden';});
    var tl=window.__timelines&&window.__timelines.seecut;if(tl)tl.seek(t,false);
    parent.postMessage({hfTime:t,dur:dur},'*');requestAnimationFrame(f);}
  f();})();<\/script>`;

const split = (s: string) => s.split(/[,，、\s]+/).map((x) => x.trim()).filter(Boolean);

export default function App() {
  const [script, setScript] = useState(SAMPLE_SCRIPT);
  const [keywords, setKeywords] = useState(SAMPLE_KEYWORDS);
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [title, setTitle] = useState("口播一键成片");
  const [accent, setAccent] = useState("#ffd23f");
  const [nonce, setNonce] = useState(0);
  const [time, setTime] = useState({ t: 0, d: 1 });
  const ref = useRef<HTMLIFrameElement>(null);

  const cues = useMemo(() => parseScript(script), [script]);
  const html = useMemo(() => buildComposition(cues, { title, keywords: split(keywords), products: split(products), accent, secondsPerLine: 2.6 }), [cues, title, keywords, products, accent]);
  const srcDoc = useMemo(() => html.replace("</body>", PREVIEW_DRIVER + "</body>"), [html, nonce]);

  useEffect(() => {
    const h = (e: MessageEvent) => e.data?.hfTime !== undefined && setTime({ t: e.data.hfTime, d: e.data.dur });
    addEventListener("message", h); return () => removeEventListener("message", h);
  }, []);

  const download = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([html], { type: "text/html" }));
    a.download = "index.html"; a.click();
  };

  return (
    <div className="wrap">
      <header><h1>SeeCut × HyperFrames</h1><p>粘贴口播文案或带时间轴的字幕，自动生成关键词弹出 + 逐句动效字幕的竖版短视频合成。</p></header>
      <main>
        <section className="panel">
          <label>口播文案 / 字幕（支持 SRT 时间轴，或每行一句）</label>
          <textarea rows={14} value={script} onChange={(e) => setScript(e.target.value)} />
          <label>标题</label><input value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>关键词（逗号分隔，出现时弹出）</label><input value={keywords} onChange={(e) => setKeywords(e.target.value)} />
          <label>产品名（出现时弹出产品卡）</label><input value={products} onChange={(e) => setProducts(e.target.value)} />
          <label>主题色</label><input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} />
          <div className="row">
            <button onClick={() => { setScript(SAMPLE_SCRIPT); setKeywords(SAMPLE_KEYWORDS); setProducts(SAMPLE_PRODUCTS); }}>载入示例</button>
            <button onClick={() => setNonce(nonce + 1)}>重新播放</button>
            <button className="primary" onClick={download}>导出 HyperFrames 合成（index.html）</button>
          </div>
          <div className="hint">
            <b>渲染为 MP4：</b>把导出的 <code>index.html</code> 放进一个目录，运行<br />
            <code>npx hyperframes render --output video.mp4</code><br />
            或在本目录直接 <code>bun run render</code>（使用示例文案，输出 <code>out/seecut-demo.mp4</code>）。
          </div>
        </section>
        <section className="preview">
          <div className="phone"><iframe ref={ref} key={nonce} title="预览" srcDoc={srcDoc} /></div>
          <div className="meta">实时预览 · {time.t.toFixed(1)}s / {time.d.toFixed(1)}s · {cues.length} 句字幕 · 1080×1920</div>
        </section>
        <section className="panel cues">
          <label>解析出的时间轴</label>
          <ol>{cues.map((c, i) => <li key={i} className={time.t >= c.start && time.t < c.end ? "on" : ""}><span>{c.start.toFixed(1)}–{c.end.toFixed(1)}s</span>{c.text}</li>)}</ol>
        </section>
      </main>
    </div>
  );
}
