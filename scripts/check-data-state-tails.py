#!/usr/bin/env python3
"""Ratchet on the shared [data-state] invalidation set (nds-css-audit PERF-06).

    python scripts/check-data-state-tails.py            # check the built CSS against the baseline
    python scripts/check-data-state-tails.py --report   # every tail, with the selectors that feed it
    python scripts/check-data-state-tails.py --update   # rewrite the baseline after a migration batch

Chrome keys attribute invalidation by attribute NAME, never by value. Every selector
with a compound to the RIGHT of a [data-state~="…"] compound puts that tail (td, i,
.nds-label) into ONE set called data-state, and any data-state write anywhere then
restyles every matching descendant of the written element — one scroll-state write
on a table wrapper restyled 21,008 elements (140 ms at 1x, 2026-09-05). The fix is
in the CSS, not at the write: state styles its host, and a descendant that must
change with it reads an inherited custom property the host sets.

Reads _site/assets/css/*.css, so build first. Fails on a universal tail (PERF-05),
on any tail not in the baseline, and on any tail whose rule count grew. A tail that
disappears needs no baseline edit; --update records the drop. Adding a tail on
purpose means editing the baseline in the same commit, where review sees it.
"""
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS_DIR = os.path.join(ROOT, '_site', 'assets', 'css')
BASELINE = os.path.join(ROOT, 'scripts', 'data-state-tails.json')
NESTING = ('media', 'supports', 'container', 'layer', 'scope')


def selectors(css):
    """Yield every rule prelude that is a selector list (not an at-rule, not a declaration)."""
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    stack = [True]
    buf = []
    for c in css:
        if c == '{':
            prelude = ''.join(buf).strip()
            buf = []
            if prelude.startswith('@'):
                name = re.split(r'[\s(]', prelude[1:], maxsplit=1)[0].lower()
                stack.append(name in NESTING)
            else:
                if stack[-1] and prelude:
                    yield prelude
                stack.append(False)
        elif c == '}':
            buf = []
            if len(stack) > 1:
                stack.pop()
        else:
            buf.append(c)


def split_top(text, seps):
    """Split on any of `seps` at paren/bracket depth 0. Whitespace in seps means a descendant combinator."""
    parts, cur, depth = [], [], 0
    i = 0
    while i < len(text):
        c = text[i]
        if c in '([':
            depth += 1
        elif c in ')]':
            depth -= 1
        if depth == 0 and c in seps:
            if c.isspace():
                # A run of spaces is one combinator unless it hugs > + ~, which own it.
                j = i
                while j < len(text) and text[j].isspace():
                    j += 1
                if j < len(text) and text[j] in '>+~':
                    i = j
                    continue
                i = j
                if ''.join(cur).strip():
                    parts.append(''.join(cur).strip())
                cur = []
                continue
            if ''.join(cur).strip():
                parts.append(''.join(cur).strip())
            cur = []
            i += 1
            while i < len(text) and text[i].isspace():
                i += 1
            continue
        cur.append(c)
        i += 1
    if ''.join(cur).strip():
        parts.append(''.join(cur).strip())
    return parts


SIMPLE = re.compile(r'(::?[a-zA-Z-]+(?:\([^)]*(?:\([^)]*\)[^)]*)*\))?|\[[^\]]*\]|\.[\w-]+|#[\w-]+|\*|[a-zA-Z][\w-]*)')


def features(compound):
    """The features Chrome keys the tail on: the most specific of id > class > attribute > tag.
    :is()/:where() contribute the union of their arguments; a bare pseudo-class is a universal."""
    ids, classes, attrs, tags, universal = [], [], [], [], False
    for tok in SIMPLE.findall(compound):
        if tok.startswith('::'):
            continue
        if tok.startswith(':'):
            m = re.match(r':(is|where|not)\((.*)\)$', tok, re.S)
            if m and m.group(1) != 'not':
                for arg in split_top(m.group(2), ','):
                    ids2, classes2, attrs2, tags2, uni2 = features(arg)
                    ids += ids2; classes += classes2; attrs += attrs2; tags += tags2
                    universal = universal or uni2
            elif not m:
                universal = True  # :first-child, :hover… alone carry no filterable feature
            continue
        if tok.startswith('#'):
            ids.append(tok)
        elif tok.startswith('.'):
            classes.append(tok)
        elif tok.startswith('['):
            attrs.append('[' + re.split(r'[~|^$*]?=|\]', tok[1:], maxsplit=1)[0].strip() + ']')
        elif tok == '*':
            universal = True
        else:
            tags.append(tok.lower())
    return ids, classes, attrs, tags, universal


