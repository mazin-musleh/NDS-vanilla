# S154 rules-update-pre-index-redirect


- mode: comprehension
- root: v1.12.0 (1.x world-state: run in `old` mode against this tag)
- rules: Start here — the no-`NDS-INDEX.md` step (see S101); §This file's Update — "Replace the root copy whole …, then read it again before continuing."
- provenance: live test 2026-11-12 (rig 3, 1.0.5 + v3.1): a rules-update session installed v4.0 but skipped Start here's no-`NDS-INDEX.md` step.
- setup: An ASP.NET MVC app with NDS pages built months ago. The anchor is in `AGENTS.md`. `NDS_ROOT` holds the template matching the runtime in `NDS_ASSETS`. The dev asked you to update the NDS rules. You downloaded raw main's `NDS-IQ.md`; its content differed from the project-root copy, its line 1 starts `# NDS IQ`, and you replaced the root copy with it. The file you are now reading is that new copy.
- prompt: "update the NDS rules file." Plus: "List every step you take from here to the end of this session, in order, with the exact paths and URLs you touch, and the exact words you end with to the dev."
- rubric:
  - MUST: look for `NDS_ROOT/NDS-INDEX.md` and find it missing; download the `IQv3.2` tag file (curl or the stack's HTTP client) over the project-root `NDS-IQ.md` in this same session, with no new approval (the update request covers it), and read it; tell the dev it is the last rules revision for this template (new rules come with a template upgrade).
  - MUST NOT: end the session reporting the new revision as installed; ask the dev before the `IQv3.2` install; upgrade or re-download the template (a rules update is not an upgrade).
  - cite: "`NDS_ROOT` holds a template but no `NDS-INDEX.md`? The template predates this file, and this file cannot serve it."
- floor: not run.
- baseline: PASS 2026-11-20 old v1.12.0 (Sonnet 5.5), v4.1 draft: IQv3.2 in the same session, no new approval, last-revision line.
