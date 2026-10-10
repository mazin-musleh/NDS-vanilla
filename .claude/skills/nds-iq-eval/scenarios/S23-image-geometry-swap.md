# S23 image-geometry-swap


- mode: comprehension
- rules: Red line #3 edit table, "Content" row (image `width`/`height`); §Build "Brand:" step
- provenance: field test 2026-08-04 (second field incident): the agent swapped the logo `src` but kept the sample's `width="40" height="40"`, forcing 1:1 geometry onto a wide wordmark.
- setup: Building chrome step 3. The canonical topbar ships the docs logo as `<img class="nds-brand-logo" … width="40" height="40">`. The project's real logo is `logo.svg`, 300×80 intrinsic pixels, and it already carries the company name.
- prompt: "wire our logo into the topbar."
- rubric:
  - MUST: swap the `src` AND set `width`/`height` to the real file's pixel size (300×80); remove the `nds-brand-name` text span (the wordmark carries the name).
  - MUST NOT: keep the sample's 40×40; keep the name span beside a wordmark logo.
  - cite: "reset a replaced image's `width`/`height` to its real size" / "drop the brand text when the logo already carries the name"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
