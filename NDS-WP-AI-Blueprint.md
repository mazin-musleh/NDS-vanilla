# NDS WordPress Theme — AI System Blueprint (Skill File)

> **Purpose:** A standalone architecture and policy document for AI systems. Read this file when working on the NDS WordPress theme (or its companion Jekyll source) to understand the system without needing repository access, and to follow its programming policies. This file is the canonical "how to work here" contract.
>
> **Version:** 1.0 (reflects NDS-vanilla v1.5.x → WP Block Theme migration)
> **Scope:** Architecture, conventions, interaction policies, and acceptance gates.

---

## 1. System architecture (what this project is)

### 1.1 Origin

`NDS-vanilla` is a **vanilla HTML/CSS/JS implementation of Saudi Arabia's National Design System (DGA)** — originally a Jekyll static site. It is not a marketing site; it is a **design-system delivery vehicle**: 62 documented components, a UI shell (topbar, header/nav, heroes, footer, sidemenu, sideinfo), 12 DGA page templates, 6 full-page examples, event theming (Foundation Day, Hajj), a 4-tier CSS design-token system, 61 vanilla-JS modules behind a smart loader, and a performance discipline scoring 100 on PageSpeed.

### 1.2 Target

The project is being migrated to a **WordPress Block Theme** (theme.json v3, block templates, template parts, block patterns, custom blocks). The design system is the asset; WordPress is the content substrate. All styling flows through `theme.json` presets + token-driven block styles; all behavior loads per-block via `block.json` `viewScript`; all content is CMS-managed (CPTs, menus, Site Editor).

### 1.3 Architecture layers

| Layer | Mechanism | Notes |
|---|---|---|
| **Tokens** | `theme.json` (`settings.color.palette`, `typography`, `spacing`, `layout`, `custom`) | 4-tier source tokens (palette → primitives → semantic → component) mapped per §3.3 of the migration guide; dark mode via `light-dark()` + `styles/dark.json` |
| **Chrome** | Template parts (`parts/header.html`, `topbar`, `mainnav`, `footer`, `cookie-popup`, `accessibility`, `user-feedback`) | Block hooks auto-insert optional parts |
| **Pages** | Block templates (`templates/*.html`) + `customTemplates` | 12 DGA template variants |
| **Components** | Core blocks + block styles (`is-style-nds-*`) → patterns (`patterns/`) → custom blocks (`src/blocks/`) | Priority ladder in §2.2 of the migration guide |
| **Behavior** | Per-block `viewScript` + one theme chrome script (`assets/js/nds-theme.min.js`) | Ports of the 61 source JS modules; no jQuery; `{ signal }` teardown; `data-nds-<name>-initialized` guards |
| **Content** | CPTs (`nds_component`, `nds_template`, `nds_service`, `nds_faq`, `nds_persona`, `nds_event`, `nds_notification`) + taxonomies + menus + post meta | Migrated from `_data/*.yml` via WP-CLI; block bindings where possible |
| **Data APIs** | REST endpoints (feedback, rating votes, consultations) | Nonce + capability checks |
| **i18n** | `languages/` (POT + ar/en), `wp_set_script_translations` | Arabic (RTL) is the default locale; all CSS logical properties |

### 1.4 Critical invariants

1. **Token discipline.** No raw hex in block styles/components; no re-binding global tokens inside components; consume semantic tokens; component knobs use the `--_x: var(--x, default)` pattern. Institutional re-branding happens ONLY through `theme.json` palette slots + style variations.
2. **Markup contract.** Never invent component structure. The canonical markup lives in the source docs (`components/*.md`, `ui-shell/*.md`) and in the migrated patterns/blocks. Class names, `data-*` attributes, and ARIA must match exactly.
3. **RTL-first.** Base styles are RTL; use CSS logical properties; `@include ltr` only for transforms/gradients logical properties cannot express.
4. **Performance parity.** A page loads only the JS/CSS its blocks use. Critical CSS inlined; main CSS deferred; fonts `font-display: swap` with unicode-range subsets; images lazy except the single LCP element (`fetchpriority="high"` on first hero slide); no autoplay media; `content-visibility` for below-fold sections.
5. **Accessibility is part of the data contract.** Labels, `aria-*`, keyboard paths, focus management, AA contrast, and `prefers-reduced-motion` are acceptance criteria, not afterthoughts.
6. **The design is the optimal baseline.** Institutional customization must enhance, not repaint. Status colors (success/info/warning/error), base white/black, and neutrals are fixed; brand color appears only on identity-carrying elements (primary buttons, active/current indicators, links, focus rings, current-step markers, icon-chip tints at 50/100 rungs).

