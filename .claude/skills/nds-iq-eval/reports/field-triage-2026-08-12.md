# Field triage — 2026-08-12

Findings distilled from three consumer projects' `NDS-REPORT.md` files. All three were reported by Claude Opus 4.7 (1M context). Reports A and B are 1.7.0 → 1.7.1 / NDS IQ v7 → v0.8 upgrades from ASP.NET projects on Windows that had run a full session under v7 before the upgrade. Report C is a fresh 1.7.1 / v0.8 first-install on a new SSO / auth-only ASP.NET app, which surfaced more items because it exercised the whole install-through-first-page path from a cold start — not because it used a different (or better) reporter.

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

## R7 — Counter `data-target` breaks on a thousands separator, silent in Latin locales and visibly wrong in Arabic

- **Source:** Report A (added on second-machine verification pass against 1.7.1)
- **Area:** Numbers component (`_source/_js/nds-numbers.js`), `.nds-counter-value`
- **Mechanism:** `parseTarget` splits `data-target` with `/^([^\d.-]*)([-+]?\d*\.?\d+)(.*)$/` (`nds-numbers.js:78`). `\d*\.?\d+` stops at the first comma, so everything after becomes the "suffix" and emits verbatim, unformatted:

  | `data-target` | parsed number | parsed suffix |
  |---|---|---|
  | `"543210"` | `543210` | `""` |
  | `"98.6%"` | `98.6` | `"%"` |
  | `"$75,000"` | `75` | `",000"` |
  | `"3,742"` | `3` | `",742"` |

  `"$75,000"` is the banner's OWN documented example (`nds-numbers.js:14`, *"prefix or suffix … is kept"*). It animates 0 → 75 and appends the literal `",000"`.
