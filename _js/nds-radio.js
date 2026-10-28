/* NDS.Radio — public surface
 * Rides: nds-validation (its rule; data-error-message when none is picked) · nds-field (its part) · nds-form (validate shows the outcome)
 * Methods:
 *   NDS.Radio.validate(el, opts)   the radio group el sits in → {valid, message, selected};
 *                                  opts {showMessage} (default on)
 * Events:
 *   (none)
 * Hooks:
 *   data-required   on the .nds-form-group: one radio must be picked
 * Gotchas:
 *   - A type part of the form field: no init() and no loader entry.
 *   - A group showing an error is checked again on each change, so the message follows the fix.
 *   - A pick, or a checked radio set from code and refreshed, re-syncs the others of its name group:
 *     the browser unchecks them with no event.
 */
(() => {
    'use strict';

    const strings = NDS.i18n.getStrings('radio', {
        select_option: 'Please select an option',
    });

    const getGroup = (el) => el.closest('.nds-form-group') || el;
    const check = (group) => {
        const picked = Array.from(group.querySelectorAll('input[type="radio"]')).some((radio) => radio.checked);
        const valid = !NDS.validation.isRequired(group) || picked;
        return { valid, message: valid ? '' : strings.text('select_option'), empty: !picked, selected: picked };
    };

    // An enabled radio: a disabled focus would pass the whole group (see Checkbox). validate(el) answers the same way.
    const answer = (group) => {
        const radio = group.querySelector('input[type="radio"]:not(:disabled)') || group.querySelector('input[type="radio"]');
        return radio ? Object.assign(check(group), { focus: radio }) : null;
    };
    NDS.validation.addRule(
        '.nds-form-group[data-min-checked], .nds-form-group[data-max-checked], .nds-form-group[data-required], .nds-form-group.nds-required',
        answer,
        { on: ['change'] }
    );

    function repaint(changed) {
        if (changed.type !== 'radio' || !changed.name) return;
        const group = changed.closest('.nds-form-group');
        if (!group) return;
        group.querySelectorAll(`input[type="radio"][name="${CSS.escape(changed.name)}"]`).forEach((radio) => {
            if (radio !== changed && radio.closest('.nds-form-control')) NDS.field.refresh(radio, { validate: true });
        });
    }

    NDS.field.addType('radio', {
        refresh: (input) => { if (input.type === 'radio' && input.checked) repaint(input); },
        on: { change: (e, context) => { if (context) repaint(context.input); } },
    });

    NDS.Radio = {
        validate: (el, opts) => NDS.Form.validateField(getGroup(el), answer, opts),
    };
})();
