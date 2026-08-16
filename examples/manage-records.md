---
exclude_showcase: true
layout: console
body_class: nds-full-width
title: Manage Records
hero_title: Service Requests
hero_description: A records screen with create, edit and delete, expandable detail rows, filtering, sorting, pagination and export. Everything runs in the browser, so no server is needed to try it.
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
hide_share_page: true
hideFeedback: true
---

<section id="requests" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <div class="nds-section-action nds-minimal">
                <button class="nds-btn nds-primary nds-lead-icon" id="add-record" type="button">
                    <i class="hgi hgi-stroke hgi-add-01"></i>
                    <span class="nds-label">New request</span>
                </button>
            </div>
            <h2 class="nds-section-title">Service Requests</h2>
            <p class="nds-section-description">Every request citizens submitted to the department. Open a row to read its processing detail.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-toolbar">
                <div class="nds-bar-row">
                    <div class="nds-bar-start">
                        <span class="nds-bar-text" data-paged-target="requestsTableBody" data-selection-target="requestsTableBody">
                            <span class="nds-records-view">Showing <b data-paged-from>0</b>&ndash;<b data-paged-to>0</b> of <b data-paged-count>0</b> request(s)</span>
                            <span class="nds-selection-view" hidden><b data-selection-count>0</b> selected of <b data-paged-count>0</b> request(s)</span>
                        </span>
                    </div>
                    <div class="nds-bar-end">
                        <button class="nds-btn nds-primary nds-destructive nds-md nds-lead-icon" id="bulk-delete" type="button" hidden>
                            <i class="hgi hgi-stroke hgi-delete-02"></i>
                            <span class="nds-label">Delete selected</span>
                        </button>
                        <div class="nds-dropmenu"
                             data-select-name="perPage"
                             data-select-value="5"
                             data-per-page-target="requestsTableBody">
                            <button class="nds-btn nds-secondary-outline nds-md nds-menu-btn nds-dropmenu-trigger" type="button">
                                <span class="nds-label">5</span>
                            </button>
                            <div class="nds-dropmenu-menu nds-center" hidden>
                                <div class="nds-dropmenu-scroll">
                                    <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="5"><span class="nds-label">5</span></button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="10"><span class="nds-label">10</span></button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="25"><span class="nds-label">25</span></button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="50"><span class="nds-label">50</span></button>
                                </div>
                            </div>
                        </div>
                        <div class="nds-dropmenu" data-columns-target="requestsTable">
                            <button class="nds-btn nds-neutral nds-md nds-menu-btn nds-dropmenu-trigger" type="button">
                                <i class="nds-icon nds-hgi-view-off-slash" aria-hidden="true"></i>
                                <span class="nds-label">Columns</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <div class="nds-dropmenu-scroll">
                                    <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-columns-list data-no-auto-close>
                                        <legend class="nds-label">Visible columns</legend>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div class="nds-dropmenu">
                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-dropmenu-trigger">
                                <i class="hgi hgi-stroke hgi-download-04" aria-hidden="true"></i>
                                <span class="nds-label">Export</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <div class="nds-dropmenu-scroll">
                                    <button type="button" class="nds-btn nds-subtle nds-dropmenu-item"
                                            data-export="csv" data-export-target="#requestsTable">
                                        <span class="nds-label">CSV</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-subtle nds-dropmenu-item"
                                            data-export="xls" data-export-target="#requestsTable">
                                        <span class="nds-label">Excel</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-subtle nds-dropmenu-item"
                                            data-export="pdf" data-export-target="#requestsTable">
                                        <span class="nds-label">PDF</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-bar-row">
                    <div class="nds-form-container nds-search-box" data-filter-target="requestsTableBody">
                        <div class="nds-search-content">
                            <div class="nds-form-control">
                                <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                <input type="text" class="nds-search-input" placeholder="Search requests...">
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-subtle nds-clear" hidden aria-label="Clear search"><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
                                </div>
                            </div>
                            <button class="nds-btn nds-primary nds-search-btn" type="button">
                                <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                <span class="nds-label" data-hidden="sm sr">Search</span>
                            </button>
                        </div>
                    </div>
                    <div class="nds-dropmenu nds-filter" data-filter-target="requestsTableBody">
                        <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                            <i class="hgi hgi-stroke hgi-filter"></i>
                            <span class="nds-label" data-hidden="sm sr">Filter</span>
                        </button>
                        <div class="nds-dropmenu-menu" style="min-width: 300px;" hidden>
                            <div class="nds-dropmenu-scroll">
                                <div data-filter="service" data-filter-type="checkbox"
                                    data-filter-legend="Service"
                                    data-no-auto-close>
                                </div>
                                <hr class="nds-divider">
                                <div data-filter="status" data-filter-type="radio"
                                    data-filter-legend="Status"
                                    data-filter-values='{"pending":"Pending","approved":"Approved","rejected":"Rejected"}'
                                    data-no-auto-close>
                                </div>
                                <hr class="nds-divider">
                                <div data-filter="amount" data-filter-type="slider"
                                    data-filter-legend="Fee"
                                    data-filter-min="0" data-filter-max="6000" data-filter-step="100"
                                    data-filter-currency="SAR" data-no-auto-close>
                                </div>
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
                </div>
                <div class="nds-bar-row">
                    <div class="nds-bar-start">
                        <div class="nds-filter-applied" data-filter-target="requestsTableBody" hidden>
                            <span class="nds-label">Applied Filters:</span>
                            <div class="nds-chips"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nds-block">
                <table id="requestsTable" class="nds-table nds-sortable" data-export-name="service-requests">
                    <thead>
                        <tr>
                            <th>
                                <div class="nds-form-container nds-check-container">
                                    <div class="nds-form-control">
                                        <input type="checkbox" class="nds-check" aria-label="Select all requests">
                                    </div>
                                </div>
                            </th>
                            <th data-columns-lock>
                                <div class="nds-col-header">
                                    <span class="nds-label">Reference</span>
                                    <div class="nds-col-actions">
                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by reference"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div class="nds-col-header">
                                    <span class="nds-label">Requester</span>
                                    <div class="nds-col-actions">
                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by requester"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div class="nds-col-header">
                                    <span class="nds-label">Service</span>
                                    <div class="nds-col-actions">
                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by service"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div class="nds-col-header">
                                    <span class="nds-label">Submitted</span>
                                    <div class="nds-col-actions">
                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by submitted date"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </th>
                            <th data-export-label="Fee (SAR)">
                                <div class="nds-col-header">
                                    <span class="nds-label">Fee</span>
                                    <div class="nds-col-actions">
                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by fee"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div class="nds-col-header">
                                    <span class="nds-label">Status</span>
                                    <div class="nds-col-actions">
                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by status"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </th>
                            <th class="actions-column" data-export-skip>
                                <div class="nds-col-header">
                                    <span class="nds-label">Actions</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="requestsTableBody" class="nds-paged-content" data-filter-items="tr" style="--per-page:5;">
                        <tr class="nds-page-item">
                            <td>
                                <div class="nds-form-container nds-check-container">
                                    <div class="nds-form-control">
                                        <input type="checkbox" class="nds-check" aria-label="Select request REQ-2026-118">
                                    </div>
                                </div>
                            </td>
                            <td>REQ-2026-118</td>
                            <td>Norah Al-Otaibi</td>
                            <td>
                                <span class="nds-tag nds-gray nds-sm">
                                    <span class="nds-label" data-filter="service">Commercial registration</span>
                                </span>
                            </td>
                            <td data-sort-value="2026-07-22">22/07/2026</td>
                            <td data-sort-value="1200">
                                <span class="nds-number-format" data-currency="SAR" data-filter="amount" data-filter-value="1200">1200</span>
                            </td>
                            <td data-sort-value="1">
                                <span class="nds-tag nds-sm" data-status="warning">
                                    <span class="nds-label" data-filter="status" data-filter-value="pending">Pending</span>
                                </span>
                            </td>
                            <td class="actions-column">
                                <div class="nds-flex" style="--gap: var(--spacing-xs); --align: center;">
                                    <button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-controls="detail-REQ-2026-118" aria-expanded="false" aria-label="Toggle details">
                                        <i class="hgi hgi-stroke hgi-list-view"></i>
                                    </button>
                                    <div class="nds-dropmenu" data-portal>
                                        <button class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" type="button" aria-label="Row actions">
                                            <i class="hgi hgi-stroke hgi-more-vertical"></i>
                                        </button>
                                        <div class="nds-dropmenu-menu nds-record-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-record-action="edit">
                                                    <i class="hgi hgi-stroke hgi-edit-02"></i>
                                                    <span class="nds-label">Edit</span>
                                                </button>
                                                <hr class="nds-divider">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive" type="button" data-record-action="delete">
                                                    <i class="hgi hgi-stroke hgi-delete-02"></i>
                                                    <span class="nds-label">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr id="detail-REQ-2026-118" class="nds-sub" hidden>
                            <td>
                                <div class="nds-toolbar">
                                    <div class="nds-bar-start">
                                        <span class="nds-bar-text">Fee breakdown for the commercial registration request.</span>
                                    </div>
                                    <div class="nds-bar-end">
                                        <button type="button" class="nds-btn nds-secondary-outline nds-md" data-export="csv" data-export-target="#detail-REQ-2026-118-items">
                                            <span class="nds-label">Export CSV</span>
                                        </button>
                                    </div>
                                </div>
                                <table id="detail-REQ-2026-118-items" class="nds-table nds-compact" data-export-name="REQ-2026-118-fee-breakdown">
                                    <thead>
                                        <tr>
                                            <th>Line item</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Processing fee</td>
                                            <td>25</td>
                                        </tr>
                                        <tr>
                                            <td>Registration charge</td>
                                            <td>1,020</td>
                                        </tr>
                                        <tr>
                                            <td>VAT (15%)</td>
                                            <td>155</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr class="nds-page-item">
                            <td>
                                <div class="nds-form-container nds-check-container">
                                    <div class="nds-form-control">
                                        <input type="checkbox" class="nds-check" aria-label="Select request REQ-2026-117">
                                    </div>
                                </div>
                            </td>
                            <td>REQ-2026-117</td>
                            <td>Faisal Al-Harbi</td>
                            <td>
                                <span class="nds-tag nds-gray nds-sm">
                                    <span class="nds-label" data-filter="service">Work permit renewal</span>
                                </span>
                            </td>
                            <td data-sort-value="2026-07-21">21/07/2026</td>
                            <td data-sort-value="650">
                                <span class="nds-number-format" data-currency="SAR" data-filter="amount" data-filter-value="650">650</span>
                            </td>
                            <td data-sort-value="2">
                                <span class="nds-tag nds-sm" data-status="success">
                                    <span class="nds-label" data-filter="status" data-filter-value="approved">Approved</span>
                                </span>
                            </td>
                            <td class="actions-column">
                                <div class="nds-flex" style="--gap: var(--spacing-xs); --align: center;">
                                    <button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-controls="detail-REQ-2026-117" aria-expanded="false" aria-label="Toggle details">
                                        <i class="hgi hgi-stroke hgi-list-view"></i>
                                    </button>
                                    <div class="nds-dropmenu" data-portal>
                                        <button class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" type="button" aria-label="Row actions">
                                            <i class="hgi hgi-stroke hgi-more-vertical"></i>
                                        </button>
                                        <div class="nds-dropmenu-menu nds-record-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-record-action="edit">
                                                    <i class="hgi hgi-stroke hgi-edit-02"></i>
                                                    <span class="nds-label">Edit</span>
                                                </button>
                                                <hr class="nds-divider">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive" type="button" data-record-action="delete">
                                                    <i class="hgi hgi-stroke hgi-delete-02"></i>
                                                    <span class="nds-label">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr id="detail-REQ-2026-117" class="nds-sub" hidden>
                            <td>
                                <div class="nds-toolbar">
                                    <div class="nds-bar-start">
                                        <span class="nds-bar-text">Renewal approved by the labour office. The permit card is ready for collection at the service centre.</span>
                                    </div>
                                    <div class="nds-bar-end">
                                        <button type="button" class="nds-btn nds-secondary-outline nds-md" data-export="csv" data-export-target="#detail-REQ-2026-117-timeline">
                                            <span class="nds-label">Export CSV</span>
                                        </button>
                                    </div>
                                </div>
                                <table id="detail-REQ-2026-117-timeline" class="nds-table nds-compact" data-export-name="REQ-2026-117-timeline">
                                    <thead>
                                        <tr>
                                            <th>Step</th>
                                            <th>Officer</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Submitted</td>
                                            <td>&mdash;</td>
                                            <td>21/07/2026</td>
                                        </tr>
                                        <tr>
                                            <td>Documents checked</td>
                                            <td>M. Al-Rashid</td>
                                            <td>22/07/2026</td>
                                        </tr>
                                        <tr>
                                            <td>Approved</td>
                                            <td>S. Al-Mansour</td>
                                            <td>23/07/2026</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr class="nds-page-item">
                            <td>
                                <div class="nds-form-container nds-check-container">
                                    <div class="nds-form-control">
                                        <input type="checkbox" class="nds-check" aria-label="Select request REQ-2026-116">
                                    </div>
                                </div>
                            </td>
                            <td>REQ-2026-116</td>
                            <td>Maha Al-Zahrani</td>
                            <td>
                                <span class="nds-tag nds-gray nds-sm">
                                    <span class="nds-label" data-filter="service">Municipal licence</span>
                                </span>
                            </td>
                            <td data-sort-value="2026-07-20">20/07/2026</td>
                            <td data-sort-value="2400">
                                <span class="nds-number-format" data-currency="SAR" data-filter="amount" data-filter-value="2400">2400</span>
                            </td>
                            <td data-sort-value="1">
                                <span class="nds-tag nds-sm" data-status="warning">
                                    <span class="nds-label" data-filter="status" data-filter-value="pending">Pending</span>
                                </span>
                            </td>
                            <td class="actions-column">
                                <div class="nds-flex" style="--gap: var(--spacing-xs); --align: center;">
                                    <button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-expanded="false" aria-label="Toggle details">
                                        <i class="hgi hgi-stroke hgi-list-view"></i>
                                    </button>
                                    <div class="nds-dropmenu" data-portal>
                                        <button class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" type="button" aria-label="Row actions">
                                            <i class="hgi hgi-stroke hgi-more-vertical"></i>
                                        </button>
                                        <div class="nds-dropmenu-menu nds-record-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-record-action="edit">
                                                    <i class="hgi hgi-stroke hgi-edit-02"></i>
                                                    <span class="nds-label">Edit</span>
                                                </button>
                                                <hr class="nds-divider">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive" type="button" data-record-action="delete">
                                                    <i class="hgi hgi-stroke hgi-delete-02"></i>
                                                    <span class="nds-label">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="nds-page-item">
                            <td>
                                <div class="nds-form-container nds-check-container">
                                    <div class="nds-form-control">
                                        <input type="checkbox" class="nds-check" aria-label="Select request REQ-2026-115">
                                    </div>
                                </div>
                            </td>
                            <td>REQ-2026-115</td>
                            <td>Turki Al-Dossary</td>
                            <td>
                                <span class="nds-tag nds-gray nds-sm">
                                    <span class="nds-label" data-filter="service">Building permit</span>
                                </span>
                            </td>
                            <td data-sort-value="2026-07-18">18/07/2026</td>
                            <td data-sort-value="5000">
                                <span class="nds-number-format" data-currency="SAR" data-filter="amount" data-filter-value="5000">5000</span>
                            </td>
                            <td data-sort-value="3">
                                <span class="nds-tag nds-sm" data-status="error">
                                    <span class="nds-label" data-filter="status" data-filter-value="rejected">Rejected</span>
                                </span>
                            </td>
                            <td class="actions-column">
                                <div class="nds-flex" style="--gap: var(--spacing-xs); --align: center;">
                                    <button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-expanded="false" aria-label="Toggle details">
                                        <i class="hgi hgi-stroke hgi-list-view"></i>
                                    </button>
                                    <div class="nds-dropmenu" data-portal>
                                        <button class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" type="button" aria-label="Row actions">
                                            <i class="hgi hgi-stroke hgi-more-vertical"></i>
                                        </button>
                                        <div class="nds-dropmenu-menu nds-record-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-record-action="edit">
                                                    <i class="hgi hgi-stroke hgi-edit-02"></i>
                                                    <span class="nds-label">Edit</span>
                                                </button>
                                                <hr class="nds-divider">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive" type="button" data-record-action="delete">
                                                    <i class="hgi hgi-stroke hgi-delete-02"></i>
                                                    <span class="nds-label">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="nds-page-item">
                            <td>
                                <div class="nds-form-container nds-check-container">
                                    <div class="nds-form-control">
                                        <input type="checkbox" class="nds-check" aria-label="Select request REQ-2026-114">
                                    </div>
                                </div>
                            </td>
                            <td>REQ-2026-114</td>
                            <td>Sara Al-Ghamdi</td>
                            <td>
                                <span class="nds-tag nds-gray nds-sm">
                                    <span class="nds-label" data-filter="service">Commercial registration</span>
                                </span>
                            </td>
                            <td data-sort-value="2026-07-17">17/07/2026</td>
                            <td data-sort-value="1200">
                                <span class="nds-number-format" data-currency="SAR" data-filter="amount" data-filter-value="1200">1200</span>
                            </td>
                            <td data-sort-value="2">
                                <span class="nds-tag nds-sm" data-status="success">
                                    <span class="nds-label" data-filter="status" data-filter-value="approved">Approved</span>
                                </span>
                            </td>
                            <td class="actions-column">
                                <div class="nds-flex" style="--gap: var(--spacing-xs); --align: center;">
                                    <button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-expanded="false" aria-label="Toggle details">
                                        <i class="hgi hgi-stroke hgi-list-view"></i>
                                    </button>
                                    <div class="nds-dropmenu" data-portal>
                                        <button class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" type="button" aria-label="Row actions">
                                            <i class="hgi hgi-stroke hgi-more-vertical"></i>
                                        </button>
                                        <div class="nds-dropmenu-menu nds-record-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-record-action="edit">
                                                    <i class="hgi hgi-stroke hgi-edit-02"></i>
                                                    <span class="nds-label">Edit</span>
                                                </button>
                                                <hr class="nds-divider">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive" type="button" data-record-action="delete">
                                                    <i class="hgi hgi-stroke hgi-delete-02"></i>
                                                    <span class="nds-label">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="nds-page-item">
                            <td>
                                <div class="nds-form-container nds-check-container">
                                    <div class="nds-form-control">
                                        <input type="checkbox" class="nds-check" aria-label="Select request REQ-2026-113">
                                    </div>
                                </div>
                            </td>
                            <td>REQ-2026-113</td>
                            <td>Abdullah Al-Qahtani</td>
                            <td>
                                <span class="nds-tag nds-gray nds-sm">
                                    <span class="nds-label" data-filter="service">Vehicle transfer</span>
                                </span>
                            </td>
                            <td data-sort-value="2026-07-15">15/07/2026</td>
                            <td data-sort-value="300">
                                <span class="nds-number-format" data-currency="SAR" data-filter="amount" data-filter-value="300">300</span>
                            </td>
                            <td data-sort-value="1">
                                <span class="nds-tag nds-sm" data-status="warning">
                                    <span class="nds-label" data-filter="status" data-filter-value="pending">Pending</span>
                                </span>
                            </td>
                            <td class="actions-column">
                                <div class="nds-flex" style="--gap: var(--spacing-xs); --align: center;">
                                    <button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-expanded="false" aria-label="Toggle details">
                                        <i class="hgi hgi-stroke hgi-list-view"></i>
                                    </button>
                                    <div class="nds-dropmenu" data-portal>
                                        <button class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" type="button" aria-label="Row actions">
                                            <i class="hgi hgi-stroke hgi-more-vertical"></i>
                                        </button>
                                        <div class="nds-dropmenu-menu nds-record-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-record-action="edit">
                                                    <i class="hgi hgi-stroke hgi-edit-02"></i>
                                                    <span class="nds-label">Edit</span>
                                                </button>
                                                <hr class="nds-divider">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive" type="button" data-record-action="delete">
                                                    <i class="hgi hgi-stroke hgi-delete-02"></i>
                                                    <span class="nds-label">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="nds-page-item">
                            <td>
                                <div class="nds-form-container nds-check-container">
                                    <div class="nds-form-control">
                                        <input type="checkbox" class="nds-check" aria-label="Select request REQ-2026-112">
                                    </div>
                                </div>
                            </td>
                            <td>REQ-2026-112</td>
                            <td>Reem Al-Salem</td>
                            <td>
                                <span class="nds-tag nds-gray nds-sm">
                                    <span class="nds-label" data-filter="service">Work permit renewal</span>
                                </span>
                            </td>
                            <td data-sort-value="2026-07-14">14/07/2026</td>
                            <td data-sort-value="650">
                                <span class="nds-number-format" data-currency="SAR" data-filter="amount" data-filter-value="650">650</span>
                            </td>
                            <td data-sort-value="2">
                                <span class="nds-tag nds-sm" data-status="success">
                                    <span class="nds-label" data-filter="status" data-filter-value="approved">Approved</span>
                                </span>
                            </td>
                            <td class="actions-column">
                                <div class="nds-flex" style="--gap: var(--spacing-xs); --align: center;">
                                    <button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-expanded="false" aria-label="Toggle details">
                                        <i class="hgi hgi-stroke hgi-list-view"></i>
                                    </button>
                                    <div class="nds-dropmenu" data-portal>
                                        <button class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" type="button" aria-label="Row actions">
                                            <i class="hgi hgi-stroke hgi-more-vertical"></i>
                                        </button>
                                        <div class="nds-dropmenu-menu nds-record-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-record-action="edit">
                                                    <i class="hgi hgi-stroke hgi-edit-02"></i>
                                                    <span class="nds-label">Edit</span>
                                                </button>
                                                <hr class="nds-divider">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive" type="button" data-record-action="delete">
                                                    <i class="hgi hgi-stroke hgi-delete-02"></i>
                                                    <span class="nds-label">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="nds-page-item">
                            <td>
                                <div class="nds-form-container nds-check-container">
                                    <div class="nds-form-control">
                                        <input type="checkbox" class="nds-check" aria-label="Select request REQ-2026-111">
                                    </div>
                                </div>
                            </td>
                            <td>REQ-2026-111</td>
                            <td>Yousef Al-Mutairi</td>
                            <td>
                                <span class="nds-tag nds-gray nds-sm">
                                    <span class="nds-label" data-filter="service">Municipal licence</span>
                                </span>
                            </td>
                            <td data-sort-value="2026-07-12">12/07/2026</td>
                            <td data-sort-value="2400">
                                <span class="nds-number-format" data-currency="SAR" data-filter="amount" data-filter-value="2400">2400</span>
                            </td>
                            <td data-sort-value="3">
                                <span class="nds-tag nds-sm" data-status="error">
                                    <span class="nds-label" data-filter="status" data-filter-value="rejected">Rejected</span>
                                </span>
                            </td>
                            <td class="actions-column">
                                <div class="nds-flex" style="--gap: var(--spacing-xs); --align: center;">
                                    <button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-expanded="false" aria-label="Toggle details">
                                        <i class="hgi hgi-stroke hgi-list-view"></i>
                                    </button>
                                    <div class="nds-dropmenu" data-portal>
                                        <button class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" type="button" aria-label="Row actions">
                                            <i class="hgi hgi-stroke hgi-more-vertical"></i>
                                        </button>
                                        <div class="nds-dropmenu-menu nds-record-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-record-action="edit">
                                                    <i class="hgi hgi-stroke hgi-edit-02"></i>
                                                    <span class="nds-label">Edit</span>
                                                </button>
                                                <hr class="nds-divider">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive" type="button" data-record-action="delete">
                                                    <i class="hgi hgi-stroke hgi-delete-02"></i>
                                                    <span class="nds-label">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="nds-page-item">
                            <td>
                                <div class="nds-form-container nds-check-container">
                                    <div class="nds-form-control">
                                        <input type="checkbox" class="nds-check" aria-label="Select request REQ-2026-110">
                                    </div>
                                </div>
                            </td>
                            <td>REQ-2026-110</td>
                            <td>Lama Al-Amri</td>
                            <td>
                                <span class="nds-tag nds-gray nds-sm">
                                    <span class="nds-label" data-filter="service">Building permit</span>
                                </span>
                            </td>
                            <td data-sort-value="2026-07-10">10/07/2026</td>
                            <td data-sort-value="5000">
                                <span class="nds-number-format" data-currency="SAR" data-filter="amount" data-filter-value="5000">5000</span>
                            </td>
                            <td data-sort-value="2">
                                <span class="nds-tag nds-sm" data-status="success">
                                    <span class="nds-label" data-filter="status" data-filter-value="approved">Approved</span>
                                </span>
                            </td>
                            <td class="actions-column">
                                <div class="nds-flex" style="--gap: var(--spacing-xs); --align: center;">
                                    <button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-expanded="false" aria-label="Toggle details">
                                        <i class="hgi hgi-stroke hgi-list-view"></i>
                                    </button>
                                    <div class="nds-dropmenu" data-portal>
                                        <button class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" type="button" aria-label="Row actions">
                                            <i class="hgi hgi-stroke hgi-more-vertical"></i>
                                        </button>
                                        <div class="nds-dropmenu-menu nds-record-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-record-action="edit">
                                                    <i class="hgi hgi-stroke hgi-edit-02"></i>
                                                    <span class="nds-label">Edit</span>
                                                </button>
                                                <hr class="nds-divider">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive" type="button" data-record-action="delete">
                                                    <i class="hgi hgi-stroke hgi-delete-02"></i>
                                                    <span class="nds-label">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="nds-page-item">
                            <td>
                                <div class="nds-form-container nds-check-container">
                                    <div class="nds-form-control">
                                        <input type="checkbox" class="nds-check" aria-label="Select request REQ-2026-109">
                                    </div>
                                </div>
                            </td>
                            <td>REQ-2026-109</td>
                            <td>Khalid Al-Shehri</td>
                            <td>
                                <span class="nds-tag nds-gray nds-sm">
                                    <span class="nds-label" data-filter="service">Vehicle transfer</span>
                                </span>
                            </td>
                            <td data-sort-value="2026-07-09">09/07/2026</td>
                            <td data-sort-value="300">
                                <span class="nds-number-format" data-currency="SAR" data-filter="amount" data-filter-value="300">300</span>
                            </td>
                            <td data-sort-value="1">
                                <span class="nds-tag nds-sm" data-status="warning">
                                    <span class="nds-label" data-filter="status" data-filter-value="pending">Pending</span>
                                </span>
                            </td>
                            <td class="actions-column">
                                <div class="nds-flex" style="--gap: var(--spacing-xs); --align: center;">
                                    <button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-expanded="false" aria-label="Toggle details">
                                        <i class="hgi hgi-stroke hgi-list-view"></i>
                                    </button>
                                    <div class="nds-dropmenu" data-portal>
                                        <button class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" type="button" aria-label="Row actions">
                                            <i class="hgi hgi-stroke hgi-more-vertical"></i>
                                        </button>
                                        <div class="nds-dropmenu-menu nds-record-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-record-action="edit">
                                                    <i class="hgi hgi-stroke hgi-edit-02"></i>
                                                    <span class="nds-label">Edit</span>
                                                </button>
                                                <hr class="nds-divider">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive" type="button" data-record-action="delete">
                                                    <i class="hgi hgi-stroke hgi-delete-02"></i>
                                                    <span class="nds-label">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav class="nds-pagination" data-auto-pagination="requestsTableBody" aria-label="Requests pagination"></nav>
        </div>
    </div>
