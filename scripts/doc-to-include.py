"""Convert a doc page's hand-written demo cards to {% include demo.html %}, then prove nothing changed.

    python scripts/doc-to-include.py components/tags.md           # convert in place, back up the original
    bundle exec jekyll build
    python scripts/doc-to-include.py components/tags.md --verify  # built page vs the backup
    python scripts/doc-to-include.py components/tags.md --dry     # report only, write nothing

Each .nds-showcase > .nds-demo-card becomes a capture of its toggles, a capture of its
.state-demo markup (dedented to column 0), and one include call. The code tab is no longer
written by hand: the include escapes the demo markup, so --verify also reports any page whose
old code tab had drifted from its demo. Cards with a JS API tab stop the run: convert those by hand.
The backup lives in tmp/doc-include/<page path>.
"""
import html
import os
import re
import sys
import textwrap

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def block_end(s, start):
    depth = 0
    for m in re.finditer(r'<(/?)div\b[^>]*>', s[start:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return start + m.end()
    raise ValueError('unbalanced <div> at %d' % start)


def inner(s, open_re):
    m = re.search(open_re, s)
    if not m:
        return None
    body = s[m.end():block_end(s, m.start())]
    return body[:body.rindex('</div>')]


def convert(t):
    parts, pos, n = [], 0, 0
    for m in re.finditer(r'[ \t]*<div class="nds-showcase">', t):
        if m.start() < pos:
            continue
        end = block_end(t, t.index('<div', m.start()))
        card = t[m.start():end]
        if card.count('nds-demo-card') != 1:
            sys.exit('showcase with %d demo cards near offset %d: convert by hand' % (card.count('nds-demo-card'), m.start()))
        if 'lang-javascript code' in card or 'lang-js code' in card:
            sys.exit('JS API tab near offset %d: convert by hand' % m.start())
        pid = re.search(r'aria-controls="panel-([^"]+)"', card).group(1)
        key = re.sub(r'[^a-z0-9]+', '_', pid.lower())
        actions = inner(card, r'<div class="demo-action">')
        label = re.search(r'<div class="demo-label">([^<]*)</div>', card)
        bg = (re.search(r'<div class="demo-container( [^"]*)?">', card).group(1) or '').strip()
        demo = textwrap.dedent(inner(card, r'<div class="state-demo">').strip('\n')).strip()
        lines = []
        if actions:
            lines += ['{%%- capture %s_actions %%}' % key, textwrap.dedent(actions.strip('\n')).rstrip(), '{%- endcapture %}']
        lines += ['{%%- capture %s %%}' % key, demo, '{%- endcapture %}']
        call = '{%% include demo.html id="%s" html=%s' % (pid, key)
        if actions:
            call += ' actions=%s_actions' % key
        elif label:
            call += ' label="%s"' % label.group(1)
        if bg:
            call += ' bg="%s"' % bg
        if 'nds-expandable' in card:
            call += ' long=true'
        lines.append(call + ' %}')
        parts += [t[pos:m.start()], '\n'.join(lines) + '\n']
        pos = end + (1 if t[end:end + 1] == '\n' else 0)
        n += 1
    parts.append(t[pos:])
    return ''.join(parts), n


def grab(s):
    norm = lambda x: ' '.join(x.split())
    return {
        'previews': [norm(x) for x in re.findall(r'<div class="state-demo">(.*?)</div>\s*</div>\s*<div class="demo-code">', s, re.S)],
        'code': [norm(html.unescape(x)) for x in re.findall(r'<code class="lang-html code">(.*?)</code>', s, re.S)],
        'toggles': [norm(html.unescape(a or b)) for a, b in re.findall(r"data-toggler=(?:'([^']*)'|\"([^\"]*)\")", s)],
        'panel ids': re.findall(r'aria-controls="(panel-[^"]+)"', s),
    }


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    page = sys.argv[1].replace('\\', '/')
    src = os.path.join(ROOT, page)
    backup = os.path.join(ROOT, 'tmp', 'doc-include', page)
    if '--verify' in sys.argv:
        built = os.path.join(ROOT, '_site', re.sub(r'\.md$', '.html', page))
        old, new = grab(open(backup, encoding='utf-8').read()), grab(open(built, encoding='utf-8').read())
        ok = True
        for k in old:
            same = sum(x == y for x, y in zip(old[k], new[k]))
            good = same == len(old[k]) == len(new[k])
            ok &= good
            print('%s %-9s old=%d new=%d identical=%d' % ('pass' if good else 'FAIL', k, len(old[k]), len(new[k]), same))
            if k == 'code' and not good:
                print('     a differing code tab usually means the old one had drifted from its demo; the include now matches the demo')
        sys.exit(0 if ok else 1)
    t = open(src, encoding='utf-8', newline='').read()
    if '--dry' in sys.argv:
        out, n = convert(t)
        print('%s: %d demo cards convertible' % (page, n))
        return
    out, n = convert(t)
    if not n:
        sys.exit('no demo cards found in %s' % page)
    os.makedirs(os.path.dirname(backup), exist_ok=True)
    open(backup, 'w', encoding='utf-8', newline='').write(t)
    open(src, 'w', encoding='utf-8', newline='').write(out)
    print('%d demo cards converted; original saved to %s' % (n, os.path.relpath(backup, ROOT)))
    print('next: bundle exec jekyll build, then run again with --verify')


if __name__ == '__main__':
    main()