- **Why it hides:** in a Latin-digit locale the final text is coincidentally correct — `"75"` + `",000"` reads as `$75,000` — so the only symptom is the count-up animation stopping at the wrong magnitude, which nobody watches frame by frame. Real rendering defect only in a locale whose numerals differ: `NDS.formatNumber` converts the parsed number but leaves the literal suffix alone, so `"3,742"` renders `"٣,742"` in Arabic — Arabic-Indic digits, a Latin comma, and Latin digits in one number. Because `data-target` is where an author naturally pastes a figure with separators already in it, the broken form is the tempting one.
- **Repro:** `<span class="nds-counter-value nds-number-format" data-target="3,742">0</span>` on a page with `<html lang="ar">`; scroll it into view. Renders `٣,742`. Same markup under `lang="en"` renders `3,742` and looks fine.
- **Suggested fix (in the source's words):**
  1. Strip grouping separators before parsing the number, and keep only a genuine non-numeric prefix/suffix. For the `en` grouping comma that is a one-character change to the number class; locale-aware via `Intl.NumberFormat(lang).formatToParts` also covers `1.234.567` and `1 234 567` inputs.
  2. Failing that, invert the banner's example: *`data-target` takes an unformatted number; grouping separators must not appear in it — the component adds the locale's own.*
- **Scenario impact:** none — this is a component defect, not a rules-file issue. Source fix under option 1 above needs no scenario. If only option 2 lands (banner rewording), a wiring scenario asking why an Arabic-locale counter renders mixed digits would guard the banner sentence.

## R8 — Setup prompt trips prompt-injection classifiers on the fetch-and-follow step

- **Source:** Report C (fresh incident, new app; auto-mode Claude Code)
- **Area:** `guides/get-started.md` setup prompt (the paste-in-fresh-session install path)
- **Mechanism:** Current prompt: *"Download this to `NDS-IQ.md` at the project root with curl or your HTTP client … Confirm it starts with `# NDS IQ`, then read it top to bottom and **follow it**. Everything after that is defined by the file."* An auto-mode permission classifier reads that as the canonical prompt-injection shape — "fetch an external file and let it instruct you" — and denies the curl. On the reporting incident:

  > `Bash(curl -sSL -o NDS-IQ.md https://raw.githubusercontent.com/…) — Denied by auto mode classifier`
  > *"the download was denied by the permission system, which flagged the request as a prompt-injection vector: fetching an external file and being told to 'follow it' hands control to an untrusted source that could instruct me to do arbitrary things in your repo. I'm stopping here rather than working around it."*

  The agent then offered three workarounds (dev downloads it, add a permission rule, summarize NDS-IQ from memory). Every one of those defeats the install: the deliberate raw-download-then-read shape exists so the file is the untouched rules text, and the memory-summary option is exactly the "corrupt copy" R2 and the guide's first-line check exist to prevent.
- **Why it fires:** two phrases carry the risk — *"follow it"* and *"Everything after that is defined by the file."* Together they read as "surrender control to the external content", which is what the classifier is trained to block. The classifier can't distinguish "this is my own repo's onboarding doc" from "this is an attacker's payload".
- **Suggested fix (candidates, need a dev call):**
  1. **Reframe as project onboarding, not remote instructions.** Change *"read it top to bottom and follow it. Everything after that is defined by the file."* to something like *"read it top to bottom — it's this project's UI-layer setup guide (my own repo's rules doc, https://github.com/mazin-musleh/NDS-vanilla) and the rest of the NDS work runs from it."* Names the provenance, drops the "follow it" imperative, and reads as an internal SOP rather than a fetch-and-obey.
  2. **Add a permission-hint sentence for auto-mode users** — a one-liner before the curl telling the dev the fetch may need one-time approval, and naming the raw URL as trusted (their own repo). The fastest concrete unblock (also documented directly by Report C): tell the dev to paste `! curl -sSL -o NDS-IQ.md https://raw.githubusercontent.com/mazin-musleh/NDS-vanilla/refs/heads/main/_includes/NDS-IQ.md` — the `!` prefix runs it in the dev's shell, and the agent reads the file locally after. Alternatives: authorize curl in the sandbox permission rules, or `git clone` and copy from `_includes/NDS-IQ.md`.
  3. **Combine both.** Own-repo framing + a heads-up on the permission prompt.
- **Underlying pattern (from Report C):** the rulebook is written for the moment after the tools work. There is no section describing what to do when they don't — sandbox blocks, offline mirrors, corporate proxies blocking github.com, private-mode agents that refuse external I/O. One paragraph naming these classes and their standard unblocks (dev runs the command themselves, sanction the tool, use an authenticated mirror) would cut the "first install stalls on a false-positive block" pattern to near zero. Same block applies to the source-code zip download in `_source/` population; a matching note there would help.
- **Scenario impact:** wants a behavior-mode scenario running the paste-in setup under auto-mode + a strict permission classifier, measuring whether the fetch survives. Comprehension can't catch this — the failure is at the tool-permission layer, not in the agent's reading of the text.

## R9 — Canonical `style="--knob"` inline attrs conflict with strict CSP the head doc itself recommends

- **Source:** Report C
- **Area:** `_source/examples/*.md`, `_source/templates/*.md`, `_source/ui-shell/head.md` §CSP, NDS IQ rule #5
- **Mechanism:** Every `_source/templates/*.md` and multiple examples use inline knobs like `style="--gap: var(--spacing-md)"`, `style="--btn-padding: 0; --btn-width: 96px"`, `style="--bg-img: url(…); --bg-opacity-top: 60%"`. The head doc's own §CSP recommends `style-src 'self' 'nonce-…'`, which blocks all `style="…"` attributes. Nonces cannot be granted to attribute-level styles (they bind to `<style>` elements). The escape hatches are `'unsafe-inline'` (defeats the point), per-attribute `'unsafe-hashes'` + `'sha256-…'` (brittle across upgrades), or moving each knob to a scoped class. Under strict CSP, rule #5's scoped-class path becomes the ONLY viable path — not merely the alternative.
- **What the CSP table misses:** it lists "inline script in `<head>`" and "inline critical gate `<style>`" as needing grants. It does NOT list inline `style="--…"` knobs on canonical markup, so a dev who follows CSP guidance to the letter then copies canonical templates verbatim (per rule #3) ends up with silent no-op knobs.
- **Suggested fix (any one, ideally all three):**
  1. Expand `head.md` §CSP table with a row noting canonical `style="--…"` knobs need `'unsafe-inline'` or moving to a scoped class — under strict CSP, rule #5's scoped-class path is mandatory, not optional.
  2. Rewrite canonical examples/templates to the scoped-class path so the source stays a working strict-CSP reference.
  3. Reword rule #5 so scoped-class is the default and inline carries an explicit "not compatible with strict CSP" note.
- **Scenario impact:** wants a scenario asking an agent to install NDS under a project that already ships strict CSP — the correct answer is either the scoped-class path or the `'unsafe-inline'` grant with the trade-off named, never silent breakage.

## R10 — "The two paths" reads as "keep the versioned wrapper as NDS_ROOT"; flatten rule lives only in "Upgrading NDS"

- **Source:** Report C
- **Area:** `NDS-IQ.md` line 14 (§"The two paths") vs line 228 (§"Upgrading NDS")
- **Mechanism:** Line 14 says *"The zip holds one top-level `nds-vanilla-template-v<version>/` folder. `NDS_ROOT` is that folder, not its parent; the path is right when `NDS_ROOT/_site/` exists."* A first-time reader unzips inside `.nds/`, gets `.nds/nds-vanilla-template-v<version>/`, reads "NDS_ROOT is that folder" (grammatically referring to the just-named wrapper), reads "not its parent" as a valid warning against setting `NDS_ROOT = .nds/` when `.nds/` doesn't have `_site/` directly — but indistinguishable from an endorsement of wrapper-as-NDS_ROOT. Sets NDS_ROOT to the versioned wrapper. `_site/` exists. Ships it. Declared path now changes on every upgrade — which fails R3's stability invariant.
- **The correct behavior IS documented, but only in line 228:** *"put that folder's CONTENTS at the declared path… the same test as first install."* First-install readers have no reason to be reading the Upgrading section. Line 14 contains no verb telling them to flatten (`move contents up`, `remove the wrapper`, `extract flat`), and the anchor placeholder `NDS_ROOT = /path/to/nds-vanilla-template/` is genuinely ambiguous — trailing folder name could be the wrapper or the flattened home.
- **Suggested fix:** rewrite line 14 to make flattening explicit and to state the declared-path-stays-stable invariant right there, with a concrete verify command (`ls NDS_ROOT` shows exactly `_site/`, `_source/`, `CHANGELOG.md`, `LICENSE`, `NDS-IQ.md`, `README.md`). A one-line shell example (`mv .nds/nds-vanilla-template-v*/* .nds/ && rmdir .nds/nds-vanilla-template-v*` + PowerShell equivalent) would make the step impossible to miss.
- **Scenario impact:** wants a first-install behavior scenario grading whether `NDS_ROOT/_site/` resolves directly (and whether the anchor path is unversioned).

## R11 — `_source/` population's "extract it somewhere temporary" is the ambiguity; cleanup is not a rules concern

- **Source:** Report C (converges with R6)
- **Area:** `NDS-IQ.md` §"The two paths" — the `_source/` population paragraph
- **Mechanism:** *"extract it somewhere temporary, and from inside its single wrapper folder copy these folders into `NDS_ROOT/_source/`"* — the ambiguity is "somewhere temporary". A reader can plausibly pick `.nds/` (topical, gitignored, ready to hand), extract there, copy the ten folders, and leave the extract + zip sitting inside `.nds/`. The end-state cruft is what Report C observed and flagged.
- **Fix scope — narrow.** Cleanup itself isn't the rules' concern: if "somewhere temporary" is resolved to an out-of-project location, there's nothing inside `.nds/` to clean up in the first place. Adding `rm` imperatives to the rules trades one failure class (leftover clutter) for another (an agent deleting the wrong thing) and pushes the file toward procedural bloat, against the current lazy invariant *"one download at population time; every read after it is local."*
- **Suggested fix:** replace "somewhere temporary" with a concrete out-of-project location — *"extract it to a system temp folder outside the project (e.g. `mktemp -d` in bash, `$env:TEMP` on PowerShell) — never inside `.nds/`"*. One phrase change; the "one download, local reads after" invariant stays; nothing to delete because nothing landed inside `.nds/` to begin with. Report C's proposed cleanup + end-state-equality check is dropped as over-specification.
- **Scenario impact:** post-install artifact grading — fixture's `.nds/` should contain no extract wrappers or downloaded zips. If the location fix lands cleanly, the grading is *"absence of `.nds/*.zip` and `.nds/NDS-vanilla-*`"* — one line, no rules churn required.

## R12 — No "read the source before asking the dev anything the source could answer" meta-rule

- **Source:** Report C (biggest finding of the batch)
- **Area:** NDS IQ / all sections that generate dev-facing questions (§Workflow step 1, §Adoption Order, §Composition Cascade)
- **Mechanism:** On the reporting install, the agent asked the dev to choose between:
  - **CSP handling** (three options: SHA-256 hash / per-request nonce / externalize the script). Answer existed in `_source/ui-shell/head.md` §CSP — framework recommendation is nonce or hash, with the nonce-propagation-to-loader-fetches gotcha called out.
  - **Chrome scope** (three options: full / reduced card+language toggle / hybrid post-login). Canonical `_source/examples/sign-in.md` models exactly the reduced-card SSO shape end-to-end (start card, credentials, captcha, delivery, OTP, account, change-password, mobile, signed-out).
  Both times the dev pointed the agent at the source ("NDS support CSP, read ui-shell/head from source"; "follow examples/sign-in which almost same current"). Both times the source had the concrete answer; the agent had built a decision matrix instead.
- **Why the rulebook lets it through:** rule #3 discipline ("check source first") is documented for MARKUP, banner-first is documented for JS WIRING, rule #6 catalog check is documented for COMPONENT SELECTION. There is no equivalent rule for PROJECT-LEVEL design decisions — CSP handling, chrome shape, page-family archetypes, gated-vs-plain critical CSS. The composition cascade covers page-level structural choice but tends to get invoked at page-build time (step 4), long after chrome (step 3) has been proposed to the dev on assumptions.
- **Suggested fix:** add one explicit meta-rule (a new hard rule or extension to Workflow step 1's review-scope paragraph): *"Before asking the dev any question the NDS source or catalogs could answer, read the source. For chrome shape: search `examples.yml` by `use_when` and read the matching `_source/examples/*.md`. For a project constraint that appears to conflict with NDS (CSP, sandbox, SSR, i18n, dark mode): read the relevant `_source/ui-shell/*.md` and `_source/core/*.md`. For component choice: run the composition cascade before the question, not after. Dev-facing questions only cover what the source cannot answer: paths, project conventions, pacing, and true trade-offs the framework leaves open."*
- **Underlying pattern (Report C's phrasing):** *"the source is a first-class oracle, not a fallback."*
- **Scenario impact:** wants two comprehension scenarios — CSP-conflict and chrome-scope — that pass only when the agent reads the source and proposes the framework's own answer rather than opening the decision matrix.

## R13 — "Adoption order" is a fixed 7-step sequence; minimal / console install families are not named

- **Source:** Report C
- **Area:** `NDS-IQ.md` §"Adoption order: chrome first, inner components second"
- **Mechanism:** §Adoption Order reads as a required linear sequence (head → master layout → topbar+mainnav → footer → a11y+cookie → sub-hero → inner). Steps 3, 4, 5, 6 have no "skip if…" clause and no minimal-chrome alternative. An SSO / auth-only install has no topbar, no mainnav, no footer, no hero — it should model on `examples/sign-in.md` (which uses `layout: minimal`). A first-time reader treats "chrome" as topbar+nav+footer+hero and either builds it all (wrong) or asks the dev "full or minimal?" as an open design question — Report C's session took the latter. The information exists elsewhere (§Composition Cascade mentions standalone pages carry no chrome; `examples/console-demo.md` for admin/back-office), but not where a chrome-building reader lands.
- **Suggested fix:** prepend a branching Step 0 that matches the install against `examples.yml` (`use_when`, not titles) and names the standard install families — full chrome (do 1–7), minimal/card (SSO/auth/checkout, model on `sign-in.md`, skip 3/4/6), console/back-office (model on `console-demo.md`, do 1–2 + 4–5 + hero inside `.nds-main-content`), other (read matching example's `layout:` and adapt). Turns "one prescribed build" into "one shared spine + family-specific chrome pieces".
- **Scenario impact:** wants a scenario asking an agent to install NDS for an SSO app — the correct answer routes via `examples/sign-in.md` and skips topbar/mainnav/footer/hero, not "propose three options".

## R14 — "Gate-by-gate" pacing does not define what a gate is

- **Source:** Report C
- **Area:** `NDS-IQ.md` §"Workflow" pacing bullets
- **Mechanism:** Under gate-by-gate pacing, the agent has to decide the gate boundary. Candidates all consistent with the text: each Workflow step (1–5) — but step 4 alone covers every page build, so "gate 4" runs for weeks; each Adoption Order sub-step — would gate between "head" and "master layout" which always ship together; each page in the cascade — matches "or page completes" but leaves pre-page steps with no gate boundary; something else the agent picks by guess. Different agents will pick differently; the dev's "gate-by-gate" answer at plan review means different things in different sessions.
- **Suggested fix:** name the standard gates explicitly — *"(1) install + assets copied, (2) chrome infrastructure built (Adoption Order 1–6 as applicable, chrome renders empty), (3–N) each page from the plan, one per gate. Inside a gate, work runs continuously — no sub-gates unless the dev asks. At each boundary the agent stops, proposes the next gate, waits."*
- **Scenario impact:** low — mostly a definition gap. A scenario asking "the dev picked gate-by-gate; what stops between?" would guard the definition once it lands.

## R15 — Prior-NDS conformance is binary (adopt vs rebuild) with no rubric for what tips the scale

- **Source:** Report C
- **Area:** `NDS-IQ.md` §"Workflow" step 1, prior-NDS bullet
- **Mechanism:** "Presence grants no authority; conformance decides." But no rubric: does ONE rule-#4 violation on ONE page put the whole install into clean-rebuild? What about an outdated `.nds-*` class name (e.g. `nds-content-container` where canon is `nds-content-wrapper`)? Are some rules load-bearing (head unit, script order) and others cosmetic (missing modifier class)? What if 8 conform and 2 don't — is the whole install "prior NDS" or is it 8 adopts + 2 rebuilds? Report C's session read a single canonical-head violation on the shared layout as enough to route all 10 pages on that layout to clean rebuild — defensible, but the rulebook doesn't say.
- **Suggested fix:** name a minimum bar and let smaller violations be repair rows, not rebuild rows: *"A prior page is conformant if all of the following hold: canonical head loaded, deferred-script order respected (nds-main before page JS), rule #4 sections present, no legacy library on the same page, runtime is a known release (banner has a `Version:` line). Cosmetic failures (missing modifier class, out-of-date class name from the same family) → `Planned` with deltas, repair pass. Load-bearing failures (head, script order, runtime) → clean rebuild. Shared layout violations propagate — if the head is non-canonical, every page on that layout is non-conformant regardless of its own markup."*
- **Scenario impact:** wants a scenario where the rubric bites — a fixture with mixed-conformance prior pages, correct answer names the split rather than blanket-rebuild.

## R16 — Git treatment stated for 2 artifacts, implicit for 4

- **Source:** Report C
- **Area:** `NDS-IQ.md` §"Install and upgrade this file", §"The two paths", §"Workflow"
- **Mechanism:** Explicit: `NDS-IQ.md` (committed), `.nds/` (gitignored). Implicit: `NDS-PLAN.md` (implied committed via "memory between sessions"), `NDS-REPORT.md` (safe-to-share by design → typically committed, but nothing says so), `NDS_ASSETS` (part of deployed app, but never stated), the anchor file (`CLAUDE.md`/`AGENTS.md` conventionally committed but not universally).
- **Suggested fix:** one small git-treatment table near the end of the rulebook or under §Install — six lines close the ambiguity for the whole ledger.
- **Scenario impact:** low — checkable via a "is `NDS-PLAN.md` committed?" prompt, but the fix is trivially compact and cheap.

## R17 — `?ver={{ site.latest_release }}` cache-bust query has no advised home for non-Jekyll consumers

- **Source:** Report C
- **Area:** `_source/ui-shell/head.md` HTML snippet, §"Upgrading NDS" step 2
- **Mechanism:** The head's copy-source uses `?ver={{ site.latest_release }}` — a Jekyll Liquid variable. Consumers on Jekyll (or equivalent SSGs) can point that variable at their release constant. Everyone else (Razor, ERB, JSX, Twig, Blade, Vue) substitutes a literal. Report C's install (Razor) copied the head verbatim and ended up with `?ver=1.7.1` hardcoded on every asset URL. On upgrade, Upgrading step 2 covers replacing `_site/assets/` but not the version string inside the copied head — the literal silently goes stale until browsers serve cached assets under the old ETag.
- **Suggested fix:** two lines added to head doc or Upgrading step 2 — *"Non-Jekyll consumers: store the NDS version in ONE place (a constant, a config value, an env var) and reference it from every asset URL in the copied head. On upgrade, that one place is the only literal to edit."* Plus a line in Upgrading step 3's sweep: *"update the NDS version literal wherever the layout references it — a grep for the old version string is enough."*
- **Scenario impact:** low — hard to catch in comprehension; the fix is head-doc text.

## R18 — Minimal-chrome installs have no documented home for the language toggle

- **Source:** Report C
- **Area:** `_source/ui-shell/topbar.md`, `_source/examples/sign-in.md`
- **Mechanism:** Full chrome puts the language switch in the topbar (topbar.md documents this). Minimal chrome has no topbar. `examples/sign-in.md` resolves this by placing the toggle in each card's `nds-card-header` beside the brand logo — a legitimate working pattern. But nowhere in the rulebook or ui-shell docs is that called out as the minimal-chrome convention. A consumer reading topbar.md + Adoption Order sees "language toggle → topbar" and either builds a topbar they don't need or invents a placement of their own.
- **Suggested fix:** either (a) one line in `ui-shell/topbar.md` — *"for minimal chrome, put the language toggle in the card header instead; see `examples/sign-in.md`"* — or (b) a short "Minimal-chrome patterns" section listing per-card conventions (language, back-to-home, sign-out) with pointers into `sign-in.md`. Option (b) also covers the "Back to home" affordance which has the same discoverability gap.
- **Scenario impact:** none — pure doc addition.

## R19 — Catalogs have no structured field for install family / chrome shape / layout kind

- **Source:** Report C
- **Area:** `_source/_data/content/examples.yml`, `templates.yml`, `components.yml`
- **Mechanism:** Composition cascade + R12's proposed meta-rule both direct agents to search catalogs by `use_when` prose. Works for a small catalog, but `components.yml` already carries ~90 entries. As catalogs grow, "which examples match a minimal-chrome SSO install?" becomes ninety prose reads — enough friction that agents skip the check and default to asking the dev (the exact anti-pattern R12 addresses).
- **Suggested fix:** add two structured fields to each entry in `examples.yml` and `templates.yml`:
  ```yaml
  - name: sign-in
    layout: minimal              # matches _layouts/*.html
    install_family: minimal      # full | minimal | console | standalone
    use_when: ...
    chrome_needs: [head, master] # subset of {head, master, topbar, mainnav, footer, hero, a11y, cookie, sidemenu, sideinfo}
  ```
  `install_family` + `layout` reduce "find all minimal-chrome examples" to one YAML filter. `chrome_needs` lets an agent compute the exact adoption-order sub-steps to run — R13's Step 0 becomes mechanical rather than a design conversation. Backfilling ~30 entries is a ~1-hour maintainer task. Backward-compatible (agents that don't know the fields still read `use_when`).
- **Scenario impact:** wants R13's scenario re-run once fields exist — the agent should filter on `install_family: minimal` rather than reading prose.

## R20 — Template zip ships no `_source/`; first install requires two downloads

- **Source:** Report C
- **Area:** Release packaging (`nds-vanilla-template-v<version>.zip`)
- **Mechanism:** The template zip contains `_site/` + human files but no `_source/`. NDS IQ's population rule handles this by downloading the same tag's source archive (~2× the size of the template zip, includes assets + `.github/` + `scripts/` + tests + repo-only files that the population rule then discards) and copying ten named folders into `NDS_ROOT/_source/`. Works — but it's two downloads and a scripted copy step per install/upgrade.
- **Suggested fix:** ship the ten `_source/` folders inside the template zip. If size is a concern, add a `_source-only` companion release asset (`nds-vanilla-source-v<version>.zip`) containing just the ten folders — still one download per install with no post-download filtering. Either removes "download twice, extract twice, copy ten folders" from every consumer's install/upgrade path.
- **Scenario impact:** none — release-engineering call; if adopted, R11's cleanup rule shrinks.

## R21 — Bundle with no `Version:` banner at all (pre-1.7.0) is a third case the banner-first rule doesn't explicitly name

- **Source:** Report C (minor)
- **Area:** NDS IQ / banner-first release-picking rule
- **Mechanism:** Banner-first expects either a real version or the `-dev` sentinel. A bundle produced before the versioned banner shipped, or a custom build with no `Version:` line at all, sits in a third case the rule doesn't name. The rule's fallback ("let the dev choose" via the older-template bullet) is close enough that intent is clear — not urgent.
- **Suggested fix:** one line — *"A banner with no `Version:` line at all (pre-1.7.0 bundles) matches no release the same way `-dev` does."*
- **Scenario impact:** none.

---

## Cross-cutting pattern: R1 + R2 + R3 all live in the "Upgrading NDS" flow

R1, R2 and R3 all describe the SAME failure at the rulebook-refresh moment from different angles:

- **R2** is the failure BEFORE step 4 runs: agent never reaches step 4 because it stopped at a local-vs-local compare.
- **R1** is the failure AFTER step 4 runs: agent runs step 4 but keeps operating on the pre-swap mental model.
- **R3** is the failure that follows an upgrade travels via git — every teammate's clone silently reads stale canon against fresh runtime.

Fix candidates should land together — a single "Upgrading NDS" section rewrite that pins the raw-main entry point, mandates the post-swap re-read, and adds the older-reference banner-compare bullet — rather than as three separate one-liners that leave the section shape unchanged.

R10 (line-14 wrapper-as-NDS_ROOT ambiguity) and R11 (`_source/` population's "somewhere temporary" gap) also cluster: both live in §"The two paths" and both share R6's *"the check is a presence check, not an equality"* mechanism. **Report C's summary of that pattern is worth quoting** — *"the rulebook documents the correct end state, leaves the steps ambiguous, and puts key detail in a secondary section. Every explicit check ships as a presence check. What is missing is an 'and nothing else' check after each installation step."* This applies to R6 (post-write structure verify), R10 (post-extract `ls NDS_ROOT` returns exactly the six entries), R11 (post-population `ls .nds/` returns exactly the six entries). Landing them as one "install verification" rewrite is cheaper than three separate one-liners.

R12 is the meta over everything — *"the source is a first-class oracle, not a fallback."* R13 (Adoption Order minimal-chrome), R15 (conformance rubric) and R19 (structured catalog fields) all get partially resolved by R12's discipline; adding R12 without the others still cuts most dev-facing-question bloat.

R4 (report-scope framing) is the cross-cutting meta from the OTHER direction: without the wording extension, R1/R2/R3/R10/R11-shaped findings would keep getting logged as mechanics rather than as rulebook findings, and future maintainers would see none of this.

**Grouping the 21 items by kind:**
- **Rules-text (NDS-IQ.md):** R1, R2, R3, R4, R10, R11, R12, R13, R14, R15, R16, R21 (12 items)
- **Guide-text (`guides/get-started.md`):** R8 (1 item)
- **Doc-source (`_source/ui-shell/*.md`, `_source/examples/*.md`):** R9, R17, R18 (3 items — R9 also touches NDS-IQ rule #5)
- **Component source:** R5, R7 (2 items)
- **Catalog schema (`_data/content/*.yml`):** R19 (1 item)
- **Release packaging:** R20 (1 item)
- **Execution hygiene:** R6 (1 item, converges with R10/R11's install-verify pattern)
