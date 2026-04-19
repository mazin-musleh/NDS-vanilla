---
layout: page
layout_class: nds-wSideInfo
title: Form Template
hero_style: "nds-flat"
hero_title: Apply for a Service
hero_description: This form template is designed for multi-step forms, guiding users through various input fields while tracking their progress. It includes all essential input field types and a progress indicator, ensuring clarity and ease of use.
breadcrumb:
- ["DGA Templates", "/templates"]
lang: en
direction: ltr
sidemenu_mode: false
---
<section id="formTemplate" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">

        <div class="nds-info-content">
            <p class="nds-required-notice"><span class="nds-label">*Required information</span></p>

            <form id="form-template" class="nds-form" novalidate>

                <!-- ============================================================
                     STEP 1 — Identity Verification
                     ============================================================ -->
                <div class="nds-form" data-form-step="1">
                    <div class="nds-grid nds-form-grid" style="--min-col: 1; --max-col: 2;">

                        <div class="nds-form-container" data-required>
                            <div class="nds-form-header">
                                <label for="ft-national-id"><span class="nds-label">National ID</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="text" id="ft-national-id" name="nationalId" class="nds-input"
                                    placeholder="10-digit ID number" inputmode="numeric" pattern="[0-9]{10}"
                                    autocomplete="off" required>
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                                        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="nds-form-footer" data-feedback-target>
                                <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent>
                                    <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                    <span class="nds-feedback-message">10-digit number printed on the back of your ID card</span>
                                </span>
                            </div>
                        </div>

                        <div class="nds-form-container nds-date-picker" data-required>
                            <div class="nds-form-header">
                                <label for="ft-dob"><span class="nds-label">Date of Birth</span></label>
                            </div>
                            <div class="nds-form-control">
                                <div class="nds-form-action">
                                    <button type="button" class="nds-btn nds-subtle date-picker-toggle" aria-label="Calendar toggle">
                                        <i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <input type="text" id="ft-dob" name="dob" class="nds-input nds-date-input"
                                    placeholder="DD/MM/YYYY" autocomplete="bday"
                                    data-year-before="100" data-year-after="0" required>
                            </div>
                            <div class="nds-form-footer" data-feedback-target hidden></div>
                        </div>

                        <div class="nds-form-container" data-required>
                            <div class="nds-form-header">
                                <label for="ft-mobile"><span class="nds-label">Mobile Number</span></label>
                            </div>
                            <div class="nds-form-control">
                                <div class="nds-form-action nds-prefix">
                                    <span class="nds-btn nds-secondary"><span class="nds-label">+966</span></span>
                                </div>
                                <input type="tel" id="ft-mobile" name="mobile" class="nds-input nds-phone"
                                    placeholder="5XX XXX XXX" autocomplete="tel-national"
                                    inputmode="numeric" maxlength="9" required>
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                                        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="nds-form-footer" data-feedback-target hidden></div>
                        </div>

                        <div class="nds-form-container" data-required>
                            <div class="nds-form-header">
                                <label for="ft-otp"><span class="nds-label">SMS Verification Code</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="text" id="ft-otp" name="otp" class="nds-input"
                                    placeholder="6-digit code" inputmode="numeric" pattern="[0-9]{6}"
                                    autocomplete="one-time-code" required>
                                <div class="nds-form-action">
                                    <button type="button" class="nds-btn nds-subtle" data-otp-resend>
                                        <span class="nds-label">Resend</span>
                                    </button>
                                </div>
                            </div>
                            <div class="nds-form-footer" data-feedback-target>
                                <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent>
                                    <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                    <span class="nds-feedback-message">A code is sent to the mobile number above</span>
                                </span>
                            </div>
                        </div>

                    </div>

                    <div class="nds-form-actions">
                        <button type="button" class="nds-btn nds-primary"
                            data-stepper-control="next" data-stepper-target="formStepperVertical">
                            <span class="nds-label">Continue</span>
                        </button>
                    </div>
                </div>

                <!-- ============================================================
                     STEP 2 — Personal Information
                     ============================================================ -->
                <div class="nds-form" data-form-step="2" hidden>
                    <div class="nds-grid nds-form-grid" style="--min-col: 1; --max-col: 2;">

                        <div class="nds-form-container" data-required>
                            <div class="nds-form-header">
                                <label for="ft-first-name"><span class="nds-label">First Name</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="text" id="ft-first-name" name="firstName" class="nds-input"
                                    placeholder="As written on your ID" autocomplete="given-name" required>
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                                        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="nds-form-footer" data-feedback-target hidden></div>
                        </div>

                        <div class="nds-form-container" data-required>
                            <div class="nds-form-header">
                                <label for="ft-father-name"><span class="nds-label">Father's Name</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="text" id="ft-father-name" name="fatherName" class="nds-input"
                                    placeholder="As written on your ID" required>
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                                        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="nds-form-footer" data-feedback-target hidden></div>
                        </div>

                        <div class="nds-form-container">
                            <div class="nds-form-header">
                                <label for="ft-grandfather-name"><span class="nds-label">Grandfather's Name</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="text" id="ft-grandfather-name" name="grandfatherName" class="nds-input"
                                    placeholder="Optional">
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                                        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="nds-form-footer" data-feedback-target hidden></div>
                        </div>

                        <div class="nds-form-container" data-required>
                            <div class="nds-form-header">
                                <label for="ft-family-name"><span class="nds-label">Family Name</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="text" id="ft-family-name" name="familyName" class="nds-input"
                                    placeholder="As written on your ID" autocomplete="family-name" required>
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                                        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="nds-form-footer" data-feedback-target hidden></div>
                        </div>

                        <div class="nds-form-container" data-required>
                            <div class="nds-form-header">
                                <label for="ft-email"><span class="nds-label">Email Address</span></label>
                            </div>
                            <div class="nds-form-control">
                                <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
                                <input type="email" id="ft-email" name="email" class="nds-input"
                                    placeholder="name@example.com" autocomplete="email" required>
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                                        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="nds-form-footer" data-feedback-target hidden></div>
                        </div>

                        <div class="nds-form-container" data-required
                            data-url="{{ '/assets/data/saudi-cities.json' | relative_url }}"
                            data-name="Name" data-fetch="once" data-min-chars="1">
                            <div class="nds-form-header">
                                <label for="ft-city"><span class="nds-label">City</span></label>
                            </div>
                            <div class="nds-form-control">
                                <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                <input type="text" id="ft-city" name="city" autocomplete="on"
                                    placeholder="Type to search Saudi cities" required>
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                                        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="nds-form-footer" data-feedback-target hidden></div>
                        </div>

                        <div class="nds-form-container" data-required>
                            <div class="nds-form-header">
                                <label for="ft-district"><span class="nds-label">District</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="text" id="ft-district" name="district" class="nds-input"
                                    placeholder="Neighborhood or district" autocomplete="address-level3" required>
                            </div>
                            <div class="nds-form-footer" data-feedback-target hidden></div>
                        </div>

                        <div class="nds-form-container">
                            <div class="nds-form-header">
                                <label for="ft-postal-code"><span class="nds-label">Postal Code</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="text" id="ft-postal-code" name="postalCode" class="nds-input"
                                    placeholder="5-digit code" inputmode="numeric" pattern="[0-9]{5}"
                                    autocomplete="postal-code">
                            </div>
                            <div class="nds-form-footer" data-feedback-target hidden></div>
                        </div>

                    </div>

                    <div class="nds-form-actions">
                        <button type="button" class="nds-btn nds-secondary-outline"
                            data-stepper-control="previous" data-stepper-target="formStepperVertical">
                            <span class="nds-label">Back</span>
                        </button>
                        <button type="button" class="nds-btn nds-primary"
                            data-stepper-control="next" data-stepper-target="formStepperVertical">
                            <span class="nds-label">Continue</span>
                        </button>
                    </div>
                </div>

                <!-- ============================================================
                     STEP 3 — Review & Submit
                     ============================================================ -->
                <div class="nds-form" data-form-step="3" hidden>
                    <h2 class="nds-section-title">Review your information</h2>
                    <p class="nds-section-description">Check the details below before submitting. Use Back to make corrections.</p>

                    <dl class="nds-definition-list nds-divided" style="--row-gap: var(--spacing-md);">
                        <div class="nds-definition-item">
                            <dt><span class="nds-label">National ID</span></dt>
                            <dd data-review-source="ft-national-id">—</dd>
                        </div>
                        <div class="nds-definition-item">
                            <dt><span class="nds-label">Date of Birth</span></dt>
                            <dd data-review-source="ft-dob">—</dd>
                        </div>
                        <div class="nds-definition-item">
                            <dt><span class="nds-label">Mobile Number</span></dt>
                            <dd data-review-source="ft-mobile" data-review-prefix="+966 ">—</dd>
                        </div>
                        <div class="nds-definition-item">
                            <dt><span class="nds-label">Full Name</span></dt>
                            <dd data-review-compose="ft-first-name,ft-father-name,ft-grandfather-name,ft-family-name">—</dd>
                        </div>
                        <div class="nds-definition-item">
                            <dt><span class="nds-label">Email Address</span></dt>
                            <dd data-review-source="ft-email">—</dd>
                        </div>
                        <div class="nds-definition-item">
                            <dt><span class="nds-label">Address</span></dt>
                            <dd data-review-compose="ft-district,ft-city,ft-postal-code">—</dd>
                        </div>
                    </dl>

                    <div class="nds-form-container nds-check-container" data-required>
                        <div class="nds-form-header" data-feedback-target>
                            <label for="ft-confirm">
                                <span class="nds-label">I confirm the information above is accurate and complete.</span>
                            </label>
                        </div>
                        <div class="nds-form-control">
                            <input type="checkbox" id="ft-confirm" name="confirm" value="confirmed" class="nds-check" required>
                        </div>
                    </div>

                    <div class="nds-form-actions">
                        <button type="button" class="nds-btn nds-secondary-outline"
                            data-stepper-control="previous" data-stepper-target="formStepperVertical">
                            <span class="nds-label">Back</span>
                        </button>
                        <button type="submit" class="nds-btn nds-primary"
                            data-stepper-control="next" data-stepper-target="formStepperVertical">
                            <span class="nds-label">Submit Application</span>
                        </button>
                    </div>
                </div>

                <!-- ============================================================
                     STEP 4 — Submitted (success)
                     ============================================================ -->
                <div class="nds-form" data-form-step="4" hidden>
                    <div class="nds-card nds-stroke nds-center" style="--card-width: 100%;">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle nds-dark nds-xl nds-success">
                                    <i class="hgi hgi-stroke hgi-checkmark-circle-02"></i>
                                </span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <h2 class="nds-card-title">Application submitted</h2>
                                <p class="nds-card-description">
                                    Thank you. Your application has been received and is now being processed.
                                    You will receive an SMS update within 3 working days.
                                </p>
                                <p class="nds-card-description">
                                    Reference number: <strong id="ft-reference">—</strong>
                                </p>
                            </div>
                        </div>
                        <div class="nds-card-actions">
                            <a href="{{ '/' | relative_url }}" class="nds-btn nds-secondary-outline">
                                <span class="nds-label">Return to home</span>
                            </a>
                            <button type="button" class="nds-btn nds-primary"
                                data-stepper-control="goto" data-stepper-value="1"
                                data-stepper-target="formStepperVertical">
                                <span class="nds-label">Submit another</span>
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        </div>

        <aside class="nds-sideinfo nds-sticky nds-top nds-card nds-stroke nds-shadow" aria-label="Application progress">
            <!-- Desktop / tablet: vertical stepper -->
            <div class="nds-stepper nds-vertical nds-desktop-only"
                id="formStepperVertical" data-current="1" data-total="4">
                <div class="nds-stepper-step">
                    <div class="nds-stepper-base">
                        <div class="nds-stepper-circle" data-step-text="1"></div>
                    </div>
                    <div class="nds-stepper-content">
                        <div class="nds-stepper-text">
                            <span class="nds-stepper-title">Identity Verification</span>
                            <span class="nds-stepper-description">Confirm your National ID and OTP</span>
                        </div>
                    </div>
                </div>
                <div class="nds-stepper-step">
                    <div class="nds-stepper-base">
                        <div class="nds-stepper-circle" data-step-text="2"></div>
                    </div>
                    <div class="nds-stepper-content">
                        <div class="nds-stepper-text">
                            <span class="nds-stepper-title">Personal Information</span>
                            <span class="nds-stepper-description">Name, contact and address</span>
                        </div>
                    </div>
                </div>
                <div class="nds-stepper-step">
                    <div class="nds-stepper-base">
                        <div class="nds-stepper-circle" data-step-text="3"></div>
                    </div>
                    <div class="nds-stepper-content">
                        <div class="nds-stepper-text">
                            <span class="nds-stepper-title">Review &amp; Submit</span>
                            <span class="nds-stepper-description">Confirm details and submit</span>
                        </div>
                    </div>
                </div>
                <div class="nds-stepper-step">
                    <div class="nds-stepper-base">
                        <div class="nds-stepper-circle" data-step-text="4"></div>
                    </div>
                    <div class="nds-stepper-content">
                        <div class="nds-stepper-text">
                            <span class="nds-stepper-title">Submitted</span>
                            <span class="nds-stepper-description">Receive your reference number</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile: radial stepper -->
            <div class="nds-stepper nds-radial nds-mobile-only"
                id="formStepperRadial" data-current="1" data-total="4">
                <div class="nds-progress-circle">
                    <svg width="64" height="64" viewBox="0 0 24 24">
                        <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
                        <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="3"
                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                    </svg>
                    <div class="nds-progress-info"><span class="nds-progress-steps"></span></div>
                </div>
                <div class="nds-stepper-step">
                    <div class="nds-stepper-base">
                        <div class="nds-stepper-circle" data-step-text="1"></div>
                    </div>
                    <div class="nds-stepper-content">
                        <div class="nds-stepper-text">
                            <span class="nds-stepper-title">Identity Verification</span>
                            <span class="nds-stepper-description">Confirm your National ID and OTP</span>
                            <span class="nds-stepper-next">Next: Personal Information</span>
                        </div>
                    </div>
                </div>
                <div class="nds-stepper-step">
                    <div class="nds-stepper-base">
                        <div class="nds-stepper-circle" data-step-text="2"></div>
                    </div>
                    <div class="nds-stepper-content">
                        <div class="nds-stepper-text">
                            <span class="nds-stepper-title">Personal Information</span>
                            <span class="nds-stepper-description">Name, contact and address</span>
                            <span class="nds-stepper-next">Next: Review &amp; Submit</span>
                        </div>
                    </div>
                </div>
                <div class="nds-stepper-step">
                    <div class="nds-stepper-base">
                        <div class="nds-stepper-circle" data-step-text="3"></div>
                    </div>
                    <div class="nds-stepper-content">
                        <div class="nds-stepper-text">
                            <span class="nds-stepper-title">Review &amp; Submit</span>
                            <span class="nds-stepper-description">Confirm details and submit</span>
                            <span class="nds-stepper-next">Next: Submitted</span>
                        </div>
                    </div>
                </div>
                <div class="nds-stepper-step">
                    <div class="nds-stepper-base">
                        <div class="nds-stepper-circle" data-step-text="4"></div>
                    </div>
                    <div class="nds-stepper-content">
                        <div class="nds-stepper-text">
                            <span class="nds-stepper-title">Submitted</span>
                            <span class="nds-stepper-description">Receive your reference number</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

    </div>
