---
layout: page
title: Tables
hero_title: Tables - National Design System
hero_description: Structured data presentation with built-in sorting, row selection, responsive scrolling, and pagination for datasets of any size
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Basic Table Section -->
<section id="basicTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard Table</h2>
            <p class="nds-section-description">The default table layout with striped rows, hover highlighting, and rounded borders</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-compact", ".nds-table", "tableSize"]'>
                            <span class="nds-label">Compact</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
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
                                {% for user in site.data.content.users limit:4 %}
                                <tr>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.role }}</td>
                                    <td><span class="nds-tag nds-sm" data-status="{% if user.status == 'active' %}success{% elsif user.status == 'away' %}warning{% else %}error{% endif %}"><span
                                                class="nds-label">{% if user.status == 'active' %}Active{% elsif user.status == 'away' %}Away{% else %}Offline{% endif %}</span></span></td>
                                </tr>
                                {% endfor %}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-table-basic-1" id="tab-table-basic-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-table-basic-1"
                            aria-labelledby="tab-table-basic-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
&lt;table class="nds-table"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Name&lt;/th&gt;
      &lt;th&gt;Email&lt;/th&gt;
      &lt;th&gt;Role&lt;/th&gt;
      &lt;th&gt;Status&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;Ahmed Al-Rashidi&lt;/td&gt;
      &lt;td&gt;ahmed.rashidi@gov.sa&lt;/td&gt;
      &lt;td&gt;Senior Developer&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Fatima Al-Harbi&lt;/td&gt;
      &lt;td&gt;fatima.harbi@gov.sa&lt;/td&gt;
      &lt;td&gt;UX Designer&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Sara Al-Dosari&lt;/td&gt;
      &lt;td&gt;sara.dosari@gov.sa&lt;/td&gt;
      &lt;td&gt;Marketing Lead&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Layla Al-Qahtani&lt;/td&gt;
      &lt;td&gt;layla.qahtani@gov.sa&lt;/td&gt;
      &lt;td&gt;HR Specialist&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
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
            <p class="nds-section-description">Click any column header to cycle through ascending, descending, and original order</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-compact", ".nds-table", "tableSize"]'>
                            <span class="nds-label">Compact</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <table class="nds-table nds-sortable">
                            <thead>
                                <tr>
                                    <th>
                                        <div class="nds-col-header">
                                            <span class="nds-label">Department</span>
                                            <div class="nds-col-actions">
                                                <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"></i></button>
                                            </div>
                                        </div>
                                    </th>
                                    <th data-state="sorted-asc">
                                        <div class="nds-col-header">
                                            <span class="nds-label">Employees</span>
                                            <div class="nds-col-actions">
                                                <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"></i></button>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="nds-col-header">
                                            <span class="nds-label">Budget</span>
                                            <div class="nds-col-actions">
                                                <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"></i></button>
                                            </div>
                                        </div>
                                    </th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Information Technology</td>
                                    <td>25</td>
                                    <td>5,625,000 SAR</td>
                                    <td><span class="nds-tag nds-sm" data-status="success"><span
                                                class="nds-label">Active</span></span></td>
                                </tr>
                                <tr>
                                    <td>Human Resources</td>
                                    <td>12</td>
                                    <td>3,000,000 SAR</td>
                                    <td><span class="nds-tag nds-sm" data-status="success"><span
                                                class="nds-label">Active</span></span></td>
                                </tr>
                                <tr>
                                    <td>Sales</td>
                                    <td>18</td>
                                    <td>4,500,000 SAR</td>
                                    <td><span class="nds-tag nds-sm" data-status="warning"><span class="nds-label">Under
                                                Review</span></span></td>
                                </tr>
                                <tr>
                                    <td>Marketing</td>
                                    <td>8</td>
                                    <td>2,250,000 SAR</td>
                                    <td><span class="nds-tag nds-sm" data-status="info"><span
                                                class="nds-label">Planning</span></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-table-sortable-1" id="tab-table-sortable-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-table-sortable-1"
                            aria-labelledby="tab-table-sortable-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
