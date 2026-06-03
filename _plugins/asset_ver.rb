# frozen_string_literal: true

# Exposes `site.asset_ver` for cache-busting asset URLs (CSS/JS).
# Format: "{site.version}.{short-sha}", e.g. "1.0.1.311908e".
# The short SHA changes whenever HEAD moves, so every commit invalidates
# browser caches without manual per-file version bumps.
# Falls back to "dev" outside a git repo or when git is unavailable.
Jekyll::Hooks.register :site, :after_init do |site|
  version = site.config['version'] || '0.0.0'

  sha = `git -C "#{site.source}" rev-parse --short HEAD 2>&1`.strip
  sha = 'dev' unless $?.success? && !sha.empty?

  site.config['asset_ver'] = "#{version}.#{sha}"
end
