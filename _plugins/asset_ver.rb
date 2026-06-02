# frozen_string_literal: true

# Exposes `site.asset_ver` — the build version stamped into asset banners (and the
# cache-busting `?ver=`). Derived from the LAST commit that touched the CSS/JS
# *source*, then `git describe`d: "{last-tag}-{commits-at-that-point}-g{sha}",
# e.g. "1.0.5-167-gd4c9e3a". So the version moves ONLY when the assets actually
# change — docs/config commits don't bump it — and the CSS and JS banners stay in
# sync (both resolve the same "last asset change", regardless of when each builds).
# `site.version` stays the formal release version (footer/about).
# Needs full history + tags in CI (actions/checkout fetch-depth: 0).
# Falls back to "{version}.dev" outside a git repo.
ASSET_VER_SOURCE_PATHS = '_sass assets/css _js _plugins/js_processor.rb _plugins/css_banner_format.rb'

Jekyll::Hooks.register :site, :after_init do |site|
  src = site.source
  ver = nil

  sha = `git -C "#{src}" log -1 --format=%H -- #{ASSET_VER_SOURCE_PATHS} 2>&1`.strip
  if $?.success? && !sha.empty?
    desc = `git -C "#{src}" describe --tags --always --long #{sha} 2>&1`.strip
    ver = desc.sub(/\Av/, '') if $?.success? && !desc.empty?
  end

  site.config['asset_ver'] = ver || "#{site.config['version'] || '0.0.0'}.dev"
end
