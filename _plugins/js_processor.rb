# JavaScript Processor for National Design System
# 
# This script processes JavaScript files from the _js directory and outputs
# minified/bundled versions to assets/js for production use.
#
# USAGE:
#   ruby _plugins/js_processor.rb          # Process files once
#   ruby _plugins/js_processor.rb watch    # Watch for changes and auto-process
#   ruby _plugins/js_processor.rb check-audit   # pre-commit: is the staged audit bundle built from the staged inputs?
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
require 'digest'

class JSProcessor
  def initialize
    @source_dir = '_js'
    @output_dir = 'assets/js'
    # Per-file output dir overrides (keyed by source basename). docs-assets/ holds
    # everything only the documentation site loads, so a consumer copying assets/
    # into their project never hosts it — here, the docs builder.
    #
    # Only self-booting files may be overridden. nds-loader.js derives the asset
    # dir from nds-main.min.js's own src and fetches every injected bundle as a
    # SIBLING, so anything in @bundles must stay in @output_dir or it 404s at
    # runtime. Safe here: nds-docs is a plain <script> tag from the layouts,
    # not loader-managed.
    @output_overrides = {
      'nds-docs.js' => 'docs-assets/js',
    }
    # Event packs (_js/events/) are NOT built here: scripts/mkevent.py owns a pack end to end
    # (minify, inline its CSS, zip). Building them here too blanked the inlined CSS on every run.
    @skip_dirs = [File.join(@source_dir, 'events')]
    @bundles = {
      # Critical bundle — loaded via <script defer>. Carries core, the loader,
      # shared utils (backdrop/feedback — mainnav reads NDS.Backdrop.isActive()
      # synchronously, a lazy stub can't bridge that; forms shows Feedback at
      # submit), every critical component, dropmenu (deferred, but a
      # critical-init dependency of multiselect), and deferred components
      # deliberately kept in main: consent (applied at eval, before analytics), customselect (JS-derived label would flash if async),
      # otp (auto-advance/paste is first-interaction-critical on OTP/2FA pages).
      # They stay so they wire on the local idle pass, not after an injected
      # bundle. Reveal is gated on this bundle, so it's kept lean.
      'nds-main.min.js' => ['nds-core.js', 'nds-date.js', 'nds-theme.js', 'nds-main-nav.js', 'nds-sidemenu.js', 'nds-drawer.js', 'nds-scroll-more.js', 'nds-consent.js', 'nds-validation.js', 'nds-field.js', 'nds-typing.js', 'nds-form.js', 'nds-checkbox.js', 'nds-radio.js', 'nds-switch.js', 'nds-otp.js', 'nds-dropmenu.js', 'nds-custom-select.js', 'nds-multiselect.js', 'nds-taginput.js', 'nds-backdrop.js', 'nds-feedback.js', 'nds-sideinfo.js', 'nds-toc.js', 'nds-empty.js', 'nds-grid.js', 'nds-cooldown.js', 'nds-link.js', 'nds-print.js', 'nds-loader.js'],
      # Delegated — deferred components verified safe to load late. Injected by
      # nds-loader.js AFTER the critical pass (never a render-blocking defer tag), so
      # its download never gates the reveal. Components migrate in here over time
      # as each is confirmed cold-init / late-init-safe; move the file here and
      # drop `critical: true` from its loader registry entry (location is owned here, not the
      # registry — the build generates the namespace→bundle map from these lists).
      # nds-sort.js leads the list: it's the shared sort engine for filter/tables.
      'nds-delegated.min.js' => ['nds-sort.js', 'nds-filter.js', 'nds-pagination.js', 'nds-swiper.js', 'nds-stepper.js', 'nds-breadcrumb.js', 'nds-accordion.js', 'nds-tabs.js', 'nds-expandable.js', 'nds-copy.js', 'nds-share.js', 'nds-dialog.js', 'nds-modal.js', 'nds-alert.js', 'nds-city-weather.js', 'nds-time-date.js', 'nds-digital-stamp.js', 'nds-progress.js', 'nds-voice-input.js', 'nds-numbers.js', 'nds-user-feedback.js', 'nds-rating.js', 'nds-slider.js', 'nds-table.js', 'nds-selection.js', 'nds-panel.js', 'nds-fab.js', 'nds-password.js', 'nds-tooltip.js', 'nds-countdown.js', 'nds-session-timeout.js'],
      # Extras — heavy, page-specific leaf components. Injected by nds-loader.js
      # only when the page contains one of them (selector-gated).
      'nds-extras.min.js' => ['nds-date-picker.js', 'nds-time-picker.js', 'nds-autocomplete.js', 'nds-ipv.js', 'nds-export.js', 'nds-upload.js'],
      # Big leaves with NO inbound calls get their own chunk, so a page with one date
      # picker doesn't download them. A file another component calls synchronously
      # must share that caller's bundle — the lazy stub can't answer a sync read.
      # Editor's NDS.Upload use is optional-chained and late, so Upload stays in extras.
      # nds-code.js is documentation-only — no consumer site renders code blocks.
      'nds-editor.min.js' => ['nds-editor.js'],
      'nds-chart.min.js' => ['nds-chart.js'],
      'nds-code.min.js' => ['nds-code.js'],
      # Audit — debug diagnostics, its own bundle so production pages ship zero
      # bytes of it. NEVER auto-injected (no component registry entry): the
      # loader pulls it via the NDS.audit lazy stub when enableLogging schedules
      # the post-init sweep, or on the first NDS.init.audit() call.
      'nds-audit.min.js' => ['nds-audit.js'],
      # Accessibility — the optional panel, its own bundle so a visitor who
      # never opens it never downloads it. Auto-injected ONLY for a returning
      # visitor with saved prefs (the registry entry's eager()); otherwise the
      # loader arms the FAB and the lazy stub pulls this on the first press.
      # No <script> tag: dropping this file is the opt-out, and loadBundle
      # resolves on error.
      'nds-accessibility.min.js' => ['nds-accessibility.js'],
      # Cookies, the consent UI — lazy the same way: fetched for a visitor with no stored
      # choice, or on the first [data-cookies-toggle] press. The store, NDS.consent, stays in main.
      'nds-cookies.min.js' => ['nds-cookies.js']
    }
    # Sheets a bundle owns. nds-loader.js requests these in parallel with the
    # bundle's JS, so a lazily-loaded component's styles are not a second round
    # trip behind its code. Keyed by bundle output name; a bundle with no sheet
    # of its own is simply absent. A LIST, so a bundle that grows a second sheet
    # needs no change to the manifest shape or the loader — list order is append
    # order, which is cascade order.
    #
    # Declared, never inferred from the filename: nds-main.min.js would then pair
    # with nds-main.min.css, which is head-linked and gates the reveal — the
    # loader must never fetch that one.
    @bundle_css = {
      'nds-accessibility.min.js' => ['nds-accessibility.min.css'],
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
      File.read(path).scan(/\bNDS\.([A-Za-z][A-Za-z0-9_]*)\s*=(?!=)/) { |m| ns << m[0] }
    end.uniq
  end

  # Build guard (PERSONA entry 11): a lowercase namespace is core or a base. A base lives with its
  # callers, in their bundle when they all share one, else in main, so no caller ever meets its stub;
  # and it is listed before every file in its bundle that names it (a TypeError at eval stops the bundle).
  def assert_layers!
    strip = ->(sf) { File.read(File.join(@source_dir, sf)).gsub(%r{/\*.*?\*/}m, '').gsub(%r{(?<!:)//[^\n]*}, '') }
    bundle_of = @bundles.each_with_object({}) { |(b, files), m| files.each { |f| m[f] = b } }
    errors = []
    injected_bundles.each do |bundle_name, files|
      next if bundle_name == 'nds-audit.min.js' # on demand: its callers reach it only through the stub
      files.each do |sf|
        scan_namespaces([sf]).grep(/\A[a-z]/).each do |ns|
          away = bundle_of.keys.reject { |f| f == sf || bundle_of[f] == bundle_name }.select { |f| strip.call(f) =~ /\bNDS\.#{ns}\b/ }
          errors << "#{sf} (NDS.#{ns}) ships in #{bundle_name}, but #{away.join(', ')} call it from another bundle: move it to nds-main.min.js" unless away.empty?
        end
      end
    end
    @bundles.each_value do |files|
      files.each_with_index do |sf, i|
        next if i.zero? || sf == 'nds-loader.js' # the loader runs last on purpose; others call it at runtime
        scan_namespaces([sf]).grep(/\A[a-z]/).each do |ns|
          early = files[0...i].select { |prev| strip.call(prev) =~ /\bNDS\.#{ns}\b/ }
          errors << "#{sf} (NDS.#{ns}) is listed after #{early.join(', ')}, which names it" unless early.empty?
        end
      end
    end
    return if errors.empty?

    abort("[js_processor] BUILD FAILED — layer rules (PERSONA entry 11):\n  " + errors.join("\n  "))
  end

  # The loader `components` registry, parsed once: every component `name`, and the
  # subset flagged `critical: true` (the reveal checklist). The registry `name` IS
  # the NDS namespace.
  def loader_registry
    loader_path = File.join(@source_dir, 'nds-loader.js')
    return { names: [], critical: [] } unless File.exist?(loader_path)
    region = File.read(loader_path)[/const components = \[(.*?)\n    \];/m, 1]
    # No match would empty the registry and pass every guard that reads it.
    abort('[js_processor] BUILD FAILED — nds-loader.js has no `const components = [` registry') unless region

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
      entry = { 'file' => bundle_name, 'ns' => scan_namespaces(files) }
      css = @bundle_css[bundle_name]
      entry['css'] = Array(css) if css && !Array(css).empty?
      m[bundle_key(bundle_name)] = entry
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
    deps += [MIGRATIONS] + anatomy_sources if bundle_name == 'nds-audit.min.js'
    (deps + global_deps).uniq
  end

  # _data/migrations.yml as the audit's rows: [kind, name, scope, status, use, since, fix, inert],
  # 0 for an empty field. A fix that only says "Use <use>." is rebuilt at runtime. Events, URL
  # params, JS APIs, file names and storage keys stay out: a page cannot see a listener, a call, a
  # bundle list, what its server reads or what its code reads.
  MIGRATIONS = '_data/migrations.yml'
  def migrations_js
    rows = YAML.load(read_text(MIGRATIONS)).reject { |r| %w[event param api file storage].include?(r['kind']) }.map do |r|
      fix = r['fix'] == "Use #{r['use']}." ? 0 : r['fix']
      [r['kind'], r['name'], r['scope'] || 0, r['status'], r['use'] || 0, r['since'].to_s, fix || 0, r['inert'] ? 1 : 0]
    end
    JSON.generate(rows)
  end

  # The audit's anatomy: every nds- name the docs, includes, data and scripts use (known), and each
  # part that sits inside its component root in every canon (parts: part → root). A part inside
  # a -menu is left out: the menu may portal to <body>.
  ANATOMY_DOCS = '{foundations,components,ui-shell,layout,utilities,core}/*.md'
  ANATOMY_NAME = /(?<![\w-])nds-[a-z0-9]+(?:-[a-z0-9]+)*/
  VOID_TAGS = %w[area base br col embed hr img input link meta source track wbr].freeze
  def anatomy_sources
    find_files(ANATOMY_DOCS) + find_files('{templates,examples}/*.md') + find_files('{_includes,_layouts}/**/*.html') +
      find_files('_js/**/*.js') + find_files('_data/**/*.yml') + find_files('_plugins/*.rb')
  end
  def anatomy_data
    known = anatomy_sources.flat_map { |f| read_text(f).scan(ANATOMY_NAME) }.uniq.sort
    ancestors = Hash.new { |h, k| h[k] = [] }
    find_files(ANATOMY_DOCS).each do |f|
      read_text(f).scan(/<script\b([^>]*\bdata-canon\b[^>]*)>(.*?)<\/script>/m) do |attrs, body|
        next if attrs =~ /data-lang="(js|css)"|data-generated|data-escaped/
        stack = []
        body.gsub(/<!--.*?-->/m, '').scan(/<(\/)?([a-zA-Z][\w-]*)([^>]*?)(\/)?>/) do |close, tag, rest, self_close|
          tag = tag.downcase
          if close
            i = stack.rindex { |e| e[0] == tag }
            stack = stack[0...i] if i
            next
          end
          classes = (rest[/\bclass\s*=\s*"([^"]*)"/, 1] || '').split.grep(/\Ands-/)
          above = stack.flat_map(&:last)
          classes.each { |c| ancestors[c] << above }
          stack << [tag, classes] unless VOID_TAGS.include?(tag) || self_close
        end
      end
    end
    parts = {}
    ancestors.each do |c, sets|
      segs = c.split('-')
      root = (segs.length - 1).downto(2).map { |k| segs[0...k].join('-') }.find { |r| ancestors.key?(r) }
      next unless root
      next if sets.any? { |a| a.any? { |x| x.end_with?('-menu') } }
      parts[c] = root if sets.all? { |a| a.include?(root) }
    end
    { known: known, parts: parts, requires: requires_rows }
  end

  # One short hash per part of the audit's data, written into the bundle's header. Order-free, so
  # check-audit reading the staged index agrees with a build reading the disk.
  def audit_stamp(migrations, anatomy)
    parts = { 'migrations' => migrations, 'known' => anatomy[:known], 'parts' => anatomy[:parts].sort.to_h, 'requires' => anatomy[:requires] }
    parts.map { |k, v| "#{k}:#{Digest::SHA1.hexdigest(v.is_a?(String) ? v : JSON.generate(v))[0, 10]}" }.join(' ')
  end

  # The audit's inputs come from the disk, or from the staged index for check-audit: the commit
  # hook asks whether THIS commit leaves the bundle behind, whatever else is unstaged.
  def read_text(path)
    return File.read(path, encoding: 'utf-8') unless @index
    @index.fetch(path)
  end

  # Dir.glob's order: one brace alternative after another, each sorted.
  def find_files(pattern)
    return Dir.glob(pattern) unless @index
    alternatives = pattern =~ /\{([^}]*)\}/ ? $1.split(',').map { |alt| pattern.sub(/\{[^}]*\}/, alt) } : [pattern]
    alternatives.flat_map { |alt| @index.keys.select { |p| File.fnmatch(alt, p, File::FNM_PATHNAME) }.sort }
  end

  AUDIT_INPUTS = %r{\A(?:foundations|components|ui-shell|layout|utilities|core|templates|examples|_includes|_layouts|_js|_data|_plugins)/.+\.(?:md|html|js|yml|rb)\z}
  def staged_file(path)
    out = IO.popen(['git', 'show', ":#{path}"], &:read)
    $?.success? ? out.force_encoding('utf-8') : nil
  end

  # pre-commit: is the staged nds-audit.min.js built from the staged files that feed it? Prints what
  # moved and the fix when not.
  def check_audit
    paths = IO.popen(['git', 'ls-files', '-z'], &:read).split("\0").grep(AUDIT_INPUTS)
    @index = {}
    IO.popen(['git', 'cat-file', '--batch'], 'r+') do |io|
      paths.each do |p|
        io.puts ":#{p}"
        size = io.gets.split[2].to_i
        @index[p] = io.read(size).force_encoding('utf-8')
        io.read(1)
      end
    end
    bundle = staged_file('assets/js/nds-audit.min.js') or return true
    anatomy = anatomy_data
    want = audit_stamp(migrations_js, anatomy)
    have = bundle[/^ \* Audit data: (.+)$/, 1]
    return true if have == want
    moved = have ? want.split.reject { |part| have.split.include?(part) }.map { |part| part.split(':').first } : ['no stamp yet']
    puts "pre-commit: assets/js/nds-audit.min.js is behind the staged files that feed it (#{moved.join(', ')})."
    old_known = (bundle[/known:\[(.*?)\]/m, 1] || '').scan(/"([^"]+)"/).flatten
    if moved.include?('known') && !old_known.empty?
      added = anatomy[:known] - old_known
      gone = old_known - anatomy[:known]
      puts "  names: #{(added.first(10).map { |n| "+#{n}" } + gone.first(10).map { |n| "-#{n}" }).join(' ')}"
    end
    staged = IO.popen(['git', 'diff', '--cached', '--name-only'], &:read).split("\n").grep(AUDIT_INPUTS)
    puts "  from: #{staged.first(8).join(', ')}#{staged.size > 8 ? ' …' : ''}" unless staged.empty?
    puts '  fix: ruby _plugins/js_processor.rb && git add assets/js/nds-audit.min.js'
    false
  end

  # Each banner's Requires lines: "<host> needs|needs one X per|sits in|sits outside|is|with|points at X via" … " — why".
  # Rows: [component, host, verb, arg, extra, why]. A line that does not parse fails the build.
  REQUIRES_LINE = /\A(.+?) (needs one|points at|sits outside|sits in|needs|is|with) (.+?) — (.+)\z/
  def requires_rows
    find_files('_js/**/*.js').sort.flat_map do |f|
      head = read_text(f)[/\A\/\*.*?\*\//m] || ''
      name = head[/\A\/\*\s*NDS\.(\S+)/, 1]
      block = head[/^ \* Requires:\s*\n(.*?)(?=^ \* (?:Methods|Events|Hooks|Gotchas))/m, 1]
      next [] unless name && block
      block.lines.map(&:strip).map { |l| l.sub(/\A\*\s*/, '') }.reject(&:empty?).map do |l|
        m = l.match(REQUIRES_LINE) or raise "#{f}: Requires line does not parse: #{l}"
        host, verb, arg, why = m.captures
        extra = 0
        if verb == 'needs one'
          arg, extra = arg.split(' per ', 2)
          raise "#{f}: 'needs one' takes 'X per Y': #{l}" unless extra
        elsif verb == 'points at'
          arg, extra = arg.split(' via ', 2)
          raise "#{f}: 'points at' takes 'X via attribute': #{l}" unless extra
        end
        [name, host, verb, arg, extra, why]
      end
    end
  end

  # A bundle is stale when its output is missing or older than any dependency.
  def bundle_stale?(bundle_name, source_files)
    out = File.join(@output_dir, bundle_name)
    return true unless File.exist?(out)
    m = newest_mtime(bundle_deps(bundle_name, source_files))
    m.nil? || m > File.mtime(out)
  end

  # Basename -> real path. Sources may sit in a subfolder, so a name is resolved
  # against a recursive scan, never assumed to be _js/<name>.
  def source_path(basename)
    @source_index ||= source_files_on_disk
                         .each_with_object({}) { |p, h| h[File.basename(p)] ||= p }
    @source_index[basename]
  end

  # A standalone (non-bundled) file is stale on the same rule. Honors the
  # per-file output-dir override so self-contained themes are checked in place.
  def individual_stale?(basename)
    src = source_path(basename)
    return false unless src && File.exist?(src)
    out_dir = @output_overrides[basename] || @output_dir
    out = File.join(out_dir, "#{File.basename(basename, '.js')}.min.js")
    return true unless File.exist?(out)
    newest_mtime([src] + global_deps) > File.mtime(out)
  end

  # Compress JavaScript with Terser. When site.debug is on the bundle is left
  # unminified so DevTools profiles and stack traces map to real per-statement
  # lines and every function keeps its name — accurate attribution over size.
  # Every source this processor builds: _js/ recursively, minus @skip_dirs.
  def source_files_on_disk
    Dir.glob(File.join(@source_dir, '**', '*.js'))
       .reject { |p| @skip_dirs.any? { |d| p.start_with?(d + '/') } }
  end

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

    js_files = source_files_on_disk

    # Fail fast if location (build) contradicts classification (registry).
    assert_no_critical_in_injected!
    assert_layers!

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
        if source_file == 'nds-audit.js'
          # A lost marker would ship an audit that silently finds no old names.
          raise 'nds-audit.js: /*@migrations*/[] marker missing' unless original_content.include?('/*@migrations*/[]')
          migrations = migrations_js
          anatomy = anatomy_data
          @audit_stamp = audit_stamp(migrations, anatomy)
          original_content = original_content.sub('/*@migrations*/[]') { migrations }
          raise 'nds-audit.js: /*@anatomy*/{} marker missing' unless original_content.include?('/*@anatomy*/{}')
          original_content = original_content.sub('/*@anatomy*/{}') { JSON.generate(anatomy) }
        end
        processed_files << file_path
        bundle_size += original_content.length
        
        # Add original content to bundle
        bundle_content += original_content + "\n\n"
      end
      
      if !processed_files.empty?
        # A bundle runs once per page (PERSONA entry 12 rule 17): a second copy would reset every
        # module latch and wire every singleton again. Safe as a block: every file is an IIFE.
        flag = "window.__NDS_LOADED_#{bundle_key(bundle_name).upcase.tr('-', '_')}"
        bundle_content = "if (#{flag}) console.warn('[NDS] #{bundle_name} loaded twice; the second copy does nothing.');\n" \
                         "else {\n#{flag} = true;\n#{bundle_content}}\n"

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
        # The pre-commit hook (check-audit) compares this stamp with the staged inputs.
        header_comment += " * Audit data: #{@audit_stamp}\n" if bundle_name == 'nds-audit.min.js'
        header_comment += " */\n"
        # The loader reads window.__NDS_BUNDLES (namespace→bundle map) before any
        # component or the loader itself runs, so it must be prepended ahead of the
        # code. Only the critical main bundle carries it.
        manifest_js = ''
        if bundle_name == 'nds-main.min.js'
          manifest = bundle_manifest
          # NDS.init.audit() calls the audit's stub; with no manifest row it throws.
          abort('[js_processor] BUILD FAILED — the bundle manifest names no audit namespace') unless manifest.values.any? { |e| e['ns'].include?('audit') }
          manifest_js = "window.__NDS_BUNDLES=#{JSON.generate(manifest)};\n"
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

        # Header comment (no timestamp — keeps git diffs stable on rebuild).
        # Docs-only outputs (@output_overrides — the docs builder + event themes) skip the
        # version line: they never ship to a consumer, and the stamp dirties the
        # file on every version bump.
        project_title = @config['title'] || 'National Design System'
        version = @config['version'] || ''
        author_name = @config['author'] || 'Unknown'
        author_profile = @config['author_profile'] || ''
        license = @config['license'] || 'MIT'
        repo_url = @config['repository_url'] || 'https://github.com/mazin-musleh/NDS-vanilla'
        docs_only = @output_overrides.key?(File.basename(file_path))

        header_comment = "/*!\n"
        header_comment += " * #{project_title}\n"
        header_comment += " * Version: #{version}\n" unless version.empty? || docs_only
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
  
  if ARGV[0] == 'check-audit'
    exit(processor.check_audit ? 0 : 1)
  elsif ARGV[0] == 'watch'
    processor.watch
  elsif ['force', 'all', '-f'].include?(ARGV[0])
    # Rebuild every bundle + standalone file regardless of mtimes. Use after a
    # git checkout/pull (git doesn't preserve mtimes, so staleness can't be
    # trusted) or to force a clean rebuild.
    processor.process_files(Dir.glob('_js/*.js').map { |f| File.basename(f) })
  else
    processor.process_files
  end
  unless ARGV[0] == 'watch'
    # The word packs ship beside the bundles: their English lives in _js/, their banner carries the version.
    system('node', 'scripts/check-i18n.mjs', '--build')
    # mkrelease's JS gates, run here so a slip fails the change that makes it, not the release.
    failed = [%w[check-banners.mjs --all], %w[check-js-rules.mjs], %w[check-js-rules.mjs --names]].reject do |script, *args|
      out = IO.popen(['node', "scripts/#{script}", *args], err: [:child, :out], &:read)
      next true if $?.success?
      puts "[js_processor] #{script} #{args.join(' ')} failed:", out.lines.reject { |l| l.start_with?('verify') || l =~ /\sok$/ }
    end
    exit 1 unless failed.empty?
  end
end