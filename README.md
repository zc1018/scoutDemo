# scoutDemo

Sticky monorepo for short tech demos scouted from X bookmarks.

## Layout

| Path | Purpose |
|------|---------|
| `apps/<slug>/` | One self-contained demo (Bun: `bun install && bun run dev`) |
| `tracking/seen-bookmarks.json` | Scout ledger: `proposed` / `built` / `skipped` |
| `skills/project-planning/` | Vendored planning skill — write `PLAN.md` before coding |
| `AGENTS.md` | Rules for cloud agents working in this repo |

## How demos land

1. Weekday scout picks a bookmarked tech worth demoing and asks before building.
2. After approval, an agent adds `apps/<kebab-slug>/` (plan first, then code) and updates tracking.
3. PRs must include at least one screenshot **and** one video of the running app.
4. Cloudflare preview: one Pages project, path per app — not one project per demo.

## Root tooling

- Bun + root `bunfig.toml` (`minimumReleaseAge = 259200`)
- Optional workspaces via root `package.json` (`apps/*`)
