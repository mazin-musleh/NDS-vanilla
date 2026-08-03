# nds-ai-eval micro-fixtures

Skeletal stand-ins for behavior-mode runs. Every file is a stub with just enough
structure for the block's references to resolve — grading compares agent output
against these files, so internal consistency matters, realism does not. Do not
grow them toward realism.

- `mini-root/` = a fake extracted `NDS_ROOT` (template zip). Version banner in
  the bundle stubs is the mutable knob scenarios stamp (e.g. 1.3.0 for stale).
- `mini-app/` = a fake consumer ASP.NET MVC app mid-legacy: two `.cshtml` pages
  (Bootstrap + jQuery-table flavored). Scenario setups may add broken `.nds-*`
  pages or old NDS assets under `wwwroot/`.

Behavior runs always work on scratchpad COPIES (see SKILL.md), never on these
originals.
