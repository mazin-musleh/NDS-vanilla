# Top layer: popover and dialog

Owner decisions (2026-10-16): do it before v2.0.0 · speed is not the reason · Modal and Panel stay separate components that share one internal core · a major may change markup when the benefit beats the cost, with a Migration row · Main Navigation goes last.

**Verdict (2026-10-16).** Steps 1–3 before v2: Dropmenu and Tooltip; Modal on `<dialog>`; every Panel on `<dialog>`. Steps 4 and on are judged again, each on its own benefit and cost, once 1–3 have shipped.

**Start here (2026-10-16, afternoon).**
1. **Steps 1–3 are committed** (step 3: `9230e5bd`), plus the FAB tuck fix (`8883ca6c`) and the CSS guards (`0d59cab2`).
2. **Steps 4 and 5 are closed:** step 4 skipped, step 5 tested and reverted (see "Steps 4–5 judged"). `scripts/check-mainnav.mjs` stays as the nav's check. The playground prototype is removed.
3. **Test fast** (owner, 2026-10-16: an hour of testing was too long). Read the component's canon first; iterate in Chrome on one case; run `check-menus-in-modal.mjs`, `check-modal-dialog`-style cases, `check-init-destroy.mjs` and `check-frameworks.mjs` in both engines once at the end, in parallel. Minutes, not an hour.

**Owner's goals for the rest (2026-10-16):** simpler code, render perf, framework compatibility. Scored that way, steps 4 (FAB) and 5 (Main Navigation) carry the biggest framework win left: they remove `NDS.relocate`, which moves nodes the app owns and patches DOM methods. Judge them on those goals after step 3; measure perf before claiming it.

The demo is the "Popover and dialog: old vs new" section at the end of `playground.md`: five old-vs-new rows (clipping card, dark area, a listener on the box, Modal vs `<dialog>`, a Panel and a Modal over a modal Panel) with the working CSS for the popover reset, `@starting-style` open animations, the `.nds-card` reset on `<dialog>`, the phone bottom sheet and the Panel on `<dialog>`. Row 4's "Old" box now runs the real NDS Modal.

## Why

NDS moves menus, tooltips and FABs to `<body>` so nothing clips them. The browser's top layer (`popover`, `<dialog>`) does the same without the move. Measured in the `playground.md` demo (Chrome and WebKit):

| | Today | Top layer |
|---|---|---|
| A menu inside a clipping card | moves to `<body>` | stays in place, not clipped |
| A menu inside a dark area | opens light: the move loses `data-theme` (a bug today) | stays dark |
| A listener on the box around a menu | hears 0 item clicks | hears every click |
| Opening a menu, CPU ×6.6, median of 20 | 72 ms | 56–64 ms |

The speed gain is small: most of a click's cost is the page-wide handlers (`TODO.md`, the ~20 ms per click entry). The gains are the dark-area bug, normal events and `closest()`, natural Tab order, and the code it deletes: `NDS.portal`, `unportal`, `needsPortal`, the CSS-variable snapshot, `NDS.stackingZ`, the click re-dispatch, the `<body>` lookups, and most of `NDS.relocate`'s method patches.

## Order

1. **Dropmenu and Tooltip.** One change reaches about 12 components. `data-portal` and `data-no-portal` stop doing anything: removed in v2 with Migration rows.
2. **Modal on `<dialog>`.** `showModal()` makes the page behind `inert`. Today's `NDS.trapFocus` only keeps Tab inside: a screen reader's swipe or reading cursor still reaches the page behind the modal, an accessibility gap the dialog closes. It also removes Modal's own trap, its Escape handling and its Backdrop use. Migration row: `<div class="nds-modal" role="dialog" aria-modal="true" aria-hidden="true" hidden>` becomes `<dialog class="nds-modal">`, and the migration audit flags a leftover `div.nds-modal`.
3. **Every Panel on `<dialog>`.** One markup for the three kinds, `<dialog class="nds-panel">`: a modal Panel opens with `showModal()` (inert page, as Modal), a plain or static one opens with `show()`: no top layer, so it keeps `--panel-z` and stays under the main nav, as today. Proven in the playground (see Open decisions).
4. **FAB.** It stays where it is authored and floats in the top layer; NDS works out the stacking offsets. `.nds-fab-dock`, `data-fab-dock-pos` and `NDS.Fab.dock()` change: Migration rows.
5. **Main Navigation menus and drawer.** It is on every page and in the first paint. Popover replaces the open set, `closeAll()`, `handleDocumentClick`, the `[hidden]` dance and most of the 14 `overflow: unset` / `!important` overrides. More, phone mode, pinned items, wheel and drag scroll, and the fit shift stay.
6. **Side Menu (the phone drawer) and Image Popup Viewer.** Side Menu works like a Panel, the viewer like a Modal. With them moved, Backdrop has no user left.

