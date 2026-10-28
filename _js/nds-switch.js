/* NDS.Switch — public surface
 * Rides: nds-field (the field's states and sync) · nds-form (a toggle checks the field again)
 * Methods:
 *   (none — the track, Space or Enter on the input, and a label in the same control toggle it)
 * Events:
 *   nds:switch:change   detail {checked, value, input} — from the .nds-switch-toggle, and it bubbles
 * Hooks:
 *   (none — the structure is markup: .nds-switch-toggle holds .nds-switch-input and .nds-switch-track)
 * Gotchas:
 *   - A type part of the form field: no init() and no loader entry.
 *   - Every change of the input checks the field again and fires nds:switch:change: the track, a key, a label
 *     (the field header's too), input.click() or NDS.setValue().
 */
(() => {
    'use strict';

    const findToggle = (target) => target && target.closest && target.closest('.nds-form-control .nds-switch-toggle');
    const findTrack = (target) => target && target.closest && target.closest('.nds-switch-track');
    const findInput = (switchToggle) => switchToggle.querySelector('.nds-switch-input');
    const isDisabled = (input) => !input || input.matches(':disabled');   // a disabled fieldset too

    function toggle(switchToggle) {
        const input = findInput(switchToggle);
        if (isDisabled(input) || input.readOnly) return;
        NDS.setValue(input, !input.checked);
    }

    // Every way the input changes reports here, not in toggle(): a header label toggles it natively.
    function report(input) {
        const switchToggle = findToggle(input);
        if (!switchToggle) return;
        NDS.field.refresh(input, { validate: true });
        switchToggle.dispatchEvent(new CustomEvent('nds:switch:change', {
            detail: { checked: input.checked, value: input.value, input },
            bubbles: true,
        }));
    }

    // A press on the track marks the field active, as on an input.
    const setActive = (switchToggle, on) => {
        const container = switchToggle.closest('.nds-form-container');
        if (container) on ? NDS.state.add(container, 'active') : NDS.state.remove(container, 'active');
    };

    NDS.field.addType('switch', {
        // The container's states from the input: the input sits in its toggle, so the base's input pass misses it.
        create: (el) => {
            const inputs = Array.from(el.querySelectorAll('.nds-form-control .nds-switch-input'));
            if (el.matches && el.matches('.nds-switch-input')) inputs.unshift(el);
            inputs.forEach((input) => { if (!input.closest('code')) NDS.field.refresh(input); });
        },
        on: {
            // mouseleave does not bubble: a mouseout to outside the track stands in for it.
            mouseout: (e) => {
                const track = findTrack(e.target), switchToggle = findToggle(track);
                if (switchToggle && !track.contains(e.relatedTarget)) setActive(switchToggle, false);
            },
        },
        // The switch input sits in its toggle, never a field's own input.
        around: {
            mousedown: (e) => {
                const track = findTrack(e.target), switchToggle = findToggle(track);
                if (!switchToggle) return;
                const input = findInput(switchToggle);
                // As on any field: a readonly switch, which toggle() refuses, takes no press.
                if (!isDisabled(input) && NDS.field.isActive(input)) setActive(switchToggle, true);
            },
            mouseup: (e) => { const switchToggle = findToggle(findTrack(e.target)); if (switchToggle) setActive(switchToggle, false); },
            change: (e) => { if (e.target.classList && e.target.classList.contains('nds-switch-input')) report(e.target); },
            click: (e) => {
                const switchToggle = findToggle(findTrack(e.target));
                // A label toggles the input natively, and its change reports like any other.
                if (switchToggle) { e.preventDefault(); toggle(switchToggle); }
            },
            keydown: (e) => {
                if ((e.key !== ' ' && e.key !== 'Enter') || !e.target.classList || !e.target.classList.contains('nds-switch-input')) return;
                const switchToggle = findToggle(e.target);
                if (!switchToggle) return;
                e.preventDefault();
                toggle(switchToggle);
            },
        },
    });

    NDS.Switch = {};
})();
