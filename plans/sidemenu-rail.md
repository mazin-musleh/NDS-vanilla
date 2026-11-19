# Side Menu Rail

Status: **WIP, parked** (2026-11-18). The first build works, but it needs the full state cycle and a queue before it ships.

## Goal

A side menu mode that folds to its icons. `nds-rail` on the `.nds-content-layout`, with `nds-full-width` in the canon. On a desktop, the menu button folds and opens it, and the browser keeps the choice. Below 960px it is the slide-in menu, with Peek (owner call 2026-11-19: a rail always folded on a phone took the content's width).

Owner calls already made:
- A group pressed while folded opens the menu wide and opens that group (no flyout).
- The fold is remembered per browser (`localStorage` `nds-sidemenu-collapsed`, `'1'` / `'0'`; the user's choice wins over a `data-sidemenu-collapsed` in the markup).
- Folding clips the menu with a slide: rows keep their open layout, so no icon moves and no label wraps.
- `--nds-sidemenu-rail-width: 56px` (owner pick; 62px centers the icon but is off the 4px grid).

## Parked code

**Local branch `wip/sidemenu-rail`, on the owner's main machine only** (never pushed; owner call 2026-11-18). Another clone has no copy. Resume by rebasing it on main, then run `ruby _plugins/js_processor.rb`: its built bundles go stale against main.

Files:
- `_sass/tokens/_primitives.scss`: `--nds-sidemenu-rail-width`.
- `_sass/layout/_content-layout.scss`: rail grid from 960px; the column eases `grid-template-columns` with the menu (measured on the console demo: every frame fits at 1x CPU, `tmp/rail-colanim-perf.mjs`). Below 960px, the slide-in grid.
- `_sass/components/_sidemenu.scss`: the slide-in and peek rules cover rail too; the rail block is desktop only (toggle at the top inside the `nav`, `nav` clips a list fixed at the open width with `max-width: none` over Scroll More's cap, `rail-folded` / `rail-settled` mixins; the folded current icon is a primary button that fades in once).
- `_js/nds-sidemenu.js`: `setupRail()`. Flag on the layout: `data-sidemenu-collapsed` (desktop). Below 960px the toggle runs `openMenu` / `closeMenu`, and a width change across 960px closes whichever is open. A stored fold at load lands with no slide (inline `transition: none` for two frames). Banner Hooks and Gotchas updated.
- `ui-shell/sidemenu.md`: Rail structure canon `#sidemenu-rail`, Parts rows, Variants rows (`:not(.nds-rail …)` on Top bar and Many links only), Behavior "Rail Mode", Best Practices (Rail, icons, `nds-full-width`), API rows.
- `CHANGELOG.md`: one Added line.

## Next: what it needs before it ships

Done 2026-11-19 (items 1–3 of the first list):
- **State cycle** on the aside: `open opening` → `open` → `open opened`; `open closing` → none. Reduced motion lands on the end state. The layout flags still drive the CSS; no new `[data-state]` rule.
- **Queue**: a press during a slide waits, last one wins. A fold closes an open group first (waits for `nds:drawer:hidden`); a group press while folded opens the menu, then the group. The group a fold closed keeps its button's `active` mark while folded (put back in a microtask after the drawer's `watchActive` clears it) and reopens after the menu opens; the queue waits for that `nds:drawer:shown` too. A press on another group drops the kept mark. Below 960px the aside keeps its z-index until the close ends.
- **Events**: `nds:sidemenu:expanded` / `collapsed` on the aside, rail only, not at load or on a width change. Banner and doc API updated.
- **Folded rows** (CSS): once the fold ends (no `closing`), the aside sets `--_rail-list-width` and the list takes the rail width, so a row's box and the Show more arrow fit. As it folds, the row's start padding eases to center the icon (18px each side at 56px) and the label, tag and arrow fade to 0 (kept in the accessibility tree). The rail canon has 9 more links so Scroll More shows.
- **Labels** (owner call 2026-11-19): top-level labels are one line with an ellipsis in rail mode, open or folded, so no row changes height as it folds (Ant Design Menu, Material drawer). Folded rows and cut-off names show the full name in a Tooltip, made on hover or focus and dropped at each slide; its `aria-describedby` is removed (the label already names the row). Tooltip gained `data-position="start|end"` (writes `data-position-horizontal`) for this.
- **Stored fold at first paint**: the head inline script copies `nds-sidemenu-collapsed` to `data-nds-sidemenu-fold` on `<html>`; `$rail-collapsed` (`_mixins.scss`) treats it as the layout attribute (it wins over the markup) in main CSS and the skeleton; init removes it. The skeleton reserving 260px was the main cause: main's column transition slid from it. Throttled check (`tmp/rail-cls.mjs`, JS delayed past CSS): content 924→1128 (CLS 0.081) before, 1128 from the first frame after. `head.md` capture synced.
- Harness: `tmp/rail-check.mjs` (scratch; LTR + RTL behavior, all ok). `doc-check.mjs ui-shell/sidemenu.md`: no findings.

Done later 2026-11-19 (owner calls):
- The folded current icon is a primary button, as Main Navigation's current link (c335d67a).
- A fold keeps a group's mark only when the current page is in it (98523361).
- Rail on a desktop only, the column eases with the menu, `nds-full-width` in the canon (90b9cf70). Tried and rejected: the slide-in's edge thumb as the desktop toggle; a rail on the console examples (it did not fit a phone).

Open items from the first build:
   - RTL: behavior and the folded look checked.
