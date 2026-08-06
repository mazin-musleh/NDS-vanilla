#!/usr/bin/env python3
"""
Wrap direct children of .nds-section-body in .nds-block wrappers.

- Bare prose siblings (p, ul, ol, blockquote, figure, table, pre, h1-h6
  with no nds-* class) -> grouped consecutively into one .nds-block.nds-prose.
- Component elements (with nds-* class) -> each in its own .nds-block wrapper.
- Elements with .nds-block AND another nds-* class -> strip .nds-block,
  wrap in a new .nds-block div.
- Elements already a pure .nds-block(.nds-prose) -> skip.

Line-based, indent-driven. Skips files where structure looks ambiguous
(inconsistent indentation, multi-line opens) and reports them for manual review.
"""
import re
import sys
import glob
import os
import argparse
import io

PROSE_TAGS = {'p', 'ul', 'ol', 'blockquote', 'figure', 'table', 'pre',
              'h1', 'h2', 'h3', 'h4', 'h5', 'h6'}

# Inside these, whitespace/indent is display-sensitive — never reindent their content.
RAW_TAGS = {'pre', 'code', 'textarea', 'script', 'style'}


def raw_open_tag(stripped):
    """If a line opens a raw block that doesn't close on the same line, return its tag."""
    for tag in RAW_TAGS:
        if re.match(rf'<{tag}(?:\s[^>]*)?>', stripped) and f'</{tag}>' not in stripped:
            return tag
    return None


def raw_close_on_line(line, tag):
    return f'</{tag}>' in line


def reindent_range(lines, start, end, prefix='    '):
    """Emit lines[start..end] with `prefix` added to non-blank lines that are NOT
    inside a raw block (<pre>/<code>/<textarea>/<script>/<style>). Returns list."""
    out = []
    inside_raw = None
    for i in range(start, end + 1):
        src = lines[i]
        if inside_raw:
            # inside a raw block; keep original text
            out.append(src)
            if raw_close_on_line(src, inside_raw):
                inside_raw = None
            continue
        # normal line: reindent if non-blank
        if src.strip():
            out.append(prefix + src)
        else:
            out.append(src)
        # after emitting, check if this line opens a raw block
        opened = raw_open_tag(src.strip())
        if opened:
            inside_raw = opened
    return out

# On Windows, force stdout to utf-8 so we can print box characters
if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


def get_indent(line):
    return len(line) - len(line.lstrip(' '))


def parse_open_tag(line):
    """Return (tag, class_str, is_self_closing_or_single_line) or None."""
    stripped = line.lstrip(' ')
    m = re.match(r'<(\w+)([^>]*)>', stripped)
    if not m:
        return None
    tag = m.group(1).lower()
    attrs = m.group(2)
    cls_m = re.search(r'class="([^"]*)"', attrs)
    cls = cls_m.group(1) if cls_m else ''
    # Single-line if the same-tag close appears on the line or self-closing
    rest = stripped[m.end():]
    single = rest.endswith(f'</{tag}>') or stripped.rstrip().endswith('/>')
    return tag, cls, single


def find_close(lines, start_i, indent, tag):
    """Given an element opening at start_i, find its close line at same indent."""
    close = f'</{tag}>'
    for i in range(start_i + 1, len(lines)):
        line = lines[i]
        s = line.strip()
        # match </tag> or </tag> possibly with trailing content
        if get_indent(line) == indent and s == close:
            return i
    return None


def categorize(tag, cls):
    """PROSE | COMPONENT | FIX-BLOCK-ON-COMPONENT | SKIP-BLOCK | MAYBE-UPGRADE-BLOCK

    MAYBE-UPGRADE-BLOCK is a pure .nds-block wrapper that MIGHT need .nds-prose
    added if its descendants include bare prose (checked later, needs the source
    lines). SKIP-BLOCK is a wrapper that's already .nds-block.nds-prose or has no
    prose inside — either way, don't touch."""
    classes = cls.split()
    nds_classes = [c for c in classes if c.startswith('nds-')]
    has_block = 'nds-block' in classes
    has_prose = 'nds-prose' in classes
    other_nds = [c for c in nds_classes if c not in ('nds-block', 'nds-prose')]

    if has_block and has_prose and not other_nds:
        return 'SKIP-BLOCK'
    if has_block and not other_nds:
        return 'MAYBE-UPGRADE-BLOCK'
    if has_block and other_nds:
        return 'FIX-BLOCK-ON-COMPONENT'
    if not nds_classes and tag in PROSE_TAGS:
        return 'PROSE'
    if nds_classes:
        return 'COMPONENT'
    if tag in PROSE_TAGS:
        return 'PROSE'
    # non-prose tag with no nds- class (e.g. bare <div>, <nav>, <a>)
    if tag in ('a', 'nav', 'button', 'form', 'section', 'aside', 'main', 'article', 'div'):
        return 'COMPONENT'  # treat as component for wrapping purposes
    return 'COMPONENT'