</section>

<script>
    (function () {
        const vertical = document.getElementById('formStepperVertical');
        const radial = document.getElementById('formStepperRadial');
        const panels = document.querySelectorAll('[data-form-step]');

        const requiredNotice = document.querySelector('#formTemplate .nds-required-notice');

        function showPanel(step) {
            panels.forEach(p => {
                p.hidden = parseInt(p.dataset.formStep) !== step;
            });
            // The success panel has no required fields, so hide the notice there.
            if (requiredNotice) requiredNotice.hidden = step === 4;
            // Scroll the form section into view so the user sees the new panel from the top
            const main = document.querySelector('#formTemplate .nds-info-content');
            if (main) main.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function valueOf(id) {
            const el = document.getElementById(id);
            if (!el) return '';
            if (el.type === 'date' && el.value) return new Date(el.value).toLocaleDateString();
            return (el.value || '').trim();
        }

        function populateReview() {
            document.querySelectorAll('[data-review-source]').forEach(target => {
                const v = valueOf(target.dataset.reviewSource);
                const prefix = target.dataset.reviewPrefix || '';
                target.textContent = v ? prefix + v : '—';
            });
            document.querySelectorAll('[data-review-compose]').forEach(target => {
                const ids = target.dataset.reviewCompose.split(',');
                const parts = ids.map(valueOf).filter(Boolean);
                target.textContent = parts.length ? parts.join(' ') : '—';
            });
        }

        function generateReference() {
            const year = new Date().getFullYear();
            const rand = Math.floor(100000 + Math.random() * 900000);
            return 'APP-' + year + '-' + rand;
        }

        // Mirror current step to the radial stepper, switch panels, and run
        // step-specific hooks (review summary, reference number).
        // Special case: when the success panel (step 4) is reached, push the
        // vertical stepper one past totalSteps so syncStepStates() marks every
        // step (including 4) as completed. Radial caps at totalSteps internally.
        document.addEventListener('nds:stepper:change', (e) => {
            if (e.target.id !== 'formStepperVertical') return;
            const step = e.detail.currentStep;
            const panelStep = Math.min(step, 4);

            if (radial && radial.dataset.current !== String(panelStep)) {
                radial.dataset.current = String(panelStep);
            }
            showPanel(panelStep);
            if (panelStep === 3) populateReview();
            if (panelStep === 4) {
                const ref = document.getElementById('ft-reference');
                if (ref) ref.textContent = generateReference();
                if (step === 4) {
                    // Defer so we don't reenter syncStepStates mid-event.
                    // The follow-up change fires with step=5; panelStep clamps
                    // back to 4, so no recursion and the panel stays visible.
                    queueMicrotask(() => { vertical.dataset.current = '5'; });
                }
            }
        });

        // Intercept the Submit Application button so the form does not actually
        // POST — this is a static demo; the stepper-control handler still advances
        // the stepper to step 4 (success).
        const form = document.getElementById('form-template');
        if (form) form.addEventListener('submit', (e) => e.preventDefault());

        // OTP Resend flow:
        //   1. 3s loading state — simulates the network round trip
        //   2. Bottom success toast — confirms the code was sent
        //   3. 30s cooldown with live countdown in the label — prevents spam
        const RESEND_COOLDOWN_S = 30;
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-otp-resend]');
            if (!btn || btn.disabled || btn.dataset.state === 'loading') return;
            btn.dataset.state = 'loading';
            setTimeout(() => {
                delete btn.dataset.state;
                if (NDS && NDS.Alert && typeof NDS.Alert.create === 'function') {
                    NDS.Alert.create({
                        variant: 'success',
                        title: 'Verification code sent',
                        description: 'A new code has been sent to your mobile number.',
                        display: 'toast',
                        position: 'bottom',
                        duration: 4000
                    });
                }
                const labelEl = btn.querySelector('.nds-label');
                const originalLabel = labelEl ? labelEl.textContent : '';
                btn.disabled = true;
                let remaining = RESEND_COOLDOWN_S;
                if (labelEl) labelEl.textContent = `Resend in ${remaining}s`;
                const tick = setInterval(() => {
                    remaining -= 1;
                    if (remaining <= 0) {
                        clearInterval(tick);
                        btn.disabled = false;
                        if (labelEl) labelEl.textContent = originalLabel;
                    } else if (labelEl) {
                        labelEl.textContent = `Resend in ${remaining}s`;
                    }
                }, 1000);
            }, 3000);
        });
    })();
</script>
