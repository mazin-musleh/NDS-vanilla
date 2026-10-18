# Catalog + shelves (v2.0)

**Status (2026-10-19):** built and committed (`8c314f2b`). Static checks pass (build, production build, check-docs, check-i18n, NDS-INDEX paths, every catalog url resolves, 404 map has no duplicate names). Browser check passed 2026-10-19 (`tmp/shelves/check.mjs`): the 10 old URLs, with and without `.html`, forward with query and anchor kept, an unknown name stays on the 404; each `?shelf=` ticks its box and shows only that shelf; no page errors. S31 and S39 pass on Sonnet 5.5. Open for the owner: the IQ draft says "the template, example, and component catalogs" (now one file) (left for the next IQ edit batch). Done 2026-10-19: the `layout/page-shell.md` stub is deleted; `404.html` maps `page-shell` to Page Layout, and the browser check covers it.

## Goal

"Components" stops meaning "everything". The library splits into shelves, each with one test, and one catalog file lists every pickable item for people and agents alike.

## Settled (owner, 2026-10-17)

- Shelves by the placement rule below; folders follow shelves (the v2 window — URLs freeze again after it).
- UI's 39 entries split into job groups in the same pass.
- `components.yml` + `examples.yml` + `templates.yml` + `events.yml` merge into one `_data/catalog.yml`.

## Placement rule — stop at the first yes

| # | Question | Shelf | Folder |
|---|---|---|---|
| 0 | Something you **read**, not use? | Guides | `guides/` |
| 1 | You **call** it from JS, no markup of its own? | Core | `core/` |
| 2 | A **value** every part reads (colour, size, icons)? | Foundations | `foundations/` (new) |
| 3 | **At most one per page**, serving the whole page? | UI Shell | `ui-shell/` |
| 4 | Only **arranges** other parts, no look of its own? | Layout | `layout/` |
| 5 | A class or attribute that **tweaks markup you wrote**, drawing nothing of its own? | Utilities | `utilities/` |
| 6 | Everything else | Components | `components/` |

Borderline, stays put: Tooltip draws a bubble (Components); FAB can repeat (Components); Selection is markup-driven (Components → Data).

## Page moves (`git mv`, one commit) — 10 pages, all keep their file names

| From | To | Why |
|---|---|---|
| `components/tokens.md` | `foundations/tokens.md` | rule 2 |
| `components/themes.md` | `foundations/themes.md` | rule 2 |
| `components/icons.md` | `foundations/icons.md` | rule 2 |
| `components/cookies.md` | `ui-shell/cookies.md` | rule 3 (was Utilities in a `components/` folder) |
| `components/accessibility.md` | `ui-shell/accessibility.md` | rule 3; the one-member "Add-ons" group goes, the `Add-on` tag stays |
| `components/session-timeout.md` | `ui-shell/session-timeout.md` | rule 3 |
| `core/migration.md` | `guides/migration.md` | rule 0 |
| `utilities/divider.md` | `components/divider.md` | fails rule 5: its own element with a look (and an OR label) (owner, 2026-10-17) |
| `utilities/share.md` | `components/share.md` | fails rule 5: its own menu or button row (owner, 2026-10-17) |
| `utilities/content-placeholder.md` | `components/content-placeholder.md` | fails rule 5: its own dashed box (owner, 2026-10-17) |

Utilities after: Copy, Expandable Content, Helper Classes, Hidden, Numbers (+ Counter Animation, Currency entries), Truncate Text — 6 pages, flat (2 levels).

## Components groups (draft — owner reviews before start; * = moved in from Utilities)

