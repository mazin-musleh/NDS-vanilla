/* NDS.field — public surface
 * Rides: (none — a base: Form and the field components plug their parts into it)
 * Methods:
 *   NDS.field.addType(name, part)     a part of the field another component owns: part.on maps an event
 *                                     name to fn(e, c), c the field the target is the input of ({input,
 *                                     control, container}, looked up once per event) or null; 'input:capture' for the capture phase;
 *                                     part.around the same as fn(e), for a target that is no field's own input
 *                                     (a button, a track, a chip): a click in a field never runs it; part.setupInput(input,
 *                                     control) runs for each input in the first-paint pass, part.create(el)
 *                                     after it, part.refresh(input, control, opts) after a value is set from
 *                                     code; part.isReadonlyActive(input) says a readonly input stays interactive
 *   NDS.field.create(el)              the first-paint pass over el: states, required marks, autofocus, and
 *                                     un-hiding the [hidden] wrappers; then each part's setupInput
 *   NDS.field.refresh(el, opts)       re-sync after a value or checked is set from code: an input its field,
 *                                     any other element every field inside it; then every part's refresh
 *   NDS.field.onReset(form, fn, opts) fn(form) once the browser has put the values back, unless the reset
 *                                     was cancelled; form a <form>, document (every form) or null
 *   NDS.field.isActive(input)         it takes the active and focus states: not readonly, or interactive
 *   NDS.field.findOwnControl(container) · NDS.field.findOwnInput(container)   a container's own, never a nested one's
 * Events:
 *   (none)
 * Hooks:
 *   data-state~="disabled|readonly" on a .nds-form-container or .nds-form-group: disabled reaches every
 *   input, action button and chip in it; readonly every input
 * Gotchas:
 *   - A base: it writes states and attributes and shows no message; Form shows the messages.
 *   - One document listener per event name, whatever the page holds. The base runs its own sync first,
 *     then each part in the order it registered.
 *   - A part's handler gets every event of its name: it checks the target itself. A handler a field's own
 *     input never needs goes in part.around: the first click in a field would otherwise compile it.
 */