</section>

<!-- Create / edit dialog -->
<div id="record-modal" class="nds-modal nds-card nds-stroke nds-lg" role="dialog" aria-labelledby="record-modal-title" aria-hidden="true" hidden>
    <div class="nds-card-header">
        <span class="nds-featured-icon nds-circle">
            <i class="hgi hgi-stroke hgi-file-edit"></i>
        </span>
        <button class="nds-close nds-modal-close nds-btn nds-subtle" aria-label="Close dialog">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <form id="record-form" class="nds-form" data-ajax>
        <div class="nds-card-content">
            <div class="nds-card-text">
                <span class="nds-card-title" id="record-modal-title">New request</span>
                <p class="nds-card-description">Fill in the request details. Fields marked required must be filled.</p>
            </div>

            <div class="nds-scroll-more">
                <div class="nds-scroll-more-content nds-flex nds-col" style="--gap: var(--spacing-3xl);">
                <div class="nds-form-container" data-required
                    data-url="{{ '/docs-assets/data/users-autocomplete.json' | relative_url }}"
                    data-name="Name" data-fetch="once" data-min-chars="2"
                    data-empty-message="No matching people">
                    <div class="nds-form-header">
                        <label for="record-requester">
                            <span class="nds-label">Requester</span>
                        </label>
                    </div>
                    <div class="nds-form-control" data-portal>
                        <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                        <input type="text" id="record-requester" class="nds-input" autocomplete="on" placeholder="Type a name..." required>
                        <div class="nds-form-action">
                            <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear input">
                                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="nds-form-container nds-select" id="record-service-field" data-required>
                    <div class="nds-form-header">
                        <label for="record-service">
                            <span class="nds-label">Service</span>
                        </label>
                    </div>
                    <!-- data-portal: inside a modal the menu must escape the dialog's
                         stacking context, or it clips at the card edge -->
                    <div class="nds-form-control" data-portal>
                        <input type="text" id="record-service" class="nds-input nds-select-input" placeholder="Choose a service..." readonly>
                        <input type="hidden" name="service" id="record-service-value" class="nds-select-value">
                        <div class="nds-select-dropdown" hidden>
                            <div class="nds-select-options">
                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="Commercial registration">
                                    <span class="nds-option-text">Commercial registration</span>
                                </button>
                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="Work permit renewal">
                                    <span class="nds-option-text">Work permit renewal</span>
                                </button>
                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="Municipal licence">
                                    <span class="nds-option-text">Municipal licence</span>
                                </button>
                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="Building permit">
                                    <span class="nds-option-text">Building permit</span>
                                </button>
                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="Vehicle transfer">
                                    <span class="nds-option-text">Vehicle transfer</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-form-container nds-date-picker" data-required>
                    <div class="nds-form-header">
                        <label for="record-date">
                            <span class="nds-label">Submitted</span>
                        </label>
                    </div>
                    <div class="nds-form-control" data-portal>
                        <div class="nds-form-action">
                            <button type="button" class="nds-btn nds-subtle nds-md date-picker-toggle" aria-label="Calendar Toggler">
                                <i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i>
                            </button>
                        </div>
                        <input type="text" id="record-date" class="nds-input nds-date-input" placeholder="DD/MM/YYYY" data-year-before="5" data-year-after="1" required>
                    </div>
                </div>

                <div class="nds-form-container" data-required>
                    <div class="nds-form-header">
                        <label for="record-amount">
                            <span class="nds-label">Fee (SAR)</span>
                        </label>
                    </div>
                    <div class="nds-form-control">
                        <input type="number" id="record-amount" class="nds-input" placeholder="0" min="0" step="10" required>
                    </div>
                </div>

                <div class="nds-form-container nds-select">
                    <div class="nds-form-header">
                        <label for="record-status">
                            <span class="nds-label">Status</span>
                        </label>
                    </div>
                    <div class="nds-form-control" data-portal>
                        <input type="text" id="record-status" class="nds-input nds-select-input" placeholder="Pending" readonly>
                        <input type="hidden" name="status" id="record-status-value" class="nds-select-value">
                        <div class="nds-select-dropdown" hidden>
                            <div class="nds-select-options">
                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="pending">
                                    <span class="nds-option-text">Pending</span>
                                </button>
                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="approved">
                                    <span class="nds-option-text">Approved</span>
                                </button>
                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="rejected">
                                    <span class="nds-option-text">Rejected</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <button class="nds-btn nds-subtle nds-md nds-show-more" type="button" aria-label="Show more">
                    <span class="nds-label">Show more</span>
                    <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                </button>
            </div>

        </div>
        <!-- Actions sit OUTSIDE .nds-card-content: that is the part that
             scrolls, so anything inside it scrolls away with a long form -->
        <div class="nds-card-actions">
            <button class="nds-btn nds-primary nds-lg" type="submit">
                <span class="nds-label">Save</span>
            </button>
            <button class="nds-btn nds-secondary-outline nds-lg" type="button" data-modal-close>
                <span class="nds-label">Cancel</span>
            </button>
        </div>
    </form>
