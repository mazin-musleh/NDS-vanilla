"""Field rigs for NDS IQ: an app (or a brief) an agent builds or ports to NDS with the draft rules.

Run from the NDS repo root. The guide is .claude/skills/nds-iq-eval/RIGS.md.

  python scripts/rig.py new <rig> [dest]       copy a baseline, git init, tag it, npm install or a Django venv + seed
  python scripts/rig.py stage <rig> <release>  unpack a mkrelease --preview zip to .nds/, add _source/, stamp <release>, copy the draft to NDS-IQ.md
  python scripts/rig.py reset <rig> [--save]   commit the run to a runN-date branch, back to the baseline tag
  python scripts/rig.py cost <rig>             minutes and tokens per plan row, from the newest session transcript (before reset)

<rig> is a rig number (1 sawaed, 2 shop-licenses, 3 nakheel-clinics, 4 hiraf-store, 5 library-portal, 6 citydesk, 7 grants-desk), which lives at ../nds-test-app-<N>,
or a baseline name (new) or a path (stage, reset). Baselines live in .claude/skills/nds-iq-eval/rigs/.
"""
import datetime, io, os, re, shutil, subprocess, sys, tarfile, urllib.request, zipfile

RIGS = '.claude/skills/nds-iq-eval/rigs'
# A nested CLAUDE.md would load into sessions working on NDS itself, so the rig gets it at setup.
OPT_OUT = ('## Memory\n\nDo not save any memory (user, feedback, project, or reference) for this project.\n'
           'Do not write to or read from the memory directory for this repo.\n')
# How each baseline starts, and where it serves: rig N on port 300N, set in each app's own code.
APPS = {'library-portal': ('npm start', 'http://localhost:3005'),
        'citydesk': ('npm start', 'http://localhost:3006'),
        'grants-desk': ('npm run dev', 'http://localhost:3007'),
        'nakheel-clinics': ('npm start', 'http://localhost:3003'),
        'hiraf-store': ('npm run dev', 'http://localhost:3004'),
        'shop-licenses': ('.venv/Scripts/python manage.py runserver 3002' if os.name == 'nt'
                          else '.venv/bin/python manage.py runserver 3002', 'http://localhost:3002')}
# The numbers past runs cite ("rig 5 run 8" = nds-test-app-5).
NUMS = {'1': 'sawaed', '2': 'shop-licenses', '3': 'nakheel-clinics', '4': 'hiraf-store', '5': 'library-portal', '6': 'citydesk', '7': 'grants-desk'}
# A baseline built on an older release: that release, and where its runtime goes. Its stage leaves it
# on that release and puts the new one in next-release/, for an upgrade.
PRIOR = {'nakheel-clinics': ('1.0.5', 'public/nds')}
# _source/ holds the folders NDS-INDEX's Sources line names.
FOLDERS = re.findall(r'`([^`]+)`', re.search(r'^- \*\*Sources:\*\*.*into `_source/`:(.*)$',
                                              open('NDS-INDEX.md', encoding='utf-8').read(), re.M).group(1))


def run(cmd, cwd=None):
    print('>', cmd)
    subprocess.run(cmd, cwd=cwd, shell=True, check=True)


def git(dest, *args):
    return subprocess.run(['git', *args], cwd=dest, capture_output=True, text=True, check=True).stdout.strip()


def where(rig):
    return os.path.join('..', f'nds-test-app-{rig}') if rig in NUMS else rig


def seed(dest):
    # A Django rig's database is gitignored, so a reset rebuilds it from the seed.
    py = os.path.join('.venv', 'Scripts' if os.name == 'nt' else 'bin', 'python')
    if not os.path.exists(os.path.join(dest, py + ('.exe' if os.name == 'nt' else ''))):
        run(f'"{sys.executable}" -m venv .venv', cwd=dest)
        run(f'{py} -m pip install -q -r requirements.txt', cwd=dest)
    if os.path.exists(os.path.join(dest, 'db.sqlite3')):
        os.remove(os.path.join(dest, 'db.sqlite3'))
    shutil.rmtree(os.path.join(dest, 'media'), ignore_errors=True)
    run(f'{py} manage.py migrate -v 0', cwd=dest)
    run(f'{py} manage.py seed', cwd=dest)


