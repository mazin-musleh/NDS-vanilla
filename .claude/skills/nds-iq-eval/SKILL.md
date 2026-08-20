---
name: nds-iq-eval
description: Test and evolve the NDS consumer rules file NDS-IQ.md (source _includes/NDS-IQ.md) with scenario batteries run by fresh agents, and micro-fixture behavior runs. Use whenever the user asks to test the instructions/rules file, eval the block, check whether an NDS-IQ change broke a rule, run a model sweep (Fable/Opus/Sonnet comprehension comparison), add an eval scenario, or asks how a weaker model would read a rule. Also use after substantial NDS-IQ edits when the user asks "did we break anything". NOT for auditing NDS source JS/CSS (nds-js-audit / nds-css-audit) or doc pages (nds-doc).
---

# nds-iq-eval

Evaluates the consumer rules file (`_includes/NDS-IQ.md` — installed at a consumer project's root as `NDS-IQ.md`, read on demand when an anchor in the project's agent file fires) for the one property it must hold: **capability-independence**. A rule the strong model infers but the weak model misses is a file bug. Scenarios are the regression suite; every real incident becomes a scenario so a fixed rule cannot silently regress in a later rewrite.

## Principles

- **Scenarios are born from real incidents** (rig findings, session gaps, real dev asks), never invented hypotheticals. The suite validates that the text is followable; the user's integration rigs remain the real evidence. Record provenance on every scenario.
- **Token discipline is a feature.** Default runs are scoped and single-model. Escalate only on explicit ask.
- **One eval per edit-batch, never per edit.** Finish ALL of a sitting's edits (rules, catalog, docs) first, then run once against the combined diff; re-probe only findings. Firing a run after each sentence multiplies cost with no added signal — the 2026-08-14 cycle spent 5 launches (~520K subagent tokens) where 2 carried the same information.
- **Findings are suggest-only.** A divergence becomes a proposed file edit only after verifying the text is actually ambiguous (not just an agent failure), and the user approves every edit — same contract as nds-js-audit evolve.
- **Runners are fresh agents, never forks.** A fork inherits this conversation and biases the test. Spawn `general-purpose` agents with a `model` override.
- **A new sentence must fail the floor first.** Before proposing any addition to `_includes/NDS-IQ.md`, run its scenario in `floor` mode. Stub PASSES → the model already does this and the sentence buys nothing: fix the source instead (doc, example, catalog, banner), which is where AGENTS.md's attribution default sends it anyway. Stub FAILS → the sentence is carrying real weight and can be proposed. This is the cheap half of the cause-removal ladder: it tells you whether the top rung is even needed before you argue about wording.
- **The harness states only what the field state would show.** A scenario's setup, prompt, and seeded artifacts carry world-state, never the graded answer — the leak-class taxonomy (four classes, proven cases, audited 2026-08-17) is canonical in the `scenarios.md` preamble, next to the `leak:` labels it defines. Reuse field artifacts verbatim where they exist; author a same-sitting gate run's setup BLIND — written before the sentence it will grade. A pass a leak audit voids reverts to UNMEASURED, never FAIL.

## Token efficiency (hard rules)

- **Cheapest instrument first, always:** a grep or mechanical check → one scoped comprehension run → behavior on the SMALLEST fixture that lets the graded behavior fire → the field rig. Reaching for a costlier instrument when a cheaper one answers the question is a violation, not a preference.
- **Every proposed run names its expected token cost before launch.** Anything above ~300K in one launch needs the owner's explicit go.
- **One run per question.** A scenario with a standing verdict is never re-run unless its rules text changed or a field report contradicts it. (Extends the one-eval-per-edit-batch principle.)
- **Behavior runs grade everything their artifacts touch** — one small fixture, many verdicts. A single-scenario rig is the exception, used only when no existing state can carry it.
- **Fixtures stay skeletal and states get reused.** A new state is authored only when no existing one can host the run — authoring and leak-auditing a state costs more than most runs.
- **Small batches are paid for, not waste.** Every runner batch re-reads the full rulebook, so fewer, bigger batches look cheaper — but big batches flatten per-scenario tool effort (the 2026-08-12 full batch made ZERO routed reads) and a lazy runner under-passes. The re-read tax is the price of runners that actually read; never "optimize" it by inflating batch size past the ~10 the Floor section's tool-effort rule sets.