def block_contains_bare_prose(lines, block_start, block_end):
    """Scan descendants of a .nds-block for bare prose tags (p, ul, ol, ...
    with no nds-* class), skipping content inside <pre>/<code>/<textarea>/<script>."""
    inside_raw = None
    for i in range(block_start + 1, block_end):
        src = lines[i]
        stripped = src.strip()
        if inside_raw:
            if raw_close_on_line(src, inside_raw):
                inside_raw = None
            continue
        opened = raw_open_tag(stripped)
        if opened:
            inside_raw = opened
            continue
        m = re.match(r'<(\w+)(?:\s+([^>]*))?/?>', stripped)
        if not m:
            continue
        tag = m.group(1).lower()
        if tag not in PROSE_TAGS:
            continue
        attrs = m.group(2) or ''
        cls_m = re.search(r'class="([^"]*)"', attrs)
        cls = cls_m.group(1) if cls_m else ''
        if any(c.startswith('nds-') for c in cls.split()):
            continue
        return True
    return False


def strip_block_class(cls):
    """Remove 'nds-block' from a class attribute value."""
    parts = cls.split()
    parts = [p for p in parts if p != 'nds-block']
    return ' '.join(parts)


def find_section_bodies(text):
    """Return list of (open_line_idx, close_line_idx, indent) for each OUTERMOST
    .nds-section-body. Skipped:
    - Nested section-bodies (demos rendering the section markup inside a showcase).
    - Section-bodies inside .nds-sideinfo-section — that layout uses flex on the
      body with .nds-info-content + .nds-sideinfo as direct flex-item children;
      wrapping them in .nds-block breaks the two-column layout."""
    lines = text.split('\n')
    # Locate .nds-sideinfo-section ranges to exclude
    sideinfo_ranges = []
    sec_pat = re.compile(r'<section\s[^>]*class="([^"]*)"')
    for i, line in enumerate(lines):
        m = sec_pat.search(line)
        if not m:
            continue
        if 'nds-sideinfo-section' not in m.group(1).split():
            continue
        # find closing </section> at any indent
        for j in range(i + 1, len(lines)):
            if lines[j].strip().startswith('</section>'):
                sideinfo_ranges.append((i, j))
                break

    bodies = []
    open_pat = re.compile(r'^(\s*)<div\s+class="([^"]*)"[^>]*>\s*$')
    for i, line in enumerate(lines):
        m = open_pat.match(line)
        if not m:
            continue
        classes = m.group(2).split()
        if 'nds-section-body' not in classes:
            continue
        # skip if inside a sideinfo-section
        if any(a <= i <= b for a, b in sideinfo_ranges):
            continue
        indent = len(m.group(1))
        close_i = find_close(lines, i, indent, 'div')
        if close_i is None:
            continue
        bodies.append((i, close_i, indent))

    # Keep only outermost — drop bodies whose range is inside another body
    bodies.sort(key=lambda b: b[0])
    outermost = []
    for open_i, close_i, indent in bodies:
        if any(o < open_i and c > close_i for o, c, _ in outermost):
            continue
        outermost.append((open_i, close_i, indent))
    return outermost


