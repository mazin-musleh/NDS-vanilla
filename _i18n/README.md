# NDS word packs (source)

NDS maintainers edit these. One file per language NDS ships besides English: `ar.json`. Each top-level key is a component's section.

- English has no file. A script's words are its `NDS.i18n.getStrings()` defaults; a marker's word is its markup (`data-i18n="section.key"`).
- After an edit, run `node scripts/check-i18n.mjs --build` (`ruby _plugins/js_processor.rb` runs it too). It checks that every pack holds each English word and no other, then writes `assets/i18n/{lang}.json` minified, with a `"_"` banner key, `assets/i18n/en.json` (every English word, for a site to translate; never fetched), and `_data/i18n.json`, the word list on the Internationalization page.
- `assets/i18n/` is built output: an update replaces it, so a site never edits it. A site changes words, or adds a language NDS does not ship, with `window.NDS_I18N_LANGS` (`core/i18n.md`).
