# Field rigs

A field rig is a real legacy app that a fresh agent session ports to NDS, with the draft rules and the template the next release ships. It finds what the scenarios and fixtures cannot: an agent's real choices over hours of work. Each run ends with the agent's `NDS-REPORT.md` and `NDS-PLAN.md`, which this repo then reviews.

`scripts/rig.py` does the setup, the staging and the reset. Run it from the repo root, on any PC.

## Baselines

The apps live in `rigs/`, at their clean state. Each one runs on its own port, so all three can run at once; `rig.py` prints the start command and the link. Two rigs of one baseline share its port. These three are starters: rigs designed to test NDS IQ on purpose are planned.

| Baseline | App | Run | URL |
|---|---|---|---|
| `library-portal` | Arabic RTL public library: Express and JSON APIs, Bootstrap RTL, jQuery, DataTables, Select2, Summernote, an SSO stub, a hash-router account area | `npm start` | `http://localhost:3005` |
| `citydesk` | English LTR municipal help desk: Express and JSON APIs, Bootstrap, jQuery, DataTables, Select2, TinyMCE, a staff back office | `npm start` | `http://localhost:3000` |
| `grants-desk` | English staff console: a React single-page app on Vite, no backend | `npm run dev` | `http://localhost:5177` |

## Set up a rig

You need Node, git, Python 3, Ruby with Bundler (the NDS build) and Claude Code.

```bash
python scripts/rig.py new library-portal          # → ../nds-rig-library-portal
```

The script copies the baseline, writes a `CLAUDE.md` that turns off memory for the rig, commits it, tags the commit `baseline`, and runs `npm install`. The `CLAUDE.md` is not in `rigs/` on purpose: a nested one would load into sessions working on NDS itself.

## Run

1. **Commit first.** Staging takes `_source/` from the committed tree, the way a release's source zip does. It takes `NDS-IQ.md` from the working draft.
2. **Stage:** `python scripts/rig.py stage ../nds-rig-library-portal 2.0.0`. The number is the one the next release takes. The script builds the release zip with `mkrelease.py --preview`, unpacks it to the rig's `.nds/`, adds `_source/`, stamps the release number, and copies the draft to `NDS-IQ.md`. A last build puts the dev site back, so a running `jekyll serve` can stay up. After a release, a rig needs no staging: the get-started setup prompt downloads the published rules and the release.
3. **Start the app** in its own terminal (the table above).
4. **Start the agent:** open a new Claude Code session in the rig folder and paste:

   ```
   NDS-IQ.md is at the project root, and the NDS template is extracted at `.nds/`. Confirm that the file starts with `# NDS IQ`, then read it from top to bottom. This is the project's UI-layer rulebook. All NDS work runs by its rules. Set up NDS IQ in this project as its install section describes, then build the plan.
   ```

   This is the get-started setup prompt without its download step: the download would replace the draft with the published file. Answer the review questions as a dev would. `whole plan` pacing tests the most.
5. **Leave it alone.** The rig's NDS work is the agent's. Never fix its pages, plan or report.

## Review

When the run ends, open a session in this repo and ask for a review of the rig's `NDS-REPORT.md` and `NDS-PLAN.md`.

- **The report is self-reported.** Check each claim against the repo, and the rig's pages in a headless browser (`scripts/lib/browser.mjs`), before you fix anything. A claim can be wrong (run 8's late-rows search was a URL key mix-up), or worse than stated (run 8's Contact reset never ran at all).
- **Read the plan's Status column and open items.** A run that ends with rows still `In Progress`, or with the agent's own checks filed as open items, is a rules finding.
- **Fix at the source.** An `NDS.Init.audit()` rule first, then the doc or canon, and rules text last. A rules gap becomes a scenario (`SKILL.md`, Scenario files): the field FAIL stands in for the floor.

## Reset

```bash
python scripts/rig.py reset ../nds-rig-library-portal --save
```

`--save` commits the run, without `.nds/`, to the next `runN-<date>` branch. The reset goes back to the `baseline` tag and removes `.nds/` and `NDS-IQ.md`. Then stage again for the next run.

## Gotchas

- **Leftover servers.** The agent often leaves a static server on `.nds/_site` (`python -m http.server`, a node server; ports seen: 4000, 4001, 4010, 8099). It locks `.nds/`, and the reset reports the path as still locked. Find it with `Get-NetTCPConnection -State Listen` and stop it by PID. Never stop a process by name, and leave the app's own server alone.
- **An empty locked `.nds/` folder** is fine: staging accepts it.
- **A background `jekyll serve` from a Claude session** survives `TaskStop`: the shell ends and ruby keeps running. Several servers then rebuild `_site` at once, and each rebuild fails with "end of file reached". List `ruby.exe` processes and stop yours by PID. A server whose parent is your own terminal is yours to keep.
- **Browser checks** run headless, through `scripts/lib/browser.mjs`. Never the interactive browser tools: they drive the owner's real browser.
