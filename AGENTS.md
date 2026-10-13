# Agent instructions — scoutDemo

Sticky monorepo for weekday X-bookmark tech demos. Cloud agents work **only** in this repo.

## Hard rules

1. **One sticky monorepo** — never create a new GitHub repository for a demo.
2. **Scope** — for a given demo, only touch `apps/<kebab-slug>/` (plus `tracking/seen-bookmarks.json` when proposing/building). Do not rearrange sibling apps or root tooling unless the user asks.
3. **Bun** — package manager and runtime are Bun. Each app under `apps/<slug>/` must be self-contained: from that directory, `bun install && bun run dev` must start the demo.
4. **Plan first** — use `skills/project-planning/`. Write `apps/<slug>/PLAN.md` (goal, MVP, tasks, stack, deferred) **before** coding.
5. **PR evidence** — every PR must attach **both** at least one screenshot **and** at least one video of the running app.
6. **Prototypes** — prefer Fable 5 / `claude-fable-5` for initial prototypes when it fits.
7. **Cloudflare preview** — one Pages project for the monorepo, with a path (or routing) per `apps/<slug>/`. Do **not** create one Pages project per app.
8. **Tracking** — when proposing or building from an X bookmark, update `tracking/seen-bookmarks.json` (`proposed` / `built` / `skipped`) in the same change set.

## Layout

```
apps/<kebab-slug>/     # one self-contained demo
skills/project-planning/
tracking/seen-bookmarks.json
AGENTS.md
bunfig.toml
```

## Definition of done (per demo)

- `apps/<slug>/PLAN.md` written before implementation
- App runs with `bun install && bun run dev` inside `apps/<slug>/`
- PR includes screenshot(s) + video of the running UI
- `tracking/seen-bookmarks.json` updated appropriately
