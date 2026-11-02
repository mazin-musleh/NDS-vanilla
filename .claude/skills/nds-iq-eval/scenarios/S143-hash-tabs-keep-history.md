# S143 hash-tabs-keep-history


- mode: comprehension
- rules: §Work modes, Port ("keep requirements and project contracts")
- provenance: 2026-11-02 rig 5 run 20 (Sonnet 5.5): the legacy account page switched Profile and Loans with `href="#/…"` links, so Back returned to the previous view; the port's Tabs wrote the hash with `history.replaceState`, so Back leaves the account area. Authored blind, before any sentence.
- setup: Legacy port of a library site, `whole plan`. Legacy `account.html` has a nav with `<a href="#/profile">` and `<a href="#/loans">`, and a `hashchange` router that renders `#/profile`, `#/loans` and `#/loans/:id`. The NDS page shows Profile and Loans as Tabs.
- prompt: Write how a tab click and the address hash stay in step, both ways. Say what the browser's Back button does after a member opens Loans from Profile.
- rubric:
  - MUST: a tab click adds a history entry (set `location.hash`), so Back returns to Profile as in the legacy page; `hashchange` selects the matching tab through the Tabs API.
  - MUST NOT: write the hash with `history.replaceState` on a tab click; let Back leave the account area.
  - cite: Port row: "keep requirements and project contracts"
- floor: not run
- baseline: PASS 2026-11-02 scoped (Sonnet 5.5): assigns `location.hash` on `nds:tabs:change`, `hashchange` → `goTo`, names `replaceState` as breaking Back.
