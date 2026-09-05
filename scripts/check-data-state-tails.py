#!/usr/bin/env python3
"""Ratchet on the shared attribute invalidation sets (nds-css-audit PERF-06).

    python scripts/check-data-state-tails.py            # check the built CSS against the baseline
    python scripts/check-data-state-tails.py --report   # every tail, with the selectors that feed it
    python scripts/check-data-state-tails.py --update   # rewrite the baseline after a migration batch

Chrome keys attribute invalidation by attribute NAME, never by value. Every selector
with a compound to the RIGHT of a [data-state~="…"] compound puts that tail (td, i,
.nds-label) into ONE set called data-state, and any data-state write anywhere then
restyles every matching descendant of the written element — one scroll-state write
on a table wrapper restyled 21,008 elements (140 ms at 1x, 2026-09-05). data-status
pools the same way (validation, alerts, file rows). The fix is in the CSS, not at
the write: state styles its host, and a descendant that must change with it reads an
inherited custom property the host sets.

Reads _site/assets/css/*.css, so build first. Per attribute in ATTRS: fails on a
universal tail (PERF-05), on any tail not in the baseline, and on any tail whose rule
count grew. A tail that disappears needs no baseline edit; --update records the drop.
Adding a tail on purpose means editing the baseline in the same commit, where review
sees it.
"""
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS_DIR = os.path.join(ROOT, '_site', 'assets', 'css')
BASELINE = os.path.join(ROOT, 'scripts', 'data-state-tails.json')
ATTRS = ('data-state', 'data-status')
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


def tails(attr):
    """{key: [selectors]} for every selector with a compound after its last [attr…] compound."""
    out = {}
    for path in sorted(glob.glob(os.path.join(CSS_DIR, '*.css'))):
        css = open(path, encoding='utf-8').read()
        if '[' + attr not in css:
            continue
        for prelude in selectors(css):
            for sel in split_top(prelude, ','):
                if '[' + attr not in sel:
                    continue
                # Split into compounds first, then find the LAST one that mentions the
                # attribute anywhere — plain, or inside :not()/:is(), which feed the same
                # set. Anything after it is a tail.
                compounds = split_top(sel, ' >+~')
                state_at = max((n for n, c in enumerate(compounds) if '[' + attr in c), default=-1)
                if state_at < 0 or state_at == len(compounds) - 1:
                    continue  # the state compound is the subject: self-invalidation only
                for key in keys_for(compounds[-1]):
                    out.setdefault(key, []).append(sel)
    return out


def order(key):
    rank = {'universal': 0, 'tag': 1, 'attr': 2, 'class': 3, 'id': 4}
    return (rank[key.split(':')[0]], key)


def main():
    if not glob.glob(os.path.join(CSS_DIR, '*.css')):
        sys.exit('No built CSS in _site/assets/css — build first.')
    found = {attr: tails(attr) for attr in ATTRS}
    counts = {attr: {k: len(v) for k, v in found[attr].items()} for attr in ATTRS}

    if '--report' in sys.argv:
        for attr in ATTRS:
            print(f'== [{attr}]: {sum(counts[attr].values())} rules over {len(counts[attr])} tails')
            for key in sorted(found[attr], key=order):
                print(f'{len(found[attr][key]):4d}x  {key}')
                for sel in found[attr][key]:
                    print(f'        {sel[:150]}')
        return

    if '--update' in sys.argv:
        with open(BASELINE, 'w', encoding='utf-8', newline='\n') as f:
            json.dump({'_': 'Rule counts per descendant tail after each attribute in the built CSS. '
                            'Regenerate with: python scripts/check-data-state-tails.py --update',
                       'tails': {attr: {k: counts[attr][k] for k in sorted(counts[attr], key=order)} for attr in ATTRS}},
                      f, indent=1)
            f.write('\n')
        print('baseline written: ' + ' · '.join(f'[{a}] {sum(counts[a].values())} rules over {len(counts[a])} tails' for a in ATTRS))
        return

    baseline = json.load(open(BASELINE, encoding='utf-8'))['tails'] if os.path.exists(BASELINE) else {}
    problems = []
    for attr in ATTRS:
        base = baseline.get(attr, {})
        for key in sorted(counts[attr], key=order):
            if key == 'universal':
                problems.append((attr, key, 'universal tail — every write restyles its whole subtree (PERF-05)'))
            elif key not in base:
                problems.append((attr, key, 'new tail — style the host, or read an inherited custom property on the descendant (PERF-06)'))
            elif counts[attr][key] > base[key]:
                problems.append((attr, key, f'grew {base[key]} → {counts[attr][key]} rules'))
    if problems:
        for attr, key, why in problems:
            print(f'[{attr}] {key}: {why}')
            for sel in found[attr][key]:
                print(f'    {sel[:150]}')
        sys.exit(f'{len(problems)} attribute tail problem(s). If a tail must stay, run --update in the same commit.')
    print('attribute tails within baseline: ' + ' · '.join(
        f'[{a}] {sum(counts[a].values())} rules over {len(counts[a])} tails' for a in ATTRS))


if __name__ == '__main__':
    main()
