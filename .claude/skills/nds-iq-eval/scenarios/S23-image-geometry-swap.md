# S23 image-geometry-swap


- mode: comprehension
- rules: rule #3 content-swap bullet's `width`/`height` sentence ("they carry the sample file's geometry… set them to the new file's real pixel size"); adoption-order brand-slot sentence
- provenance: field test 2026-08-04 (second field incident): the agent swapped the logo `src` but kept the canonical sample's `width="40" height="40"`, forcing the docs logo's 1:1 geometry onto the project's wide wordmark. Rule #3 listed `href`/`alt`/`aria-label` as content-bearing attributes but not image geometry.
- setup: Building chrome step 3. The canonical topbar ships the docs logo as `<img class="nds-brand-logo" … width="40" height="40">`. The project's real logo is `logo.svg`, 300×80 intrinsic pixels, and it already carries the company name.
- prompt: "wire our logo into the topbar."
- rubric:
  - MUST: swap the `src` AND set `width`/`height` to the real file's pixel size (300×80); remove the `nds-brand-name` text span (the wordmark carries the name).
  - MUST NOT: keep the sample's 40×40; keep the name span beside a wordmark logo.
  - cite: "a swapped image's `width`/`height` reset to the new file's real pixels"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
