---
name: nds-ai-eval
description: Test and evolve the NDS consumer AI-instructions block (_includes/nds-ai-instructions.md) with scenario batteries run by fresh agents, and micro-fixture behavior runs. Use whenever the user asks to test the instructions block, eval the block, check whether a block change broke a rule, run a model sweep (Fable/Opus/Sonnet comprehension comparison), add an eval scenario, or asks how a weaker model would read a block rule. Also use after substantial block edits when the user asks "did we break anything". NOT for auditing NDS source JS/CSS (nds-js-audit / nds-css-audit) or doc pages (nds-doc).
---

# nds-ai-eval

Evaluates the consumer instructions block (`_includes/nds-ai-instructions.md`) for the one property it must hold: **capability-independence**. A rule the strong model infers but the weak model misses is a block bug. Scenarios are the regression suite; every real incident becomes a scenario so a fixed rule cannot silently regress in a later rewrite.

## Principles

- **Scenarios are born from real incidents** (rig findings, session gaps, real dev asks), never invented hypotheticals. The suite validates that the text is followable; the user's integration rigs remain the real evidence. Record provenance on every scenario.
- **Token discipline is a feature.** Default runs are scoped and single-model. Escalate only on explicit ask.
- **Findings are suggest-only.** A divergence becomes a proposed block edit only after verifying the block text is actually ambiguous (not just an agent failure), and the user approves every edit — same contract as nds-js-audit evolve.
- **Runners are fresh agents, never forks.** A fork inherits this conversation and biases the test. Spawn `general-purpose` agents with a `model` override.

## Modes (cost tiers)

| Mode | What runs | Model(s) | When |
|---|---|---|---|
| `scoped` (default) | Scenarios whose `rules:` touch block lines changed since the last-evaluated state — plain diff of the working-tree block against the `last-evaluated.md` snapshot (commits are irrelevant: uncommitted edits scope correctly) | sonnet | After any block edit |
| `full` | Every comprehension scenario | sonnet | Before a version bump |
| `sweep` | Every comprehension scenario | fable + opus + sonnet in parallel | Pre-release, explicit ask only |
| `behavior <id>` | One scenario against the micro-fixtures | sonnet (or named) | Explicit ask only |

Sonnet is the default deliberately: it is the tier the block must not lean on. Strong models add little signal per token; they earn their cost only in a `sweep`, where the per-model diff IS the signal.

## Workflow

1. **Scope.** First diff the working-tree block against this skill's `last-evaluated.md` snapshot. Identical → recommend no run — there is nothing new to measure — and name what would trigger the next one (next block edit → `scoped`; release prep → `sweep`). Different → the changed lines are the scope; this works identically for committed and uncommitted edits, so eval-fix-eval loops before a commit scope to just the fixes. Then: if the user's ask names a mode, run it. If it doesn't ("test the block", "run nds-ai-eval"), propose the mode as numbered options with a recommendation derived from state, so the user picks the path knowingly: block edited since the last run → `scoped` (recommended); block version bump pending or many rules changed → `full`; release prep → `sweep`; user doubts stated intent matches real behavior → `behavior <id>`. Include each option's rough token cost. Then read `scenarios.md` and select applicable scenarios. If a block rule changed and no scenario covers it, draft one (with rubric) and include it — flag it as new in the report.
2. **Run.** Spawn one fresh `general-purpose` agent per model with the harness prompt below. All models of a sweep go in one parallel batch.
3. **Grade in-session.** Diff each answer against the scenario's rubric. Only divergences become findings. No grader agents — the main session grades.
4. **Verify before proposing.** For each finding, re-read the exact block sentences involved: is the text genuinely ambiguous or incomplete (CONFIRMED), or did the agent fail despite clear text (agent noise — drop it, or mark PLAUSIBLE if unsure)? A finding that survives gets a minimal proposed fix that extends an existing principle — never a new rule per incident.
5. **Report.** In-conversation only (no report files): verdict first (n/N scenarios clean per model), then numbered findings, each with the divergence, the block sentence, the proposed fix, and numbered reply options (apply / skip / discuss), recommended action always in the list.
6. **Evolve (explicit `evolve` only).** Add session findings as scenarios with rubrics and provenance, update rubrics the block edits invalidated, dedupe, and overwrite `last-evaluated.md` with the block state this run evaluated. Never write skill files without the explicit ask.

## Harness prompt (comprehension)

Keep this canonical so runs stay comparable across block versions. Fill `{SCENARIOS}` from `scenarios.md` (setup + prompt only — never the rubric).

```
You are simulating an AI coding agent working inside a CONSUMER web project
(an ASP.NET MVC app: Views/*.cshtml, wwwroot/ as the static root). That
project's CLAUDE.md contains, verbatim, the NDS instructions block stored in
this repo at C:\Projects\NDS-vanilla\_includes\nds-ai-instructions.md. In the
simulation, the block's two declaration lines are set to real values:
NDS_ROOT = .nds/ (an extracted NDS template zip, version {ROOT_VERSION},
present on disk) and NDS_ASSETS = wwwroot/assets/.

First: Read C:\Projects\NDS-vanilla\_includes\nds-ai-instructions.md in full.
That block is your ONLY rulebook. Ignore every other file in this repo
(CLAUDE.md, AGENTS.md, source code) — they are maintainer-side documents the
consumer agent never sees. Do not read anything else. Answer strictly from
the block's text plus ordinary engineering judgment.

Then answer the scenarios below. For each, give exactly three parts:
(a) ACTION — what you do first and next, concretely.
(b) WON'T — what you deliberately do not do.
(c) BASIS — brief quote(s) of the block sentence(s) you relied on.
Keep each scenario's full answer under ~130 words. If the block leaves
something genuinely undefined, say UNDEFINED and state what you'd guess — do
not silently improvise.

{SCENARIOS}

Return your answers as your final message, numbered, nothing else.
```

## Behavior mode (micro-fixtures)

Comprehension asks "what would you do"; behavior mode checks what an agent actually does — plan files written, markup copied verbatim, stopping at gates. Costs more, so: one scenario, one agent, explicit ask.

1. Copy `fixtures/mini-root/` and `fixtures/mini-app/` to the scratchpad.
2. Write the CURRENT block into the fixture app's `CLAUDE.md` with the declaration lines pointing at the copied mini-root and `mini-app/wwwroot/assets/`.
3. Apply the scenario's `setup:` mutations (e.g. stamp the banner version, drop a broken `.nds-*` page in).
4. Spawn one agent: work dir = the fixture app copy, task = the scenario prompt. Tell it the project serves at a fictional URL and browser verification is unavailable (it should emit the checklist per the block).
5. Grade the artifacts against the rubric's `artifacts:` list (e.g. `NDS-PLAN.md` exists with the five columns; no page file written; copied markup byte-matches the fixture doc block).

The fixtures are deliberately skeletal — stubs with just enough structure for the block's references to resolve. Do not grow them toward realism; a bigger fixture is a slower, costlier eval with no extra signal. `fixtures/README.md` maps what each file stands in for.

## Scenario file

`scenarios.md` — one `## S<n> <slug>` per scenario: `mode`, `rules` (block sentences under test), `provenance`, `setup`, `prompt`, `rubric` (MUST / MUST NOT / cite), optional `artifacts` (behavior mode), optional `baseline` (last known result per model). Rubrics never enter runner prompts.
