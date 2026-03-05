---
layout: page
title: Tables
hero_title: Table Components - National Design System
hero_description: Responsive data tables with consistent styling and interactive features
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Basic Table Section -->
<section id="basicTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Basic Table</h2>
            <p class="nds-section-description">Standard table structure with header, body, and interactive states</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Data Table</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <table class="nds-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Ahmed Mohammed</td>
                                    <td>ahmed.mohammed@moi.gov.sa</td>
                                    <td>Developer</td>
                                    <td><span class="nds-tag nds-success nds-status nds-sm"><span
                                                class="label">Active</span></span></td>
                                </tr>
                                <tr>
                                    <td>Fatima Al-Zahra</td>
                                    <td>fatima.alzahra@moi.gov.sa</td>
                                    <td>Designer</td>
                                    <td><span class="nds-tag nds-info nds-status nds-sm"><span
                                                class="label">Available</span></span></td>
                                </tr>
                                <tr>
                                    <td>Khalid Al-Rashid</td>
                                    <td>khalid.alrashid@moi.gov.sa</td>
                                    <td>Project Manager</td>
                                    <td><span class="nds-tag nds-warning nds-status nds-sm"><span
                                                class="label">Busy</span></span></td>
                                </tr>
                                <tr>
                                    <td>Nora Al-Faisal</td>
                                    <td>nora.alfaisal@moi.gov.sa</td>
                                    <td>Analyst</td>
                                    <td><span class="nds-tag nds-error nds-status nds-sm"><span
                                                class="label">Unavailable</span></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-table-1" id="tab-table-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-table-1"
                            aria-labelledby="tab-table-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
                                    <table class="nds-table">
                                      <thead>
                                        <tr>
                                          <th>Name</th>
                                          <th>Email</th>
                                          <th>Role</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>Ahmed Mohammed</td>
                                          <td>ahmed.mohammed@moi.gov.sa</td>
                                          <td>Developer</td>
                                          <td><span class="nds-tag nds-success nds-status nds-sm"><span class="label">Active</span></span></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    </code>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Compact Table Section -->
