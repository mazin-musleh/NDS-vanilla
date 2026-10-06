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
      ['fluid',      'Fluid typography',     'Primitive', /\A--typo-[a-z]+-clamp-/],
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
               'html' => preview(id, rows), 'css' => css(rows, darks) }]
      end
      # One table per component, for its own doc page: `site.data.tokens.components.button.html`.
      components = lights.select { |d| d[:file] == COMPONENTS }.group_by { |d| d[:group] }
                         .to_h { |g, rows| [g, { 'count' => rows.size, 'html' => table(rows, darks) }] }
      site.data['tokens'] = { 'packs' => packs, 'components' => components }
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

    # A specimen for the primitives, the palette and the shadows: each token shown as what it
    # paints, under its name and value, with a copy button. A semantic or component token paints
    # a palette color by meaning, which a swatch cannot show: those packs show their code alone
    # (owner call 2026-10-06).
    def preview(id, rows)
      case id
      when 'spacing'              then ruler(rows)
      when 'radius'               then tiles(rows) { |d| %(<span class="nds-doc-swatch nds-doc-radius" style="border-radius: var(#{d[:name]})"></span>) }
      when 'typography', 'fluid'  then type_specimen(rows)
      when 'font'                 then font_specimen(rows)
      when 'shell'                then tiles(rows)
      when 'brand', 'fixed'       then ramps(rows)
      when 'shadow'               then %(<div class="nds-doc-elevation">\n#{tiles(rows, value: false) { |d| %(<span class="nds-doc-swatch nds-doc-shadow" style="box-shadow: var(#{d[:name]})"></span>) }}\n</div>)
      else ''
      end
    end

    # The token's name with a button that copies `var(--name)`: the form a stylesheet reads it in.
    def label(d, copy = "var(#{d[:name]})")
      n = h(d[:name])
      %(<span class="nds-doc-name">#{n}<button type="button" class="nds-btn nds-subtle nds-sm nds-copy" data-copy="#{h(copy)}" data-copy-announce="#{n} copied" aria-label="Copy #{n}"><i class="nds-icon nds-hgi-copy-01" aria-hidden="true"></i></button></span>)
    end

    def value(d) = %(<span class="nds-doc-value">#{h(d[:value])}</span>)

    # One tile per token: its picture (when the block draws one) over its name and value.
    def tiles(rows, value: true, &pic)
      items = rows.map do |d|
        %(  <div class="nds-doc-tile">#{pic&.call(d)}#{label(d)}#{value(d) if value}</div>)
      end
      %(<div class="nds-doc-tiles">\n#{items.join("\n")}\n</div>)
    end

    # The spacing scale as a ruler: name, value, then a bar of that length.
    def ruler(rows)
      lines = rows.map { |d| %(  #{label(d)}#{value(d)}<span class="nds-doc-bar" style="inline-size: var(#{d[:name]})"></span>) }
      %(<div class="nds-doc-ruler">\n#{lines.join("\n")}\n</div>)
    end

    # A font specimen: each family as a glyph and an alphabet set in it, then each weight.
    def font_specimen(rows)
      faces = rows.select { |d| d[:name].start_with?('--nds-font-') }.map do |d|
        # An alias of another family (`var(--nds-font-brand)`) shows no second alphabet.
        glyphs = d[:value].start_with?('var(') ? '' : %(<span class="nds-doc-glyph">Ag</span><span class="nds-doc-alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 !@#$%^&amp;*()<br>أبجد هوز حطي كلمن</span>)
        %(  <div class="nds-doc-face" style="font-family: var(#{d[:name]})">#{label(d)}#{value(d)}#{glyphs}</div>)
      end
      weights = rows.select { |d| d[:name].start_with?('--font-weight-') }.map do |d|
        %(    <span class="nds-doc-weight" style="font-weight: var(#{d[:name]})">Aa</span><span class="nds-doc-face">#{label(d)}#{value(d)}</span>)
      end
      %(<div class="nds-doc-specimen">\n#{faces.join("\n")}\n  <div class="nds-doc-weights">\n#{weights.join("\n")}\n  </div>\n</div>)
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

    # A type specimen: one line per size name, set at that size, with its -FS, -LH and -MB values.
    # A fluid size reads as its range: `clamp(48px, 6vw, 72px)` is `48px–72px`.
    def type_specimen(rows)
      sizes = rows.group_by { |d| d[:name].sub(/-(FS|LH|MB)\z/, '') }
      plain = lambda do |d|
        d[:value].sub(/\Acalc\((.*) \* var\(--user-font-scale, 1\)\)\z/, '\1').sub(/\Aclamp\(([^,]+),[^,]+,\s*([^)]+)\)\z/, '\1–\2')
      end
      lines = sizes.map do |size, list|
        by = list.to_h { |d| [d[:name][/[A-Z]+\z/], d] }
        values = %w[FS LH MB].filter_map { |k| by[k] && "#{k} #{plain[by[k]]}" }.join(' · ')
        row = { name: "#{size}-*", value: values }
        pair = "font-size: var(#{size}-FS); line-height: var(#{size}-LH);"
        %(  <div class="nds-doc-size"><span class="nds-doc-face">#{label(row, pair)}#{value(row)}</span><span class="nds-doc-sample" style="font-size: var(#{size}-FS); line-height: var(#{size}-LH)">Apply for a permit</span></div>)
      end
      %(<div class="nds-doc-specimen">\n#{lines.join("\n")}\n</div>)
    end

    # A component page's table: token, a preview and value. A dark value sits under the light one:
    # a fourth column is pushed past the page's edge.
    def table(rows, darks)
      shown = rows.map { |d| [d, sample(d)] }
      any = shown.any? { |_, s| s }
      head = ['Token', ('Preview' if any), 'Value'].compact
      body = shown.map do |d, s|
        value = code(d[:value])
        value += %(<br><small>dark #{code(darks[d[:name]][:value])}</small>) if darks[d[:name]]
        cells = [code(d[:name]), (s.to_s if any), value].compact
        %(    <tr>#{cells.map { |c| "<td>#{c}</td>" }.join}</tr>)
      end
      grid(head, body)
    end

    # The scroll box is written here, so the doc can keep it at the card's width.
    def grid(head, body)
      %(<div class="nds-table-wrapper nds-doc-table">\n<table class="nds-table nds-compact">\n  <thead>\n    <tr>#{head.map { |c| "<th>#{c}</th>" }.join}</tr>\n  </thead>\n  <tbody>\n#{body.join("\n")}\n  </tbody>\n</table>\n</div>)
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
