---
layout: home
sitemap: false  # internal dev/test page — keep out of the public sitemap
noindex: true   # also tell crawlers not to index it if reached via a link
title: "نظام التصميم الموحد لكود المنصات السعودي"
hero_title: "النظام الوطني للتصميم"
hero_description: "نظام تصميم شامل يُمكِّن من بناء تجارب رقمية حكومية متّسقة وقابلة للوصول وعالية الأداء."
hero_image_pos: 50% 10%
lang: ar
direction: rtl
---

<!-- Internal dev/test scratch page. Drop components here to test in isolation. -->

<section class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Filter — per-group collapsible (opt-in)</h2>
            <p class="nds-section-description">Add <code>data-filter-accordion</code> to any group that has many fields; that one group renders as a collapsible accordion item. Groups without the attribute stay inline.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-toolbar">
                <div class="nds-dropmenu nds-filter" data-filter-target="playgroundFilterCards">
                    <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                        <i class="hgi hgi-stroke hgi-filter"></i>
                        <span class="nds-label">Filter</span>
                    </button>
                    <div class="nds-dropmenu-menu" hidden>
                        <div class="nds-dropmenu-scroll">
                            <div data-filter="department"
                                data-filter-type="checkbox" data-filter-legend="Department"
                                data-no-auto-close>
                            </div>
                            <hr class="nds-divider">
                            <div data-filter="role"
                                data-filter-type="checkbox" data-filter-legend="Role"
                                data-filter-accordion
                                data-no-auto-close>
                            </div>
                            <hr class="nds-divider">
                            <div data-filter="status"
                                data-filter-type="radio" data-filter-legend="Status"
                                data-filter-accordion
                                data-no-auto-close>
                            </div>
                        </div>
                        <div class="nds-dropmenu-footer">
                            <hr class="nds-divider">
                            <div class="nds-dropmenu-action nds-grid">
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
                <div class="nds-filter-applied" data-filter-target="playgroundFilterCards" hidden>
                    <span class="nds-label">Applied Filters:</span>
                    <div class="nds-chips"></div>
                </div>
            </div>
            <div id="playgroundFilterCards" class="nds-paged-content nds-grid" data-filter-items="nds-card"
                style="--per-page: 6; --max-col: 3; --mid-col: 2; --min-col: 1;">
                {% for user in site.data.content.users %}
                <div class="nds-card nds-stroke nds-page-item">
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-title">{{ user.name }}</span>
                            <span class="nds-card-description">{{ user.role }}</span>
                        </div>
                        <div class="nds-card-tags">
                            <span class="nds-tag nds-blue nds-sm"><span class="nds-label"
                                    data-filter="department">{{ user.department }}</span></span>
                            <span class="nds-tag nds-green nds-sm"><span class="nds-label"
                                    data-filter="role">{{ user.role }}</span></span>
                            <span class="nds-tag nds-neutral nds-sm"><span class="nds-label"
                                    data-filter="status">{{ user.status }}</span></span>
                        </div>
                    </div>
                </div>
                {% endfor %}
            </div>
            <nav class="nds-pagination" data-auto-pagination="playgroundFilterCards" aria-label="Pagination"></nav>
        </div>
    </div>
</section>

<!-- ── Multiselect population test: options from JSON attrs / populate() ── -->
<section class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Multiselect — populated options (prototype)</h2>
            <p class="nds-section-description">Left: options built from <code>data-multiselect-options</code> (grouped JSON) + <code>data-multiselect-selected</code>, with an <strong>Apply button = staged commit</strong> (filter UX: toggles stage, Apply updates chips, closing without Apply discards) — inside a form with <code>data-min-checked="2"</code> / <code>data-max-checked="4"</code>, Submit validates the APPLIED set. Right: starts empty, <code>populate()</code> fills it at runtime (simulated fetch), no Apply button = instant commit.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-grid" style="--max-col:2; --min-col:1;">
                <form class="nds-form" onsubmit="return false">
                <div class="nds-form-container nds-multiselect" id="pgMsAttr"
                    data-multiselect-name="pg-interests"
                    data-multiselect-options='{"Technology":{"ai":"AI &amp; ML","cloud":"Cloud","security":"Cybersecurity"},"Design":{"ux":"UX Research","brand":"Brand Identity","motion":"Motion"}}'
                    data-multiselect-selected='["ai","ux"]'
                    data-min-checked="2" data-max-checked="4">
                    <div class="nds-form-header">
                        <label><span class="nds-label">Interests (from attribute)</span></label>
                    </div>
                    <div class="nds-form-control">
                        <div class="nds-form-action nds-prefix nds-dropmenu" data-multiselect-dropmenu>
                            <button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger" type="button">
                                <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
                                <span class="nds-label">Select</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <div class="nds-dropmenu-footer">
                                    <hr class="nds-divider">
                                    <div class="nds-dropmenu-action nds-grid">
                                        <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-multiselect-action="reset" data-no-auto-close>
                                            <span class="nds-label">Reset</span>
                                        </button>
                                        <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-multiselect-action="apply">
                                            <span class="nds-label">Apply</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="nds-chips nds-multiselect-chips" data-multiselect-chips></div>
                        <span class="nds-multiselect-placeholder">Select options&hellip;</span>
                    </div>
                    <div class="nds-form-footer" data-feedback-target hidden></div>
                </div>
                <button class="nds-btn nds-primary nds-sm" type="submit" style="align-self: start; margin-block-start: var(--spacing-md);">
                    <span class="nds-label">Submit</span>
                </button>
                </form>
                <div class="nds-form-container nds-multiselect" id="pgMsRuntime" data-multiselect-name="pg-cities">
                    <div class="nds-form-header">
                        <label><span class="nds-label">Cities (populate() at runtime)</span></label>
                    </div>
                    <div class="nds-form-control">
                        <div class="nds-form-action nds-prefix nds-dropmenu" data-multiselect-dropmenu>
                            <button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger" type="button">
                                <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
                                <span class="nds-label">Select</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden></div>
                        </div>
                        <div class="nds-chips nds-multiselect-chips" data-multiselect-chips></div>
                        <span class="nds-multiselect-placeholder">Load options first&hellip;</span>
                    </div>
                    <div class="nds-form-footer" data-feedback-target hidden></div>
                </div>
            </div>
            <button class="nds-btn nds-secondary nds-sm" type="button" id="pgMsLoad" style="margin-block-start: var(--spacing-xl);">
                <span class="nds-label">Load cities via populate()</span>
            </button>
        </div>
    </div>