def keys_for(compound):
    ids, classes, attrs, tags, universal = features(compound)
    if ids:
        return ['id:' + i for i in ids]
    if classes:
        return ['class:' + c for c in classes]
    if attrs:
        return ['attr:' + a for a in attrs]
    if tags:
        return ['tag:' + t for t in tags]
    return ['universal']


def tails():
    """{key: [selectors]} for every selector with a compound after its last [data-state…]."""
    out = {}
    for path in sorted(glob.glob(os.path.join(CSS_DIR, '*.css'))):
        css = open(path, encoding='utf-8').read()
        if '[data-state' not in css:
            continue
        for prelude in selectors(css):
            for sel in split_top(prelude, ','):
                if '[data-state' not in sel:
                    continue
                # Split into compounds first, then find the LAST one that mentions
                # data-state anywhere — a plain attribute, or inside :not()/:is(),
                # which feed the same set. Anything after it is a tail.
                compounds = split_top(sel, ' >+~')
                state_at = max((n for n, c in enumerate(compounds) if '[data-state' in c), default=-1)
                if state_at < 0 or state_at == len(compounds) - 1:
                    continue  # the state compound is the subject: self-invalidation only
                tail = compounds[-1]
                for key in keys_for(tail):
                    out.setdefault(key, []).append(sel)
    return out


def order(key):
    rank = {'universal': 0, 'tag': 1, 'attr': 2, 'class': 3, 'id': 4}
    return (rank[key.split(':')[0]], key)


def main():
    if not glob.glob(os.path.join(CSS_DIR, '*.css')):
        sys.exit('No built CSS in _site/assets/css — build first.')
    found = tails()
    counts = {k: len(v) for k, v in found.items()}

    if '--report' in sys.argv:
        for key in sorted(found, key=order):
            print(f'{len(found[key]):4d}x  {key}')
            for sel in found[key]:
                print(f'        {sel[:150]}')
        print(f'\n{sum(counts.values())} rules over {len(counts)} tails')
        return

    if '--update' in sys.argv:
        with open(BASELINE, 'w', encoding='utf-8', newline='\n') as f:
            json.dump({'_': 'Rule counts per [data-state] descendant tail in the built CSS. '
                            'Regenerate with: python scripts/check-data-state-tails.py --update',
                       'tails': {k: counts[k] for k in sorted(counts, key=order)}}, f, indent=1)
            f.write('\n')
        print(f'baseline written: {sum(counts.values())} rules over {len(counts)} tails')
        return

    baseline = json.load(open(BASELINE, encoding='utf-8'))['tails'] if os.path.exists(BASELINE) else {}
    problems = []
    for key in sorted(counts, key=order):
        if key == 'universal':
            problems.append((key, 'universal tail — every data-state write restyles its whole subtree (PERF-05)'))
        elif key not in baseline:
            problems.append((key, 'new tail — style the host, or read an inherited custom property on the descendant (PERF-06)'))
        elif counts[key] > baseline[key]:
            problems.append((key, f'grew {baseline[key]} → {counts[key]} rules'))
    if problems:
        for key, why in problems:
            print(f'{key}: {why}')
            for sel in found[key]:
                print(f'    {sel[:150]}')
        sys.exit(f'{len(problems)} [data-state] tail problem(s). If a tail must stay, run --update in the same commit.')
    kinds = {}
    for key in counts:
        kinds[key.split(':')[0]] = kinds.get(key.split(':')[0], 0) + 1
    print(f'data-state tails: {sum(counts.values())} rules over {len(counts)} tails, within baseline '
          f'({", ".join(f"{v} {k}" for k, v in sorted(kinds.items()))})')


if __name__ == '__main__':
    main()