## Modes (cost tiers)

| Mode | What runs | Model(s) | When |
|---|---|---|---|
| `scoped` (default) | Scenarios whose `rules:` cover the changed lines. The diff is mechanical — working-tree `_includes/NDS-IQ.md` against the `last-evaluated.md` snapshot (commits are irrelevant: uncommitted edits scope correctly) — but the scenario match is judgment: `rules:` is prose, many scenarios quote no literal, so read each `rules:` line against the changed sentences and pick the SINGLE most direct scenario per changed sentence — the one whose rubric the sentence exists to satisfy. Plausible-but-indirect matches ride the next `full` run instead (that run exists to catch cross-effects); a one-word or enumeration-only edit whose reading is obvious needs no run at all, just say so | sonnet | After an edit batch |
| `full` | Every comprehension scenario | sonnet | Before a version bump |
| `sweep` | Every comprehension scenario | fable + opus + sonnet in parallel | Occasional, owner's call only — NOT a release step |
| `behavior <id>` | One scenario against the micro-fixtures | sonnet (or named) | Explicit ask only |
| `floor [ids]` | The named scenarios — or all of them — against `fixtures/NDS-IQ-STUB.md` instead of the real rules file. Everything else in the harness stays byte-identical; ONLY the rulebook path changes, or the comparison is void | sonnet | Before writing a new sentence; when a trim is proposed; explicit ask |

Sonnet is the default deliberately: it is the tier the file must not lean on, and it is the tier this project works on. Strong models add little signal per token. **The 3-model sweep is demoted (owner call 2026-08-18): it proved nothing the sonnet runs did not, so it is occasional and on the owner's ask, never a release gate.** Reach for it only when a specific question needs the per-model diff — a sentence suspected of leaning on capability, say — not as routine pre-release ceremony.

**Floor mode answers "does this sentence earn its place?"** A scenario that PASSES with a stub rulebook is measuring the model, not the file. Every scenario carries a `floor:` line from the 2026-08-14 run (24 PASS / 51 FAIL / 2 n-a — see the `scenarios.md` index preamble for the lower-bound caveats); a scenario with no `floor:` line has never been floor-run.