&lt;table class="nds-table nds-sortable"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;
        &lt;div class="nds-col-header"&gt;
          &lt;span class="nds-label"&gt;Department&lt;/span&gt;
          &lt;div class="nds-col-actions"&gt;
            &lt;button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"&gt;&lt;i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"&gt;&lt;/i&gt;&lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/th&gt;
      &lt;th data-state="sorted-asc"&gt;
        &lt;div class="nds-col-header"&gt;
          &lt;span class="nds-label"&gt;Employees&lt;/span&gt;
          &lt;div class="nds-col-actions"&gt;
            &lt;button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"&gt;&lt;i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"&gt;&lt;/i&gt;&lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/th&gt;
      &lt;th&gt;
        &lt;div class="nds-col-header"&gt;
          &lt;span class="nds-label"&gt;Budget&lt;/span&gt;
          &lt;div class="nds-col-actions"&gt;
            &lt;button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"&gt;&lt;i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"&gt;&lt;/i&gt;&lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/th&gt;
      &lt;th&gt;Status&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;Information Technology&lt;/td&gt;
      &lt;td&gt;25&lt;/td&gt;
      &lt;td&gt;5,625,000 SAR&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Human Resources&lt;/td&gt;
      &lt;td&gt;12&lt;/td&gt;
      &lt;td&gt;3,000,000 SAR&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Sales&lt;/td&gt;
      &lt;td&gt;18&lt;/td&gt;
      &lt;td&gt;4,500,000 SAR&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="warning"&gt;&lt;span class="nds-label"&gt;Under Review&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Marketing&lt;/td&gt;
      &lt;td&gt;8&lt;/td&gt;
      &lt;td&gt;2,250,000 SAR&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="info"&gt;&lt;span class="nds-label"&gt;Planning&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
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
            <p class="nds-section-description">Status columns using feedback icons for quick visual scanning of row states</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-compact", ".nds-table", "tableSize"]'>
                            <span class="nds-label">Compact</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
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
                                        <span class="nds-tag nds-gray nds-sm">
                                            <span class="nds-label">Low</span>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="nds-feedback" data-status="success">
                                            <span class="nds-feedback-icon">
                                                <i class="nds-icon" aria-hidden="true"></i>
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
                                        <span class="nds-tag nds-yellow nds-sm">
                                            <span class="nds-label">Medium</span>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="nds-feedback" data-status="warning">
                                            <span class="nds-feedback-icon">
                                                <i class="nds-icon" aria-hidden="true"></i>
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
                                        <span class="nds-tag nds-red nds-sm">
                                            <span class="nds-label">High</span>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="nds-feedback" data-status="error">
                                            <span class="nds-feedback-icon">
                                                <i class="nds-icon" aria-hidden="true"></i>
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
                                        <span class="nds-tag nds-gray nds-sm">
                                            <span class="nds-label">Low</span>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="nds-feedback" data-status="info">
                                            <span class="nds-feedback-icon">
                                                <i class="nds-icon" aria-hidden="true"></i>
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
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-table-feedback-1" id="tab-table-feedback-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-table-feedback-1"
                            aria-labelledby="tab-table-feedback-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
&lt;table class="nds-table"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Ticket ID&lt;/th&gt;
      &lt;th&gt;Customer&lt;/th&gt;
      &lt;th&gt;Issue Type&lt;/th&gt;
      &lt;th&gt;Priority&lt;/th&gt;
      &lt;th&gt;Status&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;
        &lt;div class="ticket-id"&gt;
          &lt;span class="ticket-number"&gt;#TK-001&lt;/span&gt;
        &lt;/div&gt;
      &lt;/td&gt;
      &lt;td&gt;Omar Al-Ahmad&lt;/td&gt;
      &lt;td&gt;Login Issue&lt;/td&gt;
      &lt;td&gt;
        &lt;span class="nds-tag nds-gray nds-sm"&gt;
          &lt;span class="nds-label"&gt;Low&lt;/span&gt;
        &lt;/span&gt;
      &lt;/td&gt;
      &lt;td&gt;
        &lt;span class="nds-feedback" data-status="success"&gt;
          &lt;span class="nds-feedback-icon"&gt;
            &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;/span&gt;
        &lt;/span&gt;
      &lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;
        &lt;div class="ticket-id"&gt;
          &lt;span class="ticket-number"&gt;#TK-002&lt;/span&gt;
        &lt;/div&gt;
      &lt;/td&gt;
      &lt;td&gt;Layla Al-Mansouri&lt;/td&gt;
      &lt;td&gt;Performance&lt;/td&gt;
      &lt;td&gt;
        &lt;span class="nds-tag nds-yellow nds-sm"&gt;
          &lt;span class="nds-label"&gt;Medium&lt;/span&gt;
        &lt;/span&gt;
      &lt;/td&gt;
      &lt;td&gt;
        &lt;span class="nds-feedback" data-status="warning"&gt;
          &lt;span class="nds-feedback-icon"&gt;
            &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;/span&gt;
        &lt;/span&gt;
      &lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;
        &lt;div class="ticket-id"&gt;
          &lt;span class="ticket-number"&gt;#TK-003&lt;/span&gt;
        &lt;/div&gt;
      &lt;/td&gt;
      &lt;td&gt;Yusuf Al-Kindi&lt;/td&gt;
      &lt;td&gt;Data Loss&lt;/td&gt;
      &lt;td&gt;
        &lt;span class="nds-tag nds-red nds-sm"&gt;
          &lt;span class="nds-label"&gt;High&lt;/span&gt;
        &lt;/span&gt;
      &lt;/td&gt;
      &lt;td&gt;
        &lt;span class="nds-feedback" data-status="error"&gt;
          &lt;span class="nds-feedback-icon"&gt;
            &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;/span&gt;
        &lt;/span&gt;
      &lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;
        &lt;div class="ticket-id"&gt;
          &lt;span class="ticket-number"&gt;#TK-004&lt;/span&gt;
        &lt;/div&gt;
      &lt;/td&gt;
      &lt;td&gt;Aisha Al-Farisi&lt;/td&gt;
      &lt;td&gt;Feature Request&lt;/td&gt;
      &lt;td&gt;
        &lt;span class="nds-tag nds-gray nds-sm"&gt;
          &lt;span class="nds-label"&gt;Low&lt;/span&gt;
        &lt;/span&gt;
      &lt;/td&gt;
      &lt;td&gt;
        &lt;span class="nds-feedback" data-status="info"&gt;
          &lt;span class="nds-feedback-icon"&gt;
            &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;/span&gt;
        &lt;/span&gt;
      &lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
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
            <p class="nds-section-description">Row checkboxes with a select-all header for bulk operations. The header checkbox shows an indeterminate state when some rows are selected.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-compact", ".nds-table", "tableSize"]'>
                            <span class="nds-label">Compact</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
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
                                                <input type="checkbox" class="nds-check" aria-label="Select all rows">
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
                                                <input type="checkbox" class="nds-check" aria-label="Select Hassan Al-Mukhtar">
                                            </div>
                                        </div>
                                    </td>
                                    <td>Hassan Al-Mukhtar</td>
                                    <td>hassan.almukhtar@moi.gov.sa</td>
                                    <td>Engineering</td>
                                    <td><span class="nds-tag nds-green nds-sm"><span
                                                class="nds-label">Active</span></span></td>
                                </tr>
                                <tr data-state="selected">
                                    <td>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" class="nds-check" checked aria-label="Select Nadia Al-Khatib">
                                            </div>
                                        </div>
                                    </td>
                                    <td>Nadia Al-Khatib</td>
                                    <td>nadia.alkhatib@moi.gov.sa</td>
                                    <td>Design</td>
                                    <td><span class="nds-tag nds-green nds-sm"><span
                                                class="nds-label">Active</span></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" class="nds-check" aria-label="Select Tariq Al-Sudairi">
                                            </div>
                                        </div>
                                    </td>
                                    <td>Tariq Al-Sudairi</td>
                                    <td>tariq.alsudairi@moi.gov.sa</td>
                                    <td>Marketing</td>
                                    <td><span class="nds-tag nds-yellow nds-sm"><span
                                                class="nds-label">Pending</span></span></td>
                                </tr>
                                <tr data-state="selected">
                                    <td>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" class="nds-check" checked aria-label="Select Zara Al-Habib">
                                            </div>
                                        </div>
                                    </td>
                                    <td>Zara Al-Habib</td>
                                    <td>zara.alhabib@moi.gov.sa</td>
                                    <td>Sales</td>
                                    <td><span class="nds-tag nds-gray nds-sm"><span class="nds-label">On
                                                Leave</span></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-table-checkbox-1" id="tab-table-checkbox-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-table-checkbox-1"
                            aria-labelledby="tab-table-checkbox-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
