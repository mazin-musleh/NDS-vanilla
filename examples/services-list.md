---
layout: page
title: "Government Services"
lang: en
direction: ltr
breadcrumb:
- ["Examples", "/examples"]
hero_title: "Government Services"
hero_description: "Browse all available government digital services"
layout_class:
hideSidemenu: true
exclude_showcase: false
---

<section id="servicesList" class="nds-content-section">
    <div class="nds-section-head">
        <div class="nds-section-search nds-filter" data-filter-target="services_list_content" hidden>
            <div class="nds-form-container nds-search-box">
                <div class="nds-search-content">
                    <div class="nds-form-control">
                        <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                        <input id="filterSearch" type="text" class="nds-search-input" name="search"
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
                        <div class="nds-dropmenu-item" data-filter="most-used" data-filter-legend="Most Used"
                            data-filter-type="switch" data-no-auto-close></div>
                        <hr class="nds-dropmenu-divider nds-lg">
                        <!-- Filter by System -->
                        <div class="nds-dropmenu-item" data-filter="system" data-filter-legend="System"
                            data-filter-type="checkbox" data-no-auto-close></div>
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
        </div>
    </div>
    <div class="nds-section-content">
        <div id="services_list_content" class="nds-pagination-content nds-grid" hidden
            style="--per-page: 12; --max-col: 3; --mid-col: 2; --min-col: 1;">

            <!-- Service 1 - Identity Verification -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-user-id-verification icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Identity Verification</h3>
                        <span class="nds-card-description nds-truncate">Verify your national identity and obtain digital
                            certificates for government transactions</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Identity System</span>
                        </span>
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label" data-filter="most-used">Most Used</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 2 - Passport Renewal -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-passport icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Passport Renewal</h3>
                        <span class="nds-card-description nds-truncate">Renew your passport online with expedited
                            processing and home delivery options</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Identity System</span>
                        </span>
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label" data-filter="most-used">Most Used</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 3 - Driver's License Services -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-driving-license icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Driver's License Services</h3>
                        <span class="nds-card-description nds-truncate">Apply for new license, renew existing license,
                            or update your driving information</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Transport System</span>
                        </span>
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label" data-filter="most-used">Most Used</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 4 - Vehicle Registration -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-car-01 icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Vehicle Registration</h3>
                        <span class="nds-card-description nds-truncate">Register new vehicles, transfer ownership, or
                            renew your vehicle registration</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Transport System</span>
                        </span>
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label" data-filter="most-used">Most Used</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 5 - Birth Certificate -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-file-02 icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Birth Certificate Request</h3>
                        <span class="nds-card-description nds-truncate">Request official birth certificates and family
                            documentation online</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Civil Records System</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 6 - Health Insurance -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-health-insurance icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Health Insurance Enrollment</h3>
                        <span class="nds-card-description nds-truncate">Enroll in government health insurance plans and
                            manage your coverage</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Healthcare System</span>
                        </span>
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label" data-filter="most-used">Most Used</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 7 - Medical Appointments -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-calendar-03 icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Medical Appointment Booking</h3>
                        <span class="nds-card-description nds-truncate">Schedule appointments at government hospitals
                            and healthcare facilities</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Healthcare System</span>
                        </span>
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label" data-filter="most-used">Most Used</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 8 - Business License -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-store-01 icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Business License Application</h3>
                        <span class="nds-card-description nds-truncate">Apply for commercial licenses and business
                            permits for new ventures</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Commerce System</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 9 - Property Registration -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-building-02 icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Property Registration</h3>
                        <span class="nds-card-description nds-truncate">Register property ownership, transfers, and real
                            estate transactions</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Real Estate System</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 10 - Building Permits -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-structure-02 icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Building Permit Request</h3>
                        <span class="nds-card-description nds-truncate">Apply for construction permits and building
                            approvals for residential or commercial projects</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Real Estate System</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 11 - Tax Declaration -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-calculator icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Tax Declaration Filing</h3>
                        <span class="nds-card-description nds-truncate">Submit your annual tax returns and manage tax
                            obligations online</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Tax System</span>
                        </span>
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label" data-filter="most-used">Most Used</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 12 - VAT Registration -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-invoice-02 icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">VAT Registration</h3>
                        <span class="nds-card-description nds-truncate">Register for VAT and manage value-added tax
                            compliance for your business</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Tax System</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 13 - Education Enrollment -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-graduation-cap icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">School Enrollment</h3>
                        <span class="nds-card-description nds-truncate">Enroll children in public schools and manage
                            educational records</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Education System</span>
                        </span>
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label" data-filter="most-used">Most Used</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 14 - Certificate Authentication -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-certificate-02 icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Certificate Authentication</h3>
                        <span class="nds-card-description nds-truncate">Authenticate academic certificates and
                            professional credentials</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Education System</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 15 - Visa Application -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-passport-01 icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Visa Application</h3>
                        <span class="nds-card-description nds-truncate">Apply for entry visas for visitors, workers, or
                            family members</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Immigration System</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 16 - Work Permit -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-briefcase-01 icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Work Permit Processing</h3>
                        <span class="nds-card-description nds-truncate">Apply for work permits and employment
                            authorization for foreign workers</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Immigration System</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 17 - Court Case Filing -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-legal-01 icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Court Case Filing</h3>
                        <span class="nds-card-description nds-truncate">File legal cases and track court proceedings
                            through the judicial system</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Justice System</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 18 - Marriage Contract -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-wedding-rings icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Marriage Contract Registration</h3>
                        <span class="nds-card-description nds-truncate">Register marriage contracts and obtain official
                            marriage certificates</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Civil Records System</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 19 - Employment Certificate -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-user-multiple icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Employment Certificate</h3>
                        <span class="nds-card-description nds-truncate">Request official employment certificates and
                            salary statements</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">HR System</span>
                        </span>
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label" data-filter="most-used">Most Used</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Service 20 - Retirement Benefits -->
            <a href="{{ 'service.html' }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke hgi-security-check icon"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">Retirement Benefits Application</h3>
                        <span class="nds-card-description nds-truncate">Apply for retirement pensions and manage your
                            social security benefits</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label" data-filter="system">Social Security System</span>
                        </span>
                    </div>
                </div>
            </a>

        </div>
        <nav class="nds-pagination-nav nds-auto-pagination" aria-label="Pagination"></nav>
    </div>
</section>