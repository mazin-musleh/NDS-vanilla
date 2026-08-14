#!/usr/bin/env python3
"""Package the release template zip that ships as the GitHub Release asset.

    python scripts/mkrelease.py              # full: build, clean, format, zip
    python scripts/mkrelease.py --no-build   # reuse the existing _site

scripts/check-release-guards.py proves verify()'s NDS-IQ guards still fire —
run it after touching verify(), the sweep, or the sentences they key on.

Output: dist/nds-vanilla-template-v<version>.zip, laid out as

    nds-vanilla-template-v<version>/
        CHANGELOG.md
        LICENSE
        NDS-IQ.md          — the rules file, offline copy (canonical: raw main)
        README.md          — human signpost: read-only reference, start at the guide
        _site/             — the built HTML template (incl. guides/get-started.html,
                             the adoption guide)

No _source/ tree ships: the consumer populates NDS_ROOT/_source/ from the tag's
auto-generated Source code zip, per the population rule in the rules file. The
paths it will hold are still checked here, against the repo working tree — the
tag captures that tree, so a rename there dead-ends the consumer's copy.

The two post-build passes are what separate a template from the hosted site:

  baseurl_cleaner   rewrites /NDS-vanilla/... to depth-relative paths. Without
                    it every asset 404s the moment a consumer drops the folder
                    into their own project.
  html_compressor   reformats the HTML consumers actually read (CI never runs
                    it, so it only happens here).

Python rather than .mjs because zipfile is stdlib — Node would need a new
dependency to write a zip.
"""

import argparse
import html
import os
import re
import shutil
import subprocess
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Docs-site files that must not ship inside a consumer template: an internal
# scratch page, an internal note, and SEO files pointing at the hosted origin.
EXCLUDE = {
    'playground.html',
    'TOKEN-MIGRATION.md',
    'llms.txt',
    'robots.txt',
    'sitemap.xml',
}


def run(cmd):
    print('  $ ' + cmd)
    subprocess.run(cmd, cwd=ROOT, shell=True, check=True)


def read_version():
    with open(os.path.join(ROOT, '_config.yml'), encoding='utf8') as f:
        for line in f:
            m = re.match(r'^version:\s*(\S+)', line)
            if m:
                v = m.group(1)
                if 'x' in v or v.endswith('-dev'):
                    sys.exit(f'_config.yml version is "{v}" — finalize it to a real number first.')
                return v
    sys.exit('No version: line in _config.yml')


def sweep_issue_template(version):
    """Sync .github/ISSUE_TEMPLATE/iq-report.yml's dropdowns for the release.

    GitHub issue forms are static YAML (no Jekyll templating in .github/), so
    the options need a per-release sweep. Both options are prepended from the
    current values: past releases aren't derivable, and since revisions went
    two-segment (v1.0 follows v0.10) neither is the IQ history — a rebuilt list
    would have to hardcode where the v0 line ended. Idempotent.
    """
    path = os.path.join(ROOT, '.github', 'ISSUE_TEMPLATE', 'iq-report.yml')
    with open(path, encoding='utf8') as f:
        text = f.read()

    with open(os.path.join(ROOT, '_includes', 'NDS-IQ.md'), encoding='utf8') as f:
        heading = re.search(r'instructions v(\d+\.\d+)', f.read())
    if not heading:
        sys.exit('_includes/NDS-IQ.md heading is not "instructions v<major>.<minor>" — the '
                 'iq-version dropdown is prepended from it. Teach this sweep the new shape first.')
    iq = heading.group(1)

    def options_block(text, dropdown_id):
        pat = re.compile(
            r'(id:\s*' + re.escape(dropdown_id) + r'\b[\s\S]*?options:\n)((?:\s+- .*\n)+)')
        m = pat.search(text)
        if not m:
            sys.exit(f'iq-report.yml: dropdown {dropdown_id} not found.')
        indent = re.match(r'(\s+)- ', m.group(2).splitlines()[0]).group(1)
        return m, indent

    def prepend(text, dropdown_id, value):
        m, indent = options_block(text, dropdown_id)
        entry = f'{indent}- "{value}"\n'
        if entry in m.group(2):
            return text
        return text[:m.end(1)] + entry + m.group(2) + text[m.end():]

    new = prepend(text, 'template-version', version)
    new = prepend(new, 'iq-version', f'v{iq}')
    if new != text:
        with open(path, 'w', encoding='utf8', newline='\n') as f:
            f.write(new)
        print(f'  swept .github/ISSUE_TEMPLATE/iq-report.yml (template {version}, IQ v{iq})')


