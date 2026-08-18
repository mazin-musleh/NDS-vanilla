# AGENTS.md

## Project Overview

**National Design System for Saudi Arabia** — Jekyll static site documenting a government design system.
RTL (Arabic) by default, with LTR (English) support. Font: IBM Plex Sans Arabic. Icons: HGI Stroke Rounded.

## Commands

```bash
bundle exec jekyll serve      # Dev server (port 4002, auto-displays network IP)
ruby _plugins/js_processor.rb # REQUIRED after any _js/ changes (bundles & minifies → assets/js/*.min.js)
```

**After editing `_sass/_fold.scss`** — regenerate the inline critical-gate block in `ui-shell/head.md` from the rendered `<style>` in a built page. That block is canonical markup a consumer copies into their own `<head>`, and it is a hand-maintained copy of what `_includes/critical-inline.html` compiles, so it drifts silently: `61763016` added the dark-mode brand rule to the fold and the doc went five weeks without it. `verify()` compares the two and fails the release when they diverge.

## Files to Ignore

- **NEVER read** any `.min.js` or `.min.css` files (minified output) — grepping or size-checking the built output is fine, just don't Read the blob into context. (`.min.scss` files are Sass source, not covered.)

## Tool Restrictions

- **NEVER use `sed`** for file edits — it rewrites every file it opens even with no match, polluting git diffs.
- **For mass/bulk edits** — write a targeted script (Python, Ruby, etc.) that reads each file, checks for a match, and only writes back files that actually changed. Preserve existing line endings (write LF, not CRLF) and check `git diff --numstat` after — the repo is `autocrlf=true` with no `.gitattributes`, so a script that re-encodes line endings pollutes the diff.

## Model Usage (Fable sessions)

When the session runs on Fable, delegate mechanical and easy work — bulk edits, file writes, routine lookups, boilerplate — to `opus` or `sonnet` subagents via the Agent tool (`model` override) to save tokens. Keep Fable itself for complex tasks, decision-making, and review of the subagents' output.

## Using Components (CRITICAL)

**NEVER guess a component's markup structure.** Before placing any NDS component on a page, open its doc page at `components/[name].md` and copy the canonical markup from its code block (or the live demo above it). Class names, element nesting, required modifier classes, `data-*` attributes, and ARIA roles must match the doc exactly. Also check `examples/*.md` for real-world usage patterns. If the doc is missing or unclear, read the component's SCSS in `_sass/components/_[name].scss` — do not invent structure from memory.

## RTL/LTR Support (CRITICAL)

**RTL is the default.** There is NO `@include rtl` mixin. Write base styles for RTL.
**Prefer CSS Logical Properties** (`margin-inline-start`, `padding-inline`, `inset-inline-start`, `text-align: start`) — they auto-adapt to text direction.
**Use `@include ltr` ONLY** for transforms, gradients, or properties logical props don't cover.

## SCSS Standards

**Every component file must start with** `@use '../mixins' as *;`

**Use `nds-` prefix** for all class names.

**Responsive/accessibility mixins** — see `_sass/_mixins.scss`.

