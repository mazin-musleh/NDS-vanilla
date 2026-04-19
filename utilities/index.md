---
layout: page
title: Utilities
hero_title: Utilities
hero_description: Every component follows the official design tokens, typography, spacing, and interaction patterns. Built from scratch in plain HTML, CSS, and JavaScript.
lang: en
direction: ltr
sidemenu_mode: false
---

<section id="utilities" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">All Components</h2>
            <p class="nds-section-description">{{ site.data.content.components | size }} components, each with markup, styling, and JavaScript behavior.</p>
        </div>
        <div class="nds-form-container nds-search-box" data-filter-target="utilities_list">
            <div class="nds-search-content">
                <div class="nds-form-control">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <input id="utilitySearch" type="text" class="nds-search-input" name="search" autocomplete="off"
                        placeholder="Search components...">
                    <div class="nds-form-action">
                        <button class="nds-btn nds-subtle nds-clear" hidden><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
                    </div>
                </div>
                <button class="nds-btn nds-primary nds-search-btn" type="button">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <span class="nds-label">Search</span>
                </button>
                <div class="nds-dropmenu nds-filter" data-filter-target="utilities_list">
                    <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                        <i class="hgi hgi-stroke hgi-filter"></i>
                        <span class="nds-label">Filter</span>
                    </button>
                    <div class="nds-dropmenu-menu" style="min-width: 300px;" hidden>
                        <div class="nds-dropmenu-scroll">
                            <div data-filter="category" data-filter-legend="Category"
                                data-filter-type="checkbox" data-no-auto-close></div>
                            <hr class="nds-divider">
                            <div data-filter="tech" data-filter-legend="Technology"
                                data-filter-type="checkbox" data-no-auto-close></div>
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
            </div>
            <div class="nds-filter-applied" data-filter-target="utilities_list" hidden>
                <span class="nds-label">Applied Filters:</span>
                <div class="nds-chips"></div>
            </div>
        </div>
        <div class="nds-section-body">
        <div id="utilities_list" class="nds-paged-content nds-grid" hidden
            style="--per-page: 6; --max-col: 3; --mid-col: 2; --min-col: 1;">

            {% for comp in site.data.content.components %}
            <div class="nds-page-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">{{ comp.title }}</h3>
                        <p class="nds-card-description">{{ comp.description }}</p>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="nds-label" data-filter="category">{{ comp.category }}</span>
                        </span>
                        {% for tag in comp.tags %}
                        <span class="nds-tag nds-gray nds-sm">
                            <span class="nds-label" data-filter="tech">{{ tag }}</span>
                        </span>
                        {% endfor %}
                    </div>
                </div>
                {% if comp.url %}
                <div class="nds-card-actions">
                    <a href="{{ comp.url | relative_url }}" class="nds-btn nds-primary">
                        <span class="nds-label">View Docs</span>
                    </a>
                </div>
                {% endif %}
            </div>
            {% endfor %}

        </div>
        <nav class="nds-pagination" data-auto-pagination aria-label="Pagination"></nav>
    </div>
    </div>
</section>
