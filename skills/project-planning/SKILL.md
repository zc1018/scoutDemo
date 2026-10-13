# Project planning

Turn a fresh project idea into a focused, MVP-first plan that favors prebuilt solutions and opinionated frameworks over custom complexity.

## Workflow

1. **Clarify goal** in one sentence; define the single-user MVP boundary (in vs out).
2. **Decompose** into manageable tasks grouped by user-visible outcome.
3. **Research** frameworks/libraries that absorb whole tasks; prefer prebuilt.
4. **Start from official scaffold** via `bunx create-*` (`create-next-app`, `create-vite`, `create-t3-app`, `create-tanstack`, `create-expo`).
5. **Before any dependency install**, create or preserve `bunfig.toml` with:

   ```toml
   [install]
   minimumReleaseAge = 259200
   ```

   Prefer scaffold flags that skip the initial install, then run `bun install`.
6. **Pick one** opinionated framework when it helps; skip for one-screen utilities.
7. **UI**: `bunx shadcn@latest init` with a minimalist preset; add components on demand.
8. **Lay out** components/services opinionatedly before writing feature code.
9. **Minimum useful testing** + a small git-hook surface (format/static only).
10. **Produce a short plan**: goal, MVP, tasks, stack with one-line rationale, deferred.

## Rules

- One user first
- Bun default
- `bunfig.toml` required (`minimumReleaseAge = 259200`)
- shadcn default for UI
- Prebuilt over bespoke
- Boring defaults
- Cut features before clarity
- One framework max
- Organize by feature once there is more than one screen
- Tests for critical logic only
- Hooks for format/static only
- Defer non-MVP
- Re-evaluate after the first end-to-end slice

## Output shape

Write `apps/<slug>/PLAN.md` with:

1. **Goal** — one sentence
2. **Single-user MVP** — in scope + outs
3. **Outcome-oriented task list** — grouped by user-visible outcome
4. **Stack** — each choice with a one-line rationale
5. **Deferred** — what waits and why
