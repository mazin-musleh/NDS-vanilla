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
})();
