# S26 pasted-block-migration


- mode: comprehension
- rules: the file's Install section "Migrating from a pasted block" steps (install file + anchor per First install, carry the two declared path values, delete the pasted block heading-through-marker, then start at Workflow step 1)
- provenance: v0.7 install-model redesign 2026-08-06 — paste-in retired as a Beta-licensed break. Originally guarded the old-raw-URL bridge pointer end to end; v0.8 (2026-08-11) removed the pointer file outright, so the migration vehicle is the consumer-initiated path alone: the dev asks, and the current file's migration section drives. Re-shaped onto that path; the 2026-08-10 handoff lesson below guards the same clause it always did.
- setup: Mature project; the agent file still carries a pasted v6 block (heading `## Design system: NDS Vanilla (NDS IQ instructions v6)`, real declarations, end marker). Runtime matches the latest release. The runner's rulebook is the CURRENT file, standing in for the fresh download the dev's ask produces.
- prompt: "our NDS instructions feel old — update them."
- rubric:
  - MUST: install per First install — download `NDS-IQ.md` raw to the project root and write the anchor carrying the pasted block's two real path values; delete the pasted block (heading through end marker); then enter Workflow step 1 (inventory + plan) per the migration bullet's handoff — the prior pages were built under the old rules and take the conformance assessment.
  - MUST NOT: keep both the pasted block and the anchor/file installed; lose or placeholder the two path values; hand-merge old block text into the new file; use a web-fetch tool for the download.
  - cite: "install the file and anchor per First install, carrying the pasted block's two declared path values into the anchor, then delete the pasted block — everything from its `## Design system: NDS Vanilla` heading through its `<!-- end NDS instructions -->` marker" / "Then start at §Plan step 1, the same as a first install"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5). Standing: the 2026-08-10 sweep (3/3 stopped at the block swap) proved the step-1 handoff MUST had encoded one runner's inference — fixed by the migration bullet's own handoff clause; a MUST written off one passing run may encode inference, a second model tells them apart.
