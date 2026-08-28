#!/usr/bin/env python3
"""Build the downloadable zip for an event theme pack.

    python scripts/mkevent.py                  # every event
    python scripts/mkevent.py national-day-96  # one

The zip lands INSIDE the event's own folder, so the next Jekyll build publishes it
at a permanent docs-site URL and a visitor can either take the whole pack or pick
single files out of the same directory. No release, no tag.

    docs-assets/events/national_day_96/nds-event-national-day-96.zip

Inputs come from two places, because that is where the build already puts them:
the repo folder holds the assets and the minified JS (js_processor.rb writes it
there), while the compiled CSS only exists under _site — so this needs a build
first, exactly like mkrelease.py.

_data/themes.yml is the single source of truth for which events exist and where
their files live; nothing here keeps a second list.
"""

import os
import re
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Never goes into the pack zip: the Jekyll build entry is repo plumbing, and a
# previous zip must not end up nested inside the new one.
SKIP = ('.zip', '.min.scss')

# First bytes -> extensions that may legitimately carry them. Guards the failure
# this script exists to catch: an asset saved in the wrong format but named .svg
# still loads in a preview and 404s nothing, so nothing else notices.
MAGIC = {
    b'\x89PNG\r\n\x1a\n': {'.png'},
    b'\xff\xd8\xff': {'.jpg', '.jpeg'},
    b'RIFF': {'.webp'},
    b'GIF8': {'.gif'},
}


def fail(msg):
    sys.exit('mkevent: ' + msg)


def read_events():
    """Event entries from _data/themes.yml: (theme, folder, css_name, js_name).

    ponytail: hand-parsed rather than adding a PyYAML dependency for one flat
    list. Swap to yaml.safe_load if the file ever grows nesting this can't see.
    """
    path = os.path.join(ROOT, '_data', 'themes.yml')
    with open(path, encoding='utf8') as f:
        text = f.read()

    events, cur = [], {}
    for line in text.splitlines():
        m = re.match(r'\s*-\s*value:\s*(\S+)', line)
        if m:
            if cur.get('css'):
                events.append(cur)
            cur = {'value': m.group(1)}
            continue
        m = re.match(r'\s*(css|js):\s*(\S+)', line)
        if m and cur:
            cur[m.group(1)] = m.group(2)
    if cur.get('css'):
        events.append(cur)

    # Only stylesheet themes living under docs-assets/events/ are packs; the seed
    # themes (crimson, corporate…) carry no files at all.
    out = []
    for e in events:
        if not e['css'].startswith('docs-assets/events/'):
            continue
        out.append({
            'theme': e['value'],
            'folder': os.path.dirname(e['css']),
            'css': os.path.basename(e['css']),
            'js': os.path.basename(e.get('js', '')),
        })
    return out


def check_assets(ev, files, css_text, js_text):
    """The three checks that catch a genuinely broken pack."""
    names = {os.path.basename(f) for f in files}
    problems = []

    # 1. every url(...) in the compiled CSS resolves inside the pack
    for ref in re.findall(r'url\(["\']?([^"\')]+)["\']?\)', css_text):
        if ref.startswith(('data:', 'http://', 'https://', '/')):
            continue
        if os.path.basename(ref) not in names:
            problems.append(f'CSS references missing asset: {ref}')

    # 2. every asset named as a JS default exists (image/logo/ctaIcon)
    for ref in re.findall(r"pick\('(?:image|logo|ctaIcon)',\s*'([^']+)'\)", js_text):
        if ref and not ref.startswith(('http', '/', '.')) and ref not in names:
            problems.append(f'JS default references missing asset: {ref}')

    # 3. extension matches actual file type
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        with open(f, 'rb') as fh:
            head = fh.read(8)
        for sig, ok in MAGIC.items():
            if head.startswith(sig) and ext not in ok:
                problems.append(
                    f'{os.path.basename(f)} is {sorted(ok)[0]} data but named {ext}')
        if ext == '.svg' and not head.lstrip()[:1] in (b'<', b''):
            problems.append(f'{os.path.basename(f)} named .svg but is not XML')

    return problems