</section>

<script>
document.getElementById('pgMsLoad').addEventListener('click', function () {
    var field = document.getElementById('pgMsRuntime');
    if (!field || !field.ndsMultiselect) return;
    field.ndsMultiselect.populate(
        { riyadh: 'الرياض', jeddah: 'جدة', dammam: 'الدمام', abha: 'أبها' },
        ['riyadh']
    );
});
</script>

<!-- ── data-align test: column alignment declared on the header ── -->
<section class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tables — data-align on the column header (prototype)</h2>
            <p class="nds-section-description">Same console-demo table (sortable + paginated). <code>data-align="center|start|end"</code> on a <code>&lt;th&gt;</code> is turned into ONE <code>:nth-child()</code> rule per column, not a class stamped on each cell, so rows that appear later (sort, filter, pagination) are aligned by the selector. Amount, Status and Action are centered here.</p>
        </div>
        <div class="nds-section-body">
            <div>
                <table id="playgroundAlignTable" class="nds-table nds-compact nds-sortable">
                    <thead>
                        <tr>
                            <th>
                                <div class="nds-col-header">
                                    <span class="nds-label">Reference</span>
                                    <div class="nds-col-actions">
                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by reference"><i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div class="nds-col-header">
                                    <span class="nds-label">Service</span>
                                    <div class="nds-col-actions">
                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by service"><i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </th>
                            <th data-align="center">
                                <div class="nds-col-header">
                                    <span class="nds-label">Amount</span>
                                    <div class="nds-col-actions">
                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by amount"><i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </th>
                            <th data-align="center">
                                <div class="nds-col-header">
                                    <span class="nds-label">Status</span>
                                    <div class="nds-col-actions">
                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by status"><i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </th>
                            <th data-align="center">
                                <div class="nds-col-header">
                                    <span class="nds-label">Action</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="playgroundAlignBody" class="nds-paged-content" style="--per-page:5;">
                        {% for txn in site.data.content.transactions %}
                        <tr class="nds-page-item">
                            <td>{{ txn.id }}</td>
                            <td>{{ txn.name }}</td>
                            <td data-sort-value="{{ txn.amount }}">
                                <span class="nds-number-format" data-currency="{{ txn.currency }}" data-value="{{ txn.amount }}">{{ txn.amount }}</span>
                            </td>
                            <td data-sort-value="{% if txn.status == 'completed' %}1{% elsif txn.status == 'pending' %}2{% else %}3{% endif %}">
                                {% if txn.status == "completed" %}
                                <span class="nds-tag nds-sm" data-status="success"><span class="nds-label">Completed</span></span>
                                {% elsif txn.status == "pending" %}
                                <span class="nds-tag nds-sm" data-status="warning"><span class="nds-label">Pending</span></span>
                                {% else %}
                                <span class="nds-tag nds-sm" data-status="error"><span class="nds-label">Failed</span></span>
                                {% endif %}
                            </td>
                            <td>
                                <button class="nds-btn nds-subtle nds-sm nds-icon-only" aria-label="Edit {{ txn.id }}">
                                    <i class="hgi hgi-stroke hgi-edit-02"></i>
                                </button>
                            </td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
            </div>
            <nav class="nds-pagination" data-auto-pagination="playgroundAlignBody" aria-label="Pagination"></nav>
        </div>
    </div>
</section>
