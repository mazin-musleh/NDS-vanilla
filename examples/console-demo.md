---
layout: console
body_class: nds-full-width
layout_class: nds-toEdge
title: Admin Console Demo
hero_title: Admin Console
hero_description: A management console showcasing statistics, transaction records, team directory, and system notifications.
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
hide_share_page: true
hideFeedback: true
---

<!-- System Alert -->
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-body">
            <div class="nds-alert nds-card nds-inline" data-status="warning" role="alert">
                <span class="nds-feedback nds-alert-icon">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        <span class="nds-alert-title">Scheduled Maintenance</span>
                        <p class="nds-alert-description">System maintenance window from 2:00 AM to 4:00 AM on Friday. Some services may be temporarily unavailable.</p>
                    </div>
                </div>
                <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert">
                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </div>
</section>

<!-- Analytics -->
<section id="analytics" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Analytics</h2>
            <p class="nds-section-description">Transaction volume and service distribution for the current quarter.</p>
        </div>
    </div>
    <div class="nds-section-body">
        <div class="nds-grid" style="--max-col:2;--mid-col:1;--min-col:1;">
            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">Monthly Transactions</h3>
                    </div>
                </div>
                <div class="nds-chart"
                    data-chart-config='{"type":"bar","series":[{"name":"Completed","data":[120,180,150,220,280,200]},{"name":"Pending","data":[50,70,60,40,30,80]},{"name":"Failed","data":[8,12,6,10,5,14]}],"labels":["Jan","Feb","Mar","Apr","May","Jun"],"height":300,"bar":{"stacked":true}}'>
                </div>
            </div>
            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">Requests Over Time</h3>
                    </div>
                </div>
                <div class="nds-chart"
                    data-chart-config='{"type":"line","series":[{"name":"Requests","data":[340,420,380,510,470,620]},{"name":"Resolved","data":[310,390,360,480,450,590]}],"labels":["Jan","Feb","Mar","Apr","May","Jun"],"height":300}'>
                </div>
            </div>
            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">Service Categories</h3>
                    </div>
                </div>
                <div class="nds-chart"
                    data-chart-config='{"type":"donut","series":[35,25,20,12,8],"labels":["Licensing","Registration","Permits","Payments","Inquiries"],"height":300}'>
                </div>
            </div>
            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">Department Workload</h3>
                    </div>
                </div>
                <div class="nds-chart"
                    data-chart-config='{"type":"bar","series":[{"name":"Active","data":[45,38,52,28,18]},{"name":"Closed","data":[40,35,48,25,15]}],"labels":["Engineering","Operations","Finance","Design","Marketing"],"height":300}'>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Overview Statistics -->
<section id="overviewStats" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Overview</h2>
            <p class="nds-section-description">Key performance indicators for the current quarter.</p>
        </div>
    </div>
    <div class="nds-section-body">
        <div class="nds-grid" style="--max-col:4;--mid-col:2;--min-col:1;">
            <div class="nds-card nds-statistic nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-xl">
                            <i class="nds-icon nds-hgi-checkmark-circle-01" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <span class="nds-card-number nds-counter-value nds-number-format" data-target="1248">0</span>
                        <p class="nds-card-description">Completed transactions</p>
                    </div>
                    <div class="nds-card-meta">
                        <div class="nds-card-tags">
                            <span class="nds-tag nds-green nds-sm">
                                <i class="hgi hgi-stroke hgi-analytics-up"></i>
                                <span class="nds-label">Up 18% this quarter</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nds-card nds-statistic nds-stroke nds-yellow">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-xl">
                            <i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <span class="nds-card-number nds-counter-value nds-number-format" data-target="56">0</span>
                        <p class="nds-card-description">Pending requests</p>
                    </div>
                    <div class="nds-card-meta">
                        <div class="nds-card-tags">
                            <span class="nds-tag nds-yellow nds-sm">
                                <i class="hgi hgi-stroke hgi-alert-02"></i>
                                <span class="nds-label">8 require attention</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nds-card nds-statistic nds-stroke nds-blue">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-xl">
                            <i class="hgi hgi-stroke hgi-user-multiple"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <span class="nds-card-number nds-counter-value nds-number-format" data-target="12">0</span>
                        <p class="nds-card-description">Active team members</p>
                    </div>
                    <div class="nds-card-meta">
                        <div class="nds-card-tags">
                            <span class="nds-tag nds-blue nds-sm">
                                <i class="hgi hgi-stroke hgi-building-06"></i>
                                <span class="nds-label">Across 5 departments</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nds-card nds-statistic nds-stroke nds-red">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-xl">
                            <i class="nds-icon nds-hgi-notification-02" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <span class="nds-card-number nds-counter-value nds-number-format" data-target="10">0</span>
                        <p class="nds-card-description">System notifications</p>
                    </div>
                    <div class="nds-card-meta">
                        <div class="nds-card-tags">
                            <span class="nds-tag nds-red nds-sm">
                                <i class="hgi hgi-stroke hgi-shield-01"></i>
                                <span class="nds-label">2 critical alerts</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Recent Transactions -->