README = """# {title} — NDS event pack

Drop-in theme for the National Design System. Copy this folder into your own
assets directory, then add two lines to your shared `<head>`, after the NDS
stylesheets:

```html
<link id="nds-theme-stylesheet" rel="stylesheet"
      href="/assets/events/{folder}/{css}">
<script src="/assets/events/{folder}/{js}"></script>
```

Keep the script tag out of `defer` and in `<head>`: it injects the event hero
slide during parse, so the slide is there in the first paint with no flash.

Delete the two lines when the event ends. That is the whole decommissioning.

## What is in here

| Path | What it is |
|------|------------|
| `{css}` | Compiled stylesheet |
| `{js}` | The pack — injects the stylesheet link, the theme token, and the hero slide |
| `src/` | Readable source for both, if you want to retheme |
| everything else | Images the pack references |

The script resolves its CSS and images relative to its own `src`, so this folder
works at any path as long as the contents stay together.

Full documentation: https://mazin-musleh.github.io/NDS-vanilla/events/{theme}.html
"""


def build(ev, site):
    folder = os.path.join(ROOT, ev['folder'])
    if not os.path.isdir(folder):
        fail(f"{ev['theme']}: {ev['folder']} not found")

    built_css = os.path.join(site, ev['folder'], ev['css'])
    if not os.path.isfile(built_css):
        fail(f"{ev['theme']}: {ev['css']} not in _site — run the Jekyll build first")

    files = [os.path.join(folder, n) for n in sorted(os.listdir(folder))
             if not n.endswith(SKIP) and os.path.isfile(os.path.join(folder, n))]

    with open(built_css, encoding='utf8') as f:
        css_text = f.read()
    js_path = os.path.join(folder, ev['js'])
    js_text = open(js_path, encoding='utf8').read() if os.path.isfile(js_path) else ''

    problems = check_assets(ev, files + [built_css], css_text, js_text)
    if problems:
        fail(f"{ev['theme']}:\n  - " + '\n  - '.join(problems))

    # Readable source, so a consumer can retheme without cloning the repo.
    name = ev['theme']
    src = [
        os.path.join(ROOT, '_js', 'events', f'nds-theme-{name}.js'),
        os.path.join(ROOT, '_sass', 'themes', 'events', f'_{name}.scss'),
    ]

    top = f'nds-event-{name}'
    out = os.path.join(folder, f'{top}.zip')
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
        for f in files:
            z.write(f, f'{top}/{os.path.basename(f)}')
        z.write(built_css, f'{top}/{ev["css"]}')       # compiled CSS only exists in _site
        for f in src:
            if os.path.isfile(f):
                z.write(f, f'{top}/src/{os.path.basename(f)}')
        title = name.replace('-', ' ').title()
        z.writestr(f'{top}/README.md', README.format(
            title=title, theme=name, folder=os.path.basename(ev['folder']),
            css=ev['css'], js=ev['js']))

    return out, len(files) + 1 + len([f for f in src if os.path.isfile(f)]) + 1


def main():
    site = os.path.join(ROOT, '_site')
    if not os.path.isdir(site):
        fail('_site not found — run the Jekyll build first')

    events = read_events()
    if not events:
        fail('no event packs found in _data/themes.yml')

    wanted = sys.argv[1:]
    if wanted:
        known = {e['theme'] for e in events}
        for w in wanted:
            if w not in known:
                fail(f"unknown event '{w}' — known: {', '.join(sorted(known))}")
        events = [e for e in events if e['theme'] in wanted]

    for ev in events:
        out, n = build(ev, site)
        size = os.path.getsize(out) / 1024
        print(f'  {os.path.relpath(out, ROOT)}  ({n} files, {size:.0f} KB)')

    print('\nRun the Jekyll build again to publish the zip(s) to the docs site.')


if __name__ == '__main__':
    main()
