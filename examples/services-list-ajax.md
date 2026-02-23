---
layout: page
title: "Government Services"
lang: en
direction: ltr
breadcrumb: ["Government Services"]
hero_title: "Government Services"
hero_description: "Browse all available government digital services"
layout_class:
hideSidemenu: true
exclude_showcase: false
---

<section id="servicesList" class="nds-content-section">
    <div class="nds-section-head">
        <form class="nds-section-search nds-filter" data-filter-target="services_list_content" data-ajax
            data-filter-submit method="GET" action="#" hidden>
            <div class="nds-form-container nds-search-box nds-demo-showcase"
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
                        <div class="nds-dropmenu-item" data-filter="most-used" data-no-auto-close role="menuitem">
                            <div class="nds-form-container nds-switch-container" data-state="filled">
                                <div class="nds-form-header"><label for="filter-most-used">
                                        <span class="label">Most Used</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-switch"><input type="checkbox" id="filter-most-used"
                                            name="filter-most-used" value="Most Used" class="nds-switch-input">
                                        <div class="nds-switch-track">
                                            <div class="nds-switch-thumb"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="nds-divider nds-lg">
                        <!-- Filter by System -->
                        <fieldset class="nds-form-group nds-check-group nds-dropmenu-item" data-filter="system" data-no-auto-close>
                            <legend class="label">System</legend>
                            <div class="nds-form-container nds-check-container">
                                <div class="nds-form-header">
                                    <label for="sys-identity"><span class="label">Identity System</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="sys-identity" name="system" value="Identity System"
                                        class="nds-check">
                                </div>
                            </div>
                            <div class="nds-form-container nds-check-container">
                                <div class="nds-form-header">
                                    <label for="sys-transport"><span class="label">Transport System</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="sys-transport" name="system" value="Transport System"
                                        class="nds-check">
                                </div>
                            </div>
                            <div class="nds-form-container nds-check-container">
                                <div class="nds-form-header">
                                    <label for="sys-civil"><span class="label">Civil Records System</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="sys-civil" name="system" value="Civil Records System"
                                        class="nds-check">
                                </div>
                            </div>
                            <div class="nds-form-container nds-check-container">
                                <div class="nds-form-header">
                                    <label for="sys-healthcare"><span class="label">Healthcare System</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="sys-healthcare" name="system" value="Healthcare System"
                                        class="nds-check">
                                </div>
                            </div>
                            <div class="nds-form-container nds-check-container">
                                <div class="nds-form-header">
                                    <label for="sys-commerce"><span class="label">Commerce System</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="sys-commerce" name="system" value="Commerce System"
                                        class="nds-check">
                                </div>
                            </div>
                            <div class="nds-form-container nds-check-container">
                                <div class="nds-form-header">
                                    <label for="sys-realestate"><span class="label">Real Estate System</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="sys-realestate" name="system" value="Real Estate System"
                                        class="nds-check">
                                </div>
                            </div>
                            <div class="nds-form-container nds-check-container">
                                <div class="nds-form-header">
                                    <label for="sys-tax"><span class="label">Tax System</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="sys-tax" name="system" value="Tax System"
                                        class="nds-check">
                                </div>
                            </div>
                            <div class="nds-form-container nds-check-container">
                                <div class="nds-form-header">
                                    <label for="sys-education"><span class="label">Education System</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="sys-education" name="system" value="Education System"
                                        class="nds-check">
                                </div>
                            </div>
                            <div class="nds-form-container nds-check-container">
                                <div class="nds-form-header">
                                    <label for="sys-immigration"><span class="label">Immigration System</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="sys-immigration" name="system" value="Immigration System"
                                        class="nds-check">
                                </div>
                            </div>
                            <div class="nds-form-container nds-check-container">
                                <div class="nds-form-header">
                                    <label for="sys-justice"><span class="label">Justice System</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="sys-justice" name="system" value="Justice System"
                                        class="nds-check">
                                </div>
                            </div>
                            <div class="nds-form-container nds-check-container">
                                <div class="nds-form-header">
                                    <label for="sys-hr"><span class="label">HR System</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="sys-hr" name="system" value="HR System"
                                        class="nds-check">
                                </div>
                            </div>
                            <div class="nds-form-container nds-check-container">
                                <div class="nds-form-header">
                                    <label for="sys-social"><span class="label">Social Security System</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="sys-social" name="system" value="Social Security System"
                                        class="nds-check">
                                </div>
                            </div>
                        </fieldset>
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
        </form>
    </div>
    <div class="nds-section-content">
        <div id="services_list_content" class="nds-pagination-content nds-grid" hidden
            style="--per-page: 12; --max-col: 3; --mid-col: 2; --min-col: 1;">

            {% for service in site.data.content.services %}
            <div class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            {{ service.icon }}
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text" style="--truncate: 2;">
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
                    <a href="{{ service.url }}" class="nds-btn nds-secondary-outline nds-lg"
                        aria-label="Service Details">
                        <span class="label">Details</span>
                    </a>
                    <a href="{{ service.url }}" class="nds-btn nds-primary nds-lg nds-trail-icon"
                        aria-label="Get Started">
                        <span class="label">Get Started</span>
                    </a>
                </div>
            </div>
            {% endfor %}

        </div>
        <nav class="nds-pagination-nav" aria-label="Pagination">
            <ul class="nds-pagination">
                <li class="nds-pagination-item nds-pagination-prev">
                    <a href="#" class="nds-btn nds-subtle nds-prev nds-icon-only" aria-label="Previous page">
                    </a>
                </li>
                <li class="nds-pagination-item">
                    <a href="#" class="nds-btn nds-subtle nds-indicator" aria-label="Page 1" aria-current="page">
                        <span class="label">1</span>
                    </a>
                </li>
                <li class="nds-pagination-item">
                    <a href="#" class="nds-btn nds-subtle nds-indicator" aria-label="Page 2">
                        <span class="label">2</span>
                    </a>
                </li>
                <li class="nds-pagination-item">
                    <a href="#" class="nds-btn nds-subtle nds-indicator" aria-label="Page 3">
                        <span class="label">3</span>
                    </a>
                </li>
                <li class="nds-pagination-item">
                    <a href="#" class="nds-btn nds-subtle nds-indicator" aria-label="Page 4">
                        <span class="label">4</span>
                    </a>
                </li>
                <li class="nds-pagination-item">
                    <a href="#" class="nds-btn nds-subtle nds-indicator" aria-label="Page 5">
                        <span class="label">5</span>
                    </a>
                </li>
                <li class="nds-pagination-item nds-pagination-next">
                    <a href="#" class="nds-btn nds-subtle nds-next nds-icon-only" aria-label="Next page">
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</section>