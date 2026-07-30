# NDS Vanilla — Template folder

NDS is used in one of two modes:

- **Scaffold mode** — the dev is authoring static HTML pages *inside this folder*, composing them from the built components under `_site/`. **This file (`AGENTS.md`) is for scaffold mode.**
- **Reference mode** — the dev has an existing project (Rails, Next, Django, Laravel, ASP.NET, plain PHP, etc.) and this folder sits alongside it as a read-only reference. In that case, see `INTEGRATION.md` in this same folder — it contains a copy-paste prompt block the dev pastes into their own project's `AGENTS.md`/`CLAUDE.md`.

## What this folder is

A pre-built, framework-free design system. Plain HTML, CSS, and JS — no React, no Vue, no build step required. In scaffold mode you write new `.html` files here, copying markup from `_site/components/*.html` and `_site/templates/*.html`.

## Where things live

```
CHANGELOG.md              — release history
LICENSE                   — license terms
AGENTS.md                 — this file (scaffold mode)
CLAUDE.md                 — pointer that imports AGENTS.md for Claude Code
INTEGRATION.md            — reference-mode setup: copy-paste snippet for the consumer's own project
_site/                    — the built documentation site + assets
    index.html            — home
    components/*.html     — one page per component, with canonical markup
    layout/*.html         — layout & grid docs
    examples/*.html       — composed real-world pages
    templates/*.html      — full-page starter templates (start new pages from these)
    utilities/*.html      — helper class docs
    ui-shell/*.html       — document-head, headers, footers
    assets/
        css/nds-main.min.css     — the only stylesheet a page needs
        js/nds-main.min.js       — the only script tag a page needs
        js/nds-delegated.min.js  — lazy-loaded by the loader, do NOT hand-add
        js/nds-extras.min.js     — lazy-loaded by the loader, do NOT hand-add
        fonts/, icon/, img/, data/
        i18n/<component>/<lang>.json — runtime strings for bilingual components (a11y panel, etc.); ships alongside — do not remove
_source/                  — readable source behind the minified bundles
    _js/nds-<name>.js               — behavior for each component
    _sass/components/_<name>.scss   — styles for each component
    _sass/tokens/                   — design tokens (four tiers, see below)
    _sass/_mixins.scss              — shared mixins
    _data/content/
        components.yml              — catalog of every component (~90)
        templates.yml               — full-page starter templates
        examples.yml                — composed example pages
        icons.yml                   — curated inline icon set
```

## Authoring a new page

1. Start from an existing page in `_site/templates/` (or `_site/index.html` for a home-style layout). Copy the whole file to a new name at the folder root.
2. Change `<title>`, `<meta name="description">`, and the sub-hero front matter (`hero_title`, `hero_description`, `breadcrumb`) to your content.
3. Compose the body by copying components' canonical HTML from `_site/components/<name>.html` (the `lang-html` code block).
4. Never hand-write the `<head>` — copy it verbatim from an existing built page. The FOUC guards, deferred CSS preloads, and icon-gate script are load-bearing.

## Three hard rules

1. **Never read `*.min.js` or `*.min.css`.** They are opaque. When you need to understand what a bundle does, read the matching file in `_source/`. For example, to explain accordion behavior, read `_source/_js/nds-accordion.js` — not `_site/assets/js/nds-delegated.min.js`.

2. **Never invent component markup.** Every component page under `_site/components/<name>.html` includes a canonical HTML snippet in a `lang-html` code block. Copy that verbatim into your page. Class names, element nesting, `data-*` attributes, and ARIA roles all matter — inferring markup from memory breaks the component.

3. **NDS ships 90+ components. Do not create a new one if it already exists.** Before building any UI, check `_source/_data/content/components.yml` — a catalog of every component pointing at its doc page. Do the same for `templates.yml` (whole-page starters) and `examples.yml` (composed pages) before scaffolding from scratch. If a component or close variant already exists, use it — even when the name doesn't obviously match what the dev asked for.

## Quick facts the docs assume

- **RTL is the default.** Set `<html dir="rtl" lang="ar">` for Arabic pages, `<html dir="ltr" lang="en">` for LTR pages. Styles use CSS logical properties, so direction flips from that single attribute — there is no separate RTL stylesheet.
- **Dark mode flips via `data-theme~="dark"` on `<html>`.** No rebuild required.
- **The `<head>` block is not editable freely.** The main script embeds `window.__NDS_BUNDLES` and its loader lazy-injects `nds-delegated.min.js` and `nds-extras.min.js` when it sees components that need them. Do NOT hand-add script tags for those two bundles — you will double-load. Do NOT preload `nds-icons.min.css` or the icon-font stylesheet directly — icons are gated behind an FOUC guard that lifts when the loader stamps `data-nds-icons-loaded` on `<html>`; preloading trips the gate.

## Runtime API — after dynamic DOM changes

NDS auto-initializes every component in the DOM on `DOMContentLoaded`. If your JS renders new markup at runtime (AJAX partials, tab reveals, modal contents), NDS does not re-scan automatically — call the matching init:

- `NDS.<Component>.reinit()` — rescan the whole page for that component (idempotent).
- `NDS.<Component>.create(element)` — construct a single instance from a specific element.
- `NDS.Forms.initializeContainer(element)` — rewire every form control (inputs, filter chips, autocomplete, etc.) inside a container after content swap.

Locale reads at runtime: `NDS.isRTL` (boolean), `NDS.lang` (`"ar"` / `"en"`). Use these when JS needs to branch on direction or language — don't read `<html dir>` directly.

`NDS.cache` writes to `localStorage` with the `nds_` prefix. When debugging a stale render (bad date, wrong theme), clear those keys from DevTools rather than hard-refreshing.

## Design tokens (in `_source/_sass/tokens/`)

Four tiers, one file each. Light block at top, `:root[data-theme~="dark"]` block at bottom of the same file.

1. **Palette** (`themes/_dga.scss`, vendored) — raw color ramps, no meaning.
2. **Primitives** (`_primitives.scss`) — dimension vocabulary: `--spacing-md`, `--radius-sm`, typography rungs.
3. **Semantic** (`_semantic.scss`) — one name per meaning: `--background-primary`, `--text-oncolor-primary`. Consume these in a component.
4. **Component** (`_components.scss`) — per-component dials: `--{component}-{property}-{variant}-{state}`.

Re-brand by overriding tier 3 (semantic) and rebuilding the CSS from `_source/_sass/`, or by including a stylesheet after `nds-main.min.css` that rebinds the tokens on `:root`.
