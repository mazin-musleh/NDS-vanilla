# AGENTS.md

## Project Overview

**National Design System for Saudi Arabia** — Jekyll static site documenting a government design system.
RTL (Arabic) by default, with LTR (English) support. Font: IBM Plex Sans Arabic. Icons: HGI Stroke Rounded.

## Commands

```bash
bundle exec jekyll serve      # Dev server (port 4002, auto-displays network IP)
ruby _plugins/js_processor.rb # REQUIRED after any _js/ changes (bundles & minifies → assets/js/*.min.js), then fails on the release's JS gates (banners, JS rules, naming)
ruby _plugins/js_processor.rb check-audit   # the pre-commit hook: is the staged nds-audit.min.js built from the staged files it embeds?
python scripts/optimize-assets.py <path>        # shrink SVG/PNG/JPG — dry-run report; add --apply to write
node scripts/svg-render-diff.mjs <path>         # REQUIRED after an SVG --apply: proves the render is unchanged
python scripts/check-data-state-tails.py        # after any [data-state]/[data-status] rule change, or a rule on a flag the JS writes on <html>/<body> — --report lists every tail
python scripts/check-css.py [--report|--unused] # built CSS: dangling var(), dead fallbacks, duplicate decls, global token in a component dark block, !important on transform/opacity/filter, anything after a pseudo-element (`::after > *`), a part size knob NDS writes, a List step a nested list keeps; --unused = rules no page/JS uses
```

**`nds-audit.min.js` embeds data from all over the repo, so a commit can leave it behind.** The `pre-commit` hook stops a commit that leaves it behind: run `ruby _plugins/js_processor.rb` and stage the bundle in that same commit.

**After editing `_sass/_fold.scss` or `_includes/head-inline-scripts.html`**, copy the rendered `<style>` and head `<script>` from a built page into the `head_code` capture in `ui-shell/head.md`; `verify()` fails the release if they diverge.

More scripts and check details: skill `nds-scripts`.

## Files to Ignore

- **NEVER read** any `.min.js` or `.min.css` files (minified output) — grepping or size-checking the built output is fine, just don't Read the blob into context. (`.min.scss` files are Sass source, not covered.)

## Tool Restrictions

- **NEVER use `sed`** for file edits — it rewrites every file it opens even with no match, polluting git diffs.
- **For mass/bulk edits** — write a targeted script (Python, Ruby, etc.) that reads each file, checks for a match, and only writes back files that actually changed. Preserve existing line endings (write LF, not CRLF) and check `git diff --numstat` after — the repo is `autocrlf=true` with no `.gitattributes`, so a script that re-encodes line endings pollutes the diff.

## Event Theme Packs

Event theme packs: skill `nds-event-packs` (rebuild with `python scripts/mkevent.py <event>` after changing pack JS/SCSS/images; never defer the pack out of `<head>`).

## Scratch Files

**Anything temporary goes in the repo's `tmp/`, and `tmp/` is disposable** — it may be
emptied at any time, so nothing in it is ever the only copy of anything. It holds
backups before an overwrite (git holds the original once the change is committed),
throwaway fixtures and harness output, intermediate data, one-off comparison builds.
Mirror the source tree under it when the file shadows a real one
(`tmp/asset-backups/docs-assets/events/Hajj/hayyakom.svg`), so same-named files
from different folders cannot collide.

What must outlive the task does not go in `tmp/`: an image master or other source
material is committed, and a reusable harness lives in `scripts/` — only its
*output* belongs in `tmp/`. Not a sibling `.orig/`/`.bak` next to the original
either: those folders ship, so the scratch file reaches `_site`, a pack zip and the
release zip.

`tmp/` needs BOTH guards to stay invisible, and it had only one until 2026-08-28:
`/tmp/` in `.gitignore` AND `tmp` in `_config.yml` `exclude:`. Without the second,
Jekyll copies it into the build — it looked safe only because the folder was
empty. Check both when adding any new scratch directory.

## Code Comments

**Brief and to the point.** A comment states the WHY in one line — the reason the code is
not the obvious thing. Match the density of the file you are in; do not out-comment it.

- No paragraph explaining a one-line change. If the explanation is longer than the code, cut it.
- No restating what the code says. No comments on removed code.
- A shortcut with a known ceiling gets a `ponytail:` line naming the ceiling and the upgrade path.
- Component banners are the exception in FORM, not in length: they stay structured
  (Rides/Requires/Methods/Events/Hooks/Gotchas; Requires is optional and feeds the audit) and each Gotcha is still as short as it can be.

## Model Usage

**Delegate to a subagent whenever the work calls for one — on every session, not just Fable — and pick the lowest tier that can do the job.** A subagent's tool output never enters the main context, so both the delegation and the tier choice are real token savings. Route mechanical and easy work — bulk edits, file writes, routine lookups, boilerplate, broad searches — to `haiku` or `sonnet` via the Agent tool's `model` override, and reserve `opus` for subagent work that genuinely needs it. Keep the session's own model for complex tasks, decision-making, and review of the subagents' output.

**A skill that mandates an agent gets one.** Several skills (`nds-js-audit` Phase 3 and Phase 6, among others) require a subagent as a review gate. If a session-level rule blocks the Agent tool, say so and ask — never silently run an inline pass in place of the gate.

## Using Components (CRITICAL)

