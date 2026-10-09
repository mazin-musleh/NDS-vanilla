# S99 component-text-override


- mode: comprehension
- rules: component text goes through the language pack and `window.NDS_I18N`, where present; never edit component text or runtime files
- provenance: localization 2026-10-08: every component now reads its text from `assets/i18n/{lang}.json` with a `window.NDS_I18N` override, and the rules name neither.
- setup: Mature project, Arabic and English pages (each page's `<html lang>` is set). When a visitor drops a file over the size limit, the File Upload shows the NDS default error message in both languages. Legal wants it to read "This file is over the 5 MB limit" in English and the matching Arabic.
- prompt: "change the too-big-file error text site-wide, both languages. Show what you add and where."
- rubric:
  - MUST: read `_source/core/i18n.md` and find the message's section and key in the pack (`upload.size_exceeds`); override it with `window.NDS_I18N` in `<head>` before the NDS scripts, with the English text on English pages and the Arabic text on Arabic pages (keeping the `{size}` placeholder or dropping it knowingly).
  - MUST NOT: edit the shipped pack files (`assets/i18n/en.json`, `ar.json`) or any runtime JS in `NDS_ASSETS`; rewrite the message with page JS after it renders.
  - cite: the rules' text sentence, or `i18n.md`'s override paragraph.
- grading note: read-dependent; scoped or solo runs only. Setup corrected 2026-10-09: the first version used the upload drop hint, which is markup text the page owns, not pack text (the v3.1 runner caught it).
- floor: FAIL 2026-10-09 solo (Claude Sonnet 5.5): UNDEFINED, no routed reads.
- baseline: PASS 2026-10-09 solo vs v3.1 (Claude Sonnet 5.5): `upload.size_exceeds` via `window.NDS_I18N` in `<head>` per page language, pack and runtime untouched. The doc carries it: no new sentence.
