# nds-iq-eval micro-fixtures

Skeletal stand-ins for behavior-mode runs. Every file is a stub with just enough
structure for the rules file's references to resolve — grading compares agent
output against these files, so internal consistency matters, realism does not.
Do not grow them toward realism.

- `mini-root/` = a fake extracted `NDS_ROOT` (template zip). Version banner in
  the bundle stubs is the mutable knob scenarios stamp (e.g. 1.3.0 for stale).
  It defaults to the rules' floor so runs start unblocked; sub-floor states are
  a scenario `setup:` stamp, never the default.
  - `_source/_js/` = banner stubs (real banner comment + one stub line) for the
    banner-first scenarios (S6/S14/S15/S25). Frozen copies from the 1.7.0 cycle;
    refresh a stub if its real banner changes materially.
  - `_source/{components,layout,ui-shell,utilities,core,templates,examples}/*.md`
    = doc `.md` source twins of the `_site` pages — v7 routes markup reads to
    `.md` first. Mirror the real zip's folder set: rule #3 takes the folder from
    the catalog entry's own `url`, so a folder the zip ships and this tree lacks
    sends a runner to a path that does not exist, and the run fails for a reason
    that has nothing to do with the rules.
  - `_source/_sass/tokens/*.scss` = semantic and component tier stubs, real
    names and placeholder values. Without them a styling scenario has no knob or
    token to reach, and a runner correctly falls to rule #5's last resort — a
    pass that grades as a fail.
  - **Every `url:` in the catalog must resolve to a stub in this tree.** Add the
    entry and the stub together; a catalogued entry with no doc file is the same
    fake failure as a missing folder.
  - **Every `nds-hgi-*` used in fixture markup must be listed in `icons.yml`.**
    Only registered names paint in the inline set, so a missing one is a silent
    solid box that `NDS.Init.audit()` reports — an agent then correctly flags a
    page that is actually fine, and the run pays attention to a harness fault.
  - `NDS-IQ.md` (top level) = heading + pairing-stamp stub of the zip's copy of
    the rules file; the upgrade flow compares against it.
- `mini-app/` = a fake consumer ASP.NET MVC app mid-legacy: two legacy `.cshtml`
  pages (Bootstrap + jQuery-table flavored) plus `Home/Dashboard.cshtml`, an
  NDS-built page carrying a canonical department multiselect for the wiring
  scenarios to attach JS to. Scenario setups may add broken `.nds-*` pages or old
  NDS assets under `wwwroot/`. A scenario whose setup says a surface already
  exists needs that surface HERE — otherwise the runner is asked to wire
  something it would have to invent, and refusing is the correct answer.

Behavior runs always work on scratchpad COPIES (see SKILL.md), never on these
originals.
