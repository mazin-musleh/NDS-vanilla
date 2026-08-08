#!/usr/bin/env python3
"""Prove mkrelease.verify()'s NDS-IQ guards still fire.

    python scripts/check-release-guards.py

Every guard here is a regex or a comparison over prose that people edit. The
failure mode that matters is not a guard rejecting a good file — it is a guard
quietly becoming a no-op after someone rewords the sentence it keys on, so the
release ships green with the defect intact. That is what this checks: each case
breaks the rules file one way and asserts the matching guard notices.

Runs against the REAL repo files with the zip parts stubbed, so it needs no
build and cuts no release. The rules file is restored in a finally block.
"""
import io
import os
import re
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'scripts'))
import mkrelease

IQ = os.path.join(ROOT, '_includes', 'NDS-IQ.md')
VERSION = '1.7.0'   # any version at or above the file's declared floor

# Anchors stage() copies in — verify() checks each by name.
ANCHORS = ('_source/_js/nds-core.js', '_source/_sass/_mixins.scss',
           '_source/_data/content/components.yml',
           '_source/components/multiselect.md',
           '_source/templates/form-template.md',
           '_source/examples/console-demo.md',
           '_source/utilities/copy.md', '_source/layout/section.md',
           '_source/ui-shell/head.md')


def collect_refs(block):
    """Mirror verify()'s own reference scan, so the stub zip satisfies it."""
    guides = ''
    for name in ('get-started', 'integration-quality'):
        with open(os.path.join(ROOT, 'guides', f'{name}.md'), encoding='utf8') as f:
            guides += f.read()
    refs = re.findall(r'NDS_ROOT/([^\s`)\]]+)', block + guides)
    refs += re.findall(r'`((?:_site|_source)/[^`]*)`', block + 'see `_site/index.html`')
    return {p for p in refs if '<' not in p and '*' not in p}


def build_stub_zip(version, refs_from):
    """A zip carrying every name verify() reads.

    Paths come from `refs_from` (the PRE-mutation rules file): the zip is built
    before the doc rename, which is the dead-reference case exactly. Each name
    is written once — a duplicate entry wins on read and would blank a file the
    guards depend on.
    """
    pkg = f'nds-vanilla-template-v{version}/'
    with open(IQ, encoding='utf8') as f:
        block = f.read()
    guide_html = '<h1>guide</h1>' + block   # the guides render the include
    buf, written = io.BytesIO(), set()

    with zipfile.ZipFile(buf, 'w') as z:
        def put(name, data=''):
            if name not in written:
                written.add(name)
                z.writestr(name, data)

        put(pkg + '_site/index.html', '<a href="../index.html">ok</a>')
        put(pkg + 'CHANGELOG.md', f'## [{version}]\n')
        put(pkg + 'README.md', 'see `_site/index.html`\n')
        put(pkg + 'NDS-IQ.md', block)
        for name in ('get-started', 'integration-quality'):
            put(f'{pkg}_site/guides/{name}.html', guide_html)
        for anchor in ANCHORS:
            put(pkg + anchor)
        for p in sorted(collect_refs(refs_from)):
            put(pkg + p.rstrip('/') + ('/' if p.endswith('/') else ''))

    path = os.path.join(ROOT, 'dist', 'guard-check.zip')
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        f.write(buf.getvalue())
    return path


def run(mutate=None, version=VERSION):
    """verify() against an optionally broken rules file. Returns its exit
    message, or None when it passed."""
    with open(IQ, encoding='utf8') as f:
        original = f.read()
    try:
        if mutate:
            with open(IQ, 'w', encoding='utf8', newline='\n') as f:
                f.write(mutate(original))
        try:
            mkrelease.verify(build_stub_zip(version, refs_from=original), version)
            return None
        except SystemExit as e:
            return str(e)
    finally:
        with open(IQ, 'w', encoding='utf8', newline='\n') as f:
            f.write(original)


# (label, mutation, version, substring the guard's message must carry)
CASES = [
    ('baseline: the real file passes', None, VERSION, None),

    ('floor sentence deleted',
     lambda t: t.replace('Works with 1.7.0 or later.', ''), VERSION, 'floor sentence'),

    ('floor bumped in line 3 but not the sub-floor paragraph',
     lambda t: t.replace('Works with 1.7.0 or later.', 'Works with 1.8.0 or later.'),
     VERSION, 'a floor bump missed a sentence'),

    ('floor bumped in the paragraph but not line 3',
     lambda t: t.replace('template 1.7.0 introduced', 'template 1.6.0 introduced'),
     VERSION, 'a floor bump missed a sentence'),

    # sweep_pairing_stamp() runs before verify(), so simulate it — otherwise
    # the pairing check fires first and the floor comparison is never reached.
    ('release cut below the floor the rules declare',
     lambda t: t.replace('Validated against template 1.7.0.',
                         'Validated against template 1.6.1.'), '1.6.1', 'below the floor'),

    ('plan stamp desynced from the heading revision',
     lambda t: t.replace('Managed by NDS IQ v7', 'Managed by NDS IQ v6'),
     VERSION, 'plan stamp'),

    ('anchor loses its read-gate line',
     lambda t: t.replace('Do no NDS work before that read.', ''), VERSION, 'anchor canon'),

    ('anchor loses its markup hard stop',
     lambda t: t.replace('Never write `.nds-*` markup from memory', ''),
     VERSION, 'anchor canon'),

    ('reference index points at a path not in the zip',
     lambda t: t.replace('`_source/_sass/_mixins.scss`', '`_source/_sass/_gone.scss`'),
     VERSION, 'missing from the zip'),

    # A duplicate carrying the SAME number is invisible to verify() (it strips
    # every copy before the stray scan); it goes stale on the NEXT release.
    # The sweep's exactly-one check is the guard — exercised separately below.
    ('duplicate pairing stamp is not verify()\'s to catch',
     lambda t: t.replace('Works with 1.7.0 or later.',
                         'Works with 1.7.0 or later. Validated against template 1.7.0.'),
     VERSION, None),
]


def main():
    failures = []

    for label, mutate, version, expect in CASES:
        msg = run(mutate, version)
        ok = (msg is None) if expect is None else (msg is not None and expect in msg)
        print(f'  {"pass" if ok else "FAIL"}  {label}')
        if not ok:
            failures.append(f'{label}: expected '
                            f'{"a pass" if expect is None else repr(expect)}, got: {msg}')

    # The duplicate stamp belongs to the sweep, which must refuse to guess
    # which copy is authoritative.
    with open(IQ, encoding='utf8') as f:
        original = f.read()
    try:
        with open(IQ, 'w', encoding='utf8', newline='\n') as f:
            f.write(original.replace(
                'Works with 1.7.0 or later.',
                'Works with 1.7.0 or later. Validated against template 1.7.0.'))
        try:
            mkrelease.sweep_pairing_stamp(VERSION)
            ok, detail = False, 'swept a duplicate stamp instead of refusing'
        except SystemExit as e:
            ok, detail = 'exactly one' in str(e), str(e)
        print(f'  {"pass" if ok else "FAIL"}  sweep refuses a duplicate pairing stamp')
        if not ok:
            failures.append(f'sweep duplicate check: {detail}')
    finally:
        with open(IQ, 'w', encoding='utf8', newline='\n') as f:
            f.write(original)

    print()
    for f in failures:
        print('  ! ' + f)
    sys.exit(1 if failures else 0)


if __name__ == '__main__':
    main()
