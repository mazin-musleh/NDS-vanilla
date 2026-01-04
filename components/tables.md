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
                <div class="nds-tabs nds-code withDivider">
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
</section>

<!-- Compact Table Section -->
<section id="compactTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Compact Table</h2>
            <p class="nds-section-description">Space-efficient table design for dense data display</p>
        </div>
        <div class="nds-section-content">
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
                <div class="nds-tabs nds-code withDivider">
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
</section>

<!-- Sortable Table Section -->
<section id="sortableTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Sortable Table</h2>
            <p class="nds-section-description">Interactive table with sorting capabilities and visual indicators</p>
        </div>
        <div class="nds-section-content">
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
                                    <th class="sortable">
                                        <button class="nds-btn sort-header">
                                            <span class="label">Department</span>
                                            <i class="hgi hgi-stroke hgi-arrow-up-down sort-icon"></i>
                                        </button>
                                    </th>
                                    <th class="sortable sorted-asc">
                                        <button class="nds-btn sort-header">
                                            <span class="label">Employees</span>
                                            <i class="hgi hgi-stroke hgi-arrow-up sort-icon"></i>
                                        </button>
                                    </th>
                                    <th class="sortable">
                                        <button class="nds-btn sort-header">
                                            <span class="label">Budget</span>
                                            <i class="hgi hgi-stroke hgi-arrow-up-down sort-icon"></i>
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
                <div class="nds-tabs nds-code withDivider">
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
                                      <th class="sortable">
                                        <button class="nds-btn sort-header">
                                          Department
                                          <i class="hgi hgi-stroke hgi-arrow-up-down sort-icon"></i>
                                        </button>
                                      </th>
                                      <th class="sortable sorted-asc">
                                        <button class="nds-btn sort-header">
                                          Employees
                                          <i class="hgi hgi-stroke hgi-arrow-up sort-icon"></i>
                                        </button>
                                      </th>
                                      <th class="sortable">
                                        <button class="nds-btn sort-header">
                                          Budget
                                          <i class="hgi hgi-stroke hgi-arrow-up-down sort-icon"></i>
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
</section>

<!-- Table with Feedback Icons -->
<section id="feedbackIconsTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Table with Feedback Icons</h2>
            <p class="nds-section-description">Interactive table showcasing feedback status with feedback icons</p>
        </div>
        <div class="nds-section-content">
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
                                        <span class="nds-feedback-icon nds-success">
                                            <i class="hgi hgi-solid icon"></i>
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
                                        <span class="nds-feedback-icon nds-warning">
                                            <i class="hgi hgi-solid icon"></i>
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
                                        <span class="nds-feedback-icon nds-error">
                                            <i class="hgi hgi-solid icon"></i>
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
                                        <span class="nds-feedback-icon nds-info">
                                            <i class="hgi hgi-solid icon"></i>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="nds-tabs nds-code withDivider">
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
                                        <span class="nds-feedback-icon nds-success">
                                          <i class="hgi hgi-solid icon"></i>
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
</section>

<!-- Table with Checkboxes -->
<section id="checkboxTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Table with Selection</h2>
            <p class="nds-section-description">Data table with checkbox selection for bulk operations</p>
        </div>
        <div class="nds-section-content">
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
                <div class="nds-tabs nds-code withDivider">
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
</section>

<!-- Usage Guidelines -->
<section id="usageGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">Best practices for implementing table components</p>
        </div>
        <div class="nds-section-content">
            <div class="guidelines-grid">
                <div class="guideline-item">
                    <h3>When to Use</h3>
                    <ul>
                        <li>Displaying structured data</li>
                        <li>Comparing information across categories</li>
                        <li>Data analysis and reporting</li>
                        <li>Administrative interfaces</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Table Types</h3>
                    <ul>
                        <li><strong>Basic:</strong> Standard data presentation</li>
                        <li><strong>Compact:</strong> Dense data with reduced padding</li>
                        <li><strong>Sortable:</strong> Interactive sorting capabilities</li>
                        <li><strong>Responsive:</strong> Mobile-friendly layouts</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Accessibility</h3>
                    <ul>
                        <li>Use proper table headers</li>
                        <li>Include aria-labels for sort buttons</li>
                        <li>Ensure keyboard navigation</li>
                        <li>Maintain color contrast ratios</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Performance</h3>
                    <ul>
                        <li>Implement pagination for large datasets</li>
                        <li>Use virtual scrolling when needed</li>
                        <li>Consider loading states</li>
                        <li>Optimize for mobile devices</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>