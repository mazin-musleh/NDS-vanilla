#!/usr/bin/env python3
"""Package the release template zip that ships as the GitHub Release asset.

    python scripts/mkrelease.py              # full: build, clean, format, zip
    python scripts/mkrelease.py --no-build   # reuse the existing _site

Output: dist/nds-vanilla-template-v<version>.zip, laid out as

    nds-vanilla-template-v<version>/
        CHANGELOG.md
        LICENSE
        README.md          — human signpost: read-only reference, start at the guide
        _site/             — the built HTML template (incl. guides/get-started.html,
                             the adoption guide with the copy-paste snippet)
        _source/
            _js/           — readable JS behind assets/js/*.min.js
            _sass/         — readable SCSS behind assets/css/*.min.css
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
    # can't read *.min.js / *.min.css, so ship the sources it CAN read.
    src = os.path.join(pkg, '_source')
    os.makedirs(src)
    for d in ('_js', '_sass'):
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

    # README.md is a human signpost only — the LLM artifact is the
    # instructions block inside the adoption guide, which ships as a normal
    # doc page (_site/guides/get-started.html — source guides/).
    shutil.copy2(os.path.join(ROOT, 'scripts', 'release-template', 'README.md'), pkg)
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
                   'README.md', '_site/guides/get-started.html'):
        if root + anchor not in names:
            sys.exit(f'Missing from zip: {anchor}')

    # The integration guide's checks run against its markdown SOURCE (the same
    # content this build rendered into the zip's _site/guides/get-started.html —
    # the source regexes stay clean of HTML escaping). Every path in its
    # snippet hangs off the NDS_ROOT / NDS_ASSETS pair the consumer sets at
    # the top of the block; lose a declaration and the block ships with
    # unresolvable references — invisible until a consumer complains.
    with open(os.path.join(ROOT, 'guides', 'get-started.md'), encoding='utf8') as f:
        # Unescape first: the page authors the snippet entity-encoded
        # (&lt;name&gt;), which would otherwise hide placeholder markers
        # from the '<' filter below.
        integration = html.unescape(f.read())
    if '`NDS_ROOT` =' not in integration:
        sys.exit('guides/get-started.md has no `NDS_ROOT` declaration — every path in the snippet resolves nowhere.')
    if '`NDS_ASSETS` =' not in integration:
        sys.exit('guides/get-started.md has no `NDS_ASSETS` declaration — the asset-copy and upgrade steps resolve nowhere.')
    for marker in ('COPY START', 'COPY END'):
        if marker not in integration:
            sys.exit(f'guides/get-started.md is missing the {marker} marker — the snippet is unbounded.')

    # Every literal path the guide and README reference must exist in the
    # zip — a doc rename otherwise ships a prompt pointing the consumer's
    # LLM at a dead path, and it invents instead (the exact failure the
    # guide prevents). Placeholder/glob refs (<name>, *) are skipped.
    readme = z.read(root + 'README.md').decode('utf8', 'ignore')
    refs = re.findall(r'NDS_ROOT/([^\s`)\]]+)', integration)
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
