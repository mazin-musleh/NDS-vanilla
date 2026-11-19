Managed by NDS IQ

## Inventory

Records Portal is a client-side routed React SPA, no backend — `npm run dev`
serves it. Six client-side views, one shared shell (`src/App.js`). No `.nds-*` markup,
bundles, or prior NDS files anywhere — first setup, not a conformance split.

| Page | Route | Legacy libraries | NDS target | Status |
|---|---|---|---|---|
| Shell (topbar + nav + footer) — chrome, built once | `/nds` (`src/nds/Shell.js`) | `src/styles.css` (global entry injection in `src/main.js` — see hazard below) | Console shape, rail side menu: `nds-content-layout nds-has-sidemenu nds-rail nds-full-width` (`nds-full-width` is on the layout, not `body`), from `_source/layout/page-layout.md` + `_source/ui-shell/sidemenu.md`; own entry `nds/index.html` | Awaiting Verification |
| Records list | `/nds/#/records` (`src/nds/records/RecordsList.js`; `python -m http.server` cannot rewrite a path, so the NDS target is its own entry `nds/index.html` and the route is a hash, as the legacy app's); legacy `#/records` (`src/pages/Records.js`) stays as the reference | same | Example match: "Manage Records" (`_source/examples/manage-records.md`), console/`nds-full-width` chrome shape | Awaiting Verification |
| Reports | `/nds/reports` | same | later gate | Planned |
| Home / About / Contact / Settings | later gates | same | later gates | Planned |

**Global stylesheet hazard.** `src/styles.css` sets `body`, `h1`, `h2`, and `a` at element
level and loads through the one shared entry (`src/main.js`), so its rules reach every
route served through that entry. The porting strategy below names the escape.

**CSP sweep.** Static SPA, no server middleware — no response-header CSP today.
Re-run this sweep if a hosting layer adds one.

## Install log

- Template extracted by the dev at `.nds/` (bundle banner `2.0.x-dev`, dev-confirmed as
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
- **Pacing**: page-by-page — finish a page, report it, wait for the dev's go.

## Open items

- [x] Plan review — decisions above recorded (2026-08-17).
- [ ] Real brand logo file (text wordmark stands in; dev said proceed without it).
- [ ] Next gate: chrome + Records list (dev's go given 2026-08-17) — built, see the build record below.

## Records list + chrome — build record

**Work mode:** Port (existing non-NDS UI), parallel files, page-by-page. **Archetype:** example Manage Records
(`_source/examples/manage-records.md`) inside the Console shape with the Rail side menu (`_source/layout/page-layout.md`
`#layout-console`, `_source/ui-shell/sidemenu.md` `#sidemenu-rail`). Catalog read unfiltered; no template fits (Services List,
KPIs and Student Portal ruled out by their own fit lines). **Doc sources:** head.md, page-layout.md, header.md, topbar.md,
main-nav.md, sidemenu.md, hero.md, footer.md, table.md (Records canon + Records Parts), toolbar.md, filter.md, pagination.md,
export.md, init.md (framework views). Component markup comes from each component's doc, not from the example.

**Parts list** (`part → component`; limits = doc lines that restrict use):
- Document head → Head: copy as one block; hero preloads only for a hero photo (none here).
- Skip link → Page Layout: hash router, so handle its click and give `#main-content` `tabindex="-1"`.
- Date, clock, dark-mode button → Top Bar (+ Date, Clock): at most two items; Gregorian for an English site; stamp NOT shipped (see checkbox).
- Brand + Home / About / Contact links → Main Navigation: mark the current page with `data-state="current"` + `aria-current`; no dropdown or search (nothing behind them).
- Records / Reports / Settings links → Side Menu (rail): every top-level link has an icon; `nds-full-width` on the layout; no colour classes on the menu button.
- Page title + breadcrumb → Hero (sub) + Breadcrumb: no Share (console).
- "All records" region → Section: actions only for that section's content; no section inside a section.
- Count line, per-page, Columns, Export, search, Filter, applied chips → Toolbar: applied chips in their own row; no toolbar in a toolbar; records line carries the page's own noun.
- Per-page menu → Pagination + Dropmenu: no nav for a single page (the script hides it at one page).
- Column menu → Table (Column Menu): table needs an `id`; lock the identifier column.
- Export → Export: never reads `data-sort-value`.
- Search box → Filter (search box): `data-filter-items` only on a container with a filter.
- Owner facet → Filter (checkbox); Updated facet → Filter (Date group) + Date Picker (the picker's "no dropmenu inside a dropmenu" line is met by the Filter group the Date Picker page itself prescribes).
- Records table + sort buttons → Table + Sort: identifier first; sort only columns users compare; ISO dates sort as dates with no `data-sort-value`.
- Owner cell → Tag (neutral): read-only label, no icon.
- Pages → Pagination: `nds-paged-content` on the body, `nds-page-item` on rows.
- Footer → Footer: never repeat the main navigation; only the legal bar.
- States: default (all five records); search or filter with no match → Filter's built-in no-results alert. Loading, failed, signed-out, denied and an empty dataset cannot be reached: the data is a constant in the bundle, there is no request or session.

**Domain-required removals, named to the dev:** New request / create, edit, delete modals, bulk delete, row menu, expandable
detail rows and the actions column (the project has no write path and the legacy page had none); selection (Table doc: only with a
bulk action, none exists); the example's Status radio and Fee slider facets (the records have no status or fee; the Owner and Updated
facets replace them); Share, page feedback, Session Timeout (no public link, no store, no sign-in).

## Open items — Records list + chrome

- [ ] Digital stamp: ships only if the site holds the Digital Government Authority verification. Not shipped; say if it does.
- [ ] Brand logo: text wordmark stands in (dev's earlier call). Footer carries no logos.
- [ ] Removed chrome with no real target: main-nav Services dropdown and search, language switcher (English only, no Arabic content), footer columns, social, app and policy links, Vision 2030 logo. Re-add when the project backs them. Kept: the footer Cookie settings button (the runtime builds the consent panel on every page; it auto-opens after 6 s). Add `data-cookies-no-auto-open` on `<html>` if the site sets no cookies.
- [ ] Footer copyright reads "Records Portal"; confirm the legal owner.
- [ ] Links to Home, About, Contact, Reports and Settings leave `nds/` for the legacy routes (`../#/…`) until those pages port.
- [ ] Write path for create / edit / delete: needs a data layer first.

## Evidence — Records list + chrome (2026-11-20)

- **Build exit:** canonical sources as listed above; every part matched through the catalog; facets: example 3 (Service checkbox, Status radio, Fee slider) vs page 2 (Owner checkbox, Updated date range), difference named under the removals; columns: example 8 vs page 4 (ID, Title, Owner, Updated), checkbox/Status/Fee/Actions dropped as named. Edits to copied canon are only the allowed kinds (asset URLs, content, options: Gregorian date, per-page labels). Icons: every inline `nds-hgi-*` name is in `_data/content/icons.yml`; font icons `hgi-folder-01`, `hgi-chart-histogram`, `hgi-settings-01` exist in the HGI stylesheet; no icon names in JS strings. No CSP.
- **Files:** `nds/index.html` (own head and entry), `src/nds/main.js`, `src/nds/Shell.js`, `src/nds/records/RecordsList.js`. Legacy files untouched; `#/records` still renders 5 rows with no NDS runtime.
- **Verify:** `nds-verify.mjs` is not in this template's `.nds/` root, so both passes ran by hand (own headless Chrome, viewport set per context; scripts in `tmp/`). Reference page: `_site/examples/manage-records.html`. `window.innerWidth` 1440 = target 1440 and 390 = target 390. `NDS.init.audit()` returned no findings on default, dark, no-match, date-filtered, mobile menu-open and mobile no-match states; console clean (the only 404 is the legacy page's `/favicon.ico`, not an NDS view).
- **Behavior exercised:** search match and no match (built-in No results alert), Owner filter + chip, Updated date range (typed in the picker, 2 of 5 rows) combined with Owner, Reset, sort (ISO dates sort as dates, both directions), per-page, Columns menu (hide Owner), CSV export (4 columns, 5 rows), rail fold, mobile side menu and nav menu, dark mode, skip link (focuses `#main-content`, URL hash unchanged), footer Cookie settings opens the panel. No request or form exists, so there is no failure path or empty-required-field submit to run.
- **States:** default, no match, filtered, dark. Not reachable: loading, failed, empty dataset, signed-out, denied (constant data, no session). On mobile the no-match alert is as wide as the table and scrolls with it; the reference page does the same (alert 957 px in a 343 px box).
- **Screenshots:** `tmp/shots/` (`mine-*` against `ref-desktop.png`, `ref-mobile.png`). Differences from the reference are content swaps (no stamp, search, language, accessibility widget, nav dropdowns, write controls).
