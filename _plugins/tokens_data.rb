# frozen_string_literal: true

# Parses the design-token SCSS partials at build time and exposes the result as
# `site.data.tokens`, so components/tokens.md can render the token reference
# without hand-duplicating values (which would drift from the SCSS). Re-runs on
# every build, so the page is always in sync with the single source of truth.
#
# Source of truth (names + values read verbatim):
#   _sass/tokens/_primitives.scss   spacing / sizing / radius / typography scales
#   _sass/themes/_dga.scss          the --colors-* palette
#   _sass/tokens/_semantic.scss     background / text / border / icon / controls / shadow
#   _sass/tokens/_components.scss    per-component --{component}-* tokens
module NDS
  class TokensGenerator < Jekyll::Generator
    safe true
    priority :normal

    # `--name: value;` at the start of a line. Commented-out declarations begin
    # with `//`, so they're filtered before this ever runs.
    DECL = /\A\s*(--[A-Za-z0-9-]+)\s*:\s*([^;]+);/
    # Box-drawing dash used in the `// ── label ──` headers of _components.scss.
    BOX = "─"

    # Primitive + semantic tiers bucket by name prefix, first match wins — so
    # order matters: brand colours before the catch-all --colors-, and the
    # layout aliases before --text-/--icon-.
    PRIMITIVE_CATS = [
      ['spacing',     'Spacing',              ['--spacing-']],
      ['sizing',      'Sizing',               ['--width-']],
      ['radius',      'Radius',               ['--radius-']],
      ['typography',  'Typography',           ['--typo-']],
      ['color-brand', 'Brand colors',         ['--colors-primary-', '--colors-secondary-', '--colors-tertiary-', '--colors-neutral-']],
      ['color-base',  'Base, status & alpha', ['--colors-']]
    ].freeze

    SEMANTIC_CATS = [
      ['layout',     'Layout',         ['--paragraph-', '--text-content-gap', '--icon-text-gap']],
      ['background', 'Background',      ['--background-']],
      ['text',       'Text',           ['--text-']],
      ['border',     'Border & focus', ['--border-', '--focus-', '--divider-']],
      ['icon',       'Icon',           ['--icon-']],
      ['controls',   'Controls',       ['--controls-']],
      ['shadow',     'Shadow',         ['--shadow-']],
      ['alpha',      'Alpha',          ['--alpha-']]
    ].freeze

    def generate(site)
      primitive = bucket_by_prefix(
        read_decls(site, '_sass/tokens/_primitives.scss') + read_decls(site, '_sass/themes/_dga.scss'),
        PRIMITIVE_CATS
      )
      semantic  = bucket_by_prefix(read_decls(site, '_sass/tokens/_semantic.scss'), SEMANTIC_CATS)
      component = bucket_by_section(site, '_sass/tokens/_components.scss')

      site.data['tokens'] = {
        'tiers' => [
          { 'id' => 'primitive', 'label' => 'Primitive tokens', 'categories' => primitive },
          { 'id' => 'semantic',  'label' => 'Semantic tokens',  'categories' => semantic },
          { 'id' => 'component', 'label' => 'Component tokens',  'categories' => component }
        ]
      }
    end

    private

    def read_decls(site, rel)
      path = File.join(site.source, rel)
      return [] unless File.file?(path)

      File.read(path, encoding: 'UTF-8').each_line.filter_map do |line|
        next if line.strip.start_with?('//')

        m = DECL.match(line)
        { 'name' => m[1], 'value' => m[2].strip } if m
      end
    end

    # First-match-wins prefix bucketing into the given ordered category list.
    # Empty categories are dropped (no tab is rendered for them).
    def bucket_by_prefix(decls, cats)
      buckets = Hash.new { |h, k| h[k] = [] }
      seen = {}
      decls.each do |d|
        next if seen[d['name']]

        cat = cats.find { |_id, _label, prefixes| prefixes.any? { |p| d['name'].start_with?(p) } }
        next unless cat

        seen[d['name']] = true
        buckets[cat[0]] << d
      end
      cats.filter_map do |id, label, _pre|
        { 'id' => id, 'label' => label, 'tokens' => buckets[id] } unless buckets[id].empty?
      end
    end

    # Component tokens: group by the `// ── label ──` section headers, in source
    # order, so a new component's tokens appear automatically once added.
    def bucket_by_section(site, rel)
      path = File.join(site.source, rel)
      return [] unless File.file?(path)

      groups = []
      current = nil
      seen = {}
      File.read(path, encoding: 'UTF-8').each_line do |line|
        stripped = line.strip
        if stripped.start_with?('//')
          if stripped.include?(BOX)
            label = stripped.sub(%r{\A//\s*}, '').gsub(BOX, '').strip
            unless label.empty?
              current = { 'id' => slug(label), 'label' => titleize(label), 'tokens' => [] }
              groups << current
            end
          end
          next
        end

        m = DECL.match(line)
        next unless m && current
        next if seen[m[1]]

        seen[m[1]] = true
        current['tokens'] << { 'name' => m[1], 'value' => m[2].strip }
      end
      groups.reject { |g| g['tokens'].empty? }
    end

    def slug(label)
      label.downcase.strip.gsub(/[^a-z0-9]+/, '-').gsub(/\A-|-\z/, '')
    end

    def titleize(label)
      label.split(/[\s-]+/).map { |w| w.empty? ? w : w[0].upcase + w[1..] }.join(' ')
    end
  end
end
