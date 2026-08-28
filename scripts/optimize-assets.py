#!/usr/bin/env python3
"""Shrink SVG and raster assets, with the checks that make it safe to trust.

    python scripts/optimize-assets.py docs-assets/events/national_day_96
    python scripts/optimize-assets.py path/to/img.png --apply
    python scripts/optimize-assets.py assets/img --apply --quality 90

DRY RUN BY DEFAULT — it reports what it would save and changes nothing until
--apply. Originals are copied under `tmp/asset-backups/<original path>`, never
deleted — repo-local so they survive a reboot, git-ignored and Jekyll-excluded so
they never reach a build or a release zip.

Two rules this encodes, both learned the hard way:

1. SVG size on disk is not what the browser downloads. Pages serves SVG gzipped,
   so a 331 KB Figma export can be 113 KB on the wire and a 38 KB one can be 5 KB.
   Every SVG number here is reported both ways; judge by the gzip column.

2. For raster, ALWAYS try lossless as well as lossy and keep whichever is smaller.
   Flat-colour artwork (logos, UI graphics, anything with hard edges) compresses
   smaller AND perfectly with lossless WebP, while lossy both bloats it and chews
   the edges — a 201 KB PNG here went to 74 KB lossless vs 102 KB at q95. Photos
   and gradients go the other way. Guessing from the file extension gets it wrong.

3. NEVER lower --precision below the default 2, and treat a huge SVG gain as a
   RED FLAG rather than a result. Rounding coordinates to whole units collapses
   thin shapes to zero area and SVGO then DELETES them outright: on 2026-08-28
   section_vector.svg at -p 0 reported a 4x win that was really 7 of its 69 paths
   vanishing, on a file already optimal at -p 2 (re-running p2 reproduced it
   byte-for-byte). Sub-pixel displacement is not the failure mode. Lost geometry
   is, and no byte-level check can see it.

Which is why byte checks cannot close this out: only rendering proves an SVG still
DRAWS the same. This prints the svg-render-diff.mjs command after any SVG it
rewrites. Run it.

Raster conversion writes a NEW .webp beside the original; it cannot rewrite the
references for you, so it prints every file that mentions the old name.
"""

import argparse
import gzip as gziplib
import math
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SVG = '.svg'
RASTER = ('.png', '.jpg', '.jpeg')
# Below this, the rewrite costs more in churn than it saves.
MIN_GAIN = 0.03


def gz(path):
    with open(path, 'rb') as f:
        return len(gziplib.compress(f.read(), 9))


def kb(n):
    return f'{n / 1024:.0f}K'


# ── SVG ─────────────────────────────────────────────────────────────────────

def svg_integrity(before_src, after_src):
    """The two things SVGO can silently break."""
    problems = []
    a = re.search(r'viewBox="([^"]+)"', before_src)
    b = re.search(r'viewBox="([^"]+)"', after_src)
    if not b:
        problems.append('viewBox removed (breaks background-size: contain)')
    elif a and a.group(1) != b.group(1):
        problems.append(f'viewBox changed: {a.group(1)} -> {b.group(1)}')
    dangling = set(re.findall(r'url\(#([^)]+)\)', after_src)) - set(re.findall(r'id="([^"]+)"', after_src))
    if dangling:
        problems.append(f'dangling refs: {", ".join(sorted(dangling))}')
    return problems


def drawables(src):
    return sum(len(re.findall(rf'<{t}[ >/]', src))
               for t in ('path', 'rect', 'circle', 'ellipse', 'polygon',
                         'polyline', 'line', 'text', 'image', 'use'))


