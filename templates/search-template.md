---
layout: page
title: "Search Template"
lang: en
direction: ltr
breadcrumb:
- ["DGA Templates", "/templates"]
hero_title: "Search Results"
hero_description: "Find NDS pages matching your query"
sidemenu_mode: false
last_edit: "07/11/2026 - 09:42 PM"
---

<section id="search-results" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Results <span data-filter-query data-filter-target="search_results_content"></span></h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-toolbar">
                <div class="nds-toolbar-row">
                    <div class="nds-toolbar-start">
                        <span class="nds-toolbar-text" data-paged-target="search_results_content">Showing <b data-paged-from>1</b>&ndash;<b data-paged-to>{{ site.data.catalog | size | at_most: 10 }}</b> of <b data-paged-count>{{ site.data.catalog | size }}</b> result(s)</span>
                    </div>
                    <div class="nds-toolbar-end">
                        <div class="nds-dropmenu">
                            <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" type="button">
                                <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
                                <span class="nds-label" data-i18n="sort.sort">Sort</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <div class="nds-dropmenu-scroll">
                                    <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort data-filter-target="search_results_content">
                                        <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
                                        <span class="nds-label">Most Relevant</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="title" data-sort-order="asc" data-filter-target="search_results_content">
                                        <i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"></i>
                                        <span class="nds-label">A–Z</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="title" data-sort-order="desc" data-filter-target="search_results_content">
                                        <i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"></i>
                                        <span class="nds-label">Z–A</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="updated" data-sort-order="desc" data-filter-target="search_results_content">
                                        <i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i>
                                        <span class="nds-label">Last Updated</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-toolbar-row">
                    <div class="nds-form-container nds-search-box" data-filter-target="search_results_content">
                        <div class="nds-search-content">
                            <div class="nds-form-control">
                                <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                <input id="search-results-input" type="text" class="nds-search-input" name="q" autocomplete="on"
                                    placeholder="Search...">
                                <div class="nds-form-action">
                                    <button type="button" class="nds-btn nds-subtle nds-clear nds-icon-only" hidden aria-label="Clear" data-i18n-aria-label="form.clear">
                                        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                    </button>
                                    <button type="button" class="nds-btn nds-subtle nds-voice-input nds-icon-only" aria-label="Voice input" data-i18n-aria-label="voice-input.voice_input">
                                        <i class="nds-icon nds-hgi-mic-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <button type="button" class="nds-btn nds-primary nds-search-btn">
                                <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                <span class="nds-label" data-hidden="sm sr" data-i18n="filter.search">Search</span>
                            </button>
                        </div>
                    </div>
                    <div class="nds-dropmenu nds-filter" data-filter-target="search_results_content">
                        <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger" type="button">
                            <i class="nds-icon nds-hgi-filter"></i>
                            <span class="nds-label" data-hidden="sm sr" data-i18n="filter.filter">Filter</span>
                        </button>
                        <div class="nds-dropmenu-menu" style="min-width: 260px;" hidden>
                            <div class="nds-dropmenu-scroll">
                                <div data-filter="category" data-filter-legend="Category"
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
                                        <span class="nds-label" data-i18n="filter.apply">Apply</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-toolbar-row">
                    <div class="nds-toolbar-start">
                        <div class="nds-filter-applied" data-filter-target="search_results_content" hidden>
                            <span class="nds-label" data-i18n="filter.applied_filters">Applied Filters:</span>
                            <div class="nds-chips"></div>
                        </div>
                    </div>
                </div>
            </div>
            <ul id="search_results_content" class="nds-list nds-paged-content nds-grid nds-flat nds-divided"
                style="--per-page: 10; --max-col: 1; --mid-col: 1; --min-col: 1;">
                {% for item in site.data.catalog %}
                {%- assign item_path = item.url | split: "#" | first %}
                {%- assign item_page = site.pages | where: "url", item_path | first %}
                {%- assign item_date = item_page.last_edit | split: " - " | first | split: "/" %}
                {%- assign item_iso = item_date[2] | append: "-" | append: item_date[1] | append: "-" | append: item_date[0] %}
                <li class="nds-page-item nds-card" data-sort-title="{{ item.title }}" data-sort-updated="{{ item_iso }}">
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-title">{{ item.title }}</span>
                            <span class="nds-card-description">{{ item.description }}</span>
                        </div>
                        <div class="nds-card-meta">
                            <div class="nds-card-tags">
                                <span class="nds-tag nds-blue">
                                    <span class="nds-label" data-filter="category">{{ item.category }}</span>
                                </span>
                                {% for tag in item.tags %}
                                <span class="nds-tag nds-gray">
                                    <span class="nds-label">{{ tag }}</span>
                                </span>
                                {% endfor %}
                            </div>
                            <span class="nds-meta">
                                <span class="nds-meta-item">
                                    <i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i>
                                    Updated <time datetime="{{ item_iso }}">{{ item_date | join: "/" }}</time>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-actions">
                        <a href="{{ item.url | relative_url }}" class="nds-btn nds-primary">
                            <span class="nds-label">View Page</span>
                        </a>
                    </div>
                </li>
                {% endfor %}
            </ul>
            <nav class="nds-pagination" data-auto-pagination="search_results_content" aria-label="Pagination" data-i18n-aria-label="pagination.pagination"></nav>
        </div>
    </div>
</section>