---
name: nds-iq-eval
description: Test and evolve the NDS consumer rules file NDS-IQ.md (draft _includes/NDS-IQ-draft.md, published _includes/NDS-IQ.md) with scenario batteries run by fresh agents, and micro-fixture behavior runs. Use whenever the user asks to test the instructions/rules file, eval the block, check whether an NDS-IQ change broke a rule, run a model sweep (Fable/Opus/Sonnet comprehension comparison), add an eval scenario, or asks how a weaker model would read a rule. Also load it before ANY edit to _includes/NDS-IQ-draft.md — it holds the rules-file policy. Also use after substantial NDS-IQ edits when the user asks "did we break anything". NOT for auditing NDS source JS/CSS (nds-js-audit / nds-css-audit) or doc pages (nds-doc).
---

# nds-iq-eval

Tests the consumer rules file in its draft, `_includes/NDS-IQ-draft.md`; `scripts/publish-iq.py` copies it to `_includes/NDS-IQ.md`, which installs download. A consumer project saves it at its root as `NDS-IQ.md`, and an anchor in the project's agent file makes the agent read it. The file must hold one property: **capability-independence**. A rule the strong model infers and the weak model misses is a bug in the file. The scenarios are the regression suite: every real incident becomes a scenario, so a later rewrite cannot quietly undo a fixed rule.

## Principles

- **Scenarios come from real incidents**: rig findings, session gaps, real dev asks. Never invent hypotheticals. Each scenario records where it came from. The owner's field rigs stay the real evidence.
- **One eval per edit batch, never per edit.** Finish every edit of a sitting first, then run once against the combined diff. Afterwards, re-probe only the findings.
- **Findings are suggest-only.** A divergence becomes a proposed edit only once the text is shown to be ambiguous, not just an agent failure. The owner approves every edit.
- **Runners are fresh `general-purpose` agents with a `model` override, never forks.** A fork inherits this conversation and biases the test.
- **A new sentence must fail the floor first** (see Floor). A stub PASS means the model already does it: fix the source instead.
- **The harness states only what the field state would show.** Setup, prompt and seeded files carry world-state, never the graded answer. The four leak classes are defined in the `scenarios.md` preamble. Reuse field artifacts verbatim where they exist. Write a gate run's setup BLIND, before the sentence it grades. A pass that a leak audit voids goes back to UNMEASURED, never FAIL.
- **Rules run on every template that ships `NDS-INDEX.md`; older ones are redirected.** Consumers on any release since 1.7.0 fetch raw main. A template with no `NDS-INDEX.md` (every 1.x) must send the agent to the frozen `IQv3.2` file: the `old` mode probes that redirect. So a rule leans only on what every template it serves ships (every one with `NDS-INDEX.md`, the oldest included). How to work goes in the rules; what NDS is (a doc, an index section, an audit rule) goes in the template, where it versions with the release.

## Token rules

- **Cheapest instrument first:**
  1. a grep or a mechanical check
  2. one scoped comprehension run
  3. a behavior run on the SMALLEST fixture that lets the behavior fire
  4. the field rig

  Reaching for a costlier instrument when a cheaper one answers is a violation.
- **Name the expected cost before every launch.** A single launch above ~300K tokens needs the owner's explicit go. Measured 2026-10-10 on Sonnet 5.5: a comprehension runner costs ~60K before its first scenario (its setup plus the rules file and the index), and ~80–120K for a batch of 10; `full` ~920K over 10 runners; `old` ~70K; a solo scenario ~60–70K; a behavior run on `mini-app` ~75K (S27 and S42, part (a) each).
- **One run per question.** A scenario with a standing verdict is re-run only if its rules text changed or a field report contradicts it.
- **A behavior run grades everything its artifacts touch.** Use one small fixture for many verdicts. Reuse existing states; author a new one only when no state can host the run.
- **Batch at most ~10 scenarios.** Every batch re-reads the rulebook, and big batches flatten tool effort: the 2026-08-12 full batch made zero routed reads. Never inflate a batch to save the re-read.

## Modes

