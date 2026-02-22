# HTML Compressor for National Design System
#
# This script removes all blank lines from generated HTML files in _site/.
# Preserves whitespace inside <script>, <style>, <pre>, and <textarea> blocks.
#
# USAGE:
#   ruby _plugins/html_compressor.rb          # Process files
#   ruby _plugins/html_compressor.rb dry      # Dry run - show changes without modifying files
#
# WHAT IT DOES:
#   1. Scans all .html files in _site/
#   2. Strips trailing whitespace from each line
#   3. Removes all blank lines (except inside script/style/pre/textarea)
#

require 'fileutils'

class HtmlCompressor
  FILE_EXTENSIONS = %w[.html].freeze

  # Protected blocks: preserve original formatting
  PROTECTED_OPEN_RE = /<(script|style|pre|textarea|code)[\s>]/i
  PROTECTED_CLOSE_RE = lambda { |tag| /<\/#{tag}>/i }

  def initialize(dry_run: false)
    @dry_run = dry_run
    @site_dir = File.join(Dir.pwd, '_site')
    @files_processed = 0
    @files_modified = 0
    @lines_removed = 0
  end

  def run
    unless Dir.exist?(@site_dir)
      puts "\n  ❌ _site/ directory not found. Run 'bundle exec jekyll build' first.\n\n"
      return
    end

    puts ""
    puts "  ╔══════════════════════════════════════════════════════╗"
    puts "  ║         NDS HTML Compressor                          ║"
    puts "  ║         Removing blank lines from _site/".ljust(57) + "║"
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
    puts "  Lines removed:    #{@lines_removed}"
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
    original_line_count = content.lines.count

    # Split into lines and process, preserving blank lines inside protected blocks
    lines = content.lines
    result = []
    in_protected = false
    protected_tag = nil

    lines.each do |line|
      stripped = line.rstrip

      if !in_protected
        if stripped =~ PROTECTED_OPEN_RE
          in_protected = true
          protected_tag = $1.downcase
          # Check if it also closes on the same line
          if stripped =~ PROTECTED_CLOSE_RE.call(protected_tag)
            in_protected = false
            protected_tag = nil
          end
        end
        # Skip blank lines outside protected blocks
        next if stripped.empty?
        result << stripped
      else
        # Inside protected block: keep everything (including blank lines)
        result << line.chomp
        if stripped =~ PROTECTED_CLOSE_RE.call(protected_tag)
          in_protected = false
          protected_tag = nil
        end
      end
    end

    cleaned = result.join("\n")
    cleaned.strip!
    cleaned << "\n"

    removed = original_line_count - cleaned.lines.count

    if content != cleaned
      @files_modified += 1
      @lines_removed += [removed, 0].max
      relative_path = file_path.sub(@site_dir + File::SEPARATOR, '').sub(@site_dir, '')

      puts "  ✓ #{relative_path} (#{removed} lines removed)"

      unless @dry_run
        File.write(file_path, cleaned, encoding: 'UTF-8')
      end
    end
  end
end

# ── Main ──────────────────────────────────────────────────

if __FILE__ == $0
  dry_run = ARGV[0] == 'dry'
  compressor = HtmlCompressor.new(dry_run: dry_run)
  compressor.run
end
