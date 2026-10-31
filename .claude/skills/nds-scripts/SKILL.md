---
name: nds-scripts
description: Use when running or writing NDS check, audit, perf or asset scripts under scripts/ (browser checks, a11y, form, dialog, i18n, date, CSS/JS audits, SVG/PNG/WebP optimizing, svg-render-diff), when nds-audit.min.js is left behind by a commit, or after editing _sass/_fold.scss or _includes/head-inline-scripts.html (head_code doc sync).
---

# NDS scripts

```bash
node scripts/check-part-sizes.mjs               # part sizes: a knob beats the size class, the class a List's step; nested lists; a button's knob stays on the button; the Library's XS tags; ENGINE=webkit, CSS=<old main css> must fail
node scripts/encode-webp.mjs <master>           # WebP at set widths, lowest quality above a PSNR floor — always from the master
node scripts/run-audit.mjs [page.html]          # print a built page's NDS.init.audit() warnings
node scripts/check-js-rules.mjs [file …]        # nds-js-audit's mechanical half: `finding` = decided, `verify` = left to read (rules in its header); --self-test; --names = the naming rules (PERSONA 1, 10, 12)
node scripts/rename-bindings.mjs --underscore|--map <json> [--apply]  # rename bindings and their references by the AST (never a property); dry run without --apply
bundle exec ruby scripts/surface-history.rb     # names every release had that today's code lacks → tmp/surface/candidates.json; new rows go in _data/migrations.yml
node scripts/find-unused-icons.mjs              # UI icons nothing references
python scripts/hgi-font-slices.py               # HGI content font → 25-icon slices in assets/fonts/hgi/ + their @font-face list (hgi-font-update.py --apply runs it)
node scripts/check-date.mjs                     # NDS.Date vs Intl: every day 2018–2037 round-trips gregory ↔ hijri; ENGINE=webkit for Safari
node scripts/check-i18n.mjs [--build]           # every _i18n/ pack holds each English word (JS defaults + markers), markers match it, no Arabic in _js/; --build writes assets/i18n/ + _data/i18n.json (js_processor.rb runs it)
python scripts/check-docs.py [page.md]          # one-source doc pages vs the nds-doc rules (no build needed)
python scripts/publish-iq.py [--apply]          # NDS IQ draft → the file installs download: dry run; --apply commits + tags IQvX.Y, never pushes
python scripts/rig.py new|stage|reset|cost ...  # field rigs: a legacy app a fresh agent ports with the draft rules — guide in .claude/skills/nds-iq-eval/RIGS.md
node scripts/doc-check.mjs <page.md>            # clicks every builder option: findings + one contact sheet per theme in tmp/doc-check/ — owner's go-ahead first
node scripts/check-menus-in-modal.mjs           # six menu components in a scrolling Modal: place, follow, close, pick; PHONE=1, ENGINE=webkit
node scripts/check-ipv.mjs                      # Image Popup Viewer: NDS.Ipv methods, no window global, data-ipv-gallery grouping, rebuild after destroy
node scripts/check-dialogs.mjs                  # Modal + Panel on <dialog>: plain/static/modal, stacking, Escape, outside click, lazy panels; ENGINE=webkit, NO_POPOVER=1 (Safari < 17)
node scripts/check-bundle-once.mjs              # a bundle loaded twice runs once: no error, no extra listener, a warning; JS=<dir> for other bundles
node scripts/check-a11y.mjs [page.html …]       # axe (WCAG A/AA) + a Tab walk (visible stop, focus ring, no trap) on every built page, LTR and RTL; --dir, --no-keys, ENGINE=webkit
node scripts/check-form-reset.mjs               # every form field's doc canon: a reset puts it back (value, message, chips, status), a cancelled one keeps the change; ENGINE=webkit, OLD_JS=<dir of old bundles> for an A/B
node scripts/check-typing.mjs [pattern …]       # shaped typing (date, time) with real keys: written cases + every span deleted and typed back; a new pattern is one PATTERNS entry; ENGINE=webkit
node scripts/check-filter-dates.mjs             # Filter's date group: range, day, month, year, Gregorian and Hijri, in the menu, beside the search box (applies once, never on load), in a server-mode form and a panel with Apply (waits; the request carries it); URL reload, a late Date Picker; a bad item value warns
node scripts/check-pagination-data.mjs          # data-driven Pagination in a server flow: focus kept, 0/1 page hides, placeholder releases, data-active-page + ?page= current, ?per-page= read before the split; ENGINE=webkit, OLD_JS=<dir>
node scripts/check-mainnav.mjs                  # Main Navigation: menu placement, swap, scroll, outside click, phone drawer; ENGINE=webkit, TIMING=1
node scripts/trace-click.mjs [page] [runs]      # one plain tap traced: every listener on pointer/mouse/click with its cost, and the other main-thread work; TAP=1
node scripts/trace-busy.mjs [page …]            # long frames from load to quiet, with their scripts (LoAF); INITS=1 adds each component's init time
node scripts/check-form-speed.mjs                # Form speed, a past commit (BASE=, default HEAD) vs today, interleaved: init on real pages, create() × 20/50/100, one keystroke and one click; RUNS=, CPU=, TYPE=date,time,phone,iban (per-key cost of each shaped field)
node scripts/check-form-validate.mjs             # what NDS.Form.validate says for every field canon in four states (written, required, filled, disabled), a past commit (BASE=) vs today; ONLY=<page>, DUMP=1
node scripts/check-form-interact.mjs             # how every field canon reacts to real clicks and keys (focus, typing, clear, number buttons and hold, password toggle, select, boxes, switch, submit, reset), a past commit (BASE=) vs today; a difference counts only when a rerun repeats it
node scripts/profile-load.mjs [page] [ms]       # V8 CPU profile of a page load: self/total time per function in the NDS bundles
node scripts/release-template/nds-verify.mjs <config.json>  # consumer verify tool, shipped at the zip root: every page and state, both widths, light and dark, audit + console + a sheet beside the reference; to try it here, NDS_SITE=<a release zip's _site>
```

