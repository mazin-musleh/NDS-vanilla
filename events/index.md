---
exclude_showcase: true
layout: page
title: Events
hero_title: Events
hero_description: Seasonal theme packs for national occasions. Each one re-skins the whole site from a single drop-in tag, and removing it restores the default when the event ends.
lang: en
direction: ltr
sidemenu_mode: false
---

<section id="events" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">All Events</h2>
            <p class="nds-section-description">{{ site.data.content.events | size }} event theme packs, each applied with one script tag and a self-contained asset folder.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-toolbar">
                <div class="nds-form-container nds-search-box" data-filter-target="events_list">
                    <div class="nds-search-content">
                        <div class="nds-form-control">
                            <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                            <input id="eventSearch" type="text" class="nds-search-input" name="search" autocomplete="off"
                                placeholder="Search events...">
                            <div class="nds-form-action">
                                <button class="nds-btn nds-subtle nds-clear" hidden aria-label="Clear search"><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
                            </div>
                        </div>
                        <button class="nds-btn nds-primary nds-search-btn" type="button">
                            <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                            <span class="nds-label" data-hidden="mobile sr">Search</span>
                        </button>
                    </div>
                </div>
                <div class="nds-dropmenu nds-filter" data-filter-target="events_list">
                    <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                        <i class="hgi hgi-stroke hgi-filter"></i>
                        <span class="nds-label" data-hidden="mobile sr">Filter</span>
                    </button>
                    <div class="nds-dropmenu-menu" style="min-width: 300px;" hidden>
                        <div class="nds-dropmenu-scroll">
                            <div data-filter="category" data-filter-legend="Category" data-filter-type="checkbox"
                                data-no-auto-close></div>
                            <hr class="nds-divider">
                            <div data-filter="tech" data-filter-legend="Technology" data-filter-type="checkbox"
                                data-no-auto-close></div>
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
                <div class="nds-filter-applied" data-filter-target="events_list" hidden>
                    <span class="nds-label">Applied Filters:</span>
                    <div class="nds-chips"></div>
                </div>
            </div>
            <div id="events_list" class="nds-paged-content nds-grid"
                style="--per-page: 6; --max-col: 3; --mid-col: 2; --min-col: 1;">

                {% for ev in site.data.content.events %}
                <div class="nds-page-item nds-card nds-stroke">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                {{ ev.icon }}
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-title">{{ ev.title }}</span>
                            <p class="nds-card-description">{{ ev.description }}</p>
                        </div>
                        <div class="nds-card-tags">
                            <span class="nds-tag nds-blue nds-sm">
                                <span class="nds-label" data-filter="category">{{ ev.category }}</span>
                            </span>
                            {% for tag in ev.tags %}
                            <span class="nds-tag nds-gray nds-sm">
                                <span class="nds-label" data-filter="tech">{{ tag }}</span>
                            </span>
                            {% endfor %}
                        </div>
                    </div>
                    {% if ev.url %}
                    <div class="nds-card-actions">
                        <a href="{{ ev.url | relative_url }}" class="nds-btn nds-primary">
                            <span class="nds-label">View Docs</span>
                        </a>
                    </div>
                    {% endif %}
                </div>
                {% endfor %}

            </div>
            <nav class="nds-pagination" data-auto-pagination="events_list" aria-label="Pagination"></nav>
        </div>
    </div>
</section>
