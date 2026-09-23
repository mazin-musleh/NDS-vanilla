#!/usr/bin/env python3
"""Build an event theme pack end to end: minify its JS, inline its CSS, zip it.

    bundle exec jekyll build                   # compiles the pack SCSS into _site
    python scripts/mkevent.py                  # every event
    python scripts/mkevent.py national-day-96  # one
    bundle exec jekyll build                   # publishes the new .min.js and zip

The zip lands INSIDE the event's own folder, so the next Jekyll build publishes it
at a permanent docs-site URL and a visitor can either take the whole pack or pick
single files out of the same directory. No release, no tag.

    docs-assets/events/national_day_96/nds-event-national-day-96.zip

This script is the only thing that writes a pack's .min.js: js_processor.rb skips
_js/events/, because rebuilding a pack there blanked its inlined CSS. The JS comes
from _js/events/, the assets from the pack folder, and the compiled CSS only exists
under _site — so this needs a build first, exactly like mkrelease.py.

_data/themes.yml is the single source of truth for which events exist and where
their files live; nothing here keeps a second list.
"""

import os
import re
import subprocess
import sys
import tempfile
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


# The pack's JS, minified exactly as js_processor.rb minifies the runtime (same Terser
# flags, same docs-only banner with no version line), so owning it here changes no byte.
def config_value(key):
    with open(os.path.join(ROOT, '_config.yml'), encoding='utf8') as f:
        m = re.search(r'^%s:\s*(.+?)\s*(?:#.*)?$' % re.escape(key), f.read(), re.M)
    return m.group(1).strip('"\'') if m else ''


def minify_js(ev):
    src = os.path.join(ROOT, '_js', 'events', f"nds-theme-{ev['theme']}.js")
    if not os.path.isfile(src):
        return None
    with tempfile.TemporaryDirectory() as tmp:
        out = os.path.join(tmp, 'out.js')
        r = subprocess.run(f'npx terser "{src}" --compress drop_console=false,drop_debugger=false '
                           f'--mangle --format beautify=false,comments=false -o "{out}"',
                           shell=True, cwd=ROOT, capture_output=True, text=True)
        if r.returncode:
            fail(f"{ev['theme']}: terser failed:\n{r.stdout}{r.stderr}")
        body = open(out, encoding='utf8').read().strip()
    lines = ['/*!', ' * ' + config_value('title'), ' * License: ' + config_value('license'),
             ' * Repository: ' + config_value('repository_url'), ' * Author: ' + config_value('author')]
    if config_value('author_profile'):
        lines.append(' * Profile: ' + config_value('author_profile'))
    return '\n'.join(lines + [' */', '']) + body


# The pack's inline CSS. minify_js() builds the JS; Jekyll compiles the SCSS; this is
# the first point that holds both. Inline beats the fetched
# <link> by ~400ms of first paint on slow 4G, because the link is a SECOND
# blocking round trip, discovered only once the pack's script has run.
#
# Prepended as a global assignment rather than substituted into a variable: the
# pack reads `window.__NDS_EVENT_CSS || ''`, and a minifier folds a constant ''
# and drops the whole inline branch with it. A global is unknowable at compile
# time, so the branch always survives. The pack deletes it on read. Re-runs strip
# the previous assignment first, so this is idempotent.
ASSIGN = re.compile(r'^window\.__NDS_EVENT_CSS=.*?;(?=!function|\(function)', re.S | re.M)
HEADER = re.compile(r'\A(/\*!.*?\*/\n)', re.S)


# A relative url() in a LINKED stylesheet resolves against the stylesheet; in an
# inlined <style> it resolves against the DOCUMENT, so the pack's bare asset names
# would 404. Swap them for a token the pack replaces with its own folder at inject
# time — that keeps the pack working from any path, which a build-time absolute
# path would not. The .css file in the zip is untouched.
BASE_TOKEN = '__NDS_EVENT_BASE__'
URL = re.compile(r"""url\(\s*(['"]?)([^'")]+)\1\s*\)""")


def rebase_urls(css):
    def sub(m):
        quote, ref = m.group(1), m.group(2).strip()
        if ref.startswith(('data:', 'http://', 'https://', '/', '#', BASE_TOKEN)):
            return m.group(0)
        return 'url(' + quote + BASE_TOKEN + ref + quote + ')'
    return URL.sub(sub, css)


def js_string(text):
    """CSS as a single-quoted JS string literal. `</` is split so the result stays
    safe if a page ever inlines the pack's JS into the document itself."""
    out = (text.replace('\\', '\\\\').replace("'", "\\'")
               .replace('\r', '').replace('\n', '\\n')
               .replace('</', "<' + '/"))
    return "'" + out + "'"


def inline_css(ev, js_path, js_text, css_text):
    body = ASSIGN.sub('', js_text, count=1)          # drop a previous run's copy
    m = HEADER.match(body)
    if not m:
        fail(f"{ev['theme']}: {ev['js']} has no /*! banner — minify_js() output changed shape")
    head, rest = m.group(1), body[m.end():]
    if not rest.startswith(('!function', '(function')):
        fail(f"{ev['theme']}: {ev['js']} does not open with its IIFE — cannot place the CSS safely")
    filled = head + 'window.__NDS_EVENT_CSS=' + js_string(rebase_urls(css_text)) + ';' + rest
    with open(js_path, 'w', encoding='utf8', newline='') as f:
        f.write(filled)
    return filled


def build(ev, site):
    folder = os.path.join(ROOT, ev['folder'])
    if not os.path.isdir(folder):
        fail(f"{ev['theme']}: {ev['folder']} not found")

    built_css = os.path.join(site, ev['folder'], ev['css'])
    if not os.path.isfile(built_css):
        fail(f"{ev['theme']}: {ev['css']} not in _site — run the Jekyll build first")

    # The compiled CSS is also what gets inlined into the pack's JS, so building
    # from a stale _site ships a stale stylesheet — and the inline <style> wins
    # over the file, so the page renders old CSS with nothing to show for it.
    # Both the theme partial and this pack's Jekyll entry feed that compile.
    sources = [os.path.join(ROOT, '_sass', 'themes', 'events', f"_{ev['theme']}.scss"),
               os.path.join(folder, os.path.splitext(ev['css'])[0] + '.scss')]
    built_at = os.path.getmtime(built_css)
    stale = [s for s in sources if os.path.isfile(s) and os.path.getmtime(s) > built_at]
    if stale:
        names = ', '.join(os.path.relpath(s, ROOT) for s in stale)
        fail(f"{ev['theme']}: {names} is newer than the compiled {ev['css']} in _site — "
             f"run the Jekyll build first, or the pack inlines the previous stylesheet")

    files = [os.path.join(folder, n) for n in sorted(os.listdir(folder))
             if not n.endswith(SKIP) and os.path.isfile(os.path.join(folder, n))]

    with open(built_css, encoding='utf8') as f:
        css_text = f.read()
    js_path = os.path.join(folder, ev['js'])
    js_text = minify_js(ev) if ev['js'] else None
    if js_text is None:
        js_text = open(js_path, encoding='utf8').read() if os.path.isfile(js_path) else ''

    problems = check_assets(ev, files + [built_css], css_text, js_text)
    if problems:
        fail(f"{ev['theme']}:\n  - " + '\n  - '.join(problems))

    if js_text:
        js_text = inline_css(ev, js_path, js_text, css_text)

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