<section id="compactTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Compact Table</h2>
            <p class="nds-section-description">Space-efficient table design for dense data display</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Compact Data Table</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <table class="nds-table nds-compact">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Tags</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>001</td>
                                    <td>Dell Laptop</td>
                                    <td>9,375 SAR</td>
                                    <td>
                                        <span class="nds-tag nds-success nds-sm"><span class="label">In
                                                Stock</span></span>
                                        <span class="nds-tag nds-neutral nds-sm"><span
                                                class="label">Electronics</span></span>
                                    </td>
                                    <td>
                                        <button class="nds-btn nds-sm nds-transparent">
                                            <i class="hgi hgi-stroke hgi-edit-05"></i>
                                            <span class="label">Edit</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>002</td>
                                    <td>Wireless Mouse</td>
                                    <td>281 SAR</td>
                                    <td>
                                        <span class="nds-tag nds-warning nds-sm"><span class="label">Low
                                                Stock</span></span>
                                        <span class="nds-tag nds-info nds-sm"><span
                                                class="label">Accessories</span></span>
                                    </td>
                                    <td>
                                        <button class="nds-btn nds-sm nds-transparent">
                                            <i class="hgi hgi-stroke hgi-edit-05"></i>
                                            <span class="label">Edit</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>003</td>
                                    <td>Mechanical Keyboard</td>
                                    <td>1,200 SAR</td>
                                    <td>
                                        <span class="nds-tag nds-neutral nds-sm"><span
                                                class="label">Ordered</span></span>
                                        <span class="nds-tag nds-info nds-sm"><span
                                                class="label">Accessories</span></span>
                                        <span class="nds-tag nds-success nds-sm"><span
                                                class="label">Premium</span></span>
                                    </td>
                                    <td>
                                        <button class="nds-btn nds-sm nds-transparent">
                                            <i class="hgi hgi-stroke hgi-edit-05"></i>
                                            <span class="label">Edit</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>004</td>
                                    <td>27" Monitor</td>
                                    <td>4,500 SAR</td>
                                    <td>
                                        <span class="nds-tag nds-error nds-sm"><span class="label">Out of
                                                Stock</span></span>
                                        <span class="nds-tag nds-neutral nds-sm"><span
                                                class="label">Display</span></span>
                                    </td>
                                    <td>
                                        <button class="nds-btn nds-sm nds-transparent">
                                            <i class="hgi hgi-stroke hgi-edit-05"></i>
                                            <span class="label">Edit</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-compact-1" id="tab-compact-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-compact-1"
                            aria-labelledby="tab-compact-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
                                <table class="nds-table nds-compact">
                                  <thead>
                                    <tr>
                                      <th>ID</th>
                                      <th>Product</th>
                                      <th>Price</th>
                                      <th>Tags</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>001</td>
                                      <td>Dell Laptop</td>
                                      <td>9,375 SAR</td>
                                      <td>
                                        <span class="nds-tag nds-success nds-sm"><span class="label">In Stock</span></span>
                                        <span class="nds-tag nds-neutral nds-sm"><span class="label">Electronics</span></span>
                                      </td>
                                      <td>
                                        <button class="nds-btn nds-sm nds-transparent">
                                          <i class="hgi hgi-stroke hgi-edit-05"></i>
                                          <span class="label">Edit</span>
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Sortable Table Section -->
<section id="sortableTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Sortable Table</h2>
            <p class="nds-section-description">Interactive table with sorting capabilities and visual indicators</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Sortable Data Table</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <table class="nds-table nds-sortable">
                            <thead>
                                <tr>
                                    <th class="nds-sortable-col">
                                        <button class="nds-btn nds-sort-header">
                                            <span class="label">Department</span>
                                            <i class="hgi hgi-stroke hgi-arrow-up-down nds-sort-icon"></i>
                                        </button>
                                    </th>
                                    <th class="nds-sortable-col nds-sorted-asc">
                                        <button class="nds-btn nds-sort-header">
                                            <span class="label">Employees</span>
                                            <i class="hgi hgi-stroke hgi-arrow-up nds-sort-icon"></i>
                                        </button>
                                    </th>
                                    <th class="nds-sortable-col">
                                        <button class="nds-btn nds-sort-header">
                                            <span class="label">Budget</span>
                                            <i class="hgi hgi-stroke hgi-arrow-up-down nds-sort-icon"></i>
                                        </button>
                                    </th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Information Technology</td>
                                    <td>25</td>
                                    <td>5,625,000 SAR</td>
                                    <td><span class="nds-tag nds-success nds-status nds-sm"><span
                                                class="label">Active</span></span></td>
                                </tr>
                                <tr>
                                    <td>Human Resources</td>
                                    <td>12</td>
                                    <td>3,000,000 SAR</td>
                                    <td><span class="nds-tag nds-success nds-status nds-sm"><span
                                                class="label">Active</span></span></td>
                                </tr>
                                <tr>
                                    <td>Sales</td>
                                    <td>18</td>
                                    <td>4,500,000 SAR</td>
                                    <td><span class="nds-tag nds-warning nds-status nds-sm"><span class="label">Under
                                                Review</span></span></td>
                                </tr>
                                <tr>
                                    <td>Marketing</td>
                                    <td>8</td>
                                    <td>2,250,000 SAR</td>
                                    <td><span class="nds-tag nds-info nds-status nds-sm"><span
                                                class="label">Planning</span></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-sortable-1" id="tab-sortable-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-sortable-1"
                            aria-labelledby="tab-sortable-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
                                <table class="nds-table nds-sortable">
                                  <thead>
                                    <tr>
                                      <th class="nds-sortable-col">
                                        <button class="nds-btn nds-sort-header">
                                          Department
                                          <i class="hgi hgi-stroke hgi-arrow-up-down nds-sort-icon"></i>
                                        </button>
                                      </th>
                                      <th class="nds-sortable-col nds-sorted-asc">
                                        <button class="nds-btn nds-sort-header">
                                          Employees
                                          <i class="hgi hgi-stroke hgi-arrow-up nds-sort-icon"></i>
                                        </button>
                                      </th>
                                      <th class="nds-sortable-col">
                                        <button class="nds-btn nds-sort-header">
                                          Budget
                                          <i class="hgi hgi-stroke hgi-arrow-up-down nds-sort-icon"></i>
                                        </button>
                                      </th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Information Technology</td>
                                      <td>25</td>
                                      <td>5,625,000 SAR</td>
                                      <td><span class="nds-tag nds-success nds-status nds-sm"><span class="label">Active</span></span></td>
                                    </tr>
                                  </tbody>
                                </table>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Table with Feedback Icons -->