</div>

<!-- Delete confirmation -->
<div id="delete-modal" class="nds-modal nds-card nds-stroke nds-sm" role="dialog" aria-labelledby="delete-modal-title" aria-hidden="true" hidden>
    <div class="nds-card-header">
        <span class="nds-featured-icon nds-circle" data-status="error">
            <i class="hgi hgi-stroke hgi-delete-02"></i>
        </span>
        <button class="nds-close nds-modal-close nds-btn nds-subtle" aria-label="Close dialog">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <div class="nds-card-content">
        <div class="nds-card-text">
            <span class="nds-card-title" id="delete-modal-title">Delete request</span>
            <p class="nds-card-description" id="delete-modal-text">This cannot be undone.</p>
        </div>
    </div>
    <div class="nds-card-actions">
        <button class="nds-btn nds-primary nds-destructive nds-lg" id="delete-confirm" type="button">
            <span class="nds-label">Delete</span>
        </button>
        <button class="nds-btn nds-secondary-outline nds-lg" type="button" data-modal-close>
            <span class="nds-label">Cancel</span>
        </button>
    </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    var table = document.getElementById('requestsTable');
    var tbody = document.getElementById('requestsTableBody');
    var form = document.getElementById('record-form');
    var modalTitle = document.getElementById('record-modal-title');
    var bulkBtn = document.getElementById('bulk-delete');
    var deleteText = document.getElementById('delete-modal-text');
    var serviceField = document.getElementById('record-service-field');
    var fields = {
      requester: document.getElementById('record-requester'),
      service: document.getElementById('record-service'),
      serviceValue: document.getElementById('record-service-value'),
      date: document.getElementById('record-date'),
      amount: document.getElementById('record-amount'),
      status: document.getElementById('record-status'),
      statusValue: document.getElementById('record-status-value')
    };
    var STATUSES = {
      pending: { label: 'Pending', tag: 'warning', sort: 1 },
      approved: { label: 'Approved', tag: 'success', sort: 2 },
      rejected: { label: 'Rejected', tag: 'error', sort: 3 }
    };

    var editing = null;     // the row being edited, null while creating
    var toDelete = [];      // rows the confirm dialog will remove
    var selectedRows = [];
    var nextRef = 119;

    // Record values reach the DOM as HTML, so escape them first.
    function esc(value) {
      return String(value == null ? '' : value).replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
      });
    }

    // 22/07/2026 -> 2026-07-22, so the Submitted column sorts by real date order.
    function toIso(value) {
      var parts = String(value).split('/');
      return parts.length === 3 ? parts[2] + '-' + parts[1] + '-' + parts[0] : value;
    }

    function toast(variant, title, description) {
      if (!NDS.Alert) return;
      NDS.Alert.create({
        variant: variant, title: title, description: description,
        display: 'toast', position: 'top', duration: 4000
      });
    }

    // ── Row markup ──────────────────────────────────────────────────────────
    // Same shape as the rows written into the page, so sorting, filtering,
    // export and the sub-row toggle keep working on rows added at runtime.
    function rowHtml(record) {
      var status = STATUSES[record.status] || STATUSES.pending;
      return '' +
        '<td>' +
          '<div class="nds-form-container nds-check-container">' +
            '<div class="nds-form-control">' +
              '<input type="checkbox" class="nds-check" aria-label="Select request ' + esc(record.ref) + '">' +
            '</div>' +
          '</div>' +
        '</td>' +
        '<td>' + esc(record.ref) + '</td>' +
        '<td>' + esc(record.requester) + '</td>' +
        '<td>' +
          '<span class="nds-tag nds-gray nds-sm">' +
            '<span class="nds-label" data-filter="service">' + esc(record.service) + '</span>' +
          '</span>' +
        '</td>' +
        '<td data-sort-value="' + esc(toIso(record.date)) + '">' + esc(record.date) + '</td>' +
        '<td data-sort-value="' + esc(record.amount) + '">' +
          '<span class="nds-number-format" data-currency="SAR" data-filter="amount" data-filter-value="' + esc(record.amount) + '">' + esc(record.amount) + '</span>' +
        '</td>' +
        '<td data-sort-value="' + status.sort + '">' +
          '<span class="nds-tag nds-sm" data-status="' + status.tag + '">' +
            '<span class="nds-label" data-filter="status" data-filter-value="' + esc(record.status) + '">' + status.label + '</span>' +
          '</span>' +
        '</td>' +
        '<td class="actions-column">' +
          '<div class="nds-flex" style="--gap: var(--spacing-xs); --align: center;">' +
            // No aria-controls: the sub row is built on demand, and the component
            // stamps the toggle with the real id once it exists. Naming an id that
            // never gets created leaves aria-expanded frozen at false.
            '<button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-label="Toggle details">' +
              '<i class="hgi hgi-stroke hgi-list-view"></i>' +
            '</button>' +
            '<div class="nds-dropmenu" data-portal>' +
              '<button class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" type="button" aria-label="Row actions">' +
                '<i class="hgi hgi-stroke hgi-more-vertical"></i>' +
              '</button>' +
              '<div class="nds-dropmenu-menu nds-record-menu" hidden>' +
                '<div class="nds-dropmenu-scroll">' +
                  '<button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-record-action="edit">' +
                    '<i class="hgi hgi-stroke hgi-edit-02"></i><span class="nds-label">Edit</span>' +
                  '</button>' +
                  '<hr class="nds-divider">' +
                  '<button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive" type="button" data-record-action="delete">' +
                    '<i class="hgi hgi-stroke hgi-delete-02"></i><span class="nds-label">Delete</span>' +
                  '</button>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</td>';
    }

    function readRow(row) {
      return {
        ref: row.cells[1].textContent.trim(),
        requester: row.cells[2].textContent.trim(),
        service: row.cells[3].textContent.trim(),
        date: row.cells[4].textContent.trim(),
        amount: row.cells[5].querySelector('[data-filter-value]').getAttribute('data-filter-value'),
        status: row.cells[6].querySelector('[data-filter-value]').getAttribute('data-filter-value')
      };
    }

    // Rows changed. One call tells every live component, so nothing can be
    // forgotten: components inside a new row get scanned, and the ones driving the
    // list from outside it (filter, selection, sort) re-resolve against it.
    function refreshWidgets() {
      NDS.Init.refresh(tbody);
    }

    // A dropmenu instance holds a document-level listener, so tear it down before
    // its wrapper leaves the DOM or it outlives the row it belonged to.
    function releaseRow(row) {
      row.querySelectorAll('.nds-dropmenu').forEach(function (menu) {
        NDS.Dropmenu.destroy(menu);
      });
    }

    // ── Create and edit ─────────────────────────────────────────────────────
    // setValue writes the label, the hidden value and the events in one call, and
    // works before the select has been focused for the first time.
    function setSelect(input, value) {
      if (value) NDS.CustomSelect.setValue(input, value);
      else NDS.CustomSelect.clear(input);
    }

    function openEditor(row) {
      editing = row;
      var record = row ? readRow(row) : null;
      modalTitle.textContent = record ? 'Edit ' + record.ref : 'New request';
      fields.requester.value = record ? record.requester : '';
      fields.date.value = record ? record.date : '';
      fields.amount.value = record ? record.amount : '';
      setSelect(fields.service, record ? record.service : '');
      setSelect(fields.status, record ? record.status : 'pending');
      NDS.Forms.syncState(fields.requester);
      NDS.Forms.syncState(fields.date);
      NDS.Forms.syncState(fields.amount);
      // syncState re-syncs the chrome but dispatches nothing, so it cannot clear a
      // status a failed submit left behind: every field needs clearStatus too, or
      // the form reopens blank with the last attempt's errors still on it.
      NDS.Forms.clearStatus(fields.requester);
      NDS.Forms.clearStatus(fields.date);
      NDS.Forms.clearStatus(fields.amount);
      NDS.Forms.clearStatus(serviceField);
      NDS.Modal.open('record-modal');
    }

    document.getElementById('add-record').addEventListener('click', function () {
      openEditor(null);
    });

    // data-ajax makes Forms validate, block the real submit, and fire this.
    // The required Service select is validated by Forms itself (the container's
    // data-required reads the hidden .nds-select-value carrier).
    form.addEventListener('nds:formValid', function () {
      var record = {
        ref: editing ? readRow(editing).ref : 'REQ-2026-' + nextRef++,
        requester: fields.requester.value.trim(),
        service: fields.serviceValue.value,
        date: fields.date.value.trim(),
        amount: fields.amount.value.trim(),
        status: fields.statusValue.value || 'pending'
      };

      if (editing) {
        // Collapse first: replacing the row's cells resets its toggle, and an
        // open detail row would be left showing under a closed toggle.
        NDS.Tables.row(editing).sub.close();
        releaseRow(editing);
        editing.innerHTML = rowHtml(record);
      } else {
        var row = document.createElement('tr');
        row.className = 'nds-page-item';
        row.innerHTML = rowHtml(record);
        tbody.prepend(row);
      }
      NDS.Modal.close();
      refreshWidgets();
      toast('success', editing ? 'Request updated' : 'Request created', record.ref);
      editing = null;
    });

    // ── Delete ──────────────────────────────────────────────────────────────
    function askDelete(rows) {
      if (!rows.length) return;
      toDelete = rows;
      deleteText.textContent = rows.length === 1
        ? 'Delete request ' + readRow(rows[0]).ref + '? This cannot be undone.'
        : 'Delete ' + rows.length + ' requests? This cannot be undone.';
      NDS.Modal.open('delete-modal');
    }

    document.getElementById('delete-confirm').addEventListener('click', function () {
      var count = toDelete.length;
      toDelete.forEach(function (row) {
        var sub = NDS.Tables.row(row).sub.el;   // the detail row, when the record has one
        if (sub) sub.remove();
        releaseRow(row);
        row.remove();
      });
      toDelete = [];
      selectedRows = [];
      bulkBtn.hidden = true;
      NDS.Modal.close();
      refreshWidgets();
      toast('success', 'Deleted', count === 1 ? 'One request removed.' : count + ' requests removed.');
    });

    bulkBtn.addEventListener('click', function () {
      askDelete(selectedRows.slice());
    });

    // The row menu carries data-portal, so it moves to <body> when it opens and
    // closest('tr') finds nothing. NDS.Dropmenu.from() resolves its wrapper —
    // which is still inside the row.
    document.addEventListener('click', function (event) {
      var action = event.target.closest('[data-record-action]');
      if (!action) return;
      var owner = NDS.Dropmenu.from(action) || action;
      var row = owner.closest('tr');
      if (!row) return;
      if (action.dataset.recordAction === 'edit') openEditor(row);
      else askDelete([row]);
    });

    // ── Selection ───────────────────────────────────────────────────────────
    table.addEventListener('nds:table:selection', function (event) {
      selectedRows = event.detail.selectedRows;
      bulkBtn.hidden = selectedRows.length === 0;
      bulkBtn.querySelector('.nds-label').textContent = 'Delete ' + selectedRows.length;
    });

    // ── Detail rows loaded on demand ────────────────────────────────────────
    // Rows without a written detail row fire this the first time they open. NDS
    // never fetches: answer with setContent().open(), or the toggle keeps
    // spinning. Real code puts a request here and passes detail.signal to it.
    table.addEventListener('nds:table:sub-request', function (event) {
      var row = event.detail.row;
      var record = readRow(row);
      var timer = setTimeout(function () {
        NDS.Tables.row(row).sub.setContent(detailHtml(record)).open();
      }, 700);
      event.detail.signal.addEventListener('abort', function () {
        clearTimeout(timer);   // a second click cancelled it
      });
    });

    function detailHtml(record) {
      var status = STATUSES[record.status] || STATUSES.pending;
      return '' +
        '<p>Processing history for ' + esc(record.ref) + ', filed by ' + esc(record.requester) + '.</p>' +
        '<table class="nds-table nds-compact">' +
          '<thead><tr><th>Step</th><th>Officer</th><th>Date</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>Submitted</td><td>&mdash;</td><td>' + esc(record.date) + '</td></tr>' +
            '<tr><td>Documents checked</td><td>M. Al-Rashid</td><td>' + esc(record.date) + '</td></tr>' +
            '<tr><td>' + status.label + '</td><td>S. Al-Mansour</td><td>' + esc(record.date) + '</td></tr>' +
          '</tbody>' +
        '</table>';
    }
  });
</script>
