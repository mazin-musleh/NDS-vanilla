---
layout: page
title: Export
hero_title: Export - National Design System
hero_description: A declarative download utility for turning any table, card list, or marked-up container into a CSV, Excel, or print-ready PDF file with selection and pagination support.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.1.0"
updated: "1.4.0"
last_edit: "13/07/2026 - 01:15 AM"
---

<!-- Table Export -->
<section id="exportTable" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Table Export</h2>
            <p class="nds-section-description">A button group above the table triggers CSV, Excel, or PDF downloads. The library reads the table's headers, body rows, and checkbox state automatically</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Standard</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="gap: 0;">
                            <div class="nds-toolbar">
                                <div class="nds-bar-actions">
                                    <div class="nds-dropmenu" data-columns-target="exportOrdersTable">
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
                                    <div class="nds-export nds-btn-group">
                                        <button type="button" class="nds-btn nds-secondary-outline nds-md"
                                            data-export="csv" data-export-target="#exportOrdersTable">
                                            <span class="nds-label">CSV</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-secondary-outline nds-md"
                                            data-export="xls" data-export-target="#exportOrdersTable">
                                            <span class="nds-label">Excel</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-secondary-outline nds-md"
                                            data-export="pdf" data-export-target="#exportOrdersTable">
                                            <span class="nds-label">PDF</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <table id="exportOrdersTable" class="nds-table nds-compact" data-export-name="orders">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" class="nds-check" aria-label="Select all rows">
                                                    </div>
                                                </div>
                                            </th>
                                            <th>Reference</th>
                                            <th>Customer</th>
                                            <th data-export-label="Amount (SAR)">Amount</th>
                                            <th data-export-skip>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" class="nds-check" aria-label="Select 128">
                                                    </div>
                                                </div>
                                            </td>
                                            <td>128</td>
                                            <td>حسن المختار</td>
                                            <td data-export-value="240"><span class="nds-number-format" data-currency="SAR">240</span></td>
                                            <td><button class="nds-btn nds-sm nds-subtle">View</button></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" class="nds-check" aria-label="Select 129">
                                                    </div>
                                                </div>
                                            </td>
                                            <td>129</td>
                                            <td>نادية الخطيب</td>
                                            <td data-export-value="1250"><span class="nds-number-format" data-currency="SAR">1250</span></td>
                                            <td><button class="nds-btn nds-sm nds-subtle">View</button></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" class="nds-check" aria-label="Select 130">
                                                    </div>
                                                </div>
                                            </td>
                                            <td>130</td>
                                            <td>طارق السديري</td>
                                            <td data-export-value="85"><span class="nds-number-format" data-currency="SAR">85</span></td>
                                            <td><button class="nds-btn nds-sm nds-subtle">View</button></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" class="nds-check" aria-label="Select 131">
                                                    </div>
                                                </div>
                                            </td>
                                            <td>131</td>
                                            <td>زهرة الحبيب</td>
                                            <td data-export-value="3120"><span class="nds-number-format" data-currency="SAR">3120</span></td>
                                            <td><button class="nds-btn nds-sm nds-subtle">View</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-export-table-1" id="tab-export-table-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-export-table-1"
                                    aria-labelledby="tab-export-table-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-toolbar"&gt;
  &lt;div class="nds-bar-actions"&gt;
    &lt;!-- Hiding a column stamps data-export-skip, so exports follow the view --&gt;
    &lt;div class="nds-dropmenu" data-columns-target="orders"&gt;
      &lt;button class="nds-btn nds-neutral nds-md nds-menu-btn nds-dropmenu-trigger" type="button"&gt;
        &lt;i class="nds-icon nds-hgi-view-off-slash" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Columns&lt;/span&gt;
      &lt;/button&gt;
      &lt;div class="nds-dropmenu-menu" hidden&gt;
        &lt;div class="nds-dropmenu-scroll"&gt;
          &lt;fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-columns-list data-no-auto-close&gt;
            &lt;legend class="nds-label"&gt;Visible columns&lt;/legend&gt;
          &lt;/fieldset&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-export nds-btn-group"&gt;
      &lt;button type="button" class="nds-btn nds-secondary-outline nds-md"
              data-export="csv" data-export-target="#orders"&gt;
        &lt;span class="nds-label"&gt;CSV&lt;/span&gt;
      &lt;/button&gt;
      &lt;button type="button" class="nds-btn nds-secondary-outline nds-md"
              data-export="xls" data-export-target="#orders"&gt;
        &lt;span class="nds-label"&gt;Excel&lt;/span&gt;
      &lt;/button&gt;
      &lt;button type="button" class="nds-btn nds-secondary-outline nds-md"
              data-export="pdf" data-export-target="#orders"&gt;
        &lt;span class="nds-label"&gt;PDF&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;table id="orders" class="nds-table nds-compact" data-export-name="orders"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;
        &lt;div class="nds-form-container nds-check-container"&gt;
          &lt;div class="nds-form-control"&gt;
            &lt;input type="checkbox" class="nds-check" aria-label="Select all rows"&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/th&gt;
      &lt;th&gt;Reference&lt;/th&gt;
      &lt;th&gt;Customer&lt;/th&gt;
      &lt;th data-export-label="Amount (SAR)"&gt;Amount&lt;/th&gt;
      &lt;th data-export-skip&gt;Actions&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;
        &lt;div class="nds-form-container nds-check-container"&gt;
          &lt;div class="nds-form-control"&gt;
            &lt;input type="checkbox" class="nds-check" aria-label="Select 128"&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/td&gt;
      &lt;td&gt;128&lt;/td&gt;
      &lt;td&gt;حسن المختار&lt;/td&gt;
      &lt;td data-export-value="240"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;240&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;&lt;button class="nds-btn nds-sm nds-subtle"&gt;View&lt;/button&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;
        &lt;div class="nds-form-container nds-check-container"&gt;
          &lt;div class="nds-form-control"&gt;
            &lt;input type="checkbox" class="nds-check" aria-label="Select 129"&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/td&gt;
      &lt;td&gt;129&lt;/td&gt;
      &lt;td&gt;نادية الخطيب&lt;/td&gt;
      &lt;td data-export-value="1250"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;1250&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;&lt;button class="nds-btn nds-sm nds-subtle"&gt;View&lt;/button&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;
        &lt;div class="nds-form-container nds-check-container"&gt;
          &lt;div class="nds-form-control"&gt;
            &lt;input type="checkbox" class="nds-check" aria-label="Select 130"&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/td&gt;
      &lt;td&gt;130&lt;/td&gt;
      &lt;td&gt;طارق السديري&lt;/td&gt;
      &lt;td data-export-value="85"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;85&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;&lt;button class="nds-btn nds-sm nds-subtle"&gt;View&lt;/button&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;
        &lt;div class="nds-form-container nds-check-container"&gt;
          &lt;div class="nds-form-control"&gt;
            &lt;input type="checkbox" class="nds-check" aria-label="Select 131"&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/td&gt;
      &lt;td&gt;131&lt;/td&gt;
      &lt;td&gt;زهرة الحبيب&lt;/td&gt;
      &lt;td data-export-value="3120"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;3120&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;&lt;button class="nds-btn nds-sm nds-subtle"&gt;View&lt;/button&gt;&lt;/td&gt;
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

