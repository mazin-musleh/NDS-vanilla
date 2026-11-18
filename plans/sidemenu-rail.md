# Side Menu Rail

Status: **WIP, parked** (2026-11-18). The first build works, but it needs the full state cycle and a queue before it ships.

## Goal

A side menu mode that folds to its icons. `nds-rail` on the `.nds-content-layout`. On a desktop, the menu button folds and opens it, and the browser keeps the choice. Below 960px it is always folded: no slide-in, no peek. The button opens the full menu over the page.

Owner calls already made:
- A group pressed while folded opens the menu wide and opens that group (no flyout).
- The fold is remembered per browser (`localStorage` `nds-sidemenu-collapsed`, `'1'` / `'0'`; the user's choice wins over a `data-sidemenu-collapsed` in the markup).
- Folding clips the menu with a slide: rows keep their open layout, so no icon moves and no label wraps.
- `--nds-sidemenu-rail-width: 56px` (owner pick; 62px centers the icon but is off the 4px grid).

## Parked code

**Local branch `wip/sidemenu-rail`, on the owner's main machine only** (never pushed; owner call 2026-11-18). Another clone has no copy. Resume by rebasing it on main, then run `ruby _plugins/js_processor.rb`: its built bundles go stale against main.

Files:
- `_sass/tokens/_primitives.scss`: `--nds-sidemenu-rail-width`.
- `_sass/layout/_content-layout.scss`: rail grid; below 960px the column stays at the rail width; the desktop column animates `grid-template-columns`.
- `_sass/components/_sidemenu.scss`: the slide-in and peek rules skip rail (`:not(.nds-rail …)`); the rail block (sticky toggle, `nav` clips a list fixed at the open width with `max-width: none` over Scroll More's cap, `rail-folded` mixin).
- `_js/nds-sidemenu.js`: `setupRail()`. Flags on the layout: `data-sidemenu-collapsed` (desktop), `data-sidemenu-open` (below 960px, over the page with the Backdrop). Hover `title` on folded top buttons. A stored fold at load lands with no slide (inline `transition: none` for two frames). Banner Hooks and Gotchas updated.
- `ui-shell/sidemenu.md`: Rail structure canon `#sidemenu-rail`, Parts row, Variants rows with `:not(.nds-rail …)` on Slide-in, Top bar, Peek and Many links, Behavior "Rail Mode", two Best Practices, API rows. `check-docs.py` passed.
- `CHANGELOG.md`: one Added line.

## Next: what it needs before it ships

1. **The full state cycle, like the other menus.** Today the fold is a flag flip. Write `data-state` on the aside through `opening` → `open`/`opened` → `closing` → closed, as Main Navigation's `animate.run()` does (`_js/nds-main-nav.js`, ANIMATION SYSTEM): `opening` drops on the next paint (`NDS.onNextPaint`), `opened` lands after the duration, reduced motion skips straight to the end state. Keep CSS tails off `[data-state]` (sass.md): descendants read a custom property or a mirrored class.
2. **A queue.** A press during a slide waits and runs after it (main nav's `pendingAction` + `processPending()`). Fold with a group open: close the open group first, then fold. Open from a group press: open the menu, then the group.
3. **Events**, once the cycle exists: past tense on the end state (PERSONA entry 8), e.g. `nds:sidemenu:collapsed` / `expanded`. Today the side menu fires none.
4. Open items from the first build:
   - Folded, the Scroll More "show more" arrow sits in the middle of the full-width list and is clipped away. Move it to the icon side while folded.
   - At 56px the icon is off center (21px start, 15px end).
   - The skeleton (`_sass/_skeleton.scss`) reserves the open width: a page stored folded jumps at the reveal. Check it with the throttled perf harness.
   - Only tested LTR. Check RTL (logical properties throughout).
   - A browser doc check (`node scripts/doc-check.mjs ui-shell/sidemenu.md`) has not run.