def do_svg(path, precision, apply_):
    tmp = path + '.opt'
    r = subprocess.run(
        ['npx', '--yes', 'svgo', path, '-o', tmp, '--multipass', '-p', str(precision)],
        cwd=ROOT, shell=(os.name == 'nt'), capture_output=True, text=True)
    if r.returncode != 0 or not os.path.exists(tmp):
        return None, ['svgo failed: ' + (r.stderr or r.stdout).strip()[:120]]

    with open(path, encoding='utf8') as f:
        before_src = f.read()
    with open(tmp, encoding='utf8') as f:
        after_src = f.read()
    problems = svg_integrity(before_src, after_src)
    # mergePaths can legitimately combine shapes, so a drop is a HINT rather than a
    # fault. It is also exactly what precision-collapse looks like: render-diff decides.
    lost = drawables(before_src) - drawables(after_src)
    warn = f'{lost} drawable(s) gone, verify with svg-render-diff' if lost > 0 else None

    stat = dict(before=os.path.getsize(path), after=os.path.getsize(tmp),
                gz_before=gz(path), gz_after=gz(tmp), out=os.path.basename(path))
    gain = 1 - stat['gz_after'] / stat['gz_before']

    if problems or gain < MIN_GAIN or not apply_:
        os.remove(tmp)
        stat['skipped'] = 'integrity' if problems else ('no gain' if gain < MIN_GAIN else None)
    else:
        backup(path)
        os.replace(tmp, path)
        stat['rewrote'] = True
    stat['warn'] = warn
    return stat, problems


# ── Raster ──────────────────────────────────────────────────────────────────

def psnr_max(a, b):
    """(min PSNR across channels, max absolute channel error)."""
    from PIL import ImageChops
    worst, mx = float('inf'), 0
    for i in range(len(a.getbands())):
        d = ImageChops.difference(a.split()[i], b.split()[i])
        mx = max(mx, d.getextrema()[1])
        h = d.histogram()
        mse = sum(v * v * c for v, c in enumerate(h)) / sum(h)
        if mse:
            worst = min(worst, 10 * math.log10(255.0 ** 2 / mse))
    return worst, mx


def do_raster(path, quality, apply_):
    from PIL import Image
    src = Image.open(path)
    im = src.convert('RGBA' if 'A' in src.getbands() else 'RGB')
    out = os.path.splitext(path)[0] + '.webp'

    cands = []
    for label, kw in (('lossless', dict(lossless=True, method=6)),
                      (f'q{quality}', dict(quality=quality, alpha_quality=100, method=6))):
        tmp = out + '.' + label
        im.save(tmp, 'WEBP', **kw)
        got = Image.open(tmp).convert(im.mode)
        p, mx = psnr_max(im, got)
        cands.append(dict(label=label, path=tmp, size=os.path.getsize(tmp), psnr=p, maxerr=mx))

    # Rule 2: smaller wins, and lossless winning is the common case for graphics.
    best = min(cands, key=lambda c: c['size'])
    stat = dict(before=os.path.getsize(path), after=best['size'], gz_before=os.path.getsize(path),
                gz_after=best['size'], out=os.path.basename(out), mode=im.mode,
                enc=best['label'], psnr=best['psnr'], maxerr=best['maxerr'],
                alt=[c for c in cands if c is not best][0])

    if apply_ and best['size'] < stat['before'] * (1 - MIN_GAIN):
        shutil.copyfile(best['path'], out)
        if os.path.abspath(out) != os.path.abspath(path):
            backup(path, move=True)
    else:
        stat['skipped'] = None if apply_ else 'dry-run'
    for c in cands:
        os.remove(c['path'])
    return stat, []


BACKUPS = os.path.join(ROOT, 'tmp', 'asset-backups')


def backup(path, move=False):
    # Mirror the source tree under tmp/ so same-named files from different packs
    # (three separator-1.svg, two services-section.svg) cannot overwrite each other.
    rel = os.path.relpath(path, ROOT)
    dst = os.path.join(BACKUPS, rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    (shutil.move if move else shutil.copyfile)(path, dst)


def find_refs(name):
    """Files mentioning this filename — a rename breaks them."""
    hits = []
    skip = {'node_modules', '_site', '.git', 'dist', 'tmp'}
    for base, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in skip]
        for f in files:
            if os.path.splitext(f)[1] not in ('.scss', '.css', '.js', '.html', '.md', '.yml', '.json'):
                continue
            p = os.path.join(base, f)
            try:
                with open(p, encoding='utf8', errors='ignore') as fh:
                    if name in fh.read():
                        hits.append(os.path.relpath(p, ROOT))
            except OSError:
                pass
    return hits