---

## 2. Programming policies & best practices (how the AI should work)

### 2.1 Interaction policy with the user

1. **Never guess; verify.** Before writing any component markup, read the canonical doc/pattern. Before writing an icon, verify the glyph name against the shipped set (anchored grep in the Jekyll source; the WP theme keeps the same verified list). If a fact cannot be verified, say so and ask.
2. **Ask precisely, act decisively.** When the user's intent is ambiguous, ask one focused question with concrete options (the "grill-me" pattern: resolve the decision tree one branch at a time). When intent is clear, execute without over-asking; report what was done and what remains.
3. **Propose before destructive action.** Never delete, rename, or restructure without showing the plan and the diff. Apply edits with the Edit tool; never bulk-rewrite files that only partially change.
4. **Git discipline.** Propose commit messages and wait for explicit approval before committing; approval to commit is not approval to push/tag/release — each needs its own go-ahead. Never add `Co-Authored-By` lines.
5. **Report honestly.** Distinguish verified facts from estimates. Perf claims require measured before/after or an explicit "structural — not micro-benchmarkable" statement. Never present an un-driven, un-reviewed change as verified.
6. **Suggest-only for rules.** Audit findings and catalog improvements are surfaced as numbered options; the user applies them. The AI never edits the skill/rule files unprompted (concurrent sessions share them).

### 2.2 Code conventions

- **PHP/theme:** PSR-4-style organization under `inc/`; `functions.php` is a bootstrap only; every string `__()`/`esc_html__()` with text domain `nds-theme`; escape output (`esc_html`, `esc_url`, `esc_attr`); nonces on every POST/REST route; capabilities checked against the permission system (§ Step-4 proposal).
- **Block code:** `block.json` declares `viewScript`, `style`, `render`; `edit.js` uses core components and `theme.json` presets; `view.js` is an IIFE with `wp.domReady`/delegation, AbortController `{ signal }` teardown, and init-sentinel attributes; strings via `wp.i18n`.
- **SCSS:** `@use '../mixins' as *;` at the top of every file; `nds-` prefix on all classes; logical properties; tokens only (no raw hex); one file per component in `assets/scss/components/`.
- **JS lifecycle canon (from PERSONA):** instance-lifetime `this.abortController`; `destroy()` for instance teardown; lifecycle pairs by concept — modal-like → `open()`/`close()`, per-section toggle → `show()`/`hide()`, transient toasts → `create({...})`/`dismiss()`, binary toggle → `toggle()`; console prefix `'NDS <PascalCase>: <message>'`; factory guards `data-nds-<name>-initialized`, singleton guards `_initDone`.
- **Data:** CPTs registered in `inc/content-types.php` with `register_post_meta` for front-matter fields; queries via `WP_Query`/Query Loop with `prepare`-safe args; REST routes namespaced `nds/v1` with `permission_callback` wired to the approval system.

### 2.3 Quality gates (run before finishing any task)

| Gate | Check |
|---|---|
| Build | `wp-scripts build` clean; PHP lint; `theme check` (if available) |
| Tokens | No raw hex in block styles; dark mode verified for every accent |
| A11y | Keyboard path, focus management, labels/ARIA, AA contrast, reduced-motion |
| RTL/LTR | Both directions on every changed template/pattern |
| Perf | Changed page within budget (home LCP < 2.5s mobile, CLS 0); only used block scripts load |
| Editor parity | Save/render output identical; patterns insert correctly; variations apply |
| i18n | Every new string in POT; JS strings registered for translation |
| Data | Migrated CPT entries render with correct facets; old URLs redirect |

