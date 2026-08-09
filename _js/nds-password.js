/* NDS.Password — public surface
 * Rides: nds-forms (setCustomValidity gates submit; soft. .nds-toggle-password is
 *        wired by Forms — see initPasswordToggle. This component only owns rules + match.)
 * Methods:
 *   NDS.Password.init() / .reinit()   scan + wire every .nds-password container
 *   NDS.Password.create(el)           wire one — pass the .nds-form-container
 *   NDS.Password.destroy(el)          tear one down
 *   NDS.Password.check(el)            recompute rules/match now
 *   NDS.Password.addRule(name, test)  register a custom rule — test(value, ctx)
 *                                     returns bool (ctx.minLength available); chips
 *                                     with that data-rule name then count like the
 *                                     built-ins and gate submit
 *   instance.getStrength()            → last computed {strength, allPass, rules:{name:bool}}
 *                                     (no recompute, no event — check() forces one)
 * Events (bubble from the .nds-form-container):
 *   nds:password:change   detail {strength, allPass, rules} — every input event. The
 *                         raw value is deliberately absent; a listener that needs it
 *                         reads the container's input.
 * Hooks:
 *   .nds-password                on .nds-form-container (opt-in marker)
 *   minlength (on the input)     length rule threshold — the native HTML attribute
 *                                (default 8). The browser enforces it natively too,
 *                                so length gates even with this JS absent.
 *   data-password-match          selector for the source input (confirm mode)
 *   [data-rule="length|upper|lower|digit|special"]   on feedback chips inside the
 *                                container's feedback area — data-status is toggled
 *                                neutral/success/error per keystroke
 *   data-rule-pattern            on a chip: regex the value must fully satisfy — makes
 *                                any data-rule name a rule with no JS. Wins over a
 *                                built-in name; an invalid regex warns and the chip
 *                                goes inert.
 *   data-password-strength       stamped on the container per check (count of passing
 *                                rules) — the CSS hook for a strength meter
 * Gotchas:
 *   - strength = the count of PASSING rule chips authored in the markup, so it ranges
 *     0..N. Ship all five chips for a 0..5 score; ship two for 0..2.
 *   - A chip whose data-rule is neither built-in, patterned, nor addRule-registered is
 *     inert: stays neutral, not counted, no gate. Rules resolve per keystroke, so a
 *     late addRule() activates its chips on the next input — no rewire needed.
 *   - Match mode resolves data-password-match at init. A source input that hydrates
 *     later needs a NDS.Password.reinit() (or a targeted create() on the confirm
 *     container).
 *   - Rules and match on the SAME container are allowed but unusual: the rules message
 *     wins the customValidity slot when both would fire.
 */
(function () {
    'use strict';

    // Rule tests. length reads the input's native minlength attr (default 8).
    // The five industry defaults; consumers extend via addRule() or a chip's
    // data-rule-pattern.
    var RULES = {
        length:  function (v, ctx) { return v.length >= ctx.minLength; },
        upper:   function (v) { return /[A-Z]/.test(v); },
        lower:   function (v) { return /[a-z]/.test(v); },
        digit:   function (v) { return /[0-9]/.test(v); },
        special: function (v) { return /[^A-Za-z0-9]/.test(v); }
    };

    // A chip's test: data-rule-pattern (compiled once, cached on the chip) wins,
    // else the RULES entry (built-in or addRule-registered). null = inert chip.
    function resolveTest(chip) {
        var pattern = chip.getAttribute('data-rule-pattern');
        if (pattern) {
            if (chip._ndsRuleTest === undefined) {
                try {
                    var re = new RegExp(pattern);
                    chip._ndsRuleTest = function (v) { return re.test(v); };
                } catch (e) {
                    console.warn('NDS Password: invalid data-rule-pattern', chip);
                    chip._ndsRuleTest = null;
                }
            }
            return chip._ndsRuleTest;
        }
        return RULES[chip.getAttribute('data-rule')] || null;
    }

    var STRINGS = {
        en: { weak: 'This password does not meet the rules', mismatch: 'The two passwords do not match' },
        ar: { weak: 'كلمة المرور لا تستوفي الشروط', mismatch: 'كلمتا المرور غير متطابقتين' }
    };
    var S = function () { return STRINGS[NDS.langKey]; };

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

            // Native attribute — the browser enforces it too, so the length rule
            // still gates before this JS loads (or with it deleted).
            this.minLength = parseInt(this.input.getAttribute('minlength'), 10) || 8;
            // Keep every authored chip — tests resolve per check, so a rule
            // registered after init (addRule) activates its chips on the next input.
            this.ruleChips = Array.from(container.querySelectorAll('[data-rule]'));

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
            var active = 0;
            var results = {};
            var ctx = { minLength: this.minLength };

            this.ruleChips.forEach(function (chip) {
                var test = resolveTest(chip);
                if (!test) return; // inert — stays neutral, never counted
                var pass = test(value, ctx);
                active += 1;
                results[chip.getAttribute('data-rule')] = pass;
                // No paint until the user has typed something — a rule chip
                // reads as neutral guidance while the field is empty.
                chip.dataset.status = !value ? 'neutral' : (pass ? 'success' : 'error');
                if (pass) passing += 1;
            });

            var allPass = active === 0 || passing === active;
            if (active) this.container.setAttribute('data-password-strength', passing);

            // customValidity precedence: rules first (specific, per-field), then match.
            // Match error only fires when BOTH fields have text — an empty confirm
            // must not show mismatch. Rules message wins if both are set.
            var msg = '';
            if (!allPass && value) {
                msg = S().weak;
            } else if (this.matchSource && value && this.matchSource.value && this.matchSource.value !== value) {
                msg = S().mismatch;
            }
            this.input.setCustomValidity(msg);

            // No raw value in the detail — a listener that needs it reads the input.
            this.last = { strength: passing, allPass: allPass, rules: results };
            this.container.dispatchEvent(new CustomEvent('nds:password:change', {
                detail: this.last,
                bubbles: true
            }));
            return this.last;
        }

        getStrength() { return this.last; }

        destroy() {
            if (this.abortController) { this.abortController.abort(); this.abortController = null; }
            // Lift the submit gate and repaint chips — a stale customValidity
            // has no owner left to clear it and would block the form forever.
            this.input.setCustomValidity('');
            this.ruleChips.forEach(function (chip) { chip.dataset.status = 'neutral'; });
            this.container.removeAttribute('data-password-strength');
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
        check: function (element) { return element.ndsPassword ? element.ndsPassword.check() : null; },
        addRule: function (name, test) { RULES[name] = test; }
    };
})();
