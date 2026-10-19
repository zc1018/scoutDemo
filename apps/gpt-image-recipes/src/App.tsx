import { useMemo, useState } from "react";
import { recipes, fill, sampleImage, SOURCE_URL, type Recipe } from "./recipes";

const MODELS = ["gpt-image-2.5-flare", "gpt-image-2.5-sunburst"];
const QUALITIES = ["auto", "low", "medium", "high", "xhigh", "max"];
const SIZES = ["auto", "1024x1024", "1024x1536", "1536x1024"];

async function generate(opts: { key: string; model: string; quality: string; size: string; prompt: string; files: File[] }) {
  const headers = { Authorization: `Bearer ${opts.key}` };
  let res: Response;
  if (opts.files.length) {
    const fd = new FormData();
    fd.append("model", opts.model);
    fd.append("prompt", opts.prompt);
    fd.append("quality", opts.quality);
    fd.append("size", opts.size);
    opts.files.forEach((f) => fd.append("image[]", f));
    res = await fetch("/openai/v1/images/edits", { method: "POST", headers, body: fd });
  } else {
    res = await fetch("/openai/v1/images/generations", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ model: opts.model, prompt: opts.prompt, quality: opts.quality, size: opts.size }),
    });
  }
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || `HTTP ${res.status}`);
  return `data:image/png;base64,${json.data[0].b64_json}`;
}

export default function App() {
  const [key, setKey] = useState(() => localStorage.getItem("openai_key") || "");
  const [selId, setSelId] = useState(recipes[0].id);
  const sel = recipes.find((r) => r.id === selId)!;
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [model, setModel] = useState(MODELS[0]);
  const [quality, setQuality] = useState("auto");
  const [size, setSize] = useState("auto");
  const [result, setResult] = useState<{ src: string; demo: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [toast, setToast] = useState("");

  const vals = values[sel.id] || {};
  const prompt = useMemo(() => fill(sel, vals), [sel, vals]);
  const refUrl = useMemo(() => (files[0] ? URL.createObjectURL(files[0]) : null), [files]);
  const offline = !key.trim();

  const pick = (r: Recipe) => { setSelId(r.id); setResult(null); setErr(""); setFiles([]); };
  const flash = (t: string) => { setToast(t); setTimeout(() => setToast(""), 1600); };
  const saveKey = (k: string) => { setKey(k); k ? localStorage.setItem("openai_key", k) : localStorage.removeItem("openai_key"); };

  const run = async () => {
    setErr("");
    if (offline) { setResult({ src: sampleImage(sel, "after"), demo: true }); return; }
    setBusy(true);
    try { setResult({ src: await generate({ key, model, quality, size, prompt, files }), demo: false }); }
    catch (e) { setErr(String((e as Error).message)); }
    finally { setBusy(false); }
  };
  const copy = async () => { await navigator.clipboard.writeText(prompt).catch(() => {}); flash("提示词已复制"); };
  const exportMd = () => {
    const md = `# ${sel.no}. ${sel.title}\n\n- 模型：${model}（quality=${quality}, size=${size}）\n- 参考图：${sel.refs}\n- 来源：卡兹克《GPT-Image 2.5 的 12 种玩法》 ${SOURCE_URL}\n\n## 提示词\n\n${prompt}\n`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([md], { type: "text/markdown" }));
    a.download = `${sel.id}.md`; a.click(); flash("已导出 .md");
  };

  const groups = [...new Set(recipes.map((r) => r.group))];
  return (
    <div className="app">
      <header>
        <div>
          <h1>GPT-Image 2.5 配方台</h1>
          <p className="sub">12 个玩法提示词摘自 <a href={SOURCE_URL} target="_blank">卡兹克《我整理了GPT-Image 2.5的12种玩法》</a>，参数可改，一键生成/复制。</p>
        </div>
        <div className="keybox">
          <span className={`badge ${offline ? "off" : "on"}`}>{offline ? "离线示例模式" : "在线模式"}</span>
          <input type="password" placeholder="OpenAI API Key（仅存在本浏览器）" value={key} onChange={(e) => saveKey(e.target.value)} />
        </div>
      </header>
      <main>
        <aside className="board">
          {groups.map((g) => (
            <section key={g}>
              <h3>{g}</h3>
              {recipes.filter((r) => r.group === g).map((r) => (
                <button key={r.id} className={`card ${r.id === selId ? "sel" : ""}`} onClick={() => pick(r)}>
                  <img src={sampleImage(r, "after")} alt="" />
                  <div><b>{r.no}. {r.title}</b><small>{r.hint}</small></div>
                </button>
              ))}
            </section>
          ))}
        </aside>
        <section className="editor">
          <h2>{sel.no}. {sel.title}</h2>
          <p className="hint">{sel.hint}</p>
          <div className="row">
            {sel.params.length === 0 && <p className="muted">这个配方没有可调参数，直接用原文提示词。</p>}
            {sel.params.map((p) => (
              <label key={p.key}>{p.label}
                <input value={vals[p.key] ?? p.default}
                  onChange={(e) => setValues({ ...values, [sel.id]: { ...vals, [p.key]: e.target.value } })} />
              </label>
            ))}
          </div>
          <label className="upload">参考图（{sel.refs}）
            <input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={(e) => setFiles([...(e.target.files || [])])} />
          </label>
          <textarea readOnly value={prompt} rows={7} />
          <div className="row">
            <select value={model} onChange={(e) => setModel(e.target.value)}>{MODELS.map((m) => <option key={m}>{m}</option>)}</select>
            <select value={quality} onChange={(e) => setQuality(e.target.value)}>{QUALITIES.map((m) => <option key={m}>{m}</option>)}</select>
            <select value={size} onChange={(e) => setSize(e.target.value)}>{SIZES.map((m) => <option key={m}>{m}</option>)}</select>
          </div>
          <div className="row">
            <button className="primary" onClick={run} disabled={busy}>{busy ? "生成中…" : offline ? "生成（示例）" : "生成"}</button>
            <button onClick={copy}>复制提示词</button>
            <button onClick={exportMd}>导出 .md</button>
          </div>
          {err && <p className="err">出错了：{err}</p>}
          <div className="compare">
            <figure>
              <figcaption>参考图</figcaption>
              <img src={refUrl || sampleImage(sel, "before")} alt="参考图" />
              {!refUrl && <span className="tag">示例</span>}
            </figure>
            <figure>
              <figcaption>生成结果</figcaption>
              {result ? <img src={result.src} alt="结果" /> : <div className="empty">点「生成」看效果</div>}
              {result?.demo && <span className="tag">示例 · 非真实输出</span>}
            </figure>
          </div>
        </section>
      </main>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
