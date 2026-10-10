#!/usr/bin/env python3
"""Mechanical CSS checks for nds-css-audit — the counting half; the skill does the judging.

    python scripts/check-css.py            # fail on problems
    python scripts/check-css.py --report   # also list unread component tokens (info, never a failure)
    python scripts/check-css.py --unused   # rules no built page or JS uses, by size (candidates only)

Reads the BUILT CSS (_site/assets/css/*.min.css), so build first: that is the CSS
the browser gets, with nesting, mixins and loops already resolved. One check reads
SCSS source, because the file a declaration came from is gone after compiling.

  1. dangling   var(--x) with no fallback, and --x set nowhere (CSS, _js/, markup)
  2. fallback   var(--x, …) where --x sits on :root in the same bundle — never fires,
                and drifts silently when the token changes
  3. duplicate  the same property twice in one rule, both plain values (not a fallback pair)
  4. dark       a component file setting a global token inside @include dark — dark
                lives in the token file's own dark block (AGENTS.md "Invariant")

The [data-state] tail check stays in check-data-state-tails.py (mkrelease runs it).
"""
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS = sorted(glob.glob(os.path.join(ROOT, '_site', 'assets', 'css', '*.min.css')))
NESTING = ('media', 'supports', 'container', 'layer', 'scope')
NAME = r'--[\w-]+'
# Matched against the path inside the repo: a checkout under C:\tmp\ once skipped every source file.
SKIP = re.compile(r'(^|[\\/])(dist|tmp|_site|node_modules)[\\/]')


def rules(css):
    """Yield (prelude, body, nested_in_at_rule) for every style rule."""
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    stack, buf = [], []
    for c in css:
        if c == '{':
            prelude = ''.join(buf).strip()
            buf = []
            if prelude.startswith('@'):
                name = re.split(r'[\s(]', prelude[1:], maxsplit=1)[0].lower()
                stack.append(('at', name in NESTING))
            else:
                stack.append(('rule', prelude))
        elif c == '}':
            body = ''.join(buf)
            buf = []
            if stack:
                kind, val = stack.pop()
                if kind == 'rule':
                    yield val, body, any(k == 'at' for k, _ in stack)
        else:
            buf.append(c)


def decls(body):
    """Split a body on top-level ';' into (prop, value) pairs."""
    out, cur, depth = [], [], 0
    for c in body + ';':
        if c in '([':
            depth += 1
        elif c in ')]':
            depth -= 1
        if c == ';' and depth == 0:
            d = ''.join(cur).strip()
            cur = []
            if ':' in d:
                p, v = d.split(':', 1)
                out.append((p.strip(), v.strip()))
            continue
        cur.append(c)
    return out


def var_refs(value):
    """Yield (name, has_fallback) for every var() in a value, nested ones included."""
    for m in re.finditer(r'var\(\s*(' + NAME + r')\s*(,)?', value):
        yield m.group(1), bool(m.group(2))


def read(path):
    return open(path, encoding='utf-8').read()


def set_outside_css():
    """Custom-property names named in JS, and in JS or markup (setProperty, inline style)."""
    names, js = set(), set()
    globs = ['_js/*.js', '_js/**/*.js', '_includes/**/*.html', '_layouts/*.html', '**/*.md']
    for g in globs:
        for p in glob.glob(os.path.join(ROOT, g), recursive=True):
            if SKIP.search(os.path.relpath(p, ROOT)):
                continue
            names.update(re.findall(r"(" + NAME + r")\s*:", read(p)))
            names.update(re.findall(r"""['"`](""" + NAME + r""")['"`]""", read(p)))
            if p.endswith('.js'):
                js.update(re.findall(NAME, read(p)))
    return js, names


def scss_blocks(text, opener):
    """Yield the body of every `opener {…}` block in SCSS source."""
    text = re.sub(r'//[^\n]*|/\*.*?\*/', '', text, flags=re.S)
    for m in re.finditer(re.escape(opener) + r'\s*\{', text):
        depth, i = 1, m.end()
        while i < len(text) and depth:
            depth += {'{': 1, '}': -1}.get(text[i], 0)
            i += 1
        yield text[m.end():i - 1], text.count('\n', 0, m.start()) + 1


def required_classes(selector):
    """Classes a selector cannot match without: those outside any parens, so
    :not(.x) and the arms of :is()/:where() never make a rule look unused."""
    out, depth = [], 0
    for m in re.finditer(r'[()]|\.(-?[_a-zA-Z][\w-]*)', selector):
        if m.group(0) == '(':
            depth += 1
        elif m.group(0) == ')':
            depth -= 1
        elif depth == 0:
            out.append(m.group(1))
    return out