**Every dropmenu menu carries a `.nds-{component}-menu` identifier, and its styling is portal-safe or it doesn't ship.** A `.nds-dropmenu-menu` may portal to `<body>` (wrapper opt-in `data-portal`), which moves ONLY the menu — orphaning any rule scoped under its component ancestor AND any hook set on the wrapper.
- **Identify the menu by default.** Give every component's `.nds-dropmenu-menu` a `.nds-{component}-menu` class (suffix `-menu`), regardless of whether it portals or needs custom styling today. It's the one selector that both travels to `<body>` and names the instance — a stable, portal-safe hook we and consumers can opt into. Stamp it wherever a component owns or drives the menu: in the generator string (editor/pagination/breadcrumb/custom-select), or at init via `classList.add` for an authored menu the component drives (multiselect/filter/share) — use an own-descendant check when the component may nest sub-menus. Only a truly generic `.nds-dropmenu` with NO owning component (pagination's `data-per-page-target` per-page picker, a standalone menu) is skipped — that one's the consumer's to identify. Models: `.nds-theme-menu`, `.nds-autocomplete-menu`. (Legacy `.nds-rating-dropmenu` / `.nds-date-picker-dropdown` are grandfathered — new menus use `-menu`.)
- **Default styling: the shared `.nds-dropmenu-menu` covers it** — renders right in every mode, portaled or in-place. Most menus add nothing beyond the identifier.
- **Custom styling is opt-in and must be justified** — first confirm the shared styling genuinely falls short (don't add custom for its own sake). When warranted, anchor it on the menu (the `.nds-{component}-menu` class, a self-rooted content class like editor's `.nds-editor-link-form`, or a generic modifier like `.nds-center`) — **never on the component root** (`.nds-editor .nds-editor-link-form`), which dies the moment the menu portals.
- **Knobs stay on the wrapper** (`--dropmenu-min-width`, …) — the portal snapshots them onto the menu.

## Design Tokens (CRITICAL)

**Four tiers, one file each — light block first, `:root[data-theme~="dark"]` block at the bottom of the same file** (+ knobs):
1. **Palette** `--colors-*` (`themes/_dga.scss` — vendored, DO NOT MODIFY; runtime ramps in `themes/_register.scss`): raw values, zero meaning.
2. **Primitives** (`tokens/_primitives.scss`): dimension vocabulary — direct values on the size names (`--spacing-md`, `--radius-sm`, typo ladders, app-shell dims, transition + font knobs). No numeric rungs, no color.
3. **Semantic** (`tokens/_semantic.scss`, critical bundle): ONE name per meaning, system-wide (e.g. `--background-overlay`, `--text-oncolor-primary`). Its dark block matches `themes/_register.scss` on specificity, so crit `@use`s it AFTER register — keep that order.
4. **Component** (`tokens/_components.scss`, main bundle): `--{component}-{property}-{variant}-{state}` — a per-component dial.

Rule-level dark tweaks (not tokens) stay next to the rule they modify via `@include dark`. `_variables-a11y.scss` is a separate `[data-a11y]` overlay in the accessibility bundle, not a tier.

**Knobs** (`--btn-size`, `--section-*`, `--hero-*`) are NOT tokens: per-instance styling the consumer sets on the element, undefined by default, resolved via the `--_x: var(--x, default)` private pattern. Tokens theme the system; knobs style one element.

**Global token or component knob? A value goes global (`:root`) only if something must REACH it from `:root` — stop at the first yes:**
1. A **mode layer re-binds it** — dark, `[data-a11y]`, or a brand. They all write at `:root[…]` and cannot reach a value declared on a component selector.
2. **Another component reads it** — a cross-component contract needs one name both sides see.
3. You are **promising consumers a per-component dial** — real only if design would retune this component alone (the DGA sheet names it, or design asked). Inventing the promise is how rename-only layers get minted.

Otherwise it is a knob: declare it on the component, `--_x: var(--x, default)`. **Promote a knob to a token the moment 1 or 2 becomes true** — custom properties resolve by inheritance proximity, not specificity, so a declaration on the component root beats EVERY `:root` override (dark, a11y, consumer sheet), no matter how many attributes that selector carries.

**Invariant: a component file never re-binds a global token — it sets its own knobs.** Token dark lives in the tier file's dark block; knob dark lives in the component file next to the knob (`@include dark`). The two never collide, and that is checkable: no name set inside an `@include dark` block may appear in `_sass/tokens/`.

**Authoring test — when a component needs a value, stop at the first hit:**
1. A semantic token with the same MEANING exists (and behaves right in dark) → consume it.
2. The component needs its own dial — design retunes just this component, or the DGA sheet defines it → mint the component token (STRICT bar: dial-or-DGA-mandate only) and route its VALUE by meaning (below).
3. No meaning match, no dial needed → palette-direct `--colors-*`, whole family as a unit. Raw hex: never.

**Naming grammar:**
- Semantic: `--{property}-{role}-{modifier}-{state}`; property ∈ `background/text/border/icon/shadow/focus/controls`; modifiers are words with ONE fixed meaning (`light` = tinted wash, `strong` = deep emphasis, `oncolor` = on colored fill — always spelled `oncolor`, never `on-color`, placed last before state).
- States: `default/hovered/pressed/selected/focused/disabled` (token `pressed` feeds the `-active` knob — established precedent).
- NO color names, NO shade numbers in semantic names; one name per meaning (no synonyms); no rename-only layers.
- Element widths are meaning-named knobs/tokens (`--nds-sidemenu-width`), never scale rungs; breakpoints stay literals (CSS forbids `var()` in `@media`).
- One-off alphas: `color-mix(in srgb, var(--token) N%, transparent)` at point of use — alpha ramp families never grow.

**Family rules:** families ship complete or not at all — all four status hues, FS/LH pairs, the states the component implements. A member is justified by its family; a whole family with no consumers and no design mandate gets removed. Every public token appears in a doc reference table; token removals/renames land in the release Migration section.

**Routing a component token's VALUE — go by meaning:**
1. A semantic token with matching **meaning** AND correct both-mode behavior exists → alias it (dark/HC/re-tints come free).
2. Value must flip in dark but no semantic meaning-match → palette-direct + own dark re-bind; promote the mapping to semantic once ≥2 components share it.
3. Mode-invariant by design → palette-direct with no dark line (comment it if non-obvious).
- **Never route through a value-coincidence** (e.g. a border token feeding a background) — same hex today ≠ same meaning tomorrow.
- **Route families as a unit (states AND variants)** — if only some rungs have a semantic twin, keep the whole family palette-direct. E.g. `--button-background-primary-default` ↔ `--background-primary` (hovered/pressed/selected have no twins) or `--tag-background-{error,info}` ↔ `--background-{error,info}` (success/warning deliberately sit at 700). Splitting a family couples its members to different override surfaces and can invert the ladder under a semantic re-tint.
- Smell test: a dark re-bind that merely replicates an existing semantic token's flip = the token is on the wrong path; re-route and delete the re-bind.

## Section & Grid

All page content is built from sections. Read `layout/section.md` before creating content.

## Creating New Pages

**Two base templates** — copy and fill in your values:
- `standard-page.md` — regular pages (uses `page`/`post`/`empty`/`minimal` layouts with sub hero)
- `subsite.md` — subsite home pages (uses `home` layout with hero slider)

## Liquid Whitespace (`_includes/`, `_layouts/`)

`{%-` eats whitespace BEFORE the tag, `-%}` eats it AFTER. Eat both sides of a silent-tag run and the neighbouring markup jams onto one line (`</title><meta …>`) — the built HTML consumers read, since CI never runs `html_compressor.rb`.

- **Output tags take no dashes** — `{% include x.html %}`. A leading dash eats the newline that belongs before the include's output; a trailing one eats the newline after it.
- **Silent own-line tags take a leading dash only** — `{%- assign … %}`, `{%- if … %}`. The leading dash removes the tag's own line; a trailing dash steals the NEXT line's break. Stacked runs still emit nothing — each tag's leading dash eats the previous one's newline.
- **Keep the dashes** inside a `{% capture %}` body (emitted inline later, so a restored newline renders as a space) and on lines sharing markup with a tag (`{%- if a %}<div>{% endif -%}`).

Verify a whitespace change by rendered text, not by eyeballing: build before/after, strip tags, collapse whitespace runs to one space, and diff. Identical text = formatting-only.

## Adding New Components

**Phase 1: Build & test** — verify behavior in `playground.md` before registering anywhere.

1. Create `_sass/components/_[name].scss` (with `@use '../mixins' as *;`)
2. Add `@use 'components/[name]';` to `assets/css/nds-main.min.scss`
3. Add JS in `_js/nds-[name].js` if needed — follow the canonicals in `.claude/skills/nds-js-audit/PERSONA.md` (controller naming, `destroy()` teardown, lifecycle pair by concept, console prefix, init sentinel, `{ signal }` listeners) — then run `ruby _plugins/js_processor.rb`
4. Test the component in `playground.md` until behavior is correct

**Phase 2: Document & register** — only after Phase 1 verifies behavior.

5. Add documentation page: `components/[name].md` — follow `.claude/skills/nds-doc/SKILL.md` (Claude Code invokes it as `/nds-doc [name]`)
6. Add to `_data/sidemenu/sidemenu.yml` under Components children
7. Add to the matching index data file so the page appears on its landing grid. Match an existing neighbor entry's keys (title, description, icon, category, tags, url) exactly rather than guessing the schema:
   - `components/` → `_data/content/components.yml`
   - `layout/` → `_data/content/layouts.yml` (if present)
   - `utilities/` → `_data/content/utilities.yml` (if present)
   - `examples/` → `_data/content/examples.yml`
   - `templates/` → `_data/content/templates.yml`
   Whenever you create a new doc page, check for a sibling YAML in `_data/content/` and add the entry there too.

## Component Doc Front Matter

Every component/utility/layout doc page in `components/`, `layout/`, `utilities/`, `ui-shell/` carries three tracking fields alongside the usual `layout/title/hero_*/breadcrumb/lang/direction`:

```yaml
since: "1.0.0"                                    # version the doc first shipped (never changes)
updated: "1.4.0"                                  # version of the most recent COMPONENT change (source/markup/API; not doc-only edits)
last_edit: "15/07/2026 - 02:35 PM"  # timestamp of the most recent doc content edit (GMT+3)
```

**When to update:**
- `since` — set once at creation, never touched again.
- `updated` — bump when the COMPONENT changes: its source (SCSS/JS), markup, or public API. A doc-only edit does NOT bump it (rewording, a new demo card, a corrected path in a sample); that moves `last_edit` alone. Value = current `version` in `_config.yml` (strip `-dev`).
- `last_edit` — refresh ONLY when the doc's content changes (typo fix, new demo card, table row, wording tweak). A source fix that visibly changes what the doc page RENDERS (e.g. a demo now displaying correctly) counts as a content change — bump it. A version-tag-only bump (`updated`/`since`) does NOT — leave `last_edit` untouched, no sync needed. Format: `DD/MM/YYYY - HH:MM AM/PM` in GMT+3 (Asia/Riyadh). The environment's `date` command is unreliable for this — ask the user for the current time if unsure, or use `date -u '+%d/%m/%Y'` for the date and manually add 3 hours to the UTC time.

**Reference implementation:** `components/multiselect.md`, `components/date-picker.md`.

## JS Bundles & Shrinking the Critical Bundle

**Three bundles, location owned by the build** (`@bundles` in `_plugins/js_processor.rb`): `nds-main.min.js` (a `<script defer>` — **gates the page reveal, keep lean**), `nds-delegated.min.js` + `nds-extras.min.js` (loader-INJECTED *after* the reveal, never gate it). The loader reads `window.__NDS_BUNDLES` (namespace→bundle, build-generated) — **never hardcode bundle membership in JS**. Run `ruby _plugins/js_processor.rb` after any `@bundles` or `_js/` change.

**To move init-unnecessary code off the reveal-gating path — de-criticalize + move (wholesale).** For a component that is *delegate-safe*: markup + always-loaded CSS paint it correctly with JS deleted (JS owns behavior, not first paint). Public usage (`NDS.X.method()`) stays unchanged via the loader's lazy proxy stub.
- Server-render any state JS stamps at first paint (e.g. accordion default-open ships `data-state="open"` on the button **and** the collapse so CSS paints it expanded — no JS, no CLS).
- Drop `critical: true` from its `_js/nds-loader.js` registry entry.
- Move its file from the main list to the delegated list in `@bundles`.
- Clicks in the pre-bundle gap no-op and recover on the next click (the Tabs/Tables pattern). Precedents: **Accordion**; **Filter + Pagination** (2026-06-11).
- State that only exists at runtime (e.g. filter URL params) can't be server-rendered — hold the region in blocking crit instead, the `data-nds-loaded` pattern per container: a crit rule keeps each `[data-filter-items]`/`.nds-paged-content` region `visibility: hidden` until **its own** init stamp lands (`data-nds-filter-initialized`/`data-paged-initialized`). Self-releasing, zero JS beyond the stamp the component already writes.
- Pre-init layout reservations belong in the component's **own main CSS**, keyed on its init stamp (e.g. pagination's empty-nav `min-height` until `data-paged-initialized`) — never mirrored into crit (the old crit skeleton doubled crit doing exactly that; read it at `git show 3b8fb0a5^:_sass/_skeleton.scss`, the commit that deleted it).

