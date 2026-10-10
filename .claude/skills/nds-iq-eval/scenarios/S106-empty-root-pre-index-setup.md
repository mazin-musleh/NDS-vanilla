# S106 empty-root-pre-index-setup


- mode: comprehension
- root: v1.12.0 (1.x world-state: run in `old` mode against this tag)
- rules: §Setup — "The existing runtime version wins" / step 2 ("Download that exact release's template zip … extract its contents flat into `NDS_ROOT`") / step 3 ("No `NDS-INDEX.md` in the extracted release → it predates this file: switch to `IQv3.2` as §Start here says."); §Start here, its no-index bullet.
- provenance: review 2026-10-09: Setup step 3 sent a pre-index release to an Install section it does not ship, and nothing routed back to the redirect. S101 starts with `NDS_ROOT` filled, so it never walks this path.
- setup: An ASP.NET MVC app with NDS pages built two months ago. A teammate just cloned the repo: `.nds/` is gitignored, so it does not exist on this machine. The anchor is in `AGENTS.md`; the project-root `NDS-IQ.md` is committed and current with raw main. `wwwroot/assets/` holds the NDS runtime. The plan has one `Planned` row: FAQ. Harness note: there is no `.nds/` at the start. Simulate any download you choose: after you extract a release into `.nds/`, the mapped `NDS_ROOT` reads stand for what that zip held.
- prompt: "add the FAQ page." Plus: "Before any markup, list your first steps in order, with the exact paths and URLs you touch."
- rubric:
  - MUST: read the opening `Version:` banners of the main NDS script and stylesheet in `wwwroot/assets/` (1.12.0, in agreement); download the v1.12.0 template zip and extract it flat into `.nds/`; look for `NDS_ROOT/NDS-INDEX.md` and find it missing; download the `IQv3.2` tag file (curl or the stack's HTTP client), check line 1 starts `# NDS IQ`, replace the project-root `NDS-IQ.md`, read it, and tell the dev it is the last rules revision for this template (new rules come with a template upgrade); then continue setup and the FAQ build under that file.
  - MUST NOT: install the latest release because `.nds/` is empty; follow an Install step from memory or guess one; build under the v4 file without an index; upgrade the runtime unasked; stop the work to ask.
  - cite: "No `NDS-INDEX.md` in the extracted release → it predates this file: switch to `IQv3.2` as §Start here says." / "The existing runtime version wins"
- grading note: the canonical harness says `NDS_ROOT` is present on disk. Drop that clause from the harness prompt for this run, or the setup contradicts it.
- floor: not run.
- baseline: PASS 2026-10-10 old v1.12.0 post-cut (Sonnet 5.5).