<section id="recentTransactions" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <div class="nds-section-action nds-minimal">
                <button class="nds-btn nds-primary nds-lead-icon">
                    <i class="hgi hgi-stroke hgi-download-04"></i>
                    <span class="nds-label">Export</span>
                </button>
            </div>
            <h2 class="nds-section-title">Recent Transactions</h2>
            <p class="nds-section-description">Latest financial records across all government service categories.</p>
        </div>
        <div class="nds-form-container nds-search-box" data-filter-target="transactionsTableBody">
            <div class="nds-search-content">
                <div class="nds-form-control">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <input type="text" class="nds-search-input" placeholder="Search transactions...">
                    <div class="nds-form-action">
                        <button class="nds-btn nds-subtle nds-clear" hidden><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
                    </div>
                </div>
                <button class="nds-btn nds-primary nds-search-btn" type="button">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <span class="nds-label">Search</span>
                </button>
                <div class="nds-dropmenu nds-filter" data-filter-target="transactionsTableBody">
                    <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                        <i class="hgi hgi-stroke hgi-filter"></i>
                        <span class="nds-label">Filter</span>
                    </button>
                    <div class="nds-dropmenu-menu" hidden>
                        <div class="nds-dropmenu-scroll">
                            <div data-filter="category" data-filter-type="checkbox"
                                data-filter-legend="Category"
                                data-no-auto-close>
                            </div>
                            <hr class="nds-divider">
                            <div data-filter="status" data-filter-type="radio"
                                data-filter-legend="Status"
                                data-filter-values='{"completed":"Completed","pending":"Pending","failed":"Failed"}'
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
            </div>
            <div class="nds-filter-applied" data-filter-target="transactionsTableBody" hidden>
                <span class="nds-label">Applied Filters:</span>
                <div class="nds-chips"></div>
            </div>
        </div>
        <div class="nds-section-body">
        <div class="nds-paged-content" hidden>
            <table class="nds-table nds-compact nds-sortable">
                <thead>
                    <tr>
                        <th>
                            <div class="nds-col-header">
                                <span class="nds-label">Reference</span>
                                <div class="nds-col-actions">
                                    <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"></i></button>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="nds-col-header">
                                <span class="nds-label">Service</span>
                                <div class="nds-col-actions">
                                    <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"></i></button>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="nds-col-header">
                                <span class="nds-label">Category</span>
                                <div class="nds-col-actions">
                                    <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"></i></button>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="nds-col-header">
                                <span class="nds-label">Amount</span>
                                <div class="nds-col-actions">
                                    <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"></i></button>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="nds-col-header">
                                <span class="nds-label">Date</span>
                                <div class="nds-col-actions">
                                    <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"></i></button>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="nds-col-header">
                                <span class="nds-label">Status</span>
                            </div>
                        </th>
                        <th class="actions-column">
                            <div class="nds-col-header">
                                <span class="nds-label">Action</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody id="transactionsTableBody" data-filter-items="tr">
                    {% for txn in site.data.content.transactions %}
                    <tr class="nds-page-item">
                        <td>{{ txn.id }}</td>
                        <td>{{ txn.name }}</td>
                        <td>
                            <span class="nds-tag nds-gray nds-sm">
                                <span class="nds-label" data-filter="category">{{ txn.category }}</span>
                            </span>
                        </td>
                        <td>
                            <span class="nds-number-format" data-currency="{{ txn.currency }}">{{ txn.amount }}</span>
                        </td>
                        <td>{{ txn.date }}</td>
                        <td>
                            {% if txn.status == "completed" %}
                            <span class="nds-tag nds-sm" data-status="success">
                                <span class="nds-label" data-filter="status" data-filter-value="completed">Completed</span>
                            </span>
                            {% elsif txn.status == "pending" %}
                            <span class="nds-tag nds-sm" data-status="warning">
                                <span class="nds-label" data-filter="status" data-filter-value="pending">Pending</span>
                            </span>
                            {% elsif txn.status == "failed" %}
                            <span class="nds-tag nds-sm" data-status="error">
                                <span class="nds-label" data-filter="status" data-filter-value="failed">Failed</span>
                            </span>
                            {% endif %}
                        </td>
                        <td class="actions-column">
                            <div class="nds-dropmenu">
                                <button class="nds-btn nds-subtle nds-sm nds-icon-only nds-dropmenu-trigger" aria-label="Row actions">
                                    <i class="hgi hgi-stroke hgi-edit-02"></i>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="nds-icon nds-hgi-eye" aria-hidden="true"></i>
                                            <span class="nds-label">View details</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-download-04"></i>
                                            <span class="nds-label">Download receipt</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                            <span class="nds-label">Copy reference</span>
                                        </button>
                                        <hr class="nds-divider">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive">
                                            <i class="hgi hgi-stroke hgi-delete-02"></i>
                                            <span class="nds-label">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
        </div>
        <nav class="nds-pagination" data-auto-pagination aria-label="Table pagination"></nav>
        </div>
    </div>
