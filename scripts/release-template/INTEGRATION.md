# Integrating NDS into an existing project

Use this file when you are adopting NDS inside a host system (Rails, Next, Django, Laravel, ASP.NET, plain PHP, static site generator, etc.). The NDS folder sits **alongside** your project as a read-only reference — your LLM never edits it. You copy markup, class names, tokens, and asset files OUT of it into your own codebase.

## Setup — one time

1. Place this template folder somewhere your project can reach (a sibling directory, a `vendor/` subfolder, a shared reference location, etc.).
2. Note the **absolute or relative path** to this folder. Examples: `/Users/dev/design/nds-vanilla-template-v1.5.0/`, `../nds-vanilla-template-v1.5.0/`, `vendor/nds/`.
3. Copy the fenced block below into your project's own `AGENTS.md` (Cursor / Aider / Codex) or `CLAUDE.md` (Claude Code). Replace **every occurrence of `{{NDS_PATH}}`** with the path from step 2.

That's it. Your LLM will now know NDS exists, where its source lives, and the rules for using it correctly.

## Snippet — copy the fenced block into your project

Copy everything between the `COPY START` and `COPY END` markers below. Paste it into your project's `AGENTS.md` or `CLAUDE.md`, then find-and-replace `{{NDS_PATH}}`.

<!-- ═══════════════════════ COPY START ═══════════════════════ -->

