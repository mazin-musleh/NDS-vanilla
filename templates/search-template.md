---
layout: page
title: "Search Template"
lang: en
direction: ltr
breadcrumb:
- ["DGA Templates", "/templates"]
hero_title: "Search Results"
hero_description: "Find services matching your query"
layout_class:
sidemenu_mode: false
exclude_showcase: false
---

<section id="searchResults" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-form-container nds-search-box" data-filter-target="search_results_content">
            <div class="nds-search-content">
                <div class="nds-form-control">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <input id="searchResultsInput" type="text" class="nds-search-input" name="q" autocomplete="on"
                        placeholder="Search...">
                    <div class="nds-form-action">
                        <button type="button" class="nds-btn nds-subtle nds-clear" hidden aria-label="Clear">
                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="nds-btn nds-subtle nds-voice-input" aria-label="Voice input">
                            <i class="nds-icon nds-hgi-mic-01" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <button type="button" class="nds-btn nds-primary nds-search-btn">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <span class="nds-label">Search</span>
                </button>
            </div>
        </div>

        <div class="nds-section-head">
            <h2 class="nds-section-title">Search results <span data-filter-query data-filter-target="search_results_content"></span></h2>
            <p class="nds-section-description nds-results-count"><span data-filter-count data-filter-target="search_results_content">0</span> Result(s) found</p>
        </div>
        <div class="nds-section-action">
            <div class="nds-dropmenu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" type="button">
                    <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
                    <span class="nds-label">Sort</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                    <div class="nds-dropmenu-scroll">
                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort data-filter-target="search_results_content">
                            <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
                            <span class="nds-label">Most Relevant</span>
                        </button>
                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="title" data-sort-dir="asc" data-filter-target="search_results_content">
                            <i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"></i>
                            <span class="nds-label">A–Z</span>
                        </button>
                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="title" data-sort-dir="desc" data-filter-target="search_results_content">
                            <i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"></i>
                            <span class="nds-label">Z–A</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="nds-dropmenu nds-filter" data-filter-target="search_results_content">
                <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger" type="button">
                    <i class="hgi hgi-stroke hgi-filter"></i>
                    <span class="nds-label">Filter</span>
                </button>
                <div class="nds-dropmenu-menu" style="min-width: 260px;" hidden>
                    <div class="nds-dropmenu-scroll">
                        <div data-filter="category" data-filter-legend="Category"
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
        <div class="nds-filter-applied" data-filter-target="search_results_content" hidden>
            <span class="nds-label">Applied Filters:</span>
            <div class="nds-chips"></div>
        </div>
        <div class="nds-section-body">
            <div id="search_results_content" class="nds-paged-content nds-grid" hidden
                style="--per-page: 10; --max-col: 1; --mid-col: 1; --min-col: 1;">
                {% for item in site.data.content["search-results"] %}
                <div class="nds-page-item nds-card nds-stroke" data-sort-title="{{ item.title }}">
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <h3 class="nds-card-title">{{ item.title }}</h3>
                            <span class="nds-card-description">{{ item.description }}</span>
                        </div>
                        <div class="nds-card-tags">
                            {% for label in item.labels %}
                            <span class="nds-tag nds-gray nds-sm">
                                <span class="nds-label" {% if forloop.first %} data-filter="category" {% endif %}>{{ label }}</span>
                            </span>
                            {% endfor %}
                        </div>
                        <div class="nds-card-actions">
                            <a href="{{ item.url }}" class="nds-btn nds-primary">
                                <span class="nds-label">Action</span>
                            </a>
                        </div>
                    </div>
                </div>
                {% endfor %}
            </div>
            <nav class="nds-pagination" data-auto-pagination aria-label="Pagination"></nav>
        </div>
    </div>
</section>