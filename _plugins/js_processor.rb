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

class JSProcessor
  def initialize
    @source_dir = '_js'
    @output_dir = 'assets/js'
    @bundles = {
      'nds-main.min.js' => ['nds-core.js', 'nds-theme.js', 'nds-mainnav.js', 'nds-fontLoading.js', 'nds-cityWeather.js', 'nds-timeDate.js','nds-date-picker.js', 'nds-sidemenu.js', 'nds-drawer.js', 'nds-scroll-more.js', 'nds-share.js', 'nds-cookies.js', 'nds-numbers.js', 'nds-accordion.js', 'nds-tabs.js', 'nds-sort.js', 'nds-tables.js', 'nds-stepper.js', 'nds-progress.js', 'nds-swiper.js', 'nds-forms.js', 'nds-otp.js', 'nds-upload.js', 'nds-code.js', 'nds-copy.js', 'nds-rating.js', 'nds-expandable.js', 'nds-breadcrumb.js', 'nds-dropmenu.js', 'nds-tooltip.js', 'nds-multiselect.js', 'nds-pagination.js', 'nds-ipv.js', 'nds-backdrop.js', 'nds-modal.js', 'nds-alert.js', 'nds-feedback.js', 'nds-filter.js', 'nds-user-feedback.js', 'nds-sideinfo.js', 'nds-toc.js', 'nds-autocomplete.js', 'nds-chart.js', 'nds-empty.js', 'nds-cooldown-button.js', 'nds-link.js', 'nds-loader.js']
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

  # Helper function to compress JavaScript using Terser
  def compress_with_terser(js_content)
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
        author_name = @config['author'] || 'Unknown'
        author_profile = @config['author_profile'] || ''
        license = @config['license'] || 'MIT'
        repo_url = @config['repository_url'] || 'https://github.com/mazin-musleh/NDS-vanilla'

        header_comment = "/*!\n"
        header_comment += " * #{project_title}\n"
        header_comment += " * License: #{license}\n"
        header_comment += " * Repository: #{repo_url}\n"
        header_comment += " * Author: #{author_name}\n"
        header_comment += " * Profile: #{author_profile}\n" unless author_profile.empty?
        header_comment += " */\n"
        final_content = header_comment + final_content

        # Write bundle file to assets/js
        bundle_path = File.join(@output_dir, bundle_name)
        File.write(bundle_path, final_content)
        compression_percentage = ((bundle_size - final_content.length).to_f / bundle_size * 100).round(1)
        puts "Updated bundle: #{bundle_name} (#{bundle_size} → #{final_content.length} bytes, #{compression_percentage}% reduction from #{processed_files.length} files)"
        
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
        author_name = @config['author'] || 'Unknown'
        author_profile = @config['author_profile'] || ''
        license = @config['license'] || 'MIT'
        repo_url = @config['repository_url'] || 'https://github.com/mazin-musleh/NDS-vanilla'

        header_comment = "/*!\n"
        header_comment += " * #{project_title}\n"
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
        compression_percentage = ((original_content.length - compressed_content.length).to_f / original_content.length * 100).round(1)
        puts "Updated: #{File.basename(min_file)} (#{original_content.length} → #{compressed_content.length} bytes, #{compression_percentage}% reduction)"
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