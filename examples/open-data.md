---
layout: page
# layout + layout_class name the page shape: the Front Matter table in layout/page-layout.md maps each key to its markup. This file's body is only the inner content.
layout_class: nds-has-sideinfo
title: Open Data
hero_title: Population by Region
hero_description: The population and land area of the 13 regions, from the 2022 census. View it as a table or a chart, download it, or read it from the API.
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
sidemenu_mode: false
---

<!-- Layout rules: one dataset page.
     - The dataset's facts are the side info column (nds-has-sideinfo), with the main download. The hero's Share shares the page.
     - The main column stacks its parts with nds-block, each a section wrapper with a heading: the data, its columns, the API, the files.
     - The data has two views of the same rows, Table and Chart, in a Content Switcher. The chart reads the table, so the two never disagree.
     - Export saves the table as it is shown: a cell with a formatted number gives the raw number in data-export-value.
     - The columns and the files are records with the same fields: compact Tables.
     - The API sample is a Code block with one tab per language, and a sample answer.
     - The figures on this page are sample data. -->

<section id="od-dataset" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <div class="nds-info-content">
            <div class="nds-section-wrapper nds-block">
                <div class="nds-section-head">
                    <h2 class="nds-section-title">The data</h2>
                </div>
                <div class="nds-section-body">
                    <div class="nds-tabs nds-content-switcher" id="od-views">
                        <div class="nds-tab-list" role="tablist" aria-label="Data view">
                            <button type="button" class="nds-btn nds-secondary nds-tab" role="tab" aria-selected="true" aria-controls="od-panel-table" id="od-tab-table" tabindex="0">
                                <i class="hgi hgi-stroke hgi-table" aria-hidden="true"></i>
                                <span class="nds-label">Table</span>
                            </button>
                            <button type="button" class="nds-btn nds-secondary nds-tab" role="tab" aria-selected="false" aria-controls="od-panel-chart" id="od-tab-chart" tabindex="-1">
                                <i class="hgi hgi-stroke hgi-chart-histogram" aria-hidden="true"></i>
                                <span class="nds-label">Chart</span>
                            </button>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel" role="tabpanel" id="od-panel-table" aria-labelledby="od-tab-table" tabindex="0">
                                <div class="nds-toolbar">
                                    <div class="nds-toolbar-row">
                                        <div class="nds-toolbar-start">
                                            <span class="nds-toolbar-text"><b>13</b> regions</span>
                                        </div>
                                        <div class="nds-toolbar-end">
                                            <div class="nds-export nds-btn-group">
                                                <button type="button" class="nds-btn nds-secondary-outline nds-md" data-export="csv" data-export-target="#od-table">
                                                    <span class="nds-label">CSV</span>
                                                </button>
                                                <button type="button" class="nds-btn nds-secondary-outline nds-md" data-export="xls" data-export-target="#od-table">
                                                    <span class="nds-label">Excel</span>
                                                </button>
                                                <button type="button" class="nds-btn nds-secondary-outline nds-md" data-export="pdf" data-export-target="#od-table">
                                                    <span class="nds-label">PDF</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <table id="od-table" class="nds-table nds-compact" data-export-name="population-by-region">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div class="nds-col-header">
                                                    <span class="nds-label">Region</span>
                                                    <div class="nds-col-actions">
                                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" type="button" aria-label="Sort by region">
                                                            <i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </th>
                                            <!-- The rows ship in this order, so the column says so -->
                                            <th data-align="end" data-state="sorted-desc">
                                                <div class="nds-col-header">
                                                    <span class="nds-label">Population</span>
                                                    <div class="nds-col-actions">
                                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" type="button" aria-label="Sort by population">
                                                            <i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </th>
                                            <th data-align="end" data-export-label="Share (%)">
                                                <div class="nds-col-header">
                                                    <span class="nds-label">Share (%)</span>
                                                    <div class="nds-col-actions">
                                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" type="button" aria-label="Sort by share">
                                                            <i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </th>
                                            <th data-align="end" data-export-label="Area (km²)">
                                                <div class="nds-col-header">
                                                    <span class="nds-label">Area (km²)</span>
                                                    <div class="nds-col-actions">
                                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" type="button" aria-label="Sort by area">
                                                            <i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Riyadh</td>
                                        <td data-sort-value="8591748" data-export-value="8591748"><span class="nds-number-format">8591748</span></td>
                                        <td data-sort-value="26.7">26.7</td>
                                        <td data-sort-value="404240" data-export-value="404240"><span class="nds-number-format">404240</span></td>
                                    </tr>
                                    <tr>
                                        <td>Makkah</td>
                                        <td data-sort-value="8021463" data-export-value="8021463"><span class="nds-number-format">8021463</span></td>
                                        <td data-sort-value="24.9">24.9</td>
                                        <td data-sort-value="153128" data-export-value="153128"><span class="nds-number-format">153128</span></td>
                                    </tr>
                                    <tr>
                                        <td>Eastern Province</td>
                                        <td data-sort-value="5125254" data-export-value="5125254"><span class="nds-number-format">5125254</span></td>
                                        <td data-sort-value="15.9">15.9</td>
                                        <td data-sort-value="672522" data-export-value="672522"><span class="nds-number-format">672522</span></td>
                                    </tr>
                                    <tr>
                                        <td>Madinah</td>
                                        <td data-sort-value="2137983" data-export-value="2137983"><span class="nds-number-format">2137983</span></td>
                                        <td data-sort-value="6.6">6.6</td>
                                        <td data-sort-value="151990" data-export-value="151990"><span class="nds-number-format">151990</span></td>
                                    </tr>
                                    <tr>
                                        <td>Asir</td>
                                        <td data-sort-value="2024285" data-export-value="2024285"><span class="nds-number-format">2024285</span></td>
                                        <td data-sort-value="6.3">6.3</td>
                                        <td data-sort-value="81000" data-export-value="81000"><span class="nds-number-format">81000</span></td>
                                    </tr>
                                    <tr>
                                        <td>Jazan</td>
                                        <td data-sort-value="1404997" data-export-value="1404997"><span class="nds-number-format">1404997</span></td>
                                        <td data-sort-value="4.4">4.4</td>
                                        <td data-sort-value="11671" data-export-value="11671"><span class="nds-number-format">11671</span></td>
                                    </tr>
                                    <tr>
                                        <td>Qassim</td>
                                        <td data-sort-value="1336179" data-export-value="1336179"><span class="nds-number-format">1336179</span></td>
                                        <td data-sort-value="4.2">4.2</td>
                                        <td data-sort-value="58046" data-export-value="58046"><span class="nds-number-format">58046</span></td>
                                    </tr>
                                    <tr>
                                        <td>Tabuk</td>
                                        <td data-sort-value="886036" data-export-value="886036"><span class="nds-number-format">886036</span></td>
                                        <td data-sort-value="2.8">2.8</td>
                                        <td data-sort-value="146072" data-export-value="146072"><span class="nds-number-format">146072</span></td>
                                    </tr>
                                    <tr>
                                        <td>Hail</td>
                                        <td data-sort-value="746406" data-export-value="746406"><span class="nds-number-format">746406</span></td>
                                        <td data-sort-value="2.3">2.3</td>
                                        <td data-sort-value="103887" data-export-value="103887"><span class="nds-number-format">103887</span></td>
                                    </tr>
                                    <tr>
                                        <td>Al Jouf</td>
                                        <td data-sort-value="595822" data-export-value="595822"><span class="nds-number-format">595822</span></td>
                                        <td data-sort-value="1.9">1.9</td>
                                        <td data-sort-value="100212" data-export-value="100212"><span class="nds-number-format">100212</span></td>
                                    </tr>
                                    <tr>
                                        <td>Najran</td>
                                        <td data-sort-value="592300" data-export-value="592300"><span class="nds-number-format">592300</span></td>
                                        <td data-sort-value="1.8">1.8</td>
                                        <td data-sort-value="149511" data-export-value="149511"><span class="nds-number-format">149511</span></td>
                                    </tr>
                                    <tr>
                                        <td>Northern Borders</td>
                                        <td data-sort-value="373577" data-export-value="373577"><span class="nds-number-format">373577</span></td>
                                        <td data-sort-value="1.2">1.2</td>
                                        <td data-sort-value="111797" data-export-value="111797"><span class="nds-number-format">111797</span></td>
                                    </tr>
                                    <tr>
                                        <td>Al Baha</td>
                                        <td data-sort-value="339174" data-export-value="339174"><span class="nds-number-format">339174</span></td>
                                        <td data-sort-value="1.1">1.1</td>
                                        <td data-sort-value="9921" data-export-value="9921"><span class="nds-number-format">9921</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="nds-tab-panel" role="tabpanel" id="od-panel-chart" aria-labelledby="od-tab-chart" tabindex="-1" hidden>
                                <!-- Drawn from the table by the script below -->
                                <div id="od-chart" class="nds-chart" aria-label="Population of each region, 2022 census"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nds-section-wrapper nds-block">
                <div class="nds-section-head">
                    <h2 class="nds-section-title">Columns</h2>
                </div>
                <div class="nds-section-body">
                    <table class="nds-table nds-compact">
                        <thead>
                            <tr>
                                <th>Column</th>
                                <th>Type</th>
                                <th>Meaning</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code class="nds-inline-code lang-json">region</code></td>
                                <td>Text</td>
                                <td>The region's name, in English</td>
                            </tr>
                            <tr>
                                <td><code class="nds-inline-code lang-json">population</code></td>
                                <td>Number</td>
                                <td>The people counted in the region in the 2022 census</td>
                            </tr>
                            <tr>
                                <td><code class="nds-inline-code lang-json">share</code></td>
                                <td>Number</td>
                                <td>The region's part of the national total, in percent, to one decimal</td>
                            </tr>
                            <tr>
                                <td><code class="nds-inline-code lang-json">area_km2</code></td>
                                <td>Number</td>
                                <td>The land area, in square kilometres</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="nds-section-wrapper nds-block">
                <div class="nds-section-head">
                    <h2 class="nds-section-title">Use the API</h2>
                    <p class="nds-section-description">Read the rows as JSON. No key is needed, up to 1,000 requests an hour.</p>
                </div>
                <div class="nds-section-body">
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Code language" data-i18n-aria-label="code.code_language">
                                <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="od-code-curl" id="od-code-tab-curl" tabindex="0">
                                    <span class="nds-label">cURL</span>
                                </button>
                                <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="od-code-js" id="od-code-tab-js" tabindex="-1">
                                    <span class="nds-label">JavaScript</span>
                                </button>
                                <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="od-code-answer" id="od-code-tab-answer" tabindex="-1">
                                    <span class="nds-label">Answer</span>
                                </button>
                            </nav>
                            <button type="button" class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more" data-i18n-aria-label="scroll-more.show_more">
                                <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel" role="tabpanel" id="od-code-curl" aria-labelledby="od-code-tab-curl" tabindex="0">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy nds-icon-only" aria-label="Copy code" data-i18n-aria-label="copy.copy_code">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-bash">
