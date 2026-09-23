---
layout: page
title: Tags
hero_title: Tags - National Design System
hero_description: Small read-only labels for categories, status, and metadata.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "23/09/2026 - 07:57 PM"
---

<!-- Variants -->
<section id="tagVariants" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Variants</h2>
            <p class="nds-section-description">The standard tag for categories and metadata. Pick a color by meaning, then a style: light or outline.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
{%- capture tag_variants_1_actions %}
<div class="nds-dropmenu demo-toggle-menu">
    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
        <span class="nds-label">Gray</span>
    </button>
    <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll">
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                data-toggler='["", ".nds-tag", "tagColor"]'
                data-trigger-label="Gray">
                <span class="nds-label">Gray (default)</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-green", ".nds-tag", "tagColor"]'>
                <span class="nds-label">Green</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-blue", ".nds-tag", "tagColor"]'>
                <span class="nds-label">Blue</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-yellow", ".nds-tag", "tagColor"]'>
                <span class="nds-label">Yellow</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-red", ".nds-tag", "tagColor"]'>
                <span class="nds-label">Red</span>
            </button>
        </div>
    </div>
</div>
<div class="nds-dropmenu demo-toggle-menu">
    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
        <span class="nds-label">MD</span>
    </button>
    <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll">
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                data-toggler='["nds-md", ".nds-tag", "tagSize"]'>
                <span class="nds-label">MD</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-sm", ".nds-tag", "tagSize"]'>
                <span class="nds-label">SM</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-xs", ".nds-tag", "tagSize"]'>
                <span class="nds-label">XS</span>
            </button>
        </div>
    </div>
</div>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["nds-outline", ".nds-tag", "tagStyle"]'>
    <span class="nds-label">Outline</span>
</button>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["nds-rounded", ".nds-tag", "tagShape"]'>
    <span class="nds-label">Rounded</span>
</button>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["<i class=\"hgi hgi-stroke hgi-tag-01\"></i>", ".nds-tag", "tagIcon", "content-prepend"]'>
    <span class="nds-label">Icon</span>
</button>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
    <span class="nds-label">Remove bg</span>
</button>
{%- endcapture %}
{%- capture tag_variants_1 %}
<span class="nds-tag">
    <span class="nds-label">Label</span>
</span>
{%- endcapture %}
{% include demo.html id="tag-variants-1" html=tag_variants_1 actions=tag_variants_1_actions %}
            </div>
        </div>
    </div>
</section>

<!-- Status -->
<section id="tagStatus" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Status</h2>
            <p class="nds-section-description">For the state of an item, such as an order or a request. The dot shows the state without relying on color alone. Status tags take the inverted and ghost styles; normal tags take outline.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
{%- capture tag_status_1_actions %}
<div class="nds-dropmenu demo-toggle-menu">
    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
        <span class="nds-label">Neutral</span>
    </button>
    <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll">
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                data-toggler='["data-status=neutral", ".nds-tag", "statusColor", "attr"]'>
                <span class="nds-label">Neutral</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["data-status=success", ".nds-tag", "statusColor", "attr"]'>
                <span class="nds-label">Success</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["data-status=info", ".nds-tag", "statusColor", "attr"]'>
                <span class="nds-label">Info</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["data-status=warning", ".nds-tag", "statusColor", "attr"]'>
                <span class="nds-label">Warning</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["data-status=error", ".nds-tag", "statusColor", "attr"]'>
                <span class="nds-label">Error</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["data-status=critical", ".nds-tag", "statusColor", "attr"]'>
                <span class="nds-label">Critical</span>
            </button>
        </div>
    </div>
</div>
<div class="nds-dropmenu demo-toggle-menu">
    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
        <span class="nds-label">MD</span>
    </button>
    <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll">
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                data-toggler='["nds-md", ".nds-tag", "statusSize"]'>
                <span class="nds-label">MD</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-sm", ".nds-tag", "statusSize"]'>
                <span class="nds-label">SM</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-xs", ".nds-tag", "statusSize"]'>
                <span class="nds-label">XS</span>
            </button>
        </div>
    </div>
</div>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["nds-inverted", ".nds-tag", "statusStyle"]'>
    <span class="nds-label">Inverted</span>
</button>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["nds-ghost", ".nds-tag", "statusStyle"]'>
    <span class="nds-label">Ghost</span>
</button>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
    <span class="nds-label">Remove bg</span>
</button>
{%- endcapture %}
{%- capture tag_status_1 %}
<span class="nds-tag" data-status="neutral">
    <span class="nds-label">Status</span>
</span>
{%- endcapture %}
{% include demo.html id="tag-status-1" html=tag_status_1 actions=tag_status_1_actions %}
            </div>
        </div>
    </div>
</section>

