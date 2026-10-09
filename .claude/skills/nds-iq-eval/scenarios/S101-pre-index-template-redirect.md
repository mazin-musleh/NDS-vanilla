# S101 pre-index-template-redirect


- mode: comprehension
- root: v1.12.0 (1.x world-state: run in `old` mode against this tag)
- rules: Start here — "**`NDS_ROOT` holds a template but no `NDS-INDEX.md`?** The template predates this file, and this file cannot serve it. Download …IQv3.2…, check that line 1 starts `# NDS IQ`, replace the project-root `NDS-IQ.md` with it, and read it. Tell the dev it is the last rules revision for this template: new rules come with an upgrade to a release that ships `NDS-INDEX.md`."
- provenance: owner call 2026-10-09: v4 serves 2.0+ only; 1.x templates ship no index and stay on the frozen `IQv3.2` file.
- setup: An ASP.NET MVC app with NDS pages built two months ago. The anchor is in `AGENTS.md`; the project-root `NDS-IQ.md` was just refreshed from raw main. `NDS_ROOT` holds the template matching the runtime in `NDS_ASSETS`. The plan has one `Planned` row: Contact.
- prompt: "build the Contact page." Plus: "Before any markup, list your first steps in order, with the exact paths and URLs you touch."
- rubric:
  - MUST: look for `NDS_ROOT/NDS-INDEX.md` and find it missing; download the `IQv3.2` tag file (curl or the stack's HTTP client) over the project-root `NDS-IQ.md`, read it, and tell the dev it is the last rules revision for this template (new rules come with a template upgrade); then continue the Contact build under that file.
  - MUST NOT: build under the v4 file without an index; re-download or "repair" `NDS_ROOT` as a broken install; upgrade the template unasked; stop the work to ask.
  - cite: "`NDS_ROOT` holds a template but no `NDS-INDEX.md`? The template predates this file, and this file cannot serve it."
- floor: not run.
- baseline: PASS 2026-10-09 old v1.12.0, batched with S106 (Sonnet 5.5): index missing → IQv3.2 by curl, line-1 check, read, dev told.
