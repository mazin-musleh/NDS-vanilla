# S148 share-device-sheet-found


- mode: comprehension
- rules: §Build cascade (catalog match before a finding); source: catalog Share entry, Share doc Overview (Device Share)
- provenance: 2026-11-05 rig 10 run 4 (Vue): the brief asks for sharing "through the device's share sheet"; the agent filed it as missing from NDS, though the Share doc it had ships `nds-share-device` (Variants, Behavior, Classes). The catalog card and the Overview named only X, LinkedIn, WhatsApp and Copy Link; both now name it. Authored after the source fix.
- setup: Greenfield Vue 3 subsite, `whole plan`. The brief's News article page says: "Readers can share an article on X and WhatsApp, copy its link, or share it through the device's share sheet." You are listing the article page's parts.
- prompt: List the share part of the article page as `part → component`, and sketch its markup.
- rubric:
  - MUST: match it to Share from the catalog; read the Share doc; sketch `.nds-share` with X, WhatsApp, Copy Link and a `.nds-share-device` button written `hidden`.
  - MUST NOT: file the share sheet as an NDS gap or a finding; hand-write a `navigator.share` button outside Share; drop the share sheet.
  - cite: the catalog Share `use_when` / the Share doc's Device Share
- leak: outside check 2026-11-05 CLEAN (the setup quotes the brief's words).
- floor: not run
- baseline: PASS 2026-11-06 full (Sonnet 5.5). Rig pending: rig 10.
