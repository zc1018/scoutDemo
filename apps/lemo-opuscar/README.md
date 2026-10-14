# Lemo-Opuscar studio

Scout demo for [lemomo-ai/lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) — code-native (Canvas) film styles, no video model.

Bookmark source: [Lemomo on X](https://x.com/lemomo_ai/status/2103823847632060854).

## What it does

- **Style gallery** — curated interactive cards (subset of the upstream ~43 styles)
- **Director brief** — theme / story / rhythm / reference (client-side; download as `.md`)
- **Live Canvas preview** — real animation that switches grammar with the selected style

## Run

```bash
bun install
bun run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

```bash
bun run build   # production build
bun run preview # preview the build
```

## Notes

- Self-contained under `apps/lemo-opuscar/`.
- No backend, no Claude API, no video-model calls.
- See `PLAN.md` for MVP scope and deferred work.
- Validation artifacts live in `validation/`.
