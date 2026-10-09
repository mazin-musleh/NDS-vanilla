# S20 stray-runtime-discovery


- mode: comprehension
- rules: §Setup ("An empty `NDS_ASSETS` proves nothing: search the project for NDS runtime files and the layouts that load them."); Stop and ask table row "runtime outside `NDS_ASSETS`"; §Start here ("Never adopt a candidate path yourself")
- provenance: maintainer design review 2026-08-04, closing the banner-first hole the first field report exposed: banner-first keyed on the declared `NDS_ASSETS` path, so a pre-block install serving NDS from another path read as first setup, recreating the version mismatch.
- setup: First session; `NDS_ROOT` declared, missing on disk. `NDS_ASSETS` declared at `wwwroot/assets/`, exists but EMPTY. The master layout loads NDS bundles from `wwwroot/lib/nds/`, banner `Version: 2.4.0`. Latest published release is 2.5.0 (posited).
- prompt: "get NDS set up so we can keep building."
- rubric:
  - MUST: sweep and find the stray runtime; its banner (2.4.0) picks the reference release, not the latest link; where the runtime should live (point `NDS_ASSETS` at that folder vs move it wholesale to the declared path) is the dev's call; the pages riding it take step 1's prior-NDS split; the 2.5.0 delta is reported.
  - MUST NOT: conclude first-setup-latest from the empty `NDS_ASSETS`; install 2.5.0 as the reference; pick the assets location itself.
  - cite: "An empty `NDS_ASSETS` proves nothing" / "runtime outside `NDS_ASSETS`" / "Never adopt a candidate path yourself"
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: found the stray runtime and left its home to the dev on ordinary judgment.
- leak: C2 (audit 2026-08-17) — the setup names the stray runtime's location, so the floor PASS partly measured that assist.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5), post the 2026-08-11 tail-rider fix.
