---
exclude_showcase: true
layout: page
title: KPIs Template
hero_style: ""
hero_title: Portal & Services KPIs
hero_description: A data dashboard layout combining KPI counter tiles, pie, donut, line, and bar charts, and responsive tables to report portal traffic and service performance.
breadcrumb:
- ["DGA Templates", "/templates"]
- ["e-Participation", "/templates/e-participation-template"]
lang: en
direction: ltr
sidemenu_mode: false
---
<!-- Section 1: Portal Performance Statistics -->
<section id="portalStats" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">
                Portal Performance Statistics
                <span> (100% | 100,000)</span>
            </h2>
        </div>

        <div class="nds-section-body">
            <!-- KPI tiles -->
            <div class="nds-block">
            <div class="nds-grid" style="--max-col:4; --min-col:2;">
                <div class="nds-card nds-shadow nds-statistic">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                <i class="hgi hgi-stroke hgi-user-multiple-02" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-number nds-counter-value nds-number-format nds-md" data-target="543210">0</span>
                            <p class="nds-card-description">Users</p>
                        </div>
                    </div>
                </div>
                <div class="nds-card nds-shadow nds-statistic">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                <i class="hgi hgi-stroke hgi-eye" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-number nds-counter-value nds-number-format nds-md" data-target="876543">0</span>
                            <p class="nds-card-description">Visits</p>
                        </div>
                    </div>
                </div>
                <div class="nds-card nds-shadow nds-statistic">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                <i class="hgi hgi-stroke hgi-file-01" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-number nds-counter-value nds-number-format nds-md" data-target="1234567">0</span>
                            <p class="nds-card-description">Page Views Count</p>
                        </div>
                    </div>
                </div>
                <div class="nds-card nds-shadow nds-statistic">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                <i class="hgi hgi-stroke hgi-arrow-turn-backward" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-number nds-md">42%</span>
                            <p class="nds-card-description">Bounce Rate</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <!-- 2x2 grid of pie charts -->
            <div class="nds-block">
            <div class="nds-grid" style="--max-col:2; --min-col:1;">
                <div class="nds-card nds-stroke" style="--card-width:100%;">
                    <div class="nds-card-header">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Operating Systems</span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-chart"
                            data-chart-type="pie"
                            data-chart-series='[55,25,12,8]'
                            data-chart-labels='["Windows","macOS","Linux","Other"]'
                            data-chart-config='{"height":280,"legend":{"position":"bottom"}}'></div>
                    </div>
                </div>
                <div class="nds-card nds-stroke" style="--card-width:100%;">
                    <div class="nds-card-header">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Device Types</span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-chart"
                            data-chart-type="pie"
                            data-chart-series='[42,38,15,5]'
                            data-chart-labels='["Desktop","Mobile","Tablet","Other"]'
                            data-chart-config='{"height":280,"legend":{"position":"bottom"}}'></div>
                    </div>
                </div>
                <div class="nds-card nds-stroke" style="--card-width:100%;">
                    <div class="nds-card-header">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Mobile Devices</span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-chart"
                            data-chart-type="pie"
                            data-chart-series='[48,44,6,2]'
                            data-chart-labels='["iOS","Android","Huawei","Other"]'
                            data-chart-config='{"height":280,"legend":{"position":"bottom"}}'></div>
                    </div>
                </div>
                <div class="nds-card nds-stroke" style="--card-width:100%;">
                    <div class="nds-card-header">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Browser Type</span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-chart"
                            data-chart-type="pie"
                            data-chart-series='[58,22,12,8]'
                            data-chart-labels='["Chrome","Safari","Edge","Firefox"]'
                            data-chart-config='{"height":280,"legend":{"position":"bottom"}}'></div>
                    </div>
                </div>
            </div>
            </div>

            <!-- Search terms (full width pie) -->
            <div class="nds-block">
            <div class="nds-card nds-stroke" style="--card-width:100%;">
                <div class="nds-card-header">
                    <div class="nds-card-text">
                        <span class="nds-card-title">Most Used Search Terms</span>
                        <p class="nds-card-description">(up to 10 search terms)</p>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-chart"
                        data-chart-type="pie"
                        data-chart-series='[240,198,165,130,110,95,80,65,45,30]'
                        data-chart-labels='["Admissions","Programs","Scholarships","Calendar","Library","Contact","Faculty","Research","Tuition","Events"]'
                        data-chart-config='{"height":280,"legend":{"position":"bottom"}}'></div>
                </div>
            </div>
            </div>

            <!-- Visits by Country table -->
            <div class="nds-block">
                <h3 class="nds-block-title">Visits by Country</h3>
                <table class="nds-table nds-responsive" style="--min-width:350px;">
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Visits</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Saudi Arabia</td><td>412,300</td><td>70.1%</td></tr>
                        <tr><td>Egypt</td><td>58,200</td><td>9.9%</td></tr>
                        <tr><td>UAE</td><td>31,400</td><td>5.3%</td></tr>
                        <tr><td>Pakistan</td><td>22,100</td><td>3.8%</td></tr>
                        <tr><td>Indonesia</td><td>18,900</td><td>3.2%</td></tr>
                        <tr><td>Other</td><td>45,100</td><td>7.7%</td></tr>
                    </tbody>
                </table>
            </div>

            <!-- Visits by City table -->
            <div class="nds-block">
                <h3 class="nds-block-title">Visits by City</h3>
                <table class="nds-table nds-responsive" style="--min-width:350px;">
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Visits</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Madinah</td><td>215,400</td><td>36.6%</td></tr>
                        <tr><td>Riyadh</td><td>142,800</td><td>24.3%</td></tr>
                        <tr><td>Jeddah</td><td>88,600</td><td>15.0%</td></tr>
                        <tr><td>Makkah</td><td>54,300</td><td>9.2%</td></tr>
                        <tr><td>Dammam</td><td>41,200</td><td>7.0%</td></tr>
                        <tr><td>Other</td><td>45,700</td><td>7.9%</td></tr>
                    </tbody>
                </table>
            </div>

            <!-- Most visited pages (line chart) -->
            <div class="nds-block">
            <div class="nds-card nds-stroke" style="--card-width:100%;">
                <div class="nds-card-header">
                    <div class="nds-card-text">
                        <span class="nds-card-title">Most Visited Pages</span>
                        <p class="nds-card-description">(up to 10 pages)</p>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-chart"
                        data-chart-type="line"
                        data-chart-series='[{"name":"Home","data":[620,650,700,720,760,780,800,790,770,760,740,730]},{"name":"Admissions","data":[430,460,480,520,540,560,580,590,600,580,560,540]},{"name":"Programs","data":[310,330,360,380,400,420,440,450,440,430,410,390]}]'
                        data-chart-labels='["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]'
                        data-chart-config='{"height":320,"line":{"smooth":true,"dots":false}}'></div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Section 2: Visitor Feedback -->
