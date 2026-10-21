/* NDS.validation — public surface
 * Rides: (none — a base: Form calls it, components register their rules with it)
 * Methods:
 *   NDS.validation.addRule(selector, fn, opts)   a field another component owns: fn(el) → null when the
 *                                     element is not its field, else {valid, message, empty, focus, …}.
 *                                     opts: {on: [event names that re-check a field showing an error],
 *                                     owns(container): the native pass leaves that container to the rule}
 *   NDS.validation.check(el, fn?)     fn's result for el, or else the first rule that answers → result or null.
 *                                     A component's validate(el) passes its own check as fn
 *   NDS.validation.isRequired(el)     data-required or .nds-required on el
 *   NDS.validation.checkCount(field, boxes)   the checked-count check (data-min-checked /
 *                                     data-max-checked; required means at least one)
 *   NDS.validation.checkAll(form, opts)   every field in form → {invalidFields, errors: [{field, input, message}],
 *                                     passed: the rule fields that passed}; opts.extra(container, input) → a
 *                                     message the native pass adds
 *   NDS.validation.getMessage(input)  the native message for an invalid input
 *   NDS.validation.isVisible(el, form)   no [hidden] and no display:none up to form
 *   NDS.validation.rules              the registered rules, to read: {selector, fn, on, owns}
 *   NDS.validation.onRule(fn)         fn(rule) for every rule, now and as later bundles register theirs
 *   NDS.validation.isOwned(container) a rule owns the container's value: no native check, no required stamp
 * Events:
 *   (none)
 * Hooks:
 *   data-error-message   on a field: replaces the message of an empty required field
 * Gotchas:
 *   - A base: it returns results and places no message. Form shows them, sets aria-invalid and moves focus.
 *   - Rules hold functions and selectors, never elements, so the registry outlives no view.
 *   - A field answers once: to the native pass, or to the first rule that answers for it.
 *   - checkAll() reports in page order, so the first error is the first failing field from the top.
 *   - A disabled field never fails, as in native constraint validation.
 *   - A required field whose rule has not started (NDS.init.isPending) fails with "still loading":
 *     checkAll() then reports pending: true, and the caller loads what it waits for.
 */
