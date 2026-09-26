"""Check doc pages in the one-source format (data-canon blocks) against the nds-doc rules.

Reads the .md source only, no build. Old-format pages (no data-canon) are skipped.

    python scripts/check-docs.py                 # every doc page
    python scripts/check-docs.py components/button.md layout/grid.md

Exit 1 on any failure.

ponytail: the JS tables are not compared with the file's banner yet. Add it with the banner
parser in scripts/check-banners.mjs when a page drifts from its banner.
"""
import glob
import re
import sys

ORDER = ['overview', 'markup', 'parts', 'variants', 'behavior', 'features', 'practices', 'api', 'related']
FOLDERS = ['components', 'ui-shell', 'layout', 'utilities', 'core']
CANON_RE = re.compile(r'<script type="text/html"([^>]*)>(.*?)</script>', re.S)
OLD_DEMO = ('nds-demo-card', 'demo-toggle-btn', 'data-toggler')


def attr(attrs, name):
    m = re.search(r'(?:^|\s)' + re.escape(name) + r'(?:="([^"]*)")?(?=\s|$)', attrs)
    return m and (m.group(1) or '')


def table(src, tid):
    """Rows of the markdown table whose IAL is {: #tid ...}, as lists of cells."""
    lines = src.split('\n')
    end = next((i for i, l in enumerate(lines) if l.startswith('{: #' + tid)), None)
    if end is None:
        return None
    rows, i = [], end - 1
    while i >= 0 and lines[i].startswith('|'):
        rows.insert(0, [c.strip() for c in lines[i].strip().strip('|').split('|')])
        i -= 1
    return rows[2:]


def tags(html):
    """(tag, classes, {attribute: value}) for every opening tag."""
    for m in re.finditer(r'<([a-z][\w-]*)([^>]*)>', html):
        attrs = {k: v for k, v in re.findall(r'\s([\w-]+)(?:="([^"]*)")?', m.group(2))}
        yield m.group(1), set(attrs.get('class', '').split()), attrs


def check(path):
    src = open(path, encoding='utf-8').read()
    canons = [(attr(a, 'id'), a, b) for a, b in CANON_RE.findall(src) if attr(a, 'data-canon') is not None]
    if not canons:
        return None
    errs = []

    # Skeleton: section classes in order; Variants hidden.
    found = re.findall(r'<section[^>]*class="[^"]*nds-doc-([a-z]+)[^"]*"([^>]*)>', src)
    names = [n for n, _ in found]
    if names != sorted(names, key=lambda n: ORDER.index(n) if n in ORDER else 99):
        errs.append(f'sections out of order: {names}')
    for n, rest in found:
        if n not in ORDER:
            errs.append(f'unknown section class nds-doc-{n}')
        if n == 'variants' and 'hidden' not in rest.split():
            errs.append('the Variants section is not hidden')
    for s in OLD_DEMO:
        if s in src:
            errs.append(f'old demo markup left: {s}')

    ids = {}
    for cid, attrs, body in canons:
        # Canon bodies: plain HTML, no demo-only parts.
        for bad, why in (('{{', 'Liquid'), ('{%', 'Liquid'), ('&lt;', 'escaped markup'), ('<form', 'a <form>'), ('id="demo-', 'a demo- id')):
            if bad in body:
                errs.append(f'canon #{cid}: {why}')
        for i in [cid] + re.findall(r'\sid="([^"]+)"', body):
            ids[i] = ids.get(i, 0) + 1
    errs += [f'id "{i}" used {n} times across canons' for i, n in ids.items() if n > 1]

    known = {cid for cid, _, _ in canons}
    for cid, attrs, body in canons:
        if attr(attrs, 'data-js') and attr(attrs, 'data-js') not in known:
            errs.append(f'canon #{cid}: data-js #{attr(attrs, "data-js")} does not exist')
        tid = attr(attrs, 'data-variants')
        if not tid:
            continue
        rows = table(src, tid)
        if rows is None:
            errs.append(f'canon #{cid}: Variants table #{tid} not found')
            continue
        html = '\n'.join(b for _, a, b in canons if (attr(a, 'data-lang') or 'html') == 'html')
        for row in rows:
            if len(row) != 5:
                errs.append(f'#{tid}: row with {len(row)} cells: {" | ".join(row)[:80]}')
                continue
            group, option, markup, target, _ = row
            markup, target = markup.replace('`', ''), re.sub(r'\s*\((start|end|after)\)$', '', target.strip('`'))
            ref = re.fullmatch(r'canon #([\w-]+)', markup)
            if ref and ref.group(1) not in known:
                errs.append(f'#{tid}: {group} / {option}: canon #{ref.group(1)} does not exist')
            # A non-default option must not be in the canon already, or it can never be turned off.
            op = re.fullmatch(r'\.([\w-]+)|\[([\w-]+)(?:(~?)="([^"]*)")?\]', markup)
            if not op or '(default)' in option or target.startswith('create('):
                continue
            want = set(re.findall(r'\.([\w-]+)', re.sub(r':not\([^)]*\)', '', target)))
            skip = set(re.findall(r':not\(\.([\w-]+)\)', target))
            tag = re.match(r'([a-z][\w-]*)', target)
            def has(cls, attrs):
                if op.group(1):
                    return op.group(1) in cls
                name, tilde, value = op.group(2), op.group(3), op.group(4)
                if name not in attrs:
                    return False
                return value is None or (value in attrs[name].split() if tilde else attrs[name] == value)
            for t, cls, attrs in tags(html):
                if want <= cls and not (skip & cls) and (not tag or t == tag.group(1)) and has(cls, attrs):
                    errs.append(f'#{tid}: {group} / {option}: a canon already has {markup} on {target}')
                    break
    return errs


def main():
    paths = sys.argv[1:] or sorted(p for f in FOLDERS for p in glob.glob(f'{f}/*.md'))
    failed = checked = 0
    for p in paths:
        errs = check(p.replace('\\', '/'))
        if errs is None:
            continue
        checked += 1
        for e in errs:
            print(f'{p}: {e}')
        failed += bool(errs)
    print(f'{checked} one-source page(s) checked, {failed} with problems')
    sys.exit(1 if failed else 0)


if __name__ == '__main__':
    main()
