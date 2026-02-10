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
#   1. Scans all .html, .css, .js, .xml, .json files in _site/
#   2. Replaces href="/_site/" (root link) with href="/"
#   3. Replaces all other /_site/ references with relative paths
#      e.g. /_site/assets/img/logo.svg -> assets/img/logo.svg
#
# REQUIREMENTS:
#   - Ruby (standard library only)
#

require 'fileutils'

class BaseurlCleaner
  BASEURL = "/_site"

  # File extensions to process
  FILE_EXTENSIONS = %w[.html .css .js .xml .json .svg .txt].freeze

  def initialize(dry_run: false)
    @dry_run = dry_run
    @site_dir = File.join(Dir.pwd, '_site')
    @files_processed = 0
    @files_modified = 0
    @total_replacements = 0
  end

  def run
    unless Dir.exist?(@site_dir)
      puts "\n  ❌ _site/ directory not found. Run 'bundle exec jekyll build' first.\n\n"
      return
    end

    puts ""
    puts "  ╔══════════════════════════════════════════════════════╗"
    puts "  ║         NDS Baseurl Cleaner                         ║"
    puts "  ║         Removing '#{BASEURL}' prefix from _site/    ║"
    if @dry_run
      puts "  ║         🔍 DRY RUN - No files will be modified      ║"
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

    replacements = 0

    # 1. Replace standalone baseurl links: href="/_site/" or href='/_site/'
    #    These are root/home links -> replace with "/"
    content.gsub!(%r{(href\s*=\s*["'])#{Regexp.escape(BASEURL)}/(["'])}) do
      replacements += 1
      "#{$1}/#{$2}"
    end

    # 2. Replace all remaining /_site/ prefixes with relative paths
    #    e.g. /_site/assets/img/logo.svg -> assets/img/logo.svg
    content.gsub!(%r{#{Regexp.escape(BASEURL)}/}) do
      replacements += 1
      "/"
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