<!-- On Color -->
<section id="tagOnColor" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">On Color</h2>
            <p class="nds-section-description">For tags on a colored or dark background.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
{%- capture tag_oncolor_1_actions %}
<div class="nds-dropmenu demo-toggle-menu">
    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
        <span class="nds-label">MD</span>
    </button>
    <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll">
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                data-toggler='["nds-md", ".nds-tag", "oncolorSize"]'>
                <span class="nds-label">MD</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-sm", ".nds-tag", "oncolorSize"]'>
                <span class="nds-label">SM</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-xs", ".nds-tag", "oncolorSize"]'>
                <span class="nds-label">XS</span>
            </button>
        </div>
    </div>
</div>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["nds-outline", ".nds-tag", "oncolorStyle"]'>
    <span class="nds-label">Outline</span>
</button>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["nds-rounded", ".nds-tag", "oncolorShape"]'>
    <span class="nds-label">Rounded</span>
</button>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["<i class=\"hgi hgi-stroke hgi-star\"></i>", ".nds-tag", "oncolorIcon", "content-prepend"]'>
    <span class="nds-label">Icon</span>
</button>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["black-bg", ".demo-container", "oncolorBg"]'>
    <span class="nds-label">Black</span>
</button>
{%- endcapture %}
{%- capture tag_oncolor_1 %}
<span class="nds-tag nds-oncolor">
    <span class="nds-label">On Color</span>
</span>
{%- endcapture %}
{% include demo.html id="tag-oncolor-1" html=tag_oncolor_1 actions=tag_oncolor_1_actions bg="dark-bg" %}
            </div>
        </div>
    </div>
</section>

<!-- Icon Only -->
<section id="tagIconOnly" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Icon Only</h2>
            <p class="nds-section-description">A square tag that shows only its icon, for tight spaces. Keep the label in the markup: screen readers read it.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
{%- capture tag_icononly_1_actions %}
<div class="nds-dropmenu demo-toggle-menu">
    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
        <span class="nds-label">Neutral</span>
    </button>
    <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll">
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                data-toggler='["", ".nds-tag", "iconOnlyColor"]'
                data-trigger-label="Gray">
                <span class="nds-label">Gray (default)</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-green", ".nds-tag", "iconOnlyColor"]'>
                <span class="nds-label">Green</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-blue", ".nds-tag", "iconOnlyColor"]'>
                <span class="nds-label">Blue</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-yellow", ".nds-tag", "iconOnlyColor"]'>
                <span class="nds-label">Yellow</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-red", ".nds-tag", "iconOnlyColor"]'>
                <span class="nds-label">Red</span>
            </button>
        </div>
    </div>
</div>
<div class="nds-dropmenu demo-toggle-menu">
    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
        <span class="nds-label">MD</span>
    </button>
    <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll">
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                data-toggler='["nds-md", ".nds-tag", "iconOnlySize"]'>
                <span class="nds-label">MD</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-sm", ".nds-tag", "iconOnlySize"]'>
                <span class="nds-label">SM</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                data-toggler='["nds-xs", ".nds-tag", "iconOnlySize"]'>
                <span class="nds-label">XS</span>
            </button>
        </div>
    </div>
</div>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["nds-outline", ".nds-tag", "iconOnlyStyle"]'>
    <span class="nds-label">Outline</span>
</button>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["nds-rounded", ".nds-tag", "iconOnlyShape"]'>
    <span class="nds-label">Rounded</span>
</button>
<button class="nds-btn nds-subtle demo-toggle-btn"
    data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
    <span class="nds-label">Remove bg</span>
</button>
{%- endcapture %}
{%- capture tag_icononly_1 %}
<span class="nds-tag nds-icon-only">
    <i class="hgi hgi-stroke hgi-tag-01" aria-hidden="true"></i>
    <span class="nds-label">Category</span>
</span>
{%- endcapture %}
{% include demo.html id="tag-icononly-1" html=tag_icononly_1 actions=tag_icononly_1_actions %}
            </div>
        </div>
    </div>
</section>

<!-- Tag Group -->
<section id="tagGroup" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tag Group</h2>
            <p class="nds-section-description">Wrap several tags in <code class="nds-inline-code lang-html">.nds-tags</code>. They wrap onto new lines with even spacing.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
{%- capture tags_group_1 %}
<div class="nds-tags">
    <span class="nds-tag"><span class="nds-label">Design</span></span>
    <span class="nds-tag nds-blue"><span class="nds-label">Development</span></span>
    <span class="nds-tag nds-green"><span class="nds-label">Research</span></span>
    <span class="nds-tag nds-yellow"><span class="nds-label">Analytics</span></span>
    <span class="nds-tag nds-red"><span class="nds-label">Operations</span></span>