def unused_report():
    """Rules whose every selector needs a class that no built page and no JS mentions.
    ponytail: name-level match, so a class a consumer builds at runtime from parts
    ('nds-' + size) reads as unused — candidates for a human, never an auto-delete."""
    import gzip
    used = set()
    for p in glob.glob(os.path.join(ROOT, '_site', '**', '*.html'), recursive=True):
        for attr in re.findall(r'class\s*=\s*"([^"]*)"', read(p)):
            used.update(attr.split())
    for p in glob.glob(os.path.join(ROOT, '_js', '**', '*.js'), recursive=True):
        used.update(re.findall(r'[\w-]+', read(p)))
    groups, total = {}, []
    for path in CSS:
        bundle = os.path.basename(path)
        if bundle == 'nds-icons.min.css':
            continue  # one class per glyph, consumer-picked
        for prelude, body, _ in rules(read(path)):
            sels, depth, cur = [], 0, []
            for c in prelude + ',':
                depth += c in '([' and 1 or c in ')]' and -1 or 0
                if c == ',' and depth == 0:
                    sels.append(''.join(cur)); cur = []
                else:
                    cur.append(c)
            missing = [next((k for k in required_classes(s) if k not in used), None) for s in sels]
            if all(missing):
                text = f'{prelude}{{{body}}}'
                total.append(text)
                groups.setdefault((bundle, missing[0]), []).append(text)
    # A class a doc page names but never renders is API without a demo, not dead CSS.
    docs = set()
    for p in glob.glob(os.path.join(ROOT, '*', '*.md')) + glob.glob(os.path.join(ROOT, '*.md')):
        if not SKIP.search(os.path.relpath(p, ROOT)):
            docs.update(re.findall(r'[\w-]+', read(p)))
    raw = ''.join(total)
    print(f'unused-rule candidates: {len(total)} rules, {len(raw)} B raw, ~{len(gzip.compress(raw.encode()))} B gzip (alone; less in place)')
    for (bundle, cls), texts in sorted(groups.items(), key=lambda kv: -sum(map(len, kv[1]))):
        tag = 'named in docs, no demo' if cls in docs else 'NOWHERE outside its SCSS'
        print(f'{sum(map(len, texts)):6d} B  {len(texts):3d} rules  .{cls}  ({bundle}) — {tag}')


def main():
    if not CSS:
        sys.exit('No built CSS in _site/assets/css — build first.')
    if '--unused' in sys.argv:
        return unused_report()
    problems, declared, used, root_tokens = [], set(), {}, {}

    for path in CSS:
        bundle = os.path.basename(path)
        root_tokens[bundle] = set()
        for prelude, body, nested in rules(read(path)):
            on_root = not nested and ':root' in [s.strip() for s in prelude.split(',')]
            seen = {}
            for prop, value in decls(body):
                if prop.startswith('--'):
                    declared.add(prop)
                    if on_root:
                        root_tokens[bundle].add(prop)
                for name, fb in var_refs(value):
                    used.setdefault(name, []).append((bundle, prelude, fb))
                if not prop.startswith('--'):
                    plain = '(' not in value and not value.startswith('-') and not re.search(r'[sdl]v[hwib]|cq', value)
                    if prop in seen and seen[prop][1] and plain:
                        problems.append(('duplicate', bundle, prelude, f'{prop}: {seen[prop][0]} then {value}'))
                    seen[prop] = (value, plain)

    js_only, outside = set_outside_css()
    for name, sites in sorted(used.items()):
        if name not in declared and name not in outside:
            for bundle, prelude, fb in sites:
                if not fb:
                    problems.append(('dangling', bundle, prelude, f'var({name}) is set nowhere'))
        for bundle, prelude, fb in sites:
            if fb and name in root_tokens.get(bundle, ()):
                problems.append(('fallback', bundle, prelude, f'var({name}, …) — {name} is on :root in this bundle'))

    tokens = set()
    for p in glob.glob(os.path.join(ROOT, '_sass', 'tokens', '*.scss')):
        tokens.update(re.findall(r'^\s*(' + NAME + r')\s*:', read(p), flags=re.M))
    for p in sorted(glob.glob(os.path.join(ROOT, '_sass', 'components', '*.scss')) + glob.glob(os.path.join(ROOT, '_sass', 'layout', '*.scss'))):
        rel = os.path.relpath(p, ROOT).replace(os.sep, '/')
        for body, line in scss_blocks(read(p), '@include dark'):
            for name in sorted(set(re.findall(r'(' + NAME + r')\s*:', body)) & tokens):
                problems.append(('dark', rel, f'L{line}', f'{name} is a global token — re-bind it in its tier file\'s dark block'))

    seen_lines = set()
    for kind, where, sel, why in problems:
        key = (kind, where, sel[:150], why)
        if key in seen_lines:
            continue
        seen_lines.add(key)
        print(f'[{kind}] {where}  {sel[:150]}\n    {why}')

    if '--report' in sys.argv:
        comp = set(re.findall(r'^\s*(' + NAME + r')\s*:', read(os.path.join(ROOT, '_sass', 'tokens', '_components.scss')), flags=re.M))
        unread = sorted(n for n in comp if n not in used and n not in js_only)
        print(f'\n== unread component tokens ({len(unread)}) — published API, judge by family, not by count')
        for n in unread:
            print('  ' + n)

    if seen_lines:
        sys.exit(f'{len(seen_lines)} CSS problem(s).')
    print(f'css: clean — {len(declared)} custom properties, {len(used)} read, {len(CSS)} bundles')


if __name__ == '__main__':
    main()
