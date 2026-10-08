# Public names at every release tag, and the ones today's code no longer has: the raw list
# for the audit's migration rule (_data/migrations.yml). Reads each tag with git archive into
# tmp/surface/<tag>/, so the working tree is never touched. A tag's names are cached in
# tmp/surface/<tag>.json; FRESH=1 reads every tag again.
#
#   bundle exec ruby scripts/surface-history.rb        → tmp/surface/candidates.json
require 'json'
require 'fileutils'
require 'sass-embedded'

ROOT = File.expand_path('..', __dir__)
OUT = File.join(ROOT, 'tmp', 'surface')
DOC_DIRS = %w[components layout utilities ui-shell core examples templates _includes _layouts].freeze
SKIP_JS = /nds-(docs|showcase|code|audit)\b/  # docs-only or debug bundles: never a user's surface

def git(*args) = IO.popen(['git', '-C', ROOT, *args], &:read)

def tags
  git('tag', '--list', 'v*', '--sort=v:refname').split.grep(/\Av\d+\.\d+\.\d+\z/) + ['HEAD']
end

def css_of(dir)
  Dir[File.join(dir, 'assets/css/*.scss')].reject { |f| f =~ /showcase/ }.map do |f|
    # Jekyll front matter and Liquid are not Sass.
    src = File.read(f).sub(/\A---.*?---\s*/m, '').gsub(/\{%.*?%\}|\{\{.*?\}\}/m, '')
    Sass.compile_string(src, load_paths: [File.join(dir, '_sass')], style: :compressed,
                        quiet_deps: true, verbose: false, logger: Sass::Logger.silent).css
  rescue Sass::CompileError => e
    warn "  #{File.basename(f)}: #{e.message.lines.first}"
    ''
  end.join
end

def names_at(tag)
  cache = File.join(OUT, "#{tag}.json")
  return JSON.parse(File.read(cache)) if File.exist?(cache) && !ENV['FRESH']

  dir = File.join(OUT, tag)
  FileUtils.rm_rf(dir)
  FileUtils.mkdir_p(dir)
  paths = (%w[_sass assets/css assets/js docs-assets/events] + DOC_DIRS).select { |p| !git('ls-tree', '--name-only', tag, p).empty? }
  system("git -C \"#{ROOT}\" archive #{tag} #{paths.join(' ')} | tar -x -C \"#{dir}\"", exception: true)

  css = css_of(dir)
  selectors = css.gsub(%r{/\*.*?\*/}m, '').gsub(/\{[^{}]*\}/, '{}')
  # Event packs ship in the template too; their JS carries their CSS inline.
  js = Dir[File.join(dir, '{assets/js,docs-assets/events/*}/*.min.js')].reject { |f| f =~ SKIP_JS }.map { |f| File.read(f) }.join
  shell = %w[_includes _layouts].flat_map { |d| Dir[File.join(dir, d, '**/*.html')] }.map { |f| File.read(f) }.join
  docs = DOC_DIRS.flat_map { |d| Dir[File.join(dir, d, '**/*.{md,html}')] }.map { |f| File.read(f) }.join
  dataset = js.scan(/\.dataset\.([a-z]\w*)/).flatten.map { |n| 'data-' + n.gsub(/[A-Z]/) { "-#{$&.downcase}" } }

  names = {
    'class' => (selectors.scan(/\.(-?[a-zA-Z_][\w-]*)/).flatten + js.scan(/(?<![\w-])nds-[a-zA-Z][\w-]*/)).uniq.sort,
    'attribute' => (selectors.scan(/\[(data-[\w-]+)/).flatten + js.scan(/\bdata-[a-z][\w-]*/) + dataset).uniq.sort,
    'property' => css.scan(/(--[\w-]+)\s*[:,)]/).flatten.uniq.sort,
    'event' => js.scan(/["'`](nds:[\w:-]+)/).flatten.uniq.sort,
    # Shell markup (_includes, _layouts) is what users copy; doc demo ids are samples.
    'id' => (selectors.scan(/#([a-zA-Z][\w-]*)/).flatten + js.scan(/getElementById\(["'`]([\w-]+)/).flatten +
             js.scan(/["'`]#([a-zA-Z][\w-]*)/).flatten + js.scan(/\bid=\?["']([a-zA-Z][\w-]*)/).flatten +
             shell.scan(/\sid="([a-zA-Z][\w-]*)"/).flatten).uniq.sort,
    # Any mention counts: canon markup, a table row, a code sample.
    'documented' => docs.scan(/[\w-]+/).uniq.sort,
    # What the docs and shell tell users to write: a name here is canon, styled or not.
    'markup' => ((docs + shell).scan(/class="([^"]*)"/).flatten.flat_map(&:split) +
                 (docs + shell).scan(/\s(data-[\w-]+)=/).flatten + shell.scan(/\sid="([\w-]+)"/).flatten).uniq.sort,
  }
  FileUtils.rm_rf(dir)
  File.write(cache, JSON.pretty_generate(names))
  names
end

FileUtils.mkdir_p(OUT)
all = tags.to_h { |t| print "#{t} "; [t, names_at(t)] }
puts
head = all.delete('HEAD')

# A name some release had and today's code lacks. last_seen is the newest release with it;
# documented: a doc page of that release told users to write it.
candidates = {}
all.each do |tag, names|
  %w[class attribute property event id].each do |kind|
    (names[kind] - head[kind] - head['markup']).each do |n|
      c = candidates[[kind, n]] ||= { 'kind' => kind, 'name' => n, 'first_seen' => tag }
      c['last_seen'] = tag
      c['documented'] ||= names['documented'].include?(n)
    end
  end
end
list = candidates.values.sort_by { |c| [c['kind'], c['name']] }
File.write(File.join(OUT, 'candidates.json'), JSON.pretty_generate(list))
puts "#{list.size} names gone since a release (#{list.count { |c| c['documented'] }} documented): tmp/surface/candidates.json"
list.group_by { |c| c['kind'] }.each { |k, v| puts "  #{k}: #{v.size} (#{v.count { |c| c['documented'] }} documented)" }