**Don't split a component into eager-shell + lazy-behavior halves.** A per-component split (a `nds-X__delegated.js` half grafted onto an eager shell via `_installBehavior`/trap stubs + `loadSplit`) was built for Filter/Mainnav/Stepper/Pagination and **removed 2026-06-04**: it saved only ~3 KB gz off main — which the reveal isn't byte-bound on — at the cost of a pre-attach promise-vs-sync gap and ~330 lines of mechanism + build guards + docs. If a `critical` component has init-unnecessary behavior, keep it in main and run that behavior **on interaction with cold-init** (cheap registration at init, no forced layout); wholesale-defer instead only if it's genuinely delegate-safe.

**Build guard fails on violation** — a `critical` component's code can't ship in an injected bundle (`assert_no_critical_in_injected!`): fix by dropping `critical: true` or moving the file back to the main list.

**Keep EAGER (never defer):** anything affecting first paint (CLS-prevention state stamps, FOUC-guard removal), the component's PRIMARY interaction, or a synchronous cross-component API (e.g. `NDS.Forms.validateForm` is read synchronously at submit). Defer only secondary/late paths.

## Content Skills

Documentation pages under `components/`, `ui-shell/`, `layout/`, and `utilities/` are created, refined, and audited per `.claude/skills/nds-doc/SKILL.md` — Claude Code invokes it as `/nds-doc [name]`; other agents follow the SKILL.md workflow directly.

