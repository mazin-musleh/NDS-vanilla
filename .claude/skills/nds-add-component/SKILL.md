---
name: nds-add-component
description: Use when adding a new NDS component or creating a new page - build in playground.md, SCSS/JS files, doc page, sidemenu and catalog registration, standard-page.md / subsite.md templates, and the since/updated/last_edit doc front matter fields.
---

## Creating New Pages

**Two base templates** — copy and fill in your values:
- `standard-page.md` — regular pages (uses `page`/`minimal` layouts with sub hero)
- `subsite.md` — subsite home pages (uses `home` layout with hero slider)

## Adding New Components

**Phase 1: Build & test** — verify behavior in `playground.md` before registering anywhere.

1. Create `_sass/components/_[name].scss` (with `@use '../mixins' as *;`)
2. Add `@use 'components/[name]';` to `assets/css/nds-main.min.scss`
3. Add JS in `_js/nds-[name].js` if needed — follow the canonicals in `.claude/skills/nds-js-audit/PERSONA.md` (controller naming, `destroy()` teardown, lifecycle pair by concept, console prefix, init sentinel, `{ signal }` listeners) — then run `ruby _plugins/js_processor.rb`
4. Test the component in `playground.md` until behavior is correct

**Phase 2: Document & register** — only after Phase 1 verifies behavior.

5. Add documentation page in its shelf's folder — the placement rule heads `_data/catalog.yml` (most pages: `components/[name].md`) — following `.claude/skills/nds-doc/SKILL.md` (Claude Code invokes it as `/nds-doc [name]`)
6. Add to `_data/sidemenu/sidemenu.yml` under its shelf (and group, for Components)
7. Add its entry to `_data/catalog.yml`, in its shelf's block, so the page appears on the Library grid, in `llms.txt`, and in the agents' catalog. Match a neighbor entry's keys (title, description, use_when, category, tags, url, js, scss; templates, examples and events add icon) rather than guessing the schema. Templates, examples and event packs go in the same file, in their own blocks.
   **A page that moves keeps its file name** — the 404 page forwards an old URL by file name.

## Component Doc Front Matter

Every component/utility/layout doc page in `foundations/`, `components/`, `layout/`, `utilities/`, `ui-shell/` carries three tracking fields alongside the usual `layout/title/hero_*/breadcrumb/lang/direction`:

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