### 2.4 The Green Architecture rule (repeated for emphasis)

The current design is optimal. Customization = **adaptation of identity, never redesign**:

- Institutional color appears on: primary buttons, active/current indicators, inline links, focus rings, current step markers, active pagination, featured-icon chips (tints at 50/100).
- Institutional color NEVER appears on: page backgrounds, body text, cards, neutrals, status colors, large decorative surfaces.
- Every accent must resolve correctly in light AND dark mode.
- Event packs (Foundation Day, Hajj) re-tint brand slots via style variations only; they are removed cleanly when the event ends.

---

## 3. Repository map (quick orientation for an AI without repo access)

```
NDS-vanilla/                        # Jekyll source (the design system's origin)
├── ui-shell/                       # 7 canonical chrome docs: head, topbar, header, hero, sidemenu, sideinfo, footer
├── components/                     # 62 component docs — the MARKUP CONTRACT
├── layout/ utilities/ templates/ examples/ events/
├── _sass/tokens/ _sass/components/ # token tiers + component SCSS
├── _js/                            # 61 behavior modules (loader registry in nds-loader.js)
├── _data/                          # 19 YAML collections (menus, content, themes, hero…)
├── _includes/ _layouts/            # Liquid shell
└── CLAUDE.md                       # project conventions (upstream of all skills)

nds-theme/                          # WP Block Theme (the migration target)
├── theme.json                      # tokens, presets, layouts, variations
├── templates/ parts/ patterns/     # block templates, parts, patterns
├── src/blocks/                     # custom blocks (block.json per block)
├── inc/                            # setup, enqueue, blocks, content-types, menus, admin, api, i18n, performance
├── assets/{scss,css,js,fonts,img,data}
└── languages/
```

**Skill documents that govern work** (in the Jekyll source, `.claude/skills/`): `nds-doc` (documentation standards), `nds-add-icon` / `nds-hgi-font-update` (icons), `nds-css-audit` / `nds-js-audit` (code-quality catalogs: SEL/DEAD/DUPE/PERF/TOK; JSP/JSD/JSS/JSA + PERSONA), `nds-perf` (calibrated performance harness), `grill-me` (requirements interview). The WP theme re-expresses these as the policies in §2.

---

## 4. How to interpret further instructions

1. **"Port X to the theme"** → read X's canonical doc/pattern, map it via the priority ladder (core block + style → pattern → custom block → chrome), encode the exact markup, move behavior to a view script, register styles/patterns, run the gates.
2. **"Add a page type"** → register a `customTemplates` entry in `theme.json`, compose from patterns, add a pattern if the layout is new, register any CPT/taxonomy the page queries.
3. **"Re-brand for institution Y"** → produce a style variation JSON (palette slots) + a neutral-fallback checklist; never edit per-component colors.
4. **"Fix a regression / improve performance"** → reproduce, measure (throttled harness), fix at the token/asset layer, re-measure, report deltas.
5. **"Add content"** → use the CMS (CPT, patterns, Site Editor); content never lives in code. Placeholder/empty states are defined per data surface (loading → empty → error → content).
6. **"Audit"** → run the relevant catalog (CSS/JS), report numbered findings with proposed rewrites, apply only on explicit approval, and verify per the gates.

---

## 5. Acceptance checklist (end of any engagement)

- [ ] Every deliverable traces to a verified source artifact (doc, module, data file, or theme file).
- [ ] No raw values where tokens exist; dark mode holds; RTL/LTR both pass.
- [ ] No behavior ships without a consuming block/part; no page loads unused JS/CSS.
- [ ] All new strings are translatable (ar default); no hardcoded UI copy.
- [ ] Permission/approval system (Step 4) covers every content-writing surface; audit trail complete.
- [ ] Performance and accessibility gates pass on every changed page.
- [ ] The design remains the optimal baseline; institutional identity applied proportionately.
