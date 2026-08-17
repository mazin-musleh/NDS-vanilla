Managed by NDS IQ

## Inventory

Records Portal is a client-side routed React SPA, no backend — `npm run dev`
serves it. Six client-side views, one shared shell (`src/App.js`). No `.nds-*` markup,
bundles, or prior NDS files anywhere — first setup, not a conformance split.

| Page | Route | Legacy libraries | NDS target | Status |
|---|---|---|---|---|
| Shell (topbar + nav + footer) — chrome, built once | `/nds` (`src/nds/Shell.js`) | `src/styles.css` (global entry injection in `src/main.js` — see hazard below) | Console shape: `nds-content-layout nds-wSideMenu` + `nds-full-width` on `body`, from `_source/layout/page-shell.md` / `_site/examples/console-demo.html` | Planned |
| Records list | `/nds/records` (`src/nds/records/RecordsList.js`); legacy `#/records` (`src/pages/Records.js`) stays as the reference | same | Example match: "Manage Records" (`_source/examples/manage-records.md`), console/`nds-full-width` chrome shape | Planned |
| Reports | `/nds/reports` | same | later gate | Planned |
| Home / About / Contact / Settings | later gates | same | later gates | Planned |

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
- [ ] Next gate: chrome + Records list (dev's go given 2026-08-17).
