/* NDS.field — public surface
 * Rides: (none — a base: Form and the field components plug their parts into it)
 * Methods:
 *   NDS.field.addType(name, part)     a part of the field another component owns: part.on maps an event
 *                                     name to fn(e, c), c the field the target is the input of (control(),
 *                                     looked up once per event) or null; 'input:capture' for the capture phase; part.init(input,
 *                                     control) runs for each input in the first-paint pass, part.create(el)
 *                                     after it, part.refresh(input, control, opts) after a value is set from
 *                                     code; part.readonlyActive(input) says a readonly input stays interactive
 *   NDS.field.create(el)              the first-paint pass over el: states, required marks, autofocus, and
 *                                     un-hiding the [hidden] wrappers; then each part's init
 *   NDS.field.refresh(el, opts)       re-sync after a value or checked is set from code: an input its field,
 *                                     any other element every field inside it; then every part's refresh
 *   NDS.field.control(target)         {input, control, container} when target is a field's own input
 *   NDS.field.isActive(input)         it takes the active and focus states: not readonly, or interactive
 *   NDS.field.ownControl(container) · NDS.field.ownInput(container)   a container's own, never a nested one's
 * Events:
 *   (none)
 * Hooks:
 *   data-state~="disabled|readonly" on a .nds-form-container or .nds-form-group: the effect reaches every
 *   input, action button and chip in it
 * Gotchas:
 *   - A base: it writes states and attributes and shows no message; Form shows the messages.
 *   - One document listener per event name, whatever the page holds. The base runs its own sync first,
 *     then each part in the order it registered.
 *   - A part's handler gets every event of its name: it checks the target itself.
 */