</section>

<!-- Team Directory -->
<section id="teamDirectory" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <div class="nds-section-action nds-minimal">
                <button class="nds-btn nds-primary nds-lead-icon">
                    <i class="hgi hgi-stroke hgi-user-add-01"></i>
                    <span class="nds-label">Add Member</span>
                </button>
            </div>
            <h2 class="nds-section-title">Team Directory</h2>
            <p class="nds-section-description">Active team members across all departments.</p>
        </div>
        <div class="nds-form-container nds-search-box" data-filter-target="teamDirectoryGrid">
            <div class="nds-search-content">
                <div class="nds-form-control">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <input type="text" class="nds-search-input" placeholder="Search team members...">
                    <div class="nds-form-action">
                        <button class="nds-btn nds-subtle nds-clear" hidden><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
                    </div>
                </div>
                <button class="nds-btn nds-primary nds-search-btn" type="button">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <span class="nds-label">Search</span>
                </button>
                <div class="nds-dropmenu nds-filter" data-filter-target="teamDirectoryGrid">
                    <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                        <i class="hgi hgi-stroke hgi-filter"></i>
                        <span class="nds-label">Filter</span>
                    </button>
                    <div class="nds-dropmenu-menu" hidden>
                        <div class="nds-dropmenu-scroll">
                            <div data-filter="department" data-filter-type="checkbox"
                                data-filter-legend="Department"
                                data-no-auto-close>
                            </div>
                            <hr class="nds-divider">
                            <div data-filter="status" data-filter-type="radio"
                                data-filter-legend="Status"
                                data-filter-values='{"active":"Active","away":"Away","offline":"Offline"}'
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
            </div>
            <div class="nds-filter-applied" data-filter-target="teamDirectoryGrid" hidden>
                <span class="nds-label">Applied Filters:</span>
                <div class="nds-chips"></div>
            </div>
        </div>
        <div class="nds-section-body">
            <div class="nds-paged-content" style="--per-page:6;" hidden>
                <div class="nds-grid" id="teamDirectoryGrid" data-filter-items=".nds-card" style="--max-col:3;--mid-col:2;--min-col:1;">
                    {% for user in site.data.content.users %}
                    <div class="nds-card nds-stroke nds-page-item">
                        <div class="nds-card-header nds-rowView">
                            <div class="nds-card-featured-icon">
                                <span class="nds-avatar nds-lg">
                                    {% if user.avatar %}
                                    <img src="{{ user.avatar | relative_url }}" alt="{{ user.name }}" loading="lazy">
                                    {% else %}
                                    <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
                                    {% endif %}
                                </span>
                            </div>
                            {% if user.status == "active" %}
                            <span class="nds-tag nds-sm" data-status="success">
                                <span class="nds-label" data-filter="status" data-filter-value="active">Active</span>
                            </span>
                            {% elsif user.status == "away" %}
                            <span class="nds-tag nds-sm" data-status="warning">
                                <span class="nds-label" data-filter="status" data-filter-value="away">Away</span>
                            </span>
                            {% elsif user.status == "offline" %}
                            <span class="nds-tag nds-sm" data-status="neutral">
                                <span class="nds-label" data-filter="status" data-filter-value="offline">Offline</span>
                            </span>
                            {% endif %}
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <h3 class="nds-card-title">{{ user.name }}</h3>
                                <p class="nds-card-description">{{ user.role }}</p>
                            </div>
                            <div class="nds-card-meta">
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-blue nds-sm">
                                        <span class="nds-label" data-filter="department">{{ user.department }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="nds-card-actions">
                            <a href="mailto:{{ user.email }}" class="nds-btn nds-secondary-outline nds-lg nds-lead-icon">
                                <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
                                <span class="nds-label">Contact</span>
                            </a>
                        </div>
                    </div>
                    {% endfor %}
                </div>
            </div>
            <nav class="nds-pagination" data-auto-pagination aria-label="Team directory pagination"></nav>
        </div>
    </div>
</section>