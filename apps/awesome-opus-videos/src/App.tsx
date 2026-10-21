import { useMemo, useState, useEffect } from "react";
import { CATALOG, CATEGORIES, type CatalogEntry, type CategoryId } from "./catalog";

type PreviewMode = "sample" | "skillry" | "poster";

function countByCategory(cat: CategoryId | "all") {
  if (cat === "all") return CATALOG.length;
  return CATALOG.filter((e) => e.category === cat).length;
}

export default function App() {
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState(CATALOG[0]?.id ?? "");
  const [toast, setToast] = useState("");
  const [preview, setPreview] = useState<PreviewMode>("sample");
  const [mobileDetail, setMobileDetail] = useState(false);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return CATALOG.filter((e) => {
      if (cat !== "all" && e.category !== cat) return false;
      if (!query) return true;
      const hay = `${e.titleZh} ${e.blurbZh} ${e.author} ${e.techTags.join(" ")} ${e.prompt}`.toLowerCase();
      return hay.includes(query);
    });
  }, [cat, q]);

  const selected: CatalogEntry | undefined =
    filtered.find((e) => e.id === selectedId) ?? filtered[0] ?? CATALOG.find((e) => e.id === selectedId);

  useEffect(() => {
    if (!selected) return;
    if (selected.sample) setPreview("sample");
    else if (selected.hasRemake) setPreview("skillry");
    else setPreview("poster");
  }, [selected?.id]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(""), 1600);
    return () => window.clearTimeout(t);
  }, [toast]);

  async function copyPrompt(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setToast("提示词已复制");
    } catch {
      setToast("复制失败，请手动选择文本");
    }
  }

  function openEntry(id: string) {
    setSelectedId(id);
    setMobileDetail(true);
  }

  return (
    <div className={`app ${mobileDetail ? "show-detail-root" : ""}`}>
      <header className="topbar">
        <div className="brand">
          <h1>Opus 成片提示词浏览台</h1>
          <p>
            精选自 awesome-opus5-5-videos · 24 条可复制 Prompt · 本地 Canvas 样片
          </p>
        </div>
        <div className="top-actions">
          <input
            className="search"
            placeholder="搜索标题 / 作者 / 技术栈 / 提示词…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <a
            className="btn ghost"
            href="https://github.com/yihui-dev/awesome-opus5-5-videos"
            target="_blank"
            rel="noreferrer"
          >
            上游仓库
          </a>
        </div>
      </header>

      <div className={`layout ${mobileDetail ? "show-detail" : ""}`}>
        <aside className="sidebar">
          <p className="nav-label">分类</p>
          <div className="cats">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`cat-btn ${cat === c.id ? "active" : ""}`}
                onClick={() => {
                  setCat(c.id);
                  setMobileDetail(false);
                }}
              >
                <span>{c.label}</span>
                <span className="count">{countByCategory(c.id)}</span>
              </button>
            ))}
          </div>
          <div className="hint">
            这是轻量浏览台，不是片场工作室。点卡片可复制 Prompt，右侧可看本地样片或 Skillry remake。
            全量约 700 条仍在上游仓库。
          </div>
        </aside>

        <main className="gallery">
          <div className="gallery-head">
            <h2>{CATEGORIES.find((c) => c.id === cat)?.label ?? "全部"}</h2>
            <span>{filtered.length} 条</span>
          </div>
          {filtered.length === 0 ? (
            <div className="empty">没有匹配的条目</div>
          ) : (
            <div className="grid">
              {filtered.map((e) => (
                <button
                  key={e.id}
                  className={`card ${selected?.id === e.id ? "active" : ""}`}
                  onClick={() => openEntry(e.id)}
                >
                  <div className="thumb">
                    <span className="badge">{e.categoryZh}</span>
                    {e.posterUrl ? (
                      <img src={e.posterUrl} alt="" loading="lazy" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="fallback">无海报</div>
                    )}
                  </div>
                  <div className="card-body">
                    <h3>{e.titleZh}</h3>
                    <div className="meta">@{e.author}</div>
                    <div className="tags">
                      {e.techTags.slice(0, 3).map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                      {e.sample ? <span className="tag">本地样片</span> : null}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </main>

        <aside className="detail">
          {selected ? (
            <>
              <div className="detail-head">
                <button className="btn ghost back-mobile" onClick={() => setMobileDetail(false)}>
                  ← 返回列表
                </button>
                <h2>{selected.titleZh}</h2>
                <p className="blurb">{selected.blurbZh}</p>
                <div className="meta" style={{ marginTop: 8 }}>
                  <a href={selected.authorUrl} target="_blank" rel="noreferrer">
                    @{selected.author}
                  </a>
                  {" · "}
                  {selected.categoryZh}
                  {selected.promptPartial ? " · 提示词可能不完整" : ""}
                </div>
                <div className="detail-actions">
                  <button className="btn primary" onClick={() => copyPrompt(selected.prompt)}>
                    复制提示词
                  </button>
                  <a className="btn" href={selected.postUrl} target="_blank" rel="noreferrer">
                    原帖
                  </a>
                  <a className="btn" href={selected.skillryUrl} target="_blank" rel="noreferrer">
                    Skillry remake
                  </a>
                </div>
              </div>

              <div className="preview">
                <div className="preview-tabs">
                  {selected.sample ? (
                    <button
                      className={preview === "sample" ? "active" : ""}
                      onClick={() => setPreview("sample")}
                    >
                      本地样片
                    </button>
                  ) : null}
                  {selected.hasRemake ? (
                    <button
                      className={preview === "skillry" ? "active" : ""}
                      onClick={() => setPreview("skillry")}
                    >
                      Skillry 嵌入
                    </button>
                  ) : null}
                  <button
                    className={preview === "poster" ? "active" : ""}
                    onClick={() => setPreview("poster")}
                  >
                    海报
                  </button>
                </div>
                <div className="preview-frame">
                  {preview === "sample" && selected.sample ? (
                    <iframe
                      title="本地样片"
                      src={`/samples/${selected.sample}`}
                      sandbox="allow-scripts"
                    />
                  ) : preview === "skillry" ? (
                    <iframe
                      title="Skillry remake"
                      src={selected.skillryUrl}
                      sandbox="allow-scripts allow-same-origin allow-popups"
                      referrerPolicy="no-referrer"
                    />
                  ) : selected.posterUrl ? (
                    <img
                      src={selected.posterUrl}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="fallback" style={{ height: "100%" }}>
                      暂无预览
                    </div>
                  )}
                </div>
              </div>

              <div className="prompt-box">
                <label>PROMPT</label>
                <pre>{selected.prompt}</pre>
              </div>
            </>
          ) : (
            <div className="empty">选择一条卡片查看详情</div>
          )}
        </aside>
      </div>

      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
    </div>
  );
}