&lt;table class="nds-table"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;
        &lt;div class="nds-form-container nds-check-container"&gt;
          &lt;div class="nds-form-control"&gt;
            &lt;input type="checkbox" class="nds-check" aria-label="Select all rows"&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/th&gt;
      &lt;th&gt;Name&lt;/th&gt;
      &lt;th&gt;Email&lt;/th&gt;
      &lt;th&gt;Department&lt;/th&gt;
      &lt;th&gt;Status&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;
        &lt;div class="nds-form-container nds-check-container"&gt;
          &lt;div class="nds-form-control"&gt;
            &lt;input type="checkbox" class="nds-check" aria-label="Select Hassan Al-Mukhtar"&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/td&gt;
      &lt;td&gt;Hassan Al-Mukhtar&lt;/td&gt;
      &lt;td&gt;hassan.almukhtar@moi.gov.sa&lt;/td&gt;
      &lt;td&gt;Engineering&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-green nds-sm"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr data-state="selected"&gt;
      &lt;td&gt;
        &lt;div class="nds-form-container nds-check-container"&gt;
          &lt;div class="nds-form-control"&gt;
            &lt;input type="checkbox" class="nds-check" checked aria-label="Select Nadia Al-Khatib"&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/td&gt;
      &lt;td&gt;Nadia Al-Khatib&lt;/td&gt;
      &lt;td&gt;nadia.alkhatib@moi.gov.sa&lt;/td&gt;
      &lt;td&gt;Design&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-green nds-sm"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;
        &lt;div class="nds-form-container nds-check-container"&gt;
          &lt;div class="nds-form-control"&gt;
            &lt;input type="checkbox" class="nds-check" aria-label="Select Tariq Al-Sudairi"&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/td&gt;
      &lt;td&gt;Tariq Al-Sudairi&lt;/td&gt;
      &lt;td&gt;tariq.alsudairi@moi.gov.sa&lt;/td&gt;
      &lt;td&gt;Marketing&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-yellow nds-sm"&gt;&lt;span class="nds-label"&gt;Pending&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr data-state="selected"&gt;
      &lt;td&gt;
        &lt;div class="nds-form-container nds-check-container"&gt;
          &lt;div class="nds-form-control"&gt;
            &lt;input type="checkbox" class="nds-check" checked aria-label="Select Zara Al-Habib"&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/td&gt;
      &lt;td&gt;Zara Al-Habib&lt;/td&gt;
      &lt;td&gt;zara.alhabib@moi.gov.sa&lt;/td&gt;
      &lt;td&gt;Sales&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-gray nds-sm"&gt;&lt;span class="nds-label"&gt;On Leave&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
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