## Backdrop

`_js/nds-backdrop.js` (about 200 lines, no doc page, no consumer markup) draws one shared dim layer, keeps a stack of owners, routes Escape and click-outside to the owner, and locks scroll through `NDS.scrollLock`. Users today: Modal, modal Panels, Main Navigation, Side Menu, Image Popup Viewer.

| Part | After the move |
|---|---|
| Dim layer | native `::backdrop` per dialog |
| Owner stack | native top-layer order |
| Escape | native on `<dialog>` |
| Click-outside | a few lines of JS (`closedby` is not in every browser yet) |
| Scroll lock | stays: `<dialog>` does not lock scroll; Modal and Panel call `NDS.scrollLock` directly: the first modal locks, the last to close unlocks (checked in the playground, both engines: holds under a stacked Modal, gives the scroll position back) |

After steps 2–3 Backdrop serves Main Navigation, Side Menu and the viewer only; after steps 5–6 it is deleted. No Migration row: nothing public names it.

**Stacked dim layers.** Each open dialog brings its own `::backdrop`, so a Modal over a modal Panel would show two layers. NDS keeps a list of open modals, marks every one under the top, and CSS sets the marked `::backdrop` to `opacity: 0`; Escape on the top one hands the dim layer back. Checked in the playground: it looks like today's one shared layer.

## Step 1 in detail: Dropmenu and its users (mapped 2026-10-16)

