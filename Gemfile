source "https://rubygems.org"

# Core Jekyll
gem "jekyll", "~> 4.4.1"
gem "webrick"              # needed for `bundle exec jekyll serve` on Ruby 3+

# Jekyll plugins (optional: keep only what you use)
group :jekyll_plugins do
  # gem "jekyll-seo-tag"
  # gem "jekyll-sitemap"
  # gem "jekyll-feed", "~> 0.12"   # only if you need RSS
end

# Windows support
platforms :windows do
  gem "wdm", "~> 0.1"      # faster file watching on Windows
  gem "tzinfo-data"
end

# JRuby/Windows time zone support and JRuby HTTP parser (only if relevant)
platforms :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "http_parser.rb", "~> 0.6.0"
end
