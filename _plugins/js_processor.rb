# JavaScript Processor for National Design System
# 
# This script processes JavaScript files from the _js directory and outputs
# minified/bundled versions to assets/js for production use.
#
# USAGE:
#   ruby _plugins/js_processor.rb          # Process files once
#   ruby _plugins/js_processor.rb watch    # Watch for changes and auto-process
#
# WORKFLOW:
#   1. Original JS files are stored in _js/ directory
#   2. Files are bundled according to configuration (e.g., accordion + tabs + forms = nds-components.min.js)
#   3. All files are compressed using Terser (supports modern ES6+ syntax)
#   4. Output files are written to assets/js/ as .min.js versions
#   5. Jekyll builds use the processed files from assets/js/
#
# BENEFITS:
#   - Decoupled from Jekyll build process (no overhead on every build)
#   - Only processes when files actually change
#   - Can run in watch mode during development
#   - Uses modern Terser for optimal compression
#
# REQUIREMENTS:
#   - Node.js and npx installed (for Terser)
#   - Ruby gems: execjs, json, fileutils
#   - For watch mode: gem 'listen'
#
# BUNDLE CONFIGURATION:
#   Edit the @bundles hash to define which files should be combined

require 'json'
require 'fileutils'
require 'yaml'
require 'tempfile'