- **A floor PASS is a trim CANDIDATE, never a trim.** Confirm the source actually carries the behavior, then remove the sentence and re-run its scenario: pass → remove → still-pass. Skipping that is how a rule disappears because a doc happened to answer once.
- **A floor FAIL is the sentence earning its keep** — the strongest evidence a rule should exist. Do not trim it without a source fix that absorbs it first.
- Floor passes cluster on **source-doc-answerable** scenarios. That is the cause-removal ladder showing up as data: when a doc, catalog or banner answers, the rules text is redundant. `ea66d4e5` (a wrapper comment added to nine sources) is the worked example — it made S36 and S38 free.
- **Never quote a floor score as "the file contributes X%".** The floor is not zero-knowledge — the harness supplies constant context (what exactly: the `scenarios.md` preamble's floor note), so floor-vs-file deltas are clean but the absolute score is not a contribution measure.
- **Tool effort dominates the result.** In the 2026-08-14 run one batch made 39 tool calls and most made 2, and the high-reading batch passed far more. Batch small (≤10) and treat any floor PASS from a 2-call batch as unproven — a lazy runner under-passes, which makes the file look more necessary than it is.

## Workflow

1. **Scope.** First diff the working-tree `_includes/NDS-IQ.md` against this skill's `last-evaluated.md` snapshot — a shell `diff`, never Read: pulling both files into context costs ~23K tokens to learn a handful of changed lines. Identical → recommend no run — there is nothing new to measure — and name what would trigger the next one (next file edit → `scoped`; release prep → `sweep`). Different → the changed lines are the scope; this works identically for committed and uncommitted edits, so eval-fix-eval loops before a commit scope to just the fixes. Then: if the user's ask names a mode, run it. If it doesn't ("test the file", "run nds-iq-eval"), propose the mode as numbered options with a recommendation derived from state, so the user picks the path knowingly: file edited since the last run → `scoped` (recommended); version bump pending or many rules changed → `full`; release prep → `full`; user doubts stated intent matches real behavior → `behavior <id>`. Include each option's rough token cost. Then read the `scenarios.md` INDEX (one small read) and pick the applicable scenarios from its rules-gist column; pull the picked `scenarios/S<n>-<slug>.md` files' `rules:`, `setup:` and `prompt:` fields with one field-range shell extraction (awk/sed from the field label to the next `- ` label — fields carry indented continuation lines, so a plain line-grep truncates). Never Read a scenario file whole at run time: ~40% of its bytes is provenance/floor/baseline history no run step uses. Whole-file reads are for when the history IS the question (floor decisions, leak review, `evolve`). If a rule changed and no scenario covers it, draft one (with rubric) and include it — flag it as new in the report.
2. **Run.** Spawn one fresh `general-purpose` agent per model with the harness prompt below. All models of a sweep go in one parallel batch. Build each batch's `{SCENARIOS}` inline in the Agent prompt, straight from the setup+prompt text you just extracted — no tmp files, no batch files on disk (the field-range extraction prints to stdout; the ban is the disk round-trip). The 2026-08-13 full run wrote a Python extractor, dumped three batch files to disk, then hand-copied them back into three prompts; the cap made a script look necessary and it was not.
3. **Grade in-session.** Pull each scoped scenario's `rubric:` block now (same field-range extraction) and diff each answer against it. Only divergences become findings. No grader agents — the main session grades. Batch runs flatten per-scenario tool effort — the 2026-08-12 full batch made ZERO routed reads — so a read-dependent rubric (a MUST naming a fact only a banner, catalog, or doc read supplies) is gradable only from a scoped or solo run; presume a batch miss on one is harness behavior until a solo run repeats it. When a soft REPEATS across model tiers, check for a tail-rider before assuming batch noise — a rule sitting behind a clause that reads as the sentence's ending. That was S20's actual defect, and it is the first thing to test.
4. **Verify before proposing.** For each finding, re-read the exact file sentences involved: is the text genuinely ambiguous or incomplete (CONFIRMED), or did the agent fail despite clear text (agent noise — drop it, or mark PLAUSIBLE if unsure)? A finding that survives gets a minimal proposed fix that extends an existing principle — never a new rule per incident. Then screen it against AGENTS.md's attribution default: a surviving finding is presumed a SOURCE fix (doc, example, catalog, banner) — it becomes proposed rules text only for a true procedure hole, a mistake-preventing policy, or a mandatory structure, and only if the sentence ends in an artifact check, a preference question, or an NDS-REPORT entry (never maintainer-only judgment).
5. **Report.** In-conversation by default: verdict first (n/N scenarios clean per model), stamped with each runner's self-reported model version — `sonnet` is an alias that serves different versions on different machines and dates, so the alias alone makes results incomparable — then numbered findings, each with the divergence, the file sentence, the proposed fix, and numbered reply options (apply / skip / discuss), recommended action always in the list. A report file exists only on explicit ask AND with a named reader the in-conversation report cannot serve; it is ONE undated file, replaced never accumulated, and it dies the moment its content lands in its working home (baselines, TODO, the rules file). Findings act or die — dated report piles are banned by the no-records rule; git is the archive.
6. **Evolve (explicit `evolve` only).** Add session findings as scenarios with rubrics and provenance, update rubrics the file edits invalidated, dedupe, and overwrite `last-evaluated.md` with the file state this run evaluated. Never write skill files without the explicit ask.

## Harness prompt (comprehension)

Keep this canonical so runs stay comparable across file versions. Fill `{SCENARIOS}` from the picked `scenarios/S<n>-<slug>.md` files (setup + prompt only — never the rubric; the index has no field text).

```
You are simulating an AI coding agent working inside a CONSUMER web project
(an ASP.NET MVC app: Views/*.cshtml, wwwroot/ as the static root). That
project's agent file (AGENTS.md) carries the NDS ANCHOR: the two declaration
lines — NDS_ROOT = .nds/ (an extracted NDS template zip, version
{ROOT_VERSION}, present on disk) and NDS_ASSETS = wwwroot/assets/ — plus the
instruction to read NDS-IQ.md at the project root before any UI work. The
project root's NDS-IQ.md is byte-identical to the file stored in this repo at
C:\Projects\NDS-vanilla\_includes\NDS-IQ.md.

First: Read C:\Projects\NDS-vanilla\_includes\NDS-IQ.md in full. That file is
your ONLY rulebook. Ignore every other file in this repo (CLAUDE.md,
AGENTS.md, source code) — they are maintainer-side documents the consumer
agent never sees. ONE exception: where the rules file routes you to a read
under NDS_ROOT, simulate it against this repo:
- NDS_ROOT/_source/<path>  is  C:\Projects\NDS-vanilla\<path>. The zip's
  _source/ is a straight copy of the repo's own folders, so strip the prefix:
  _js, _sass, components, utilities, layout, ui-shell, core, templates, examples,
  _data/content. For a _source/_js/<f>.js read, read only its top banner comment.
- NDS_ROOT/_site/<path>  is  C:\Projects\NDS-vanilla\_site\<path>, when a build
  exists. If it does not, report the read as unavailable and continue — never
  substitute the _source twin for a _site read, or the reverse.

If a routed read lands on a path that does not exist, say so explicitly and
name the path you tried. Do not silently substitute a different file: a routing
bug in the rules file surfaces here as a missing path, and a silent substitution
hides the very defect the run exists to find.

Doc pages under components/, examples/, templates/, layout/, ui-shell/ run to
thousands of lines: NEVER Read one whole. Grep it for the section or class you
need, then Read ~100 lines around the hit. (The rules file itself is the one
full read.)

Read only what the rules file's own workflow would have you read; nothing else. Answer strictly from the
file's text, those routed reads, and ordinary engineering judgment.

Then answer the scenarios below. For each, give exactly three parts:
(a) ACTION — what you do first and next, concretely.
(b) WON'T — what you deliberately do not do.
(c) BASIS — brief quote(s) of the sentence(s) you relied on (rules file or
    a routed banner).
Keep each scenario's full answer under ~130 words. If the rules leave
something genuinely undefined, say UNDEFINED and state what you'd guess — do
not silently improvise.

{SCENARIOS}

Return, as your final message: first line = your exact model name and model
ID from your environment info, then your answers, numbered, nothing else.
```

## Behavior mode (micro-fixtures)

Comprehension asks "what would you do"; behavior mode checks what an agent actually does — plan files written, markup copied verbatim, stopping at gates, and (v0.7) whether the anchor's read trigger actually fires. Costs more, so: one scenario, one agent, explicit ask.

1. Assemble the run dir: `node fixtures/tools/assemble.mjs --fixture <mini-spa|mini-app> --state <name|none> --rulebook <real|stub> --out <scratchpad dir>` (`--root mini` swaps the repo real-copy `.nds/` for `mini-root/` — the classic mini-app scenarios). It fail-closes on `check-fixtures.mjs`, extracts the anchor from the rules file's own canon, overlays the checked-in state, and stamps `run-manifest.json` — "what was the runner shown?" becomes a file read. Never hand-seed a state inline; states live leak-audited in `fixtures/states/` (the S84 leak was born in hand-seeding). Do NOT tell the runner to read the rulebook — whether it reads is part of what behavior mode measures.
2. Apply any scenario `setup:` mutations no state carries (e.g. stamp a banner version, drop a broken `.nds-*` page in, delete the root `NDS-IQ.md` for read-obedience part d).
3. Spawn one agent: work dir = the assembled copy, task = the scenario prompt plus, verbatim, the behavior read-discipline line: *"Files under `.nds/` run to thousands of lines: NEVER Read one whole. Grep for the section, class, or markup block you need, then Read ~100 lines around the hit."* It constrains HOW the runner reads, never WHETHER — it names only the `.nds/` path the anchor already declares, never the rulebook, so the read-trigger measurement stays clean — and it is part of the harness constant from 2026-08-20 (behavior baselines before that date predate it; a routed read that dominated an older run's cost is not comparable). Without it a single rig run spends 300–430K tokens, mostly on whole doc reads (S84: 186 tool calls, 418K). The task also carries, verbatim: *"Do not use the session's interactive browser tools (claude-in-chrome or similar) — they drive the owner's real browser. Any browser you need, launch yourself, headless."* (Added 2026-08-20 after an R7 runner opened a tab in the owner's Chrome. Tradeoff, accepted: the S86 tab-temptation can never fire in a rig — comprehension covers it.) `mini-spa` RUNS — a plain static server serves it and repo `puppeteer-core` + the machine's Chrome give the runner a REAL verify channel; grant or withhold serving/browsing per what the scenario measures, and state the constraints plainly. `mini-app` stays non-running: tell the runner the project serves at a fictional URL and browser verification is unavailable (it should emit the checklist per the rules).
4. Grade the artifacts against the rubric's `artifacts:` list (e.g. `NDS-PLAN.md` exists with the five columns and the `Managed by NDS IQ` opener; no page file written; copied markup byte-matches the fixture doc block). Use a `fixtures/tools/grade/` reporter for the mechanical half where one exists (S84's member diff); judgment sits on top.