(() => {
    'use strict';

    const SCOPE = '.nds-form-container, .nds-form-group';

    // ── Field states ───────────────────────────────────────────────────
    // Chips are built after load: their component re-applies with NDS.state.refresh after a render.
    NDS.state.onToggle('disabled', SCOPE, (el, on) => {
        el.querySelectorAll('input, textarea, select').forEach((input) => { input.disabled = on; });
        el.querySelectorAll('.nds-form-action .nds-btn, button.nds-chip').forEach((btn) => {
            NDS.aria.disabled(btn, on);
            if (btn.tagName === 'BUTTON') btn.disabled = on;
        });
    });
    // An input that stays interactive is readonly by design (Custom Select's display): leaving the state keeps it so.
    NDS.state.onToggle('readonly', SCOPE, (el, on) => {
        el.querySelectorAll('input, textarea, select').forEach((input) => { if (!isInteractive(input)) input.readOnly = on; });
    });

    // ── Parts ──────────────────────────────────────────────────────────
    const parts = [];
    const listening = new Set();
    const handlers = {};      // the base's own, run before the parts

    function listen(type) {
        if (listening.has(type)) return;
        listening.add(type);
        const [name, phase] = type.split(':');
        document.addEventListener(name, (e) => {
            const field = findControl(e.target);
            if (handlers[type]) handlers[type](e, field);
            for (const part of parts) {
                if (part.on && part.on[type]) part.on[type](e, field);
                if (!field && part.around && part.around[type]) part.around[type](e);
            }
        }, phase === 'capture');
    }

    function addType(name, part) {
        parts.push(Object.assign({ name }, part));
        Object.keys(Object.assign({}, part.on, part.around)).forEach(listen);
    }

    // ── Resolving a field ──────────────────────────────────────────────
    // The input an event belongs to: a direct input / textarea / select of a .nds-form-control that is no code sample.
    // A hidden carrier is not a field: a component's write to it must not clear the message it just set.
    function findControl(target) {
        if (!target || !target.matches || !target.matches('input:not([type="hidden"]), textarea, select')) return null;
        const formControl = target.parentElement;
        if (!formControl || !formControl.classList || !formControl.classList.contains('nds-form-control') || formControl.closest('code')) return null;
        return { input: target, control: formControl, container: formControl.closest('.nds-form-container') };
    }

    // A container's own control: the first whose nearest container is this one (an Editor's popover fields are not).
    function findOwnControl(container) {
        const controls = container.querySelectorAll('.nds-form-control');
        for (let i = 0; i < controls.length; i++) {
            if (controls[i].closest('.nds-form-container') === container) return controls[i];
        }
        return null;
    }

    // A container's own field: never one inside a nested container, never a hidden carrier. A group's: its first field.
    function findOwnInput(container) {
        const fields = container.querySelectorAll('input:not([type="hidden"]), textarea, select');
        if (!container.classList.contains('nds-form-container')) return fields[0] || null;
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].closest('.nds-form-container') === container) return fields[i];
        }
        return null;
    }

    // A readonly input that stays interactive: its part opens a menu from it (Custom Select).
    const isInteractive = (input) => input.readOnly && parts.some((part) => part.isReadonlyActive && part.isReadonlyActive(input));
    // A readonly input takes no active or focus state, unless it stays interactive.
    const isActive = (input) => !input.readOnly || isInteractive(input);

    // ── Sync ───────────────────────────────────────────────────────────
    // The container's states from its input: disabled, readonly, required.
    function sync(input, formControl) {
        const container = formControl.closest('.nds-form-container');
        if (!container) return;
        input.disabled ? NDS.state.add(container, 'disabled') : NDS.state.remove(container, 'disabled');
        if (isInteractive(input)) return;
        input.readOnly ? NDS.state.add(container, 'readonly') : NDS.state.remove(container, 'readonly');
        // Radios and checkboxes answer as a group; a component that owns the value keeps the container's mark.
        // Ownership is asked only when the mark would change: never while typing.
        if (input.type !== 'radio' && input.type !== 'checkbox' && container.hasAttribute('data-required') !== input.required
            && !NDS.validation.isOwned(container)) {
            container.toggleAttribute('data-required', input.required);
        }
    }

    function refresh(el, opts = {}) {
        if (!el || !el.closest) return;
        // A container: every field inside it. A hidden input is a component's carrier, not a field.
        if (!el.matches('input, textarea, select')) {
            el.querySelectorAll('.nds-form-control :is(input:not([type="hidden"]), textarea, select)').forEach((i) => refresh(i, opts));
            return;
        }
        const input = el;
        const formControl = input.closest('.nds-form-control');
        if (!formControl) return;
        sync(input, formControl);
        for (const part of parts) if (part.refresh) part.refresh(input, formControl, opts);
    }

    // ── The base's own handlers ────────────────────────────────────────
    // A mouse press marks the field active; mouseout stands in for mouseleave: an input has no children.
    handlers.mousedown = (e, field) => {
        if (field && field.container && isActive(field.input)) NDS.state.add(field.container, 'active');
    };
    // Leaving a state never asks isActive: a field turned readonly while active would keep it.
    handlers.mouseup = handlers.mouseout = (e, field) => {
        if (field && field.container) NDS.state.remove(field.container, 'active');
    };
    handlers.focusin = (e, field) => {
        if (field && field.container && isActive(field.input)) NDS.state.add(field.container, 'focus');
    };
    handlers.focusout = (e, field) => {
        if (field && field.container) {
            NDS.state.remove(field.container, 'focus');
            NDS.state.remove(field.container, 'typing');
        }
        if (field && isActive(field.input)) sync(field.input, field.control);
    };
    handlers.keydown = handlers.paste = (e, field) => {
        if (field && field.container && isActive(field.input)) NDS.state.add(field.container, 'typing');
    };
    // The browser ignores readOnly on a checkbox or a radio, and the readonly CSS blocks only the pointer:
    // cancel the click that Space or an arrow key sends, so the value stays.
    handlers['click:capture'] = (e) => {
        const target = e.target;
        if (target.readOnly && (target.type === 'checkbox' || target.type === 'radio')) e.preventDefault();
    };
    handlers.input = handlers.change = (e, field) => {
        if (field) sync(field.input, field.control);
    };
    // The browser restores the values after the reset event: re-sync then, unless it was cancelled.
    handlers.reset = (e) => {
        const form = e.target;
        setTimeout(() => { if (!e.defaultPrevented) refresh(form); });
    };

    // The same wait for a component that keeps its own value: a hidden carrier, a chip list, a file list.
    function onReset(form, fn, options) {
        if (!form) return;
        form.addEventListener('reset', (e) => setTimeout(() => {
            // A destroy() in that tick removed the listener, not this timer.
            if (!e.defaultPrevented && !options?.signal?.aborted && e.target.querySelectorAll) fn(e.target);
        }), options);
    }

    // While a container is focus or active, its own control carries `target`, so the CSS
    // (container[state] .control[target]) reaches that one control and never a nested container's.
    const syncTarget = (container) => {
        const formControl = findOwnControl(container);
        if (!formControl) return;
        if (NDS.state.has(container, 'focus') || NDS.state.has(container, 'active')) NDS.state.add(formControl, 'target');
        else NDS.state.remove(formControl, 'target');
    };

    let started = false;
    function start() {
        if (started) return;
        started = true;
        Object.keys(handlers).forEach(listen);
        NDS.state.onToggle('focus', '.nds-form-container', syncTarget);
        NDS.state.onToggle('active', '.nds-form-container', syncTarget);
        // Sweep only the outermost form, group or field around each added control:
        // a page-wide sweep cost 63 ms per added row at 1,000 fields (6.6x CPU).
        NDS.onDomAdd('.nds-form-control', (controls) => {
            const roots = new Set();
            controls.forEach((formControl) => {
                let root = formControl;
                for (let node = formControl; node; node = node.parentElement) if (node.matches('.nds-form, .nds-form-group, .nds-form-container')) root = node;
                roots.add(root);
            });
            roots.forEach((root) => {
                for (let node = root.parentElement; node; node = node.parentElement) if (roots.has(node)) return;
                create(root);
            });
        });
    }

    // ── First paint ────────────────────────────────────────────────────
    // Elements the init tail (autofocus, the reveal) has already handled.
    const handledElements = new WeakSet();
    const initializedInputs = new WeakSet();
    const getSelfAndInner = (el, selector) => {
        const inner = Array.from(el.querySelectorAll(selector));
        return el.matches && el.matches(selector) ? [el].concat(inner) : inner;
    };

    function setupInput(input, formControl) {
        if (initializedInputs.has(input)) return;
        initializedInputs.add(input);
        const container = formControl.closest('.nds-form-container');
        // A required container marks its input; one whose value a component owns never stamps required,
        // which would false-fail checkValidity, but still announces it.
        if (container && NDS.validation.isRequired(container)) {
            if (!NDS.validation.isOwned(container) && !input.hasAttribute('required')) input.setAttribute('required', '');
            input.setAttribute('aria-required', 'true');
        }
        // Container → input: a state shipped in the markup; then input → container.
        if (container) NDS.state.refresh(container, 'disabled', 'readonly', 'loading');
        sync(input, formControl);
    }

    function create(el) {
        if (!el) return;
        start();
        getSelfAndInner(el, '.nds-form-control').forEach((formControl) => {
            if (formControl.closest('code')) return;
            // A slider's inputs sit in its track, one level down.
            formControl.querySelectorAll(':scope > input, :scope > textarea, :scope > select, :scope > .nds-slider-track > input').forEach((input) => {
                setupInput(input, formControl);
                for (const part of parts) if (part.setupInput) part.setupInput(input, formControl);
            });
        });
        getSelfAndInner(el, '.nds-form-group').forEach((group) => NDS.state.refresh(group, 'disabled', 'readonly', 'loading'));
        for (const part of parts) if (part.create) part.create(el);
        // Restore autofocus, once per element: a re-sweep would pull focus from the field the user is in.
        // preventScroll: a plain focus() forces a layout in the middle of the init burst.
        const autofocus = el.querySelector('input[autofocus], textarea[autofocus], select[autofocus]');
        if (autofocus && !handledElements.has(autofocus)) {
            handledElements.add(autofocus);
            autofocus.focus({ preventScroll: true });
            const container = autofocus.closest('.nds-form-container');
            if (container) NDS.state.add(container, 'focus');
        }
        // Reveal the [hidden] FOUC-guard wrappers now their controls carry state, on a wrapper's first
        // sweep only, so one the page or a component hid later stays hidden.
        getSelfAndInner(el, '.nds-form-group, .nds-form-container, .nds-form-action').forEach((wrapper) => {
            if (handledElements.has(wrapper)) return;
            handledElements.add(wrapper);
            wrapper.removeAttribute('hidden');
        });
    }

    NDS.field = { addType, create, refresh, onReset, isActive, findOwnControl, findOwnInput };
})();