## Plain-English Register

**Every word NDS ships is read by non-native speakers and by weak models — write it plain.** Applies to all authored prose: component/layout/utility doc pages, `guides/`, alert titles and descriptions, demo and example copy, setup/upgrade steps, and `_includes/NDS-IQ.md`.

- One instruction per sentence; active voice; imperative for steps.
- Same word for the same thing every time — no synonyms for variety.
- No `-ing` forms as nouns or adjectives ("Before you start", not "Before starting").
- Sentences stay under ~25 words; split them, don't compress by dropping articles.

These are sentence mechanics, not a voice — each surface keeps its own register (doc pages stay plain technical book tone, per the doc skill). If the `ste100-writer` skill is installed it adds an approved-word check; the rules above stand without it.

**Vocabulary and framing live in `EDITORIAL.md`** — the canonical term list (NDS IQ, AI coding agent, validated baseline, canonical markup), how to describe NDS IQ and AI-assisted development, the claim ladder (`designed to` / `supported` / `validated` / `tested`), and the tone each surface takes (homepage, README, Get Started, the NDS IQ guide). Read it before you write or refine any user-facing prose, and before you rewrite existing prose — its "Refining Existing Content" rules govern that. The register above is how to build a sentence; `EDITORIAL.md` is which words go in it.

