#!/usr/bin/env python3
"""Publish the NDS IQ draft to the file every install downloads.

    python scripts/publish-iq.py           # dry run: every check, no writes
    python scripts/publish-iq.py --apply   # copy, commit, tag; never pushes

Installs fetch raw main's _includes/NDS-IQ.md, so only this script writes it.
Drafts live in _includes/NDS-IQ-draft.md and push to main like any file.
"""
import os
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'scripts'))
from mkrelease import check_rules

DRAFT = '_includes/NDS-IQ-draft.md'
PUBLISHED = '_includes/NDS-IQ.md'
GUIDE = 'guides/integration-quality.md'


def git(*args):
    return subprocess.run(['git', *args], cwd=ROOT, check=True,
                          capture_output=True, text=True).stdout.strip()


def read(rel):
    with open(os.path.join(ROOT, rel), encoding='utf8') as f:
        return f.read()


def main():
    apply = '--apply' in sys.argv[1:]

    branch = git('rev-parse', '--abbrev-ref', 'HEAD')
    if branch != 'main':
        sys.exit(f'On {branch}: publish from main, where raw main serves the file.')

    draft = read(DRAFT)
    rev = check_rules(draft, DRAFT)
    tag = f'IQv{rev}'
    if git('tag', '-l', tag):
        sys.exit(f'{tag} exists. Set a new "instructions v<N>" in the draft heading.')
    if draft == read(PUBLISHED):
        sys.exit(f'{DRAFT} matches {PUBLISHED}: nothing to publish.')
    # The live site reads the guide from the newest IQv tag, so its row lands in the tagged commit.
    if f'<td>v{rev}</td>' not in read(GUIDE):
        sys.exit(f'{GUIDE} has no history row for v{rev}. Write it, then run this again.')

    if not apply:
        print(f'Ready: v{rev}. Run with --apply to copy, commit and tag {tag}.')
        return

    shutil.copyfile(os.path.join(ROOT, DRAFT), os.path.join(ROOT, PUBLISHED))
    git('add', PUBLISHED, GUIDE)
    git('commit', '-m', f'publish(nds-iq): v{rev}', '--', PUBLISHED, GUIDE)
    git('tag', '-a', tag, '-m', f'NDS IQ v{rev}')
    print(f'Published v{rev} as {tag}. Push it: git push origin main {tag}')


if __name__ == '__main__':
    main()
