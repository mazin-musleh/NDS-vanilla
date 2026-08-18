#!/usr/bin/env python3
"""Prove mkrelease.verify()'s NDS-IQ guards still fire.

    python scripts/check-release-guards.py

Every guard here is a regex or a comparison over prose that people edit. The
failure mode that matters is not a guard rejecting a good file — it is a guard
quietly becoming a no-op after someone rewords the sentence it keys on, so the
release ships green with the defect intact. That is what this checks: each case
breaks the rules file one way and asserts the matching guard notices.

Runs against the REAL repo files with the zip parts stubbed, so it needs no
build and cuts no release. The mutated file is restored in a finally block.
"""
import html
import io
import os
import re
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'scripts'))
import mkrelease

IQ = os.path.join(ROOT, '_includes', 'NDS-IQ.md')
VERSION = '1.7.0'   # names the stub zip's root folder and CHANGELOG section

# The _source/ anchors and refs verify() checks are NOT staged here: the zip
# stopped shipping that tree, so verify() resolves them against the repo
# working tree, which is real and unmutated during this run.


def collect_refs(block):
    """Mirror verify()'s own reference scan, so the stub zip satisfies it."""
    guides = ''
    for name in ('get-started', 'integration-quality'):
        with open(os.path.join(ROOT, 'guides', f'{name}.md'), encoding='utf8') as f:
            guides += f.read()
    refs = re.findall(r'NDS_ROOT/([^\s`)\]]+)', block + guides)
    refs += re.findall(r'`((?:_site|_source)/[^`]*)`', block + 'see `_site/index.html`')
    return {p for p in refs if '<' not in p and '*' not in p
            and not p.startswith('_source/')}


# The doc copy groups its rules under comment headings and the served gate is
# minified, so the guard has to strip comments before comparing. Keep one here
# or that stripping goes unexercised.
GATE_CSS = '/* colors */ html{background-color:#fff}i.hgi-stroke{opacity:0}'


def build_stub_zip(version, refs_from, iq_bytes=None, gate_doc=None):
    """A zip carrying every name verify() reads.

    Paths come from `refs_from` (the PRE-mutation rules file), so a case that
    renames a zip-side reference finds it missing — the dead-reference case
    exactly. Each name is written once: a duplicate entry wins on read and
    would blank a file the guards depend on.
    """
    pkg = f'nds-vanilla-template-v{version}/'
    with open(IQ, encoding='utf8') as f:
        block = f.read()
    # iq_bytes stages a deliberately corrupted offline copy. Every other case
    # mutates the SOURCE, which build_stub_zip re-reads, so source and zip move
    # together and can never break the byte-identical guard — that one needs the
    # zip corrupted on its own.
    guide_html = '<h1>guide</h1>' + block   # the guides render the include
    buf, written = io.BytesIO(), set()

    with zipfile.ZipFile(buf, 'w') as z:
        def put(name, data=''):
            if name not in written:
                written.add(name)
                z.writestr(name, data)

        # The gate guard compares index.html's inline <style> against the copy
        # head.md prints. Both must exist or the guard cannot run at all, so the
        # stub carries a matching pair; gate_doc stages a drifted doc side.
        put(pkg + '_site/index.html',
            f'<a href="../index.html">ok</a><style>{GATE_CSS}</style>')
        put(pkg + '_site/ui-shell/head.html',
            '<div id="panel-setup-html">&lt;style&gt;'
            + html.escape(gate_doc if gate_doc is not None else GATE_CSS, quote=False)
            + '&lt;/style&gt;</div><div id="panel-setup-js"></div>')
        put(pkg + 'CHANGELOG.md', f'## [{version}]\n')
        put(pkg + 'README.md', 'see `_site/index.html`\n')
        put(pkg + 'NDS-IQ.md', iq_bytes if iq_bytes is not None else block)
        for name in ('get-started', 'integration-quality'):
            put(f'{pkg}_site/guides/{name}.html', guide_html)
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

    # The rules name no template version at all — nothing sweeps this file, so
    # a literal that lands in prose goes stale with nothing to catch it.
    ('a version literal creeps into the rules prose',
     lambda t: t + '\nBuilt against template 1.6.0.\n', VERSION, 'version-agnostic'),

    # Versionless now — nothing compares it, so losing the phrase is the only
    # way it breaks, and consumer plan files are stamped from it.
    ('plan stamp phrase lost',
     lambda t: t.replace('Managed by NDS IQ', 'Managed by IQ'), VERSION, 'plan-stamp'),

    ('anchor loses its read-gate line',
     lambda t: t.replace('Do no NDS work before that read.', ''), VERSION, 'anchor canon'),

    ('anchor loses its markup hard stop',
     lambda t: t.replace('Never write `.nds-*` markup from memory', ''),
     VERSION, 'anchor canon'),

    ('reference index points at a _source/ path not in the repo tree',
     lambda t: t.replace('`_source/_sass/_mixins.scss`', '`_source/_sass/_gone.scss`'),
     VERSION, 'missing from the repo tree'),
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

    # The offline copy must be the source with LF endings. This one cannot be
    # driven from CASES: those mutate the source, and the stub zip is rebuilt
    # from the source, so the two never diverge. Corrupt the staged copy alone.
    with open(IQ, encoding='utf8') as f:
        source = f.read()
    zip_path = build_stub_zip(VERSION, refs_from=source,
                              iq_bytes=source.replace('\n', '\r\n'))
    try:
        mkrelease.verify(zip_path, VERSION)
        ok, detail = False, 'accepted a CRLF offline copy'
    except SystemExit as e:
        ok, detail = 'source with LF endings' in str(e), str(e)
    print(f'  {"pass" if ok else "FAIL"}  zip ships a CRLF copy of the rules file')
    if not ok:
        failures.append(f'CRLF offline copy: {detail}')

    # head.md's copy of the inline critical gate is hand-maintained against the
    # generated one, so it can drift — and silently had. Same shape as the CRLF
    # case: the doc side has to be corrupted on its own.
    # Two shapes of drift: a rule that vanished, and a rule whose VALUE moved
    # while its selector stayed put. The second is the one a selector-only
    # comparison waved through, so it gets its own case.
    for label, drifted in (
        ('a rule goes missing', GATE_CSS.replace('i.hgi-stroke', 'i.hgi-gone')),
        ('a rule keeps its selector but changes value',
         GATE_CSS.replace('opacity:0', 'opacity:1')),
    ):
        zip_path = build_stub_zip(VERSION, refs_from=source, gate_doc=drifted)
        try:
            mkrelease.verify(zip_path, VERSION)
            ok, detail = False, 'accepted a drifted critical gate'
        except SystemExit as e:
            ok, detail = 'has drifted' in str(e), str(e)
        print(f'  {"pass" if ok else "FAIL"}  critical gate drift: {label}')
        if not ok:
            failures.append(f'critical gate drift ({label}): {detail}')

    print()
    for f in failures:
        print('  ! ' + f)
    sys.exit(1 if failures else 0)


if __name__ == '__main__':
    main()
