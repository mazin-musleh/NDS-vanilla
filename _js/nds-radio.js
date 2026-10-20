/* NDS.Radio — public surface
 * Rides: nds-validation (its rule) · nds-form (validate shows the outcome)
 * Methods:
 *   NDS.Radio.validate(el, opts)   the radio group el sits in → {valid, message, selected};
 *                                  opts {showMessage} (default on)
 * Events:
 *   (none)
 * Hooks:
 *   data-required   on the .nds-form-group: one radio must be picked
 *   data-error-message   the message when none is picked
 * Gotchas:
 *   - A type part of the form field: no init() and no loader entry.
 *   - A group showing an error is checked again on each change, so the message follows the fix.
 */
(() => {
    'use strict';

    const strings = NDS.i18n.strings('form', {
        select_option: 'Please select an option',
    });

    const groupOf = (el) => el.closest('.nds-form-group') || el;
    const check = (group) => {
        const picked = Array.from(group.querySelectorAll('input[type="radio"]')).some((r) => r.checked);
        const valid = !NDS.validation.isRequired(group) || picked;
        return { valid, message: valid ? '' : strings.text('select_option'), empty: !picked, selected: picked };
    };

    NDS.validation.addRule(
        '.nds-form-group[data-min-checked], .nds-form-group[data-max-checked], .nds-form-group[data-required], .nds-form-group.nds-required',
        (group) => {
            const radio = group.querySelector('input[type="radio"]');
            return radio ? Object.assign(check(group), { focus: radio }) : null;
        },
        { on: ['change'] }
    );

    NDS.Radio = {
        validate: (el, opts) => NDS.Form.validateField(groupOf(el), opts, check),
    };
})();