<!-- Center Aligned Table -->
<section id="centerAlignedTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Center Aligned Table</h2>
            <p class="nds-section-description">Center-align all cell content when the data benefits from symmetrical presentation</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-compact", ".nds-table", "tableSize"]'>
                            <span class="nds-label">Compact</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <table class="nds-table nds-center">
                            <thead>
                                <tr>
                                    <th>Quarter</th>
                                    <th>Revenue</th>
                                    <th>Growth</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Q1 2024</td>
                                    <td>2,450,000 SAR</td>
                                    <td>+12%</td>
                                    <td><span class="nds-tag nds-sm" data-status="success"><span class="nds-label">On Track</span></span></td>
                                </tr>
                                <tr>
                                    <td>Q2 2024</td>
                                    <td>2,780,000 SAR</td>
                                    <td>+13.5%</td>
                                    <td><span class="nds-tag nds-sm" data-status="success"><span class="nds-label">On Track</span></span></td>
                                </tr>
                                <tr>
                                    <td>Q3 2024</td>
                                    <td>2,610,000 SAR</td>
                                    <td>-6.1%</td>
                                    <td><span class="nds-tag nds-sm" data-status="warning"><span class="nds-label">At Risk</span></span></td>
                                </tr>
                                <tr>
                                    <td>Q4 2024</td>
                                    <td>3,100,000 SAR</td>
                                    <td>+18.8%</td>
                                    <td><span class="nds-tag nds-sm" data-status="success"><span class="nds-label">On Track</span></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-table-center-1" id="tab-table-center-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-table-center-1"
                            aria-labelledby="tab-table-center-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
&lt;table class="nds-table nds-center"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Quarter&lt;/th&gt;
      &lt;th&gt;Revenue&lt;/th&gt;
      &lt;th&gt;Growth&lt;/th&gt;
      &lt;th&gt;Status&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;Q1 2024&lt;/td&gt;
      &lt;td&gt;2,450,000 SAR&lt;/td&gt;
      &lt;td&gt;+12%&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;On Track&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Q2 2024&lt;/td&gt;
      &lt;td&gt;2,780,000 SAR&lt;/td&gt;
      &lt;td&gt;+13.5%&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;On Track&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Q3 2024&lt;/td&gt;
      &lt;td&gt;2,610,000 SAR&lt;/td&gt;
      &lt;td&gt;-6.1%&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="warning"&gt;&lt;span class="nds-label"&gt;At Risk&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Q4 2024&lt;/td&gt;
      &lt;td&gt;3,100,000 SAR&lt;/td&gt;
      &lt;td&gt;+18.8%&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;On Track&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
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

<!-- Loading State Table -->
<section id="loadingTableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Loading State</h2>
            <p class="nds-section-description">A shimmer animation on table cells indicates data is being fetched</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-compact", ".nds-table", "tableSize"]'>
                            <span class="nds-label">Compact</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <table class="nds-table" data-state="loading">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                </tr>
                                <tr>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                </tr>
                                <tr>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                    <td>Loading...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-table-loading-1" id="tab-table-loading-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-table-loading-1"
                            aria-labelledby="tab-table-loading-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;table class="nds-table" data-state="loading"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Name&lt;/th&gt;
      &lt;th&gt;Email&lt;/th&gt;
      &lt;th&gt;Department&lt;/th&gt;
      &lt;th&gt;Status&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;Loading...&lt;/td&gt;
      &lt;td&gt;Loading...&lt;/td&gt;
      &lt;td&gt;Loading...&lt;/td&gt;
      &lt;td&gt;Loading...&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Loading...&lt;/td&gt;
      &lt;td&gt;Loading...&lt;/td&gt;
      &lt;td&gt;Loading...&lt;/td&gt;
      &lt;td&gt;Loading...&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Loading...&lt;/td&gt;
      &lt;td&gt;Loading...&lt;/td&gt;
      &lt;td&gt;Loading...&lt;/td&gt;
      &lt;td&gt;Loading...&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
                            </code>
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
            <p class="nds-section-description">All tables are responsive by default. JS auto-wraps every <strong>nds-table</strong> in an nds-table-wrapper with horizontal scroll on overflow. Add <strong>nds-mask</strong> to opt into gradient fade masks on the overflow edges. Use <strong>--max-width</strong> to constrain wrapper width and <strong>--min-width</strong> to lock the table's minimum width. If <strong>--min-width</strong> is not set, the JS auto-calculates it from the table's natural content width so cells never shrink.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-compact", ".nds-table", "tableSize"]'>
                            <span class="nds-label">Compact</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-mask", ".nds-table", "tableMask"]'>
                            <span class="nds-label">Mask</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
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
                                {% for user in site.data.content.users limit:4 %}
                                <tr>
                                    <td>EMP-{{ forloop.index | prepend: '00' | slice: -3, 3 }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.department }}</td>
                                    <td>{{ user.role }}</td>
                                    <td>2023-0{{ forloop.index }}-15</td>
                                    <td><span class="nds-tag {% if user.status == 'active' %}nds-green{% elsif user.status == 'away' %}nds-yellow{% else %}nds-red{% endif %} nds-sm"><span class="nds-label">{% if user.status == 'active' %}Active{% elsif user.status == 'away' %}On Leave{% else %}Inactive{% endif %}</span></span></td>
                                </tr>
                                {% endfor %}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-table-responsive-1" id="tab-table-responsive-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-table-responsive-1"
                            aria-labelledby="tab-table-responsive-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
