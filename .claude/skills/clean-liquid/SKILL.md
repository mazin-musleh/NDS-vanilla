---
name: clean-liquid
description: Clean and format Liquid/HTML template files - fix whitespace trimming, broken inline tags, and HTML formatting
argument-hint: "[file-path or glob pattern]"
disable-model-invocation: true
---

# Clean Liquid Templates

Format and clean Liquid/HTML template files. Target: `$ARGUMENTS` (defaults to all `_includes/*.html` if no argument).

## Rules

### 1. Liquid Whitespace Trimming
Convert all `{% %}` tags to `{%- -%}` to prevent blank lines in Jekyll output.

**Convert these tags:**
- `{% assign %}` → `{%- assign -%}`
- `{% if %}` → `{%- if %}`  (leading dash strips the blank line above, trailing dash only when no HTML follows)
- `{% else %}` → `{%- else %}`
- `{% elsif %}` → `{%- elsif %}`
- `{% endif %}` → `{%- endif %}`
- `{% for %}` → `{%- for %}`
- `{% endfor %}` → `{%- endfor %}`
- `{% unless %}` → `{%- unless %}`
- `{% endunless %}` → `{%- endunless %}`
- `{% include %}` → `{%- include %}`
- `{% comment %}...{% endcomment %}` → `{%- comment %}...{%- endcomment -%}`
- `{% capture %}` → `{%- capture %}`
- `{% endcapture %}` → `{%- endcapture -%}`

**Important:** Pure logic blocks (assigns, conditionals with no HTML output) should use `{%- -%}` on BOTH sides. Tags that precede HTML output should only use `{%- %}` (leading dash only) to avoid eating the HTML content.

### 2. Fix Broken Inline Tags
When a Liquid tag is split across lines awkwardly, reformat it:

```html
<!-- BAD: tag split mid-expression -->
{% if brand_name %}<span style="color: {{ brand_name_color }};">{{ brand_name }}{% if
    brand_slogan %}<span>{{ brand_slogan
        }}</span>{% endif %}</span>{% endif %}

<!-- GOOD: each element on its own line -->
{%- if brand_name %}
<span style="color: {{ brand_name_color }};">
    {{- brand_name -}}
    {%- if brand_slogan %}
    <span>{{ brand_slogan }}</span>
    {%- endif %}
</span>
{%- endif %}
```

### 3. HTML Child Element Formatting
Child elements (`<span>`, `<i>`, `<img>`) must NOT be jammed inline with their parent's closing `>`:

```html
<!-- BAD: child inline with parent -->
<button class="nds-btn" aria-label="Submit"><span class="label">Submit</span></button>

<!-- GOOD: child on its own indented line -->
<button class="nds-btn" aria-label="Submit">
    <span class="label">Submit</span>
</button>
```

**Exception:** Short single-child elements on ONE line are OK when the parent has no multi-line attributes:
```html
<!-- OK: simple single-line element -->
<div class="nds-dropdown-title">{{ column.title }}</div>
<li><a href="#">Link</a></li>
```

### 4. Attribute Formatting
When HTML attributes are split across lines, keep them clean:

```html
<!-- BAD: Liquid condition splits mid-attribute -->
<a href="{{ item.url }}" {% if item.has_dropdown %} data-toggle="dropdown" {% endif %} {% if
    item.id %} id="{{ item.id }}" {% endif %}>

<!-- GOOD: each conditional attribute on its own line -->
<a href="{{ item.url }}"
    {%- if item.has_dropdown %} data-toggle="dropdown"{%- endif %}
    {%- if item.id %} id="{{ item.id }}"{%- endif %}>
```

### 5. Remove Stray Blank Lines
Remove blank lines that serve no purpose (double blank lines, blank lines inside `<div>` containers, trailing whitespace).

## Process

1. Read the target file(s)
2. Apply all rules above
3. Write the cleaned file
4. Run `bundle exec jekyll build` to verify no build errors
5. Report what was changed

## Do NOT change
- HTML structure or nesting
- Class names or IDs
- Liquid logic (if/else conditions, loops)
- Content text
- CSS or JavaScript