| Mode | What runs | Model | When |
|---|---|---|---|
| `scoped` (default) | The single most direct scenario for each changed sentence (Workflow step 1). Indirect matches wait for the next `full`. A one-word or list-only edit needs no run: say so. | sonnet | After an edit batch |
| `full` | Every comprehension scenario | sonnet | Before a revision is published |
| `old` | The redirect probe: every scenario with a `root:` field, against the old-template root (below) | sonnet | When the start-here or update text changes; before a revision is published |
| `floor [ids]` | The named scenarios against `fixtures/NDS-IQ-STUB.md`. Only the rulebook path changes, or the comparison is void: the index and docs stay mapped, so a floor PASS means the docs carry it, not the rules. | sonnet | Before a new sentence; when a trim is proposed |
| `behavior <id>` | One scenario or rig against the fixtures | sonnet (or named) | Explicit ask only |
| `sweep` | Every comprehension scenario on fable + opus + sonnet in parallel | all three | The owner's call only, never a release step. Demoted 2026-08-18: it proved nothing the sonnet runs did not. |

Sonnet is the default on purpose. It is the tier the file must not lean on, and the tier this project works on.

**Old-template root.** Build it once per sitting into the disposable `tmp/`:

```bash
T=v1.12.0 R=tmp/iq-old-root-$T && rm -rf $R && mkdir -p $R/_source
git archive $T _js _sass components utilities layout ui-shell core templates examples _data/content | tar -x -C $R/_source
git show $T:CHANGELOG.md > $R/CHANGELOG.md
ls dist/nds-vanilla-template-$T.zip || gh release download $T -p '*.zip' -D dist
python -c "import zipfile,sys;z=zipfile.ZipFile(sys.argv[1]);[z.extract(n,'tmp/iq-old-zip') for n in z.namelist() if '/_site/' in n]" dist/nds-vanilla-template-$T.zip
mv tmp/iq-old-zip/*/_site $R/_site && rm -rf tmp/iq-old-zip
```

- The default tag is the newest 1.x. It ships no `NDS-INDEX.md`, which is what the redirect keys on.
- A scenario with a `root:` field runs only against that tag.
- In the harness prompt:
  - `{SRC}` = `C:\Projects\NDS-vanilla\tmp\iq-old-root-<tag>\_source`
  - `{SITE}` = `C:\Projects\NDS-vanilla\tmp\iq-old-root-<tag>\_site`
  - `{ROOT}` = `C:\Projects\NDS-vanilla\tmp\iq-old-root-<tag>` (CHANGELOG.md, no index)
  - `{ROOT_VERSION}` = the tag without its `v`

## Floor

The floor answers one question: does this sentence earn its place? A scenario that PASSES against the stub measures the model, not the file.

- **A floor PASS on existing text is a trim CANDIDATE, never a trim.** Re-running the cut sentence's own scenario proves nothing, because it already passed with no rules at all. Clear a trim in this order:
  1. **Read** the source that should carry the behavior. It must be a doc, example, catalog or banner the agent is already routed to, **in every template since 1.7.0**. A source fix only absorbs a rule for templates that ship it.
  2. Cut the batch, not one sentence at a time.
  3. Re-run WIDE (`full`), because the live risk is collateral: a sentence that holds up a scenario nobody mapped it to.

  A sentence guarded by both passes and fails stays.
- **A floor FAIL means the model does not do this for free.** It does not by itself justify a sentence. Run the same scenario against the REAL file too, and propose a sentence only when BOTH fail. S80 (2026-08-15) is why: its stub failed, and the real file then disagreed with itself across two setups.
- **A floor result is only as good as its prompt.** A prompt that names the file or surface under test hands the pass (S80, and the S72/S79 tell).
- **Never quote a floor score as "the file contributes X%".** The harness supplies constant context (the `scenarios.md` floor note), so deltas are clean and absolute scores are not.
- **Tool effort dominates.** A floor PASS from a 2-call batch is unproven.

## Workflow