(() => {
    'use strict';

    const strings = NDS.i18n.getStrings('validation', {
        required:       'This field is required',
        invalid:        'Invalid input',
        invalid_email:  'Please enter a valid email address',
        invalid_url:    'Please enter a valid URL',
        pattern:        'Please match the requested format',
        too_short:      'Input is too short (minimum {n} characters)',
        too_long:       'Input is too long (maximum {n} characters)',
        range_under:    'Value must be at least {n}',
        range_over:     'Value must be no more than {n}',
        select_at_least: { one: 'Please select at least 1 option', other: 'Please select at least {n} options' },
        select_at_most:  { one: 'Please select no more than 1 option', other: 'Please select no more than {n} options' },
        still_loading:   'Still loading. Try again in a moment',
    });

    const rules = [];

    // Hidden if it — or any ancestor up to the form — carries [hidden] or computes display:none.
    // getComputedStyle is the submit-only read.
    function isVisible(element, form) {
        let current = element;
        while (current && current !== form) {
            if (current.hasAttribute('hidden') || current.hidden) return false;
            if (getComputedStyle(current).display === 'none') return false;
            current = current.parentElement;
        }
        return !!element;
    }

    function getMessage(input) {
        const validity = input.validity;
        // A blank custom message: the component shows the cause itself (password's red chips).
        if (validity.customError && !input.validationMessage.trim()) return '';
        if (validity.valueMissing) return strings.text('required');
        if (validity.typeMismatch) {
            if (input.type === 'email') return strings.text('invalid_email');
            if (input.type === 'url') return strings.text('invalid_url');
        } else if (validity.tooShort) return strings.text('too_short', { n: input.minLength });
        else if (validity.tooLong) return strings.text('too_long', { n: input.maxLength });
        else if (validity.rangeUnderflow) return strings.text('range_under', { n: input.min });
        else if (validity.rangeOverflow) return strings.text('range_over', { n: input.max });
        // The one vague default: data-error-message says what the pattern asks for.
        else if (validity.patternMismatch) return input.getAttribute('data-error-message') || strings.text('pattern');
        // A setCustomValidity stamp, already localized by the component that wrote it.
        else if (validity.customError) return input.validationMessage;
        return strings.text('invalid');
    }

    // A rule says so, or the loader's registry does for a component whose bundle has not landed.
    const isOwned = (container) => rules.some((rule) => rule.owns && rule.owns(container)) || NDS.init.isOwned(container);

    const watchers = [];
    function addRule(selector, fn, opts = {}) {
        const rule = { selector, fn, on: opts.on || [], owns: opts.owns };
        rules.push(rule);
        watchers.forEach((watcher) => watcher(rule));
    }
    function onRule(fn) {
        watchers.push(fn);
        rules.forEach(fn);
    }

    // As native constraint validation bars a disabled control.
    const isDisabled = (el, focus) => NDS.state.has(el, 'disabled') || !!el.closest('fieldset:disabled') || !!(focus && focus.disabled);

    // The shared parts once: an empty field's own wording.
    function finish(el, result) {
        if (!result) return null;
        const custom = el.getAttribute('data-error-message');
        if (!result.valid && result.empty && custom) result.message = custom;
        return result;
    }

    const isRequired = (el) => el.hasAttribute('data-required') || el.classList.contains('nds-required');

    // Min defaults to 1 when required, max to the option count.
    function checkCount(field, boxes) {
        const checked = Array.from(boxes).filter((box) => box.checked).length;
        const min = parseInt(field.getAttribute('data-min-checked') || (isRequired(field) ? 1 : 0), 10);
        const max = parseInt(field.getAttribute('data-max-checked') || boxes.length, 10);
        const valid = checked >= min && checked <= max;
        const below = checked < min;
        return { valid, message: valid ? '' : strings.text(below ? 'select_at_least' : 'select_at_most', { n: below ? min : max }),
            empty: checked === 0, checked, min, max };
    }

    function check(el, fn) {
        let result = null;
        if (fn) result = finish(el, fn(el));
        else for (const rule of rules) {
            if (el.matches(rule.selector) && (result = finish(el, rule.fn(el)))) break;
        }
        if (result && !result.valid && isDisabled(el, result.focus)) Object.assign(result, { valid: true, message: '' });
        return result;
    }

    // A form-container's own field: never one inside a nested container, never a hidden carrier.
    // Copies NDS.field.findOwnInput: field names this base, so the build order bars naming field back.
    function findOwnField(container) {
        const fields = container.querySelectorAll('input:not([type="hidden"]), textarea, select');
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].closest('.nds-form-container') === container) return fields[i];
        }
        return null;
    }

    function checkAll(form, opts = {}) {
        const validationResult = { invalidFields: [], errors: [] };
        const fail = (field, input, errorText) => {
            validationResult.invalidFields.push(field);
            validationResult.errors.push({ field, input, message: errorText });
        };

        // The native pass: a field whose own input holds the value. A group answers as a whole,
        // and a container a rule owns is left to that rule.
        form.querySelectorAll('.nds-form-container').forEach((container) => {
            if (!isVisible(container, form)) return;
            if (container.classList.contains('nds-otp-container') || container.closest('.nds-form-group')) return;
            if (isOwned(container)) return;
            const input = findOwnField(container);
            if (!input || input.disabled) return;
            const errorText = !input.checkValidity() ? getMessage(input) : opts.extra && opts.extra(container, input);
            if (errorText != null && errorText !== false) fail(container, input, errorText);
        });

        // The rules: an element answers to the first that answers for it.
        const answered = new Set(validationResult.invalidFields);
        validationResult.passed = [];
        for (const rule of rules) {
            form.querySelectorAll(rule.selector).forEach((el) => {
                if (answered.has(el) || !isVisible(el, form)) return;
                const result = finish(el, rule.fn(el));
                if (!result) return;
                answered.add(el);
                if (!result.valid && !isDisabled(el, result.focus)) fail(el, result.focus || null, result.message);
                else validationResult.passed.push(el);
            });
        }

        // A required field whose rule has not started gets no verdict from its markup. The innermost
        // pending field answers; Form's field classes are the structure every component sits in.
        const waiting = [...form.querySelectorAll('.nds-form-container, .nds-form-group')].filter((field) =>
            !answered.has(field) && isVisible(field, form) && !isDisabled(field) && (isRequired(field) || field.querySelector('[required]')) && NDS.init.isPending(field));
        waiting.filter((field) => !waiting.some((other) => other !== field && field.contains(other))).forEach((field) => {
            fail(field, field.querySelector(NDS.focusableSel), strings.text('still_loading'));
            validationResult.pending = true;
        });
        // Page order, whatever order the rules registered in.
        const order = (left, right) => (left.compareDocumentPosition(right) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
        validationResult.errors.sort((left, right) => order(left.field, right.field));
        validationResult.invalidFields = validationResult.errors.map((e) => e.field);
        return validationResult;
    }

    NDS.validation = { addRule, onRule, isOwned, check, checkAll, getMessage, isVisible, isRequired, checkCount, rules };
})();
