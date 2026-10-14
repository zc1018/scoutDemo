# PLAN — lemo-opuscar

## 1. Goal

A single-page client demo that showcases code-native film styles (inspired by Lemo-Opuscar): pick a style, fill a director brief, and watch a live Canvas/WebGL mini preview animate.

## 2. Single-user MVP

**In**
- Curated style gallery (subset of the ~43 upstream styles) as interactive cards
- Brief form aligned with DIRECTOR template fields: theme / story / rhythm / reference (client-side only; local state + optional download of a markdown brief)
- At least one playable Canvas/WebGL mini preview with real animation (not a static poster)
- Preview reacts to the selected style (palette / motion grammar)
- Self-contained app: `bun install && bun run dev` from `apps/lemo-opuscar/`
- App README with run instructions
- Validation screenshot + short video of the running UI

**Out**
- Backend, auth, or persistence beyond the browser session
- Real Claude / LLM API calls
- Video-model or offline film render pipeline
- Full 43-style catalog or port of upstream demo films
- Audio / score generation
- Multi-user or sharing

## 3. Outcome-oriented tasks

### A. Plan & scaffold
- [x] Write this PLAN.md
- [x] `bun create vite` (React + TS) under `apps/lemo-opuscar/`
- [x] App `bunfig.toml` with `minimumReleaseAge = 259200`; `bun install`

### B. Style gallery (user can browse & select)
- [x] Curate ~8 styles with short blurbs, tags, accent colors
- [x] Card grid; selecting a card drives the preview + brief defaults

### C. Director brief (user can draft a brief)
- [x] Form: theme, story (one-sentence arc), rhythm, reference / benchmark
- [x] Live summary panel; export brief as `.md` (client download)

### D. Live preview (user sees code-native motion)
- [x] Canvas mini scene that loops
- [x] Animated modes keyed off selected style (ascii, hologram, pixel, swiss, rubber-hose, ink, lowpoly, spy)
- [x] Play / pause + style label overlay

### E. Polish & ship
- [x] Minimalist shadcn-style UI (Tailwind + a few primitives)
- [x] README run instructions
- [x] Update `tracking/seen-bookmarks.json` → `built`
- [x] Capture screenshot PNG + short video under `validation/`
- [x] Branch `demo/lemo-opuscar`, open one PR

## 4. Stack

| Choice | Rationale |
|--------|-----------|
| Bun | Monorepo default; fast install + scripts |
| Vite + React + TypeScript | Official scaffold; fast HMR for a one-screen demo |
| Tailwind CSS v4 | Utility-first; pairs with light shadcn-style primitives |
| Canvas 2D | Matches Lemo-Opuscar “code draws the film” idea without Three.js weight for MVP |
| Playwright (dev) | Capture validation screenshot + video |
| No backend | Brief + preview are purely client-side |

## 5. Deferred

- Porting real upstream `styles/*/demo` films — too heavy for a sticky demo PR; gallery links out instead
- Three.js / full WebGL post stack — defer until a second style needs 3D
- shadcn full CLI init + many components — hand-rolled minimal button/card/input set first
- Cloudflare Pages path routing for this app — monorepo infra, not demo MVP
- Fable / agent film generation — out of scope (no API)
