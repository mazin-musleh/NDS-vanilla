# nds-iq-eval micro-fixtures

Skeletal stand-ins for behavior-mode runs. Every file is a stub with just enough
structure for the rules file's references to resolve — grading compares agent
output against these files, so internal consistency matters, realism does not.
Do not grow them toward realism.

- `mini-root/` = a fake extracted `NDS_ROOT` (template zip). Version banner in
  the bundle stubs is the mutable knob scenarios stamp (e.g. 1.3.0 for stale).
  - `_source/_js/` = banner stubs (real banner comment + one stub line) for the
    banner-first scenarios (S6/S14/S15/S25). Frozen copies from the 1.7.0 cycle;
    refresh a stub if its real banner changes materially.
  - `_source/components/button.md` = the doc `.md` source twin of
    `_site/components/button.html` — v7 routes markup reads to `.md` first.
- `mini-app/` = a fake consumer ASP.NET MVC app mid-legacy: two `.cshtml` pages
  (Bootstrap + jQuery-table flavored). Scenario setups may add broken `.nds-*`
  pages or old NDS assets under `wwwroot/`.

Behavior runs always work on scratchpad COPIES (see SKILL.md), never on these
originals.