<section id="feedbackIconsTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Table with Feedback Icons</h2>
            <p class="nds-section-description">Interactive table showcasing feedback status with feedback icons</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Feedback Status Table</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <table class="nds-table">
                            <thead>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>Customer</th>
                                    <th>Issue Type</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="ticket-id">
                                            <span class="ticket-number">#TK-001</span>
                                        </div>
                                    </td>
                                    <td>Omar Al-Ahmad</td>
                                    <td>Login Issue</td>
                                    <td>
                                        <span class="nds-tag nds-neutral nds-sm">
                                            <span class="label">Low</span>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="nds-feedback" data-status="success">
                                            <span class="nds-feedback-icon">
                                                <i class="hgi hgi-stroke icon"></i>
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="ticket-id">
                                            <span class="ticket-number">#TK-002</span>
                                        </div>
                                    </td>
                                    <td>Layla Al-Mansouri</td>
                                    <td>Performance</td>
                                    <td>
                                        <span class="nds-tag nds-warning nds-sm">
                                            <span class="label">Medium</span>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="nds-feedback" data-status="warning">
                                            <span class="nds-feedback-icon">
                                                <i class="hgi hgi-stroke icon"></i>
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="ticket-id">
                                            <span class="ticket-number">#TK-003</span>
                                        </div>
                                    </td>
                                    <td>Yusuf Al-Kindi</td>
                                    <td>Data Loss</td>
                                    <td>
                                        <span class="nds-tag nds-error nds-sm">
                                            <span class="label">High</span>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="nds-feedback" data-status="error">
                                            <span class="nds-feedback-icon">
                                                <i class="hgi hgi-stroke icon"></i>
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="ticket-id">
                                            <span class="ticket-number">#TK-004</span>
                                        </div>
                                    </td>
                                    <td>Aisha Al-Farisi</td>
                                    <td>Feature Request</td>
                                    <td>
                                        <span class="nds-tag nds-neutral nds-sm">
                                            <span class="label">Low</span>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="nds-feedback" data-status="info">
                                            <span class="nds-feedback-icon">
                                                <i class="hgi hgi-stroke icon"></i>
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-featured-1" id="tab-featured-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-featured-1"
                            aria-labelledby="tab-featured-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
                                <table class="nds-table">
                                  <thead>
                                    <tr>
                                      <th>Ticket ID</th>
                                      <th>Customer</th>
                                      <th>Issue Type</th>
                                      <th>Priority</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div class="ticket-id">
                                          <span class="ticket-number">#TK-001</span>
                                        </div>
                                      </td>
                                      <td>Omar Al-Ahmad</td>
                                      <td>Login Issue</td>
                                      <td>
                                        <span class="nds-tag nds-neutral nds-sm">
                                          <span class="label">Low</span>
                                        </span>
                                      </td>
                                      <td>
                                        <span class="nds-feedback" data-status="success">
                                          <span class="nds-feedback-icon">
                                            <i class="hgi hgi-stroke icon"></i>
                                          </span>
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Table with Checkboxes -->
<section id="checkboxTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Table with Selection</h2>
            <p class="nds-section-description">Data table with checkbox selection for bulk operations</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Selectable Data Table</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <table class="nds-table">
                            <thead>
                                <tr>
                                    <th>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" class="nds-check">
                                            </div>
                                        </div>
                                    </th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" class="nds-check">
                                            </div>
                                        </div>
                                    </td>
                                    <td>Hassan Al-Mukhtar</td>
                                    <td>hassan.almukhtar@moi.gov.sa</td>
                                    <td>Engineering</td>
                                    <td><span class="nds-tag nds-success nds-sm"><span
                                                class="label">Active</span></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" class="nds-check" checked>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Nadia Al-Khatib</td>
                                    <td>nadia.alkhatib@moi.gov.sa</td>
                                    <td>Design</td>
                                    <td><span class="nds-tag nds-success nds-sm"><span
                                                class="label">Active</span></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" class="nds-check">
                                            </div>
                                        </div>
                                    </td>
                                    <td>Tariq Al-Sudairi</td>
                                    <td>tariq.alsudairi@moi.gov.sa</td>
                                    <td>Marketing</td>
                                    <td><span class="nds-tag nds-warning nds-sm"><span
                                                class="label">Pending</span></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="select4" class="nds-check" checked>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Zara Al-Habib</td>
                                    <td>zara.alhabib@moi.gov.sa</td>
                                    <td>Sales</td>
                                    <td><span class="nds-tag nds-neutral nds-sm"><span class="label">On
                                                Leave</span></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-checkbox-1" id="tab-checkbox-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-checkbox-1"
                            aria-labelledby="tab-checkbox-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
                                <table class="nds-table">
                                  <thead>
                                    <tr>
                                      <th>
                                        <div class="nds-form-container nds-check-container">
                                          <div class="nds-form-control">
                                            <input type="checkbox" class="nds-check">
                                          </div>
                                        </div>
                                      </th>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>Department</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div class="nds-form-container nds-check-container">
                                          <div class="nds-form-control">
                                            <input type="checkbox" class="nds-check">
                                          </div>
                                        </div>
                                      </td>
                                      <td>Hassan Al-Mukhtar</td>
                                      <td>hassan.almukhtar@moi.gov.sa</td>
                                      <td>Engineering</td>
                                      <td><span class="nds-tag nds-success nds-sm"><span class="label">Active</span></span></td>
                                    </tr>
                                  </tbody>
                                </table>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Responsive Table Section -->
