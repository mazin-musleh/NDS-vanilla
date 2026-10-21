/* NDS.Password — public surface
 * Rides: nds-forms (setCustomValidity gates submit; soft. .nds-toggle-password is
 *        wired by Forms — see initPasswordToggle. This component only owns rules + match.)
 * Requires:
 *   .nds-password needs [data-rule], [data-password-match] — no rule is checked
 * Methods:
 *   NDS.Password.init() / .reinit()   scan + wire every .nds-password container
 *   NDS.Password.create(el)           wire one — pass the .nds-form-container
 *   NDS.Password.destroy(el)          tear one down
 *   NDS.Password.check(el)            recompute rules/match now
 *   NDS.Password.addRule(name, test)  register a custom rule — test(value, ctx)
 *                                     returns bool (ctx.minLength, ctx.matchValue
 *                                     available); chips with that data-rule name then
 *                                     count like the built-ins and gate submit
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
 *   .nds-password-rules          wrapper holding the rule chips, INSIDE the
 *                                [data-feedback-target] footer. Chips carry
 *                                data-permanent, so Forms hides them while a
 *                                validation message holds that slot and restores
 *                                them once it clears — message and rules never
 *                                show at once. A chip under the error outline is
 *                                always success or error itself, never neutral.
 *   [data-rule="length|upper|lower|digit|special|match"]   on feedback chips inside
 *                                the container — data-status is toggled
 *                                neutral/success/error per keystroke. "match" needs
 *                                data-password-match on the container.
 *   data-rule-pattern            on a chip: regex the value must match — makes any
 *                                data-rule name a rule with no JS. Unanchored, so it
 *                                matches anywhere in the value; anchor ^…$ for a
 *                                whole-value rule. Wins over a built-in name; an
 *                                invalid regex warns and the chip goes inert.
 *   .nds-password-status         optional visually-hidden live region — receives
 *                                "N of M rules met" (or the error) on a 500ms debounce.
 *                                A screen reader hears progress without the whole chip
 *                                list being re-read per keystroke. Point the input's
 *                                aria-describedby at .nds-password-rules so the rules
 *                                themselves are read on focus.
 *   data-password-strength       stamped on the container per check (count of passing
 *                                rules) — the CSS hook for a strength meter
 * Gotchas:
 *   - strength = the count of PASSING rule chips authored in the markup, so it ranges
 *     0..N. Ship all five chips for a 0..5 score; ship two for 0..2. An empty field
 *     scores 0 and reports allPass:false — no rule passes on an empty value, so a
 *     meter reads empty at rest and the count always equals the green chips.
 *   - A chip whose data-rule is neither built-in, patterned, nor addRule-registered is
 *     inert: stays neutral, not counted, no gate. Rules resolve per keystroke, so a
 *     late addRule() activates its chips on the next input — no rewire needed.
 *   - Match mode resolves data-password-match at init. A source input that hydrates
 *     later needs destroy() then create() on the confirm container — reinit() and
 *     create() skip a container that already started.
 *   - allPass is false on an empty field and on a mismatch, chips or not.
 *   - A failing chip blocks the submit with a blank customValidity, so Forms outlines the
 *     field and the red chips stay in view. Only a match-only field (no match chip) shows
 *     the mismatch message.
 */