<!-- Generic Source Export -->
<section id="exportGeneric" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Generic Source</h2>
            <p class="nds-section-description">Card lists, definition lists, and any custom container become exportable by tagging their rows and fields with two data attributes</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-container">
                        <div class="state-demo" style="gap: 0;">
                            <div id="exportCardsDemo">
                                <div class="nds-toolbar">
                                    <div class="nds-bar-actions">
                                        <div class="nds-export nds-btn-group">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md"
                                                data-export="csv" data-export-target="#exportCardsList">
                                                <span class="nds-label">CSV</span>
                                            </button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md"
                                                data-export="xls" data-export-target="#exportCardsList">
                                                <span class="nds-label">Excel</span>
                                            </button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md"
                                                data-export="pdf" data-export-target="#exportCardsList">
                                                <span class="nds-label">PDF</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div id="exportCardsList" class="nds-grid"
                                style="--max-col:3;--mid-col:2;--min-col:1;"
                                data-export-rows=".nds-card" data-export-name="services">
                                <label class="nds-card nds-stroke">
                                    <div class="nds-card-header">
                                        <div class="nds-card-featured-icon">
                                            <span class="nds-featured-icon nds-circle nds-lg">
                                                <i class="hgi hgi-stroke hgi-passport"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="nds-card-checkbox">
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" class="nds-check" aria-label="Select Passport Renewal">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <span class="nds-card-title" data-export-field="service" data-export-label="Service">Passport Renewal</span>
                                            <p class="nds-card-description" data-export-field="entity" data-export-label="Entity">General Directorate of Passports</p>
                                        </div>
                                        <div class="nds-card-meta">
                                            <div class="nds-card-tags">
                                                <span class="nds-tag nds-yellow nds-sm" data-export-field="status" data-export-label="Status">
                                                    <span class="nds-label">In Progress</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                <label class="nds-card nds-stroke">
                                    <div class="nds-card-header">
                                        <div class="nds-card-featured-icon">
                                            <span class="nds-featured-icon nds-circle nds-lg">
                                                <i class="hgi hgi-stroke hgi-car-01"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="nds-card-checkbox">
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" class="nds-check" aria-label="Select Driving Licence">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <span class="nds-card-title" data-export-field="service">Driving Licence</span>
                                            <p class="nds-card-description" data-export-field="entity">Traffic Department</p>
                                        </div>
                                        <div class="nds-card-meta">
                                            <div class="nds-card-tags">
                                                <span class="nds-tag nds-green nds-sm" data-export-field="status">
                                                    <span class="nds-label">Completed</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                <label class="nds-card nds-stroke">
                                    <div class="nds-card-header">
                                        <div class="nds-card-featured-icon">
                                            <span class="nds-featured-icon nds-circle nds-lg">
                                                <i class="hgi hgi-stroke hgi-store-01"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="nds-card-checkbox">
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" class="nds-check" aria-label="Select Commercial Registration">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <span class="nds-card-title" data-export-field="service">Commercial Registration</span>
                                            <p class="nds-card-description" data-export-field="entity">Ministry of Commerce</p>
                                        </div>
                                        <div class="nds-card-meta">
                                            <div class="nds-card-tags">
                                                <span class="nds-tag nds-gray nds-sm" data-export-field="status">
                                                    <span class="nds-label">Pending</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-export-generic-1" id="tab-export-generic-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-export-generic-1"
                                    aria-labelledby="tab-export-generic-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div id="servicesExport"&gt;
  &lt;div class="nds-toolbar"&gt;
    &lt;div class="nds-bar-actions"&gt;
      &lt;div class="nds-export nds-btn-group"&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md"
                data-export="csv" data-export-target="#services"&gt;
          &lt;span class="nds-label"&gt;CSV&lt;/span&gt;
        &lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md"
                data-export="xls" data-export-target="#services"&gt;
          &lt;span class="nds-label"&gt;Excel&lt;/span&gt;
        &lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md"
                data-export="pdf" data-export-target="#services"&gt;
          &lt;span class="nds-label"&gt;PDF&lt;/span&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div id="services" class="nds-grid"
       style="--max-col:3;--mid-col:2;--min-col:1;"
       data-export-rows=".nds-card" data-export-name="services"&gt;
  &lt;label class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-header"&gt;
      &lt;div class="nds-card-featured-icon"&gt;
        &lt;span class="nds-featured-icon nds-circle nds-lg"&gt;
          &lt;i class="hgi hgi-stroke hgi-passport"&gt;&lt;/i&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-card-checkbox"&gt;
      &lt;div class="nds-form-container nds-check-container"&gt;
        &lt;div class="nds-form-control"&gt;
          &lt;input type="checkbox" class="nds-check" aria-label="Select Passport Renewal"&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;span class="nds-card-title" data-export-field="service" data-export-label="Service"&gt;Passport Renewal&lt;/span&gt;
        &lt;p class="nds-card-description" data-export-field="entity" data-export-label="Entity"&gt;General Directorate of Passports&lt;/p&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-meta"&gt;
        &lt;div class="nds-card-tags"&gt;
          &lt;span class="nds-tag nds-yellow nds-sm" data-export-field="status" data-export-label="Status"&gt;
            &lt;span class="nds-label"&gt;In Progress&lt;/span&gt;
          &lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/label&gt;
  &lt;label class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-header"&gt;
      &lt;div class="nds-card-featured-icon"&gt;
        &lt;span class="nds-featured-icon nds-circle nds-lg"&gt;
          &lt;i class="hgi hgi-stroke hgi-car-01"&gt;&lt;/i&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-card-checkbox"&gt;
      &lt;div class="nds-form-container nds-check-container"&gt;
        &lt;div class="nds-form-control"&gt;
          &lt;input type="checkbox" class="nds-check" aria-label="Select Driving Licence"&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;span class="nds-card-title" data-export-field="service"&gt;Driving Licence&lt;/span&gt;
        &lt;p class="nds-card-description" data-export-field="entity"&gt;Traffic Department&lt;/p&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-meta"&gt;
        &lt;div class="nds-card-tags"&gt;
          &lt;span class="nds-tag nds-green nds-sm" data-export-field="status"&gt;
            &lt;span class="nds-label"&gt;Completed&lt;/span&gt;
          &lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/label&gt;
  &lt;label class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-header"&gt;
      &lt;div class="nds-card-featured-icon"&gt;
        &lt;span class="nds-featured-icon nds-circle nds-lg"&gt;
          &lt;i class="hgi hgi-stroke hgi-store-01"&gt;&lt;/i&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-card-checkbox"&gt;
      &lt;div class="nds-form-container nds-check-container"&gt;
        &lt;div class="nds-form-control"&gt;
          &lt;input type="checkbox" class="nds-check" aria-label="Select Commercial Registration"&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;span class="nds-card-title" data-export-field="service"&gt;Commercial Registration&lt;/span&gt;
        &lt;p class="nds-card-description" data-export-field="entity"&gt;Ministry of Commerce&lt;/p&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-meta"&gt;
        &lt;div class="nds-card-tags"&gt;
          &lt;span class="nds-tag nds-gray nds-sm" data-export-field="status"&gt;
            &lt;span class="nds-label"&gt;Pending&lt;/span&gt;
          &lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/label&gt;
  &lt;/div&gt;