## Git Commits

- Do NOT add `Co-Authored-By` lines to commit messages
- Always propose the commit message and wait for explicit user approval before running `git commit` — never commit unreviewed
- Approval to commit is not approval to tag, push, or publish a release — each needs its own explicit go-ahead
- Keep commit messages brief and to the point — short subject line, body only when the "why" isn't obvious from the diff

## Releases

**Never hand-roll the template zip** — `python scripts/mkrelease.py` builds it. A plain `jekyll build` zip ships absolute `/NDS-vanilla/` asset paths that 404 the moment a consumer drops the folder into their own project. The script builds, runs `_plugins/baseurl_cleaner.rb` (paths → depth-relative) then `_plugins/html_compressor.rb`, drops the five docs-site-only files (`playground.html`, `TOKEN-MIGRATION.md`, `llms.txt`, `robots.txt`, `sitemap.xml`), adds `CHANGELOG.md` + `LICENSE` + `README.md` (from `scripts/release-template/` — a human signpost pointing at the in-zip adoption guide), adds `NDS-IQ.md` at the zip top level (the offline copy of the consumer rules, frozen at the release cut), and verifies the result before handing over `dist/nds-vanilla-template-v<version>.zip`. **The zip ships no `_source/` tree** — the consumer populates `NDS_ROOT/_source/` from the tag's auto-generated Source code zip, per the population rule in the rules file — so `verify()` checks those paths against the repo working tree, which is what the tag captures.

**The consumer rules ship as a FILE, not a pasted block** (v7 install model, 1.7.0). **Single source of truth: `_includes/NDS-IQ.md`** — clean, unescaped markdown. The consumer saves it as `NDS-IQ.md` at their project root and reads it **on demand, once per session** when NDS work starts; only a small **anchor** (two path declarations + the read trigger) goes into their `AGENTS.md`/`CLAUDE.md`. So the file is **universal** — zero per-project values, every copy byte-identical, update = whole-file replace — and the canonical anchor text lives INSIDE the file's final "Install and upgrade this file" section, never restated in the guides. Edit the rules THERE, never in a guide's HTML.

