---
layout: page
title: Migration
since: "1.12.x"
last_edit: "19/10/2026 - 09:39 PM"
lang: en
direction: ltr
hero_title: Migration
hero_style: nds-flat
hero_description: "Every class, attribute, id, custom property, window setting, event and URL parameter that an NDS release renamed or removed, with what to write instead."
breadcrumb:
  - ["Guides", "/guides"]
layout_class: nds-has-sideinfo
sidemenu_mode: false
---

<section id="migration-guide" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <aside class="nds-sideinfo nds-sticky nds-top" aria-label="On this page">
            <nav class="nds-toc" aria-label="Table of contents" style="--toc-skeleton-rows: 8"
                data-toc-source="#migration-guide article" data-toc-levels="h2, h3">
                <div class="nds-toc-head">
                    <span class="nds-label">On this page</span>
                    <h2 class="nds-toc-title nds-truncate">Migration</h2>
                </div>
                <div class="nds-drawer nds-lined">
                    <ul class="nds-drawer-list"></ul>
                </div>
            </nav>
        </aside>

        <div class="nds-info-content">
            <article>
                {%- comment %} Prose wraps the text only: its hr and list rules would restyle the filter menu. {% endcomment %}
                <div class="nds-prose">
                    <h2 id="overview">Overview</h2>
                    <p>After you upgrade NDS, some names your pages use may no longer work. This guide lists each one with what to write instead, and shows how to find them on your pages. The <a class="nds-color" href="{{ 'core/audit' | relative_url }}">Audit</a> reads the same list, so the guide and the audit always agree.</p>

                    <h2 id="changed-names">1. Changed Names</h2>
                    <p>Filter the table to the releases after the one your site uses, or search for a name.</p>
                </div>
{%- assign releases = site.data.migrations | group_by: "since" | map: "name" %}
                <div class="nds-toolbar">
                    <div class="nds-toolbar-row">
                        <div class="nds-toolbar-start">
                            <span class="nds-toolbar-text" data-paged-target="migration-rows">
                                Showing <b data-paged-from>1</b>&ndash;<b data-paged-to>{{ site.data.migrations | size | at_most: 25 }}</b> of <b data-paged-count>{{ site.data.migrations | size }}</b> names
                            </span>
                        </div>
                    </div>
                    <div class="nds-toolbar-row">
                        <div class="nds-form-container nds-search-box" data-filter-target="migration-rows">
                            <div class="nds-search-content">
                                <div class="nds-form-control">
                                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                    <input type="text" class="nds-search-input" placeholder="Search names and fixes">
                                    <div class="nds-form-action">
                                        <button class="nds-btn nds-subtle nds-clear nds-icon-only" hidden aria-label="Clear search" data-i18n-aria-label="forms.clear_search"><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                <button class="nds-btn nds-primary nds-search-btn" type="button">
                                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                    <span class="nds-label" data-hidden="sm sr" data-i18n="filter.search">Search</span>
                                </button>
                            </div>
                        </div>
                        <div class="nds-dropmenu nds-filter" data-filter-target="migration-rows">
                            <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                                <i class="nds-icon nds-hgi-filter"></i>
                                <span class="nds-label" data-hidden="sm sr" data-i18n="filter.filter">Filter</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <div class="nds-dropmenu-scroll">
                                    <div data-filter="release" data-filter-type="checkbox" data-filter-legend="Release"
                                        data-filter-values='{{ releases | jsonify }}' data-no-auto-close>
                                    </div>
                                    <hr class="nds-divider">
                                    <div data-filter="change" data-filter-type="checkbox" data-filter-legend="Change"
                                        data-filter-values='{"renamed":"Renamed","removed":"Removed"}' data-no-auto-close>
                                    </div>
                                    <hr class="nds-divider">
                                    <div data-filter="kind" data-filter-type="checkbox" data-filter-legend="Kind"
                                        data-filter-values='{"class":"Class","attribute":"Attribute","id":"Id","property":"Custom property","global":"Window setting","event":"Event","param":"URL parameter"}' data-no-auto-close>
                                    </div>
                                </div>
                                <div class="nds-dropmenu-footer">
                                    <hr class="nds-divider">
                                    <div class="nds-dropmenu-action">
                                        <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                            data-filter-action="clear" data-no-auto-close>
                                            <span class="nds-label" data-i18n="filter.reset">Reset</span>
                                        </button>
                                        <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                            data-filter-action="apply">
                                            <span class="nds-label" data-i18n="filter.filter">Filter</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nds-toolbar-row">
                        <div class="nds-toolbar-start">
                            <div class="nds-filter-applied" data-filter-target="migration-rows" hidden>
                                <span class="nds-label" data-i18n="filter.applied_filters">Applied Filters:</span>
                                <div class="nds-chips"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-block">
                    <div class="nds-table-wrapper nds-doc-table">
                        <table id="migration-table" class="nds-table nds-compact">
                            <thead>
                                <tr><th>Name</th><th>Release</th><th>Change</th><th>Fix</th></tr>
                            </thead>
                            <tbody id="migration-rows" class="nds-paged-content" data-filter-items="tr" style="--per-page:25;">
{%- for r in site.data.migrations %}
                                <tr class="nds-page-item"><td><code class="nds-inline-code">{{ r.name | escape }}</code><br><small><span data-filter="kind">{{ r.kind }}</span>{% if r.scope %}{% assign first = r.scope | slice: 0 %}, {% if first == "&" %}on{% else %}inside{% endif %} <code class="nds-inline-code">{{ r.scope | remove_first: "&" | escape }}</code>{% endif %}</small></td><td><span data-filter="release">{{ r.since }}</span></td><td><span data-filter="change">{{ r.status }}</span>{% if r.inert %}<br><small>never read by NDS</small>{% endif %}</td><td>{{ r.fix | escape }}</td></tr>
{%- endfor %}
                            </tbody>
                        </table>
                    </div>
                </div>
                <nav class="nds-pagination nds-block" data-auto-pagination="migration-rows" aria-label="Changed names pagination"></nav>

                <div class="nds-prose nds-block">
                    <h3 id="change-types">Change Types</h3>
                    <p>A renamed name has a new name that does the same job. A removed name has none: follow the Fix column. Both are broken now, and the audit reports them as errors. A name marked "never read by NDS" never had an effect, so nothing breaks. Its fix names the property that does the job.</p>

                    <h3 id="scope">Scope</h3>
                    <p>Some names changed only on one component. The small line under a name gives its kind and, for these names, where the change applies: "on" means the element itself, and "inside" means the element or a parent. <code class="nds-inline-code">nds-green</code>, for example, was removed on a section and stays the color class on a tag.</p>

                    <h2 id="audit-check">2. Audit Check</h2>
                    <p>Open each page and run the migration checks of the audit in the browser console. The first call loads the audit.</p>

<script type="text/html" id="migration-run" data-canon data-lang="js" data-preview="none">
const findings = await NDS.Audit.run({ group: 'migration' });
</script>

                    <p>It lists each old name on the page, with its fix. <a class="nds-color" href="{{ 'core/audit' | relative_url }}#findings">Audit: Findings</a> names the fields of each finding.</p>
                    <p>The audit sees only the page it runs on, and only the markup on it at that moment. Run it again after the page builds more markup, such as loaded rows or an opened dialog.</p>

                    <h2 id="own-code">3. Your Own Code</h2>
                    <p>Search your own code for these names too:</p>
                    <ul>
                        <li>Stylesheets. The audit reads only the sheets the page loads, and skips any served from another site.</li>
                        <li>Event names, in your scripts. A page does not show which events your scripts listen for.</li>
                        <li>URL parameters, in your server code. A page does not show which parameters your server reads.</li>
                        <li>JavaScript method names. These are not in the table: each release lists them in the Migrating section of <code class="nds-inline-code">CHANGELOG.md</code>.</li>
                    </ul>
                </div>
            </article>
        </div>
    </div>
</section>