&lt;/div&gt;
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
<section id="exportFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-file-export"></i>
                        <span class="nds-label">Multi-Format Output</span>
                    </span>
                    <p class="nds-item-desc">Every source exports to CSV, Excel, or PDF from the same buttons. CSV ships with a UTF-8 BOM and RFC 4180 quoting, Excel as an HTML payload with the correct MIME, and PDF through the browser's native print dialog.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-database"></i>
                        <span class="nds-label">Source Agnostic</span>
                    </span>
                    <p class="nds-item-desc">Works on any <code class="nds-inline-code lang-html">&lt;table&gt;</code> or <code class="nds-inline-code lang-html">.nds-table</code> with zero markup changes. Card lists, definition lists, and custom containers opt in by adding <code class="nds-inline-code lang-html">data-export-rows</code> and <code class="nds-inline-code lang-html">data-export-field</code>.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-checkmark-square-02"></i>
                        <span class="nds-label">Smart Selection Scope</span>
                    </span>
                    <p class="nds-item-desc">If any row carries <code class="nds-inline-code lang-html">data-state="selected"</code> or contains a checked <code class="nds-inline-code lang-html">input.nds-check</code>, only that subset is exported. Otherwise the full set ships. No wiring required.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-file-management"></i>
                        <span class="nds-label">Pagination Aware</span>
                    </span>
                    <p class="nds-item-desc">Paginated tables export every page, not just the visible one. The library walks through hidden rows inside <code class="nds-inline-code lang-html">.nds-paged-content</code> so the file always matches the full dataset.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-shield-01"></i>
                        <span class="nds-label">CSV Injection Guard</span>
                    </span>
                    <p class="nds-item-desc">Cells starting with <code class="nds-inline-code lang-html">=</code>, <code class="nds-inline-code lang-html">+</code>, <code class="nds-inline-code lang-html">-</code>, or <code class="nds-inline-code lang-html">@</code> are auto-prefixed with an apostrophe so spreadsheets treat them as text instead of evaluating them as formulas.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-printer"></i>
                        <span class="nds-label">Print-Ready PDF</span>
                    </span>
                    <p class="nds-item-desc">The PDF path renders a clean table into a hidden iframe and triggers the browser's print dialog. Output uses light-mode tokens for legibility on paper, with header repeat across pages and proper page breaks.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-globe-02"></i>
                        <span class="nds-label">RTL & UTF-8 Ready</span>
                    </span>
                    <p class="nds-item-desc">Arabic and other non-Latin scripts round-trip cleanly in CSV thanks to the UTF-8 BOM. Excel and PDF outputs honor the page's text direction so right-to-left columns stay right-to-left.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-filter"></i>
                        <span class="nds-label">Filter Aware</span>
                    </span>
                    <p class="nds-item-desc">Rows hidden by <code class="nds-inline-code lang-html">NDS.Filter</code> (<code class="nds-inline-code lang-html">data-filtered</code> attribute) are excluded from the export. This is distinct from pagination-hidden rows, which are always included. Export reflects the active filter without any extra wiring.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Declarative & Programmatic</span>
                    </span>
                    <p class="nds-item-desc">Drop a <code class="nds-inline-code lang-html">data-export</code> button anywhere on the page and it works through a single delegated listener. The full <code class="nds-inline-code lang-js">NDS.Export</code> namespace is also available for triggering exports from custom JS.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="exportGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Reach for the declarative attribute pattern first: a <code class="nds-inline-code lang-html">[data-export]</code> button with <code class="nds-inline-code lang-html">data-export-target</code> needs no per-page JS and works for dynamically injected toolbars too.</li>
                    <li>Use the same component for non-table lists. Tag the container with <code class="nds-inline-code lang-html">data-export-rows="&lt;selector&gt;"</code> and each field inside a row with <code class="nds-inline-code lang-html">data-export-field="key"</code>. Cards and definition lists become exportable without a new component.</li>
                    <li>Place currency, units, and other column-wide qualifiers in the header label via <code class="nds-inline-code lang-html">data-export-label="Amount (SAR)"</code>, not in every cell. CSV and Excel can then do math on the column.</li>
                    <li>Add <code class="nds-inline-code lang-html">data-export-skip</code> on per-row action columns (Edit, Delete, View buttons) so they don't leak into the file. The auto-detected checkbox column is already skipped.</li>
                    <li>Exports follow the visible table. A column hidden through the <a class="nds-color" href="{{ 'components/tables' | relative_url }}">Table</a> column menu stamps its own <code class="nds-inline-code lang-html">data-export-skip</code>, so it drops out of the file and returns when the column is shown again. An authored <code class="nds-inline-code lang-html">data-export-skip</code> always survives. A table with an <code class="nds-inline-code lang-html">id</code> remembers its hidden columns across visits, so a returning user's export matches the view they left behind.</li>
                    <li>Set <code class="nds-inline-code lang-html">data-export-name</code> on the source for a meaningful filename. Output is <code class="nds-inline-code lang-html">{name}-YYYY-MM-DD.{ext}</code>.</li>
                    <li>If a cell shows a formatted value but the spreadsheet needs the raw one, set <code class="nds-inline-code lang-html">data-export-value</code> on the <code class="nds-inline-code lang-html">&lt;td&gt;</code>. The display stays the same, the export gets the raw number or ISO date.</li>
                    <li>Selection just works: drop the canonical <code class="nds-inline-code lang-html">nds-card-checkbox</code> or <code class="nds-inline-code lang-html">.nds-check</code> markup, and any checked row is exported automatically when <code class="nds-inline-code lang-js">scope</code> is <code class="nds-inline-code lang-js">'auto'</code>.</li>
                    <li>For tables that use a header column for the visible label and a separate value (sortable status enums, currency cells), do not rely on <code class="nds-inline-code lang-html">data-sort-value</code> for the export. Sort and export are decoupled by design.</li>
                    <li>Don't pre-format numbers inside cells if you want spreadsheet math. Use <code class="nds-inline-code lang-html">data-export-value</code> with the raw number so the export becomes summable.</li>
                    <li>For pure source-of-truth control over the file, the programmatic API (<code class="nds-inline-code lang-js">NDS.Export.collect</code> + <code class="nds-inline-code lang-js">NDS.Export.toCSV</code>) lets a custom script transform or filter the data before download.</li>
                    <li>CSV and Excel downloads announce the row count to screen readers automatically: <code class="nds-inline-code lang-js">NDS.announce('Exported N rows')</code> fires after the file is triggered. No extra markup is needed, but avoid suppressing the live region if you customize the download flow.</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr><th>Attribute</th><th>Placement</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-export="csv|xls|pdf"</code></td><td>Trigger button</td><td>Marks the element as an export button and chooses the format. Required.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-export-target="&lt;selector&gt;"</code></td><td>Trigger button</td><td>Selector for the source. Optional: omit when the button lives inside the source.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-export-scope="all|selected|auto"</code></td><td>Trigger button</td><td>Force the export scope. Default <code class="nds-inline-code lang-html">"auto"</code>: selected rows if any, otherwise all.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-export-name</code></td><td>Source element</td><td>Filename stem. Result: <code class="nds-inline-code lang-html">{name}-YYYY-MM-DD.{ext}</code>. Default <code class="nds-inline-code lang-html">"nds-export"</code>.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-export-rows="&lt;selector&gt;"</code></td><td>Non-table source</td><td>Selector that matches each row inside the source. Required to opt a non-table container into the generic adapter.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-export-field="key"</code></td><td>Element inside a row</td><td>Marks an element as a field. The set of keys across all rows becomes the export columns.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-export-label</code></td><td><code class="nds-inline-code lang-html">&lt;th&gt;</code> or field element</td><td>Override the column heading used in the file (e.g. <code class="nds-inline-code lang-html">"Amount (SAR)"</code> for a raw number column).</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-export-value</code></td><td><code class="nds-inline-code lang-html">&lt;td&gt;</code> or field element</td><td>Override the exported cell value. Useful when the cell shows a formatted string and the file needs the raw value.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-export-skip</code></td><td><code class="nds-inline-code lang-html">&lt;th&gt;</code>, <code class="nds-inline-code lang-html">&lt;td&gt;</code>, or field element</td><td>Drop the column (on a <code class="nds-inline-code lang-html">&lt;th&gt;</code>) or the single cell (on a <code class="nds-inline-code lang-html">&lt;td&gt;</code> / field). On the source itself, accepts a space-separated list of field keys.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The library auto-binds to <code class="nds-inline-code lang-html">[data-export]</code> buttons via a single delegated listener. The <code class="nds-inline-code lang-js">NDS.Export</code> namespace is also available for triggering exports from custom scripts, building one-off formats, or accessing the normalized data.</p>
                <div class="nds-tabs nds-code nds-divided">
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                aria-controls="panel-export-api-1" id="tab-export-api-1">
                                <span class="nds-tab-label">JavaScript</span>
                            </button>
                        </nav>
                        <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-export-api-1"
                            aria-labelledby="tab-export-api-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