(() => {
    'use strict';

    const SCOPE = '.nds-form-container, .nds-form-group';

    // ── Field states ───────────────────────────────────────────────────
    // Chips are built after load: their component re-applies with NDS.state.apply after a render.
    NDS.state.effect('disabled', SCOPE, (el, on) => {
        el.querySelectorAll('input, textarea, select').forEach((inp) => { inp.disabled = on; });
        el.querySelectorAll('.nds-form-action .nds-btn, button.nds-chip').forEach((btn) => {
            NDS.aria.disabled(btn, on);
            if (btn.tagName === 'BUTTON') btn.disabled = on;
        });
    });
    NDS.state.effect('readonly', SCOPE, (el, on) => {
        el.querySelectorAll('input, textarea, select').forEach((inp) => { inp.readOnly = on; });
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
            const c = control(e.target);
            if (handlers[type]) handlers[type](e, c);
            for (const p of parts) if (p.on && p.on[type]) p.on[type](e, c);
        }, phase === 'capture');
    }

    function addType(name, part) {
        parts.push(Object.assign({ name }, part));
        Object.keys(part.on || {}).forEach(listen);
    }

    // ── Resolving a field ──────────────────────────────────────────────
    // The input an event belongs to: a direct input / textarea / select of a .nds-form-control that is no code sample.
    function control(target) {
        if (!target || !target.matches || !target.matches('input, textarea, select')) return null;
        const fc = target.parentElement;
        if (!fc || !fc.classList || !fc.classList.contains('nds-form-control') || fc.closest('code')) return null;
        return { input: target, control: fc, container: fc.closest('.nds-form-container') };
    }

    // A container's own control: the first whose nearest container is this one (an Editor's popover fields are not).
    function ownControl(container) {
        const controls = container.querySelectorAll('.nds-form-control');
        for (let i = 0; i < controls.length; i++) {
            if (controls[i].closest('.nds-form-container') === container) return controls[i];
        }
        return null;
    }

    // A container's own field: never one inside a nested container, never a hidden carrier.
    function ownInput(container) {
        const fields = container.querySelectorAll('input:not([type="hidden"]), textarea, select');
        if (!container.classList.contains('nds-form-container')) return fields[0] || null;
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].closest('.nds-form-container') === container) return fields[i];
        }
        return null;
    }

    // A readonly input that stays interactive: its part opens a menu from it (Custom Select).
    const interactive = (input) => input.readOnly && parts.some((p) => p.readonlyActive && p.readonlyActive(input));
    // A readonly input takes no active or focus state, unless it stays interactive.
    const isActive = (input) => !input.readOnly || interactive(input);

    // ── Sync ───────────────────────────────────────────────────────────
    // The container's states from its input: disabled, readonly, required.
    function sync(input, fc) {
        const container = fc.closest('.nds-form-container');
        if (!container) return;
        input.disabled ? NDS.state.add(container, 'disabled') : NDS.state.remove(container, 'disabled');
        if (interactive(input)) return;
        input.readOnly ? NDS.state.add(container, 'readonly') : NDS.state.remove(container, 'readonly');
        // Radios and checkboxes answer as a group; a component that owns the value keeps the container's mark.
        // Ownership is asked only when the mark would change: never while typing.
        if (input.type !== 'radio' && input.type !== 'checkbox' && container.hasAttribute('data-required') !== input.required
            && !NDS.validation.owns(container)) {
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
        const fc = input.closest('.nds-form-control');
        if (!fc) return;
        sync(input, fc);
        for (const p of parts) if (p.refresh) p.refresh(input, fc, opts);
    }

    // ── The base's own handlers ────────────────────────────────────────
    // A mouse press marks the field active; mouseout stands in for mouseleave: an input has no children.
    handlers.mousedown = (e, c) => {
        if (c && c.container && isActive(c.input)) NDS.state.add(c.container, 'active');
    };
    handlers.mouseup = handlers.mouseout = (e, c) => {
        if (c && c.container && isActive(c.input)) NDS.state.remove(c.container, 'active');
    };
    handlers.focusin = (e, c) => {
        if (c && c.container && isActive(c.input)) NDS.state.add(c.container, 'focus');
    };
    handlers.focusout = (e, c) => {
        if (c && c.container && isActive(c.input)) {
            NDS.state.remove(c.container, 'focus');
            NDS.state.remove(c.container, 'typing');
        }
        if (c && isActive(c.input)) sync(c.input, c.control);
    };
    handlers.keydown = handlers.paste = (e, c) => {
        if (c && c.container && (e.type === 'paste' || isActive(c.input))) NDS.state.add(c.container, 'typing');
    };
    // The browser ignores readOnly on a checkbox or a radio, and the readonly CSS blocks only the pointer:
    // cancel the click that Space or an arrow key sends, so the value stays.
    handlers['click:capture'] = (e) => {
        const t = e.target;
        if (t.readOnly && (t.type === 'checkbox' || t.type === 'radio')) e.preventDefault();
    };
    handlers.input = handlers.change = (e, c) => {
        if (c) sync(c.input, c.control);
    };
    // The browser restores the values after the reset event: re-sync then, unless it was cancelled.
    handlers.reset = (e) => {
        const form = e.target;
        setTimeout(() => {
            if (e.defaultPrevented || !form.querySelectorAll) return;
            form.querySelectorAll('.nds-form-control input, .nds-form-control textarea, .nds-form-control select').forEach((i) => refresh(i));
        });
    };

    // While a container is focus or active, its own control carries `target`, so the CSS
    // (container[state] .control[target]) reaches that one control and never a nested container's.
    const syncTarget = (container) => {
        const fc = ownControl(container);
        if (!fc) return;
        if (NDS.state.has(container, 'focus') || NDS.state.has(container, 'active')) NDS.state.add(fc, 'target');
        else NDS.state.remove(fc, 'target');
    };

    let started = false;
    function start() {
        if (started) return;
        started = true;
        Object.keys(handlers).forEach(listen);
        NDS.state.effect('focus', '.nds-form-container', syncTarget);
        NDS.state.effect('active', '.nds-form-container', syncTarget);
        // Sweep only the outermost form, group or field around each added control:
        // a page-wide sweep cost 63 ms per added row at 1,000 fields (6.6x CPU).
        NDS.onDOMAdd('.nds-form-control', (controls) => {
            const roots = new Set();
            controls.forEach((fc) => {
                let root = fc;
                for (let n = fc; n; n = n.parentElement) if (n.matches('.nds-form, .nds-form-group, .nds-form-container')) root = n;
                roots.add(root);
            });
            roots.forEach((root) => {
                for (const other of roots) if (other !== root && other.contains(root)) return;
                create(root);
            });
        });
    }

    // ── First paint ────────────────────────────────────────────────────
    // Elements the init tail (autofocus, the reveal) has already handled.
    const tail = new WeakSet();
    const selfAndInner = (el, sel) => {
        const inner = Array.from(el.querySelectorAll(sel));
        return el.matches && el.matches(sel) ? [el].concat(inner) : inner;
    };

    function initInput(input, fc) {
        if (input._ndsInitialized) return;
        input._ndsInitialized = true;
        const container = fc.closest('.nds-form-container');
        // A required container marks its input; one whose value a component owns never stamps required,
        // which would false-fail checkValidity, but still announces it.
        if (container && (container.hasAttribute('data-required') || container.classList.contains('nds-required'))) {
            if (!NDS.validation.owns(container) && !input.hasAttribute('required')) input.setAttribute('required', '');
            input.setAttribute('aria-required', 'true');
        }
        // Container → input: a state shipped in the markup; then input → container.
        if (container) NDS.state.apply(container, 'disabled', 'readonly', 'loading');
        sync(input, fc);
    }

    function create(el) {
        if (!el) return;
        start();
        selfAndInner(el, '.nds-form-control').forEach((fc) => {
            if (fc.closest('code')) return;
            // A slider's inputs sit in its track, one level down.
            fc.querySelectorAll(':scope > input, :scope > textarea, :scope > select, :scope > .nds-slider-track > input').forEach((input) => {
                initInput(input, fc);
                for (const p of parts) if (p.init) p.init(input, fc);
            });
        });
        selfAndInner(el, '.nds-form-group').forEach((g) => NDS.state.apply(g, 'disabled', 'readonly', 'loading'));
        for (const p of parts) if (p.create) p.create(el);
        // Restore autofocus, once per element: a re-sweep would pull focus from the field the user is in.
        // preventScroll: a plain focus() forces a layout in the middle of the init burst.
        const autofocus = el.querySelector('input[autofocus], textarea[autofocus], select[autofocus]');
        if (autofocus && !tail.has(autofocus)) {
            tail.add(autofocus);
            autofocus.focus({ preventScroll: true });
            const container = autofocus.closest('.nds-form-container');
            if (container) NDS.state.add(container, 'focus');
        }
        // Reveal the [hidden] FOUC-guard wrappers now their controls carry state, on a wrapper's first
        // sweep only, so one the page or a component hid later stays hidden.
        selfAndInner(el, '.nds-form-group, .nds-form-container, .nds-form-action').forEach((w) => {
            if (tail.has(w)) return;
            tail.add(w);
            w.removeAttribute('hidden');
        });
    }

    NDS.field = { addType, create, refresh, control, isActive, ownControl, ownInput };
})();
