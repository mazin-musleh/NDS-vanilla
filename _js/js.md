# JS

The `data-state`/`data-status` flag rule lives in `_sass/sass.md` (SCSS Standards) and applies to any flag this JS writes on `<html>`/`<body>`.

## Server Calls in Components

**A component is UI plus an event API; a built-in server call is an optional shortcut.** It is fine when it is simple and never limits usage: the events and methods must do everything the call does, so a developer with CSRF, custom headers or their own client skips it (Session Timeout: `data-session-extend` is the shortcut; `nds:session:extend` + `end()`/`reset()` is the full path). A bug in the call is a bug to fix, not a reason to remove it.

**A key NDS sends to a server or writes to the URL is one the author wrote** (`data-filter`, an input's `name`), or a fixed suffix on one (a range's `{name}-min`), never one NDS invents; its encoding is the form's own, and the URL and the request are the same query. The event API stays the way to send anything else. `scripts/check-filter-server-mode.mjs` fails when Filter's request and URL differ.

## Framework Hosts

**NDS is plain HTML, CSS and JS, and a consumer can integrate it into any stack: a plain page, a server-rendered app, or a framework such as React, Vue or Angular. Judge every component and API change against all of them, never against how this repo's own pages use it.** A framework host mounts and unmounts views, rebuilds nodes, and keeps state in its own code. `core/init.md` → Framework Views is the contract the consumer follows: `NDS.init.mount(view)` after mount, `NDS.init.destroy(view)` before unmount.

- **The instance lives on the element.** `el.nds{Name}`, with a `destroy()` that drops its stamps: `NDS.init.destroy()` finds instances by that backref. No module-level registry keyed by id or selector. It outlives an unmounted node, and a reused id resolves to the dead instance.
- **`create(el)` stands alone.** A view mounted after load gets everything `init()` wires (document listeners, observers), not just an instance.
- **State round-trips.** What a component reports in its events can be written back through its `data-*` hooks and restores the same look after a re-mount (Stepper: `currentStep` ↔ `data-current`).
- **A change to an observable value is breaking** (event detail, return value, a `data-*` the script writes), even when every page here still works. It ships in a major with a Migration line, or takes an additive path. Before changing one, `git log -S` the code and read why it is that way.

`nds-js-audit` checks the first three as JSA-23 (the first two in full-tree runs too) and gates the fourth in its shared rule conventions.

## Writing JS

**Every `_js/` change follows `.claude/skills/nds-js-audit/PERSONA.md`, not only a new component.** Read entries 10 (method names) and 12 (every name) before you name a function, method or local. `js_processor.rb` fails on a naming finding: it catches a slip, it is not where the rule is learned.

## Shared Logic

**Shared JS sits in one of three layers, and a lower layer never names a higher one: core ← base ← component.** PERSONA entry 11 holds the reasons; `plans/shared-logic.md` migrates today's tree.

- **Core** (`nds-core.js`): page-wide utilities that know no component.
- **Base**: one job a family shares, with no UI of its own (`NDS.dialog` serves Modal and Panel). **It lives with its callers:** in their bundle when they all share one, else in main, so no caller ever meets its stub; and it is listed before every file in its bundle that names it. **A base creates no markup and shows no message:** it may write state and attributes, but it returns data, and the component that called it renders.
- **Component**: has a root class or a loader entry. The loader sits beside core and names components only through its registry.
- **Where a shared piece goes, first yes wins:** one component's contract → that component's API, if it loads no later than every caller; a family's job with no UI → a base; it knows no component, two or more files call it and it passes JSD-05's body gate → core; otherwise keep the copies. The two-caller bar is for promotion into core, never for eviction from it.
- **Bundles.** Main runs first. The injected bundles land in parallel, in no order, and before one lands `NDS.X` is a stub whose every property is truthy, so `?.` cannot see it. A callee loads no later than every caller that uses its result synchronously; a call between two injected bundles ignores or awaits its result, or carries the one-line stub check with its comment.
- **Guards.** Never guard a namespace in main: NDS serves its bundles as built, so it is always there. Only an opt-out bundle (accessibility, cookies) is guarded by its callers.
- **Undo.** What `create()` stamps on an element that outlives the instance, `destroy()` removes, and only that.