&lt;table class="nds-table" style="--max-width: 600px;"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Employee ID&lt;/th&gt;
      &lt;th&gt;Full Name&lt;/th&gt;
      &lt;th&gt;Email Address&lt;/th&gt;
      &lt;th&gt;Department&lt;/th&gt;
      &lt;th&gt;Position&lt;/th&gt;
      &lt;th&gt;Start Date&lt;/th&gt;
      &lt;th&gt;Status&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;EMP-001&lt;/td&gt;
      &lt;td&gt;Ahmed Al-Rashidi&lt;/td&gt;
      &lt;td&gt;ahmed.rashidi@gov.sa&lt;/td&gt;
      &lt;td&gt;Engineering&lt;/td&gt;
      &lt;td&gt;Senior Developer&lt;/td&gt;
      &lt;td&gt;2023-01-15&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-green nds-sm"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;EMP-002&lt;/td&gt;
      &lt;td&gt;Fatima Al-Harbi&lt;/td&gt;
      &lt;td&gt;fatima.harbi@gov.sa&lt;/td&gt;
      &lt;td&gt;Design&lt;/td&gt;
      &lt;td&gt;UX Designer&lt;/td&gt;
      &lt;td&gt;2023-02-15&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-green nds-sm"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;EMP-003&lt;/td&gt;
      &lt;td&gt;Sara Al-Dosari&lt;/td&gt;
      &lt;td&gt;sara.dosari@gov.sa&lt;/td&gt;
      &lt;td&gt;Marketing&lt;/td&gt;
      &lt;td&gt;Marketing Lead&lt;/td&gt;
      &lt;td&gt;2023-03-15&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-green nds-sm"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;EMP-004&lt;/td&gt;
      &lt;td&gt;Layla Al-Qahtani&lt;/td&gt;
      &lt;td&gt;layla.qahtani@gov.sa&lt;/td&gt;
      &lt;td&gt;Human Resources&lt;/td&gt;
      &lt;td&gt;HR Specialist&lt;/td&gt;
      &lt;td&gt;2023-04-15&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-green nds-sm"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;

&lt;!-- All nds-table elements are responsive by default --&gt;
&lt;!-- JS auto-wraps in nds-table-wrapper with scroll detection --&gt;
&lt;!-- Add class="nds-table nds-mask" to opt into gradient fade masks on overflow edges --&gt;

&lt;!-- --max-width: constrains the wrapper width --&gt;
&lt;!-- style="--max-width: 600px;" - Fixed pixel width --&gt;
&lt;!-- style="--max-width: 80%;"   - Percentage of parent --&gt;
&lt;!-- No --max-width              - Full width (100%) --&gt;

&lt;!-- --min-width: locks the table's minimum width (cells won't shrink below this) --&gt;
&lt;!-- style="--min-width: 900px;" - Explicit minimum width --&gt;
&lt;!-- No --min-width              - Auto-calculated from content (default) --&gt;
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
            <p class="nds-section-description">Large datasets can be paginated using the <strong>data-auto-pagination</strong> attribute. Add <strong>nds-page-item</strong> class to each <code>&lt;tr&gt;</code> in <code>&lt;tbody&gt;</code> and set <strong>--per-page</strong> on the content wrapper.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn" data-state="selected"
                            data-toggler='["nds-compact", ".nds-table", "tableSize"]'>
                            <span class="nds-label">Compact</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-dropmenu nds-filter" data-filter-target="paginatedTableBody">
                            <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                                <i class="hgi hgi-stroke hgi-filter"></i>
                                <span class="nds-label">Filter</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <div class="nds-dropmenu-scroll">
                                    <div data-filter="system" data-filter-type="checkbox"
                                        data-filter-legend="System"
                                        data-filter-values='{"Identity & Records":"Identity & Records","Transport & Vehicles":"Transport & Vehicles","Healthcare & Social":"Healthcare & Social","Business & Finance":"Business & Finance","Education & Justice":"Education & Justice"}'
                                        data-no-auto-close>
                                    </div>
                                    <hr class="nds-divider">
                                    <div data-filter="popularity" data-filter-type="radio"
                                        data-filter-legend="Popularity"
                                        data-filter-values='{"most_used":"Most Used","standard":"Standard"}'
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
                        <div class="nds-filter-applied" data-filter-target="paginatedTableBody" hidden>
                            <span class="nds-label">Applied Filters:</span>
                            <div class="nds-chips"></div>
                        </div>
                        <div class="nds-paged-content" style="--per-page: 5;" hidden>
                            <table class="nds-table nds-compact nds-sortable">
                                <thead>
                                    <tr>
                                        <th>
                                            <div class="nds-col-header">
                                                <span class="nds-label">#</span>
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
                                                <span class="nds-label">System</span>
                                                <div class="nds-col-actions">
                                                    <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"></i></button>
                                                </div>
                                            </div>
                                        </th>
                                        <th>Popularity</th>
                                    </tr>
                                </thead>
                                <tbody id="paginatedTableBody" data-filter-items="tr">
                                    {% for service in site.data.content.services %}
                                    <tr class="nds-page-item">
                                        <td>{{ forloop.index }}</td>
                                        <td>{{ service.title }}</td>
                                        <td><span class="nds-tag nds-blue nds-sm"><span class="nds-label" data-filter="system">{{ service.system }}</span></span></td>
                                        <td>
                                            {% if service.most_used %}
                                            <span class="nds-tag nds-sm" data-status="success"><span class="nds-label" data-filter="popularity" data-filter-value="most_used">Most Used</span></span>
                                            {% else %}
                                            <span class="nds-tag nds-sm" data-status="neutral"><span class="nds-label" data-filter="popularity" data-filter-value="standard">Standard</span></span>
                                            {% endif %}
                                        </td>
                                    </tr>
                                    {% endfor %}
                                </tbody>
                            </table>
                        </div>
                        <nav class="nds-pagination" data-auto-pagination aria-label="Table pagination"></nav>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-table-paginated-1" id="tab-table-paginated-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-table-paginated-1"
                            aria-labelledby="tab-table-paginated-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