</div>
{%- endcapture %}
{% include demo.html id="tags-group-1" html=tags_group_1 label="Project categories" %}
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="tagFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-tag-01"></i>
                            <span class="nds-label">Pure CSS</span>
                        </span>
                        <p class="nds-item-desc">Tags need no JavaScript. They render straight from the HTML.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-text-wrap"></i>
                            <span class="nds-label">Label Truncation</span>
                        </span>
                        <p class="nds-item-desc">A long label stays on one line and ends with an ellipsis, at 160px or at the width of its container.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-colors"></i>
                            <span class="nds-label">Color by Class or Status</span>
                        </span>
                        <p class="nds-item-desc">Set the color with a class such as <code class="nds-inline-code lang-html">nds-green</code>, or with <code class="nds-inline-code lang-html">data-status</code> for a status tag.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-record"></i>
                            <span class="nds-label">Status Dot</span>
                        </span>
                        <p class="nds-item-desc">A status tag shows a dot in its status color, so the state reads without color alone.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="usageGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use tags for categories and metadata that people scan, such as a topic, a type, or a region.</li>
                    <li>Use a status tag for the state of an item. The dot keeps the state readable for colorblind users.</li>
                    <li>For a label people remove or click, use <a class="nds-color" href="{{ 'components/chips' | relative_url }}">Chips</a>. Tags are read-only.</li>
                    <li>Pick the color by meaning: neutral for general labels, and success, info, warning, or error for status. <code class="nds-inline-code lang-html">data-status="critical"</code> looks like <code class="nds-inline-code lang-html">error</code>; keep it for system-level alerts.</li>
                    <li>Pick the style by weight. A normal tag is light, or outline to stay quiet. A status tag is light, inverted to stand out, or ghost to stay quiet.</li>
                    <li>Keep labels to one to three words, and wrap a set of tags in <code class="nds-inline-code lang-html">.nds-tags</code>.</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th><th>Combinable with</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-inverted</code></td><td>Status tags only: a solid background in the status color.</td><td><code class="nds-inline-code lang-html">data-status</code>, <code class="nds-inline-code lang-html">nds-rounded</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-outline</code></td><td>Normal tags only: no background, and a border in the full color.</td><td>Color class, <code class="nds-inline-code lang-html">nds-rounded</code>, <code class="nds-inline-code lang-html">nds-oncolor</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-ghost</code></td><td>Status tags only: no background, no border, and neutral text beside the status dot.</td><td><code class="nds-inline-code lang-html">data-status</code>, <code class="nds-inline-code lang-html">nds-rounded</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-rounded</code></td><td>Pill shape.</td><td>All variants</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-icon-only</code></td><td>A square tag at the tag height. The label is hidden from view, and screen readers still read it.</td><td>All variants</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-oncolor</code></td><td>Light text for a colored or dark background.</td><td><code class="nds-inline-code lang-html">nds-outline</code>, <code class="nds-inline-code lang-html">nds-rounded</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-sm</code></td><td>Small size: 24px high.</td><td>All variants</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-xs</code></td><td>Extra small size: 20px high.</td><td>All variants</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-center</code></td><td>On <code class="nds-inline-code lang-html">.nds-tags</code>: centers the group.</td><td><code class="nds-inline-code lang-html">.nds-tags</code></td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Styles by Tag Kind</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Tag</th><th>Light (default)</th><th><code class="nds-inline-code lang-html">nds-outline</code></th><th><code class="nds-inline-code lang-html">nds-inverted</code></th><th><code class="nds-inline-code lang-html">nds-ghost</code></th></tr></thead>
                    <tbody>
                        <tr><td>Normal: no class, or a color class</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td></tr>
                        <tr><td>Status: <code class="nds-inline-code lang-html">data-status</code></td><td>Yes</td><td>No</td><td>Yes</td><td>Yes</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--tag-bg</code></td><td><code class="nds-inline-code lang-html">--tag-background-neutral-light</code></td><td>Tag background color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-text</code></td><td><code class="nds-inline-code lang-html">--tag-text-neutral</code></td><td>Label text color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-border</code></td><td><code class="nds-inline-code lang-html">--tag-border-neutral-light</code></td><td>Border color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-icon</code></td><td><code class="nds-inline-code lang-html">--tag-icon-neutral</code></td><td>Icon and status dot color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-height</code></td><td><code class="nds-inline-code lang-html">32px</code></td><td>Tag height. An icon-only tag uses it as its width too.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-fs</code></td><td><code class="nds-inline-code lang-html">--typo-text-md-FS</code></td><td>Font size</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-padding-inline</code></td><td><code class="nds-inline-code lang-html">--spacing-lg</code></td><td>Horizontal padding</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-dot-size</code></td><td><code class="nds-inline-code lang-html">10px</code></td><td>Size of the status dot.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-label-max</code></td><td><code class="nds-inline-code lang-html">160px</code></td><td>Widest the label gets before it ends with an ellipsis. A tag never grows wider than its container.</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