```markdown
## Design system — NDS Vanilla

This project uses the National Design System (NDS) for UI. The full template sits at `{{NDS_PATH}}` — a read-only reference. Do NOT edit anything under `{{NDS_PATH}}`. Copy what you need OUT of it into this project.

### Seven hard rules

1. **Never edit anything under `{{NDS_PATH}}`.** It is a read-only reference. If the dev needs to change NDS itself, flag it and stop — that's a separate conversation.

2. **Never read `*.min.js` or `*.min.css`.** They are opaque. Read the matching file in `{{NDS_PATH}}/_source/` instead.

3. **Copy canonical markup verbatim — never invent it.** Every component page at `{{NDS_PATH}}/_site/components/<name>.html` has a `lang-html` code block with the exact HTML to copy. Class names, nesting, `data-*` attributes, and ARIA roles all matter — inferring markup from memory breaks the component.

4. **All page content lives inside sections, laid out with NDS primitives.**
    - Wrap every content block in `<section class="nds-content-section">` (with its `.nds-section-wrapper` / `.nds-section-head` / `.nds-section-body` structure).
    - Every section lives inside `.nds-content-layout > .nds-main-content`.
    - Inside a section body, compose with NDS layout primitives — `nds-grid` (responsive columns), `nds-flex` (ad-hoc alignment), `nds-block` (titled sub-groupings). No Bootstrap columns, no custom `display:flex` wrappers.
    - Read `{{NDS_PATH}}/_site/layout/section.html` before authoring any page — it defines tiers, action placement, image slots, and full-width breakout options.

5. **Style via knobs and tokens first — reach for `.nds-*` overrides only as a last resort.** Every NDS component exposes CSS custom properties for tuning. Use them in this order:
    - **Component knobs** on individual elements — for per-instance tuning (`--btn-size`, `--section-*`, `--hero-*`, etc.). Set inline (`style="--btn-size: 40px"`) or via your own scoped class. Read `{{NDS_PATH}}/_source/_sass/components/_<name>.scss` to see what knobs each component exposes (search for `var(--` lines).
    - **Design tokens** at `:root` — for whole-system re-theming (change primary color everywhere). Rebind semantic tokens like `--background-primary` in a stylesheet loaded AFTER `nds-main.min.css`. Full set in `{{NDS_PATH}}/_source/_sass/tokens/_semantic.scss`.
    - **`.nds-*` selector overrides** — only when the above genuinely don't cover the need. Keep the override scoped (nested under your own class or `[data-*]`), document why the knob/token path wasn't enough, and be aware: `.nds-*` class names are internals, they may shift between releases, and overrides fight NDS's own state cascade (`data-state`, `:hover`, dark-mode, RTL) — bugs from that often only appear on specific states, not on first render.

6. **No legacy libraries — build clean on NDS + vanilla JS.** jQuery, Bootstrap, jTables/DataTables, Select2, Summernote, Font Awesome — NDS covers what these do (autocomplete/multiselect for Select2, editor for Summernote, tables + sort + filter + pagination for jTables/DataTables, the HGI icon set for Font Awesome, layout primitives for Bootstrap). Do not mix them in — dual class systems fight each other's cascade (`.btn` vs `.nds-btn`), dual JS event models double-fire, and duplicate icon fonts waste bytes and paint slots. Write JS in NDS's plain-vanilla style (no `$`, no framework — see `{{NDS_PATH}}/_source/_js/nds-*.js` for the shape). **Removing a legacy library from a host project is invasive — always get explicit approval from the dev before ripping one out.** The replacement work touches unrelated pages and often surfaces hidden dependencies.

7. **Port to parallel files — never edit legacy files in place, never delete them.** For every page or partial ported to NDS, create a NEW file alongside the original — put it in an `NDS/` subfolder (uppercase, e.g. `Views/Home/NDS/Index.cshtml` beside the legacy `Views/Home/Index.cshtml`), or add a `.nds` segment to the filename (lowercase, e.g. `home.nds.cshtml`), whichever fits the host project's convention. Keep the legacy file untouched — it stays the reference for teammates during migration and the rollback path if something regresses. Route the NDS version through a new controller action / new URL / feature flag so both can be served side-by-side. **Suggested (project permitting): co-locate page-scoped JS in the same folder as the page** (e.g. `Views/Home/NDS/index.js` next to `Views/Home/NDS/Index.cshtml`) so one page's JS never leaks into another's. Some stacks (Rails asset pipeline, ASP.NET `wwwroot/`, Next.js `public/`, etc.) enforce a separate JS root — follow the project's convention rather than fighting it. **Discuss the parallel-file layout with the dev before starting the first port** — the naming pattern needs to fit their build tooling, routing, and deploy pipeline, and getting it wrong on file #1 costs the same rename across every subsequent file.

### Composition cascade — for any page

Prefer official over custom, in this order:

1. **Match a DGA page template?** Use it as-is. `{{NDS_PATH}}/_source/_data/content/templates.yml` catalogs DGA-official full-page templates (Service, Form, Contact, Content, Help & Support, About Entity, FAQ, e-Participation, and more — every entry tagged `DGA`). Copy the whole page from `{{NDS_PATH}}/_site/templates/<name>.html`, swap only the placeholder content. Never re-compose your own version — the templates encode structural decisions (side-info placement, breadcrumb slots, hero variant, tab layout) a hand-composed page will get subtly wrong.
2. **No DGA match?** Check `{{NDS_PATH}}/_source/_data/content/examples.yml` + `{{NDS_PATH}}/_site/examples/*.html` for a closest-fit composition — dashboards, service listings, editorial hubs, patterns DGA doesn't cover.
3. **Nothing matches?** Scaffold custom, but stay inside rule #4's structure. Study the DGA templates and examples for wiring patterns to reuse — how side-info wires to breadcrumbs, how forms space grouped fields, how `nds-block` sub-groups compose. Recognizable NDS structure beats invented structure.

For individual components, always check `{{NDS_PATH}}/_source/_data/content/components.yml` first — ~90 components ship. Use a close variant even when its name doesn't obviously match what the dev asked for.

### Adoption order — chrome first, inner components second

Port the outer page skeleton before any inner content:

1. **Document head** — copy verbatim from `{{NDS_PATH}}/_site/index.html` (or read `{{NDS_PATH}}/_site/ui-shell/head.html`). Load-bearing: preloads, FOUC guards, main script tag, icon-load gate.
2. **Master layout** — `<html>`/`<body>` skeleton with `<header>`, `<main>`, `<footer>` slots. Inside `<main>`, wrap page content in `<div class="nds-content-layout"><div class="nds-main-content">…</div></div>`. Set `<html dir>` and `lang` from your project's locale.
3. **Topbar + main navigation** — `{{NDS_PATH}}/_site/ui-shell/topbar.html` + the mainnav section of `{{NDS_PATH}}/_site/ui-shell/header.html`.
4. **Footer** — `{{NDS_PATH}}/_site/ui-shell/footer.html`.
5. **Accessibility panel + cookie popup** — copy from `{{NDS_PATH}}/_site/index.html`.
6. **Sub-hero / page hero** — `{{NDS_PATH}}/_site/ui-shell/hero.html`, when the page carries one.
7. **Only then** start porting inner components.

Why: `<html dir>` and body class shape how every component paints (RTL/LTR + dark). Dropmenus, modals, and drawers portal to `<body>` and expect chrome class chains present. Pasting a component into a page with a broken shell means every rendering bug is ambiguously "component or chrome?" — impossible to attribute cleanly.

### Reference index — where to look inside `{{NDS_PATH}}`

- `_site/components/*.html` — one doc page per component. Canonical `lang-html` markup + `data-*` tables + ARIA notes. **Single source of truth for how to write a component.**
- `_site/ui-shell/*.html` — chrome docs: `head.html`, `header.html`, `topbar.html`, `footer.html`, `hero.html`, `sidemenu.html`, `sideinfo.html`.
- `_site/layout/*.html` — layout primitive docs: `section.html`, `grid.html`, `flex.html`, `block.html`.
- `_site/templates/*.html` + `_site/examples/*.html` — full-page templates + composed real-world pages.
- `_source/_data/content/*.yml` — machine-readable catalogs: `components.yml`, `templates.yml`, `examples.yml`, `icons.yml`.
- `_source/_js/nds-<name>.js` — readable component behavior source (behind the minified bundles).
- `_source/_sass/components/_<name>.scss` — readable component styling source.
- `_source/_sass/tokens/` — four design-token tier files (palette, primitives, semantic, components). Dark rebinds live at the bottom of each file, under `:root[data-theme~="dark"]`.
- `_source/_sass/_mixins.scss` — shared mixins.

### What to copy INTO this project

- **Assets** — copy the full `{{NDS_PATH}}/_site/assets/` folder into your project's public assets root, preserving the internal `css/`, `js/`, `fonts/`, `icon/`, `img/`, `i18n/`, `data/` layout. The lazy-loaded bundles (`nds-delegated.min.js`, `nds-extras.min.js`) and the runtime-fetched i18n JSON files (`i18n/<component>/<lang>.json`, used by the accessibility panel and bilingual components) must be reachable at the same relative paths the main script assumes.
- **Include on every page** — one stylesheet + one script, nothing else:
    - `<link rel="stylesheet" href="/path/to/nds-main.min.css">`
    - `<script defer src="/path/to/nds-main.min.js"></script>`
    - The main script embeds `window.__NDS_BUNDLES` — its loader lazy-injects `nds-delegated.min.js` and `nds-extras.min.js` on demand. Do not hand-add either. Do not preload `nds-icons.min.css` or the icon-font stylesheet — they're gated behind an FOUC guard that lifts when the loader stamps `data-nds-icons-loaded` on `<html>`; preloading trips the gate.

### JS integration — go through the API, not around it

Many NDS components ship rich programmatic APIs and DOM events. **Wire your code THROUGH them, not around them.** Consumers who hand-write listeners on `.nds-*` elements or mutate their state directly reimplement (badly) what NDS already ships — and drift on every upgrade.

**Rule:** before adding any `addEventListener` on a `.nds-*` element, or mutating any `data-state="…"` on a NDS component, grep the component's source in `{{NDS_PATH}}/_source/_js/nds-<name>.js` for:
- `NDS.<Name> = {` — the public surface (methods to call).
- `dispatchEvent(new CustomEvent('nds:` — the events to listen for.

There's almost certainly a documented method or event to hook into instead.

**Concrete examples that make the rule real:**

- **AJAX filter →** listen for `nds:filter:change` on the filter's representative element; fire your fetch off `event.detail.criteria` (not off individual form inputs — they race with async-populated `<select>`s). Use `NDS.Filter.whenReady(container, cb)` to bind safely, because the filter can initialize before your listener attaches.
- **Server-driven pagination →** don't rebuild the nav after each AJAX response. Call `NDS.Pagination.updateRecords(listId, { from, to, count })` — the same slot grammar auto-mode uses. The nav re-renders itself.
- **Programmatic form-field writes →** setting `input.value = …` from JS does NOT fire `input`/`change`, so the clear button, validation chrome, and radio-group paint go stale. Call `NDS.Forms.syncState(input)` after any programmatic write. And after swapping a whole form region's HTML, call `NDS.Forms.initializeContainer(el)` or the new inputs stay inert.
- **Custom submit gate →** `NDS.Forms.validateForm(form)` runs the full validation synchronously and returns `{ valid, errors }`. Call it from your own submit handler to short-circuit an AJAX submit when invalid.
- **Bilingual JS →** read `NDS.isRTL` and `NDS.lang` — don't parse `<html dir>` yourself. Media queries: `NDS.breakpoints.desktop` / `.mobile` are the exact strings NDS uses. For string tables, `NDS.i18n.load('componentName', scope)` + `data-i18n="key"` works for your own bilingual widgets too.

**Reinitialization** (after any dynamic DOM change that adds NDS markup): `NDS.<Component>.reinit()` (whole-page rescan for that component) or `NDS.<Component>.create(el)` (single instance from a specific element). Both idempotent.

`NDS.cache` writes to `localStorage` with the `nds_` prefix. Clear those keys from DevTools when debugging a stale render (bad date, wrong theme).

### Facts the docs assume

- **RTL is the default.** `<html dir="rtl" lang="ar">` for Arabic, `<html dir="ltr" lang="en">` for LTR. Styles use CSS logical properties — direction flips from that single attribute, no separate stylesheet.
- **Dark mode** flips via `data-theme~="dark"` on `<html>`. No rebuild.

### Design tokens (in `{{NDS_PATH}}/_source/_sass/tokens/`)

Four tiers, one file each. Light block at top, `:root[data-theme~="dark"]` block at bottom of the same file.

1. **Palette** (`themes/_dga.scss`, vendored) — raw color ramps, no meaning.
2. **Primitives** (`_primitives.scss`) — dimension vocabulary: `--spacing-md`, `--radius-sm`, typography rungs.
3. **Semantic** (`_semantic.scss`) — one name per meaning: `--background-primary`, `--text-oncolor-primary`. Rule #5 rebinds these at `:root` for whole-system theming.
4. **Component** (`_components.scss`) — per-component dials: `--{component}-{property}-{variant}-{state}`.
```

<!-- ═══════════════════════ COPY END ═══════════════════════ -->

## Notes

- If your project uses Claude Code, paste the block into `CLAUDE.md`. If it uses Cursor / Aider / Codex, paste into `AGENTS.md`. If both, use both files with the same content, or point one at the other via an `@`-import in `CLAUDE.md`.
- The `{{NDS_PATH}}` placeholder appears many times in the block. Use your editor's find-and-replace across the pasted section, not by hand.
- When you upgrade NDS to a newer release, replace the folder at `{{NDS_PATH}}` with the new one. The prompt block above does not change; only the folder contents do.
