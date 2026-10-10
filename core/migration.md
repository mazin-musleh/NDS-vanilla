---
layout: page
title: Migration
hero_title: Migration - National Design System
hero_description: Every class, attribute, id, custom property, window setting and event that an NDS release renamed or removed, with what to write instead
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "10/10/2026 - 11:12 PM"
---

<section id="migration-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

This page lists each class, attribute, id, custom property, window setting and event that changed since 1.0.0, with what to write instead. The [Audit](../core/audit) reads the same list, so the page and the audit always agree.

Pick another component when:

- you want the changed names on your own pages, found for you: [Audit](../core/audit)

</div>
  </div>
</section>

<section id="migration-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Changed Names</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-prose nds-block">
        <p>Filter the table to the releases after the one your site uses, or search for a name.</p>
      </div>
{%- assign releases = site.data.migrations | group_by: "since" | map: "name" %}
      <div class="nds-toolbar">
        <div class="nds-toolbar-row">
          <div class="nds-toolbar-start">
            <span class="nds-toolbar-text" data-paged-target="migration-rows">
              <span class="nds-records-view">Showing <b data-paged-from>0</b>&ndash;<b data-paged-to>0</b> of <b data-paged-count>0</b> names</span>
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
                  <button class="nds-btn nds-subtle nds-clear nds-icon-only" hidden aria-label="Clear search"><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
                </div>
              </div>
              <button class="nds-btn nds-primary nds-search-btn" type="button">
                <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                <span class="nds-label" data-hidden="sm sr">Search</span>
              </button>
            </div>
          </div>
          <div class="nds-dropmenu nds-filter" data-filter-target="migration-rows">
            <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
              <i class="hgi hgi-stroke hgi-filter"></i>
              <span class="nds-label" data-hidden="sm sr">Filter</span>
            </button>
            <div class="nds-dropmenu-menu" style="min-width: 300px;" hidden>
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
                  data-filter-values='{"class":"Class","attribute":"Attribute","id":"Id","property":"Custom property","global":"Window setting","event":"Event"}' data-no-auto-close>
                </div>
              </div>
              <div class="nds-dropmenu-footer">
                <hr class="nds-divider">
                <div class="nds-dropmenu-action">
                  <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                    data-filter-action="clear" data-no-auto-close>
                    <span class="nds-label">Reset</span>
                  </button>
                  <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                    data-filter-action="apply">
                    <span class="nds-label">Filter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nds-toolbar-row">
          <div class="nds-toolbar-start">
            <div class="nds-filter-applied" data-filter-target="migration-rows" hidden>
              <span class="nds-label">Applied Filters:</span>
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
        <p>To find these names on a page, run the migration checks of the audit there. The first call loads the audit.</p>
      </div>

<script type="text/html" id="migration-run" data-canon data-lang="js" data-preview="none">
const findings = await NDS.Audit.run({ group: 'migration' });
</script>

    </div>
  </div>
</section>

<section id="migration-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Change Types
{: .nds-block-title}

A renamed name has a new name that does the same job. A removed name has none: follow the fix. Both are broken now, and the audit reports them as errors.

### Scope
{: .nds-block-title}

Some names changed only on one component. The line under such a name gives its place: "on" means the element itself, and "inside" means the element or a parent. `nds-green`, for example, was removed on a section and stays the color class on a tag.

### Custom Properties NDS Never Read
{: .nds-block-title}

Some old custom properties were declared but never read by NDS. Setting one changed nothing. The table marks them, and the audit reports them as info: set the new name for the change you meant.

### Events and Methods
{: .nds-block-title}

An event name shows in the table, but the audit cannot find it: a page does not show which events your scripts listen for. Old JavaScript method names are in `CHANGELOG.md`, in the Migrating section of each release.

</div>
  </div>
</section>

<section id="migration-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Run `NDS.Audit.run({ group: 'migration' })` on each page after an upgrade. The audit sees only the page it runs on.
- Run it again after the page builds more markup: loaded rows, an opened dialog. The audit sees only what is on the page when it runs.
- Search your own stylesheets for the old names. The audit reads only the sheets the page loads, and skips any served from another site.

</div>
  </div>
</section>

<section id="migration-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Audit](../core/audit): finds these names on a page and in its CSS.

</div>
  </div>
</section>
