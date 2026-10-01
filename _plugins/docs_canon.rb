# frozen_string_literal: true

# Doc canon blocks — `<script type="text/html" data-canon>` on a doc page holds a component's
# markup once. This hook writes its options, preview and code block into the built
# HTML. Build time, not a JS stamp: the fold gate paints content before deferred scripts run,
# so a JS stamp jumped the page (0.46 cold-load CLS). _js/nds-docs.js only wires the toolbar.
# Runs on Pages via the Actions workflow; restart `jekyll serve` after editing this file.
require 'cgi'

module DocsCanon
  CANON_RE = %r{<script type="text/html"([^>]*)>(.*?)</script>}m
  # Knobs only, scoped to the skeleton section classes (nds-doc-{name}).
  DOC_STYLE = '.nds-doc-features .nds-definition-list{--max-col:2;--mid-col:1;--min-col:1;--dl-icon-size:24px;--row-gap:24px;--col-gap:32px}' \
              '.nds-doc-variants .nds-table{--min-width:900px}' \
              '[data-builder-group]{--divider-line-start:24px}' \
              '.nds-chip[data-builder-option][aria-disabled]{pointer-events:auto}' \
              '.nds-doc-grid{--_grid-line:color-mix(in srgb,var(--divider-color) 50%,transparent);background-image:linear-gradient(var(--_grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--_grid-line) 1px,transparent 1px);background-size:24px 24px;background-position:right 12px top 12px}' \
              ':is(html[dir="ltr"],.ltr) .nds-doc-grid{background-position:12px 12px}' \
              '.nds-builder-options>.nds-divider:first-child{margin-block-start:0}' \
              '.nds-builder-options{margin-block-end:var(--spacing-4xl)}' \
              '.nds-card.nds-doc-frame{--card-width:100%;--card-radius:var(--radius-md);min-height:200px;display:flex;justify-content:center;align-items:center}' \
              '.nds-card.nds-doc-preview{padding-block:56px;--card-gap:0}' \
              '.nds-doc-oncolor{--card-bg:var(--background-primary-strong)}' \
              '.nds-divider.nds-doc-divider{margin-block-start:0;--divider-line-start:24px}' \
              '.nds-doc-view{position:absolute;inset-block-start:12px;inset-inline-end:12px}' \
              '.nds-doc-preview>[data-demo-slot]:not(.nds-flex){display:contents}' \
              '.nds-doc-preview .nds-form-actions+.nds-alert{margin-block-start:var(--spacing-2xl)}' \
              '.nds-doc-preview .nds-full-width{width:auto!important;margin-inline:calc(var(--_wrapper-padding,0px)*-1)}' \
              '.nds-doc-options{--panel-height:30svh}' \
              '@media (width < 600px){.nds-doc-options{--panel-height:35svh}}' \
              ':root[data-theme~="dark"] [data-preview-dark]{display:none}' # a dark site has nothing to toggle to

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
      (c[:adds] ||= []) << markup if markup =~ /\A(\.[\w-]+|\[[\w-]+(~?="[^"]*")?\])\z/
      # A `—` row with a target (a default that fits only some structures) is checked too.
      (c[:targets] ||= []) << target if (markup != '—' || !['—', ''].include?(target)) && !c[:structure]
    end
    choices.values
  end

  # ponytail: `tag.a.b[x]:not(.c):not([y])` needs both classes and x, and neither c nor y, on one
  # element of that tag; x counts by name only, y by its `="v"` or `~="v"` too, a descendant part as present.
  # `:has(> tag)` needs that tag anywhere in the markup, `:has(.cls)` an element with that class.
  # Upgrade to a real parser if a table needs x's value or descendants.
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
    no_attrs = sel.scan(/:not\(\[([\w-]+)(?:(~?=)"([^"]*)")?/)
    has_tags = sel.scan(/:has\(>?\s*([a-z][\w-]*)\)/).flatten
    return false unless has_tags.all? { |t| src.include?("<#{t}") }
    has_classes = sel.scan(/:has\(>?\s*\.([\w-]+)\)/).flatten
    return false unless has_classes.all? { |c| src.scan(/\sclass="([^"]*)"/).flatten.any? { |v| v.split.include?(c) } }
    has_attrs = sel.scan(/:has\(>?\s*\[([\w-]+)(?:="([^"]*)")?\]\)/)
    return false unless has_attrs.all? { |n, v| src.match?(v ? /\s#{n}="#{Regexp.escape(v)}"/ : /\s#{n}[\s=>]/) }
    own = sel.gsub(/:(?:not|has)\([^)]*\)/, '')
    classes = own.gsub(/\[[^\]]*\]/, '').scan(/\.([\w-]+)/).flatten
    attrs = own.scan(/\[([\w-]+)/).flatten
    return true if classes.empty? && attrs.empty?

    src.scan(/<([a-z][\w-]*)([^>]*)>/).any? do |t, a|
      cls = (a[/\sclass="([^"]*)"/, 1] || '').split
      vals = a.scan(/\s([\w-]+)(?:="([^"]*)")?/).to_h
      no = no_attrs.any? { |n, op, v| vals.key?(n) && (op.nil? || (op == '=' ? vals[n] == v : vals[n].to_s.split.include?(v))) }
      (tag.nil? || t == tag) && (classes - cls).empty? && (excluded & cls).empty? &&
        (attrs - vals.keys).empty? && !no
    end
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
      # A JS part is a run of options inside a call, not a call, so it never provides a create() target.
      own = [r[:structure], *r[:inserts]].compact.map { |cid| canons[cid] }
      own.reject! { |lang, _| lang == 'js' } unless r[:structure]
      own << ['html', base] if structure?(r[:group]) && !r[:structure]
      own.any? do |lang, text|
        choice[:targets].any? { |t| t != '—' && (lang == 'js' ? matches?('', t, text) : matches?(text, t)) }
      end || adds?(r, choice)
    end
    # Every structure holds it: the control can never be disabled, so it needs no hint.
    structures = rows.select { |r| structure?(r[:group]) }
    return '' if structures.any? && (structures - providers).empty?

    sizes = rows.group_by { |r| r[:group] }.transform_values(&:size)
    names = lambda do |list|
      list.group_by { |r| r[:group] }.map do |group, rs|
        opts = rs.map { |r| label(r[:option]) }
        sizes[group] == 1 ? opts.first : "#{group.sub(' (any)', '')}: #{opts.size > 1 ? "#{opts[0..-2].join(', ')} or #{opts.last}" : opts.first}"
      end
    end
    # Most structures hold it: name the few that do not ("Not on Structure: Link card").
    missing = structures - providers
    return "Not on #{names[missing].join(' or ')}" if providers.all? { |r| structure?(r[:group]) } && missing.size < providers.size

    list = names[providers]
    return "Needs #{list.join(' or ')}" unless list.empty?

    # Options a target's `:not()` names turn this one off ("Range" is not with Format: Month).
    blockers = rows.reject { |r| r.equal?(choice) }.select { |r| adds?(r, choice, negated: true) }
    blockers.empty? ? '' : "Not with #{names[blockers].join(' or ')}"
  end

  # An option that adds the class or attribute a choice's target asks for ("Stroke" needs Card),
  # or with `negated`, one its `:not()` excludes. A bare `[attr]` there excludes any value.
  def self.adds?(r, choice, negated: false)
    (r[:adds] || []).any? do |m|
      choice[:targets].any? do |t|
        part = negated ? t.scan(/:not\((.*?)\)(?=:|\s|\z)/).flatten.join(' ') : t.gsub(/:(?:not|has)\([^)]*\)/, '')
        next part.scan(/\.([\w-]+)/).flatten.include?(m[1..]) if m.start_with?('.')

        part.include?(m) || (negated && part.include?("[#{m[/\[([\w-]+)/, 1]}]"))
      end
    end
  end

  # HTML and JS forms of one builder: the canonical tabbed code block (components/code.md).
  def self.code_tabs(id, html_src, js_src)
    tabs = [['html', 'HTML', html_src], ['js', 'JS', js_src]]
    list = tabs.each_with_index.map do |(lang, name, _), i|
      %(<button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="#{i.zero?}" aria-controls="#{id}-panel-#{lang}" id="#{id}-tab-#{lang}"><span class="nds-label">#{name}</span></button>)
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
  RULE_RE = /\s(data-required|data-strict|data-min-checked|data-max-checked|required|pattern|minlength|min|max)[\s=>]|\stype="(email|url)"|nds-required|nds-date-input|nds-time-input/

  # The demo sits in a slot, so a re-render keeps the card's view toggles.
  # data-preview="run": the component leaves the card (a FAB docks at the screen edge), so the card
  # holds Run (or `data-run-label`) and Clear, as a toast's does. Runs mount in the held box (nds-docs.js).
  # `data-demo-width` on the canon fixes the slot's width, for a field that would stretch or shrink to its content.
  def self.harness(src, kind, run = nil, width = nil)
    return %(<div class="nds-flex" data-demo-run><button type="button" class="nds-btn nds-primary nds-md" data-run><span class="nds-label">#{run}</span></button><button type="button" class="nds-btn nds-subtle nds-md" data-run-clear><span class="nds-label">Clear</span></button></div><div data-demo-held></div>) if run
    slot = width ? %(<div data-demo-slot class="nds-flex nds-col" style="width:#{width};max-width:100%">) : '<div data-demo-slot>'
    return %(#{slot}\n#{src}\n</div>) unless kind == 'form'

    %(<form class="nds-form" data-ajax>#{slot}\n#{src}\n</div><div class="nds-form-actions" data-demo-actions#{' hidden' unless src.match?(RULE_RE)}><button type="submit" class="nds-btn nds-primary nds-md"><span class="nds-label">Validate</span></button><button type="reset" class="nds-btn nds-subtle nds-md"><span class="nds-label">Reset</span></button></div></form>)
  end

  # data-preview="panel": the markup needs a page around it (a TOC over a long article), so the card
  # holds Preview (or `data-run-label`), which opens a tall, resizable bottom panel; nds-docs.js mounts
  # the code shown in its body. The body zeroes the nav height, so sticky parts pin to its top. `data-preview-flush` gives the body
  # nds-flush, for markup that brings its own padding (a section).
  def self.stage(id, label, flush)
    btn = ->(attr, label, icon) { %(<button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" #{attr} aria-label="#{label}"><i class="nds-icon nds-hgi-#{icon}" aria-hidden="true"></i></button>) }
    action = btn['data-panel-resize="shrink"', 'Make preview smaller', 'minus-sign'] + btn['data-panel-resize="grow"', 'Make preview larger', 'plus-sign'] + btn['data-panel-close', 'Close preview', 'cancel-01']
    panel = %(<aside id="#{id}-stage" class="nds-panel" data-panel-side="bottom" data-panel-modal style="--panel-height: 80svh" aria-label="Preview" hidden><div class="nds-panel-header"><span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-eye" aria-hidden="true"></i></span><div class="nds-panel-text"><span class="nds-panel-title">Preview</span></div><div class="nds-panel-action"><div class="nds-btn-group nds-seamless">#{action}</div></div></div><div class="nds-panel-body#{' nds-flush' if flush}" data-demo-stage style="--nds-nav-height: 0px"></div></aside>)
    [%(<button type="button" class="nds-btn nds-primary nds-lg" data-panel-toggle="#{id}-stage"><span class="nds-label">#{label}</span></button>), panel]
  end

  # Option markers: `(default)` pre-selects; `(demo: + x)` also turns on the row marked `(id: x)`
  # (demo aid only); `(hint: text)` is a short description shown under the option in the sheet.
  def self.label(option) = option.gsub(/\s*\((default|demo:\s*\+[^)]*|hint:[^)]*|id:[^)]*)\)/, '')
  def self.hint(option) = option[/\(hint:\s*([^)]*)\)/, 1]

  # Every preview card carries its own Dark mode and Grid lines toggles, in its top corner.
  def self.view
    dark = %(<button type="button" class="nds-btn nds-secondary-outline nds-icon-only nds-sm" data-preview-dark aria-pressed="false" aria-label="Dark mode"><i class="nds-icon nds-hgi-moon-02" aria-hidden="true"></i></button>)
    grid = %(<button type="button" class="nds-btn nds-secondary-outline nds-icon-only nds-sm" data-preview-grid aria-pressed="true" aria-label="Grid lines"><i class="hgi hgi-stroke hgi-grid-off" aria-hidden="true"></i></button>)
    %(<div class="nds-btn-group nds-doc-view">#{dark}#{grid}</div>)
  end

  # The Options button floats beside the section title (layout/section.md), icon-only on a phone,
  # with Reset beside it, one button group. The group class sits on the action itself: nested, it
  # would miss .nds-minimal's `> .nds-btn` rules.
  def self.actions(id, panel)
    reset = %(<button type="button" class="nds-btn nds-secondary-outline nds-icon-only nds-md" data-builder-reset aria-label="Reset"><i class="nds-icon nds-hgi-refresh" aria-hidden="true"></i></button>)
    toggle = panel ? %(data-panel-toggle="#{id}-options") : %(data-builder-toggle aria-controls="#{id}-options" aria-expanded="false")
    options = %(<button type="button" class="nds-btn nds-secondary-outline nds-md" #{toggle}><i class="hgi hgi-stroke hgi-filter-horizontal" aria-hidden="true"></i><span class="nds-label">Options</span></button>)
    %(<div class="nds-section-action nds-btn-group nds-rowView nds-minimal" data-builder-for="#{id}">#{options}#{reset}</div>)
  end

  # The options: one labeled row of chips per group, single options last under "More". Up to 3
  # rows sit inline above the preview; more open in a bottom panel, so the preview stays in view
  # while the rows scroll. `data-options="inline|panel"` on the canon picks one (a panel demo
  # needs inline: its own panel would close the options panel).
  # A group whose default is "None" gets no None chip: tapping the chosen chip again turns it off.
  # A combo row ("Tags + Rating") gets no chip either: it is the markup used when those chips are
  # both on. A chip that does not apply is disabled, and its tooltip says why; a hint shows
  # on hover. `data-sheet="top"` (a shell page) opens a top panel instead.
  # Returns [html, panel?].
  def self.options(id, rows, src, js, canons, mode, side)
    groups = rows.group_by { |r| r[:group] }.select { |_, list| list.any? { |r| r[:live] } }
    # `Group (any)`: each chip turns on and off by itself, so parts that stack need no combo rows.
    any, rest = groups.partition { |g, _| g.end_with?(' (any)') }
    multi, single = rest.partition { |_, list| list.size > 1 }
    esc = ->(t) { CGI.escapeHTML(t.to_s) }
    # Primary chips pick one of a set that always has a value; neutral chips can be turned off.
    # One hover tooltip per chip: its hint while on, its reason while off; nds-docs.js swaps the text.
    # aria-disabled, not disabled: a disabled button gets no hover, focus or tap.
    chip = lambda do |group, r, sel, tone = 'neutral'|
      tip = hint(r[:option]).to_s
      need = needs(r, rows, canons, src)
      off = !applies?(r, src, js)
      state = [('selected' if sel), ('disabled' if off)].compact.join(' ')
      msg = off && !need.empty? ? need : (tip.empty? ? need : tip)
      tooltip = msg.empty? ? '' : %( data-tooltip-hover="#{off ? 0 : 500}" data-tooltip-message="#{esc[msg]}"#{%( data-hint="#{esc[tip]}") unless tip.empty?}#{%( data-reason="#{esc[need]}") unless need.empty?})
      %(<button type="button" class="nds-chip nds-#{tone} nds-rounded#{' nds-tooltip' unless msg.empty?}" aria-pressed="#{sel}"#{%( data-state="#{state}") unless state.empty?}#{' aria-disabled="true"' if off}#{tooltip} data-builder-option="#{esc["#{group}|#{r[:option]}"]}"><span class="nds-label">#{esc[label(r[:option])]}</span></button>)
    end
    row = lambda do |name, chips|
      %(<div class="nds-divider nds-4xl" data-builder-group="#{esc[name]}">#{esc[name]}</div><div class="nds-chips">#{chips.join}</div>)
    end
    body = multi.map do |group, list|
      default = list.find { |r| r[:option].include?('(default)') }
      none = default && label(default[:option]) == 'None'
      chips = list.reject { |r| (none && r.equal?(default)) || label(r[:option]).include?(' + ') }
      tone = none || list.any? { |r| label(r[:option]).include?(' + ') } ? 'neutral' : 'primary'
      row[group, chips.map { |r| chip[group, r, !none && r.equal?(default), tone] }]
    end
    any.each { |group, list| body << row[group.delete_suffix(' (any)'), list.map { |r| chip[group, r, false] }] }
    body << row['More', single.map { |group, (r)| chip[group, r, r[:option].include?('(default)')] }] if single.any?
    panel = side || (mode ? mode == 'panel' : body.size > 3)
    return [%(<div id="#{id}-options" class="nds-builder-options" role="group" aria-label="Options" hidden>#{body.join}</div>\n), false] unless panel

    # No backdrop, so the preview stays live above it.
    [%(<aside id="#{id}-options" class="nds-panel nds-doc-options" data-panel-side="#{side || 'bottom'}" data-panel-static aria-label="Options" hidden><div class="nds-panel-header"><span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-filter-horizontal" aria-hidden="true"></i></span><div class="nds-panel-text"><span class="nds-panel-title">Options</span></div><div class="nds-panel-action"><div class="nds-btn-group nds-seamless"><button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-panel-resize="shrink" aria-label="Make options smaller"><i class="nds-icon nds-hgi-minus-sign" aria-hidden="true"></i></button><button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-panel-resize="grow" aria-label="Make options larger"><i class="nds-icon nds-hgi-plus-sign" aria-hidden="true"></i></button><button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-panel-close aria-label="Close options"><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button></div></div></div><div class="nds-panel-body">#{body.join}</div></aside>\n), true]
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
      # data-live: a page-shell canon changes the page's own copy (its footer); its preview card
      # holds a button that scrolls there.
      live = attr(attrs, 'data-live')
      builder = lang == 'html' && table && (preview || live)
      if builder
        sheet, panel = options(id, rows(html, table), src, js, canons, attr(attrs, 'data-options'), attr(attrs, 'data-sheet'))
        builders << [id, panel]
        out << sheet
      end
      if preview || (builder && live)
        out << %(<div class="nds-divider nds-xl nds-doc-divider">Preview</div>\n) if table
        demo = preview ? harness(src, attr(attrs, 'data-harness'), attr(attrs, 'data-preview') == 'run' && (attr(attrs, 'data-run-label') || 'Run'), attr(attrs, 'data-demo-width')) : %(<button type="button" class="nds-btn nds-primary nds-lg" data-builder-live="#{id}"><span class="nds-label">View live copy</span><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i></button>)
        demo, stage_panel = stage(id, attr(attrs, 'data-run-label') || 'Preview', attrs.include?('data-preview-flush')) if attr(attrs, 'data-preview') == 'panel'
        # A builder's card names its builder, so Dark reaches the code too.
        card = preview ? %( nds-doc-preview"#{%( data-builder-card="#{id}") if builder}) : '"'
        # On-color markup sits on the deep primary surface; data-theme gives the grid and toggles their look on it.
        oncolor = preview && src.include?('nds-oncolor')
        out << %(<div class="nds-block nds-card nds-doc-frame nds-doc-grid#{' nds-doc-oncolor' if oncolor}#{card}#{' data-theme="dark"' if oncolor}>\n#{view if preview && !stage_panel}#{demo}\n</div>\n)
        out << "#{stage_panel}\n" if stage_panel
      end
      # data-code="none": a behavior demo, shown with no code.
      out << (js ? code_tabs(id, src, js) : code_block(lang, src)) unless attr(attrs, 'data-code') == 'none'
      out
    end

    # A float action is the head's first child.
    builders.each do |id, panel|
      head = html.rindex('<div class="nds-section-head">', html.index(%(<script type="text/html" id="#{id}")))
      html = html.insert(head + '<div class="nds-section-head">'.size, actions(id, panel)) if head
    end
    html
  end
end

Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
  next unless doc.output_ext == '.html' && doc.output&.include?('data-canon')

  doc.output = DocsCanon.stamp(doc.output)
end
