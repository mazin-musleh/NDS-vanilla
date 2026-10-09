# Audit Rework

Owner decisions (2026-10-09): the migration list comes from release history first, the audit reads the site's own CSS too, and the list is a data file.

## Goals

- **Developer on a template site:** after an upgrade, `NDS.Init.audit()` names every old class, attribute or knob still in their pages and CSS, with its replacement. It also names structure that fails with no error.
- **The developer's AI agent:** reads the findings as data, fixes them, and runs the audit again until it is clean. NDS IQ already tells agents to run it.
- **This repo:** the list grows at each release from a script, so it never falls behind the way `DEPRECATIONS.md` did.

## Scope

Users get `_site/`, `README.md`, `CHANGELOG.md` and `LICENSE`. No `scripts/`. So everything a user needs is in the shipped audit bundle (`nds-audit.min.js`, on demand, zero bytes otherwise).

The audit sees markup (classes, `data-*`, ids, inline knobs) and the site's same-origin stylesheets (old classes, knobs, tokens). It cannot see JS calls or event listeners: those stay in the release notes' Migration sections.

## Status (2026-10-09)

Phases 1 to 3 done: `_data/migrations.yml` holds 675 rows (388 renamed, 251 removed, 36 deprecated). Verified against the v2 release notes both ways, token renames by compiled value (249 of 304 identical, the rest design changes or knobs), every replacement and scope against the release surfaces. The owner delegated the review.

Phase 4 done (02709b57): 16 rules, browser-tested on 6 real pages (no false alarms) and a fixture of old markup and CSS (every planted name found, every decoy skipped). Phase 5 docs done: core/audit.md and core/migration.md (built from the data file, newest release first). Next: the nds-release step, then NDS IQ.

## Phase 1: Surface History

`scripts/surface-history.rb`: for each release tag (v1.0.0 … v1.12.0) and HEAD, read the source with `git archive` into `tmp/surface/<tag>/` and list the public names:

- compiled CSS (Sass from the tag): class selectors, attribute selectors, custom properties
- the committed JS bundles: `data-*` names, `nds:` events, ids the scripts look up
- the doc pages' markup: the classes and attributes the docs told users to write

Diff each tag with the next. A name that disappears is a candidate, tagged with the release that dropped it. Output: `tmp/surface/candidates.json`.

## Phase 2: Classification

Sonnet agents, one per release range: for each candidate, read the commit that removed it (`git log -S`) and the CHANGELOG Migration section. Write the replacement, or "removed, no replacement", or "internal, never documented" (dropped from the list).

## Phase 3: Owner Review

The owner reviews the list. It lands in `_data/migrations.yml`: old name, where it applies (a selector context, since `.nds-green` is dead on a section and canon on a tag), new name, version, and removed or deprecated.

## Phase 4: Audit Rework

- Rules: id, group (`page`, `structure`, `migration`, `i18n`), severity (error, warn, info), fix sentence, doc link. `NDS.Audit.rule()` adds one.
- `run()` returns the findings and prints them grouped. `NDS.Init.audit()` resolves to them. `data-nds-audit-ignore="<rule id>"` silences one element.
- Migration rule: walks `_data/migrations.yml`, bundled into the audit by `js_processor.rb`. Markup and same-origin CSS.
- Structure rules: dangling id references (`data-*-target`, `aria-controls`, `data-auto-pagination`), page shell, the reveal stamp, an i18n pack that failed. The reveal-stamp rule was dropped: a page that never reveals stays blank, which nobody misses, and `filter-unclaimed` and `paged-no-nav` cover the per-region holds.
- The current checks move into rules unchanged.
- Fix `scripts/run-audit.mjs`: it filters `[NDS] audit:`, the audit prints `[NDS.Audit]`, so it always reports 0.

## Phase 5: Follow-up

- `nds-release` skill: run `surface-history.rb` and add the new rows before each release.
- A Migration doc page from the same data file.
- NDS IQ, last.
