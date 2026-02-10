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

    # 4. Replace CSS url() paths: url(/assets/...), url('/assets/...'), url("/assets/...")
    content.gsub!(%r{(url\(\s*['"]?)#{Regexp.escape(@baseurl)}/(?!/)}) do
      replacements += 1
      "#{$1}#{prefix}"
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