def collect(targets):
    out = []
    for t in targets:
        t = t if os.path.isabs(t) else os.path.join(ROOT, t)
        if os.path.isfile(t):
            out.append(t)
        else:
            for base, dirs, files in os.walk(t):
                dirs[:] = [d for d in dirs if d not in ('.orig', 'tmp')]
                out += [os.path.join(base, f) for f in sorted(files)
                        if os.path.splitext(f)[1].lower() in (SVG,) + RASTER]
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('targets', nargs='+', help='files or directories')
    ap.add_argument('--apply', action='store_true', help='write changes (default: report only)')
    ap.add_argument('--quality', type=int, default=95, help='lossy WebP quality to try (default 95)')
    ap.add_argument('--precision', type=int, default=2,
                    help='SVGO coordinate precision (default 2). Do NOT go lower: shapes '
                         'round to zero area and SVGO deletes them (see rule 3 above)')
    args = ap.parse_args()

    files = collect(args.targets)
    if not files:
        sys.exit('no .svg/.png/.jpg found')

    print(f'{"file":<34}{"before":>9}{"after":>9}{"saved":>8}   notes')
    print('-' * 78)
    tb = ta = 0
    renames = []
    rewrote_svg = []
    for p in files:
        ext = os.path.splitext(p)[1].lower()
        stat, problems = (do_svg(p, args.precision, args.apply) if ext == SVG
                          else do_raster(p, args.quality, args.apply))
        if stat is None:
            print(f'{os.path.basename(p):<34}{"":>9}{"":>9}{"":>8}   ' + '; '.join(problems))
            continue

        b, a = stat['gz_before'], stat['gz_after']
        tb += b
        ta += a
        note = ''
        if ext == SVG:
            note = f'gzip {kb(b)}->{kb(a)} (disk {kb(stat["before"])}->{kb(stat["after"])})'
        else:
            note = (f'{stat["enc"]} {stat["mode"]}, maxErr {stat["maxerr"]}'
                    f' | {stat["alt"]["label"]} would be {kb(stat["alt"]["size"])}')
            if stat['out'] != os.path.basename(p):
                renames.append((os.path.basename(p), stat['out']))
        if problems:
            note = 'SKIPPED — ' + '; '.join(problems)
        elif stat.get('skipped'):
            note += f'  [{stat["skipped"]}]'
        elif stat.get('warn'):
            note += f'  !! {stat["warn"]}'
        if ext == SVG and stat.get('rewrote'):
            rewrote_svg.append(p)
        print(f'{os.path.basename(p):<34}{kb(b):>9}{kb(a):>9}{1 - a / b:7.0%}   {note}')

    print('-' * 78)
    print(f'{"TOTAL (wire)":<34}{kb(tb):>9}{kb(ta):>9}{(1 - ta / tb) if tb else 0:7.0%}')
    if not args.apply:
        print('\nDry run — nothing written. Re-run with --apply.')

    if args.precision < 2:
        print(f'\n!! --precision {args.precision} is below the safe default of 2. Shapes can '
              'round to zero area and be deleted outright. Verify EVERY file.')
    if rewrote_svg:
        rel = ' '.join(sorted({os.path.relpath(f, ROOT).replace(os.sep, '/') for f in rewrote_svg}))
        print('\nSVGs rewritten. Byte checks cannot prove they still DRAW the same. Verify:')
        print(f'  node scripts/svg-render-diff.mjs {rel}')

    for old, new in renames:
        refs = find_refs(old)
        print(f'\n{old} -> {new}: update {len(refs)} reference(s)')
        for r in refs:
            print('  ' + r)


if __name__ == '__main__':
    main()