1. **Scope.**
   - Diff the working-tree `_includes/NDS-IQ-draft.md` against `last-evaluated.md` with a shell `diff`. Never Read both: that costs ~23K tokens to learn a few lines.
   - Identical → recommend no run, and name what would trigger the next one.
   - Different → the changed lines are the scope, committed or not.
   - If the ask names no mode, offer numbered options with a recommendation and a rough cost:
     - file edited → `scoped`
     - publish prep or many rules changed → `full` + `old`
     - doubt that stated intent matches real behavior → `behavior <id>`
   - Read the `scenarios.md` INDEX and pick scenarios from its gist column.
   - Pull the picked files' `rules:`, `setup:` and `prompt:` with one field-range shell extraction (awk from the label to the next `- ` label). Fields carry indented continuation lines, so a line-grep truncates them. Never Read a scenario file whole at run time; whole reads are for floor decisions, leak review and `evolve`.
   - A changed rule that no scenario covers gets a drafted scenario with a rubric, flagged as new.
2. **Run.**
   - Spawn one fresh agent per model with the harness prompt. A sweep's models go in one parallel batch.
   - Build `{SCENARIOS}` inline in the Agent prompt from the extracted setup and prompt text, with no batch files on disk.
3. **Grade in-session.**
   - Pull each `rubric:` with the same extraction and diff each answer against it. Only divergences become findings. No grader agents.
   - A read-dependent rubric (a MUST naming a fact only a banner, catalog or doc read supplies) is gradable only from a scoped or solo run. Treat a batch miss on one as harness behavior until a solo run repeats it.
   - When a soft result REPEATS across model tiers, check for a tail-rider first: a rule sitting behind a clause that reads as the sentence's end (S20's real defect).
4. **Verify before proposing.**
   - Re-read the exact sentences involved:
     - genuinely ambiguous or incomplete → CONFIRMED
     - clear text and the agent still failed → drop it, or mark it PLAUSIBLE
   - A surviving finding is presumed a SOURCE fix (Rules-file policy, Attribution).
   - Propose rules text only for a true procedure hole, a mistake-preventing policy or a mandatory structure, and as the minimal edit that extends an existing principle.
5. **Report in the conversation.**
   - Verdict first: n/N clean per model, stamped with each runner's self-reported model version. The alias `sonnet` serves different versions on different machines and dates.
   - Then numbered findings. Each gives the divergence, the sentence, the proposed fix, and apply / skip / discuss options, recommendation included.
   - A report file exists only on explicit ask, with a named reader. It is one undated file, replaced and never accumulated, and it is deleted once its content lands in its real home.
6. **Evolve (explicit `evolve` only).**
   - Add the session's findings as scenarios with rubrics and provenance.
   - Update the rubrics that edits invalidated, and dedupe.
   - Overwrite `last-evaluated.md` with the evaluated file state.
   - Never write skill files without the ask.

## Harness prompt (comprehension)

Keep it canonical, so runs stay comparable. Defaults: `{SRC}` = `{ROOT}` = `C:\Projects\NDS-vanilla`, `{SITE}` = `C:\Projects\NDS-vanilla\_site`, and `{ROOT_VERSION}` = the version the next release takes (2.0.0 while `_config.yml` reads 1.12.x-dev). `old` mode swaps all four. Fill `{SCENARIOS}` with setup + prompt only, never the rubric.