def stage(version):
    dist = os.path.join(ROOT, 'dist')
    pkg = os.path.join(dist, f'nds-vanilla-template-v{version}')
    if os.path.exists(pkg):
        shutil.rmtree(pkg)
    os.makedirs(pkg)

    site = os.path.join(ROOT, '_site')
    if not os.path.isdir(site):
        sys.exit('_site not found — drop --no-build, or run the build first.')
    shutil.copytree(site, os.path.join(pkg, '_site'),
                    ignore=lambda d, names: EXCLUDE if d == site else set())

    for f in ('CHANGELOG.md', 'LICENSE'):
        shutil.copy2(os.path.join(ROOT, f), pkg)

    # README.md is a human signpost only — the LLM artifact is NDS-IQ.md,
    # shipped at the zip top level as the offline copy its own Install
    # section promises (NDS_ROOT/NDS-IQ.md; canonical source is raw main).
    shutil.copy2(os.path.join(ROOT, 'scripts', 'release-template', 'README.md'), pkg)
    # Written with LF, not copied: the repo is autocrlf=true with no
    # .gitattributes, so the working copy carries CRLF while git stores LF —
    # and raw main, the canonical source, serves the LF blob. A straight copy
    # ships a zip whose offline copy differs from raw main by 284 line endings,
    # which contradicts the file's own "every project's copy is byte-identical"
    # and makes the artifact depend on who packaged it. verify() asserts it.
    with open(os.path.join(ROOT, '_includes', 'NDS-IQ.md'), encoding='utf8') as f:
        rules = f.read()
    with open(os.path.join(pkg, 'NDS-IQ.md'), 'w', encoding='utf8', newline='\n') as f:
        f.write(rules)
    return dist, pkg


def zip_up(dist, pkg, version):
    out = os.path.join(dist, f'nds-vanilla-template-v{version}.zip')
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
        for root, dirs, files in os.walk(pkg):
            for name in dirs + files:
                p = os.path.join(root, name)
                arc = os.path.relpath(p, dist).replace(os.sep, '/')
                z.write(p, arc + '/' if os.path.isdir(p) else arc)
    return out