<section id="responsiveTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive Table</h2>
            <p class="nds-section-description">All tables are responsive by default — JS auto-wraps every <strong>nds-table</strong> in an nds-table-wrapper with horizontal scroll and gradient fade masks on overflow. Use <strong>--max-width</strong> to constrain wrapper width and <strong>--min-width</strong> to lock the table's minimum width. If <strong>--min-width</strong> is not set, the JS auto-calculates it from the table's natural content width so cells never shrink.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Responsive Table with Max-Width</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <table class="nds-table" style="--max-width: 600px;">
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Full Name</th>
                                    <th>Email Address</th>
                                    <th>Department</th>
                                    <th>Position</th>
                                    <th>Start Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>EMP-001</td>
                                    <td>Ahmed Mohammed Al-Rashid</td>
                                    <td>ahmed.alrashid@moi.gov.sa</td>
                                    <td>Information Technology</td>
                                    <td>Senior Developer</td>
                                    <td>2023-01-15</td>
                                    <td><span class="nds-tag nds-success nds-sm"><span class="label">Active</span></span></td>
                                </tr>
                                <tr>
                                    <td>EMP-002</td>
                                    <td>Fatima Al-Zahra Al-Mansouri</td>
                                    <td>fatima.almansouri@moi.gov.sa</td>
                                    <td>Human Resources</td>
                                    <td>HR Manager</td>
                                    <td>2022-06-20</td>
                                    <td><span class="nds-tag nds-success nds-sm"><span class="label">Active</span></span></td>
                                </tr>
                                <tr>
                                    <td>EMP-003</td>
                                    <td>Khalid Abdullah Al-Sudairi</td>
                                    <td>khalid.alsudairi@moi.gov.sa</td>
                                    <td>Marketing</td>
                                    <td>Marketing Specialist</td>
                                    <td>2023-03-10</td>
                                    <td><span class="nds-tag nds-warning nds-sm"><span class="label">On Leave</span></span></td>
                                </tr>
                                <tr>
                                    <td>EMP-004</td>
                                    <td>Nora Ibrahim Al-Faisal</td>
                                    <td>nora.alfaisal@moi.gov.sa</td>
                                    <td>Finance</td>
                                    <td>Financial Analyst</td>
                                    <td>2021-11-05</td>
                                    <td><span class="nds-tag nds-success nds-sm"><span class="label">Active</span></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-responsive-1" id="tab-responsive-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-responsive-1"
                            aria-labelledby="tab-responsive-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
                                <table class="nds-table" style="--max-width: 600px;">
                                  <thead>
                                    <tr>
                                      <th>Employee ID</th>
                                      <th>Full Name</th>
                                      <th>Email Address</th>
                                      <th>Department</th>
                                      <th>Position</th>
                                      <th>Start Date</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>EMP-001</td>
                                      <td>Ahmed Mohammed Al-Rashid</td>
                                      <td>ahmed.alrashid@moi.gov.sa</td>
                                      <td>Information Technology</td>
                                      <td>Senior Developer</td>
                                      <td>2023-01-15</td>
                                      <td><span class="nds-tag nds-success nds-sm"><span class="label">Active</span></span></td>
                                    </tr>
                                  </tbody>
                                </table>

                                <!-- All nds-table elements are responsive by default -->
                                <!-- JS auto-wraps in nds-table-wrapper with scroll detection + gradient masks -->

                                <!-- --max-width: constrains the wrapper width -->
                                <!-- style="--max-width: 600px;" - Fixed pixel width -->
                                <!-- style="--max-width: 80%;"   - Percentage of parent -->
                                <!-- No --max-width              - Full width (100%) -->

                                <!-- --min-width: locks the table's minimum width (cells won't shrink below this) -->
                                <!-- style="--min-width: 900px;" - Explicit minimum width -->
                                <!-- No --min-width              - Auto-calculated from content (default) -->
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Paginated Table Section -->
<section id="paginatedTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Table with Pagination</h2>
            <p class="nds-section-description">Large datasets can be paginated using the <strong>nds-auto-pagination</strong> system. Add <strong>nds-page-item</strong> class to each <code>&lt;tr&gt;</code> in <code>&lt;tbody&gt;</code> and set <strong>--per-page</strong> on the content wrapper.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Paginated Services Table ({{ site.data.content.services | size }} items, 5 per page)</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-paged-content" style="--per-page: 5;">
                            <table class="nds-table nds-compact nds-sortable">
                                <thead>
                                    <tr>
                                        <th class="nds-sortable-col">
                                            <button class="nds-btn nds-sort-header">
                                                <span class="label">#</span>
                                                <i class="hgi hgi-stroke hgi-arrow-up-down nds-sort-icon"></i>
                                            </button>
                                        </th>
                                        <th class="nds-sortable-col">
                                            <button class="nds-btn nds-sort-header">
                                                <span class="label">Service</span>
                                                <i class="hgi hgi-stroke hgi-arrow-up-down nds-sort-icon"></i>
                                            </button>
                                        </th>
                                        <th class="nds-sortable-col">
                                            <button class="nds-btn nds-sort-header">
                                                <span class="label">System</span>
                                                <i class="hgi hgi-stroke hgi-arrow-up-down nds-sort-icon"></i>
                                            </button>
                                        </th>
                                        <th>Popularity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {% for service in site.data.content.services %}
                                    <tr class="nds-page-item" hidden>
                                        <td>{{ forloop.index }}</td>
                                        <td>{{ service.title }}</td>
                                        <td><span class="nds-tag nds-info nds-sm"><span class="label">{{ service.system }}</span></span></td>
                                        <td>
                                            {% if service.most_used %}
                                            <span class="nds-tag nds-success nds-status nds-sm"><span class="label">Most Used</span></span>
                                            {% else %}
                                            <span class="nds-tag nds-neutral nds-status nds-sm"><span class="label">Standard</span></span>
                                            {% endif %}
                                        </td>
                                    </tr>
                                    {% endfor %}
                                </tbody>
                            </table>
                        </div>
                        <nav class="nds-pagination-nav nds-auto-pagination" aria-label="Table pagination"></nav>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-paginated-1" id="tab-paginated-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-paginated-1"
                            aria-labelledby="tab-paginated-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
                                <!-- Wrap table in nds-paged-content with --per-page -->
                                <div class="nds-paged-content" style="--per-page: 5;">
                                  <table class="nds-table nds-sortable">
                                    <thead>
                                      <tr>
                                        <th class="nds-sortable-col">
                                          <button class="nds-btn nds-sort-header">
                                            <span class="label">#</span>
                                            <i class="hgi hgi-stroke hgi-arrow-up-down nds-sort-icon"></i>
                                          </button>
                                        </th>
                                        <th class="nds-sortable-col">
                                          <button class="nds-btn nds-sort-header">
                                            <span class="label">Service</span>
                                            <i class="hgi hgi-stroke hgi-arrow-up-down nds-sort-icon"></i>
                                          </button>
                                        </th>
                                        <th class="nds-sortable-col">
                                          <button class="nds-btn nds-sort-header">
                                            <span class="label">System</span>
                                            <i class="hgi hgi-stroke hgi-arrow-up-down nds-sort-icon"></i>
                                          </button>
                                        </th>
                                        <th>Popularity</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <!-- Add nds-page-item class and hidden attr to each tr -->
                                      <tr class="nds-page-item" hidden>
                                        <td>1</td>
                                        <td>Identity Verification</td>
                                        <td><span class="nds-tag nds-info nds-sm"><span class="label">Identity System</span></span></td>
                                        <td><span class="nds-tag nds-success nds-status nds-sm"><span class="label">Most Used</span></span></td>
                                      </tr>
                                      <!-- ... more rows ... -->
                                    </tbody>
                                  </table>
                                </div>
                                <!-- Auto-pagination nav placed right after the content wrapper -->
                                <nav class="nds-pagination-nav nds-auto-pagination" aria-label="Table pagination"></nav>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="usageGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">Best practices for implementing table components</p>
        </div>
        <div class="nds-section-content">
                <div class="nds-content-block">
                    <h3 class="nds-block-title">When to Use</h3>
                    <ul>
                        <li>Displaying structured data</li>
                        <li>Comparing information across categories</li>
                        <li>Data analysis and reporting</li>
                        <li>Administrative interfaces</li>
                    </ul>
                </div>
                <div class="nds-content-block">
                    <h3 class="nds-block-title">Table Types</h3>
                    <ul>
                        <li><strong>Basic:</strong> Standard data presentation</li>
                        <li><strong>Compact:</strong> Dense data with reduced padding</li>
                        <li><strong>Sortable:</strong> Interactive sorting capabilities</li>
                        <li><strong>Responsive:</strong> Mobile-friendly layouts</li>
                    </ul>
                </div>
                <div class="nds-content-block">
                    <h3 class="nds-block-title">Accessibility</h3>
                    <ul>
                        <li>Use proper table headers</li>
                        <li>Include aria-labels for sort buttons</li>
                        <li>Ensure keyboard navigation</li>
                        <li>Maintain color contrast ratios</li>
                    </ul>
                </div>
                <div class="nds-content-block">
                    <h3 class="nds-block-title">Performance</h3>
                    <ul>
                        <li>Implement pagination for large datasets</li>
                        <li>Use virtual scrolling when needed</li>
                        <li>Consider loading states</li>
                        <li>Optimize for mobile devices</li>
                    </ul>
                </div>
        </div>
    </div>
</section>