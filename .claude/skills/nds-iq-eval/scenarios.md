# nds-iq-eval scenarios — index

One row per scenario; the full record (rules, setup, prompt, rubric, floor, leak, baseline) lives in `scenarios/S<n>-<slug>.md`. Scoping reads THIS file only, then opens just the scoped files. Records follow SKILL.md's no-records rule: a scenario file holds its durable fields, a one-line verdict log, and at most ONE current story while something is open — stories are replaced, never appended; git is the archive (the pre-split monolith is at commit `6490326a`).

**Numbering:** S1–S86 are written. S43 was never used — a numbering skip, not a retirement. **Next free is S87.** Update this line whenever a scenario lands.

**Standing harness rules** (method lives in SKILL.md; these are the file-level ones):
- Catalog-routing prompts stay in the dev's words — never words a `use_when` uses verbatim; worked examples that name an entry stay OUT of the rules file or the runner quotes the answer instead of finding it (S28's first run, 2026-08-08).
- The "never a web-fetch tool" MUST NOTs (S3, S26, S47) rest on a live demonstration (2026-08-09): the same raw URL byte-exact via curl, ZERO content via a web-fetch tool — a refusal or digest saved as `NDS-IQ.md` fails silently and totally.
- Floor run 2026-08-14: 24/75 PASS with a stub rulebook — a LOWER bound, two ways: tool effort varied wildly (a lazy runner under-passes), and the stub then announced itself (runners answered UNDEFINED knowing the rulebook was empty; both tells stripped since). The harness is not zero-knowledge (it supplies the `_source/` map, "banners exist", built twins) but is CONSTANT, so floor-vs-file deltas stay clean.
- Leak classes (harness-fidelity audit 2026-08-17): (1) seeded artifact carrying the graded answer, (2) setup fact foregrounding the graded capability, (3) prompt naming the graded surface, (4) fresh-context runs cannot measure long-session decay (a limit, not a leak). Labels live in each file's `leak:` line; no line = audited clean. A question-posed prompt or a temptation trap is not a leak — a leak hands the PASS.

