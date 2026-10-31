# Liquid whitespace

## Liquid Whitespace (`_includes/`, `_layouts/`)

`{%-` eats whitespace BEFORE the tag, `-%}` eats it AFTER. Eat both sides of a silent-tag run and the neighbouring markup jams onto one line (`</title><meta …>`) — the built HTML consumers read, since CI never runs `html_compressor.rb`.

- **Output tags take no dashes** — `{% include x.html %}`. A leading dash eats the newline that belongs before the include's output; a trailing one eats the newline after it.
- **Silent own-line tags take a leading dash only** — `{%- assign … %}`, `{%- if … %}`. The leading dash removes the tag's own line; a trailing dash steals the NEXT line's break. Stacked runs still emit nothing — each tag's leading dash eats the previous one's newline.
- **Keep the dashes** inside a `{% capture %}` body (emitted inline later, so a restored newline renders as a space) and on lines sharing markup with a tag (`{%- if a %}<div>{% endif -%}`).

Verify a whitespace change by rendered text, not by eyeballing: build before/after, strip tags, collapse whitespace runs to one space, and diff. Identical text = formatting-only.