def parse_direct_children(lines, body_open, body_close, child_indent):
    """Return list of dicts describing direct-child elements."""
    children = []
    i = body_open + 1
    while i < body_close:
        line = lines[i]
        # skip blank lines and comments
        stripped = line.strip()
        if not stripped or stripped.startswith('<!--') or stripped.startswith('{%') or stripped.startswith('{{'):
            i += 1
            continue
        # must start at exactly child_indent
        if get_indent(line) != child_indent:
            i += 1
            continue
        # must be a tag open
        parsed = parse_open_tag(line)
        if not parsed:
            i += 1
            continue
        tag, cls, single = parsed
        if single:
            children.append({
                'start': i, 'end': i, 'tag': tag, 'cls': cls,
                'indent': child_indent
            })
            i += 1
            continue
        close_i = find_close(lines, i, child_indent, tag)
        if close_i is None:
            # ambiguous; return None to mark file as skipped
            return None
        children.append({
            'start': i, 'end': close_i, 'tag': tag, 'cls': cls,
            'indent': child_indent
        })
        i = close_i + 1
    return children


def group_children(children, lines):
    """Group consecutive PROSE children into single blocks. Also resolves
    MAYBE-UPGRADE-BLOCK: a pure .nds-block whose descendants include bare prose
    becomes UPGRADE-BLOCK (add nds-prose to its class); otherwise SKIP."""
    groups = []
    current_prose = []
    for ch in children:
        cat = categorize(ch['tag'], ch['cls'])
        if cat == 'MAYBE-UPGRADE-BLOCK':
            if block_contains_bare_prose(lines, ch['start'], ch['end']):
                cat = 'UPGRADE-BLOCK'
            else:
                cat = 'SKIP-BLOCK'
        ch['cat'] = cat
        if cat == 'SKIP-BLOCK':
            if current_prose:
                groups.append(('PROSE_GROUP', current_prose))
                current_prose = []
            groups.append(('SKIP', [ch]))
        elif cat == 'UPGRADE-BLOCK':
            if current_prose:
                groups.append(('PROSE_GROUP', current_prose))
                current_prose = []
            groups.append(('UPGRADE', [ch]))
        elif cat == 'PROSE':
            current_prose.append(ch)
        else:
            if current_prose:
                groups.append(('PROSE_GROUP', current_prose))
                current_prose = []
            groups.append(('WRAP', [ch]))
    if current_prose:
        groups.append(('PROSE_GROUP', current_prose))
    return groups


def rewrap_section_body(lines, body_open, body_close, child_indent):
    """Return (new_lines, changed_count) or None if we should skip this section."""
    children = parse_direct_children(lines, body_open, body_close, child_indent)
    if children is None:
        return None
    groups = group_children(children, lines)

    # Any actual work to do?
    any_change = any(g[0] in ('WRAP', 'PROSE_GROUP', 'UPGRADE') for g in groups)
    if not any_change:
        # Only SKIP groups (or no children); nothing to do
        return (lines, 0)

    # Build the new section-body content
    indent_str = ' ' * child_indent
    inner_indent_str = ' ' * (child_indent + 4)

    new_content_lines = []
    changes = 0

    # Copy lines before first child, between children, and after last child
    # Simpler approach: reconstruct entire body content from children groups.
    # Interleaved content (blank lines, comments between children) needs preservation.

    # Rebuild by iterating: keep exact source lines for each child, but wrap them.
    # To preserve blank lines/comments between children, extract them from the source.

    # Strategy: walk body content line by line; when we hit a child's start, emit
    # its group-wrapped form and jump to child's end+1.
    prev_end = body_open + 1  # first line inside body
    # Build a map: child_start_line -> group_it_belongs_to
    starts = {}
    for kind, group in groups:
        first = group[0]['start']
        starts[first] = (kind, group)
    # Also mark all lines that are part of any group (to skip when copying between)
    covered = set()
    for kind, group in groups:
        for ch in group:
            for l in range(ch['start'], ch['end'] + 1):
                covered.add(l)

    i = body_open + 1
    while i < body_close:
        if i in starts:
            kind, group = starts[i]
            if kind == 'SKIP':
                # copy source lines as-is
                for l in range(group[0]['start'], group[0]['end'] + 1):
                    new_content_lines.append(lines[l])
                i = group[0]['end'] + 1
            elif kind == 'UPGRADE':
                # In-place: rewrite the opening line to add nds-prose to the class
                ch = group[0]
                # Add nds-prose to class attribute (preserve nds-block first, then nds-prose)
                new_cls_parts = ch['cls'].split()
                if 'nds-prose' not in new_cls_parts:
                    # keep 'nds-block' at whatever position, append nds-prose after it
                    idx = new_cls_parts.index('nds-block')
                    new_cls_parts.insert(idx + 1, 'nds-prose')
                new_cls = ' '.join(new_cls_parts)
                for l in range(ch['start'], ch['end'] + 1):
                    src = lines[l]
                    if l == ch['start']:
                        src = src.replace(f'class="{ch["cls"]}"', f'class="{new_cls}"', 1)
                    new_content_lines.append(src)
                changes += 1
                i = ch['end'] + 1
            elif kind == 'PROSE_GROUP':
                new_content_lines.append(f'{indent_str}<div class="nds-block nds-prose">')
                # Reindent each child's lines by 4, skipping raw-block content
                for ch in group:
                    new_content_lines.extend(reindent_range(lines, ch['start'], ch['end']))
                new_content_lines.append(f'{indent_str}</div>')
                changes += 1
                i = group[-1]['end'] + 1
            elif kind == 'WRAP':
                ch = group[0]
                new_content_lines.append(f'{indent_str}<div class="nds-block">')
                # For FIX-BLOCK-ON-COMPONENT, rewrite the child's opening line to drop nds-block
                child_lines = list(lines)
                if ch['cat'] == 'FIX-BLOCK-ON-COMPONENT':
                    new_cls = strip_block_class(ch['cls'])
                    child_lines = list(lines)
                    child_lines[ch['start']] = child_lines[ch['start']].replace(
                        f'class="{ch["cls"]}"', f'class="{new_cls}"', 1)
                new_content_lines.extend(reindent_range(child_lines, ch['start'], ch['end']))
                new_content_lines.append(f'{indent_str}</div>')
                changes += 1
                i = ch['end'] + 1
        else:
            # blank line or content between children — preserve
            if i not in covered:
                new_content_lines.append(lines[i])
            i += 1

    # Assemble full new file
    result = lines[:body_open + 1] + new_content_lines + lines[body_close:]
    return (result, changes)


