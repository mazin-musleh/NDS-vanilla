---
layout: page
title: "Government Services"
lang: en
direction: ltr
breadcrumb:
- ["Examples", "/examples"]
hero_title: "Government Services"
hero_description: "Browse all available government digital services"
sidemenu_mode: false
last_edit: "19/10/2026 - 11:26 PM"
---

<section id="services-list" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-body">
            <div class="nds-toolbar">
                <div class="nds-form-container nds-search-box" data-filter-target="services_list_content"
                    data-url="{{ '/docs-assets/data/services-autocomplete.json' | relative_url }}" data-name="Title"
                    data-fetch="once">
                    <div class="nds-search-content">
                        <div class="nds-form-control">
                            <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                            <input id="filter-search" type="text" class="nds-search-input" name="search" autocomplete="on"
                                placeholder="Search in services...">
                            <div class="nds-form-action">
                                <button class="nds-btn nds-subtle nds-clear nds-icon-only" hidden aria-label="Clear search" data-i18n-aria-label="form.clear_search"><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
                                <button class="nds-btn nds-subtle nds-voice-input nds-icon-only" aria-label="Voice input" data-i18n-aria-label="voice-input.voice_input"><i class="nds-icon nds-hgi-mic-01" aria-hidden="true"></i></button>
                            </div>
                        </div>
                        <button class="nds-btn nds-primary nds-search-btn" type="button">
                            <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                            <span class="nds-label" data-hidden="sm sr" data-i18n="filter.search">Search</span>
                        </button>
                    </div>
                </div>
                <div class="nds-dropmenu nds-filter" data-filter-target="services_list_content">
                    <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                        <i class="nds-icon nds-hgi-filter"></i>
                        <span class="nds-label" data-hidden="sm sr" data-i18n="filter.filter">Filter</span>
                    </button>
                    <div class="nds-dropmenu-menu" hidden>
                        <div class="nds-dropmenu-scroll">
                            <!-- Filter by Most Used -->
                            <div data-filter="most-used" data-filter-legend="Most Used"
                                data-filter-type="switch" data-no-auto-close></div>
                            <hr class="nds-divider">
                            <!-- Filter by System -->
                            <div data-filter="system" data-filter-legend="System"
                                data-filter-type="checkbox" data-no-auto-close></div>
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
                <div class="nds-filter-applied" data-filter-target="services_list_content" hidden>
                    <span class="nds-label" data-i18n="filter.applied_filters">Applied Filters:</span>
                    <div class="nds-chips"></div>
                </div>
                <div class="nds-auto-fill" data-target="filter-search" data-filter-target="services_list_content">
                    <span class="nds-label">Most Searched:</span>
                    <div class="nds-chips">
                        <button class="nds-chip nds-neutral nds-rounded nds-item">
                            <i class="hgi hgi-stroke hgi-plus-sign"></i>
                            <span class="nds-label">Tag 1</span>
                        </button>
                        <button class="nds-chip nds-neutral nds-rounded nds-item">
                            <i class="hgi hgi-stroke hgi-plus-sign"></i>
                            <span class="nds-label">Tag 2</span>
                        </button>
                        <button class="nds-chip nds-neutral nds-rounded nds-item">
                            <i class="hgi hgi-stroke hgi-plus-sign"></i>
                            <span class="nds-label">Tag 3</span>
                        </button>
                    </div>
                </div>
            </div>
        <div id="services_list_content" class="nds-paged-content nds-grid"
            style="--per-page: 12; --max-col: 3; --mid-col: 2; --min-col: 1;">

            {% for service in site.data.content.services %}
            <div class="nds-page-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            {{ service.icon }}
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text" style="--truncate: 2;">
                        <span class="nds-card-title nds-truncate">{{ service.title }}</span>
                        <span class="nds-card-description nds-truncate">{{ service.description }}</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="nds-label" data-filter="system">{{ service.system }}</span>
                        </span>
                        {% if service.most_used %}
                        <span class="nds-tag nds-green nds-sm">
                            <span class="nds-label" data-filter="most-used">Most Used</span>
                        </span>
                        {% endif %}
                    </div>
                </div>
                <div class="nds-card-actions">
                    <a href="{{ '/templates/service-template' | relative_url }}" class="nds-btn nds-secondary-outline nds-lg"
                        aria-label="Service Details">
                        <span class="nds-label">Details</span>
                    </a>
                    <a href="{{ service.url }}" class="nds-btn nds-primary nds-lg nds-trail-icon"
                        aria-label="Get Started">
                        <span class="nds-label">Get Started</span>
                    </a>
                </div>
            </div>
            {% endfor %}

        </div>
        <nav class="nds-pagination" data-auto-pagination="services_list_content" aria-label="Pagination" data-i18n-aria-label="pagination.pagination"></nav>
        </div>
    </div>
</section>