**Runners are not neutral — check the artifacts for host-persona bleed before grading.** The runner inherits this session's system prompt, so a persona active in the host (an output style, a `/`-invoked mode) reaches it and shapes what it writes. Observed on an S25 run: the runner annotated its uncertainty with `ponytail:` comments, which is the host's persona, not anything NDS IQ asks for. Nothing was invalidated there — every graded behavior was still an NDS-IQ one — but a graded artifact carrying a house style the rules never named is a measurement of the host, not the file. Scan for it, discount what it explains, and say so in the report. If it touched a MUST, re-run the scenario from a session without that persona.

The fixtures are deliberately skeletal — stubs with just enough structure for the rules file's references to resolve. Do not grow them toward realism; a bigger fixture is a slower, costlier eval with no extra signal. `fixtures/README.md` maps what each file stands in for.

## Scenario files

`scenarios.md` is the INDEX: one row per scenario (id, slug, mode, rules gist, last verdict, flags) plus the standing harness rules — scoping reads it alone. The full record lives in `scenarios/S<n>-<slug>.md`: `mode`, `rules` (file sentences under test), `provenance` (short), `setup`, `prompt`, `rubric` (MUST / MUST NOT / cite), optional `artifacts` (behavior mode), optional `grading note`, `floor`, optional `leak`, `baseline`. Rubrics never enter runner prompts.

**Records follow the no-records rule** (Principles): `baseline:` is the CURRENT verdict — date, resolved model version (the bare alias is ambiguous across machines and dates), run mode, one clause — plus surviving standing decisions and WATCH counters (`×N` with dates, never narrative). A new run REPLACES the verdict; at most one open story stays while an item is live, and it dies at close leaving its one-line decision. After any run, update the scenario's index row (verdict + flags); a new scenario = one file + one index row + the index's numbering line. Git is the archive — the pre-split monolith is at commit `6490326a`.

**Read-dependent scenarios ship with an artifact-forcing prompt from day one** — a prompt that ends in a demonstrable artifact (sketch the markup, name the exact calls in order) so the answer cannot hide behind a route description. The alternative is a two-step you pay for twice: batch INCONCLUSIVE → solo re-probe (S69's first exposure, 2026-08-14, ~224K tokens for one scenario). The solo prompt's artifact ask is what settled it in one run; write that ask into the scenario's `prompt:` from the start.
