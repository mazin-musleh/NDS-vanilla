# Integrating NDS into an existing project

Use this file when you are adopting NDS inside a host system (Rails, Next, Django, Laravel, ASP.NET, plain PHP, static site generator, etc.). The NDS folder sits **alongside** your project as a read-only reference — your LLM never edits it. You copy markup, class names, tokens, and asset files OUT of it into your own codebase.

## Setup — one time

1. Place this template folder somewhere your project can reach (a sibling directory, a `vendor/` subfolder, a shared reference location, etc.).
2. Note the **absolute or relative path** to this folder. Examples: `/Users/dev/design/nds-vanilla-template-v1.5.0/`, `../nds-vanilla-template-v1.5.0/`, `vendor/nds/`.
3. Copy the fenced block below into your project's own `AGENTS.md` (Cursor / Aider / Codex) or `CLAUDE.md` (Claude Code). Replace **every occurrence of `{{NDS_PATH}}`** with the path from step 2.

That's it. Your LLM will now know NDS exists, where its source lives, and the rules for using it correctly.

## Snippet — copy the fenced block into your project

Copy everything between the `COPY START` and `COPY END` markers below (the fenced ```` ```markdown ```` block itself). Paste it into your project's `AGENTS.md` or `CLAUDE.md`, then find-and-replace `{{NDS_PATH}}`.

<!-- ═══════════════════════ COPY START ═══════════════════════ -->

```markdown
## Design system — NDS Vanilla

This project uses the National Design System (NDS) for UI. The full template sits at `{{NDS_PATH}}` — a read-only reference. Do NOT edit anything under `{{NDS_PATH}}`. Copy what you need OUT of it into this project.

### Where to look inside NDS

- **Documentation** — `{{NDS_PATH}}/_site/components/*.html` — one page per component with a canonical `lang-html` code block, live demo, `data-*` attribute tables, and ARIA notes. This is the single source of truth for markup.
- **Component catalog** — `{{NDS_PATH}}/_source/_data/content/components.yml` — a structured list of all ~90 components (title, description, category, tags, url). Read this BEFORE building any UI; do not scaffold a component that already exists here.
- **Page templates** — `{{NDS_PATH}}/_source/_data/content/templates.yml` + `{{NDS_PATH}}/_site/templates/*.html`. Composed real-world starters — use one before building a full page from scratch.
- **Example pages** — `{{NDS_PATH}}/_source/_data/content/examples.yml` + `{{NDS_PATH}}/_site/examples/*.html`.
- **Icons** — `{{NDS_PATH}}/_source/_data/content/icons.yml` — the curated inline SVG set.
- **JS source** — `{{NDS_PATH}}/_source/_js/nds-<name>.js`. Read these when you need to understand what a component does. NEVER read `*.min.js` — they are opaque.
- **SCSS source** — `{{NDS_PATH}}/_source/_sass/components/_<name>.scss`. Read these for component styling. NEVER read `*.min.css`.
- **Design tokens** — `{{NDS_PATH}}/_source/_sass/tokens/` — four tier files (palette, primitives, semantic, components). Dark rebinds live in a `:root[data-theme~="dark"]` block at the bottom of each file.
- **Mixins** — `{{NDS_PATH}}/_source/_sass/_mixins.scss`.

### What to copy INTO this project

- **Assets** — copy the full `{{NDS_PATH}}/_site/assets/` folder into this project's public assets root, preserving the internal `css/`, `js/`, `fonts/`, `icon/`, `img/`, `i18n/`, `data/` layout. The lazy-loaded bundles (`nds-delegated.min.js`, `nds-extras.min.js`) and the i18n JSON files (`i18n/<component>/<lang>.json`, fetched at runtime by the accessibility panel and other bilingual components) must be reachable at the same relative paths the main script assumes.
- **Include on every page** — one stylesheet, one script. That's it:
    - `<link rel="stylesheet" href="/path/to/nds-main.min.css">`
    - `<script defer src="/path/to/nds-main.min.js"></script>`
    - The main script embeds `window.__NDS_BUNDLES` and its loader lazy-injects delegated + extras on demand. Do NOT hand-add script tags for those two bundles — you will double-load.
    - Do NOT preload `nds-icons.min.css` or the icon-font stylesheet directly. Icons are gated behind an FOUC guard (`i.hgi-stroke{opacity:0}` in the critical CSS) that lifts when the loader stamps `data-nds-icons-loaded` on `<html>`. Preloading trips the gate and shows unstyled icons briefly.
- **Markup** — for each component you use, copy the canonical HTML snippet from its page under `{{NDS_PATH}}/_site/components/<name>.html` (the `lang-html` code block). Paste it into your view / template / JSX / Blade / ERB verbatim. Class names, element nesting, `data-*` attributes, and ARIA roles all matter — inferring markup from memory breaks the component.

### Three hard rules

1. **Never edit anything under `{{NDS_PATH}}`.** It is a read-only reference. If the dev needs to change NDS itself, that is a separate conversation — flag it and stop.
2. **Never read `*.min.js` or `*.min.css`.** They are opaque. Read the matching file in `{{NDS_PATH}}/_source/` instead.
3. **Consume NDS as-is — no custom styles, no bespoke components, no invented markup.**
    - Before building any UI, check `{{NDS_PATH}}/_source/_data/content/components.yml` (~90 components). If a close match exists, use it — even when the name doesn't obviously line up with what the dev asked for.
    - Copy canonical markup verbatim from `{{NDS_PATH}}/_site/components/<name>.html` (the `lang-html` code block). Class names, nesting, `data-*`, and ARIA all matter — inferring markup from memory breaks the component.
    - Style variations belong to design tokens or component knobs (CSS custom properties), not to a per-project override sheet that reaches into `.nds-*` selectors. Read `{{NDS_PATH}}/_source/_sass/tokens/` first and rebind at `:root` — don't hand-write CSS that duplicates what tokens already control.

### Runtime API — after dynamic DOM changes

NDS auto-initializes every component in the DOM on `DOMContentLoaded`. If the project renders new markup at runtime (AJAX partials, SPA route changes, modal contents, tab reveals), NDS does not re-scan automatically — you must call the matching init:

- `NDS.<Component>.reinit()` — rescan the whole page for that component (idempotent).
- `NDS.<Component>.create(element)` — construct a single instance from a specific element.
- `NDS.Forms.initializeContainer(element)` — rewire every form control (inputs, filter chips, autocomplete, etc.) inside a container after content swap.

Locale reads at runtime: `NDS.isRTL` (boolean), `NDS.lang` (`"ar"` / `"en"`). Use these when JS needs to branch on direction or language — don't read `<html dir>` directly.

`NDS.cache` writes to `localStorage` with the `nds_` prefix. When debugging a stale render (bad date, wrong theme), clear those keys from DevTools rather than hard-refreshing.

### Facts the docs assume

- **RTL is the default.** Set `<html dir="rtl" lang="ar">` for Arabic pages, `<html dir="ltr" lang="en">` for LTR. Styles use CSS logical properties — direction flips from that single attribute, no separate stylesheet.
- **Dark mode** flips via `data-theme~="dark"` on `<html>`. No rebuild.
- **Framework-free.** NDS is plain HTML/CSS/JS. It works with any stack — React, Vue, Svelte, server-rendered, or none.
- **Theming.** Re-brand by shipping a stylesheet after `nds-main.min.css` that rebinds the semantic tokens on `:root`, OR by editing `{{NDS_PATH}}/_source/_sass/tokens/_semantic.scss` locally and rebuilding — but even in that case, keep the modified copy inside THIS project, not under `{{NDS_PATH}}`.
```

<!-- ═══════════════════════ COPY END ═══════════════════════ -->

## Notes

- If your project uses Claude Code, paste the block into `CLAUDE.md`. If it uses Cursor / Aider / Codex, paste it into `AGENTS.md`. If both, use both files with the same content, or point one at the other via an `@`-import in `CLAUDE.md`.
- The `{{NDS_PATH}}` placeholder appears many times in the block. Use your editor's find-and-replace across the pasted section, not by hand.
- When you upgrade NDS to a newer release, replace the folder at `{{NDS_PATH}}` with the new one. The prompt block above does not change; only the folder contents do.