def new(rig, dest):
    baseline = NUMS.get(rig, rig)
    src = os.path.join(RIGS, baseline)
    assert os.path.isdir(src), f'no baseline {src}; have: {", ".join(os.listdir(RIGS))}'
    assert not os.path.exists(dest) or not os.listdir(dest), f'{dest} is not empty'
    shutil.copytree(src, dest, dirs_exist_ok=True)
    with open(os.path.join(dest, 'CLAUDE.md'), 'w', encoding='utf-8', newline='\n') as f:
        # A baseline with an anchor keeps it in AGENTS.md: rigs/ must never hold a CLAUDE.md.
        f.write(OPT_OUT + ('\n@AGENTS.md\n' if os.path.exists(os.path.join(dest, 'AGENTS.md')) else ''))
    if baseline in PRIOR:  # its pages already run on that release's runtime
        release, assets = PRIOR[baseline]
        with zipfile.ZipFile(fetch(release)) as z:
            unpack(z, f'nds-vanilla-template-v{release}/_site/assets/', os.path.join(dest, assets))
    git(dest, 'init', '-q', '-b', 'main')
    git(dest, 'add', '-A')
    git(dest, '-c', 'user.name=rig', '-c', 'user.email=rig@localhost', 'commit', '-qm', f'{baseline} baseline')
    git(dest, 'tag', 'baseline')
    if os.path.exists(os.path.join(dest, 'package.json')):  # rig 1 is a brief, no app
        run('npm install --no-audit --no-fund', cwd=dest)
    if os.path.exists(os.path.join(dest, 'manage.py')):
        seed(dest)
    print(f'ready: {dest}.\n  published release: paste the get-started setup prompt in a session there'
          f'\n  unreleased: python scripts/rig.py stage {rig if rig in NUMS else dest} <release> first')
    if baseline in APPS:
        print(f'the app: cd {dest} && {APPS[baseline][0]}  ->  {APPS[baseline][1]}')


