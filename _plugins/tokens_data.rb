# frozen_string_literal: true

require 'cgi'

# Parses the design-token SCSS partials at build time and exposes them as
# `site.data.tokens.packs`, so components/tokens.md renders the token catalog
# without hand-copying values (which would drift from the SCSS). Each pack is
# one builder choice on that page: `html` is its preview, `css` its code, the
# pack's rules as the source writes them.
#
# Source of truth (names, values and selectors read verbatim):
#   _sass/tokens/_primitives.scss   spacing / radius / typography / shell / font
#   _sass/themes/_dga.scss          the --colors-* palette
#   _sass/tokens/_semantic.scss     meanings, plus the status alpha ramp
#   _sass/tokens/_components.scss   per-component tokens, `// ── name ──` headers
module NDS
  class TokensGenerator < Jekyll::Generator
    safe true
    priority :normal

    SOURCES = %w[_sass/tokens/_primitives.scss _sass/themes/_dga.scss
                 _sass/tokens/_semantic.scss _sass/tokens/_components.scss].freeze
    COMPONENTS = '_sass/tokens/_components.scss'

    # `--name: value;` on its own line. Commented-out declarations start with `//`.
    DECL = /\A\s*(--[A-Za-z0-9-]+)\s*:\s*([^;]+);/
    # Box-drawing dash in the `// ── name ──` headers of _components.scss.
    BOX = "─"
    DARK = ':root[data-theme~="dark"]'
    # A value that paints a color: a hex, or an alias of a color token.
    COLOR = /\A(#|var\(--(colors|background|text|border|icon|controls|focus|divider)-)/

    # [id, label, tier, name pattern], first match wins; component tokens go by file.
    # The ids are fixed: components/tokens.md names each pack's canons by them.
    PACKS = [
      ['spacing',    'Spacing',              'Primitive', /\A--spacing-/],
      ['radius',     'Radius',               'Primitive', /\A--radius-/],
      ['typography', 'Typography',           'Primitive', /\A--typo-/],
      ['font',       'Font',                 'Primitive', /\A--(nds-font|font-weight)-/],
      ['shell',      'Layout & shell',       'Primitive', /\A--(nds|paragraph)-/],
      ['brand',      'Brand colors',         'Palette',   /\A--colors-(primary|secondary|tertiary|neutral)-/],
      ['fixed',      'Base, status & alpha', 'Palette',   /\A--colors-/],
      ['background', 'Background',           'Semantic',  /\A--(background|img)-/],
      ['text',       'Text',                 'Semantic',  /\A--text-/],
      ['border',     'Border & focus',       'Semantic',  /\A--(border|focus|divider)-/],
      ['icon',       'Icon',                 'Semantic',  /\A--icon-/],
      ['controls',   'Controls',             'Semantic',  /\A--controls-/],
      ['shadow',     'Shadow',               'Semantic',  /\A--shadow-/],
      ['component',  'Component',            'Component', nil]
    ].freeze

    def generate(site)
      decls = SOURCES.flat_map { |rel| read_decls(site, rel) }
      darks = decls.select { |d| d[:dark] }.to_h { |d| [d[:name], d] }
      # The first light declaration wins: primitives repeat one token in a mobile block.
      lights = decls.reject { |d| d[:dark] }.uniq { |d| d[:name] }

      packs = PACKS.to_h do |id, label, tier, _|
        rows = lights.select { |d| pack_of(d) == id }
        [id, { 'label' => label, 'tier' => tier, 'count' => rows.size,
               'html' => preview(id, tier, rows, darks), 'css' => css(rows, darks) }]
      end
      site.data['tokens'] = { 'packs' => packs }
    end

    private

    # Each declaration with its rule's selector, whether that rule is the dark block, and
    # (components) the `// ── name ──` group it sits under.
    def read_decls(site, rel)
      path = File.join(site.source, rel)
      return [] unless File.file?(path)

      sel = []
      rule = nil
      group = nil
      comment = false
      File.read(path, encoding: 'UTF-8').each_line.filter_map do |line|
        s = line.strip
        comment = true if s.start_with?('/*')
        if comment
          comment = false if s.include?('*/')
          next
        end
        if s.start_with?('//')
          group = s.sub(%r{\A//\s*}, '').delete(BOX).strip.sub(/\s*\(.*\)\z/, '') if s.include?(BOX)
          next
        end
        m = DECL.match(line)
        if m
          { name: m[1], value: m[2].strip, sel: rule, dark: rule.to_s.include?(DARK),
            group: group, file: rel }
        elsif s.end_with?(',')
          sel << s
          nil
        elsif s.end_with?('{')
          rule = (sel << s.chomp('{').strip).join("\n")
          sel = []
          nil
        end
      end
    end

    def pack_of(d)
      return 'component' if d[:file] == COMPONENTS

      PACKS.find { |_, _, _, re| re&.match?(d[:name]) }&.first
    end

    def h(text) = CGI.escapeHTML(text.to_s)
    def code(text) = %(<code class="nds-inline-code lang-css">#{h(text)}</code>)

    # The pack's rules as the source writes them: each light rule, then the dark rule with the
    # tokens that have a dark value. Component tokens get a comment per component.
    # ponytail: rules inside a media block (the mobile --nds-viewport-padding) are left out.
    def css(rows, darks)
      rules = rows.group_by { |d| d[:sel] }.map { |sel, list| rule(sel, list) }
      dark = rows.filter_map { |d| darks[d[:name]]&.merge(group: d[:group]) }
      rules << rule(dark.first[:sel], dark) unless dark.empty?
      rules.join("\n\n")
    end

    def rule(sel, list)
      group = nil
      body = list.flat_map do |d|
        head = d[:group] && d[:group] != group ? ["  /* #{group = d[:group]} */"] : []
        head + ["  #{d[:name]}: #{d[:value]};"]
      end
      "#{sel} {\n#{body.join("\n")}\n}"
    end

    def preview(id, tier, rows, darks)
      case id
      when 'brand', 'fixed' then ramps(rows)
      when 'typography' then type_sizes(rows)
      else table(rows, %w[Semantic Component].include?(tier) && darks)
      end
    end

    # One strip per ramp (`--colors-{ramp}-{step}`), a swatch per step.
    def ramps(rows)
      strips = rows.group_by { |d| d[:name].delete_prefix('--colors-').sub(/-[^-]+\z/, '') }.map do |ramp, list|
        steps = list.map do |d|
          %(      <span class="nds-doc-step" title="#{h(d[:name])}: #{h(d[:value])}"><span class="nds-doc-swatch" style="background: var(#{d[:name]})"></span>#{h(d[:name][/[^-]+\z/])}</span>)
        end
        %(  <div class="nds-doc-ramp">\n    <strong>#{h(ramp)}</strong>\n    <div class="nds-doc-steps">\n#{steps.join("\n")}\n    </div>\n  </div>)
      end
      %(<div class="nds-doc-ramps">\n#{strips.join("\n")}\n</div>)
    end

    # One row per size name: a sample line at that size, then its -FS, -LH and -MB values.
    def type_sizes(rows)
      sizes = rows.group_by { |d| d[:name].sub(/-(FS|LH|MB)\z/, '') }
      plain = ->(d) { d && code(d[:value].sub(/\Acalc\((.*) \* var\(--user-font-scale, 1\)\)\z/, '\1')) }
      body = sizes.map do |size, list|
        by = list.to_h { |d| [d[:name][/[A-Z]+\z/], d] }
        sample = %(<span class="nds-doc-sample" style="font-size: var(#{size}-FS); line-height: var(#{size}-LH)">Apply for a permit</span>)
        %(    <tr><td>#{code("#{size}-*")}</td><td>#{sample}</td><td>#{plain[by['FS']]}</td><td>#{plain[by['LH']]}</td><td>#{plain[by['MB']] || '—'}</td></tr>)
      end
      grid(%w[Size Sample FS LH MB], body)
    end

    # Token, a preview (when the pack has one), value and dark value (dark tiers). The preview comes
    # second, so it shows before the table scrolls.
    def table(rows, darks)
      shown = rows.map { |d| [d, sample(d)] }
      any = shown.any? { |_, s| s }
      head = ['Token', ('Preview' if any), 'Value', ('Dark' if darks)].compact
      body = shown.map do |d, s|
        cells = [code(d[:name]), (s.to_s if any), code(d[:value])].compact
        cells << (darks[d[:name]] ? code(darks[d[:name]][:value]) : '—') if darks
        %(    <tr>#{cells.map { |c| "<td>#{c}</td>" }.join}</tr>)
      end
      grid(head, body)
    end

    # The scroll box is written here, so the doc can keep it at the card's width.
    def grid(head, body)
      %(<div class="nds-table-wrapper nds-doc-table">\n<table class="nds-table">\n  <thead>\n    <tr>#{head.map { |c| "<th>#{c}</th>" }.join}</tr>\n  </thead>\n  <tbody>\n#{body.join("\n")}\n  </tbody>\n</table>\n</div>)
    end

    def sample(d)
      n = d[:name]
      case n
      when /\A--shadow-/      then %(<span class="nds-doc-swatch nds-doc-shadow" style="box-shadow: var(#{n})"></span>)
      when /\A--spacing-/     then %(<span class="nds-doc-bar" style="inline-size: var(#{n})"></span>)
      when /\A--radius-/      then %(<span class="nds-doc-swatch nds-doc-radius" style="border-radius: var(#{n})"></span>)
      when /\A--nds-font-/    then %(<span class="nds-doc-sample" style="font-family: var(#{n})">Aa أب</span>)
      when /\A--font-weight-/ then %(<span class="nds-doc-sample" style="font-weight: var(#{n})">Aa أب</span>)
      else %(<span class="nds-doc-swatch" style="background: var(#{n})"></span>) if d[:value].match?(COLOR)
      end
    end
  end
end
