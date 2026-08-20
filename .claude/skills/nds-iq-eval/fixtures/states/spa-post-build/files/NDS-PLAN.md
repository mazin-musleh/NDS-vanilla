Managed by NDS IQ

## Inventory

Records Portal is a client-side routed React SPA, no backend — `npm run dev`
serves it. Six client-side views, one shared shell (`src/App.js`). No `.nds-*` markup,
bundles, or prior NDS files anywhere — first setup, not a conformance split.

| Page | Route | Legacy libraries | NDS target | Status |
|---|---|---|---|---|
| Shell (topbar + nav + footer + side menu) — chrome, built once | `#/nds` (`src/nds/Shell.js`, `src/nds/NdsApp.js`) | `src/styles.css` (global entry injection in `src/main.js` — see hazard below) | Console shape: `nds-content-layout nds-wSideMenu` + `nds-full-width` on `body`, from `_source/layout/page-shell.md` / `_site/examples/console-demo.html`. Chrome content trimmed to canonical structure (`ui-shell/{topbar,mainnav,sidemenu,footer}.md`) — docs-site-only nav-actions (search/notifications/login/language) omitted, nothing to back them | Awaiting Verification |
| Records list | `#/nds/records` (`src/nds/records/RecordsList.js`); legacy `#/records` (`src/pages/Records.js`) stays as the reference | same | Example match: "Manage Records" (`_source/examples/manage-records.md`), ported wholesale (toolbar, filter, sort, export, pagination, sub-rows, create/edit/delete modals), content renamed request→record. Requester autocomplete backed by `public/data/requesters.json` (no backend; matches the rest of the app's client-only data) | Awaiting Verification |
| Reports | `#/nds/reports` | same | later gate | Planned |
| Home / About / Contact / Settings | later gates | same | later gates | Planned |

**Routing note.** The plan's route column originally read `/nds`, `/nds/records` — implemented as hash routes (`#/nds`, `#/nds/records`) instead, since `npm run dev` is a plain `python -m http.server` with no SPA fallback; path-based routes would 404 on direct load/refresh. `src/main.js` now reactively mounts `App` (legacy, styles.css injected) or `NdsApp` (NDS world, no legacy stylesheet) based on the hash prefix, keeping "ported routes render outside `<App>`'s shell chain" intact.

**Runtime wiring notes (for the next gate's session):**
- `index.html` must carry the `nds-main.min.js` runtime `<script defer>` — easy to drop when hand-assembling a head from `_site/index.html`'s reference, since that file already has its own copy and the omission fails silently (`window.NDS` just stays undefined until something calls it).
- `Shell.js` calls `NDS.Init.initialize()` on mount, not `NDS.Init.refresh()`. Confirmed via `NDS.Init.audit()`: Filter and Pagination don't cold-init new instances through `refresh()` for markup that didn't exist during `nds-main.min.js`'s own page-load scan (their own JS API docs route new instances through `NDS.Filter.init()` / `NDS.Pagination.init()` — `initialize()` is the "whole page body replaced" sweep that covers both, and fits since this SPA's first NDS paint replaces `#root` from empty to the full console page in one shot). Page-level updates after that (create/edit/delete) correctly use `NDS.Init.refresh()` per the docs.
- `NdsApp.js`'s unmatched-route redirect only fires when the hash still starts with `#/nds` — guard against it firing on a hash that left the nds world entirely (e.g. browser back/forward to a legacy route), or it fights `main.js`'s world switch and traps navigation back into the nds world.

**Global stylesheet hazard.** `src/styles.css` sets `body`, `h1`, `h2`, and `a` at element
level and loads through the one shared entry (`src/main.js`), so its rules reach every
route served through that entry. The porting strategy below names the escape.

**CSP sweep.** Static SPA, no server middleware — no response-header CSP today.
Re-run this sweep if a hosting layer adds one.

## Install log

- Template extracted by the dev at `.nds/` (bundle banner `1.8.x-dev`, dev-confirmed as
  the reference and runtime to use); `_source/` present on disk; `.nds/_site/assets/`
  copied whole into `NDS_ASSETS` (`public/assets/`); JS and CSS bundle banners agree.

## Review decisions (2026-08-17)

- **`NDS_ASSETS`** = `public/assets/`, served at `/public/assets/` by the plain static server.
- **Porting strategy**: parallel files — new components under the `/nds` route prefix,
  legacy routes and files untouched; ported routes render outside `<App>`'s shell chain
  so they don't inherit `src/styles.css`'s element-level selectors.
- **NDS release**: the dev supplied the extracted template at `.nds/` and confirmed it —
  the dev's named choice.
- **Brand slot**: no logo file exists — the dev's call, recorded: text-only wordmark
  "Records Portal" in the brand slot; swap in a real file later.
- **Pacing**: gate-by-gate — finish a gate, propose the next, wait for the dev's go.

## Open items

- [x] Plan review — decisions above recorded (2026-08-17).
- [ ] Real brand logo file (text wordmark stands in; dev said proceed without it).
- [x] Gate: chrome + Records list built (dev's go 2026-08-17); self-verified below, `Awaiting Verification` until dev confirmation.
- [x] Self-verification (headless Chrome, `localhost:5183` static serve): `NDS.Init.audit()` clean (zero warnings) after fixing the two issues in the routing note above; exercised create/edit-open/delete/empty-submit-validation/dark-mode-toggle/cross-world-nav-both-ways — all correct; desktop (1440) and mobile (390) screenshots checked against the built `console-demo`/`manage-records` twins for spacing, icons, and coherence — matches. Icon names spot-checked against `icons.yml` (inline) and `_hgiRoundedStroke.scss` (font) — all present.
- [ ] Accessibility panel (`ui-shell` a11y aside + `nds-accessibility.min.js`) not included this gate — not part of page-shell.md's canonical tree, add if the dev wants it.
- [ ] Sidemenu carries only Records today; grow it as Reports/Home/About/Contact/Settings land — never link to a route that doesn't exist yet.
- [ ] Next gate: propose after dev reviews Records list (pacing is gate-by-gate).
