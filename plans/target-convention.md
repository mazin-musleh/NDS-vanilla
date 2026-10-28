# Target attributes: one rule, and an audit that checks it

Written 2026-10-28 from the `js dry` audit session. Steps 1 and 3 done the same day: today's audit
reports `#x` on all six bare-id attributes, and bare `x` on Copy (a selector), where the previous one
passed all seven silently (`tmp/perf/audit-targets.mjs`, 16 cases).

## The problem

An attribute like `data-sort-target` points one element at another. A wrong value wires nothing and
throws nothing, so the audit's `id-reference` rule is the only thing that tells a developer. Today
that rule checks every target with `NDS.resolveElement`, which strips a leading `#` and also accepts
a CSS selector. Most components read their target with `getElementById`, which does neither.

So `data-sort-target="#products"` passes the audit, and the sort buttons do nothing. This is the
silent failure the rule exists to catch.

## What each attribute takes today

The doc is the contract. The code column is what the component actually reads.

| Attribute | Doc says | Code reads it with | `#id` works? |
|---|---|---|---|
| `data-sort-target` | the `id` of the list | `getElementById` (`nds-sort.js` `getMarkupLists`) | no |
| `data-selection-target` | `id` | `getElementById` (`getLists`, `getTargetList`); the counter links use `resolveElement` | no (yes on the links only) |
| `data-filter-target` | the `id` of the item container | `getElementById`; surfaces grouped by the raw string | no |
| `data-paged-target` | the `id` of the `.nds-paged-content` | matched in reverse: `[data-paged-target="${list.id}"]` | no |
| `data-stepper-target` | the id of the stepper | the raw string as the stepper id (`nds-stepper.js` `control`) | no |
| `data-modal-target` | the modal's `id` | `NDS.fromTemplate` → `getElementById` | no |
| `data-per-page-target` | the `id` of the `.nds-paged-content` | `resolveElement` | yes, undocumented |
| `data-columns-target` | the `id` of the table | `resolveElement` | yes, undocumented |
| `data-print-target` | the `id` of the element | `resolveElement` | yes, undocumented |
| `data-copy-target` | a CSS selector | `querySelector` | yes, by design |
| `data-export-target` | a CSS selector | `querySelector` | yes, by design |
| `data-voice-target` | the `id`, `name` or `data-name` of the field | `getElementById`, then `[name]`, then `[data-name]` | no |

Out of scope: `data-feedback-target` is a selector *inside* its own field, not a pointer to another
element, and `data-auto-pagination` is a pagination setting that the audit also checks.

## The rule

A target attribute names another element by its `id`, written bare (`products`, not `#products`).
Copy and Export take a CSS selector, because they point at any text or any table. Voice also takes
a field's `name` or `data-name`, because it names a form field. The docs already say all of this;
nothing in the contract changes.

## Steps

1. **Audit: check each attribute the way its component reads it** (`_js/nds-audit.js`, rule
   `id-reference`). Id attributes resolve with `document.getElementById(value)` plus the template
   lookup the rule already has; copy and export with `querySelector`; voice as today. A value that
   starts with `#`, or holds selector characters, on an id attribute gets its own message:
   *`data-sort-target="#products"` takes a bare id: write `data-sort-target="products"`.*
   Then `ruby _plugins/js_processor.rb`, and the audit bundle is committed with it.
2. **Leave the extra tolerance alone.** Print, Columns, Per-page and Auto-pagination also accept
   `#id` and a selector through `resolveElement`. Removing that would break a page that uses it, for
   no gain. `id-reference` is an error-level rule, so it reports only a value the component cannot
   read: these four pass with `#id`. (Selection's counter links accept `#id` too, but its sweep and
   counters do not, so Selection is checked as a bare-id attribute.)
3. **Docs:** the component rows need nothing; every one already says "the `id` of". There is no
   page-wide conventions page in `core/`. Update the `id-reference` row in `core/audit.md` (L245):
   it also reports a value written the wrong way, such as `#id` where a bare id is expected
   (follow `/nds-doc`, bump `last_edit`).

Check: a built page with `data-sort-target="#x"` and a list `id="x"` reports in
`node scripts/run-audit.mjs`, and the same page with `"x"` does not. Repeat for Modal, Stepper and
Filter (each reads its value differently).

## Rejected

- **Every target accepts a selector, as Bootstrap's `data-bs-target` and htmx's `hx-target` do.**
  Additive for a page, but Sort, Selection, Filter and Pagination find a target's triggers again
  from the target's `id` (`[data-sort-target="${list.id}"]`), and Filter keys its instances by the
  raw string. Every one of those reverse lookups would change, for a convenience no consumer asked
  for. Revisit only if one does.
- **A shared `NDS.findTargets(attr)` in core.** Dropped in the same session: two callers, a seven-line
  body, and a generic name that would invite a selector-taking component to lose its selectors.
