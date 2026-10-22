import { useMemo, useState } from 'react';
import {
  CASES,
  CATEGORIES,
  SKILLS,
  STATS,
  TEMPLATES,
  type CaseItem,
  type CatalogItem,
  type Section,
  type SkillItem,
  type TemplateItem,
} from './catalog';

const SECTIONS: { id: Section; label: string; hint: string }[] = [
  { id: 'templates', label: '模板', hint: '27 个分类提示语骨架' },
  { id: 'skills', label: 'Skills', hint: '装进 agent 的指令包' },
  { id: 'cases', label: '热门案例', hint: '按热度 Top 12' },
];

function matchesQuery(text: string, q: string) {
  return !q || text.toLowerCase().includes(q.toLowerCase());
}

export default function App() {
  const [section, setSection] = useState<Section>('templates');
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<CatalogItem | null>(TEMPLATES[0] ?? null);
  const [copied, setCopied] = useState(false);

  const items: CatalogItem[] = useMemo(() => {
    if (section === 'templates') {
      return TEMPLATES.filter(
        (t) =>
          (category === 'all' || t.category === category) &&
          matchesQuery(`${t.title} ${t.blurb} ${t.categoryLabel}`, query),
      );
    }
    if (section === 'skills') {
      return SKILLS.filter((s) => matchesQuery(`${s.title} ${s.blurb} ${s.install}`, query));
    }
    return CASES.filter((c) =>
      matchesQuery(`${c.title} ${c.blurb} ${c.author ?? ''} ${c.prompt}`, query),
    );
  }, [section, category, query]);

  const active = selected && items.some((i) => i.id === selected.id) ? selected : items[0] ?? null;

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  function onSelectSection(next: Section) {
    setSection(next);
    setCategory('all');
    setQuery('');
    const first =
      next === 'templates' ? TEMPLATES[0] : next === 'skills' ? SKILLS[0] : CASES[0];
    setSelected(first ?? null);
  }

  return (
    <div className="shell">
      <header className="top">
        <div className="brand">
          <div className="mark" aria-hidden>
            SD
          </div>
          <div>
            <h1>Awesome Seedance 浏览台</h1>
            <p>
              策展自{' '}
              <a href={STATS.upstream} target="_blank" rel="noreferrer">
                LearnPrompt/awesome-seedance
              </a>
              · {STATS.cases} 案例 · {STATS.templates} 模板 · {STATS.skills} Skills · {STATS.retests}{' '}
              复测
            </p>
          </div>
        </div>
        <a className="ghost" href={STATS.bookmark} target="_blank" rel="noreferrer">
          来源书签
        </a>
      </header>

      <nav className="tabs" aria-label="分区">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={section === s.id ? 'tab on' : 'tab'}
            onClick={() => onSelectSection(s.id)}
          >
            <strong>{s.label}</strong>
            <span>{s.hint}</span>
          </button>
        ))}
      </nav>

      <div className="toolbar">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            section === 'templates'
              ? '搜索模板…'
              : section === 'skills'
                ? '搜索 Skill / 安装命令…'
                : '搜索案例 / 作者 / prompt…'
          }
          aria-label="搜索"
        />
        {section === 'templates' && (
          <div className="chips" role="listbox" aria-label="模板分类">
            <button
              type="button"
              className={category === 'all' ? 'chip on' : 'chip'}
              onClick={() => setCategory('all')}
            >
              全部
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={category === c.id ? 'chip on' : 'chip'}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
        <div className="count">{items.length} 条</div>
      </div>

      <div className="layout">
        <aside className="list" aria-label="条目列表">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={active?.id === item.id ? 'card on' : 'card'}
              onClick={() => setSelected(item)}
            >
              {item.kind === 'template' && <TemplateCard item={item} />}
              {item.kind === 'skill' && <SkillCard item={item} />}
              {item.kind === 'case' && <CaseCard item={item} />}
            </button>
          ))}
          {items.length === 0 && <div className="empty">没有匹配项，换个关键词试试。</div>}
        </aside>

        <main className="detail" aria-live="polite">
          {!active && <div className="empty">从左侧选一条。</div>}
          {active?.kind === 'template' && (
            <TemplateDetail item={active} copied={copied} onCopy={() => copyText(active.copyPrompt)} />
          )}
          {active?.kind === 'skill' && (
            <SkillDetail item={active} copied={copied} onCopy={() => copyText(active.install)} />
          )}
          {active?.kind === 'case' && (
            <CaseDetail
              item={active}
              copied={copied}
              onCopy={() => copyText(active.prompt || active.blurb)}
            />
          )}
        </main>
      </div>

      <footer className="foot">
        本 demo 只做浏览与复制。Prompt / 媒体版权归原作者；策展结构遵循上游 CC BY 4.0。不接 Seedance /
        即梦 API。
      </footer>
    </div>
  );
}