curl "https://data.example.gov.sa/api/population-by-region?sort=-population&limit=3"</code>
                            </div>
                            <div class="nds-tab-panel" role="tabpanel" id="od-code-js" aria-labelledby="od-code-tab-js" tabindex="-1" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy nds-icon-only" aria-label="Copy code" data-i18n-aria-label="copy.copy_code">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-js">
const url = 'https://data.example.gov.sa/api/population-by-region?sort=-population&amp;limit=3';
const response = await fetch(url);
const { rows } = await response.json();
console.log(rows[0].region, rows[0].population);</code>
                            </div>
                            <div class="nds-tab-panel" role="tabpanel" id="od-code-answer" aria-labelledby="od-code-tab-answer" tabindex="-1" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy nds-icon-only" aria-label="Copy code" data-i18n-aria-label="copy.copy_code">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-json">
{
  "total": 13,
  "rows": [
    { "region": "Riyadh", "population": 8591748, "share": 26.7, "area_km2": 404240 },
    { "region": "Makkah", "population": 8021463, "share": 24.9, "area_km2": 153128 },
    { "region": "Eastern Province", "population": 5125254, "share": 15.9, "area_km2": 672522 }
  ]
}</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nds-section-wrapper nds-block">
                <div class="nds-section-head">
                    <h2 class="nds-section-title">Files</h2>
                </div>
                <div class="nds-section-body">
                    <table class="nds-table nds-compact">
                        <thead>
                            <tr>
                                <th>File</th>
                                <th data-align="center">Format</th>
                                <th data-align="end">Size</th>
                                <th class="nds-actions-column">Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>population-by-region.csv</td>
                                <td><span class="nds-tag nds-sm"><span class="nds-label">CSV</span></span></td>
                                <td>1 KB</td>
                                <td class="nds-actions-column">
                                    <a href="#" class="nds-btn nds-subtle nds-sm nds-icon-only" aria-label="Download population-by-region.csv" download>
                                        <i class="nds-icon nds-hgi-download-04" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>population-by-region.json</td>
                                <td><span class="nds-tag nds-sm"><span class="nds-label">JSON</span></span></td>
                                <td>2 KB</td>
                                <td class="nds-actions-column">
                                    <a href="#" class="nds-btn nds-subtle nds-sm nds-icon-only" aria-label="Download population-by-region.json" download>
                                        <i class="nds-icon nds-hgi-download-04" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>census-2022-method.pdf</td>
                                <td><span class="nds-tag nds-sm"><span class="nds-label">PDF</span></span></td>
                                <td>840 KB</td>
                                <td class="nds-actions-column">
                                    <a href="#" class="nds-btn nds-subtle nds-sm nds-icon-only" aria-label="Download census-2022-method.pdf" download>
                                        <i class="nds-icon nds-hgi-download-04" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <aside class="nds-sideinfo nds-sticky nds-top" aria-label="Dataset facts">
            <div class="nds-card nds-stroke nds-shadow">
                <dl class="nds-definition-list">
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-building-02" aria-hidden="true"></i>
                            <span class="nds-label">Publisher</span>
                        </dt>
                        <dd>National Statistics Center</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-folder-01" aria-hidden="true"></i>
                            <span class="nds-label">Category</span>
                        </dt>
                        <dd>Population</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                            <span class="nds-label">Last updated</span>
                        </dt>
                        <dd>31 May 2023</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-refresh" aria-hidden="true"></i>
                            <span class="nds-label">Updates</span>
                        </dt>
                        <dd>With each census</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-license" aria-hidden="true"></i>
                            <span class="nds-label">Licence</span>
                        </dt>
                        <dd>Open Data Licence: free to use, also for profit, with the source named</dd>
                    </div>
                </dl>
                <div class="nds-card-actions">
                    <a href="#" class="nds-btn nds-primary nds-full" download>
                        <i class="nds-icon nds-hgi-download-04" aria-hidden="true"></i>
                        <span class="nds-label">Download CSV</span>
                    </a>
                </div>
            </div>
        </aside>
    </div>
</section>

<script>
  function initPage() {
    // The chart reads the table, so both views show the same rows
    var rows = Array.prototype.slice.call(document.querySelectorAll('#od-table tbody tr'));
    NDS.Chart.create('#od-chart', {
      type: 'bar',
      series: [{ name: 'Population', data: rows.map(function (row) { return Number(row.cells[1].getAttribute('data-export-value')); }) }],
      labels: rows.map(function (row) { return row.cells[0].textContent; }),
      legend: { show: false },
      yaxis: { title: 'People' }
    });
  }
  // Runs on a classic load AND when this markup is injected after load (SPA, Turbo, htmx)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage); else initPage();
</script>
