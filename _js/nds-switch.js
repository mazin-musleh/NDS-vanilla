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
 *   - A label outside the control (the field header's) toggles the input natively: that change fires no
 *     nds:switch:change.
 */
(() => {
    'use strict';

    const toggleOf = (t) => t && t.closest && t.closest('.nds-form-control .nds-switch-toggle');
    const trackOf = (t) => t && t.closest && t.closest('.nds-switch-track');
    const inputOf = (sw) => sw.querySelector('.nds-switch-input');
    const off = (sw, input) => !input || input.disabled || sw.classList.contains('disabled');

    function toggle(sw) {
        const input = inputOf(sw);
        if (off(sw, input) || input.readOnly) return;
        NDS.setValue(input, !input.checked);
        NDS.field.refresh(input, { validate: true });
        sw.dispatchEvent(new CustomEvent('nds:switch:change', {
            detail: { checked: input.checked, value: input.value, input },
            bubbles: true,
        }));
    }

    // A press on the track marks the field active, as on an input.
    const active = (sw, on) => {
        const container = sw.closest('.nds-form-container');
        if (container) on ? NDS.state.add(container, 'active') : NDS.state.remove(container, 'active');
    };

    NDS.field.addType('switch', {
        // The container's states from the input: the input sits in the track, so the base's input pass misses it.
        create: (el) => {
            const inputs = Array.from(el.querySelectorAll('.nds-form-control .nds-switch-input'));
            if (el.matches && el.matches('.nds-switch-input')) inputs.unshift(el);
            inputs.forEach((input) => { if (!input.closest('code')) NDS.field.refresh(input); });
        },
        on: {
            // A field's own input (c) is never in a track: skip the lookups.
            mousedown: (e, c) => {
                const track = !c && trackOf(e.target), sw = toggleOf(track);
                if (sw && !off(sw, inputOf(sw))) active(sw, true);
            },
            mouseup: (e, c) => { const sw = !c && toggleOf(trackOf(e.target)); if (sw) active(sw, false); },
            // mouseleave does not bubble: a mouseout to outside the track stands in for it.
            mouseout: (e) => {
                const track = trackOf(e.target), sw = toggleOf(track);
                if (sw && !track.contains(e.relatedTarget)) active(sw, false);
            },
            click: (e, c) => {
                if (c) return;
                const sw = toggleOf(trackOf(e.target));
                if (sw) { e.preventDefault(); toggle(sw); return; }
                // A label in the same control: its own click would toggle the input with no event.
                const label = e.target.closest && e.target.closest('label[for]');
                const input = label && document.getElementById(label.htmlFor);
                const owner = input && input.classList.contains('nds-switch-input') && toggleOf(input);
                if (owner && !owner.contains(label) && label.closest('.nds-form-control') === owner.closest('.nds-form-control')) {
                    e.preventDefault();
                    toggle(owner);
                }
            },
            keydown: (e) => {
                if ((e.key !== ' ' && e.key !== 'Enter') || !e.target.classList || !e.target.classList.contains('nds-switch-input')) return;
                const sw = toggleOf(e.target);
                if (!sw) return;
                e.preventDefault();
                toggle(sw);
            },
        },
    });

    NDS.Switch = {};
})();
