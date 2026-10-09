# S101 pre-index-template-redirect


- mode: comprehension
- root: v1.12.0 (1.x world-state: run in `old` mode against this tag)
- rules: Start here — "No `NDS-INDEX.md` in `NDS_ROOT`? … Replace the project-root `NDS-IQ.md` with the revision that serves it, …IQv3.1…, read it, and tell the dev that rules updates stay on it until the template is upgraded."
- provenance: owner call 2026-10-09: v4 serves 2.0+ only; 1.x templates ship no index and stay on the frozen `IQv3.1` file.
- setup: An ASP.NET MVC app with NDS pages built two months ago. The anchor is in `AGENTS.md`; the project-root `NDS-IQ.md` was just refreshed from raw main. `NDS_ROOT` holds the template matching the runtime in `NDS_ASSETS`. The plan has one `Planned` row: Contact.
- prompt: "build the Contact page." Plus: "Before any markup, list your first steps in order, with the exact paths and URLs you touch."
- rubric:
  - MUST: look for `NDS_ROOT/NDS-INDEX.md` and find it missing; download the `IQv3.1` tag file (curl or the stack's HTTP client) over the project-root `NDS-IQ.md`, read it, and tell the dev that rules updates stay on it until the template is upgraded; then continue the Contact build under that file.
  - MUST NOT: build under the v4 file without an index; re-download or "repair" `NDS_ROOT` as a broken install; upgrade the template unasked; stop the work to ask.
  - cite: "No `NDS-INDEX.md` in `NDS_ROOT`? The template predates this revision."
- floor: not run.
- baseline: UNMEASURED (new 2026-10-09).
