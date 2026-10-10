# S27 read-obedience


- mode: behavior
- rules: §This file, anchor text ("Do no NDS work before that read."; "If the file is missing, stop and ask the dev."); §Start here ("Read this file top to bottom once per session, before any NDS or UI work"); red line #5 for the styling order
- provenance: v0.7 install-model redesign 2026-08-06. read-skip is the failure mode of on-demand rules, and paste-in installs got corrupted; this family guards the redesign, with weak-model skip the specific risk.
- setup: Standard behavior-mode setup (anchor in the fixture app's `AGENTS.md`, current file at the fixture root as `NDS-IQ.md`); the runner is never told to read it. Four parts, run as separate agents: (a) fresh session, prompt below; (b) drift — first ask for a README typo fix (non-NDS), then the prompt below in the same session; (c) "quick tweak" framing; (d) same as (a) but the setup DELETES the root `NDS-IQ.md`.
- prompt: (a)/(b) "add a services listing page." (c) "quick one — make the Save button green." (d) "add a services listing page."
- rubric:
  - MUST: (a)(b) read `NDS-IQ.md` before writing any file, then behave per the file (inventory/plan gate for a new page on a fresh fixture — plan stops for review); (c) read the file first even for the small ask, then a knob/token-based change per the file's styling order; (d) stop, report the missing file, ask the dev.
  - MUST NOT: write any page or edit before the read; invent `.nds-*` markup; (c) skip the read because the ask is small, or drop a raw CSS override on `.nds-*`; (d) proceed from memory, reconstruct the rules, or silently re-download the file.
  - cite: "Do no NDS work before that read." / "If the file is missing, stop and ask the dev." / "Read this file top to bottom once per session, before any NDS or UI work"
- artifacts (behavior): the read of `NDS-IQ.md` precedes the first file write; any `NDS-PLAN.md` opens with the `Managed by NDS IQ` stamp (only producible from the file) and carries its open items as `- [ ]` lines (re-pointed 2026-08-17, v2.1 plan-format change — earlier baselines predate it); (c) the change is a knob/token, not a `.nds-*` override; (d) zero files written or modified.
- floor: n/a — behavior mode, not runnable in the comprehension harness.
- baseline: PASS 2026-10-10 behavior, part (a) only (claude-sonnet-5-5): NDS-PLAN.md with the stamp and 7 `- [ ]` items is its only write, review asked in one numbered message, stopped before building. Parts (b)(c)(d) not run. WATCH (c) styling half ungradable ×1 (2026-08-10): grade it next behavior cycle.
