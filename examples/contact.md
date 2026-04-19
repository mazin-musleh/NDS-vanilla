---
layout: page
layout_class: nds-wSideInfo
title: Contact us
hero_style: "nds-aside"
hero_title: Contact us
hero_description: Service description example To buy a plot to build your house, this requires documenting the sale and purchase process in the notarial offices or notary services to register the property in your name.
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
sidemenu_mode: false
---
<section id="contactForm" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <div class="nds-info-content">
            <form id="contact-form" class="nds-form" data-ajax>
                <div class="nds-grid" style="--max-col:2;--mid-col:2;--min-col:1;--row-gap: var(--spacing-xl);">

                    <!-- First Name -->
                    <div class="nds-form-container" data-required>
                        <div class="nds-form-header">
                            <label for="contact-first-name">
                                <span class="nds-label">First Name</span>
                            </label>
                        </div>
                        <div class="nds-form-control">
                            <input type="text" id="contact-first-name" name="firstName" class="nds-input"
                                placeholder="Type your first name" autocomplete="given-name" required>
                            <div class="nds-form-action">
                                <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div class="nds-form-footer" data-feedback-target hidden></div>
                    </div>

                    <!-- Last Name -->
                    <div class="nds-form-container" data-required>
                        <div class="nds-form-header">
                            <label for="contact-last-name">
                                <span class="nds-label">Last Name</span>
                            </label>
                        </div>
                        <div class="nds-form-control">
                            <input type="text" id="contact-last-name" name="lastName" class="nds-input"
                                placeholder="Type your last name" autocomplete="family-name" required>
                            <div class="nds-form-action">
                                <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div class="nds-form-footer" data-feedback-target hidden></div>
                    </div>

                    <!-- Email -->
                    <div class="nds-form-container" data-required>
                        <div class="nds-form-header">
                            <label for="contact-email">
                                <span class="nds-label">Email</span>
                            </label>
                        </div>
                        <div class="nds-form-control">
                            <input type="email" id="contact-email" name="email" class="nds-input"
                                placeholder="name@example.gov.sa" autocomplete="email" required>
                            <div class="nds-form-action">
                                <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div class="nds-form-footer" data-feedback-target hidden></div>
                    </div>

                    <!-- Phone with country code prefix -->
                    <div class="nds-form-container" data-required>
                        <div class="nds-form-header">
                            <label for="contact-phone">
                                <span class="nds-label">Phone</span>
                            </label>
                        </div>
                        <div class="nds-form-control">
                            <div class="nds-form-action nds-prefix nds-dropmenu" data-select-name="country-code" data-select-value="+966">
                                <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">+966</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <!-- GCC — home region first -->
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+966" data-trigger-label="+966">
                                            <span class="nds-label">Saudi Arabia (+966)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+971" data-trigger-label="+971">
                                            <span class="nds-label">United Arab Emirates (+971)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+973" data-trigger-label="+973">
                                            <span class="nds-label">Bahrain (+973)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+974" data-trigger-label="+974">
                                            <span class="nds-label">Qatar (+974)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+965" data-trigger-label="+965">
                                            <span class="nds-label">Kuwait (+965)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+968" data-trigger-label="+968">
                                            <span class="nds-label">Oman (+968)</span>
                                        </button>
                                        <!-- Wider Arab world (alphabetical) -->
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+213" data-trigger-label="+213">
                                            <span class="nds-label">Algeria (+213)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+20" data-trigger-label="+20">
                                            <span class="nds-label">Egypt (+20)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+964" data-trigger-label="+964">
                                            <span class="nds-label">Iraq (+964)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+962" data-trigger-label="+962">
                                            <span class="nds-label">Jordan (+962)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+961" data-trigger-label="+961">
                                            <span class="nds-label">Lebanon (+961)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+218" data-trigger-label="+218">
                                            <span class="nds-label">Libya (+218)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+212" data-trigger-label="+212">
                                            <span class="nds-label">Morocco (+212)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+970" data-trigger-label="+970">
                                            <span class="nds-label">Palestine (+970)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+249" data-trigger-label="+249">
                                            <span class="nds-label">Sudan (+249)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+963" data-trigger-label="+963">
                                            <span class="nds-label">Syria (+963)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+216" data-trigger-label="+216">
                                            <span class="nds-label">Tunisia (+216)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+967" data-trigger-label="+967">
                                            <span class="nds-label">Yemen (+967)</span>
                                        </button>
                                        <!-- Major expat communities + global -->
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+880" data-trigger-label="+880">
                                            <span class="nds-label">Bangladesh (+880)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+91" data-trigger-label="+91">
                                            <span class="nds-label">India (+91)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+62" data-trigger-label="+62">
                                            <span class="nds-label">Indonesia (+62)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+977" data-trigger-label="+977">
                                            <span class="nds-label">Nepal (+977)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+92" data-trigger-label="+92">
                                            <span class="nds-label">Pakistan (+92)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+63" data-trigger-label="+63">
                                            <span class="nds-label">Philippines (+63)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+94" data-trigger-label="+94">
                                            <span class="nds-label">Sri Lanka (+94)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+90" data-trigger-label="+90">
                                            <span class="nds-label">Turkey (+90)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+44" data-trigger-label="+44">
                                            <span class="nds-label">United Kingdom (+44)</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+1" data-trigger-label="+1">
                                            <span class="nds-label">United States (+1)</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <input type="tel" id="contact-phone" name="phone" class="nds-input"
                                placeholder="00 000 0000" autocomplete="tel-national" inputmode="tel" required>
                            <div class="nds-form-action">
                                <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div class="nds-form-footer" data-feedback-target hidden></div>
                    </div>

                    <!-- Subject -->
                    <div class="nds-form-container">
                        <div class="nds-form-header">
                            <label for="contact-subject">
                                <span class="nds-label">Subject</span>
                            </label>
                        </div>
                        <div class="nds-form-control">
                            <input type="text" id="contact-subject" name="subject" class="nds-input"
                                placeholder="Type your subject">
                            <div class="nds-form-action">
                                <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div class="nds-form-footer" data-feedback-target hidden></div>
                    </div>

                    <!-- Category -->
                    <div class="nds-form-container nds-select">
                        <div class="nds-form-header">
                            <label for="contact-category">
                                <span class="nds-label">Category</span>
                            </label>
                        </div>
                        <div class="nds-form-control">
                            <input type="text" id="contact-category" class="nds-input nds-select-input"
                                placeholder="Suggestion" readonly>
                            <input type="hidden" name="category" class="nds-select-value">
                            <div class="nds-select-dropdown" hidden>
                                <div class="nds-select-options">
                                    <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="suggestion">
                                        <span class="nds-option-text">Suggestion</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="complaint">
                                        <span class="nds-option-text">Complaint</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="inquiry">
                                        <span class="nds-option-text">General Inquiry</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="technical">
                                        <span class="nds-option-text">Technical Support</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="partnership">
                                        <span class="nds-option-text">Partnership Request</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="nds-form-footer" data-feedback-target hidden></div>
                    </div>

                    <!-- How Can We Help (textarea) -->
                    <div class="nds-form-container nds-textarea">
                        <div class="nds-form-header">
                            <label for="contact-message">
                                <span class="nds-label">How Can We Help?</span>
                            </label>
                        </div>
                        <div class="nds-form-control">
                            <textarea id="contact-message" name="message" class="nds-textarea"
                                placeholder="Tell us a bit more about your request..." rows="5"></textarea>
                        </div>
                        <div class="nds-form-footer" data-feedback-target hidden></div>
                    </div>

                    <!-- Upload files (compact browse mode) -->
                    <div class="nds-form-container nds-file-upload">
                        <div class="nds-form-header">
                            <label for="contact-upload">
                                <span class="nds-label">Upload files</span>
                                <span class="nds-info">Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.</span>
                            </label>
                        </div>
                        <div class="nds-form-control">
                            <input type="file" id="contact-upload" name="attachments" multiple
                                accept=".jpg,.jpeg,.png,.pdf" class="nds-file-input">
                            <div class="nds-form-action">
                                <button type="button" class="nds-btn nds-secondary-outline nds-md nds-browse-btn">
                                    <i class="hgi hgi-stroke hgi-folder-01"></i>
                                    <span class="nds-label">Browse Files</span>
                                </button>
                            </div>
                        </div>

                        <div class="nds-file-list"></div>
                        <div class="nds-form-footer"></div>

                        <div class="nds-file-item-template" style="display: none;">
                            <div class="nds-file-item">
                                <span class="nds-feedback">
                                    <span class="nds-feedback-icon">
                                        <i class="nds-icon" aria-hidden="true"></i>
                                    </span>
                                </span>
                                <div class="nds-progress-circle" style="--progress-size: 24px; --progress-value: 0;">
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
                                        <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="3"
                                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                                    </svg>
                                    <div class="nds-progress-info">
                                        <span class="nds-progress-percentage">
                                            <span class="nds-progress-number"></span>
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-file-info">
                                    <div class="nds-file-name nds-truncate"></div>
                                    <div class="nds-file-error">
                                        <span class="nds-error-message"></span>
                                    </div>
                                </div>
                                <div class="nds-file-actions">
                                    <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only nds-remove-file" aria-label="Remove file">
                                        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-form-actions">
                    <button type="submit" class="nds-btn nds-primary nds-lg">
                        <span class="nds-label">Request permit</span>
                    </button>
                </div>
            </form>
        </div>

        <aside class="nds-sideinfo nds-card nds-stroke nds-shadow" aria-label="Contact information">
            <div class="nds-contact-group">
                <h3 class="nds-card-title">Contact Amer</h3>
                <dl class="nds-definition-list">
                    <div class="nds-definition-item">
                        <dt>
                            <i class="nds-icon nds-hgi-smart-phone-01" aria-hidden="true"></i>
                            <span class="nds-label">Phone</span>
                        </dt>
                        <dd>
                            <a href="tel:9200343222" class="nds-primary">
                                <span class="nds-label">9200343222</span>
                            </a>
                            <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only copy-btn"
                                data-copy="9200343222" aria-label="Copy phone number">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-message-01"></i>
                            <span class="nds-label">SMS</span>
                        </dt>
                        <dd>
                            <a href="sms:199099" class="nds-primary">
                                <span class="nds-label">199099</span>
                            </a>
                            <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only copy-btn"
                                data-copy="199099" aria-label="Copy SMS number">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
                            <span class="nds-label">Email</span>
                        </dt>
                        <dd>
                            <a href="mailto:help@company.sa" class="nds-primary">
                                <span class="nds-label">help@company.sa</span>
                            </a>
                            <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only copy-btn"
                                data-copy="help@company.sa" aria-label="Copy email">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-printer"></i>
                            <span class="nds-label">FAX</span>
                        </dt>
                        <dd>
                            <a href="tel:+966114346654" class="nds-primary">
                                <span class="nds-label">00966-11-434-6654</span>
                            </a>
                            <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only copy-btn"
                                data-copy="00966-11-434-6654" aria-label="Copy fax number">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="nds-icon nds-hgi-location-01" aria-hidden="true"></i>
                            <span class="nds-label">Location</span>
                        </dt>
                        <dd>
                            <a href="https://maps.google.com/?q=Riyadh" target="_blank" rel="noopener" class="nds-primary">
                                <span class="nds-label">Riyadh</span>
                            </a>
                        </dd>
                    </div>
                </dl>
            </div>

            <hr class="nds-divider">

            <div class="nds-contact-group">
                <h3 class="nds-card-title">Follow us</h3>
                <div class="nds-social-links">
                    <a href="https://x.com/" target="_blank" rel="noopener" class="nds-btn nds-subtle nds-icon-only nds-md" aria-label="Follow us on X">
                        <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="https://linkedin.com/" target="_blank" rel="noopener" class="nds-btn nds-subtle nds-icon-only nds-md" aria-label="Follow us on LinkedIn">
                        <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
                    </a>
                    <a href="https://instagram.com/" target="_blank" rel="noopener" class="nds-btn nds-subtle nds-icon-only nds-md" aria-label="Follow us on Instagram">
                        <i class="hgi hgi-stroke hgi-instagram"></i>
                    </a>
                </div>
            </div>

            <hr class="nds-divider">

            <div class="nds-contact-group">
                <h3 class="nds-card-title">Emergency contacts</h3>
                <dl class="nds-definition-list nds-tableView">
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-fire-security"></i>
                            <span class="nds-label">Civil defence</span>
                        </dt>
                        <dd>
                            <a href="tel:998" class="nds-primary">
                                <span class="nds-label">998</span>
                            </a>
                            <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only copy-btn"
                                data-copy="998" aria-label="Copy civil defence number">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-police-badge"></i>
                            <span class="nds-label">Police</span>
                        </dt>
                        <dd>
                            <a href="tel:999" class="nds-primary">
                                <span class="nds-label">999</span>
                            </a>
                            <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only copy-btn"
                                data-copy="999" aria-label="Copy police number">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-ambulance"></i>
                            <span class="nds-label">Ambulance</span>
                        </dt>
                        <dd>
                            <a href="tel:997" class="nds-primary">
                                <span class="nds-label">997</span>
                            </a>
                            <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only copy-btn"
                                data-copy="997" aria-label="Copy ambulance number">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </dd>
                    </div>
                </dl>
                <a href="#view-more" class="nds-btn nds-transparent nds-color nds-trail-icon">
                    <span class="nds-label">View more</span>
                    <i class="nds-icon nds-hgi-arrow-right-01" aria-hidden="true"></i>
                </a>
            </div>
        </aside>
    </div>
</section>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        // Submit feedback — mock a successful submission.
        var form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('nds:formValid', function (e) {
                e.preventDefault && e.preventDefault();
                if (window.NDS && NDS.Alert) {
                    NDS.Alert.create({
                        variant: 'success',
                        title: 'Request sent',
                        description: 'We will get back to you shortly.',
                        display: 'toast',
                        position: 'top',
                        duration: 3000
                    });
                }
                form.reset();
            });
        }
    });
</script>
