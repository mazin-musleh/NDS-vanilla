/* NDS.Checkbox — public surface
 * Rides: nds-validation (its rule) · nds-form (validate shows the outcome)
 * Methods:
 *   NDS.Checkbox.validate(el, opts)   the checkbox group el sits in → {valid, message, checked, min, max};
 *                                     opts {showMessage} (default on)
 * Events:
 *   (none)
 * Hooks:
 *   data-required · data-min-checked · data-max-checked   on the .nds-form-group
 *   data-error-message   the message when nothing is checked
 * Gotchas:
 *   - A type part of the form field: no init() and no loader entry.
 *   - A group showing an error is checked again on each change, so the message follows the fix.
 */
(() => {
    'use strict';

    const groupOf = (el) => el.closest('.nds-form-group') || el;
    const check = (group) => NDS.validation.checkedCount(group, group.querySelectorAll('input[type="checkbox"]'));

    // A group answers when it holds a checkbox and opts in.
    NDS.validation.addRule(
        '.nds-form-group[data-min-checked], .nds-form-group[data-max-checked], .nds-form-group[data-required], .nds-form-group.nds-required',
        (group) => {
            const box = group.querySelector('input[type="checkbox"]');
            return box ? Object.assign(check(group), { focus: box }) : null;
        },
        { on: ['change'] }
    );

    NDS.Checkbox = {
        validate: (el, opts) => NDS.Form.validateField(groupOf(el), opts, check),
    };
})();