**`nds-audit.min.js` embeds data from all over the repo, so a commit with no JS change can leave it behind.** It holds every `nds-*` name in the doc pages, includes, `_data` and scripts, the class/attribute/id/property rows of `_data/migrations.yml`, and each banner's Requires lines. The `pre-commit` hook (`scripts/hooks`, installed once per clone with `git config core.hooksPath scripts/hooks`) stops a commit that leaves it behind and names what moved: run `ruby _plugins/js_processor.rb` and stage the bundle in that same commit.

**Browser checks launch through `scripts/lib/browser.mjs` (Playwright)** — `ENGINE=webkit node scripts/<check>.mjs` runs one as Safari. The root ships `playwright-core` only (no browser download; Chromium is your installed Chrome); WebKit lives in Playwright's per-user cache and downloads itself on the first Safari run. CDP calls (throttling, touch, traces) are Chromium-only.

**A new script or check is fast and fails loud, never silent.** Log each step with its elapsed time; give every await a short limit (~10 s) that fails with the step's name, not a library default (30 s, or 180 s for a Chrome launch); print failed requests and page errors as they happen; run independent pages in parallel; wait on a condition (a count that holds across two readings), never a fixed sleep. Then run it once on a broken input and see it stop quickly with a line that names the cause. Import `step()`, `log()` and `STEP_MS` from `scripts/lib/browser.mjs`; model: `scripts/check-bundle-once.mjs`. Its `launch()` already gives up on a launch in 15 s, on every page action, wait and `evaluate()` in `STEP_MS`, and prints page errors and failed requests: a check sets a longer limit only where it means it. On 2026-10-21 its first draft sat 30 s on a wrong path with no clue.

**Judge an SVG by its GZIP size, not its bytes on disk** — Pages serves SVG compressed, so a 331 KB Figma export is 113 KB on the wire and disk numbers send you optimizing the wrong file. `optimize-assets.py` reports both. It also always encodes raster BOTH lossless and lossy and keeps whichever is smaller: flat-colour artwork (logos, UI graphics, hard edges) goes smaller AND pixel-perfect lossless, while photos and gradients want lossy — a 201 KB PNG here landed at 74 KB lossless vs 102 KB at q95. Never pick from the file extension.

**After optimizing any SVG, run `svg-render-diff.mjs` — byte checks cannot replace it.** It rasterizes the new file against its `tmp/asset-backups/` copy in headless Chrome at 64/256/1024px and erodes the diff mask by 1px: hairline outlines are anti-aliasing and vanish, a colour shift or moved shape survives as `solid`. On 2026-08-28 `dga-logo-icon.svg` passed every static check — viewBox identical, no dangling `url(#…)`, every gradient and mask kept — yet rendered 3.5% of its pixels differently at every size (mean ink `[48,136,179] → [90,156,192]`); it was reverted. SVGO rewrites a file completely, so only a render comparison proves the drawing survived. Whatever tests this, **make the SVG fill its test box (`width:100%`, never `max-width`)** — a file with intrinsic `width`/`height` otherwise paints at native size in every box and the large runs silently test nothing. That flaw gave a false all-clear on the very run that missed the regression above; identical pixel counts across sizes is the tell.

**After editing `_sass/_fold.scss` or `_includes/head-inline-scripts.html`** — copy the rendered `<style>` and head `<script>` from a built page into the `head_code` capture in `ui-shell/head.md`. That block is canonical markup a consumer copies into their own `<head>`, and it is a hand-maintained copy of what `_includes/critical-inline.html` compiles, so it drifts silently: `61763016` added the dark-mode brand rule to the fold and the doc went five weeks without it. `verify()` compares both and fails the release when they diverge.
