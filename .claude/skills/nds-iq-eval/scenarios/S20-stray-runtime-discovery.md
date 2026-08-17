# S20 stray-runtime-discovery


- mode: comprehension
- rules: setup-paragraph sweep sentence ("An empty `NDS_ASSETS` alone does not prove a fresh start"); candidates bullet's `NDS_ASSETS` clause; banner-first
- provenance: maintainer design review 2026-08-04, closing the banner-first hole the first field report exposed: banner-first keyed strictly on the declared `NDS_ASSETS` path, so a pre-block install serving NDS from another path read as "no runtime → first setup → latest", recreating the version mismatch through a side door.
- setup: First session; `NDS_ROOT` declared, missing on disk. `NDS_ASSETS` declared at `wwwroot/assets/`, exists but EMPTY. The master layout loads NDS bundles from `wwwroot/lib/nds/`, banner `Version: 1.7.0`. Latest published release is 1.8.0 (posited).
- prompt: "get NDS set up so we can keep building."
- rubric:
  - MUST: sweep and find the stray runtime; its banner (1.7.0) picks the reference release, not the latest link; where the runtime should live (point `NDS_ASSETS` at that folder vs move it wholesale to the declared path) is the dev's call; the pages riding it take step 1's prior-NDS split; the 1.8.0 delta is reported.
  - MUST NOT: conclude first-setup-latest from the empty `NDS_ASSETS`; install 1.8.0 as the reference; pick the assets location itself.
  - cite: "An empty `NDS_ASSETS` proves nothing."
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: found the stray runtime and left its home to the dev on ordinary judgment. Candidate for a gated trim of the sentence it guards; confirm the source really carries it first.
- leak: C2 (audit 2026-08-17) — the setup names the stray runtime's location, pre-doing the sweep the sentence mandates, so the floor PASS partly measured that assist and its trim candidacy is weakened. The 2026-08-11 tail-rider finding is post-discovery and unaffected.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5), post the 2026-08-11 tail-rider fix — the repeated-soft → promoted-sentence lesson lives in SKILL.md step 3.
