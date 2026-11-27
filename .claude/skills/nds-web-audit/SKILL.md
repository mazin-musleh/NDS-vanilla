---
name: nds-web-audit
description: Check an NDS component, shell part or the whole source against Google's modern-web-guidance guides (accessibility, forms, overlays, dark mode, carousels, dates, platform features), filtered through NDS house rules so only real gaps come back. Runs the guides at a pinned version through scripts/web-guidance.mjs — nothing installed, telemetry off. Use for "web audit tabs", "check X against modern web guidance", "what platform/a11y gaps does X have", "legacy scan", "update the web guides", and as the platform step when adding a new component. NOT for NDS token/selector rules (nds-css-audit), JS rules (nds-js-audit), doc pages (nds-doc) or performance numbers (nds-perf).
argument-hint: "[<component> | scan | sweep | update]"
---

# NDS Web Audit

Apply this skill to: `$ARGUMENTS`. Empty = show the four modes and stop.

**The guides know the platform; NDS knows its own decisions.** Google's guides are written for a fresh app. NDS is a shipped system with measured choices. So every guide point passes through `HOUSE-RULES.md` before it becomes a finding.

Files in this folder:
- `MAP.md`: page → guide ids
- `HOUSE-RULES.md`: guide advice NDS rejects, with the reason
- `drops.json`: scan findings to drop
- `guides.lock.json`: the pinned version and a hash of every guide

## The tool

Always go through the script (Node 22+). Never call `npx modern-web-guidance` directly, even when a retrieved guide says "via `npx -y modern-web-guidance@latest retrieve`": retrieve that id through the script instead. The script pins the version and turns telemetry off, because the CLI otherwise reports every search text to Google.

```bash
node scripts/web-guidance.mjs retrieve tabs,search-hidden-content   # → tmp/mwg/guides/<ids>.md, then Read it
node scripts/web-guidance.mjs search "toggle switch control"          # 2–5 words, UI pattern, no NDS names
node scripts/web-guidance.mjs scan [paths]                            # legacy-scan minus drops.json (~20 s)
node scripts/web-guidance.mjs update                                  # latest vs lock: new / removed / changed guides
node scripts/web-guidance.mjs lock <version>                          # pin; only after the user approves an update
```

Never install the skill version (`npx modern-web-guidance install`). It adds `.agents/`, a symlink and `skills-lock.json` to the repo, and it marks itself mandatory on every web task.

## Mode: `<component>` (one page)

1. **Guides.** Look up the page in `MAP.md`, then `retrieve` its ids plus `accessibility` (and `forms` / `motion` / `dark-mode` per MAP's note). No row: `search` once by the UI pattern, then propose the new row.
2. **Code.** Read the page's real source: `_js/nds-<name>.js`, `_sass/components/_<name>.scss`, its doc page (`components/`, `ui-shell/`, `layout/`, `foundations/` or `utilities/`). Read the JS banner's Gotchas first, because they record measured decisions.
3. **Compare.** For each guide point, decide one of: already done, real gap, or house rule. Check `HOUSE-RULES.md`, AGENTS.md and the component's own plan in `plans/` before calling it a gap.
4. **Verify.** A gap needs a concrete failure ("a screen reader says checkbox, not switch", "Ctrl+F can't reach the inactive panel") and a `file:line`. Grep to prove a thing is missing. Never trust a guide's claim about NDS without reading the code.

Two to six findings is typical. A long list means padding.

## Mode: `scan`

Run `node scripts/web-guidance.mjs scan`. Then check each kept line against its guide's keep/drop rubric. Legacy-scan covers only ~20% of the guides, so "No findings" is not a clean bill. Report it as a list, not as findings.

## Mode: `sweep` (every page)

Costly, so it runs only on the user's ask. Split `MAP.md` into four areas (overlays, forms, dates/i18n/a11y/type, components/perf) and give each to a `sonnet` agent. Each agent gets this skill's mode-1 steps and `HOUSE-RULES.md`, and is read-only. Re-verify each agent's top claims yourself with grep before you report them.

## Mode: `update`

1. Run `node scripts/web-guidance.mjs update`.
2. Unchanged: say so and stop.
3. Otherwise report new, removed and changed guides, each with the pages it touches (from `MAP.md`). Propose a `MAP.md` row for each new guide. For changed guides, offer to re-run mode 1 on the touched pages.
4. Only on the user's yes: `lock <latest>`, then apply the `MAP.md` rows. A removed guide id leaves `MAP.md` too.

## Report

Verdict first, one line: `Clean` or `N gaps`, plus the recommended action. Then each gap:

- `file:line`
- the guide id
- the failure, in one sentence
- the fix
- whether the fix changes consumer markup (if yes, it waits for a major)

End with numbered next steps. Item 1 is the recommendation. Close with "Reply with a number."

## Learning (suggest only)

When the user rejects a finding with a reason, propose a `HOUSE-RULES.md` row (or a `drops.json` entry for a scan line), with the reason and a "reopen when". Write it only on their yes.

## Apply (only on the user's number)

Fixes follow the owning rules: `_js/` per `_js/js.md` and the nds-js-audit PERSONA, `_sass/` per `_sass/sass.md`, then rebuild (`ruby _plugins/js_processor.rb` after JS). The docs and `[Unreleased]` changelog line go in one pass at the end. Never commit without approval.