(function () {
    'use strict';

    // Rule tests. length reads the input's native minlength attr (default 8);
    // match compares against the data-password-match source. Consumers extend via
    // addRule() or a chip's data-rule-pattern.
    // Null prototype: a chip named "toString"/"constructor" must resolve to nothing,
    // not to an inherited Object method — those return truthy and would pass always.
    var RULES = Object.assign(Object.create(null), {
        length:  function (value, context) { return value.length >= context.minLength; },
        upper:   function (value) { return /[A-Z]/.test(value); },
        lower:   function (value) { return /[a-z]/.test(value); },
        digit:   function (value) { return /[0-9]/.test(value); },
        special: function (value) { return /[^A-Za-z0-9]/.test(value); },
        match:   function (value, context) { return context.matchValue !== null && value === context.matchValue; }
    });

    // A chip's test: data-rule-pattern (compiled once, cached on the chip) wins,
    // else the RULES entry (built-in or addRule-registered). null = inert chip.
    function resolveTest(chip) {
        var pattern = chip.getAttribute('data-rule-pattern');
        if (pattern) {
            if (chip._ndsRuleTest === undefined) {
                try {
                    var re = new RegExp(pattern);
                    chip._ndsRuleTest = function (value) { return re.test(value); };
                } catch (e) {
                    console.warn('NDS Password: invalid data-rule-pattern', chip);
                    chip._ndsRuleTest = null;
                }
            }
            return chip._ndsRuleTest;
        }
        return RULES[chip.getAttribute('data-rule')] || null;
    }

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    var strings = NDS.i18n.strings('password', {
        mismatch: 'The two passwords do not match',
        met: '{n} of {total} password rules met',
    });

    class NdsPassword {
        constructor(container) {
            this._container = container;
            // Success signal — init() only runs (and registers container.ndsPassword)
            // when construction succeeds, so a bail below never hands consumers a
            // half-built instance.
            this._valid = false;
            if (container.hasAttribute('data-nds-password-initialized')) return;

            this._input = container.querySelector('.nds-form-control > input[type="password"], .nds-form-control > input[type="text"]');
            if (!this._input) {
                console.warn('NDS Password: no password input in', container);
                return;
            }

            // Native attribute — the browser enforces it too, so the length rule
            // still gates before this JS loads (or with it deleted).
            this.minLength = parseInt(this._input.getAttribute('minlength'), 10) || 8;
            // Keep every authored chip — tests resolve per check, so a rule
            // registered after init (addRule) activates its chips on the next input.
            this._ruleChips = Array.from(container.querySelectorAll('[data-rule]'));

            this._matchSelector = container.getAttribute('data-password-match') || '';
            this._matchSource = this._matchSelector ? document.querySelector(this._matchSelector) : null;
            if (this._matchSelector && !this._matchSource) {
                console.warn('NDS Password: data-password-match "' + this._matchSelector + '" resolved nothing', container);
            }

            // Silent no-op when the container carries the marker but neither
            // rules nor a match target — the toggle/clear buttons come from
            // Forms, so Password has nothing to do.
            if (!this._ruleChips.length && !this._matchSource) return;

            this.abortController = new AbortController();

            this._statusElement = container.querySelector('.nds-password-status');
            if (this._statusElement) {
                var self = this;
                // Debounced: a polite live region rewritten on every keystroke queues
                // announcements instead of replacing them. destroy() cancels a pending one.
                this._announce = NDS.debounce(function (text) {
                    self._statusElement.textContent = text;
                }, 500);
            }

            this.init();
            this._valid = true;
        }

        init() {
            var signal = this.abortController.signal;
            var self = this;

            this._input.addEventListener('input', function () { self.check(); }, { signal: signal });
            // A form reset changes the value without an input event.
            if (this._input.form) this._input.form.addEventListener('reset', function (e) {
                setTimeout(function () { if (!e.defaultPrevented && self.abortController) self.check(); });
            }, { signal: signal });

            // Match mode: an input on the SOURCE (the first password) must
            // re-check the confirm field too. Same-tab typing order is
            // source → confirm; without this, a confirm chip lingers on "pass"
            // when the user edits the source afterwards.
            if (this._matchSource) {
                this._matchSource.addEventListener('input', function () { self.check(); }, { signal: signal });
            }

            this._container.ndsPassword = this;
            this._container.setAttribute('data-nds-password-initialized', 'true');

            // First paint: reflect the current value (a pre-filled form should show
            // its rule status without waiting for a keystroke — browser autofill
            // does not fire input events reliably, but a server-rendered value does
            // need this pass).
            this.check();
        }

        check() {
            var value = this._input.value;
            var passing = 0;
            var active = 0;
            var results = {};
            // null when this container has no match source — the match rule reads it
            // to tell "no source wired" apart from "source is empty".
            var matchValue = this._matchSource ? this._matchSource.value : null;
            var context = { minLength: this.minLength, matchValue: matchValue };

            this._ruleChips.forEach(function (chip) {
                var test = resolveTest(chip);
                if (!test) return; // inert — stays neutral, never counted
                // An empty field demonstrates nothing, so no rule passes on it —
                // without this guard a rule that tolerates "" (match against an
                // empty source, or any consumer pattern using *) would count
                // toward strength while its chip painted neutral.
                var pass = !!value && test(value, context);
                active += 1;
                results[chip.getAttribute('data-rule')] = pass;
                // No paint until the user has typed something — a rule chip
                // reads as neutral guidance while the field is empty.
                NDS.status.set(chip, !value ? 'neutral' : (pass ? 'success' : 'error'));
                if (pass) passing += 1;
            });

            // Same condition the match rule tests, so chip and message never disagree.
            var mismatched = matchValue !== null && matchValue !== value;
            // A match-only field has no chips to count, so the mismatch decides it.
            var allPass = !!value && !mismatched && passing === active;
            if (active) this._container.setAttribute('data-password-strength', passing);

            // A red chip already names the cause, so the block is blank (' ': Forms shows no
            // message). Only a mismatch with no match chip needs words.
            // Nothing fires on an empty field: required owns that message.
            var message = '';
            if (value && !allPass) message = mismatched && !('match' in results) ? strings.text('mismatch') : ' ';
            this._input.setCustomValidity(message);

            // Announce the error, else progress. Empty field says nothing — otherwise
            // every page load would announce "0 of 6 rules met".
            if (this._statusElement) {
                this._announce(value ? (message.trim() || (active ? strings.text('met', { n: passing, total: active }) : '')) : '');
            }

            // No raw value in the detail — a listener that needs it reads the input.
            this._last = { strength: passing, allPass: allPass, rules: results };
            this._container.dispatchEvent(new CustomEvent('nds:password:change', {
                detail: this._last,
                bubbles: true
            }));
            return this._last;
        }

        getStrength() { return this._last; }

        destroy() {
            if (this.abortController) { this.abortController.abort(); this.abortController = null; }
            if (this._announce) this._announce.cancel();
            // Lift the submit gate and repaint chips — a stale customValidity
            // has no owner left to clear it and would block the form forever.
            this._input.setCustomValidity('');
            this._ruleChips.forEach(function (chip) { NDS.status.set(chip, 'neutral'); });
            if (this._statusElement) this._statusElement.textContent = '';
            this._container.removeAttribute('data-password-strength');
            this._container.removeAttribute('data-nds-password-initialized');
            this._container.ndsPassword = null;
        }
    }

    function setupPasswords() {
        document.querySelectorAll('.nds-form-container.nds-password').forEach(function (el) {
            if (el.closest('code')) return;
            if (el.hasAttribute('data-nds-password-initialized')) return;
            new NdsPassword(el);
        });
    }

    NDS.Password = {
        init: setupPasswords,
        reinit: setupPasswords,
        create: function (element) {
            if (element.ndsPassword) return element.ndsPassword;
            var instance = new NdsPassword(element);
            return instance._valid ? instance : null;
        },
        destroy: function (element) { if (element.ndsPassword) element.ndsPassword.destroy(); },
        check: function (element) { return element.ndsPassword ? element.ndsPassword.check() : null; },
        addRule: function (name, test) { RULES[name] = test; }
    };
})();
