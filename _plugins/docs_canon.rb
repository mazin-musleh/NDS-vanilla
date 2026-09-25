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

  PLAIN_CODE_RE = %r{<code class="language-plaintext highlighter-rouge">(.*?)</code>}m
  TABLE_LANG = { 'Method' => 'js', 'Option' => 'js', 'Event' => 'js', 'Action key' => 'js', 'Property' => 'css' }.freeze

  # ponytail: a guess from the code's shape; a code that reads as neither takes its table's
  # language, else HTML. Upgrade to an explicit `{: .lang-x}` if a page needs one.
  def self.code_lang(code, kind = nil)
    c = CGI.unescapeHTML(code)
    return 'html' if c.match?(/\A(<|\.|\[|data-|aria-|nds-|canon )|\A[\w-]+="/)
    return 'css' if c.match?(/\A(--|(var|calc|color-mix|min|max)\()|\A-?[\d.]+(px|ms|s|%|rem|em)\z|\d(px|ms)\b/)
    return 'js' if c.match?(/\A(NDS\.|nds:|javascript:)|\A[a-z]\w*\(.*\)|\A\w+: |\A'.*'\z|\A\{.*\}\z/)

    kind || 'html'
  end

  # The group whose rows swap the whole markup. A reference page (grid) names it Example.
  def self.structure?(group) = %w[Structure Example].include?(group)

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
      # `canon #id` swaps the markup in the Structure (or Example) group; anywhere else it inserts a part block.
      if markup =~ /\Acanon #([\w-]+)\z/
        structure?(group) ? c[:structure] = Regexp.last_match(1) : (c[:inserts] ||= []) << Regexp.last_match(1)
      end
      c[:live] ||= markup != '—'
      (c[:targets] ||= []) << target if markup != '—' && !c[:structure]
    end
    choices.values
  end

  # ponytail: `tag.a.b:not(.c)` needs both classes and not c on one element of that tag; an
  # attribute or a descendant part counts as present. Upgrade to a real parser if a table needs one.
  def self.matches?(src, sel, js = nil)
    return true if sel == '—'
    # A `create()` row changes the JS form; `create({ k: v })` only one with that option,
    # `create():not({ k: v })` any but one with it.
    if sel.start_with?('create(')
      cond = sel[/\Acreate\(\{\s*(.+?)\s*\}\)\z/, 1]
      unless_cond = sel[/:not\(\{\s*(.+?)\s*\}\)\z/, 1]
      return !js.nil? && (cond.nil? || js.include?(cond)) && !(unless_cond && js.include?(unless_cond))
    end

    tag = sel[/\A([a-z][\w-]*)\./, 1]
    excluded = sel.scan(/:not\(\.([\w-]+)\)/).flatten
    classes = sel.gsub(/:not\([^)]*\)/, '').scan(/\.([\w-]+)/).flatten
    classes.empty? || src.scan(/<([a-z][\w-]*)[^>]*?\sclass="([^"]*)"/).any? { |t, cls| (tag.nil? || t == tag) && (classes - cls.split).empty? && (excluded & cls.split).empty? }
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
      own << ['html', base] if structure?(r[:group]) && !r[:structure]
      own.any? do |lang, text|
        choice[:targets].any? { |t| t != '—' && (lang == 'js' ? matches?('', t, text) : matches?(text, t)) }
      end
    end
    # Every structure holds it: the control can never be disabled, so it needs no hint.
    structures = rows.select { |r| structure?(r[:group]) }
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
    return "Not on #{names[missing].join(' or ')}" if providers.all? { |r| structure?(r[:group]) } && missing.size < providers.size

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

  # data-harness="form": the preview sits in a real NDS form with a Validate button, so a field's
  # validation can be tried. Preview only: the code block never shows the form.
  # The buttons show only while the field has a rule that can fail (nds-docs.js re-checks on
  # each choice), so they never sit there with nothing to test.
  RULE_RE = /\s(data-required|data-min-checked|data-max-checked|required|pattern|minlength|min|max)[\s=>]|\stype="(email|url)"|nds-required/

  def self.harness(src, kind)
    return src unless kind == 'form'

    %(<form class="nds-form" data-ajax><div data-demo-slot>\n#{src}\n</div><div class="nds-form-actions" data-demo-actions#{' hidden' unless src.match?(RULE_RE)}><button type="submit" class="nds-btn nds-primary nds-md"><span class="nds-label">Validate</span></button><button type="reset" class="nds-btn nds-subtle nds-md"><span class="nds-label">Reset</span></button></div></form>)
  end

  # On-color markup needs the deep surface behind it; everything else sits on a normal card.
  def self.preview_style(oncolor)
    "--card-width: 100%; --card-radius: var(--radius-md);#{' --card-bg: var(--background-primary-strong);' if oncolor}"
  end

  # Option markers: `(default)` pre-selects; `(demo: + Other)` also turns on option "Other" (demo
  # aid only); `(hint: text)` is a short description shown under the option in the sheet.
  def self.label(option) = option.gsub(/\s*\((default|demo:\s*\+[^)]*|hint:[^)]*)\)/, '')
  def self.hint(option) = option[/\(hint:\s*([^)]*)\)/, 1]

  # The Options button floats beside the section title (layout/section.md), icon-only on a phone;
  # it opens the sheet that holds every choice.
  def self.actions(id)
    options = %(<button type="button" class="nds-btn nds-neutral nds-md" data-panel-toggle="#{id}-options"><i class="hgi hgi-stroke hgi-filter-horizontal" aria-hidden="true"></i><span class="nds-label">Options</span></button>)
    %(<div class="nds-section-action nds-rowView nds-minimal" data-builder-for="#{id}">#{options}</div>)
  end

  # The options sheet: one labeled row of chips per group, single options last under "More".
  # A group whose default is "None" gets no None chip: tapping the chosen chip again turns it off.
  # A combo row ("Tags + Rating") gets no chip either: it is the markup used when those chips are
  # both on. A chip that does not apply is disabled, and its row label says why (touch has no
  # hover); a hint shows on hover. No backdrop, so the preview stays live above it.
  def self.sheet(id, rows, src, js, canons, side = 'bottom')
    groups = rows.group_by { |r| r[:group] }.select { |_, list| list.any? { |r| r[:live] } }
    multi, single = groups.partition { |_, list| list.size > 1 }
    esc = ->(t) { CGI.escapeHTML(t.to_s) }
    # Primary chips pick one of a set that always has a value; neutral chips can be turned off.
    chip = lambda do |group, r, sel, tone = 'neutral'|
      tip = hint(r[:option]) ? %( title="#{esc[hint(r[:option])]}") : ''
      %(<button type="button" class="nds-chip nds-#{tone} nds-rounded" aria-pressed="#{sel}"#{' data-state="selected"' if sel}#{' disabled' unless applies?(r, src, js)}#{tip} data-builder-option="#{esc["#{group}|#{r[:option]}"]}"><span class="nds-label">#{esc[label(r[:option])]}</span></button>)
    end
    row = lambda do |name, need, off, chips|
      text = off && !need.empty? ? "#{name} · #{need}" : name
      %(<div class="nds-divider nds-4xl nds-start" data-builder-group="#{esc[name]}"#{need.empty? ? '' : %( data-needs="#{esc[need]}")}>#{esc[text]}</div><div class="nds-chips">#{chips.join}</div>)
    end
    body = multi.map do |group, list|
      live = list.select { |r| r[:live] }
      default = list.find { |r| r[:option].include?('(default)') }
      none = default && label(default[:option]) == 'None'
      chips = list.reject { |r| (none && r.equal?(default)) || label(r[:option]).include?(' + ') }
      tone = none || list.any? { |r| label(r[:option]).include?(' + ') } ? 'neutral' : 'primary'
      row[group, needs(live.first, rows, canons, src), live.none? { |r| applies?(r, src, js) }, chips.map { |r| chip[group, r, !none && r.equal?(default), tone] }]
    end
    body << row['More', '', false, single.map { |group, (r)| chip[group, r, r[:option].include?('(default)')] }] if single.any?
    %(<aside id="#{id}-options" class="nds-panel" data-panel-side="#{side}" data-panel-static style="--panel-height: 45svh;" aria-label="Options" hidden><div class="nds-panel-header"><span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-filter-horizontal" aria-hidden="true"></i></span><div class="nds-panel-text"><span class="nds-panel-title">Options</span></div><div class="nds-panel-action"><button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Reset" data-builder-reset disabled><i class="nds-icon nds-hgi-refresh" aria-hidden="true"></i></button><button class="nds-btn nds-subtle nds-icon-only" type="button" data-panel-close aria-label="Close options"><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button></div></div><div class="nds-panel-body">#{body.join}</div></aside>)
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

    # Markdown backtick code gets the NDS inline-code look, in its own language. A JS or CSS
    # table (by its first header) sets the default for the codes in its name and value
    # columns; the last column is prose, so its codes go by their shape alone.
    tag = ->(src, kind = nil) { src.gsub(PLAIN_CODE_RE) { %(<code class="nds-inline-code lang-#{code_lang(Regexp.last_match(1), kind)}">#{Regexp.last_match(1)}</code>) } }
    html = html.gsub(%r{<table\b.*?</table>}m) do |table|
      kind = TABLE_LANG[text(table[%r{<th[^>]*>(.*?)</th>}m, 1].to_s)]
      cols = table.scan(/<th\b/).size
      table.gsub(%r{<tr>.*?</tr>}m) do |tr|
        i = -1
        tr.gsub(%r{<td\b.*?</td>}m) { |td| tag.call(td, (i += 1) < cols - 1 ? kind : nil) }
      end
    end
    html = tag.call(html)
    # Table code is nowrap (it never splits at a hyphen), so a multi-part value
    # (`.a ~ * .b`) would widen its column. It stays ONE <code> (one value to any
    # reader) and moves the nowrap onto each part, so it wraps only at the spaces.
    html = html.gsub(%r{<td>.*?</td>}m) do |td|
      td.gsub(%r{<code class="nds-inline-code lang-(\w+)">([^<]* [^<]*)</code>}) do
        lang = Regexp.last_match(1)
        parts = Regexp.last_match(2).split(' ').map { |part| %(<span style="white-space:nowrap">#{part}</span>) }
        %(<code class="nds-inline-code lang-#{lang}" style="white-space:normal">#{parts.join(' ')}</code>)
      end
    end

    # A prose column keeps a readable width on a phone; the table scrolls in its wrapper instead.
    html = html.gsub(%r{<th>(Effect|Controls|Holds|Detail|Use)</th>}, '<th style="min-width: 320px">\1</th>')

    builders = []
    html = html.gsub(CANON_RE) do |whole|
      attrs, body = Regexp.last_match(1), Regexp.last_match(2)
      id = attr(attrs, 'id')
      next whole unless attr(attrs, 'data-canon') && !builder_only[id]

      src = dedent(body)
      lang = attr(attrs, 'data-lang') || 'html'
      out = +whole
      out << "\n"
      # data-js names the builder's JS form: the same component as one create() call.
      js = canons[attr(attrs, 'data-js')]&.last
      table = attr(attrs, 'data-variants')
      preview = lang == 'html' && attr(attrs, 'data-preview') != 'none'
      # data-live: a page-shell canon changes the page's own copy (its footer), not a preview card.
      builder = lang == 'html' && table && (preview || attr(attrs, 'data-live'))
      builders << id if builder
      if preview
        out << %(<div class="nds-divider nds-xl" style="margin-block-start: 0; --divider-line-start: 24px;">Preview</div>\n) if table
        out << %(<div class="nds-block nds-card" style="#{preview_style(src.include?('nds-oncolor'))}">\n#{harness(src, attr(attrs, 'data-harness'))}\n</div>\n)
      end
      out << (js ? code_tabs(id, src, js) : code_block(lang, src))
      out << "\n" << sheet(id, rows(html, table), src, js, canons, attr(attrs, 'data-sheet') || 'bottom') if builder
      out
    end

    # A float action is the head's first child.
    builders.each do |id|
      head = html.rindex('<div class="nds-section-head">', html.index(%(<script type="text/html" id="#{id}")))
      html = html.insert(head + '<div class="nds-section-head">'.size, actions(id)) if head
    end
    html
  end
end

Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
  next unless doc.output_ext == '.html' && doc.output&.include?('data-canon')

  doc.output = DocsCanon.stamp(doc.output)
end