def verify(out, version):
    """Fail loudly if a pass silently didn't happen."""
    z = zipfile.ZipFile(out)
    names = z.namelist()
    root = f'nds-vanilla-template-v{version}/'

    leaked = sorted(n for n in names if os.path.basename(n) in EXCLUDE)
    if leaked:
        sys.exit(f'Excluded files present in the zip: {leaked}')

    index = z.read(root + '_site/index.html').decode('utf8', 'ignore')
    # A handful of absolute URLs are legitimate (canonical, og:url). Asset
    # references are not — the cleaner leaves none behind on href=/src=.
    absolute = len(re.findall(r'(?:href|src)="/NDS-vanilla/', index))
    if absolute:
        sys.exit(f'baseurl_cleaner did not run: {absolute} absolute asset paths in index.html')

    changelog = z.read(root + 'CHANGELOG.md').decode('utf8', 'ignore')
    if f'## [{version}]' not in changelog:
        sys.exit(f'CHANGELOG.md has no [{version}] section.')

    # Anchor files for the canon the rules route reads to. The _source/ ones no
    # longer ship — the consumer populates them from the tag's source zip — so
    # they are checked against the repo working tree the tag captures. Strip the
    # prefix: _source/ was a straight copy of these repo-root folders, and the
    # source zip reproduces them under its own wrapper folder.
    for anchor in ('_source/_js/nds-core.js', '_source/_sass/_mixins.scss',
                   '_source/_data/content/components.yml',
                   '_source/components/multiselect.md',
                   '_source/templates/form-template.md',
                   '_source/examples/console-demo.md',
                   '_source/utilities/copy.md', '_source/core/request.md', '_source/layout/section.md',
                   '_source/ui-shell/head.md'):
        rest = anchor[len('_source/'):]
        if not os.path.exists(os.path.join(ROOT, rest)):
            sys.exit(f'Missing from the repo tree: {rest} — the rules point _source/ reads at '
                     f'it, and the tag the consumer populates from carries this tree.')

    # A missing copy in stage() would silently ship an incomplete zip.
    for anchor in ('NDS-IQ.md', 'README.md', '_site/guides/get-started.html',
                   '_site/guides/integration-quality.html'):
        if root + anchor not in names:
            sys.exit(f'Missing from zip: {anchor}')

    # Every in-scope _js/ file opens with its public-surface banner — that's
    # what the consumer's LLM reads instead of grepping the source. A missing
    # or drifted banner would ship silently.
    banners = subprocess.run('node scripts/check-banners.mjs --all', cwd=ROOT,
                             shell=True, capture_output=True, text=True)
    if banners.returncode:
        sys.exit('check-banners.mjs --all failed:\n' + banners.stdout + banners.stderr)

    # The rules file's checks run against its SOURCE include (the guide
    # renders the same include; raw main and the zip top level serve it
    # byte-identical). The file is universal — no per-project values — so a
    # refresh is a whole-file replace keyed on the heading stamps; lose a
    # stamp or the in-file anchor canon and installs or migrations break
    # silently.
    with open(os.path.join(ROOT, '_includes', 'NDS-IQ.md'), encoding='utf8') as f:
        block = f.read()

    # "byte-identical" above is a promise the file makes about itself, so check
    # it rather than assert it in prose. The zip's offline copy must be the
    # source with LF endings — that is what git stores and therefore what raw
    # main serves, so a consumer who installs from the zip and verifies against
    # raw main gets the same bytes. Compared against the source on disk, NOT the
    # git blob: check-release-guards.py mutates the source to prove each guard
    # fires, and a blob comparison would reject every mutated case before its
    # own guard could run, silently disabling the whole harness.
    shipped = z.read(root + 'NDS-IQ.md')
    expected = block.encode('utf8')          # read with universal newlines above
    if shipped != expected:
        sys.exit(f'The zip\'s NDS-IQ.md is not the source with LF endings '
                 f'({len(shipped)} vs {len(expected)} bytes, '
                 f'CRLF {shipped.count(bytes([13, 10]))} vs {expected.count(bytes([13, 10]))}). '
                 f'The working copy is CRLF under autocrlf=true while git stores LF, so a straight '
                 f'copy ships an offline copy that differs from raw main and makes the zip depend '
                 f'on who packaged it. stage() writes it with LF — check what changed there.')

    guides = {}
    for name in ('get-started', 'integration-quality'):
        with open(os.path.join(ROOT, 'guides', f'{name}.md'), encoding='utf8') as f:
            guides[name] = html.unescape(f.read())

    if '{%' in block or '{{' in block:
        sys.exit('_includes/NDS-IQ.md contains literal Liquid delimiters — it is a Jekyll '
                 'include (topbar + guide render it), so the build parses them and dies.')
    # Display only — nothing compares it. The pattern takes the decimal so it
    # can't stop at the "v0" of "v0.8" and match a stamp that isn't there.
    m = re.search(r'instructions v([\d.]+)', block)
    if not m:
        sys.exit('_includes/NDS-IQ.md heading has no "instructions v<N>" stamp.')
    # The rules name NO template version, anywhere: they read the runtime's own
    # banner and fetch matching-version references, so they run on any release.
    # Nothing sweeps this file, so a literal that creeps in is prose that goes
    # stale on the next release with nothing to catch it.
    stray = sorted(set(re.findall(r'\d+\.\d+\.\d+', block)))
    if stray:
        sys.exit(f'_includes/NDS-IQ.md names {stray}. The rules are version-agnostic by design '
                 f'— they read the runtime banner instead — so a template version literal is a '
                 f'regression. Reword the sentence to name no release.')

    # Every consumer NDS-PLAN.md opens with the plan stamp, which is how a
    # later session recognizes a plan these rules produced. It carries no
    # version — nothing compares it — so presence is the whole check.
    if 'Managed by NDS IQ' not in block:
        sys.exit('_includes/NDS-IQ.md lost its "Managed by NDS IQ" plan-stamp line — '
                 'consumer plan files are opened with it.')

    # The canonical anchor text lives INSIDE the file (Install section); both
    # a first install and a pasted-block migration copy the anchor from there.
    # These literals appear ONLY inside the anchor code block — a string the
    # surrounding prose also uses would keep passing after the anchor lost it.
    for canon in ('- `NDS_ROOT` = `.nds/`',
                  '- `NDS_ASSETS` = `/path/to/your-project/public/assets/`',
                  'Do no NDS work before that read.',
                  'Never write `.nds-*` markup from memory'):
        if canon not in block:
            sys.exit(f'_includes/NDS-IQ.md anchor canon lost its line: {canon!r}')

    # BOTH guides render the include, and both are in the zip's link graph.
    # Checking only one lets the other lose the entire rulebook silently.
    for name, text in guides.items():
        if 'include NDS-IQ.md' not in text:
            sys.exit(f'guides/{name}.md no longer includes NDS-IQ.md — the rules file is not rendered.')
        guide_html = z.read(f'{root}_site/guides/{name}.html').decode('utf8', 'ignore')
        if f'instructions v{m.group(1)}' not in guide_html:
            sys.exit(f'Built guides/{name}.html lacks "instructions v{m.group(1)}" — the rendered '
                     'version stamp is missing or stale.')

    # Every literal path the rules, guides and README reference must exist —
    # a doc rename otherwise ships a prompt pointing the consumer's LLM at a
    # dead path, and it invents instead (the exact failure the guide
    # prevents). Placeholder/glob refs (<name>, *) are skipped.
    readme = z.read(root + 'README.md').decode('utf8', 'ignore')
    refs = re.findall(r'NDS_ROOT/([^\s`)\]]+)', block + ''.join(guides.values()))
    # The rules' Reference index writes bare `_source/...` / `_site/...` paths
    # with no NDS_ROOT prefix, so the prefixed pattern alone never saw the one
    # section whose entire job is naming paths.
    refs += re.findall(r'`((?:_site|_source)/[^`]*)`', block + readme)
    refs = {p for p in refs if '<' not in p and '*' not in p}

    # _source/ is populated from the tag, not shipped, so its refs resolve
    # against the repo tree (same prefix-strip as the anchors above).
    dead_src = sorted({p for p in refs if p.startswith('_source/')
                       and not os.path.exists(
                           os.path.join(ROOT, p[len('_source/'):].rstrip('/')))})
    if dead_src:
        sys.exit(f'References point at _source/ paths missing from the repo tree: {dead_src}')

    dead = sorted({p for p in refs if not p.startswith('_source/')
                   and root + p not in names
                   and root + p.rstrip('/') + '/' not in names})
    if dead:
        sys.exit(f'Guide references point at paths missing from the zip: {dead}')

    print(f'\n  {len([n for n in names if not n.endswith("/")])} files, '
          f'{os.path.getsize(out) / 1048576:.1f} MB')
    print(f'  {out}')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--no-build', action='store_true', help='reuse the existing _site')
    args = ap.parse_args()

    version = read_version()
    print(f'\nPackaging v{version}\n')

    sweep_issue_template(version)

    if not args.no_build:
        run('bundle exec jekyll build')
    run('ruby _plugins/baseurl_cleaner.rb')
    run('ruby _plugins/html_compressor.rb')

    dist, pkg = stage(version)
    out = zip_up(dist, pkg, version)
    shutil.rmtree(pkg)
    verify(out, version)
    # The sweep writes a TRACKED file. It is meant to land in the release
    # commit, but nothing else says so — and an aborted run leaves it swept.
    print('\n  Swept (tracked, commit with the release): '
          '.github/ISSUE_TEMPLATE/iq-report.yml')
    print('  Upload:  gh release upload v%s "%s" --clobber\n' % (version, out))


if __name__ == '__main__':
    main()
