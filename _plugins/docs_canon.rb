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
      target = target.to_s.sub(/\s*\((start|end|after)\)\z/, '')
      # `canon #id` swaps the markup in the Structure group; anywhere else it inserts a part block.
      if markup =~ /\Acanon #([\w-]+)\z/
        group == 'Structure' ? c[:structure] = Regexp.last_match(1) : (c[:inserts] ||= []) << Regexp.last_match(1)
      end
      c[:live] ||= markup != '—'
      (c[:targets] ||= []) << target if markup != '—' && !c[:structure]
    end
    choices.values
  end

  # ponytail: `tag.a.b` needs both classes on one element of that tag; an attribute or a
  # descendant part counts as present. Upgrade to a real parser if a table needs one.
  def self.matches?(src, sel, js = nil)
    return true if sel == '—'
    # A `create()` row changes the JS form; `create({ k: v })` only one with that option.
    if sel.start_with?('create(')
      cond = sel[/\Acreate\(\{\s*(.+?)\s*\}\)\z/, 1]
      return !js.nil? && (cond.nil? || js.include?(cond))
    end

    tag = sel[/\A([a-z][\w-]*)\./, 1]
    classes = sel.scan(/\.([\w-]+)/).flatten
    classes.empty? || src.scan(/<([a-z][\w-]*)[^>]*?\sclass="([^"]*)"/).any? { |t, cls| (tag.nil? || t == tag) && (classes - cls.split).empty? }
  end

  # A choice is enabled only when the element it changes is in the current markup ("Row" needs a group).
  def self.applies?(choice, src, js = nil)
    choice[:structure] || !choice[:targets] || choice[:targets].any? { |t| matches?(src, t, js) }
  end

  # "Needs Actions": the choices whose structure or part canon holds the element a choice changes.
  # The default structure's canon is the base markup.
  def self.needs(choice, rows, canons, base)
    return '' unless choice[:targets]

    providers = rows.reject { |r| r.equal?(choice) }.select do |r|
      own = [r[:structure], *r[:inserts]].compact.map { |cid| canons[cid] }
      own << ['html', base] if r[:group] == 'Structure' && !r[:structure]
      own.any? do |lang, text|
        choice[:targets].any? { |t| t != '—' && (lang == 'js' ? matches?('', t, text) : matches?(text, t)) }
      end
    end
    # Every structure holds it: the control can never be disabled, so it needs no hint.
    structures = rows.select { |r| r[:group] == 'Structure' }
    return '' if structures.any? && (structures - providers).empty?

    sizes = rows.group_by { |r| r[:group] }.transform_values(&:size)
    names = lambda do |list|
      list.group_by { |r| r[:group] }.map do |group, rs|
        opts = rs.map { |r| label(r[:option]) }
        sizes[group] == 1 ? opts.first : "#{group}: #{opts.size > 1 ? "#{opts[0..-2].join(', ')} or #{opts.last}" : opts.first}"
      end
    end
    # Most structures hold it: name the few that do not ("Not on Structure: Link card").
    missing = structures - providers
    return "Not on #{names[missing].join(' or ')}" if providers.all? { |r| r[:group] == 'Structure' } && missing.size < providers.size

    list = names[providers]
    list.empty? ? '' : "Needs #{list.join(' or ')}"
  end

  # HTML and JS forms of one builder: the canonical tabbed code block (components/code.md).
  def self.code_tabs(id, html_src, js_src)
    tabs = [['html', 'HTML', html_src], ['js', 'JS', js_src]]
    list = tabs.each_with_index.map do |(lang, name, _), i|
      %(<button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="#{i.zero?}" aria-controls="#{id}-panel-#{lang}" id="#{id}-tab-#{lang}"><span class="nds-tab-label">#{name}</span></button>)
    end
    panels = tabs.each_with_index.map do |(lang, _, src), i|
      %(<div class="nds-tab-panel code-example" role="tabpanel" id="#{id}-panel-#{lang}" aria-labelledby="#{id}-tab-#{lang}"#{' hidden' unless i.zero?}><div class="nds-code-action"><button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example"><i class="nds-icon nds-hgi-copy-01"></i></button></div><code class="lang-#{lang} code">
#{CGI.escapeHTML(src)}
</code></div>)
    end
    %(<div class="nds-tabs nds-code nds-divided"><div class="nds-tab-list-container nds-scroll-more"><nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Code language">#{list.join}</nav><button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i></button></div><div class="nds-tab-content">#{panels.join}</div></div>)
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

  def self.toolbar(id, rows, src, js, canons)
    # A group whose every row changes nothing (e.g. "Field states → Forms") is reference only.
    groups = rows.group_by { |r| r[:group] }.select { |_, list| list.any? { |r| r[:live] } }
    off = ->(on) { on ? '' : ' disabled' }
    # A control that does not apply yet stays in place, disabled; its wrapper says what turns it on
    # (a disabled button takes no pointer events, so the hover lands on the wrapper).
    tip = ->(on, need) { need.empty? ? '' : %( data-needs="#{CGI.escapeHTML(need)}"#{%( title="#{CGI.escapeHTML(need)}") unless on}) }
    # Dropmenus first, then toggles, each in table order.
    groups = groups.partition { |_, list| list.size > 1 }.flatten(1)
    items = groups.map do |group, list|
      if list.size == 1
        r = list.first
        on = applies?(r, src, js)
        %(<span#{tip[on, needs(r, rows, canons, src)]}><button type="button" class="nds-chip nds-neutral nds-rounded" aria-pressed="false"#{off[on]} data-builder-option="#{CGI.escapeHTML("#{group}|#{r[:option]}")}"><span class="nds-label">#{CGI.escapeHTML(label(r[:option]))}</span></button></span>)
      else
        default = list.find { |r| r[:option].include?('(default)') }
        opts = list.map do |r|
          sel = r.equal?(default) ? ' data-state="selected"' : ''
          %(<button type="button" class="nds-btn nds-subtle nds-dropmenu-item"#{sel}#{off[applies?(r, src, js)]} data-builder-option="#{CGI.escapeHTML("#{group}|#{r[:option]}")}"><span class="nds-label">#{CGI.escapeHTML(label(r[:option]))}</span></button>)
        end
        live = list.select { |r| r[:live] }
        on = live.any? { |r| applies?(r, src, js) }
        %(<div class="nds-dropmenu"#{tip[on, needs(live.first, rows, canons, src)]}><button type="button" class="nds-btn nds-secondary-outline nds-md nds-menu-btn nds-dropmenu-trigger"#{off[on]}><span class="nds-label">#{CGI.escapeHTML(default ? "#{group}: #{label(default[:option])}" : group)}</span></button><div class="nds-dropmenu-menu" hidden><div class="nds-dropmenu-scroll">#{opts.join}</div></div></div>)
      end
    end
    reset = %(<button type="button" class="nds-btn nds-subtle nds-sm" data-builder-reset disabled><i class="nds-icon nds-hgi-refresh" aria-hidden="true"></i><span class="nds-label">Reset</span></button>)
    %(<div class="nds-toolbar" data-builder-for="#{id}"><div class="nds-bar-start">#{items.join}#{reset}</div></div>\n) +
      %(<div class="nds-divider nds-4xl" style="--divider-line-start: 24px;">Preview</div>\n)
  end

  def self.stamp(html)
    builder_only = {}
    canons = {}
    html.scan(CANON_RE) do |attrs, body|
      canons[attr(attrs, 'id')] = [attr(attrs, 'data-lang') || 'html', dedent(body)]
      builder_only[attr(attrs, 'data-js')] = true if attr(attrs, 'data-js')
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
      # data-js names the builder's JS form: the same component as one create() call.
      js = canons[attr(attrs, 'data-js')]&.last
      if lang == 'html' && attr(attrs, 'data-preview') != 'none'
        table = attr(attrs, 'data-variants')
        out << toolbar(id, rows(html, table), src, js, canons) if table
        out << %(<div class="nds-block nds-card" style="#{preview_style(src.include?('nds-oncolor'))}">\n#{src}\n</div>\n)
      end
      out << (js ? code_tabs(id, src, js) : code_block(lang, src))
    end
  end
end

Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
  next unless doc.output_ext == '.html' && doc.output&.include?('data-canon')

  doc.output = DocsCanon.stamp(doc.output)
end
