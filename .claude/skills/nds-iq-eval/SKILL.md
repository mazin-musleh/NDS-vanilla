---
name: nds-iq-eval
description: Test and evolve the NDS consumer rules file NDS-IQ.md (source _includes/NDS-IQ.md) with scenario batteries run by fresh agents, and micro-fixture behavior runs. Use whenever the user asks to test the instructions/rules file, eval the block, check whether an NDS-IQ change broke a rule, run a model sweep (Fable/Opus/Sonnet comprehension comparison), add an eval scenario, or asks how a weaker model would read a rule. Also use after substantial NDS-IQ edits when the user asks "did we break anything". NOT for auditing NDS source JS/CSS (nds-js-audit / nds-css-audit) or doc pages (nds-doc).
---

# nds-iq-eval

Evaluates the consumer rules file (`_includes/NDS-IQ.md` — installed at a consumer project's root as `NDS-IQ.md`, read on demand when an anchor in the project's agent file fires) for the one property it must hold: **capability-independence**. A rule the strong model infers but the weak model misses is a file bug. Scenarios are the regression suite; every real incident becomes a scenario so a fixed rule cannot silently regress in a later rewrite.

## Principles

- **Scenarios are born from real incidents** (rig findings, session gaps, real dev asks), never invented hypotheticals. The suite validates that the text is followable; the user's integration rigs remain the real evidence. Record provenance on every scenario.
- **Token discipline is a feature.** Default runs are scoped and single-model. Escalate only on explicit ask.
- **Findings are suggest-only.** A divergence becomes a proposed file edit only after verifying the text is actually ambiguous (not just an agent failure), and the user approves every edit — same contract as nds-js-audit evolve.
- **Runners are fresh agents, never forks.** A fork inherits this conversation and biases the test. Spawn `general-purpose` agents with a `model` override.

## Modes (cost tiers)

| Mode | What runs | Model(s) | When |
|---|---|---|---|
| `scoped` (default) | Scenarios whose `rules:` cover the changed lines. The diff is mechanical — working-tree `_includes/NDS-IQ.md` against the `last-evaluated.md` snapshot (commits are irrelevant: uncommitted edits scope correctly) — but the scenario match is judgment: `rules:` is prose, many scenarios quote no literal, so read each `rules:` line against the changed sentences and include every plausible match (when unsure, include) | sonnet | After any file edit |
| `full` | Every comprehension scenario | sonnet | Before a version bump |
| `sweep` | Every comprehension scenario | fable + opus + sonnet in parallel | Pre-release, explicit ask only |
| `behavior <id>` | One scenario against the micro-fixtures | sonnet (or named) | Explicit ask only |

Sonnet is the default deliberately: it is the tier the file must not lean on. Strong models add little signal per token; they earn their cost only in a `sweep`, where the per-model diff IS the signal.

## Workflow

1. **Scope.** First diff the working-tree `_includes/NDS-IQ.md` against this skill's `last-evaluated.md` snapshot. Identical → recommend no run — there is nothing new to measure — and name what would trigger the next one (next file edit → `scoped`; release prep → `sweep`). Different → the changed lines are the scope; this works identically for committed and uncommitted edits, so eval-fix-eval loops before a commit scope to just the fixes. Then: if the user's ask names a mode, run it. If it doesn't ("test the file", "run nds-iq-eval"), propose the mode as numbered options with a recommendation derived from state, so the user picks the path knowingly: file edited since the last run → `scoped` (recommended); version bump pending or many rules changed → `full`; release prep → `sweep`; user doubts stated intent matches real behavior → `behavior <id>`. Include each option's rough token cost. Then read `scenarios.md` and select applicable scenarios. If a rule changed and no scenario covers it, draft one (with rubric) and include it — flag it as new in the report.
2. **Run.** Spawn one fresh `general-purpose` agent per model with the harness prompt below. All models of a sweep go in one parallel batch.
3. **Grade in-session.** Diff each answer against the scenario's rubric. Only divergences become findings. No grader agents — the main session grades.
4. **Verify before proposing.** For each finding, re-read the exact file sentences involved: is the text genuinely ambiguous or incomplete (CONFIRMED), or did the agent fail despite clear text (agent noise — drop it, or mark PLAUSIBLE if unsure)? A finding that survives gets a minimal proposed fix that extends an existing principle — never a new rule per incident.
5. **Report.** In-conversation by default: verdict first (n/N scenarios clean per model), stamped with each runner's self-reported model version — `sonnet` is an alias that serves different versions on different machines and dates, so the alias alone makes results incomparable — then numbered findings, each with the divergence, the file sentence, the proposed fix, and numbered reply options (apply / skip / discuss), recommended action always in the list. On explicit ask ("save the report"), also write it to this skill's `reports/eval-<YYYY-MM-DD>-<mode>-<model>.md`, following the structure of the reports already there (mode, model version, file state, verdict, scoreboard, findings, resolution).
6. **Evolve (explicit `evolve` only).** Add session findings as scenarios with rubrics and provenance, update rubrics the file edits invalidated, dedupe, and overwrite `last-evaluated.md` with the file state this run evaluated. Never write skill files without the explicit ask.

## Harness prompt (comprehension)

Keep this canonical so runs stay comparable across file versions. Fill `{SCENARIOS}` from `scenarios.md` (setup + prompt only — never the rubric).

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

1. Copy `fixtures/mini-root/` and `fixtures/mini-app/` to the scratchpad.
2. Write the ANCHOR into the fixture app's `AGENTS.md` (the two declaration lines pointing at the copied mini-root and `mini-app/wwwroot/assets/`, plus the read trigger and hard stops, exactly as the Install section of `_includes/NDS-IQ.md` specifies) and copy the CURRENT `_includes/NDS-IQ.md` to the fixture app root as `NDS-IQ.md`. Do NOT tell the runner to read it — whether it reads is part of what behavior mode measures.
3. Apply the scenario's `setup:` mutations (e.g. stamp the banner version, drop a broken `.nds-*` page in, delete the root `NDS-IQ.md` for read-obedience part d).
4. Spawn one agent: work dir = the fixture app copy, task = the scenario prompt. Tell it the project serves at a fictional URL and browser verification is unavailable (it should emit the checklist per the rules).
5. Grade the artifacts against the rubric's `artifacts:` list (e.g. `NDS-PLAN.md` exists with the five columns and the `Managed by NDS IQ` opener; no page file written; copied markup byte-matches the fixture doc block).

**Runners are not neutral — check the artifacts for host-persona bleed before grading.** The runner inherits this session's system prompt, so a persona active in the host (an output style, a `/`-invoked mode) reaches it and shapes what it writes. Observed on an S25 run: the runner annotated its uncertainty with `ponytail:` comments, which is the host's persona, not anything NDS IQ asks for. Nothing was invalidated there — every graded behavior was still an NDS-IQ one — but a graded artifact carrying a house style the rules never named is a measurement of the host, not the file. Scan for it, discount what it explains, and say so in the report. If it touched a MUST, re-run the scenario from a session without that persona.

The fixtures are deliberately skeletal — stubs with just enough structure for the rules file's references to resolve. Do not grow them toward realism; a bigger fixture is a slower, costlier eval with no extra signal. `fixtures/README.md` maps what each file stands in for.

## Scenario file

`scenarios.md` — one `## S<n> <slug>` per scenario: `mode`, `rules` (file sentences under test), `provenance`, `setup`, `prompt`, `rubric` (MUST / MUST NOT / cite), optional `artifacts` (behavior mode), optional `baseline` (last known result per model, with the resolved model version when known — the alias alone is ambiguous across machines and dates). Rubrics never enter runner prompts.
