# NDS Vanilla — Template folder

NDS is used in one of two modes:

- **Scaffold mode** — the dev is authoring static HTML pages *inside this folder*, composing them from the built docs under `_site/`. **This file (`AGENTS.md`) is for scaffold mode.**
- **Reference mode** — the dev has an existing project (Rails, Next, Django, Laravel, ASP.NET, plain PHP, etc.) and this folder sits alongside it as a read-only reference. See `INTEGRATION.md` instead — it contains a copy-paste prompt block the dev pastes into their own project's `AGENTS.md` / `CLAUDE.md`.

A pre-built, framework-free design system. Plain HTML, CSS, and JS — no React, no Vue, no build step required to use it.

## Four hard rules

1. **Never read `*.min.js` or `*.min.css`.** They are opaque. Read the matching file in `_source/` instead. To explain accordion behavior, read `_source/_js/nds-accordion.js` — not `_site/assets/js/nds-delegated.min.js`.

2. **Copy canonical markup verbatim — never invent it.** Every component page at `_site/components/<name>.html` has a `lang-html` code block with the exact HTML to copy. Class names, nesting, `data-*` attributes, and ARIA roles all matter — inferring markup from memory breaks the component.

3. **All page content lives inside sections, laid out with NDS primitives.**
    - Wrap every content block in `<section class="nds-content-section">` (with its `.nds-section-wrapper` / `.nds-section-head` / `.nds-section-body` structure).
    - Every section lives inside `.nds-content-layout > .nds-main-content`.
    - Inside a section body, compose with NDS layout primitives — `nds-grid` (responsive columns), `nds-flex` (ad-hoc alignment), `nds-block` (titled sub-groupings). No Bootstrap columns, no custom `display:flex` wrappers.
    - Read `_site/layout/section.html` before authoring any page — it defines tiers, action placement, image slots, and full-width breakout options.

4. **Style via knobs and tokens first — reach for `.nds-*` overrides only as a last resort.** Every NDS component exposes CSS custom properties for tuning. Use them in this order:
    - **Component knobs** on individual elements — for per-instance tuning (`--btn-size`, `--section-*`, `--hero-*`, etc.). Set inline (`style="--btn-size: 40px"`) or via your own scoped class. Read `_source/_sass/components/_<name>.scss` to see what knobs each component exposes (search for `var(--` lines).
    - **Design tokens** at `:root` — for whole-system re-theming (change primary color everywhere). Rebind semantic tokens like `--background-primary` in a stylesheet loaded AFTER `nds-main.min.css`. Full set in `_source/_sass/tokens/_semantic.scss`.
    - **`.nds-*` selector overrides** — only when the above genuinely don't cover the need. Keep the override scoped (nested under your own class or `[data-*]`), document why the knob/token path wasn't enough, and be aware: `.nds-*` class names are internals, they may shift between releases, and overrides fight NDS's own state cascade (`data-state`, `:hover`, dark-mode, RTL) — bugs from that often only appear on specific states, not on first render.

## Composition cascade — for any page

Prefer official over custom, in this order:

1. **Match a DGA page template?** Use it as-is. `_source/_data/content/templates.yml` catalogs DGA-official full-page templates (Service, Form, Contact, Content, Help & Support, About Entity, FAQ, e-Participation, and more — every entry tagged `DGA`). Copy the whole page from `_site/templates/<name>.html`, swap only the placeholder content. Never re-compose your own version — the templates encode structural decisions (side-info placement, breadcrumb slots, hero variant, tab layout) a hand-composed page will get subtly wrong.
2. **No DGA match?** Check `_source/_data/content/examples.yml` + `_site/examples/*.html` for a closest-fit composition — dashboards, service listings, editorial hubs, patterns DGA doesn't cover.
3. **Nothing matches?** Scaffold custom, but stay inside rule #3's structure. Study DGA templates and examples for wiring patterns to reuse — how side-info wires to breadcrumbs, how forms space grouped fields, how `nds-block` sub-groupings compose. Recognizable NDS structure beats invented structure.

For individual components, always check `_source/_data/content/components.yml` first — ~90 components ship. Use a close variant even when its name doesn't obviously match what the dev asked for.

## Where things live

```
CHANGELOG.md              — release history
LICENSE                   — license terms
AGENTS.md                 — this file (scaffold mode)
CLAUDE.md                 — pointer that imports AGENTS.md for Claude Code
INTEGRATION.md            — reference-mode setup, for integrating NDS into a host project
_site/                    — the built documentation site + assets
    index.html            — home
    components/*.html     — one page per component, with canonical markup
    ui-shell/*.html       — head, header, topbar, footer, hero, sidemenu, sideinfo
    layout/*.html         — section, grid, flex, block (see rule #3)
    templates/*.html      — full-page DGA templates (see rule #4)
    examples/*.html       — composed real-world pages
    utilities/*.html      — helper class docs
    assets/
        css/nds-main.min.css     — the only stylesheet a page needs
        js/nds-main.min.js       — the only script tag a page needs
        js/nds-delegated.min.js  — lazy-loaded by the loader, do NOT hand-add
        js/nds-extras.min.js     — lazy-loaded by the loader, do NOT hand-add
        fonts/, icon/, img/, data/, i18n/
_source/                  — readable source behind the minified bundles
    _js/nds-<name>.js               — behavior for each component
    _sass/components/_<name>.scss   — styles for each component
    _sass/tokens/                   — design tokens (four tiers, see below)
    _sass/_mixins.scss              — shared mixins
    _data/content/
        components.yml              — catalog of every component (~90)
        templates.yml               — full-page DGA templates
        examples.yml                — composed example pages
        icons.yml                   — curated inline icon set
```

