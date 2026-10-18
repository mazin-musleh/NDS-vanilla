"""Slice the HGI content-icon font into small woff2 files, one @font-face each.

    python scripts/hgi-font-slices.py   # writes assets/fonts/hgi/*.woff2 and _sass/_fonts-hgi-slices.scss

Each face's unicode-range names only its own icons, so a page downloads just the slices
holding the icons it shows (~80 KB on a typical page, not the 965 KB font). 25 icons a
slice: smaller slices cut the download further, but every face is a rule in main CSS,
which gates the reveal (25 = +2.6 KB gz, 10 = +5.6 KB). scripts/hgi-font-update.py runs
this after --apply; the full woff2 stays the master it slices from.
"""
import glob
import io
import os

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MASTER = os.path.join(ROOT, 'assets', 'fonts', 'hgi-stroke-rounded.woff2')
OUT = os.path.join(ROOT, 'assets', 'fonts', 'hgi')
SCSS = os.path.join(ROOT, '_sass', '_fonts-hgi-slices.scss')
SIZE = 25


def main():
    font = TTFont(MASTER)
    cps = sorted(cp for cp in font.getBestCmap() if cp >= 0xF0000)
    font.flavor = None
    raw = io.BytesIO()
    font.save(raw)  # decode the woff2 once, not once per slice
    os.makedirs(OUT, exist_ok=True)
    for f in glob.glob(os.path.join(OUT, '*.woff2')):
        os.remove(f)  # an update can leave fewer slices
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.glyph_names = False
    opts.notdef_outline = False
    faces, total = [], 0
    for i in range(0, len(cps), SIZE):
        chunk, n = cps[i:i + SIZE], i // SIZE
        part = TTFont(io.BytesIO(raw.getvalue()))
        s = subset.Subsetter(opts)
        s.populate(unicodes=chunk)
        s.subset(part)
        path = os.path.join(OUT, '%d.woff2' % n)
        subset.save_font(part, path, opts)
        total += os.path.getsize(path)
        faces.append('@font-face { font-family: "hgi-stroke-rounded"; font-display: swap; '
                     'unicode-range: U+%X-%X; src: url("../fonts/hgi/%d.woff2") format("woff2"); }'
                     % (chunk[0], chunk[-1], n))
    head = ('/* HGI icon font, sliced: %d faces of %d icons. Written by scripts/hgi-font-slices.py: do not edit.\n'
            '   In main, not crit (crit size is a hard limit), and not the deferred HGI sheet: a @font-face\n'
            '   that lands after the reveal rebuilds the font cache and relayouts every text box. */\n'
            % (len(faces), SIZE))
    open(SCSS, 'w', encoding='utf-8', newline='\n').write(head + '\n'.join(faces) + '\n')
    print('%d icons -> %d slices, %d KB in all' % (len(cps), len(faces), total // 1024))


if __name__ == '__main__':
    main()
