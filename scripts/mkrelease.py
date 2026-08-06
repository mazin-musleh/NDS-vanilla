#!/usr/bin/env python3
"""Package the release template zip that ships as the GitHub Release asset.

    python scripts/mkrelease.py              # full: build, clean, format, zip
    python scripts/mkrelease.py --no-build   # reuse the existing _site

Output: dist/nds-vanilla-template-v<version>.zip, laid out as

    nds-vanilla-template-v<version>/
        CHANGELOG.md
        LICENSE
        NDS-IQ.md          — the rules file, offline copy (canonical: raw main)
        README.md          — human signpost: read-only reference, start at the guide
        _site/             — the built HTML template (incl. guides/get-started.html,
                             the adoption guide)
        _source/
            _js/           — readable JS behind assets/js/*.min.js (banner tops)
            _sass/         — readable SCSS behind assets/css/*.min.css
            components/ utilities/ layout/ ui-shell/ — doc .md sources
            _data/content/ — component / template / example / icon catalogs

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
    """Prepend the current template + IQ versions to .github/ISSUE_TEMPLATE/iq-report.yml.

    GitHub issue forms are static YAML (no Jekyll templating in .github/), so
    the dropdown options need a per-release bump. Idempotent: skips if the
    version is already the top option.
    """
    path = os.path.join(ROOT, '.github', 'ISSUE_TEMPLATE', 'iq-report.yml')
    with open(path, encoding='utf8') as f:
        text = f.read()

    with open(os.path.join(ROOT, '_includes', 'NDS-IQ.md'), encoding='utf8') as f:
        iq = re.search(r'instructions v(\d+)', f.read()).group(1)

    def prepend(text, dropdown_id, value):
        pat = re.compile(
            r'(id:\s*' + re.escape(dropdown_id) + r'\b[\s\S]*?options:\n)((?:\s+- .*\n)+)')
        m = pat.search(text)
        if not m:
            sys.exit(f'iq-report.yml: dropdown {dropdown_id} not found.')
        first = m.group(2).splitlines()[0]
        indent = re.match(r'(\s+)- ', first).group(1)
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

    # Readable source behind the minified bundles: an LLM helping the consumer
    # can't read *.min.js / *.min.css, so ship the sources it CAN read. The doc
    # .md sources ride along as the markup surface to copy from — chrome-free
    # and ~4x cheaper to read than the built pages, code tabs and the modifier
    # / data-attribute tables intact.
    src = os.path.join(pkg, '_source')
    os.makedirs(src)
    for d in ('_js', '_sass', 'components', 'utilities', 'layout', 'ui-shell'):
        shutil.copytree(os.path.join(ROOT, d), os.path.join(src, d),
                        ignore=shutil.ignore_patterns('*.bak'))

    # Catalogs the LLM checks BEFORE building a UI — 90+ components already
    # exist, don't recreate. The other _data/content/ files are mock demo
    # payloads (transactions, users) — noise for a consumer, skipped.
    cat_dst = os.path.join(src, '_data', 'content')
    os.makedirs(cat_dst)
    for f in ('components.yml', 'templates.yml', 'examples.yml', 'icons.yml'):
        shutil.copy2(os.path.join(ROOT, '_data', 'content', f), cat_dst)

    for f in ('CHANGELOG.md', 'LICENSE'):
        shutil.copy2(os.path.join(ROOT, f), pkg)

    # README.md is a human signpost only — the LLM artifact is NDS-IQ.md,
    # shipped at the zip top level as the offline copy its own Install
    # section promises (NDS_ROOT/NDS-IQ.md; canonical source is raw main).
    shutil.copy2(os.path.join(ROOT, 'scripts', 'release-template', 'README.md'), pkg)
    shutil.copy2(os.path.join(ROOT, '_includes', 'NDS-IQ.md'),
                 os.path.join(pkg, 'NDS-IQ.md'))
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

    # Anchor files for the new payloads — a rename in _js/_sass or a missing
    # copy in stage() would silently ship an incomplete zip otherwise.
    for anchor in ('_source/_js/nds-core.js', '_source/_sass/_mixins.scss',
                   '_source/_data/content/components.yml',
                   '_source/components/multiselect.md',
                   'NDS-IQ.md', 'README.md', '_site/guides/get-started.html'):
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
    with open(os.path.join(ROOT, 'guides', 'get-started.md'), encoding='utf8') as f:
        integration = html.unescape(f.read())

    m = re.search(r'instructions v(\d+)', block)
    if not m:
        sys.exit('_includes/NDS-IQ.md heading has no "instructions v<N>" stamp.')
    paired = re.search(r'Written for template (\d+\.\d+\.\d+)\.', block)
    if not paired or paired.group(1) != version:
        sys.exit(f'_includes/NDS-IQ.md pairing stamp ({paired.group(1) if paired else "missing"}) '
                 f'does not match the release ({version}) — update the "Written for template" line.')

    # The canonical anchor text lives INSIDE the file (Install section);
    # the setup prompt and the v5/v6 migration both point installs at it.
    for canon in ('- `NDS_ROOT` = `/path/to/nds-vanilla-template/`',
                  '- `NDS_ASSETS` = `/path/to/your-project/public/assets/`',
                  'top to bottom, once per session'):
        if canon not in block:
            sys.exit(f'_includes/NDS-IQ.md anchor canon lost its line: {canon!r}')

    # The old raw path serves the v6-compatible migration bridge: a v5/v6
    # install's own refresh step must accept its heading, land declarations
    # in it, and find the end marker — or old installs never self-migrate.
    with open(os.path.join(ROOT, '_includes', 'nds-ai-instructions.md'), encoding='utf8') as f:
        pointer = f.read()
    if not pointer.startswith('## Design system: NDS Vanilla (NDS IQ instructions v'):
        sys.exit('Pointer file lost its v6-exact heading — old installs will not self-migrate.')
    pv = re.search(r'instructions v(\d+)', pointer)
    if not pv or pv.group(1) != m.group(1):
        sys.exit(f'Pointer file version (v{pv.group(1) if pv else "?"}) does not match the include '
                 f'(v{m.group(1)}) — bump both together.')
    if 'end NDS instructions' not in pointer:
        sys.exit('Pointer file is missing the "end NDS instructions" marker — v6\'s post-swap check fails.')

    if 'include NDS-IQ.md' not in integration:
        sys.exit('guides/get-started.md no longer includes NDS-IQ.md — the rules file is not rendered.')
    guide_html = z.read(root + '_site/guides/get-started.html').decode('utf8', 'ignore')
    if f'instructions v{m.group(1)}' not in guide_html:
        sys.exit(f'Built guide lacks "instructions v{m.group(1)}" — the rendered version stamp '
                 'is missing or stale.')

    # Every literal path the guide and README reference must exist in the
    # zip — a doc rename otherwise ships a prompt pointing the consumer's
    # LLM at a dead path, and it invents instead (the exact failure the
    # guide prevents). Placeholder/glob refs (<name>, *) are skipped.
    readme = z.read(root + 'README.md').decode('utf8', 'ignore')
    refs = re.findall(r'NDS_ROOT/([^\s`)\]]+)', block + integration)
    refs += re.findall(r'`((?:_site|_source)/[^`]*)`', readme)
    dead = sorted({p for p in refs if '<' not in p and '*' not in p
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
    print('\n  Upload:  gh release upload v%s "%s" --clobber\n' % (version, out))


if __name__ == '__main__':
    main()