```
You are simulating an AI coding agent working inside a CONSUMER web project
(an ASP.NET MVC app: Views/*.cshtml, wwwroot/ as the static root). That
project's agent file (AGENTS.md) carries the NDS ANCHOR: the two declaration
lines — NDS_ROOT = .nds/ (an extracted NDS template zip, version
{ROOT_VERSION}, present on disk) and NDS_ASSETS = wwwroot/assets/ — plus the
instruction to read NDS-IQ.md at the project root before any UI work. The
project root's NDS-IQ.md is byte-identical to the file stored in this repo at
C:\Projects\NDS-vanilla\_includes\NDS-IQ-draft.md.

First: Read C:\Projects\NDS-vanilla\_includes\NDS-IQ-draft.md in full. That file is
your ONLY rulebook. Ignore every other file in this repo (CLAUDE.md,
AGENTS.md, source code) — they are maintainer-side documents the consumer
agent never sees. ONE exception: where the rules file routes you to a read
under NDS_ROOT, simulate it:
- NDS_ROOT/_source/<path>  is  {SRC}\<path>. The zip's _source/ is a straight
  copy of these folders, so strip the prefix: _js, _sass, components,
  utilities, layout, ui-shell, core, templates, examples, _data/content. For a
  _source/_js/<f>.js read, read only its top banner comment.
- NDS_ROOT/_site/<path>  is  {SITE}\<path>, when it exists. If it does not,
  report the read as unavailable and continue — never substitute the _source
  twin for a _site read, or the reverse.
- NDS_ROOT/NDS-INDEX.md  is  {ROOT}\NDS-INDEX.md, and NDS_ROOT/CHANGELOG.md
  is  {ROOT}\CHANGELOG.md. No other file in {ROOT} is part of NDS_ROOT. A
  file missing there is missing from NDS_ROOT.

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
Do every read your answer depends on now, before you answer, and quote what
you found or name the path that was missing. An answer that describes a read
it did not make is incomplete.

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

## Behavior mode and rigs

Comprehension asks what an agent says it would do. Behavior mode checks what it does: the plan files it writes, the markup it copies, whether it stops at gates, and whether the anchor's read trigger fires. It costs more, so run one scenario or rig per agent, on explicit ask only. It found what a 3-model comprehension sweep could not (S1, 2026-08-10).

The rigs below are small fixtures. A **field rig** is a real legacy app a fresh session ports end to end, run by the owner: `RIGS.md` covers its setup, staging, review and reset (`scripts/rig.py`).

1. **Assemble:** `node fixtures/tools/assemble.mjs --fixture <mini-spa|mini-app|mini-mpa> --state <name|none> --rulebook <real|stub|path> --out <scratchpad dir> [--root repo|mini]`.
   - It fails closed on `check-fixtures.mjs`, extracts the anchor from the rules file's own canon, overlays the state, and writes `run-manifest.json`.
   - `--root repo` (default) copies the real repo: the new doc format. `--root mini` copies `mini-root/`: the old format.
   - Never hand-seed a state; states live leak-audited in `fixtures/states/`.
   - Do NOT tell the runner to read the rulebook. Whether it reads is part of the measurement.
2. **Apply any `setup:` mutation** no state carries, for example stamping a banner version or deleting the root `NDS-IQ.md`.
3. **Spawn one agent.**
   - Its work dir is the assembled copy.
   - Its task is the scenario prompt plus these three lines, verbatim:
     - *"Files under `.nds/` run to thousands of lines: NEVER Read one whole. Grep for the section, class, or markup block you need, then Read ~100 lines around the hit."* It constrains how the runner reads, never whether.
     - *"Do not use the session's interactive browser tools (claude-in-chrome or similar) — they drive the owner's real browser. Any browser you need, launch yourself, headless."*
     - *"Launch any browser you need with `--headless=new` and an explicit throwaway `--user-data-dir` under your temp directory, and kill it by PID when the run ends. Never kill a browser by image name — `taskkill /IM chrome.exe` and its equivalents take the owner's own browser down with them. The same goes for any server you start: note its PID, serve from a directory you can name rather than one you `cd` into, and kill it by PID before you finish."*
   - `mini-spa` and `mini-mpa` RUN: a static server plus repo `playwright-core` (`scripts/lib/browser.mjs`) and the machine's Chrome give a real verify channel. Grant it or withhold it per the scenario, and say so plainly.
   - `mini-app` does not run. Say it serves at a fictional URL and browser verification is unavailable.
4. **Grade the artifacts against the rubric's `artifacts:` list, never the runner's own report.** Use the graders below for the mechanical half; judgment sits on top. Score the FIRST output, never the state after corrections.

**World-state the runner can disprove is worse than none:**
- Never assert "no internet". State the release source positively ("the release artifacts are at `./releases/`").
- Never state a fixture fact the files deny.
- Grade R5 on the runtime bundles only. The seeded zip ships stub `_site/` pages.

**Host-persona bleed.** Runners inherit this session's system prompt, so an active output style or mode can shape what they write (an S25 runner wrote `ponytail:` comments). Scan the artifacts for it and discount what it explains. If it touched a MUST, re-run from a session without the persona.

**Rigs.** One state each, many verdicts per run:

| Rig | Phase | Fixture + state | Graders |
|---|---|---|---|
| R1 | install | `mini-app` + `app-no-root` (runtime 1.7.1 in assets, no `NDS_ROOT`) | `plan-status` |
| R2 | plan | `mini-spa` + `spa-fresh` | `plan-status` |
| R3 | build | `mini-spa` + `spa-post-review` (plan approved, chrome not built) | `chrome-regions`, `icon-tokens`, `premount-modifier`, `s84-members`, `plan-status` |
| R4 | verify | `mini-spa` + `spa-post-build` (frozen from R3) | `verify-artifacts`, `plan-status`, `icon-tokens` |
| R5 | upgrade | `mini-spa` + `spa-old-runtime` (assets 1.8.0, reference newer) | runtime banners by hand |
| R6 | lifecycle | `mini-spa` + `spa-broken-hook` (views stale after route changes) | by hand |
| R7 | legacy port | `mini-mpa` + no state (static Bootstrap/jQuery site) | `legacy-untouched`, `no-legacy-on-nds`, `plan-status` |

Each grader in `fixtures/tools/grade/` is a REPORTER, not a verdict. Its header says what it reads.

The fixtures stay skeletal on purpose: a bigger fixture is a slower run with no extra signal. `fixtures/README.md` maps what each file stands for. When a setup says a surface exists, the fixture must ship it.

## Scenario files

- `scenarios.md` is the INDEX: one row per scenario (id, slug, mode, rules gist, last verdict, flags), plus the file-level harness rules. Scoping reads it alone.
- Each `scenarios/S<n>-<slug>.md` holds these fields:
  - `mode`, optional `root` (a 1.x tag: the scenario's world is that template, so it runs only in `old` mode), `rules` (the sentences under test), `provenance` (one sentence)
  - `setup`, `prompt`, `rubric` (MUST / MUST NOT / cite)
  - optional `artifacts`, `grading note` and `leak`
  - `floor`, `baseline`

  Rubrics never enter runner prompts.
- **No records beyond the current state.**
  - `baseline:` holds the CURRENT verdict: the date, the resolved model version, the run mode and one clause. Add only the standing decisions and the `WATCH <item> ×N (dates)` counters.
  - A new run REPLACES the verdict. Git is the archive.
  - After a run, update the index row.
  - A new scenario is one file, one index row and the numbering line.
- **A read-dependent scenario ships an artifact-forcing prompt from day one.** The prompt ends in a demonstrable artifact: sketch the markup, name the exact calls in order. Without it the answer hides behind a route description, and the run is paid for twice (S69).

## Rules-file policy

**The file and its renders**
- **One source:** `_includes/NDS-IQ-draft.md`, as clean unescaped markdown; `_includes/NDS-IQ.md` is its published copy, written only by `scripts/publish-iq.py`. The consumer reads it once per session. The anchor holds the path values and no version, so it is installed once; the file holds no path values. It is universal: every copy is byte-identical, and an update replaces the whole file. The canonical anchor text lives only in the file's own final section. Edit the rules there, never in a guide.
- **Renders:**
  - `guides/get-started.md` (install and session playbook) and `guides/integration-quality.md` (what it is, revision history) render the published copy via `{% include %}` + `escape`.
  - `_includes/footer.html` derives the footer tag from it.
  - Every revision chip is Liquid-derived from the heading. Never hardcode one.
  - The guides carry `since` and `last_edit` and no `updated`: the rules version independently of the template.
  - The Pages workflow overlays `NDS-IQ.md` and `integration-quality.md` from the `IQv` tag that matches the published file onto the release site, so a draft or a history row on main stays off it.
  - The zip ships neither the rules file nor `_source/`. Its `README.md` is a human signpost only.
- **One workflow.** NDS is a UI layer. The consumer's project already exists and serves, and NDS never scaffolds it. Steps that apply only when replacing an existing UI are marked conditional in place.

**Versions and publishing**
- **One marker, display-only.** `(instructions vX.Y)` in the heading. Only `publish-iq.py` reads it, to name the tag: the update check is a whole-file content compare against raw main, guarded only by a `# NDS IQ` first-line check. Set it BY HAND on the first edit after a publish; later edits before the next publish ride the same number.
- **Raw main's `_includes/NDS-IQ.md` is the publish channel, forever.** Every installed copy carries that link, so only `python scripts/publish-iq.py` writes it. Edit the draft and push it any time. To publish, write the revision's history row in `guides/integration-quality.md`, then run the script: a dry run checks the draft (`check_rules()`), the tag and the row; `--apply` copies, commits and tags `IQvX.Y`. Push main with the tag yourself. The tag is the lock link a dev can pin. `scripts/hooks/pre-push` refuses a main push whose published file differs from the newest `IQv` tag in main's history; an off-main tag (`IQv3.2`) never counts.
- **The file names no template version.** It reads the runtime's own banner and the matching tag's sources, so it runs on any release.
- **`check_rules()` in `scripts/mkrelease.py` fails** (on the draft at publish, on the published copy in the release `verify()`) if the file:
  - names an `x.y.z` literal
  - loses its revision stamp, its `Managed by NDS IQ` plan stamp, its anchor-canon lines, or its Liquid-free state (Liquid delimiters kill the build that renders it)
  - is no longer included by either guide
  - names a literal path missing from the zip (`_site/…`) or the repo tree (`_source/…`)

  After any edit to `check_rules()`, `verify()` or a sentence a guard keys on, run `python scripts/check-release-guards.py`. It breaks the draft once per case and asserts the guard notices.

