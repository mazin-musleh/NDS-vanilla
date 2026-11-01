/* NDS.Checkbox — public surface
 * Rides: nds-validation (its rule; data-error-message when nothing is checked) · nds-field (its part) · nds-form (validate shows the outcome)
 * Methods:
 *   NDS.Checkbox.validate(el, opts)   the checkbox group el sits in → {valid, message, checked, min, max};
 *                                     opts {showMessage} (default on)
 *   NDS.Checkbox.setIndeterminate(checkbox, value)   show or clear the dash of a "select all" box
 *   NDS.Checkbox.getValue(el)          one box's checked state; el is its .nds-checkbox field or its input; '' on a missed ref
 *   NDS.Checkbox.setValue(el, bool)    check or uncheck one box like a user; false (nothing written) when bool is not a boolean
 *   NDS.Checkbox.getValues(el)         the values of the checked boxes of the group el sits in (the .nds-form-group); [] on a miss
 *   NDS.Checkbox.setValues(el, values) check exactly the boxes with these values; false (nothing written) when a value has no box
 *   NDS.Checkbox.clear(el)             uncheck one box (el a field or an input), or every box of the group
 * Events:
 *   nds:checkbox:indeterminate   detail {indeterminate} — from the checkbox, on each setIndeterminate
 *                                and each change by the user
 * Hooks:
 *   data-required · data-min-checked · data-max-checked   on the .nds-form-group
 * Gotchas:
 *   - A type part of the form field: no init() and no loader entry.
 *   - A group showing an error is checked again on each change, so the message follows the fix.
 *   - A pick by the user clears the dash.
 */
(() => {
    'use strict';

    const getGroup = (el) => NDS.resolveElement(el)?.closest('.nds-form-group') || el;
    const check = (group) => NDS.validation.checkCount(group, group.querySelectorAll('input[type="checkbox"]'));

    // A group answers when it holds a checkbox and opts in. validate(el) answers the same way,
    // so a group of disabled boxes passes there too.
    const answer = (group) => NDS.validation.answerGroup(group, 'input[type="checkbox"]', check);
    NDS.validation.addRule(
        '.nds-form-group[data-min-checked], .nds-form-group[data-max-checked], .nds-form-group[data-required], .nds-form-group.nds-required',
        answer,
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

    const BOX = 'input[type="checkbox"]';
    const resolveBox = (el) => {
        el = NDS.resolveElement(el);
        if (!el || !el.matches) return null;
        return el.matches(BOX) ? el : el.querySelector(BOX);
    };
    const resolveBoxes = (el) => {
        const group = NDS.resolveElement(getGroup(el));
        return group?.querySelectorAll ? Array.from(group.querySelectorAll(BOX)) : null;
    };

    function setValue(el, value) {
        const box = resolveBox(el);
        if (!box || typeof value !== 'boolean') return false;
        if (box.checked !== value) NDS.setValue(box, value);
        return true;
    }

    function setValues(el, values) {
        const boxes = resolveBoxes(el);
        if (!boxes || !Array.isArray(values)) return false;
        const wanted = values.map(String);
        if (wanted.some((value) => !boxes.some((box) => box.value === value))) return false;
        boxes.forEach((box) => { if (box.checked !== wanted.includes(box.value)) NDS.setValue(box, !box.checked); });
        return true;
    }

    NDS.Checkbox = {
        validate: (el, opts) => NDS.Form.validateField(getGroup(el), answer, opts),
        setIndeterminate,
        getValue: (el) => { const box = resolveBox(el); return box ? box.checked : ''; },
        setValue,
        getValues: (el) => (resolveBoxes(el) || []).filter((box) => box.checked).map((box) => box.value),
        setValues,
        clear: (el) => {
            const target = NDS.resolveElement(el);
            return target && target.matches && target.matches(`${BOX}, .nds-checkbox`) ? setValue(target, false) : setValues(target, []);
        },
    };
})();
