// NDS Core — shared namespace and utilities
(() => {
    'use strict';

    window.NDS = window.NDS || {};

    // ── Language & Direction (cached) ────────────────────────────────
    // BCP 47: 'ar', 'ar-SA', 'ar-EG' → 'ar'  |  'en', 'en-US' → 'en'
    // Usage: NDS.lang  → 'ar' | 'en' | ...
    //        NDS.isArabic → true/false
    //        NDS.isRTL → true/false
    // ── Breakpoints (matches _mixins.scss) ─────────────────────────
    // Usage: NDS.breakpoints.desktop → '(min-width: 960px)'
    //        window.matchMedia(NDS.breakpoints.mobile).matches
    NDS.breakpoints = {
        mobile:          '(max-width: 599px)',
        tablet:          '(min-width: 600px)',
        'tablet-max':    '(max-width: 960px)',
        desktop:         '(min-width: 960px)',
        'desktop-max':   '(max-width: 1280px)',
        'large-desktop': '(min-width: 1280px)'
    };

    const _lang = (document.documentElement.lang || 'en').split('-')[0].toLowerCase();
    NDS.lang = _lang;
    NDS.isArabic = _lang === 'ar';
    NDS.isRTL = document.documentElement.dir === 'rtl';

    // ── Debounce ─────────────────────────────────────────────────────
    // Usage: const fn = NDS.debounce(handler, 150)
    NDS.debounce = (fn, ms) => {
        let t;
        return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
    };

    // ── Window Resize Bus ────────────────────────────────────────────
    // Single listener, 150ms debounce, fan-out to subscribers
    // Usage: const off = NDS.onResize(handler)
    NDS.onResize = (() => {
        const subs = [];
        let t;
        window.addEventListener('resize', () => {
            clearTimeout(t);
            t = setTimeout(() => { for (let i = 0; i < subs.length; i++) subs[i](); }, 150);
        }, { passive: true });

        return fn => {
            subs.push(fn);
            return () => { const i = subs.indexOf(fn); if (i !== -1) subs.splice(i, 1); };
        };
    })();

    // ── Element Resize Observer ──────────────────────────────────────
    // Single ResizeObserver, multiple elements
    // Usage: const off = NDS.onElementResize(el, handler)
    NDS.onElementResize = (() => {
        const map = new Map();
        const ro = typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(entries => {
                for (let i = 0; i < entries.length; i++) {
                    const fns = map.get(entries[i].target);
                    if (fns) fns.forEach(fn => fn(entries[i]));
                }
            })
            : null;

        return (el, fn) => {
            if (!ro) return () => {};
            let fns = map.get(el);
            if (!fns) { fns = new Set(); map.set(el, fns); ro.observe(el); }
            fns.add(fn);
            return () => {
                fns.delete(fn);
                if (!fns.size) { map.delete(el); ro.unobserve(el); }
            };
        };
    })();

    // ── Intersection Observer Pool ─────────────────────────────────
    // Shared viewport IntersectionObservers, grouped by options
    // Usage: const off = NDS.onIntersect(el, handler, { threshold, rootMargin })
    NDS.onIntersect = (() => {
        const pool = new Map(); // key → { io, map }

        return (el, fn, opts = {}) => {
            if (typeof IntersectionObserver === 'undefined') return () => {};
            const key = (opts.threshold || 0) + '|' + (opts.rootMargin || '0px');
            let group = pool.get(key);
            if (!group) {
                const map = new Map();
                const io = new IntersectionObserver(entries => {
                    for (let i = 0; i < entries.length; i++) {
                        const cb = map.get(entries[i].target);
                        if (cb) cb(entries[i]);
                    }
                }, { threshold: opts.threshold || 0, rootMargin: opts.rootMargin || '0px' });
                group = { io, map };
                pool.set(key, group);
            }
            group.map.set(el, fn);
            group.io.observe(el);
            return () => {
                group.map.delete(el);
                group.io.unobserve(el);
                if (!group.map.size) { group.io.disconnect(); pool.delete(key); }
            };
        };
    })();

    // ── DOM Mutation Bus ─────────────────────────────────────────────
    // Single MutationObserver on body, selector-based dispatch
    // Usage: NDS.onDOMAdd('.selector', nodes => { ... })
    //        NDS.onDOMRemove('.selector', nodes => { ... })
    const domBus = (() => {
        const addSubs = [], removeSubs = [];
        let started = false;

        function dispatch(nodes, subs) {
            for (let s = 0; s < subs.length; s++) {
                const hits = [];
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].matches(subs[s].sel)) hits.push(nodes[i]);
                    const ch = nodes[i].querySelectorAll(subs[s].sel);
                    for (let c = 0; c < ch.length; c++) hits.push(ch[c]);
                }
                if (hits.length) subs[s].fn(hits);
            }
        }

        function start() {
            if (started || !document.body) return;
            started = true;
            new MutationObserver(mutations => {
                const added = [], removed = [];
                for (let i = 0; i < mutations.length; i++) {
                    const m = mutations[i];
                    for (let j = 0; j < m.addedNodes.length; j++)
                        if (m.addedNodes[j].nodeType === 1) added.push(m.addedNodes[j]);
                    for (let j = 0; j < m.removedNodes.length; j++)
                        if (m.removedNodes[j].nodeType === 1) removed.push(m.removedNodes[j]);
                }
                if (added.length) dispatch(added, addSubs);
                if (removed.length) dispatch(removed, removeSubs);
            }).observe(document.body, { childList: true, subtree: true });
        }

        return { addSubs, removeSubs, start };
    })();

    NDS.onDOMAdd = (sel, fn) => { domBus.addSubs.push({ sel, fn }); domBus.start(); };
    NDS.onDOMRemove = (sel, fn) => { domBus.removeSubs.push({ sel, fn }); domBus.start(); };

    // ── State Management (data-state) ─────────────────────────────────
    // Space-separated token management for data-state attribute
    // Usage: NDS.State.add(el, 'open', 'active')
    //        NDS.State.remove(el, 'open')
    //        NDS.State.has(el, 'open')     → true/false
    //        NDS.State.set(el, 'open')     → replaces all tokens
    //        NDS.State.get(el)            → 'open active' (raw string)
    //        NDS.State.clear(el)           → removes data-state entirely
    NDS.State = (() => {
        const parse = el => new Set((el.getAttribute('data-state') || '').split(/\s+/).filter(Boolean));

        const add = (el, ...states) => {
            if (!el) return;
            const cur = parse(el);
            for (let i = 0; i < states.length; i++) cur.add(states[i]);
            el.setAttribute('data-state', [...cur].join(' '));
        };

        const remove = (el, ...states) => {
            if (!el) return;
            const cur = parse(el);
            for (let i = 0; i < states.length; i++) cur.delete(states[i]);
            cur.size ? el.setAttribute('data-state', [...cur].join(' '))
                     : el.removeAttribute('data-state');
        };

        const has = (el, state) => el ? parse(el).has(state) : false;

        const get = el => el ? (el.getAttribute('data-state') || '') : '';

        const set = (el, ...states) => {
            if (!el) return;
            states.length ? el.setAttribute('data-state', states.join(' '))
                          : el.removeAttribute('data-state');
        };

        const clear = el => { if (el) el.removeAttribute('data-state'); };

        return { parse, add, remove, has, get, set, clear };
    })();

    // ── Status Management (data-status) ─────────────────────────────
    // Single-value management for data-status attribute
    // Usage: NDS.Status.set(el, 'error')
    //        NDS.Status.get(el)            → 'error' | ''
    //        NDS.Status.clear(el)          → removes data-status
    NDS.Status = {
        set: (el, status) => { if (el && status) el.setAttribute('data-status', status); },
        get: (el) => el ? (el.getAttribute('data-status') || '') : '',
        clear: (el) => { if (el) el.removeAttribute('data-status'); }
    };

    // ── Lazy Reveal ────────────────────────────────────────────────────
    // Remove hidden from [data-nds-lazy] once DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        const els = document.querySelectorAll('[data-nds-lazy]');
        for (let i = 0; i < els.length; i++) els[i].removeAttribute('hidden');
    });

    // ── Grid Last Row ────────────────────────────────────────────────
    // Marks items in the last row of a grid with .nds-last-row
    // Used by .nds-divided grids to remove bottom borders from the last visual row
    // Usage: NDS.gridLastRow.update()  — re-scan all grids on the page
    //        NDS.gridLastRow.update(container)  — re-scan grids within a container
    NDS.gridLastRow = (() => {
        const SEL = '.nds-divided.nds-grid';
        const CLS = 'nds-last-row';
        let listening = false;

        function scan(container) {
            const grids = container && container.matches?.(SEL)
                ? [container]
                : (container || document).querySelectorAll(SEL);

            for (let g = 0; g < grids.length; g++) {
                const grid = grids[g];
                const items = grid.children;
                for (let i = 0; i < items.length; i++) items[i].classList.remove(CLS);
                if (!items.length) continue;

                // Skip hidden/non-laid-out grids (offsetTop is 0 for all items)
                if (!grid.offsetParent) continue;

                const lastTop = items[items.length - 1].offsetTop;
                for (let i = items.length - 1; i >= 0; i--) {
                    if (items[i].offsetTop === lastTop) {
                        items[i].classList.add(CLS);
                    } else {
                        break;
                    }
                }
            }
        }

        function startListening() {
            if (listening) return;
            listening = true;
            NDS.onResize(() => scan());
        }

        function update(container) {
            scan(container);
            // Start resize listener on first call that finds grids
            if (!listening && document.querySelector(SEL)) startListening();
        }

        document.addEventListener('DOMContentLoaded', () => update());

        return { update };
    })();
})();