**What a sentence may say**
- **IQ names no facts.** Each release's `NDS-INDEX.md`, docs and audit own every path, class, API and doc format. Outside the anchor, a sentence may name only `NDS_ROOT`, `NDS_ASSETS`, `NDS-PLAN.md`, `NDS-REPORT.md`, `NDS-IQ.md`, `NDS-INDEX.md`, the release and raw URLs, and the `IQv3.2` tag; `verify()` fails on anything else. A sentence routes by need ("the index names …"), never by path.
- **Every template the rules serve, never blocking.** A doc or runtime feature that only newer releases ship is enrichment. The sentence's action must work without it: report the gap and propose the upgrade, never stall.
- **Attribution default (owner, 2026-08-14): a field failure is a SOURCE finding.**
  - Presume a doc, example, catalog entry or banner was unclear, and fix it there.
  - Never change source just to rescue an agent; change it only when that improves the component or fixes a real gap.
  - A real source gap is fixed in the source, never papered over with rules text.
  - A repeated custom-case means a missing example, which goes to the `examples/` backlog in `TODO.md`.
- **Admission test.** A proposed sentence is a procedure, a claim precondition or an ask trigger. It must end in one of these:
  - an artifact check the agent runs alone (built twin, catalog, `audit()`, banner, grep)
  - a preference question any dev can answer
  - an `NDS-REPORT.md` entry

  Never end it in judgment only a maintainer has. The dev is a preference oracle, not a correctness oracle. A sentence names a component only on field recurrence (the Toolbar precedent).