- **UI → Actions:** Buttons, Cooldown Button, Floating Action Button, Dropmenu, Link, Chips, Share*
- **UI → Navigation:** Breadcrumb, Pagination, Tabs, Stepper, TOC, Content Switcher, Drawer
- **UI → Overlays:** Modal, Panels, Tooltip, Image Popup Viewer
- **UI → Feedback:** Alert, Empty, Loading, Progress, Countdown, Feedback Icons
- **UI → Content:** Accordion, Avatar, Cards, Code, Content Placeholder*, Date Tile, Divider*, Definition List, Featured Icons, Meta, Persona, Quote, Rating, Scroll More, Swiper, Tags
- **Forms:** unchanged (20)
- **Data:** unchanged (7) + Toolbar (its `use_when` is the data-screen controls bar)

## Catalog file

- `_data/catalog.yml` (out of `_data/content/`, which is demo data: `users.yml`, `transactions.yml`, …). Read as `site.data.catalog`.
- Grouped by shelf, one comment line before each group, one header comment for every field (merges the 3 current headers).
- **Shelf = the first folder of `url`.** No `shelf:` field, so it cannot drift. Filter: `site.data.catalog | where_exp: "e", "e.url contains '/core/'"`.
- `category` = group inside the shelf (Actions, Forms, Service, …).
- Events get a `use_when` each (none today) so they are searchable like the rest.
- Same keys as today; `js:`/`scss:` stay component-only.

## Impact — every reader found (2026-10-17 grep)

**Catalog readers** (`site.data.content.{components,examples,templates,events}`)
- `index.md` — templates loop :129, examples :181/:188, events :257, "Components (N)" :334, components loop :395, filter :363/:404
- `components/index.md` :15/:74, `examples/index.md` :15/:71, `templates/index.md` :15/:71, `events/index.md` :15/:71 (each has a `data-filter="category"` group)
- `llms.txt` :39 groups by `category`, :52 templates, :59 examples — regroup by shelf
- `_includes/seo-meta.html:5` — already concats the three as `_catalog`; becomes `site.data.catalog`

**Hard-coded doc folder lists** — add `foundations`
- `scripts/check-docs.py:18`, `scripts/check-i18n.mjs:59`, `scripts/surface-history.rb:13`, `_plugins/js_processor.rb:242` (`ANATOMY_DOCS`)
- `.claude/skills/nds-doc/SKILL.md` :3, :35
- `.claude/skills/nds-iq-eval/SKILL.md` :51, :138 and `fixtures/tools/assemble.mjs:48`, `fixtures/README.md:34` — also add `_data/catalog.yml` beside `_data/content`

**Links to moved pages** (exact `.md`/`.html` refs; the SCSS `components/…` partial paths are NOT these)
- Shipped runtime: `_js/nds-audit.js` (9 doc links: icons, tokens, themes) → rebuild the audit bundle; `_js/nds-accessibility.js:49`, `_includes/accessibility-panel.html:12`
- Build/tools: `_plugins/tokens_data.rb` :6/:34, `scripts/add-icon.mjs` :11/:148, `scripts/check-a11y-arm.mjs:22`, `scripts/check-dialogs.mjs`, `scripts/mkrelease.py` (anchor list :196–202 incl. `_data/content/components.yml`)
- Data: `_data/sidemenu/sidemenu.yml` (7), `_data/migrations.yml`, `_data/content/icons.yml`
- Pages: `index.md:103`, `ui-shell/footer.md` (cookies), `core/audit.md` (migration), plus ~30 doc pages linking tokens/themes (regex sweep)
- Skills: `nds-release`, `nds-add-icon`, `nds-hgi-font-update`, `nds-doc`
- `NDS-INDEX.md` (3 path refs + the catalog row → one file); `AGENTS.md` :59, :243–247 (catalog step + event pack registration)
- Eval scenarios: S31 (catalog path), S40, S96 (moved pages), and every scenario naming `components.yml` (6) → "`catalog.yml` (`components.yml` before 2.0)", since old-template runs keep the old names

**The 3 Utilities moves** add only: `scripts/trace-click.mjs` (1 ref), plus the side menu and catalog rows already listed. `TODO.md` mentions one — leave it to its owner.

**Breadcrumbs** — 98 doc pages carry `breadcrumb: [["Components", "/components"]]`; they follow the browse-page decision (open question 1).

