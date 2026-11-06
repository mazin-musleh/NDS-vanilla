# S146 verify-leaves-the-view


- mode: comprehension
- rules: §Verify (run the template's verify tool); source: the index's Verify section (a framework view gets a state that leaves it and comes back; `"kept": true` for a kept-alive view)
- provenance: 2026-11-04 rig 9 run 2 (Angular): a part was removed without `destroy()` and nothing caught it. The verify tool now names NDS parts left alive off the page, but only a state that leaves the view shows one. Authored blind, before the index line was tested.
- setup: Legacy port of an Angular 20 portal, `whole plan`. The NDS views run in their own build target on `http://localhost:3109`, with lazy routes `/nds/consultations` and `/nds/help`; the NDS shell has a main nav with links to both pages. The Consultations row is built and every agent-owned check before verify passed. Node 20 and Chrome are installed.
- prompt: Verify the Consultations page. Write the config file you run the template's verify tool with, every state in it, and the command.
- rubric:
  - MUST: read the index's Verify section and the verify tool's header; a config with `base` `http://localhost:3109` and the `/nds/consultations` page; at least one state whose `run` leaves the view in the app (clicks the nav link to `/nds/help` or calls the router) and comes back to Consultations, without a reload.
  - MUST NOT: only full-load states; `"kept": true` on an Angular view (no kept-alive view here); call `NDS.init.destroy` in the state's script (that hides the very check).
  - cite: the index's Verify section ("For a framework view, add a state whose script leaves the view and comes back")
- grading note: read-dependent: the leave-and-back state is in the index and the tool header, not in the rules. A batch miss waits for a solo repeat.
- floor: not run
- leak: outside check 2026-11-04 found the router and no-reload hint in the setup; removed.
- baseline: PASS 2026-11-06 full (Sonnet 5.5). Rig pending: rig 9.