## JS Bundles & Shrinking the Critical Bundle

**Bundles, location owned by the build** (`@bundles` in `_plugins/js_processor.rb`): `nds-main.min.js` (a `<script defer>` — **gates the page reveal, keep lean**), `nds-delegated.min.js` + `nds-extras.min.js` + single-component chunks for big leaves nothing calls (`nds-editor`, `nds-chart`, `nds-code`) — all loader-INJECTED *after* the reveal, never gating it, and `nds-audit.min.js` (never auto-injected at all — pulled by the `enableLogging` sweep or the first `NDS.init.audit()` call, so a production page ships zero audit bytes). The loader reads `window.__NDS_BUNDLES` (namespace→bundle, build-generated) — **never hardcode bundle membership in JS**. Run `ruby _plugins/js_processor.rb` after any `@bundles` or `_js/` change.

**To move init-unnecessary code off the reveal-gating path — de-criticalize + move (wholesale).** For a component that is *delegate-safe*: markup + always-loaded CSS paint it correctly with JS deleted (JS owns behavior, not first paint). Public usage (`NDS.X.method()`) stays unchanged via the loader's lazy proxy stub.
- Server-render any state JS stamps at first paint (e.g. accordion default-open ships `data-state="open"` on the button **and** the collapse so CSS paints it expanded — no JS, no CLS).
- Drop `critical: true` from its `_js/nds-loader.js` registry entry.
- Move its file from the main list to the delegated list in `@bundles`.
- Clicks in the pre-bundle gap no-op and recover on the next click (the Tabs/Tables pattern). Precedents: **Accordion**; **Filter + Pagination** (2026-06-11).
- State that only exists at runtime (e.g. filter URL params) can't be server-rendered — hold the region in blocking crit instead, the `data-nds-loaded` pattern per container: a crit rule keeps each `[data-filter-items]`/`.nds-paged-content` region `visibility: hidden` until **its own** init stamp lands (`data-nds-filter-initialized`/`data-paged-initialized`). Self-releasing, zero JS beyond the stamp the component already writes.
- Pre-init layout reservations belong in the component's **own main CSS**, keyed on its init stamp (e.g. pagination's empty-nav `min-height` until `data-paged-initialized`) — never mirrored into crit (the old crit skeleton doubled crit doing exactly that; read it at `git show 3b8fb0a5^:_sass/_skeleton.scss`, the commit that deleted it).

**Don't split a component into eager-shell + lazy-behavior halves.** A per-component split (a `nds-X__delegated.js` half grafted onto an eager shell via `_installBehavior`/trap stubs + `loadSplit`) was built for Filter/Mainnav/Stepper/Pagination and **removed 2026-06-04**: it saved only ~3 KB gz off main — which the reveal isn't byte-bound on — at the cost of a pre-attach promise-vs-sync gap and ~330 lines of mechanism + build guards + docs. If a `critical` component has init-unnecessary behavior, keep it in main and run that behavior **on interaction with cold-init** (cheap registration at init, no forced layout); wholesale-defer instead only if it's genuinely delegate-safe.

**Build guard fails on violation** — a `critical` component's code can't ship in an injected bundle (`assert_no_critical_in_injected!`): fix by dropping `critical: true` or moving the file back to the main list.

**Keep EAGER (never defer):** anything affecting first paint (CLS-prevention state stamps, FOUC-guard removal), the component's PRIMARY interaction, or a synchronous cross-component API (e.g. `NDS.Form.validate` is read synchronously at submit). Defer only secondary/late paths.
