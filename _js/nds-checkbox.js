/* NDS.Checkbox — public surface
 * Rides: nds-validation (its rule) · nds-field (its part) · nds-form (validate shows the outcome)
 * Methods:
 *   NDS.Checkbox.validate(el, opts)   the checkbox group el sits in → {valid, message, checked, min, max};
 *                                     opts {showMessage} (default on)
 *   NDS.Checkbox.setIndeterminate(checkbox, value)   show or clear the dash of a "select all" box
 * Events:
 *   nds:checkbox:indeterminate   detail {indeterminate} — from the checkbox, on each setIndeterminate
 * Hooks:
 *   data-required · data-min-checked · data-max-checked   on the .nds-form-group
 *   data-error-message   the message when nothing is checked
 * Gotchas:
 *   - A type part of the form field: no init() and no loader entry.
 *   - A group showing an error is checked again on each change, so the message follows the fix.
 *   - A pick by the user clears the dash.
 */
(() => {
    'use strict';

    const getGroup = (el) => el.closest('.nds-form-group') || el;
    const check = (group) => NDS.validation.checkCount(group, group.querySelectorAll('input[type="checkbox"]'));

    // A group answers when it holds a checkbox and opts in.
    NDS.validation.addRule(
        '.nds-form-group[data-min-checked], .nds-form-group[data-max-checked], .nds-form-group[data-required], .nds-form-group.nds-required',
        (group) => {
            const box = group.querySelector('input[type="checkbox"]');
            return box ? Object.assign(check(group), { focus: box }) : null;
        },
        { on: ['change'] }
    );

    function setIndeterminate(checkbox, value) {
        if (!checkbox || checkbox.type !== 'checkbox') return;
        checkbox.indeterminate = !!value;
        const container = checkbox.closest('.nds-form-container');
        if (container) value ? NDS.state.add(container, 'indeterminate') : NDS.state.remove(container, 'indeterminate');
        checkbox.dispatchEvent(new CustomEvent('nds:checkbox:indeterminate', {
            detail: { indeterminate: !!value },
            bubbles: true,
        }));
    }

    NDS.field.addType('checkbox', {
        on: {
            change: (e, context) => { if (context && context.input.type === 'checkbox' && !context.input.indeterminate) setIndeterminate(context.input, false); },
        },
    });

    NDS.Checkbox = {
        validate: (el, opts) => NDS.Form.validateField(getGroup(el), check, opts),
        setIndeterminate,
    };
})();