&lt;!-- Filter bar above table --&gt;
&lt;div class="nds-filter" data-filter-target="paginatedTableBody"&gt;
  &lt;div class="nds-dropmenu"&gt;
    &lt;button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger"&gt;
      &lt;i class="hgi hgi-stroke hgi-filter"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Filter&lt;/span&gt;
    &lt;/button&gt;
    &lt;div class="nds-dropmenu-menu" hidden&gt;
      &lt;div class="nds-dropmenu-scroll"&gt;
        &lt;div data-filter="system" data-filter-type="checkbox"
          data-filter-legend="System"
          data-filter-values='{"Identity &amp; Records":"Identity &amp; Records","Transport &amp; Vehicles":"Transport &amp; Vehicles","Healthcare &amp; Social":"Healthcare &amp; Social","Business &amp; Finance":"Business &amp; Finance","Education &amp; Justice":"Education &amp; Justice"}'
          data-no-auto-close&gt;
        &lt;/div&gt;
        &lt;hr class="nds-divider"&gt;
        &lt;div data-filter="popularity" data-filter-type="radio"
          data-filter-legend="Popularity"
          data-filter-values='{"most_used":"Most Used","standard":"Standard"}'
          data-no-auto-close&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class="nds-dropmenu-footer"&gt;
        &lt;hr class="nds-divider"&gt;
        &lt;div class="nds-dropmenu-action nds-grid"&gt;
          &lt;button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
            data-filter-action="clear" data-no-auto-close&gt;
            &lt;span class="nds-label"&gt;Reset&lt;/span&gt;
          &lt;/button&gt;
          &lt;button class="nds-btn nds-primary nds-dropmenu-item" type="button"
            data-filter-action="apply"&gt;
            &lt;span class="nds-label"&gt;Filter&lt;/span&gt;
          &lt;/button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-filter-applied" hidden&gt;
    &lt;span class="nds-label"&gt;Applied Filters:&lt;/span&gt;
    &lt;div class="nds-chips"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;div class="nds-paged-content" style="--per-page: 5;" hidden&gt;
  &lt;table class="nds-table nds-compact nds-sortable"&gt;
    &lt;thead&gt;
      &lt;tr&gt;
        &lt;th&gt;
          &lt;div class="nds-col-header"&gt;
            &lt;span class="nds-label"&gt;#&lt;/span&gt;
            &lt;div class="nds-col-actions"&gt;
              &lt;button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"&gt;&lt;i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"&gt;&lt;/i&gt;&lt;/button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/th&gt;
        &lt;th&gt;
          &lt;div class="nds-col-header"&gt;
            &lt;span class="nds-label"&gt;Service&lt;/span&gt;
            &lt;div class="nds-col-actions"&gt;
              &lt;button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"&gt;&lt;i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"&gt;&lt;/i&gt;&lt;/button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/th&gt;
        &lt;th&gt;
          &lt;div class="nds-col-header"&gt;
            &lt;span class="nds-label"&gt;System&lt;/span&gt;
            &lt;div class="nds-col-actions"&gt;
              &lt;button class="nds-btn nds-subtle nds-sort-btn nds-icon-only"&gt;&lt;i class="nds-icon nds-hgi-sorting-05 nds-sort-icon"&gt;&lt;/i&gt;&lt;/button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/th&gt;
        &lt;th&gt;Popularity&lt;/th&gt;
      &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody id="paginatedTableBody" data-filter-items="tr"&gt;
      &lt;tr class="nds-page-item"&gt;
        &lt;td&gt;1&lt;/td&gt;
        &lt;td&gt;Identity Verification&lt;/td&gt;
        &lt;td&gt;&lt;span class="nds-tag nds-blue nds-sm"&gt;&lt;span class="nds-label" data-filter="system"&gt;Identity &amp; Records&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
        &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label" data-filter="popularity" data-filter-value="most_used"&gt;Most Used&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
      &lt;/tr&gt;
      &lt;tr class="nds-page-item"&gt;
        &lt;td&gt;2&lt;/td&gt;
        &lt;td&gt;Passport Renewal&lt;/td&gt;
        &lt;td&gt;&lt;span class="nds-tag nds-blue nds-sm"&gt;&lt;span class="nds-label" data-filter="system"&gt;Identity &amp; Records&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
        &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label" data-filter="popularity" data-filter-value="most_used"&gt;Most Used&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
      &lt;/tr&gt;
      &lt;tr class="nds-page-item"&gt;
        &lt;td&gt;3&lt;/td&gt;
        &lt;td&gt;Birth Certificate Request&lt;/td&gt;
        &lt;td&gt;&lt;span class="nds-tag nds-blue nds-sm"&gt;&lt;span class="nds-label" data-filter="system"&gt;Identity &amp; Records&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
        &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="neutral"&gt;&lt;span class="nds-label" data-filter="popularity" data-filter-value="standard"&gt;Standard&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
      &lt;/tr&gt;
      &lt;tr class="nds-page-item"&gt;
        &lt;td&gt;4&lt;/td&gt;
        &lt;td&gt;Marriage Contract Registration&lt;/td&gt;
        &lt;td&gt;&lt;span class="nds-tag nds-blue nds-sm"&gt;&lt;span class="nds-label" data-filter="system"&gt;Identity &amp; Records&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
        &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="neutral"&gt;&lt;span class="nds-label" data-filter="popularity" data-filter-value="standard"&gt;Standard&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
      &lt;/tr&gt;
      &lt;tr class="nds-page-item"&gt;
        &lt;td&gt;5&lt;/td&gt;
        &lt;td&gt;Driver's License Services&lt;/td&gt;
        &lt;td&gt;&lt;span class="nds-tag nds-blue nds-sm"&gt;&lt;span class="nds-label" data-filter="system"&gt;Transport &amp; Vehicles&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
        &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label" data-filter="popularity" data-filter-value="most_used"&gt;Most Used&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/tbody&gt;
  &lt;/table&gt;