def fetch(release):
    # A published release zip, cached in tmp/ (disposable: it downloads again).
    path = os.path.join('tmp', 'rig-cache', f'nds-vanilla-template-v{release}.zip')
    if not os.path.exists(path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        print('> download', release)
        urllib.request.urlretrieve(f'https://github.com/mazin-musleh/NDS-vanilla/releases/download/'
                                   f'v{release}/nds-vanilla-template-v{release}.zip', path)
    return path


def unpack(z, root, out):
    # Extract the members under root/ into out/, without the root folder.
    for m in z.infolist():
        if m.filename.startswith(root) and m.filename != root:
            m.filename = m.filename[len(root):]
            z.extract(m, out)


def pack(src, path, root):
    # Zip src/'s contents under one root folder, as GitHub's release and source zips hold them.
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as z:
        for d, _, files in os.walk(src):
            for name in files:
                p = os.path.join(d, name)
                z.write(p, root + '/' + os.path.relpath(p, src).replace(os.sep, '/'))


def ignore(dest):
    # get-started's Step 1 gitignores .nds/; the unreleased prompt skips that step.
    # A file path: check-ignore on a bare folder can match a blank line.
    if subprocess.run(['git', 'check-ignore', '-q', '.nds/NDS-INDEX.md'], cwd=dest).returncode:
        with open(os.path.join(dest, '.gitignore'), 'a', encoding='utf-8', newline='\n') as f:
            f.write('\n.nds/\n')


def stage(dest, release):
    try:
        baseline = git(dest, 'log', '-1', '--format=%s', 'baseline').removesuffix(' baseline')
    except subprocess.CalledProcessError:  # a real project, not a rig: no baseline tag
        baseline = ''
    nds = os.path.join(dest, '.nds')
    assert not os.path.exists(nds) or not any(f for _, _, f in os.walk(nds)), 'rig already has .nds files: reset it first'
    # A rig on an older release upgrades to this one: build it aside, then zip it into next-release/.
    out = nds
    if baseline in PRIOR:
        out = os.path.join('tmp', 'rig-stage', release)
        shutil.rmtree(out, ignore_errors=True)
    # The release zip itself, unpacked as an install extracts it.
    run(f'"{sys.executable}" scripts/mkrelease.py --preview {release}')
    with zipfile.ZipFile(f'dist/nds-vanilla-template-v{release}.zip') as z:
        unpack(z, f'nds-vanilla-template-v{release}/', out)
    # _source: the folders NDS-INDEX names, from the committed tree, as the tag's source zip holds them.
    tar = subprocess.run(['git', 'archive', '--format=tar', 'HEAD', *FOLDERS], capture_output=True, check=True).stdout
    tarfile.open(fileobj=io.BytesIO(tar)).extractall(os.path.join(out, '_source'), filter='data')
    # The release commit's stamp: 1.12.x-dev and the docs' "1.12.x" become the release number.
    dev = re.search(r'^version:\s*"?([\w.]+)-dev', open('_config.yml', encoding='utf-8').read(), re.M).group(1)
    n = 0
    for root, _, files in os.walk(out):
        for name in files:
            if not name.endswith(('.js', '.css', '.html', '.md', '.json', '.yml', '.scss')):
                continue
            p = os.path.join(root, name)
            try:
                s = open(p, encoding='utf-8', newline='').read()
            except UnicodeDecodeError:
                continue
            t = s.replace(f'{dev}-dev', release).replace(f'"{dev}"', f'"{release}"')
            if t != s:
                open(p, 'w', encoding='utf-8', newline='').write(t)
                n += 1
    if baseline in PRIOR:
        # The rig sits on its old release with the last rules for it; the upgrade takes next-release/
        # in place of the release page and raw main.
        old = PRIOR[baseline][0]
        with zipfile.ZipFile(fetch(old)) as z:
            unpack(z, f'nds-vanilla-template-v{old}/', nds)
        nxt = os.path.join(dest, 'next-release')
        os.makedirs(nxt, exist_ok=True)
        src = os.path.join(out, '_source')
        pack(src, os.path.join(nxt, f'NDS-vanilla-{release}.zip'), f'NDS-vanilla-{release}')
        shutil.rmtree(src)
        pack(out, os.path.join(nxt, f'nds-vanilla-template-v{release}.zip'), f'nds-vanilla-template-v{release}')
        shutil.copy2('_includes/NDS-IQ-draft.md', os.path.join(nxt, 'NDS-IQ.md'))
        with open(os.path.join(dest, 'NDS-IQ.md'), 'wb') as f:  # bytes: git()'s text mode decodes cp1252 on Windows
            f.write(subprocess.run(['git', 'show', 'IQv3.2:_includes/NDS-IQ.md'], capture_output=True, check=True).stdout)
        what = f'.nds/ is {old} with the IQv3.2 rules; next-release/ holds {release} and the draft'
    else:
        shutil.copy2('_includes/NDS-IQ-draft.md', os.path.join(dest, 'NDS-IQ.md'))
        what = 'NDS-IQ.md is the draft'
    ignore(dest)
    # Put the dev site back: mkrelease's cleaner and compressor rewrote _site for the zip.
    run('bundle exec jekyll build')
    print(f'staged {dest}: {n} files stamped {release}, {what}')
    if baseline in APPS:
        print(f'start the app: cd {dest} && {APPS[baseline][0]}  ->  {APPS[baseline][1]}')


def reset(dest, save):
    if save:
        runs = re.findall(r'^run(\d+)-', git(dest, 'branch', '--list', 'run*', '--format=%(refname:short)'), re.M)
        name = f'run{max(map(int, runs), default=0) + 1}-{datetime.date.today().isoformat()}'
        # The staged template is rebuilt each run. An install may gitignore it, and a pathspec
        # naming an ignored path fails the add, so drop it from the index instead.
        git(dest, 'add', '-A')
        git(dest, 'rm', '-r', '-q', '--cached', '--ignore-unmatch', '.nds', 'next-release')
        git(dest, '-c', 'user.name=rig', '-c', 'user.email=rig@localhost', 'commit', '-qm', f'{name} result', '--allow-empty')
        git(dest, 'branch', name)
        print('saved', name)
    # The agent may leave its own branch checked out: back to main at the baseline, and only
    # main and the saved runs stay.
    git(dest, 'checkout', '-q', '-f', '-B', 'main', 'baseline')
    for b in git(dest, 'branch', '--format=%(refname:short)').split():
        if b != 'main' and not re.match(r'run\d+-', b):
            git(dest, 'branch', '-q', '-D', b)
    git(dest, 'clean', '-fdq', '-e', 'node_modules', '-e', '.nds', '-e', 'next-release')  # a lock fails clean: the loop below reports it
    left = []
    for p in ('.nds', 'next-release', 'NDS-IQ.md'):
        p = os.path.join(dest, p)
        if os.path.isdir(p):
            shutil.rmtree(p, onerror=lambda f, path, e: left.append(path))
        elif os.path.exists(p):
            os.remove(p)
    if os.path.exists(os.path.join(dest, 'manage.py')):
        seed(dest)  # a running Django server locks db.sqlite3: stop it first
    # A server the run left on .nds/ locks it: stop that process by PID, never by name.
    print('reset to baseline' + (f'; still locked: {", ".join(left)}' if left else ''))


def cost(dest):
    # The agent never sees its own token count, so the review splits the newest session transcript
    # (helpers included) by each plan row's Started and Finished, which the rules make it write.
    import glob, json
    home = os.path.expanduser('~/.claude/projects/' + re.sub(r'[:\\/]', '-', os.path.abspath(dest)))
    sessions = sorted(glob.glob(os.path.join(home, '*.jsonl')), key=os.path.getmtime)
    if not sessions:
        sys.exit(f'no session transcript in {home}')
    sid = sessions[-1][:-6]
    windows, head = {}, None
    for line in open(os.path.join(dest, 'NDS-PLAN.md'), encoding='utf-8'):
        cells = [c.strip() for c in line.strip().strip('|').split('|')]
        if not line.startswith('|'):
            continue
        if 'started' in [c.lower() for c in cells]:
            head = [c.lower() for c in cells]
            continue
        try:
            s, e = (datetime.datetime.strptime(cells[head.index(k)], '%Y-%m-%d %H:%M') for k in ('started', 'finished'))
        except (TypeError, ValueError, IndexError):
            continue  # the header rule, or a row with no times
        windows.setdefault((s, e + datetime.timedelta(seconds=59)), []).append(cells[0])
    spans = sorted(windows)
    def bucket(t):
        for span in spans:
            if span[0] <= t <= span[1]:
                return ', '.join(windows[span])
        return 'before the first row' if not spans or t < spans[0][0] else 'after the last row' if t > spans[-1][1] else 'between rows'
    totals, seen = {}, set()
    files = [sid + '.jsonl'] + glob.glob(os.path.join(sid, 'subagents', '*.jsonl'))
    for f in files:
        for line in open(f, encoding='utf-8'):
            m = json.loads(line)
            msg, t = m.get('message') or {}, m.get('timestamp')
            u = msg.get('usage')
            if not (u and t) or (f, msg.get('id')) in seen:
                continue
            seen.add((f, msg.get('id')))
            t = datetime.datetime.fromisoformat(t.replace('Z', '+00:00')).astimezone().replace(tzinfo=None)
            b = totals.setdefault(bucket(t), [t, t, 0, 0, 0])
            b[0], b[1] = min(b[0], t), max(b[1], t)
            b[2] += u.get('output_tokens', 0)
            b[3] += u.get('cache_creation_input_tokens', 0)
            b[4] += u.get('cache_read_input_tokens', 0)
    print(f'{os.path.basename(sid)}: {len(files) - 1} helper agent(s)\n')
    print(f'{"row":<44} {"min":>4} {"output":>8} {"cache write":>12} {"cache read":>12}')
    for name, (a, z, o, w, r) in sorted(totals.items(), key=lambda kv: kv[1][0]):
        minutes = '' if name == 'between rows' else (z - a).seconds // 60  # gaps are not one stretch
        print(f'{name[:44]:<44} {minutes:>4} {o:>8,} {w:>12,} {r:>12,}')
    o, w, r = (sum(v[i] for v in totals.values()) for i in (2, 3, 4))
    print(f'{"total":<44} {"":>4} {o:>8,} {w:>12,} {r:>12,}')


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a or a[0] not in ('new', 'stage', 'reset', 'cost'):
        sys.exit(__doc__)
    if a[0] == 'new':
        new(a[1], a[2] if len(a) > 2 else where(a[1]) if a[1] in NUMS else os.path.join('..', f'nds-rig-{a[1]}'))  # a baseline name
    elif not os.path.isdir(where(a[1])):
        sys.exit(f'no rig at {where(a[1])}: python scripts/rig.py new {a[1]}')
    elif a[0] == 'stage':
        stage(where(a[1]), a[2])
    elif a[0] == 'cost':
        cost(where(a[1]))
    else:
        reset(where(a[1]), '--save' in a)
