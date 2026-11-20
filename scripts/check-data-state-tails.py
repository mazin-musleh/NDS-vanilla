#!/usr/bin/env python3
"""Guard on the shared attribute invalidation sets (AGENTS.md "data-state styles its host").

    python scripts/check-data-state-tails.py            # check the built CSS
    python scripts/check-data-state-tails.py --report   # every tail, with the selectors that feed it

Chrome keys attribute invalidation by attribute NAME, never by value. Every selector
with a compound to the RIGHT of a [data-state~="…"] compound puts that tail (td, i,
.nds-label) into ONE set called data-state, and any data-state write anywhere then
restyles every matching descendant of the written element — one scroll-state write
on a table wrapper restyled 21,008 elements (140 ms at 1x, 2026-09-05). data-status
pools the same way. The fix is in the CSS, not at the write: state styles its host,
a descendant on a SMALL host reads an inherited custom property the host sets, and a
big or often-flipping host keys its descendant rule on a mirrored class.

A flag the JS writes on <html> or <body> (data-fab-tucked, data-nds-scroll-lock) pools the
same way, under the whole page: a `[data-fab-tucked] .nds-fab-dock > *` tail restyled 1,157
elements on every flip (2026-10-16). Those flags are found in _js/ and held to the same rules;
the few that restyle the page on purpose sit in PAGE_WIDE.

Reads _site/assets/css/*.css, so build first. Two rules, nothing to maintain:
  1. no universal, tag or attribute tail — those match under every host;
  2. no tail from SHARED, the classes that appear inside every component.
A component-owned class tail (.nds-stepper-circle under .nds-stepper-step) is fine:
it only matches inside its own component. The few selectors in ACCEPTED break rule
1 or 2 on purpose, each with its reason.
"""
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS_DIR = os.path.join(ROOT, '_site', 'assets', 'css')
STATE_ATTRS = ('data-state', 'data-status')

# Page flags that restyle the whole page by design: a user's choice or a one-time load step.
PAGE_WIDE = {
    'data-theme': 'a theme switch restyles the page',
    'data-palette': 'a palette switch restyles the page',
    'data-a11y': 'an accessibility mode restyles the page',
    'data-nds-i18n': 'written once, when the language pack lands',
    'data-nds-loaded': 'written once, at the reveal',
}


def page_flags():
    """data-* names the JS writes on <html> or <body>, directly or through a local alias."""
    flags = set()
    for path in glob.glob(os.path.join(ROOT, '_js', '**', '*.js'), recursive=True):
        if path.endswith('.min.js'):
            continue
        src = open(path, encoding='utf-8').read()
        hosts = {r'document\.documentElement', r'document\.body'} | {
            re.escape(n) for n in re.findall(r'(?:const|let|var)\s+(\w+)\s*=\s*document\.(?:documentElement|body)\b', src)}
        for h in hosts:
            flags.update(re.findall(h + r'\.(?:set|toggle)Attribute\(\s*[\'"](data-[\w-]+)', src))
    return flags


ATTRS = STATE_ATTRS + tuple(sorted(page_flags() - set(PAGE_WIDE)))
NESTING = ('media', 'supports', 'container', 'layer', 'scope')

# Classes that live inside every component, so a tail on them matches under any host.
SHARED = {
    '.nds-btn', '.nds-menu-btn', '.nds-label', '.nds-icon', '.nds-featured-icon',
    '.nds-feedback', '.nds-feedback-icon', '.nds-divider', '.nds-toolbar',
    '.nds-form-container', '.nds-form-control', '.nds-form-header', '.nds-form-action', '.nds-info',
    '.nds-progress-circle', '.nds-progress-track', '.nds-neutral', '.nds-center', '.center',
}

# Selector substring → why it may keep its tail: a value the host cannot supply.
ACCEPTED = {
}


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


def has(text, attr):
    """[attr], [attr=…], [attr~=…]… — not a longer name that starts the same."""
    return re.search(r'\[' + re.escape(attr) + r'(?=[\]~|^$*=\s])', text) is not None


def tails(attr):
    """{key: [selectors]} for every selector with a compound after its last [attr…] compound."""
    out = {}
    for path in sorted(glob.glob(os.path.join(CSS_DIR, '*.css'))):
        css = open(path, encoding='utf-8').read()
        if '[' + attr not in css:
            continue
        for prelude in selectors(css):
            for sel in split_top(prelude, ','):
                if not has(sel, attr):
                    continue
                # Split into compounds first, then find the LAST one that mentions the
                # attribute anywhere — plain, or inside :not()/:is(), which feed the same
                # set. Anything after it is a tail.
                compounds = split_top(sel, ' >+~')
                state_at = max((n for n, c in enumerate(compounds) if has(c, attr)), default=-1)
                if state_at < 0 or state_at == len(compounds) - 1:
                    continue  # the state compound is the subject: self-invalidation only
                for key in keys_for(compounds[-1]):
                    out.setdefault(key, []).append(sel)
    return out


def order(key):
    rank = {'universal': 0, 'tag': 1, 'attr': 2, 'class': 3, 'id': 4}
    return (rank[key.split(':')[0]], key)


def verdict(key, sel):
    """None when the tail is fine, else the reason it is not."""
    if any(sub in sel for sub in ACCEPTED):
        return None
    kind = key.split(':')[0]
    if kind == 'universal':
        return 'universal tail — every write restyles the whole subtree'
    if kind in ('tag', 'attr'):
        return f'{kind} tail {key.split(":", 1)[1]} — matches under every host; style the host, or mirror the token to a class'
    if kind == 'class' and key.split(':', 1)[1] in SHARED:
        return f'shared class tail {key.split(":", 1)[1]} — lives inside every component; style the host, or mirror the token to a class'
    return None


def main():
    if not glob.glob(os.path.join(CSS_DIR, '*.css')):
        sys.exit('No built CSS in _site/assets/css — build first.')
    found = {attr: tails(attr) for attr in ATTRS}

    if '--report' in sys.argv:
        for attr in ATTRS:
            n = sum(len(v) for v in found[attr].values())
            print(f'== [{attr}]: {n} rules over {len(found[attr])} tails')
            for key in sorted(found[attr], key=order):
                print(f'{len(found[attr][key]):4d}x  {key}')
                for sel in found[attr][key]:
                    flag = '' if verdict(key, sel) is None else '   <-- NOT ALLOWED' if not any(s in sel for s in ACCEPTED) else ''
                    print(f'        {sel[:150]}{flag}')
        return

    problems = []
    for attr in ATTRS:
        for key in sorted(found[attr], key=order):
            for sel in found[attr][key]:
                why = verdict(key, sel)
                if why:
                    problems.append((attr, sel, why))
    if problems:
        for attr, sel, why in problems:
            print(f'[{attr}] {sel[:150]}\n    {why}')
        sys.exit(f'{len(problems)} attribute tail problem(s).')
    print('attribute tails: ' + ' · '.join(
        f'[{a}] {sum(len(v) for v in found[a].values())} rules over {len(found[a])} tails, all component-owned or accepted' for a in ATTRS))


if __name__ == '__main__':
    main()
