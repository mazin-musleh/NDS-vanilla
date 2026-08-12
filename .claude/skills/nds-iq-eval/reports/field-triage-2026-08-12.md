# Field triage — 2026-08-12

Findings distilled from two consumer projects' `NDS-REPORT.md` files after their 1.7.0 → 1.7.1 / NDS IQ v7 → v0.8 upgrades. Anonymized as Report A and Report B. Both are ASP.NET projects on Windows; both had run a full session under NDS IQ v7 before the upgrade landed.

Format: item ID, source, area, mechanism, suggested fix. Items that would spawn or shape scenarios are flagged.

---

## R1 — Step 4 replaces the rulebook mid-session but does not mandate a re-read

- **Source:** Report A
- **Area:** NDS IQ / "Upgrading NDS" step 4
- **Mechanism:** Step 4 whole-file overwrites `NDS-IQ.md` from raw main and closes with *"the rules you are reading may be the outdated ones; where the new file disagrees, it wins."* It never says "re-read the new file top to bottom before continuing." The agent kept executing on the v7 mental model loaded at session start. Two v0.8 rules introduced BY THIS UPGRADE went unapplied until the dev asked "did you read the new NDS-IQ?":
  - **`NDS_ROOT/_source/` population**: v0.8 added the disk-check rule; the 1.7.1 template zip ships without `_source/`; agent left `NDS_ROOT` half-populated.
  - **Plan header format**: v0.8 changed `Managed by NDS IQ v<N>` → `Managed by NDS IQ`; agent stamped `Managed by NDS IQ v0.8`, a plausible v7-style read the v0.8 text forbids.