**Untouched on purpose:** `plans/*`, `CHANGELOG*`, `dist/`, `tmp/`, rig fixtures and zips.

## Steps

1. Owner confirms the Components group lists above.
2. Build `_data/catalog.yml` with a one-off script (merge, regroup, rewrite moved `url`s, add event `use_when`); delete the four old files.
3. `git mv` the 10 pages; fix front matter (breadcrumb, `last_edit`).
4. Old URLs: the 404 lookup (open question 2).
5. Regex sweep of links to moved pages (script, LF-safe, `git diff --numstat` after).
6. Readers: index pages, `llms.txt`, `seo-meta.html`, side menu regrouped to the shelves.
7. Folder lists + tools + skills + `AGENTS.md` + `NDS-INDEX.md` + eval scenarios.
8. `ruby _plugins/js_processor.rb` (audit bundle carries doc links).
9. Release notes: one Migration line for the 10 URL moves (docs links only; no consumer markup changes).

## Checks before commit

- `bundle exec jekyll build` clean; every `site.data.catalog` entry's `url` resolves to a built page.
- Grep: zero refs to the 10 old paths outside `404.html`, `plans/`, `CHANGELOG*`.
- Built site: each of the 10 old URLs, opened as a missing page, lands on its new page (with `#anchor` kept).
- `python scripts/check-docs.py`, `node scripts/check-i18n.mjs`, `python scripts/mkrelease.py` dry run (NDS-INDEX paths).
- Index pages and home: card counts per shelf add up to the old totals (components 106 → spread over shelves; examples, templates, events unchanged).
- Page file names stay unique across the page folders (`ls … | sort | uniq -d` is empty).
- One `nds-iq-eval` catalog-routing scenario run (S31, S39) on the new tree.

## Owner decisions (2026-10-17)

1. **Browse page — decided 2026-10-17: no page per shelf.** People move by the home page and the side menu; shelf landing pages would go unused. `/components/` stays the one browse page, retitled **Library**, listing every library shelf (examples, templates, events keep their own pages). Its filter gets a **Shelf** group beside the group (`category`) one. A doc's breadcrumb names its shelf and links to the pre-filtered page — Filter already restores checkboxes from URL params (`applyUrlParams`, key = the input `name`, e.g. `/components/?filter-shelf=Foundations`).
2. **Old URLs — decided 2026-10-17: the 404 page forwards, no stubs.** Stub pages (one per old path) were weighed and dropped: fake same-named `.md` files ship in the zip and can mislead an agent globbing `_source/`, and they need a forever rule plus a release gate. Agents never follow live-site URLs (each template ships its own docs), so only people with old bookmarks, outside links and 1.x audit messages benefit.
   - `404.html` gets a build-time map of every page's file name → URL (Liquid over `site.html_pages`, `index.html` skipped) and a few lines of JS: take the missing URL's file name, look it up, `location.replace(url + location.search + location.hash)`. A move that keeps the file name needs no work, ever.
   - A rename (file name changes) adds one `old: new` line to a small list in `404.html`. None in this plan: all 10 moves keep their names.
   - File names are unique across the page folders today (checked 2026-10-17); a duplicate name would make the lookup ambiguous, so the plan's Checks re-run that test.
   - Ceiling: needs JS, and search engines see a 404, not a move (GitHub Pages cannot send a 301 anyway). Off GitHub Pages, it works only where the host serves `404.html` for misses.
3. **Home count — decided 2026-10-17:** the home section becomes **Library (N)**, the whole library, same cards and Shelf filter as `/components/`. One shared include renders both (today the home grid and `components/index.md` are two copies).
4. **Side menu is the main map** (people navigate by it): Home, Guides, DGA Templates, Examples, Events, then the library shelves in page-build order — Foundations, Layout, UI Shell, Components (Actions, Navigation, Overlays, Feedback, Content, Forms, Data), Utilities, Core.
