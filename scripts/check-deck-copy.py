#!/usr/bin/env python3
"""The ND96 pack ships its own copy of the swiper's DECK MODE block so the pack
draws the deck on runtimes older than the mode (1.13). Nothing but a comment kept
the two equal, and on 2026-09-19 the copy had fallen far enough behind that, with
the theme switched on, its stale rules overrode core's: the outgoing card snapped
invisible instead of fading, the deck clipped at its own edge, and `.nds-stacked`
did nothing at all. The pack's sheet is unscoped, so a stale copy does not merely
sit there — it wins.

Compare the two blocks and fail on any difference. Run with the other release
guards; `--diff` prints what moved.

Keeping the copy in sync is safe in the other direction too: the block depends
only on primitives that predate deck mode (--swiper-total, --spacing-5xl,
--nds-transition-*, --nds-viewport-padding, --nds-content-MaxWidth) plus private
properties it declares itself. Verified against the v1.9.0 release build, which
carries all six and no deck CSS at all. If a sync ever introduces a NEW core
dependency, that check is the one to redo — this script cannot see it.
"""
import difflib
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CORE = ROOT / '_sass' / 'components' / '_swiper.scss'
PACK = ROOT / '_sass' / 'themes' / 'events' / '_national-day-96.scss'
MARKER = '// DECK MODE — .nds-deck'


def block(path):
    """The DECK MODE section: its banner line through end of file."""
    lines = path.read_text(encoding='utf-8').split('\n')
    for i, line in enumerate(lines):
        if line.startswith(MARKER):
            return lines[i:]
    return None


def main():
    core, pack = block(CORE), block(PACK)
    for name, path, got in (('core', CORE, core), ('pack', PACK, pack)):
        if got is None:
            print(f"FAIL  no '{MARKER}' block in {path.relative_to(ROOT)} ({name})")
            return 1

    if core == pack:
        print(f'deck copy: pack matches core, {len(core)} lines')
        return 0

    print('FAIL  the ND96 pack\'s DECK MODE copy has drifted from core.')
    print(f'      core: {CORE.relative_to(ROOT)}')
    print(f'      pack: {PACK.relative_to(ROOT)}')
    print('      Re-sync the pack from core, then rebuild its zip:')
    print('        python scripts/mkevent.py national-day-96')
    if '--diff' in sys.argv:
        print()
        print('\n'.join(difflib.unified_diff(core, pack, 'core', 'pack', lineterm='', n=2)))
    else:
        print('      Run with --diff to see what moved.')
    return 1


if __name__ == '__main__':
    sys.exit(main())
