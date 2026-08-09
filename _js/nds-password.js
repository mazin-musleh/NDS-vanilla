/* NDS.Password — public surface
 * Rides: nds-forms (setCustomValidity gates submit; soft. .nds-toggle-password is
 *        wired by Forms — see initPasswordToggle. This component only owns rules + match.)
 * Methods:
 *   NDS.Password.init() / .reinit()   scan + wire every .nds-password container
 *   NDS.Password.create(el)           wire one — pass the .nds-form-container
 *   NDS.Password.destroy(el)          tear one down
 *   NDS.Password.check(el)            recompute rules/match now
 *   instance.getStrength()            → {score, allPass, rules:{name:bool}}
 * Events (bubble from the .nds-form-container):
 *   nds:password:change   detail {value, strength, allPass, rules} — every input event
 * Hooks:
 *   .nds-password                on .nds-form-container (opt-in marker)
 *   data-password-min-length     length rule threshold (default 8)
 *   data-password-match          selector for the source input (confirm mode)
 *   [data-rule="length|upper|lower|digit|special"]   on feedback chips inside the
 *                                container's feedback area — data-status is toggled
 *                                neutral/success/error per keystroke
 * Gotchas:
 *   - strength = the count of PASSING rule chips authored in the markup, so it ranges
 *     0..N. Ship all five chips for a 0..5 score; ship two for 0..2.
 *   - Match mode resolves data-password-match at init. A source input that hydrates
 *     later needs a NDS.Password.reinit() (or a targeted create() on the confirm
 *     container).
 *   - Rules and match on the SAME container are allowed but unusual: the rules message
 *     wins the customValidity slot when both would fire.
 */
(function () {
    'use strict';

    // Rule tests. length reads container.dataset.passwordMinLength (default 8).
    // Closed set — the five industry defaults. Consumers with a custom rule ship
    // their own chip and inspect nds:password:change.
    var RULES = {
        length:  function (v, ctx) { return v.length >= ctx.minLength; },
        upper:   function (v) { return /[A-Z]/.test(v); },
        lower:   function (v) { return /[a-z]/.test(v); },
        digit:   function (v) { return /[0-9]/.test(v); },
        special: function (v) { return /[^A-Za-z0-9]/.test(v); }
    };

    var STRINGS = {
        en: { weak: 'This password does not meet the rules', mismatch: 'The two passwords do not match' },
        ar: { weak: 'كلمة المرور لا تستوفي الشروط', mismatch: 'كلمتا المرور غير متطابقتين' }
    };
    var S = function () { return STRINGS[NDS.langKey] || STRINGS.en; };

    class NDSPassword {
        constructor(container) {
            this.container = container;
            // Success signal — init() only runs (and registers container.ndsPassword)
            // when construction succeeds, so a bail below never hands consumers a
            // half-built instance.
            this.valid = false;
            if (container.hasAttribute('data-nds-password-initialized')) return;

            this.input = container.querySelector('.nds-form-control > input[type="password"], .nds-form-control > input[type="text"]');
            if (!this.input) {
                console.warn('NDS Password: no password input in', container);
                return;
            }

            this.minLength = parseInt(container.getAttribute('data-password-min-length'), 10) || 8;
            this.ruleChips = Array.from(container.querySelectorAll('[data-rule]'))
                .filter(function (chip) { return RULES[chip.getAttribute('data-rule')]; });

            this.matchSelector = container.getAttribute('data-password-match') || '';
            this.matchSource = this.matchSelector ? document.querySelector(this.matchSelector) : null;
            if (this.matchSelector && !this.matchSource) {
                console.warn('NDS Password: data-password-match "' + this.matchSelector + '" resolved nothing', container);
            }

            // Silent no-op when the container carries the marker but neither
            // rules nor a match target — the toggle/clear buttons come from
            // Forms, so Password has nothing to do.
            if (!this.ruleChips.length && !this.matchSource) return;

            this.abortController = new AbortController();
            this.init();
            this.valid = true;
        }

        init() {
            var signal = this.abortController.signal;
            var self = this;

            this.input.addEventListener('input', function () { self.check(); }, { signal: signal });

            // Match mode: an input on the SOURCE (the first password) must
            // re-check the confirm field too. Same-tab typing order is
            // source → confirm; without this, a confirm chip lingers on "pass"
            // when the user edits the source afterwards.
            if (this.matchSource) {
                this.matchSource.addEventListener('input', function () { self.check(); }, { signal: signal });
            }

            this.container.ndsPassword = this;
            this.container.setAttribute('data-nds-password-initialized', 'true');

            // First paint: reflect the current value (a pre-filled form should show
            // its rule status without waiting for a keystroke — browser autofill
            // does not fire input events reliably, but a server-rendered value does
            // need this pass).
            this.check();
        }

        check() {
            var value = this.input.value;
            var passing = 0;
            var results = {};
            var ctx = { minLength: this.minLength };

            this.ruleChips.forEach(function (chip) {
                var name = chip.getAttribute('data-rule');
                var pass = RULES[name](value, ctx);
                results[name] = pass;
                // No paint until the user has typed something — a rule chip
                // reads as neutral guidance while the field is empty.
                chip.dataset.status = !value ? 'neutral' : (pass ? 'success' : 'error');
                if (pass) passing += 1;
            });

            var allPass = this.ruleChips.length === 0 || passing === this.ruleChips.length;

            // customValidity precedence: rules first (specific, per-field), then match.
            // Match error only fires when BOTH fields have text — an empty confirm
            // must not show mismatch. Rules message wins if both are set.
            var msg = '';
            if (this.ruleChips.length && !allPass && value) {
                msg = S().weak;
            } else if (this.matchSource && value && this.matchSource.value && this.matchSource.value !== value) {
                msg = S().mismatch;
            }
            this.input.setCustomValidity(msg);

            this.container.dispatchEvent(new CustomEvent('nds:password:change', {
                detail: { value: value, strength: passing, allPass: allPass, rules: results },
                bubbles: true
            }));
            return { score: passing, allPass: allPass, rules: results };
        }

        getStrength() { return this.check(); }

        destroy() {
            if (this.abortController) { this.abortController.abort(); this.abortController = null; }
            this.container.removeAttribute('data-nds-password-initialized');
            this.container.ndsPassword = null;
        }
    }

    function initializePasswords() {
        document.querySelectorAll('.nds-form-container.nds-password').forEach(function (el) {
            if (el.closest('code, .code-example')) return;
            if (el.hasAttribute('data-nds-password-initialized')) return;
            new NDSPassword(el);
        });
    }

    NDS.Password = {
        init: initializePasswords,
        reinit: initializePasswords,
        create: function (element) {
            if (element.ndsPassword) return element.ndsPassword;
            var inst = new NDSPassword(element);
            return inst.valid ? inst : null;
        },
        destroy: function (element) { if (element.ndsPassword) element.ndsPassword.destroy(); },
        check: function (element) { return element.ndsPassword ? element.ndsPassword.check() : null; }
    };
})();