**HARD CONSTRAINT: `_includes/NDS-IQ.md` may never contain literal Liquid delimiters** (curly-brace-percent or double-curly). It is a Jekyll include — the topbar and both guides render it — so the build parses them and dies pointing at topbar. Write around them; `verify()` guards it.

**Two guides render it**, each via `{% include %}` + the `escape` filter: `guides/get-started.md` (install + session playbook) and `guides/integration-quality.md` (what the system is, revision history). Their green `.nds-code-tags` chips are **Liquid-derived** from the include's heading — never hardcode a version in a guide. Neither guide carries an `updated` front-matter field, and neither should: the rules version independently of the template, so a template release number on a guide tracks nothing the page is about — it rendered an "Updated in vX.Y.Z" tag that moved for reasons no reader could see. `since` stays (the release the guide first shipped in), the revision the content describes is the Liquid-derived chip, and page freshness is `last_edit`'s job. The workflow assumes the consumer's project **already exists and serves** — NDS is a UI layer, it never scaffolds an app — so there is one workflow, not a new-project/existing-project fork; the steps that only apply when replacing an existing UI (rule #7's parallel files, legacy-library removal) are marked conditional in place. The zip's `README.md` (`scripts/release-template/`) is a human signpost only — no rules live there.

**The rules carry ONE version-ish marker, and nothing compares it.** The revision number in the include's heading (`instructions v0.9`, written literally so the file reads standalone online without a build) is a DISPLAY stamp: no step parses it, the consumer's update check is a whole-file content compare against raw main, and the refresh is an unconditional whole-file replace guarded only by a `# NDS IQ` first-line check. **It tracks PUBLISHED revisions, not edits**: set it BY HAND on the first edit after the current revision is pushed to main (raw main is the publish channel, so a push publishes) — further edits before the next push ride the same number. No sweep touches it. Beyond it the file names NO template version at all: the rules read the runtime's own banner and fetch matching-version references, so they run on any release, and `verify()` enforces that absolutely — one `x.y.z` literal anywhere in the file fails the build. The plan-file stamp is versionless for the same reason (`Managed by NDS IQ`); `verify()` only checks the phrase is still there. The anchor is version-FREE by design — install once, never churns. `verify()` fails the build if `NDS-IQ.md` is missing from the zip top level, if the include loses its revision stamp, its plan stamp, its anchor-canon lines or Liquid-free guarantee, if it names a template version, if EITHER guide stops including the file, if either rendered guide lacks the revision stamp, or if any literal path the rules, guides, or README reference has gone missing — the zip for `_site/…` paths, the repo working tree for the `_source/…` ones the consumer populates from the tag. The rules' bare paths count, not just the `NDS_ROOT/`-prefixed ones.

**The rules file names no version, and that is checkable.** Nothing sweeps the file, so any release number left in its prose would go stale silently — `verify()` therefore rejects every three-segment literal it finds, which leaves the heading's display revision as the only marker the file carries. **`python scripts/check-release-guards.py` proves these guards still fire** — it breaks the rules file one way per case and asserts the matching guard notices, because the failure that matters is a guard silently becoming a no-op after someone rewords the sentence it keys on. Run it after any edit to `verify()` or the stamp/anchor sentences themselves.

