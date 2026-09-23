"""Update the HGI Stroke Rounded content-icon font from the official HugeIcons CDN.

    python scripts/hgi-font-update.py          # compare only: counts, added, removed names
    python scripts/hgi-font-update.py --apply  # rewrite _sass/_hgiRoundedStroke.scss and the woff2

Source: https://use.hugeicons.com/font/icons.css (the icon font hugeicons.com documents).
The old cdn.hugeicons.com/font/hgi-stroke-rounded.css froze on 2024-07-24; do not go back to it.

Keeps our own header (.hgi-stroke base, family list "hgi-stroke-rounded", "hgi-blank" —
the CDN calls it "hugeicons-stroke-rounded"; the loader and _fonts.scss key on ours).
Never writes @font-face here: the icon face lives in _sass/_fonts.scss (crit) and hgi-blank,
the 1em invisible placeholder, in _sass/_fonts-hgi-blank.scss (main); it only changes if the icon
font's metrics or code-point plane do.

A name that disappears upstream would break existing markup. --apply refuses until every such
name has an entry in ALIASES (old name -> new name); the alias block keeps it rendering, and
DEPRECATIONS.md lists it. Upstream also redraws icons under the same name: that is accepted —
the docs tell readers to pick icons on hugeicons.com, so the font must match it.
"""
import os
import re
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS_URL = 'https://use.hugeicons.com/font/icons.css'
FONT_BASE = 'https://use.hugeicons.com/font/'
SCSS = os.path.join(ROOT, '_sass', '_hgiRoundedStroke.scss')
WOFF2 = os.path.join(ROOT, 'assets', 'fonts', 'hgi-stroke-rounded.woff2')
DATA = os.path.join(ROOT, '_data', 'hgi.yml')  # the version the docs state; written here only
STAMP_LINE = '// HugeIcons Stroke Rounded'

# Old names HugeIcons renamed (2026-09 set spelled digits out). Keep until the next major.
ALIASES = {
    'arrange-by-numbers-1-9': 'arrange-by-numbers-one-9', 'arrange-by-numbers-9-1': 'arrange-by-numbers-nine-1',
    'cplusplus': 'cpp', 'go-backward-5-sec': 'go-backward-five-sec', 'go-forward-5-sec': 'go-forward-five-sec',
    'layout-2-column': 'layout-two-column', 'layout-2-row': 'layout-two-row',
    'layout-3-column': 'layout-three-column', 'layout-3-row': 'layout-three-row',
    'mp-3-01': 'mp-three-01', 'mp-3-02': 'mp-three-02', 'mp-4-01': 'mp-four-01', 'mp-4-02': 'mp-four-02',
    'ski-dice-faces-01': 'ski', 'sorting-1-9': 'sorting-one-9', 'sorting-9-1': 'sorting-nine-1',
}
ALIAS_NOTE = '// Deprecated names: HugeIcons renamed these (DEPRECATIONS.md). Remove at the next major.'


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'nds-hgi-font-update'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def build_of(css):
    """The CDN build stamp (?t=ms) is the only real version: the font itself says 'Version 1.0'."""
    import datetime
    ms = re.search(r'hgi-stroke-rounded\.woff2\?t=(\d+)', css).group(1)
    return ms, datetime.datetime.fromtimestamp(int(ms) / 1000, datetime.timezone.utc).strftime('%Y-%m-%d')


def main():
    css = fetch(CSS_URL).decode('utf-8')
    stamp, build = build_of(css)
    local = re.search(r'build: "([^"]+)"', open(DATA, encoding='utf-8').read()).group(1) if os.path.exists(DATA) else 'unknown'
    print('build: local %s, CDN %s' % (local, build))
    rules = re.findall(r'\.hgi-stroke\.hgi-([a-z0-9-]+)::?before\s*\{\s*content:\s*"(\\[0-9a-f]+)"', css)
    new = dict(rules)
    if len(new) < 1000:
        sys.exit('parsed only %d icons from %s: the CSS format changed, update the regex' % (len(new), CSS_URL))
    cur = open(SCSS, encoding='utf-8', newline='').read()
    body = cur.replace('\r\n', '\n')
    body = body[:body.find(ALIAS_NOTE)] if ALIAS_NOTE in body else body
    old = set(re.findall(r'\.hgi-stroke\.hgi-([a-z0-9-]+):before', body))
    added, removed = sorted(set(new) - old), sorted(old - set(new))
    print('icons: local %d, CDN %d | added %d | removed %d' % (len(old), len(new), len(added), len(removed)))
    if added:
        print('  added:', ', '.join(added[:30]) + (' …' if len(added) > 30 else ''))
    unaliased = [n for n in removed if n not in ALIASES]
    if removed:
        print('  removed:', ', '.join(removed))
    if unaliased:
        print('  NO ALIAS: %s — add each to ALIASES (compare the glyphs first) and to DEPRECATIONS.md' % ', '.join(unaliased))
    bad = [k for k, v in ALIASES.items() if v not in new or k in new]
    if bad:
        print('  stale ALIASES entries (target gone, or the old name is back upstream):', ', '.join(bad))
    if '--apply' not in sys.argv:
        return
    if unaliased or bad:
        sys.exit('not applied: fix ALIASES first')
    font_url = re.search(r'url\("?(hgi-stroke-rounded\.woff2[^")]*)"?\)', css).group(1)
    woff2 = fetch(FONT_BASE + font_url)
    if woff2[:4] != b'wOF2':
        sys.exit('downloaded font is not woff2: %r' % woff2[:8])
    header = body[:body.index('.hgi-stroke.hgi-')].rstrip() + '\n'
    header = '\n'.join(l for l in header.split('\n') if not l.startswith(STAMP_LINE))
    header = '%s build %s, %s icons (use.hugeicons.com). Written by scripts/hgi-font-update.py.\n%s' % (
        STAMP_LINE, build, format(len(rules), ','), header)
    out = [header] + ['\n.hgi-stroke.hgi-%s:before {\n  content: "%s";\n}\n' % r for r in rules]
    out.append('\n' + ALIAS_NOTE + '\n')
    out += ['.hgi-stroke.hgi-%s:before {\n  content: "%s";\n}\n' % (o, new[n]) for o, n in ALIASES.items()]
    nl = '\r\n' if '\r\n' in cur else '\n'
    open(SCSS, 'w', encoding='utf-8', newline='').write(''.join(out).replace('\n', nl))
    open(WOFF2, 'wb').write(woff2)
    open(DATA, 'w', encoding='utf-8', newline='\n').write(
        '# HGI content-icon font version. Written by scripts/hgi-font-update.py: do not edit.\n'
        'build: "%s"\nstamp: "%s"\nicons: "%s"\nsource: %s\n' % (build, stamp, format(len(rules), ','), CSS_URL))
    print('applied: %d icons + %d aliases; font %d bytes (%s)' % (len(rules), len(ALIASES), len(woff2), font_url))


if __name__ == '__main__':
    main()
