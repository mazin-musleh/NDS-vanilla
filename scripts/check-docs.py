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

ORDER = ['overview', 'markup', 'parts', 'variants', 'behavior', 'examples', 'features', 'practices', 'api', 'related']
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
        # \| is a literal pipe inside a cell (kramdown), never a cell edge
        rows.insert(0, [c.strip().replace('\\|', '|') for c in re.split(r'(?<!\\)\|', lines[i].strip().strip('|'))])
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

    # A Structure canon replaces the base, so it may reuse the base's ids (the root a shared JS call names).
    # So may a part on a (default) row: it is a copy of what the base already carries.
    alts = {m for _, a, _ in canons if attr(a, 'data-variants')
            for r in (table(src, attr(a, 'data-variants')) or []) if len(r) == 5 and (r[0] in ('Structure', 'Example') or '(default)' in r[1])
            for m in re.findall(r'canon `?#([\w-]+)', r[2])}
    base_ids = {i for _, a, b in canons if attr(a, 'data-variants') for i in re.findall(r'\sid="([^"]+)"', b)}
    ids = {}
    for cid, attrs, body in canons:
        # Canon bodies: plain HTML, no demo-only parts.
        for bad, why in (('{{', 'Liquid'), ('{%', 'Liquid'), ('&lt;', 'escaped markup'), ('<form', 'a <form>'), ('id="demo-', 'a demo- id')):
            # data-form: the form is the component's own markup (user feedback validates its form).
            # data-escaped: the body is a Liquid capture of code that holds </script> (the document head).
            if bad in body and not (bad == '<form' and attr(attrs, 'data-form') is not None) \
                    and not (bad in ('{{', '{%') and attr(attrs, 'data-escaped') is not None):
                errs.append(f'canon #{cid}: {why}')
        for i in [cid] + [i for i in re.findall(r'\sid="([^"]+)"', body) if cid not in alts or i not in base_ids]:
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
        # Only the markup this builder renders: its base and the canons its rows name, not a Behavior demo.
        named = {cid} | {m for r in rows if len(r) == 5 for m in re.findall(r'canon `?#([\w-]+)', r[2])}
        html = '\n'.join(b for c, a, b in canons if c in named and (attr(a, 'data-lang') or 'html') == 'html')
        # `(demo: + x)` turns on the row marked `(id: x)`: by id, so a translated page keeps working.
        row_ids = {m for r in rows if len(r) == 5 for m in re.findall(r'\(id:\s*([\w-]+)\)', r[1])}
        for r in rows:
            if len(r) == 5:
                errs += [f'#{tid}: {r[0]} / {r[1]}: (demo: + {d}) names no (id: {d}) row'
                         for d in re.findall(r'\(demo:\s*\+\s*([^)]*?)\s*\)', r[1]) if d not in row_ids]
        # `(not: x)` turns a row off on the structures marked `(id: x)`, so their canons may carry it.
        struct_of = {}
        for r in rows:
            if len(r) == 5 and r[0] in ('Structure', 'Example'):
                sid = re.search(r'\(id:\s*([\w-]+)\)', r[1])
                ref = re.search(r'canon `?#([\w-]+)', r[2])
                if sid:
                    struct_of[ref.group(1) if ref else cid] = sid.group(1)
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
            op = re.fullmatch(r'''\.([\w-]+)|\[([\w-]+)(?:(~?)=(?:"([^"]*)"|'([^']*)'))?\]''', markup)
            if not op or '(default)' in option or target.startswith('create('):
                continue
            # A default row writes it too: picking this option puts it back after that default is off.
            if any(len(r) == 5 and '(default)' in r[1] and r[2].replace('`', '') == markup for r in rows):
                continue
            want = set(re.findall(r'\.([\w-]+)', re.sub(r':not\([^)]*\)', '', target)))
            skip = set(re.findall(r':not\(\.([\w-]+)\)', target))
            ids = re.findall(r'#([\w-]+)', re.sub(r':not\([^)]*\)', '', target))
            tag = re.match(r'([a-z][\w-]*)', target)
            def has(cls, attrs):
                if op.group(1):
                    return op.group(1) in cls
                name, tilde, value = op.group(2), op.group(3), op.group(4) if op.group(4) is not None else op.group(5)
                if name not in attrs:
                    return False
                return value is None or (value in attrs[name].split() if tilde else attrs[name] == value)
            nots = set(re.findall(r'[\w-]+', (re.search(r'\(not:([^)]*)\)', option) or [None, ''])[1]))
            scope = '\n'.join(b for c, a, b in canons if c in named and struct_of.get(c) not in nots and (attr(a, 'data-lang') or 'html') == 'html') if nots else html
            for t, cls, attrs in tags(scope):
                if want <= cls and not (skip & cls) and (not tag or t == tag.group(1)) and (not ids or attrs.get('id') in ids) and has(cls, attrs):
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
