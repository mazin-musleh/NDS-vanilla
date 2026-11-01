# Action row — plan (v2.0.0)

Status (2026-11-01): built. Prototyped in `playground.md`, then moved to the SCSS. Checked with `tmp/action-row-sweep.mjs` (408 rows on 46 pages at 1280 and 360px: nothing cut or overflowing).

## Why

Four button rows behaved four ways: Panel and Form never wrapped (a long label was cut on a phone), Modal stacked by a hidden screen-width rule, Dropmenu filled the row.

## Decided (owner, 2026-11-01)

- **A row that wraps by button size.** No width point, no knob. Not grid: grid switches at fixed screen sizes, needs track values in the markup, and cannot let a wrapped button fill its line.
- **No hidden behavior: the markup says what you get.** Modal's phone stack is the `nds-col-sm` class its canon writes.
- **Classes:** `nds-end`, `nds-reverse` (the card's), and the flex utilities `nds-col` (always stacked) and new `nds-col-sm` (stacked below 600px, on any flex container). `nds-row` forces a row.
- **`nds-full` buttons share the row** (as before); one that wraps fills its line. So no `nds-fill` class.
- **Cookies always stack** (`nds-col`), on desktop too.
- **Dropmenu keeps its look:** buttons fill the row, `spacing-md` gap.
- **Names stay:** `nds-panel-footer`, `nds-card-actions`, `nds-dropmenu-action`, `nds-form-actions` share the `action-row` mixin.
- Card actions' `nds-vertical` (renamed from `nds-stacked` on 2026-10-31, never released) is gone: `nds-col` is the stack class.
- Dropped on the way: a 360px width point, `--actions-stack` / `--actions-gap`, `nds-stacked`, `nds-stacked-sm`, `nds-fill`.

## Gotchas

- `nds-col nds-reverse` is `column-reverse` (the flex utility): main action at the bottom. `nds-col-sm nds-reverse` keeps markup order on a phone.
- An author's `nds-grid` on a footer loses to the row's `display: flex`, as it did before.