**NEVER guess a component's markup structure.** Before placing any NDS component on a page, open its doc page at `components/[name].md` and copy the canonical markup from its code block (or the live demo above it). Class names, element nesting, required modifier classes, `data-*` attributes, and ARIA roles must match the doc exactly. Also check `examples/*.md` for real-world usage patterns. If the doc is missing or unclear, read the component's SCSS in `_sass/components/_[name].scss` — do not invent structure from memory.

## RTL/LTR Support (CRITICAL)

**RTL is the default.** There is NO `@include rtl` mixin. Write base styles for RTL.
**Prefer CSS Logical Properties** (`margin-inline-start`, `padding-inline`, `inset-inline-start`, `text-align: start`) — they auto-adapt to text direction.
**Use `@include ltr` ONLY** for transforms, gradients, or properties logical props don't cover.

## SCSS and Tokens

SCSS standards and design tokens: `_sass/sass.md`. Read it before you edit anything in `_sass/`.

## Section & Grid

All page content is built from sections. Read `layout/section.md` before creating content.

## New Pages, Components and Doc Front Matter

New pages, new components and doc front matter: skill `nds-add-component`. Doc pages require the front matter fields `since`, `updated` and `last_edit`; bump them per the skill.

## Liquid Whitespace

Liquid whitespace rules: `_includes/includes.md`. Read it before you edit anything in `_includes/` or `_layouts/`.

## JS

Server calls, framework hosts, shared logic, JS bundles and naming: `_js/js.md`. Read it before you edit anything in `_js/`. Every `_js/` change follows `.claude/skills/nds-js-audit/PERSONA.md`.

## Content Skills

Documentation pages under `foundations/`, `components/`, `ui-shell/`, `layout/`, `utilities/`, and `core/` are created, refined, and audited per `.claude/skills/nds-doc/SKILL.md` — Claude Code invokes it as `/nds-doc [name]`; other agents follow the SKILL.md workflow directly.

## Writing

**All user-facing prose follows `EDITORIAL.md`: sentences, terms, claims, and tone per surface.** Read it before you write or rewrite any doc page, guide, alert, demo copy, README, changelog entry, or `_includes/NDS-IQ-draft.md`. The `ste100-writer` skill, if installed, adds an approved-word check on top.

## Git Commits

- Do NOT add `Co-Authored-By` lines to commit messages
- Always propose the commit message and wait for explicit user approval before running `git commit` — never commit unreviewed
- Approval to commit is not approval to tag, push, or publish a release — each needs its own explicit go-ahead
- Keep commit messages brief and to the point — short subject line, body only when the "why" isn't obvious from the diff

## Deprecations

**Found something kept only for compatibility? Put it in `DEPRECATIONS.md` before you move on.** A source comment alone does not survive — nobody greps for "legacy" at major-release time, and the name silently ships forever. The ledger is build-excluded, covers classes, attributes and JS APIs alike, and is cleared only by a major.

The tells: a bare two-name `:is(.nds-old, .nds-new)` routing both to one rule, a `// legacy` or `// deprecated` comment, a method kept as a thin wrapper over its replacement. **A second spelling is not automatically debt** — a component that answers to both a class and an attribute, or to a colour name and a semantic one, is being generous, and tags and featured icons do exactly that on purpose. A name is debt when it is WRONG: it describes behaviour the component dropped, or it names a fixed colour for a surface the theme controls. Judge the name, not the count.

**Name the selector context, not the bare class.** The same name can be dead in one place and canon in another: `.nds-green` is a deprecated brand-surface alias on a section, and the public API on a tag. Verify which before you write the row, and grep with the component in the pattern.

A row carries the dead name, its replacement, when it was deprecated, and where it is declared. If picking the survivor is not your call — two live names, neither marked — file it under the owner-call heading instead of guessing. Never remove an alias outside a major.

## Releases

**Releases, release notes and the changelog follow the `nds-release` skill.** Never hand-roll the template zip — `python scripts/mkrelease.py` builds it.

**`NDS-INDEX.md` maps a consumer agent's needs to this release's files; the rules name none.** It ships at the template zip root. A commit that moves a doc page, changes the canon format, or changes a chrome shape's page updates it in the same commit. `verify()` fails the release on any path it names that is missing.

**`_includes/NDS-IQ-draft.md` is where the consumer rules (NDS IQ) are written. Load the `nds-iq-eval` skill before editing it** — it holds the versioning, growth-control and floor-gate policy.

**Raw main's `_includes/NDS-IQ.md` is what every install downloads, so only `python scripts/publish-iq.py` writes it.** Edit the draft and push it any time. The script checks the draft, copies it over the published file, commits and tags `IQvX.Y`; pushing stays a separate step. The live site takes the rules and `guides/integration-quality.md` from the `IQv` tag that matches the published file, so drafts and history rows on main stay off it. `scripts/hooks/pre-push` blocks a main push whose published file differs from the newest `IQv` tag in main's history (an off-main tag such as `IQv3.2` never counts) — install it once per clone: `git config core.hooksPath scripts/hooks`.

**HARD CONSTRAINT: the rules file may never contain literal Liquid delimiters** (curly-brace-percent or double-curly). The published copy is a Jekyll include — the footer and both guides render it — so the build parses them and dies pointing at the footer. Write around them; `check_rules()` guards the draft at publish and the published copy at release.

**The rules file names no template version** — `check_rules()` fails on any `x.y.z` literal in it.