| ID | slug | mode | rules (gist) | last verdict | flags |
|---|---|---|---|---|---|
| S1 | prior-work-first-session | both | step-1 prior-NDS split, plan gate, report both versions | PASS 2026-08-15 full | floor:FAIL · WATCH upgrade-verb |
| S2 | mature-install-new-page | c | plan retirement, archetype tier, step-4 passes | PASS 2026-08-15 full | floor:FAIL (MUST-NOT half floor-exempt) |
| S3 | block-refresh-runtime-current | c | standalone refresh: raw download, first-line check, whole replace | PASS 2026-08-15 full | floor:FAIL |
| S4 | refresh-with-runtime-behind | c | rules refresh unconditional when runtime behind | PASS 2026-08-15 full | floor:FAIL |
| S5 | keep-old-pages-serving | c | parallel-files exception, render-worse cost named | PASS 2026-08-15 solo | floor:FAIL · WATCH weak-tier |
| S6 | form-region-swap | c | forms banner: initializeContainer/syncState, no form.reset | PASS 2026-08-15 full | floor:FAIL · leak:C3-mild |
| S7 | layout-coupled-copy-source | both | layout-coupled: copy from a full page, doc explains | PASS 2026-08-15 full | floor:FAIL |
| S8 | update-check | c | banner-lines-only check, content compare, dev's go | PASS 2026-08-15 full | floor:FAIL |
| S9 | re-audit-request | c | dev-requested re-audit recreates the plan | PASS 2026-08-15 full | floor:FAIL |
| S10 | greenfield-first-session | c | greenfield: plan from intent | PASS 2026-08-15 full | floor:FAIL |
| S11 | no-project-hard-stop | c | no project → say so and stop | PASS 2026-08-15 full | floor:FAIL |
| S12 | greenfield-brief-fabrication | c | brief fills template, trim don't pad, two-step floor | PASS 2026-08-15 full | floor:FAIL |
| S13 | cold-spike-ask | c | spike = full ceremony: one parallel page, whole head unit | PASS 2026-08-15 full | floor:FAIL |
| S14 | server-driven-listing-wiring | c | filter/pagination banner-first composite wiring | PASS 2026-08-15 full | floor:FAIL |
| S15 | menu-clipping-in-modal | c | dropmenu portal via banner Rides | PASS 2026-08-15 full | floor:FAIL |
| S16 | modifier-composition | c | verbatim copy + Modifier Classes composition | PASS 2026-08-15 full | floor:PASS |
| S17 | banner-first-install | c | banner-first restore, -dev report, flattened layout | PASS 2026-08-15 full | floor:FAIL |
| S18 | old-template-not-a-blocker | c | older template proceeds on the matching tag; _source population | PASS 2026-08-15 full | floor:FAIL |
| S19 | verification-channel-hunt | c | step 4: project's own harness before the checklist | PASS 2026-08-15 full | floor:FAIL · leak:C2-mild |
| S20 | stray-runtime-discovery | c | empty NDS_ASSETS proves nothing; stray-runtime sweep | PASS 2026-08-15 full | floor:PASS (leak-weakened) · leak:C2 |
| S21 | legacy-globals | c | rule #6 globals: CSS never carried, JS = legacy library | PASS 2026-08-15 full | floor:FAIL |
| S22 | inherited-plan-clean-start | c | inherited plan never resumed; clean-start footprint | PASS 2026-08-15 full | floor:PASS |
| S23 | image-geometry-swap | c | swapped image width/height reset to real pixels | PASS 2026-08-15 full | floor:FAIL |
| S24 | stale-agent-file-rules | c | one rule source; stale agent-file NDS text proposed out | PASS 2026-08-15 full | floor:PASS |
| S25 | banner-first-wiring | both | banner-first wiring; bannerless fallback via doc + file | PASS 2026-08-15 full | floor:FAIL |
| S26 | pasted-block-migration | c | pasted-block migration + step-1 handoff | PASS 2026-08-15 full | floor:FAIL |
| S27 | read-obedience | b | anchor read trigger; missing-file stop | behavior 4/4 PASS 2026-08-10 | floor:n/a |
| S28 | catalog-routing-composed-pattern | c | use_when routing to the composed example | PASS 2026-08-15 full | floor:PASS |
| S29 | catalog-routing-uncatalogued-component | c | Custom Select entry + canon copy | PASS 2026-08-14 scoped | floor:PASS |
| S30 | script-canon-edit-not-rewrite | c | script block is canon; edit point by point | PASS 2026-08-14 wide | floor:PASS+trim |
| S31 | catalog-check-is-a-precondition | c | "NDS has no X" needs the use_when search first | PASS 2026-08-14 scoped | floor:PASS · WATCH copy-canon cap ×3 |
| S32 | required-field-type-verification | c | each required TYPE tested empty, one by one | PASS 2026-08-15 solo | floor:PASS+trim |
| S33 | parts-inventory-before-markup | c | parts inventory; LEGACY shape wins on one control's surface | PASS 2026-08-14 scoped | floor:PASS · WATCH read-depth |
| S34 | request-wiring-and-failure-path | c | NDS.request via core banner + visible failure path | PASS 2026-08-15 full | floor:FAIL · leak:C3-mild |
| S35 | validation-without-a-form-tag | c | form-tags-only gate; validateForm(container) | PASS 2026-08-15 full | floor:PASS |
| S36 | built-twin-is-the-visual-spec | c | twin over HTTP, never file://, chosen-vs-bug split | PASS 2026-08-12 full | floor:PASS (T3-gated) · WATCH file:// rationale ×2 |
| S37 | core-refresh-after-dom-mutation | c | NDS.Init.refresh(container) via the core doc | PASS 2026-08-15 full | floor:FAIL |
| S38 | rendered-markup-not-in-source | c | copy markup that exists; layout-key → built twin | PASS 2026-08-15 full | floor:PASS (clause RESTORED — T3) |
| S39 | doc-folder-routing-utilities | c | folder from the catalog url; utilities route | PASS 2026-08-15 full | floor:PASS |
| S40 | theme-rebind-dark-mirror | c | rule #5 token tier + dark mirror | PASS 2026-08-15 full | floor:FAIL |
| S41 | agent-file-rule-copy | c | never copy rules into the agent file | PASS 2026-08-15 full | floor:FAIL |
| S42 | setup-prompt-first-install | b | guide setup prompt → install → plan handoff | behavior 2/2 PASS 2026-08-15; probe PASS 2026-08-17 | floor:n/a · standing-rule |
| S44 | install-strict-csp | c | step-1 CSP sweep + nonce-first grant | PASS 2026-08-17 scoped | floor:FAIL · leak:C2 (sweep half) |
| S45 | upgrade-Added-sweep | c | upgrade step 3: Migrating + Added/Changed/Fixed report | PASS 2026-08-15 full | floor:FAIL |
| S46 | list-with-controls-toolbar | c | control bar routes to Toolbar via use_when | PASS 2026-08-14 scoped | floor:FAIL |
| S47 | refresh-corrupt-download | c | first-line check rejects a corrupt download | PASS 2026-08-15 full | floor:FAIL |
| S48 | upgrade-reread-after-swap | c | re-read the swapped rulebook mid-upgrade | PASS 2026-08-15 full | floor:FAIL |
| S49 | rules-update-reaches-raw-main | c | update compares raw main, never two local copies | PASS 2026-08-15 full | floor:FAIL |
| S50 | stale-reference-present-on-disk | c | present NDS_ROOT ≠ current; re-download the runtime's release | PASS 2026-08-15 full | floor:FAIL · leak:C2-mild |
| S51 | first-install-flatten-and-declare | c | wrapper contents move up; NDS_ROOT stays unversioned | PASS 2026-08-15 full | floor:PASS |
| S52 | csp-answer-comes-from-the-source | c | source-before-the-dev: head.md §CSP answers | PASS 2026-08-15 solo | floor:FAIL |
| S53 | sso-app-minimal-chrome | c | chrome-shape mapping; minimal ships without asking | PASS 2026-08-15 full | floor:FAIL |
| S54 | plan-waived-single-page | c | plan waiver: rules stay, mix ban stays | PASS 2026-08-15 full | floor:FAIL · WATCH cost-line ×1 |
| S55 | runtime-banner-cross-check | c | JS/CSS banners must agree; legacy-ignore course | PASS 2026-08-15 full | floor:FAIL · leak:C2-mild |
| S56 | no-harness-smoke-before-checklist | c | curl smoke check before the dev checklist | PASS 2026-08-15 full | floor:PASS · leak:C2-mild |
| S57 | host-framework-validation-additions | c | framework-expanded elements banned beside canon | PASS 2026-08-15 full | floor:FAIL |
| S58 | fix-proposals-read-the-source-first | c | fix proposals read the source's own section first | PASS 2026-08-15 full | floor:PASS+trim |
| S59 | no-version-banner-bounded-check | c | bounded Version: check; absence conclusive | netted out (floor-passing) | floor:PASS |
| S60 | make-your-own-browser-channel | c | headless default; "cannot see" only after the attempt | PASS 2026-08-15 full | floor:FAIL · leak:C2 · WATCH checklist-after-success ×1 |
| S61 | asset-url-prefix-confirm | c | derive the served URL, confirm before the first tag | PASS 2026-08-15 full | floor:FAIL · leak:C3-deliberate |
| S62 | section-structure-and-gaps | c | rule #4 sections, nds-grid, --gap | PASS 2026-08-14 scoped | floor:FAIL |
| S63 | page-js-defer-order | c | page JS after chrome tags; inline-defer trap | PASS 2026-08-14 scoped | floor:FAIL |
| S64 | docs-assets-ban | c | never copy docs-assets; re-point demo refs | netted out (floor-passing) | floor:PASS+trim |
| S65 | icon-token-extraction-sweep | c | nds-hgi-* sweep incl. page JS | PASS 2026-08-15 full | floor:FAIL |
| S66 | inherited-wrapper-children | c | keep a wrapper, keep its children | PASS 2026-08-15 full | floor:FAIL |
| S67 | two-canonical-flows-one-page | c | both flows through the catalog; [hidden] card swap | PASS 2026-08-14 scoped | floor:PASS · read-dep |
| S68 | trimmed-copy-keeps-units | c | trim steps, keep class+SVG units | PASS 2026-08-14 scoped | floor:FAIL |
| S69 | custom-scaffold-anchors-on-canon | c | custom scaffolds pull structure from canon usage | PASS 2026-08-14 solo | floor:FAIL · read-dep |
| S70 | knob-verified-by-effect | c | verify a knob by its effect, not coincidence | PASS 2026-08-14 scoped | floor:PASS (leak-caveated) · leak:C2 |
| S71 | fallback-mode-before-substitute | c | missing asset ≠ substitute; the component's own fallback mode | PASS 2026-08-14 scoped | floor:FAIL · read-dep |
| S72 | mobile-width-ladder-resize-blocked | c | headless default over a width-locked attached browser | PASS 2026-08-15 solo | floor:void (class untestable) · leak:C2 |
| S73 | custom-select-default-vs-native-shortcut | c | in-form selects default Custom Select; offer first | PASS 2026-08-14 solo | floor:FAIL · read-dep |
| S74 | plan-review-decisions-are-asked | c | review = ONE stop: numbered decisions in chat | PASS 2026-08-17 solo | floor:FAIL |
| S75 | csp-inline-knob-sweep | c | style=" before-done sweep under a locked style-src | PASS 2026-08-15 full | floor:FAIL |
| S76 | mechanism-vs-filler-split | c | split a copied unit: keep mechanism, cut filler | PASS 2026-08-14 wide | floor:PASS+trim |
| S77 | chrome-ships-as-is | c | topbar/stamp/dark-mode ship as-is, boxed subtract-later | PASS ×2 2026-08-17 solo | floor:PASS (superseded variant) · WATCH stamp-flag |
| S78 | host-framework-attribute-retention | c | asp-for stays attribute-side on canon inputs | PASS 2026-08-14 solo | floor:FAIL |
| S79 | mobile-width-limit-is-not-an-exemption | c | a width limit is not an exemption; headless same-run | PASS 2026-08-15 solo | floor:untestable-class · leak:C2 |
| S80 | legacy-globals-client-rendered | c | entry-import globals noticed while building | CLOSED 2026-08-16 (runs 5–6 PASS) | floor:pair-lesson · withheld-sentence |
| S81 | rules-name-doc-the-template-lacks | c | predates clause: pick the built page by inspection | PASS 2026-08-16 solo + hole probe | floor:PASS (not a trim license) |
| S82 | legacy-sheet-vs-project-nds-layer | c | classify by CONTENT: legacy sheet vs project NDS layer | PASS pair 2026-08-16 | floor:PASS (latent; standing guard) |
| S83 | legacy-globals-caught-at-inventory | c | step-1 stylesheet sweep names bare-element reach | PASS 2026-08-17 confirm (v2.1) | floor:FAIL |
| S84 | composition-source-members-shipped | c | shipped page carries every cited-source member | soft-FAIL 2026-08-17 (de-leaked pair) | leak:C1-fixed · OPEN → R5 |
| S85 | framework-view-lifecycle | c | refresh on mount + destroy on unmount; no poll | PASS 2026-08-17 solo | floor:n/a (doc gate) · WATCH mechanism-naming |
| S86 | verify-headless-entry-gate | c | ladder entry needs a named failed headless attempt | PASS 2026-08-17 (de-leaked) | floor:not run · leak:C2-fixed · OPEN → R1 field half |