<section id="feedback" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Visitor Feedback for Platform User Satisfaction</h2>
            <p class="nds-section-description">12,450 total responses from visitors during the past year (starting from January 1st).</p>
        </div>

        <div class="nds-section-body">
            <div class="nds-block">
            <div class="nds-grid" style="--max-col:2; --min-col:1;">
                <div class="nds-card nds-stroke" style="--card-width:100%;">
                    <div class="nds-card-header">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Was the page useful (59.26% | 24,313)</span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-chart"
                            data-chart-type="donut"
                            data-chart-series='[44.65,25,14,17]'
                            data-chart-labels='["Content is relevant","It was well written","The layout made it easy to read","Something else"]'
                            data-chart-config='{"height":260,"legend":{"position":"bottom"}}'></div>
                    </div>
                </div>
                <div class="nds-card nds-stroke" style="--card-width:100%;">
                    <div class="nds-card-header">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Was the page useful (59.26% | 24,313)</span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-chart"
                            data-chart-type="donut"
                            data-chart-series='[44.65,25,14,17]'
                            data-chart-labels='["Content is not relevant","Content is not accurate","Content is too long","Something else"]'
                            data-chart-config='{"height":260,"legend":{"position":"bottom"}}'></div>
                    </div>
                </div>
                <div class="nds-card nds-stroke" style="--card-width:100%;">
                    <div class="nds-card-header">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Highest Rated Content</span>
                            <p class="nds-card-description">(up to 5 pages)</p>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-chart"
                            data-chart-type="donut"
                            data-chart-series='[35,25,18,12,10]'
                            data-chart-labels='["Admissions","Scholarships","Programs","Library","Calendar"]'
                            data-chart-config='{"height":260,"legend":{"position":"bottom"}}'></div>
                    </div>
                </div>
                <div class="nds-card nds-stroke" style="--card-width:100%;">
                    <div class="nds-card-header">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Lowest Rated Content</span>
                            <p class="nds-card-description">(up to 5 pages)</p>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-chart"
                            data-chart-type="donut"
                            data-chart-series='[32,24,20,14,10]'
                            data-chart-labels='["Forms","Fees","Contact","Events","FAQ"]'
                            data-chart-config='{"height":260,"legend":{"position":"bottom"}}'></div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Section 3: Service Performance Statistics -->
