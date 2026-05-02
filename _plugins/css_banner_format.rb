# frozen_string_literal: true

# Ensures a newline separates the leading /*! ... */ banner from the
# first CSS rule in each compiled .min.css. Sass compressed output
# otherwise smashes the banner directly against the rule, e.g.:
#
#   */input:is(...)   →   */
#                          input:is(...)
Jekyll::Hooks.register :site, :post_write do |site|
  pattern = File.join(site.dest, 'assets', 'css', '*.min.css')
  Dir[pattern].each do |path|
    content = File.binread(path)
    fixed = content.sub(%r{(/\*!.*?\*/)(?!\n)}m) { "#{Regexp.last_match(1)}\n" }
    File.binwrite(path, fixed) if fixed != content
  end
end
