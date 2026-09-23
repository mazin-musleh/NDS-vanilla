"""Build hgi-blank, the invisible placeholder .hgi-stroke falls back to while the icon font loads.

    python scripts/hgi-blank-font.py   # prints the base64 for the @font-face in _sass/_fonts-hgi-blank.scss

One empty 1em glyph (every HGI icon is 1em wide), mapped by a cmap format 13 group over the
private-use plane the icons live in, U+F0000-FFFFD, plus U+20 so it is the first available font.
It copies the icon font's vertical metrics and OS/2 flags, so line-height: normal matches. CFF, not
glyf: Chrome's font sanitizer rejects a zero-length glyf table. Rerun only if an icon-font update
moves the icons off that plane or changes the metrics.
"""
import base64
import io
import os

from fontTools.fontBuilder import FontBuilder
from fontTools.misc.psCharStrings import T2CharString
from fontTools.ttLib import TTFont
from fontTools.ttLib.tables._c_m_a_p import CmapSubtable

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
hgi = TTFont(os.path.join(ROOT, 'assets', 'fonts', 'hgi-stroke-rounded.woff2'))
upm = hgi['head'].unitsPerEm
h, o = hgi['hhea'], hgi['OS/2']

fb = FontBuilder(upm, isTTF=False)
fb.setupGlyphOrder(['.notdef', 'blank'])
fb.setupCharacterMap({})
fb.setupCFF('hgi-blank', {'FullName': 'hgi-blank'},
            {'.notdef': T2CharString(program=[upm, 'endchar']), 'blank': T2CharString(program=[upm, 'endchar'])}, {})
fb.setupHorizontalMetrics({'.notdef': (upm, 0), 'blank': (upm, 0)})
fb.setupHorizontalHeader(ascent=h.ascent, descent=h.descent, lineGap=h.lineGap)
fb.setupNameTable({'familyName': 'hgi-blank', 'styleName': 'Regular'})
fb.setupOS2(sTypoAscender=o.sTypoAscender, sTypoDescender=o.sTypoDescender, sTypoLineGap=o.sTypoLineGap,
            usWinAscent=o.usWinAscent, usWinDescent=o.usWinDescent, version=o.version, fsSelection=o.fsSelection)
fb.setupPost()
font = fb.font
font['head'].yMin, font['head'].yMax = hgi['head'].yMin, hgi['head'].yMax

bmp = CmapSubtable.newSubtable(4)  # sanitizers want a (3,1) table; unicode-range keeps the space out of use
bmp.platformID, bmp.platEncID, bmp.language = 3, 1, 0
bmp.cmap = {0x20: 'blank'}
pua = CmapSubtable.newSubtable(13)  # many-to-one: one group maps the whole plane to 'blank'
pua.platformID, pua.platEncID, pua.language = 3, 10, 0
pua.cmap = {cp: 'blank' for cp in range(0xF0000, 0xFFFFE)}
font['cmap'].tables = [bmp, pua]

font.flavor = 'woff2'
buf = io.BytesIO()
font.save(buf)
data = buf.getvalue()
check = TTFont(io.BytesIO(data))
assert check.getBestCmap().get(0xF14FB) == 'blank' and check['cmap'].tables[1].format == 13
print('# %d bytes woff2' % len(data))
print(base64.b64encode(data).decode())
