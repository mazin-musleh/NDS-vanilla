# NDS i18n

The text NDS components write, one file per language: `en.json`, `ar.json`. Each top-level key is a component's section. The page's language is `lang` on `<html>`.

- Add a language: copy `en.json` to `{lang}.json` and translate the values. A key you leave out shows in English.
- Change a few texts: set `window.NDS_I18N = { component: { key: '…' } }` before the NDS scripts.
- `accessibility/` is a component with its own files, outside the pack.

The full guide is the Internationalization page of the docs (`core/i18n.md`).