&lt;/div&gt;
&lt;!-- Auto-pagination nav placed right after the content wrapper --&gt;
&lt;nav class="nds-pagination" data-auto-pagination aria-label="Table pagination"&gt;&lt;/nav&gt;
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

<!-- Built-in Features -->
<section id="tableFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-table</code> on the page is automatically wrapped in a responsive scroll container. Opt into gradient fade masks with <code class="nds-inline-code lang-html">nds-mask</code>.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-sorting-01"></i>
                        <span class="nds-label">Column Sorting</span>
                    </span>
                    <p class="nds-item-desc">Columns cycle through ascending, descending, and original order. Numbers, dates, and text are detected and sorted appropriately.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-checkmark-square-02"></i>
                        <span class="nds-label">Row Selection</span>
                    </span>
                    <p class="nds-item-desc">Header checkbox toggles all rows with indeterminate state support. Selected rows receive a distinct background highlight that persists across striped rows.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-scroll-horizontal"></i>
                        <span class="nds-label">Scroll Awareness</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">nds-mask</code> to fade the overflow edges with a gradient that updates as the user scrolls to indicate more content in either direction. The mask clips descendants to the wrapper, so avoid it on tables with dropmenus, tooltips, or other overflowing popovers.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Keyboard Accessible</span>
                    </span>
                    <p class="nds-item-desc">Sort headers are focusable buttons that respond to Enter and Space. Interactive elements within cells receive visible focus rings.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-table-01"></i>
                        <span class="nds-label">Striped Rows</span>
                    </span>
                    <p class="nds-item-desc">Alternating row backgrounds and hover highlighting are applied automatically for easier scanning of large datasets.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-loading-01"></i>
                        <span class="nds-label">Loading State</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">data-state="loading"</code> to show a shimmer animation across all cells while data is being fetched.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Access sort state, reset sorting, and reinitialize tables after dynamic content changes through the <code class="nds-inline-code lang-js">NDS.Tables</code> namespace.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="tableGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use tables for <strong>structured, comparable data</strong> where users need to scan across rows and columns. For simple key-value pairs, use a <a class="nds-color" href="{{ 'components/definition-list' | relative_url }}">Definition List</a> instead</li>
                    <li>Do not use tables for page layout or displaying <a class="nds-color" href="{{ 'components/cards' | relative_url }}">Cards</a> in a grid. Use the <a class="nds-color" href="{{ 'layout/grid' | relative_url }}">Grid</a> layout for that</li>
                    <li>Choose <strong>compact tables</strong> for dense administrative data (logs, inventories, audit trails) and <strong>standard tables</strong> when rows contain rich content like tags, avatars, or action buttons</li>
                    <li>Enable sorting only on columns with meaningful sort order. Status columns with tags are poor candidates for sorting</li>
                    <li>Add <strong>row selection</strong> when the interface supports bulk operations (delete, export, assign). Pair the table with an action bar that appears when rows are selected</li>
                    <li>Set <code class="nds-inline-code lang-html">--max-width</code> when placing a table in a narrow container or side panel to trigger the responsive scroll wrapper early</li>
                    <li>Use <strong>pagination</strong> for datasets over 15-20 rows. Showing too many rows slows rendering and makes scanning harder</li>
                    <li>Keep header labels short and descriptive. Avoid abbreviations that require explanation</li>
                    <li>Place the most important identifier column (name, ID, title) first. Put action buttons or status indicators in the last column</li>
                    <li>Add a <code class="nds-inline-code lang-html">&lt;caption&gt;</code> element for screen readers when the table's purpose is not clear from surrounding headings</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-compact</code></td><td>Reduces row height to 48px. Override with <code class="nds-inline-code lang-html">--table-row-height</code> for custom values</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-mask</code></td><td>Applies gradient fade masks on the overflow edges when the table scrolls horizontally. Off by default. Note: mask clips descendants to the wrapper and breaks overflowing UI like dropmenus, tooltips, and popovers that escape table bounds</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-sortable</code></td><td>Enables column sorting. Use <code class="nds-inline-code lang-html">nds-col-header</code> with <code class="nds-inline-code lang-html">nds-sort-btn nds-icon-only</code> inside sortable <code class="nds-inline-code lang-html">&lt;th&gt;</code> elements</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-center</code></td><td>Center-aligns all cell content across the table</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-col-header</code></td><td>Flex container inside <code class="nds-inline-code lang-html">&lt;th&gt;</code> that holds the label and actions side by side</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-col-actions</code></td><td>Container for action buttons (sort, filter, etc.) inside a column header</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-sort-btn nds-icon-only</code></td><td>Sort button class inside column headers that triggers column sorting</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-page-item</code></td><td>Applied to <code class="nds-inline-code lang-html">&lt;tr&gt;</code> elements for client-side pagination (used with <code class="nds-inline-code lang-html">nds-paged-content</code>)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">table-actions</code></td><td>Flex container for grouping action buttons within a cell</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">actions-column</code></td><td>Shrinks column to fit content width, preventing unnecessary whitespace</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">checkbox-column</code></td><td>Fallback for browsers without <code class="nds-inline-code lang-html">:has()</code> support. Apply to <code class="nds-inline-code lang-html">&lt;th&gt;</code> and <code class="nds-inline-code lang-html">&lt;td&gt;</code> containing checkboxes to fix column width</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-state="sorted-asc"</code></td><td>Set on <code class="nds-inline-code lang-html">&lt;th&gt;</code> to mark the initial sort column as ascending</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="sorted-desc"</code></td><td>Set on <code class="nds-inline-code lang-html">&lt;th&gt;</code> to mark the initial sort column as descending</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="selected"</code></td><td>Set on <code class="nds-inline-code lang-html">&lt;tr&gt;</code> to visually highlight a selected row. JS toggles this automatically when checkboxes change</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="loading"</code></td><td>Set on <code class="nds-inline-code lang-html">&lt;table&gt;</code> to show the loading shimmer animation</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-auto-pagination</code></td><td>Set on <code class="nds-inline-code lang-html">&lt;nav class="nds-pagination"&gt;</code> to enable auto-pagination for the preceding <code class="nds-inline-code lang-html">nds-paged-content</code> wrapper</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--table-row-height</code></td><td>64px (48px in compact)</td><td>Row height for data cells. Set on the table or use <code class="nds-inline-code lang-html">nds-compact</code> for the 48px preset</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--max-width</code></td><td>100%</td><td>Maximum width of the responsive scroll wrapper</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--min-width</code></td><td>auto-calculated</td><td>Minimum width of the table inside the wrapper. Prevents cells from shrinking below content width</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--mask-fade-distance</code></td><td>48px</td><td>Width of the gradient fade mask on scroll edges</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--per-page</code></td><td>10</td><td>Number of rows shown per page when using pagination (set on <code class="nds-inline-code lang-html">nds-paged-content</code>)</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Tables</strong> API provides methods to initialize, sort, and manage table instances. All tables auto-initialize on page load. Call <code class="nds-inline-code lang-js">NDS.Tables.reinit()</code> after dynamically adding new tables to the DOM.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Namespace methods ────────────────────────────────