- **One canonical statement per concern.** Every other place that needs it cross-references it by name.

**Growth control**
- The scenarios hold the behavior. The text is the smallest thing that makes them pass, and its trajectory is DOWN.
- **The cause-removal ladder.** Walk it top-down before any sentence lands:
  1. source fix
  2. shipped mechanism (a template, a stamp, a check, a script)
  3. knowledge at the point of copy (banners, canonical markup)
  4. rules text
- Every field incident becomes a scenario first. The sentence it spawns stays negotiable.
- **Size is a quality outcome, not a budget.** The file is read whole, once a session, by the weakest tier. The old 30K ceiling was retired with the v7 install model.
- **Don'ts:**
  - Never split the file.
  - Never move rules into satellite guides.
  - Never trim rationale speculatively: weak models comply by quoting the why.
- **Consolidation passes** (no new behavior, full re-run) wait for a cycle boundary, never mid-cycle on freshly validated text.
- **Text does not fix every failure.** In v3 field rig 5, six failures reproduced identically on the 44K and the 24K file. A failure that survives a rewrite needs a mechanism, which goes to `TODO.md` and is never patched with more text.

**Evolving.**
- Drive changes from real integration runs, never speculation. Verify each finding against the source first: audit findings are often already fixed or misread.
- Batch edits near publish.
- After a substantive edit, propose a `scoped` run. Before a publish, propose `full` + `old`.
- The skill proposes runs and never auto-runs them.
