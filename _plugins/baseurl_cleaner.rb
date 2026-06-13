# Baseurl Cleaner for National Design System
#
# This script removes the baseurl prefix (/_site) from all generated files
# in the _site/ directory. Useful when deploying to a root domain where
# the baseurl path is not needed.
#
# USAGE:
#   ruby _plugins/baseurl_cleaner.rb          # Process files once
#   ruby _plugins/baseurl_cleaner.rb dry      # Dry run - show changes without modifying files
#
# WHAT IT DOES:
#   1. Scans all .html files in _site/
#   2. Reads baseurl from _config.yml (supports both set and empty baseurl)
#   3. Replaces root links (href="/baseurl/" or href="/") with href="index.html"
#   4. Replaces baseurl prefix with relative path based on file depth
#      Root files:  /baseurl/assets/img/logo.svg -> assets/img/logo.svg
#      Depth 1:     /baseurl/assets/img/logo.svg -> ../assets/img/logo.svg
#      Depth 2:     /baseurl/assets/img/logo.svg -> ../../assets/img/logo.svg
#
# REQUIREMENTS:
#   - Ruby (standard library only)
#

require 'fileutils'
require 'yaml'

class BaseurlCleaner
  # File extensions to process
  FILE_EXTENSIONS = %w[.html].freeze

  def initialize(dry_run: false)
    @dry_run = dry_run
    @site_dir = File.join(Dir.pwd, '_site')
    @baseurl = read_baseurl
    @files_processed = 0
    @files_modified = 0
    @total_replacements = 0
  end

  def read_baseurl
    config_path = File.join(Dir.pwd, '_config.yml')
    unless File.exist?(config_path)
      puts "\n  ❌ _config.yml not found.\n\n"
      exit 1
    end
    config = YAML.safe_load(File.read(config_path))
    config['baseurl'].to_s.chomp('/')
  end

  def run
    unless Dir.exist?(@site_dir)
      puts "\n  ❌ _site/ directory not found. Run 'bundle exec jekyll build' first.\n\n"
      return
    end

    label = @baseurl.empty? ? "'/'" : "'#{@baseurl}/'"
    puts ""
    puts "  ╔══════════════════════════════════════════════════════╗"
    puts "  ║         NDS Baseurl Cleaner                         ║"
    puts "  ║         Removing #{label} prefix from _site/".ljust(57) + "║"
    if @dry_run
      puts "  ║         DRY RUN - No files will be modified".ljust(57) + "║"
    end
    puts "  ╚══════════════════════════════════════════════════════╝"
    puts ""

    process_directory(@site_dir)

    puts ""
    puts "  ── Summary ──────────────────────────────────────────"
    puts "  Files scanned:    #{@files_processed}"
    puts "  Files modified:   #{@files_modified}"
    puts "  Total replacements: #{@total_replacements}"
    if @dry_run
      puts "  Mode:             DRY RUN (no changes written)"
    end
    puts ""
  end

  private

  def process_directory(dir)
    Dir.glob(File.join(dir, '**', '*')).each do |file_path|
      next unless File.file?(file_path)
      next unless FILE_EXTENSIONS.include?(File.extname(file_path).downcase)

      process_file(file_path)
    end
  end

  def process_file(file_path)
    @files_processed += 1
    content = File.read(file_path, encoding: 'UTF-8')
    original_content = content.dup

    # Calculate directory depth relative to _site/
    relative_path = file_path.sub(@site_dir + File::SEPARATOR, '').sub(@site_dir, '')
    depth = File.dirname(relative_path).split(File::SEPARATOR).reject { |p| p == '.' }.length
    prefix = depth > 0 ? ('../' * depth) : ''

    replacements = 0

    # 1. Replace root/home links -> href="index.html" (with ../ based on depth)
    #    With baseurl:    href="/_site/" -> href="index.html" or href="../index.html"
    #    Without baseurl: href="/"       -> href="index.html" or href="../index.html"
    root_pattern = @baseurl.empty? ? %r{(href\s*=\s*["'])/(["'])} : %r{(href\s*=\s*["'])#{Regexp.escape(@baseurl)}/(["'])}
    content.gsub!(root_pattern) do
      replacements += 1
      "#{$1}#{prefix}index.html#{$2}"
    end

    # 2. Replace baseurl prefix with relative path based on depth
    #    Matches: href, src, srcset, data-*, imagesrcset
    #    Skips protocol URLs (http://, https://, //)
    content.gsub!(%r{((?:href|src|srcset|data-[\w-]+|imagesrcset)\s*=\s*["'])#{Regexp.escape(@baseurl)}/(?!/)}) do
      replacements += 1
      "#{$1}#{prefix}"
    end

    # 2b. Replace additional URLs inside srcset/data-srcset/imagesrcset (comma-separated)
    #     e.g. srcset="/img/a.webp 600w, /img/b.webp 1200w" - second URL after comma
    content.gsub!(%r{(,\s*)#{Regexp.escape(@baseurl)}/(?!/)}) do
      replacements += 1
      "#{$1}#{prefix}"
    end

    # 3. Replace JS-assigned paths: .href = '/...', .src = '/...'
    content.gsub!(%r{(\.(href|src)\s*=\s*['"])#{Regexp.escape(@baseurl)}/(?!/)}) do
      replacements += 1
      "#{$1}#{prefix}"
    end

    # 4. Inline custom-property url() — e.g. <body style="--bg-img: url('/assets/img/x.webp')">.
    #    A url() inside a CSS custom property is resolved by the stylesheet that
    #    CONSUMES it (assets/css/nds-main.min.css), not by the HTML page that
    #    declares it — so the page-relative depth prefix is wrong here. The
    #    consuming stylesheet always lives at assets/css/, so any asset under
    #    assets/ is reachable as ../<rest> from there, INDEPENDENT of the page's
    #    own depth. Rewrite the whole baseurl+assets/ segment to a single ../.
    #    Runs before rule 5 so the page-relative rule never sees these.
    content.gsub!(%r{(--[\w-]+\s*:\s*url\(\s*['"]?)#{Regexp.escape(@baseurl)}/assets/}) do
      replacements += 1
      "#{$1}../"
    end

    # 5. Replace remaining CSS url() paths (inline <style> blocks, direct inline
    #    backgrounds): url(/assets/...), url('/assets/...'), url("/assets/...").
    #    These resolve relative to the document, so the page-relative prefix is correct.
    content.gsub!(%r{(url\(\s*['"]?)#{Regexp.escape(@baseurl)}/(?!/)}) do
      replacements += 1
      "#{$1}#{prefix}"
    end

    # 6. Pretty-URL folder links -> explicit index.html for file:// browsing.
    #    Jekyll builds each page to <folder>/index.html. On a server "components"
    #    or "components/" serves that index; file:// only opens the directory.
    #    Breadcrumbs emit the slash-less form (href="../components"), the nav the
    #    trailing-slash form (href="../components/") — an extension-less internal
    #    link can't be told from a real file by pattern alone, so resolve it
    #    against THIS file's location and append index.html only when it actually
    #    points at a directory that has one. Skips absolute/site-root links,
    #    protocol URLs (the ':' exclusion), anchors/queries, and files (extension).
    file_dir = File.dirname(file_path)
    content.gsub!(%r{(href\s*=\s*["'])([^"'#?:]+)(["'])}) do
      pre, href, post = $1, $2, $3
      if href.start_with?('/') || File.extname(href) != ''
        "#{pre}#{href}#{post}"
      else
        bare = href.chomp('/')
        target = File.expand_path(bare, file_dir)
        if File.directory?(target) && File.exist?(File.join(target, 'index.html'))
          # Pretty-URL page: <folder>/index.html
          replacements += 1
          "#{pre}#{bare}/index.html#{post}"
        elsif File.exist?(target + '.html')
          # Flat-file page linked folder-style (e.g. console-demo.html linked as
          # console-demo/) — point at the real file so file:// resolves it.
          replacements += 1
          "#{pre}#{bare}.html#{post}"
        else
          # No such target in the build (e.g. an unbuilt /ar/ subtree) — leave it.
          "#{pre}#{href}#{post}"
        end
      end
    end

    if content != original_content
      @files_modified += 1
      @total_replacements += replacements
      relative_path = file_path.sub(@site_dir + File::SEPARATOR, '').sub(@site_dir, '')

      puts "  ✓ #{relative_path} (#{replacements} replacements)"

      unless @dry_run
        File.write(file_path, content, encoding: 'UTF-8')
      end
    end
  end
end

# ── Main ──────────────────────────────────────────────────

if __FILE__ == $0
  dry_run = ARGV[0] == 'dry'
  cleaner = BaseurlCleaner.new(dry_run: dry_run)
  cleaner.run
end
