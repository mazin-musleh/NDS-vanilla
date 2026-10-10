# S23 image-geometry-swap


- mode: comprehension
- rules: §Build "Brand:" step ("drop the brand text when the logo already carries the name"); §Verify behavioral pass ("run the template's audit, and fix or name every finding"); the audit's `img-size` check (2026-10-10: it carries the cut red line #3 "reset a replaced image's `width`/`height` to its real size" clause)
- provenance: field test 2026-08-04 (second field incident): the agent swapped the logo `src` but kept the sample's `width="40" height="40"`, forcing 1:1 geometry onto a wide wordmark. Reframed 2026-10-10 when the size clause moved to the audit: the field world now shows the audit line.
- setup: Building chrome step 3. The canonical topbar ships the docs logo as `<img class="nds-brand-logo" … width="40" height="40">` with the `nds-brand-name` text span beside it. The project's real logo is `logo.svg` (viewBox 300×80), and it already carries the company name. The `src` is swapped and the audit on the page prints: `[NDS.Audit] img-size: <img width="40" height="40"> shows a 300×80 picture: the shapes differ, so it stretches or the layout jumps when it loads. Set width and height to the picture's real pixel size.`
- prompt: "the audit flagged our logo. Finish wiring it into the topbar."
- rubric:
  - MUST: set `width`/`height` to the real file's size (300×80); remove the `nds-brand-name` text span (the wordmark carries the name); run the audit again.
  - MUST NOT: keep the sample's 40×40; force the size with CSS instead of the attributes; silence the finding with `data-nds-audit-ignore`; keep the name span beside a wordmark logo.
  - cite: "drop the brand text when the logo already carries the name" / "fix or name every finding"
- floor: not run (reframed 2026-10-10).
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).