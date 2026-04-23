---
layout: home
title: "National Design System for Saudi Arabia"
hero_title: "National Design System for Saudi Arabia"
hero_description: "A comprehensive design system empowering consistent, accessible, and high-performance digital
government experiences across the Kingdom."
#hero_image: assets/img/riyadhcenter.webp
hero_image_pos: 50% 10%
lang: en
direction: ltr
---


<section id="compliance" class="nds-content-section">

    <div class="nds-section-body">
        <div class="nds-user-card">
            <div class="nds-avatar nds-lg">
  <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
</div>
        <div class="nds-user-info">
            <span class="nds-user-name">Ahmed Mohammed</span>
            <span class="nds-user-role nds-truncate">System Administrator</span>
            <span class="nds-user-email">ahmed@example.gov.sa</span>
        </div>
        <hr class="nds-divider">
        <div class="nds-user-action">
            <a href="#" class="nds-btn nds-subtle nds-dropdown-item">
                <i class="nds-icon nds-hgi-identity-card" aria-hidden="true"></i>
                <span class="nds-label">Portal</span>
            </a>
            <a href="#" class="nds-btn nds-subtle nds-dropdown-item">
                <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                <span class="nds-label">Change Password</span>
            </a>
            <a href="#" class="nds-btn nds-subtle nds-dropdown-item">
                <i class="nds-icon nds-hgi-smart-phone-01" aria-hidden="true"></i>
                <span class="nds-label">Change Number</span>
            </a>
            <a href="#" class="nds-btn nds-subtle nds-destructive nds-dropdown-item" id="logoutBtn">
                <i class="nds-icon nds-hgi-door-01" aria-hidden="true"></i>
                <span class="nds-label">Logout</span>
            </a>
        </div>
    </div>
    </div>
</section>

<section id="multiselect-test" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Multiselect (smoke test)</h2>
            <p class="nds-section-description">Prefix dropmenu with grouped checkboxes + Apply/Reset; selected values mirror as removable chips inside the form-control.</p>
        </div>
        <div class="nds-section-body">
            <form action="#" method="get" onsubmit="event.preventDefault(); console.log('submit:', new URLSearchParams(new FormData(this)).toString());">
                <div class="nds-form-container nds-multiselect" data-multiselect-name="interests">
                    <div class="nds-form-header">
                        <label><span class="nds-label">Interests</span></label>
                    </div>
                    <div class="nds-form-control">
                        <div class="nds-form-action nds-prefix nds-dropmenu" data-multiselect-dropmenu>
                            <button class="nds-btn nds-subtle nds-dropmenu-trigger" type="button">
                                <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
                                <span class="nds-label">Select</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <div class="nds-dropmenu-scroll">
                                    <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close>
                                        <legend class="nds-label">Technology</legend>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label for="ms-interests-ai"><span class="nds-label">AI &amp; ML</span></label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="ms-interests-ai" class="nds-check" value="ai" data-label="AI &amp; ML">
                                            </div>
                                        </div>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label for="ms-interests-cloud"><span class="nds-label">Cloud</span></label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="ms-interests-cloud" class="nds-check" value="cloud" data-label="Cloud">
                                            </div>
                                        </div>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label for="ms-interests-security"><span class="nds-label">Cybersecurity</span></label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="ms-interests-security" class="nds-check" value="security" data-label="Cybersecurity">
                                            </div>
                                        </div>
                                    </fieldset>
                                    <hr class="nds-divider">
                                    <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close>
                                        <legend class="nds-label">Design</legend>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label for="ms-interests-ux"><span class="nds-label">UX Research</span></label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="ms-interests-ux" class="nds-check" value="ux" data-label="UX Research">
                                            </div>
                                        </div>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label for="ms-interests-brand"><span class="nds-label">Brand Identity</span></label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="ms-interests-brand" class="nds-check" value="brand" data-label="Brand Identity">
                                            </div>
                                        </div>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label for="ms-interests-motion"><span class="nds-label">Motion</span></label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="ms-interests-motion" class="nds-check" value="motion" data-label="Motion">
                                            </div>
                                        </div>
                                    </fieldset>
                                    <hr class="nds-divider">
                                    <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close>
                                        <legend class="nds-label">Operations</legend>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label for="ms-interests-devops"><span class="nds-label">DevOps</span></label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="ms-interests-devops" class="nds-check" value="devops" data-label="DevOps">
                                            </div>
                                        </div>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label for="ms-interests-data"><span class="nds-label">Data Engineering</span></label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="ms-interests-data" class="nds-check" value="data" data-label="Data Engineering">
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="nds-dropmenu-footer">
                                    <hr class="nds-divider">
                                    <div class="nds-dropmenu-action nds-grid">
                                        <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                                data-multiselect-action="reset" data-no-auto-close>
                                            <span class="nds-label">Reset</span>
                                        </button>
                                        <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                                data-multiselect-action="apply">
                                            <span class="nds-label">Apply</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="nds-chips nds-multiselect-chips" data-multiselect-chips></div>
                        <span class="nds-multiselect-placeholder">Select options&hellip;</span>
                    </div>
                </div>
                <button type="submit" class="nds-btn nds-primary" style="margin-top: 1rem;">
                    <span class="nds-label">Submit (logs to console)</span>
                </button>
            </form>
        </div>
    </div>
</section>