Today a menu stays in place unless an ancestor clips it (a modal, a table's scroll wrapper) or the wrapper has `data-portal`; only then it moves to `<body>`. Every user therefore handles two worlds, and Pagination, Filter, Sort and Tables carry code for the moved one. With a popover there is one world: the menu stays where it is authored.

**`popover="manual"`, not `auto`.** Autocomplete, Custom Select, Date Picker, Time Picker and Multiselect open from a field; `auto` would close on a click back into it. Dropmenu keeps its own outside-click and Escape rules, and the behavior does not change.

**`nds-dropmenu.js`.** Removed: `_decidePortal` and `_isClipped` (an ancestor style walk on every open), the `NDS.portal` call and the `PORTAL_VARS` snapshot, the `_stackZ` lift with `BASE_Z` and `NAV_Z`, the click re-dispatch, the second Escape listener on the menu, and the `position: absolute` branch of `applyPosition`. Changed: open and close call `showPopover()` and `hidePopover()` (close still waits for the transition: WebKit), Dropmenu adds `popover` at init so markup does not change, scroll tracking runs for every open menu, and the `%`-to-px width conversion runs on every open. Kept: keyboard, picker mode, search, `data-delay` with `nds:dropmenu:prepare`, `<template>` menus, the flip and clamp math. `from()` and `menuOf()` stay as public API.

| User | Change | Risk |
|---|---|---|
| Pagination | Its two click handlers read `e.ndsDropmenuItem \|\| e.target`; the click now arrives as it does for an in-place menu. `NDS.queryAll` and `NDS.closest` become plain DOM calls. Per-page picker and lazy ellipsis menu unchanged | Low |
| Filter | Four portal-aware lookups become plain DOM calls; menu fields stay inside their `<form>` | Low |
| Sort | `_resolveLike(deep)` and `_syncDropmenuTriggerIcon` become plain DOM calls | Low |
| Tables | `rowFor` and `rowToggles` drop the `_ownerDropmenu` / `_ownerMenu` walk | Low |
| Editor | `data-dropmenu-portal` does nothing; `menuOf` calls keep working; the focus and undo fix of `9f8e4409` can no longer regress | Low |
| Date Picker | Month and year menus nest inside the calendar menu: a closing menu must close the open menus inside it, or they float on in the top layer. `--dropmenu-width: 100%` needs the px conversion | Medium |
| Autocomplete, Custom Select, Multiselect, Time Picker | `manual` keeps their field behavior; their `%` widths need the px conversion | Low |
| Breadcrumb | Its menu CSS scoped under the breadcrumb now always applies | Gain |
| Share, Accessibility, Rating, Export | A `close()`, an `isOpen`, a class, plain lookups | None |
| Tooltip | Moves in the same step: it also calls `NDS.portal`, which goes only when both have moved | Medium |

**Core after the step.** Removed: `NDS.portal`, `NDS.unportal`, `NDS.stackingZ`, `_portaledCount` and the `<body>` sweep in `NDS.queryAll`, `NDS.querySelector` and `NDS.closest` (none of them documented). `NDS.relocate` stays for FAB and the pinned nav items until steps 4 and 5.

**Migration rows.** `data-portal` and `data-no-portal` (in `dropmenu.md` and about eight other pages), Editor's `data-dropmenu-portal`, and the click event's `ndsDropmenuItem` and `ndsDropmenuRedispatch`. The portal-safe menu styling rule in `AGENTS.md` shrinks to the `.nds-{component}-menu` naming.

**Size.** About three to four sessions: Dropmenu and its CSS, Tooltip, the users' lookup cleanup, Date Picker's nested menus, docs and audit and `AGENTS.md`, then every user in both themes in Chrome and WebKit, with `doc-check.mjs` on each page.

## Step 1 status (2026-10-16)

Committed (`c4b8a19a`): Dropmenu and Tooltip open with `popover="manual"` through `NDS.topLayer(el, on)`; core lost `NDS.portal`, `unportal`, `needsPortal`, `stackingZ`, `closest`, `queryAll` and `querySelector`; every user went to plain DOM calls; Custom Select lost its two back-references; Migration rows, docs, examples, `AGENTS.md` and the JS audit rules (JSA-19 retired) follow.

- **Sticky nav:** outside a modal (`.nds-modal, dialog:modal`) the menu keeps `respectNav` in its flip math. (The `_clipUnderNav` clip from this step was replaced by the close rule in "Step 1 follow-up".)
- **Nested menus:** `close()` closes the open menus inside it, or the date picker's month menu stayed in the top layer.
- **Tooltip:** it now inherits from where it is authored, not from `<body>`: the balloon resets `font-weight` and `text-align`.
- **Until step 2:** a Modal opened from a menu item sits under the closing menu for its fade (about 250 ms): the old Modal is not in the top layer.
- **Checked, Chrome and WebKit:** `check-dropmenu-placement.mjs` 16/16 (new cases: top layer, nav clip, nested close, dark area, bubbling), a sweep of 18 pages' menus and tooltips, `check-init-destroy.mjs` 36/36, `check-frameworks.mjs` all passed, `check-css.py` and `check-data-state-tails.py` clean, `check-docs.py` on the 9 edited pages, the audit flags a leftover `data-portal`.
- **Not run yet:** the menu-open timing against the old code, and `doc-check.mjs` on the touched pages (owner's go-ahead).
- **Done 2026-10-17:** `.claude/skills/nds-iq-eval/scenarios/S15-menu-clipping-in-modal.md` is rewritten for the top layer: a clip is diagnosed, and `data-portal` is now a MUST NOT.

## Step 1 follow-up: absolute, not fixed (2026-10-16)

Step 1 made every open menu `position: fixed` and moved it with JS on every scroll frame, plus a `clip-path` under the sticky nav. Before it, the default menu was `position: absolute` in its wrapper (`1cc022a8`, 2026-05-27): page scroll carried it with no JS. The top layer keeps that: an absolute popover's containing block is the page, so page scroll carries it. Proven in Chrome 155, WebKit 26.6 and WebKit 17.0, LTR and RTL, sideways scroll too.

- **Placement:** `@include top-layer` is `position: absolute`; `NDS.placeFixed` is now `NDS.place` (it measures and corrects, so it lands right for any containing block).
- **Scroll:** JS follows only a scroll box around the trigger (a table wrapper, a modal's content); page scroll is skipped.
- **Close rule (owner pick):** the menu closes when its trigger leaves view (`NDS.onIntersect` on the trigger: clipped by its scroll box or off screen) . `_clipUnderNav` is gone. The nav close was dropped 2026-10-17 (owner): it threw away a Filter's unapplied ticks on a small scroll, so the menu now rides over the nav, as Radix and MUI menus do.
- **Menus in a modal:** a closing Modal hides the popovers inside it, and Dropmenu closes itself when something else hides its menu (`toggle`).
- **Checked:** `check-dropmenu-placement.mjs` 17/17 (new: page scroll moves the menu with no script write; the menu closes at the nav), `scripts/check-menus-in-modal.mjs` (custom select, date picker + month menu, time picker + hour select, multiselect, autocomplete and dropmenu in a scrolling Modal), desktop and phone, Chrome, WebKit 26.6 and 17.0, all passed; `check-init-destroy.mjs`, `check-frameworks.mjs` and the modal harness both engines; tooltip placement at 7,000px scroll.
- **Later:** CSS anchor positioning would follow inner scroll boxes natively too; it needs Safari 26, so it waits for that floor.

## Step 2 status (2026-10-16)

Committed (`48117ef7`): `.nds-modal` is a `<dialog>` opened with `showModal()`. Modal lost `NDS.trapFocus`, its Backdrop use and `aria-hidden`/`hidden` writes; a div logs an error. Markup moved in the doc canons, examples, life-journey templates, `mainnav.html`, Session Timeout and the check fixtures. Migration row: `div.nds-modal` (scope `&div`); the migration CSS scan skips a class row with a bare element scope, so `.nds-modal` in a site's CSS is not flagged.

- **Fade:** JS keeps `data-state` open/closing and calls `close()` after the fade, so both engines animate out (no `overlay`).
- **Escape:** a keydown listener on the dialog (not document) closes it, so a menu inside that stops Escape keeps the modal open; `cancel` is prevented as a backstop, and Dropmenu's Escape now also calls `preventDefault()`. A native close (`<form method="dialog">`, Chrome's repeat Escape) syncs through a capture `close` listener.
- **Click outside:** pointer down and up both outside the box, so a text selection dragged out does not close it.
- **Scroll lock:** `NDS.scrollLock` is counted now (each `lock()` needs its `unlock()`); Backdrop unlocks only a lock it took.
- **Until step 3:** a Modal over a modal Panel or the open nav marks `.nds-backdrop` with `data-nds-under` (opacity 0), so the page shows one dim layer; Backdrop skips an Escape a Modal already handled (`defaultPrevented`).
- **Static checks:** `check-css.py`, `check-data-state-tails.py`, `check-docs.py components/modal.md` clean; `js_processor.rb` built.
- **Safari focus:** WebKit does not focus a clicked button, so Escape after a click on a menu trigger came from the page or the dialog and closed the modal under an open menu. Dropmenu now also hears Escape on `document` (capture) when focus sits outside every open menu, and closes the newest one. With no focused opener, focus is not handed back after close in Safari, as before.
- **Browser checks, Chrome and WebKit:** `check-dropmenu-placement.mjs` 16/16, `check-init-destroy.mjs` 36/36, `check-frameworks.mjs` all passed, `doc-check.mjs components/modal.md` no findings, and a one-off modal harness (open, fade, Escape, click outside, drag out, static, a menu inside, swap, over a modal Panel, `<form method="dialog">`) all passed. The playground's prototype script now skips `.nds-modal` dialogs: its click-outside closed the row-4 modal natively.
- **Step 3 note:** done in step 3 (`_js/nds-dialog.js`).

## Step 3 status (2026-10-16)

Committed (`9230e5bd`): `.nds-panel` is a `<dialog>`. A plain or static panel opens with `show()` and keeps `--panel-z` under the main nav; a modal one opens with `showModal()` and runs full height over the nav (`--_panel-top: var(--panel-top, 0px)` on `:modal`). Panel lost its Backdrop use, `NDS.trapFocus`, the `covered` state and every `hidden` write; any other element logs an error. Markup moved in the doc canons (Panels, FAB, Cookies, Accessibility), Student Portal, the playground, `docs_canon.rb` (builder stage and options panels), the cookie and accessibility scripts, the `check-frameworks.mjs` fixture and `mkrelease.py`'s accessibility canon check.

- **Shared core:** `_js/nds-dialog.js` (`NDS.dialog`, internal, delegated bundle before Modal): `show()` / `close()` keep the list of open modal dialogs, the scroll lock from the first to the last, the `data-nds-under` mark on every one under the top (CSS hides its `::backdrop`), and prevent the native `cancel`; `onOutside()` is the down-and-up dim-layer click; `hideMenus()`. Open, the fade or slide, events and the static option stay in each component: Panel's stack, swap and parking share nothing with Modal.
- **The `.nds-backdrop` stopgap stays, moved into the core:** Main Navigation, Side Menu and the viewer still dim through Backdrop, so a dialog above hides that layer until steps 5–6.
- **Over a modal:** a panel the user opens while a modal dialog is open opens modal too, or it would sit under the inert page. One the page opens with `{ focus: false }` (the cookie panel at idle) stays plain and under it, as before; the first build promoted it over an open Modal, caught by the new check.
- **Focus:** `show()` moves focus into the dialog, so a `{ focus: false }` panel hands it back.
- **Native close:** `<form method="dialog">` or Chrome's repeat Escape fires `close`; Panel syncs its state and stack.
- **Migration row:** `nds-panel` with scope `&:not(dialog)`; the audit's CSS scan now also skips an `&:not(element)` scope. The nav dimming behind a modal panel is said in that row's fix text: migrations.yml has no behaviour kind, so the release notes must carry it too.
- **Checked, Chrome and WebKit:** new `scripts/check-dialogs.mjs` (39 cases: plain, static, modal, swap, Escape, outside click, `method="dialog"`, `{ focus: false }`, Modal over a modal panel, panels over a modal, Modal swap, destroy, a non-dialog panel; lazy panels from a `<template>`, plain and modal; the cookie panel at idle; the Accessibility panel built on its first press) all passed; `check-menus-in-modal.mjs`, `check-init-destroy.mjs`, `check-frameworks.mjs` both engines and `check-dropmenu-placement.mjs` passed; `check-css.py`, `check-data-state-tails.py`, `check-docs.py` on the four pages clean; the accessibility canon matches `panelMarkup()`.
- **Slide on the compositor:** the panel's open rule was `transform: translate(0, 0) !important`, and Chrome runs an animation on an `!important` property on the main thread only (trace `Animation` event, `compositeFailed: 262144` = affects an important property). On a phone at CPU ×6.6 the slide was choppy next to the prototype. Each side's mixin now writes its own open transform with no `!important`; the trace shows no composite failure, longest task 29 ms vs the prototype's 25 ms (was 111 ms). Harness: CDP tracing with `blink.animations`, `devtools.timeline`, `blink.user_timing`; read the `Animation` events' `compositeFailed` and the main thread's `RunTask` durations.
- **Not run:** `doc-check.mjs` on the four pages (owner's go-ahead), a phone run, older WebKit.

## Steps 4–5 judged (2026-10-16, owner's call pending)

Scored on the owner's goals: simpler code, render perf, framework compatibility.

- **The plan's premise was wrong for step 5.** Main Navigation's `NDS.relocate` moves pinned items into the minimal bar on narrow screens (`managePABPlacement`): a layout move, not a clipping escape. Popover does not touch it, so step 5 removes no `relocate`.
- **Step 4 (FAB) in the top layer paints over everything opened before it, and z-index cannot lower it.** Today the dock sits at 899: under plain panels (999), the cookie sheet and the main nav (1000). In the top layer a corner FAB would cover a bottom sheet's buttons, the cookie sheet and the phone nav drawer. Keeping FABs in place without the top layer (`position: fixed` where authored) needs new JS for the stacking offsets of several FABs, and breaks under a transformed ancestor. `NDS.relocate` works today: `check-frameworks.mjs` passes in both engines.
- **Step 5 (Main Navigation) on `popover="auto"`:** would replace the open set, `closeAll()`, `handleDocumentClick` and some of the 14 `!important` / `overflow: unset` overrides, and could drop the nav's Backdrop use. No render gain: the desktop dropdown and the phone drawer already animate on the compositor (traced 2026-10-16). Risk is the highest in the plan: first paint, the timed dropdown swap (`_scheduleDropdownOpen`), phone mode, more, pinned items.
- **Recommendation:** skip step 4 (keep the dock and `relocate`); defer step 5 past v2.0.0, or do it only as a code-simplification pass with its own plan.
- **Step 5 tested (2026-10-16, owner asked for a test, not a judgement).** Built in the working copy: every floating nav menu (desktop menus, the phone's pinned-bar and actions menus) opens as `popover="manual"`; the drawer's own list keeps its inline accordion. New `scripts/check-mainnav.mjs` (16 cases, `destroy()` with a menu open among them: placement under the bar, full width, `.nds-fit` under its trigger, on top, dim layer, swap, page scroll, outside click, the search field, phone pinned menu, drawer, drawer accordion) passed before and after, Chrome and WebKit.
  - **Code:** JS +28 lines net (lift/lower, `--_menu-top` measure, a scroll listener so the menu follows the sticky bar), SCSS −2 net (the menus' z-index ladder entry, `position: fixed !important` ×2 and `position: absolute !important` go; a `[popover]` reset comes in). The open set, `closeAll()`, `handleDocumentClick`, the `[hidden]` dance, the animation system and the Backdrop all stay: `manual` popovers keep NDS's timed swap and Safari's close animation, and the drawer accordion still needs them.
  - **`data-nav-open` stays:** with the nav always clipped, Chrome sent drawer taps to the dim layer (WebKit was fine).
  - **Speed:** click cost at CPU ×6.6, 3 runs: desktop menu 120–208 → 144–176 ms, phone pinned menu 104–160 → 144–200 ms, drawer 120–144 → 120–136 ms. No gain.
  - **Look:** screenshots match, and the menu, its content and its first item measure the same before and after.
  - **Verdict (reverted 2026-10-16, benefit vs cost):** not worth it as built: more code, no speed, no framework gain. The only path to real deletions is `popover="auto"` (native one-open-at-a-time and outside click), which drops the timed swap and Safari's close animation, while the drawer accordion keeps the JS anyway.

## Modal and Panel: one core

Two public components with their own uses and options; the markup and API do not merge. Inside, one shared helper owns open, close with the exit animation, the scroll lock, the events and the static option. The browser owns the top layer, Esc, click-outside, the backdrop, the focus trap of a modal and the focus return.

## Open decisions

- **Modal markup:** decided 2026-10-16, `<dialog>` (step 2): a major may change markup, and the inert page is an accessibility fix the `<div>` cannot give.
- **`popover` on `<dialog>` with `showModal()`:** proven 2026-10-16, same results in Chrome and WebKit, no page errors. One `<dialog>` opens as a popover or with `showModal()`, and the stacked look matches today's one dim layer. Findings for step 3:
  - Plain and static Panels open with `show()`, not `popover`. A popover is in the top layer and painted over the main nav's open menu (z-index cannot reach it); `show()` kept the nav menu on top, as today. `popover="auto"` also closed the Panel when a Modal opened from it; `show()` does not.
  - `show()` gives no Escape and no click-outside: Panel keeps its own rules for a plain Panel. `<form method="dialog">` does close it.
  - A plain Panel's top edge carries over: `updateHeaderOffset` (`NDS.stickyHeaderBottom()` on open and scroll) works on a `<dialog>` unchanged. Checked with the topbar showing and after a scroll, both engines: it starts at the header's bottom (112 px, then 72 px), never under it.
  - A plain Panel gains nothing from the top layer: it never moved to `<body>`. The top layer is for modal Panels only.
  - **A modal Panel covers the main nav** (decided 2026-10-16, to keep it simple). `showModal()` dims and blocks everything outside the dialog; today the dim layer sits under the nav (998 vs 1000) and the nav stays live. So a modal Panel goes full height, `inset-block-start: var(--panel-top, 0)`, with no header offset. Migration row: the nav dims behind a modal Panel.
- **Layer order:** a top-layer element covers everything outside it, Main Navigation and the cookie banner too. Plain Panels stay out of it (`show()`). Step 1 must check an open menu scrolled up under the sticky nav: today its z-index (998, `BASE_Z`) keeps it under the nav's 1000; in the top layer it paints over. Close it or clip it when its trigger goes under the nav, and keep `respectNav` in the flip math for every menu outside a modal.

## Known costs

- Safari 17 and Firefox 125 or newer. Older browsers get a menu that can clip; nothing breaks.
- Close animations: `overlay` is Chrome only, so WebKit drops the element at once. Keep the JS `closing` state, as today.
- Position: Dropmenu keeps its own JS placement (flip, clamp, cursor anchor, max-height) for every menu, written as `position: absolute` coordinates in the top layer (`NDS.place`). CSS anchor positioning (`position-area`, Safari 26 and later) only placed the demo's menus; it cannot clamp a list's height, so it is not the production path.
- `.nds-card` overrides the dialog's `position`, `margin` and closed `display`: a reset ships with the dialog.
- A `<form method="dialog">` inside a card needs `nds-form`, or the card loses its layout.

## Older Safari (tested 2026-10-16)

The demo ran on WebKit 17.0, 17.4, 18.0 and 26.6: the WebKit builds of Playwright 1.38.1, 1.44.1, 1.48.2 and the repo's own. Each older `playwright-core` sits in its own folder, and its `cli.js install webkit` fetches the matching build. This is the WebKit engine on Windows, not Apple's Safari app: good for CSS and DOM support, not for every Safari quirk.

| | 17.0 | 17.4 | 18.0 | 26.6 |
|---|---|---|---|---|
| Menu opens, not clipped, under its button | yes (JS) | yes (JS) | yes (JS) | yes (CSS) |
| Menu and dialog fade in, sheet slides up | no, they appear at once | yes | yes | yes |
| Dialog centered; phone bottom sheet | yes | yes | yes | yes |
| Esc and the `method="dialog"` buttons close it | yes | yes | yes | yes |
| Close animation without JS | no | no | no | no |
| Page errors | none | none | none | none |

So 17.0 is a working floor: the open animations need `@starting-style` (17.4 and later), and anchor positioning needs 26, below which the JS fallback places the menu 4 px under its button. Before v2 ships, one real-device pass on Safari and iOS (a cloud device service) signs it off.

## Checks per step

`doc-check.mjs` on each touched page (both themes), `check-frameworks.mjs` and `check-init-destroy.mjs`, a WebKit run, and the menu-open timing against the old code.

**Harnesses.** The three one-off harnesses behind this plan lived in `tmp/`, which is disposable; rebuild them from these notes when a step needs them.
- **Menu-open timing:** Playwright `locator.click()` (it waits for a smooth scroll to settle; a raw `mouse.click` misses under throttling), CPU ×6.6 through CDP `Emulation.setCPUThrottlingRate`, Event Timing entries (`type: 'event'`, `durationThreshold: 16`) grouped by `interactionId` with the slowest entry as the interaction, 20 runs interleaving old and new, every menu closed by script between runs, and a check that each click really opened its menu. Remove `#nds-cookies-panel` first: it covers the lower rows.
- **Older WebKit:** `npm install playwright-core@1.38.1` (WebKit 17.0), `@1.44.1` (17.4) or `@1.48.2` (18.0) into its own folder, then `node node_modules/playwright-core/cli.js install webkit`; import that folder's `playwright-core` and run the same page checks.
- **Close animation frames:** set `--nds-transition-speed` to `2` on `<html>`, close the dialog or popover, and screenshot at 0, 250, 500, 1000 and 1500 ms in Chrome and WebKit.