**Evolving the consumer rules** (`_includes/NDS-IQ.md`; public name **NDS IQ**, Integration Quality — the umbrella name for the project's AI layer) — drive changes from real integration runs, not speculation, and verify each finding against the source first (audit findings are often already fixed or misread). Highest value is what a weaker model missed and a stronger one inferred: the block must not lean on capability. Extend an existing principle rather than mint a rule per incident, and keep rules component-agnostic — name a specific component only when the fix is important enough to justify it. Never change source to rescue an agent failure; only when the change improves the component itself or fixes a real gap/bug in it. Keep ONE canonical statement per concern, cross-referenced by name from the other moments that need it — duplicates drift, and every sentence is read start to finish once a session. A real source gap (missing API, canonical markup contradicting a rule) is fixed in the source, never papered over with instruction text. Batch edits near releases — don't let main's copy drift far ahead of the latest published template (agents may read it straight from the repo). After any substantive edit, propose a `scoped` `nds-iq-eval` run before calling the edit done; at release prep, propose a `full` run. **Sonnet is the working tier and the one the file must not lean on; the 3-model sweep is occasional and the owner's call, never a release step** (owner call 2026-08-18: the per-model diff has not paid for itself). The skill owns modes, scenarios, and baselines (`.claude/skills/nds-iq-eval/`) — propose, don't auto-run.

**Growth control — the suite licenses the trim.** Behavior lives in the eval scenarios; the block's text is the smallest thing that makes them pass. Every field incident becomes a scenario first — the sentence it spawns is negotiable later, the scenario never is. Before any sentence lands, walk the cause-removal ladder top-down: source fix → shipped artifact or mechanism (a template, a stamp, a check, a script) → knowledge at the point of copy (banners, canonical markup) → block text; the block holds only what no mechanism above it can absorb, and a mechanism that ships later lets its text shrink under the same gates. Trim only through the gates: pass→remove→still-pass per sentence, and scale per-component knowledge out of the file into on-demand surfaces (the banner project, the `_source/` doc and page sources) behind an eval-gated routing rule.

**FLOOR GATE — run it BEFORE a sentence is written, and again before it is trimmed** (`nds-iq-eval` `floor` mode, against `fixtures/NDS-IQ-STUB.md`). It answers the one question the pass→remove→still-pass gate cannot: a suite that still passes after a removal may only mean no scenario covered it, whereas a scenario that passes with a STUB rulebook proves the model already does this and the sentence buys nothing. **Stub passes → do not write the sentence; fix the source** (doc, example, catalog, banner), which is where the attribution default sends it anyway. **Stub fails → the sentence carries real weight** and may be proposed — **but a stub FAIL alone never justifies one.** It shows only that the model does not do this for free; the file may already say the thing in other words, or say something that pulls the other way. Run the same scenario against the REAL file too, and propose only when BOTH fail. Corrected 2026-08-15 after S80: its stub failed, a sentence was drafted, and the real-file run then disagreed with itself across two setups — the draft was withheld, and the near-miss is recorded in S80's baseline. The same run taught the companion lesson: a floor result is only as good as its prompt. S80 PASSED the stub when its prompt named the file under test and FAILED it when the prompt merely said "build the page", which is the S72/S79 tell in its cheapest form, caught before it cost anything. A floor PASS on existing text is a trim CANDIDATE, never a trim. Clear it in this order, and note that the obvious check is the useless one: **re-running the cut sentence's OWN scenario proves nothing** — it already passed against a stub with zero rules, so it cannot fail against the file minus one sentence. (1) Confirm by READING that the source genuinely carries the behavior — a doc, example, catalog or banner the agent is already routed to; that read is the real gate. (2) Cut the batch, not one sentence at a time (one eval per edit-batch). (3) Re-run WIDE — the full suite, not the cut scenarios — because the only live risk is collateral: a sentence load-bearing for some scenario nobody mapped it to. **Most floor passes are not cuttable at all:** they share sentences with floor-FAIL scenarios, and a sentence guarded by both stays. Of the 2026-08-14 run's 24, only 8 map to cleanly severable text (~2,974 chars, ~7% of the file) — the cascade `use_when` sentence, rule #3's copy-verbatim rule and the two-paths block are each guarded by passes AND fails, so they stay whatever their passes say. Why this rule exists: the trajectory-is-DOWN policy below was unenforceable without it and went unfollowed — v1.0 shipped at 41,440 chars on 2026-08-13 and reached 43,420 by 2026-08-14 (+4.8%) across five additions and ONE 138-char trim, because writing a sentence is always cheaper than fixing a doc and nothing could prove a sentence unnecessary. The 2026-08-14 floor run measured 24 of 75 scenarios passing with no rules file at all (a lower bound — see the `scenarios.md` preamble for both undercount caveats); those 24 are the standing trim backlog, and the passes cluster exactly where a source doc answers, which is the cause-removal ladder showing up as data rather than intention. **The ≤30K character ceiling is RETIRED (v7).** It existed because the rules were pasted into the consumer's own instruction file and loaded every turn, against Claude Code's 40K warning on a file that belongs to the dev — the v7 install model moved the rules out of that file, so the dev's headroom is no longer ours to spend and there is no external ceiling to chase. Size is now a **quality outcome, not a budget**: the file is read start to finish, once a session, by the weakest model tier it serves, so length costs comprehension rather than the dev's budget, and the gates above are what hold it down. Never split it into multiple files (one file, one read), never move rules into satellite guides, and never trim rationale clauses speculatively: weak models comply by quoting the why, so rationale is load-bearing until a scenario proves otherwise. A consolidation pass — cluster sentences that accreted separately around one concern, rewrite each cluster as one tighter statement, full-suite rerun, no new behavior — waits for a cycle boundary (a release or the banner cycle), never mid-cycle on freshly validated text.

**Attribution default (owner call, 2026-08-14): a field failure is a SOURCE finding, not an instructions finding.** Presume a doc, example, catalog entry, or banner was unclear or missing and fix it there; rules text is admitted only for a true procedure hole, a policy that prevents a real mistake, or a mandatory structure. **Admission test for any proposed sentence:** it must end in an artifact check the agent runs alone (built twin, catalog, `audit()`, banner, grep), a preference question any dev can answer, or an NDS-REPORT entry — never in judgment only an NDS maintainer has. The consumer dev is a preference oracle, not a correctness oracle: the maintainer can tell an agent "that's not canon"; a normal dev cannot, so no rule may lean on dev expertise. Sentences are procedures, claim-preconditions, or ask-triggers; naming a component requires field recurrence (the Toolbar precedent). **A repeated custom-case is a missing example:** rigs scaffolding the same page shape custom — or bending an ill-fitting example onto a common legacy layout — feeds the example backlog in `TODO.md`, fixed in `examples/`, never in rules text. **The file's trajectory is DOWN:** each source clarification licenses a trim attempt on the sentences it absorbs, through the same pass→remove→still-pass gates; growth is the exception and must argue for itself.

**Release commit** — `_config.yml` `version` + `latest_release` to the real number, `package.json` / `package-lock.json` to match, sweep the `X.Y.x` `since`/`updated` doc stamps, then `ruby _plugins/js_processor.rb` (the bundle banner carries the version). Clear the root `TODO.md` (build-excluded in `_config.yml`): drop the items this release shipped, carry open ones forward, never delete the file. Annotated tag `vX.Y.Z`, then `gh release create` with the zip.

**Release notes keep the CHANGELOG section's structure — trimmed, not rewritten.** The body is `### Added` / `### Changed` / `### Fixed` / `### Documentation` / `### Migrating from vX.Y.Z` with the same `- Name — sentence.` bullets and inline doc links; the title adds the house line `vX.Y.Z — Headline, Headline & lowercase third`. Paste the section verbatim while it stays readable — 1.6.0 did, at ~4K characters. **When it runs long, trim by significance, never by section**: 1.7.0's ran 13,752 characters over 75 bullets, cut to ~6K over 32 by dropping the tail of single-line fixes and knobs while every new component, API, layer and breaking change survived. **Never trim a migration step** — that is the part people act on, and the whole `### Migrating` block ships whatever its length. `CHANGELOG.md` keeps the full detail and ships in the zip. A trimmed body can drift from it, so write the notes LAST, from the finished section, and treat an upgrade step present in one and missing from the other as a bug.

**Changelog** — `### Documentation` (added 1.8.1) carries doc-page changes, because an agent reads the docs as canon and a doc edit changes what it builds. The bar: an entry earns a line only if it changes what an agent builds or how it verifies — new canonical markup, a corrected claim, a newly documented API path, a routed reference. Rewording, typos and demo tweaks stay out; `last_edit` already tracks those. Runtime changes stay in Added/Changed/Fixed, and a versioned shipped artifact (NDS IQ itself) is Added, not Documentation. `### Migrating from vX.Y.Z` leads with the bundle-replacement step, then breaking markup/API edits only; visual shifts and new tokens belong in Changed. A fix for something added in the same cycle never shipped — leave it out. Doc references are live `https://mazin-musleh.github.io/NDS-vanilla/….html` links, never `.md` paths: template users only get HTML.