#!/usr/bin/env python3
"""Does each event pack's inlined CSS still match its compiled stylesheet?

    python scripts/check-event-css.py           # pass/fail per pack
    python scripts/check-event-css.py --diff    # first differing line

A pack injects its stylesheet as an inline <style> during parse, from a string
scripts/mkevent.py prepends to the minified JS. That removes a second blocking
round trip before first paint. It also means the CSS exists twice: as the .min.css
file, and inside the .min.js.

The two drift whenever the chain runs out of order — js_processor.rb rewrites the
JS with an empty slot, and mkevent.py must run AFTER Jekyll has recompiled the
SCSS or it inlines the previous build. Neither mistake raises anything: the stale
inline <style> simply wins over the fresh file, and the page renders old CSS.
The order that works:

    ruby _plugins/js_processor.rb   &&  bundle exec jekyll build  &&  python scripts/mkevent.py

An empty slot fails too. The pack still renders — it falls back to fetching the
file — but the slot is empty only because js_processor.rb ran last, and a silent
fallback to the slower path is the thing this check exists to notice.
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mkevent import ROOT, read_events, rebase_urls, js_string  # noqa: E402

ASSIGN = re.compile(r"^window\.__NDS_EVENT_CSS=(.*?);(?=!function|\(function)", re.S | re.M)


def main():
    site = os.path.join(ROOT, '_site')
    events = read_events()
    if not events:
        print('no event packs found')
        return 0

    bad = 0
    for ev in events:
        js_path = os.path.join(ROOT, ev['folder'], ev['js'])
        css_path = os.path.join(site, ev['folder'], ev['css'])
        if not ev['js'] or not os.path.isfile(js_path):
            print(f"skip  {ev['theme']}: no pack JS")
            continue
        if not os.path.isfile(css_path):
            print(f"FAIL  {ev['theme']}: {ev['css']} not in _site — run the Jekyll build first")
            bad += 1
            continue

        js = open(js_path, encoding='utf8').read()
        m = ASSIGN.search(js)
        if not m:
            # The pack still works — it falls back to fetching the file — but the
            # slot is empty only because js_processor.rb ran after mkevent.py, and
            # nothing else would ever say so.
            bad += 1
            print(f"FAIL  {ev['theme']}: the CSS slot is empty, so the pack will fetch its "
                  f"stylesheet instead of inlining it (a second blocking round trip).")
            print(f"      rebuild:  js_processor.rb, then jekyll build, then mkevent.py")
            continue

        with open(css_path, encoding='utf8') as f:
            expected = js_string(rebase_urls(f.read()))
        if m.group(1) == expected:
            print(f"pass  {ev['theme']}: inlined CSS matches {ev['css']} ({len(expected)} chars)")
            continue

        bad += 1
        print(f"FAIL  {ev['theme']}: inlined CSS is stale or hand-edited.")
        print(f"      rebuild:  js_processor.rb, then jekyll build, then mkevent.py")
        if '--diff' in sys.argv:
            got, want = m.group(1), expected
            i = next((k for k in range(min(len(got), len(want))) if got[k] != want[k]),
                     min(len(got), len(want)))
            print(f"      first difference at char {i}:")
            print(f"        inlined:  …{got[max(0, i - 40):i + 40]}…")
            print(f"        compiled: …{want[max(0, i - 40):i + 40]}…")
        else:
            print('      Run with --diff to see where they differ.')

    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