def process_file(path, dry_run):
    with open(path, 'r', encoding='utf-8', newline='') as f:
        raw = f.read()
    # detect line endings
    line_ending = '\r\n' if '\r\n' in raw else '\n'
    lines = raw.split(line_ending)
    original_lines = list(lines)

    bodies = find_section_bodies(line_ending.join(lines))
    if not bodies:
        return (0, 0, False)

    # Process each section-body BOTTOM-UP so line indices don't shift
    total_changes = 0
    skipped = False
    for body_open, body_close, indent in sorted(bodies, key=lambda b: -b[0]):
        child_indent = indent + 4
        result = rewrap_section_body(lines, body_open, body_close, child_indent)
        if result is None:
            skipped = True
            continue
        new_lines, changes = result
        if changes > 0:
            lines = new_lines
            total_changes += changes

    if total_changes == 0:
        return (0, 0, skipped)

    if not dry_run:
        new_raw = line_ending.join(lines)
        with open(path, 'w', encoding='utf-8', newline='') as f:
            f.write(new_raw)

    return (total_changes, len(bodies), skipped)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--files', nargs='*', help='specific files, else default globs')
    args = ap.parse_args()

    if args.files:
        paths = args.files
    else:
        paths = sorted(
            glob.glob('components/*.md') +
            glob.glob('templates/*.md') +
            glob.glob('layout/*.md') +
            glob.glob('utilities/*.md') +
            glob.glob('examples/*.md') +
            glob.glob('ui-shell/*.md')
        )
        # skip index.md (already done)
        paths = [p for p in paths if os.path.basename(p) != 'index.md']

    total_changes = 0
    total_bodies = 0
    skipped_files = []
    changed_files = []
    for p in paths:
        try:
            changes, bodies, skipped = process_file(p, args.dry_run)
        except Exception as e:
            print(f'ERROR: {p}: {e}')
            continue
        total_bodies += bodies
        total_changes += changes
        if skipped:
            skipped_files.append(p)
        if changes > 0:
            changed_files.append((p, changes))

    print(f'Files scanned:  {len(paths)}')
    print(f'Files changed:  {len(changed_files)}')
    print(f'Total wraps:    {total_changes}')
    print(f'Section-bodies: {total_bodies}')
    if skipped_files:
        print(f'Skipped (ambiguous structure): {len(skipped_files)}')
        for p in skipped_files[:10]:
            print(f'  {p}')


if __name__ == '__main__':
    main()
