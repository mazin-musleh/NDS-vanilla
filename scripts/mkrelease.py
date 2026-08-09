#!/usr/bin/env python3
"""Package the release template zip that ships as the GitHub Release asset.

    python scripts/mkrelease.py              # full: build, clean, format, zip
    python scripts/mkrelease.py --no-build   # reuse the existing _site

--no-build only works when _site already post-dates sweep_pairing_stamp(): the
sweep edits the rules file the guides render, so a _site older than it ships
guides stamped for the PREVIOUS release. verify() catches that and says so.

scripts/check-release-guards.py proves verify()'s NDS-IQ guards still fire —
run it after touching verify(), the sweeps, or the stamp sentences they key on.

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
            templates/ examples/ — full-page + composition sources
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
    """Sync .github/ISSUE_TEMPLATE/iq-report.yml's dropdowns for the release.

    GitHub issue forms are static YAML (no Jekyll templating in .github/), so
    the options need a per-release sweep. The template-version option is
    prepended (past releases aren't derivable); the iq-version list is fully
    derivable from NDS-IQ.md's `instructions vN` heading, so it is REBUILT
    as v1..vN — any revision published between releases heals here too.
    Idempotent.
    """
    path = os.path.join(ROOT, '.github', 'ISSUE_TEMPLATE', 'iq-report.yml')
    with open(path, encoding='utf8') as f:
        text = f.read()

    with open(os.path.join(ROOT, '_includes', 'NDS-IQ.md'), encoding='utf8') as f:
        iq = int(re.search(r'instructions v(\d+)', f.read()).group(1))

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

    def rebuild_iq(text, n):
        m, indent = options_block(text, 'iq-version')
        opts = ''.join(f'{indent}- "v{i}"\n' for i in range(n, 0, -1))
        opts += f'{indent}- other / unknown\n'
        return text[:m.end(1)] + opts + text[m.end():]

    new = prepend(text, 'template-version', version)
    new = rebuild_iq(new, iq)
    if new != text:
        with open(path, 'w', encoding='utf8', newline='\n') as f:
            f.write(new)
        print(f'  swept .github/ISSUE_TEMPLATE/iq-report.yml (template {version}, IQ v{iq})')


def sweep_pairing_stamp(version):
    """Point NDS-IQ.md's pairing stamp at the release being packaged.

    The rules support a RANGE (the revision's floor upward, and each published
    revision stays valid for the latest published template) — this line
    records only what the revision was validated against, so it moves every
    release even when the rules themselves did not change. Swept before the
    build so the zipped copy and both rendered guides carry one number.
    verify() still checks it, which catches the line being deleted or
    reworded here.
    """
    path = os.path.join(ROOT, '_includes', 'NDS-IQ.md')
    with open(path, encoding='utf8') as f:
        text = f.read()

    new, hits = re.subn(r'Validated against template \d+\.\d+\.\d+\.',
                        f'Validated against template {version}.', text)
    if hits != 1:
        sys.exit(f'_includes/NDS-IQ.md: expected exactly one "Validated against template <x.y.z>." '
                 f'line to sweep, found {hits}. A second copy would go stale unnoticed.')
    if new != text:
        with open(path, 'w', encoding='utf8', newline='\n') as f:
            f.write(new)
        print(f'  swept _includes/NDS-IQ.md pairing stamp -> {version}')


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
    # / data-attribute tables intact. Template + example page sources ride
    # along as the composition surface: full-page raw markup the cascade
    # routes page-shape reads to.
    src = os.path.join(pkg, '_source')
    os.makedirs(src)
    for d in ('_js', '_sass', 'components', 'utilities', 'layout', 'ui-shell', 'core',
              'templates', 'examples'):
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

    # Anchor files for the new payloads — a rename in _js/_sass or a missing
    # copy in stage() would silently ship an incomplete zip otherwise.
    for anchor in ('_source/_js/nds-core.js', '_source/_sass/_mixins.scss',
                   '_source/_data/content/components.yml',
                   '_source/components/multiselect.md',
                   '_source/templates/form-template.md',
                   '_source/examples/console-demo.md',
                   '_source/utilities/copy.md', '_source/core/request.md', '_source/layout/section.md',
                   '_source/ui-shell/head.md',
                   'NDS-IQ.md', 'README.md', '_site/guides/get-started.html',
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
    m = re.search(r'instructions v(\d+)', block)
    if not m:
        sys.exit('_includes/NDS-IQ.md heading has no "instructions v<N>" stamp.')
    paired = re.search(r'Validated against template (\d+\.\d+\.\d+)\.', block)
    if not paired or paired.group(1) != version:
        sys.exit(f'_includes/NDS-IQ.md pairing stamp ({paired.group(1) if paired else "missing"}) '
                 f'does not match the release ({version}) — sweep_pairing_stamp() should have '
                 f'set the "Validated against template" line; check it still exists.')

    # The FLOOR is the load-bearing number: below it the rules block all NDS
    # work. Unlike the pairing stamp it is hand-maintained, restated in the
    # sub-floor paragraph, and no sweep touches it — so check it two ways.
    # (1) Every version literal outside the pairing slot must BE the floor: a
    # floor bump that lands in one sentence and not the others leaves the file
    # contradicting itself. (2) The release must not sit below its own floor,
    # or the zip ships rules that block the template shipping them.
    floor = re.search(r'Works with (\d+\.\d+\.\d+) or later\.', block)
    if not floor:
        sys.exit('_includes/NDS-IQ.md line 3 lost its "Works with <x.y.z> or later." floor sentence.')
    stray = {v for v in re.findall(r'\d+\.\d+\.\d+', block.replace(paired.group(0), ''))
             if v != floor.group(1)}
    if stray:
        sys.exit(f'_includes/NDS-IQ.md declares floor {floor.group(1)} but also names {sorted(stray)} — '
                 f'a floor bump missed a sentence. Every version literal outside the pairing stamp '
                 f'must be the floor.')
    as_tuple = lambda v: tuple(int(n) for n in v.split('.'))
    if as_tuple(version) < as_tuple(floor.group(1)):
        sys.exit(f'Release {version} is below the floor the rules declare ({floor.group(1)}). '
                 f'The zip would ship rules that block NDS work on the very template it ships '
                 f'with. Lower the floor or cut a higher version.')

    # The plan-file stamp carries the revision counter a THIRD time (the
    # heading and the pointer are the other two). No sweep touches it, and a
    # consumer's plan file is stamped from it — a desync misreports which
    # revision produced the plan.
    plan_stamp = re.search(r'Managed by NDS IQ v(\d+)', block)
    if not plan_stamp or plan_stamp.group(1) != m.group(1):
        sys.exit(f'_includes/NDS-IQ.md plan stamp (v{plan_stamp.group(1) if plan_stamp else "?"}) '
                 f'does not match the heading (v{m.group(1)}) — bump both together.')

    # The canonical anchor text lives INSIDE the file (Install section);
    # the setup prompt and the v5/v6 migration both point installs at it.
    # These literals appear ONLY inside the anchor code block — a string the
    # surrounding prose also uses would keep passing after the anchor lost it.
    for canon in ('- `NDS_ROOT` = `/path/to/nds-vanilla-template/`',
                  '- `NDS_ASSETS` = `/path/to/your-project/public/assets/`',
                  'Do no NDS work before that read.',
                  'Never write `.nds-*` markup from memory'):
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
    # The migrating dev's two path values land in THESE lines. Lose them and
    # the bridge still reads correctly while silently dropping the only
    # per-project configuration the old install carried.
    for decl in ('- `NDS_ROOT` = `/path/to/nds-vanilla-template/`',
                 '- `NDS_ASSETS` = `/path/to/your-project/public/assets/`'):
        if decl not in pointer:
            sys.exit(f'Pointer file lost a declaration line: {decl!r} — a migrating install has '
                     f'nowhere to carry its paths across.')

    # BOTH guides render the include, and both are in the zip's link graph.
    # Checking only one lets the other lose the entire rulebook silently.
    for name, text in guides.items():
        if 'include NDS-IQ.md' not in text:
            sys.exit(f'guides/{name}.md no longer includes NDS-IQ.md — the rules file is not rendered.')
        guide_html = z.read(f'{root}_site/guides/{name}.html').decode('utf8', 'ignore')
        if f'instructions v{m.group(1)}' not in guide_html:
            sys.exit(f'Built guides/{name}.html lacks "instructions v{m.group(1)}" — the rendered '
                     'version stamp is missing or stale.')
        # Catches a stale _site under --no-build: the sweeps run before the
        # build, so a reused _site renders the PREVIOUS release's stamp.
        if f'Validated against template {version}' not in guide_html:
            sys.exit(f'Built guides/{name}.html does not carry "Validated against template {version}" '
                     f'— _site predates sweep_pairing_stamp(). Rebuild without --no-build.')

    # Every literal path the guide and README reference must exist in the
    # zip — a doc rename otherwise ships a prompt pointing the consumer's
    # LLM at a dead path, and it invents instead (the exact failure the
    # guide prevents). Placeholder/glob refs (<name>, *) are skipped.
    readme = z.read(root + 'README.md').decode('utf8', 'ignore')
    refs = re.findall(r'NDS_ROOT/([^\s`)\]]+)', block + ''.join(guides.values()))
    # The rules' Reference index writes bare `_source/...` / `_site/...` paths
    # with no NDS_ROOT prefix, so the prefixed pattern alone never saw the one
    # section whose entire job is naming paths.
    refs += re.findall(r'`((?:_site|_source)/[^`]*)`', block + readme)
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
    sweep_pairing_stamp(version)

    if not args.no_build:
        run('bundle exec jekyll build')
    run('ruby _plugins/baseurl_cleaner.rb')
    run('ruby _plugins/html_compressor.rb')

    dist, pkg = stage(version)
    out = zip_up(dist, pkg, version)
    shutil.rmtree(pkg)
    verify(out, version)
    # Both sweeps write TRACKED files. They are meant to land in the release
    # commit, but nothing else says so — and an aborted run leaves them swept.
    print('\n  Swept (tracked, commit with the release): _includes/NDS-IQ.md, '
          '.github/ISSUE_TEMPLATE/iq-report.yml')
    print('  Upload:  gh release upload v%s "%s" --clobber\n' % (version, out))


if __name__ == '__main__':
    main()
