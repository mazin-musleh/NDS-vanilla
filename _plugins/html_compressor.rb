# HTML Compressor for National Design System
#
# Reformats generated HTML files in _site/ with htmlbeautifier: consistent
# indentation, jammed include-boundary tags split, blank lines removed.
# <code> blocks are shielded (byte-preserved) — doc code samples are
# whitespace-significant but not wrapped in <pre>, which htmlbeautifier
# would otherwise flatten. <pre>/<textarea>/<script>/<style> are preserved
# by htmlbeautifier itself.
#
# USAGE:
#   ruby _plugins/html_compressor.rb          # Process files
#   ruby _plugins/html_compressor.rb dry      # Dry run - show changes without modifying files

require 'htmlbeautifier'

class HtmlCompressor
  FILE_EXTENSIONS = %w[.html].freeze
  CODE_RE = /<code\b[^>]*>.*?<\/code>/mi

  def initialize(dry_run: false)
    @dry_run = dry_run
    @site_dir = File.join(Dir.pwd, '_site')
    @files_processed = 0
    @files_modified = 0
  end

  def run
    unless Dir.exist?(@site_dir)
      puts "\n  ❌ _site/ directory not found. Run 'bundle exec jekyll build' first.\n\n"
      return
    end

    puts ""
    puts "  ╔══════════════════════════════════════════════════════╗"
    puts "  ║         NDS HTML Compressor                          ║"
    puts "  ║         Formatting HTML in _site/".ljust(57) + "║"
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
    content = File.binread(file_path)

    # Shield <code> elements so the beautifier can't touch their whitespace
    blocks = []
    shielded = content.gsub(CODE_RE) { |m| blocks << m; "___NDS_CODE_SHIELD_#{blocks.size - 1}___" }
    cleaned = HtmlBeautifier.beautify(shielded, indent: '  ')
                .gsub(/___NDS_CODE_SHIELD_(\d+)___/) { blocks[$1.to_i] } + "\n"

    return if content == cleaned

    @files_modified += 1
    relative_path = file_path.sub(@site_dir + File::SEPARATOR, '').sub(@site_dir, '')
    delta = cleaned.lines.count - content.lines.count
    puts "  ✓ #{relative_path} (#{delta >= 0 ? '+' : ''}#{delta} lines)"

    File.binwrite(file_path, cleaned) unless @dry_run
  end
end

# ── Main ──────────────────────────────────────────────────

if __FILE__ == $0
  dry_run = ARGV[0] == 'dry'
  compressor = HtmlCompressor.new(dry_run: dry_run)
  compressor.run
end
