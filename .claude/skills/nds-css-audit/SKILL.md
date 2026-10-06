---
name: nds-css-audit
description: Audit NDS SCSS. Scripts check the built CSS (dangling var() refs, fallbacks that never fire, duplicate declarations, the [data-state] invalidation set, global tokens re-bound in a component's dark block). The AI then reviews what only judgment catches: token routing by meaning, knob vs token, families kept whole, portal-safe menu styling, selector tails under runtime-toggled names, and RTL/logical properties. When asked, it times a state flip in Chrome. Use for "audit the CSS", "audit _x.scss", "check token usage", "find dead/dangling tokens", "why does this state change restyle so much", "find expensive selectors". NOT for JS (nds-js-audit), doc pages (nds-doc), contrast, or unused selectors.
argument-hint: "[_sass/components/_<name>.scss | full-tree]"
---

# NDS CSS Audit

Apply this skill to: `$ARGUMENTS` (a component name or path; empty = `full-tree`).

**Scripts count, the AI judges, Chrome proves.** CSS problems show up after Sass compiles, gzip compresses and Chrome draws. Reading SCSS sees none of those steps, so never estimate bytes or selector cost from source. Read the built CSS, or measure.

## 1. Run the checks (always, read-only)

Build first if `_site/assets/css/nds-main.min.css` is older than the newest `_sass/` edit (`bundle exec jekyll build`). Reuse a running `:4002` server. Its watcher keeps `_site` current.

```bash
python scripts/check-css.py --report        # dangling · fallback · duplicate · dark re-bind; + unread component tokens
python scripts/check-data-state-tails.py    # [data-state]/[data-status] tails (--report lists all)
python scripts/check-css.py --unused        # on request: rules no built page or JS uses, by size
```

`--unused` lists candidates, not dead code. A class named in a doc page is an option with no demo, so it goes to the docs. A class found "nowhere" is usually built at runtime (`'nds-syntax-' + type`). Grep the prefix before calling it dead. On 2026-10-06 the whole list was ~1.5 KB gzip, almost all documented API. Size is not this repo's lever.

Report every hit, mapped back to its SCSS source line (`grep -rn` on the selector or property). For a single-file run, keep only hits from that file. Unread component tokens are **info, not findings**: tokens are published API, so judge them by family ("is the whole family unused, with no design mandate?").

## 2. Review (the part a script can't do)

Read the target file top to bottom (full-tree: each `_sass/components/*.scss` that changed since the last release tag, `git diff --stat <tag> -- _sass`). Check it against the rules that already live in **AGENTS.md**. Cite the rule; do not restate it.

- **Design Tokens**: the authoring test (semantic → component token → palette-direct, never raw hex); route a token's VALUE by meaning, never by value coincidence; route families as a unit; knob (`--_x: var(--x, default)`) vs global token (the three "must reach it from `:root`" questions); a component never re-binds a global token; no component token references another component's token; spacing uses the alias names (`--spacing-md`), never numbers.
- **`data-state` styles its host**: a state rule's tail is the host itself, a pseudo-element or a component-owned class. A descendant that must change reads an inherited custom property, and only on a small host.
- **Runtime-toggled names**: for each class or attribute `_js/` flips live (`classList.add/remove/toggle`, `setAttribute('data-…')`, `NDS.State.set`), any selector that mentions it must not end in `*`, `:is(*)`, a bare pseudo-class or a bare `[attr]`. A tail like that restyles the whole host subtree on every flip (mainnav `> *` under a `<body>` class cost ~890 ms at 20x; `> li` brought it to ~80 ms). Fix: name the tail, or move the toggled name to the smallest host.
- **Dropmenu menus**: identified by `.nds-{component}-menu`, styling anchored on the menu, never on the component root (it dies when the menu portals).
- **RTL**: logical properties by default; `@include ltr` only for transforms, gradients and what logical properties can't express; dark tweaks via `@include dark`, never a bare `:root[data-theme~="dark"]`.
- **Avoid `:has()`** except as a last resort, and never on a critical path.

A finding needs a concrete failure: "in dark mode X renders Y", "a consumer's `:root` override can't reach Z", "this flip restyles N elements". If you can't name the failure, it is not a finding. Two to six findings is typical. A long list means padding.

## 3. Measure (only when the user says yes, since it drives a browser)

For a suspect state flip: at 20x CPU, `host.classList.add(name)` (or the `setAttribute` write), then a forced `getComputedStyle(probe).color`, median of 7. Subtract the same write of a name no rule keys on (the control). `/nds-perf` `measure-inp.mjs --trace` gives the recalc element count per click. A trace with `disabled-by-default-devtools.timeline.invalidationTracking` names the selector that matched.

For a size claim: `gzip -c _site/assets/css/nds-main.min.css | wc -c` before and after, rebuilt. Pages serves gzip, so raw bytes are not the number.

## Report

Verdict first, one line: `Clean` or `N findings (H high)` plus the recommended action. Then the findings: `file:line`, the rule (script check or AGENTS.md section), the failure, and the fix. End with numbered next steps. Item 1 is the recommendation. Close with "Reply with a number."

## Apply (only on the user's number)

Re-read the target, apply with `Edit`, rebuild, re-run both scripts. Report the measured gzip delta if the change was for size. A token rename or removal also needs `grep -rn -- '--name'` across `_sass/ _js/ _includes/ _layouts/` and a Migration line at release. Never commit without approval.

## Retired: do not rebuild

The old catalog (SEL/DEAD/DUPE/PERF-01..04/TOK, ~170 KB) estimated compiled bytes from SCSS source. Gzip back-references the repeats those rules removed, so wire savings were ~0. AGENTS.md already prevents the shapes they looked for (`*`, IDs, raw hex). In months of use it produced ~3 CSS fixes. Its real wins (the invalidation-set rules) came from measurement and now live in the scripts above. Add a new check to `scripts/check-css.py` when a bug class is mechanical, and to section 2 when it needs judgment. Never add a byte-guessing rule.
