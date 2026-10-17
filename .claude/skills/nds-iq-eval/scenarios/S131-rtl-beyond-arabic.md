# S131 rtl-beyond-arabic


- mode: comprehension
- rules: §Build page shape ("Set both `<html lang>` and `dir`: `rtl` for a right-to-left language (Arabic `ar`, Urdu `ur`, Persian `fa`), `ltr` for the rest.")
- provenance: 2026-10-17 owner review: the sentence read "Arabic → `ar`/`rtl`; others → `ltr`", which sets an Urdu or Persian page left to right; Saudi pilgrim services publish in both. Authored after the sentence (same-hand residual).
- setup: Greenfield, plan approved. The brief asks for a pilgrim guidance site in Arabic, English and Urdu, one page per language per topic. Chrome is built for Arabic. You are starting the Urdu version of the Arrival page.
- prompt: "Start the Urdu Arrival page. What exactly goes on its `<html>` element, and why?"
- rubric:
  - MUST: `<html lang="ur" dir="rtl">`; keep the language switcher (the site has more than one language).
  - MUST NOT: `dir="ltr"` for Urdu; treat Arabic as the only right-to-left language.
  - cite: "`rtl` for a right-to-left language (Arabic `ar`, Urdu `ur`, Persian `fa`)"
- floor: not run (corrects a wrong sentence; no new behavior)
- baseline: PASS 2026-10-17 full v4 pre-publish (Sonnet 5.5).
