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
    @bundles = {
      # Critical bundle — loaded via <script defer>. Carries core, the loader,
      # shared utils (backdrop/sort/feedback), every critical component, dropmenu
      # (deferred, but a critical-init dependency of breadcrumb/pagination/multiselect),
      # and deferred components deliberately kept in main: mainnav + fontLoading
      # (first-paint critical), tables + cookies (pending refactor), customselect
      # (JS-derived label would flash if async), otp (auto-advance/paste is
      # first-interaction-critical on OTP/2FA pages). They stay so they wire on the
      # local idle pass, not after an injected bundle. Reveal is gated on this
      # bundle, so it's kept lean.
      'nds-main.min.js' => ['nds-core.js', 'nds-theme.js', 'nds-mainnav.js', 'nds-fontLoading.js', 'nds-sidemenu.js', 'nds-drawer.js', 'nds-scroll-more.js', 'nds-cookies.js', 'nds-sort.js', 'nds-stepper.js', 'nds-swiper.js', 'nds-forms.js', 'nds-otp.js', 'nds-code.js', 'nds-expandable.js', 'nds-breadcrumb.js', 'nds-dropmenu.js', 'nds-customselect.js', 'nds-multiselect.js', 'nds-pagination.js', 'nds-backdrop.js', 'nds-feedback.js', 'nds-filter.js', 'nds-sideinfo.js', 'nds-toc.js', 'nds-empty.js', 'nds-cooldown-button.js', 'nds-link.js', 'nds-loader.js'],
      # Delegated — deferred components verified safe to load late. Injected by
      # nds-loader.js AFTER the critical pass (never a render-blocking defer tag), so
      # its download never gates the reveal. Components migrate in here over time
      # as each is confirmed cold-init / late-init-safe; move the file here and
      # drop `critical: true` from its loader registry entry (location is owned here, not the
      # registry — the build generates the namespace→bundle map from these lists).
      'nds-delegated.min.js' => ['nds-mainnav__delegated.js', 'nds-accordion.js', 'nds-tabs.js', 'nds-copy.js', 'nds-share.js', 'nds-modal.js', 'nds-alert.js', 'nds-cityWeather.js', 'nds-timeDate.js', 'nds-digitalStamp.js', 'nds-progress.js', 'nds-voice-input.js', 'nds-numbers.js', 'nds-user-feedback.js', 'nds-rating.js', 'nds-tables.js', 'nds-filter__delegated.js'],
      # Extras — heavy, page-specific, zero-inbound leaf components. Injected by
      # nds-loader.js only when the page contains one of them (selector-gated), so
      # plain pages never download/parse them. May later be split into smaller
      # per-component bundles (add a bundle here; the loader picks it up from the
      # generated manifest).
      'nds-extras.min.js' => ['nds-date-picker.js', 'nds-chart.js', 'nds-autocomplete.js', 'nds-ipv.js', 'nds-tooltip.js', 'nds-export.js', 'nds-upload.js']
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
  #
  # `*__delegated.js` behavior halves are SKIPPED: a half attaches to its component
  # via `NDS.<Name>._installBehavior(...)` and never owns a namespace, so its
  # namespace must not enter an injected bundle's `ns` manifest (the loader would
  # then mis-classify the split component as wholly-injected and delay its eager
  # init) nor trip assert_no_critical_in_injected!. See split_manifest for how
  # split namespaces are mapped instead.
  def scan_namespaces(source_files)
    source_files.each_with_object([]) do |sf, ns|
      next if sf.end_with?('__delegated.js')
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

  # Split components: a `nds-X__delegated.js` behavior half in an injected bundle is
  # the sanctioned lazy companion of the eager shell `nds-X.js` (which ships in main
  # and owns NDS.X). Derives each pair from the bundle file lists.
  def split_pairs
    injected_bundles.each_with_object([]) do |(bundle_name, files), pairs|
      files.select { |f| f.end_with?('__delegated.js') }.each do |half|
        pairs << { half: half, shell: half.sub(/__delegated\.js\z/, '.js'), bundle: bundle_name }
      end
    end
  end

  # window.__NDS_SPLIT — split namespace → injected-bundle KEY. The loader's
  # loadSplit(ns) resolves this to loadBundle(key); the half then self-attaches via
  # _installBehavior. The namespace is read from the SHELL (the half owns none).
  def split_manifest
    split_pairs.each_with_object({}) do |p, m|
      scan_namespaces([p[:shell]]).each { |ns| m[ns] = bundle_key(p[:bundle]) }
    end
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

    # scan_namespaces already skips `*__delegated.js`, so a split component's
    # sanctioned behavior half never counts as a violation here; only its eager
    # shell (a normal `.js`) would, and that must stay in main.
    violations = injected_bundles.flat_map do |bundle_name, files|
      scan_namespaces(files).select { |ns| critical.include?(ns) }.map { |ns| "#{ns} (in #{bundle_name})" }
    end
    return if violations.empty?

    abort("[js_processor] BUILD FAILED — critical components cannot ship in an injected bundle:\n  " +
          violations.join("\n  ") +
          "\n  Fix: drop `critical: true` from their entry in _js/nds-loader.js (so they default to deferred), or move their file back to nds-main.min.js.")
  end

  # Build guard for split components: a `nds-X__delegated.js` behavior half is only
  # valid when its eager shell ships in main, owns a real registry namespace, and
  # the half attaches via _installBehavior rather than redefining NDS.X.
  def assert_splits_valid!
    pairs = split_pairs
    return if pairs.empty?

    reg = loader_registry
    main = @bundles['nds-main.min.js'] || []
    errors = []

    pairs.each do |p|
      ns = scan_namespaces([p[:shell]]).first
      errors << "#{p[:shell]} (eager shell of #{p[:half]}) must be listed in nds-main.min.js" unless main.include?(p[:shell])
      if ns.nil?
        errors << "#{p[:shell]} must exist and assign NDS.<Name> (eager shell of #{p[:half]})"
        next
      end
      errors << "#{ns} (#{p[:shell]}) must be a component in the nds-loader.js registry" unless reg[:names].include?(ns)
      half_path = File.join(@source_dir, p[:half])
      if File.exist?(half_path) && File.read(half_path) =~ /\bNDS\.#{Regexp.escape(ns)}\s*=(?!=)/
        errors << "#{p[:half]} must attach via NDS.#{ns}._installBehavior(...), not reassign NDS.#{ns}"
      end
    end
    return if errors.empty?

    abort("[js_processor] BUILD FAILED — invalid split component(s):\n  " + errors.join("\n  "))
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

    # If no specific files provided, process all files
    if changed_files.nil?
      changed_files = Dir.glob(File.join(@source_dir, '*.js')).map { |f| File.basename(f) }
    end

    # Get all JS files from source directory
    js_files = Dir.glob(File.join(@source_dir, '*.js'))

    # Fail fast if location (build) contradicts classification (registry).
    assert_no_critical_in_injected!
    assert_splits_valid!

    # Check if any changed files are part of bundles
    bundles_to_process = []
    @bundles.each do |bundle_name, source_files|
      if source_files.any? { |sf| changed_files.include?(sf) }
        bundles_to_process << bundle_name
      end
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
          split = split_manifest
          manifest_js += "window.__NDS_SPLIT=#{JSON.generate(split)};\n" unless split.empty?
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

        # Create minified version with .min.js extension in assets/js
        filename = File.basename(file_path, '.js')
        min_file = File.join(@output_dir, "#{filename}.min.js")
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
  else
    processor.process_files
  end
end