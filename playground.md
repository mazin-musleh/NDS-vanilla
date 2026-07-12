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