<code class="lang-javascript code">// Per-format shortcuts: preferred for most call sites
NDS.Export.csv('#orders');                          // 'auto' scope, default filename
NDS.Export.xls('#orders', 'all');                   // force the full set
NDS.Export.pdf('#orders', 'selected', {             // explicit override + opts
    filename: 'q2-orders.pdf',
    title:    'Q2 Orders'
});

// Generic entry point: useful when the format is dynamic
NDS.Export.export('#orders', format, 'auto');

// Normalize a source to { columns, rows } without downloading
const data = NDS.Export.collect('#orders', 'all');
// returns { columns: [{ key, label }, ...], rows: [{ [key]: value }, ...] }

// Pure formatters: transform the data manually, then download
const csvString  = NDS.Export.toCSV(data);          // UTF-8 string with BOM
const xlsHtmlStr = NDS.Export.toXLSHtml(data, {
    dir: 'rtl'                                      // override the page's direction
});

// Side-effecting helpers: used by the shortcuts above
NDS.Export.openPrint(data, { title: 'Q2 Orders' }); // hidden iframe + native print
NDS.Export.download(data, 'csv', {                  // route normalized data to a file
    filename: 'snapshot.csv'
});

// Trigger any format from a custom event
document.querySelector('#exportNow').addEventListener('click', () => {
    NDS.Export.csv('#orders');
});</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