function TemplateCard({ item }: { item: TemplateItem }) {
  return (
    <>
      <div className="card-kicker">
        <span className="pill">{item.categoryLabel}</span>
        {item.caseCount != null && <span className="muted">{item.caseCount} 条案例</span>}
      </div>
      <h3>{item.title}</h3>
      <p>{item.blurb}</p>
    </>
  );
}

function SkillCard({ item }: { item: SkillItem }) {
  return (
    <>
      <div className="card-kicker">
        <span className="pill skill">{item.source === 'repo' ? '本仓 Skill' : 'GoodCase'}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.blurb}</p>
      <code className="install-line">{item.install}</code>
    </>
  );
}

function CaseCard({ item }: { item: CaseItem }) {
  return (
    <>
      <div className="case-thumb">
        {item.poster ? (
          <img src={item.poster} alt="" loading="lazy" />
        ) : (
          <div className="poster-fallback" />
        )}
        <div className="case-meta">
          <div className="card-kicker">
            <span className="pill heat">热度 {item.heat ?? '—'}</span>
            <span className="muted">v{item.version}</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.blurb}</p>
        </div>
      </div>
    </>
  );
}

function TemplateDetail({
  item,
  copied,
  onCopy,
}: {
  item: TemplateItem;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <>
      <div className="detail-head">
        <div>
          <div className="card-kicker">
            <span className="pill">{item.categoryLabel}</span>
            {item.caseCount != null && <span className="muted">已归类 {item.caseCount} 条</span>}
          </div>
          <h2>{item.title}</h2>
          <p className="lead">{item.blurb}</p>
        </div>
        {item.poster && (
          <a className="poster-link" href={item.exampleCase ?? item.docsUrl} target="_blank" rel="noreferrer">
            <img src={item.poster} alt="" />
          </a>
        )}
      </div>
      <div className="actions">
        <button type="button" className="primary" onClick={onCopy}>
          {copied ? '已复制' : '复制「直接复制」引导语'}
        </button>
        <a className="ghost" href={item.docsUrl} target="_blank" rel="noreferrer">
          上游模板全文
        </a>
        {item.exampleCase && (
          <a className="ghost" href={item.exampleCase} target="_blank" rel="noreferrer">
            示例案例
          </a>
        )}
      </div>
      <pre className="prompt">{item.copyPrompt}</pre>
    </>
  );
}

function SkillDetail({
  item,
  copied,
  onCopy,
}: {
  item: SkillItem;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <>
      <div className="detail-head">
        <div>
          <div className="card-kicker">
            <span className="pill skill">{item.source === 'repo' ? '本仓 Skill' : 'GoodCase'}</span>
            {item.templateId && <span className="muted">对应模板 {item.templateId}</span>}
          </div>
          <h2>{item.title}</h2>
          <p className="lead">{item.blurb}</p>
        </div>
      </div>
      <div className="actions">
        <button type="button" className="primary" onClick={onCopy}>
          {copied ? '已复制' : '复制安装命令'}
        </button>
        <a
          className="ghost"
          href="https://github.com/LearnPrompt/awesome-seedance#-%E7%AE%B1-skill"
          target="_blank"
          rel="noreferrer"
        >
          Skill 说明
        </a>
      </div>
      <pre className="prompt install">{item.install}</pre>
      <p className="note">
        安装走 skills CLI / npx，在 Claude Code、Codex 等 agent 里使用。本浏览台不会替你在本机执行安装。
      </p>
    </>
  );
}

function CaseDetail({
  item,
  copied,
  onCopy,
}: {
  item: CaseItem;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <>
      <div className="detail-head case">
        <div>
          <div className="card-kicker">
            <span className="pill heat">热度 {item.heat ?? '—'}</span>
            <span className="muted">Seedance {item.version}</span>
            {item.author && <span className="muted">{item.author}</span>}
          </div>
          <h2>{item.title}</h2>
          <p className="lead">{item.blurb}</p>
          {item.retestNote && <p className="retest">复测：{item.retestNote}</p>}
        </div>
        {item.poster && (
          <div className="poster-link static">
            <img src={item.poster} alt="" />
          </div>
        )}
      </div>
      <div className="actions">
        <button type="button" className="primary" onClick={onCopy} disabled={!item.prompt}>
          {copied ? '已复制' : '复制完整 Prompt'}
        </button>
        {item.caseUrl && (
          <a className="ghost" href={item.caseUrl} target="_blank" rel="noreferrer">
            goodcase.ai
          </a>
        )}
        {item.sourceUrl && (
          <a className="ghost" href={item.sourceUrl} target="_blank" rel="noreferrer">
            原帖
          </a>
        )}
      </div>
      {item.retestVideo && (
        <div className="video-wrap">
          <div className="video-label">公开复测样片（非 Seedance 原片）</div>
          <video src={item.retestVideo} controls playsInline preload="metadata" />
        </div>
      )}
      <pre className="prompt">{item.prompt || '（该条目未收录可复制 prompt）'}</pre>
    </>
  );
}