- **Suggested fix (in the source's words):** add one line at the end of step 4 — *"After replacing the file, re-read it top to bottom before continuing. This upgrade may itself introduce rules that change what the rest of this upgrade requires — the file that governs your behavior just changed underneath you."* Mirror in "How to use this file" line 7: any mid-session replacement counts as a new session for the read requirement.
- **Scenario impact:** wants a comprehension scenario — "upgrade landed, does the agent re-read before continuing?" — and a behavior scenario that measures whether the re-read actually happens after the file swap.

## R2 — "Update NDS IQ" ask lands on local-vs-local compare, raw main never fetched

- **Source:** Report B
- **Area:** NDS IQ / "Upgrading NDS" step 4 and the Upgrading-NDS paragraph's update check
- **Mechanism:** Rules describe raw main as source of truth and `NDS_ROOT/NDS-IQ.md` as "the offline fallback", but do not explicitly forbid the local-vs-local diff. Agent's actual sequence on "update NDS IQ": notice `NDS_ROOT/NDS-IQ.md` exists → `diff` against project root copy → bytes match (both frozen at last release cut) → report "up to date" → stop. Raw main never fetched; any revision published between release cuts is invisible. In the reporting session, both local copies were `v7` while raw main was already `v0.8`; the agent only saw v0.8 after being told to `proceed` with the runtime upgrade several turns later.
- **Contributing wording:** step 4's *"Compare its heading's `instructions v…` against the project root copy's"* is met by comparing any two copies — the rule leans on "its" meaning raw main's.
- **Suggested fix (in the source's words):** reword step 4 to open with *"Fetch raw main. Never compare the project root copy against `NDS_ROOT/NDS-IQ.md` — both are frozen at release cut and will agree even when raw main has moved on."* Or split "update check" (fetches raw main, compares, reports) from "install" (writes the file) and route "update NDS IQ" to the first. Related: the update-check paragraph and step 4 say the same thing twice with slightly different wording — collapsing to one place would remove the local-vs-local shortcut room.
- **Scenario impact:** wants a scenario where a local `NDS_ROOT/NDS-IQ.md` sits at an older revision than raw main and both local copies agree, prompting "update NDS IQ" — the correct action is to fetch raw main first, not compare locals.

## R3 — `NDS_ROOT` restore rules cover a missing folder, not a stale one

- **Source:** Report A
- **Area:** NDS IQ / "The two paths", "Upgrading NDS"
- **Mechanism:** `NDS_ROOT` lives in gitignored `.nds/`, so an upgrade never travels: the dev who runs it has the new release in both places, and every teammate and every later agent session on another clone still has whatever release they extracted, beside a runtime the upgrade commit *did* deliver. That is the normal steady state of a multi-dev project, not an edge case. Rules address the neighbours:
  - Missing `NDS_ROOT` — covered (read runtime banner, download that release).
  - Newer reference, older runtime — covered (report both, propose upgrade).
  - **Older reference, newer runtime — not named.** Banner-first rule reaches it only through the restore bullet for an ABSENT folder; an agent whose `NDS_ROOT` exists and resolves has no cue to compare the two banners at all.
- **Failure direction:** stale reference is what canon is read from. Every doc source, catalog, token file, and JS banner comes from `NDS_ROOT`, so the agent verifies new-runtime pages against old-runtime canon and reports them conformant. Silent, and directional to false confidence. Hit twice on Report A, both times only because the runtime banner was checked for another reason.
- **Suggested fix (in the source's words):** sibling bullet in "The two paths" — *"A present `NDS_ROOT` is not automatically a current one. Compare its `_site/assets/js/nds-main.min.js` banner against `NDS_ASSETS`'s at session start. Older reference than runtime (the normal state on every clone but the upgrader's, since `.nds/` is gitignored) is a re-download, not an upgrade: fetch the release the runtime's banner names and replace the folder, then repopulate `_source/`. Newer reference than runtime stays the dev's upgrade call."*
- **Scenario impact:** wants a scenario where `NDS_ROOT` present and resolves but banner sits below `NDS_ASSETS`'s — the correct action is a silent re-download, not an upgrade proposal.

## R4 — Report scope wording invites "NDS bugs only", not agent-error-caused rule-gap findings

- **Source:** Report A
- **Area:** NDS IQ / `NDS-PLAN.md` bullet describing `NDS-REPORT.md`, plus the report banner
- **Mechanism:** Current phrasing scopes the report as "NDS design system" findings (missing method or event, canonical markup contradicting a rule, doc that misled, reproducible component bug). What it doesn't invite: findings about the rulebook surfaced BY an agent execution mistake. On Report A's run, when the dev flagged the two missed v0.8 rules (R1's `_source/` population and plan-header format), the agent's first instinct was to log the FIXES in the mechanics section, not to write the misses up as findings. The dev had to prompt twice before the actual systemic issue (step 4's missing re-read mandate) got recorded where the maintainer could see it.
- **Why it's a rulebook issue:** an agent execution error caused by an unclear rule, an unenforced check, or a workflow that fails to cue the reader IS a finding about the rulebook — the maintainer's only signal that a rule needs strengthening. An agent working autonomously against the current phrasing would close out the upgrade with fixes logged as mechanics and the systemic issues invisible.
- **Suggested fix (in the source's words):** extend the `NDS-PLAN.md` bullet describing `NDS-REPORT.md` (mirror in report banner) — *"… and rule gaps surfaced by execution mistakes: any time you skipped, misapplied, or under-applied a rule and the cause is that the rule is unclear, uncued, or unenforced by the workflow, log it. The mistake is yours; the fix belongs in the rules. Both must be reported."*
- **Scenario impact:** meta — hard to write as a comprehension scenario; better tested via behavior mode where the runner is set up to make a rule-application mistake and the artifact grades whether the report entry landed.

## R5 — Filter form-mode auto-associates apply button but not filter inputs; silent-drop of criteria on canonical geometry

- **Source:** Report A (originally seen on 1.7.0, reproduced on 1.7.1)
- **Area:** Filter (`_source/_js/nds-filter.js`), form mode (`data-filter-submit` without `data-ajax`)
- **Mechanism:** In form mode the component reaches outside the submission form for one element and not the other:
  - **Apply button is adopted.** `setupApplyButton` sets `button.type = 'submit'` and, when the button sits outside the form, stamps `form="<form id>"` on it (`nds-filter.js:866-870`).
  - **Filter's own inputs are not.** Nothing associates them. On a native submit the browser collects only the form's own controls, so every checkbox and radio inside a dropmenu that sits outside the `<form>` is absent from the request.
- **Failure shape:** submit fires, page navigates, chips and URL update from the component's internal criteria — and the request carries no filter parameters. Reads as a working filter that the server ignores. A dropped submit would be obvious; this is not. Reproducible on the search-template's own geometry (a `<form data-filter-submit method="get">` holding the search box, and a `.nds-dropmenu.nds-filter` with `data-filter-target` pointing at the same target, placed in the section-action slot outside that form).
- **The working answer:** HTML's `form="<form id>"` on each filter input. The code KNOWS about it — `_buildAjaxRequest` comment notes FormData *"respects HTML `form="id"` attribute on scattered inputs"* (`:468-469`), apply-button comment names the same mechanism (`:865`). But it appears ONLY in those two source comments — not in the banner's **Hooks** section, not in the doc page's form-mode section (which documents `data-filter-submit` and `data-ajax` only). The rulebook makes the banner the contract, so an author who reads the banner and copies the canonical geometry lands exactly on the silent case.
- **Related:** `.nds-filter-hidden-inputs` — created inside the form and exposed on `nds:filterFormAjax` detail (`:328-331`, `:413`) — is never written to by the component. As an extension point for AJAX consumers that is coherent; the NAME suggests the component populates it with criteria and nothing does. Worth saying so in the banner.
- **Suggested fix (in order of preference, from the source):**
  1. Mirror the button behaviour: stamp `form="<form id>"` on the filter's inputs when they resolve outside the submission form. Component already knows both sides.
  2. Failing that, add one Hooks line to the banner and a sentence to the doc's form-mode section — *"Filter inputs outside the submission form need HTML's `form="<form id>"` attribute; the apply button is associated automatically, the inputs are not."*
- **Scenario impact:** source-side fix preferred (option 1 above) — if taken, no scenario needed. If only option 2 lands, a wiring scenario that presents the canonical geometry and asks "why does the submit drop the filter criteria" would guard the banner sentence.

## R6 — Upgrade steps assume absolute paths, don't warn about cwd drift

- **Source:** Report B
- **Area:** NDS IQ / "Upgrading NDS" steps 1–2
- **Mechanism:** Upgrade instructions describe file ops in prose (*"copy the new `NDS_ROOT/_site/assets/` over `NDS_ASSETS`"*) but do not specify that the commands the agent runs should use absolute paths. On Windows / Git Bash, a session that does `cd NDS_ROOT` for one step and then runs a copy with a relative destination like `NDS_ROOT/_source` writes to `NDS_ROOT/NDS_ROOT/_source`. On Report B's run that produced `.nds/.nds/_source/` — silently, because the second `.nds` is a valid new directory. Caught only when a follow-up `ls .nds/_source` failed.
- **Attribution:** the bug is the agent's, not the rules'. But the rules describe a multi-step file-shuffling operation and could cheaply prevent it.
- **Suggested fix (in the source's words):**
  - State once in "Upgrading NDS": all paths in upgrade commands are absolute; never `cd` into `NDS_ROOT` or `NDS_ASSETS` during an upgrade. OR
  - After each write step, name the exact `ls` (or equivalent) to verify the destination structure matches what step 1 says it should (`NDS_ROOT/_site/` resolves directly; `NDS_ROOT/_source/` contains `_js`, `_sass`, …).
- **Scenario impact:** hard to catch in comprehension (an agent asked "what do you do" always states absolute paths). Behavior-mode scenario where the fixture already has the runner in a subdirectory, then asks it to run the upgrade, would surface the cwd-drift risk.

---

## Cross-cutting pattern: R1 + R2 + R3 all live in the "Upgrading NDS" flow

Three of six items sit in the same section — and R1 and R2 both describe the SAME failure at the rulebook-refresh moment from different angles:

- **R2** is the failure BEFORE step 4 runs: agent never reaches step 4 because it stopped at a local-vs-local compare.
- **R1** is the failure AFTER step 4 runs: agent runs step 4 but keeps operating on the pre-swap mental model.
- **R3** is the failure that follows an upgrade travels via git — every teammate's clone silently reads stale canon against fresh runtime.

Fixing R2 makes the raw-main fetch reliable; fixing R1 makes the re-read reliable; fixing R3 makes cross-machine staleness visible. Fix candidates should land together — a single "Upgrading NDS" section rewrite that pins the raw-main entry point, mandates the post-swap re-read, and adds the older-reference banner-compare bullet — rather than as three separate one-liners that leave the shape of the section unchanged.

R4 (report scope) is the cross-cutting meta: without the wording extension, R1/R2/R3-shaped findings would keep getting logged as mechanics rather than as rulebook findings, and future maintainers would see none of this.

R5 is the only source-side item; R6 is the only pure execution-hygiene item.
