---
layout: page
title: "Government Services"
lang: en
direction: ltr
breadcrumb:
- ["Examples", "/examples"]
hero_title: "Government Services"
hero_description: "Browse all available government digital services"
layout_class:
hideSidemenu: true
exclude_showcase: false
---

<section id="servicesList" class="nds-content-section">
    <div class="nds-section-head">
        <div class="nds-section-search nds-filter nds-demo-showcase" data-filter-target="services_list_content" hidden>
            <div class="nds-form-container nds-search-box"
                data-url="{{ '/assets/data/autocomplete-demo.json' | relative_url }}" data-name="Title"
                data-query-param="q">
                <div class="nds-search-content">
                    <div class="nds-form-control">
                        <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                        <input id="filterSearch" type="text" class="nds-search-input" name="search" autocomplete="on"
                            placeholder="Search in services...">
                        <div class="nds-form-action">
                            <button class="nds-btn nds-subtle voiceInput"><i
                                    class="hgi hgi-stroke hgi-mic-01 icon"></i></button>
                            <button class="nds-btn nds-subtle clear" hidden><i
                                    class="hgi hgi-stroke hgi-cancel-01 icon"></i></button>
                        </div>
                    </div>
                    <button class="nds-btn nds-primary nds-search-btn" type="button">
                        <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                        <span class="label">Search</span>
                    </button>
                </div>
                <div class="nds-auto-fill" data-target="filterSearch">
                    <span class="label">Most Searched:</span>
                    <div class="nds-chips">
                        <button class="nds-chip nds-neutral nds-rounded nds-item">
                            <i class="hgi hgi-stroke hgi-rounded hgi-plus-sign"></i>
                            <span class="label">Tag 1</span>
                        </button>
                        <button class="nds-chip nds-neutral nds-rounded nds-item">
                            <i class="hgi hgi-stroke hgi-rounded hgi-plus-sign"></i>
                            <span class="label">Tag 2</span>
                        </button>
                        <button class="nds-chip nds-neutral nds-rounded nds-item">
                            <i class="hgi hgi-stroke hgi-rounded hgi-plus-sign"></i>
                            <span class="label">Tag 3</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="nds-dropmenu">
                <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                    <i class="hgi hgi-stroke hgi-filter icon"></i>
                    <span class="label">Filter</span>
                </button>
                <div class="nds-dropmenu-menu" style="min-width: 300px;" hidden>
                    <div class="nds-dropmenu-scroll">
                        <!-- Filter by Most Used -->
                        <div class="nds-dropmenu-item" data-filter="most-used" data-filter-legend="Most Used"
                            data-filter-type="switch" data-no-auto-close></div>
                        <hr class="nds-dropmenu-divider nds-lg">
                        <!-- Filter by System -->
                        <div class="nds-dropmenu-item" data-filter="system" data-filter-legend="System"
                            data-filter-type="checkbox" data-no-auto-close></div>
                    </div>
                    <div class="nds-dropmenu-footer">
                        <hr class="nds-dropmenu-divider nds-lg">
                        <div class="nds-dropmenu-action nds-grid">
                            <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                data-filter-action="clear" data-no-auto-close>
                                <span class="label">Reset</span>
                            </button>
                            <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                data-filter-action="apply">
                                <span class="label">Filter</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nds-filter-applied" hidden>
                <span class="label">Applied Filters:</span>
                <div class="nds-chips"></div>
            </div>
        </div>
    </div>
    <div class="nds-section-content">
        <div id="services_list_content" class="nds-pagination-content nds-grid" hidden
            style="--per-page: 12; --max-col: 3; --mid-col: 2; --min-col: 1;">

            {% for service in site.data.services %}
            <div class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            {{ service.icon }}
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">{{ service.title }}</h3>
                        <span class="nds-card-description nds-truncate">{{ service.description }}</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">{{ service.system }}</span>
                        </span>
                        {% if service.most_used %}
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label" data-filter="most-used">Most Used</span>
                        </span>
                        {% endif %}
                    </div>
                </div>
                <div class="nds-card-actions">
                    <a href="{{ service.url }}" class="nds-btn nds-secondary-outline nds-lg" aria-label="Service Details">
                        <span class="label">Details</span>
                    </a>
                    <a href="{{ service.url }}" class="nds-btn nds-primary nds-lg nds-trail-icon" aria-label="Get Started">
                        <span class="label">Get Started</span>
                    </a>
                </div>
            </div>
            {% endfor %}

        </div>
        <nav class="nds-pagination-nav nds-auto-pagination" aria-label="Pagination"></nav>
    </div>
</section>