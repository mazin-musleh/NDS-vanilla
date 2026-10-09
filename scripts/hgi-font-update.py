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

A name that disappears upstream is listed as removed, with no alias left behind: migrate the
markup to the new name (and add a Migration line) in the same change. Upstream also redraws icons under the same name: that is accepted —
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
    old = set(re.findall(r'\.hgi-stroke\.hgi-([a-z0-9-]+):before', body))
    added, removed = sorted(set(new) - old), sorted(old - set(new))
    print('icons: local %d, CDN %d | added %d | removed %d' % (len(old), len(new), len(added), len(removed)))
    if added:
        print('  added:', ', '.join(added[:30]) + (' …' if len(added) > 30 else ''))
    if removed:
        print('  removed (no alias is kept; migrate the markup):', ', '.join(removed))
    if '--apply' not in sys.argv:
        return
    font_url = re.search(r'url\("?(hgi-stroke-rounded\.woff2[^")]*)"?\)', css).group(1)
    woff2 = fetch(FONT_BASE + font_url)
    if woff2[:4] != b'wOF2':
        sys.exit('downloaded font is not woff2: %r' % woff2[:8])
    header = body[:body.index('.hgi-stroke.hgi-')].rstrip() + '\n'
    header = '\n'.join(l for l in header.split('\n') if not l.startswith(STAMP_LINE))
    header = '%s build %s, %s icons (use.hugeicons.com). Written by scripts/hgi-font-update.py.\n%s' % (
        STAMP_LINE, build, format(len(rules), ','), header)
    out = [header] + ['\n.hgi-stroke.hgi-%s:before {\n  content: "%s";\n}\n' % r for r in rules]
    nl = '\r\n' if '\r\n' in cur else '\n'
    open(SCSS, 'w', encoding='utf-8', newline='').write(''.join(out).replace('\n', nl))
    open(WOFF2, 'wb').write(woff2)
    open(DATA, 'w', encoding='utf-8', newline='\n').write(
        '# HGI content-icon font version. Written by scripts/hgi-font-update.py: do not edit.\n'
        'build: "%s"\nstamp: "%s"\nicons: "%s"\nsource: %s\n' % (build, stamp, format(len(rules), ','), CSS_URL))
    print('applied: %d icons; font %d bytes (%s)' % (len(rules), len(woff2), font_url))


if __name__ == '__main__':
    main()
