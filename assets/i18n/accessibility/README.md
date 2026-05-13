# Accessibility — i18n schema

`en.json` is the canonical reference. Mirror its keys in every other
locale. Anything missing falls back to the English value baked into the
HTML for that one element.

## Top-level keys

### Scalar strings (text + aria-labels)

Used by `data-i18n="…"` and `data-i18n-attr="…"` markers in
`_includes/accessibility-panel.html`.

| Key | Where it appears |
|---|---|
| `panel_title` | `<h2>` at the top of the panel |
| `panel_label` | FAB `aria-label` + panel `aria-label` |
| `close_panel` | Close-button `aria-label` |
| `toggle_theme` | Theme toggle `aria-label` |
| `switch_lang` | Language link `aria-label` |
| `scroll_panel` | "Scroll more" button `aria-label` |
| `section_modes` / `section_readable` / `section_visual` | Accordion section headers |
| `aria_readable` / `aria_visual` | `role="group"` `aria-label`s on tile grids |
| `default` | SR-only "Default" label under cyclable tile bars |
| `font_sizing`, `dyslexia`, `highlight_titles`, `highlight_links`, `reading_mask`, `pause_motion`, `text_align`, `line_height`, `letter_spacing`, `word_spacing` | Tile labels in the Readable section |
| `reset` | Reset-button label |

### `exclude_controls: string[]`

Locale-specific tile removals. Tokens listed here are matched against
`data-a11y-exclude-token="…"` on the tile and the matching elements are
**removed from the DOM** at i18n-load time.

Today the only consumer is Arabic (`ar.json` carries
`["letter-spacing"]`) — CSS `letter-spacing` shatters cursive ligatures,
so the tile is hidden entirely on Arabic. Add new tokens here when
similar locale-specific carve-outs come up.

### `modes: { id, name, desc }[]`

The seven Accessibility-Modes accordion rows. Match by `id` against
`data-mode-id="…"` on each row; `name` populates `[data-i18n-name]`,
`desc` populates `[data-i18n-desc]`.

Order in the array drives nothing visual — the rows are statically
ordered in HTML. Keep all seven `id`s present.

### `visuals: { id, label }[]`

The six Visually-Pleasing tiles. Match by `id` against
`data-visual-id="…"`; `label` populates `[data-i18n-label]`. Icon
classes live in `_includes/accessibility-panel.html` only — there's no
locale-specific icon variant, so nothing about the icon belongs here.

### `js: { … }`

JS-side strings: live-region announcements (WCAG 4.1.3), reset
confirmation flow, reading-mask toolbar `aria-label`s. These are baked
into `_js/nds-accessibility.js` as `EN_DEFAULTS`; `NDS.i18n.load()`
overlays them with the locale's values.

| Key | Used for |
|---|---|
| `on` / `off` / `set` | Live-region phrasing: "{tile} on" / "{tile} off" / "{tile} set to {value}" |
| `reset` | Live-region message after a successful reset |
| `reset_done` | Inline "✓ Settings reset" indicator |
| `active` | Currently unused — reserved for "active" status phrasing |
| `confirm_reset` | Inline reset-button label during the 5s arming window |
| `confirm_reset_msg` | Live-region announcement for the same |
| `default` / `start` / `end` / `justify` | Text-align cycle value labels |
| `small` / `medium` / `large` | Spacing cycle value labels (letter-spacing, word-spacing) |
| `mask_toolbar` | Reading-mask `<toolbar role>` `aria-label` |
| `mask_size_down` / `mask_size_up` / `mask_grab` / `mask_close` | Reading-mask toolbar button `aria-label`s |

## Adding a new language

1. `cp en.json {lang}.json` (e.g. `fr.json`).
2. Translate every value. Keep `id`s and `icon`s untouched.
3. Drop `exclude_controls` carve-outs the new locale doesn't need.
4. Set `<html lang="{lang}">` on consuming pages and ship.