class JSProcessor
  def initialize
    @source_dir = '_js'
    @output_dir = 'assets/js'
    # Per-file output dir overrides (keyed by source basename) — e.g. an event
    # brand's behaviour script ships in its self-contained event folder.
    @output_overrides = {
      'nds-theme-foundation-day.js' => 'assets/events/foundation_day',
      'nds-theme-hajj.js' => 'assets/events/Hajj',
    }
    @bundles = {
      # Critical bundle — loaded via <script defer>. Carries core, the loader,
      # shared utils (backdrop/feedback — mainnav reads NDS.Backdrop.isActive()
      # synchronously, a lazy stub can't bridge that; forms shows Feedback at
      # submit), every critical component, dropmenu (deferred, but a
      # critical-init dependency of multiselect), and deferred components
      # deliberately kept in main: mainnav + fontLoading (first-paint critical),
      # cookies (pending refactor — eval-time consent enforcement must run
      # before analytics), customselect (JS-derived label would flash if async),
      # otp (auto-advance/paste is first-interaction-critical on OTP/2FA pages).
      # They stay so they wire on the local idle pass, not after an injected
      # bundle. Reveal is gated on this bundle, so it's kept lean.
      'nds-main.min.js' => ['nds-core.js', 'nds-theme.js', 'nds-mainnav.js', 'nds-fontLoading.js', 'nds-sidemenu.js', 'nds-drawer.js', 'nds-scroll-more.js', 'nds-cookies.js', 'nds-forms.js', 'nds-otp.js', 'nds-code.js', 'nds-dropmenu.js', 'nds-customselect.js', 'nds-multiselect.js', 'nds-taginput.js', 'nds-backdrop.js', 'nds-feedback.js', 'nds-sideinfo.js', 'nds-toc.js', 'nds-empty.js', 'nds-cooldown-button.js', 'nds-link.js', 'nds-loader.js'],
      # Delegated — deferred components verified safe to load late. Injected by
      # nds-loader.js AFTER the critical pass (never a render-blocking defer tag), so
      # its download never gates the reveal. Components migrate in here over time
      # as each is confirmed cold-init / late-init-safe; move the file here and
      # drop `critical: true` from its loader registry entry (location is owned here, not the
      # registry — the build generates the namespace→bundle map from these lists).
      # nds-sort.js leads the list: it's the shared sort engine for filter/tables.
      'nds-delegated.min.js' => ['nds-sort.js', 'nds-filter.js', 'nds-pagination.js', 'nds-swiper.js', 'nds-stepper.js', 'nds-breadcrumb.js', 'nds-accordion.js', 'nds-tabs.js', 'nds-expandable.js', 'nds-copy.js', 'nds-share.js', 'nds-modal.js', 'nds-alert.js', 'nds-cityWeather.js', 'nds-timeDate.js', 'nds-digitalStamp.js', 'nds-progress.js', 'nds-voice-input.js', 'nds-numbers.js', 'nds-user-feedback.js', 'nds-rating.js', 'nds-slider.js', 'nds-tables.js', 'nds-selection.js'],
      # Extras — heavy, page-specific, zero-inbound leaf components. Injected by
      # nds-loader.js only when the page contains one of them (selector-gated), so
      # plain pages never download/parse them. May later be split into smaller
      # per-component bundles (add a bundle here; the loader picks it up from the
      # generated manifest).
      'nds-extras.min.js' => ['nds-date-picker.js', 'nds-chart.js', 'nds-autocomplete.js', 'nds-ipv.js', 'nds-tooltip.js', 'nds-export.js', 'nds-upload.js', 'nds-editor.js']
      # NOTE: nds-accessibility.js is intentionally NOT bundled here — it
      # builds to its own assets/js/nds-accessibility.min.js (optional add-on,
      # loaded by a separate <script> gated on site.accessibility).
    }

    # Load config from _config.yml
    @config = load_config
  end

  def load_config
    config_path = '_config.yml'
    if File.exist?(config_path)
      YAML.load_file(config_path)
    else
      {}
    end
  end

  # Logical bundle name from the output filename: 'nds-delegated.min.js' -> 'delegated'.
  def bundle_key(bundle_name)
    bundle_name.sub(/\Ands-/, '').sub(/\.min\.js\z/, '')
  end

  # Injected (non-main) bundles — everything that isn't the critical main bundle.
  def injected_bundles
    @bundles.reject { |name, _| name == 'nds-main.min.js' }
  end

  # Namespaces a set of source files export via `NDS.<Name> = ...` (the de-facto
  # export convention). Over-listing helper namespaces is harmless downstream.
  def scan_namespaces(source_files)
    source_files.each_with_object([]) do |sf, ns|
      path = File.join(@source_dir, sf)
      next unless File.exist?(path)
      File.read(path).scan(/\bNDS\.([A-Z][A-Za-z0-9_]*)\s*=(?!=)/) { |m| ns << m[0] }
    end.uniq
  end

  # The loader COMPONENTS registry, parsed once: every component `name`, and the
  # subset flagged `critical: true` (the reveal checklist). The registry `name` IS
  # the NDS namespace.
  def loader_registry
    loader_path = File.join(@source_dir, 'nds-loader.js')
    return { names: [], critical: [] } unless File.exist?(loader_path)
    region = File.read(loader_path)[/const COMPONENTS = \[(.*?)\n    \];/m, 1]
    return { names: [], critical: [] } unless region

    names = []
    critical = []
    region.split(/\},/).each do |entry|
      name = entry[/name:\s*'([^']+)'/, 1]
      next unless name
      names << name
      critical << name if entry =~ /critical:\s*true/
    end
    { names: names.uniq, critical: critical.uniq }
  end

  # window.__NDS_BUNDLES — the namespace→bundle map the loader reads for its lazy
  # stubs + partition. Generated from the actual bundle file lists, so the runtime
  # location can never drift from the build. Shape:
  #   { 'delegated' => { 'file' => 'nds-delegated.min.js', 'ns' => [...] }, 'extras' => {...} }
  def bundle_manifest
    injected_bundles.each_with_object({}) do |(bundle_name, files), m|
      m[bundle_key(bundle_name)] = { 'file' => bundle_name, 'ns' => scan_namespaces(files) }
    end
  end

  # Build guard: location (build) must not contradict classification (loader
  # registry). A namespace packed into an injected bundle must not belong to a
  # `critical` component — critical code must ship in main, or it would init
  # before its bundle loads. Fails the build on violation. The registry `name` IS
  # the NDS namespace, and an entry is critical iff it has `critical: true` (the
  # reveal checklist); everything else is deferred and safe to inject.
  def assert_no_critical_in_injected!
    critical = loader_registry[:critical]
    return if critical.empty?

    # A namespace is flagged only when it appears in an injected bundle yet
    # belongs to a `critical` registry entry — critical code must ship in main.
    violations = injected_bundles.flat_map do |bundle_name, files|
      scan_namespaces(files).select { |ns| critical.include?(ns) }.map { |ns| "#{ns} (in #{bundle_name})" }
    end
    return if violations.empty?

    abort("[js_processor] BUILD FAILED — critical components cannot ship in an injected bundle:\n  " +
          violations.join("\n  ") +
          "\n  Fix: drop `critical: true` from their entry in _js/nds-loader.js (so they default to deferred), or move their file back to nds-main.min.js.")
  end

  # ── Incremental rebuild (mtime staleness) ───────────────────────────
  # Newest mtime across the given paths (nil when none exist).
  def newest_mtime(paths)
    paths.select { |p| File.exist?(p) }.map { |p| File.mtime(p) }.max
  end

  # Inputs whose change invalidates EVERY output: this script (owns the @bundles
  # lists + header/manifest logic) and _config.yml (version/title/debug feed the
  # header and the minify toggle).
  def global_deps
    ['_config.yml', __FILE__].select { |p| File.exist?(p) }
  end

  # Source paths a bundle's output depends on. The main bundle additionally embeds
  # window.__NDS_BUNDLES, whose namespace lists are scanned from EVERY injected
  # bundle's files — so an injected file (a changed namespace export, or a file
  # moving between bundles) restamps main even when no main source changed.
  def bundle_deps(bundle_name, source_files)
    deps = source_files.map { |sf| File.join(@source_dir, sf) }
    deps += injected_bundles.values.flatten.map { |sf| File.join(@source_dir, sf) } if bundle_name == 'nds-main.min.js'
    (deps + global_deps).uniq
  end

  # A bundle is stale when its output is missing or older than any dependency.
  def bundle_stale?(bundle_name, source_files)
    out = File.join(@output_dir, bundle_name)
    return true unless File.exist?(out)
    m = newest_mtime(bundle_deps(bundle_name, source_files))
    m.nil? || m > File.mtime(out)
  end

  # A standalone (non-bundled) file is stale on the same rule. Honors the
  # per-file output-dir override so self-contained themes are checked in place.
  def individual_stale?(basename)
    src = File.join(@source_dir, basename)
    return false unless File.exist?(src)
    out_dir = @output_overrides[basename] || @output_dir
    out = File.join(out_dir, "#{File.basename(basename, '.js')}.min.js")
    return true unless File.exist?(out)
    newest_mtime([src] + global_deps) > File.mtime(out)
  end

  # Compress JavaScript with Terser. When site.debug is on the bundle is left
  # unminified so DevTools profiles and stack traces map to real per-statement
  # lines and every function keeps its name — accurate attribution over size.
  def compress_with_terser(js_content)
    return js_content if @config['debug']

    begin
      require 'tempfile'

      # Create temporary files for input and output
      input_file = Tempfile.new(['input', '.js'])
      input_file.write(js_content)
      input_file.close

      # Run Terser command
      result = `npx terser "#{input_file.path}" --compress drop_console=false,drop_debugger=false --mangle --format beautify=false,comments=false 2>&1`
      
      # Check if command was successful
      if $?.success?
        input_file.unlink
        return result.strip
      else
        puts "Terser error: #{result}"
        input_file.unlink
        return js_content # Fallback to original
      end
    rescue => e
      puts "Terser compression failed: #{e.message}"
      return js_content # Fallback to original
    end
  end

  def process_files(changed_files = nil)
    unless Dir.exist?(@source_dir)
      puts "Source directory #{@source_dir} not found"
      return
    end

    # Ensure output directory exists
    FileUtils.mkdir_p(@output_dir)

    # Get all JS files from source directory
    js_files = Dir.glob(File.join(@source_dir, '*.js'))

    # Fail fast if location (build) contradicts classification (registry).
    assert_no_critical_in_injected!

    bundled_files = @bundles.values.flatten

    # No explicit list (the plain `ruby _plugins/js_processor.rb` run): rebuild
    # only what's STALE — a bundle/file whose output is missing or older than any
    # source input (+ this script + _config.yml). Previously this path treated
    # every file as changed and rebuilt all bundles on every run.
    if changed_files.nil?
      changed_files = []
      @bundles.each { |bn, sfs| changed_files.concat(sfs) if bundle_stale?(bn, sfs) }
      js_files.each do |f|
        b = File.basename(f)
        changed_files << b if !bundled_files.include?(b) && individual_stale?(b)
      end
      changed_files.uniq!
      if changed_files.empty?
        puts 'Nothing to rebuild — all bundles up to date. (use `ruby _plugins/js_processor.rb force` to rebuild all)'
        return
      end
    end

    # Check if any changed files are part of bundles
    bundles_to_process = []
    @bundles.each do |bundle_name, source_files|
      if source_files.any? { |sf| changed_files.include?(sf) }
        bundles_to_process << bundle_name
      end
    end

    # Main embeds window.__NDS_BUNDLES (namespaces scanned from the injected
    # bundles), so a change to ANY injected file must restamp main even when no
    # main source changed.
    if !bundles_to_process.include?('nds-main.min.js') &&
       injected_bundles.values.flatten.any? { |sf| changed_files.include?(sf) }
      bundles_to_process << 'nds-main.min.js'
    end
    
    # Process affected bundles
    bundles_to_process.each do |bundle_name|
      source_files = @bundles[bundle_name]
      bundle_content = ''
      bundle_size = 0
      processed_files = []
      
      source_files.each do |source_file|
        file_path = js_files.find { |f| File.basename(f) == source_file }
        next unless file_path
        
        original_content = File.read(file_path)
        processed_files << file_path
        bundle_size += original_content.length
        
        # Add original content to bundle
        bundle_content += original_content + "\n\n"
      end
      
      if !processed_files.empty?
        # Now compress the clean bundle with Terser
        final_content = compress_with_terser(bundle_content)

        # Header comment (no timestamp — keeps git diffs stable on rebuild)
        project_title = @config['title'] || 'National Design System'
        version = @config['version'] || ''
        author_name = @config['author'] || 'Unknown'
        author_profile = @config['author_profile'] || ''
        license = @config['license'] || 'MIT'
        repo_url = @config['repository_url'] || 'https://github.com/mazin-musleh/NDS-vanilla'

        header_comment = "/*!\n"
        header_comment += " * #{project_title}\n"
        header_comment += " * Version: #{version}\n" unless version.empty?
        header_comment += " * License: #{license}\n"
        header_comment += " * Repository: #{repo_url}\n"
        header_comment += " * Author: #{author_name}\n"
        header_comment += " * Profile: #{author_profile}\n" unless author_profile.empty?
        header_comment += " */\n"
        # The loader reads window.__NDS_BUNDLES (namespace→bundle map) before any
        # component or the loader itself runs, so it must be prepended ahead of the
        # code. Only the critical main bundle carries it.
        manifest_js = ''
        if bundle_name == 'nds-main.min.js'
          manifest_js = "window.__NDS_BUNDLES=#{JSON.generate(bundle_manifest)};\n"
        end
        final_content = header_comment + manifest_js + final_content

        # Write bundle file to assets/js
        bundle_path = File.join(@output_dir, bundle_name)
        File.write(bundle_path, final_content)
        if @config['debug']
          puts "Updated bundle: #{bundle_name} (#{final_content.length} bytes, unminified — debug mode, #{processed_files.length} files)"
        else
          compression_percentage = ((bundle_size - final_content.length).to_f / bundle_size * 100).round(1)
          puts "Updated bundle: #{bundle_name} (#{bundle_size} → #{final_content.length} bytes, #{compression_percentage}% reduction from #{processed_files.length} files)"
        end
        
        # Remove processed files from changed_files so they don't get processed individually
        source_files.each do |bundled_file|
          changed_files.delete(bundled_file)
        end
      end
    end
    
    # Process remaining individual changed files that aren't part of bundles
    # Get list of all files that are part of bundles
    bundled_files = @bundles.values.flatten
    
    changed_files.each do |changed_file|
      # Skip if file is part of any bundle
      next if bundled_files.include?(changed_file)
      file_path = js_files.find { |f| File.basename(f) == changed_file }
      next unless file_path
      
      original_content = File.read(file_path)
      
      # Create .min.js version using Terser compression
      begin
        compressed_content = compress_with_terser(original_content)

        # Header comment (no timestamp — keeps git diffs stable on rebuild)
        project_title = @config['title'] || 'National Design System'
        version = @config['version'] || ''
        author_name = @config['author'] || 'Unknown'
        author_profile = @config['author_profile'] || ''
        license = @config['license'] || 'MIT'
        repo_url = @config['repository_url'] || 'https://github.com/mazin-musleh/NDS-vanilla'

        header_comment = "/*!\n"
        header_comment += " * #{project_title}\n"
        header_comment += " * Version: #{version}\n" unless version.empty?
        header_comment += " * License: #{license}\n"
        header_comment += " * Repository: #{repo_url}\n"
        header_comment += " * Author: #{author_name}\n"
        header_comment += " * Profile: #{author_profile}\n" unless author_profile.empty?
        header_comment += " */\n"
        compressed_content = header_comment + compressed_content

        # Create minified version with .min.js extension (output dir is overridable
        # per file so self-contained themes ship beside their assets).
        filename = File.basename(file_path, '.js')
        out_dir = @output_overrides[File.basename(file_path)] || @output_dir
        FileUtils.mkdir_p(out_dir)
        min_file = File.join(out_dir, "#{filename}.min.js")
        File.write(min_file, compressed_content)
        if @config['debug']
          puts "Updated: #{File.basename(min_file)} (#{compressed_content.length} bytes, unminified — debug mode)"
        else
          compression_percentage = ((original_content.length - compressed_content.length).to_f / original_content.length * 100).round(1)
          puts "Updated: #{File.basename(min_file)} (#{original_content.length} → #{compressed_content.length} bytes, #{compression_percentage}% reduction)"
        end
      rescue => compression_error
        puts "Failed to compress #{File.basename(file_path)}: #{compression_error.message}"
      end
    end
  end

  def watch
    require 'listen'
    
    puts "Watching #{@source_dir} for changes..."
    
    listener = Listen.to(@source_dir) do |modified, added, removed|
      if modified.any? || added.any? || removed.any?
        puts "\nFiles changed in #{@source_dir}:"
        puts "  Modified: #{modified.map { |f| File.basename(f) }}" if modified.any?
        puts "  Added: #{added.map { |f| File.basename(f) }}" if added.any?
        puts "  Removed: #{removed.map { |f| File.basename(f) }}" if removed.any?
        
        # Get list of changed files (basenames only)
        changed_files = []
        changed_files += modified.map { |f| File.basename(f) } if modified.any?
        changed_files += added.map { |f| File.basename(f) } if added.any?
        # Note: removed files don't need processing, but we could clean up their output files
        
        puts "\nProcessing only changed files..."
        process_files(changed_files)
        puts "Done!\n"
      end
    end
    
    # Process all files initially
    puts "Initial processing of all files..."
    process_files
    puts "Initial processing complete.\n"
    
    listener.start
    
    begin
      puts "Press Ctrl+C to stop watching..."
      sleep
    rescue Interrupt
      puts "\nStopping file watcher..."
      listener.stop
    end
  end
end

# If running as script
if __FILE__ == $0
  processor = JSProcessor.new
  
  if ARGV[0] == 'watch'
    processor.watch
  elsif ['force', 'all', '-f'].include?(ARGV[0])
    # Rebuild every bundle + standalone file regardless of mtimes. Use after a
    # git checkout/pull (git doesn't preserve mtimes, so staleness can't be
    # trusted) or to force a clean rebuild.
    processor.process_files(Dir.glob('_js/*.js').map { |f| File.basename(f) })
  else
    processor.process_files
  end
end