NDS.Tables.init();             // Initialize all tables on the page
NDS.Tables.reinit();           // Re-initialize after dynamic content changes
NDS.Tables.recheckWidths();    // Recheck responsive wrappers (e.g. after resize)

// ── Manual creation ──────────────────────────────────
// Create a sortable/selectable controller for a specific table
const table = document.querySelector('#myTable');
const instance = NDS.Tables.create(table);

// Create a responsive wrapper for a specific table
const responsive = NDS.Tables.createResponsive(table);

// ── Instance methods (sortable tables) ───────────────
instance.getSortColumn();      // Returns current sort column index (-1 if none)
instance.getSortDirection();   // Returns 'asc', 'desc', or null
instance.resetSort();          // Clear sorting, restore original row order
instance.destroy();            // Remove all event listeners and clean up

// ── Instance methods (responsive wrapper) ────────────
responsive.recheckWidth();     // Recheck if scroll is needed
responsive.destroy();          // Remove wrapper event listeners

// ── Custom events ────────────────────────────────────
// Fires when a column is sorted
table.addEventListener('nds:table:sort', (e) =&gt; {
    e.detail.columnIndex;  // Sorted column index
    e.detail.direction;    // 'asc', 'desc', or null (reset)
    e.detail.table;        // The &lt;table&gt; element
    e.detail.button;       // The sort button clicked
});

// Fires when row selection changes
table.addEventListener('nds:table:selection', (e) =&gt; {
    e.detail.selectedCount;    // Number of selected rows
    e.detail.totalCount;       // Total number of selectable rows
    e.detail.selectedRows;     // Array of selected &lt;tr&gt; elements
    e.detail.selectedIndexes;  // Array of selected row indexes
    e.detail.table;            // The &lt;table&gt; element
});
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