## Authoring a new page — quick recipe

1. Pick a starter from `_site/templates/` (DGA-official) or `_site/examples/`. Copy the whole file to a new name at the folder root.
2. Change `<title>`, `<meta name="description">`, and the sub-hero front matter (`hero_title`, `hero_description`, `breadcrumb`) to your content.
3. Swap the section-body content only. Never hand-write the `<head>` — the FOUC guards, deferred CSS preloads, and icon-gate script are load-bearing.

## Quick facts the docs assume

- **RTL is the default.** `<html dir="rtl" lang="ar">` for Arabic, `<html dir="ltr" lang="en">` for LTR. Styles use CSS logical properties — direction flips from that single attribute, no separate stylesheet.
- **Dark mode** flips via `data-theme~="dark"` on `<html>`. No rebuild.
- **One stylesheet + one script.** `nds-main.min.css` + `nds-main.min.js`. The main script embeds `window.__NDS_BUNDLES` and its loader lazy-injects `nds-delegated.min.js` and `nds-extras.min.js` on demand — never hand-add either.
- **Never preload `nds-icons.min.css` or the icon-font stylesheet.** Icons are gated behind an FOUC guard that lifts when the loader stamps `data-nds-icons-loaded` on `<html>`; preloading trips the gate.

## JS integration — go through the API, not around it

Many NDS components ship rich programmatic APIs and DOM events. **Wire your code THROUGH them, not around them.** Hand-writing listeners on `.nds-*` elements or mutating their state directly reimplements (badly) what NDS already ships — and drifts on every upgrade.

**Rule:** before adding any `addEventListener` on a `.nds-*` element, or mutating any `data-state` on a NDS component, grep the component's source in `_source/_js/nds-<name>.js` for:
- `NDS.<Name> = {` — the public surface (methods to call).
- `dispatchEvent(new CustomEvent('nds:` — the events to listen for.

There's almost certainly a documented method or event to hook into instead.

**Concrete examples that make the rule real:**

- **AJAX filter →** listen for `nds:filter:change`; fire your fetch off `event.detail.criteria` (not off individual inputs — they race with async-populated `<select>`s). Bind via `NDS.Filter.whenReady(container, cb)` — the filter may init before your listener attaches.
- **Server-driven pagination →** don't rebuild the nav on each AJAX response. Call `NDS.Pagination.updateRecords(listId, { from, to, count })` — the nav re-renders itself.
- **Programmatic form-field writes →** setting `input.value = …` from JS does NOT fire `input`/`change`, so the clear button, validation chrome, and radio-group paint go stale. Call `NDS.Forms.syncState(input)` after any programmatic write. After swapping a whole form region's HTML, call `NDS.Forms.initializeContainer(el)` or new inputs stay inert.
- **Custom submit gate →** `NDS.Forms.validateForm(form)` runs full validation synchronously; call from your submit handler to short-circuit an AJAX submit when invalid.
- **Bilingual JS →** read `NDS.isRTL` / `NDS.lang` — don't parse `<html dir>` yourself. Media queries: `NDS.breakpoints.desktop` / `.mobile` are the exact strings NDS uses. String tables: `NDS.i18n.load('componentName', scope)` + `data-i18n="key"` works for your own bilingual widgets too.

**Reinitialization** (after any dynamic DOM change that adds NDS markup): `NDS.<Component>.reinit()` (whole-page rescan) or `NDS.<Component>.create(el)` (single instance). Both idempotent.

`NDS.cache` writes to `localStorage` with the `nds_` prefix. Clear those keys from DevTools when debugging a stale render.

## Design tokens (in `_source/_sass/tokens/`)

Four tiers, one file each. Light block at top, `:root[data-theme~="dark"]` block at bottom of the same file.

1. **Palette** (`themes/_dga.scss`, vendored) — raw color ramps, no meaning.
2. **Primitives** (`_primitives.scss`) — dimension vocabulary: `--spacing-md`, `--radius-sm`, typography rungs.
3. **Semantic** (`_semantic.scss`) — one name per meaning: `--background-primary`, `--text-oncolor-primary`. Rule #4 rebinds these at `:root` for whole-system theming.
4. **Component** (`_components.scss`) — per-component dials: `--{component}-{property}-{variant}-{state}`.
