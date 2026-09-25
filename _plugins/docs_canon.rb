# frozen_string_literal: true

# Doc canon blocks — `<script type="text/html" data-canon>` on a doc page holds a component's
# markup once. This hook writes its preview, code block and builder toolbar into the built
# HTML. Build time, not a JS stamp: the fold gate paints content before deferred scripts run,
# so a JS stamp jumped the page (0.46 cold-load CLS). _js/nds-docs.js only wires the toolbar.
# Runs on Pages via the Actions workflow; restart `jekyll serve` after editing this file.
require 'cgi'

module DocsCanon
  CANON_RE = %r{<script type="text/html"([^>]*)>(.*?)</script>}m
  # Knobs only, scoped to the skeleton section classes (nds-doc-{name}).
  DOC_STYLE = '.nds-doc-features .nds-definition-list{--max-col:2;--mid-col:1;--min-col:1;--dl-icon-size:24px;--row-gap:24px;--col-gap:32px}' \
              '.nds-doc-variants .nds-table{--min-width:900px}'

  def self.attr(attrs, name)
    m = attrs.match(/(?:\A|\s)#{Regexp.escape(name)}(?:="([^"]*)")?(?=\s|\z)/)
    m && (m[1] || '')
  end

  def self.dedent(src)
    lines = src.sub(/\A\s*\n/, '').rstrip.split("\n", -1)
    n = lines.reject { |l| l.strip.empty? }.map { |l| l[/\A[ \t]*/].size }.min || 0
    lines.map { |l| l[n..] || '' }.join("\n")
  end

  def self.text(cell) = CGI.unescapeHTML(cell.gsub(/<[^>]+>/, '')).strip

  # Rows sharing Group + Option are one choice with several ops.
  def self.rows(html, id)
    table = html[%r{<table id="#{Regexp.escape(id)}"[^>]*>.*?<tbody>(.*?)</tbody>}m, 1]
    return [] unless table

    choices = {}
    table.scan(%r{<tr>(.*?)</tr>}m).each do |(tr)|
      group, option, markup, target = tr.scan(%r{<td[^>]*>(.*?)</td>}m).flatten.map { |c| text(c) }
      c = (choices["#{group}|#{option}"] ||= { group: group, option: option })
      target = target.to_s.sub(/\s*\((start|end|after|replace)\)\z/, '')
      # `canon #id` swaps the markup in the Structure group; anywhere else it inserts a part block.
      if markup =~ /\Acanon #([\w-]+)\z/
        group == 'Structure' ? c[:structure] = Regexp.last_match(1) : (c[:inserts] ||= []) << Regexp.last_match(1)
      end
      c[:live] ||= markup != '—'
      (c[:targets] ||= []) << target if markup != '—' && !c[:structure]
    end
    choices.values
  end

  # ponytail: class-only match — `.a.b` needs both classes on one element; a tag or
  # attribute selector counts as present. Upgrade to a real parser if a table needs one.
  def self.matches?(src, sel)
    return true if sel == '—'
    # ponytail: a `create()` row belongs to a JS structure, and the default structure is HTML.
    return false if sel.start_with?('create(')

    classes = sel.scan(/\.([\w-]+)/).flatten
    classes.empty? || src.scan(/class="([^"]*)"/).any? { |(cls)| (classes - cls.split).empty? }
  end

  # A choice shows only when the element it changes is in the current markup ("Row" needs a group).
  def self.applies?(choice, src)
    choice[:structure] || !choice[:targets] || choice[:targets].any? { |t| matches?(src, t) }
  end

  def self.code_block(lang, src)
    <<~HTML.chomp
      <div class="nds-code nds-expandable"><div class="nds-code-action"><button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example"><i class="nds-icon nds-hgi-copy-01"></i></button></div><div class="nds-expandable-content"><code class="lang-#{lang} code">
      #{CGI.escapeHTML(src)}
      </code></div></div>
    HTML
  end

  # On-color markup needs the deep surface behind it; everything else sits on a normal card.
  def self.preview_style(oncolor)
    "--card-width: 100%; --card-radius: var(--radius-md);#{' --card-bg: var(--background-primary-strong);' if oncolor}"
  end

  # Option markers: `(default)` pre-selects; `(demo: + Other)` also turns on option "Other" (demo aid only).
  def self.label(option) = option.sub(/\s*\(default\)/, '').sub(/\s*\(demo:\s*\+[^)]*\)/, '')

  def self.toolbar(id, rows, src)
    # A group whose every row changes nothing (e.g. "Field states → Forms") is reference only.
    groups = rows.group_by { |r| r[:group] }.select { |_, list| list.any? { |r| r[:live] } }
    hide = ->(on) { on ? '' : ' hidden' }
    # Dropmenus first, then toggles, each in table order.
    groups = groups.partition { |_, list| list.size > 1 }.flatten(1)
    items = groups.map do |group, list|
      if list.size == 1
        r = list.first
        %(<button type="button" class="nds-btn nds-subtle nds-md" aria-pressed="false"#{hide[applies?(r, src)]} data-builder-option="#{CGI.escapeHTML("#{group}|#{r[:option]}")}"><span class="nds-label">#{CGI.escapeHTML(label(r[:option]))}</span></button>)
      else
        default = list.find { |r| r[:option].include?('(default)') }
        opts = list.map do |r|
          sel = r.equal?(default) ? ' data-state="selected"' : ''
          %(<button type="button" class="nds-btn nds-subtle nds-dropmenu-item"#{sel}#{hide[applies?(r, src)]} data-builder-option="#{CGI.escapeHTML("#{group}|#{r[:option]}")}"><span class="nds-label">#{CGI.escapeHTML(label(r[:option]))}</span></button>)
        end
        shown = list.any? { |r| r[:live] && applies?(r, src) }
        %(<div class="nds-dropmenu"#{hide[shown]}><button type="button" class="nds-btn nds-secondary-outline nds-md nds-menu-btn nds-dropmenu-trigger"><span class="nds-label">#{CGI.escapeHTML(default ? "#{group}: #{label(default[:option])}" : group)}</span></button><div class="nds-dropmenu-menu" hidden><div class="nds-dropmenu-scroll">#{opts.join}</div></div></div>)
      end
    end
    %(<div class="nds-toolbar" data-builder-for="#{id}"><div class="nds-bar-start">#{items.join}</div></div>\n) +
      %(<div class="nds-divider nds-4xl" style="--divider-line-start: 24px;">Preview</div>\n)
  end

  def self.stamp(html)
    builder_only = {}
    html.scan(CANON_RE) do |attrs, _|
      table = attr(attrs, 'data-variants')
      rows(html, table).each { |r| [r[:structure], *r[:inserts]].compact.each { |id| builder_only[id] = true } } if table
    end

    # Shared doc-section knobs (DOC_STYLE). Written at build, not by JS, so the page paints in its
    # final layout.
    html = html.sub('</head>', "<style>#{DOC_STYLE}</style>\n</head>")

    # Markdown backtick code gets the NDS inline-code look.
    html = html.gsub('<code class="language-plaintext highlighter-rouge">', '<code class="nds-inline-code lang-html">')
    # Table code is nowrap (it never splits at a hyphen), so a multi-part value
    # (`.a ~ * .b`) would widen its column. It stays ONE <code> (one value to any
    # reader) and moves the nowrap onto each part, so it wraps only at the spaces.
    html = html.gsub(%r{<td>.*?</td>}m) do |td|
      td.gsub(%r{<code class="nds-inline-code lang-html">([^<]* [^<]*)</code>}) do
        parts = Regexp.last_match(1).split(' ').map { |part| %(<span style="white-space:nowrap">#{part}</span>) }
        %(<code class="nds-inline-code lang-html" style="white-space:normal">#{parts.join(' ')}</code>)
      end
    end

    html.gsub(CANON_RE) do |whole|
      attrs, body = Regexp.last_match(1), Regexp.last_match(2)
      id = attr(attrs, 'id')
      next whole unless attr(attrs, 'data-canon') && !builder_only[id]

      src = dedent(body)
      lang = attr(attrs, 'data-lang') || 'html'
      out = +whole
      out << "\n"
      if lang == 'html' && attr(attrs, 'data-preview') != 'none'
        table = attr(attrs, 'data-variants')
        out << toolbar(id, rows(html, table), src) if table
        out << %(<div class="nds-block nds-card" style="#{preview_style(src.include?('nds-oncolor'))}">\n#{src}\n</div>\n)
      end
      out << code_block(lang, src)
    end
  end
end

Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
  next unless doc.output_ext == '.html' && doc.output&.include?('data-canon')

  doc.output = DocsCanon.stamp(doc.output)
end