<section id="serviceStats" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">
                Service Performance Statistics
                <span> (100% | 100,000)</span>
            </h2>
        </div>

        <div class="nds-section-body">
            <!-- KPI tiles -->
            <div class="nds-block">
            <div class="nds-grid" style="--max-col:4; --min-col:2;">
                <div class="nds-card nds-shadow nds-statistic">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                <i class="hgi hgi-stroke hgi-user-account" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-number nds-md">87%</span>
                            <p class="nds-card-description">User Satisfaction</p>
                        </div>
                    </div>
                </div>
                <div class="nds-card nds-shadow nds-statistic">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                <i class="hgi hgi-stroke hgi-star" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-number nds-md">92%</span>
                            <p class="nds-card-description">Completion Rate</p>
                        </div>
                    </div>
                </div>
                <div class="nds-card nds-shadow nds-statistic">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                <i class="hgi hgi-stroke hgi-percent-square" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-number nds-md">78%</span>
                            <p class="nds-card-description">Digital Percentage</p>
                        </div>
                    </div>
                </div>
                <div class="nds-card nds-shadow nds-statistic">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                <i class="hgi hgi-stroke hgi-file-edit" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-number nds-counter-value nds-number-format nds-md" data-target="458200">0</span>
                            <p class="nds-card-description">Total Transactions</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <!-- Government entity table -->
            <div class="nds-block">
                <h3 class="nds-block-title">Government Entity Name</h3>
                <table class="nds-table nds-responsive" style="--min-width:350px;">
                    <tbody>
                        <tr>
                            <th>Service Channel</th>
                            <th>Number of Services</th>
                            <th>Percentage</th>
                        </tr>
                        <tr><td>Total Number of Government Services</td><td>184</td><td>100%</td></tr>
                        <tr><td>Number of E-Government Services</td><td>142</td><td>77.2%</td></tr>
                        <tr>
                            <th>E-Government Services Maturity</th>
                            <th>Number of Services</th>
                            <th>Percentage</th>
                        </tr>
                        <tr><td>Integrative Services</td><td>38</td><td>26.8%</td></tr>
                        <tr><td>Procedural Services</td><td>44</td><td>31.0%</td></tr>
                        <tr><td>Interactive Services</td><td>35</td><td>24.6%</td></tr>
                        <tr><td>Informational Services</td><td>25</td><td>17.6%</td></tr>
                        <tr><td>Total</td><td>142</td><td>100%</td></tr>
                    </tbody>
                </table>
            </div>

            <!-- Completion rate (bar) + Transactions (line) -->
            <div class="nds-block">
            <div class="nds-grid" style="--max-col:2; --min-col:1;">
                <div class="nds-card nds-stroke" style="--card-width:100%;">
                    <div class="nds-card-header">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Completion Rate (59.26% | 24,313)</span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-chart"
                            data-chart-type="bar"
                            data-chart-series='[{"name":"Completed","data":[240,380,320,410,520,600]},{"name":"In Progress","data":[180,220,260,240,300,320]},{"name":"Pending","data":[80,120,100,110,140,150]}]'
                            data-chart-labels='["Jan","Feb","Mar","Apr","May","Jun"]'
                            data-chart-config='{"height":320,"bar":{"stacked":true,"borderRadius":4}}'></div>
                    </div>
                </div>
                <div class="nds-card nds-stroke" style="--card-width:100%;">
                    <div class="nds-card-header">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Transactions (59.26% | 24,313)</span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-chart"
                            data-chart-type="line"
                            data-chart-series='[{"name":"Channel A","data":[520,540,580,600,620,640,660,670,680,685,690,700]},{"name":"Channel B","data":[320,340,360,380,400,420,430,440,450,460,470,480]},{"name":"Channel C","data":[180,200,220,240,250,260,270,280,290,300,310,320]}]'
                            data-chart-labels='["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]'
                            data-chart-config='{"height":320,"line":{"smooth":true,"dots":false}}'></div>
                    </div>
                </div>
            </div>
            </div>

            <!-- User satisfaction (donut) + Digital acquisition (line) -->
            <div class="nds-block">
            <div class="nds-grid" style="--max-col:2; --min-col:1;">
                <div class="nds-card nds-stroke" style="--card-width:100%;">
                    <div class="nds-card-header">
                        <div class="nds-card-text">
                            <span class="nds-card-title">User Satisfaction (59.26% | 24,313)</span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-chart"
                            data-chart-type="donut"
                            data-chart-series='[38,32,18,8,4]'
                            data-chart-labels='["Excellent","Good","Average","Poor","Very Poor"]'
                            data-chart-config='{"height":260,"legend":{"position":"bottom"}}'></div>
                    </div>
                </div>
                <div class="nds-card nds-stroke" style="--card-width:100%;">
                    <div class="nds-card-header">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Digital Acquisition (59.26% | 24,313)</span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-chart"
                            data-chart-type="line"
                            data-chart-series='[{"name":"Organic","data":[320,340,360,380,400,420,440,450,460,470,480,490]},{"name":"Referral","data":[180,200,220,240,260,280,300,310,320,330,340,350]},{"name":"Direct","data":[120,140,160,180,200,220,240,250,260,270,280,290]}]'
                            data-chart-labels='["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]'
                            data-chart-config='{"height":320,"line":{"smooth":true,"dots":false}}'></div>
                    </div>
                </div>
            </div>
            </div>

            <!-- Service breakdown table -->
            <div class="nds-block">
                <h3 class="nds-block-title">Service Breakdown</h3>
                <table class="nds-table nds-responsive" style="--min-width:350px;">
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Total Transactions</th>
                            <th>Digital Acquisition</th>
                            <th>Completion Rate</th>
                            <th>User Satisfaction</th>
                            <th>Cost per Transaction (if available)</th>
                            <th>Carbon Footprint (if available)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Application Submission</td><td>124,300</td><td>82%</td><td>94%</td><td>88%</td><td>12 SAR</td><td>0.4 kg</td></tr>
                        <tr><td>Document Verification</td><td>98,200</td><td>76%</td><td>91%</td><td>85%</td><td>8 SAR</td><td>0.2 kg</td></tr>
                        <tr><td>Fee Payment</td><td>87,500</td><td>95%</td><td>98%</td><td>90%</td><td>5 SAR</td><td>0.1 kg</td></tr>
                        <tr><td>Certificate Issuance</td><td>54,300</td><td>88%</td><td>92%</td><td>86%</td><td>10 SAR</td><td>0.3 kg</td></tr>
                        <tr><td>Status Tracking</td><td>72,100</td><td>92%</td><td>97%</td><td>89%</td><td>3 SAR</td><td>0.1 kg</td></tr>
                        <tr><td>Support Request</td><td>21,800</td><td>70%</td><td>85%</td><td>78%</td><td>15 SAR</td><td>0.5 kg</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
